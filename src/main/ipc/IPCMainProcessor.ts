import { AIMReqeusts } from '../requests/AIMRequests'
import { AIMUser } from '../user/AIMUser'

export interface IPCMainProcessor {
  registerIPC(): void
}

export class IPCMainProcessorManager {
  private static processors: IPCMainProcessor[] = [AIMReqeusts.shared(), AIMUser.shared()]

  public static registerProcessors() {
    for (const p of this.processors) {
      p.registerIPC()
    }
  }
}
