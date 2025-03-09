export default defineNuxtRouteMiddleware(() => {
  if (import.meta.server) return

  const authStore = useAuth()
  // const authStore = { isLoggedIn: true }

  if (authStore.isLoggedIn === true) return

  return navigateTo('/', { replace: true })
})
