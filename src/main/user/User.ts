import { ipcMain } from 'electron'
import { IPCMainProcessor } from '../ipc/IPCMainProcessor'

export interface UserInfo {
  userID: number
  name: string
  iat: number
  exp: number
}

export class User implements IPCMainProcessor {
  userInfo?: UserInfo = {
    userID: 1,
    name: 'fyh',
    iat: 123,
    exp: 234
  }
  private _token?: string

  private static instance = new User()

  public static shared() {
    return this.instance
  }

  public get token(): string | undefined {
    return this._token
  }

  public set token(value: string) {
    this._token = value
    this.parseToken()
  }

  public isLogin() {
    return this.token !== undefined && (this.userInfo?.exp ?? 0) > parseInt(`${Date.now() / 1000}`)
  }

  private parseToken() {
    if (this.token === undefined) {
      return
    }
    const tokenParts = this.token.split('.')
    if (tokenParts.length < 3) {
      return
    }
    const tokenPayload = tokenParts[1]
    const tokenInfo = JSON.parse(Buffer.from(tokenPayload, 'base64').toString('ascii'))
    this.userInfo = tokenInfo as UserInfo
  }

  // IPCMainProcessor implements
  registerIPC(): void {
    ipcMain.handle('ipcAPIs.user.getUser', () => {
      return this.userInfo
    })
  }
}
