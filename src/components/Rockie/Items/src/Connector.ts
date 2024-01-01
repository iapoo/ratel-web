import { Colors, Line2D, MathUtils, Point2, Rectangle, Rectangle2D, } from '@/components/Engine'
import { ConnectorArrowDisplayMode, ConnectorArrowDisplayType, ConnectorDirection, ConnectorMode, ConnectorShape, ConnectorType, } from '../../Shapes'
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

export enum TargetPosition {
  None,
  Left,
  Top,
  Right,
  Bottom,
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
  {name: 'Other-X', description: 'X', type: ConnectorArrowDisplayType.Orthogonal, height: 6, width: 6, modifier: 2, count: 1, outline: true, displayMode: ConnectorArrowDisplayMode.Full, },
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
  public static DEFAULT_ARROW_SEGMENT = 20
  public static DEFAULT_ARROW_MARGIN = 10
  private _source?: Entity;
  private _target?: Entity;
  private _sourceJoint?: Point2;
  private _targetJoint?: Point2;
  private _connectorType: ConnectorType;
  private _start: Point2;
  private _end: Point2
  private _connectorShape: ConnectorShape
  private _startArrow: ConnectorArrowType
  private _endArrow: ConnectorArrowType
  private _connectorMode: ConnectorMode
  private _doubleLineStrokeWidth: number
  //Percent value
  private _curveStartModifier: Point2
  //Percent value
  private _curveEndModifier: Point2
  //Percent values with x, y. At least 1 segments, additional 2 segments are first and last and  invisible for arrows and can't be modified.
  private _orthogonals: number[]
  private _horizontal: boolean
  private _startDirection: ConnectorDirection
  private _endDirection: ConnectorDirection
  private _orthogonalPoints: Point2[]

  public constructor (start: Point2, end: Point2, horizontal: boolean = true,
    startDirection: ConnectorDirection = ConnectorDirection.Right, endDirection: ConnectorDirection = ConnectorDirection.Left) {
    super(Math.min(start.x, end.x), Math.min(start.y, end.y), Math.abs(start.x - end.x), Math.abs(start.y - end.y))
    this._start = start
    this._end = end
    this._orthogonalPoints = this.initializeOrthogonalPoints()
    this._shape = new ConnectorShape(start.x, start.y, end.x, end.y, horizontal, startDirection, endDirection, this._orthogonalPoints)
    this._connectorShape = this._shape as ConnectorShape
    this.type = Connector.CONNECTOR_TYPE_CONNECTOR
    this._connectorType = ConnectorType.Orthogonal
    this._startArrow = ConnectorArrowTypes[0]
    this._endArrow = ConnectorArrowTypes[0]
    this._connectorMode = ConnectorMode.Single
    this._doubleLineStrokeWidth = 1
    this._curveStartModifier = new Point2(0.4, 0)
    this._curveEndModifier = new Point2(-0.4, 0)
    this._horizontal = horizontal
    if(this._horizontal) {
      this._orthogonals = [0.5, 0, 0.5, 1]
    } else {
      this._orthogonals = [0, 0.5, 1, 0.5]
    }
    this._startDirection = startDirection
    this._endDirection = endDirection
    this._connectorShape.orthogonalPoints = this._orthogonalPoints
  }

  public get source (): Entity | undefined {
    return this._source
  }

  public set source (value: Entity | undefined) {
    this._source = value
  }

  public get horizontal() {
    return this._horizontal
  }

  public set horizontal(value: boolean) {
    this._horizontal = value
    this._connectorShape.horizontal = value
    if(this._horizontal) {
      this._orthogonals = [0.5, 0, 0.5, 1]
    } else {
      this._orthogonals = [0, 0.5, 1, 0.5]
    }
    this.updateTheme()
  }

  public set startDirection(value: ConnectorDirection) {
    this._startDirection = value
    this._connectorShape.startDirection = value
    this.updateTheme()
  }

