import { Colors, Paint, Point2, Rectangle, Rotation } from '@/components/Engine'
import { Anchor, } from './Anchor'
import { Editor } from '../../Editor'
import { Holder } from './Holder'
import { Connector } from '../../Items'
import { SelectionLayer } from '../../Editor/src/SelectionLayer'

/**
 * 创建连接线
 */
export class ConnectionAnchor extends Anchor {
  private _moving = false
  private _startX = 0
  private _startY = 0
  private _fromSource = false
  private _sourceX = 0
  private _sourceY = 0
  private _targetX = 0
  private _targetY = 0

  public constructor(editor: Editor, holder: Holder, fromSource: boolean = true) {
    super(editor, holder)
    this.width = 12
    this.height = 12
    this._fromSource = fromSource
    this.fill = Paint.makeColorPaint(Colors.Green)
    this.buildAnchor()
  }

  public handlePointerClick (x: number, y: number) {

  }

  public handlePointerDown (x: number, y: number) {
    this._moving = true
    const point = this.worldTransform.makePoint(new Point2(x, y))
    this._startX = point.x;
    this._startY = point.y;
    if(this.target instanceof Connector) {
      this._sourceX = this.target.start.x
      this._sourceY = this.target.start.y
      this._targetX = this.target.end.x
      this._targetY = this.target.end.y
    }
  }

  public handlePointerUp (x: number, y: number) {
    this._moving = false
    const theSelectionLayer = this.editor.selectionLayer as SelectionLayer
    if (!this.target) {
      console.log(`'anchor Pointer up bad target' x=${x} y =${y}`)
      return
    }
    if (!theSelectionLayer.hasEditorItem(this.target)) {
      theSelectionLayer.inHolder = true
      theSelectionLayer.removeAllEditorItems()
      theSelectionLayer.addEditorItem(this.target)
    }
    this.editor.triggerSelectionChange()
  }

  public handlePointerMove (x: number, y: number) {
    if (!this.target) {
      //console.log(`'anchor Pointer moving bad target' x=${x} y =${y}`)
      return
    }
    if(!this._moving) {
      return
    }
    const point = this.worldTransform.makePoint(new Point2(x, y))
    const moveX = point.x - this._startX
    const moveY = point.y - this._startY
    let newStartX, newStartY, newEndX, newEndY, newWidth, newHeight
    if(this._fromSource) {
      newStartX = this._sourceX + moveX
      newStartY = this._sourceY + moveY
      newWidth = Math.abs(this._targetX - newStartX)
      newHeight = Math.abs(this._targetY - newStartY)
    } else {
      newEndX = this._targetX + moveX
      newEndY = this._targetY + moveY
      newWidth = Math.abs(this._sourceX - newEndX)
      newHeight = Math.abs(this._sourceY - newEndY)
    }
    // TODO: 鼠标移动会导致Anchor重定位，结果导致鼠标位置突变而引起图形突变。这里延缓变化频率以修复问题
    const nowTime = new Date().getTime()
    if (nowTime - this.lastMovingTime > Anchor.MIN_MOVING_INTERVAL) {
      if(this._moving && this.target instanceof Connector) {       
        this.holder.width = newWidth
        this.holder.height = newHeight
        if(this._fromSource) {
          this.target.start = new Point2(newStartX, newStartY)
        } else {
          this.target.end = new Point2(newEndX, newEndY)
        }

        //Recalculate rotation because it depends on width and height
        this.target.rotation = new Rotation(this.target.rotation.radius, this.target.width / 2, this.target.height / 2)
        // this.holder.boundary = Rectangle.makeLTWH(
        //   0,
        //   0,
        //   this.holder.target.boundary.width,
        //   this.holder.target.boundary.height
        // )
        // this.holder.transform = this.holder.target.shape.worldTransform
   
        //this._startX = x
        //this._startY = y
        //this.holder.refreshConnectorAnchors()
        this.holder.layoutAnchors()
        this.lastMovingTime = nowTime
        this.editor.triggerSelectionResized()
      }
    }
  }

  protected buildAnchor () {
    this.path.reset()
    this.path.addOval(Rectangle.makeLTWH(0, 0, this.width, this.height))
  }
}
