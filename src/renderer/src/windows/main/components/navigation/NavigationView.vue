<script setup lang="ts">
import FirstLevelNavigationMenu from './FirstLevelNavigationMenu.vue'
import SecondLevelNavigationMenu from './SecondLevelNavigationMenu.vue'
</script>

<template>
  <div>
    <div class="firstLevelNavigationMenuArea">
      <FirstLevelNavigationMenu />
    </div>
    <div class="secondLevelNavigationMenuArea">
      <SecondLevelNavigationMenu />
    </div>
  </div>
</template>

<style scoped>
.firstLevelNavigationMenuArea {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 70px;
}

.secondLevelNavigationMenuArea {
  position: absolute;
  top: 0;
  left: 70px;
  width: 200px;
  right: 0;
  bottom: 0;
}
</style>
