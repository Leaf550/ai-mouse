import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

export const routeRecordsInAIGroup: RouteRecordRaw[] = [
  {
    path: '/ai/ask',
    component: () => import('@renderer/windows/main/pages/AI/AIAsk.vue'),
    meta: {
      title: '智能问答'
    }
  },
  {
    path: '/ai/write',
    component: () => import('@renderer/windows/main/pages/AI/AIWrite.vue'),
    meta: {
      title: '智能写作'
    }
  },
  {
    path: '/ai/write',
    component: () => import('@renderer/windows/main/pages/AI/AIWrite.vue'),
    meta: {
      title: '智能绘图'
    }
  },
  {
    path: '/ai/write',
    component: () => import('@renderer/windows/main/pages/AI/AIWrite.vue'),
    meta: {
      title: '智能PPT'
    }
  }
]

export const routeRecordsInSettingsGroup: RouteRecordRaw[] = [
  {
    path: '/not-found',
    component: () => import('@renderer/windows/main/pages/ErrorPage/NotFound.vue'),
    meta: {
      title: '鼠标设置'
    }
  },
  {
    path: '/not-found',
    component: () => import('@renderer/windows/main/pages/ErrorPage/NotFound.vue'),
    meta: {
      title: '界面设置'
    }
  }
]

export const routeRecordsInDebugGroup: RouteRecordRaw[] = [
  {
    path: '/debug/components_preview',
    component: () => import('@renderer/windows/main/pages/Debug/ComponentsPreview.vue'),
    meta: {
      title: '控件预览'
    }
  },
  {
    path: '/not-found',
    component: () => import('@renderer/windows/main/pages/ErrorPage/NotFound.vue'),
    meta: {
      title: '页面丢失'
    }
  },
  {
    path: '/debug/navigation_test',
    component: () => import('@renderer/windows/main/pages/Debug/NavigationTestPage.vue'),
    meta: {
      title: '导航测试'
    }
  },
  {
    path: '/debug/navigation_test',
    component: () => import('@renderer/windows/main/pages/Debug/NavigationTestPage.vue'),
    meta: {
      title: '导航测试2'
    }
  }
]

export const otherRouteRecords: RouteRecordRaw[] = []

const routeRecords: RouteRecordRaw[] = [
  ...routeRecordsInAIGroup,
  ...routeRecordsInSettingsGroup,
  ...routeRecordsInDebugGroup,
  ...otherRouteRecords
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routeRecords
})
