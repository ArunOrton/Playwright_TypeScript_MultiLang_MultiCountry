const clusters = {
  cluster1: new Set(['Romania', 'Croatia', 'Slovenia', 'Moldova', 'Bulgaria', 'Slovakia', 'Czech_Republic', 'Austria', 'Poland', 'Cyprus', 'Greece', 'Hungary', 'Italy']),
  cluster2: new Set(['Bosnia_and_Herzegovina', 'Switzerland', 'Northern_Ireland', 'Republic_Of_Ireland', 'Armenia', 'North_Macedonia', 'Nigeria', 'Ukraine', 'Latvia', 'Lithuania', 'Estonia', 'Kosovo', 'Montenegro', 'Serbia']),
}

/**
   *
   */
export async function findCluster(): Promise<string> {
  const value = process.env.COUNTRY as string
  for(const [clusterName, values] of Object.entries(clusters)) {
    if(values.has(value)) {
      return clusterName
    }
  }
  throw new Error('SAP Cluster value not found. The country name might not match any cluster record.')
}
