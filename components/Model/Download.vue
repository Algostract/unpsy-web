<script setup lang="ts">
import { type SubscribedScale } from '~/utils/models'

const props = defineProps<{
  isOpen: boolean
  scales: SubscribedScale[] | null
}>()
const emit = defineEmits<{
  (event: 'close'): void
}>()

const selectedScales = ref(new Set<string>([]))

function toggle(scale: string) {
  selectedScales.value.has(scale) ? selectedScales.value.delete(scale) : selectedScales.value.add(scale)
}

function onMassSelect(type: 'select' | 'deselect') {
  if (!props.scales) return
  props.scales.forEach(({ name }) => {
    if (type === 'select') selectedScales.value.add(name)
    else selectedScales.value.delete(name)
  })
}

function onDownload() {
  useTrackEvent('download_templates', {
    scales: Array.from(selectedScales.value.keys()),
  })

  for (const scale of Array.from(selectedScales.value.keys())) {
    const link = document.createElement('a')

    link.href = `/template/${scale}.pdf`
    link.download = `${scale}.pdf`

    link.click()
  }
}

function onClose() {
  useTrackEvent('model_download_close')

  emit('close')
}
</script>

<template>
  <ModelBase id="download" :is-open="isOpen" class="grid h-[375px] w-[500px] grid-cols-[repeat(2,auto)] grid-rows-[repeat(3,auto)] gap-6 text-black dark:text-white" @close="onClose">
    <h6 class="col-start-1 row-start-1 text-lg">Choose Scales to Download</h6>
    <div class="col-start-1 row-start-2 flex flex-wrap gap-3">
      <BaseChips v-for="{ name } in scales" :title="name" class="cursor-pointer !px-4 !py-1" :class="{ 'bg-primary-400': selectedScales.has(name) }" @click="toggle(name)" />
    </div>
    <div class="relative col-start-2 row-start-2 flex flex-col gap-3">
      <BaseButton size="M" :rounded="true" title="Select All" class="!w-full !py-1" @click="onMassSelect('select')" />
      <BaseButton size="M" :rounded="true" title="Deselect All" class="!w-full !bg-dark-400 !py-1" @click="onMassSelect('deselect')" />
    </div>
    <BaseButton size="M" :rounded="true" title="Download" class="col-start-2 row-start-3 h-fit self-end justify-self-end !py-1" @click="onDownload" />
  </ModelBase>
</template>
