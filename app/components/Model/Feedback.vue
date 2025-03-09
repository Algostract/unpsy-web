<script setup lang="ts">
defineProps<{
  isOpen: boolean
}>()
const emit = defineEmits<{
  (event: 'close'): void
}>()

function onClose() {
  useTrackEvent('model_feedback_close')

  emit('close')
}

interface FormData {
  name: string | null
  email: string | null
  phone: string | null
  helpful: boolean | null
  accuracy: boolean | null
  interested: boolean | null
  recommend: boolean | null
  suggestion: string | null
}

const formData = reactive<FormData>({
  name: null,
  email: null,
  phone: null,
  helpful: null,
  accuracy: null,
  interested: null,
  recommend: null,
  suggestion: null,
})

function updateFormField<K extends keyof FormData>(name: K, value: FormData[K]) {
  formData[name] = value
}

async function onSubmit() {
  await $fetchAPI('/api/feedback', {
    method: 'POST',
    body: {
      ...formData,
    },
  })

  emit('close')
}

function valueFormatter(value: boolean | null) {
  if (value === null) return undefined

  return value ? 1 : 0
}

const isSubmitDisabled = computed(() => {
  for (const value in formData) {
    if (formData[value] === null) return true
  }

  return false
})
</script>

<template>
  <ModelBase :is-open="isOpen" :has-close-option="false" @close="onClose">
    <h1 class="mb-6 text-center">Please Give us Feedback!</h1>
    <form class="flex w-full max-w-[35rem] flex-col gap-5 px-8" @submit.prevent="onSubmit">
      <fieldset>
        <label for="name">Name</label>
        <input name="name" type="name" placeholder="Eg. Jone Doe" :value="formData.name" @input="(event) => updateFormField('name', event.target.value)" />
      </fieldset>
      <fieldset>
        <label for="email">Email</label>
        <input name="email" type="email" placeholder="Eg. jonedoe@abc.com" :value="formData.email" @input="(event) => updateFormField('email', event.target.value)" />
      </fieldset>
      <fieldset>
        <label for="phone">Phone</label>
        <input name="phone" type="number" placeholder="Eg. 1234567890" @input="(event) => updateFormField('phone', event.target.value.toString())" />
      </fieldset>
      <fieldset class="question">
        <label for="helpful">Do you find the app helpful and time-saving?</label>
        <InputChoice
          :options="[
            { name: 'True', value: true },
            { name: 'False', value: false },
          ]"
          :value="valueFormatter(formData.helpful)"
          :is-selected="false"
          :is-invalid="false"
          @update="(value) => updateFormField('helpful', value as boolean)" />
      </fieldset>
      <fieldset class="question">
        <label for="accuracy">Is the app accurate and easy to use?</label>
        <InputChoice
          :options="[
            { name: 'True', value: true },
            { name: 'False', value: false },
          ]"
          :value="valueFormatter(formData.accuracy)"
          :is-selected="false"
          :is-invalid="false"
          @update="(value) => updateFormField('accuracy', value as boolean)" />
      </fieldset>
      <fieldset class="question">
        <label for="interested">Are you interested in continuing to use this app in the future?</label>
        <InputChoice
          :options="[
            { name: 'True', value: true },
            { name: 'False', value: false },
          ]"
          :value="valueFormatter(formData.interested)"
          :is-selected="false"
          :is-invalid="false"
          @update="(value) => updateFormField('interested', value as boolean)" />
      </fieldset>
      <fieldset class="question">
        <label for="recommend">Would you recommend this app to other clinical psychologists?</label>
        <InputChoice
          :options="[
            { name: 'True', value: true },
            { name: 'False', value: false },
          ]"
          :value="valueFormatter(formData.recommend)"
          :is-selected="false"
          :is-invalid="false"
          @update="(value) => updateFormField('recommend', value as boolean)" />
      </fieldset>
      <fieldset class="exception">
        <label for="suggestion">Do you have any suggestions or comments for improvement?</label>
        <textarea placeholder="Points of suggestions" :value="formData.suggestion" @input="(event) => updateFormField('suggestion', event.target.value)" />
      </fieldset>
      <button type="submit" :disabled="isSubmitDisabled" class="rounded-full bg-primary-500 px-4 py-2 hover:bg-primary-400 disabled:cursor-not-allowed disabled:bg-dark-600">Submit</button>
    </form>
  </ModelBase>
</template>

<style scoped>
h1 {
  @apply font-head text-2xl font-semi-bold;
}

fieldset {
  @apply flex flex-row items-center gap-8;
}

fieldset input {
  @apply w-full flex-1;
}

fieldset.question {
  @apply flex-row;
}

fieldset.question label {
  @apply flex-1;
}

.exception {
  @apply flex-col items-stretch;
}

label {
  @apply text-sm;
}

textarea {
  @apply h-32 resize-none rounded-xl border border-white p-2 px-4 py-2 outline-none placeholder:opacity-60 focus:border-primary-500;
}

input {
  @apply rounded-full border border-white px-4 py-2 outline-none placeholder:opacity-60 focus:border-primary-500;
}
</style>
