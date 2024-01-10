/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */

import { FillType, Point2, Rectangle, Rotation, Shape, } from '@/components/Engine'
import { Line, Cubic, } from '@antv/g-math'
import { EntityShape, } from './EntityShape'
import { SystemUtils } from '@/components/Workspace/Utils'

export enum ConnectorType {
  Curve,
  Orthogonal,
  StraightLine,
}

export enum ConnectorArrowDisplayType {
  None,
  Triangle,
  Diamond,
  Ellipse,
  LeftParenthesis,
  RightParenthesis,
  Orthogonal,
  ForewardSlash,
  Backslashe,
  VerticalLine,
  LeftAngleBracket,
  VerticaleLineAndLeftAngleBacket,
  CircleAndVerticalLine,
  CircleAndLeftBacket
}

export enum ConnectorArrowDisplayMode {
  Full,
  Top,
  Bottom,
}

export enum ConnectorMode {
  Single,
  Double,
}

export enum ConnectorDirection {
  Left,
  Top,
  Right,
  Bottom
}

export interface ConnectorArrowTypeInfo {
  name: string
  description: string
  type: ConnectorArrowDisplayType
  height: number
  width: number
  modifier: number
  count: number
  outline: boolean
  displayMode: ConnectorArrowDisplayMode
}

export class ConnectorShape extends EntityShape {
  public static DETECTION_DISTANCE = 5
  public static DEFAULT_SEGMENT = 16
  private _start: Point2
  private _end: Point2
  private _connectorType: ConnectorType;
  private _startArrow: ConnectorArrowTypeInfo
  private _endArrow: ConnectorArrowTypeInfo
  private _connectorMode: ConnectorMode
  private _doubleLineStrokeWidth: number
  private _curveStartModifier: Point2
  private _curveEndModifier: Point2
  private _startDirection: ConnectorDirection
  private _endDirection: ConnectorDirection  
  private _orthogonalPoints: Point2[]

  public constructor (startX: number, startY: number, endX: number, endY: number, 
    startDirection: ConnectorDirection = ConnectorDirection.Right, endDirection: ConnectorDirection = ConnectorDirection.Left,
    orthogonalPoints: Point2[] = [],
    startArrowInfo: ConnectorArrowTypeInfo = {
    name: '',
    description: '',
    type: ConnectorArrowDisplayType.None,
    height: 6,
    width: 6,
    modifier: 0,
    count: 1,
    outline: true,
    displayMode: ConnectorArrowDisplayMode.Full
  }, endArrowInfo: ConnectorArrowTypeInfo = {
    name: '',
    description: '',
    type: ConnectorArrowDisplayType.None,
    height: 6,
    width: 6,
    modifier: 0,
    count: 1,
    outline: true,
    displayMode: ConnectorArrowDisplayMode.Full
  }) {
    super('', Math.min(startX, endX), Math.min(startY, endY), Math.abs(startX - endX), Math.abs(startY - endY))
    this._start = new Point2(startX, startY)
    this._end = new Point2(endX, endY)
    this.filled = false
    this.clipped = false
    this._startArrow = startArrowInfo
    this._endArrow = endArrowInfo
    this._connectorMode = ConnectorMode.Single
    this._doubleLineStrokeWidth = 1
    this._connectorType = ConnectorType.Orthogonal
    this._curveStartModifier = new Point2(0.4, 0)
    this._curveEndModifier = new Point2(-0.4, 0)
    this._startDirection = startDirection
    this._endDirection = endDirection
    this._orthogonalPoints = orthogonalPoints
  }

  public get start (): Point2 {
    return this._start
  }

  public set start (value: Point2) {
    // console.log(`ConnectorShape.start-> start.x = ${value.x} start.y = ${value.y} boundary.left = ${this.boundary.left} boundary.top = ${this.boundary.top}`)
    this._start = new Point2(value.x, value.y)
    // console.log(`Connection shape = start= x = ${value.x}  y=  ${value.y}  `)
    this.boundary = Rectangle.makeLTWH(Math.min(this._start.x, this._end.x), Math.min(this._start.y, this._end.y), Math.abs(this._start.x - this._end.x), Math.abs(this._start.y - this._end.y))
    this.markDirty()
  }

  public get end () : Point2 {
    return this._end
  }

  public set end (value: Point2) {
    this._end = new Point2(value.x, value.y)
    this.boundary = Rectangle.makeLTWH(Math.min(this._start.x, this._end.x), Math.min(this._start.y, this._end.y), Math.abs(this._start.x - this._end.x), Math.abs(this._start.y - this._end.y))
    this.markDirty()
  }

  public get curveStartModifier() {
    return this._curveStartModifier
  }

  public set curveStartModifier(value: Point2) {
    this._curveStartModifier = value
    this.markDirty()
  }

  public get curveEndModifier() {
    return this._curveEndModifier
  }

  public set curveEndModifier(value: Point2) {
    this._curveEndModifier = value
    this.markDirty()
  }
  
