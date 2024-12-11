import { AIMouseDeviceInfo } from './DeviceInfo'

export class MicLinkDeviceInfo extends AIMouseDeviceInfo {
  deviceName: string = '麦链M71'
  vendorName: string = '麦链'
  vendorID: number = 0x248a
  productID: number = 0x60ab
  usage: number = 0
  usagePage: number = 0xff91
}
