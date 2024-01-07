import { Colors, Paint, Point2, Rectangle } from '@/components/Engine'
import { Anchor, } from './Anchor'
import { Connector } from '../../Items'
import { Editor } from '../../Editor'
import { Holder } from './Holder'
import { ConnectorShape } from '../../Shapes'
import { OrthogonalHelper } from './OrthogonalHelper'

/**
 * 创建连接线
 */
export class CrossMovementAnchor extends Anchor {
  private _moving = false
  private _startX = 0
  private _startY = 0
  private _index = 0
  private _crossPoints: Point2[] = []

  public constructor(editor: Editor, holder: Holder, index: number) {
    super(editor, holder)
    this.width = 12
    this.height = 12
    this._index = index
    this.fill = Paint.makeColorPaint(Colors.Green)
    this.buildAnchor()
  }

  public get index() {
    return this._index
  }

  public get crossPoints() {
    return this._crossPoints
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
    if(this.target instanceof Connector) {
      this._crossPoints.length = 0
      this._crossPoints = this._crossPoints.concat(this.target.crossPoints)
      //if(this._crossPoints.length == 0) {
      //  console.log(`Exception is here`)
      //}
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
    if(!this._moving) {
      return
    }
    //console.log(`x = ${x} y = ${y} startx = ${this._startX} starty = ${this._startY}`)
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
        //console.log(`a= ${this._crossPoints}   b= ${this.target.crossPoints}`)
        const moveX = x - this._startX
        const moveY = y - this._startY
        let crossPoints: Point2[] =  [] 
        crossPoints = crossPoints.concat(this._crossPoints)
        const crossPoint = crossPoints[this._index]
        const nextCrossPoint = crossPoints[this._index + 1]
        if(crossPoint.x == nextCrossPoint.x) {
          if(this._index == 1) {
            crossPoints.splice(this._index + 1, 0, new Point2(crossPoint.x + moveX, crossPoint.y))
            crossPoints[this._index + 2] = new Point2(nextCrossPoint.x + moveX, nextCrossPoint.y)
          } else if(this._index == crossPoints.length - 3) {
            crossPoints[this._index] = new Point2(crossPoint.x + moveX, crossPoint.y)
            crossPoints.splice(this._index + 1, 0, new Point2(nextCrossPoint.x + moveX, nextCrossPoint.y))
          } else {
            crossPoints[this._index] = new Point2(crossPoint.x + moveX, crossPoint.y)
            crossPoints[this._index + 1] = new Point2(nextCrossPoint.x + moveX, nextCrossPoint.y)
          }
          OrthogonalHelper.cleanOrthogonalPoints(crossPoints)
          this.target.orthogonalPoints = crossPoints
          //console.log(`count= ${this.holder.count} x = ${x} moveX = ${moveX} startX = ${this._startX} orthogonalValue= ${orthogonals[lineIndex]} width=${this.target.width} orthogonals= ${orthogonals}`)
        } else {
          if(this._index == 1) {
            crossPoints.splice(this._index + 1, 0, new Point2(crossPoint.x, crossPoint.y + moveY))
            crossPoints[this._index + 2] = new Point2(nextCrossPoint.x, nextCrossPoint.y + moveY)
          } else if(this._index == crossPoints.length - 3) {
            crossPoints[this._index] = new Point2(crossPoint.x, crossPoint.y + moveY)
            crossPoints.splice(this._index + 1, 0, new Point2(nextCrossPoint.x, nextCrossPoint.y + moveY))
          } else {
            crossPoints[this._index] = new Point2(crossPoint.x, crossPoint.y + moveY)
            crossPoints[this._index + 1] = new Point2(nextCrossPoint.x, nextCrossPoint.y + moveY)
          }
          OrthogonalHelper.cleanOrthogonalPoints(crossPoints)
          this.target.orthogonalPoints = crossPoints
          //console.log(`count= ${this.holder.count} x = ${x} moveX = ${moveX} startX = ${this._startX} orthogonalValue= ${orthogonals[lineIndex]} width=${this.target.width} orthogonals= ${orthogonals}`)
        }    
        //this._startX = x
        //this._startY = y
        this.holder.refreshCrossAnchors()
        this.holder.layoutAnchors()
        this.lastMovingTime = nowTime
      }
    }
  }

  private cleanupLines(orthogonals: number[]) {
    const count = orthogonals.length / 2
    let index = count - 1
    while(index > 0) {
      if(index >= 2 && orthogonals[index * 2] == orthogonals[ index * 2 - 4] && orthogonals[index * 2] == orthogonals[index * 2 - 2] ) {
        orthogonals.splice(index * 2 - 2, 2)
      } else if(index >= 2 && orthogonals[index * 2 + 1] == orthogonals[ index * 2 - 3] && orthogonals[index * 2 + 1] == orthogonals[index * 2 - 1] ) {
        orthogonals.splice(index * 2 - 2, 2)
      } else if(index == count - 1 && count > 1 && orthogonals[index * 2 + 1] == 1 && orthogonals[index * 2 - 1] == 1) {
        orthogonals.splice(index * 2, 2)
      } else if(index == count - 1 && count > 1 && orthogonals[index * 2 + 1] == 0 && orthogonals[index * 2 - 1] == 0) {
        orthogonals.splice(index * 2, 2)
      } else if(index == 1 && count > 1 && orthogonals[index * 2 + 1] == 0 && orthogonals[index * 2 - 1] == 0) {
        orthogonals.splice(index * 2 - 2, 2)
      } else if(index == 1 && count > 1 && orthogonals[index * 2 + 1] == 1 && orthogonals[index * 2 - 1] == 1) {
        orthogonals.splice(index * 2 - 2, 2)
      }
      index = index - 1
    }
  }



  protected buildAnchor () {
    this.path.reset()
    this.path.addOval(Rectangle.makeLTWH(0, 0, this.width, this.height))
  }
}
