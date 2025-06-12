<script setup lang="ts">
const { proxy: gaProxy } = useScriptGoogleAnalytics()

const isModelContactOpen = useState<boolean>('isModelContactOpen', () => false)

function onContact(action: boolean) {
  if (action) {
    isModelContactOpen.value = true
    gaProxy.gtag('event', 'contact_open')
  } else {
    isModelContactOpen.value = false
    gaProxy.gtag('event', 'contact_close')
  }
}
</script>

<template>
  <div>
    <LazySiteHeader hydrate-on-idle />
    <main class="relative mx-auto flex min-h-screen max-w-[90rem] flex-col gap-4 overflow-hidden px-2 md:mb-8 md:px-4">
      <slot />
      <LazySiteFooter hydrate-on-visible @contact="onContact(true)" />
      <LazyModalContact v-show="isModelContactOpen" hydrate-on-visible :is-open="isModelContactOpen" @close="onContact(false)" />
    </main>
  </div>
</template>
