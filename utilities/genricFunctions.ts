/**
 *A function that handles the business role configuration based on the provided role.
 * @param {string} input - the input value present.
 */
export function appendSuffix(input: string): string {
  switch(true) {
    case input.endsWith('_123'):
      return input.replace('_123', '_456')
    case input.endsWith('_456'):
      return input.replace('_456', '_789')
    case input.endsWith('_789'):
      return input.replace('_789', '_123')
    default:
      return input + '_123'
  }
}