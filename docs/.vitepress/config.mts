import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/VincentZyu233/',
  title: "VincentZyuVitePress",
  description: "A VitePress Site",
  head: [
    ['link', { rel: 'icon', href: '/VincentZyu233/avatar/favicon.ico' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/avatar/mahiro-pfp-VincentZyu.jpg',
    nav: [
      { text: '🏠 Home主页', link: '/' },
      { text: '📝 Notes笔记', link: '/notes/shell-proxy/powershell-clash' },
      { text: '🚀 Examples例子', link: '/vitepress-example/markdown-examples' },
      { text: '🔗 友链', link: '/friends/' }
    ],

    sidebar: [
      {
        text: '🚀 Vitepress Examples效果示例',
        items: [
          { text: 'Markdown Examples', link: '/vitepress-example/markdown-examples' },
          { text: 'Runtime API Examples', link: '/vitepress-example/api-examples' }
        ]
      },
      {
        text: '📝 Notes 备忘录',
        items: [
          {
            text: 'Proxy Config 代理配置',
            collapsed: false,
            items: [
              { text: 'CMD 使用代理', link: '/notes/shell-proxy/cmd-clash' },
              { text: 'Git Bash 使用代理', link: '/notes/shell-proxy/gitbash-clash' },
              { text: 'PowerShell 使用代理', link: '/notes/shell-proxy/powershell-clash' },
              { text: 'Linux Bash 使用代理', link: '/notes/shell-proxy/linux-bash-clash' },
              { text: 'proxychains 使用指南', link: '/notes/shell-proxy/proxychains' },
              { text: 'Docker 配置代理', link: '/notes/shell-proxy/docker-proxy' }
            ]
          },
          {
            text: 'Language Environment 语言环境配置',
            collapsed: false,
            items: [
              { text: 'Linux 安装 Node.js', link: '/notes/language-env/linux-nodejs' },
              { text: 'Linux 安装 UV', link: '/notes/language-env/linux-uv' }
            ]
          },
          {
            text: 'Switch Source 换源',
            collapsed: false,
            items: [
              { text: 'pip 换源', link: '/notes/switch-source/pip' },
              { text: 'Ubuntu 22 换源', link: '/notes/switch-source/ubuntu22' },
              { text: 'Debian 换源', link: '/notes/switch-source/debian' }
            ]
          },
          {
            text: 'System Config 系统配置',
            collapsed: false,
            items: [
              { text: '配置 Swap', link: '/notes/system-config/swap' }
            ]
          },
          {
            text: 'Bot Deploy 部署机器人',
            collapsed: false,
            items: [
              { text: 'MaiBot 麦麦部署', link: '/notes/bot-deploy/maibot-deploy' },
              { text: 'NoneBot2 部署', link: '/notes/bot-deploy/nonebot2-deploy' },
              { text: 'Koishi 部署', link: '/notes/bot-deploy/koishi-deploy' }
            ]
          }
        ]
      },
      {
        text: '🤝 Friends 友链',
        items: [
          { text: '🔗 友链', link: '/friends/' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/VincentZyu233/VincentZyu233' }
    ]
  }
})
