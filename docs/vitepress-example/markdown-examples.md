# Markdown Extension Examples

This page demonstrates some of the built-in markdown extensions provided by VitePress.

## 🔹 Custom Containers

VitePress supports these built-in `:::` container types:

- `info`
- `tip`
- `warning`
- `danger`
- `details`
- `raw`

### info

::: info
This is an info box.
:::

### tip

::: tip
This is a tip box.
:::

### warning

::: warning
This is a warning box.
:::

### danger

::: danger
This is a danger box.
:::

### details

::: details Click me
This is a collapsible details block.
:::

### details open

::: details Open by default {open}
This details block is open by default.
:::

### Custom Title

::: tip 提示
You can append a custom title after the container type.
:::

::: warning 注意事项
This is useful for note-style documentation.
:::

::: danger STOP
Danger zone, do not proceed.
:::

### raw

```md
::: raw
<div class="custom-demo">
  This content is wrapped in a raw container.
</div>
:::
```

`raw` is a special container used to reduce style and router conflicts.

## 🔹 Syntax Highlighting

VitePress provides Syntax Highlighting powered by [Shiki](https://github.com/shikijs/shiki), with additional features like line-highlighting:

**Input**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
