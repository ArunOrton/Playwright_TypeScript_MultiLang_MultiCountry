export class CustomNumeric {

  static readonly ZERO = 0
  static readonly ONE = 1
  static readonly TWO = 2
  static readonly ELEVEN = 11
  static readonly TWELVE = 12

  static readonly WIDTH = 1522
  static readonly HEIGHT = 744

}
/**
 *
 * @param {number} length - The length of the random number string to generate.
 */
export async function generateRandomNumberString(length: number = 5): Promise<string> {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('')
}
/**
 *
 * @param {string} input - A string representing a numeric value to be incremented.
 */
export async function incrementStringNumber(input: string):Promise<string > {
  // Convert string to number, add 1, then pad with leading zeros
  const incrementedValue = (BigInt(input) + BigInt(1)).toString()
  return input.slice(0, -incrementedValue.length) + incrementedValue
}

/**
 *
 * @param {string} postalCode - A string representing a postal code.
 */
export async function incrementLastDigit(postalCode: string): Promise<string> {
  let digits = postalCode.split('') // Convert string to array
  for(let i = digits.length - 1; i >= 0; i--) {
    if(/\d/.test(digits[i])) { // Find the last numeric digit
      if(digits[i] === '9') {
        digits[i] = '0' // Carry over the increment
      } else {
        digits[i] = String(Number(digits[i]) + 1)
        return digits.join('') // Return after first increment
      }
    }
  }
  return digits.join('')
}

