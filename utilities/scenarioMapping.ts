export interface IScenarioData {
  accountGroup: string;
  salesArea: string;
}

export const ScenarioMapping: Record<string, IScenarioData> = {
  CreateCRWithDistributionStep: {
    accountGroup: '9034',
    salesArea: 'Direct Outlet'
  },
  CreateCRDirectly: {
    accountGroup: '9034',
    salesArea: 'Direct Outlet'
  },
  CreateCRIndirectInMdg: {
    accountGroup: '9034',
    salesArea: 'Indirect Outlet'
  },
  CreateCrVendingWithDistributionStep: {
    accountGroup: '7334',
    salesArea: 'Direct Outlet'
  },
  CreateCrDtsInMdg: {
    accountGroup: '9012',
    salesArea: 'Direct Triang. Sales'
  },
  default: {
    accountGroup: '0000',
    salesArea: 'NA'
  }
}
