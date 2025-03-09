export default function (token: string) {
  const base64Url = token.split('.')[1] ?? ''
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )
  const parsedToken = JSON.parse(jsonPayload) as JWTToken

  if (parsedToken.exp * 1000 < new Date().getTime()) throw Error('JWT Expired')

  return parsedToken
}
