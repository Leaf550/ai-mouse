import { contextBridge } from 'electron'
import { netAPIs } from './NetAPIs'
import { userAPIs } from './UserAPIs'
import { mainProcTypes } from './MainProcTypes'
import { Versions } from './Versions'

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('netAPIs', netAPIs)
    contextBridge.exposeInMainWorld('userAPIs', userAPIs)
    contextBridge.exposeInMainWorld('mainProcTypes', mainProcTypes)
    contextBridge.exposeInMainWorld('versions', Versions)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.netAPIs = netAPIs
  // @ts-ignore (define in dts)
  window.userAPIs = userAPIs
  // @ts-ignore (define in dts)
  window.mainProcTypes = mainProcTypes
  // @ts-ignore (define in dts)
  window.versions = Versions
}
