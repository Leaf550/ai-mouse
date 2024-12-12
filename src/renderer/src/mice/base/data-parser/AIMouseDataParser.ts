import { AIMouseButtonAction, AIMouseButtonName } from '../device/AIMouseButton'

export enum AIMouseEventType {
  ButtonEvent,
  VoiceEvent
}

export abstract class AIMouseEvent {
  abstract eventType: AIMouseEventType
}

export class AIMouseButtonEvent extends AIMouseEvent {
  public eventType: AIMouseEventType = AIMouseEventType.ButtonEvent
  public button: AIMouseButtonName
  public action: AIMouseButtonAction

  constructor(button: AIMouseButtonName, action: AIMouseButtonAction) {
    super()
    this.button = button
    this.action = action
  }
}

export interface AIMouseDataParser {
  parseAIMouseData(data: DataView): AIMouseEvent
}
