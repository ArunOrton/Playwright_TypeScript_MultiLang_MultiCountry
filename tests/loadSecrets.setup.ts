import { test as setup } from '@playwright/test'
import { SecretLoader } from "../utilities/secretLoader"

setup('Call List - Fetch Secrets', async () => {
  if (process.env.AKV_PIPPELINE_FLAG?.toLowerCase() === 'true') {
    console.log(" 🔁  Connecting to Azure Key Vault to load secrets from pipeline task AzureKeyVault@2...")
  } else {
    console.log(" 🔁  Connecting to Azure Key Vault to load secrets from Playwright...")
    const loader = new SecretLoader(`${process.env.AZURE_KEY_VAULT_NAME}`)
    await loader.loadSecrets([
      "usernameKey",
      "passwordKey",
      "SAD365UITEST1username",
      "SAD365UITEST1password",
      "SAD365UITEST2username",
      "SAD365UITEST2password"
    ])
    console.log("Secrets loaded successfully.")
  }
})