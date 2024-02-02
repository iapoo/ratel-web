/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */

import { FillType, Graphics, Paint, PaintStyle, Path, Point2, Rectangle, Rotation, Shape, } from '@/components/Engine'
import { Line, Cubic, } from '@antv/g-math'
import { EntityShape, } from './EntityShape'
import { SystemUtils } from '@/components/Workspace/Utils'
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

  public render (graphics: Graphics): void {
    super.render(graphics)
    if(this._startArrow.type != ConnectorArrowDisplayType.None || true) {
      if(this._startArrow.close) {
        if(this._startArrow.outline) {
          graphics.drawPath(this._startArrowPath, this._arrowFill)
        } else {
          graphics.drawPath(this._startArrowPath, this._arrowStroke)
        }
      }
      graphics.drawPath(this._startArrowPath, this.stroke)
    }
    if(this._endArrow.type != ConnectorArrowDisplayType.None || true) {
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
