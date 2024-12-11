import { AIMouseConnectionManager } from '../connection/AIMouseConnectionManager'
import { AIMouse } from '../device/AIMouse'

export class AIMouseController {
  private static instance: AIMouseController

  public static shared(): AIMouseController {
    if (!this.instance) {
      this.instance = new AIMouseController()
    }
    return this.instance
  }

  private connectionManager = AIMouseConnectionManager.shared()

  private _mouse?: AIMouse

  private get mouse() {
    return this._mouse
  }

  private set mouse(mouse: AIMouse | undefined) {
    this._mouse = mouse
  }

  public currentMouse() {
    return this.mouse
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

  private onMouseConnected(mouse: AIMouse) {
    this.mouse = mouse
  }

  private onMouseDisconnected() {
    this.mouse = undefined
  }
}
