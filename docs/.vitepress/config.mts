import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "VincentZyuVitePress",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: 'Notes',
        items: [
          {
            text: 'Proxy Config 代理配置',
            collapsed: false,
            items: [
              { text: 'CMD 使用代理', link: '/notes/shell-proxy/cmd-clash' },
              { text: 'Git Bash 使用代理', link: '/notes/shell-proxy/gitbash-clash' },
              { text: 'PowerShell 使用代理', link: '/notes/shell-proxy/powershell-clash' },
              { text: 'proxychains 使用指南', link: '/notes/shell-proxy/proxychains' },
              { text: 'Docker 配置代理', link: '/notes/shell-proxy/docker-proxy' }
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
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
