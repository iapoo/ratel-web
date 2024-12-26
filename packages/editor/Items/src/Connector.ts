import { Point2, Rectangle } from '@ratel-web/engine'
import { Editor } from '../../Editor'
import { ConnectorArrowDisplayMode, ConnectorArrowDisplayType, ConnectorDirection, ConnectorMode, ConnectorShape, ConnectorType } from '../../Shapes'
import { Constants } from '../../Utils'
import { EditorItemInfo } from './EditorItemInfo'
import { Entity } from './Entity'
import { Categories, Item, Type } from './Item'

export interface ConnectorArrowType {
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

export enum TargetPosition {
  None,
  Left,
  Top,
  Right,
  Bottom,
}

export const ConnectorArrowTypes = [
  {
    name: 'None',
    description: 'None',
    type: ConnectorArrowDisplayType.None,
    height: 12,
    width: 12,
    modifier: 0.4,
    count: 1,
    outline: false,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Full,
  },

  {
    name: 'Triangle-1',
    description: 'Triangle',
    type: ConnectorArrowDisplayType.Triangle,
    height: 12,
    width: 12,
    modifier: 0,
    count: 1,
    outline: false,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Full,
  },
  {
    name: 'Triangle-2',
    description: 'Triangle',
    type: ConnectorArrowDisplayType.Triangle,
    height: 12,
    width: 12,
    modifier: 0,
    count: 1,
    outline: false,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Top,
  },
  {
    name: 'Triangle-3',
    description: 'Triangle',
    type: ConnectorArrowDisplayType.Triangle,
    height: 12,
    width: 12,
    modifier: 0,
    count: 1,
    outline: false,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Bottom,
  },
  {
    name: 'Triangle-4',
    description: 'Triangle',
    type: ConnectorArrowDisplayType.Triangle,
    height: 12,
    width: 12,
    modifier: 0,
    count: 1,
    outline: true,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Full,
  },
  {
    name: 'Triangle-5',
    description: 'Triangle',
    type: ConnectorArrowDisplayType.Triangle,
    height: 12,
    width: 12,
    modifier: 0,
    count: 1,
    outline: true,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Top,
  },
  {
    name: 'Triangle-6',
    description: 'Triangle',
    type: ConnectorArrowDisplayType.Triangle,
    height: 12,
    width: 12,
    modifier: 0,
    count: 1,
    outline: true,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Bottom,
  },
  {
    name: 'Triangle-7',
    description: 'Triangle',
    type: ConnectorArrowDisplayType.Triangle,
    height: 12,
    width: 12,
    modifier: 0,
    count: 2,
    outline: false,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Full,
  },
  {
    name: 'Triangle-8',
    description: 'Triangle',
    type: ConnectorArrowDisplayType.Triangle,
    height: 12,
    width: 12,
    modifier: 0,
    count: 2,
    outline: true,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Full,
  },

  {
    name: 'Triangle-1-1',
    description: 'Triangle',
    type: ConnectorArrowDisplayType.Triangle,
    height: 12,
    width: 12,
    modifier: 0.3,
    count: 1,
    outline: false,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Full,
  },
  {
    name: 'Triangle-2-1',
    description: 'Triangle',
    type: ConnectorArrowDisplayType.Triangle,
    height: 12,
    width: 12,
    modifier: 0.3,
    count: 1,
    outline: false,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Top,
  },
  {
    name: 'Triangle-3-1',
    description: 'Triangle',
    type: ConnectorArrowDisplayType.Triangle,
    height: 12,
    width: 12,
    modifier: 0.3,
    count: 1,
    outline: false,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Bottom,
  },
  {
    name: 'Triangle-4-1',
    description: 'Triangle',
    type: ConnectorArrowDisplayType.Triangle,
    height: 12,
    width: 12,
    modifier: 0.3,
    count: 1,
    outline: true,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Full,
  },
  {
    name: 'Triangle-5-1',
    description: 'Triangle',
    type: ConnectorArrowDisplayType.Triangle,
    height: 12,
    width: 12,
    modifier: 0.3,
    count: 1,
    outline: true,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Top,
  },
  {
    name: 'Triangle-6-1',
    description: 'Triangle',
    type: ConnectorArrowDisplayType.Triangle,
    height: 12,
    width: 12,
    modifier: 0.3,
    count: 1,
    outline: true,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Bottom,
  },
  {
    name: 'Triangle-7-1',
    description: 'Triangle',
    type: ConnectorArrowDisplayType.Triangle,
    height: 12,
    width: 12,
    modifier: 0.3,
    count: 2,
    outline: false,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Full,
  },
  {
    name: 'Triangle-8-1',
    description: 'Triangle',
    type: ConnectorArrowDisplayType.Triangle,
    height: 12,
    width: 12,
    modifier: 0.3,
    count: 2,
    outline: true,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Full,
  },

  {
    name: 'Triangle-1-2',
    description: 'Triangle',
    type: ConnectorArrowDisplayType.Triangle,
    height: 12,
    width: 12,
    modifier: 0.9,
    count: 1,
    outline: false,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Full,
  },
  {
    name: 'Triangle-2-2',
    description: 'Triangle',
    type: ConnectorArrowDisplayType.Triangle,
    height: 12,
    width: 12,
    modifier: 0.9,
    count: 1,
    outline: false,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Top,
  },
  {
    name: 'Triangle-3-2',
    description: 'Triangle',
    type: ConnectorArrowDisplayType.Triangle,
    height: 12,
    width: 12,
    modifier: 0.9,
    count: 1,
    outline: false,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Bottom,
  },
  {
    name: 'Triangle-4-2',
    description: 'Triangle',
    type: ConnectorArrowDisplayType.Triangle,
    height: 12,
    width: 12,
    modifier: 0.9,
    count: 1,
    outline: true,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Full,
  },
  {
    name: 'Triangle-5-2',
    description: 'Triangle',
    type: ConnectorArrowDisplayType.Triangle,
    height: 12,
    width: 12,
    modifier: 0.9,
    count: 1,
    outline: true,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Top,
  },
  {
    name: 'Triangle-6-2',
    description: 'Triangle',
    type: ConnectorArrowDisplayType.Triangle,
    height: 12,
    width: 12,
    modifier: 0.9,
    count: 1,
    outline: true,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Bottom,
  },
  {
    name: 'Triangle-7-2',
    description: 'Triangle',
    type: ConnectorArrowDisplayType.Triangle,
    height: 12,
    width: 12,
    modifier: 0.9,
    count: 2,
    outline: false,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Full,
  },
  {
    name: 'Triangle-8-2',
    description: 'Triangle',
    type: ConnectorArrowDisplayType.Triangle,
    height: 12,
    width: 12,
    modifier: 0.9,
    count: 2,
    outline: true,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Full,
  },

  {
    name: 'Diamond-1',
    description: 'Diamond',
    type: ConnectorArrowDisplayType.Diamond,
    height: 12,
    width: 24,
    modifier: 0,
    count: 1,
    outline: false,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Full,
  },
  {
    name: 'Diamond-2',
    description: 'Diamond',
    type: ConnectorArrowDisplayType.Diamond,
    height: 12,
    width: 24,
    modifier: 0,
    count: 1,
    outline: true,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Full,
  },
  {
    name: 'Diamond-3',
    description: 'Diamond',
    type: ConnectorArrowDisplayType.Diamond,
    height: 12,
    width: 24,
    modifier: 0,
    count: 2,
    outline: false,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Full,
  },
  {
    name: 'Diamond-4',
    description: 'Diamond',
    type: ConnectorArrowDisplayType.Diamond,
    height: 12,
    width: 24,
    modifier: 0,
    count: 2,
    outline: true,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Full,
  },

  {
    name: 'Ellipse-1',
    description: 'Ellipse',
    type: ConnectorArrowDisplayType.Ellipse,
    height: 12,
    width: 12,
    modifier: 0,
    count: 1,
    outline: false,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Full,
  },
  {
    name: 'Ellipse-2',
    description: 'Ellipse',
    type: ConnectorArrowDisplayType.Ellipse,
    height: 12,
    width: 12,
    modifier: 0,
    count: 1,
    outline: true,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Full,
  },
  {
    name: 'Ellipse-3',
    description: 'Ellipse',
    type: ConnectorArrowDisplayType.Ellipse,
    height: 12,
    width: 12,
    modifier: 0,
    count: 2,
    outline: false,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Full,
  },
  {
    name: 'Ellipse-4',
    description: 'Ellipse',
    type: ConnectorArrowDisplayType.Ellipse,
    height: 12,
    width: 12,
    modifier: 0,
    count: 2,
    outline: true,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Full,
  },

  {
    name: 'Other-1',
    description: '(',
    type: ConnectorArrowDisplayType.LeftParenthesis,
    height: 12,
    width: 12,
    modifier: 0,
    count: 1,
    outline: true,
    close: false,
    displayMode: ConnectorArrowDisplayMode.Full,
  },
  {
    name: 'Other-2',
    description: ')',
    type: ConnectorArrowDisplayType.RightParenthesis,
    height: 12,
    width: 12,
    modifier: 0,
    count: 1,
    outline: true,
    close: false,
    displayMode: ConnectorArrowDisplayMode.Full,
  },
  {
    name: 'Other-3',
    description: 'X',
    type: ConnectorArrowDisplayType.Orthogonal,
    height: 12,
    width: 12,
    modifier: 0,
    count: 1,
    outline: true,
    close: false,
    displayMode: ConnectorArrowDisplayMode.Full,
  },
  {
    name: 'Other-4',
    description: '/',
    type: ConnectorArrowDisplayType.ForewardSlash,
    height: 12,
    width: 12,
    modifier: 0,
    count: 1,
    outline: true,
    close: false,
    displayMode: ConnectorArrowDisplayMode.Full,
  },
  {
    name: 'Other-5',
    description: '\\',
    type: ConnectorArrowDisplayType.Backslashe,
    height: 12,
    width: 12,
    modifier: 0,
    count: 1,
    outline: true,
    close: false,
    displayMode: ConnectorArrowDisplayMode.Full,
  },
  {
    name: 'Other-6',
    description: '|',
    type: ConnectorArrowDisplayType.VerticalLine,
    height: 12,
    width: 12,
    modifier: 0.4,
    count: 1,
    outline: true,
    close: false,
    displayMode: ConnectorArrowDisplayMode.Full,
  },
  {
    name: 'Other-7',
    description: '<',
    type: ConnectorArrowDisplayType.LeftAngleBracket,
    height: 12,
    width: 12,
    modifier: 0,
    count: 1,
    outline: true,
    close: false,
    displayMode: ConnectorArrowDisplayMode.Full,
  },
  {
    name: 'Other-8',
    description: '|<',
    type: ConnectorArrowDisplayType.VerticaleLineAndLeftAngleBacket,
    height: 12,
    width: 12,
    modifier: 0,
    count: 1,
    outline: false,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Full,
  },
  {
    name: 'Other-9',
    description: 'o|',
    type: ConnectorArrowDisplayType.CircleAndVerticalLine,
    height: 12,
    width: 24,
    modifier: 0,
    count: 1,
    outline: true,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Full,
  },
  {
    name: 'Other-10',
    description: 'o<',
    type: ConnectorArrowDisplayType.CircleAndLeftBacket,
    height: 12,
    width: 24,
    modifier: 0,
    count: 1,
    outline: true,
    close: true,
    displayMode: ConnectorArrowDisplayMode.Full,
  },
]

export class Connector extends Item {
  public static CONNECTOR_TYPE_CONNECTOR = 'Connector'
  public static CONNECTOR_DESC_CONNECTOR = 'Connector'
  public static DEFAULT_ARROW_SEGMENT = 30
  //public static DEFAULT_ARROW_MARGIN = 10
  private _source: Entity | undefined = undefined
  private _target: Entity | undefined = undefined
  private _sourceJoint?: Point2
  private _targetJoint?: Point2
  private _connectorType: ConnectorType
  private _start: Point2
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
  //private _orthogonals: number[]
  //private _horizontal: boolean
  private _startDirection: ConnectorDirection
  private _endDirection: ConnectorDirection
  private _orthogonalPoints: Point2[]
  private _connectorDoubleLineGap: number
  private _connectorDoubleLineArrowLength: number
  private _connectorDoubleLineArrowDistance: number
  private _autoRefreshOrthogonalPoints: boolean
  private _orthogonalPointsModified: boolean
  private _orthogonalPointsStartModified: boolean
  private _orthogonalPointsEndModified: boolean
  private _orthogonalPointsStartLength: number
  private _orthogonalPointsEndLength: number

  public constructor(
    start: Point2,
    end: Point2,
    startDirection: ConnectorDirection = ConnectorDirection.Right,
    endDirection: ConnectorDirection = ConnectorDirection.Left,
  ) {
    super(Math.min(start.x, end.x), Math.min(start.y, end.y), Math.abs(start.x - end.x), Math.abs(start.y - end.y))
    this._start = start
    this._end = end
    this._shape = new ConnectorShape(start.x, start.y, end.x, end.y, startDirection, endDirection)
    this._connectorShape = this._shape as ConnectorShape
    this.type = Connector.CONNECTOR_TYPE_CONNECTOR
    this._connectorType = ConnectorType.Orthogonal
    this._startArrow = ConnectorArrowTypes[0]
    this._endArrow = ConnectorArrowTypes[1]
    this._connectorShape.endArrow = ConnectorArrowTypes[1]
    this._connectorMode = ConnectorMode.Single
    this._doubleLineStrokeWidth = 1
    this._curveStartModifier = new Point2(0.4, 0)
    this._curveEndModifier = new Point2(-0.4, 0)
    //this._horizontal = horizontal
    //if(this._horizontal) {
    //  this._orthogonals = [0.5, 0, 0.5, 1]
    //} else {
    //  this._orthogonals = [0, 0.5, 1, 0.5]
    //}
    this._startDirection = startDirection
    this._endDirection = endDirection
    this._autoRefreshOrthogonalPoints = true
    this._orthogonalPointsModified = false
    this._orthogonalPointsStartModified = false
    this._orthogonalPointsEndModified = false
    this._orthogonalPointsStartLength = 0
    this._orthogonalPointsEndLength = 0
    this.initializeCurveModifiers()
    this._connectorDoubleLineGap = Constants.DOUBLE_LINE_GAP_DEFAULT
    this._connectorDoubleLineArrowLength = Constants.DOUBLE_LINE_ARROW_LENGTH_DEFAULT
    this._connectorDoubleLineArrowDistance = Constants.DOUBLE_LINE_ARROW_DISTANCE_DEFAULT
    this.updateTheme()
    this._orthogonalPoints = this.initializeOrthogonalPoints(true, true)
    this._connectorShape.orthogonalPoints = this._orthogonalPoints
  }

  public get autoRefreshOrthogonalPoints() {
    return this._autoRefreshOrthogonalPoints
  }

  /**
   * Need this to prevent refresh points while moving
   */
  public set autoRefreshOrthogonalPoints(value: boolean) {
    this._autoRefreshOrthogonalPoints = value
  }

  public get orthogonalPointsModified() {
    return this._orthogonalPointsModified
  }
  /**
   *  Check if user has modified orthogonalPoints
   */
  public markOrthogonalPointsModified() {
    this._orthogonalPointsModified = true
    this._orthogonalPointsStartModified = false
    this._orthogonalPointsEndModified = false
  }

  /**
   *  Reset user has modified start of orthogonalPoints
   */
  public get orthogonalPointsStartModified() {
    return this._orthogonalPointsModified
  }

  public get orthogonalPointsEndModified() {
    return this._orthogonalPointsEndModified
  }

  public get source(): Entity | undefined {
    return this._source
  }

  public set source(value: Entity | undefined) {
    this._source = value
  }

  // public get horizontal() {
  //   return this._horizontal
  // }

  // public set horizontal(value: boolean) {
  //   this._horizontal = value
  //   this._connectorShape.horizontal = value
  //   if(this._horizontal) {
  //     this._orthogonals = [0.5, 0, 0.5, 1]
  //   } else {
  //     this._orthogonals = [0, 0.5, 1, 0.5]
  //   }
  //   this.updateTheme()
  // }

  public set startDirection(value: ConnectorDirection) {
    this._startDirection = value
    if (this._connectorShape) {
      // may not initialized yet
      this._connectorShape.startDirection = value
      this.updateTheme()
    }
  }

