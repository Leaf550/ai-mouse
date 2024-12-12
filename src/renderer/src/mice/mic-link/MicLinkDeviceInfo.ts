import {
  AIMouseDeviceInfo,
  AIMouseLEDStatus,
  AIMouseMicrophoneBitRate,
  AIMouseMicrophoneStatus
} from '../base/device/DeviceInfo'

export class MicLinkDeviceInfo implements AIMouseDeviceInfo {
  deviceName: string = '麦链M71'
  vendorName: string = '麦链'
  vendorID: number = 0x248a
  productID: number = 0x60ab
  usage: number = 0
  usagePage: number = 0xff91
  snCode: string = ''
  microphoneStatus: AIMouseMicrophoneStatus = AIMouseMicrophoneStatus.Closed
  ledStatus: AIMouseLEDStatus = AIMouseLEDStatus.Closed
  voiceBitRate: AIMouseMicrophoneBitRate = AIMouseMicrophoneBitRate.B8K
  remainingBattery: number = 0
  firmwareVersion: string = ''
}
