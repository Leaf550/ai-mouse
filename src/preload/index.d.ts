import { TestEnum } from '../types/TestExport'
import { AIMUserInfo } from '../main/user/AIMUser'

interface Response<Data> {
  code: number
  data: Data
  message: string
}

interface NetAPIs {
  get: <D>(url: string, params?: Record<string, unknown>) => Promise<Response<D>>
  post: <D>(url: string, data?: Record<string, unknown>) => Promise<Response<D>>
  postFile: <D>(url: string, data?: FormData) => Promise<Response<D>>
}

interface UserAPIs {
  getUser: () => Promise<AIMUserInfo>
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
    netAPIs: NetAPIs
    userAPIs: UserAPIs
    versions: Versions
    mainProcTypes: MainProcTypes
  }
}
