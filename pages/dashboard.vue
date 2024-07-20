<script setup lang="ts">
import { type Options, Splide, SplideTrack, SplideSlide } from '@splidejs/vue-splide'
import { Grid } from '@splidejs/splide-extension-grid'
import { useUser } from '~/stores/user'

definePageMeta({
  middleware: 'auth',
  layout: 'panel',
})
useHead({
  title: 'Dashboard',
})

const title = `Psychological Assessment Toolkit - Dashboard`
const description = `A psychoanalytical web tool for diverse assessments and automatic analysis with a built-in scanner. 
It includes various assessments scales like EPQ, MACI, MCMI, TCI, JEPQ.`
const url = 'https://psy.monalisa-bairagi.com'

useSeoMeta({
  title: title,
  ogTitle: title,
  description: description,
  ogDescription: description,
  ogImage: url + '/previews/dashboard.webp',
  ogUrl: url + '/dashboard',
})

const splideOption: Options = {
  arrows: true,
  pagination: true,
  gap: '1rem',
  classes: {
    pagination: 'pagination',
    page: 'pagination-page',
  },
  grid: {
    rows: 2,
    cols: 4,
    gap: {
      row: '0.75rem',
      col: '0.75rem',
    },
  },
  breakpoints: {
    1280: {
      grid: {
        cols: 3,
      },
    },
    1120: {
      grid: {
        cols: 2,
      },
    },
    1024: {
      grid: {
        cols: 3,
      },
    },
    960: {
      grid: {
        cols: 2,
      },
    },
    690: {
      grid: {
        cols: 1,
      },
    },
  },
}
// const splide = ref()
const userStore = useUser()

const { pending, error, data: scales } = useFetch('/api/scale', { method: 'GET' })

const selectedScaleName = ref<string | null>(null)
const selectedScale = computed(() => (selectedScaleName.value ? scales.value?.find(({ name }) => name === selectedScaleName.value) : undefined))

const openedModel = ref<'scale' | 'payment' | 'feedback' | null>(null)
</script>

<template>
  <main class="relative flex flex-col">
    <!-- <section class="w-full h-5 bg-alert-400">Name: `{{ userStore.name }}`</section> -->
    <section class="relative">
      <h2 class="mb-3 text-lg md:mb-2">Tests</h2>
      <div v-if="pending" class="relative flex h-[75vh] items-center justify-center gap-2">
        <NuxtIcon name="loader" class="text-[24px]" />
        Loading
      </div>
      <div v-else-if="error" class="relative flex h-[75vh] items-center justify-center">
        {{ error }}
      </div>
      <Splide v-else ref="splide" :options="splideOption" tag="div" :has-track="false" :extensions="{ Grid }">
        <SplideTrack>
          <SplideSlide v-for="{ name, type, count, subScales, updatedAt, publishedAt } in scales" :key="name" class="">
            <CardScale
              :name="name"
              :type="type"
              :count="count"
              :sub-scales="subScales"
              :updated-at="updatedAt"
              :published-at="publishedAt"
              @open-test="
                () => {
                  selectedScaleName = name
                  openedModel = 'scale'
                }
              "
              @open-payment="
                () => {
                  selectedScaleName = name
                  openedModel = 'payment'
                }
              " />
          </SplideSlide>
        </SplideTrack>
        <div class="splide__arrows ml-auto mt-4 flex w-16 justify-between">
          <button class="splide__arrow splide__arrow--prev">
            <NuxtIcon name="chevron-bold" />
          </button>
          <button class="splide__arrow splide__arrow--next rotate-180 transform">
            <NuxtIcon name="chevron-bold" />
          </button>
        </div>
      </Splide>
    </section>
    <ModelScale
      v-if="openedModel === 'scale' && selectedScale"
      :is-open="openedModel === 'scale'"
      :name="selectedScale.name"
      :type="selectedScale.type"
      :count="selectedScale.count"
      :options="selectedScale.options"
      @close="
        () => {
          selectedScaleName = null
          openedModel = null
        }
      " />
    <ModelPayment
      v-else-if="openedModel === 'payment' && selectedScale"
      :is-open="openedModel === 'payment'"
      :scales="scales ?? []"
      :selected-scale="selectedScale.name"
      @close="
        () => {
          selectedScaleName = null
          openedModel = null
        }
      " />
  </main>
</template>

<style scoped>
:deep(.pagination) {
  @apply absolute bottom-1 right-6 flex h-[10px] gap-1;
}

:deep(.pagination) > li {
  @apply flex items-center justify-center;
}

:deep(.pagination-page) {
  /* drop-shadow-[0_0px_2px_rgba(0,0,0,0.5)] */
  @apply h-[6px] w-[6px] rounded-full bg-white transition-colors duration-300;
}

:deep(.pagination-page.is-active) {
  /* drop-shadow-[0_0px_4px_rgba(37,99,235,0.2)] */
  @apply h-[10px] w-[10px] bg-primary-500;
}
</style>
