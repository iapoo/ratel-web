/* eslint-disable max-params */
import { Point2, } from '@/components/Engine'
import { EntityShape, } from '../../Shapes'
import { Entity, } from './Entity'
import { Categories, Type, } from './Item'

export class Shapes {
  public static TYPE_RECTANGLE = 'Rectangle'
  public static TYPE_ROUND_RECTANGLE = 'Round Rectangle'
  public static TYPE_TEXT = 'Text'
  public static TYPE_ELLIPSE = 'Ellipse'
  public static TYPE_SQUARE = 'Square'
  public static TYPE_CIRCLE = 'Circle'
  public static TYPE_PROCESS = 'Process'
  public static TYPE_DIAMOND = 'Diamond'
  public static TYPE_PARALLELOGRAM = 'Parallelogram'
  public static TYPE_HEXAGON = 'Hexagon'
  public static TYPE_TRIANGLE = 'Triangle'
  public static TYPE_CYLINDER = 'Cylinder'
  public static TYPE_CLOUD = 'Cloud'
  public static TYPE_DOCUMENT = 'Document'
  public static TYPE_INTERNAL_STORAGE = 'Internal Storage'
  public static TYPE_CUBE = 'Cube'
  public static TYPE_STEP = 'Step'
  public static TYPE_TRAPEZOID = 'Trapezoid'
  public static TYPE_TAPE = 'Tape'
  public static TYPE_NOTE = 'Note'
  public static TYPE_CARD = 'Card'
  public static TYPE_CALLOUT = 'Callout'
  public static TYPE_ACTOR = 'Actor'

  public static DESC_RECTANGLE = 'Rectangle'
  public static DESC_ROUND_RECTANGLE = 'Round Rectangle'
  public static DESC_TEXT = 'Text'
  public static DESC_ELLIPSE = 'Ellipse'
  public static DESC_SQUARE = 'Square'
  public static DESC_CIRCLE = 'Circle'
  public static DESC_PROCESS = 'Process'
  public static DESC_DIAMOND = 'Diamond'
  public static DESC_PARALLELOGRAM = 'Parallelogram'
  public static DESC_HEXAGON = 'Hexagon'
  public static DESC_TRIANGLE = 'Triangle'
  public static DESC_CYLINDER = 'Cylinder'
  public static DESC_CLOUD = 'Cloud'
  public static DESC_DOCUMENT = 'Document'
  public static DESC_INTERNAL_STORAGE = 'Internal Storage'
  public static DESC_CUBE = 'Cube'
  public static DESC_STEP = 'Step'
  public static DESC_TRAPEZOID = 'Trapezoid'
  public static DESC_TAPE = 'Tape'
  public static DESC_NOTE = 'Note'
  public static DESC_CARD = 'Card'
  public static DESC_CALLOUT = 'Callout'
  public static DESC_ACTOR = 'Actor'
}

