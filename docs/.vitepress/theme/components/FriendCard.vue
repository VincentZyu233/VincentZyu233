<template>
  <div 
    ref="cardRef"
    class="friend-card"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @mousemove="onMouseMove"
    :style="cardStyle"
  >
    <!-- 光团效果 -->
    <div class="card-glow" :style="glowStyle"></div>
    
    <!-- 头像区域 - 双头像叠加 -->
    <div class="avatars-section">
      <div class="avatar-main-wrapper">
        <img :src="resolvedFrontAvatar" :alt="name" class="avatar-main" @error="onFrontImageError" />
        <div class="avatar-ring"></div>
      </div>
      <div class="avatar-secondary-wrapper">
        <img :src="resolvedBackAvatar" :alt="name" class="avatar-secondary" @error="onBackImageError" />
      </div>
    </div>

    <!-- 信息区域 -->
    <div class="info-section">
      <h3 class="friend-name">{{ name }}</h3>
      <p class="friend-desc">{{ description }}</p>
      
      <div class="friend-bio" v-if="bio">
        <p>{{ bio }}</p>
      </div>

      <div class="friend-tags" v-if="tags?.length">
        <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>

    <!-- 链接按钮 -->
    <div class="links-section">
      <a 
        v-for="(linkItem, index) in normalizedLinks" 
        :key="index"
        :href="linkItem.url" 
        target="_blank" 
        class="link-btn"
      >
        <span class="btn-icon">
          <img
            v-if="linkItem.iconSrc"
            :src="linkItem.iconSrc"
            :alt="linkItem.iconAlt || linkItem.label"
            class="btn-icon-image"
          />
          <span v-else>{{ linkItem.icon }}</span>
        </span>
        <span class="btn-text">{{ linkItem.label }}</span>
      </a>
    </div>

    <!-- 装饰元素 -->
    <div class="card-decoration">
      <div class="deco-circle"></div>
      <div class="deco-dots">
        <span></span><span></span><span></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useData } from 'vitepress'

interface LinkItem {
  url: string
  label: string
  icon?: string
  iconSrc?: string
  iconAlt?: string
}

const props = defineProps<{
  name: string
  description: string
  frontAvatar: string
  backAvatar: string
  links: LinkItem[]
  bio?: string
  tags?: string[]
}>()

const { site } = useData()
const cardRef = ref<HTMLElement>()
const frontImageError = ref(false)
const backImageError = ref(false)
const mouseX = ref(0.5)
const mouseY = ref(0.5)
const isHovering = ref(false)

// 处理头像路径
function resolveAvatar(avatar: string, hasError: boolean): string {
  if (hasError) {
    return 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="%23ff69b4" width="100" height="100"/><text x="50" y="60" text-anchor="middle" fill="white" font-size="40">?</text></svg>'
  }
  if (avatar.startsWith('http://') || avatar.startsWith('https://')) {
    return avatar
  }
  const base = site.value.base || '/'
  if (avatar.startsWith('/')) {
    return base.replace(/\/$/, '') + avatar
  }
  return avatar
}

function resolveAssetPath(asset: string): string {
  if (asset.startsWith('http://') || asset.startsWith('https://')) {
    return asset
  }
  const base = site.value.base || '/'
  if (asset.startsWith('/')) {
    return base.replace(/\/$/, '') + asset
  }
  return asset
}

const resolvedFrontAvatar = computed(() => resolveAvatar(props.frontAvatar, frontImageError.value))
const resolvedBackAvatar = computed(() => resolveAvatar(props.backAvatar, backImageError.value))

// 3D 卡片倾斜效果
const cardStyle = computed(() => {
  if (!isHovering.value) {
    return {
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    }
  }
  const rotateX = (mouseY.value - 0.5) * -8
  const rotateY = (mouseX.value - 0.5) * 8
  return {
    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }
})

// 光团跟随效果
const glowStyle = computed(() => ({
  background: `radial-gradient(circle at ${mouseX.value * 100}% ${mouseY.value * 100}%, rgba(255, 105, 180, 0.35) 0%, transparent 50%)`
}))

// 处理链接
const normalizedLinks = computed(() => {
  return props.links.map(link => {
    let icon = link.icon || '🔗'
    let label = link.label
    let iconSrc = link.iconSrc
    let iconAlt = link.iconAlt
    
    if (link.url.includes('github.com')) {
      icon = link.icon || '🐙'
      iconSrc = link.iconSrc || '/icons/github-mark-white.svg'
      iconAlt = link.iconAlt || 'GitHub'
      if (!link.label) label = 'GitHub'
    } else if (!link.label) {
      label = '主页'
    }
    
    return {
      ...link,
      icon,
      label,
      iconSrc: iconSrc ? resolveAssetPath(iconSrc) : undefined,
      iconAlt
    }
  })
})

function onMouseEnter() {
  isHovering.value = true
}

