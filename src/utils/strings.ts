
/**
 * Format string to title case
 * @param str string to format
 * @returns formatted string
 */
export const titleCase = (str: string) => {
  return str
    .replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase())
}
