# 开发环境搭建指南

> [📄 README](./README.md) | [🛠️ DEV](./DEV.md) | [🚀 Deploy](./.github/workflows/deploy.md)

本文档说明如何在新设备上复现本项目的开发环境。

## 环境要求

- [Node.js](https://nodejs.org/) (推荐 v20 或更高版本)
- [npm](https://www.npmjs.com/) 或 [Yarn](https://yarnpkg.com/)
- Git

## 快速开始

### 1. 克隆仓库

```bash
git clone git@github.com:VincentZyu233/VincentZyu233.git
cd VincentZyu233
```

### 2. 安装依赖

使用 npm：
```bash
npm install
```

或使用 Yarn：
```bash
yarn install
```

### 3. 启动开发服务器

```bash
npm run docs:dev
```

启动后访问 `http://localhost:5173/VincentZyu233/` 即可预览。

## 常用命令

| 命令 | 说明 |
|------|------|
| `npm run docs:dev` | 启动开发服务器 |
| `npm run docs:build` | 构建生产版本 |
| `npm run docs:preview` | 预览生产构建 |

## 项目结构

```
.
├── docs/                       # VitePress 文档目录
│   ├── .vitepress/            # VitePress 配置
│   │   ├── config.mts         # 站点配置
│   │   └── theme/             # 自定义主题
│   │       ├── custom.css     # 自定义样式
│   │       ├── index.ts       # 主题入口
│   │       ├── components/    # Vue 组件
│   │       └── fonts/         # 字体文件
│   ├── public/                # 静态资源
│   │   ├── avatar/            # 头像、favicon
│   │   ├── icons/             # 图标
│   │   └── image/             # 图片
│   ├── notes/                 # 笔记文档
│   ├── friends/               # 友链页面
│   └── index.md               # 首页
├── .github/workflows/         # GitHub Actions 配置
├── package.json               # 项目依赖
└── README.md                  # 项目说明
```

## 部署说明

项目配置了双平台自动部署：

- **GitHub Pages**: 访问 `https://vincentzyu233.github.io/VincentZyu233/`
- **Cloudflare Pages**: 访问 `https://vincentzyu-vitepress.pages.dev/`

触发条件：推送代码时 commit message 包含 `build page`

## 技术栈

- [VitePress](https://vitepress.dev/) - 静态站点生成器
- [Vue 3](https://vuejs.org/) - 前端框架
- [VueUse](https://vueuse.org/) - Vue 组合式工具库

--- 

### tp:
> [📄 README](./README.md) | [🛠️ DEV](./DEV.md) | [🚀 Deploy](./.github/workflows/deploy.md)