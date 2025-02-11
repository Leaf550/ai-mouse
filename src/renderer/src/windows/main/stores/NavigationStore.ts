import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface NavigationItemConfig {
  isSelected: boolean
  readonly title: string
  readonly iconName: string
  readonly nextLevelItems?: NavigationItemConfig[]
}

const initialNavigationConfigs: NavigationItemConfig[] = [
  {
    isSelected: true,
    title: 'AI智能体',
    iconName: 'Menu',
    nextLevelItems: [
      {
        isSelected: true,
        title: '智能问答',
        iconName: ''
      },
      {
        isSelected: false,
        title: '智能写作',
        iconName: ''
      },
      {
        isSelected: false,
        title: '智能绘图',
        iconName: ''
      },
      {
        isSelected: false,
        title: '智能PPT',
        iconName: ''
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
        iconName: ''
      },
      {
        isSelected: false,
        title: '界面设置',
        iconName: ''
      }
    ]
  }
]

export const useNavigationStore = defineStore('NavigationStore', () => {
  const navigationConfigs = ref(initialNavigationConfigs)

  const firstLevelSelected = computed(() => initialNavigationConfigs.findIndex((item) => item.isSelected))

  const secondLevelSelected = computed(() => {
    return initialNavigationConfigs.map((firstLevelConfig) => {
      return (firstLevelConfig.nextLevelItems ?? []).findIndex((item) => item.isSelected)
    })
  })

  const currentSelectedFirstLevelItem = computed(() => navigationConfigs.value.find((config) => config.isSelected))

  const curreentSecondNavigationList = computed(
    () => navigationConfigs.value.find((first) => first.isSelected)?.nextLevelItems
  )

  const currentSelectedSecondLevelItem = computed(() =>
    curreentSecondNavigationList.value?.find((config) => config.isSelected)
  )

  const selectFirstIndex = (index: number) => {
    if (navigationConfigs.value.length <= index) {
      return
    }
    navigationConfigs.value.forEach((config) => {
      if (config.isSelected) {
        config.isSelected = false
      }
    })
    navigationConfigs.value[index].isSelected = true
  }

  const selectSecondIndex = (firstIndex: number, secondIndex: number) => {
    if (navigationConfigs.value.length <= firstIndex) {
      return
    }

    console.log(navigationConfigs.value[firstIndex].nextLevelItems?.length ?? 0)

    if ((navigationConfigs.value[firstIndex].nextLevelItems?.length ?? 0) <= secondIndex) {
      return
    }

    ;(navigationConfigs.value[firstIndex].nextLevelItems ?? []).forEach((config) => {
      if (config.isSelected) {
        config.isSelected = false
      }
    })
    ;(navigationConfigs.value[firstIndex].nextLevelItems ?? [])[secondIndex].isSelected = true

    console.log(navigationConfigs.value)
  }

  return {
    navigationConfigs,
    firstLevelSelected,
    secondLevelSelected,
    selectFirstIndex,
    selectSecondIndex,
    currentSelectedFirstLevelItem,
    curreentSecondNavigationList,
    currentSelectedSecondLevelItem
  }
})
