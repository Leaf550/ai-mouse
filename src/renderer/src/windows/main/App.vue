<script setup lang="ts">
import NavigationView from './components/navigation/NavigationView.vue'
import { useNavigationStore } from './stores/NavigationStore'

const navigationStore = useNavigationStore()
</script>

<template>
  <div class="navigationArea">
    <NavigationView />
  </div>
  <div class="appTitleBarArea"></div>
  <div class="appContentArea">
    {{
      `${navigationStore.currentSelectedFirstLevelItem?.title ?? '1'} - ${navigationStore.currentSelectedSecondLevelItem?.title ?? '2'}`
    }}
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
}
</style>
