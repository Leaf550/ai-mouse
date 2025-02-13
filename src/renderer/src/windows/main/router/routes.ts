import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@renderer/windows/main/pages/IPCDemo/TestPage.vue')
  },
  {
    path: '/not-found',
    component: () => import('@renderer/windows/main/pages/ErrorPage/NotFound.vue')
  },
  {
    path: '/ai/ask',
    component: () => import('@renderer/windows/main/pages/AI/AIAsk.vue')
  },
  {
    path: '/ai/write',
    component: () => import('@renderer/windows/main/pages/AI/AIWrite.vue')
  },
  {
    path: '/debug/navigation_test',
    component: () => import('@renderer/windows/main/pages/Debug/NavigationTestPage.vue')
  },
  {
    path: '/debug/components_preview',
    component: () => import('@renderer/windows/main/pages/Debug/ComponentsPreview.vue')
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})
