<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const cursorX = ref(0)
const cursorY = ref(0)
const isVisible = ref(false)
const isHovering = ref(false)
const isClicking = ref(false)

let rafId: number | null = null
let targetX = 0
let targetY = 0

const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor
}

const animate = () => {
  cursorX.value = lerp(cursorX.value, targetX, 0.15)
  cursorY.value = lerp(cursorY.value, targetY, 0.15)
  rafId = requestAnimationFrame(animate)
}

const handleMouseMove = (e: MouseEvent) => {
  targetX = e.clientX
  targetY = e.clientY
  if (!isVisible.value) isVisible.value = true
}

const handleMouseEnter = () => {
  isVisible.value = true
}

const handleMouseLeave = () => {
  isVisible.value = false
}

const handleLinkHover = (e: Event) => {
  const target = e.target as HTMLElement
  if (target.tagName === 'A' || target.tagName === 'BUTTON' || 
      target.closest('a') || target.closest('button') ||
      target.classList.contains('interactive-cursor')) {
    isHovering.value = true
  }
}

const handleLinkLeave = () => {
  isHovering.value = false
}

const handleMouseDown = () => {
  isClicking.value = true
}

const handleMouseUp = () => {
  isClicking.value = false
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseenter', handleMouseEnter)
  window.addEventListener('mouseleave', handleMouseLeave)
  window.addEventListener('mousedown', handleMouseDown)
  window.addEventListener('mouseup', handleMouseUp)
  document.addEventListener('mouseover', handleLinkHover)
  document.addEventListener('mouseout', handleLinkLeave)
  rafId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseenter', handleMouseEnter)
  window.removeEventListener('mouseleave', handleMouseLeave)
  window.removeEventListener('mousedown', handleMouseDown)
  window.removeEventListener('mouseup', handleMouseUp)
  document.removeEventListener('mouseover', handleLinkHover)
  document.removeEventListener('mouseout', handleLinkLeave)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <div 
    class="cursor-glow"
    :class="{ 'visible': isVisible, 'hovering': isHovering, 'clicking': isClicking }"
    :style="{
      left: `${cursorX}px`,
      top: `${cursorY}px`
    }"
  >
    <div class="cursor-outer"></div>
    <div class="cursor-inner"></div>
  </div>
</template>

<style scoped>
.cursor-glow {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: screen;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cursor-glow.visible {
  opacity: 1;
}

.cursor-outer {
  position: absolute;
  width: 40px;
  height: 40px;
  border: 2px solid rgba(255, 105, 180, 0.5);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease;
}

.cursor-inner {
  position: absolute;
  width: 8px;
  height: 8px;
  background: linear-gradient(135deg, #ff69b4, #ff85c1);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px rgba(255, 105, 180, 0.8),
              0 0 20px rgba(255, 105, 180, 0.5),
              0 0 30px rgba(255, 105, 180, 0.3);
  transition: width 0.3s ease, height 0.3s ease, background 0.3s ease, transform 0.15s ease;
}

.cursor-glow.hovering .cursor-outer {
  width: 60px;
  height: 60px;
  border-color: rgba(255, 160, 210, 0.8);
}

.cursor-glow.hovering .cursor-inner {
  width: 12px;
  height: 12px;
  background: linear-gradient(135deg, #ff85c1, #ffa0d2);
}

.cursor-glow.clicking .cursor-outer {
  width: 30px;
  height: 30px;
  border-color: rgba(255, 105, 180, 1);
}

.cursor-glow.clicking .cursor-inner {
  width: 6px;
  height: 6px;
  transform: translate(-50%, -50%) scale(0.8);
}

/* 移动端隐藏 */
@media (max-width: 768px) {
  .cursor-glow {
    display: none;
  }
}

/* 触摸设备隐藏 */
@media (hover: none) {
  .cursor-glow {
    display: none;
  }
}
</style>
