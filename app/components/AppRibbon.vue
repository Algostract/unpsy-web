<script setup lang="ts">
import banner from '~/assets/images/banner.svg?raw'

// Newest, Treading, Popular
const props = defineProps<{ title: 'new' | null }>()

function paint(type: 'fill' | 'bg'): string {
  let color: 'primary-400' | 'success-400' | 'alert-400'

  if (props.title == null) return ''

  switch (props.title) {
    case 'new':
      color = 'primary-400'
      break
  }

  return `${type}-${color}`
}
</script>

<template>
  <div v-if="title" v-bind="$attrs">
    <div class="font-body flex rotate-180 justify-center text-xs text-black" :class="paint('fill')">
      <div v-html="banner" />
      <span class="mb-[3px] -translate-x-1 -rotate-180 rounded-[4px] px-2 pt-[2px] capitalize leading-[16px]" :class="paint('bg')">
        {{ title }}
      </span>
    </div>
  </div>
</template>

<style scoped>
:root {
  @apply bg-primary-400 fill-primary-400;
}

:root {
  @apply bg-alert-400 fill-alert-400;
}
</style>
