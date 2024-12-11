import { BrowserWindow } from 'electron'
import { IPCMainProcessor } from '../ipc/IPCMainProcessor'

export class MainProcessMouseConnector implements IPCMainProcessor {
  private static instance?: MainProcessMouseConnector

  public static shared() {
    if (this.instance === undefined) {
      this.instance = new MainProcessMouseConnector()
    }
    return this.instance
  }

  public setPermissionForDevicesIn(window: BrowserWindow) {
    window.webContents.session.setPermissionCheckHandler(() => {
      return true
    })

    window.webContents.session.setDevicePermissionHandler((details) => {
      const deviceTypeValied = details.deviceType === 'usb' || details.deviceType === 'hid'
      const originValied = details.origin.startsWith('file://') || details.origin.startsWith('http://')
      if (deviceTypeValied && originValied) {
        return true
      }
      return false
    })
  }

  registerIPC(): void {
    //
  }
}