  public get endDirection() {
    return this._endDirection
  }

  public set endDirection(value: ConnectorDirection) {
    this._endDirection = value
    if (this._connectorShape) {
      // may not initialized yet
      this._connectorShape.endDirection = value
      this.updateTheme()
    }
  }

  public get startDirection() {
    return this._startDirection
  }

  public get connectorShape() {
    return this._connectorShape
  }

  // public get crossPoints() {
  //   return this._connectorShape.crossPoints
  // }

  public get startArrow() {
    return this._startArrow
  }

  public set startArrow(value: ConnectorArrowType) {
    this._startArrow = value
    this._connectorShape.startArrow = value
    this.updateTheme()
    if (this._autoRefreshOrthogonalPoints) {
      this._orthogonalPoints = this.initializeOrthogonalPoints(true, this.target && !this._orthogonalPointsModified ? true : false)
      this._connectorShape.orthogonalPoints = this._orthogonalPoints
      this.initializeCurveModifiers()
    }
  }

  public get endArrow() {
    return this._endArrow
  }

  public set endArrow(value: ConnectorArrowType) {
    this._endArrow = value
    this._connectorShape.endArrow = value
    this.updateTheme()
    if (this._autoRefreshOrthogonalPoints) {
      this._orthogonalPoints = this.initializeOrthogonalPoints(true, this.target && !this._orthogonalPointsModified ? true : false)
      this._connectorShape.orthogonalPoints = this._orthogonalPoints
      this.initializeCurveModifiers()
    }
  }

  public get connectorMode() {
    return this._connectorMode
  }

  public set connectorMode(value: ConnectorMode) {
    this._connectorMode = value
    this._connectorShape.connectorMode = value
    this.updateTheme()
  }

  public get connectorDoubleLineGap() {
    return this._connectorDoubleLineGap
  }

  public set connectorDoubleLineGap(value: number) {
    this._connectorDoubleLineGap = value
    this._connectorShape.connectorDoubleLineGap = value
    this.updateTheme()
  }

  public get connectorDoubleLineArrowLength() {
    return this._connectorDoubleLineArrowLength
  }

  public set connectorDoubleLineArrowLength(value: number) {
    this._connectorDoubleLineArrowLength = value
    this._connectorShape.connectorDoubleLineArrowLength = value
    this.updateTheme()
  }

  public get connectorDoubleLineArrowDistance() {
    return this._connectorDoubleLineArrowDistance
  }

