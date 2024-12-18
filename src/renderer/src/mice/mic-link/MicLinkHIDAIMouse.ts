import { AIMouseDataParser } from '../base/data-parser/AIMouseDataParser'
import { MicLinkAIMouseDataParser } from './MicLinkAIMouseDataParser'
import { AIHIDMouse } from '../base/device/AIMouse'
import { AIMouseButton, AIMouseButtonName } from '../base/device/AIMouseButton'
import { AIMouseDeviceInfo } from '../base/device/DeviceInfo'
import { MicLinkDeviceInfo } from './MicLinkDeviceInfo'

export class MicLinkHIDAIMouse extends AIHIDMouse {
  dataParser: AIMouseDataParser = new MicLinkAIMouseDataParser()

  deviceInfo: AIMouseDeviceInfo = new MicLinkDeviceInfo()
  buttons: AIMouseButton[] = [
    new AIMouseButton(AIMouseButtonName.AI),
    new AIMouseButton(AIMouseButtonName.Voice),
    new AIMouseButton(AIMouseButtonName.Translation)
  ]
}
