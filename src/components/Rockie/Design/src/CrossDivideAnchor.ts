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
  private _index = 0
  private _left = true
  private _crossPoints: Point2[] = []
  private _crossLines: number[] = []
  
  public constructor(editor: Editor, holder: Holder, index: number, left: boolean) {
    super(editor, holder)
    this.width = 12
    this.height = 12
    this._index = index
    this._left = left
    this.fill = Paint.makeColorPaint(Colors.Gray)
    this.buildAnchor()
  }

  public get index() {
    return this._index
  }

  public get isLeft() {
    return this._left
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
    //this.makeReady()
    if(this.target instanceof Connector && this._crossLines.length == 0) {
      this._crossPoints.length = 0
      this._crossLines.length = 0
      this._crossPoints = this._crossPoints.concat(this.target.crossPoints)
      this._crossLines = this._crossLines.concat(this.target.crossLines)
    }

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
    
    //if(!this.ready) {
    //  this._startX = x
    //  this._startY = y
    //  this.makeReady()
    //  return
    //}

    // TODO: 鼠标移动会导致Anchor重定位，结果导致鼠标位置突变而引起图形突变。这里延缓变化频率以修复问题
    const nowTime = new Date().getTime()
    if (nowTime - this.lastMovingTime > Anchor.MIN_MOVING_INTERVAL) {
      if(this._moving && this.target instanceof Connector) {
        const moveX = x - this._startX
        const moveY = y - this._startY
        const crossPointCount = this._crossPoints.length
        const crossPoints = this._crossPoints
        const crossPoint = crossPoints[this._index]
        const nextCrossPoint = crossPoints[this._index + 1]
        let crossLines: number[] = []
        crossLines = crossLines.concat(this._crossLines)
        let lineIndex = (this._index - 1) * 2
        if(this._left) {
          if(crossPoint.y == nextCrossPoint.y) {
            const leftPoint = new Point2(crossPoint.x, crossPoint.y)
            const currentPoint = new Point2(crossPoint.x, crossPoint.y + moveY)
            const nextPoint = new Point2((crossPoint.x + nextCrossPoint.x ) / 2, crossPoint.y + moveY)
            const rightPoint = new Point2((crossPoint.x + nextCrossPoint.x ) / 2, crossPoint.y)
            crossLines.splice(lineIndex, 0, currentPoint.x / this.target.width, currentPoint.y / this.target.height,
              nextPoint.x / this.target.width, nextPoint.y / this.target.height,
              rightPoint.x / this.target.width, rightPoint.y / this.target.height) 
              this.target.crossLines = crossLines
              //console.log(`length = ${crossLines.length}`)
          } else {
            const leftPoint = new Point2(crossPoint.x, crossPoint.y)
            const currentPoint = new Point2(crossPoint.x + moveX, crossPoint.y)
            const nextPoint = new Point2(crossPoint.x + moveX, (crossPoint.y + nextCrossPoint.y) / 2)
            const rightPoint = new Point2(crossPoint.x, (crossPoint.y + nextCrossPoint.y) / 2)
            console.log(` index = ${lineIndex} length = ${crossLines.length}`)
            crossLines.forEach(crossLine=> {
              console.log(`crossLine= ${crossLine}`)
            })
            crossLines.splice(lineIndex, 0, currentPoint.x / this.target.width, currentPoint.y / this.target.height,
              nextPoint.x / this.target.width, nextPoint.y / this.target.height,
              rightPoint.x / this.target.width, rightPoint.y / this.target.height) 
              this.target.crossLines = crossLines
            console.log(` index = ${lineIndex} length = ${crossLines.length}`)
            crossLines.forEach(crossLine=> {
              console.log(`crossLine= ${crossLine}`)
            })
          }
        } else {
          if(crossPoint.y == nextCrossPoint.y) {
            const leftPoint = new Point2((crossPoint.x + nextCrossPoint.x ) / 2, crossPoint.y)
            const currentPoint = new Point2((crossPoint.x + nextCrossPoint.x ) / 2, crossPoint.y + moveY)
            const nextPoint = new Point2(nextCrossPoint.x, crossPoint.y + moveY)
            const rightPoint = new Point2(nextCrossPoint.x, crossPoint.y)
            crossLines.splice(lineIndex, 0, leftPoint.x / this.target.width, leftPoint.y / this.target.height,
              currentPoint.x / this.target.width, currentPoint.y / this.target.height,
              nextPoint.x / this.target.width, nextPoint.y / this.target.height) 
            this.target.crossLines = crossLines
          } else {
            const leftPoint = new Point2(crossPoint.x, (crossPoint.y + nextCrossPoint.y) / 2)
            const currentPoint = new Point2(crossPoint.x + moveX, (crossPoint.y + nextCrossPoint.y) / 2)
            const nextPoint = new Point2(nextCrossPoint.x + moveX, nextCrossPoint.y)
            const rightPoint = new Point2(nextCrossPoint.x, nextCrossPoint.y)
            crossLines.splice(lineIndex, 0, leftPoint.x / this.target.width, leftPoint.y / this.target.height,
              currentPoint.x / this.target.width, currentPoint.y / this.target.height,
              nextPoint.x / this.target.width, nextPoint.y / this.target.height) 
            this.target.crossLines = crossLines
          }
        }
        

        //this._startX = x
        //this._startY = y
        this.holder.refreshCrossAnchors()
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
