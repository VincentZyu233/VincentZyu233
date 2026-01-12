<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

let isInitialized = false

const initGlowEffect = () => {
  if (isInitialized) return
  isInitialized = true

  const addGlowEffect = (element: HTMLElement, color: string = '255, 105, 180') => {
    let glowElement: HTMLElement | null = null

    const onMouseEnter = () => {
      if (!glowElement) {
        glowElement = document.createElement('div')
        glowElement.className = 'glow-follower'
        glowElement.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0;
          transition: opacity 0.3s ease;
          background: radial-gradient(circle at 50% 50%, rgba(${color}, 0.15) 0%, transparent 50%);
        `
        element.appendChild(glowElement)
      }
      glowElement.style.opacity = '1'
    }

    const onMouseLeave = () => {
      if (glowElement) {
        glowElement.style.opacity = '0'
        glowElement.style.background = `radial-gradient(circle at 50% 50%, rgba(${color}, 0.15) 0%, transparent 50%)`
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!glowElement) return
      const rect = element.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      glowElement.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(${color}, 0.15) 0%, transparent 50%)`
    }

    element.addEventListener('mouseenter', onMouseEnter)
    element.addEventListener('mouseleave', onMouseLeave)
    element.addEventListener('mousemove', onMouseMove)

    return () => {
      element.removeEventListener('mouseenter', onMouseEnter)
      element.removeEventListener('mouseleave', onMouseLeave)
      element.removeEventListener('mousemove', onMouseMove)
      if (glowElement && glowElement.parentNode) {
        glowElement.parentNode.removeChild(glowElement)
      }
    }
  }

  const setupGlowEffects = () => {
    // Feature 卡片
    const features = document.querySelectorAll('.VPFeature')
    features.forEach((feature) => {
      if (!(feature as HTMLElement).dataset.glowInitialized) {
        ;(feature as HTMLElement).dataset.glowInitialized = 'true'
        addGlowEffect(feature as HTMLElement, '255, 105, 180')
      }
    })

    // Container 盒子
    const containers = document.querySelectorAll('.vp-doc .custom-block')
    containers.forEach((container) => {
      if (!(container as HTMLElement).dataset.glowInitialized) {
        ;(container as HTMLElement).dataset.glowInitialized = 'true'
        let color = '255, 105, 180' // 默认粉色

        // 根据 container 类型设置不同颜色
        if (container.classList.contains('info')) {
          color = '58, 139, 255' // 蓝色
        } else if (container.classList.contains('tip')) {
          color = '82, 196, 26' // 绿色
        } else if (container.classList.contains('warning')) {
          color = '250, 173, 20' // 橙色
        } else if (container.classList.contains('danger')) {
          color = '255, 77, 79' // 红色
        } else if (container.classList.contains('details')) {
          color = '132, 146, 166' // 灰色
        }

        addGlowEffect(container as HTMLElement, color)
      }
    })
  }

  // 初始设置
  setupGlowEffects()

  // 监听路由变化和内容更新
  const observer = new MutationObserver(() => {
    setTimeout(setupGlowEffects, 100)
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })

  // 页面加载完成后再次设置
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupGlowEffects)
  } else {
    setTimeout(setupGlowEffects, 100)
  }

  return () => {
    observer.disconnect()
  }
}

onMounted(() => {
  initGlowEffect()
})
</script>

<style>
/* 确保元素有正确的定位上下文 */
.VPFeature,
.vp-doc .custom-block {
  position: relative;
}

/* 确保内容在发光效果之上 */
.VPFeature > *,
.vp-doc .custom-block > * {
  position: relative;
  z-index: 1;
}
</style>