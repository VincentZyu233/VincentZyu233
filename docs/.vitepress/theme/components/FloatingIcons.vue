<template>
  <div class="floating-icons" ref="container">
    <div 
      v-for="(icon, i) in floatingIcons" 
      :key="i"
      class="floating-icon"
      :style="icon.style"
    >
      {{ icon.emoji }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  icons?: string[]
  count?: number
}>()

const defaultIcons = ['✨', '💖', '🌸', '⭐', '💫', '🎀', '🌟', '💕', '🦋', '🌺']
const icons = props.icons || defaultIcons
const count = props.count || 12

const container = ref<HTMLElement>()

interface FloatingIcon {
  emoji: string
  style: Record<string, string>
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  scale: number
}

const floatingIcons = reactive<FloatingIcon[]>([])

function initIcons() {
  floatingIcons.length = 0
  
  for (let i = 0; i < count; i++) {
    const icon: FloatingIcon = {
      emoji: icons[Math.floor(Math.random() * icons.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.015,
      vy: (Math.random() - 0.5) * 0.015,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.3,
      scale: 0.4 + Math.random() * 0.4,
      style: {}
    }
    updateStyle(icon)
    floatingIcons.push(icon)
  }
}

function updateStyle(icon: FloatingIcon) {
  icon.style = {
    left: `${icon.x}%`,
    top: `${icon.y}%`,
    transform: `rotate(${icon.rotation}deg) scale(${icon.scale})`,
    opacity: `${0.08 + icon.scale * 0.15}`,
    fontSize: `${14 + icon.scale * 14}px`,
  }
}

let animationId: number

function animate() {
  floatingIcons.forEach(icon => {
    icon.x += icon.vx
    icon.y += icon.vy
    icon.rotation += icon.rotationSpeed
    
    // 边界反弹
    if (icon.x < 0 || icon.x > 100) icon.vx *= -1
    if (icon.y < 0 || icon.y > 100) icon.vy *= -1
    
    updateStyle(icon)
  })
  
  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  initIcons()
  animate()
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
})
</script>

<style scoped>
.floating-icons {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: -1;
}

.floating-icon {
  position: absolute;
  user-select: none;
  filter: blur(0.5px);
  transition: transform 0.1s linear;
}
</style>
