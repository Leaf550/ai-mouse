<script setup lang="ts">
import { MicLinkAIMouseHIDConnector } from '@renderer/mice/mic-link/MicLinkAIMouseHIDConnector'
import { AIMouseController } from '../../mice/base/controller/AIMouseController'

const testDebut = () => {
  console.log(window.mainProcTypes.TestEnum.Test1)
  console.log(window.mainProcTypes.TestEnum.Test2)
}

const printMouse = () => {
  console.log(AIMouseController.shared().currentMouse())
}

const getMouseInfo = () => {
  AIMouseController.shared().sendDataToDevice(new Uint8Array([0x61]))
}

AIMouseController.shared().addConnectors(new MicLinkAIMouseHIDConnector())
AIMouseController.shared().startConnect()
</script>

<template>
  <button @click="testDebut">test print Main ipc enum</button>
  <div />
  <button @click="printMouse">print mouse info</button>
  <div />
  <button @click="getMouseInfo">send 0x61 to mouse (get mouse info)</button>
</template>

<style scoped></style>