  public get endDirection() {
    return this._endDirection
  }
 
  public set endDirection(value: ConnectorDirection) {
    this._endDirection = value
    this._connectorShape.endDirection = value
    this.updateTheme()
  }

  public get startDirection() {
    return this._startDirection
  }

  public get connectorShape() {
    return this._connectorShape
  }

  public get crossPoints() {
    return this._connectorShape.crossPoints
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
  
  public get orthogonals() {
    return this._orthogonals
  }

  public set orthogonals(value: number[]) {
    this._orthogonals = value
    this._connectorShape.orthogonals = value
    this.updateTheme()
  }

  public get start (): Point2 {
    return this._start
  }

  public set start (value: Point2) {
    this._start = value
    this._connectorShape.start = value
    this._orthogonalPoints = this.initializeOrthogonalPoints()
    this._connectorShape.orthogonalPoints = this._orthogonalPoints    
    this.boundary = Rectangle.makeLTWH(Math.min(this._start.x, this._end.x), Math.min(this._start.y, this._end.y), Math.abs(this._start.x - this._end.x), Math.abs(this._start.y - this._end.y))
  }

  public get end (): Point2 {
    return this._end
  }

  public set end (value: Point2) {
    this._end = value
    this._connectorShape.end = value
    this._orthogonalPoints = this.initializeOrthogonalPoints()
    this._connectorShape.orthogonalPoints = this._orthogonalPoints    
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
      this._orthogonalPoints = this.initializeOrthogonalPoints()
      this._connectorShape.orthogonalPoints = this._orthogonalPoints
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

  public get connectorType (): ConnectorType {
    return this._connectorType
  }

  public set connectorType (value: ConnectorType) {
    this._connectorType = value
    this._connectorShape.connectorType = value
    this.updateTheme()
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
  private initializeOrthogonalPoints(): Point2[] {   
    const start = new Point2(this.start.x - this.left, this.start.y - this.top)
    const end = new Point2(this.end.x - this.left, this.end.y - this.top)
    const left = this._source ? this._source.left: 0
    const top = this._source ? this._source.top : 0
    const width = this._source ? this._source.width: 0
    const height = this._source ? this._source.height : 0
    const minTop = (this._sourceJoint && this._targetJoint) ?  Math.min(start.y - this._sourceJoint.y, end.y - this._targetJoint.y) - Connector.DEFAULT_ARROW_SEGMENT - Connector.DEFAULT_ARROW_MARGIN : 0
    const minLeft = (this._source && this._target) ?  Math.min(this._source.left - this.left, this._target.left - this.left) + Connector.DEFAULT_ARROW_SEGMENT + Connector.DEFAULT_ARROW_MARGIN : 0
    const minBottom = (this._source && this._target && this._sourceJoint && this._targetJoint) ?  Math.max(start.y + this._source.height - this._sourceJoint.y, end.y + this._target.height -  this._targetJoint.y) + Connector.DEFAULT_ARROW_SEGMENT + Connector.DEFAULT_ARROW_MARGIN : 0
    const minRight = (this._source && this._target) ?  Math.min(this._source.right - this.left, this._target.right - this.left) + Connector.DEFAULT_ARROW_SEGMENT + Connector.DEFAULT_ARROW_MARGIN : 0
    const centerX = (end.x + start.x) * 0.5
    const centerY = (end.y + start.y) * 0.5
    const targetPosition = this.findTargetPosition()
    const points: Point2[] = []
    points.push(new Point2(start.x, start.y))
    //console.log(`${this.startDirection}`)
    switch(this.startDirection) {
      case ConnectorDirection.Left: {
        this.initializeOrthogonalPointsLeft(targetPosition, points, start, end, minLeft, minTop, minBottom, minRight, centerX, centerY)
        break
      }
      case ConnectorDirection.Top:{
        this.initializeOrthogonalPointsTop(targetPosition, points, start, end, minLeft, minTop, minBottom, minRight, centerX, centerY)
        break
      }
      case ConnectorDirection.Bottom:{
        this.initializeOrthogonalPointsBottom(targetPosition, points, start, end, minLeft, minTop, minBottom, minRight, centerX, centerY)
        break
      }
      case ConnectorDirection.Right:
      default:{
        this.initializeOrthogonalPointsRight(targetPosition, points, start, end, minLeft, minTop, minBottom, minRight, centerX, centerY)
        break
      }
    } 
    points.push(new Point2(end.x, end.y))
    return points
  }

  private findTargetPosition(): TargetPosition {
    let result = TargetPosition.None
    if(this._target && this._source) {
      if(this._target.left + this._target.width < this._source.left) {
        result = TargetPosition.Left
      } else if(this._target.top + this._target.height < this._source.top) {
        result = TargetPosition.Top
      } else if(this._source.left + this._source.width < this._target.left) {
        result = TargetPosition.Right
      } else if(this._source.top + this._source.height < this._target.top) {
        result = TargetPosition.Bottom
      }
    } 
    return result
  }

  private initializeOrthogonalPointsLeft(targetPosition: TargetPosition,points: Point2[], start: Point2, end: Point2, minLeft: number, minTop: number, minBottom: number, minRight: number, centerX: number, centerY: number ) {
    switch(targetPosition) {
      case TargetPosition.Left: {
        switch(this.endDirection) {
          case ConnectorDirection.Left: {
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))                
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT - Connector.DEFAULT_ARROW_MARGIN, start.y))                
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT - Connector.DEFAULT_ARROW_MARGIN, minTop))
            points.push(new Point2(minLeft, minTop))
            points.push(new Point2(minLeft, end.y - Connector.DEFAULT_ARROW_SEGMENT - Connector.DEFAULT_ARROW_MARGIN))
            points.push(new Point2(minLeft, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            break
          }
          case ConnectorDirection.Top:{
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))                
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT - Connector.DEFAULT_ARROW_MARGIN, start.y))                
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT - Connector.DEFAULT_ARROW_MARGIN, minTop))
            points.push(new Point2(end.x, minTop))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT - Connector.DEFAULT_ARROW_MARGIN, minTop))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, minTop))
            break
          }
          case ConnectorDirection.Bottom:{
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))                
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT - Connector.DEFAULT_ARROW_MARGIN, start.y))                
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT - Connector.DEFAULT_ARROW_MARGIN, minBottom))
            points.push(new Point2(end.x, minBottom))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT - Connector.DEFAULT_ARROW_MARGIN, minBottom))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, minBottom))
            break
          }
          case ConnectorDirection.Right:
          default:{
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))                
            points.push(new Point2(centerX, start.y))
            points.push(new Point2(centerX, end.y))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            break
          }
        }    
        break
      }
      case TargetPosition.Top: {
        break
      }
      case TargetPosition.Right: {
        break
      }
      case TargetPosition.Bottom: {
        break
      }
      case TargetPosition.None:
      default: {
          break
      }
    }
  }

  private initializeOrthogonalPointsTop(targetPosition: TargetPosition,points: Point2[], start: Point2, end: Point2, minLeft: number, minTop: number, minBottom: number, minRight: number, centerX: number, centerY: number ) {

  }

  private initializeOrthogonalPointsRight(targetPosition: TargetPosition,points: Point2[], start: Point2, end: Point2, minLeft: number, minTop: number, minBottom: number, minRight: number, centerX: number, centerY: number ) {
    //console.log(`target direction = ${targetPosition}`)
    //console.log(`end direction = ${this.endDirection}`)
    switch(targetPosition) {
      case TargetPosition.Left: {
        switch(this.endDirection) {
          case ConnectorDirection.Left: {
            const endBottom = end.y + (this._target!.height - this._targetJoint!.y)
            const startTop = start.y - this._sourceJoint!.y
            const endTop = end.y - this._targetJoint!.y
            const startBottom = start.y + (this._source!.height - this._sourceJoint!.y)
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))                
            if(endBottom < startTop){
              const middleTop = (endBottom + startTop) / 2
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, middleTop))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, middleTop))
            } else if (startBottom < endTop){
              const middleTop = (startBottom + endTop) / 2
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, middleTop))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, middleTop))
            } else {
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, minTop))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, minTop))
            }
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            break
          }
          case ConnectorDirection.Top:{
            const endTop = end.y - this._targetJoint!.y
            const startBottom = start.y + (this._source!.height - this._sourceJoint!.y)
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))                
            if(startBottom < endTop) {
              const middleTop = (startBottom + endTop) / 2
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, middleTop))
              points.push(new Point2(end.x, middleTop))
              points.push(new Point2(end.x, end.y)) //Additional point here for Segment
            } else {
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, minTop))
              points.push(new Point2(end.x, minTop))
              points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT - Connector.DEFAULT_ARROW_MARGIN))
              points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            }
            break
          }
          case ConnectorDirection.Bottom:{
            const endBottom = end.y + (this._target!.height - this._targetJoint!.y)
            const startTop = start.y - this._sourceJoint!.y
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))                
            if(endBottom < startTop) {              
              const middleTop = (endBottom + startTop) / 2
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, middleTop))
              points.push(new Point2(end.x, middleTop))
              points.push(new Point2(end.x, end.y)) //Additional point here for Segment
            } else {
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, minBottom))
              points.push(new Point2(end.x, minBottom))
              points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT + Connector.DEFAULT_ARROW_MARGIN))
              points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            }
            break
          }
          case ConnectorDirection.Right:
          default:{
            const startTop = start.y - this._sourceJoint!.y
            const startBottom = start.y + (this._source!.height - this._sourceJoint!.y)
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))    
            if(end.y < startTop) {
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            } else if(end.y > startBottom) {
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            } else {
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, minBottom))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, minBottom))

            }
            points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            break
          }
        }    
        break
      }
      case TargetPosition.Top: {
        switch(this.endDirection) {
          case ConnectorDirection.Left: {
            const endBottom = end.y + (this._target!.height - this._targetJoint!.y)
            const startTop = start.y - this._sourceJoint!.y
            const middleTop = (endBottom + startTop) / 2
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))                
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, middleTop))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, middleTop))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            break
          }
          case ConnectorDirection.Top:{
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))                
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, minTop))
            points.push(new Point2(end.x, minTop))
            points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT - Connector.DEFAULT_ARROW_MARGIN))
            points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            break
          }
          case ConnectorDirection.Bottom:{
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))                
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, minBottom))
            points.push(new Point2(end.x, minBottom))
            points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT + Connector.DEFAULT_ARROW_MARGIN))
            points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            break
          }
          case ConnectorDirection.Right:
          default:{
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))                
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT + Connector.DEFAULT_ARROW_MARGIN, start.y))                
            if(end.y < start.y + this._source!.height - this._sourceJoint!.y + Connector.DEFAULT_ARROW_SEGMENT + Connector.DEFAULT_ARROW_MARGIN) {
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT + Connector.DEFAULT_ARROW_MARGIN, start.y + this._source!.height - this._sourceJoint!.y + Connector.DEFAULT_ARROW_SEGMENT + Connector.DEFAULT_ARROW_MARGIN))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, start.y + this._source!.height - this._sourceJoint!.y + Connector.DEFAULT_ARROW_SEGMENT + Connector.DEFAULT_ARROW_MARGIN))
            } else {
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT + Connector.DEFAULT_ARROW_MARGIN, end.y))
            }
            points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            points.push(new Point2(end.x, end.y))
            break
          }
        }            
        break
      }
      case TargetPosition.Right: {
        switch(this.endDirection) {
          case ConnectorDirection.Left: {
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))                
            points.push(new Point2(centerX, start.y))
            points.push(new Point2(centerX, end.y))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            break
          }
          case ConnectorDirection.Top:{
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))                
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT + Connector.DEFAULT_ARROW_MARGIN, start.y))                
            if(start.y > end.y - Connector.DEFAULT_ARROW_SEGMENT - Connector.DEFAULT_ARROW_MARGIN) {
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT + Connector.DEFAULT_ARROW_MARGIN, end.y - Connector.DEFAULT_ARROW_SEGMENT - Connector.DEFAULT_ARROW_MARGIN))
            } else {
              points.push(new Point2(end.x , start.y))
            }
            points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT - Connector.DEFAULT_ARROW_MARGIN))
            points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            break
          }
          case ConnectorDirection.Bottom:{
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))                
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT + Connector.DEFAULT_ARROW_MARGIN, start.y))
            if(start.y < end.y + Connector.DEFAULT_ARROW_SEGMENT + Connector.DEFAULT_ARROW_MARGIN) {
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT + Connector.DEFAULT_ARROW_MARGIN, end.y + Connector.DEFAULT_ARROW_SEGMENT + Connector.DEFAULT_ARROW_MARGIN))
            } else {
              points.push(new Point2(end.x , start.y))
            }
            points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT + Connector.DEFAULT_ARROW_MARGIN))
            points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            break
          }
          case ConnectorDirection.Right:
          default:{
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))                
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT + Connector.DEFAULT_ARROW_MARGIN, start.y))
            if(start.y > end.y - this._targetJoint!.y - Connector.DEFAULT_ARROW_SEGMENT - Connector.DEFAULT_ARROW_MARGIN) {
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT + Connector.DEFAULT_ARROW_MARGIN, end.y - this._targetJoint!.y - Connector.DEFAULT_ARROW_SEGMENT - Connector.DEFAULT_ARROW_MARGIN))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y - this._targetJoint!.y - Connector.DEFAULT_ARROW_SEGMENT - Connector.DEFAULT_ARROW_MARGIN))
            } else {
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT , start.y))
            }
            points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            points.push(new Point2(end.x, end.y))
            break
          }
        }    
        break
      }
      case TargetPosition.Bottom: {
        break
      }
      case TargetPosition.None:
      default: {
        switch(this.endDirection) {
          case ConnectorDirection.Left: {
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))                
            points.push(new Point2(centerX, start.y))
            points.push(new Point2(centerX, end.y))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            break
          }
          case ConnectorDirection.Top:{
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))                
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT - Connector.DEFAULT_ARROW_MARGIN, start.y))                
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT - Connector.DEFAULT_ARROW_MARGIN, minTop))
            points.push(new Point2(end.x, minTop))
            points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT - Connector.DEFAULT_ARROW_MARGIN))
            points.push(new Point2(end.x, minTop - Connector.DEFAULT_ARROW_SEGMENT))
            break
          }
          case ConnectorDirection.Bottom:{
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))                
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT - Connector.DEFAULT_ARROW_MARGIN, start.y))                
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT - Connector.DEFAULT_ARROW_MARGIN, minBottom))
            points.push(new Point2(end.x, minBottom))
            points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT - Connector.DEFAULT_ARROW_MARGIN))
            points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            break
          }
          case ConnectorDirection.Right:
          default:{
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))                
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT - Connector.DEFAULT_ARROW_MARGIN, start.y))                
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT - Connector.DEFAULT_ARROW_MARGIN, minTop))
            points.push(new Point2(minLeft, minTop))
            points.push(new Point2(minLeft, end.y - Connector.DEFAULT_ARROW_SEGMENT - Connector.DEFAULT_ARROW_MARGIN))
            points.push(new Point2(minLeft, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            break
          }
        }    
        break
      }
    }
  }

  private initializeOrthogonalPointsBottom(targetPosition: TargetPosition,points: Point2[], start: Point2, end: Point2, minLeft: number, minTop: number, minBottom: number, minRight: number, centerX: number, centerY: number ) {

  }
}
