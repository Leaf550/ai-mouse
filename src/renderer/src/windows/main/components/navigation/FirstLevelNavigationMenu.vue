<script setup lang="ts">
import FirstLevelNavigationItem from './FirstLevelNavigationItem.vue'
import { useNavigationStore } from '../../stores/NavigationStore'
import { useRouter } from 'vue-router'

const navigationStore = useNavigationStore()
const router = useRouter()

const onItemClick = (index: number) => {
  navigationStore.selectFirstLevelTabAt(index, router)
}
</script>

<template>
  <div class="firstLevelNavigationBar">
    <div v-for="(item, index) in navigationStore.tabConfigs" :key="item.title">
      <FirstLevelNavigationItem :item-config="item" @click="onItemClick(index)" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.firstLevelNavigationBar {
  -webkit-app-region: drag;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2c2932;
}
</style>
