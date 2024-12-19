import { AIMouseDataParser } from '../base/data-parser/AIMouseDataParser'
import { AIHIDMouse } from '../base/device/AIMouse'
import { AIMouseButton, AIMouseButtonName } from '../base/device/AIMouseButton'
import { AIMouseDeviceInfo } from '../base/device/DeviceInfo'
import { YUNMouseAIMouseDataParser } from './YUNMouseAIMouseDataParser'
import { YUNMouseDeviceInfo } from './YUNMouseDeviceInfo'

export class YUNMouseHIDAIMouse extends AIHIDMouse {
  dataParser: AIMouseDataParser = new YUNMouseAIMouseDataParser()

  deviceInfo: AIMouseDeviceInfo = new YUNMouseDeviceInfo()

  buttons: AIMouseButton[] = [
    new AIMouseButton(AIMouseButtonName.AI, (button, action) => {
      console.log(button.name, action, 'status:', button.status)
    }),
    new AIMouseButton(AIMouseButtonName.Voice, (button, action) => {
      console.log(button.name, action, 'status:', button.status)
    }),
    new AIMouseButton(AIMouseButtonName.MButton, (button, action) => {
      console.log(button.name, action, 'status:', button.status)
    })
  ]
}
