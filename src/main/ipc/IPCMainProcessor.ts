import { Reqeusts } from "../requests/Requests"
import { User } from "../user/User"

export interface IPCMainProcessor {
  registerIPC(): void
}

export class IPCMainProcessorManager {
  private static processors: IPCMainProcessor[] = [
    Reqeusts.shared(),
    User.shared()
  ]

  public static registerProcessors() {
    for (const p of this.processors) {
      p.registerIPC()
    }
  }
}
