<script setup lang="ts">
const title = `UnPsy - Psychological Assessment Toolkit`
const description = `A psychoanalytical web tool for diverse assessments and automatic analysis with a built-in scanner. 
It includes various assessments scales like EPQ, MACI, MCMI 3, TCI, JEPQ.`
const {
  public: { siteUrl },
} = useRuntimeConfig()

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
  ],
})

useSeoMeta({
  ogType: 'website',
  ogImageWidth: 1280,
  ogImageHeight: 640,
  fbAppId: 966242223397117,
  twitterCard: 'summary_large_image',
  colorScheme: 'light dark',
  viewport: {
    initialScale: 1.0,
    maximumScale: 1.0,
    minimumScale: 1.0,
    userScalable: 'no',
    viewportFit: 'cover',
  },
})

useSchemaOrg([
  defineWebPage({
    datePublished: new Date(2020, 6, 2).toISOString(),
    dateModified: new Date().toISOString(),
    author: 'Shirsendu Bairagi',
  }),
  defineWebSite({
    url: siteUrl,
    name: title,
    description: description,
  }),
])
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtPwaManifest />
  <NuxtPwaAssets />
  <!-- <NuxtLoadingIndicator /> -->
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <LazyAppInstallPrompt />
</template>

<style>
* {
  -webkit-tap-highlight-color: transparent;
  scrollbar-width: 6px;
  @apply antialiased;
}

*::-webkit-scrollbar {
  @apply block size-[6px] bg-light-400 dark:bg-dark-400;
}

*::-webkit-scrollbar-thumb {
  @apply rounded-md bg-light-600 dark:bg-dark-600;
}

html {
  @apply relative overflow-x-hidden scroll-smooth;
}

body {
  @apply relative min-h-screen overflow-x-hidden bg-light-400 fill-black font-main text-black dark:bg-dark-400 dark:fill-white dark:text-white;
}

svg.iconify--local {
  @apply !m-0 !box-content;
}

.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

.scrollbar-hidden::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
