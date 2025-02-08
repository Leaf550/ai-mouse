import { AIMouseConnectionManager } from './AIMouseConnectionManager'
import { AIMouse, AIMouseDataEventListener } from '../device/AIMouse'
import { AIMouseConnector } from '../connection/AIMouseConnector'

export class AIMouseController {
  private static instance: AIMouseController

  public static shared(): AIMouseController {
    if (!this.instance) {
      this.instance = new AIMouseController()
    }
    return this.instance
  }

  private connectionManager = AIMouseConnectionManager.shared()
  private mouseDataEventListeners: AIMouseDataEventListener[] = []

  private _mouse?: AIMouse

  private get mouse() {
    return this._mouse
  }

  private set mouse(mouse: AIMouse | undefined) {
    this._mouse = mouse
    if (this._mouse !== undefined) {
      this._mouse.dataEventListeners = this.mouseDataEventListeners
    }
  }

  public currentMouse() {
    return this.mouse
  }

  public addConnectors(...connectors: AIMouseConnector[]) {
    this.connectionManager.addConnectors(...connectors)
  }

  public startConnect() {
    this.connectionManager.setConnectionEventCallbacks(
      (mouse: AIMouse) => {
        this.onMouseConnected(mouse)
      },
      () => {
        this.onMouseDisconnected()
      }
    )
    this.connectionManager.startConnect()
  }

  public sendDataToDevice(data: Uint8Array) {
    this.mouse?.sendData(data)
  }

  public addAIMouseDataEventListeners(...listeners: AIMouseDataEventListener[]) {
    this.mouseDataEventListeners.push(...listeners)
    if (this.mouse !== undefined) {
      this.mouse.dataEventListeners.push(...listeners)
    }
  }

  private onMouseConnected(mouse: AIMouse) {
    this.mouse?.dispose()
    this.mouse = mouse
    this.mouse.listenDeviceEvent()
  }

  private onMouseDisconnected() {
    this.mouse?.dispose()
    this.mouse = undefined
  }
}
