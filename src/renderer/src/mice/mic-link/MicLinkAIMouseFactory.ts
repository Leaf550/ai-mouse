import { AIBluetoothMouse, AIHIDMouse } from '../base/device/AIMouse'
import { AIMouseFactory } from '../base/device/AIMouseFactory'
import { MicLinkHIDAIMouse } from './MicLinkHIDAIMouse'

export class MicLinkAIMouseFactory extends AIMouseFactory {
  public getHIDAIMouseBy(hidDevice: HIDDevice): AIHIDMouse {
    return new MicLinkHIDAIMouse(hidDevice)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getBluetoothAIMouseBy(_bluetoothDevice: BluetoothDevice): AIBluetoothMouse {
    throw new Error('Method not implemented.')
  }
}
