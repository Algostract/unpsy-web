import type { NitroFetchRequest, TypedInternalResponse } from 'nitropack'
import type { FetchOptions } from 'ofetch'
import { ofetch } from 'ofetch'

export const $fetchAPI = <T = unknown, R extends NitroFetchRequest = NitroFetchRequest>(request: R, opts?: FetchOptions | undefined): Promise<TypedInternalResponse<R, T>> => {
  const config = useRuntimeConfig()
  const authStore = useAuth()
  const baseURL = config.public.apiUrl

  const customFetch = ofetch.create({
    baseURL: baseURL,
    headers: { Authorization: `Bearer ${authStore.getToken('access')}` },
    async onRequest({ request, options }) {
      console.log('Intercepted API', request)

      if (!authStore.getToken('access')) {
        console.log({ accessToken: authStore.getToken('access') })
        throw createError({ message: 'No Access Token Found' })
      }
      // check access token is expired
      try {
        parseJwt(authStore.getToken('access'))
      } catch {
        await authStore.updateToken()
        // @ts-expect-error add authorization token
        options.headers['Authorization'] = `Bearer ${authStore.getToken('access')}`
      }
    },
  })

  // @ts-expect-error export customFetch
  return customFetch(request, opts) as Promise<TypedInternalResponse<R, T>>
}

export const $fetchAuth = <T = unknown, R extends NitroFetchRequest = NitroFetchRequest>(request: R, opts?: FetchOptions | undefined): Promise<TypedInternalResponse<R, T>> => {
  const config = useRuntimeConfig()
  const authStore = useAuth()
  const baseURL = config.public.authUrl

  const customFetch = ofetch.create({
    baseURL: baseURL,
    onRequest({ request, options }) {
      console.log('Intercepted API', request)

      if (authStore.getToken('auth')) options.headers.set('Authorization', `Bearer ${authStore.getToken('auth')}`)
    },
  })

  return customFetch(request, opts) as Promise<TypedInternalResponse<R, T>>
}
