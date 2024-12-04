<script setup lang="ts">
import Versions from '@renderer/components/Versions.vue'

const ipcHandle = () => {
  interface TestRes {
    total?: number
  }

  window.netAPIs.net
    .get<TestRes>('/')
    .then((res) => {
      console.log(res)
      console.log(res.data.total ?? 0)
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      console.log('test get finish')
    })
}
</script>

<template>
  <img alt="logo" class="logo" src="@renderer/assets/electron.svg" />
  <div class="creator">Powered by electron-vite</div>
  <div class="text">
    Build an Electron app with
    <span class="vue">Vue</span>
    and
    <span class="ts">TypeScript</span>
  </div>
  <p class="tip">Please try pressing <code>F12</code> to open the devTool</p>
  <div class="actions">
    <div class="action">
      <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">Documentation</a>
    </div>
    <div class="action">
      <a target="_blank" rel="noreferrer" @click="ipcHandle">Test netAPIs</a>
    </div>
  </div>
  <Versions />
</template>
