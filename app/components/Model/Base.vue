<script setup lang="ts">
withDefaults(defineProps<{ isOpen: boolean; hasCloseOption?: boolean }>(), { hasCloseOption: true })
const emit = defineEmits<{
  (event: 'close'): void
}>()
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center overflow-y-auto bg-black/50">
        <dialog open class="relative h-min max-w-[700px] rounded-xl bg-light-500 p-4 dark:bg-dark-500" v-bind="$attrs">
          <button v-if="hasCloseOption" class="absolute right-4 top-4" @click="emit('close')">
            <NuxtIcon name="cross" class="text-[24px]" />
          </button>
          <slot />
        </dialog>
      </div>
    </Teleport>
  </ClientOnly>
</template>
