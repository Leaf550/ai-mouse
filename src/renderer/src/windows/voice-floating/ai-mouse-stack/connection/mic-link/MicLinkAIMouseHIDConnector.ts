import { AIMouseFactory, MicLinkAIMouseFactory } from '../../device/AIMouseFactory'
import { MicLinkDeviceInfo } from '../../device/device-info/MicLinkDeviceInfo'
import { AIMouseHIDConnector } from '../AIMouseHIDConnector'

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
