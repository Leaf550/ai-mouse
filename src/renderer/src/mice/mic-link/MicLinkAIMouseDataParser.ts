import { AIMouseButtonAction, AIMouseButtonName } from '../base/device/AIMouseButton'
import { AIMouseButtonEvent, AIMouseDataParser, AIMouseEvent } from '../base/data-parser/AIMouseDataParser'

export class MicLinkAIMouseDataParser implements AIMouseDataParser {
  public parseAIMouseData(data: DataView): AIMouseEvent {
    const length = data.byteLength
    const bytesArray: number[] = []
    for (let i = 0; i < length; i++) {
      bytesArray.push(data.getUint8(i))
    }
    console.log(bytesArray.map((byte) => byte.toString(16).padStart(2, '0')).join(''))
    return new AIMouseButtonEvent(AIMouseButtonName.AI, AIMouseButtonAction.Click)
  }
}
