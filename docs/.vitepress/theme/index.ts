// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

// 自定义组件
import TypeWriter from './components/TypeWriter.vue'
import ScrollReveal from './components/ScrollReveal.vue'
import GradientText from './components/GradientText.vue'
import GlowCard from './components/GlowCard.vue'
import FriendCard from './components/FriendCard.vue'

// 交互动画组件
import CursorGlow from './components/CursorGlow.vue'
import ScrollProgress from './components/ScrollProgress.vue'
import MagneticButton from './components/MagneticButton.vue'
import FloatingIcons from './components/FloatingIcons.vue'
import ClickEffect from './components/ClickEffect.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 在 layout 顶部添加全局组件
      'layout-top': () => [
        h(ScrollProgress),
        h(CursorGlow),
        h(ClickEffect),
        h(FloatingIcons)
      ]
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
    app.component('TypeWriter', TypeWriter)
    app.component('ScrollReveal', ScrollReveal)
    app.component('GradientText', GradientText)
    app.component('GlowCard', GlowCard)
    app.component('FriendCard', FriendCard)
    app.component('MagneticButton', MagneticButton)
  }
} satisfies Theme
