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
    new AIMouseButton(AIMouseButtonName.AI, (button, action) => {
      console.log(button.name, action, 'status:', button.status)
    }),
    new AIMouseButton(AIMouseButtonName.Voice, (button, action) => {
      console.log(button.name, action, 'status:', button.status)
    }),
    new AIMouseButton(AIMouseButtonName.Translation, (button, action) => {
      console.log(button.name, action, 'status:', button.status)
    })
  ]
}
