import { Colors, Paint, Point2, Rectangle } from '@/components/Engine'
import { Anchor, } from './Anchor'
import { Connector } from '../../Items'
import { Editor } from '../../Editor'
import { Holder } from './Holder'

/**
 * 创建连接线
 */
export class CrossMovementAnchor extends Anchor {
  private _moving = false
  private _startX = 0
  private _startY = 0
  private _index = 0
  public constructor(editor: Editor, holder: Holder, index: number) {
    super(editor, holder)
    this.width = 12
    this.height = 12
    this._index = index
    this.fill = Paint.makeColorPaint(Colors.Green)
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
      const crossPointCount = this.target.crossPoints.length
      const crossPoints = this.target.crossPoints
      const crossPoint = crossPoints[this._index]
      const nextCrossPoint = crossPoints[this._index + 1]
      let lineIndex = -1 //Means to skip
      //Skip first 2 and last 2 points 
      if(this._index > 1 && this._index < crossPointCount - 3) {
        lineIndex = (this._index - 2) * 2
      } 
      if(crossPoint.x == nextCrossPoint.x) {
        if(lineIndex >= 0) {
          const crossLines = this.target.crossLines
          crossLines[lineIndex] = crossLines[lineIndex] +  moveX / this.target.width
          crossLines[lineIndex + 2] = crossLines[lineIndex + 2] +  moveX / this.target.width
          this.target.crossLines = crossLines
          console.log(`count= ${this.holder.count} x = ${x} moveX = ${moveX} startX = ${this._startX} crossLineValue= ${crossLines[lineIndex]} width=${this.target.width} crossLines= ${crossLines}`)
        }
      } else {
        if(lineIndex >= 0) {
          this.target.crossLines[lineIndex] = 0
          this.target.crossLines[lineIndex + 2] = 0
        }
      }
      for(let i = 1; i < crossPointCount - 2; i ++) {

      }      
      this._startX = x
      this._startY = y
    }

    this.holder.layoutAnchors()
  }

  protected buildAnchor () {
    this.path.reset()
    this.path.addOval(Rectangle.makeLTWH(0, 0, this.width, this.height))
  }
}
