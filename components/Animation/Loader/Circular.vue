<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    isDark?: boolean
  }>(),
  { isDark: true }
)
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="loader relative my-4 inline-block h-11 w-11 before:absolute before:block before:h-[6px] before:w-[6px] before:rounded-[50%] before:bg-primary-400">
      <svg viewBox="0 0 80 80" class="block h-full w-full">
        <circle cx="40" cy="40" r="32" class="fill-none" :class="isDark ? 'stroke-black' : 'stroke-white'" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.loader {
  --duration: 2s;
  --bezier-curve: 0.785, 0.135, 0.15, 0.86;
}

.loader:before {
  top: 37px;
  left: 19px;
  transform: translate(-18px, -18px);
  animation: dotRect var(--duration) cubic-bezier(var(--bezier-curve)) infinite;
}

.loader svg circle {
  stroke-width: 10px;
  stroke-linejoin: round;
  stroke-linecap: round;
  stroke-dasharray: 150 50 150 50;
  stroke-dashoffset: 75;
  animation: pathCircle var(--duration) cubic-bezier(var(--bezier-curve)) infinite;
}

@keyframes dotRect {
  25% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(18px, -18px);
  }

  75% {
    transform: translate(0, -36px);
  }

  100% {
    transform: translate(-18px, -18px);
  }
}

@keyframes pathCircle {
  25% {
    stroke-dashoffset: 125;
  }

  50% {
    stroke-dashoffset: 175;
  }

  75% {
    stroke-dashoffset: 225;
  }

  100% {
    stroke-dashoffset: 275;
  }
}
</style>
