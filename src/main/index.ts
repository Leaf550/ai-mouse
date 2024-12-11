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
})
