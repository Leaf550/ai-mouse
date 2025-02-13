import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import '@renderer/assets/element/index.scss'
// import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { router } from '@renderer/windows/main/router/routes'

import { createPinia } from 'pinia'

const app = createApp(App)

app.use(ElementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)

const pinia = createPinia()
app.use(pinia)

app.mount('#app')
