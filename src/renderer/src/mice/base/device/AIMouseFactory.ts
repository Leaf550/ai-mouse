import { AIBluetoothMouse, AIHIDMouse } from './AIMouse'

export abstract class AIMouseFactory {
  public abstract getHIDAIMouseBy(hidDevice: HIDDevice): AIHIDMouse
  public abstract getBluetoothAIMouseBy(bluetoothDevice: BluetoothDevice): AIBluetoothMouse
}
