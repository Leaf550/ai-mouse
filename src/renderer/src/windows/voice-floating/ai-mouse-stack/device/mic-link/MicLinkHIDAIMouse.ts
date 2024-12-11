import { AIMouseConnectionType, AIMouseDataTransferInResult, AIHIDMouse } from '../AIMouse'
import { AIMouseButton, AIMouseButtonName } from '../AIMouseButton'
import { AIMouseDeviceInfo } from '../device-info/DeviceInfo'
import { MicLinkDeviceInfo } from '../device-info/MicLinkDeviceInfo'

export class MicLinkHIDAIMouse implements AIHIDMouse {
  hidDevice: HIDDevice
  connectionType: AIMouseConnectionType = AIMouseConnectionType.HID

  deviceInfo: AIMouseDeviceInfo = new MicLinkDeviceInfo()
  buttons: AIMouseButton[] = [
    new AIMouseButton(AIMouseButtonName.AI),
    new AIMouseButton(AIMouseButtonName.Voice),
    new AIMouseButton(AIMouseButtonName.Translation)
  ]

  constructor(hidDevice: HIDDevice) {
    this.hidDevice = hidDevice
    hidDevice.addEventListener('inputreport', (event) => {
      console.log(event.data)
    })
  }

  sendData(data: Int8Array): void {
    console.log('send:', data)
  }

  recieveData(data: AIMouseDataTransferInResult): void {
    console.log('recieve:', data)
  }
}
