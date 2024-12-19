import {
  AIMouseDeviceInfo,
  AIMouseLEDStatus,
  AIMouseMicrophoneBitRate,
  AIMouseMicrophoneStatus
} from '../../base/device/DeviceInfo'

export class YUNMouseDeviceInfo implements AIMouseDeviceInfo {
  deviceName: string = '永佳盛YUN Mouse'
  vendorName: string = '永佳盛'
  vendorID: number = 0xabc9
  productID: number = 0xca89
  usage: number = 0
  usagePage: number = 65283
  snCode: string = ''
  microphoneStatus: AIMouseMicrophoneStatus = AIMouseMicrophoneStatus.Closed
  ledStatus: AIMouseLEDStatus = AIMouseLEDStatus.Closed
  voiceBitRate: AIMouseMicrophoneBitRate = AIMouseMicrophoneBitRate.B8K
  remainingBattery: number = 0
  firmwareVersion: string = ''
}
