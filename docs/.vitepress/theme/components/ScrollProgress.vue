<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const progress = ref(0)

const updateProgress = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  progress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress, { passive: true })
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})
</script>

<template>
  <div class="scroll-progress" :style="{ width: `${progress}%` }">
    <div class="progress-glow"></div>
  </div>
</template>

<style scoped>
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #ff69b4, #ff85c1, #ffa0d2);
  z-index: 10000;
  transition: width 0.1s ease-out;
  border-radius: 0 2px 2px 0;
}

.progress-glow {
  position: absolute;
  right: 0;
  top: 0;
  width: 100px;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 105, 180, 0.8));
  filter: blur(3px);
  animation: glow-pulse 1.5s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}
</style>
