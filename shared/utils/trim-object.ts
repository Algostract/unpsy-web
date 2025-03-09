export default function <T>(obj: T): T {
  const result = {} as T
  let key: keyof T

  for (key in obj) {
    if (obj[key] !== undefined) {
      result[key] = obj[key]
    }
  }

  return result
}
