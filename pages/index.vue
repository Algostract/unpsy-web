<script setup lang="ts">
useHead({
  title: '',
})
</script>

<template>
  <main class="relative flex justify-between items-center mx-4 xl:mx-auto max-w-[1216px] min-h-[calc(100vh-7rem)]">
    <section class="flex flex-col gap-9">
      <h6 class="rounded-full px-4 py-3 border border-primary-500 w-fit text-sm font-head">
        Created by Psychologist for Psychologist
      </h6>
      <h1 class="text-5xl font-head">Calculator for <br /> Psychologist</h1>
      <h3 class="text-lg opacity-80 max-w-[34rem] font-head">
        The best way calculate scales, create and manage reports, track patients history and many more.
      </h3>
      <NuxtLink to="/dashboard" class="rounded-full px-6 py-3 w-fit bg-primary-500 hover:bg-primary-400 duration-300">
        Get Started
      </NuxtLink>
    </section>
    <section class="">
      <NuxtPicture src="/images/grid.svg" class="absolute top-0 left-[10%] -z-50 object-cover opacity-20">
        <source media="(min-width: 1024px)" src="/images/grid.svg" />
        <source media="(min-width: 768px)" src="/images/grid.svg" />
        <source media="(min-width: 100px)" src="/images/grid.svg" />
      </NuxtPicture>
      <img src="/images/hero-image.png"
        class="absolute -top-24 bottom-0 object-cover -right-[5.625rem] h-screen -z-50" />
    </section>
  </main>
</template>