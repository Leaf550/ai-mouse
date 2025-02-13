<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref('')
const switchStatus = ref(true)
</script>

<template>
  <h1>控件预览</h1>
  <el-button type="primary">按钮</el-button>
  <el-button type="primary" plain>按钮</el-button>
  <el-button type="warning">按钮</el-button>
  <el-button type="danger">按钮</el-button>
  <div style="margin-top: 7px" />
  <el-input v-model="inputValue" placeholder="请输入" />
  <el-switch v-model="switchStatus" />
</template>

<style scoped></style>
