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
export class CrossDivideAnchor extends Anchor {
  private _moving = false
  private _startX = 0
  private _startY = 0
  private _index = 0
  private _left = true
  private _crossPoints: Point2[] = []
  //private _orthogonals: number[] = []
  
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
    if(this.target instanceof Connector) {
      this._crossPoints.length = 0
      //this._orthogonals.length = 0
      this._crossPoints = this._crossPoints.concat(this.target.crossPoints)
      //this._orthogonals = this._orthogonals.concat(this.target.orthogonals)
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
        let crossPoints: Point2[] =  [] 
        crossPoints = crossPoints.concat(this._crossPoints)
        const crossPoint = crossPoints[this._index]
        const nextCrossPoint = crossPoints[this._index + 1]
        //const crossWidth = this.target.horizontal ? this.target.width - ConnectorShape.DEFAULT_SEGMENT * 2 : this.target.width
        //const crossHeight = this.target.horizontal ? this.target.height : this.target.height - ConnectorShape.DEFAULT_SEGMENT * 2
        //const crossSegmentX = this.target.horizontal ? ConnectorShape.DEFAULT_SEGMENT : 0
        //const crossSegmentY = this.target.horizontal ? 0 : ConnectorShape.DEFAULT_SEGMENT
        //let orthogonals: number[] = []
        //orthogonals = orthogonals.concat(this._orthogonals)
        //let lineIndex = (this._index - 1) * 2
        if(this._left) {
          if(crossPoint.y == nextCrossPoint.y) {
            const leftPoint = new Point2(crossPoint.x, crossPoint.y)
            const currentPoint = new Point2(crossPoint.x, crossPoint.y + moveY)
            const nextPoint = new Point2((crossPoint.x + nextCrossPoint.x ) / 2, crossPoint.y + moveY)
            const rightPoint = new Point2((crossPoint.x + nextCrossPoint.x ) / 2, crossPoint.y)
            //orthogonals.splice(lineIndex, 0, currentPoint.x / crossWidth, currentPoint.y / crossHeight,
            //  nextPoint.x / crossWidth, nextPoint.y / crossHeight,
            //  rightPoint.x / crossWidth, rightPoint.y / crossHeight) 
            //this.cleanupLines(orthogonals)
            //this.target.orthogonals = orthogonals
            crossPoints.splice(this._index + 1, 0, currentPoint, nextPoint, rightPoint)
            OrthogonalHelper.cleanOrthogonalPoints(crossPoints)
            this.target.orthogonalPoints = crossPoints
            //console.log(`length = ${orthogonals.length}`)
          } else {
            const leftPoint = new Point2(crossPoint.x, crossPoint.y)
            const currentPoint = new Point2(crossPoint.x + moveX, crossPoint.y)
            const nextPoint = new Point2(crossPoint.x + moveX, (crossPoint.y + nextCrossPoint.y) / 2)
            const rightPoint = new Point2(crossPoint.x, (crossPoint.y + nextCrossPoint.y) / 2)
            //console.log(` index = ${lineIndex} length = ${orthogonals.length}`)
            //orthogonals.forEach(orthogonal=> {
            //  console.log(`orthogonal= ${orthogonal}`)
            //})
            //orthogonals.splice(lineIndex, 0, currentPoint.x / crossWidth, currentPoint.y / crossHeight,
            //  nextPoint.x / crossWidth, nextPoint.y / crossHeight,
            //  rightPoint.x / crossWidth, rightPoint.y / crossHeight) 
            //this.cleanupLines(orthogonals)
            //this.target.orthogonals = orthogonals
            crossPoints.splice(this._index + 1, 0, currentPoint, nextPoint, rightPoint)
            OrthogonalHelper.cleanOrthogonalPoints(crossPoints)
            this.target.orthogonalPoints = crossPoints

            //console.log(` index = ${lineIndex} length = ${orthogonals.length}`)
            //orthogonals.forEach(orthogonal=> {
            //  console.log(`orthogonal= ${orthogonal}`)
            //})
          }
        } else {
          if(crossPoint.y == nextCrossPoint.y) {
            const leftPoint = new Point2((crossPoint.x + nextCrossPoint.x ) / 2, crossPoint.y)
            const currentPoint = new Point2((crossPoint.x + nextCrossPoint.x ) / 2, crossPoint.y + moveY)
            const nextPoint = new Point2(nextCrossPoint.x, nextCrossPoint.y + moveY)
            const rightPoint = new Point2(nextCrossPoint.x, nextCrossPoint.y)
            // orthogonals.splice(lineIndex, 0, leftPoint.x / crossWidth, leftPoint.y / crossHeight,
            //   currentPoint.x / crossWidth, currentPoint.y / crossHeight,
            //   nextPoint.x / crossWidth, nextPoint.y / crossHeight) 
            // this.cleanupLines(orthogonals)
            // this.target.orthogonals = orthogonals
            // console.log(` index = ${lineIndex} length = ${orthogonals.length}`)
            // orthogonals.forEach(orthogonal=> {
            //   console.log(`orthogonal= ${orthogonal}`)
            // })
            crossPoints.splice(this._index, 0, leftPoint, currentPoint, nextPoint)
            OrthogonalHelper.cleanOrthogonalPoints(crossPoints)
            this.target.orthogonalPoints = crossPoints

          } else {
            const leftPoint = new Point2(crossPoint.x, (crossPoint.y + nextCrossPoint.y) / 2 )
            const currentPoint = new Point2(crossPoint.x + moveX, (crossPoint.y + nextCrossPoint.y) / 2)
            const nextPoint = new Point2(nextCrossPoint.x + moveX, nextCrossPoint.y)
            const rightPoint = new Point2(nextCrossPoint.x, nextCrossPoint.y)
            // orthogonals.splice(lineIndex, 0, leftPoint.x / crossWidth, leftPoint.y / crossHeight,
            //   currentPoint.x / crossWidth, currentPoint.y / crossHeight,
            //   nextPoint.x / crossWidth, nextPoint.y / crossHeight) 
            // this.cleanupLines(orthogonals)
            // this.target.orthogonals = orthogonals
            // console.log(` index = ${lineIndex} length = ${orthogonals.length}`)
            // orthogonals.forEach(orthogonal=> {
            //   console.log(`orthogonal= ${orthogonal}`)
            // })
            crossPoints.splice(this._index, 0, leftPoint, currentPoint, nextPoint)
            OrthogonalHelper.cleanOrthogonalPoints(crossPoints)
            this.target.orthogonalPoints = crossPoints

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

  // private cleanupLines(orthogonals: number[]) {
  //   const count = orthogonals.length / 2
  //   let index = count - 1
  //   while(index > 0) {
  //     if(index >= 2 && orthogonals[index * 2] == orthogonals[ index * 2 - 4] && orthogonals[index * 2] == orthogonals[index * 2 - 2] ) {
  //       orthogonals.splice(index * 2 - 2, 2)
  //     } else if(index >= 2 && orthogonals[index * 2 + 1] == orthogonals[ index * 2 - 3] && orthogonals[index * 2 + 1] == orthogonals[index * 2 - 1] ) {
  //       orthogonals.splice(index * 2 - 2, 2)
  //     } else if(index == count - 1 && count > 1 && orthogonals[index * 2 + 1] == 1 && orthogonals[index * 2 - 1] == 1) {
  //       orthogonals.splice(index * 2 , 2)
  //     } else if(index == count - 1 && count > 1 && orthogonals[index * 2 + 1] == 0 && orthogonals[index * 2 - 1] == 0) {
  //       orthogonals.splice(index * 2, 2)
  //     } else if(index == 1 && count > 1 && orthogonals[index * 2 + 1] == 0 && orthogonals[index * 2 - 1] == 0) {
  //       orthogonals.splice(index * 2 - 2, 2)
  //     } else if(index == 1 && count > 1 && orthogonals[index * 2 + 1] == 1 && orthogonals[index * 2 - 1] == 1) {
  //       orthogonals.splice(index * 2 - 2, 2)
  //     }
  //     index = index - 1
  //   }
  // }

  protected buildAnchor () {
    this.path.reset()
    this.path.addOval(Rectangle.makeLTWH(0, 0, this.width, this.height))
  }
}
