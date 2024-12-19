import {
  AIMouseButtonEvent,
  AIMouseDataEvent,
  AIMouseDataParser,
  AIMouseEvent
} from '../../base/data-parser/AIMouseDataParser'
import { AIMouseButtonAction, AIMouseButtonName } from '../../base/device/AIMouseButton'

export class YUNMouseAIMouseDataParser implements AIMouseDataParser {
  parseAIMouseData(data: DataView): AIMouseEvent {
    const length = data.byteLength
    const bytesArray: number[] = []
    for (let i = 0; i < length; i++) {
      bytesArray.push(data.getUint8(i))
    }

    if (this.isButtonEvent(bytesArray)) {
      const ButtonEvent = this.parseButtonEvent(bytesArray)
      if (ButtonEvent !== undefined) return ButtonEvent
    }

    return new AIMouseDataEvent(bytesArray)
  }

  private isButtonEvent(data: number[]) {
    if (data.length < 2) {
      return false
    }
    return data[0] === 0x01 && data[1] === 0x99
  }

  private parseButtonEvent(data: number[]): AIMouseButtonEvent | undefined {
    if (data.length < 5) {
      return undefined
    }
    switch (data[4]) {
      case 0x21:
        return new AIMouseButtonEvent(AIMouseButtonName.Voice, AIMouseButtonAction.Down)
      case 0x22:
        return new AIMouseButtonEvent(AIMouseButtonName.Voice, AIMouseButtonAction.Up)
      case 0x23:
        return new AIMouseButtonEvent(AIMouseButtonName.MButton, AIMouseButtonAction.Down)
      case 0x24:
        return new AIMouseButtonEvent(AIMouseButtonName.MButton, AIMouseButtonAction.Up)
      case 0x25:
        return new AIMouseButtonEvent(AIMouseButtonName.AI, AIMouseButtonAction.Down)
      case 0x26:
        return new AIMouseButtonEvent(AIMouseButtonName.AI, AIMouseButtonAction.Up)
    }
    return undefined
  }
}
