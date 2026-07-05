# tmux 简单说明

> <https://github.com/tmux/tmux>

`tmux` 是终端复用工具，可以把一个终端拆成多个 session、window、pane，适合长期挂任务和多窗口并行操作。

## 安装

- Debian/Ubuntu：`apt install tmux`
- Termux：`pkg install tmux`
- Arch Linux：`pacman -Syu tmux`

## 配置小标题快捷键

### 开启 Pane 顶部标题栏

编辑 `~/.tmux.conf`，加入：

```python
set -g pane-border-status top
```

### 显示 Pane 编号和自定义标题

```python
set -g pane-border-format " ─ #P: #{pane_title} ─ "
```

### 修改 Pane 标题快捷键

在 `~/.tmux.conf` 中绑定快捷键：

```bash
bind T command-prompt -p "请输入当前 Pane 的新标题:" "select-pane -T '%%'"
```

默认前缀键是 `Ctrl + B`，使用时：

1. 切换到目标 pane
2. 按 `Ctrl + B`
3. 按大写 `T`
4. 输入新标题并回车

例如可以把标题改成 `server`、`logs`、`editor`。

### 配置说明

- `pane-border-status top`：让每个 pane 的边框顶部显示一条小标题栏
- `pane-border-format`：定义标题栏显示内容
- `#P`：当前 pane 编号
- `#{pane_title}`：当前 pane 的自定义标题
- `bind T ...`：绑定快捷键，用来给当前 pane 改标题

### 刷新配置

修改完 `~/.tmux.conf` 后执行：

```bash
tmux source-file ~/.tmux.conf
```

## 相关链接

- [tmux GitHub 仓库](https://github.com/tmux/tmux)

::: tip 快捷键操作示意
下面这张图演示了 `Ctrl + B` 之后再按大写 `T`，然后输入标题的效果。

![tmux 修改 pane 小标题的操作示意](/image/tmux-border-status-set-step-ctrl+b-then-T-then-boo.png)
:::

### 最终效果

配置完成后，每个 pane 顶部都会显示一个小标题栏，可以看到 pane 编号和你设置的标题。

![tmux pane 小标题最终效果](/image/tmux-border-status-set-done-final-effect-on-ubuntu24-lxqt-x11-desktop.png)

## 配置翻页快捷键

### 问题背景

默认情况下 tmux 无法直接用鼠标滚轮或 PageUp/PageDown 翻页查看历史输出，因为此时处于正常的终端交互模式。想要自由向上翻页，需要进入 tmux 的"复制模式（Copy Mode）"。

### 进入复制模式

先按下 tmux 的前缀键，然后按 `[`（左中括号）。

默认快捷键是 `Ctrl + b` 然后松开，再按下 `[`。

此时窗口右上角会出现一行数字（如 `[0/0]`），说明已成功进入复制模式。

### 复制模式下的导航

- **向上翻页**：`PageUp`（或 Vi 风格的 `Ctrl + u` / `Ctrl + b`）
- **向下翻页**：`PageDown`（或 Vi 风格的 `Ctrl + d` / `Ctrl + f`）
- **逐行移动**：方向键 `↑` / `↓`

::: tip 翻页状态示意
下面这张图演示了进入复制模式后，窗口右上角会显示 `hh:mm [current/total]`，表示当前浏览位置。

![tmux 翻页状态右上角显示 current/total](/image/tmux-scroll-timestamp-current-total.png)
:::

### 退出复制模式

看完了日志，按下 `q` 键即可退出复制模式，回到正常终端模式。

### 开启鼠标滚轮翻页（推荐）

如果觉得每次都要敲快捷键太麻烦，可以开启 tmux 的鼠标模式，像平常一样用鼠标滚轮滚动翻页。

临时生效：

```bash
tmux set -g mouse on
```

持久化配置（写入 `~/.tmux.conf`）：

```python
set -g mouse on
```

写入后刷新配置：

```bash
tmux source-file ~/.tmux.conf
```
