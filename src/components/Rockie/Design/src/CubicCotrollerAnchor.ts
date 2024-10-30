import { Colors, Paint, Point2, Rectangle } from '@/components/Engine'
import { Anchor, } from './Anchor'
import { Connector } from '../../Items'
import { Editor, EditorMode } from '../../Editor'
import { Holder } from './Holder'
import { EditorUtils } from '../../Theme'

/**
 * 创建连接线
 */
export class CubicControllerAnchor extends Anchor {
  private _moving = false
  private _startX = 0
  private _startY = 0
  private _isStartController = true
  public constructor(editor: Editor, holder: Holder, isStartController: boolean) {
    super(editor, holder)
    this._isStartController = isStartController
    this.width = 10
    this.height = 10
    this.fill.setColor(EditorUtils.anchorCubiicControllerFillColor)
    this.stroke.setColor(EditorUtils.anchorCubiicControllerStrokeColor)
    this.stroke.setStrokeWidth(EditorUtils.anchorCubiicControllerStrokeLineWidth)
    this.buildAnchor()
  }

  public handlePointerEnter(): void {

  }

  public handlePointerLeave(): void {

  }
  public handlePointerClick(x: number, y: number) {

  }
  public handlePointerDown(x: number, y: number) {
    if (!this.target) {
      return
    }
    this._moving = true
    this._startX = x
    this._startY = y
    this.editor.beginOperation(this.target)

  }
  public handlePointerUp(x: number, y: number) {
    if (!this.target) {
      return
    }
    this._moving = false
    this.editor.finishOperation(this.target)
  }
  public handlePointerMove(x: number, y: number) {
    if (!this.target) {
      console.log(`'anchor Pointer moving bad target' x=${x} y =${y}`)
      return
    }
    if (this._moving && this.target instanceof Connector) {
      const moveX = x - this._startX
      const moveY = y - this._startY
      if (this._isStartController) {
        const startModifierX = this.target.curveStartModifier.x + moveX / this.target.width
        const startModifierY = this.target.curveStartModifier.y + moveY / this.target.height
        this.target.curveStartModifier = new Point2(startModifierX, startModifierY)
        //console.log(`x = ${startModifierX}  y = ${startModifierY}`)
      } else {
        const endModifierX = this.target.curveEndModifier.x + moveX / this.target.width
        const endModifierY = this.target.curveEndModifier.y + moveY / this.target.height
        this.target.curveEndModifier = new Point2(endModifierX, endModifierY)
      }
    } else {
      this.editor.updateEditorMode(EditorMode.AUTO)
    }
    this._startX = x
    this._startY = y

    this.holder.layoutAnchors()
  }

  protected buildAnchor() {
    this.path.reset()
    this.path.addOval(Rectangle.makeLTWH(0, 0, this.width, this.height))
  }
}
