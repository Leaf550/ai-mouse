export enum AIMouseButtonName {
  AI = 'AI键',
  Voice = '语音',
  Translation = '翻译',
  MButton = '自定义'
}

export enum AIMouseButtonStatus {
  Up = 'Up',
  Down = 'Down'
}

export enum AIMouseButtonAction {
  Click = 'Click',
  DoubleClick = 'DoubleClick',
  Up = 'Up',
  Down = 'Down'
}

export class AIMouseButton {
  name: AIMouseButtonName
  status: AIMouseButtonStatus = AIMouseButtonStatus.Up
  onButtonEvent: (button: AIMouseButton, action: AIMouseButtonAction) => void

  constructor(
    name: AIMouseButtonName,
    onButtonEvent: (button: AIMouseButton, action: AIMouseButtonAction) => void = () => {}
  ) {
    this.name = name
    this.onButtonEvent = onButtonEvent
  }
}
