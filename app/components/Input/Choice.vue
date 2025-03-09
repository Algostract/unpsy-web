<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    options: { name: string; value: boolean | number }[]
    index?: number
    value?: boolean | number
    isSelected?: boolean
    isInvalid?: boolean
  }>(),
  {
    index: undefined,
    value: undefined,
    isSelected: false,
    isInvalid: false,
  }
)
const emit = defineEmits<{
  (event: 'update', value: boolean | number): void
}>()

const selectedChoice = computed(() => props.value)
</script>

<template>
  <div class="w-max text-white">
    <label
      v-if="index !== undefined"
      class="inline-flex w-[50px] justify-center rounded-full py-1"
      :class="
        isInvalid && selectedChoice === undefined
          ? 'bg-alert-500'
          : isSelected
            ? 'bg-primary-500'
            : selectedChoice !== undefined
              ? 'bg-success-500'
              : 'bg-white text-black dark:bg-black dark:text-white'
      ">
      {{ index }}
    </label>
    <div class="ml-2 inline-flex gap-[6px]" :class="{ 'flex-row-reverse': options.length === 2 }">
      <span
        v-for="{ name, value } in options"
        :key="name"
        class="inline-flex cursor-pointer justify-center rounded-full px-3 py-1"
        :class="[selectedChoice == value ? 'bg-primary-500' : 'bg-white text-black dark:bg-black dark:text-white', { 'w-[66px]': options.length === 2 }, { 'w-[36px]': options.length === 5 }]"
        @click="emit('update', value)">
        <label for="false" class="cursor-pointer capitalize">{{ name }}</label>
      </span>
    </div>
  </div>
</template>
