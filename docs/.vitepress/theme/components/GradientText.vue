<template>
  <span 
    class="gradient-text"
    :style="gradientStyle"
  >
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  from?: string
  to?: string
  direction?: number
  animate?: boolean
}>(), {
  from: '#ff69b4',
  to: '#ff85c1',
  direction: 120,
  animate: false
})

const gradientStyle = computed(() => ({
  background: `linear-gradient(${props.direction}deg, ${props.from}, ${props.to})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: props.animate ? 'gradient-shift 3s ease infinite' : 'none',
  backgroundSize: props.animate ? '200% 200%' : 'auto'
}))
</script>

<style scoped>
.gradient-text {
  display: inline;
  font-weight: inherit;
}

@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
</style>
