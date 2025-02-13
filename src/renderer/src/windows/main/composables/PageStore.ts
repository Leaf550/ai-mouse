import { StoreGeneric } from 'pinia'
import { useNavigationStore } from '@renderer/windows/main/stores/NavigationStore'

const navigationStore = useNavigationStore()

type StoreCreator<Store extends StoreGeneric> = (storeID: string) => Store

export const usePageStore = <Store extends StoreGeneric>(storeCreator: StoreCreator<Store>) => {
  let store: Store | undefined = undefined

  const now = new Date().getTime().toString()

  const currentNavigationItem = navigationStore.currentNavigationStackTopItem
  if (!currentNavigationItem) {
    console.log('error!')
    return
  }
  if (!currentNavigationItem.store) {
    store = storeCreator(now)
    currentNavigationItem.store = store
  } else {
    store = currentNavigationItem.store
  }

  return store
}
