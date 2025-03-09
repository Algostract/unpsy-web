export default function (str: string | null) {
  let result = ''
  if (str === null) return null

  for (const word of str.split(' ')) {
    result += ' ' + word.charAt(0).toUpperCase() + word.slice(1)
  }

  return result.slice(1)
}
