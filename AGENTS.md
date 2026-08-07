# Repository Notes for Agents

## 🔹 文档标题规范

- Markdown 二级标题使用 `## 🔹 标题` 格式。
- 只给二级标题 `##` 加 emoji；不要批量修改 `###`、`####` 等更深层标题。
- 如果二级标题已经有 emoji，不要重复添加。

## 🔹 VitePress 文档约定

- 新增文档后，记得同步更新 `docs/.vitepress/config.mts` 的 sidebar。
- `docs/.vitepress/config.mts` 里的 `text` 显示项开头也要加符合内容的 emoji。
- `docs/public` 下的资源在 Markdown 中使用站点根路径引用，例如 `/image/example.png`。
- 文档文件名和 sidebar link 要保持一致；重命名页面时同步改链接。

## 🔹 代码块语言

- 避免使用 VitePress/Shiki 不识别的代码块语言，例如 `conf`。
- 配置片段优先使用 `ini`、`toml`、`yaml`、`text` 或实际 shell 类型。
- PowerShell 命令使用 `powershell`，Linux 命令使用 `bash`。

## 🔹 批量修改注意事项

- 批量处理 Markdown 时不要扫描或修改 `.git`、`node_modules` 等依赖/元数据目录。
- 修改前后用 `rg` 检查目标模式，确认没有漏改或误改。
- 如果发现误改第三方依赖目录，先机械撤回这些目录内的改动，再继续处理项目文档。

## 🔹 Commit Message 习惯

- 文档相关提交使用中文说明，标题使用 conventional commit 风格，例如 `docs(cli-tools): ...`。
- 需要触发 Pages / CI 构建时，在 commit 标题中带上 `build-page`。
- commit body 尽量写清楚主要改动点。
- 按用户要求添加 `Co-authored-by: Codex <codex@openai.com>`。