const ShapeTypes = [
  { name: Shapes.TYPE_RECTANGLE, description: Shapes.DESC_RECTANGLE, },
  { name: Shapes.TYPE_ROUND_RECTANGLE, description: Shapes.DESC_ROUND_RECTANGLE, },
  { name: Shapes.TYPE_TEXT, description: Shapes.DESC_TEXT, },
  { name: Shapes.TYPE_ELLIPSE, description: Shapes.DESC_ELLIPSE, },
  { name: Shapes.TYPE_SQUARE, description: Shapes.DESC_SQUARE, },
  { name: Shapes.TYPE_CIRCLE, description: Shapes.DESC_CIRCLE, },
  { name: Shapes.TYPE_PROCESS, description: Shapes.DESC_PROCESS, },
  { name: Shapes.TYPE_DIAMOND, description: Shapes.DESC_DIAMOND, },
  { name: Shapes.TYPE_PARALLELOGRAM, description: Shapes.DESC_PARALLELOGRAM, },
  { name: Shapes.TYPE_HEXAGON, description: Shapes.DESC_HEXAGON, },
  { name: Shapes.TYPE_TRIANGLE, description: Shapes.DESC_TRIANGLE, },
  { name: Shapes.TYPE_CYLINDER, description: Shapes.DESC_CYLINDER, },
  { name: Shapes.TYPE_CLOUD, description: Shapes.DESC_CLOUD, },
  { name: Shapes.TYPE_DOCUMENT, description: Shapes.DESC_DOCUMENT, },
  { name: Shapes.TYPE_INTERNAL_STORAGE, description: Shapes.DESC_INTERNAL_STORAGE, },
  { name: Shapes.TYPE_CUBE, description: Shapes.DESC_CUBE, },
  { name: Shapes.TYPE_STEP, description: Shapes.DESC_STEP, },
  { name: Shapes.TYPE_TRAPEZOID, description: Shapes.DESC_TRAPEZOID, },
  { name: Shapes.TYPE_TAPE, description: Shapes.DESC_TAPE, },
  { name: Shapes.TYPE_NOTE, description: Shapes.DESC_NOTE, },
  { name: Shapes.TYPE_CARD, description: Shapes.DESC_CARD, },
  { name: Shapes.TYPE_CALLOUT, description: Shapes.DESC_CALLOUT, },
  { name: Shapes.TYPE_ACTOR, description: Shapes.DESC_ACTOR, },
]

export interface ShapeOptions {
  shapeType: string
  enableLengthWidthRatio?:boolean
  lengthWidthRatio?: number
  modifierStart?: Point2
  modifierEnd?: Point2
  modifiable?: boolean

}

export class ShapeEntity extends Entity {
  private _enableLengthWidthRatio:boolean

  private _lengthWidthRatio: number

  private _modifierStart: Point2 = new Point2(0, 0);

  private _modifierEnd: Point2 = new Point2(0, 0);

  private _modifiable = false;

  public constructor (left: number, top: number, width: number, height: number, shapeOptions: ShapeOptions = { shapeType: Shapes.TYPE_RECTANGLE, }) {
    super(left, top, width, height)
    this.type = shapeOptions.shapeType
    this._enableLengthWidthRatio = shapeOptions.enableLengthWidthRatio ? shapeOptions.enableLengthWidthRatio : false
    this._lengthWidthRatio = shapeOptions.lengthWidthRatio ? shapeOptions.lengthWidthRatio : 1
    this._modifiable = shapeOptions.modifiable ? shapeOptions.modifiable : false
    this._modifierStart = shapeOptions.modifierStart ? shapeOptions.modifierStart : new Point2(0, 0)
    this._modifierEnd = shapeOptions.modifierEnd ? shapeOptions.modifierEnd : new Point2(0, 0)

    switch (shapeOptions.shapeType) {
    case Shapes.TYPE_RECTANGLE:
      this._shape = new EntityShape('', left, top, width, height)
      break
    default:
      break
    }
  }

  public get enableLengthWidthRatio (): boolean {
    return this._enableLengthWidthRatio
  }

  public set enableLengthWidthRatio (value: boolean) {
    this._enableLengthWidthRatio = value
  }
  public get lengthWidthRatio (): number {
    return this._lengthWidthRatio
  }

  public set lengthWidthRatio (value: number) {
    this._lengthWidthRatio = value
  }
  public get modifiable (): boolean {
    return this._modifiable
  }

  public get modifierStart (): Point2 {
    return this._modifierStart
  }

  public set modifierStart (value: Point2) {
    this._modifierStart = new Point2(value.x, value.y)
  }

  public get modifierEnd (): Point2 {
    return this._modifierEnd
  }

  public set modifierEnd (value: Point2) {
    this._modifierEnd = new Point2(value.x, value.y)
  }

  public get types (): Type[] {
    return ShapeTypes
  }

  public get category (): string {
    return Categories.SHAPE
  }

  protected save (data: any) {}

  protected load (data: any) {}
}