  public get orthogonalPoints() {
    return this._orthogonalPoints
  }

  public set orthogonalPoints(value: Point2[]) {
    this._orthogonalPoints = value
    this.markDirty()
    this.updateOrthogonalPath()
    //if(value.length == 0) {
    //  console.log(`Exception is here`)
    //}
  }

  public get startArrow() {
    return this._startArrow
  }

  public set startArrow(value: ConnectorArrowTypeInfo) {
    this._startArrow = value
    this.markDirty()
  }

  public get endArrow() {
    return this._endArrow
  }

  public set endArrow(value: ConnectorArrowTypeInfo) {
    this._endArrow = value
    this.markDirty()
  }

  public get connectorMode() {
    return this._connectorMode
  }

  public set connectorMode(value: ConnectorMode) {
    this._connectorMode = value
    this.markDirty()
  }

  public get doubleLineStrokeWidth() {
    return this._doubleLineStrokeWidth
  }

  public set doubleLineStrokeWidth(value: number) {
    this._doubleLineStrokeWidth = value
    this.markDirty()
  }

  public get connectorType (): ConnectorType {
    return this._connectorType
  }

  public set connectorType (value: ConnectorType) {
    this._connectorType = value
    this.markDirty()
  }

  public set startDirection(value: ConnectorDirection) {
    this._startDirection = value
    this.markDirty()
  }

  public get endDirection() {
    return this._endDirection
  }
 
  public set endDirection(value: ConnectorDirection) {
    this._endDirection = value
    this.markDirty()
  }

  public get startDirection() {
    return this._startDirection
  }

  public set boundary (boundary: Rectangle) {
    super.boundary = boundary
    // console.log(`ConnectorShape.boundary-> start.x = ${this._start.x} start.y = ${this._start.y} boundary.left = ${this.boundary.left} boundary.top = ${this.boundary.top}`)
  }

  public get boundary () {
    return super.boundary
  }

  public contains (x: number, y: number) {
    if (this.worldInverseTransform) {
      const point = [ x, y, ]
      const inversePoint = this.worldInverseTransform.makePoints(point)
      const distance = Line.pointDistance(this._start.x, this._start.y, this._end.x, this._end.y, inversePoint[0], inversePoint[1])
      return distance <= ConnectorShape.DETECTION_DISTANCE
    } else {
      return false
    }
  }

  public intersects (left: number, top: number, width: number, height: number) {
    if (this.worldInverseTransform) {
      const point = new Point2(left + width * 0.5, top + height * 0.5)
      const invesePoint = this.worldInverseTransform.makePoint(point)
      let distance  = 0
      switch(this.connectorType) {
        case ConnectorType.Orthogonal:
          distance = this.getOrthogonalNearstDistance(invesePoint.x, invesePoint.y)
          break;
        case ConnectorType.Curve:
          distance = this.getCurveNearstDistance(invesePoint.x, invesePoint.y)
          break;
        case ConnectorType.StraightLine:
        default:
          distance = this.getStraightNearstDistance(invesePoint.x, invesePoint.y)
          break;        
      }
      //console.log(`distance = ${distance} left=${left} y=${top} width=${width} height=${height} left2=${this.left} top2=${this.top}  x=${point.x} y=${point.y}  xx=${invesePoint.x}  yy= ${invesePoint.y}`)
      return distance <= ConnectorShape.DETECTION_DISTANCE
    }    
    return false
  }

  public update () {
    super.update()
    if (this.dirty) {
      const distance = Math.sqrt((this._start.x - this._end.x) * (this._start.x - this._end.x) + (this._start.y - this._end.y) * (this._start.y - this._end.y))
      let angle = Math.asinh((this._end.x - this.start.x) / distance)
      if (angle >= 0) {
        if (this._end.y >= this._start.y) {
          angle = angle * 180 / Math.PI
        } else {
          angle = 360 - angle * 180 / Math.PI
        }
      } else {
        if (this._end.y <= this._start.y) {
          angle = 180 + angle * 180 / Math.PI
        } else {
          angle = 180 - angle * 180 / Math.PI
        }
      }
      // this.position = new Point2(this.left, this.top)
      // this.rotation = new Rotation(angle / 180 * Math.PI)
      // this.clip.reset()
      // this.clip.addRectangle(Rectangle.makeLTWH(-1, -1, this.width + 2, this.height + 2))
      // this.path.reset()
      // this.path.addRectangle(new Rectangle(0, -5, distance, 5))

      this.position = new Point2(this.left, this.top)
      //this.clip.reset()
      //this.clip.addRectangle(Rectangle.makeLTWH(-1, -1, this.width + 2, this.height + 2))
      //this.path.reset()
      //this.path.moveTo(this.start.x - this.left, this.start.y - this.top)
      //this.path.lineTo(this.end.x - this.left, this.end.y - this.top)
     // this.path.close()
      switch(this.connectorType) {
        case ConnectorType.Orthogonal:
          this.updateOrthogonalPath()
          break;
        case ConnectorType.Curve:
          this.updateCurvePath()
          break;
        case ConnectorType.StraightLine:
        default:
          this.updateStraightLinePath()
          break;

      }
      this.updateArrows()
      // console.log(`left = ${this.left} top =${this.top} startx = ${this.start.x} starty = ${this.start.y}  endx = ${this.end.x} end.y = ${this.end.y}`)
      //this.resetDirty() 
    }
  }

