import { AIMouseDataParser, AIMouseEvent, AIMouseEventType } from '../data-parser/AIMouseDataParser'
import { AIMouseButton, AIMouseButtonAction, AIMouseButtonStatus } from './AIMouseButton'
import { AIMouseDeviceInfo } from './DeviceInfo'

export enum AIMouseConnectionType {
  USB,
  HID,
  Bluetooth
}

export class AIMouseDataEventListener {
  handleDataEvent: (event: AIMouseEvent) => void

  constructor(handleDataEvent: (event: AIMouseEvent) => void) {
    this.handleDataEvent = handleDataEvent
  }
}

export abstract class AIMouse {
  abstract connectionType: AIMouseConnectionType
  abstract dataParser: AIMouseDataParser

  abstract deviceInfo: AIMouseDeviceInfo
  abstract buttons: AIMouseButton[]

  abstract listenDeviceEvent(): void
  abstract sendData(data: Uint8Array): void

  dataEventListeners: AIMouseDataEventListener[] = []

  parseRawData(data: DataView) {
    const event = this.dataParser.parseAIMouseData(data)

    switch (event.eventType) {
      case AIMouseEventType.ButtonEvent:
        for (const button of this.buttons) {
          if (button.name === event.buttonName && event.buttonAction !== undefined) {
            if (event.buttonAction === AIMouseButtonAction.Down) {
              button.status = AIMouseButtonStatus.Down
            }
            if (event.buttonAction === AIMouseButtonAction.Up) {
              button.status = AIMouseButtonStatus.Up
            }
            button.onButtonEvent(button, event.buttonAction)
          }
        }
        break
      case AIMouseEventType.DataEvent:
        for (const dataEventListener of this.dataEventListeners) {
          dataEventListener.handleDataEvent(event)
        }
        break
    }
  }

  dispose() {
    this.dataEventListeners = []
  }
}

export abstract class AIHIDMouse extends AIMouse {
  hidDevice: HIDDevice
  connectionType: AIMouseConnectionType = AIMouseConnectionType.HID

  constructor(hidDevice: HIDDevice) {
    super()
    this.hidDevice = hidDevice
  }

  private inputreportListener = (event: HIDInputReportEvent) => {
    this.parseRawData(event.data)
  }

  listenDeviceEvent() {
    this.hidDevice?.addEventListener('inputreport', this.inputreportListener)
  }

  sendData(data: Uint8Array): void {
    this.hidDevice?.sendReport(0, data)
  }

  override dispose(): void {
    super.dispose()
    this.hidDevice?.removeEventListener('inputreport', this.inputreportListener)
  }
}

export abstract class AIBluetoothMouse extends AIMouse {
  bluetoothDevice: BluetoothDevice

  constructor(bluetoothDevice: BluetoothDevice) {
    super()
    this.bluetoothDevice = bluetoothDevice
  }

  listenDeviceEvent(): void {
    // todo
  }
}
