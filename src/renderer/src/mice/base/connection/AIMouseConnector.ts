import { AIMouse } from '../device/AIMouse'
import { AIMouseFactory } from '../device/AIMouseFactory'

export interface AIMouseConnector {
  aiMouseFactory: AIMouseFactory

  onDeviceConnected: (mouse: AIMouse) => void
  onDeviceDisconnected: () => void

  connect(): void

  listenOnDeviceConnected(): void
  listenOnDeviceDisconnected(): void
}
