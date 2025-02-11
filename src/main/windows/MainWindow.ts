import { BrowserWindow, shell } from 'electron'
import icon from '../../../resources/icon.png?asset'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

export function createMainWindow(): BrowserWindow {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 720,
    show: false,
    titleBarStyle: 'hidden',
    autoHideMenuBar: true,
    alwaysOnTop: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  const htmlPathFromRenderer = '/src/windows/main/main.html'

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + htmlPathFromRenderer)
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer', htmlPathFromRenderer))
  }

  return mainWindow
}
