import { ipcRenderer } from 'electron'

export const userAPIs = {
  getUser: () => ipcRenderer.invoke('ipcAPIs.user.getUser')
}
