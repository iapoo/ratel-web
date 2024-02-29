/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */

import { Color, Colors, FillType, Graphics, MathUtils, Paint, PaintStyle, Path, PathOp, Point2, Rectangle, Rotation, Shape, } from '@/components/Engine'
import { Line, Cubic, } from '@antv/g-math'
import { EntityShape, } from './EntityShape'
import { Consts, SystemUtils } from '@/components/Workspace/Utils'
import { ConnectorArrowType } from '../../Items/src/Connector'

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
  DoubleAndStartArrow,
  DoubleAndEndArrow,
  DoubleAndBothArrows,
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
  close: boolean
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
  private _startArrowPath: Path
  private _endArrowPath: Path
  private _arrowStroke: Paint
  private _arrowFill: Paint
  private _connectorDoubleLineGap: number
  private _connectorDoubleLineArrowLength: number
  private _connectorDoubleLineArrowDistance: number
  private _connectorDoubleLinePath: Path
  private _connectorDoubleLineStroke: Paint
  private _connectorDoubleLineFill: Paint
  private _connectorDoubleLinePaint: Paint

  public constructor (startX: number, startY: number, endX: number, endY: number, 
    startDirection: ConnectorDirection = ConnectorDirection.Right, endDirection: ConnectorDirection = ConnectorDirection.Left,
    orthogonalPoints: Point2[] = [],
    startArrowInfo: ConnectorArrowTypeInfo = {
    name: '',
    description: '',
    type: ConnectorArrowDisplayType.None,
    height: 12,
    width: 12,
    modifier: 0,
    count: 1,
    outline: true,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Full
  }, endArrowInfo: ConnectorArrowTypeInfo = {
    name: '',
    description: '',
    type: ConnectorArrowDisplayType.None,
    height: 12,
    width: 12,
    modifier: 0,
    count: 1,
    outline: true,
    close: true,
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
    this._startArrowPath = new Path()
    this._endArrowPath = new Path()
    this._arrowStroke = new Paint()
    this._arrowFill = new Paint()
    this._connectorDoubleLineGap = Consts.DOUBLE_LINE_GAP_DEFAULT
    this._connectorDoubleLineArrowLength = Consts.DOUBLE_LINE_ARROW_LENGTH_DEFAULT
    this._connectorDoubleLineArrowDistance = Consts.DOUBLE_LINE_ARROW_DISTANCE_DEFAULT
    this._connectorDoubleLinePath = new Path()
    this._connectorDoubleLinePaint = new Paint()
    this._connectorDoubleLinePaint.setStrokeWidth(this.stroke.getStroketWidth())
    this._connectorDoubleLinePaint.setPaintStyle(PaintStyle.STROKE)
    this._connectorDoubleLinePaint.setColor(this.stroke.getColor())
    this._connectorDoubleLineStroke = new Paint()
    this._connectorDoubleLineStroke.setStrokeWidth(this.stroke.getStroketWidth() * 2  + this._connectorDoubleLineGap)
    this._connectorDoubleLineStroke.setPaintStyle(PaintStyle.STROKE)
    this._connectorDoubleLineStroke.setColor(this.stroke.getColor())
    this._connectorDoubleLineFill = new Paint()
    this._connectorDoubleLineFill.setStrokeWidth(this._connectorDoubleLineGap)
    this._connectorDoubleLineFill.setPaintStyle(PaintStyle.STROKE)
    this._connectorDoubleLineFill.setColor(this.fill.getColor())
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

  public get connectorDoubleLineGap() {
    return this._connectorDoubleLineGap
  }

  public set connectorDoubleLineGap(value: number) {
    this._connectorDoubleLineGap = value
    this.markDirty()
  }

  public get connectorDoubleLineArrowLength() {
    return this._connectorDoubleLineArrowLength
  }

  public set connectorDoubleLineArrowLength(value: number) {
    this._connectorDoubleLineArrowLength = value
    this.markDirty()
  }

  public get connectorDoubleLineArrowDistance() {
    return this._connectorDoubleLineArrowDistance
  }

  public set connectorDoubleLineArrowDistance(value: number) {
    this._connectorDoubleLineArrowDistance = value
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

  public render (graphics: Graphics): void {
    switch(this.connectorType) {
      case ConnectorType.Curve:
        switch(this.connectorMode) {
          case ConnectorMode.Double:
            graphics.drawPath(this.path, this._connectorDoubleLineStroke)
            graphics.drawPath(this.path, this._connectorDoubleLineFill)
            break;
          case ConnectorMode.DoubleAndStartArrow:
          case ConnectorMode.DoubleAndEndArrow:
          case ConnectorMode.DoubleAndBothArrows:
          case ConnectorMode.Single:
          default:
            graphics.drawPath(this.path, this.stroke)
          break
        }
        break;
      case ConnectorType.Orthogonal:
        switch(this.connectorMode) {
          case ConnectorMode.DoubleAndStartArrow:
          case ConnectorMode.DoubleAndEndArrow:
          case ConnectorMode.DoubleAndBothArrows:
            //graphics.drawPath(this.path, this._connectorDoubleLineStroke)
            //graphics.drawPath(this.path, this._connectorDoubleLineFill)
            graphics.drawPath(this._connectorDoubleLinePath, this._connectorDoubleLinePaint)
            break;
          case ConnectorMode.Double:
            graphics.drawPath(this.path, this._connectorDoubleLineStroke)
            graphics.drawPath(this.path, this._connectorDoubleLineFill)
            break;
          case ConnectorMode.Single:
          default:
            graphics.drawPath(this.path, this.stroke)
          break
        }
        break;
      case ConnectorType.StraightLine:
      default:
        graphics.drawPath(this.path, this.stroke)
        break;
    }
    super.render(graphics)
    //Arrows only work for Single Solid lines
    if(this.connectorMode == ConnectorMode.Single) {
      if(this._startArrow.type != ConnectorArrowDisplayType.None) {
        if(this._startArrow.close) {
          if(this._startArrow.outline) {
            graphics.drawPath(this._startArrowPath, this._arrowFill)
          } else {
            graphics.drawPath(this._startArrowPath, this._arrowStroke)
          }
        }
        graphics.drawPath(this._startArrowPath, this.stroke)
      }
      if(this._endArrow.type != ConnectorArrowDisplayType.None) {
        if(this._endArrow.close) {
          if(this._endArrow.outline) {
            graphics.drawPath(this._endArrowPath, this._arrowFill)
          } else {
            graphics.drawPath(this._endArrowPath, this._arrowStroke)
          }
        }
        graphics.drawPath(this._endArrowPath, this.stroke)
      }
    }
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
      if(this._orthogonalPoints.length > 0) {
        this.updateArrows(this._orthogonalPoints[0], this._startDirection, this._startArrow, this._startArrowPath)
        this.updateArrows(this._orthogonalPoints[this._orthogonalPoints.length - 1], this._endDirection, this._endArrow, this._endArrowPath)
      }
      //console.log(` connectionType = ${this.connectorType} left = ${this.left} top =${this.top} startx = ${this.start.x} starty = ${this.start.y}  endx = ${this.end.x} end.y = ${this.end.y}`)
      //this.resetDirty() 
      this._arrowFill.setPaintStyle(PaintStyle.FILL)
      this._arrowFill.setColor(this.fill.getColor())
      this._arrowStroke.setPaintStyle(PaintStyle.FILL)
      this._arrowStroke.setColor(this.stroke.getColor())
      this._connectorDoubleLinePaint.setStrokeWidth(this.stroke.getStroketWidth())
      this._connectorDoubleLinePaint.setPaintStyle(PaintStyle.STROKE)
      this._connectorDoubleLinePaint.setColor(this.stroke.getColor())
      this._connectorDoubleLineStroke.setStrokeWidth(this.stroke.getStroketWidth() * 2  + this._connectorDoubleLineGap)
      this._connectorDoubleLineStroke.setPaintStyle(PaintStyle.STROKE)
      this._connectorDoubleLineStroke.setColor(this.stroke.getColor())
      this._connectorDoubleLineFill.setStrokeWidth(this._connectorDoubleLineGap)
      this._connectorDoubleLineFill.setPaintStyle(PaintStyle.STROKE)
      this._connectorDoubleLineFill.setColor(this.fill.getColor())

      switch(this.connectorMode) {
        case ConnectorMode.Double:
        case ConnectorMode.DoubleAndStartArrow:
        case ConnectorMode.DoubleAndEndArrow:
        case ConnectorMode.DoubleAndBothArrows:
          this.stroked = false
          this.filled = false
          break;
        case ConnectorMode.Single:
        default:
          this.stroked = true
          this.filled = false
        break
      }
      }
  }

  private updateArrows(point: Point2, direction: ConnectorDirection, arrow: ConnectorArrowTypeInfo, arrowPath: Path) {
    switch(arrow.type) {
      case ConnectorArrowDisplayType.Triangle: {
        this.updateArrayTypeTriangle(point, direction, arrow, arrowPath)
        break;
      }
      case ConnectorArrowDisplayType.Diamond: {
        this.updateArrayTypeDiamond(point, direction, arrow, arrowPath)
        break;
      }
      case ConnectorArrowDisplayType.Ellipse: {
        this.updateArrayTypeEllipse(point, direction, arrow, arrowPath)
        break;
      }
      case ConnectorArrowDisplayType.LeftParenthesis: {
        this.updateArrayTypeLeftParenthesis(point, direction, arrow, arrowPath)
        break;
      }
      case ConnectorArrowDisplayType.RightParenthesis: {
        this.updateArrayTypeRightParenthesis(point, direction, arrow, arrowPath)
        break;
      }
      case ConnectorArrowDisplayType.Orthogonal: {
        this.updateArrayTypeOrthogonal(point, direction, arrow, arrowPath)
        break;
      }
      case ConnectorArrowDisplayType.ForewardSlash: {
        this.updateArrayTypeForewardSlash(point, direction, arrow, arrowPath)
        break;
      }
      case ConnectorArrowDisplayType.Backslashe: {
        this.updateArrayTypeBackslashe(point, direction, arrow, arrowPath)
        break;
      }
      case ConnectorArrowDisplayType.VerticalLine: {
        this.updateArrayTypeVerticalLine(point, direction, arrow, arrowPath)
        break;
      }
      case ConnectorArrowDisplayType.LeftAngleBracket: {
        this.updateArrayTypeLeftAngleBracket(point, direction, arrow, arrowPath)
        break;
      }
      case ConnectorArrowDisplayType.VerticaleLineAndLeftAngleBacket: {
        this.updateArrayTypeVerticaleLineAndLeftAngleBacket(point, direction, arrow, arrowPath)
        break;
      }
      case ConnectorArrowDisplayType.CircleAndVerticalLine: {
        this.updateArrayTypeCircleAndVerticalLine(point, direction, arrow, arrowPath)
        break;
      }
      case ConnectorArrowDisplayType.CircleAndLeftBacket: {
        this.updateArrayTypeCircleAndLeftBacket(point, direction, arrow, arrowPath)
        break;
      }
      default:
      case ConnectorArrowDisplayType.None: {
        arrowPath.reset()
        break;
      }
    }
  }

  private updateArrayTypeTriangle(start: Point2, direction: ConnectorDirection, arrowTypeInfo: ConnectorArrowTypeInfo, arrowPath: Path) {
    arrowPath.reset()
    switch(direction) {
      case ConnectorDirection.Left:
        switch(arrowTypeInfo.displayMode){
          case ConnectorArrowDisplayMode.Top:
            arrowPath.moveTo(start.x, start.y)
            arrowPath.lineTo(start.x - arrowTypeInfo.width, start.y - arrowTypeInfo.height / 2)
            arrowPath.lineTo(start.x - arrowTypeInfo.width + arrowTypeInfo.modifier * arrowTypeInfo.width, start.y)
            arrowPath.lineTo(start.x, start.y)
            break;
          case ConnectorArrowDisplayMode.Bottom:
            arrowPath.moveTo(start.x, start.y)
            arrowPath.lineTo(start.x - arrowTypeInfo.width + arrowTypeInfo.modifier * arrowTypeInfo.width, start.y)
            arrowPath.lineTo(start.x - arrowTypeInfo.width, start.y + arrowTypeInfo.height / 2)
            arrowPath.lineTo(start.x, start.y)
            break;
          case ConnectorArrowDisplayMode.Full:
          default:
            arrowPath.moveTo(start.x, start.y)
            arrowPath.lineTo(start.x - arrowTypeInfo.width, start.y - arrowTypeInfo.height / 2)
            arrowPath.lineTo(start.x - arrowTypeInfo.width + arrowTypeInfo.modifier * arrowTypeInfo.width, start.y)
            arrowPath.lineTo(start.x - arrowTypeInfo.width, start.y + arrowTypeInfo.height / 2)
            arrowPath.lineTo(start.x, start.y)
            if(arrowTypeInfo.count > 1) {
              arrowPath.moveTo(start.x - arrowTypeInfo.width, start.y)
              arrowPath.lineTo(start.x - arrowTypeInfo.width * 2, start.y - arrowTypeInfo.height / 2)
              arrowPath.lineTo(start.x - arrowTypeInfo.width * 2 + arrowTypeInfo.modifier * arrowTypeInfo.width, start.y)
              arrowPath.lineTo(start.x - arrowTypeInfo.width * 2, start.y + arrowTypeInfo.height / 2)
              arrowPath.lineTo(start.x - arrowTypeInfo.width, start.y)
            }
            break;
        }
        break;
      case ConnectorDirection.Top:
        switch(arrowTypeInfo.displayMode) {
          case ConnectorArrowDisplayMode.Top:
            arrowPath.moveTo(start.x, start.y)
            arrowPath.lineTo(start.x - arrowTypeInfo.height / 2, start.y - arrowTypeInfo.width)
            arrowPath.lineTo(start.x, start.y - arrowTypeInfo.width + arrowTypeInfo.modifier * arrowTypeInfo.width)
            arrowPath.lineTo(start.x, start.y)
            break;
          case ConnectorArrowDisplayMode.Bottom:
            arrowPath.moveTo(start.x, start.y)
            arrowPath.lineTo(start.x, start.y - arrowTypeInfo.width + arrowTypeInfo.modifier * arrowTypeInfo.width)
            arrowPath.lineTo(start.x + arrowTypeInfo.height / 2, start.y - arrowTypeInfo.width)
            arrowPath.lineTo(start.x, start.y)
            break;
          case ConnectorArrowDisplayMode.Full:
          default:
            arrowPath.moveTo(start.x, start.y)
            arrowPath.lineTo(start.x - arrowTypeInfo.height / 2, start.y - arrowTypeInfo.width)
            arrowPath.lineTo(start.x, start.y - arrowTypeInfo.width + arrowTypeInfo.modifier * arrowTypeInfo.width)
            arrowPath.lineTo(start.x + arrowTypeInfo.height / 2, start.y - arrowTypeInfo.width)
            arrowPath.lineTo(start.x, start.y)
            if(arrowTypeInfo.count > 1) {
              arrowPath.moveTo(start.x, start.y - arrowTypeInfo.width)
              arrowPath.lineTo(start.x - arrowTypeInfo.height / 2, start.y - arrowTypeInfo.width * 2)
              arrowPath.lineTo(start.x, start.y - arrowTypeInfo.width * 2 + arrowTypeInfo.modifier * arrowTypeInfo.width)
              arrowPath.lineTo(start.x + arrowTypeInfo.height / 2, start.y - arrowTypeInfo.width * 2)
              arrowPath.lineTo(start.x, start.y - arrowTypeInfo.width)
            }
            break;
        }
        break;
      case ConnectorDirection.Right:
        switch(arrowTypeInfo.displayMode) {
          case ConnectorArrowDisplayMode.Top:
            arrowPath.moveTo(start.x, start.y)
            arrowPath.lineTo(start.x + arrowTypeInfo.width, start.y - arrowTypeInfo.height / 2)
            arrowPath.lineTo(start.x + arrowTypeInfo.width - arrowTypeInfo.modifier * arrowTypeInfo.width, start.y)
            arrowPath.lineTo(start.x, start.y)
            break;
          case ConnectorArrowDisplayMode.Bottom:
            arrowPath.moveTo(start.x, start.y)
            arrowPath.lineTo(start.x + arrowTypeInfo.width - arrowTypeInfo.modifier * arrowTypeInfo.width, start.y)
            arrowPath.lineTo(start.x + arrowTypeInfo.width, start.y + arrowTypeInfo.height / 2)
            arrowPath.lineTo(start.x, start.y)
            break;
          case ConnectorArrowDisplayMode.Full:
          default:
            arrowPath.moveTo(start.x, start.y)
            arrowPath.lineTo(start.x + arrowTypeInfo.width, start.y - arrowTypeInfo.height / 2)
            arrowPath.lineTo(start.x + arrowTypeInfo.width - arrowTypeInfo.modifier * arrowTypeInfo.width, start.y)
            arrowPath.lineTo(start.x + arrowTypeInfo.width, start.y + arrowTypeInfo.height / 2)
            arrowPath.lineTo(start.x, start.y)
            if(arrowTypeInfo.count > 1) {
              arrowPath.moveTo(start.x + arrowTypeInfo.width, start.y)
              arrowPath.lineTo(start.x + arrowTypeInfo.width * 2, start.y - arrowTypeInfo.height / 2)
              arrowPath.lineTo(start.x + arrowTypeInfo.width * 2 - arrowTypeInfo.modifier * arrowTypeInfo.width, start.y)
              arrowPath.lineTo(start.x + arrowTypeInfo.width * 2, start.y + arrowTypeInfo.height / 2)
              arrowPath.lineTo(start.x + arrowTypeInfo.width, start.y)
            }
            break;
        }
        break;
      case ConnectorDirection.Bottom:
      default:
        switch(arrowTypeInfo.displayMode) {
          case ConnectorArrowDisplayMode.Top:
            arrowPath.moveTo(start.x, start.y)
            arrowPath.lineTo(start.x - arrowTypeInfo.height / 2, start.y + arrowTypeInfo.width)
            arrowPath.lineTo(start.x, start.y + arrowTypeInfo.width - arrowTypeInfo.modifier * arrowTypeInfo.width)
            arrowPath.lineTo(start.x, start.y)
            break;
          case ConnectorArrowDisplayMode.Bottom:
            arrowPath.moveTo(start.x, start.y)
            arrowPath.lineTo(start.x, start.y + arrowTypeInfo.width - arrowTypeInfo.modifier * arrowTypeInfo.width)
            arrowPath.lineTo(start.x + arrowTypeInfo.height / 2, start.y + arrowTypeInfo.width)
            arrowPath.lineTo(start.x, start.y)
            break;
          case ConnectorArrowDisplayMode.Full:
          default:
            arrowPath.moveTo(start.x, start.y)
            arrowPath.lineTo(start.x - arrowTypeInfo.height / 2, start.y + arrowTypeInfo.width)
            arrowPath.lineTo(start.x, start.y + arrowTypeInfo.width - arrowTypeInfo.modifier * arrowTypeInfo.width)
            arrowPath.lineTo(start.x + arrowTypeInfo.height / 2, start.y + arrowTypeInfo.width)
            arrowPath.lineTo(start.x, start.y)
            if(arrowTypeInfo.count > 1) {
              arrowPath.moveTo(start.x, start.y + arrowTypeInfo.width)
              arrowPath.lineTo(start.x - arrowTypeInfo.height / 2, start.y + arrowTypeInfo.width * 2)
              arrowPath.lineTo(start.x, start.y + arrowTypeInfo.width * 2 - arrowTypeInfo.modifier * arrowTypeInfo.width)
              arrowPath.lineTo(start.x + arrowTypeInfo.height / 2, start.y + arrowTypeInfo.width * 2)
              arrowPath.lineTo(start.x, start.y + arrowTypeInfo.width)
            }
            break;
        }
        break;
    }
  }

  private updateArrayTypeDiamond(start: Point2, direction: ConnectorDirection, arrowTypeInfo: ConnectorArrowTypeInfo, arrowPath: Path) {
    arrowPath.reset()
    switch(direction) {
      case ConnectorDirection.Left:
        arrowPath.moveTo(start.x, start.y)
        arrowPath.lineTo(start.x - arrowTypeInfo.width / 2, start.y - arrowTypeInfo.height / 2)
        arrowPath.lineTo(start.x - arrowTypeInfo.width, start.y)
        arrowPath.lineTo(start.x - arrowTypeInfo.width / 2, start.y + arrowTypeInfo.height / 2)
        arrowPath.lineTo(start.x, start.y)
        if(arrowTypeInfo.count > 1) {
          arrowPath.moveTo(start.x - arrowTypeInfo.width, start.y)
          arrowPath.lineTo(start.x - arrowTypeInfo.width * 1.5, start.y - arrowTypeInfo.height / 2)
          arrowPath.lineTo(start.x - arrowTypeInfo.width * 2, start.y)
          arrowPath.lineTo(start.x - arrowTypeInfo.width * 1.5, start.y + arrowTypeInfo.height / 2)
          arrowPath.lineTo(start.x - arrowTypeInfo.width, start.y)
        }
        break;
      case ConnectorDirection.Top:
        arrowPath.moveTo(start.x, start.y)
        arrowPath.lineTo(start.x - arrowTypeInfo.height / 2, start.y - arrowTypeInfo.width / 2)
        arrowPath.lineTo(start.x, start.y - arrowTypeInfo.width)
        arrowPath.lineTo(start.x + arrowTypeInfo.height / 2, start.y - arrowTypeInfo.width / 2)
        arrowPath.lineTo(start.x, start.y)
        if(arrowTypeInfo.count > 1) {
          arrowPath.moveTo(start.x, start.y - arrowTypeInfo.width)
          arrowPath.lineTo(start.x - arrowTypeInfo.height / 2, start.y - arrowTypeInfo.width * 1.5)
          arrowPath.lineTo(start.x, start.y - arrowTypeInfo.width * 2)
          arrowPath.lineTo(start.x + arrowTypeInfo.height / 2, start.y - arrowTypeInfo.width * 1.5)
          arrowPath.lineTo(start.x, start.y - arrowTypeInfo.width)
        }
        break;
      case ConnectorDirection.Right:
        arrowPath.moveTo(start.x, start.y)
        arrowPath.lineTo(start.x + arrowTypeInfo.width / 2, start.y - arrowTypeInfo.height / 2)
        arrowPath.lineTo(start.x + arrowTypeInfo.width, start.y)
        arrowPath.lineTo(start.x + arrowTypeInfo.width / 2, start.y + arrowTypeInfo.height / 2)
        arrowPath.lineTo(start.x, start.y)
        if(arrowTypeInfo.count > 1) {
          arrowPath.moveTo(start.x + arrowTypeInfo.width, start.y)
          arrowPath.lineTo(start.x + arrowTypeInfo.width * 1.5, start.y - arrowTypeInfo.height / 2)
          arrowPath.lineTo(start.x + arrowTypeInfo.width * 2, start.y)
          arrowPath.lineTo(start.x + arrowTypeInfo.width * 1.5, start.y + arrowTypeInfo.height / 2)
          arrowPath.lineTo(start.x + arrowTypeInfo.width, start.y)
        }
        break;
      case ConnectorDirection.Bottom:
      default:
        arrowPath.moveTo(start.x, start.y)
        arrowPath.lineTo(start.x - arrowTypeInfo.height / 2, start.y + arrowTypeInfo.width / 2)
        arrowPath.lineTo(start.x, start.y + arrowTypeInfo.width)
        arrowPath.lineTo(start.x + arrowTypeInfo.height / 2, start.y + arrowTypeInfo.width / 2)
        arrowPath.lineTo(start.x, start.y)
        if(arrowTypeInfo.count > 1) {
          arrowPath.moveTo(start.x, start.y + arrowTypeInfo.width)
          arrowPath.lineTo(start.x - arrowTypeInfo.height / 2, start.y + arrowTypeInfo.width * 1.5)
          arrowPath.lineTo(start.x, start.y + arrowTypeInfo.width * 2)
          arrowPath.lineTo(start.x + arrowTypeInfo.height / 2, start.y + arrowTypeInfo.width * 1.5)
          arrowPath.lineTo(start.x, start.y + arrowTypeInfo.width)
        }
        break;
    }
  }

  private updateArrayTypeEllipse(start: Point2, direction: ConnectorDirection, arrowTypeInfo: ConnectorArrowTypeInfo, arrowPath: Path) {
    arrowPath.reset()
    switch(direction) {
      case ConnectorDirection.Left:
        arrowPath.addOval(Rectangle.makeLTWH(start.x - arrowTypeInfo.width, start.y - arrowTypeInfo.height / 2, arrowTypeInfo.width, arrowTypeInfo.height))
        if(arrowTypeInfo.count > 1) {
          arrowPath.addOval(Rectangle.makeLTWH(start.x - arrowTypeInfo.width * 2, start.y - arrowTypeInfo.height / 2, arrowTypeInfo.width, arrowTypeInfo.height))
        }
        break;
      case ConnectorDirection.Top:
        arrowPath.addOval(Rectangle.makeLTWH(start.x - arrowTypeInfo.height / 2, start.y - arrowTypeInfo.width, arrowTypeInfo.height, arrowTypeInfo.width))
        if(arrowTypeInfo.count > 1) {
          arrowPath.addOval(Rectangle.makeLTWH(start.x - arrowTypeInfo.height / 2, start.y - arrowTypeInfo.width * 2, arrowTypeInfo.height, arrowTypeInfo.width))
        }
        break;
      case ConnectorDirection.Right:
        arrowPath.addOval(Rectangle.makeLTWH(start.x, start.y - arrowTypeInfo.height / 2, arrowTypeInfo.width, arrowTypeInfo.height))
        if(arrowTypeInfo.count > 1) {
          arrowPath.addOval(Rectangle.makeLTWH(start.x + arrowTypeInfo.width, start.y - arrowTypeInfo.height / 2, arrowTypeInfo.width, arrowTypeInfo.height))
        }
        break;
      case ConnectorDirection.Bottom:
      default:
        arrowPath.addOval(Rectangle.makeLTWH(start.x - arrowTypeInfo.height / 2, start.y, arrowTypeInfo.height, arrowTypeInfo.width))
        if(arrowTypeInfo.count > 1) {
          arrowPath.addOval(Rectangle.makeLTWH(start.x - arrowTypeInfo.height / 2, start.y + arrowTypeInfo.width, arrowTypeInfo.height, arrowTypeInfo.width))
        }
        break;
    }
  }

  private updateArrayTypeLeftParenthesis(start: Point2, direction: ConnectorDirection, arrowTypeInfo: ConnectorArrowTypeInfo, arrowPath: Path) {
    arrowPath.reset()
    switch(direction) {
      case ConnectorDirection.Left:
        arrowPath.addArc(Rectangle.makeLTWH(start.x - arrowTypeInfo.width, start.y - arrowTypeInfo.height / 2, arrowTypeInfo.width, arrowTypeInfo.height), 90, 180)
        break;
      case ConnectorDirection.Top:
        arrowPath.addArc(Rectangle.makeLTWH(start.x - arrowTypeInfo.height / 2, start.y - arrowTypeInfo.width, arrowTypeInfo.height, arrowTypeInfo.width), 180, 180)
        break;
      case ConnectorDirection.Right:
        arrowPath.addArc(Rectangle.makeLTWH(start.x, start.y - arrowTypeInfo.height / 2, arrowTypeInfo.width, arrowTypeInfo.height), 270, 180)
        break;
      case ConnectorDirection.Bottom:
      default:
        arrowPath.addArc(Rectangle.makeLTWH(start.x - arrowTypeInfo.height / 2, start.y, arrowTypeInfo.height, arrowTypeInfo.width), 0, 180)
        break;
    }
  }


  private updateArrayTypeRightParenthesis(start: Point2, direction: ConnectorDirection, arrowTypeInfo: ConnectorArrowTypeInfo, arrowPath: Path) {
    arrowPath.reset()
    switch(direction) {
      case ConnectorDirection.Left:
        arrowPath.addArc(Rectangle.makeLTWH(start.x - arrowTypeInfo.width, start.y - arrowTypeInfo.height / 2, arrowTypeInfo.width, arrowTypeInfo.height), 270, 180)
        break;
      case ConnectorDirection.Top:
        arrowPath.addArc(Rectangle.makeLTWH(start.x - arrowTypeInfo.height / 2, start.y - arrowTypeInfo.width, arrowTypeInfo.height, arrowTypeInfo.width), 0, 180)
        break;
      case ConnectorDirection.Right:
        arrowPath.addArc(Rectangle.makeLTWH(start.x, start.y - arrowTypeInfo.height / 2, arrowTypeInfo.width, arrowTypeInfo.height), 90, 180)
        break;
      case ConnectorDirection.Bottom:
      default:
        arrowPath.addArc(Rectangle.makeLTWH(start.x - arrowTypeInfo.height / 2, start.y, arrowTypeInfo.height, arrowTypeInfo.width), 180, 180)
        break;
    }
  }

  private updateArrayTypeOrthogonal(start: Point2, direction: ConnectorDirection, arrowTypeInfo: ConnectorArrowTypeInfo, arrowPath: Path) {
    arrowPath.reset()
    switch(direction) {
      case ConnectorDirection.Left:
        arrowPath.moveTo(start.x - arrowTypeInfo.width, start.y - arrowTypeInfo.height / 2)
        arrowPath.lineTo(start.x, start.y + arrowTypeInfo.height / 2)
        arrowPath.moveTo(start.x - arrowTypeInfo.width, start.y + arrowTypeInfo.height / 2)
        arrowPath.lineTo(start.x, start.y - arrowTypeInfo.height / 2)
        break;
      case ConnectorDirection.Top:
        arrowPath.moveTo(start.x - arrowTypeInfo.height / 2, start.y - arrowTypeInfo.width)
        arrowPath.lineTo(start.x + arrowTypeInfo.height / 2, start.y)
        arrowPath.moveTo(start.x + arrowTypeInfo.height / 2, start.y - arrowTypeInfo.width)
        arrowPath.lineTo(start.x - arrowTypeInfo.height / 2, start.y)
        break;
      case ConnectorDirection.Right:
        arrowPath.moveTo(start.x, start.y - arrowTypeInfo.height / 2)
        arrowPath.lineTo(start.x + arrowTypeInfo.width, start.y + arrowTypeInfo.height / 2)
        arrowPath.moveTo(start.x, start.y + arrowTypeInfo.height / 2)
        arrowPath.lineTo(start.x + arrowTypeInfo.width, start.y - arrowTypeInfo.height / 2)
        break;
      case ConnectorDirection.Bottom:
      default:
        arrowPath.moveTo(start.x - arrowTypeInfo.height / 2, start.y + arrowTypeInfo.width)
        arrowPath.lineTo(start.x + arrowTypeInfo.height / 2, start.y)
        arrowPath.moveTo(start.x + arrowTypeInfo.height / 2, start.y + arrowTypeInfo.width)
        arrowPath.lineTo(start.x - arrowTypeInfo.height / 2, start.y)
        break;
    }
  }

  private updateArrayTypeForewardSlash(start: Point2, direction: ConnectorDirection, arrowTypeInfo: ConnectorArrowTypeInfo, arrowPath: Path) {
    arrowPath.reset()
    switch(direction) {
      case ConnectorDirection.Left:
        arrowPath.moveTo(start.x - arrowTypeInfo.width, start.y + arrowTypeInfo.height / 2)
        arrowPath.lineTo(start.x, start.y - arrowTypeInfo.height / 2)
        break;
      case ConnectorDirection.Top:
        arrowPath.moveTo(start.x + arrowTypeInfo.height / 2, start.y - arrowTypeInfo.width)
        arrowPath.lineTo(start.x - arrowTypeInfo.height / 2, start.y)
        break;
      case ConnectorDirection.Right:
        arrowPath.moveTo(start.x, start.y + arrowTypeInfo.height / 2)
        arrowPath.lineTo(start.x + arrowTypeInfo.width, start.y - arrowTypeInfo.height / 2)
        break;
      case ConnectorDirection.Bottom:
      default:
        arrowPath.moveTo(start.x - arrowTypeInfo.height / 2, start.y + arrowTypeInfo.width)
        arrowPath.lineTo(start.x + arrowTypeInfo.height / 2, start.y)
        break;
    }
  }

  private updateArrayTypeBackslashe(start: Point2, direction: ConnectorDirection, arrowTypeInfo: ConnectorArrowTypeInfo, arrowPath: Path) {
    arrowPath.reset()
    switch(direction) {
      case ConnectorDirection.Left:
        arrowPath.moveTo(start.x - arrowTypeInfo.width, start.y - arrowTypeInfo.height / 2)
        arrowPath.lineTo(start.x, start.y + arrowTypeInfo.height / 2)
        break;
      case ConnectorDirection.Top:
        arrowPath.moveTo(start.x - arrowTypeInfo.height / 2, start.y - arrowTypeInfo.width)
        arrowPath.lineTo(start.x + arrowTypeInfo.height / 2, start.y)
        break;
      case ConnectorDirection.Right:
        arrowPath.moveTo(start.x, start.y - arrowTypeInfo.height / 2)
        arrowPath.lineTo(start.x + arrowTypeInfo.width, start.y + arrowTypeInfo.height / 2)
        break;
      case ConnectorDirection.Bottom:
      default:
        arrowPath.moveTo(start.x + arrowTypeInfo.height / 2, start.y + arrowTypeInfo.width)
        arrowPath.lineTo(start.x - arrowTypeInfo.height / 2, start.y)
        break;
    }
  }

  private updateArrayTypeVerticalLine(start: Point2, direction: ConnectorDirection, arrowTypeInfo: ConnectorArrowTypeInfo, arrowPath: Path) {
    arrowPath.reset()
    switch(direction) {
      case ConnectorDirection.Left:
        arrowPath.moveTo(start.x - arrowTypeInfo.width * arrowTypeInfo.modifier, start.y - arrowTypeInfo.height / 2)
        arrowPath.lineTo(start.x - arrowTypeInfo.width * arrowTypeInfo.modifier, start.y + arrowTypeInfo.height / 2)
        break;
      case ConnectorDirection.Top:
        arrowPath.moveTo(start.x - arrowTypeInfo.height / 2, start.y - arrowTypeInfo.width * arrowTypeInfo.modifier)
        arrowPath.lineTo(start.x + arrowTypeInfo.height / 2, start.y - arrowTypeInfo.width * arrowTypeInfo.modifier)
        break;
      case ConnectorDirection.Right:
        arrowPath.moveTo(start.x + arrowTypeInfo.width * arrowTypeInfo.modifier, start.y - arrowTypeInfo.height / 2)
        arrowPath.lineTo(start.x + arrowTypeInfo.width * arrowTypeInfo.modifier, start.y + arrowTypeInfo.height / 2)
        break;
      case ConnectorDirection.Bottom:
      default:
        arrowPath.moveTo(start.x - arrowTypeInfo.height / 2, start.y + arrowTypeInfo.width * arrowTypeInfo.modifier)
        arrowPath.lineTo(start.x + arrowTypeInfo.height / 2, start.y + arrowTypeInfo.width * arrowTypeInfo.modifier)
        break;
    }
  }

  private updateArrayTypeLeftAngleBracket(start: Point2, direction: ConnectorDirection, arrowTypeInfo: ConnectorArrowTypeInfo, arrowPath: Path) {
    arrowPath.reset()
    switch(direction) {
      case ConnectorDirection.Left:
        arrowPath.moveTo(start.x, start.y - arrowTypeInfo.height / 2)
        arrowPath.lineTo(start.x - arrowTypeInfo.width, start.y)
        arrowPath.lineTo(start.x, start.y + arrowTypeInfo.height / 2)
        break;
      case ConnectorDirection.Top:
        arrowPath.moveTo(start.x - arrowTypeInfo.height / 2, start.y)
        arrowPath.lineTo(start.x, start.y - arrowTypeInfo.width)
        arrowPath.lineTo(start.x + arrowTypeInfo.height / 2, start.y)
        break;
      case ConnectorDirection.Right:
        arrowPath.moveTo(start.x, start.y - arrowTypeInfo.height / 2)
        arrowPath.lineTo(start.x + arrowTypeInfo.width, start.y)
        arrowPath.lineTo(start.x, start.y + arrowTypeInfo.height / 2)
        break;
      case ConnectorDirection.Bottom:
      default:
        arrowPath.moveTo(start.x - arrowTypeInfo.height / 2, start.y)
        arrowPath.lineTo(start.x, start.y + arrowTypeInfo.width)
        arrowPath.lineTo(start.x + arrowTypeInfo.height / 2, start.y)
        break;
    }
  }

  private updateArrayTypeVerticaleLineAndLeftAngleBacket(start: Point2, direction: ConnectorDirection, arrowTypeInfo: ConnectorArrowTypeInfo, arrowPath: Path) {
    arrowPath.reset()
    switch(direction) {
      case ConnectorDirection.Left:
        arrowPath.moveTo(start.x - arrowTypeInfo.width, start.y - arrowTypeInfo.height / 2)
        arrowPath.lineTo(start.x - arrowTypeInfo.width, start.y + arrowTypeInfo.height / 2)
        arrowPath.moveTo(start.x, start.y - arrowTypeInfo.height / 2)
        arrowPath.lineTo(start.x - arrowTypeInfo.width, start.y)
        arrowPath.lineTo(start.x, start.y + arrowTypeInfo.height / 2)
        break;
      case ConnectorDirection.Top:
        arrowPath.moveTo(start.x - arrowTypeInfo.height / 2, start.y - arrowTypeInfo.width)
        arrowPath.lineTo(start.x + arrowTypeInfo.height / 2, start.y - arrowTypeInfo.width)
        arrowPath.moveTo(start.x - arrowTypeInfo.height / 2, start.y)
        arrowPath.lineTo(start.x, start.y - arrowTypeInfo.width)
        arrowPath.lineTo(start.x + arrowTypeInfo.height / 2, start.y)
        break;
      case ConnectorDirection.Right:
        arrowPath.moveTo(start.x + arrowTypeInfo.width, start.y - arrowTypeInfo.height / 2)
        arrowPath.lineTo(start.x + arrowTypeInfo.width, start.y + arrowTypeInfo.height / 2)
        arrowPath.moveTo(start.x, start.y - arrowTypeInfo.height / 2)
        arrowPath.lineTo(start.x + arrowTypeInfo.width, start.y)
        arrowPath.lineTo(start.x, start.y + arrowTypeInfo.height / 2)
        break;
      case ConnectorDirection.Bottom:
      default:
        arrowPath.moveTo(start.x - arrowTypeInfo.height / 2, start.y + arrowTypeInfo.width)
        arrowPath.lineTo(start.x + arrowTypeInfo.height / 2, start.y + arrowTypeInfo.width)
        arrowPath.moveTo(start.x - arrowTypeInfo.height / 2, start.y)
        arrowPath.lineTo(start.x, start.y + arrowTypeInfo.width)
        arrowPath.lineTo(start.x + arrowTypeInfo.height / 2, start.y)
        break;
    }
  }

  private updateArrayTypeCircleAndVerticalLine(start: Point2, direction: ConnectorDirection, arrowTypeInfo: ConnectorArrowTypeInfo, arrowPath: Path) {
    arrowPath.reset()
    switch(direction) {
      case ConnectorDirection.Left:
        arrowPath.moveTo(start.x - arrowTypeInfo.width / 4, start.y - arrowTypeInfo.height / 2)
        arrowPath.lineTo(start.x - arrowTypeInfo.width / 4, start.y + arrowTypeInfo.height / 2)
        arrowPath.addOval(Rectangle.makeLTWH(start.x - arrowTypeInfo.width, start.y - arrowTypeInfo.height /2, arrowTypeInfo.width / 2, arrowTypeInfo.height))
        break;
      case ConnectorDirection.Top:
        arrowPath.moveTo(start.x - arrowTypeInfo.height / 2, start.y - arrowTypeInfo.width / 4)
        arrowPath.lineTo(start.x + arrowTypeInfo.height / 2, start.y - arrowTypeInfo.width / 4)
        arrowPath.addOval(Rectangle.makeLTWH(start.x - arrowTypeInfo.height / 2, start.y - arrowTypeInfo.width, arrowTypeInfo.height, arrowTypeInfo.width / 2))
        break;
      case ConnectorDirection.Right:
        arrowPath.moveTo(start.x + arrowTypeInfo.width / 4, start.y - arrowTypeInfo.height / 2)
        arrowPath.lineTo(start.x + arrowTypeInfo.width / 4, start.y + arrowTypeInfo.height / 2)
        arrowPath.addOval(Rectangle.makeLTWH(start.x + arrowTypeInfo.width / 2, start.y - arrowTypeInfo.height /2, arrowTypeInfo.width / 2, arrowTypeInfo.height))
        break;
      case ConnectorDirection.Bottom:
      default:
        arrowPath.moveTo(start.x - arrowTypeInfo.height / 2, start.y + arrowTypeInfo.width / 4)
        arrowPath.lineTo(start.x + arrowTypeInfo.height / 2, start.y + arrowTypeInfo.width / 4)
        arrowPath.addOval(Rectangle.makeLTWH(start.x - arrowTypeInfo.height / 2, start.y + arrowTypeInfo.width / 2, arrowTypeInfo.height, arrowTypeInfo.width / 2))
        break;
    }
  }

  private updateArrayTypeCircleAndLeftBacket(start: Point2, direction: ConnectorDirection, arrowTypeInfo: ConnectorArrowTypeInfo, arrowPath: Path) {
    arrowPath.reset()
    switch(direction) {
      case ConnectorDirection.Left:
        arrowPath.moveTo(start.x, start.y - arrowTypeInfo.height / 2)
        arrowPath.lineTo(start.x - arrowTypeInfo.width / 2, start.y)
        arrowPath.lineTo(start.x, start.y + arrowTypeInfo.height / 2)
        arrowPath.addOval(Rectangle.makeLTWH(start.x - arrowTypeInfo.width, start.y - arrowTypeInfo.height /2, arrowTypeInfo.width / 2, arrowTypeInfo.height))
        break;
      case ConnectorDirection.Top:
        arrowPath.moveTo(start.x - arrowTypeInfo.height / 2, start.y)
        arrowPath.lineTo(start.x, start.y - arrowTypeInfo.width / 2)
        arrowPath.lineTo(start.x + arrowTypeInfo.height / 2, start.y)
        arrowPath.addOval(Rectangle.makeLTWH(start.x - arrowTypeInfo.height / 2, start.y - arrowTypeInfo.width, arrowTypeInfo.height, arrowTypeInfo.width / 2))
        break;
      case ConnectorDirection.Right:
        arrowPath.moveTo(start.x, start.y - arrowTypeInfo.height / 2)
        arrowPath.lineTo(start.x + arrowTypeInfo.width / 2, start.y)
        arrowPath.lineTo(start.x, start.y + arrowTypeInfo.height / 2)
        arrowPath.addOval(Rectangle.makeLTWH(start.x + arrowTypeInfo.width / 2, start.y - arrowTypeInfo.height /2, arrowTypeInfo.width / 2, arrowTypeInfo.height))
        break;
      case ConnectorDirection.Bottom:
      default:
        arrowPath.moveTo(start.x - arrowTypeInfo.height / 2, start.y)
        arrowPath.lineTo(start.x, start.y + arrowTypeInfo.width / 2)
        arrowPath.lineTo(start.x + arrowTypeInfo.height / 2, start.y)
        arrowPath.addOval(Rectangle.makeLTWH(start.x - arrowTypeInfo.height / 2, start.y + arrowTypeInfo.width / 2, arrowTypeInfo.height, arrowTypeInfo.width / 2))
        break;
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
    const x1 = this.start.x - this.left
    const y1 = this.start.y - this.top
    const x2 = this.end.x - this.left
    const y2 = this.end.y - this.top
    const distance = this._connectorDoubleLineGap * 0.5
    const [leftX1, leftY1, leftX2, leftY2,rightX1, rightY1, rightX2, rightY2] = MathUtils.getTranslatedLine(x1, y1, x2, y2, distance)
    const [leftX3, leftY3, leftX4, leftY4,rightX3, rightY3, rightX4, rightY4] = MathUtils.getTranslatedLine(x1, y1, x2, y2, distance + this.connectorDoubleLineArrowDistance)
    const lineLength = Line.length(leftX1, leftY1, leftX2, leftY2)
    const ratio1 = this._connectorDoubleLineArrowLength / lineLength
    const ratio2 = 1 - ratio1
    const leftStart1 = Line.pointAt(leftX1, leftY1, leftX2, leftY2, ratio1)
    const rightStart1 = Line.pointAt(rightX1, rightY1, rightX2, rightY2, ratio1)
    const leftStart2 = Line.pointAt(leftX1, leftY1, leftX2, leftY2, ratio2)
    const rightStart2 = Line.pointAt(rightX1, rightY1, rightX2, rightY2, ratio2)
    const leftStart3 = Line.pointAt(leftX3, leftY3, leftX4, leftY4, ratio1)
    const rightStart3 = Line.pointAt(rightX3, rightY3, rightX4, rightY4, ratio1)
    const leftStart4 = Line.pointAt(leftX3, leftY3, leftX4, leftY4, ratio2)
    const rightStart4 = Line.pointAt(rightX3, rightY3, rightX4, rightY4, ratio2)
    this.path.reset()
    //Don't start from joint point of arrow, it will cause 1 empty point
    switch(this._connectorMode) {
      case ConnectorMode.Double:
        this.path.moveTo(leftX1, leftY1)
        this.path.lineTo(leftX2, leftY2)
        this.path.moveTo(rightX1, rightY1)
        this.path.lineTo(rightX2, rightY2)
        break;
      case ConnectorMode.DoubleAndStartArrow:
        this.path.moveTo(leftX2, leftY2)
        this.path.lineTo(leftStart1.x, leftStart1.y)
        this.path.lineTo(leftStart3.x, leftStart3.y)
        this.path.lineTo(x1, y1)
        this.path.lineTo(rightStart3.x, rightStart3.y)
        this.path.lineTo(rightStart1.x, rightStart1.y)
        this.path.lineTo(rightX2, rightY2)
        break;
      case ConnectorMode.DoubleAndEndArrow:
        this.path.moveTo(leftX1, leftY1)
        this.path.lineTo(leftStart2.x, leftStart2.y)
        this.path.lineTo(leftStart4.x, leftStart4.y)
        this.path.lineTo(x2, y2)
        this.path.lineTo(rightStart4.x, rightStart4.y)
        this.path.lineTo(rightStart2.x, rightStart2.y)
        this.path.lineTo(rightX1, rightY1)
        break;
      case ConnectorMode.DoubleAndBothArrows:
        this.path.moveTo(leftStart1.x, leftStart1.y)
        this.path.lineTo(leftStart3.x, leftStart3.y)
        this.path.lineTo(x1, y1)
        this.path.lineTo(rightStart3.x, rightStart3.y)
        this.path.lineTo(rightStart1.x, rightStart1.y)
        this.path.lineTo(rightStart2.x, rightStart2.y)
        this.path.lineTo(rightStart4.x, rightStart4.y)
        this.path.lineTo(x2, y2)
        this.path.lineTo(leftStart4.x, leftStart4.y)
        this.path.lineTo(leftStart2.x, leftStart2.y)
        this.path.lineTo(leftStart1.x, leftStart1.y)
        this.path.close()
        break;
      case ConnectorMode.Single:
      default:
        this.path.moveTo(x1, y1)
        this.path.lineTo(x2, y2)
        break;    
    }
  }

  private getTranslatedPaths(includeStart: boolean, includeEnd: boolean, firstLineWith3Points: boolean) {
    const count = this._orthogonalPoints.length
    const points = this._orthogonalPoints.filter((value, index) => {
      if(firstLineWith3Points && (index == 1 || index == count - 2)) {
        return false
      } else {
        return true
      }
    })
    if(!includeStart) {
      points.splice(0,1)
    }
    if(!includeEnd) {
      points.splice(points.length - 1, 1)
    }
    const segments: Array<number[]> = []
    for(let i = 0; i < points.length - 1; i ++) {
      let x1 = points[i].x
      let y1 = points[i].y
      let x2 = points[i + 1].x
      let y2 = points[i + 1].y
      //Make joint point smoothy
      if(x1 == x2) { //vertical line
        if(y1 < y2) {
          y1 = y1 - (this.connectorDoubleLineGap ) * 0.5
          y2 = y2 + (this.connectorDoubleLineGap ) * 0.5
        } else {
          y1 = y1 + (this.connectorDoubleLineGap ) * 0.5
          y2 = y2 - (this.connectorDoubleLineGap ) * 0.5
        }
      } else {
        if(x1 < x2) {
          x1 = x1 - (this.connectorDoubleLineGap ) * 0.5
          x2 = x2 + (this.connectorDoubleLineGap ) * 0.5
        } else {
          x1 = x1 + (this.connectorDoubleLineGap ) * 0.5
          x2 = x2 - (this.connectorDoubleLineGap ) * 0.5
        }
      }

      const distance = this._connectorDoubleLineGap * 0.5
      const segment = MathUtils.getTranslatedLine(x1, y1, x2, y2, distance)
      segments.push(segment)
    }
    const paths: Array<Path> = []
    for(let i = 0; i < segments.length; i ++) {
      const segment = segments[i]
      const path = new Path()
      path.moveTo(segment[0], segment[1])
      path.lineTo(segment[2], segment[3])
      path.lineTo(segment[6], segment[7])
      path.lineTo(segment[4], segment[5])
      path.close()
      paths.push(path)
    }
    return paths
  }

  private populateDoubleLineArrowPath(path: Path, x1: number, y1: number, x2: number, y2: number, forStart: boolean) {
    const distance = this._connectorDoubleLineGap * 0.5
    const [leftX1, leftY1, leftX2, leftY2,rightX1, rightY1, rightX2, rightY2] = MathUtils.getTranslatedLine(x1, y1, x2, y2, distance)
    const [leftX3, leftY3, leftX4, leftY4,rightX3, rightY3, rightX4, rightY4] = MathUtils.getTranslatedLine(x1, y1, x2, y2, distance + this.connectorDoubleLineArrowDistance)
    const lineLength = Line.length(leftX1, leftY1, leftX2, leftY2)
    const ratio1 = this._connectorDoubleLineArrowLength / lineLength
    const ratio2 = 1 - ratio1
    const leftStart1 = Line.pointAt(leftX1, leftY1, leftX2, leftY2, ratio1)
    const rightStart1 = Line.pointAt(rightX1, rightY1, rightX2, rightY2, ratio1)
    const leftStart2 = Line.pointAt(leftX1, leftY1, leftX2, leftY2, ratio2)
    const rightStart2 = Line.pointAt(rightX1, rightY1, rightX2, rightY2, ratio2)
    const leftStart3 = Line.pointAt(leftX3, leftY3, leftX4, leftY4, ratio1)
    const rightStart3 = Line.pointAt(rightX3, rightY3, rightX4, rightY4, ratio1)
    const leftStart4 = Line.pointAt(leftX3, leftY3, leftX4, leftY4, ratio2)
    const rightStart4 = Line.pointAt(rightX3, rightY3, rightX4, rightY4, ratio2)    
    if(forStart) {
      path.moveTo(leftX2,  leftY2)
      path.lineTo(leftStart1.x, leftStart1.y)
      path.lineTo(leftStart3.x, leftStart3.y)
      path.lineTo(x1, y1)
      path.lineTo(rightStart3.x, rightStart3.y)
      path.lineTo(rightStart1.x, rightStart1.y)
      path.lineTo(rightX2,  rightY2)
    } else {
      path.moveTo(leftX2,  leftY2)
      path.lineTo(leftStart1.x, leftStart1.y)
      path.lineTo(leftStart3.x, leftStart3.y)
      path.lineTo(x1, y1)
      path.lineTo(rightStart3.x, rightStart3.y)
      path.lineTo(rightStart1.x, rightStart1.y)
      path.lineTo(rightX2,  rightY2)
    }
  }

  private updateOrthogonalPath() {
    const count = this._orthogonalPoints.length
    if(count < 3) {
      return
    }

    this.path.reset()
    this._connectorDoubleLinePath.reset()
    switch(this.connectorMode) {
      case ConnectorMode.DoubleAndStartArrow: {
        let startIndex = 1
        if((this._orthogonalPoints[0].x == this._orthogonalPoints[1].x && this._orthogonalPoints[0].x == this._orthogonalPoints[2].x) ||
            (this._orthogonalPoints[0].y == this._orthogonalPoints[1].y && this._orthogonalPoints[0].y == this._orthogonalPoints[2].y)) {
              startIndex = 2
        }
        const x1 = this._orthogonalPoints[0].x
        const y1 = this._orthogonalPoints[0].y
        const x2 = this._orthogonalPoints[startIndex].x
        const y2 = this._orthogonalPoints[startIndex].y
        this.populateDoubleLineArrowPath(this._connectorDoubleLinePath, x1, y1, x2, y2, true)
        let newPath: Path = this._connectorDoubleLinePath
        const paths = this.getTranslatedPaths(false, true, startIndex == 2)
        paths.forEach(path => {
          const result = newPath.op(path, PathOp.UNION)
          if(result) {
            newPath = result
          }
        })
        this._connectorDoubleLinePath =  newPath
        break;
      }
      case ConnectorMode.DoubleAndEndArrow: {
        let startIndex = 1
        if((this._orthogonalPoints[0].x == this._orthogonalPoints[1].x && this._orthogonalPoints[0].x == this._orthogonalPoints[2].x) ||
            (this._orthogonalPoints[0].y == this._orthogonalPoints[1].y && this._orthogonalPoints[0].y == this._orthogonalPoints[2].y)) {
              startIndex = 2
        }
        const x1 = this._orthogonalPoints[this._orthogonalPoints.length - 1].x
        const y1 = this._orthogonalPoints[this._orthogonalPoints.length - 1].y
        const x2 = this._orthogonalPoints[this._orthogonalPoints.length - 1 - startIndex].x
        const y2 = this._orthogonalPoints[this._orthogonalPoints.length - 1 - startIndex].y
        this.populateDoubleLineArrowPath(this._connectorDoubleLinePath, x1, y1, x2, y2, false)
        let newPath: Path = this._connectorDoubleLinePath
        const paths = this.getTranslatedPaths(true, false, startIndex == 2)
        paths.forEach(path => {
          const result = newPath.op(path, PathOp.UNION)
          if(result) {
            newPath = result
          }
        })
        this._connectorDoubleLinePath =  newPath

        break;
      }
      case ConnectorMode.DoubleAndBothArrows: {
        let startIndex = 1
        if((this._orthogonalPoints[0].x == this._orthogonalPoints[1].x && this._orthogonalPoints[0].x == this._orthogonalPoints[2].x) ||
            (this._orthogonalPoints[0].y == this._orthogonalPoints[1].y && this._orthogonalPoints[0].y == this._orthogonalPoints[2].y)) {
              startIndex = 2
        }
        const x1 = this._orthogonalPoints[0].x
        const y1 = this._orthogonalPoints[0].y
        const x2 = this._orthogonalPoints[startIndex].x
        const y2 = this._orthogonalPoints[startIndex].y
        const x3 = this._orthogonalPoints[this._orthogonalPoints.length - 1].x
        const y3 = this._orthogonalPoints[this._orthogonalPoints.length - 1].y
        const x4 = this._orthogonalPoints[this._orthogonalPoints.length - 1 - startIndex].x
        const y4 = this._orthogonalPoints[this._orthogonalPoints.length - 1 - startIndex].y
        const startPath = new Path()
        const endPath = new Path()
        this.populateDoubleLineArrowPath(startPath, x1, y1, x2, y2, true)
        this.populateDoubleLineArrowPath(endPath, x3, y3, x4, y4, false )
        let newPath: Path = this._connectorDoubleLinePath
        const startResult = newPath.op(startPath, PathOp.UNION)
        if(startResult) {
          newPath = startResult
        }
        const endResult = newPath.op(endPath, PathOp.UNION)
        if(endResult) {
          newPath =  endResult
        }
        const paths = this.getTranslatedPaths(false, false, startIndex == 2)
        paths.forEach(path => {
          const result = newPath.op(path, PathOp.UNION)
          if(result) {
            newPath = result
          }
        })
        this._connectorDoubleLinePath =  newPath
        break;
      }
      case ConnectorMode.Double:
      case ConnectorMode.Single:
      default: {
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
        break;
      }    
    }
    //if(count == 2) {
    //  SystemUtils.debugPoints(this._orthogonalPoints)
    //}
  }

  private getStraightNearstDistance(x: number, y: number) {
    const start = new Point2(this.start.x - this.left, this.start.y - this.top)
    const end = new Point2(this.end.x - this.left, this.end.y - this.top)
    const distance = Line.pointDistance(start.x, start.y, end.x, end.y, x, y)
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
