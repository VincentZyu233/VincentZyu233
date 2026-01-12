<template>
  <div class="typewriter-container">
    <span class="typewriter-text">{{ displayedText }}</span>
    <span class="cursor" :class="{ blink: !isTyping }">|</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = withDefaults(defineProps<{
  text: string
  speed?: number
  delay?: number
  loop?: boolean
  loopDelay?: number
}>(), {
  speed: 80,
  delay: 0,
  loop: false,
  loopDelay: 2000
})

const displayedText = ref('')
const isTyping = ref(false)
let timeoutId: ReturnType<typeof setTimeout>

async function typeText() {
  isTyping.value = true
  displayedText.value = ''
  
  await new Promise(resolve => setTimeout(resolve, props.delay))
  
  for (let i = 0; i <= props.text.length; i++) {
    displayedText.value = props.text.slice(0, i)
    await new Promise(resolve => setTimeout(resolve, props.speed))
  }
  
  isTyping.value = false
  
  if (props.loop) {
    timeoutId = setTimeout(async () => {
      isTyping.value = true
      for (let i = props.text.length; i >= 0; i--) {
        displayedText.value = props.text.slice(0, i)
        await new Promise(resolve => setTimeout(resolve, props.speed / 2))
      }
      typeText()
    }, props.loopDelay)
  }
}

onMounted(() => {
  typeText()
})

watch(() => props.text, () => {
  clearTimeout(timeoutId)
  typeText()
})
</script>

<style scoped>
.typewriter-container {
  display: inline-flex;
  align-items: center;
}

.typewriter-text {
  font-family: inherit;
}

.cursor {
  display: inline-block;
  color: var(--vp-c-brand-1);
  font-weight: bold;
  margin-left: 2px;
}

.cursor.blink {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
