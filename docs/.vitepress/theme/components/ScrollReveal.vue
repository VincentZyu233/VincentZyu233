<template>
  <div 
    ref="containerRef"
    class="scroll-reveal"
    :class="{ visible: isVisible }"
    :style="revealStyle"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  distance?: number
  duration?: number
  delay?: number
  threshold?: number
  once?: boolean
}>(), {
  direction: 'up',
  distance: 30,
  duration: 600,
  delay: 0,
  threshold: 0.1,
  once: true
})

const containerRef = ref<HTMLElement>()
const isVisible = ref(false)
let observer: IntersectionObserver | null = null

const revealStyle = computed(() => {
  const base = {
    transitionDuration: `${props.duration}ms`,
    transitionDelay: `${props.delay}ms`
  }
  
  if (isVisible.value) {
    return {
      ...base,
      opacity: '1',
      transform: 'translate(0, 0)'
    }
  }
  
  let transform = ''
  switch (props.direction) {
    case 'up':
      transform = `translateY(${props.distance}px)`
      break
    case 'down':
      transform = `translateY(-${props.distance}px)`
      break
    case 'left':
      transform = `translateX(${props.distance}px)`
      break
    case 'right':
      transform = `translateX(-${props.distance}px)`
      break
    case 'fade':
    default:
      transform = 'translate(0, 0)'
  }
  
  return {
    ...base,
    opacity: '0',
    transform
  }
})

onMounted(() => {
  if (!containerRef.value) return
  
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isVisible.value = true
          if (props.once && observer) {
            observer.unobserve(entry.target)
          }
        } else if (!props.once) {
          isVisible.value = false
        }
      })
    },
    { threshold: props.threshold }
  )
  
  observer.observe(containerRef.value)
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.scroll-reveal {
  transition-property: opacity, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity, transform;
}
</style>
