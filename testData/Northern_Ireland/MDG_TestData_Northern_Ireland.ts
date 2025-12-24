import { ICountryTestData } from '../../utilities/ITestData'
export const testDataNorthernIreland : ICountryTestData = {
  countryId: '',
  countryName: 'Northern_Ireland',

  // #region This section for country specific data
  countryCode: '+44 GB',
  ccprefix: '+44',
  phoneNumber: '28906115',
  attributes: 'Wave1',
  fillfrequency: 'Yes',
  vatNumber: '',
  taxNum2: '',
  approvalNeededForCreatePartner: 'No',
  approvalNeededForUpdatePartner: 'No',
  approvalNeededForDeletePartner: 'No',
  fillAppointmentDayCreate: ['Monday', 'Wednesday'],
  fillAppointmentDayUpdate: ['Tuesday'],
  contactRoleAPIFileds: ['Mobile Phone Number', 'Email', 'Mobilephone'],
  companyCode: '0480',
  name1SAP: true,
  name2SAP: true,
  // #endregion
  // #region This section is for ADO Testplan configuration id
  e2eConfigurationID: '124',
  decoupleConfigurationID: '124',
  // #endregion

  // mdg data
  fetchbusinessHours: 'No',

  // #region This section is for ADO Test case ID's
  createCrWithDistribution: '842313',
  createCrDirect: '856238',
  createCrIndirect: '856264',
  createCrVendingWithDistributionStep: '856277',



  //Customer Marketing Attribute
  CMACreateD365: '',
  CMACreateBSO: '',
  CMADeleteD365: '',
  CMADeleteBSO: '',
  CMAUpdateBSO: '',
  CMAUpdateD365: '',

  //Account update
  AUDeliveryAddressFieldD365: '',
  AUDeliveryAddressFieldBSO: '',
  AUGlnD365: '',
  AUGlnBSO: '',
  AUNameFieldD365: '',
  AUNameFieldsBSO: '',
  AUOrderBlockFieldD365: '',
  AUOrderBlockFieldBSO: '',
  AUTaxVatFieldD365: '',
  AUTaxVatFieldBSO: '',
  AUBillAddressNameVatD365: '',

  //BP territory Assignment
  BTACreateD365: '',
  BTACreateBSO: '',
  BTAUpdateD365: '',
  BTAUpdateBSO: '',
  BTADeleteD365: '',
  BTADeleteBSO: '',

  //Business Appointments
  BACreateD365: '',
  BACreateBSO: '',
  BADeleteD365: '',
  BADeleteBSO: '',
  BAUpdateATypeD365: '',
  BAUpdateATypeBSO: '',
  BAUpdateBTypeD365: '',
  BAUpdateBTypeBSO: '',
  BAUpdateCTypeApprovalD365: '',
  BAUpdateCTypeRejectD365: '',
  BAUpdateCTypeBSO: '',
  //Business Appointment W type
  BAUpdateWTypeD365: '',
  BAUpdateWTypeBSO: '',
  BAUpdateUTypeD365: '',
  BAUpdateUTypeBSO: '',
  BAUpdateVTypeD365: '',
  BAUpdateVTypeBSO: '',
  BAUpdateZTypeD365: '',
  BAUpdateZTypeBSO: '',

  //Contact Role
  CRCreateD365: '682500',
  CRCreateBSO: '682495',
  CRUpdateD365: '682501',
  CRUpdateBSO: '682496',
  CRDeleteD365: '682494',
  CRDeleteBSO: '682497',

  //Partner Functions Customer
  PFCreateDirectD365: '',
  PFCreateDirectBSO: '',
  PFCreateInDirectD365: '',
  PFCreateInDirectBSO: '',
  PFDeleteDirectD365: '',
  PFDeleteDirectBSO: '',
  PFDeleteInDirectD365: '',
  PFDeleteInDirectBSO: '',
  PFUpdateDirectD365: '',
  PFUpdateDirectBSO: '',
  PFUpdateInDirectD365: '',
  PFUpdateInDirectBSO: '',

  //RTM
  rtmApprovalRejectD365: '682499',

  //Unloading Points
  UPCreateD365: '',
  UPCreateBSO: '',
  UPUpdateD365: '',
  UPUpdateBSO: '',

  //Update Hierarchy
  updateHierarchyD365: '',
  updateHierarchyBSO: '',

  //Contact Non Web User
  CNWUCreatD365: '682502',
  CNWUCreateBSO: '682498',
  // #endregion
  // #region This section is for De-Coupling test case ID
  //Customer Marketing Attribute
  CMACreateAPI: '',
  CMADeleteAPI: '',
  CMAUpdateAPI: '',

  //Account update
  AUDeliveryAddressFieldAPI: '',
  AUGlnAPI: '',
  AUNameFieldsAPI: '',
  AUOrderBlockFieldAPI: '',
  AUTaxVatFieldAPI: '',

  //BP territory Assignment
  BTACreateAPI: '',
  BTAUpdateAPI: '',
  BTADeleteAPI: '',

  //Business Appointments
  BACreateAPI: '',
  BADeleteAPI: '',
  BAUpdateATypeAPI: '',
  BAUpdateBTypeAPI: '',
  BAUpdateCTypeAPI: '',
  BAUpdateWTypeAPI: '',
  BAUpdateVTypeAPI: '',
  BAUpdateUTypeAPI: '',
  BAUpdateZTypeAPI: '',
  //Contact Role
  CRCreateAPI: '682513',
  CRUpdateAPI: '682514',
  CRDeleteAPI: '682515',

  //Partner Functions Customer
  PFCreateDirectAPI: '',
  PFCreateInDirectAPI: '',
  PFDeleteDirectAPI: '',
  PFDeleteInDirectAPI: '',
  PFUpdateDirectAPI: '',
  PFUpdateInDirectAPI: '',

  //Unloading Points
  UPCreateAPI: '',
  UPUpdateAPI: '',
  updateHierarchyAPI: '',
  CNWUCreateAPI: '682516',
  CreateBankD365: '',
  CreateBankBSO: '',
  CreateBankAPI: '',
  DeleteBankD365: '',
  DeleteBankBSO: '',
  DeleteBankAPI: ''
}