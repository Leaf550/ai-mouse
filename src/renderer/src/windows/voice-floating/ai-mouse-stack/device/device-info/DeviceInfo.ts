export abstract class AIMouseDeviceInfo {
  deviceID: string = (() => `${this.vendorID}${this.productID}${this.usagePage}${this.usage}`)()
  abstract deviceName: string
  abstract vendorName: string
  abstract vendorID: number
  abstract productID: number
  abstract usage: number
  abstract usagePage: number
}
