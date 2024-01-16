
/**
 * Format string to title case
 * @param str string to format
 * @returns formatted string
 */
export const titleCase = (str: string) => {
  return str
    .replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase())
}


/**
 * Escape sanity query string
 * @param str string to escape
 * @returns escaped string
 */
export const escapeQueryString = (str: string): string => {
  const escapedString = (str + '')
    .replace(/&(?!\w+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
  return escapedString
}
