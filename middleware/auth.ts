import { useAuth } from '~~/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server) return

  const authStore = useAuth()
  // const authStore = { isLoggedIn: true }

  if (authStore.isLoggedIn === true) return

  return navigateTo('/', { replace: true })
})
