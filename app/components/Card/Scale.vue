<script setup lang="ts">
// import { Scale } from 'utils/models';

interface Scale {
  name: string
  type: 'binary' | 'pentanary'
  count: number
  subScales: string[]
  updatedAt: string
  publishedAt: string
}

const props = defineProps<Scale>()
const emit = defineEmits<{
  (event: 'openTest' | 'openPayment'): void
}>()

const { proxy: gaProxy } = useScriptGoogleAnalytics()

const updatedIn = useTimeAgo(() => props.updatedAt, {
  messages: {
    invalid: 'Invalid Date',
    past: (n: unknown): string => ((n as string).match(/\d/) ? `Updated ${n} ago` : (n as string)),
    justNow: 'Just Now',
    future: (n: unknown) => ((n as string).match(/\d/) ? `Next Update In ${n}` : (n as string)),
    year: (n: number) => `${n} year${n > 1 ? 's' : ''}`,
    month: (n: number) => `${n} month${n > 1 ? 's' : ''}`,
    week: (n: number) => `${n} week${n > 1 ? 's' : ''}`,
    day: (n: number) => `${n} day${n > 1 ? 's' : ''}`,
    hour: (n: number) => `${n} hour${n > 1 ? 's' : ''}`,
    minute: (n: number) => `${n} min`,
    second: (n: number) => `${n} sec`,
  },
})

/* function messageColor(date: string | Date | null) {
  if (date === null) return 'text-alert-400'

  if (typeof date === 'string') date = new Date(date)

  const deltaHour = (date.getTime() - new Date().getTime()) / (1000 * 60 * 60)

  if (deltaHour < 24) return 'text-alert-400'
  else if (deltaHour < 72) return 'text-warning-400'
  else return 'text-primary-400'
} */

function onOpenTest() {
  gaProxy.gtag('event', 'model_test_open', {
    scale: props.name,
  })

  emit('openTest')
}

const isRecentlyPublished = computed(() => new Date().getTime() - new Date(props.publishedAt).getTime() < 1000 * 60 * 60 * 24)
</script>

<template>
  <div>
    <div
      class="relative mx-auto grid aspect-square max-h-[300px] w-full min-w-[272px] grid-cols-[repeat(2,auto)] grid-rows-[repeat(2,min-content)_1fr_min-content] gap-y-3 rounded-2xl bg-light-500 p-4 dark:bg-dark-500 md:max-h-[500px] md:max-w-[300px]">
      <!--  <div class="self-start justify-self-end flex gap-2 items-center row-start-1 col-start-2 col-span-1 w-fit h-fit">
        <BaseChips :title="!!expiresAt ? expiresIn : 'Recharge'" :class="messageColor(expiresAt)" class="cursor-pointer"
          @click="emit('openPayment')" />
        <BaseButton icon="flash" :rounded="true" size="S" @click="emit('openPayment')" />
      </div> -->
      <h6 class="col-start-1 h-fit text-lg">{{ name }}</h6>
      <AppRibbon :title="isRecentlyPublished ? 'new' : null" class="absolute -right-[5px] top-14 bg-dark-400" />
      <div class="col-span-2 col-start-1 flex h-fit gap-2 text-xs opacity-50">
        <span>Sub Scales {{ subScales.length }}</span>
        <span>&#x2022;</span>
        <span class="capitalize">{{ type }}</span>
        <span>&#x2022;</span>
        <span>Item {{ count }}</span>
      </div>
      <div class="relative col-span-2 col-start-1 h-full">
        <div class="flex max-h-[128px] flex-wrap gap-2 overflow-y-auto">
          <AppChips v-for="subScale in subScales" :key="subScale" :title="subScale.replaceAll('-', ' ')" class="cursor-text capitalize" />
        </div>
      </div>
      <span class="col-span-2 col-start-1 row-start-4 w-fit self-center text-xs opacity-50">{{ updatedIn }}</span>
      <AppButton class="col-start-2 row-start-4 self-end justify-self-end" size="S" :rounded="true" icon="local:keyboard" title="Start" @click="onOpenTest" />
    </div>
  </div>
</template>
