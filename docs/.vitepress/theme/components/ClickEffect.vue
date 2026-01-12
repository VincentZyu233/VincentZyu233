<template>
  <div class="click-effect" ref="container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const container = ref<HTMLElement>()

const particles = ['💖', '✨', '💫', '⭐', '🌸']

function createParticle(x: number, y: number) {
  if (!container.value) return
  
  const count = 5 + Math.floor(Math.random() * 3)
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('span')
    particle.className = 'particle'
    particle.textContent = particles[Math.floor(Math.random() * particles.length)]
    
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5
    const velocity = 50 + Math.random() * 80
    const dx = Math.cos(angle) * velocity
    const dy = Math.sin(angle) * velocity
    
    particle.style.left = `${x}px`
    particle.style.top = `${y}px`
    particle.style.setProperty('--dx', `${dx}px`)
    particle.style.setProperty('--dy', `${dy}px`)
    particle.style.fontSize = `${12 + Math.random() * 10}px`
    
    container.value.appendChild(particle)
    
    setTimeout(() => {
      particle.remove()
    }, 800)
  }
}

function handleClick(e: MouseEvent) {
  createParticle(e.clientX, e.clientY)
}

onMounted(() => {
  document.addEventListener('click', handleClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClick)
})
</script>

<style scoped>
.click-effect {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9998;
  overflow: hidden;
}

:deep(.particle) {
  position: fixed;
  pointer-events: none;
  animation: particle-burst 0.8s ease-out forwards;
  z-index: 9998;
}

@keyframes particle-burst {
  0% {
    opacity: 1;
    transform: translate(0, 0) scale(1) rotate(0deg);
  }
  100% {
    opacity: 0;
    transform: translate(var(--dx), var(--dy)) scale(0.3) rotate(180deg);
  }
}
</style>
