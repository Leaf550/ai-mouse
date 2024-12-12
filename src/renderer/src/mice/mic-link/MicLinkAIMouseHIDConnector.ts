import { AIMouseFactory } from '../base/device/AIMouseFactory'
import { MicLinkAIMouseFactory } from './MicLinkAIMouseFactory'
import { MicLinkDeviceInfo } from './MicLinkDeviceInfo'
import { AIMouseHIDConnector } from '../base/connection/AIMouseHIDConnector'

export class MicLinkAIMouseHIDConnector extends AIMouseHIDConnector {
  aiMouseFactory: AIMouseFactory = new MicLinkAIMouseFactory()

  isHIDAIMouse(device: HIDDevice): boolean {
    const micLinkDeviceInfo = new MicLinkDeviceInfo()
    if (device.vendorId === micLinkDeviceInfo.vendorID && device.productId === micLinkDeviceInfo.productID) {
      for (const collectInfo of device.collections) {
        if (collectInfo.usage === micLinkDeviceInfo.usage && collectInfo.usagePage === micLinkDeviceInfo.usagePage) {
          return true
        }
      }
    }

    return false
  }
}
