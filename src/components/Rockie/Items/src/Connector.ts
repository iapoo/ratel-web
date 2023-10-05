import { Colors, Line2D, MathUtils, Point2, Rectangle, Rectangle2D, } from '@/components/Engine'
import { ConnectorShape, } from '../../Shapes'
import { Entity, } from './Entity'
import { Categories, Item, Type, } from './Item'
import { EditorItem } from '../../Editor'

export enum ConnectorType {
  Line,
  Curve,
  CrossLine,
}

export class Connector extends Item {
  public static CONNECTOR_TYPE_CONNECTOR = 'Connector'
  public static CONNECTOR_DESC_CONNECTOR = 'Connector'
  private _source?: Entity;
  private _target?: Entity;
  private _sourceJoint?: Point2;
  private _targetJoint?: Point2;
  private _connectorType?: ConnectorType;
  private _start: Point2;
  private _end: Point2
  private _connectorShape: ConnectorShape

  public constructor (start: Point2, end: Point2) {
    super(Math.min(start.x, end.x), Math.min(start.y, end.y), Math.abs(start.x - end.x), Math.abs(start.y - end.y))
    this._start = start
    this._end = end
    this._shape = new ConnectorShape(start.x, start.y, end.x, end.y)
    this._connectorShape = this._shape as ConnectorShape
    this.type = Connector.CONNECTOR_TYPE_CONNECTOR
  }

  public get source (): Entity | undefined {
    return this._source
  }

  public set source (value: Entity | undefined) {
    this._source = value
  }

  public get start (): Point2 {
    return this._start
  }

  public set start (value: Point2) {
    this._start = value
    this._connectorShape.start = value
    this.boundary = Rectangle.makeLTWH(Math.min(this._start.x, this._end.x), Math.min(this._start.y, this._end.y), Math.abs(this._start.x - this._end.x), Math.abs(this._start.y - this._end.y))
  }

  public get end (): Point2 {
    return this._end
  }

  public set end (value: Point2) {
    this._end = value
    this._connectorShape.end = value
    this.boundary = Rectangle.makeLTWH(Math.min(this._start.x, this._end.x), Math.min(this._start.y, this._end.y), Math.abs(this._start.x - this._end.x), Math.abs(this._start.y - this._end.y))
  }

  public get target (): Entity | undefined {
    return this._target
  }

  public set target (value: Entity | undefined) {
    this._target = value
  }

  public get sourceJoint (): Point2 | undefined {
    return this._sourceJoint
  }

  public set sourceJoint (value: Point2 | undefined) {
    this._sourceJoint = value
    if (value && this._source && this._sourceJoint) {
      this._start = this._source.shape.worldTransform.makePoint(value)
      this.boundary = Rectangle.makeLTWH(Math.min(this._start.x, this._end.x), Math.min(this._start.y, this._end.y), Math.abs(this._start.x - this._end.x), Math.abs(this._start.y - this._end.y))
    }
  }

  // eslint-disable-next-line accessor-pairs
  // public set boundary (value: Rectangle) {
  //  super.boundary = value
  //  this.markDirty()
  // }
  // public updateSourceJoint () {
  // console.log(this._source)
  //  if (this._source && this._sourceJoint) {
  //    console.log(`sourceJoint = ${this._sourceJoint.x}    ${this._sourceJoint.y}    `)
  //    this._start = this._source.shape.worldTransform.makePoint(this._sourceJoint)
  //    console.log(`start = ${this._start.x}    ${this._start.y}    ${this._end.x}    ${this._end.y}    `)

  //      this.boundary = Rectangle.makeLTWH(Math.min(this._start.x, this._end.x), Math.min(this._start.y, this._end.y), Math.abs(this._start.x - this._end.x), Math.abs(this._start.y - this._end.y))
  //    }
  //   this.markDirty()
  // }

  public get targetJoint (): Point2 | undefined {
    return this._targetJoint
  }

  public set targetJoint (value: Point2 | undefined) {
    this._targetJoint = value
    if (value && this._target && this._targetJoint) {
      this._end = this._target.shape.worldTransform.makePoint(value)
      this.boundary = Rectangle.makeLTWH(Math.min(this._start.x, this._end.x), Math.min(this._start.y, this._end.y), Math.abs(this._start.x - this._end.x), Math.abs(this._start.y - this._end.y))
    }
  }

  // public updateTargetJoint () {
  //  if (this._target && this._targetJoint) {
  //    this._end = this._target.shape.worldTransform.makePoint(this._targetJoint)
  //    this.boundary = Rectangle.makeLTWH(Math.min(this._start.x, this._end.x), Math.min(this._start.y, this._end.y), Math.abs(this._start.x - this._end.x), Math.abs(this._start.y - this._end.y))
  //  }
  //  this.markDirty()
  // }

  public get connectorType (): ConnectorType | undefined {
    return this._connectorType
  }

  public set connectorType (value: ConnectorType | undefined) {
    this._connectorType = value
  }

  public get types (): Type[] {
    return [ { name: Connector.CONNECTOR_TYPE_CONNECTOR, description: Connector.CONNECTOR_DESC_CONNECTOR, }, ]
  }

  public get category (): string {
    return Categories.CONNECTOR
  }

  protected save (data: any) {}

  protected load (data: any) {}

  public  clone(): EditorItem {
    let connector = new Connector(this.start, this.end)
    return connector;
  }

}
