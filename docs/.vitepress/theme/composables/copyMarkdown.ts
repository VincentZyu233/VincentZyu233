import { inBrowser } from 'vitepress'

const timeoutIdMap = new WeakMap<HTMLButtonElement, ReturnType<typeof setTimeout>>()

export function useCopyMarkdown() {
  if (!inBrowser) return

  window.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement | null)?.closest?.('div[class*="language-"] > button.copy-md') as HTMLButtonElement | null
    if (!el) return

    const parent = el.parentElement
    if (!parent) return

    const pre = parent.querySelector('pre')
    if (!pre) return

    // 获取代码块语言
    let lang = el.dataset.lang ?? ''
    if (!lang) {
      const match = parent.className.match(/(?:^|\s)language-([a-zA-Z0-9_\-#+]+)/)
      if (match && match[1] !== 'txt') {
        lang = match[1]
      }
    }

    // 克隆节点并过滤不需要复制的内容
    const ignoredNodes = ['.vp-copy-ignore', '.diff.remove'].join(', ')
    const clone = pre.cloneNode(true) as HTMLElement
    clone.querySelectorAll(ignoredNodes).forEach((node) => node.remove())
    clone.innerHTML = clone.innerHTML.replace(/\n+/g, '\n')
    let codeText = clone.textContent || ''

    // 格式化换行与边界反引号防冲突
    codeText = codeText.replace(/\r\n/g, '\n').replace(/\n$/, '')
    const backticksMatch = codeText.match(/`+/g)
    let maxBackticks = 0
    if (backticksMatch) {
      for (const b of backticksMatch) {
        if (b.length > maxBackticks) maxBackticks = b.length
      }
    }
    const fenceCount = Math.max(3, maxBackticks + 1)
    const fence = '`'.repeat(fenceCount)
    const markdownContent = `${fence}${lang}\n${codeText}\n${fence}`

    copyToClipboard(markdownContent).then(() => {
      el.classList.add('copied')
      clearTimeout(timeoutIdMap.get(el))
      const timeoutId = setTimeout(() => {
        el.classList.remove('copied')
        el.blur()
        timeoutIdMap.delete(el)
      }, 2000)
      timeoutIdMap.set(el, timeoutId)
    })
  })
}

async function copyToClipboard(text: string) {
  try {
    return await navigator.clipboard.writeText(text)
  } catch {
    const element = document.createElement('textarea')
    const previouslyFocusedElement = document.activeElement as HTMLElement | null
    element.value = text
    element.setAttribute('readonly', '')
    element.style.contain = 'strict'
    element.style.position = 'absolute'
    element.style.left = '-9999px'
    element.style.fontSize = '12pt'
    const selection = document.getSelection()
    const originalRange = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null
    document.body.appendChild(element)
    element.select()
    element.selectionStart = 0
    element.selectionEnd = text.length
    document.execCommand('copy')
    document.body.removeChild(element)
    if (originalRange && selection) {
      selection.removeAllRanges()
      selection.addRange(originalRange)
    }
    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus()
    }
  }
}
