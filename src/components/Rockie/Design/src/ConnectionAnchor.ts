import { Colors, Paint, Rectangle } from '@/components/Engine'
import { Anchor, } from './Anchor'
import { Editor } from '../../Editor'
import { Holder } from './Holder'
import { Connector } from '../../Items'

/**
 * 创建连接线
 */
export class ConnectionAnchor extends Anchor {
  private _moving = false
  private _startX = 0
  private _startY = 0


  public constructor(editor: Editor, holder: Holder, isSource: boolean = true) {
    super(editor, holder)
    this.width = 12
    this.height = 12
    this.fill = Paint.makeColorPaint(Colors.Green)
    this.buildAnchor()
  }

  public handlePointerClick (x: number, y: number) {

  }

  public handlePointerDown (x: number, y: number) {
    this._moving = true
    this._startX = x;
    this._startY = y;
  }

  public handlePointerUp (x: number, y: number) {
    this._moving = false
  }

  public handlePointerMove (x: number, y: number) {
    if (!this.target) {
      //console.log(`'anchor Pointer moving bad target' x=${x} y =${y}`)
      return
    }
    if(!this._moving) {
      return
    }
    // TODO: 鼠标移动会导致Anchor重定位，结果导致鼠标位置突变而引起图形突变。这里延缓变化频率以修复问题
    const nowTime = new Date().getTime()
    if (nowTime - this.lastMovingTime > Anchor.MIN_MOVING_INTERVAL) {
      if(this._moving && this.target instanceof Connector) {
        const moveX = x - this._startX
        const moveY = y - this._startY

        this.holder.layoutAnchors()
        this.lastMovingTime = nowTime
      }
    }
  }

  protected buildAnchor () {
    this.path.reset()
    this.path.addOval(Rectangle.makeLTWH(0, 0, this.width, this.height))
  }
}
