<script setup lang="ts">
import { useNavigationStore } from '../../stores/NavigationStore'
import { useRouter } from 'vue-router'

const navigationStore = useNavigationStore()
const router = useRouter()

const onBackButtonClick = () => {
  navigationStore.back(router)
}
</script>

<template>
  <div class="navigationBarContainer">
    <div class="backButton">
      <el-button
        v-show="!navigationStore.isCurrentNavigationStackTopItemRoot"
        type="primary"
        text
        icon="ArrowLeftBold"
        @click="onBackButtonClick"
      >
        {{ navigationStore.currentNavigationStackSecondToTopItem?.title ?? '返回' }}
      </el-button>
    </div>
    <div class="pageTitle">{{ navigationStore.currentNavigationStackTopItem?.title ?? '未知页面' }}</div>
    <div class="rightItem" />
  </div>
</template>

<style scoped>
.navigationBarContainer {
  height: 100%;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .backButton {
    -webkit-app-region: no-drag;
    width: 100px;
  }

  .pageTitle {
    font-size: larger;
  }

  .rightItem {
    width: 100px;
  }
}
</style>
