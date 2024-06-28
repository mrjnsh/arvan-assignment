export function makeHtmlIdCompatible(inputString: string) {
  let cleanString = inputString.replace(/[^a-zA-Z0-9\-_:.]/g, '-')
  if (!/^[a-zA-Z]/.test(cleanString)) {
    cleanString = 'id-' + cleanString
  }

  return cleanString
}
