// utils/numberUtils.ts

/**
 * Converts number words (e.g. "one", "two") to their corresponding digit strings.
 * Returns the same value if no mapping exists.
 * @param {string} wordOrNumber - The number word or digit string to convert.
 */
export function convertNumberWordToDigit(wordOrNumber?: string): string | undefined {
  if(!wordOrNumber) { return undefined }

  const numberMap: Record<string, string> = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
    ten: '10',
    eleven: '11',
    twelve: '12',
    thirteen: '13',
    fourteen: '14',
    fifteen: '15',
    sixteen: '16',
    seventeen: '17',
    eighteen: '18',
    nineteen: '19',
    twenty: '20',
  }

  return numberMap[wordOrNumber.toLowerCase()] || wordOrNumber
}
