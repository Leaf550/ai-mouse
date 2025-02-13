import { defineStore } from 'pinia'
import { ref } from 'vue'

export const createNavigationTestPageStore = (storeID: string) => {
  return defineStore(storeID, () => {
    const test = ref(0)
    return { test }
  })()
}
