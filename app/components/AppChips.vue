<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <span class="h-fit w-fit rounded-full bg-light-400 px-3 py-1 text-[14px] text-black transition-colors hover:!bg-primary-500 hover:text-white dark:bg-dark-400 dark:text-white">
    {{ title }}
  </span>
</template>
