import { TestEnum } from "../types/TestExport"

interface ipcAPIsType {
  net: ipcNetAPI
}

interface Response<Data> {
  code: number
  data: Data
  message: string
}

interface ipcNetAPI {
  get: <D>(url: string, params?: any) => Promise<Response<D>>
  post: <D>(url: string, data?: any) => Promise<Response<D>>
  postFile: <D>(url: string, data?: FormData) => Promise<Response<D>>,
}

interface Versions {
  electronVersion?: string
  chromeVersion?: string
  nodeVersion?: string
}

interface MainProcTypes {
  TestEnum: typeof TestEnum
}

declare global {
  interface Window {
    netAPIs: ipcAPIsType,
    versions: Versions,
    mainProcTypes: MainProcTypes,
  }
}
