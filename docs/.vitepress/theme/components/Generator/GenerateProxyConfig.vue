<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const protocol = ref('http')
const host = ref('127.0.0.1')
const port = ref('7890')
const isProtocolOpen = ref(false)
const protocolOptions = ['http', 'https', 'socks5']
const protocolSelectRef = ref<HTMLElement | null>(null)

const proxyUrl = computed(() => `${protocol.value}://${host.value}:${port.value}`)
const socksUrl = computed(() => `socks5://${host.value}:${port.value === '7890' ? '7891' : port.value}`)

const configs = computed(() => [
  {
    title: 'CMD 临时环境变量',
    lang: 'cmd',
    code: [
      `set http_proxy=${proxyUrl.value}`,
      `set https_proxy=${proxyUrl.value}`
    ].join('\n')
  },
  {
    title: 'CMD 取消代理',
    lang: 'cmd',
    code: [
      'set http_proxy=',
      'set https_proxy='
    ].join('\n')
  },
  {
    title: 'PowerShell 临时环境变量',
    lang: 'powershell',
    code: [
      `$Env:HTTP_PROXY = "${proxyUrl.value}"`,
      `$Env:HTTPS_PROXY = "${proxyUrl.value}"`
    ].join('\n')
  },
  {
    title: 'PowerShell 持久化到 $PROFILE',
    lang: 'powershell',
    code: [
      `'$Env:HTTP_PROXY = "${proxyUrl.value}"' >> $PROFILE`,
      `'$Env:HTTPS_PROXY = "${proxyUrl.value}"' >> $PROFILE`
    ].join('\n')
  },
  {
    title: 'PowerShell 取消代理',
    lang: 'powershell',
    code: [
      '$Env:HTTP_PROXY = $null',
      '$Env:HTTPS_PROXY = $null'
    ].join('\n')
  },
  {
    title: 'Git Bash 临时环境变量',
    lang: 'bash',
    code: [
      `export HTTP_PROXY="${proxyUrl.value}"`,
      `export HTTPS_PROXY="${proxyUrl.value}"`
    ].join('\n')
  },
  {
    title: 'Git Bash 持久化到 ~/.bashrc',
    lang: 'bash',
    code: [
      `echo 'export HTTP_PROXY="${proxyUrl.value}"' >> ~/.bashrc`,
      `echo 'export HTTPS_PROXY="${proxyUrl.value}"' >> ~/.bashrc`,
      'source ~/.bashrc'
    ].join('\n')
  },
  {
    title: 'Git 全局代理',
    lang: 'bash',
    code: [
      `git config --global http.proxy ${proxyUrl.value}`,
      `git config --global https.proxy ${proxyUrl.value}`
    ].join('\n')
  },
  {
    title: 'Git 全局代理 SOCKS5 示例',
    lang: 'bash',
    code: [
      `git config --global http.proxy ${socksUrl.value}`,
      `git config --global https.proxy ${socksUrl.value}`
    ].join('\n')
  },
  {
    title: 'Linux Bash 临时环境变量',
    lang: 'bash',
    code: [
      `export HTTP_PROXY="${proxyUrl.value}"`,
      `export HTTPS_PROXY="${proxyUrl.value}"`,
      `export ALL_PROXY="${socksUrl.value}"`
    ].join('\n')
  },
  {
    title: 'Linux Bash 持久化到 ~/.bashrc',
    lang: 'bash',
    code: [
      `echo 'export HTTP_PROXY="${proxyUrl.value}"' >> ~/.bashrc`,
      `echo 'export HTTPS_PROXY="${proxyUrl.value}"' >> ~/.bashrc`,
      `echo 'export ALL_PROXY="${socksUrl.value}"' >> ~/.bashrc`,
      'source ~/.bashrc'
    ].join('\n')
  },
  {
    title: 'Linux Bash 取消代理',
    lang: 'bash',
    code: [
      'unset HTTP_PROXY',
      'unset HTTPS_PROXY',
      'unset ALL_PROXY'
    ].join('\n')
  }
])

async function copyText(text: string) {
  await navigator.clipboard?.writeText(text)
}

function selectProtocol(value: string) {
  protocol.value = value
  isProtocolOpen.value = false
}

