import { Colors, MathUtils, Paint } from '@/components/Engine'
import { Editor } from '../../Editor'
import { Anchor, } from './Anchor'
import { Holder } from './Holder'
import { ShapeEntity } from '../../Items'

/**
 * 变形，如调整梯形的梯形大小等
 */
export class ReshapeAnchor extends Anchor {
  private _reshaping = false
  private _startX = 0
  private _startY = 0

  public constructor (editor: Editor, holder: Holder) {
    super(editor, holder)
    this.width = 12
    this.height = 12
    this.fill = Paint.makeColorPaint(Colors.Orange)
    this.buildAnchor()
  }

  public handlePointerClick (x: number, y: number) {

  }
  public handlePointerDown (x: number, y: number) {
    if (!this.target) {
      return;
    }
    this._reshaping = true;
    this._startX = x;
    this._startY = y;

  }
  public handlePointerUp (x: number, y: number) {
    if (!this.target) {
      return;
    }
    this._reshaping = false;
  }
  public handlePointerMove (x: number, y: number) {
    if (!this.target) {
      console.log(`'anchor Pointer moving bad target' x=${x} y =${y}`)
      return
    }
    if(this._reshaping && this.target instanceof ShapeEntity) {
      const resizeX = x - this._startX
      const resizeY = y - this._startY

      let shapeType = this.target.getShapeType()
      let startX = shapeType.modifierStartX * this.target.width
      let startY = shapeType.modifierStartY * this.target.height
      let endX = shapeType.modifierEndX * this.target.width
      let endY = shapeType.modifierEndY * this.target.height
      let modifierX = (endX - startX) * this.target.modifier +  startX
      let modifierY = (endY - startY) * this.target.modifier + startY
      let newModifierX = modifierX + resizeX
      let newModifierY = modifierY + resizeY
      let newModifierPoint = MathUtils.getNearestPointOfPointToLine(newModifierX, newModifierY, startX, startY, endX, endY)
      let newModifier = Math.sqrt((newModifierPoint.x - startX) * (newModifierPoint.x - startX) + (newModifierPoint.y - startY) * (newModifierPoint.y - startY)) /
        Math.sqrt((endX - startX) * (endX - startX) + (endY - startX) * (endY - startX))
        // TODO: 鼠标移动会导致Anchor重定位，结果导致鼠标位置突变而引起图形突变。这里延缓变化频率以修复问题
      const nowTime = new Date().getTime()
      if (nowTime - this.lastMovingTime > Anchor.MIN_MOVING_INTERVAL) {
        this.target.modifier = newModifier
        this.holder.layoutAnchors()
        this.lastMovingTime = nowTime
      }
    }
  }
  protected buildAnchor () {
    this.path.reset()
    this.path.moveTo(this.width / 2, 0)
    this.path.lineTo(this.width, this.height / 2)
    this.path.lineTo(this.width / 2, this.height)
    this.path.lineTo(0, this.height / 2)
    this.path.lineTo(this.width / 2, 0)
  }
}
