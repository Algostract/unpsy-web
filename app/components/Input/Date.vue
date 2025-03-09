<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps<{
  title: string
  name: string
  value?: string
}>()

const { value, errors } = useField(props.name, validateField)

function validateField(value: string) {
  value = value?.trim()

  if (!value) return `${props.title} is required`

  /*   if (!isNaN(Date.parse(value)))
      return "Enter a valid Date"
   */
  return true
}
</script>

<template>
  <div class="flex w-full flex-col gap-2">
    <div
      class="flex h-11 w-full gap-2 rounded-2xl bg-light-400 px-4 py-2 text-sm text-light-500 focus-within:outline focus-within:outline-2 focus-within:outline-primary-400 dark:bg-dark-400 dark:text-light-500/60">
      <NuxtIcon name="cake" class="text-[24px]" />
      <input v-model="value" type="date" :name="name" placeholder="DD-MM-YYYY" v-bind="$attrs" class="w-full bg-transparent outline-none" />
    </div>
    <span v-show="errors.length" class="text-sm font-semi-bold text-alert-500">{{ errors[0] }}</span>
  </div>
</template>
