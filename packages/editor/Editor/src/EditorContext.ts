import { Editor } from './Editor'

export class EditorContext {
  private _editor: Editor
  private _inMoving = false
  private _moveStarted = false //Check if movement already started
  private _startPointX = 0
  private _startPointY = 0

  public constructor(editor: Editor) {
    this._editor = editor
  }

  public get inMoving() {
    return this._inMoving
  }

  public set inMoving(value: boolean) {
    this._inMoving = value
  }

  public get moveStarted() {
    return this._moveStarted
  }

  public set moveStarted(value: boolean) {
    this._moveStarted = value
  }

  public get startPointX() {
    return this._startPointX
  }

  public set startPointX(value: number) {
    this._startPointX = value
  }

  public get startPointY() {
    return this._startPointY
  }

  public set startPointY(value: number) {
    this._startPointY = value
  }
}
