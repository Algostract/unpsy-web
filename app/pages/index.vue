<script setup lang="ts">
const title = `Psychological Assessment Toolkit`
const description = `A psychoanalytical web tool for diverse assessments and automatic analysis with a built-in scanner. 
It includes various assessments scales like EPQ, MACI, MCMI, TCI, JEPQ.`
const {
  public: { siteUrl },
} = useRuntimeConfig()
const imageUrl = `${siteUrl}/previews/landing.webp`

useSeoMeta({
  title: title,
  ogTitle: title,
  twitterTitle: title,
  description: description,
  ogDescription: description,
  twitterDescription: description,
  ogImage: imageUrl,
  twitterImage: imageUrl,
  ogUrl: siteUrl,
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [{ name: 'Home', item: '/' }],
  }),
])
</script>

<template>
  <main class="flex h-screen w-screen flex-col-reverse items-center justify-center md:flex-row">
    <section class="flex flex-col gap-6 p-4 md:ml-12 md:gap-8">
      <h6 class="w-fit rounded-full border border-primary-500 px-4 py-3 text-sm">Created by Psychologist for Psychologist</h6>
      <h1 class="whitespace-nowrap text-3xl md:text-5xl">
        Calculator for <br />
        Psychologist
      </h1>
      <h3 class="max-w-[34rem] text-base !leading-normal md:text-lg">The best way calculate scales, create and manage reports, track patients history and many more.</h3>

      <ButtonCTA title="Get Started" to="/dashboard" />
    </section>
    <section class="relative w-full flex-grow overflow-hidden md:h-screen">
      <NuxtPicture src="/images/grid.svg" class="absolute right-0 top-0 object-cover opacity-20">
        <source media="(min-width: 1024px)" src="/images/grid.svg" />
        <source media="(min-width: 768px)" src="/images/grid.svg" />
        <source media="(min-width: 100px)" src="/images/grid.svg" />
      </NuxtPicture>
      <NuxtImg src="/images/hero-image.png" alt="hero-image" width="100%" height="100%" class="ml-auto object-cover md:h-full" />
    </section>
  </main>
</template>
