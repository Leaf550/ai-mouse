import { app, BrowserWindow } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { IPCMainProcessorManager } from './ipc/IPCMainProcessor'
import { createMainWindow } from './windows/MainWindow'
import { createVoiceFloatingWindow } from './windows/VoiceFloatingWindow'
import { MainProcessMouseConnector } from './mouse-connection/MainProcessMouseConnector'

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createMainWindow()
  const voiceFloatingWindow = createVoiceFloatingWindow()
  MainProcessMouseConnector.shared().setPermissionForDevicesIn(voiceFloatingWindow)

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
      createVoiceFloatingWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', () => {
  IPCMainProcessorManager.registerProcessors()

  // const win = new BaseWindow({ width: 1125, height: 667 })

  // const view1 = new WebContentsView()
  // win.contentView.addChildView(view1)
  // view1.webContents.loadURL('https://electron.js.cn')
  // view1.setBounds({ x: 0, y: 0, width: 375, height: 667 })

  // const view2 = new WebContentsView()
  // win.contentView.addChildView(view2)
  // view2.webContents.loadURL('https://github.com/electron/electron')
  // view2.setBounds({ x: 375, y: 0, width: 375, height: 667 })

  // const view3 = new WebContentsView()
  // win.contentView.addChildView(view3)
  // view3.webContents.loadURL('https://m.baidu.com')
  // view3.setBounds({ x: 750, y: 0, width: 375, height: 667 })
})
