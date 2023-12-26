/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */

import { Point2, Rectangle, Rotation, Shape, } from '@/components/Engine'
import { Line, } from '@antv/g-math'
import { EntityShape, } from './EntityShape'

export enum ConnectorType {
  Curve,
  CrossLine,
  StraightLine,
}

export enum ConnectorArrowDisplayType {
  None,
  Triangle,
  Diamond,
  Ellipse,
  LeftParenthesis,
  RightParenthesis,
  CrossLine,
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
  public static DETECTION_DISTANCE = 16
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
  private _crossLines: number[]
  private _crossPoints: Point2[]
  private _horizontal: boolean

  public constructor (startX: number, startY: number, endX: number, endY: number, horizontal: boolean = true, startArrowInfo: ConnectorArrowTypeInfo = {
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
    this._startArrow = startArrowInfo
    this._endArrow = endArrowInfo
    this._connectorMode = ConnectorMode.Single
    this._doubleLineStrokeWidth = 1
    this._connectorType = ConnectorType.CrossLine
    this._curveStartModifier = new Point2(0.4, 0)
    this._curveEndModifier = new Point2(-0.4, 0)
    this._crossPoints = []
    this._horizontal = horizontal
    if(this._horizontal) {
      this._crossLines = [0.5, 0, 0.5, 1]
    } else {
      this._crossLines = [0, 0.5, 1, 0.5]
    }
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
  
  public get crossLines() {
    return this._crossLines
  }

  public set crossLines(value: number[]) {
    this._crossLines = value
    this.markDirty()
    this.updateCrossLinePath()
  }

  public get crossPoints() {
    return this._crossPoints
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

  public get horizontal() {
    return this._horizontal
  }

  public set horizontal(value: boolean) {
    this._horizontal = value
    if(this._horizontal) {
      this._crossLines = [0.5, 0, 0.5, 1]
    } else {
      this._crossLines = [0, 0.5, 1, 0.5]
    }
    this.markDirty()
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
      const p1 = [ left, top, ]
      const p2 = [ left + width, top, ]
      const p3 = [ left + width, top + height, ]
      const p4 = [ left, top + height, ]
      const startPoint = [ this._start.x, this._start.y, ]
      const endPoint = [ this._end.x, this._end.y, ]
      const inverseStart = this.worldInverseTransform.makePoints(startPoint)
      const inverseEnd = this.worldInverseTransform.makePoints(endPoint)
      const inverseP1 = this.worldInverseTransform.makePoints(p1)
      const inverseP2 = this.worldInverseTransform.makePoints(p2)
      const inverseP3 = this.worldInverseTransform.makePoints(p3)
      const inverseP4 = this.worldInverseTransform.makePoints(p4)
      const distance1 = Line.pointDistance(inverseStart[0], inverseStart[1], inverseEnd[0], inverseEnd[1], inverseP1[0], inverseP1[1])
      const distance2 = Line.pointDistance(inverseStart[0], inverseStart[1], inverseEnd[0], inverseEnd[1], inverseP2[0], inverseP2[1])
      const distance3 = Line.pointDistance(inverseStart[0], inverseStart[1], inverseEnd[0], inverseEnd[1], inverseP3[0], inverseP3[1])
      const distance4 = Line.pointDistance(inverseStart[0], inverseStart[1], inverseEnd[0], inverseEnd[1], inverseP4[0], inverseP4[1])
      // console.log(` checking startx= ${this.start.x}, starty= ${this.start.y}, endx=${this.end.x}, endy=${this.end.y}, 1 = ${distance1}, 2 = ${distance2}, 3 = ${distance3}, 4 = ${distance4} `)
      // console.log(` inverse p1x= ${inverseP1[0]}, p1y= ${inverseP1[1]},p2x= ${inverseP2[0]}, p2y= ${inverseP2[1]}, p3x= ${inverseP3[0]}, p3y= ${inverseP3[1]}, p4x= ${inverseP4[0]}, p4y= ${inverseP4[1]},`)
      return distance1 <= ConnectorShape.DETECTION_DISTANCE && distance2 <= ConnectorShape.DETECTION_DISTANCE && distance3 <= ConnectorShape.DETECTION_DISTANCE && distance4 <= ConnectorShape.DETECTION_DISTANCE
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
      this.clip.reset()
      this.clip.addRectangle(Rectangle.makeLTWH(-1, -1, this.width + 2, this.height + 2))
      this.path.reset()
      this.path.moveTo(this.start.x - this.left, this.start.y - this.top)
      this.path.lineTo(this.end.x - this.left, this.end.y - this.top)
      this.path.close()
      switch(this.connectorType) {
        case ConnectorType.CrossLine:
          this.updateCrossLinePath()
          break;
        case ConnectorType.Curve:
          this.updateCurvePath()
          break;
        case ConnectorType.StraightLine:
        default:
          this.updateStraightLinePath()
          break;

      }
      // console.log(`left = ${this.left} top =${this.top} startx = ${this.start.x} starty = ${this.start.y}  endx = ${this.end.x} end.y = ${this.end.y}`)
      //this.resetDirty() 
    }
  }

  private updateCurvePath() {
    const start = new Point2(this.start.x - this.left, this.start.y - this.top)
    const end = new Point2(this.end.x - this.left, this.end.y - this.top)
    const startModifier = new Point2(start.x + this._curveStartModifier.x * this.width, start.y + this.curveStartModifier.y * this.height )
    const endModifier = new Point2(end.x + this.curveEndModifier.x * this.width, end.y + this.curveEndModifier.y * this.height)

    this.path.reset()
    //this.path.moveTo(this.start.x - this.left, this.start.y - this.top)
    //this.path.cubicTo(this._curveStartModifier.x, this.curveStartModifier.y, this.curveEndModifier.x, this.curveEndModifier.y, this.end.x - this.left, this.end.y - this.top)
    this.path.moveTo(start.x, start.y)
    //this.path.cubicTo((start.x + end.x) * 0.5, start.y, (start.x + end.x) * 0.5, end.y,  end.x, end.y)
    this.path.cubicTo(startModifier.x, startModifier.y, endModifier.x, endModifier.y, end.x, end.y)
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
      case ConnectorArrowDisplayType.CrossLine: {
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

  private updateStraightLinePath() {

  }

  private updateCrossLinePath() {
    const defaultSegment = this.width > ConnectorShape.DEFAULT_SEGMENT * 2 ? ConnectorShape.DEFAULT_SEGMENT : this.width / 2
    const start = new Point2(this.start.x - this.left, this.start.y - this.top)
    const end = new Point2(this.end.x - this.left, this.end.y - this.top)
    const width = this._horizontal ? this.width - ConnectorShape.DEFAULT_SEGMENT * 2 : this.width
    const height = this._horizontal ? this.height : this.height - ConnectorShape.DEFAULT_SEGMENT * 2    
    this.path.reset()
    this.path.moveTo(start.x, start.y)
    this._crossPoints.length = 0
    this._crossPoints.push(new Point2(start.x, start.y))
    if(this._horizontal) {
      this.path.lineTo(start.x + defaultSegment, start.y)
      //console.log('Start lines')
      //console.log(`lineTo ${start.x + defaultSegment}  ${start.y}`)
      this._crossPoints.push(new Point2(start.x + defaultSegment, start.y))
      for(let i = 0; i < this._crossLines.length /2; i ++) {
        this.path.lineTo(start.x + defaultSegment + this._crossLines[i * 2] * width, start.y + this._crossLines[i * 2 + 1]* height)
        //console.log(`line to ${start.x + i * 2 * this.width} ${start.y + (i * 2 + 1)* this.height}`)
        this._crossPoints.push(new Point2(start.x + defaultSegment + this._crossLines[i * 2] * width, start.y + this._crossLines[i * 2 + 1]* height))
      }
      this.path.lineTo(end.x - defaultSegment, end.y)
      //console.log(`line to ${end.x - defaultSegment} ${end.y}`)
      this._crossPoints.push(new Point2(end.x - defaultSegment, end.y))
    } else {
      this.path.lineTo(start.x, start.y + defaultSegment)
      this._crossPoints.push(new Point2(start.x, start.y + defaultSegment))
      for(let i = 0; i < this._crossLines.length /2; i ++) {
        this.path.lineTo(start.x + this._crossLines[i * 2] * width, start.y + defaultSegment + this._crossLines[i * 2 + 1]* height)
        this._crossPoints.push(new Point2(start.x + this._crossLines[i * 2] * width, start.y + defaultSegment + this._crossLines[i * 2 + 1]* height))
      }
      this.path.lineTo(end.x, end.y - defaultSegment)
      this._crossPoints.push(new Point2(end.x, end.y - defaultSegment))
    }
    this.path.lineTo(end.x, end.y)   
    this._crossPoints.push(new Point2(end.x, end.y))
  }
}
