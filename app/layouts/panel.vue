<script setup lang="ts">
const route = useRoute()

const isMounted = ref(false)
const isTransition = ref(false)

watch(route, () => {
  isTransition.value = !isMounted.value
  isMounted.value = false
})

onMounted(() => {
  isMounted.value = true
})

const authStore = useAuth()

function onHelp() {
  useTrackEvent('model_feedback_open')

  authStore.updateFeedbackStatus('triggered')
}

const routeName = computed(() => route.name?.toString() as 'dashboard' | 'feedbacks')
</script>

<template>
  <div class="flex h-screen w-screen flex-col-reverse sm:flex-row sm:gap-5">
    <BaseButton icon="question" size="M" title="Need Help" class="fixed right-0 top-3 z-10 scale-75 md:right-2 md:scale-95" @click="onHelp" />
    <!-- Navbar -->
    <NavBar :is-transition="isTransition" :route="routeName" />
    <div class="flex-grow overflow-y-auto px-4 py-8 sm:pl-0">
      <slot />
    </div>
    <ModelFeedback v-if="authStore.showFeedbackModal" :is-open="authStore.showFeedbackModal" @close="authStore.updateFeedbackStatus('submitted')" />
  </div>
</template>
