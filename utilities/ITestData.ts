
import { AttributeType } from './Interfaces'
export interface ICountryTestData {
    countryId: string;
    countryName: string;
     //configurationID: number[];
    e2eConfigurationID: string;
    decoupleConfigurationID: string;
    countryCode: string;
    ccprefix: string;
    phoneNumber: string;
    attributes?: AttributeType;
    vatNumber: string;
    fillfrequency?:string
    fillsalesArea?:string
    fillVat?:boolean
    fillTax1?:boolean
    fillTax2?:boolean
    taxNum2:string
    contactRoleAPIFileds:any[]
    fillAppointmentDayCreate:string[]
    fillAppointmentDayUpdate:string[]
    approvalNeededForCreatePartner:string
    approvalNeededForUpdatePartner:string
    approvalNeededForDeletePartner:string
    companyCode:string
    name1SAP?:boolean
    name2SAP?:boolean
    name3SAP?:boolean
    name4SAP?:boolean
    //mdg data
    fetchbusinessHours: string


    //test cases
    createCrWithDistribution: string;
    createCrDirect: string;
    createCrIndirect: string;
    createCrVendingWithDistributionStep: string;
    createCrDts: string;


    //Customer Marketing Attribute
    CMACreateD365: string;
    CMACreateBSO: string;
    CMADeleteD365: string;
    CMADeleteBSO: string;
    CMAUpdateBSO: string;
    CMAUpdateD365: string;

    //Account update
    AUDeliveryAddressFieldD365: string;
    AUDeliveryAddressFieldBSO: string;
    AUGlnD365: string;
    AUGlnBSO: string;
    AUNameFieldD365: string;
    AUNameFieldsBSO: string;
    AUOrderBlockFieldD365: string;
    AUOrderBlockFieldBSO: string;
    AUTaxVatFieldD365: string;
    AUTaxVatFieldBSO: string;
    AUBillAddressNameVatD365: string;

    //BP territory Assignment
    BTACreateD365: string;
    BTACreateBSO: string;
    BTAUpdateD365: string;
    BTAUpdateBSO: string;
    BTADeleteD365: string;
    BTADeleteBSO: string;

    //Business Appointments
    BACreateD365: string;
    BACreateBSO: string;
    BADeleteD365: string;
    BADeleteBSO: string;
    BAUpdateATypeD365: string;
    BAUpdateATypeBSO: string;
    BAUpdateBTypeD365: string;
    BAUpdateBTypeBSO: string;
    BAUpdateCTypeApprovalD365: string;
    BAUpdateCTypeRejectD365: string;
    BAUpdateCTypeBSO: string;
    BAUpdateWTypeD365: string;
    BAUpdateWTypeBSO: string;
    BAUpdateUTypeD365: string;
    BAUpdateUTypeBSO: string;
    BAUpdateVTypeD365: string;
    BAUpdateVTypeBSO: string;
    BAUpdateZTypeD365: string;
    BAUpdateZTypeBSO: string;

    //Contact Role
    CRCreateD365: string;
    CRCreateBSO: string;
    CRUpdateD365: string;
    CRUpdateBSO: string;
    CRDeleteD365: string;
    CRDeleteBSO: string;

    //Partner Functions Customer
    PFCreateDirectD365: string;
    PFCreateDirectBSO: string;
    PFCreateInDirectD365: string;
    PFCreateInDirectBSO: string;
    PFDeleteDirectD365: string;
    PFDeleteDirectBSO: string;
    PFDeleteInDirectD365: string;
    PFDeleteInDirectBSO: string;
    PFUpdateDirectD365: string;
    PFUpdateDirectBSO: string;
    PFUpdateInDirectD365: string;
    PFUpdateInDirectBSO: string;

    //RTM
    rtmApprovalRejectD365: string;

    //Unloading Points
    UPCreateD365: string;
    UPCreateBSO: string;
    UPUpdateD365: string;
    UPUpdateBSO: string;

    //Update Hierarchy
    updateHierarchyD365: string;
    updateHierarchyBSO: string;

    //Contact Non Web User
    CNWUCreatD365: string;
    CNWUCreateBSO: string;

    //Correspondence Address
    AUCorrespondenceAddrD365: string;
    AUCorrespondenceAddrBSO: string;

    //Cust Grp4
    AUCustGrp4DtoID365: string;
    AUCustGrp4DtoIBSO: string;
    AUCustGrp4ItoDD365: string;
    AUCustGrp4ItoDBSO: string;

    //Long Text
    LTCreateD365: string;
    LTCreateBSO: string;
    LTUpdateD365: string;
    LTUpdateBSO: string;
    LTDeleteD365: string;
    LTDeleteBSO: string;

    //De-Coupling test case ID
    //Customer Marketing Attribute
    CMACreateAPI: string[];
    CMADeleteAPI: string[];
    CMAUpdateAPI: string[];

    //Account update
    AUDeliveryAddressFieldAPI: string[];
    AUGlnAPI: string[];
    AUNameFieldsAPI: string[];
    AUOrderBlockFieldAPI: string[];
    AUTaxVatFieldAPI: string[];

    //BP territory Assignment
    BTACreateAPI: string[];
    BTAUpdateAPI: string[];
    BTADeleteAPI: string[];

    //Business Appointments
    BACreateAPI: string[];
    BADeleteAPI: string[];
    BAUpdateATypeAPI: string[];
    BAUpdateBTypeAPI: string[];
    BAUpdateCTypeAPI: string[];
    BAUpdateWTypeAPI: string[];
    BAUpdateVTypeAPI: string[];
    BAUpdateUTypeAPI: string[];
    BAUpdateZTypeAPI: string[];

    //Contact Role
    CRCreateAPI: string[];
    CRUpdateAPI: string[];
    CRDeleteAPI: string[];

    //Partner Functions Customer
    PFCreateDirectAPI: string[];
    PFCreateInDirectAPI: string[];
    PFDeleteDirectAPI: string[];
    PFDeleteInDirectAPI: string[];
    PFUpdateDirectAPI: string[];
    PFUpdateInDirectAPI: string[];

    //Unloading Points
    UPCreateAPI: string[];
    UPUpdateAPI: string[];

    //Update Hierarchy
    updateHierarchyAPI: string[];

    //Contact Non Web User
    CNWUCreateAPI: string[];

    //Bank Operation Test
    CreateBankD365: string;
    CreateBankBSO: string;
    CreateBankAPI: string;
    DeleteBankD365: string;
    DeleteBankBSO: string;
    DeleteBankAPI: string[];

    //Correspondence Address
    AUCorrespondenceAddrAPI: string[];

    //Cust Grp4
    AUCustGrp4DtoIAPI: string[];
    AUCustGrp4ItoDAPI: string[];

  }


