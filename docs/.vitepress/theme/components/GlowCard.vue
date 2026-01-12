<template>
  <div 
    class="glow-card"
    :style="cardStyle"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="glow-card-glow" :style="glowStyle"></div>
    <div class="glow-card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(defineProps<{
  glowColor?: string
  glowIntensity?: number
  borderRadius?: string
}>(), {
  glowColor: '#ff69b4',
  glowIntensity: 0.3,
  borderRadius: '12px'
})

const isHovered = ref(false)

const cardStyle = computed(() => ({
  borderRadius: props.borderRadius
}))

const glowStyle = computed(() => ({
  background: props.glowColor,
  opacity: isHovered.value ? props.glowIntensity : 0.15,
  borderRadius: props.borderRadius
}))
</script>

<style scoped>
.glow-card {
  position: relative;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
  transition: all 0.3s ease;
}

.glow-card:hover {
  transform: translateY(-4px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 12px 40px rgba(255, 105, 180, 0.15);
}

.glow-card-glow {
  position: absolute;
  inset: 0;
  filter: blur(40px);
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.glow-card-content {
  position: relative;
  z-index: 1;
  padding: 24px;
}
</style>
