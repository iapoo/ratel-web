import { Colors, Line2D, MathUtils, Point2, Rectangle, Rectangle2D, } from '@/components/Engine'
import { ConnectorArrowDisplayMode, ConnectorArrowDisplayType, ConnectorMode, ConnectorShape, ConnectorType, } from '../../Shapes'
import { Entity, } from './Entity'
import { Categories, Item, Type, } from './Item'
import { EditorItem } from './EditorItem'
import { EditorItemInfo } from './EditorItemInfo'
import { Editor } from '../../Editor'
import { ConnectorInfo } from './ConnectorInfo'

export interface ConnectorArrowType {
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

export const ConnectorArrowTypes = [
  {name: 'None', description: 'None', type: ConnectorArrowDisplayType.None, height: 6, width: 6, modifier: 2, count: 1, outline: false, displayMode:  ConnectorArrowDisplayMode.Full, },
  {name: 'Triangle-1', description: 'Triangle', type: ConnectorArrowDisplayType.Triangle, height: 6, width: 6, modifier: 2, count: 1, outline: false, displayMode: ConnectorArrowDisplayMode.Full, },
  {name: 'Triangle-2', description: 'Triangle', type: ConnectorArrowDisplayType.Triangle, height: 6, width: 6, modifier: 2, count: 1, outline: false, displayMode: ConnectorArrowDisplayMode.Top, },
  {name: 'Triangle-3', description: 'Triangle', type: ConnectorArrowDisplayType.Triangle, height: 6, width: 6, modifier: 2, count: 1, outline: false, displayMode: ConnectorArrowDisplayMode.Bottom, },
  {name: 'Triangle-4', description: 'Triangle', type: ConnectorArrowDisplayType.Triangle, height: 6, width: 6, modifier: 2, count: 1, outline: true, displayMode: ConnectorArrowDisplayMode.Full, },
  {name: 'Triangle-5', description: 'Triangle', type: ConnectorArrowDisplayType.Triangle, height: 6, width: 6, modifier: 2, count: 1, outline: true, displayMode: ConnectorArrowDisplayMode.Top, },
  {name: 'Triangle-6', description: 'Triangle', type: ConnectorArrowDisplayType.Triangle, height: 6, width: 6, modifier: 2, count: 1, outline: true, displayMode: ConnectorArrowDisplayMode.Bottom, },
  {name: 'Triangle-7', description: 'Triangle', type: ConnectorArrowDisplayType.Triangle, height: 6, width: 6, modifier: 2, count: 2, outline: false, displayMode: ConnectorArrowDisplayMode.Full, },
  {name: 'Triangle-8', description: 'Triangle', type: ConnectorArrowDisplayType.Triangle, height: 6, width: 6, modifier: 2, count: 2, outline: true, displayMode: ConnectorArrowDisplayMode.Full, },

  {name: 'Diamond-1', description: 'Diamond', type: ConnectorArrowDisplayType.Diamond, height: 6, width: 6, modifier: 2, count: 1, outline: false, displayMode: ConnectorArrowDisplayMode.Full, },
  {name: 'Diamond-2', description: 'Diamond', type: ConnectorArrowDisplayType.Diamond, height: 6, width: 6, modifier: 2, count: 1, outline: false, displayMode: ConnectorArrowDisplayMode.Top, },
  {name: 'Diamond-3', description: 'Diamond', type: ConnectorArrowDisplayType.Diamond, height: 6, width: 6, modifier: 2, count: 1, outline: false, displayMode: ConnectorArrowDisplayMode.Bottom, },
  {name: 'Diamond-4', description: 'Diamond', type: ConnectorArrowDisplayType.Diamond, height: 6, width: 6, modifier: 2, count: 1, outline: true, displayMode: ConnectorArrowDisplayMode.Full, },
  {name: 'Diamond-5', description: 'Diamond', type: ConnectorArrowDisplayType.Diamond, height: 6, width: 6, modifier: 2, count: 1, outline: true, displayMode: ConnectorArrowDisplayMode.Top, },
  {name: 'Diamond-6', description: 'Diamond', type: ConnectorArrowDisplayType.Diamond, height: 6, width: 6, modifier: 2, count: 1, outline: true, displayMode: ConnectorArrowDisplayMode.Bottom, },
  {name: 'Diamond-7', description: 'Diamond', type: ConnectorArrowDisplayType.Diamond, height: 6, width: 6, modifier: 2, count: 2, outline: false, displayMode: ConnectorArrowDisplayMode.Full, },
  {name: 'Diamond-8', description: 'Diamond', type: ConnectorArrowDisplayType.Diamond, height: 6, width: 6, modifier: 2, count: 2, outline: true, displayMode: ConnectorArrowDisplayMode.Full, },

  {name: 'Ellipse-1', description: 'Ellipse', type: ConnectorArrowDisplayType.Ellipse, height: 6, width: 6, modifier: 2, count: 1, outline: false, displayMode: ConnectorArrowDisplayMode.Full, },
  {name: 'Ellipse-2', description: 'Ellipse', type: ConnectorArrowDisplayType.Ellipse, height: 6, width: 6, modifier: 2, count: 1, outline: false, displayMode: ConnectorArrowDisplayMode.Top, },
  {name: 'Ellipse-3', description: 'Ellipse', type: ConnectorArrowDisplayType.Ellipse, height: 6, width: 6, modifier: 2, count: 1, outline: false, displayMode: ConnectorArrowDisplayMode.Bottom, },
  {name: 'Ellipse-4', description: 'Ellipse', type: ConnectorArrowDisplayType.Ellipse, height: 6, width: 6, modifier: 2, count: 1, outline: true, displayMode: ConnectorArrowDisplayMode.Full, },
  {name: 'Ellipse-5', description: 'Ellipse', type: ConnectorArrowDisplayType.Ellipse, height: 6, width: 6, modifier: 2, count: 1, outline: true, displayMode: ConnectorArrowDisplayMode.Top, },
  {name: 'Ellipse-6', description: 'Ellipse', type: ConnectorArrowDisplayType.Ellipse, height: 6, width: 6, modifier: 2, count: 1, outline: true, displayMode: ConnectorArrowDisplayMode.Bottom, },
  {name: 'Ellipse-7', description: 'Ellipse', type: ConnectorArrowDisplayType.Ellipse, height: 6, width: 6, modifier: 2, count: 2, outline: false, displayMode: ConnectorArrowDisplayMode.Full, },
  {name: 'Ellipse-8', description: 'Ellipse', type: ConnectorArrowDisplayType.Ellipse, height: 6, width: 6, modifier: 2, count: 2, outline: true, displayMode: ConnectorArrowDisplayMode.Full, },

  {name: 'Other-(', description: '(', type: ConnectorArrowDisplayType.LeftParenthesis, height: 6, width: 6, modifier: 2, count: 1, outline: true, displayMode: ConnectorArrowDisplayMode.Full, },
  {name: 'Other-)', description: ')', type: ConnectorArrowDisplayType.RightParenthesis, height: 6, width: 6, modifier: 2, count: 1, outline: true, displayMode: ConnectorArrowDisplayMode.Full, },
  {name: 'Other-X', description: 'X', type: ConnectorArrowDisplayType.CrossLine, height: 6, width: 6, modifier: 2, count: 1, outline: true, displayMode: ConnectorArrowDisplayMode.Full, },
  {name: 'Other-/', description: '/', type: ConnectorArrowDisplayType.ForewardSlash, height: 6, width: 6, modifier: 2, count: 1, outline: true, displayMode: ConnectorArrowDisplayMode.Full, },
  {name: 'Other-\\', description: '\\', type: ConnectorArrowDisplayType.Backslashe, height: 6, width: 6, modifier: 2, count: 1, outline: true, displayMode: ConnectorArrowDisplayMode.Full, },
  {name: 'Other-|', description: '|', type: ConnectorArrowDisplayType.VerticalLine, height: 6, width: 6, modifier: 2, count: 1, outline: true, displayMode: ConnectorArrowDisplayMode.Full, },
  {name: 'Other-<', description: '<', type: ConnectorArrowDisplayType.LeftAngleBracket, height: 6, width: 6, modifier: 2, count: 1, outline: true, displayMode: ConnectorArrowDisplayMode.Full, },
  {name: 'Other-|<', description: '|<', type: ConnectorArrowDisplayType.VerticaleLineAndLeftAngleBacket, height: 6, width: 6, modifier: 2, count: 1, outline: true, displayMode: ConnectorArrowDisplayMode.Full, },
  {name: 'Other-o|', description: 'o|', type: ConnectorArrowDisplayType.CircleAndVerticalLine, height: 6, width: 6, modifier: 2, count: 1, outline: true, displayMode: ConnectorArrowDisplayMode.Full, },
  {name: 'Other-o<', description: 'o<', type: ConnectorArrowDisplayType.CircleAndLeftBacket, height: 6, width: 6, modifier: 2, count: 1, outline: true, displayMode: ConnectorArrowDisplayMode.Full, },

]

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
  private _startArrow: ConnectorArrowType
  private _endArrow: ConnectorArrowType
  private _connectorMode: ConnectorMode
  private _doubleLineStrokeWidth: number
  private _curveStartModifier: Point2
  private _curveEndModifier: Point2
  private _crossLines: number[]

