# nano 简单说明

> <https://github.com/madnight/nano>

`nano` 是一个轻量级终端文本编辑器，适合快速改配置文件、写小段文本。

## 🔹 安装

- **Window**：`scoop install nano`
- **Debian/Ubuntu**：`apt install nano`
- **Termux**：`pkg install nano`
- **Arch Linux**：`pacman -Syu nano`

## 🔹 常用操作

- 保存：`Ctrl + O`
- 退出：`Ctrl + X`
- 搜索：`Ctrl + W`

## 🔹 永久显示行号

编辑配置文件 `~/.nanorc`。

如果文件不存在，直接新建即可。

```python
# 🔢 显示行号
set linenumbers

# 📖 自动换行显示长文本
set softwrap
```

配置完成后重新打开 `nano` 就会默认显示行号。

## 🔹 自动换行（Soft Wrap）

开启后，超出一行显示范围的长文本会自动换行显示，不会横向超出屏幕，方便阅读长段落或代码。

## 🔹 最终效果

开启后，`nano` 左侧会显示行号，方便定位和编辑配置文件。

![nano 配置好 显示行号 和 自动换行 后的效果](/image/nano-set-linenumbers-set-softwrap-on-windows11-terminal-final-effect.png)

## 🔹 相关链接

- [nano GitHub 仓库 [https://github.com/madnight/nano] ](https://github.com/madnight/nano)
- [nano 官网 [https://nano-editor.org/] ](https://nano-editor.org/)
