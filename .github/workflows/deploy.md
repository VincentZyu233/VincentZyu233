# 部署流程说明 (Deploy Workflow)

本项目使用 GitHub Actions 自动构建并部署 VitePress 文档。

> **注意**：该工作流默认只在该仓库的 `main` 分支上触发。

## 📋 触发机制 (Trigger)

为了节省资源，自动化部署**不仅**需要推送到 `main` 分支，还需要在 **Commit Message（提交信息）** 中包含特定关键词。

| 关键词 | 说明 | 触发动作 |
| :--- | :--- | :--- |
| `build page` | 构建页面 | ✅ 触发 GitHub Pages 部署<br>✅ 触发 Cloudflare Pages 部署 |

**示例 Commit：**
```bash
git commit -m "docs: update install guide (build page)"
```

如果提交信息中**不包含** `build page`，GitHub Action 将**不会运行**。

## 🛠️ 部署逻辑

该工作流包含两个并行的任务 (Jobs)，分别针对两个平台进行不同的构建配置：

### 1. GitHub Pages
- **构建命令**：`npm run docs:build`
- **Base URL**：`/VincentZyu233/` (适配 `username.github.io/repo/` 路径)
- **部署方式**：使用 `actions/deploy-pages`

### 2. Cloudflare Pages
- **构建命令**：`npm run docs:build`
- **Base URL**：`/` (适配自定义域名或 `*.pages.dev` 根路径)
- **部署方式**：使用 `cloudflare/pages-action`

> **说明**：我们在 `docs/.vitepress/config.mts` 中配置了动态 `base`，通过环境变量 `VITEPRESS_BASE` 控制。

## 🔑 需要配置的 Secrets

为了使 Cloudflare Pages 部署成功，需要在 GitHub 仓库的 **Settings -> Secrets and variables -> Actions** 中添加以下 Secrets：

| Secret Name | 说明 | 获取方式 |
| :--- | :--- | :--- |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API 令牌 | [【🔗 点击此处管理 API Tokens】https://dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)<br><br>👉 **创建步骤 (参考图片配置)：**<br>1. 点击 **Create Token**<br>2. 模板选择 **Edit Cloudflare Workers**<br>3. **权限 (Permissions)** 确保包含：<br>   - `Account` - `Cloudflare Pages` - `Edit` (必需)<br>   - `Zone` - `Workers Routes` - `Edit`<br>   - `Account` - `Workers Scripts` - `Edit`<br>   - `Account` - `Workers KV Storage` - `Edit`<br>4. **账户资源 (Account Resources)**:<br>   - 选择 `Include` -> `你的账户名`<br>5. **区域资源 (Zone Resources)**:<br>   - 选择 `Include` -> `All zones`<br>6. 点击 **Continue to summary** 并生成 Token |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 账户 ID | [【🔗 点击进入 Cloudflare Dashboard】https://dash.cloudflare.com/](https://dash.cloudflare.com/) <br> (步骤：点击任意域名/站点 -> 在 **Overview** 页面右侧栏最底部复制 **Account ID**) |

## ⚙️ 配置文件说明

如果需要修改 Cloudflare Pages 的项目名称，请编辑 `.github/workflows/deploy.yml` 文件中的 `projectName` 字段：

```yaml
      - name: Publish to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          # ...
          projectName: vincentzyu-vitepress # 👈 修改这里为你在 Cloudflare 创建的项目名
```
