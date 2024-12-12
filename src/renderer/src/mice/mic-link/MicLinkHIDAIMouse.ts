import { AIMouseDataParser, AIMouseEvent } from '../base/data-parser/AIMouseDataParser'
import { MicLinkAIMouseDataParser } from './MicLinkAIMouseDataParser'
import { AIMouseConnectionType, AIHIDMouse } from '../base/device/AIMouse'
import { AIMouseButton, AIMouseButtonName } from '../base/device/AIMouseButton'
import { AIMouseDeviceInfo } from '../base/device/DeviceInfo'
import { MicLinkDeviceInfo } from './MicLinkDeviceInfo'

export class MicLinkHIDAIMouse extends AIHIDMouse {
  hidDevice: HIDDevice
  connectionType: AIMouseConnectionType = AIMouseConnectionType.HID
  dataParser: AIMouseDataParser = new MicLinkAIMouseDataParser()

  deviceInfo: AIMouseDeviceInfo = new MicLinkDeviceInfo()
  buttons: AIMouseButton[] = [
    new AIMouseButton(AIMouseButtonName.AI),
    new AIMouseButton(AIMouseButtonName.Voice),
    new AIMouseButton(AIMouseButtonName.Translation)
  ]

  constructor(hidDevice: HIDDevice) {
    super()
    this.hidDevice = hidDevice
  }

  onAIMouseEvent(event: AIMouseEvent): void {
    console.log(event)
  }
}
