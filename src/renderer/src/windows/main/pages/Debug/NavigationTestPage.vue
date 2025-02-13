<script setup lang="ts">
import { createNavigationTestPageStore } from '../../stores/page-stores/Debug/NavigationTestPageStore'
import { useNavigationStore } from '../../stores/NavigationStore'
import { useRouter } from 'vue-router'
import { usePageStore } from '../../composables/PageStore'
import { useRouteQueries } from '../../composables/RouteQueries'

interface Queries {
  previousTest?: number
}

const router = useRouter()
const navigationStore = useNavigationStore()

const testStore = usePageStore(createNavigationTestPageStore)
const queries: Queries = useRouteQueries(router)
console.log(queries)

if (testStore !== undefined && queries.previousTest !== undefined) {
  testStore.test = queries.previousTest
}

const onTestPlusButtonClick = () => {
  if (testStore) {
    testStore.test += 1
  }
}

const onTestMinusButtonClick = () => {
  if (testStore) {
    testStore.test -= 1
  }
}

const pushButtonClick = () => {
  navigationStore.pushToPath(router, '/debug/navigation_test', {
    previousTest: testStore?.test
  })
}

const backClick = () => {
  navigationStore.back(router)
}

const printNavStack = () => {
  console.log(navigationStore.currentNavigationStack)
}

const printNavStore = () => {
  console.log(navigationStore)
}
</script>

<template>
  <h1>导航测试页面</h1>
  <div>test value: {{ testStore?.test }}</div>
  <div>test value in route query: {{ queries.previousTest }}</div>
  <div><button @click="onTestPlusButtonClick">test++</button></div>
  <div><button @click="onTestMinusButtonClick">test--</button></div>
  <div><button @click="printNavStack">print navigation stack</button></div>
  <div><button @click="printNavStore">print navigation store</button></div>
  <div><button @click="pushButtonClick">push to next level</button></div>
  <div><button @click="backClick">back</button></div>
</template>

<style scoped></style>
