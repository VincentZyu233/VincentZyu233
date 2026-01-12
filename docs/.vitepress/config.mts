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
      { 
        icon: { 
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.659.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"/></svg>' 
        }, 
        link: 'https://space.bilibili.com/34318934',
        ariaLabel: 'Bilibili'
      },
      { 
        icon: { 
          svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" width="24" height="24"><image xlink:href="/VincentZyu233/icons/koishi_forum_logo.png" width="24" height="24"/></svg>'
        },
        link: 'https://forum.koishi.xyz/u/vincentzyu233/summary',
        ariaLabel: 'Koishi Forum'
      },
      { 
        icon: { 
          svg: '<svg fill="currentColor" width="48px" height="48px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296z"/></svg>' 
        }, 
        link: 'https://gitee.com/vincent-zyu',
        ariaLabel: 'Gitee'
      },
      { icon: 'github', link: 'https://github.com/VincentZyu233/VincentZyu233' }
    ]
  }
})
