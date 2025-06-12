<script setup lang="ts">
const mobileMenuOpen = ref(false)

function toggleMobileMenu(value?: boolean) {
  mobileMenuOpen.value = value === undefined ? !mobileMenuOpen.value : value
}
</script>

<template>
  <header class="absolute left-0 right-0 top-4 mx-auto max-w-[90rem] fill-black px-4 text-black dark:fill-white dark:text-white md:px-16">
    <nav class="relative z-20 grid grid-cols-3 items-center">
      <NuxtLink to="/" class="size-fit" aria-label="home">
        <NuxtIcon name="local:logo" class="hidden fill-primary-500 text-[64px] dark:inline md:text-[96px]" />
        <NuxtIcon name="local:logo" class="inline fill-primary-500 text-[64px] dark:hidden md:text-[96px]" />
      </NuxtLink>
      <SiteNavbar :is-open="mobileMenuOpen" @close="toggleMobileMenu(false)" />
      <div class="col-start-3 justify-self-end">
        <button aria-label="menu" class="p-4 focus:outline-none md:hidden" @click="toggleMobileMenu(true)">
          <NuxtIcon name="local:hamburger" class="text-[32px]" />
        </button>
        <LazyButtonColorMode hydrate-on-visible class="hidden md:block" />
      </div>
    </nav>
  </header>
</template>
