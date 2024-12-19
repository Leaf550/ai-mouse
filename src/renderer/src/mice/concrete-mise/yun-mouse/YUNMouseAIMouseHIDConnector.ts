import { AIMouseHIDConnector } from '../../base/connection/AIMouseHIDConnector'
import { AIMouseFactory } from '../../base/device/AIMouseFactory'
import { YUNMouseAIMouseFactory } from './YUNMouseAIMouseFactory'
import { YUNMouseDeviceInfo } from './YUNMouseDeviceInfo'

export class YUNMouseAIMouseHIDConnector extends AIMouseHIDConnector {
  aiMouseFactory: AIMouseFactory = new YUNMouseAIMouseFactory()

  isHIDAIMouse(device: HIDDevice): boolean {
    const yunMouseDeviceInfo = new YUNMouseDeviceInfo()
    if (device.vendorId !== yunMouseDeviceInfo.vendorID || device.productId !== yunMouseDeviceInfo.productID) {
      return false
    }

    for (const collectInfo of device.collections) {
      if (collectInfo.usage === yunMouseDeviceInfo.usage && collectInfo.usagePage === yunMouseDeviceInfo.usagePage) {
        return true
      }
    }

    return false
  }
}
