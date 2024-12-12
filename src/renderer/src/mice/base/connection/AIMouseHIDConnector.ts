import { AIMouse } from '../device/AIMouse'
import { AIMouseFactory } from '../device/AIMouseFactory'
import { AIMouseConnector } from './AIMouseConnector'

export abstract class AIMouseHIDConnector implements AIMouseConnector {
  abstract aiMouseFactory: AIMouseFactory

  public onDeviceConnected: (mouse: AIMouse) => void = () => {}
  public onDeviceDisconnected: () => void = () => {}

  abstract isHIDAIMouse(device: HIDDevice): boolean

  public connect(): void {
    navigator.hid
      .getDevices()
      .then((devices) => {
        for (const device of devices) {
          if (this.isHIDAIMouse(device)) {
            if (!device.opened) {
              device.open().then(() => {
                this.onDeviceConnected(this.initAIMouseWith(device))
              })
            } else {
              this.onDeviceConnected(this.initAIMouseWith(device))
            }
            return
          }
        }
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        this.listenOnDeviceConnected()
        this.listenOnDeviceDisconnected()
      })
  }

  public listenOnDeviceConnected(): void {
    navigator.hid.addEventListener('connect', (event: HIDConnectionEvent) => {
      const hidDevice = event.device
      if (!this.isHIDAIMouse(hidDevice)) {
        return
      }
      if (!hidDevice.opened) {
        hidDevice.open().then(() => {
          this.onDeviceConnected(this.initAIMouseWith(hidDevice))
        })
      } else {
        this.onDeviceConnected(this.initAIMouseWith(hidDevice))
      }
    })
  }

  public listenOnDeviceDisconnected(): void {
    navigator.hid.addEventListener('disconnect', (event: HIDConnectionEvent) => {
      const hidDevice = event.device
      if (!this.isHIDAIMouse(hidDevice)) {
        return
      }
      this.onDeviceDisconnected()
    })
  }

  private initAIMouseWith(hidDeviec: HIDDevice) {
    return this.aiMouseFactory.getHIDAIMouseBy(hidDeviec)
  }
}
