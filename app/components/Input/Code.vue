<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps<{
  name: string
}>()

const inputs = ref<HTMLInputElement[]>([])
const { prev: focusPrev, next: focusNext, index: currentIndex } = useCycleFocus(inputs, { isLoop: false })
const { current: keypress } = useMagicKeys()

const { value: code } = useField(props.name, validateField, { initialValue: [...Array(6).fill(null)] })

// TODO: Fix detected a possible deep change
function validateField(_value: (number | null)[]) {
  return true
}

function validateBeforeInput(_event: { data: string }, index: number) {
  const data = [...code.value]
  data[index] = null
  code.value = data
  if (keypress.has('backspace')) focusPrev()
}

function validateInput(event: { data: string }, index: number) {
  if (event.data) {
    const data = [...code.value]
    data[index] = parseInt(event.data)
    code.value = data
    focusNext()
  }
}
</script>

<template>
  <div class="mx-auto flex w-fit flex-col gap-2 self-center justify-self-center">
    <span class="inline-flex gap-2">
      <input
        v-for="index of range(6)"
        :key="index"
        ref="inputs"
        :value="code[index]"
        type="number"
        class="w-8 border-b-2 border-black/30 bg-transparent text-center outline-none"
        :class="{ 'border-black/100': currentIndex > index, 'border-primary-500/80': currentIndex === index }"
        @focus="currentIndex = index"
        @beforeinput="validateBeforeInput($event, index)"
        @input="validateInput($event, index)" />
    </span>
    <!-- <span class="text-alert-500 text-sm font-semi-bold">{{ errors[0] }}</span> -->
  </div>
</template>

<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
