import path from 'path'
// const testCaseMapClone = {
//   '1_NameOverTheDoor': [620521, 620549],
//   '2_GLNNumber': [620526, 620554],
//   '3_DeliveryAddress_PostalCode': [620522, 620550],
//   '4_UpdateHierarchy': [620535, 620505],
//   '5_UnloadingPoint_Create': [620572, 620571],
//   '6_UnloadingPoint_Update': [620506, 620536],
//   '1_CreateContactRole': [620510, 620539],
//   '2_UpdateContactRole': [620511, 620540],
//   '3_DeleteContactRole': [620512, 620541],
//   '4_CreateContactNonWebUser': [620513, 620542],
//   '1_CreatePartner_DirectAccount': [620516, 620543],
//   '1_CreatePartner_InDirectAccount': [620532, 620559],
//   '3_DeletePartner_DirectAccount': [620518, 620545],
//   '3_DeletePartner_InDirectAccount': [620530, 620558],
//   '2_UpdatePartner_DirectAccount': [620517, 620544],
//   '2_UpdatePartner_InDirectAccount': [620529, 620557],
//   '1_Update_VatField': [620552, 620524],
//   '2_OrderBlock': [620525, 620553],
//   '1_Billing_Name_Vat': [620566],
//   '1_Create_Business_Appointments': [620570, 620569],
//   '2_Delete_Business_Appointments': [620509, 620538],
//   '3_UpdateA_Type': [620537, 620508],
//   '4_UpdateB_Type': [620564, 620563],
//   '5_UpdateC_Type': [620560, 620562],
//   '6_UpdateC_Type_Rejection': [620561],
//   '1_Create_BP_Territory_Assignment': [620546, 620507],
//   '2_Update_BP_Territory_Assignment': [620519, 620547],
//   '3_Delete_BP_Territory_Assignment': [620520, 620548],
//   '1_CustGrp4_DirectToIndirect': [620527, 620555],
//   '2_CustGrp4_IndirectToDirect': [,],
//   '1_CustomerAttribute_Create': [620514, 620533],
//   '2_CustomerAttribute_Update': [620534, 620515],
//   '3_CustomerAttribute_Delete': [620567, 620568],
//   '1_RTM_ApprovalReject': [620573],
// }
const testCaseMap = {
  '1_NameOverTheDoor': [6001],
  '2_GLNNumber': [6002],
  '3_DeliveryAddress_PostalCode': [6003],
  '4_UpdateHierarchy': [6004],
  '5_UnloadingPoint_Create': [6005],
  '6_UnloadingPoint_Update': [6006],
  '1_CreateContactRole': [6007],
  '2_UpdateContactRole': [6008],
  '3_DeleteContactRole': [6009],
  '4_CreateContactNonWebUser': [6010],
  '1_CreatePartner_DirectAccount': [6011],
  '1_CreatePartner_InDirectAccount': [6012],
  '3_DeletePartner_DirectAccount': [6013],
  '3_DeletePartner_InDirectAccount': [6014],
  '2_UpdatePartner_DirectAccount': [6015],
  '2_UpdatePartner_InDirectAccount': [6016],
  '1_Update_VatField': [6017],
  '2_OrderBlock': [6018],
  '1_Billing_Name_Vat': [6019],
  '1_Create_Business_Appointments': [6020],
  '2_Delete_Business_Appointments': [6021],
  '3_UpdateA_Type': [6022],
  '4_UpdateB_Type': [6023],
  '5_UpdateC_Type': [6024],
  '6_UpdateC_Type_Rejection': [6025],
  '1_Create_BP_Territory_Assignment': [6026],
  '2_Update_BP_Territory_Assignment': [6027],
  '3_Delete_BP_Territory_Assignment': [6028],
  '1_CustGrp4_DirectToIndirect': [6029],
  '2_CustGrp4_IndirectToDirect': [6030],
  '1_CustomerAttribute_Create': [6031],
  '2_CustomerAttribute_Update': [6032],
  '3_CustomerAttribute_Delete': [6033],
  '1_RTM_ApprovalReject': [6035],
  'UpdateU_type': [6036],
  'UpdateV_type': [6037],
  'UpdateW_type': [6038],
  'UpdateZ_type': [6039],
  '1_CreateBankAccount': [6040],
  '3_DeleteBankAccount': [6041],
  '3_Correspondence_Address': [6042],
  'Create_MD_LongText': [6043],
  'Update_MD_LongText': [6044],
  'Delete_MD_LongText': [6045],
}

/**
   *
   */
export async function getTestCaseNamesByIds(): Promise<string[]> {
  const idsFromEnv = process.env.TESTCASEID // e.g., "787878,80989,78787"
  if(!idsFromEnv) { return [] }

  const ids: number[] = idsFromEnv.split(',').map(id => parseInt(id.trim()))
  const result: string[] = []

  for(const [testCaseName, testCaseIds] of Object.entries(testCaseMap)) {
    if(testCaseIds.some(id => ids.includes(id))) {
      const finalPath = path.join(process.env.TESTCASEPATH as string, `/${testCaseName}`)
      if(!result.includes(finalPath)) {
        result.push(finalPath)
      }
    }
  }
  return result
}

/**
   *
   */
export  function joinTestCaseNamesByIds1(): string {
  const idsFromEnv = process.env.TESTCASEID // e.g., "787878,80989,78787"
  const testCaseBasePath = process.env.TESTCASEPATH || 'tests' // Default path if not set

  if(!idsFromEnv) { return '' }

  const ids: number[] = idsFromEnv.split(',').map(id => parseInt(id.trim()))
  const result: string[] = []

  for(const [testCaseName, testCaseIds] of Object.entries(testCaseMap)) {
    if(testCaseIds.some(id => ids.includes(id))) {
      const finalPath = path.posix.join(testCaseBasePath, `${testCaseName}.spec.ts`)
      result.push(finalPath)
    }
  }

  return result.join(',')
}

/**
   *
   */
export function joinTestCaseNamesByIds(): string[] {
  const result: string[] = []
  try {
    const idsFromEnv = process.env.TESTCASEID
    const testCaseBasePath = process.env.TESTCASEPATH || 'tests/functional/**'

    if(!idsFromEnv) { return [] }

    const ids: number[] = idsFromEnv.split(',').map(id => parseInt(id.trim()))


    for(const [testCaseName, testCaseIds] of Object.entries(testCaseMap)) {
      if(testCaseIds.some(id => ids.includes(id))) {
        const finalPath = path.posix.join(testCaseBasePath, `${testCaseName}.spec.ts`)
        result.push(finalPath)
      }
    }
  } catch(error) {
    console.log(`joinTestCaseNamesByIds Error: ${error}`)
  }
  return result
}
