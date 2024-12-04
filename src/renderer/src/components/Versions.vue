<script setup lang="ts">
import { ref } from 'vue'

const versions = ref({ ...window.versions })
</script>

<template>
  <ul class="versions">
    <li class="electron-version">Electron v{{ versions.electronVersion }}</li>
    <li class="chrome-version">Chromium v{{ versions.chromeVersion }}</li>
    <li class="node-version">Node v{{ versions.nodeVersion }}</li>
  </ul>
</template>
