<script setup lang="ts">
import { Grid } from '@splidejs/splide-extension-grid'

const title = `Dashboard`
const description = `A psychoanalytical web tool for diverse assessments and automatic analysis with a built-in scanner. 
It includes various assessments scales like EPQ, MACI, MCMI, TCI, JEPQ.`
const {
  public: { siteUrl },
} = useRuntimeConfig()
const imageUrl = `${siteUrl}/previews/dashboard.webp`

definePageMeta({
  // middleware: 'auth',
  layout: 'app',
})

useSeoMeta({
  title: title,
  ogTitle: title,
  twitterTitle: title,
  description: description,
  ogDescription: description,
  twitterDescription: description,
  ogImage: imageUrl,
  twitterImage: imageUrl,
  ogUrl: `${siteUrl}/dashboard`,
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [{ name: 'Dashboard', item: '/dashboard' }],
  }),
])

const splideOption = {
  pagination: true,
  arrows: true,
  gap: '1rem',
  padding: 0,
  classes: {
    pagination: 'pagination',
    page: 'pagination-page',
  },
  grid: {
    rows: 2,
    cols: 1,
    gap: {
      row: '0.75rem',
      col: '0.75rem',
    },
  },
  mediaQuery: 'min',
  breakpoints: {
    768: {
      grid: {
        rows: 2,
        cols: 2,
      },
    },
    1280: {
      grid: {
        rows: 2,
        cols: 3,
      },
    },
  },
}

// pending, error,
const { data: scales } = useFetch('/api/scale', { method: 'GET' })

const selectedScaleName = ref<string | null>(null)
const selectedScale = computed(() => (selectedScaleName.value ? scales.value?.find(({ name }) => name === selectedScaleName.value) : undefined))

const openedModel = ref<'scale' | 'payment' | 'feedback' | null>(null)
</script>

<template>
  <section class="relative flex flex-col">
    <Splide :options="splideOption" tag="div" :has-track="false" :extensions="{ Grid }">
      <SplideTrack class="py-2">
        <SplideSlide v-for="{ name, type, count, subScales, updatedAt, publishedAt } in scales" :key="name">
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
      <div class="splide__arrows ml-auto mt-4 flex w-16 justify-between bg-alert-600">
        <button class="splide__arrow splide__arrow--prev">
          <NuxtIcon name="local:chevron-bold" />
        </button>
        <button class="splide__arrow splide__arrow--next relative">
          <NuxtIcon name="local:chevron-bold" />
        </button>
      </div>
    </Splide>
    <ModalScale
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
  </section>
</template>

<style scoped>
/* :deep(.pagination) {
  @apply absolute bottom-1 right-6 flex h-[10px] gap-1;
}

:deep(.pagination)>li {
  @apply flex items-center justify-center;
}

:deep(.pagination-page) {
  @apply h-[6px] w-[6px] rounded-full bg-white transition-colors duration-300;
}

:deep(.pagination-page.is-active) {
  @apply h-[10px] w-[10px] bg-primary-500;
} */
</style>
