import { ipcRenderer } from 'electron'

export const netAPIs = {
  get: (url: string, params?: Record<string, unknown>) => ipcRenderer.invoke('ipcAPIs.net.get', url, params),
  post: (url: string, data?: Record<string, unknown>) => ipcRenderer.invoke('ipcAPIs.net.post', url, data),
  postFile: (url: string, data?: FormData) => ipcRenderer.invoke('ipcAPIs.net.postFile', url, data)
}
