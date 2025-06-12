<script setup lang="ts">
// const { proxy: gaProxy } = useScriptGoogleAnalytics()
const { loggedIn, user } = useUserSession()

const userFirstName = computed(() => user.value && user.value.name.split(' ')[0])
</script>

<template>
  <main v-if="loggedIn && user" class="grid h-screen w-screen grid-cols-[min-content_1fr] grid-rows-[min-content_1fr_min-content]">
    <AppNavbar class="col-span-full col-start-1 row-span-1 row-start-3 md:col-span-1 md:row-span-full md:row-start-1" />
    <section class="col-start-2 row-start-1 flex items-center justify-between gap-4 p-4">
      <div class="mr-auto" />
      <span>Hi {{ userFirstName }}</span>
      <img :src="user.avatar" :alt="`${userFirstName} avatar`" width="48px" height="48px" fit="cover" class="rounded-full" />
    </section>
    <section class="relative col-start-2 row-start-2 flex-grow overflow-y-auto px-4 py-8 sm:pl-0">
      <slot />
    </section>
  </main>
  <main v-else class="flex h-screen w-screen items-center justify-center">
    <section class="flex aspect-square w-full max-w-md flex-col items-center justify-between rounded-md bg-light-500 p-6 dark:bg-dark-500">
      <h1 class="text-lg">Login to continue</h1>
      <div class="mx-auto hidden w-fit items-center justify-center fill-primary-500 text-primary-500 sm:flex">
        <NuxtIcon name="local:logo" class="text-[96px]" />
        <h1 class="font-sub text-[56px] uppercase">Unpsy</h1>
      </div>
      <NuxtLink to="/auth/google" external class="inline-flex items-center justify-center gap-2 rounded-full bg-white/20 px-2.5 py-2 hover:bg-white/30">
        <NuxtIcon name="devicon:google" class="text-[20px]" />
        Continue with Google
      </NuxtLink>
    </section>
  </main>
</template>
