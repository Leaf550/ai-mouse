import { defineStore, StoreGeneric } from 'pinia'
import { ref, computed } from 'vue'
import { Router, LocationQueryRaw } from 'vue-router'

export interface NavigationStackItem {
  path: string
  navigationItemID: string
  query?: LocationQueryRaw
  store?: StoreGeneric
}

export interface TabItemConfig {
  isSelected: boolean
  readonly title: string
  readonly routerPath?: string
}

export interface FirstLevelTabItemConfig extends TabItemConfig {
  readonly iconName: string
  readonly nextLevelItems?: SecondLevelTabItemConfig[]
}

export interface SecondLevelTabItemConfig extends TabItemConfig {
  navigationStack: NavigationStackItem[]
}

const initialTabConfigs: FirstLevelTabItemConfig[] = [
  {
    isSelected: true,
    title: 'AI智能体',
    iconName: 'Menu',
    nextLevelItems: [
      {
        isSelected: true,
        title: '智能问答',
        routerPath: '/ai/ask'
      },
      {
        isSelected: false,
        title: '智能写作',
        routerPath: '/ai/write'
      },
      {
        isSelected: false,
        title: '智能绘图',
        routerPath: '/ai/paint'
      },
      {
        isSelected: false,
        title: '智能PPT',
        routerPath: '/ai/slide_show'
      },
      {
        isSelected: false,
        title: '错误页面',
        routerPath: '/not-found'
      }
    ]
  },
  {
    isSelected: false,
    title: '设置',
    iconName: 'Setting',
    nextLevelItems: [
      {
        isSelected: true,
        title: '鼠标设置',
        // routerPath: '/settings/mouse'
        routerPath: '/ai/ask'
      },
      {
        isSelected: false,
        title: '界面设置',
        // routerPath: '/settings/interface'
        routerPath: '/not-found'
      }
    ]
  },
  {
    isSelected: false,
    title: 'Debug',
    iconName: 'ChromeFilled',
    nextLevelItems: [
      {
        isSelected: true,
        title: '导航测试',
        routerPath: '/debug/navigation_test'
      },
      {
        isSelected: false,
        title: '导航测试2',
        routerPath: '/debug/navigation_test'
      },
      {
        isSelected: false,
        title: '控件预览',
        routerPath: '/debug/components_preview'
      }
    ]
  }
].map((firstLevelItem, firstLevelItemIndex) => {
  firstLevelItem.nextLevelItems = firstLevelItem.nextLevelItems.map((secondLevelItem, secondLevelItemIndex) => {
    const navigationStack: NavigationStackItem[] = [
      {
        path: secondLevelItem.routerPath,
        navigationItemID: `${firstLevelItemIndex}` + '-' + `${secondLevelItemIndex}`
      }
    ]
    const res = {
      ...secondLevelItem,
      navigationStack
    }

    return res
  })
  return firstLevelItem as FirstLevelTabItemConfig
})

export const useNavigationStore = defineStore('NavigationStore', () => {
  const tabConfigs = ref(initialTabConfigs)

  const firstLevelTabSelectedIndex = computed(() => initialTabConfigs.findIndex((item) => item.isSelected))

  const secondLevelTabSelectedIndex = computed(() => {
    return initialTabConfigs.map((firstLevelConfig) => {
      return (firstLevelConfig.nextLevelItems ?? []).findIndex((item) => item.isSelected)
    })
  })

  const currentSelectedFirstLevelTabItem = computed(() => tabConfigs.value.find((config) => config.isSelected))

  const currentSecondTabsList = computed(() => tabConfigs.value.find((first) => first.isSelected)?.nextLevelItems)

  const currentSelectedSecondLevelTabItem = computed(() =>
    currentSecondTabsList.value?.find((config) => config.isSelected)
  )

  const currentNavigationStack = computed(() => currentSelectedSecondLevelTabItem.value?.navigationStack)

  const currentNavigationStackTopItem = computed(() => {
    const currentStack = currentNavigationStack.value
    if (!currentStack) {
      return undefined
    }
    if (currentStack.length === 0) {
      return undefined
    }

    return currentStack[currentStack.length - 1]
  })

  const selectFirstLevelTabAt = (index: number, router?: Router) => {
    if (tabConfigs.value.length <= index) {
      return
    }
    tabConfigs.value.forEach((config) => {
      if (config.isSelected) {
        config.isSelected = false
      }
    })
    tabConfigs.value[index].isSelected = true

    switchTab(router)
  }

  const selectSecondLevelTabAt = (firstIndex: number, secondIndex: number, router?: Router) => {
    if (tabConfigs.value.length <= firstIndex) {
      return
    }

    if ((tabConfigs.value[firstIndex].nextLevelItems?.length ?? 0) <= secondIndex) {
      return
    }

    ;(tabConfigs.value[firstIndex].nextLevelItems ?? []).forEach((config) => {
      if (config.isSelected) {
        config.isSelected = false
      }
    })
    ;(tabConfigs.value[firstIndex].nextLevelItems ?? [])[secondIndex].isSelected = true

    switchTab(router)
  }

  const switchTab = (router?: Router) => {
    const currentNavigationItem = currentNavigationStackTopItem.value
    if (!currentNavigationItem) {
      return
    }
    router?.replace({
      path: currentNavigationItem.path,
      query: {
        queriesJSONString: JSON.stringify({
          ...currentNavigationItem.query
        }),
        navigationItemID: currentNavigationItem.navigationItemID
      }
    })
  }

  const pushToNavigationStack = (path: string, query?: LocationQueryRaw) => {
    const navigationItem = {
      path,
      query: query,
      navigationItemID: (currentNavigationStackTopItem.value?.navigationItemID ?? '') + path
    }
    currentNavigationStack.value?.push(navigationItem)
  }

  const push = (router: Router, path: string, query?: LocationQueryRaw) => {
    pushToNavigationStack(path, query)
    if (!currentNavigationStackTopItem.value) {
      return
    }
    router.replace({
      path: currentNavigationStackTopItem.value.path,
      query: {
        queriesJSONString: JSON.stringify({
          ...currentNavigationStackTopItem.value.query
        }),
        navigationItemID: currentNavigationStackTopItem.value.navigationItemID
      }
    })
  }

  const back = (router: Router) => {
    if (currentNavigationStack.value?.length === 1) {
      console.log('this is root page')
      return
    }
    currentNavigationStack.value?.pop()
    if (!currentNavigationStackTopItem.value) {
      return
    }
    router.replace({
      path: currentNavigationStackTopItem.value.path,
      query: {
        queriesJSONString: JSON.stringify({
          ...currentNavigationStackTopItem.value.query
        }),
        navigationItemID: currentNavigationStackTopItem.value.navigationItemID
      }
    })
  }

  return {
    tabConfigs,
    firstLevelTabSelectedIndex,
    secondLevelTabSelectedIndex,
    currentNavigationStack,
    currentNavigationStackTopItem,
    selectFirstLevelTabAt,
    selectSecondLevelTabAt,
    currentSelectedFirstLevelTabItem,
    currentSecondTabsList,
    currentSelectedSecondLevelTabItem,
    push,
    back
  }
})