function onMouseLeave() {
  isHovering.value = false
  mouseX.value = 0.5
  mouseY.value = 0.5
}

function onMouseMove(e: MouseEvent) {
  if (!cardRef.value) return
  const rect = cardRef.value.getBoundingClientRect()
  mouseX.value = (e.clientX - rect.left) / rect.width
  mouseY.value = (e.clientY - rect.top) / rect.height
}

function onFrontImageError() {
  frontImageError.value = true
}

function onBackImageError() {
  backImageError.value = true
}
</script>

<style scoped>
.friend-card {
  position: relative;
  width: 300px;
  padding: 28px 24px;
  background: linear-gradient(145deg, rgba(255, 105, 180, 0.08) 0%, rgba(255, 182, 193, 0.04) 100%);
  border: 1px solid rgba(255, 105, 180, 0.25);
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: default;
}

.friend-card:hover {
  border-color: rgba(255, 105, 180, 0.5);
  box-shadow: 
    0 20px 40px rgba(255, 105, 180, 0.15),
    0 0 60px rgba(255, 105, 180, 0.1);
}

/* 光团效果 */
.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  transition: background 0.1s ease;
  z-index: 0;
}

/* 头像区域 */
.avatars-section {
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  z-index: 1;
}

.avatar-main-wrapper {
  position: relative;
}

.avatar-main {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 105, 180, 0.5);
  box-shadow: 0 0 25px rgba(255, 105, 180, 0.3);
  transition: all 0.3s ease;
  background: rgba(255, 105, 180, 0.1);
}

.avatar-ring {
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: -8px;
  border-radius: 50%;
  border: 2px dashed rgba(255, 105, 180, 0.3);
  animation: spin 12s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.avatar-secondary-wrapper {
  position: absolute;
  right: calc(50% - 75px);
  bottom: -5px;
}

.avatar-secondary {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 182, 193, 0.8);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  background: rgba(255, 105, 180, 0.1);
  transition: all 0.3s ease;
}

.friend-card:hover .avatar-main {
  transform: scale(1.05);
  box-shadow: 0 0 35px rgba(255, 105, 180, 0.5);
}

.friend-card:hover .avatar-secondary {
  transform: scale(1.1) translateY(-2px);
}

/* 信息区域 */
.info-section {
  text-align: center;
  z-index: 1;
  position: relative;
}

.friend-name {
  font-size: 22px;
  font-weight: 700;
  color: #ff69b4;
  margin: 0 0 6px 0;
  text-shadow: 0 0 20px rgba(255, 105, 180, 0.3);
}

.friend-desc {
  color: #a0a0a0;
  font-size: 13px;
  margin: 0 0 12px 0;
  opacity: 0.9;
}

.friend-bio {
  margin-bottom: 14px;
  padding: 12px 14px;
  background: rgba(255, 105, 180, 0.06);
  border-radius: 12px;
  border-left: 3px solid rgba(255, 105, 180, 0.4);
}

.friend-bio p {
  color: #b0b0b0;
  font-size: 13px;
  line-height: 1.6;
  margin: 0;
  text-align: left;
}

.friend-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-bottom: 16px;
}

.tag {
  background: rgba(255, 105, 180, 0.12);
  color: #ff69b4;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11px;
  border: 1px solid rgba(255, 105, 180, 0.2);
  transition: all 0.2s ease;
}

.tag:hover {
  background: rgba(255, 105, 180, 0.2);
  transform: translateY(-1px);
}

/* 链接按钮 */
.links-section {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  z-index: 1;
  position: relative;
}

.link-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  background: linear-gradient(135deg, #ff69b4 0%, #ff85c1 100%);
  border: none;
  border-radius: 25px;
  color: white;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3);
}

.link-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 105, 180, 0.45);
  color: white;
}

.link-btn:active {
  transform: translateY(-1px);
}

.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 1;
}

.btn-icon-image {
  display: block;
  width: 14px;
  height: 14px;
  object-fit: contain;
}

/* 装饰元素 */
.card-decoration {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1;
}

.deco-circle {
  width: 8px;
  height: 8px;
  background: rgba(255, 105, 180, 0.4);
  border-radius: 50%;
  margin-bottom: 8px;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.2); }
}

.deco-dots {
  display: flex;
  gap: 4px;
}

.deco-dots span {
  width: 4px;
  height: 4px;
  background: rgba(255, 105, 180, 0.3);
  border-radius: 50%;
}

/* 响应式 */
@media (max-width: 640px) {
  .friend-card {
    width: 280px;
    padding: 24px 20px;
  }
  
  .avatar-main {
    width: 80px;
    height: 80px;
  }
  
  .avatar-secondary {
    width: 36px;
    height: 36px;
  }
  
  .link-btn {
    padding: 8px 14px;
    font-size: 12px;
  }
}
</style>
