import { AIMouseButton } from './AIMouseButton'
import { AIMouseDeviceInfo } from './device-info/DeviceInfo'

export enum AIMouseDataTransferStatus {
  Success,
  Failed
}

export enum AIMouseConnectionType {
  USB,
  HID,
  Bluetooth
}

export class AIMouseDataTransferInResult {
  status: AIMouseDataTransferStatus
  data: DataView

  constructor(status: AIMouseDataTransferStatus, data: DataView) {
    this.status = status
    this.data = data
  }
}

export interface AIMouse {
  connectionType: AIMouseConnectionType

  deviceInfo: AIMouseDeviceInfo
  buttons: AIMouseButton[]

  sendData(data: Int8Array): void
  recieveData(data: AIMouseDataTransferInResult): void
}

export interface AIHIDMouse extends AIMouse {
  hidDevice?: HIDDevice
}

export interface AIBluetoothMouse extends AIMouse {
  bluetoothDevice?: BluetoothDevice
}
