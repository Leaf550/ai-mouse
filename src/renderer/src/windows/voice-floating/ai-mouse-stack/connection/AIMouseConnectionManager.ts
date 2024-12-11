import { AIMouse } from '../device/AIMouse'
import { AIMouseConnector } from './AIMouseConnector'
import { MicLinkAIMouseHIDConnector } from './mic-link/MicLinkAIMouseHIDConnector'

export class AIMouseConnectionManager {
  private onDeviceConnected: (mouse: AIMouse) => void = () => {}
  private onDeviceDisconnected: () => void = () => {}

  private connectors: AIMouseConnector[] = [new MicLinkAIMouseHIDConnector()]

  private static instance: AIMouseConnectionManager

  public static shared() {
    if (!this.instance) {
      this.instance = new AIMouseConnectionManager()
    }
    return this.instance
  }

  public startConnect() {
    for (const connector of this.connectors) {
      connector.connect()
    }
  }

  public setConnectionEventCallbacks(onDeviceConnected: (mouse: AIMouse) => void, onDeviceDisconnected: () => void) {
    this.onDeviceConnected = onDeviceConnected
    this.onDeviceDisconnected = onDeviceDisconnected
    for (const connector of this.connectors) {
      connector.onDeviceConnected = this.onDeviceConnected
      connector.onDeviceDisconnected = this.onDeviceDisconnected
    }
  }
}
