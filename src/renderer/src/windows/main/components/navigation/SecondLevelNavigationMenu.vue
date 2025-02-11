<script setup lang="ts">
import { useNavigationStore } from '../../stores/NavigationStore'

const navigationStore = useNavigationStore()

const onSecondNavigationItemSelected = (index: number) => {
  navigationStore.selectSecondIndex(navigationStore.firstLevelSelected, index)
}
</script>

<template>
  <div class="secondLevelNavigationMenuContainer">
    <div class="firstLevelTitleBar">{{ navigationStore.currentSelectedFirstLevelItem?.title }}</div>
    <div class="secondLevelNavigationList">
      <div
        v-for="(config, index) in navigationStore.curreentSecondNavigationList"
        :key="config.title"
        class="secondLevelNavigationItem"
        :class="{ secondLevelNavigationItemSelected: config.isSelected }"
        @click="onSecondNavigationItemSelected(index)"
      >
        {{ config.title }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.secondLevelNavigationMenuContainer {
  width: 100%;
  height: 100%;
}

.firstLevelTitleBar {
  -webkit-app-region: drag;
  height: 50px;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: rgb(220, 220, 220);
  padding-left: 15px;
  line-height: 50px;
  font-weight: 500;
  font-size: large;
  color: rgb(50, 60, 69);
}

.secondLevelNavigationList {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 5px;

  .secondLevelNavigationItem {
    height: 50px;
    line-height: 50px;
    margin: 5px 5px 0 5px;
    padding-left: 10px;
    border-radius: 8px;
  }

  .secondLevelNavigationItem:hover {
    background-color: rgb(242, 248, 252);
  }

  .secondLevelNavigationItemSelected {
    background-color: rgb(242, 248, 252);
    color: rgb(98, 192, 140);
  }
}
</style>
