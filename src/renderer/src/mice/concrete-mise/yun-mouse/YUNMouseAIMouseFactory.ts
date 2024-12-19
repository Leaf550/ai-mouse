import { AIHIDMouse, AIBluetoothMouse } from '../../base/device/AIMouse'
import { AIMouseFactory } from '../../base/device/AIMouseFactory'
import { YUNMouseHIDAIMouse } from './YUNMouseHIDAIMouse'

export class YUNMouseAIMouseFactory extends AIMouseFactory {
  public getHIDAIMouseBy(hidDevice: HIDDevice): AIHIDMouse {
    return new YUNMouseHIDAIMouse(hidDevice)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getBluetoothAIMouseBy(_bluetoothDevice: BluetoothDevice): AIBluetoothMouse {
    throw new Error('Method not implemented.')
  }
}
