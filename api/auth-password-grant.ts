import { request } from '@playwright/test'
import * as dotenv from 'dotenv'


dotenv.config()

/**
 * Retrieves a Bearer token using Resource Owner Password Credentials (ROPC) flow.
 * @param {object} countryBDUser - Object containing user and auth configuration.
 * @param {string} countryBDUser.uat2Url - The token endpoint URL for UAT2.
 * @param {string} countryBDUser.username - The username for authentication.
 * @param {string} countryBDUser.password - The password for authentication.
 * @param {string} countryBDUser.clientId - The client ID registered in Azure AD.
 * @param {string} countryBDUser.tenantId - The Azure AD tenant ID.
 */
export async function getBearerTokenWithPassword(
  countryBDUser: { uat2Url: string; username: string; password: string;  clientId: string;  tenantId: string; }
): Promise<string> {



  const tokenUrl = `https://login.microsoftonline.com/${countryBDUser.tenantId}/oauth2/token`

  const requestContext = await request.newContext()

  const response = await requestContext.post(tokenUrl, {
    form: {
      grant_type: 'password',
      client_id: countryBDUser.clientId || '',
      username: countryBDUser.username || '',
      password: countryBDUser.password || '',
      resource: countryBDUser.uat2Url || ''
    }
  })

  if(!response.ok()) {
    const errorText = await response.text()
    throw new Error(`Token request failed: ${response.status()} ${errorText}`)
  }

  const data = await response.json()
  return data.access_token
}
