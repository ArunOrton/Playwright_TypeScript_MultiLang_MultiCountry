import { APIRequestContext, APIResponse } from '@playwright/test'

export class ApiUtils {
  private request: APIRequestContext

  /**
   *Creates an instance of ApiHelper.
   * @param {APIRequestContext} request - The Playwright API request context used to send HTTP requests.
   */
  constructor(request: APIRequestContext) {
    this.request = request
  }

  // Optional: create custom headers
  /**
   *
   */
  async getHeaders(): Promise<Record<string, string>> {
    return {
      'Content-Type': 'application/json',
      // Add auth tokens or other headers here if needed
    }
  }

  /**
   * Sends a POST request to the given URL with the specified payload and headers.
   * @param {string} url - The endpoint URL to which the POST request is sent.
   * @param {any} payload - The request body to be sent.
   * @param {string} headers - Headers to be included in the request.
   */
  async sendPostRequest(url: string, payload: any, headers: Record<string, string>): Promise<APIResponse> {
    const response = await this.request.post(url, {
      data: payload,
      headers,
    })
    return response
  }

  /**
   *
   * @param {string} url - The endpoint URL to which the POST request is sent.
   * @param {string} headers - Headers to be included in the request.
   */
  async sendGetRequest(url: string, headers: Record<string, string>): Promise<APIResponse> {
    const response = await this.request.get(url, {
      headers,
    })
    return response
  }

  /**
   * Validates whether the response status code matches the expected one.
   * Logs the result to the console.
   * @param {APIResponse} response - The API response to validate.
   * @param {number} expectedStatusCode - The expected HTTP status code.
   */
  validateResponse(response: APIResponse, expectedStatusCode: number): boolean {
    const status = response.status()
    if(status === expectedStatusCode) {
      console.log('Response validated successfully.')
      return true
    } else {
      console.error(`Expected status ${expectedStatusCode}, but received ${status}`)
      return false
    }
  }

  /**
   * Prints attributes from the API response payload for debugging or logging.
   * @param {any} attributes - An array of attributes to be logged to the console.
   */
  async printAttributes(attributes: any[]) {
    for(const attr of attributes) {
      const displayName = attr.DisplayName
      const newVal = attr.NewValue?.Value ?? ''
      const oldVal = attr.OldValue?.Value ?? ''
      console.log(`${displayName} : '${oldVal}'\t'${newVal}'`)
    }
  }
}