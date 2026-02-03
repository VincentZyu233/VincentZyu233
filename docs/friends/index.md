# 🔗 友链

<script setup>
import FriendCard from '../.vitepress/theme/components/FriendCard.vue'
import ScrollReveal from '../.vitepress/theme/components/ScrollReveal.vue'
import GradientText from '../.vitepress/theme/components/GradientText.vue'

const friends = [
  {
    name: 'VincentZyu',
    description: '原地tp',
    frontAvatar: 'https://q1.qlogo.cn/g?b=qq&nk=1830540513&s=640',
    backAvatar: '/friends/vincentzyu-qqbot-avatar-mahiro.jpg',
    links: [
      { url: 'https://vincentzyu233.github.io/VincentZyu233/', label: '博客', icon: '🏠' },
      { url: 'https://github.com/VincentZyu233', label: 'GitHub', icon: '🐙' }
    ],
    bio: '你好~'
  },
  {
    name: '橙汁喵',
    description: 'ChengZhiMeow',
    frontAvatar: '/friends/ChengZhiMeow.jpg',
    backAvatar: 'https://q1.qlogo.cn/g?b=qq&nk=292200693&s=640',
    links: [
      { url: 'https://cheng.catnies.top/', label: '博客', icon: '🏠' },
      { url: 'https://github.com/ChengZhiMeow', label: 'GitHub', icon: '🐙' }
    ],
    bio: '%PLACEHODER%'
  },
  {
    name: '牢废物',
    description: 'hekuo',
    frontAvatar: 'https://avatars.githubusercontent.com/u/78573256?v=4',
    backAvatar: 'https://q1.qlogo.cn/g?b=qq&nk=2378311279&s=640',
    links: [
      { url: 'https://www.io.hk.cn/', label: '博客', icon: '🏠' },
      { url: 'https://github.com/hekuo5310', label: 'GitHub', icon: '🐙' }
    ],
    bio: '我的梦想：学会圈钱'
  }
]
</script>

<div class="friends-header">
  <p class="friends-intro">
    <GradientText>✨ 这里是我的朋友们，欢迎来访~</GradientText>
  </p>
</div>

<div class="friends-grid">
  <ScrollReveal v-for="(friend, index) in friends" :key="friend.name" direction="up" :delay="index * 100">
    <FriendCard v-bind="friend" />
  </ScrollReveal>
</div>

<div class="apply-section">
  <h2>🤝 申请友链</h2>
  <p>欢迎交换友链！申请方式：在 <a href="https://github.com/VincentZyu233/VincentZyu233" target="_blank">GitHub 仓库</a> 提交 Issue 或 PR~</p>
</div>

<style>
.friends-header {
  text-align: center;
  margin-bottom: 40px;
}

.friends-intro {
  font-size: 18px;
  color: var(--vp-c-text-2);
}

.friends-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin: 40px 0;
}

.apply-section {
  margin-top: 60px;
  padding: 30px;
  background: linear-gradient(145deg, rgba(255, 105, 180, 0.05) 0%, rgba(255, 182, 193, 0.03) 100%);
  border: 1px solid rgba(255, 105, 180, 0.2);
  border-radius: 16px;
}

.apply-section h2 {
  color: var(--vp-c-brand-1);
  margin-top: 0;
}

.apply-section p {
  color: var(--vp-c-text-2);
  line-height: 1.8;
}

.apply-section ul {
  color: var(--vp-c-text-2);
  line-height: 2;
}

.apply-section a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
}

.apply-section a:hover {
  text-decoration: underline;
}
</style>
