import { AIMouseButtonAction, AIMouseButtonName } from '../../base/device/AIMouseButton'
import {
  AIMouseButtonEvent,
  AIMouseDataEvent,
  AIMouseDataParser,
  AIMouseEvent
} from '../../base/data-parser/AIMouseDataParser'

export class MicLinkAIMouseDataParser implements AIMouseDataParser {
  public parseAIMouseData(data: DataView): AIMouseEvent {
    const length = data.byteLength
    const bytesArray: number[] = []
    for (let i = 0; i < length; i++) {
      bytesArray.push(data.getUint8(i))
    }
    if (length > 2 && bytesArray[0] === 0x4d && bytesArray[1] === 0x04) {
      switch (bytesArray[2]) {
        case 0x33:
          return new AIMouseButtonEvent(AIMouseButtonName.Voice, AIMouseButtonAction.Click)
        case 0x37:
          return new AIMouseButtonEvent(AIMouseButtonName.Voice, AIMouseButtonAction.Down)
        case 0x38:
          return new AIMouseButtonEvent(AIMouseButtonName.Voice, AIMouseButtonAction.Up)
        case 0x35:
          return new AIMouseButtonEvent(AIMouseButtonName.Translation, AIMouseButtonAction.Click)
        case 0x31:
          return new AIMouseButtonEvent(AIMouseButtonName.Translation, AIMouseButtonAction.Down)
        case 0x32:
          return new AIMouseButtonEvent(AIMouseButtonName.Translation, AIMouseButtonAction.Up)
        case 0x46:
          return new AIMouseButtonEvent(AIMouseButtonName.AI, AIMouseButtonAction.Click)
        case 0x48:
          return new AIMouseButtonEvent(AIMouseButtonName.AI, AIMouseButtonAction.Down)
        case 0x49:
          return new AIMouseButtonEvent(AIMouseButtonName.AI, AIMouseButtonAction.Up)
      }
    }
    return new AIMouseDataEvent(bytesArray)
  }
}