  public set connectorDoubleLineArrowDistance(value: number) {
    this._connectorDoubleLineArrowDistance = value
    this._connectorShape.connectorDoubleLineArrowDistance = value
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

  // public get orthogonals() {
  //   return this._orthogonals
  // }

  // public set orthogonals(value: number[]) {
  //   this._orthogonals = value
  //   this._connectorShape.orthogonals = value
  //   this.updateTheme()
  // }

  public get orthogonalPoints() {
    return this._orthogonalPoints
  }

  public set orthogonalPoints(value: Point2[]) {
    let newValue: Point2[] = []
    newValue = newValue.concat(value)
    this._orthogonalPoints = newValue
    this._connectorShape.orthogonalPoints = newValue
    this.updateTheme()
  }

  public get start(): Point2 {
    return this._start
  }

  public set start(value: Point2) {
    this._start = value
    this._connectorShape.start = value
    this.boundary = Rectangle.makeLTWH(
      Math.min(this._start.x, this._end.x),
      Math.min(this._start.y, this._end.y),
      Math.abs(this._start.x - this._end.x),
      Math.abs(this._start.y - this._end.y),
    )
    if (this._autoRefreshOrthogonalPoints) {
      this._orthogonalPoints = this.initializeOrthogonalPoints(true, this.target && !this._orthogonalPointsModified ? true : false)
      this._connectorShape.orthogonalPoints = this._orthogonalPoints
      this.initializeCurveModifiers()
    }
  }

  public get end(): Point2 {
    return this._end
  }

  public set end(value: Point2) {
    this._end = value
    this._connectorShape.end = value
    this.boundary = Rectangle.makeLTWH(
      Math.min(this._start.x, this._end.x),
      Math.min(this._start.y, this._end.y),
      Math.abs(this._start.x - this._end.x),
      Math.abs(this._start.y - this._end.y),
    )
    if (this._autoRefreshOrthogonalPoints) {
      this._orthogonalPoints = this.initializeOrthogonalPoints(this.source && !this._orthogonalPointsModified ? true : false, true)
      this._connectorShape.orthogonalPoints = this._orthogonalPoints
      this.initializeCurveModifiers()
    }
  }

  public get target(): Entity | undefined {
    return this._target
  }

  public set target(value: Entity | undefined) {
    this._target = value
  }

  public get sourceJoint(): Point2 | undefined {
    return this._sourceJoint
  }

  public set sourceJoint(value: Point2 | undefined) {
    this._sourceJoint = value
    if (value && this._source && this._sourceJoint) {
      this._start = this._source.worldTransform.makePoint(value)
      this.boundary = Rectangle.makeLTWH(
        Math.min(this._start.x, this._end.x),
        Math.min(this._start.y, this._end.y),
        Math.abs(this._start.x - this._end.x),
        Math.abs(this._start.y - this._end.y),
      )
      this._connectorShape.start = this._start
      this._orthogonalPoints = this.initializeOrthogonalPoints(true, this.target && !this._orthogonalPointsModified ? true : false)
      this._connectorShape.orthogonalPoints = this._orthogonalPoints
      this.initializeCurveModifiers()
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

  public get targetJoint(): Point2 | undefined {
    return this._targetJoint
  }

  public set targetJoint(value: Point2 | undefined) {
    this._targetJoint = value
    if (value && this._target && this._targetJoint) {
      this._end = this._target.worldTransform.makePoint(value)
      this.boundary = Rectangle.makeLTWH(
        Math.min(this._start.x, this._end.x),
        Math.min(this._start.y, this._end.y),
        Math.abs(this._start.x - this._end.x),
        Math.abs(this._start.y - this._end.y),
      )
      this._connectorShape.end = this._end
      this._orthogonalPoints = this.initializeOrthogonalPoints(this.source && !this._orthogonalPointsModified ? true : false, true)
      this._connectorShape.orthogonalPoints = this._orthogonalPoints
      this.initializeCurveModifiers()
    }
  }

  // public updateTargetJoint () {
  //  if (this._target && this._targetJoint) {
  //    this._end = this._target.shape.worldTransform.makePoint(this._targetJoint)
  //    this.boundary = Rectangle.makeLTWH(Math.min(this._start.x, this._end.x), Math.min(this._start.y, this._end.y), Math.abs(this._start.x - this._end.x), Math.abs(this._start.y - this._end.y))
  //  }
  //  this.markDirty()
  // }

  public get connectorType(): ConnectorType {
    return this._connectorType
  }

  public set connectorType(value: ConnectorType) {
    this._connectorType = value
    this._connectorShape.connectorType = value
    this.updateTheme()
  }

  public get types(): Type[] {
    return [{ name: Connector.CONNECTOR_TYPE_CONNECTOR, description: Connector.CONNECTOR_DESC_CONNECTOR }]
  }

  public get category(): string {
    return Categories.CONNECTOR
  }

  protected save(): EditorItemInfo {
    throw new Error('Not implemented yet')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected load(data: EditorItemInfo, editor: Editor): void {}

  // public  clone(): EditorItem {
  //   let connector = new Connector(this.start, this.end)
  //   return connector;
  // }
  private initializeCurveModifiers() {
    switch (this._startDirection) {
      case ConnectorDirection.Left: {
        this._curveStartModifier = new Point2(-0.4, 0)
        this.connectorShape.curveStartModifier = new Point2(-0.4, 0)
        break
      }
      case ConnectorDirection.Top: {
        this._curveStartModifier = new Point2(0, -0.4)
        this.connectorShape.curveStartModifier = new Point2(0, -0.4)
        break
      }
      case ConnectorDirection.Bottom: {
        this._curveStartModifier = new Point2(0, 0.4)
        this.connectorShape.curveStartModifier = new Point2(0, 0.4)
        break
      }
      case ConnectorDirection.Right:
      default: {
        this._curveStartModifier = new Point2(0.4, 0)
        this.connectorShape.curveStartModifier = new Point2(0.4, 0)
        break
      }
    }
    switch (this._endDirection) {
      case ConnectorDirection.Left: {
        this._curveEndModifier = new Point2(-0.4, 0)
        this.connectorShape.curveEndModifier = new Point2(-0.4, 0)
        break
      }
      case ConnectorDirection.Top: {
        this._curveEndModifier = new Point2(0, -0.4)
        this.connectorShape.curveEndModifier = new Point2(0, -0.4)
        break
      }
      case ConnectorDirection.Bottom: {
        this._curveEndModifier = new Point2(0, 0.4)
        this.connectorShape.curveEndModifier = new Point2(0, 0.4)
        break
      }
      case ConnectorDirection.Right:
      default: {
        this._curveEndModifier = new Point2(0.4, 0)
        this.connectorShape.curveEndModifier = new Point2(0.4, 0)
        break
      }
    }
  }

  private initializeOrthogonalPoints(initStart: boolean, initEnd: boolean): Point2[] {
    //Default initStart = true, initEnd = true. And we ignore booth initStart and initEnd are false
    if (this._orthogonalPointsModified && initStart && !initEnd) {
      return this.initializeOrthogonalPointsWithStart()
    } else if (this._orthogonalPointsModified && !initStart && initEnd) {
      return this.initializeOrthogonalPointsWithEnd()
    } else {
      return this.initializeOrthogonalPointsWithDefault()
    }
  }

  private initializeOrthogonalPointsWithStart(): Point2[] {
    const start = new Point2(this.start.x - this.left, this.start.y - this.top)
    const oldEnd = new Point2(this.end.x - this.left, this.end.y - this.top)
    let position = this._orthogonalPointsStartModified ? this._orthogonalPointsStartLength : 2
    // if(this._orthogonalPointsStartModified) {
    //   console.log(`aa`)
    // }
    this._orthogonalPointsStartModified = true
    let newEnd = this._orthogonalPoints[position]
    const offsetX = oldEnd.x - this._orthogonalPoints[this._orthogonalPoints.length - 1].x
    const offsetY = oldEnd.y - this._orthogonalPoints[this._orthogonalPoints.length - 1].y
    // if(!newEnd) {
    //   console.log(`exception is here`)
    // }
    newEnd = new Point2(newEnd.x + offsetX, newEnd.y + offsetY)
    const targetPosition = this.findTargetPositionWithStart()
    const points: Point2[] = []
    points.push(new Point2(start.x, start.y))
    // console.log(`${this.startDirection}  ${targetPosition}`)
    if (this._source) {
      switch (this.startDirection) {
        case ConnectorDirection.Left: {
          this.initializeOrthogonalPointsLeftWithoutTarget(targetPosition, points, start, newEnd)
          break
        }
        case ConnectorDirection.Top: {
          this.initializeOrthogonalPointsTopWithoutTarget(targetPosition, points, start, newEnd)
          break
        }
        case ConnectorDirection.Bottom: {
          this.initializeOrthogonalPointsBottomWithoutTarget(targetPosition, points, start, newEnd)
          break
        }
        case ConnectorDirection.Right:
        default: {
          this.initializeOrthogonalPointsRightWithoutTarget(targetPosition, points, start, newEnd)
          break
        }
      }
    } else {
      //console.log(`Exception is here `)
      this.initializeOrthogonalPointsWithoutSourceTarget(targetPosition, points, start, newEnd)
    }
    //console.log(`source = ${this._source} target = ${this._target} equal = ${this._source == this._target}`)
    points.push(new Point2(newEnd.x, newEnd.y))
    // if(points.length == 2) {
    //   console.log(`Exception is here`)
    // }
    const endPoints = this._orthogonalPoints.slice(position + 1)
    for (let i = 0; i < endPoints.length; i++) {
      endPoints[i] = new Point2(endPoints[i].x + offsetX, endPoints[i].y + offsetY)
    }
    //Remove middle one if last 3 points in same axis
    if (
      points.length >= 3 &&
      ((points[points.length - 1].x === points[points.length - 2].x && points[points.length - 1].x === points[points.length - 3].x) ||
        (points[points.length - 1].y === points[points.length - 2].y && points[points.length - 1].y === points[points.length - 3].y))
    ) {
      points.splice(points.length - 2, 1)
    }
    this._orthogonalPointsStartLength = points.length - 1
    const result = points.concat(endPoints)
    //Connector.cleanOrthogonalPoints(result)
    // console.log(`points length = ${result.length}`)
    // if(result.length < 8 && this._orthogonalPointsStartModified) {
    //   console.log(`Exception is here`)
    // }
    return result
  }

  private initializeOrthogonalPointsWithEnd(): Point2[] {
    const oldStart = new Point2(this.start.x - this.left, this.start.y - this.top)
    const end = new Point2(this.end.x - this.left, this.end.y - this.top)
    const length = this._orthogonalPoints.length
    let initPosition = length - 2
    if (
      (this._orthogonalPoints[length - 3].x === this._orthogonalPoints[length - 2].x &&
        this._orthogonalPoints[length - 3].x === this._orthogonalPoints[length - 1].x) ||
      (this._orthogonalPoints[length - 3].y === this._orthogonalPoints[length - 2].y &&
        this._orthogonalPoints[length - 3].y === this._orthogonalPoints[length - 1].y)
    ) {
      initPosition = this._orthogonalPoints.length - 3
    }
    let position = this._orthogonalPointsEndModified ? this._orthogonalPointsEndLength : initPosition
    this._orthogonalPointsEndModified = true
    let newStart = this._orthogonalPoints[position]
    const offsetX = oldStart.x - this._orthogonalPoints[0].x
    const offsetY = oldStart.y - this._orthogonalPoints[0].y
    newStart = new Point2(newStart.x + offsetX, newStart.y + offsetY)
    // console.log(`===`)
    // SystemUtils.debugPoints(this._orthogonalPoints)
    //console.log(`init start x= ${start.x} y = ${start.y} end x = ${end.x} y = ${end.y}`)
    const targetPosition = this.findTargetPositionWithEnd()
    const points: Point2[] = []
    points.push(new Point2(newStart.x, newStart.y))
    //console.log(`${this.startDirection}`)
    if (this._target) {
      switch (this.endDirection) {
        case ConnectorDirection.Left: {
          this.initializeOrthogonalPointsLeftWithoutSource(targetPosition, points, newStart, end)
          break
        }
        case ConnectorDirection.Top: {
          this.initializeOrthogonalPointsTopWithoutSource(targetPosition, points, newStart, end)
          break
        }
        case ConnectorDirection.Bottom: {
          this.initializeOrthogonalPointsBottomWithoutSource(targetPosition, points, newStart, end)
          break
        }
        case ConnectorDirection.Right:
        default: {
          this.initializeOrthogonalPointsRightWithoutSource(targetPosition, points, newStart, end)
          break
        }
      }
    } else {
      //console.log(`Exception is here `)
      this.initializeOrthogonalPointsWithoutSourceTarget(targetPosition, points, newStart, end)
    }
    //console.log(`source = ${this._source} target = ${this._target} equal = ${this._source == this._target}`)
    points.push(new Point2(end.x, end.y))
    // if(points.length == 2) {
    //   console.log(`Exception is here`)
    // }
    // SystemUtils.debugPoints(points)
    if (points.length >= 3 && ((points[0].x === points[1].x && points[0].x === points[2].x) || (points[0].y === points[1].y && points[0].y === points[2].y))) {
      points.splice(1, 1)
    }
    const endPoints = this._orthogonalPoints.slice(0, position)
    for (let i = 0; i < endPoints.length; i++) {
      endPoints[i] = new Point2(endPoints[i].x + offsetX, endPoints[i].y + offsetY)
    }
    const result = endPoints.concat(points)
    // SystemUtils.debugPoints(result)
    this._orthogonalPointsEndLength = position
    //Connector.cleanOrthogonalPoints(result)
    return result
  }

  private initializeOrthogonalPointsWithDefault(): Point2[] {
    // const oldStart = new Point2(this.start.x - this.left, this.start.y - this.top)
    // const length = this._orthogonalPoints.length
    // let initPosition = length - 2
    // if((this._orthogonalPoints[length - 3].x == this._orthogonalPoints[length - 2].x && this._orthogonalPoints[length - 3].x == this._orthogonalPoints[length - 1].x)
    //   || (this._orthogonalPoints[length - 3].y == this._orthogonalPoints[length - 2].y && this._orthogonalPoints[length - 3].y == this._orthogonalPoints[length - 1].y)) {
    //   initPosition = this._orthogonalPoints.length - 3
    // }
    // let endPosition = this._orthogonalPointsEndModified ? this._orthogonalPointsEndLength : initPosition
    // this._orthogonalPointsEndModified = true
    // let newStart = this._orthogonalPoints[endPosition]
    // const oldEnd = new Point2(this.end.x - this.left, this.end.y - this.top)
    // let startPosition = this._orthogonalPointsStartModified ? this._orthogonalPointsStartLength : 2
    // // if(this._orthogonalPointsStartModified) {
    // //   console.log(`aa`)
    // // }
    // this._orthogonalPointsStartModified = true
    // let newEnd = this._orthogonalPoints[startPosition]
    // const offsetX = oldEnd.x - this._orthogonalPoints[this._orthogonalPoints.length - 1].x
    // const offsetY = oldEnd.y - this._orthogonalPoints[this._orthogonalPoints.length - 1].y
    // // if(!newEnd) {
    // //   console.log(`exception is here`)
    // // }
    // newEnd = new Point2(newEnd.x + offsetX, newEnd.y + offsetY)
    //console.log(`check start x= ${this.start.x} y = ${this.start.y} end x = ${this.end.x} y = ${this.end.y}`)
    const start = new Point2(this.start.x - this.left, this.start.y - this.top)
    const end = new Point2(this.end.x - this.left, this.end.y - this.top)
    //console.log(`init start x= ${start.x} y = ${start.y} end x = ${end.x} y = ${end.y}`)
    const minTop =
      this._sourceJoint && this._targetJoint ? Math.min(start.y - this._sourceJoint.y, end.y - this._targetJoint.y) - Connector.DEFAULT_ARROW_SEGMENT : 0
    const minLeft =
      this._source && this._target ? Math.min(this.getSourceLeft() - this.left, this.getTargetLeft() - this.left) - Connector.DEFAULT_ARROW_SEGMENT : 0
    const minBottom =
      this._source && this._target && this._sourceJoint && this._targetJoint
        ? Math.max(start.y + this._source.height - this._sourceJoint.y, end.y + this._target.height - this._targetJoint.y) + Connector.DEFAULT_ARROW_SEGMENT
        : 0
    const minRight =
      this._source && this._target ? Math.max(this._source.right - this.left, this._target.right - this.left) + Connector.DEFAULT_ARROW_SEGMENT : 0
    const centerX = (end.x + start.x) * 0.5
    const centerY = (end.y + start.y) * 0.5
    const targetPosition = this.findTargetPosition()
    const points: Point2[] = []
    points.push(new Point2(start.x, start.y))
    //console.log(`${this.startDirection}`)
    if (this._source && this._source === this._target) {
      switch (this.startDirection) {
        case ConnectorDirection.Left: {
          this.initializeOrthogonalPointsLeftWithSameSourceTarget(targetPosition, points, start, end)
          break
        }
        case ConnectorDirection.Top: {
          this.initializeOrthogonalPointsTopWithSameSourceTarget(targetPosition, points, start, end)
          break
        }
        case ConnectorDirection.Bottom: {
          this.initializeOrthogonalPointsBottomWithSameSourceTarget(targetPosition, points, start, end)
          break
        }
        case ConnectorDirection.Right:
        default: {
          this.initializeOrthogonalPointsRightWithSameSourceTarget(targetPosition, points, start, end)
          break
        }
      }
    } else if (this.source && this._target) {
      switch (this.startDirection) {
        case ConnectorDirection.Left: {
          this.initializeOrthogonalPointsLeft(targetPosition, points, start, end, minLeft, minTop, minBottom, minRight, centerX, centerY)
          break
        }
        case ConnectorDirection.Top: {
          this.initializeOrthogonalPointsTop(targetPosition, points, start, end, minLeft, minTop, minBottom, minRight, centerX, centerY)
          break
        }
        case ConnectorDirection.Bottom: {
          this.initializeOrthogonalPointsBottom(targetPosition, points, start, end, minLeft, minTop, minBottom, minRight, centerX, centerY)
          break
        }
        case ConnectorDirection.Right:
        default: {
          this.initializeOrthogonalPointsRight(targetPosition, points, start, end, minLeft, minTop, minBottom, minRight, centerX, centerY)
          break
        }
      }
    } else if (this._source) {
      switch (this.startDirection) {
        case ConnectorDirection.Left: {
          this.initializeOrthogonalPointsLeftWithoutTarget(targetPosition, points, start, end)
          break
        }
        case ConnectorDirection.Top: {
          this.initializeOrthogonalPointsTopWithoutTarget(targetPosition, points, start, end)
          break
        }
        case ConnectorDirection.Bottom: {
          this.initializeOrthogonalPointsBottomWithoutTarget(targetPosition, points, start, end)
          break
        }
        case ConnectorDirection.Right:
        default: {
          this.initializeOrthogonalPointsRightWithoutTarget(targetPosition, points, start, end)
          break
        }
      }
    } else if (this._target) {
      switch (this.endDirection) {
        case ConnectorDirection.Left: {
          this.initializeOrthogonalPointsLeftWithoutSource(targetPosition, points, start, end)
          break
        }
        case ConnectorDirection.Top: {
          this.initializeOrthogonalPointsTopWithoutSource(targetPosition, points, start, end)
          break
        }
        case ConnectorDirection.Bottom: {
          this.initializeOrthogonalPointsBottomWithoutSource(targetPosition, points, start, end)
          break
        }
        case ConnectorDirection.Right:
        default: {
          this.initializeOrthogonalPointsRightWithoutSource(targetPosition, points, start, end)
          break
        }
      }
    } else {
      //console.log(`Exception is here `)
      this.initializeOrthogonalPointsWithoutSourceTarget(targetPosition, points, start, end)
    }
    //console.log(`source = ${this._source} target = ${this._target} equal = ${this._source == this._target}`)
    points.push(new Point2(end.x, end.y))
    // if(points.length == 2) {
    //   console.log(`Exception is here`)
    // }
    return points
  }

  private findTargetPosition(): TargetPosition {
    let result = TargetPosition.None
    if (this._target && this._source) {
      if (this.getTargetLeft() + this._target.width < this.getSourceLeft()) {
        result = TargetPosition.Left
      } else if (this.getTargetTop() + this._target.height < this.getSourceTop()) {
        result = TargetPosition.Top
      } else if (this.getSourceLeft() + this._source.width < this.getTargetLeft()) {
        result = TargetPosition.Right
      } else if (this.getSourceTop() + this._source.height < this.getTargetTop()) {
        result = TargetPosition.Bottom
      }
    } else if (this._source) {
      if (this._end.x < this.getSourceLeft()) {
        result = TargetPosition.Left
      } else if (this._end.y < this.getSourceTop()) {
        result = TargetPosition.Top
      } else if (this._end.x > this.getSourceLeft() + this._source.width) {
        result = TargetPosition.Right
      } else if (this._end.y > this.getSourceTop() + this._source.height) {
        result = TargetPosition.Bottom
      }
    } else if (this._target) {
      if (this._start.x < this.getTargetLeft()) {
        result = TargetPosition.Left
      } else if (this._start.y < this.getTargetTop()) {
        result = TargetPosition.Top
      } else if (this._start.x > this.getTargetLeft() + this._target.width) {
        result = TargetPosition.Right
      } else if (this._start.y > this.getTargetTop() + this._target.height) {
        result = TargetPosition.Bottom
      }
    } else {
      result = TargetPosition.None
    }
    return result
  }

  private findTargetPositionWithStart(): TargetPosition {
    let result = TargetPosition.None
    if (this._source) {
      if (this._end.x < this.getSourceLeft()) {
        result = TargetPosition.Left
      } else if (this._end.y < this.getSourceTop()) {
        result = TargetPosition.Top
      } else if (this._end.x > this.getSourceLeft() + this._source.width) {
        result = TargetPosition.Right
      } else if (this._end.y > this.getSourceTop() + this._source.height) {
        result = TargetPosition.Bottom
      }
    } else {
      result = TargetPosition.None
    }
    return result
  }

  private findTargetPositionWithEnd(): TargetPosition {
    let result = TargetPosition.None
    if (this._target) {
      if (this._start.x < this.getTargetLeft()) {
        result = TargetPosition.Left
      } else if (this._start.y < this.getTargetTop()) {
        result = TargetPosition.Top
      } else if (this._start.x > this.getTargetLeft() + this._target.width) {
        result = TargetPosition.Right
      } else if (this._start.y > this.getTargetTop() + this._target.height) {
        result = TargetPosition.Bottom
      }
    } else {
      result = TargetPosition.None
    }
    return result
  }

  private initializeOrthogonalPointsLeft(
    targetPosition: TargetPosition,
    points: Point2[],
    start: Point2,
    end: Point2,
    minLeft: number,
    minTop: number,
    minBottom: number,
    minRight: number,
    centerX: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    centerY: number,
  ) {
    switch (targetPosition) {
      case TargetPosition.Left: {
        switch (this.endDirection) {
          case ConnectorDirection.Left: {
            const endTop = end.y - this._targetJoint!.y - Connector.DEFAULT_ARROW_SEGMENT
            const endBottom = end.y + (this._target!.height - this._targetJoint!.y) + Connector.DEFAULT_ARROW_SEGMENT
            const endRight = end.x + this._target!.width
            const middleX = (start.x + endRight) * 0.5
            if (start.y < endTop) {
              points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(minLeft, start.y))
              points.push(new Point2(minLeft, end.y))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            } else if (start.y > endBottom) {
              points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(minLeft, start.y))
              points.push(new Point2(minLeft, end.y))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            } else {
              if (middleX < start.x - Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, minTop))
                points.push(new Point2(minLeft, minTop))
                points.push(new Point2(minLeft, end.y))
                points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
              } else {
                points.push(new Point2(middleX, start.y))
                points.push(new Point2(middleX, minTop))
                points.push(new Point2(minLeft, minTop))
                points.push(new Point2(minLeft, end.y))
                points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
              }
            }
            break
          }
          case ConnectorDirection.Top: {
            const endTop = end.y - Connector.DEFAULT_ARROW_SEGMENT
            const endRight = end.x + this._target!.width - this._targetJoint!.x
            const middleX = (start.x + endRight) * 0.5
            if (start.y > endTop) {
              if (middleX < start.x - Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(middleX, start.y))
                points.push(new Point2(middleX, endTop))
                points.push(new Point2(end.x, endTop))
              } else {
                points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
                points.push(new Point2(middleX, start.y))
                points.push(new Point2(middleX, endTop))
                points.push(new Point2(end.x, endTop))
              }
            } else {
              points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(end.x, start.y))
              points.push(new Point2(end.x, endTop))
            }
            break
          }
          case ConnectorDirection.Bottom: {
            const endBottom = end.y + Connector.DEFAULT_ARROW_SEGMENT
            const endRight = end.x + this._target!.width - this._targetJoint!.x
            const middleX = (start.x + endRight) * 0.5
            if (start.y < endBottom) {
              if (middleX < start.x - Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(middleX, start.y))
                points.push(new Point2(middleX, endBottom))
                points.push(new Point2(end.x, endBottom))
              } else {
                points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
                points.push(new Point2(middleX, start.y))
                points.push(new Point2(middleX, endBottom))
                points.push(new Point2(end.x, endBottom))
              }
            } else {
              points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(end.x, start.y))
              points.push(new Point2(end.x, endBottom))
            }
            break
          }
          case ConnectorDirection.Right:
          default: {
            const margin = centerX - end.x
            if (margin > Connector.DEFAULT_ARROW_SEGMENT) {
              points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(centerX, start.y))
              points.push(new Point2(centerX, end.y))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            } else {
              points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
              points.push(new Point2(centerX, start.y))
              points.push(new Point2(centerX, end.y))
              points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
            }
            break
          }
        }
        break
      }
      case TargetPosition.Top: {
        switch (this.endDirection) {
          case ConnectorDirection.Left: {
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(minLeft, start.y))
            points.push(new Point2(minLeft, end.y))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            break
          }
          case ConnectorDirection.Top: {
            const startLeft = start.x - Connector.DEFAULT_ARROW_SEGMENT
            const endRight = end.x + (this._target!.width - this._targetJoint!.x)
            const endLeft = end.x - this._targetJoint!.x - Connector.DEFAULT_ARROW_SEGMENT
            if (startLeft < endLeft) {
              points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, end.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            } else if (start.x > endRight) {
              const middleX = (start.x + endRight) / 2
              if (start.x - middleX > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(middleX, start.y))
                points.push(new Point2(middleX, end.y - Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
              } else {
                points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
                points.push(new Point2(middleX, start.y))
                points.push(new Point2(middleX, end.y - Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
              }
            } else {
              points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(endLeft, start.y))
              points.push(new Point2(endLeft, end.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            }
            break
          }
          case ConnectorDirection.Bottom: {
            const startLeft = start.x - Connector.DEFAULT_ARROW_SEGMENT
            const startTop = start.y - this._sourceJoint!.y
            const middleY = (end.y + startTop) / 2
            if (startLeft > end.x) {
              points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(end.x, start.y))
              points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            } else {
              if (middleY - end.y > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, middleY))
                points.push(new Point2(end.x, middleY))
                points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
              } else {
                points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, middleY))
                points.push(new Point2(end.x, middleY))
                points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              }
            }
            break
          }
          case ConnectorDirection.Right:
          default: {
            const endBottom = end.y + (this._target!.height - this._targetJoint!.y)
            const startTop = start.y - this._sourceJoint!.y
            const middleY = (endBottom + startTop) / 2
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, middleY))
            points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, middleY))
            points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            break
          }
        }
        break
      }
      case TargetPosition.Right: {
        switch (this.endDirection) {
          case ConnectorDirection.Left: {
            const startBottom = start.y + this._source!.height - this._sourceJoint!.y + Connector.DEFAULT_ARROW_SEGMENT
            const startTop = start.y - this._sourceJoint!.y - Connector.DEFAULT_ARROW_SEGMENT
            const startRight = start.y + this._source!.width
            const middleX = (end.x + startRight) * 0.5
            if (end.y < startTop) {
              points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(minLeft, start.y))
              points.push(new Point2(minLeft, end.y))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            } else if (end.y > startBottom) {
              points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(minLeft, start.y))
              points.push(new Point2(minLeft, end.y))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            } else {
              if (middleX < end.x - Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(minLeft, start.y))
                points.push(new Point2(minLeft, minTop))
                points.push(new Point2(middleX, minTop))
                points.push(new Point2(middleX, end.y))
                points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
              } else {
                points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(minLeft, start.y))
                points.push(new Point2(minLeft, minTop))
                points.push(new Point2(middleX, minTop))
                points.push(new Point2(middleX, end.y))
                points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              }
            }
            break
          }
          case ConnectorDirection.Top: {
            const startTop = start.y - this._sourceJoint!.y - Connector.DEFAULT_ARROW_SEGMENT
            const startBottom = start.y + (this._source!.height - this._sourceJoint!.y)
            const endTop = end.y - Connector.DEFAULT_ARROW_SEGMENT
            const middleY = (startBottom + end.y) * 0.5
            if (startBottom < end.y) {
              if (middleY < endTop) {
                points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, middleY))
                points.push(new Point2(end.x, middleY))
                points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
              } else {
                points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, middleY))
                points.push(new Point2(end.x, middleY))
                points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              }
            } else if (startTop < endTop) {
              points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, minTop))
              points.push(new Point2(end.x, minTop))
              points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            } else {
              points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, endTop))
              points.push(new Point2(end.x, endTop))
              points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            }
            break
          }
          case ConnectorDirection.Bottom: {
            const startTop = start.y - this._sourceJoint!.y
            const middleY = (startTop + end.y) * 0.5
            if (startTop > end.y) {
              if (startTop - middleY > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, middleY))
                points.push(new Point2(end.x, middleY))
                points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
              } else {
                points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, middleY))
                points.push(new Point2(end.x, middleY))
                points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              }
            } else {
              points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, minBottom))
              points.push(new Point2(end.x, minBottom))
              points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            }
            break
          }
          case ConnectorDirection.Right:
          default: {
            const endBottom = end.y + (this._target!.height - this._targetJoint!.y)
            const startTop = start.y - this._sourceJoint!.y
            const startBottom = start.y + (this._source!.height - this._sourceJoint!.y)
            const endTop = end.y - this._targetJoint!.y
            const middleY1 = (startTop + endBottom) * 0.5
            const middleY2 = (startBottom + endTop) * 0.5
            if (startTop > endBottom) {
              points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, middleY1))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, middleY1))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            } else if (startBottom < endTop) {
              points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, middleY2))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, middleY2))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            } else {
              points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, minBottom))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, minBottom))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            }
            break
          }
        }
        break
      }
      case TargetPosition.Bottom: {
        switch (this.endDirection) {
          case ConnectorDirection.Left: {
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(minLeft, start.y))
            points.push(new Point2(minLeft, end.y))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            break
          }
          case ConnectorDirection.Top: {
            const startLeft = start.x - Connector.DEFAULT_ARROW_SEGMENT
            const startBottom = start.y + this._source!.height - this._sourceJoint!.y
            if (startLeft > end.x) {
              points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(end.x, start.y))
              points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            } else {
              const middleY = (startBottom + end.y) / 2
              if (middleY - startBottom > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, middleY))
                points.push(new Point2(end.x, middleY))
                points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
              } else {
                points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, middleY))
                points.push(new Point2(end.x, middleY))
                points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              }
            }
            break
          }
          case ConnectorDirection.Bottom: {
            const endRight = end.x + this._target!.width - this._targetJoint!.x
            const middleX = (endRight + start.x) / 2
            if (start.x > endRight) {
              if (start.x - middleX > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(middleX, start.y))
                points.push(new Point2(middleX, end.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
              } else {
                points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
                points.push(new Point2(middleX, start.y))
                points.push(new Point2(middleX, end.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
              }
            } else {
              points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(minLeft, start.y))
              points.push(new Point2(minLeft, end.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            }
            break
          }
          case ConnectorDirection.Right:
          default: {
            const endBottom = end.y + (this._target!.height - this._targetJoint!.y)
            const startTop = start.y - this._sourceJoint!.y
            const middleTop = (endBottom + startTop) / 2
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, middleTop))
            points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, middleTop))
            points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            break
          }
        }
        break
      }
      case TargetPosition.None:
      default: {
        switch (this.endDirection) {
          case ConnectorDirection.Left: {
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(minLeft, start.y))
            points.push(new Point2(minLeft, end.y))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            break
          }
          case ConnectorDirection.Top: {
            points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
            points.push(new Point2(end.x, start.y))
            points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
            break
          }
          case ConnectorDirection.Bottom: {
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(minLeft, start.y))
            points.push(new Point2(minLeft, minBottom))
            points.push(new Point2(end.x, minBottom))
            points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            break
          }
          case ConnectorDirection.Right:
          default: {
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, minTop))
            points.push(new Point2(minRight, minTop))
            points.push(new Point2(minRight, end.y))
            points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            break
          }
        }
        break
      }
    }
  }

  private initializeOrthogonalPointsTop(
    targetPosition: TargetPosition,
    points: Point2[],
    start: Point2,
    end: Point2,
    minLeft: number,
    minTop: number,
    minBottom: number,
    minRight: number,
    centerX: number,
    centerY: number,
  ) {
    switch (targetPosition) {
      case TargetPosition.Left: {
        switch (this.endDirection) {
          case ConnectorDirection.Left: {
            const startTop = start.y - Connector.DEFAULT_ARROW_SEGMENT
            const endTop = end.y - this._targetJoint!.y - Connector.DEFAULT_ARROW_SEGMENT
            const endBottom = end.y + this._target!.height - this._targetJoint!.y
            const middleY = (endBottom + start.y) / 2
            if (startTop < endTop) {
              points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            } else if (endBottom < start.y) {
              if (middleY - endBottom > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(start.x, middleY))
                points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, middleY))
                points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
              } else {
                points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
                points.push(new Point2(start.x, middleY))
                points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, middleY))
                points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
              }
            } else {
              points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(start.x, endTop))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, endTop))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            }
            break
          }
          case ConnectorDirection.Top: {
            const startTop = start.y - Connector.DEFAULT_ARROW_SEGMENT
            const endTop = end.y - Connector.DEFAULT_ARROW_SEGMENT
            if (startTop < endTop) {
              points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            } else {
              points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(start.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            }
            break
          }
          case ConnectorDirection.Bottom: {
            const startTop = start.y - Connector.DEFAULT_ARROW_SEGMENT
            const startLeft = start.x - this._sourceJoint!.x
            const endBottom = end.y + Connector.DEFAULT_ARROW_SEGMENT
            const endRight = end.x + this._target!.width - this._targetJoint!.x
            const middleX = (startLeft + endRight) * 0.5
            if (startTop > endBottom) {
              points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            } else {
              points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(middleX, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(middleX, end.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            }
            break
          }
          case ConnectorDirection.Right:
          default: {
            const startTop = start.y - Connector.DEFAULT_ARROW_SEGMENT
            const startLeft = start.x - this._sourceJoint!.x
            const middleX = (startLeft + end.x) * 0.5
            if (startTop > end.y) {
              points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(start.x, end.y))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            } else {
              if (middleX - end.x > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(middleX, start.y - Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(middleX, end.y))
                points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
              } else {
                points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(middleX, start.y - Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(middleX, end.y))
                points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              }
            }
            break
          }
        }
        break
      }
      case TargetPosition.Top: {
        switch (this.endDirection) {
          case ConnectorDirection.Left: {
            const endLeft = end.x - Connector.DEFAULT_ARROW_SEGMENT
            const endBottom = end.y + this._target!.height - this._targetJoint!.y
            const middleY = (endBottom + start.y) / 2
            if (endLeft > start.x) {
              points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(start.x, end.y))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            } else {
              if (middleY - endBottom > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(start.x, middleY))
                points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, middleY))
                points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
              } else {
                points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
                points.push(new Point2(start.x, middleY))
                points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, middleY))
                points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
              }
            }
            break
          }
          case ConnectorDirection.Top: {
            const endRight = end.x + (this._target!.width - this._targetJoint!.x) + Connector.DEFAULT_ARROW_SEGMENT
            const endLeft = end.x - this._targetJoint!.x - Connector.DEFAULT_ARROW_SEGMENT
            const endBottom = end.y + this._target!.height
            const middleY = (start.y + endBottom) / 2
            if (start.x < endLeft) {
              points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(start.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            } else if (start.x > endRight) {
              points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(start.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            } else {
              if (start.y - middleY > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(start.x, middleY))
                points.push(new Point2(endLeft, middleY))
                points.push(new Point2(endLeft, end.y - Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
              } else {
                points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
                points.push(new Point2(start.x, middleY))
                points.push(new Point2(endLeft, middleY))
                points.push(new Point2(endLeft, end.y - Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
              }
            }
            break
          }
          case ConnectorDirection.Bottom: {
            if (centerY - end.y > Connector.DEFAULT_ARROW_SEGMENT) {
              points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(start.x, centerY))
              points.push(new Point2(end.x, centerY))
              points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            } else {
              points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
              points.push(new Point2(start.x, centerY))
              points.push(new Point2(end.x, centerY))
              points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
            }
            break
          }
          case ConnectorDirection.Right:
          default: {
            const endBottom = end.y + (this._target!.height - this._targetJoint!.y)
            const endRight = end.y + Connector.DEFAULT_ARROW_SEGMENT
            const middleY = (endBottom + start.y) * 0.5
            if (start.x > endRight) {
              points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(start.x, end.y))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            } else {
              if (middleY - endBottom > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(start.x, middleY))
                points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, middleY))
                points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
              } else {
                points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
                points.push(new Point2(start.x, middleY))
                points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, middleY))
                points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
              }
            }
            break
          }
        }
        break
      }
      case TargetPosition.Right: {
        switch (this.endDirection) {
          case ConnectorDirection.Left: {
            const startTop = start.y - Connector.DEFAULT_ARROW_SEGMENT
            const startRight = start.x + this._source!.width - this._sourceJoint!.x
            const middleX = (end.x + startRight) * 0.5
            if (startTop > end.y) {
              points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(start.x, end.y))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            } else {
              if (end.x - middleX > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(middleX, start.y - Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(middleX, end.y))
                points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
              } else {
                points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(middleX, start.y - Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(middleX, end.y))
                points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              }
            }
            break
          }
          case ConnectorDirection.Top: {
            const startTop = start.y - Connector.DEFAULT_ARROW_SEGMENT
            const endTop = end.y - Connector.DEFAULT_ARROW_SEGMENT
            if (startTop < endTop) {
              points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            } else {
              points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(start.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            }
            break
          }
          case ConnectorDirection.Bottom: {
            const startRight = start.x + this._source!.width - this._sourceJoint!.x
            const endLeft = end.x - this._targetJoint!.x
            const middleY = (start.y + end.y) * 0.5
            const middleX = (startRight + endLeft) * 0.5
            if (start.y > end.x) {
              if (start.y - middleY > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(start.x, middleY))
                points.push(new Point2(end.x, middleY))
                points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
              } else {
                points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
                points.push(new Point2(start.x, middleY))
                points.push(new Point2(end.x, middleY))
                points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              }
            } else {
              points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(middleX, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(middleX, end.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            }
            break
          }
          case ConnectorDirection.Right:
          default: {
            const endBottom = end.y + (this._target!.height - this._targetJoint!.y)
            const startTop = start.y - Connector.DEFAULT_ARROW_SEGMENT
            const endTop = end.y - this._targetJoint!.y - Connector.DEFAULT_ARROW_SEGMENT
            const middleY = (start.y + endBottom) * 0.5
            if (start.y > endBottom) {
              if (start.y - middleY > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(start.x, middleY))
                points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, middleY))
                points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
              } else {
                points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
                points.push(new Point2(start.x, middleY))
                points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, middleY))
                points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
              }
            } else if (startTop < endTop) {
              points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            } else {
              points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(start.x, endTop))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, endTop))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            }
            break
          }
        }
        break
      }
      case TargetPosition.Bottom: {
        switch (this.endDirection) {
          case ConnectorDirection.Left: {
            const startLeft = start.x - this._sourceJoint!.x - Connector.DEFAULT_ARROW_SEGMENT
            const endLeft = end.x - Connector.DEFAULT_ARROW_SEGMENT
            if (startLeft > endLeft) {
              points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(endLeft, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(endLeft, start.y))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            } else {
              points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(startLeft, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(startLeft, end.y))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            }
            break
          }
          case ConnectorDirection.Top: {
            const startLeft = start.x - this._sourceJoint!.x - Connector.DEFAULT_ARROW_SEGMENT
            const startRight = start.x + this._source!.width - this._sourceJoint!.x + Connector.DEFAULT_ARROW_SEGMENT
            const startBottom = start.y + this._source!.height
            const middleY = (startBottom + end.y) * 0.5
            if (end.x < startLeft) {
              points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            } else if (end.x > startRight) {
              points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            } else {
              if (end.y - middleY > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(startLeft, start.y - Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(startLeft, middleY))
                points.push(new Point2(end.x, middleY))
                points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
              } else {
                points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(startLeft, start.y - Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(startLeft, middleY))
                points.push(new Point2(end.x, middleY))
                points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              }
            }
            break
          }
          case ConnectorDirection.Bottom: {
            const startLeft = start.x - this._sourceJoint!.x
            const startRight = start.x + this._source!.width - this._sourceJoint!.x
            const endLeft = end.x - this._targetJoint!.x
            const endRight = end.x + this._target!.width - this._targetJoint!.x
            const middleX1 = (startLeft + endRight) * 0.5
            const middleX2 = (startRight + endLeft) * 0.5
            if (startLeft > endRight) {
              points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(middleX1, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(middleX1, end.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            } else if (endLeft > startRight) {
              points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(middleX2, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(middleX2, end.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            } else {
              points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(minLeft, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(minLeft, end.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            }
            break
          }
          case ConnectorDirection.Right:
          default: {
            const startLeft = start.x - this._sourceJoint!.x
            const middleX = (startLeft + end.x) * 0.5
            if (startLeft > end.x) {
              if (middleX - end.x > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(middleX, start.y - Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(middleX, end.y))
                points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
              } else {
                points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(middleX, start.y - Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(middleX, end.y))
                points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              }
            } else {
              points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(minRight, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(minRight, end.y))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            }
            break
          }
        }
        break
      }
      case TargetPosition.None:
      default: {
        switch (this.endDirection) {
          case ConnectorDirection.Left: {
            points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(minLeft, start.y))
            points.push(new Point2(minLeft, end.y))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            break
          }
          case ConnectorDirection.Top: {
            const middleY = (start.y + end.y) * 0.5
            if (middleY - start.y > Connector.DEFAULT_ARROW_SEGMENT) {
              points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(start.x, middleY))
              points.push(new Point2(end.x, middleY))
              points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            } else {
              points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
              points.push(new Point2(start.x, middleY))
              points.push(new Point2(end.x, middleY))
              points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
            }
            break
          }
          case ConnectorDirection.Bottom: {
            points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(minLeft, start.y - Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(minLeft, minBottom))
            points.push(new Point2(end.x, minBottom))
            points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            break
          }
          case ConnectorDirection.Right:
          default: {
            points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(start.x, minTop))
            points.push(new Point2(minRight, minTop))
            points.push(new Point2(minRight, end.y))
            points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            break
          }
        }
        break
      }
    }
  }

  private initializeOrthogonalPointsRight(
    targetPosition: TargetPosition,
    points: Point2[],
    start: Point2,
    end: Point2,
    minLeft: number,
    minTop: number,
    minBottom: number,
    minRight: number,
    centerX: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    centerY: number,
  ) {
    //console.log(`target direction = ${targetPosition}`)
    //console.log(`end direction = ${this.endDirection}`)
    switch (targetPosition) {
      case TargetPosition.Left: {
        switch (this.endDirection) {
          case ConnectorDirection.Left: {
            const endBottom = end.y + (this._target!.height - this._targetJoint!.y)
            const startTop = start.y - this._sourceJoint!.y
            const endTop = end.y - this._targetJoint!.y
            const startBottom = start.y + (this._source!.height - this._sourceJoint!.y)
            if (endBottom < startTop) {
              const middleTop = (endBottom + startTop) / 2
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, middleTop))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, middleTop))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            } else if (startBottom < endTop) {
              const middleTop = (startBottom + endTop) / 2
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, middleTop))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, middleTop))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            } else {
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, minTop))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, minTop))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            }
            break
          }
          case ConnectorDirection.Top: {
            const endTop = end.y - this._targetJoint!.y
            const startBottom = start.y + (this._source!.height - this._sourceJoint!.y)
            if (startBottom < endTop) {
              const middleY = (startBottom + endTop) / 2
              if (middleY - startBottom > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, middleY))
                points.push(new Point2(end.x, middleY))
                points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
              } else {
                points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, middleY))
                points.push(new Point2(end.x, middleY))
                points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              }
            } else {
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, minTop))
              points.push(new Point2(end.x, minTop))
              points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            }
            break
          }
          case ConnectorDirection.Bottom: {
            const endBottom = end.y + (this._target!.height - this._targetJoint!.y)
            const startTop = start.y - this._sourceJoint!.y
            if (endBottom < startTop) {
              const middleTop = (endBottom + startTop) / 2
              if (middleTop - endBottom > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, middleTop))
                points.push(new Point2(end.x, middleTop))
                points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
              } else {
                points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, middleTop))
                points.push(new Point2(end.x, middleTop))
                points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              }
            } else {
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, minBottom))
              points.push(new Point2(end.x, minBottom))
              points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            }
            break
          }
          case ConnectorDirection.Right:
          default: {
            const startTop = start.y - this._sourceJoint!.y - Connector.DEFAULT_ARROW_SEGMENT
            const startBottom = start.y + (this._source!.height - this._sourceJoint!.y) + Connector.DEFAULT_ARROW_SEGMENT
            const startLeft = start.x - this._source!.width
            const middleX = (end.x + startLeft) / 2
            if (end.y < startTop) {
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            } else if (end.y > startBottom) {
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            } else {
              if (middleX - start.x > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, startBottom))
                points.push(new Point2(middleX, startBottom))
                points.push(new Point2(middleX, end.y))
                points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
              } else {
                points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, startBottom))
                points.push(new Point2(middleX, startBottom))
                points.push(new Point2(middleX, end.y))
                points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              }
            }
            break
          }
        }
        break
      }
      case TargetPosition.Top: {
        switch (this.endDirection) {
          case ConnectorDirection.Left: {
            const endBottom = end.y + (this._target!.height - this._targetJoint!.y)
            const startTop = start.y - this._sourceJoint!.y
            const middleY = (endBottom + startTop) / 2
            const middleX = (start.x + end.x) / 2
            if (start.x < end.x) {
              if (middleX - start.x > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(middleX, start.y))
                points.push(new Point2(middleX, end.y))
                points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
              } else {
                points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
                points.push(new Point2(middleX, start.y))
                points.push(new Point2(middleX, end.y))
                points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              }
            } else {
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, middleY))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, middleY))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            }
            break
          }
          case ConnectorDirection.Top: {
            const endLeft = end.x - this._targetJoint!.x
            const middleX = (start.x + endLeft) / 2
            if (start.x < endLeft) {
              if (middleX - start.x > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(middleX, start.y))
                points.push(new Point2(middleX, end.y - Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
              } else {
                points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
                points.push(new Point2(middleX, start.y))
                points.push(new Point2(middleX, end.y - Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
              }
            } else {
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(minRight, start.y))
              points.push(new Point2(minRight, end.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            }
            break
          }
          case ConnectorDirection.Bottom: {
            const startRight = start.x + Connector.DEFAULT_ARROW_SEGMENT
            const startTop = start.y - this._sourceJoint!.y
            const middleY = (end.y + startTop) / 2
            if (startRight < end.x) {
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(end.x, start.y))
              points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            } else {
              if (middleY - end.y > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, middleY))
                points.push(new Point2(end.x, middleY))
                points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
              } else {
                points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, middleY))
                points.push(new Point2(end.x, middleY))
                points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              }
            }
            break
          }
          case ConnectorDirection.Right:
          default: {
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(minRight, start.y))
            points.push(new Point2(minRight, end.y))
            points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            break
          }
        }
        break
      }
      case TargetPosition.Right: {
        switch (this.endDirection) {
          case ConnectorDirection.Left: {
            const margin = centerX - start.x
            if (margin > Connector.DEFAULT_ARROW_SEGMENT) {
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(centerX, start.y))
              points.push(new Point2(centerX, end.y))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            } else {
              points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
              points.push(new Point2(centerX, start.y))
              points.push(new Point2(centerX, end.y))
              points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
            }
            break
          }
          case ConnectorDirection.Top: {
            const endTop = end.y - Connector.DEFAULT_ARROW_SEGMENT
            const endLeft = end.x - this._targetJoint!.x
            const middleX = (start.x + endLeft) * 0.5
            if (start.y > endTop) {
              if (middleX - start.x > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(middleX, start.y))
                points.push(new Point2(middleX, end.y - Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
              } else {
                points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
                points.push(new Point2(middleX, start.y))
                points.push(new Point2(middleX, end.y - Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
              }
            } else {
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(end.x, start.y))
              points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            }
            break
          }
          case ConnectorDirection.Bottom: {
            const endBottom = end.y + Connector.DEFAULT_ARROW_SEGMENT
            const endLeft = end.x - this._targetJoint!.x
            const middleX = (start.x + endLeft) * 0.5
            if (start.y > endBottom) {
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(end.x, start.y))
              points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            } else {
              if (middleX - start.x > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(middleX, start.y))
                points.push(new Point2(middleX, end.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
              } else {
                points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
                points.push(new Point2(middleX, start.y))
                points.push(new Point2(middleX, end.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
              }
            }
            break
          }
          case ConnectorDirection.Right:
          default: {
            const endBottom = end.y + this._target!.height - this._targetJoint!.y + Connector.DEFAULT_ARROW_SEGMENT
            const endTop = end.y - this._targetJoint!.y - Connector.DEFAULT_ARROW_SEGMENT
            const endLeft = end.x - this._target!.width
            const middleX = (start.x + endLeft) / 2
            if (start.y > endBottom) {
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            } else if (start.y < endTop) {
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            } else {
              if (middleX - start.x > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(middleX, start.y))
                points.push(new Point2(middleX, endTop))
                points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, endTop))
                points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
              } else {
                points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
                points.push(new Point2(middleX, start.y))
                points.push(new Point2(middleX, endTop))
                points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, endTop))
                points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
              }
            }
            break
          }
        }
        break
      }
      case TargetPosition.Bottom: {
        switch (this.endDirection) {
          case ConnectorDirection.Left: {
            const endTop = end.y - this._targetJoint!.y
            const startBottom = start.y + (this._source!.height - this._sourceJoint!.y)
            const middleY = (endTop + startBottom) / 2
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, middleY))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, middleY))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            break
          }
          case ConnectorDirection.Top: {
            const endTop = end.y - this._targetJoint!.y
            const startRight = start.x + Connector.DEFAULT_ARROW_SEGMENT
            const startBottom = start.y + (this._source!.height - this._sourceJoint!.y)
            const middleY = (endTop + startBottom) / 2
            if (startRight < end.x) {
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(end.x, start.y))
              points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            } else {
              if (end.y - middleY > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, middleY))
                points.push(new Point2(end.x, middleY))
                points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
              } else {
                points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, middleY))
                points.push(new Point2(end.x, middleY))
                points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              }
            }
            break
          }
          case ConnectorDirection.Bottom: {
            const startRight = start.x + Connector.DEFAULT_ARROW_SEGMENT
            const endRight = end.x + this._target!.width - this._targetJoint!.x + Connector.DEFAULT_ARROW_SEGMENT
            const endLeft = end.x - this._targetJoint!.x
            const middleX = (start.x + endLeft) / 2
            if (startRight > endRight) {
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, end.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            } else if (start.x < endLeft) {
              if (middleX - start.x > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(middleX, start.y))
                points.push(new Point2(middleX, end.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
              } else {
                points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
                points.push(new Point2(middleX, start.y))
                points.push(new Point2(middleX, end.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
              }
            } else {
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(endRight, start.y))
              points.push(new Point2(endRight, end.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            }
            break
          }
          case ConnectorDirection.Right:
          default: {
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(minRight, start.y))
            points.push(new Point2(minRight, end.y))
            points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            break
          }
        }
        break
      }
      case TargetPosition.None:
      default: {
        switch (this.endDirection) {
          case ConnectorDirection.Left: {
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, minTop))
            points.push(new Point2(minLeft, minTop))
            points.push(new Point2(minLeft, end.y))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            break
          }
          case ConnectorDirection.Top: {
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, minTop))
            points.push(new Point2(end.x, minTop))
            points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            break
          }
          case ConnectorDirection.Bottom: {
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, minBottom))
            points.push(new Point2(end.x, minBottom))
            points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            break
          }
          case ConnectorDirection.Right:
          default: {
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(minRight, start.y))
            points.push(new Point2(minRight, end.y))
            points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            break
          }
        }
        break
      }
    }
  }

  private initializeOrthogonalPointsBottom(
    targetPosition: TargetPosition,
    points: Point2[],
    start: Point2,
    end: Point2,
    minLeft: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    minTop: number,
    minBottom: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    minRight: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    centerX: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    centerY: number,
  ) {
    switch (targetPosition) {
      case TargetPosition.Left: {
        switch (this.endDirection) {
          case ConnectorDirection.Left: {
            const endTop = end.y - this._targetJoint!.y
            const endBottom = end.y + (this._target!.height - this._targetJoint!.y)
            const middleY = (start.y + endTop) * 0.5
            if (start.y > endBottom) {
              points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            } else if (start.y > endTop) {
              points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(start.x, minBottom))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, minBottom))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            } else {
              if (middleY - start.y > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(start.x, middleY))
                points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, middleY))
                points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
              } else {
                points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
                points.push(new Point2(start.x, middleY))
                points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, middleY))
                points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
              }
            }
            break
          }
          case ConnectorDirection.Top: {
            const startLeft = start.x - this._sourceJoint!.x
            const endRight = end.x + this._target!.width - this._targetJoint!.x
            const middleX = (startLeft + endRight) * 0.5
            const middleY = (start.y + end.y) * 0.5
            if (start.y < end.y) {
              if (middleY - start.y > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(start.x, middleY))
                points.push(new Point2(end.x, middleY))
                points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
              } else {
                points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
                points.push(new Point2(start.x, middleY))
                points.push(new Point2(end.x, middleY))
                points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              }
            } else {
              points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(middleX, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(middleX, end.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            }
            break
          }
          case ConnectorDirection.Bottom: {
            if (start.y < end.y) {
              points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(start.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            } else {
              points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            }
            break
          }
          case ConnectorDirection.Right:
          default: {
            const startBegin = start.x - this._sourceJoint!.x
            const middleX = (startBegin + end.x) * 0.5
            if (start.y < end.y) {
              if (end.y - start.y > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(start.x, end.y))
                points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
              } else {
                points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
                points.push(new Point2(start.x, end.y))
                points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
              }
            } else {
              if (middleX - end.x > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(middleX, start.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(middleX, end.y))
                points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
              } else {
                points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(middleX, start.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(middleX, end.y))
                points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              }
            }
            break
          }
        }
        break
      }
      case TargetPosition.Top: {
        switch (this.endDirection) {
          case ConnectorDirection.Left: {
            const startRight = start.x + this._source!.width - this._sourceJoint!.x
            const middleX = (startRight + end.x) * 0.5
            if (startRight < end.x) {
              if (end.x - middleX > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(middleX, start.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(middleX, end.y))
                points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
              } else {
                points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(middleX, start.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(middleX, end.y))
                points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              }
            } else {
              points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(minLeft, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(minLeft, end.y))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            }
            break
          }
          case ConnectorDirection.Top: {
            const startLeft = start.x - this._sourceJoint!.x
            const startRight = start.x + this._source!.width - this._sourceJoint!.x
            const endLeft = end.x - this.targetJoint!.x
            const endRight = end.x + this._target!.width - this._targetJoint!.x
            const middleX1 = (startRight + endLeft) * 0.5
            const middleX2 = (startLeft + endRight) * 0.5
            if (startRight < endLeft) {
              points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(middleX1, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(middleX1, end.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            } else if (startLeft > endRight) {
              points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(middleX2, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(middleX2, end.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            } else {
              points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(minLeft, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(minLeft, end.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            }
            break
          }
          case ConnectorDirection.Bottom: {
            const startLeft = start.x - this._sourceJoint!.x
            const startLeft2 = start.x - this._sourceJoint!.x - Connector.DEFAULT_ARROW_SEGMENT
            const startRight = start.x + this._source!.width - this._sourceJoint!.x
            const startTop = start.y - this._target!.height
            const middleY = (startTop + end.y) * 0.5
            if (startRight < end.x) {
              points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            } else if (startLeft > end.x) {
              points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            } else {
              if (middleY - end.y > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(startLeft2, start.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(startLeft2, middleY))
                points.push(new Point2(end.x, middleY))
                points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
              } else {
                points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(startLeft2, start.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(startLeft2, middleY))
                points.push(new Point2(end.x, middleY))
                points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              }
            }
            break
          }
          case ConnectorDirection.Right:
          default: {
            const startRight = start.x + this._source!.width - this._sourceJoint!.x
            const startRight2 = start.x + this._source!.width - this._sourceJoint!.x + Connector.DEFAULT_ARROW_SEGMENT
            const startLeft = start.x - this._sourceJoint!.x
            const middleX = (startLeft + end.x) * 0.5
            if (startRight < end.x) {
              points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            } else if (startLeft > end.x) {
              if (end.x - middleX > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(middleX, start.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(middleX, end.y))
                points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
              } else {
                points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(middleX, start.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(middleX, end.y))
                points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              }
            } else {
              points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(startRight2, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(startRight2, end.y))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            }
            break
          }
        }
        break
      }
      case TargetPosition.Right: {
        switch (this.endDirection) {
          case ConnectorDirection.Left: {
            const startRight = start.x + this._source!.width - this._sourceJoint!.x
            const middleX = (end.x + startRight) * 0.5
            if (start.y < end.y) {
              if (end.y - start.y > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(start.x, end.y))
                points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
              } else {
                points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
                points.push(new Point2(start.x, end.y))
                points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
              }
            } else {
              if (end.x - middleX > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(middleX, start.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(middleX, end.y))
                points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
              } else {
                points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(middleX, start.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(middleX, end.y))
                points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              }
            }
            break
          }
          case ConnectorDirection.Top: {
            const startRight = start.x + this._source!.width - this._sourceJoint!.x
            const endLeft = end.x - this._targetJoint!.x
            const middleY = (start.y + end.y) * 0.5
            const middleX = (startRight + endLeft) * 0.5
            if (start.y < end.y) {
              if (middleY - start.y > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(start.x, middleY))
                points.push(new Point2(end.x, middleY))
                points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
              } else {
                points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
                points.push(new Point2(start.x, middleY))
                points.push(new Point2(end.x, middleY))
                points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              }
            } else {
              points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(middleX, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(middleX, end.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            }
            break
          }
          case ConnectorDirection.Bottom: {
            if (start.y > end.y) {
              points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            } else {
              points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(start.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            }
            break
          }
          case ConnectorDirection.Right:
          default: {
            const endBottom = end.y + (this._target!.height - this._targetJoint!.y)
            const endBottom2 = end.y + (this._target!.height - this._targetJoint!.y) + Connector.DEFAULT_ARROW_SEGMENT
            const endTop = end.y - this._targetJoint!.y
            const middleY = (start.x + endTop) * 0.5
            if (start.y > endBottom) {
              points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            } else if (start.y < endTop) {
              if (middleY - start.x > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(start.x, middleY))
                points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, middleY))
                points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
              } else {
                points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
                points.push(new Point2(start.x, middleY))
                points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, middleY))
                points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
              }
            } else {
              points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(start.x, endBottom2))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, endBottom2))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            }
            break
          }
        }
        break
      }
      case TargetPosition.Bottom: {
        switch (this.endDirection) {
          case ConnectorDirection.Left: {
            const endTop = end.y - this._targetJoint!.y
            const middleY = (start.y + endTop) * 0.5
            if (start.x < end.x) {
              if (end.x - start.x > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(start.x, end.y))
                points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
              } else {
                points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(start.x, end.y))
                points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              }
            } else {
              if (middleY - start.y > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(start.x, middleY))
                points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, middleY))
                points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
              } else {
                points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
                points.push(new Point2(start.x, middleY))
                points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, middleY))
                points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
              }
            }
            break
          }
          case ConnectorDirection.Top: {
            const middleY = (start.y + end.y) * 0.5
            if (middleY - start.y > Connector.DEFAULT_ARROW_SEGMENT) {
              points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(start.x, middleY))
              points.push(new Point2(end.x, middleY))
              points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            } else {
              points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
              points.push(new Point2(start.x, middleY))
              points.push(new Point2(end.x, middleY))
              points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
            }
            break
          }
          case ConnectorDirection.Bottom: {
            const endRight = end.x + this._target!.width - this._targetJoint!.x
            const endLeft = end.x - this._targetJoint!.x
            const endLeft2 = end.x - this._targetJoint!.x - Connector.DEFAULT_ARROW_SEGMENT
            const endTop = end.y - this._target!.height
            const middleY = (endTop + start.y) / 2
            if (start.x > endRight) {
              points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(start.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            } else if (start.x < endLeft) {
              points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(start.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            } else {
              if (middleY - start.x > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(start.x, middleY))
                points.push(new Point2(endLeft2, middleY))
                points.push(new Point2(endLeft2, end.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
              } else {
                points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
                points.push(new Point2(start.x, middleY))
                points.push(new Point2(endLeft2, middleY))
                points.push(new Point2(endLeft2, end.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
              }
            }
            break
          }
          case ConnectorDirection.Right:
          default: {
            const endTop = end.y - this._targetJoint!.y
            const middleY = (start.y + endTop) / 2
            if (start.x > end.x) {
              if (start.x - end.x > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(start.x, end.y))
                points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
              } else {
                points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(start.x, end.y))
                points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              }
            } else {
              if (middleY - start.y > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(start.x, middleY))
                points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, middleY))
                points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
              } else {
                points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
                points.push(new Point2(start.x, middleY))
                points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, middleY))
                points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
              }
            }
            break
          }
        }
        break
      }
      case TargetPosition.None:
      default: {
        switch (this.endDirection) {
          case ConnectorDirection.Left: {
            points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, start.y + Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            break
          }
          case ConnectorDirection.Top: {
            const endLeft = end.x - this._targetJoint!.x - Connector.DEFAULT_ARROW_SEGMENT
            points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(endLeft, start.y + Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(endLeft, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            break
          }
          case ConnectorDirection.Bottom: {
            if (start.y > end.y) {
              points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            } else {
              points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(start.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            }
            break
          }
          case ConnectorDirection.Right:
          default: {
            points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, start.y + Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            break
          }
        }
        break
      }
    }
  }

  private detectArrowDirection(start: Point2, end: Point2) {
    const horizontal = Math.abs(start.x - end.x) >= Math.abs(start.y - end.y)
    if (start.x >= end.x) {
      if (start.y >= end.y) {
        if (horizontal) {
          return ConnectorDirection.Left
        } else {
          return ConnectorDirection.Top
        }
      } else {
        if (horizontal) {
          return ConnectorDirection.Left
        } else {
          return ConnectorDirection.Bottom
        }
      }
    } else {
      if (start.y >= end.y) {
        if (horizontal) {
          return ConnectorDirection.Right
        } else {
          return ConnectorDirection.Top
        }
      } else {
        if (horizontal) {
          return ConnectorDirection.Right
        } else {
          return ConnectorDirection.Bottom
        }
      }
    }
  }
  private initializeOrthogonalPointsLeftWithoutTarget(targetPosition: TargetPosition, points: Point2[], start: Point2, end: Point2) {
    const arrowDirection = this.detectArrowDirection(start, end)
    switch (targetPosition) {
      case TargetPosition.Left: {
        switch (arrowDirection) {
          case ConnectorDirection.Top: {
            if (Math.abs(end.x - start.x) > Connector.DEFAULT_ARROW_SEGMENT) {
              if (Math.abs(end.y - start.y) > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(end.x, start.y))
                points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
                this.endDirection = ConnectorDirection.Bottom
              } else {
                points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(end.x, start.y))
                points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
                this.endDirection = ConnectorDirection.Bottom
              }
            } else {
              if (Math.abs(end.y - start.y) > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
                points.push(new Point2(end.x, start.y))
                points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
                this.endDirection = ConnectorDirection.Bottom
              } else {
                points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
                points.push(new Point2(end.x, start.y))
                points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
                this.endDirection = ConnectorDirection.Bottom
              }
            }
            break
          }
          case ConnectorDirection.Bottom: {
            if (Math.abs(end.x - start.x) > Connector.DEFAULT_ARROW_SEGMENT) {
              if (Math.abs(end.y - start.y) > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(end.x, start.y))
                points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
                this.endDirection = ConnectorDirection.Top
              } else {
                points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(end.x, start.y))
                points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
                this.endDirection = ConnectorDirection.Top
              }
            } else {
              if (Math.abs(end.y - start.y) > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
                points.push(new Point2(end.x, start.y))
                points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
                this.endDirection = ConnectorDirection.Top
              } else {
                points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
                points.push(new Point2(end.x, start.y))
                points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
                this.endDirection = ConnectorDirection.Top
              }
            }
            break
          }
          case ConnectorDirection.Left:
          default: {
            const middleX = (start.x + end.x) * 0.5
            if (Math.abs(middleX - start.x) > Connector.DEFAULT_ARROW_SEGMENT) {
              points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(middleX, start.y))
              points.push(new Point2(middleX, end.y))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
              this.endDirection = ConnectorDirection.Right
            } else {
              points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
              points.push(new Point2(middleX, start.y))
              points.push(new Point2(middleX, end.y))
              points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              this.endDirection = ConnectorDirection.Right
            }
            break
          }
        }
        break
      }
      case TargetPosition.Top: {
        const startTop = start.y - this._sourceJoint!.y - Connector.DEFAULT_ARROW_SEGMENT
        const startRight = start.x + this._source!.width - this._sourceJoint!.x
        const middleX = (start.x + end.x) * 0.5
        if (end.y < startTop) {
          if (end.x > startRight) {
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            this.endDirection = ConnectorDirection.Left
          } else if (end.x > start.x) {
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            this.endDirection = ConnectorDirection.Bottom
          } else {
            if (middleX - end.x > Connector.DEFAULT_ARROW_SEGMENT) {
              points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(middleX, start.y))
              points.push(new Point2(middleX, end.y))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
              this.endDirection = ConnectorDirection.Right
            } else {
              points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
              points.push(new Point2(middleX, start.y))
              points.push(new Point2(middleX, end.y))
              points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              this.endDirection = ConnectorDirection.Bottom
            }
          }
        } else {
          points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
          points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
          this.endDirection = ConnectorDirection.Left
        }
        break
      }
      case TargetPosition.Bottom: {
        const startBottom = start.y + this._source!.height - this._sourceJoint!.y + Connector.DEFAULT_ARROW_SEGMENT
        const middleX = (start.x + end.x) * 0.5
        if (end.y > startBottom) {
          if (end.x > start.x) {
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            this.endDirection = ConnectorDirection.Top
          } else {
            if (middleX - end.x > Connector.DEFAULT_ARROW_SEGMENT) {
              points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(middleX, start.y))
              points.push(new Point2(middleX, end.y))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
              this.endDirection = ConnectorDirection.Right
            } else {
              points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
              points.push(new Point2(middleX, start.y))
              points.push(new Point2(middleX, end.y))
              points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              this.endDirection = ConnectorDirection.Top
            }
          }
        } else {
          points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
          points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
          this.endDirection = ConnectorDirection.Left
        }
        break
      }
      case TargetPosition.Right: {
        const startTop = start.y - this._sourceJoint!.y - Connector.DEFAULT_ARROW_SEGMENT
        const startBottom = start.y + this._source!.height - this._sourceJoint!.y + Connector.DEFAULT_ARROW_SEGMENT
        if (end.y < startTop) {
          points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
          points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
          this.endDirection = ConnectorDirection.Left
        } else if (end.y > startBottom) {
          points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
          points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
          this.endDirection = ConnectorDirection.Left
        } else {
          points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, startTop))
          points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, startTop))
          points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
          this.endDirection = ConnectorDirection.Left
        }
        break
      }
      case TargetPosition.None:
      default: {
        const middleX = (start.x + end.x) * 0.5
        if (Math.abs(middleX - start.x) > Connector.DEFAULT_ARROW_SEGMENT) {
          points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(middleX, start.y))
          points.push(new Point2(middleX, end.y))
          points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
          this.endDirection = ConnectorDirection.Left
        } else {
          points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
          points.push(new Point2(middleX, start.y))
          points.push(new Point2(middleX, end.y))
          points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
          this.endDirection = ConnectorDirection.Left
        }
        break
      }
    }
  }

  private initializeOrthogonalPointsTopWithoutTarget(targetPosition: TargetPosition, points: Point2[], start: Point2, end: Point2) {
    const arrowDirection = this.detectArrowDirection(start, end)
    switch (targetPosition) {
      case TargetPosition.Left: {
        const startLeft = start.x - this._sourceJoint!.x - Connector.DEFAULT_ARROW_SEGMENT
        const startTop = start.y - this._sourceJoint!.y - Connector.DEFAULT_ARROW_SEGMENT
        const startTop2 = start.y - this._sourceJoint!.y
        if (end.x < startLeft) {
          if (end.y < startTop) {
            if (arrowDirection === ConnectorDirection.Top) {
              const middleY = (start.y + end.y) * 0.5
              if (Math.abs(middleY - start.y) > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
                points.push(new Point2(start.x, middleY))
                points.push(new Point2(end.x, middleY))
                points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
                this.endDirection = ConnectorDirection.Bottom
              } else {
                points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
                points.push(new Point2(start.x, middleY))
                points.push(new Point2(end.x, middleY))
                points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
                this.endDirection = ConnectorDirection.Bottom
              }
            } else {
              points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(start.x, end.y))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
              this.endDirection = ConnectorDirection.Right
            }
          } else {
            if (arrowDirection === ConnectorDirection.Bottom) {
              points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
              this.endDirection = ConnectorDirection.Top
            } else {
              points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
              this.endDirection = ConnectorDirection.Right
            }
          }
        } else {
          if (end.y < startTop) {
            points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(start.x, end.y))
            points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            this.endDirection = ConnectorDirection.Right
          } else if (end.y < startTop2) {
            points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
            points.push(new Point2(start.x, end.y))
            points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
            this.endDirection = ConnectorDirection.Right
          } else {
            points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            this.endDirection = ConnectorDirection.Top
          }
        }
        break
      }
      case TargetPosition.Top: {
        const startRight = start.x + this._source!.width - this._sourceJoint!.x
        const middleY = (start.y + end.y) * 0.5
        if (end.x > startRight) {
          if (arrowDirection === ConnectorDirection.Top) {
            const middleY = (start.y + end.y) * 0.5
            if (Math.abs(middleY - start.y) > Connector.DEFAULT_ARROW_SEGMENT) {
              points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(start.x, middleY))
              points.push(new Point2(end.x, middleY))
              points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
              this.endDirection = ConnectorDirection.Bottom
            } else {
              points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
              points.push(new Point2(start.x, middleY))
              points.push(new Point2(end.x, middleY))
              points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              this.endDirection = ConnectorDirection.Bottom
            }
          } else {
            if (Math.abs(middleY - start.y) > Connector.DEFAULT_ARROW_SEGMENT) {
              points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(start.x, end.y))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
              this.endDirection = ConnectorDirection.Left
            } else {
              points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
              points.push(new Point2(start.x, end.y))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
              this.endDirection = ConnectorDirection.Left
            }
          }
        } else {
          if (Math.abs(middleY - start.y) > Connector.DEFAULT_ARROW_SEGMENT) {
            points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(start.x, middleY))
            points.push(new Point2(end.x, middleY))
            points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            this.endDirection = ConnectorDirection.Bottom
          } else {
            points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
            points.push(new Point2(start.x, middleY))
            points.push(new Point2(end.x, middleY))
            points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
            this.endDirection = ConnectorDirection.Bottom
          }
        }
        break
      }
      case TargetPosition.Bottom: {
        const startLeft = start.x - this._sourceJoint!.x - Connector.DEFAULT_ARROW_SEGMENT
        const startRight = start.x + this._source!.width - this._sourceJoint!.x + Connector.DEFAULT_ARROW_SEGMENT
        if (end.x < startLeft) {
          points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
          points.push(new Point2(end.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
          points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
          this.endDirection = ConnectorDirection.Top
        } else if (end.x > startRight) {
          points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
          points.push(new Point2(end.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
          points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
          this.endDirection = ConnectorDirection.Top
        } else {
          points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
          points.push(new Point2(startLeft, start.y - Connector.DEFAULT_ARROW_SEGMENT))
          points.push(new Point2(startLeft, end.y - Connector.DEFAULT_ARROW_SEGMENT))
          points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
          this.endDirection = ConnectorDirection.Top
        }
        break
      }
      case TargetPosition.Right: {
        const startTop = start.y - this._sourceJoint!.y - Connector.DEFAULT_ARROW_SEGMENT
        const startTop2 = start.y - this._sourceJoint!.y
        const startRight = start.x + this._source!.width - this._sourceJoint!.x + Connector.DEFAULT_ARROW_SEGMENT
        if (end.x > startRight) {
          if (end.y < startTop) {
            points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(start.x, end.y))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            this.endDirection = ConnectorDirection.Left
          } else {
            if (arrowDirection === ConnectorDirection.Bottom) {
              points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
              this.endDirection = ConnectorDirection.Top
            } else {
              points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, start.y - Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
              this.endDirection = ConnectorDirection.Left
            }
          }
        } else {
          if (end.y < startTop) {
            points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(start.x, end.y))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            this.endDirection = ConnectorDirection.Left
          } else if (end.y < startTop2) {
            points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
            points.push(new Point2(start.x, end.y))
            points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
            this.endDirection = ConnectorDirection.Left
          } else {
            points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            this.endDirection = ConnectorDirection.Top
          }
        }
        break
      }
      case TargetPosition.None:
      default: {
        const middleY = (start.y + end.y) * 0.5
        if (Math.abs(middleY - start.y) > Connector.DEFAULT_ARROW_SEGMENT) {
          points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
          points.push(new Point2(start.x, middleY))
          points.push(new Point2(end.x, middleY))
          points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
          this.endDirection = ConnectorDirection.Top
        } else {
          points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
          points.push(new Point2(start.x, middleY))
          points.push(new Point2(end.x, middleY))
          points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
          this.endDirection = ConnectorDirection.Top
        }
        break
      }
    }
  }

  private initializeOrthogonalPointsRightWithoutTarget(targetPosition: TargetPosition, points: Point2[], start: Point2, end: Point2) {
    const arrowDirection = this.detectArrowDirection(start, end)
    switch (targetPosition) {
      case TargetPosition.Left: {
        const startTop = start.y - this._sourceJoint!.y - Connector.DEFAULT_ARROW_SEGMENT
        const startBottom = start.y + this._source!.height - this._sourceJoint!.y + Connector.DEFAULT_ARROW_SEGMENT
        if (end.y < startTop) {
          points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
          points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
          this.endDirection = ConnectorDirection.Right
        } else if (end.y > startBottom) {
          points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
          points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
          this.endDirection = ConnectorDirection.Right
        } else {
          points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, startTop))
          points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, startTop))
          points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
          this.endDirection = ConnectorDirection.Right
        }
        break
      }
      case TargetPosition.Top: {
        const startTop = start.y - this._sourceJoint!.y - Connector.DEFAULT_ARROW_SEGMENT
        const middleX = (start.x + end.x) * 0.5
        if (end.y < startTop) {
          if (end.x < start.x) {
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            this.endDirection = ConnectorDirection.Bottom
          } else {
            if (arrowDirection === ConnectorDirection.Top) {
              if (end.x - start.x > Connector.DEFAULT_ARROW_SEGMENT) {
                if (start.y - end.y > Connector.DEFAULT_ARROW_SEGMENT) {
                  points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
                  points.push(new Point2(end.x, start.y))
                  points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
                  this.endDirection = ConnectorDirection.Bottom
                } else {
                  points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
                  points.push(new Point2(end.x, start.y))
                  points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
                  this.endDirection = ConnectorDirection.Bottom
                }
              } else {
                if (start.y - end.y > Connector.DEFAULT_ARROW_SEGMENT) {
                  points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
                  points.push(new Point2(end.x, start.y))
                  points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
                  this.endDirection = ConnectorDirection.Bottom
                } else {
                  points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
                  points.push(new Point2(end.x, start.y))
                  points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
                  this.endDirection = ConnectorDirection.Bottom
                }
              }
            } else {
              if (middleX - start.x > Connector.DEFAULT_ARROW_SEGMENT) {
                points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
                points.push(new Point2(middleX, start.y))
                points.push(new Point2(middleX, end.y))
                points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
                this.endDirection = ConnectorDirection.Left
              } else {
                points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
                points.push(new Point2(middleX, start.y))
                points.push(new Point2(middleX, end.y))
                points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
                this.endDirection = ConnectorDirection.Left
              }
            }
          }
        } else {
          const middleX = (start.x + end.x) * 0.5
          if (start.x > end.x) {
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            this.endDirection = ConnectorDirection.Right
          } else if (end.x - middleX > Connector.DEFAULT_ARROW_SEGMENT) {
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(middleX, start.y))
            points.push(new Point2(middleX, end.y))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            this.endDirection = ConnectorDirection.Left
          } else {
            points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
            points.push(new Point2(middleX, start.y))
            points.push(new Point2(middleX, end.y))
            points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
            this.endDirection = ConnectorDirection.Left
          }
        }
        break
      }
      case TargetPosition.Bottom: {
        const startBottom = start.y + this._source!.height - this._sourceJoint!.y + Connector.DEFAULT_ARROW_SEGMENT
        const middleX = (start.x + end.x) * 0.5
        if (end.y > startBottom) {
          if (end.x < start.x) {
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            this.endDirection = ConnectorDirection.Top
          } else {
            if (middleX - start.x > Connector.DEFAULT_ARROW_SEGMENT) {
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(middleX, start.y))
              points.push(new Point2(middleX, end.y))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
              this.endDirection = ConnectorDirection.Left
            } else {
              points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
              points.push(new Point2(middleX, start.y))
              points.push(new Point2(middleX, end.y))
              points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              this.endDirection = ConnectorDirection.Left
            }
          }
        } else {
          points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
          points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
          this.endDirection = ConnectorDirection.Right
        }
        break
      }
      case TargetPosition.Right: {
        const middleX = (start.x + end.x) * 0.5
        if (arrowDirection === ConnectorDirection.Bottom) {
          if (end.x - start.x > Connector.DEFAULT_ARROW_SEGMENT) {
            if (end.y - start.y > Connector.DEFAULT_ARROW_SEGMENT) {
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(end.x, start.y))
              points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
              this.endDirection = ConnectorDirection.Top
            } else {
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(end.x, start.y))
              points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              this.endDirection = ConnectorDirection.Top
            }
          } else {
            if (end.y - start.y > Connector.DEFAULT_ARROW_SEGMENT) {
              points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
              points.push(new Point2(end.x, start.y))
              points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
              this.endDirection = ConnectorDirection.Top
            } else {
              points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
              points.push(new Point2(end.x, start.y))
              points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              this.endDirection = ConnectorDirection.Top
            }
          }
        } else {
          if (Math.abs(middleX - start.x) > Connector.DEFAULT_ARROW_SEGMENT) {
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(middleX, start.y))
            points.push(new Point2(middleX, end.y))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            this.endDirection = ConnectorDirection.Left
          } else {
            points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
            points.push(new Point2(middleX, start.y))
            points.push(new Point2(middleX, end.y))
            points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
            this.endDirection = ConnectorDirection.Left
          }
        }
        break
      }
      case TargetPosition.None:
      default: {
        const middleX = (start.x + end.x) * 0.5
        if (Math.abs(middleX - start.x) > Connector.DEFAULT_ARROW_SEGMENT) {
          points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(middleX, start.y))
          points.push(new Point2(middleX, end.y))
          points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
          this.endDirection = ConnectorDirection.Right
        } else {
          points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
          points.push(new Point2(middleX, start.y))
          points.push(new Point2(middleX, end.y))
          points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
          this.endDirection = ConnectorDirection.Right
        }
        break
      }
    }
  }

  private initializeOrthogonalPointsBottomWithoutTarget(targetPosition: TargetPosition, points: Point2[], start: Point2, end: Point2) {
    const arrowDirection = this.detectArrowDirection(start, end)
    switch (targetPosition) {
      case TargetPosition.Left: {
        const startLeft = start.x - this._sourceJoint!.x - Connector.DEFAULT_ARROW_SEGMENT
        const startBottom = start.y + this._source!.height - this._sourceJoint!.y + Connector.DEFAULT_ARROW_SEGMENT
        const startBottom2 = start.y + this._source!.height - this._sourceJoint!.y
        const middleY = (start.y + end.y) * 0.5
        if (end.x < startLeft) {
          if (end.y > startBottom) {
            if (arrowDirection === ConnectorDirection.Bottom) {
              points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(start.x, middleY))
              points.push(new Point2(end.x, middleY))
              points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
              this.endDirection = ConnectorDirection.Top
            } else {
              points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(start.x, end.y))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
              this.endDirection = ConnectorDirection.Right
            }
          } else {
            if (arrowDirection === ConnectorDirection.Top) {
              points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
              this.endDirection = ConnectorDirection.Bottom
            } else {
              points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
              this.endDirection = ConnectorDirection.Right
            }
          }
        } else {
          if (end.y > startBottom) {
            points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(start.x, end.y))
            points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            this.endDirection = ConnectorDirection.Right
          } else if (end.y > startBottom2) {
            points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
            points.push(new Point2(start.x, end.y))
            points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
            this.endDirection = ConnectorDirection.Right
          } else {
            points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            this.endDirection = ConnectorDirection.Bottom
          }
        }
        break
      }
      case TargetPosition.Top: {
        const startLeft = start.x - this._sourceJoint!.x - Connector.DEFAULT_ARROW_SEGMENT
        const startRight = start.x + this._source!.width - this._sourceJoint!.x + Connector.DEFAULT_ARROW_SEGMENT
        if (end.x < startLeft) {
          points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
          points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, start.y + Connector.DEFAULT_ARROW_SEGMENT))
          points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
          this.endDirection = ConnectorDirection.Right
        } else if (end.x > startRight) {
          if (arrowDirection === ConnectorDirection.Top) {
            points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            this.endDirection = ConnectorDirection.Bottom
          } else {
            points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, start.y + Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            this.endDirection = ConnectorDirection.Left
          }
        } else {
          points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
          points.push(new Point2(startLeft, start.y + Connector.DEFAULT_ARROW_SEGMENT))
          points.push(new Point2(startLeft, end.y + Connector.DEFAULT_ARROW_SEGMENT))
          points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
          this.endDirection = ConnectorDirection.Bottom
        }
        break
      }
      case TargetPosition.Bottom: {
        const startRight = start.x + this._source!.width - this._sourceJoint!.x
        const middleY = (start.y + end.y) * 0.5
        if (end.x > startRight) {
          if (Math.abs(middleY - start.y) > Connector.DEFAULT_ARROW_SEGMENT) {
            points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(start.x, end.y))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            this.endDirection = ConnectorDirection.Left
          } else {
            points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
            points.push(new Point2(start.x, end.y))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            this.endDirection = ConnectorDirection.Left
          }
        } else {
          if (Math.abs(middleY - start.y) > Connector.DEFAULT_ARROW_SEGMENT) {
            points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(start.x, middleY))
            points.push(new Point2(end.x, middleY))
            points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            this.endDirection = ConnectorDirection.Top
          } else {
            points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
            points.push(new Point2(start.x, middleY))
            points.push(new Point2(end.x, middleY))
            points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
            this.endDirection = ConnectorDirection.Top
          }
        }
        break
      }
      case TargetPosition.Right: {
        const startBottom = start.y + this._source!.height - this._sourceJoint!.y + Connector.DEFAULT_ARROW_SEGMENT
        const startBottom2 = start.y + this._source!.height - this._sourceJoint!.y
        const startRight = start.x + this._source!.width - this._sourceJoint!.x + Connector.DEFAULT_ARROW_SEGMENT
        const middleY = (start.y + end.y) * 0.5
        if (end.x > startRight) {
          if (end.y > startBottom) {
            if (arrowDirection === ConnectorDirection.Bottom) {
              points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(start.x, middleY))
              points.push(new Point2(end.x, middleY))
              points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
              this.endDirection = ConnectorDirection.Top
            } else {
              points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
              points.push(new Point2(start.x, end.y))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
              this.endDirection = ConnectorDirection.Left
            }
          } else {
            points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, start.y + Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            this.endDirection = ConnectorDirection.Left
          }
        } else {
          if (end.y > startBottom) {
            points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(start.x, end.y))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            this.endDirection = ConnectorDirection.Left
          } else if (end.y > startBottom2) {
            points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
            points.push(new Point2(start.x, end.y))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            this.endDirection = ConnectorDirection.Left
          } else {
            points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            this.endDirection = ConnectorDirection.Bottom
          }
        }
        break
      }
      case TargetPosition.None:
      default: {
        const middleY = (start.y + end.y) * 0.5
        if (Math.abs(middleY - start.y) > Connector.DEFAULT_ARROW_SEGMENT) {
          points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
          points.push(new Point2(start.x, middleY))
          points.push(new Point2(end.x, middleY))
          points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
          this.endDirection = ConnectorDirection.Bottom
        } else {
          points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
          points.push(new Point2(start.x, middleY))
          points.push(new Point2(end.x, middleY))
          points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
          this.endDirection = ConnectorDirection.Bottom
        }
        break
      }
    }
  }

  private initializeOrthogonalPointsLeftWithoutSource(targetPosition: TargetPosition, points: Point2[], start: Point2, end: Point2) {
    switch (targetPosition) {
      case TargetPosition.Left: {
        const middleX = (start.x + end.x) * 0.5
        if (Math.abs(middleX - start.x) > Connector.DEFAULT_ARROW_SEGMENT) {
          points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(middleX, start.y))
          points.push(new Point2(middleX, end.y))
          points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
          this.startDirection = ConnectorDirection.Right
        } else {
          points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
          points.push(new Point2(middleX, start.y))
          points.push(new Point2(middleX, end.y))
          points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
          this.startDirection = ConnectorDirection.Right
        }
        break
      }
      case TargetPosition.Top: {
        const endTop = end.y - this._targetJoint!.y - Connector.DEFAULT_ARROW_SEGMENT
        const endRight = end.x + this._target!.width - this._targetJoint!.x
        const middleX = (start.x + end.x) * 0.5
        if (start.y < endTop) {
          if (start.x > endRight) {
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            this.startDirection = ConnectorDirection.Left
          } else if (start.x > end.x) {
            points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, start.y + Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            this.startDirection = ConnectorDirection.Bottom
          } else {
            if (middleX - start.x > Connector.DEFAULT_ARROW_SEGMENT) {
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(middleX, start.y))
              points.push(new Point2(middleX, end.y))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
              this.startDirection = ConnectorDirection.Right
            } else {
              points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
              points.push(new Point2(middleX, start.y))
              points.push(new Point2(middleX, end.y))
              points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              this.startDirection = ConnectorDirection.Right
            }
          }
        } else {
          points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
          this.startDirection = ConnectorDirection.Left
        }
        break
      }
      case TargetPosition.Bottom: {
        const endBottom = end.y + this._target!.height - this._targetJoint!.y + Connector.DEFAULT_ARROW_SEGMENT
        const middleX = (start.x + end.x) * 0.5
        if (start.y > endBottom) {
          if (start.x > end.x) {
            points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, start.y - Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
            this.startDirection = ConnectorDirection.Top
          } else {
            if (middleX - start.x > Connector.DEFAULT_ARROW_SEGMENT) {
              points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(middleX, start.y))
              points.push(new Point2(middleX, end.y))
              points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
              this.startDirection = ConnectorDirection.Right
            } else {
              points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
              points.push(new Point2(middleX, start.y))
              points.push(new Point2(middleX, end.y))
              points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              this.startDirection = ConnectorDirection.Right
            }
          }
        } else {
          points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
          this.startDirection = ConnectorDirection.Left
        }
        break
      }
      case TargetPosition.Right: {
        const endTop = end.y - this._targetJoint!.y - Connector.DEFAULT_ARROW_SEGMENT
        const endBottom = end.y + this._target!.height - this._targetJoint!.y + Connector.DEFAULT_ARROW_SEGMENT
        if (start.y < endTop) {
          points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
          this.startDirection = ConnectorDirection.Left
        } else if (start.y > endBottom) {
          points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
          this.startDirection = ConnectorDirection.Left
        } else {
          points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, endTop))
          points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, endTop))
          points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
          this.startDirection = ConnectorDirection.Left
        }
        break
      }
      case TargetPosition.None:
      default: {
        const middleX = (start.x + end.x) * 0.5
        if (Math.abs(middleX - end.x) > Connector.DEFAULT_ARROW_SEGMENT) {
          points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(middleX, start.y))
          points.push(new Point2(middleX, end.y))
          points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
          this.startDirection = ConnectorDirection.Left
        } else {
          points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
          points.push(new Point2(middleX, start.y))
          points.push(new Point2(middleX, end.y))
          points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
          this.startDirection = ConnectorDirection.Left
        }
        break
      }
    }
  }

  private initializeOrthogonalPointsTopWithoutSource(targetPosition: TargetPosition, points: Point2[], start: Point2, end: Point2) {
    switch (targetPosition) {
      case TargetPosition.Left: {
        const endLeft = end.x - this._targetJoint!.x - Connector.DEFAULT_ARROW_SEGMENT
        const endTop = end.y - this._targetJoint!.y - Connector.DEFAULT_ARROW_SEGMENT
        const endTop2 = end.y - this._targetJoint!.y
        if (start.x < endLeft) {
          if (start.y < endTop) {
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(end.x, start.y))
            points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            this.startDirection = ConnectorDirection.Right
          } else {
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            this.startDirection = ConnectorDirection.Right
          }
        } else {
          if (start.y < endTop) {
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(end.x, start.y))
            points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            this.startDirection = ConnectorDirection.Right
          } else if (start.y < endTop2) {
            points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
            points.push(new Point2(end.x, start.y))
            points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
            this.startDirection = ConnectorDirection.Right
          } else {
            points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(start.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            this.startDirection = ConnectorDirection.Top
          }
        }
        break
      }
      case TargetPosition.Top: {
        const endRight = end.x + this._target!.width - this._targetJoint!.x
        const middleY = (start.y + end.y) * 0.5
        if (start.x > endRight) {
          if (Math.abs(middleY - start.y) > Connector.DEFAULT_ARROW_SEGMENT) {
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(end.x, start.y))
            points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            this.startDirection = ConnectorDirection.Left
          } else {
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y)) //Dummy point here for Segment
            points.push(new Point2(end.x, start.y))
            points.push(new Point2(end.x, end.y))
            this.startDirection = ConnectorDirection.Left
          }
        } else {
          if (Math.abs(middleY - start.y) > Connector.DEFAULT_ARROW_SEGMENT) {
            points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(start.x, middleY))
            points.push(new Point2(end.x, middleY))
            points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            this.startDirection = ConnectorDirection.Bottom
          } else {
            points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
            points.push(new Point2(start.x, middleY))
            points.push(new Point2(end.x, middleY))
            points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
            this.startDirection = ConnectorDirection.Bottom
          }
        }
        break
      }
      case TargetPosition.Bottom: {
        const endLeft = end.x - this._targetJoint!.x - Connector.DEFAULT_ARROW_SEGMENT
        const endRight = end.x + this._target!.width - this._targetJoint!.x + Connector.DEFAULT_ARROW_SEGMENT
        if (start.x < endLeft) {
          points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
          points.push(new Point2(start.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
          points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
          this.startDirection = ConnectorDirection.Top
        } else if (start.x > endRight) {
          points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
          points.push(new Point2(start.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
          points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
          this.startDirection = ConnectorDirection.Top
        } else {
          points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
          points.push(new Point2(endLeft, start.y - Connector.DEFAULT_ARROW_SEGMENT))
          points.push(new Point2(endLeft, end.y - Connector.DEFAULT_ARROW_SEGMENT))
          points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
          this.startDirection = ConnectorDirection.Top
        }
        break
      }
      case TargetPosition.Right: {
        const endTop = end.y - this._targetJoint!.y - Connector.DEFAULT_ARROW_SEGMENT
        const endTop2 = end.y - this._targetJoint!.y
        const endRight = end.x + this._target!.width - this._targetJoint!.x + Connector.DEFAULT_ARROW_SEGMENT
        if (start.x > endRight) {
          if (start.y < endTop) {
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(end.x, start.y))
            points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            this.startDirection = ConnectorDirection.Left
          } else {
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            this.startDirection = ConnectorDirection.Left
          }
        } else {
          if (start.y < endTop) {
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(end.x, start.y))
            points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            this.startDirection = ConnectorDirection.Left
          } else if (end.y < endTop2) {
            points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
            points.push(new Point2(start.x, end.y))
            points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
            this.startDirection = ConnectorDirection.Left
          } else {
            points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(start.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
            this.startDirection = ConnectorDirection.Top
          }
        }
        break
      }
      case TargetPosition.None:
      default: {
        const middleY = (start.y + end.y) * 0.5
        if (Math.abs(middleY - start.y) > Connector.DEFAULT_ARROW_SEGMENT) {
          points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
          points.push(new Point2(start.x, middleY))
          points.push(new Point2(end.x, middleY))
          points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
          this.startDirection = ConnectorDirection.Top
        } else {
          points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
          points.push(new Point2(start.x, middleY))
          points.push(new Point2(end.x, middleY))
          points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
          this.startDirection = ConnectorDirection.Top
        }
        break
      }
    }
  }

  private initializeOrthogonalPointsRightWithoutSource(targetPosition: TargetPosition, points: Point2[], start: Point2, end: Point2) {
    switch (targetPosition) {
      case TargetPosition.Left: {
        const endTop = end.y - this._targetJoint!.y - Connector.DEFAULT_ARROW_SEGMENT
        const endBottom = end.y + this._target!.height - this._targetJoint!.y + Connector.DEFAULT_ARROW_SEGMENT
        if (start.y < endTop) {
          points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
          this.startDirection = ConnectorDirection.Right
        } else if (start.y > endBottom) {
          points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
          this.startDirection = ConnectorDirection.Right
        } else {
          points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, endTop))
          points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, endTop))
          points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
          this.startDirection = ConnectorDirection.Right
        }
        break
      }
      case TargetPosition.Top: {
        const endTop = end.y - this._targetJoint!.y - Connector.DEFAULT_ARROW_SEGMENT
        const middleX = (start.x + end.x) * 0.5
        if (start.y < endTop) {
          if (start.x < end.x) {
            points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, start.y + Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            this.startDirection = ConnectorDirection.Bottom
          } else {
            if (middleX - end.x > Connector.DEFAULT_ARROW_SEGMENT) {
              points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(middleX, start.y))
              points.push(new Point2(middleX, end.y))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
              this.startDirection = ConnectorDirection.Left
            } else {
              points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
              points.push(new Point2(middleX, start.y))
              points.push(new Point2(middleX, end.y))
              points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              this.startDirection = ConnectorDirection.Left
            }
          }
        } else {
          points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
          this.startDirection = ConnectorDirection.Right
        }
        break
      }
      case TargetPosition.Bottom: {
        const endBottom = end.y + this._target!.height - this._targetJoint!.y + Connector.DEFAULT_ARROW_SEGMENT
        const middleX = (start.x + end.x) * 0.5
        if (start.y > endBottom) {
          if (start.x < end.x) {
            points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, start.y - Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
            this.startDirection = ConnectorDirection.Top
          } else {
            if (middleX - end.x > Connector.DEFAULT_ARROW_SEGMENT) {
              points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
              points.push(new Point2(middleX, start.y))
              points.push(new Point2(middleX, end.y))
              points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
              this.startDirection = ConnectorDirection.Left
            } else {
              points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
              points.push(new Point2(middleX, start.y))
              points.push(new Point2(middleX, end.y))
              points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
              this.startDirection = ConnectorDirection.Left
            }
          }
        } else {
          points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
          this.startDirection = ConnectorDirection.Right
        }
        break
      }
      case TargetPosition.Right: {
        const middleX = (start.x + end.x) * 0.5
        if (Math.abs(middleX - end.x) > Connector.DEFAULT_ARROW_SEGMENT) {
          points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(middleX, start.y))
          points.push(new Point2(middleX, end.y))
          points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
          this.startDirection = ConnectorDirection.Left
        } else {
          points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
          points.push(new Point2(middleX, start.y))
          points.push(new Point2(middleX, end.y))
          points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
          this.startDirection = ConnectorDirection.Left
        }
        break
      }
      case TargetPosition.None:
      default: {
        const middleX = (start.x + end.x) * 0.5
        if (Math.abs(middleX - end.x) > Connector.DEFAULT_ARROW_SEGMENT) {
          points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(middleX, start.y))
          points.push(new Point2(middleX, end.y))
          points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
          this.startDirection = ConnectorDirection.Right
        } else {
          points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
          points.push(new Point2(middleX, start.y))
          points.push(new Point2(middleX, end.y))
          points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
          this.startDirection = ConnectorDirection.Right
        }
        break
      }
    }
  }

  private initializeOrthogonalPointsBottomWithoutSource(targetPosition: TargetPosition, points: Point2[], start: Point2, end: Point2) {
    switch (targetPosition) {
      case TargetPosition.Left: {
        const endLeft = end.x - this._targetJoint!.x - Connector.DEFAULT_ARROW_SEGMENT
        const endBottom = end.y + this._target!.height - this._targetJoint!.y + Connector.DEFAULT_ARROW_SEGMENT
        const endBottom2 = end.y + this._target!.height - this._targetJoint!.y
        if (start.x < endLeft) {
          if (start.y > endBottom) {
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(end.x, start.y))
            points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            this.startDirection = ConnectorDirection.Right
          } else {
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            this.startDirection = ConnectorDirection.Right
          }
        } else {
          if (start.y > endBottom) {
            points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(end.x, start.y))
            points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            this.startDirection = ConnectorDirection.Right
          } else if (start.y > endBottom2) {
            points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
            points.push(new Point2(end.x, start.y))
            points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
            this.startDirection = ConnectorDirection.Right
          } else {
            points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(start.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            this.startDirection = ConnectorDirection.Bottom
          }
        }
        break
      }
      case TargetPosition.Top: {
        const endLeft = end.x - this._targetJoint!.x - Connector.DEFAULT_ARROW_SEGMENT
        const endRight = end.x + this._target!.width - this._targetJoint!.x + Connector.DEFAULT_ARROW_SEGMENT
        if (start.x < endLeft) {
          points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, end.y + Connector.DEFAULT_ARROW_SEGMENT))
          points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
          this.startDirection = ConnectorDirection.Right
        } else if (start.x > endRight) {
          points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, end.y + Connector.DEFAULT_ARROW_SEGMENT))
          points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
          this.startDirection = ConnectorDirection.Left
        } else {
          points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
          points.push(new Point2(endLeft, start.y + Connector.DEFAULT_ARROW_SEGMENT))
          points.push(new Point2(endLeft, end.y + Connector.DEFAULT_ARROW_SEGMENT))
          points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
          this.startDirection = ConnectorDirection.Bottom
        }
        break
      }
      case TargetPosition.Bottom: {
        const endRight = end.x + this._target!.width - this._targetJoint!.x
        const middleY = (start.y + end.y) * 0.5
        if (start.x > endRight) {
          if (Math.abs(middleY - start.y) > Connector.DEFAULT_ARROW_SEGMENT) {
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(end.x, start.y))
            points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            this.startDirection = ConnectorDirection.Left
          } else {
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(end.x, start.y))
            points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
            this.startDirection = ConnectorDirection.Left
          }
        } else {
          if (Math.abs(middleY - start.y) > Connector.DEFAULT_ARROW_SEGMENT) {
            points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(start.x, middleY))
            points.push(new Point2(end.x, middleY))
            points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            this.startDirection = ConnectorDirection.Top
          } else {
            points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
            points.push(new Point2(start.x, middleY))
            points.push(new Point2(end.x, middleY))
            points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
            this.startDirection = ConnectorDirection.Top
          }
        }
        break
      }
      case TargetPosition.Right: {
        const endBottom = end.y + this._target!.height - this._targetJoint!.y + Connector.DEFAULT_ARROW_SEGMENT
        const endBottom2 = end.y + this._target!.height - this._targetJoint!.y
        const endRight = end.x + this._target!.width - this._targetJoint!.x + Connector.DEFAULT_ARROW_SEGMENT
        if (start.x > endRight) {
          if (start.y > endBottom) {
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(end.x, start.y))
            points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            this.startDirection = ConnectorDirection.Left
          } else {
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            this.startDirection = ConnectorDirection.Left
          }
        } else {
          if (start.y > endBottom) {
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(end.x, start.y))
            points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            this.startDirection = ConnectorDirection.Left
          } else if (start.y > endBottom2) {
            points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
            points.push(new Point2(end.x, start.y))
            points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
            this.startDirection = ConnectorDirection.Left
          } else {
            points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(start.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
            this.startDirection = ConnectorDirection.Bottom
          }
        }
        break
      }
      case TargetPosition.None:
      default: {
        const middleY = (start.y + end.y) * 0.5
        if (Math.abs(middleY - start.y) > Connector.DEFAULT_ARROW_SEGMENT) {
          points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
          points.push(new Point2(start.x, middleY))
          points.push(new Point2(end.x, middleY))
          points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
          this.startDirection = ConnectorDirection.Bottom
        } else {
          points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
          points.push(new Point2(start.x, middleY))
          points.push(new Point2(end.x, middleY))
          points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
          this.startDirection = ConnectorDirection.Bottom
        }
        break
      }
    }
  }

  private initializeOrthogonalPointsWithoutSourceTarget(targetPosition: TargetPosition, points: Point2[], start: Point2, end: Point2) {
    //console.log(`start.x = ${start.x}  end.x = ${end.x}  start.y = ${start.y}  end.y=${end.y}`)
    if (Math.abs(start.x - end.x) > Math.abs(start.y - end.y)) {
      const middleX = (start.x + end.x) * 0.5
      if (Math.abs(middleX - start.x) > Connector.DEFAULT_ARROW_SEGMENT) {
        if (start.x < end.x) {
          points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(middleX, start.y))
          points.push(new Point2(middleX, end.y))
          points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
          this.startDirection = ConnectorDirection.Right
          this.endDirection = ConnectorDirection.Left
        } else {
          points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
          points.push(new Point2(middleX, start.y))
          points.push(new Point2(middleX, end.y))
          points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
          this.startDirection = ConnectorDirection.Left
          this.endDirection = ConnectorDirection.Right
        }
      } else {
        if (start.x < end.x) {
          points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
          points.push(new Point2(middleX, start.y))
          points.push(new Point2(middleX, end.y))
          points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
          this.startDirection = ConnectorDirection.Right
          this.endDirection = ConnectorDirection.Left
        } else {
          points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
          points.push(new Point2(middleX, start.y))
          points.push(new Point2(middleX, end.y))
          points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
          this.startDirection = ConnectorDirection.Left
          this.endDirection = ConnectorDirection.Right
        }
      }
    } else {
      const middleY = (start.y + end.y) * 0.5
      if (Math.abs(middleY - start.y) > Connector.DEFAULT_ARROW_SEGMENT) {
        if (start.y < end.y) {
          points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
          points.push(new Point2(start.x, middleY))
          points.push(new Point2(end.x, middleY))
          points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
          this.startDirection = ConnectorDirection.Bottom
          this.endDirection = ConnectorDirection.Top
        } else {
          points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
          points.push(new Point2(start.x, middleY))
          points.push(new Point2(end.x, middleY))
          points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
          this.startDirection = ConnectorDirection.Top
          this.endDirection = ConnectorDirection.Bottom
        }
      } else {
        if (start.y < end.y) {
          points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
          points.push(new Point2(start.x, middleY))
          points.push(new Point2(end.x, middleY))
          points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
          this.startDirection = ConnectorDirection.Bottom
          this.endDirection = ConnectorDirection.Top
        } else {
          points.push(new Point2(start.x, start.y)) //Dummy point here for Segment
          points.push(new Point2(start.x, middleY))
          points.push(new Point2(end.x, middleY))
          points.push(new Point2(end.x, end.y)) //Dummy point here for Segment
          this.startDirection = ConnectorDirection.Top
          this.endDirection = ConnectorDirection.Bottom
        }
      }
    }
  }

  private initializeOrthogonalPointsLeftWithSameSourceTarget(targetPosition: TargetPosition, points: Point2[], start: Point2, end: Point2) {
    switch (this._endDirection) {
      case ConnectorDirection.Left: {
        points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
        points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
        break
      }
      case ConnectorDirection.Top: {
        points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
        points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, end.y - Connector.DEFAULT_ARROW_SEGMENT))
        points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
        break
      }
      case ConnectorDirection.Right: {
        const startTop = start.y - this._sourceJoint!.y - Connector.DEFAULT_ARROW_SEGMENT
        points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
        points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, startTop))
        points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, startTop))
        points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
        break
      }
      case ConnectorDirection.Bottom:
      default: {
        points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, start.y))
        points.push(new Point2(start.x - Connector.DEFAULT_ARROW_SEGMENT, end.y + Connector.DEFAULT_ARROW_SEGMENT))
        points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
        break
      }
    }
  }

  private initializeOrthogonalPointsTopWithSameSourceTarget(targetPosition: TargetPosition, points: Point2[], start: Point2, end: Point2) {
    switch (this._endDirection) {
      case ConnectorDirection.Left: {
        points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
        points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, start.y - Connector.DEFAULT_ARROW_SEGMENT))
        points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
        break
      }
      case ConnectorDirection.Top: {
        points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
        points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
        break
      }
      case ConnectorDirection.Right: {
        points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
        points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, start.y - Connector.DEFAULT_ARROW_SEGMENT))
        points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
        break
      }
      case ConnectorDirection.Bottom:
      default: {
        const startLeft = start.x - this._sourceJoint!.x - Connector.DEFAULT_ARROW_SEGMENT
        points.push(new Point2(start.x, start.y - Connector.DEFAULT_ARROW_SEGMENT))
        points.push(new Point2(startLeft, start.y - Connector.DEFAULT_ARROW_SEGMENT))
        points.push(new Point2(startLeft, end.y + Connector.DEFAULT_ARROW_SEGMENT))
        points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
        break
      }
    }
  }

  private initializeOrthogonalPointsRightWithSameSourceTarget(targetPosition: TargetPosition, points: Point2[], start: Point2, end: Point2) {
    switch (this._endDirection) {
      case ConnectorDirection.Left: {
        const startTop = start.y - this._sourceJoint!.y - Connector.DEFAULT_ARROW_SEGMENT
        points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
        points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, startTop))
        points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, startTop))
        points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
        break
      }
      case ConnectorDirection.Top: {
        points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
        points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, end.y - Connector.DEFAULT_ARROW_SEGMENT))
        points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
        break
      }
      case ConnectorDirection.Right: {
        points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
        points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
        break
      }
      case ConnectorDirection.Bottom:
      default: {
        points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, start.y))
        points.push(new Point2(start.x + Connector.DEFAULT_ARROW_SEGMENT, end.y + Connector.DEFAULT_ARROW_SEGMENT))
        points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
        break
      }
    }
  }

  private initializeOrthogonalPointsBottomWithSameSourceTarget(targetPosition: TargetPosition, points: Point2[], start: Point2, end: Point2) {
    switch (this._endDirection) {
      case ConnectorDirection.Left: {
        points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
        points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, start.y + Connector.DEFAULT_ARROW_SEGMENT))
        points.push(new Point2(end.x - Connector.DEFAULT_ARROW_SEGMENT, end.y))
        break
      }
      case ConnectorDirection.Top: {
        const startLeft = start.x - this._sourceJoint!.x - Connector.DEFAULT_ARROW_SEGMENT
        points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
        points.push(new Point2(startLeft, start.y + Connector.DEFAULT_ARROW_SEGMENT))
        points.push(new Point2(startLeft, end.y - Connector.DEFAULT_ARROW_SEGMENT))
        points.push(new Point2(end.x, end.y - Connector.DEFAULT_ARROW_SEGMENT))
        break
      }
      case ConnectorDirection.Right: {
        points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
        points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, start.y + Connector.DEFAULT_ARROW_SEGMENT))
        points.push(new Point2(end.x + Connector.DEFAULT_ARROW_SEGMENT, end.y))
        break
      }
      case ConnectorDirection.Bottom:
      default: {
        points.push(new Point2(start.x, start.y + Connector.DEFAULT_ARROW_SEGMENT))
        points.push(new Point2(end.x, end.y + Connector.DEFAULT_ARROW_SEGMENT))
        break
      }
    }
  }

  public static cleanOrthogonalPoints(points: Point2[]) {
    const count = points.length
    let index = count - 2
    while (index > 0) {
      if (index > 2 && points[index].x === points[index - 1].x && points[index].x === points[index - 2].x) {
        points.splice(index - 1, 1)
      } else if (index > 2 && points[index].y === points[index - 1].y && points[index].y === points[index - 2].y) {
        points.splice(index - 1, 1)
      }
      index--
    }
  }

  /**
   * Source must exists
   * @private
   */
  private getSourceLeft() {
    if (this.source) {
      const transform = this.source.worldTransform
      return transform.makePoint(new Point2(0, 0)).x
    } else {
      return this.source!.left
    }
  }
  /**
   * Source must exists
   * @private
   */
  private getSourceTop() {
    if (this.source) {
      const transform = this.source.worldTransform
      return transform.makePoint(new Point2(0, 0)).y
    } else {
      return this.source!.top
    }
  }

  /**
   * Target must exists
   * @private
   */
  private getTargetLeft() {
    if (this.target) {
      const transform = this.target.worldTransform
      return transform.makePoint(new Point2(0, 0)).x
    } else {
      return this.target!.left
    }
  }
  /**
   * Target must exists
   * @private
   */
  private getTargetTop() {
    if (this.target) {
      const transform = this.target.worldTransform
      return transform.makePoint(new Point2(0, 0)).y
    } else {
      return this.target!.top
    }
  }
}
