import { Point2, Rectangle, } from '@/components/Engine'
import { ConnectorShape, } from '../../Shapes'
import { Entity, } from './Entity'
import { Categories, Type, } from './Item'
import { EditorItem } from '../../Editor'

export enum LineType {
  LEFT_TOP,
  RIGHT_TOP,
  LEFT_BOTTOM,
  RIGHT_BOTTOM
}

export class LineEntity extends Entity {
  public static LINE_TYPE_LINE = 'Line'
  public static LINE_DESC_LINE = 'Line'
  private _start: Point2 = new Point2();
  private _end: Point2 = new Point2();
  private _lineType: LineType
  private _connectorShape: ConnectorShape

  public constructor (start: Point2, end: Point2) {
    super(Math.min(start.x, end.x), Math.min(start.y, end.y), Math.abs(start.x - end.x), Math.abs(start.y - end.y))
    this._connectorShape = new ConnectorShape(start.x, start.y, end.x, end.y)
    this._shape = this._connectorShape
    this._start = start
    this._end = end
    this._lineType = LineType.LEFT_TOP
    this.type = LineEntity.LINE_TYPE_LINE
    this.updateLineType()
  }

  public get lineType (): LineType {
    return this._lineType
  }

  public get start (): Point2 {
    return this._start
  }

  public set start (value: Point2) {
    // console.log(`LineEntity.start-> start.x = ${value.x} start.y = ${value.y} boundary.left = ${this.boundary.left} boundary.top = ${this.boundary.top}`)
    this._start = value
    this.updateLineType()
    this.updateBoundary()
  }

  public get end (): Point2 {
    return this._end
  }

  public set end (value: Point2) {
    this._end = value
    this.updateLineType()
    this.updateBoundary()
  }

  public set boundary (value: Rectangle) {
    super.boundary = value
    switch (this._lineType) {
    case LineType.LEFT_TOP:
      this._connectorShape.start = new Point2(value.left, value.top)
      this._connectorShape.end = new Point2(value.right, value.bottom)
      break
    case LineType.LEFT_BOTTOM:
      this._connectorShape.start = new Point2(value.left, value.bottom)
      this._connectorShape.end = new Point2(value.right, value.top)
      break
    case LineType.RIGHT_TOP:
      this._connectorShape.start = new Point2(value.right, value.top)
      this._connectorShape.end = new Point2(value.left, value.bottom)
      break
    case LineType.RIGHT_BOTTOM:
      this._connectorShape.start = new Point2(value.right, value.bottom)
      this._connectorShape.end = new Point2(value.left, value.top)
      break
    }
    this._start = this._connectorShape.start
    this._end = this._connectorShape.end
  }

  public get boundary () {
    return super.boundary
  }

  public get types (): Type[] {
    return [ { name: LineEntity.LINE_TYPE_LINE, description: LineEntity.LINE_DESC_LINE, }, ]
  }

  public get category (): string {
    return Categories.LINE
  }

  public clone(): EditorItem {
    let lineEntity = new LineEntity(this.start, this.end)
    return lineEntity
  }
  
  protected save (data: any) {}

  protected load (data: any) {}

  private updateLineType () {
    if (this._start.x <= this._end.x) {
      if (this._start.y <= this._end.y) {
        this._lineType = LineType.LEFT_TOP
      } else {
        this._lineType = LineType.LEFT_BOTTOM
      }
    } else if (this._start.x > this._end.x) {
      if (this._start.y <= this._end.y) {
        this._lineType = LineType.RIGHT_TOP
      } else {
        this._lineType = LineType.RIGHT_BOTTOM
      }
    }
  }

  private updateBoundary () {
    const boundary = Rectangle.makeLTWH(Math.min(this._start.x, this._end.x), Math.min(this._start.y, this._end.y), Math.abs(this._start.x - this._end.x), Math.abs(this._start.y - this._end.y))
    this._connectorShape.start = this._start
    this._connectorShape.end = this._end
    super.boundary = boundary
    // console.log(`LineEntity.updateBoundary-> start.x = ${this._start.x} start.y = ${this._start.y} boundary.left = ${this.boundary.left} boundary.top = ${this.boundary.top}`)
  }
}