  private updateArrows() {
    switch(this._startArrow.type) {
      case ConnectorArrowDisplayType.Triangle: {
        break;
      }
      case ConnectorArrowDisplayType.Diamond: {
        break;
      }
      case ConnectorArrowDisplayType.Ellipse: {
        break;
      }
      case ConnectorArrowDisplayType.LeftParenthesis: {
        break;
      }
      case ConnectorArrowDisplayType.RightParenthesis: {
        break;
      }
      case ConnectorArrowDisplayType.Orthogonal: {
        break;
      }
      case ConnectorArrowDisplayType.ForewardSlash: {
        break;
      }
      case ConnectorArrowDisplayType.Backslashe: {
        break;
      }
      case ConnectorArrowDisplayType.VerticalLine: {
        break;
      }
      case ConnectorArrowDisplayType.LeftAngleBracket: {
        break;
      }
      case ConnectorArrowDisplayType.VerticaleLineAndLeftAngleBacket: {
        break;
      }
      case ConnectorArrowDisplayType.CircleAndVerticalLine: {
        break;
      }
      case ConnectorArrowDisplayType.CircleAndLeftBacket: {
        break;
      }
      default:
      case ConnectorArrowDisplayType.None: {
        break;
      }
    }
  }

  private updateCurvePath() {
    const start = new Point2(this.start.x - this.left, this.start.y - this.top)
    const end = new Point2(this.end.x - this.left, this.end.y - this.top)
    const startModifier = new Point2(start.x + this._curveStartModifier.x * this.width, start.y + this.curveStartModifier.y * this.height )
    const endModifier = new Point2(end.x + this.curveEndModifier.x * this.width, end.y + this.curveEndModifier.y * this.height)

    this.path.reset()
    this.path.moveTo(start.x, start.y)
    this.path.cubicTo(startModifier.x, startModifier.y, endModifier.x, endModifier.y, end.x, end.y)
    
    //TODO: FIX ME, unclose path casue white background, we duplicate points so make path so close and them remove strznge white background
    this.path.cubicTo(endModifier.x, endModifier.y, startModifier.x, startModifier.y, start.x, start.y)
  }

  private updateStraightLinePath() {
      this.path.reset()
      this.path.moveTo(this.start.x - this.left, this.start.y - this.top)
      this.path.lineTo(this.end.x - this.left, this.end.y - this.top)
      this.path.close()
  }


  private updateOrthogonalPath() {
    const start = new Point2(this.start.x - this.left, this.start.y - this.top)
    const end = new Point2(this.end.x - this.left, this.end.y - this.top)
    const count = this._orthogonalPoints.length
    this.path.reset()
    //this.path.setFillType(FillType.Winding)
    for(let i = 0; i < count; i ++) {
      const point = this._orthogonalPoints[i]
      if(i == 0) {
        this.path.moveTo(point.x, point.y)
      } else {
        this.path.lineTo(point.x, point.y)
      }
    }
    //TODO: FIX ME, unclose path casue white background, we duplicate points so make path so close and them remove strznge white background
    for(let i = count - 1; i >= 0; i --) {
      const point = this._orthogonalPoints[i]
      this.path.lineTo(point.x, point.y)
    }

    //SystemUtils.debugPoints(this._orthogonalPoints)
  }

  private getStraightNearstDistance(x: number, y: number) {
    const distance = Line.pointDistance(this._start.x, this._start.y, this._end.x, this._end.y, x, y)
    return distance
  }


  private getOrthogonalNearstDistance(x: number, y: number) {
    let distance = 99999
    const points = this._orthogonalPoints
    const count = points.length
    for(let i = 0; i < count - 1; i ++) {
      const newDistance = Line.pointDistance(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y, x, y)
      if(newDistance < distance) {
        distance = newDistance
      }
    }
    return distance
  }

  private getCurveNearstDistance(x: number, y: number) {
    const start = new Point2(this.start.x - this.left, this.start.y - this.top)
    const end = new Point2(this.end.x - this.left, this.end.y - this.top)
    const startModifier = new Point2(start.x + this._curveStartModifier.x * this.width, start.y + this.curveStartModifier.y * this.height )
    const endModifier = new Point2(end.x + this.curveEndModifier.x * this.width, end.y + this.curveEndModifier.y * this.height)

    const distance = Cubic.pointDistance(start.x, start.y,startModifier.x, startModifier.y, endModifier.x, endModifier.y, end.x, end.y, x,y)
    return distance
   
  }
}
