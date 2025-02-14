<script setup lang="ts">
// import { onMounted } from 'vue'
import { useNavigationStore } from './stores/NavigationStore'
import { useRouter } from 'vue-router'
import NavigationView from './components/navigation/NavigationView.vue'
import NavigationBar from './components/navigation/NavigationBar.vue'

// onMounted(() => {
const router = useRouter()

const navigationStore = useNavigationStore()
const currentNavigationStackTopItem = navigationStore.currentNavigationStackTopItem

router.push({
  path: currentNavigationStackTopItem?.path ?? '/',
  query: currentNavigationStackTopItem?.query
})
// })
</script>

<template>
  <div class="navigationArea">
    <NavigationView />
  </div>
  <div class="appTitleBarArea">
    <NavigationBar />
  </div>
  <div class="appContentArea">
    <RouterView :key="$route.fullPath" />
  </div>
</template>

<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>

<style lang="scss" scoped>
.navigationArea {
  width: 270px;
  height: 100%;
  box-shadow: 2px 0 5px rgb(220, 220, 220);
}

.appTitleBarArea {
  -webkit-app-region: drag;
  position: absolute;
  top: 0;
  left: 270px;
  right: 0;
  height: 50px;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: rgb(220, 220, 220);
  // background-color: yellow;
}

.appContentArea {
  position: absolute;
  top: 50px;
  left: 270px;
  right: 0;
  bottom: 0;
  padding: 8px;
  overflow-y: auto;
}
</style>
