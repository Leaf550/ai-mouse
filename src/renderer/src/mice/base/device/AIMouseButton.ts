export enum AIMouseButtonName {
  AI = 'AI键',
  Voice = '语音',
  Translation = '翻译',
  MButton = '自定义'
}

export enum AIMouseButtonStatus {
  Up,
  Down
}

export enum AIMouseButtonAction {
  Click,
  DoubleClick
}

export class AIMouseButton {
  name: AIMouseButtonName
  status: AIMouseButtonStatus = AIMouseButtonStatus.Up

  constructor(name: AIMouseButtonName) {
    this.name = name
  }
}
