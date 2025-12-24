import { expect, request } from '@playwright/test'
import { getBearerTokenWithPassword, ApiUtils } from './apiImports'
import { loginData } from '../testData/login_TestData'
import { Record } from '../utilities/record'
const cryptoJs = require('crypto-js')

/**
 *
 * @param {string} mdRequestId - The Id of the mdRequest.
 */
export async function fetchD365MDGPayload(mdRequestId: string): Promise<any> {
  //const country = process.env.COUNTRY as string
  const countryBDUser = loginData['adminServiceAccount']
  countryBDUser.username = cryptoJs.AES.decrypt(countryBDUser.username, process.env.usernameKey).toString(cryptoJs.enc.Utf8)
  countryBDUser.password = cryptoJs.AES.decrypt(countryBDUser.password, process.env.passwordKey).toString(cryptoJs.enc.Utf8)
  const token = await  getBearerTokenWithPassword(countryBDUser)

  const context = await request.newContext()
  const api = new ApiUtils(context)
  const url = `${countryBDUser.uat2Url}/api/data/v9.2/cch_mdrequests?$select=_cch_account_value,cch_mdrequestdate,cch_mdgticketnumber&$expand=cch_Casereference($select=ticketnumber)&$filter=cch_winshuttleticketnumber eq '${mdRequestId}'`
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  const response = await api.sendGetRequest(url, headers)
  const responseBody = await response.json()

  // Validate Response
  const isValid = api.validateResponse(response, 200)
  expect(isValid).toBe(true)

  // Safely access the ticketnumber
  const caseTicketNumber = responseBody.value?.[0]?.cch_Casereference?.ticketnumber

  if(caseTicketNumber) {
    console.log('Ticket Number:', caseTicketNumber)
  } else {
    console.error('Ticket Number not found in response.')
  }

  const caseUrl = `${countryBDUser.uat2Url}/api/data/v9.2/incidents(ticketnumber='${caseTicketNumber}')?$select=cch_approvaljson,cch_nonapprovaljson`
  const caseheaders = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  const caseresponse = await api.sendGetRequest(caseUrl, caseheaders)
  const caseresponseBody = await caseresponse.json()

  // Validate Response
  const isCaseValid = api.validateResponse(caseresponse, 200)
  expect(isCaseValid).toBe(true)

  const approvalJsonRaw = caseresponseBody.cch_approvaljson
  const nonApprovalJsonRaw = caseresponseBody.cch_nonapprovaljson

  console.log(`\nNon Approval: ${nonApprovalJsonRaw}\n`)
  console.log(`\nApproval: ${approvalJsonRaw}\n`)

  let parsedResponse: any
  if(approvalJsonRaw !== null && approvalJsonRaw !== '') {
    parsedResponse = JSON.parse(approvalJsonRaw)
  }
  if(nonApprovalJsonRaw !== null && nonApprovalJsonRaw !== '') {
    parsedResponse = JSON.parse(nonApprovalJsonRaw)
  }

  if(parsedResponse.Attributes !== null) {
    for(const attr of parsedResponse.Attributes || []) {
      const displayName = attr.DisplayName
      const newValue = Array.isArray(attr.NewValue?.Value) ?
        attr.NewValue.Value.join(', ') :
        attr.NewValue?.Value ?? 'null'
      const oldValue = Array.isArray(attr.OldValue?.Value) ?
        attr.OldValue.Value.join(', ') :
        attr.OldValue?.Value ?? 'null'
      console.log(`${displayName} : '${oldValue}'\t'${newValue}'`)
    }
    console.log('\n')
  }
  if(parsedResponse.RelatedTables !== null) {
    for(const table of parsedResponse.RelatedTables || []) {
      if(table.Attributes) {
        api.printAttributes(table.Attributes)
      }
      if(table.AdditionalAttributes) {
        api.printAttributes(table.AdditionalAttributes)
      }
    }
    console.log('\n')
  }

  return parsedResponse
}

/**
 *Fetches the account ID based on the provided company name from the given record.
 * @param {Record} record - The data record that may contain account or company information.
 * @param {string} companyName - The name of the company to search for in the record.
 */
export async function fetchAccountIdByName(record: Record, companyName: string): Promise<any> {
  const countryBDUser = loginData['adminServiceAccount']
  const token = await  getBearerTokenWithPassword(countryBDUser)

  const fetchXml = `<fetch version="1.0" output-format="xml-platform" mapping="logical" savedqueryid="00000000-0000-0000-00aa-000010001002" returntotalrecordcount="true" page="1" count="250" no-lock="false" distinct="true"><entity name="account"><attribute name="entityimage_url"/><attribute name="statecode"/><attribute name="name"/><attribute name="address1_city"/><order attribute="name" descending="false"/><attribute name="primarycontactid"/><attribute name="telephone1"/><filter type="and"><condition attribute="name" operator="eq" value="${companyName}"/><condition attribute="cch_countryid" operator="eq" value="{${record.countryId}}" uiname="${record.countryName}" uitype="cch_country"/></filter><link-entity alias="accountprimarycontactidcontactcontactid" name="contact" from="contactid" to="primarycontactid" link-type="outer" visible="false"><attribute name="emailaddress1"/></link-entity><attribute name="accountid"/><attribute name="cch_sapid"/><attribute name="cch_salesorganizationid"/></entity></fetch>`
  const context = await request.newContext()
  const api = new ApiUtils(context)
  const encodedFetchXml = encodeURIComponent(fetchXml)
  const url = `${countryBDUser.uat2Url}/api/data/v9.2/accounts?fetchXml=${encodedFetchXml}`
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  const response = await api.sendGetRequest(url, headers)
  const responseBody = await response.json()

  // Validate Response
  const isValid = api.validateResponse(response, 200)
  expect(isValid).toBe(true)

  const accountNumbers: string[] = responseBody.value?.map((item: any) => item.cch_sapid) ?? []
  // const accountNumbers: string[] = responseBody.value?.map((item: any) =>
  //   item.cch_sapid?.replace(/^0+/, '') // removes all leading zeros
  //   ) ?? [];
  return accountNumbers
}