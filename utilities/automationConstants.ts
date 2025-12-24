export class GENERALCONSTANT {

  //D365

  static readonly marketingAttributeList = [
    'Call Concept & Frequency (CCAF)',
    'High Season From',
    'High Season To',
    'Local Customer Segmentation',
    'Valid from date season 2',
    'Valid to date season 2',
    'Customer seasonality',
    'RED Customer',
    'BD Service Time',
    'Focus Outlet'
  ]
  static readonly approvalAttributes = new Set([
    'Customer seasonality',
    'Call Concept & Frequency (CCAF)',
    'RED Customer',
    'BD Service Time',
    'Focus Outlet'
  ])
  static readonly timeMap: { [key: string]: string } = {
    'open1': '10:00',
    'close1': '10:30',
    'open2': '16:00',
    'close2': '16:30',
  }
  static readonly NO_PASCAL_CONTANT = 'No'
  static readonly YES_PASCAL_CONTANT = 'Yes'
  static readonly MONDAY = 'Monday'
  static readonly WEEKLY_FREQUENCY = '1 = weekly'
  static readonly MONDAY_START = 'Monday Start'
  static readonly MONDAY_END = 'Monday End'
  static readonly EVERY_WEEK_FREQUENCY = '2 = every second week'
  static readonly TUESDAY = 'tuesday'
  static readonly TUESDAY_START = 'tuesday Start'
  static readonly TUESDAY_END = 'tuesday End'
  static readonly BUSINESS_APPOINMENT_TYPEA = 'TypeA'
  static readonly BUSINESS_APPOINMENT_TYPEB = 'TypeB'
  static readonly BUSINESS_APPOINMENT_TYPEC = 'TypeC'
  static readonly BUSINESS_APPOINMENT_TYPEW = 'TypeW'
  static readonly BUSINESS_APPOINMENT_TYPEU = 'TypeU'
  static readonly BUSINESS_APPOINMENT_TYPEV = 'TypeV'
  static readonly BUSINESS_APPOINMENT_TYPEZ = 'TypeZ'
  static readonly OPEN_MONDAY_ONE = 'open1'
  static readonly CLOSE_MONDAY_ONE = 'close1'
  static readonly OPEN_MONDAY_TWO = 'open2'
  static readonly CLOSE_MONDAY_TWO = 'close2'
  static readonly CALL_APPOINTMENTS = 'A - Call Appointments'
  static readonly DELIVERY_DATES  = 'B - Delivery Dates'
  static readonly VISIT_APPOINMENTS = 'C - Visit Appointments'
  static readonly PRESELLER_2 = 'W - Preseller 2'
  static readonly PRESELLER_1 = 'V - Preseller 1'
  static readonly PRESELLER_5 = 'U - Preseller 5'
  static readonly MERCHANDIZING_HOURS = 'Z - Merchandizing Hours'

  //Delete Contact Role
  static readonly allowedRoles = ['Legal', 'Finance', 'Commercial', 'Logistics']

  static readonly custGrp4Values = ['--Select--', 'Direct Outlet', 'Indirect Outlet']

  static readonly partnerFuncValues = ['--Select--', 'ZW - Wholesaler']

  static readonly bpTerritoryvalues = ['BD-Business Developer', 'MC-Merchendiser', 'P1-Presales1', 'P2-Presales2']

  static readonly appointmentTypes = [
    'A - Call Appointments',
    'B - Delivery Dates',
    'C - Visit Appointments',
    'R - Alcohol Delivery Dates',
    'V - Preseller 1',
    'W - Preseller 2',
    'X - Preseller 3',
    'Y - Preseller 4',
    'U - Preseller 5',
    'Z - Merchandising Hours'
  ]

}
export class SAPTABLECONSTANT {
// sap

  static readonly TABLE_NAME_ZMDGC_SDEMAND = 'ZMDGC_SDEMAND'
  static readonly TABLE_NAME_ZMDGC_SGRP = 'ZMDGC_SGRP'
  static readonly TABLE_NAME_ZMDGC_CREDIT = 'ZMDGC_CREDIT'
  static readonly TABLE_NAME_ZMDGC_DIST = 'ZMDGC_DIST'
  static readonly TABLE_NAME_ZMDGC_CCAF = 'ZMDGC_CCAF'
  static readonly TABLE_NAME_ZMDGC_AGTERR = 'ZMDGC_AGTERR'
  static readonly TABLE_NAME_ZMDGC_CATERR = 'ZMDGC_CATERR'
  static readonly TABLE_NAME_ZMDGC_BA = 'ZMDGC_BA'
  static readonly TABLE_NAME_ZMDGC_BHOURS = 'ZMDGC_BHOURS'

  static readonly TABLE_NAME_BUT000 = 'BUT000'





  static readonly TABLE_NAME_KNA1 = 'kna1'
  static readonly TABLE_NAME_ZMDGC_Z11_V = 'ZMDGC_Z11_V'

  static readonly TABLE_NAME_ZMDGC_TRR_V = 'ZMDGC_TRR_V'
  static readonly TABLE_NAME_ZMDGC_CONTACT_V = 'ZMDGC_CONTACT_V'
  static readonly TABLE_NAME_ZMDGC_GEO = 'ZMDGC_GEO'

  static readonly TABLE_NAME_ZMDGC_KNVP_V = 'ZMDGC_KNVP_V'
  static readonly TABLE_NAME_KNVP = 'KNVP'

  static readonly QUERY_NAME_BP_MARKETING = 'BP_MARKETING'

  static readonly TABLE_NAME_ZMDGC_KNA1AUSP_V = 'ZMDGC_KNA1AUSP_V'
  static readonly QUERY_NAME_BP_APPOINTMENT = 'BP_APPOINTMENT'
  static readonly TABLE_NAME_ZMDGBPAPPNTMNT = 'ZMDGBPAPPNTMNT'

  static readonly TABLE_NAME_ZMDGC_TAX_V = 'ZMDGC_TAX_V'
  static readonly TABLE_NAME_KNVV = 'knvv' // consider renaming to TABLE_NAME_KNVV if that's the intended table
  static readonly QUERY_NAME_CONTACT = 's4_bp_custcont'

  static readonly TABLE_NAME_ZMDGBPBLOCKDEL = 'ZMDGBPBLOCKDEL'
  static readonly QUERY_NAME_BUSINESS_HOURS = 'S4_BP_customer'
  static readonly TABLE_NAME_KNVH = 'knvh'
  static readonly TABLE_NAME_ZMDGC_KNVH = 'ZMDGC_KNVH'

  static readonly TABLE_NAME_ZMDGC_BUT0BK_V = 'ZMDGC_BUT0BK_V'
  static readonly QUERY_NAME_S4_BP_CUST_BKH = 'S4_BP_CUST_BKH'
}