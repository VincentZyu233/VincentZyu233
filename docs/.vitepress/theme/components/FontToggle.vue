<template>
  <div class="font-toggle-floating">
    <button
      class="font-toggle-btn"
      :class="{ active: isCustomFontEnabled }"
      @click="toggleFont"
      :title="isCustomFontEnabled ? '切换到系统字体' : '切换到霞鹜文楷字体'"
    >
      <svg
        class="font-icon"
        width="20"
        height="20"
        viewBox="0 0 115.28 122.88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M25.38,57h64.88V37.34H69.59c-2.17,0-5.19-1.17-6.62-2.6c-1.43-1.43-2.3-4.01-2.3-6.17V7.64l0,0H8.15 c-0.18,0-0.32,0.09-0.41,0.18C7.59,7.92,7.55,8.05,7.55,8.24v106.45c0,0.14,0.09,0.32,0.18,0.41c0.09,0.14,0.28,0.18,0.41,0.18 c22.78,0,58.09,0,81.51,0c0.18,0,0.17-0.09,0.27-0.18c0.14-0.09,0.33-0.28,0.33-0.41v-11.16H25.38c-4.14,0-7.56-3.4-7.56-7.56 V64.55C17.82,60.4,21.22,57,25.38,57L25.38,57z M29.7,67.91h23.23v6.11h-7.8v18.61H37.5V74.02h-7.8V67.91L29.7,67.91z M55.27,67.91 H78.5v6.11h-7.8v18.61h-7.63V74.02h-7.8V67.91L55.27,67.91z M82.6,67.91h18.88v5.32H90.26v4.31h9.6v5.01h-9.6v10.08H82.6V67.91 L82.6,67.91z M97.79,57h9.93c4.16,0,7.56,3.41,7.56,7.56v31.42c0,4.15-3.41,7.56-7.56,7.56h-9.93v13.55c0,1.61-0.65,3.04-1.7,4.1 c-1.06,1.06-2.49,1.7-4.1,1.7c-29.44,0-56.59,0-86.18,0c-1.61,0-3.04-0.64-4.1-1.7c-1.06-1.06-1.7-2.49-1.7-4.1V5.85 c0-1.61,0.65-3.04,1.7-4.1c1.06-1.06,2.53-1.7,4.1-1.7h58.72C64.66,0,64.8,0,64.94,0c0.64,0,1.29,0.28,1.75,0.69h0.09 c0.09,0.05,0.14,0.09,0.23,0.18l29.99,30.36c0.51,0.51,0.88,1.2,0.88,1.98c0,0.23-0.05,0.41-0.09,0.65V57L97.79,57z M67.52,27.97 V8.94l21.43,21.7H70.19c-0.74,0-1.38-0.32-1.89-0.78C67.84,29.4,67.52,28.71,67.52,27.97L67.52,27.97z"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const isCustomFontEnabled = ref(true) // 默认开启
const isTransitioning = ref(false)

const toggleFont = () => {
  // 开始过渡动画
  isTransitioning.value = true
  document.documentElement.classList.add('font-transitioning')
  
  // 等待淡出完成后切换字体
  setTimeout(() => {
    isCustomFontEnabled.value = !isCustomFontEnabled.value
    
    // 等待字体切换后淡入
    setTimeout(() => {
      isTransitioning.value = false
      document.documentElement.classList.remove('font-transitioning')
    }, 50)
  }, 200)
}

const updateFontClass = () => {
  const html = document.documentElement
  if (isCustomFontEnabled.value) {
    html.classList.add('custom-font-enabled')
  } else {
    html.classList.remove('custom-font-enabled')
  }
}

// 监听字体状态变化
watch(isCustomFontEnabled, () => {
  updateFontClass()
  // 保存到 localStorage
  localStorage.setItem('vitepress-font-preference', isCustomFontEnabled.value ? 'custom' : 'system')
})

onMounted(() => {
  // 从 localStorage 读取用户偏好
  const savedPreference = localStorage.getItem('vitepress-font-preference')
  if (savedPreference) {
    isCustomFontEnabled.value = savedPreference === 'custom'
  }
  
  // 应用初始字体设置
  updateFontClass()
  
  // 监听字体加载完成事件，实现 swap 时的渐变效果
  if ('fonts' in document) {
    // 先添加过渡类
    document.documentElement.classList.add('font-loaded-transition')
    
    document.fonts.ready.then(() => {
      // 字体加载完成后，触发渐变效果
      document.documentElement.classList.add('fonts-loaded')
    })
  }
})
</script>

<style scoped>
.font-toggle-floating {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 100;
}

.font-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.font-toggle-btn:hover {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

/* 激活状态 - 粉色 */
.font-toggle-btn.active {
  background: var(--vp-c-brand-1);
  color: white;
  box-shadow: 0 4px 16px rgba(255, 105, 180, 0.4);
}

.font-toggle-btn.active:hover {
  background: var(--vp-c-brand-2);
  box-shadow: 0 6px 24px rgba(255, 105, 180, 0.5);
}

.font-icon {
  transition: transform 0.3s ease;
}

.font-toggle-btn:hover .font-icon {
  transform: scale(1.1);
}

/* 响应式 - 移动端稍微小一点 */
@media (max-width: 640px) {
  .font-toggle-floating {
    bottom: 16px;
    right: 16px;
  }
  
  .font-toggle-btn {
    width: 44px;
    height: 44px;
  }
}
</style>