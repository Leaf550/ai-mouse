import { BrowserWindow, shell, screen } from 'electron'
import icon from '../../../resources/icon.png?asset'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

export function createVoiceFloatingWindow(): BrowserWindow {
  const workAreaSize = screen.getPrimaryDisplay().workAreaSize
  const screenWidth = workAreaSize.width
  const screenHeight = workAreaSize.height
  const floatingWidth = 300
  const floatingHeight = 200
  const floatingX = screenWidth - floatingWidth - 50
  const floatingY = screenHeight - floatingHeight - 50

  const voiceFloatingWindow = new BrowserWindow({
    x: floatingX,
    y: floatingY,
    width: floatingWidth,
    height: floatingHeight,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  voiceFloatingWindow.setAlwaysOnTop(true)

  voiceFloatingWindow.on('ready-to-show', () => {
    voiceFloatingWindow?.show()
  })

  voiceFloatingWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  const htmlPathFromRenderer = '/src/windows/voice-floating/voice-floating.html'

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    voiceFloatingWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + htmlPathFromRenderer)
  } else {
    voiceFloatingWindow.loadFile(join(__dirname, '../renderer', htmlPathFromRenderer))
  }

  return voiceFloatingWindow
}
