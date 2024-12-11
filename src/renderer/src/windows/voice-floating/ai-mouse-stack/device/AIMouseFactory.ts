import { AIBluetoothMouse, AIHIDMouse } from './AIMouse'
import { MicLinkHIDAIMouse } from './mic-link/MicLinkHIDAIMouse'

export abstract class AIMouseFactory {
  public abstract getHIDAIMouseBy(hidDevice: HIDDevice): AIHIDMouse
  public abstract getBluetoothAIMouseBy(bluetoothDevice: BluetoothDevice): AIBluetoothMouse
}

export class MicLinkAIMouseFactory extends AIMouseFactory {
  public getHIDAIMouseBy(hidDevice: HIDDevice): AIHIDMouse {
    return new MicLinkHIDAIMouse(hidDevice)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getBluetoothAIMouseBy(_bluetoothDevice: BluetoothDevice): AIBluetoothMouse {
    throw new Error('Method not implemented.')
  }
}