  public constructor (start: Point2, end: Point2) {
    super(Math.min(start.x, end.x), Math.min(start.y, end.y), Math.abs(start.x - end.x), Math.abs(start.y - end.y))
    this._start = start
    this._end = end
    this._shape = new ConnectorShape(start.x, start.y, end.x, end.y)
    this._connectorShape = this._shape as ConnectorShape
    this.type = Connector.CONNECTOR_TYPE_CONNECTOR
    this._connectorType = ConnectorType.Curve
    this._startArrow = ConnectorArrowTypes[0]
    this._endArrow = ConnectorArrowTypes[0]
    this._connectorMode = ConnectorMode.Single
    this._doubleLineStrokeWidth = 1
    this._curveStartModifier = new Point2(0.4, 0)
    this._curveEndModifier = new Point2(-0.4, 0)
    this._crossLines = []
  }

  public get source (): Entity | undefined {
    return this._source
  }

  public set source (value: Entity | undefined) {
    this._source = value
  }

  public get startArrow() {
    return this._startArrow
  }

  public set startArrow(value: ConnectorArrowType) {
    this._startArrow = value
    this.updateTheme()
  }

  public get endArrow() {
    return this._endArrow
  }

  public set endArrow(value: ConnectorArrowType) {
    this._endArrow = value
    this.updateTheme()
  }

