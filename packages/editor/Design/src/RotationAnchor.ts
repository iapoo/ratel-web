import { GraphicsUtils, Point2, Rectangle, Rotation } from '@ratel-web/engine'
import { Editor, EditorMode } from '../../Editor'
import { EditorUtils } from '../../Theme'
import { Anchor } from './Anchor'
import { Holder } from './Holder'

/**
 * 旋转
 */
export class RotationAnchor extends Anchor {
  private _inRotating = false
  private _startX = 0
  private _startY = 0
  private _centerX = 0
  private _centerY = 0

  public constructor(editor: Editor, holder: Holder) {
    super(editor, holder)
    this.fill.setColor(EditorUtils.anchorRotationFillColor)
    this.stroke.setColor(EditorUtils.anchorRotationStrokeColor)
    this.stroke.setStrokeWidth(EditorUtils.anchorRotationStrokeLineWidth)
    // this.fontName = 'vapo'
    // this.text = 'C'
  }

  public handlePointerEnter(): void {}

  public handlePointerLeave(): void {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public handlePointerClick(x: number, y: number) {}

  public handlePointerDown(x: number, y: number) {
    if (!this.target) {
      return
    }
    this._inRotating = true
    this._startX = this.target.width / 2 - Holder.ANCHOR_RADIUS + x
    this._startY = -Holder.ANCHOR_RADIUS + y
    this._centerX = this.target.width / 2
    this._centerY = this.target.height / 2
    //console.log(`'anchor Pointer down' x=${x} y =${y}`);
    this.editor.beginOperation()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public handlePointerUp(x: number, y: number) {
    if (!this.target) {
      return
    }
    this._inRotating = false
    //this.holder.rotation = this.target.rotation;
    this.holder.transform = this.target.shape.worldTransform
    this.holder.layoutAnchors()
    this.editor.finishOperation()
  }

  public handlePointerMove(x: number, y: number) {
    if (!this.target) {
      return
    }
    if (this._inRotating) {
      // 计算旋转角度
      const target = new Point2(this._centerX, this._centerY)
      const start = new Point2(this._startX, this._startY)
      const end = new Point2(this.target.width / 2 - Holder.ANCHOR_RADIUS + x, -Holder.ANCHOR_RADIUS + y)
      let angle = GraphicsUtils.getTriangleAngleEx(target, end, start)
      //console.log(
      //  `rotation anchor moving x=${x} y =${y}   endX=${end.x} endY =${end.y} startx=${this._startX} startY=${this._startY} centerX=${this._centerX} centerY=${this._centerY} and angle=${angle}`,
      //);

      angle = Math.round(angle / 5) * 5

      // TODO: 鼠标移动会导致Anchor重定位，结果导致鼠标位置突变而引起图形突变。这里延缓变化频率以修复问题
      const nowTime = new Date().getTime()
      if (nowTime - this.lastMovingTime > Anchor.MIN_MOVING_INTERVAL) {
        // this.holder.rotate = new Rotation(this.target.width / 2, this.target.height / 2, angle)
        this.target.rotation = new Rotation((angle * Math.PI) / 180, this.target.width / 2, this.target.height / 2)

        // this.holder.rotate = new Rotation(this.target.left + this.target.width / 2, this.target.top + this.target.height / 2, angle * Math.PI / 180)
        // this.holder.layoutAnchors()
        this.lastMovingTime = nowTime
      }
    } else {
      this.editor.updateEditorMode(EditorMode.POINTER)
    }
  }
  protected buildAnchor() {
    this.path.reset()
    this.path.addOval(Rectangle.makeLTWH(0, 0, this.width, this.height))
  }
}
