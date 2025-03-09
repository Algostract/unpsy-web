<script setup lang="ts">
useHead({
  title: '',
})

const title = `Psychological Assessment Toolkit`
const description = `A psychoanalytical web tool for diverse assessments and automatic analysis with a built-in scanner. 
It includes various assessments scales like EPQ, MACI, MCMI, TCI, JEPQ.`
const url = 'https://psy.monalisa-bairagi.com'

useSeoMeta({
  title: title,
  ogTitle: title,
  description: description,
  ogDescription: description,
  ogImage: url + '/previews/landing.webp',
  ogUrl: url,
})
</script>

<template>
  <main class="relative mx-4 flex min-h-[calc(100vh-7rem)] max-w-[1216px] items-center justify-between xl:mx-auto">
    <section class="flex flex-col gap-9">
      <h6 class="w-fit rounded-full border border-primary-500 px-4 py-3 font-head text-sm">Created by Psychologist for Psychologist</h6>
      <h1 class="font-head text-5xl">
        Calculator for <br />
        Psychologist
      </h1>
      <h3 class="max-w-[34rem] font-head text-lg opacity-80">The best way calculate scales, create and manage reports, track patients history and many more.</h3>
      <NuxtLink to="/dashboard" class="w-fit rounded-full bg-primary-500 px-6 py-3 duration-300 hover:bg-primary-400"> Get Started </NuxtLink>
    </section>
    <section class="">
      <NuxtPicture src="/images/grid.svg" class="absolute left-[10%] top-0 -z-50 object-cover opacity-20">
        <source media="(min-width: 1024px)" src="/images/grid.svg" />
        <source media="(min-width: 768px)" src="/images/grid.svg" />
        <source media="(min-width: 100px)" src="/images/grid.svg" />
      </NuxtPicture>
      <img src="/images/hero-image.png" class="absolute -right-[5.625rem] -top-24 bottom-0 -z-50 h-screen object-cover" />
    </section>
  </main>
</template>
