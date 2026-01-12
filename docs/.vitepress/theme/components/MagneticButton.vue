<template>
  <div 
    class="magnetic-button"
    ref="buttonRef"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
    @click="onClick"
    :style="buttonStyle"
    :class="{ 'clicked': isClicked }"
  >
    <span class="button-content" :style="contentStyle">
      <slot></slot>
    </span>
    <span class="button-shine"></span>
    <span class="button-ripple" v-if="showRipple" :style="rippleStyle"></span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const buttonRef = ref<HTMLElement>()
const offsetX = ref(0)
const offsetY = ref(0)
const isHovering = ref(false)
const isClicked = ref(false)
const showRipple = ref(false)
const rippleX = ref(0)
const rippleY = ref(0)

function onMouseMove(e: MouseEvent) {
  if (!buttonRef.value) return
  
  const rect = buttonRef.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  
  offsetX.value = (e.clientX - centerX) * 0.3
  offsetY.value = (e.clientY - centerY) * 0.3
  isHovering.value = true
}

function onMouseLeave() {
  offsetX.value = 0
  offsetY.value = 0
  isHovering.value = false
}

function onClick(e: MouseEvent) {
  if (!buttonRef.value) return
  
  const rect = buttonRef.value.getBoundingClientRect()
  rippleX.value = e.clientX - rect.left
  rippleY.value = e.clientY - rect.top
  
  showRipple.value = true
  isClicked.value = true
  
  setTimeout(() => {
    showRipple.value = false
    isClicked.value = false
  }, 600)
}

const buttonStyle = computed(() => ({
  transform: `translate(${offsetX.value}px, ${offsetY.value}px)`,
}))

const contentStyle = computed(() => ({
  transform: `translate(${offsetX.value * 0.2}px, ${offsetY.value * 0.2}px)`,
}))

const rippleStyle = computed(() => ({
  left: `${rippleX.value}px`,
  top: `${rippleY.value}px`,
}))
</script>

<style scoped>
.magnetic-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 32px;
  background: linear-gradient(135deg, #ff69b4 0%, #ff85c1 50%, #ffa0d2 100%);
  border: none;
  border-radius: 30px;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.2s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease;
  box-shadow: 0 4px 20px rgba(255, 105, 180, 0.3);
}

.magnetic-button:hover {
  box-shadow: 0 8px 40px rgba(255, 105, 180, 0.5), 0 0 60px rgba(255, 105, 180, 0.2);
}

.magnetic-button.clicked {
  transform: scale(0.95) !important;
}

.button-content {
  position: relative;
  z-index: 2;
  color: white;
  font-weight: 600;
  font-size: 16px;
  transition: transform 0.2s cubic-bezier(0.23, 1, 0.32, 1);
}

.button-shine {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 40%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 60%
  );
  transform: translateX(-100%) rotate(45deg);
  transition: transform 0.6s ease;
}

.magnetic-button:hover .button-shine {
  transform: translateX(100%) rotate(45deg);
}

.button-ripple {
  position: absolute;
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  animation: ripple 0.6s ease-out forwards;
  pointer-events: none;
}

@keyframes ripple {
  to {
    transform: translate(-50%, -50%) scale(20);
    opacity: 0;
  }
}
</style>
