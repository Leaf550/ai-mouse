<script setup lang="ts">
import { FirstLevelTabItemConfig } from '@renderer/windows/main/stores/NavigationStore'

interface Props {
  itemConfig: FirstLevelTabItemConfig
}

const props = defineProps<Props>()
</script>

<template>
  <div class="navigationItemIconBox">
    <component
      :is="props.itemConfig.iconName"
      class="navigationItemIcon"
      :class="{ navigationItemSelected: props.itemConfig.isSelected }"
    />
  </div>
</template>

<style lang="scss" scoped>
.navigationItemIconBox {
  -webkit-app-region: no-drag;
  margin-bottom: 20px;
}

.navigationItemIcon {
  width: 25px;
  height: 25px;
  padding: 10px;
  border-radius: 7px;
  color: rgb(134, 145, 154);
}

.navigationItemIcon:hover {
  color: rgb(255, 255, 255);
}

.navigationItemSelected {
  background-color: rgb(60, 68, 81);
  color: rgb(255, 255, 255);
}
</style>
