import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [vue()],
    build: {
      rollupOptions: {
        input: {
          mainWindow: resolve(__dirname, 'src/renderer/src/windows/main/main.html'),
          floatingWindow: resolve(__dirname, 'src/renderer/src/windows/voice-floating/voice-floating.html')
        }
      }
    }
  }
})
