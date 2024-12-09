import axios from 'axios'
import { ipcMain } from 'electron'
import { AIMUser } from '../user/AIMUser'
import { IPCMainProcessor } from '../ipc/IPCMainProcessor'

export class AIMReqeusts implements IPCMainProcessor {
  private baseURL = 'https://4759fc12293542de9f68347241c36841.api.mockbin.io'

  private axiosInstance = (() => {
    const instance = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${AIMUser.shared().token ?? ''}`,
        'Content-Type': 'application/json'
      }
    })
    return instance
  })()

  private static instance = new AIMReqeusts()

  public static shared() {
    return this.instance
  }

  private async get(url: string, params: Record<string, unknown>) {
    const res = await this.axiosInstance.get(url, params)
    return res.data
  }

  private async post(url: string, data: Record<string, unknown>) {
    const res = await this.axiosInstance.post(url, data)
    return res.data
  }

  private async postFile(url: string, data: FormData) {
    const res = await this.axiosInstance.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return res.data
  }

  // IPCMainProcessor implements
  registerIPC() {
    ipcMain.handle('ipcAPIs.net.get', (_event, url, params) => {
      return this.get(url, params)
    })

    ipcMain.handle('ipcAPIs.net.post', (_event, url, data) => {
      return this.post(url, data)
    })

    ipcMain.handle('ipcAPIs.net.postFile', (_event, url, formData) => {
      return this.postFile(url, formData)
    })
  }
}
