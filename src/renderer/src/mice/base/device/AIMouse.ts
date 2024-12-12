import { AIMouseDataParser, AIMouseEvent } from '../data-parser/AIMouseDataParser'
import { AIMouseButton } from './AIMouseButton'
import { AIMouseDeviceInfo } from './DeviceInfo'

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

export abstract class AIMouse {
  abstract connectionType: AIMouseConnectionType
  abstract dataParser: AIMouseDataParser

  abstract deviceInfo: AIMouseDeviceInfo
  abstract buttons: AIMouseButton[]

  abstract listenDeviceEvent(): void

  abstract sendData(data: Uint8Array): void

  abstract onAIMouseEvent(event: AIMouseEvent): void

  receiveData(data: DataView) {
    const event = this.dataParser.parseAIMouseData(data)
    this.onAIMouseEvent(event)
  }
}

export abstract class AIHIDMouse extends AIMouse {
  hidDevice?: HIDDevice

  listenDeviceEvent() {
    this.hidDevice?.addEventListener('inputreport', (event) => {
      this.receiveData(event.data)
    })
  }

  sendData(data: Uint8Array): void {
    this.hidDevice?.sendReport(0, data)
  }
}

export abstract class AIBluetoothMouse extends AIMouse {
  bluetoothDevice?: BluetoothDevice
}
