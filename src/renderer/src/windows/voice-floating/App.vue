<script setup lang="ts">
import { AIMouseController } from './ai-mouse-stack/controller/AIMouseController'

const testDebut = () => {
  console.log(window.mainProcTypes.TestEnum.Test1)
  console.log(window.mainProcTypes.TestEnum.Test2)
}

const printMouse = () => {
  console.log(AIMouseController.shared().currentMouse())
}

AIMouseController.shared().startConnect()
</script>

<template>
  <div>test div</div>
  <button @click="testDebut">test print Main ipc enum</button>
  <div />
  <button @click="printMouse">print mouse info</button>
</template>

<style scoped></style>