  public get connectorMode() {
    return this._connectorMode
  }

  public set connectorMode(value: ConnectorMode) {
    this._connectorMode = value
    this.updateTheme()
  }

  public get doubleLineStrokeWidth() {
    return this._doubleLineStrokeWidth
  }

  public set doubleLineStrokeWidth(value: number) {
    this._doubleLineStrokeWidth = value
    this.updateTheme()
  }

  public get curveStartModifier() {
    return this._curveStartModifier
  }

  public set curveStartModifier(value: Point2) {
    this._curveStartModifier = value
    this._connectorShape.curveStartModifier = value
    this.updateTheme()
  }

  public get curveEndModifier() {
    return this._curveEndModifier
  }

  public set curveEndModifier(value: Point2) {
    this._curveEndModifier = value
    this._connectorShape.curveEndModifier = value
    this.updateTheme()
  }
  
  public get crossLines() {
    return this._crossLines
  }

  public set crossLines(value: number[]) {
    this._crossLines = value
    this.updateTheme
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
      this._connectorShape.end = this._end
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

  protected save(): EditorItemInfo {
    return new ConnectorInfo()
  }

  protected load(data: EditorItemInfo, editor: Editor): void {

  }

  // public  clone(): EditorItem {
  //   let connector = new Connector(this.start, this.end)
  //   return connector;
  // }

}
