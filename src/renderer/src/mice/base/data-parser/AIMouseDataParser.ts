import { AIMouseButtonAction, AIMouseButtonName } from '../device/AIMouseButton'

export interface AIMouseDataParser {
  parseAIMouseData(data: DataView): AIMouseEvent
}

export enum AIMouseEventType {
  ButtonEvent,
  DataEvent
}

export abstract class AIMouseEvent {
  abstract eventType: AIMouseEventType
  abstract data?: number[]
  abstract buttonName?: AIMouseButtonName
  abstract buttonAction?: AIMouseButtonAction
}

export class AIMouseButtonEvent extends AIMouseEvent {
  public eventType: AIMouseEventType = AIMouseEventType.ButtonEvent
  public data?: number[] = undefined
  public buttonName: AIMouseButtonName
  public buttonAction: AIMouseButtonAction

  constructor(button: AIMouseButtonName, buttonAction: AIMouseButtonAction) {
    super()
    this.buttonName = button
    this.buttonAction = buttonAction
  }
}

export class AIMouseDataEvent extends AIMouseEvent {
  public eventType: AIMouseEventType = AIMouseEventType.DataEvent
  public data: number[]
  public buttonName?: AIMouseButtonName = undefined
  public buttonAction?: AIMouseButtonAction = undefined

  constructor(data: number[]) {
    super()
    this.data = data
  }
}
