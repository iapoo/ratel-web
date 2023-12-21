import { Colors, Paint, Point2, Rectangle } from '@/components/Engine'
import { Anchor, } from './Anchor'
import { Connector } from '../../Items'
import { Editor } from '../../Editor'
import { Holder } from './Holder'

/**
 * 创建连接线
 */
export class CrossDivideAnchor extends Anchor {
  private _moving = false
  private _startX = 0
  private _startY = 0
  public constructor(editor: Editor, holder: Holder) {
    super(editor, holder)
    this.width = 12
    this.height = 12
    this.fill = Paint.makeColorPaint(Colors.Gray)
    this.buildAnchor()
  }

  public handlePointerClick (x: number, y: number) {

  }
  public handlePointerDown (x: number, y: number) {
    if (!this.target) {
      return;
    }
    this._moving = true
    this._startX = x;
    this._startY = y;

  }
  public handlePointerUp (x: number, y: number) {
    if (!this.target) {
      return;
    }
    this._moving = false
  }
  public handlePointerMove (x: number, y: number) {
    if (!this.target) {
      console.log(`'anchor Pointer moving bad target' x=${x} y =${y}`)
      return
    }
    if(this._moving && this.target instanceof Connector) {
      const moveX = x - this._startX
      const moveY = y - this._startY
    }
    this._startX = x
    this._startY = y

    this.holder.layoutAnchors()
  }

  protected buildAnchor () {
    this.path.reset()
    this.path.addOval(Rectangle.makeLTWH(0, 0, this.width, this.height))
  }
}
