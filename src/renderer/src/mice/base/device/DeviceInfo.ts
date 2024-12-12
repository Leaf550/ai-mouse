export enum AIMouseMicrophoneStatus {
  Opened,
  Closed
}

export enum AIMouseLEDStatus {
  Opened,
  Closed
}

export enum AIMouseMicrophoneBitRate {
  B16K,
  B8K
}

export interface AIMouseDeviceInfo {
  deviceName: string
  vendorName: string
  vendorID: number
  productID: number
  usage: number
  usagePage: number
  snCode: string
  microphoneStatus: AIMouseMicrophoneStatus
  ledStatus: AIMouseLEDStatus
  voiceBitRate: AIMouseMicrophoneBitRate
  remainingBattery: number
  firmwareVersion: string
}
