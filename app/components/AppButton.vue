<script setup lang="ts">
withDefaults(
  defineProps<{
    icon?: string
    title?: string
    size?: 'XS' | 'S' | 'M' | 'L'
    rounded?: boolean
    to?: string
    isLoading?: boolean
  }>(),
  {
    icon: undefined,
    title: undefined,
    size: 'M',
    rounded: true,
    to: undefined,
    isLoading: false,
  }
)
</script>

<template>
  <!-- Icon button -->
  <button
    v-if="icon && !title && size === 'L' && !to"
    class="cursor-pointer rounded-full bg-primary-500 fill-white p-[5px] text-white transition-colors duration-200 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    <NuxtIcon :name="isLoading ? 'local:loader' : icon" class="text-[30px]" />
  </button>
  <NuxtLink
    v-else-if="icon && !title && size === 'L' && to"
    class="cursor-pointer rounded-full bg-primary-500 fill-white p-[5px] text-white transition-colors duration-200 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    :to="to"
    v-bind="$attrs">
    <NuxtIcon :name="isLoading ? 'local:loader' : icon" class="text-[30px]" />
  </NuxtLink>
  <button
    v-else-if="icon && !title && size === 'M' && !to"
    class="cursor-pointer rounded-full bg-primary-500 fill-white p-1 text-white transition-colors duration-200 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    <NuxtIcon :name="isLoading ? 'local:loader' : icon" class="text-[24px]" />
  </button>
  <NuxtLink
    v-else-if="icon && !title && size === 'M' && to"
    class="cursor-pointer rounded-full bg-primary-500 fill-white p-1 text-white transition-colors duration-200 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    :to="to"
    v-bind="$attrs">
    <NuxtIcon :name="isLoading ? 'local:loader' : icon" class="text-[24px]" />
  </NuxtLink>
  <button
    v-else-if="icon && !title && size === 'S' && !to"
    class="cursor-pointer rounded-full bg-primary-500 fill-white p-[3px] text-white transition-colors duration-200 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    <NuxtIcon :name="isLoading ? 'local:loader' : icon" class="text-[18px]" />
  </button>
  <NuxtLink
    v-else-if="icon && !title && size === 'S' && to"
    class="cursor-pointer rounded-full bg-primary-500 fill-white p-[3px] text-white transition-colors duration-200 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    :to="to"
    v-bind="$attrs">
    <NuxtIcon :name="isLoading ? 'local:loader' : icon" class="text-[18px]" />
  </NuxtLink>
  <!-- IconLabel button -->
  <button
    v-else-if="icon && title && size === 'L' && !to"
    class="font-head flex w-fit cursor-pointer items-center gap-2 rounded-full bg-primary-500 fill-white py-2 pl-[18px] pr-6 text-xl text-white transition-colors duration-200 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    <NuxtIcon :name="isLoading ? 'local:loader' : icon" class="font-body mr-2 text-[30px]" />
    {{ title }}
  </button>
  <NuxtLink
    v-else-if="icon && title && size === 'L' && to"
    :to="to"
    class="font-head flex w-fit cursor-pointer items-center gap-2 rounded-full bg-primary-500 fill-white py-2 pl-[18px] pr-6 text-xl text-white transition-colors duration-200 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    <NuxtIcon :name="isLoading ? 'local:loader' : icon" class="mr-2 text-[30px]" />
    {{ title }}
  </NuxtLink>
  <button
    v-else-if="icon && title && size === 'M' && !to"
    class="font-head flex w-fit cursor-pointer items-center gap-2 rounded-full bg-primary-500 fill-white py-2 pl-4 pr-6 text-center text-lg text-white transition-colors duration-200 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black md:gap-0 md:text-base"
    v-bind="$attrs">
    <NuxtIcon :name="isLoading ? 'local:loader' : icon" class="mr-2 text-[30px] md:mr-1 md:text-[24px]" />
    {{ title }}
  </button>
  <NuxtLink
    v-else-if="icon && title && size === 'M' && to"
    :to="to"
    class="font-head flex w-fit cursor-pointer items-center gap-2 rounded-full bg-primary-500 fill-white py-2 pl-4 pr-6 text-center text-lg text-white transition-colors duration-200 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    <NuxtIcon :name="isLoading ? 'local:loader' : icon" class="mr-2 text-[30px]" />
    {{ title }}
  </NuxtLink>
  <button
    v-else-if="icon && title && size === 'S'"
    class="flex w-fit cursor-pointer items-center gap-1 rounded-full bg-primary-500 fill-white py-[0.3125rem] pl-[0.625rem] pr-3 text-center text-sm text-white transition-colors duration-200 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    <NuxtIcon :name="isLoading ? 'local:loader' : icon" class="text-[16px]" />
    {{ title }}
  </button>
  <button
    v-else-if="icon && title && size === 'XS' && !to"
    class="flex w-fit cursor-pointer items-center gap-1 rounded-full bg-primary-500 fill-white py-[6px] pl-3 pr-[14px] text-center text-sm text-white transition-colors duration-200 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    <NuxtIcon :name="isLoading ? 'local:loader' : icon" class="text-[16px]" />
    {{ title }}
  </button>
  <NuxtLink
    v-else-if="icon && title && size === 'XS' && to"
    :to="to"
    class="flex w-fit cursor-pointer items-center gap-1 rounded-full bg-primary-500 fill-white py-[6px] pl-3 pr-[14px] text-center text-sm text-white transition-colors duration-200 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    <NuxtIcon :name="isLoading ? 'local:loader' : icon" class="text-[16px]" />
    {{ title }}
  </NuxtLink>
  <!-- Label button -->
  <button
    v-else-if="!icon && title && size === 'L' && !to"
    class="font-head flex w-fit cursor-pointer items-center gap-2 rounded-full bg-primary-500 fill-white px-6 py-2 text-xl text-white transition-colors duration-200 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    <NuxtIcon v-if="isLoading" name="local:loader" class="mr-2 text-[30px]" />
    {{ title }}
  </button>
  <button
    v-else-if="!icon && title && size === 'M' && rounded === true"
    class="flex w-fit cursor-pointer items-center justify-center rounded-full bg-primary-500 fill-white px-6 py-2 text-base text-white transition-colors duration-200 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    <NuxtIcon v-if="isLoading" name="local:loader" class="mr-2 text-[24px]" />
    {{ title }}
  </button>
  <button
    v-else-if="!icon && title && size === 'M' && rounded === false"
    class="flex w-fit cursor-pointer items-center justify-center rounded-[20px] bg-primary-500 fill-white px-6 py-[0.625rem] text-base text-white transition-colors duration-200 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    <NuxtIcon v-if="isLoading" name="local:loader" class="mr-2 text-[24px]" />
    {{ title }}
  </button>
  <button
    v-else-if="!icon && title && size === 'S'"
    class="flex w-fit cursor-pointer items-center justify-center rounded-full bg-primary-500 fill-white px-2 py-[0.3125rem] text-sm text-white transition-colors duration-200 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    <NuxtIcon v-if="isLoading" name="local:loader" class="text-[18px]" />
    {{ title }}
  </button>
</template>
