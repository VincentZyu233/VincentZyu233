# VitePress 双平台部署

本项目通过 GitHub Actions 验证 VitePress 文档，并按需发布到 GitHub Pages 与 Cloudflare Pages。

## 触发与验证

每个 Pull Request 和每次推送到 `main` 都会运行 `verify` job。
该 job 使用 Yarn Classic 缓存，执行 `yarn install --frozen-lockfile` 和 `yarn docs:build`。
因此，PR 与未标记的 `main` 推送会完成构建验证，但不会部署。

## 部署标记

部署只会检查一次 `main` 推送中最新提交的完整消息，包括标题和正文。
推荐在提交标题或正文中加入独立的 `[pub-page]` 标记，例如：

```bash
git commit -m "docs(site): 更新首页 [pub-page]"
```

`[pub page]` 是兼容且同样有效的等价标记。
标记必须独立出现，`not-pub-page`、`[pub-page]-test` 或仅包含 `pub-page` 的其他文本都不会触发部署。
工作流不提供 `workflow_dispatch` 等手动部署例外。

## 部署流程

验证成功后，`should-deploy` job 会判断最新提交是否带有有效标记。
GitHub Pages 与 Cloudflare Pages job 都依赖验证和该判断结果。
只有结果为真时，两个部署 job 才会各自重新构建并发布。

| 平台 | 构建命令 | `VITEPRESS_BASE` | 发布方式 |
| --- | --- | --- | --- |
| GitHub Pages | `yarn docs:build` | `/VincentZyu233/` | `actions/deploy-pages` |
| Cloudflare Pages | `yarn docs:build` | `/` | `cloudflare/pages-action` |

## Cloudflare 配置

Cloudflare Pages 使用 Direct Upload 项目 `vincentzyu-vitepress`。
请在仓库的 Actions secrets 中配置 `CLOUDFLARE_API_TOKEN` 和 `CLOUDFLARE_ACCOUNT_ID`。
令牌需要目标账户的 Cloudflare Pages 编辑权限。