function handleDocumentClick(event: MouseEvent) {
  if (!protocolSelectRef.value?.contains(event.target as Node)) {
    isProtocolOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})
</script>

<template>
  <section class="proxy-generator">
    <div class="proxy-controls">
      <label>
        <span>协议</span>
        <span ref="protocolSelectRef" class="proxy-select-wrap">
          <button
            class="proxy-select-trigger"
            type="button"
            :aria-expanded="isProtocolOpen"
            @click="isProtocolOpen = !isProtocolOpen"
          >
            <span>{{ protocol }}</span>
            <span class="proxy-select-arrow">V</span>
          </button>
          <Transition name="proxy-dropdown">
            <span v-if="isProtocolOpen" class="proxy-select-menu">
              <button
                v-for="option in protocolOptions"
                :key="option"
                class="proxy-select-option"
                :class="{ active: option === protocol }"
                type="button"
                @click="selectProtocol(option)"
              >
                {{ option }}
              </button>
            </span>
          </Transition>
        </span>
      </label>

      <label>
        <span>IP</span>
        <input v-model.trim="host" type="text" placeholder="127.0.0.1" />
      </label>

      <label>
        <span>端口</span>
        <input v-model.trim="port" type="text" inputmode="numeric" placeholder="7890" />
      </label>
    </div>

    <p class="proxy-preview">当前代理地址：<code>{{ proxyUrl }}</code></p>

    <div class="proxy-output">
      <article v-for="item in configs" :key="item.title" class="proxy-block">
        <div class="proxy-block-header">
          <h3>{{ item.title }}</h3>
          <button type="button" @click="copyText(item.code)">复制</button>
        </div>
        <pre><code>{{ item.code }}</code></pre>
      </article>
    </div>
  </section>
</template>

<style scoped>
.proxy-generator {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  margin: 24px 0;
  background: var(--vp-c-bg-soft);
}

.proxy-controls {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.proxy-controls label {
  display: grid;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
}

.proxy-controls input {
  width: 100%;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 8px 10px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  font-family: var(--vp-font-family-base);
  font-size: 14px;
  line-height: 1.5;
}

.proxy-select-wrap {
  position: relative;
  display: block;
}

.proxy-select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 8px 10px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  font-family: var(--vp-font-family-base);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  cursor: pointer;
}

.proxy-select-trigger:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.proxy-select-arrow {
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 700;
  transition: transform 0.16s ease;
}

.proxy-select-trigger[aria-expanded="true"] .proxy-select-arrow {
  transform: rotate(180deg);
}

.proxy-select-menu {
  position: absolute;
  z-index: 10;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  display: grid;
  gap: 4px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 6px;
  background: var(--vp-c-bg);
  box-shadow: 0 10px 28px rgb(0 0 0 / 12%);
}

.proxy-select-option {
  border: 0;
  border-radius: 6px;
  padding: 7px 8px;
  color: var(--vp-c-text-1);
  background: transparent;
  font-family: var(--vp-font-family-base);
  font-size: 14px;
  text-align: left;
  cursor: pointer;
}

.proxy-select-option:hover,
.proxy-select-option.active {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-default-soft);
}

.proxy-dropdown-enter-active,
.proxy-dropdown-leave-active {
  transition:
    opacity 0.16s ease,
    transform 0.16s ease;
}

.proxy-dropdown-enter-from,
.proxy-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.proxy-controls input::placeholder {
  color: var(--vp-c-text-3);
  opacity: 1;
}

.proxy-preview {
  margin: 14px 0 0;
}

.proxy-output {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-top: 16px;
}

.proxy-block {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  overflow: hidden;
}

.proxy-block-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.proxy-block-header h3 {
  margin: 0;
  font-size: 15px;
}

.proxy-block-header button {
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 6px;
  padding: 4px 10px;
  color: var(--vp-c-brand-1);
  background: transparent;
  cursor: pointer;
}

.proxy-block pre {
  margin: 0;
  padding: 12px;
  overflow-x: auto;
  background: transparent;
}

@media (max-width: 640px) {
  .proxy-controls {
    grid-template-columns: 1fr;
  }
}
</style>
