/* eslint-disable max-params */
import { Point2, } from '@/components/Engine'
import { EntityShape, } from '../../Shapes'
import { Entity, } from './Entity'
import { Categories, Type, } from './Item'
import { EntityShapeFreezeType, EntityShapeType, ShapeTypeInfo } from '../../Shapes/src/EntityShape'

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

  public static FREEZE_NONE = 'None'
  public static FREEZE_WIDTH = 'Width'
  public static FREEZE_WIDTH_HEIGHT =  'WidthHeight'
  public static FREEZE_HEIGHT = 'Height'
  public static FREEZE_ASPECT_RATIO = 'AspectRatio'

  public static MODIFY_DIRECTION_XY = 'XY'
  public static MODIFY_DIRECTION_X = 'X'
  public static MODIFY_DIRECTION_Y = 'Y'
}

export const ShapeTypes = [
  { name: Shapes.TYPE_RECTANGLE, description: Shapes.DESC_RECTANGLE, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 160, height: 80, 
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true },
  { name: Shapes.TYPE_ROUND_RECTANGLE, description: Shapes.DESC_ROUND_RECTANGLE, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 160, height: 80, 
    modifiable: true, modifierX: 0.2,modifierY: 0.2,  modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: true, modifyInPercent: true },
  { name: Shapes.TYPE_TEXT, description: Shapes.DESC_TEXT, freeze: Shapes.FREEZE_NONE, text: 'Text2', left: 0, top: 0, width: 160, height: 80, 
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true },
  { name: Shapes.TYPE_ELLIPSE, description: Shapes.DESC_ELLIPSE, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 160, height: 80, 
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true },
  { name: Shapes.TYPE_SQUARE, description: Shapes.DESC_SQUARE, freeze: Shapes.FREEZE_ASPECT_RATIO, text: '', left: 0, top: 0, width: 100, height: 100, 
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true },
  { name: Shapes.TYPE_CIRCLE, description: Shapes.DESC_CIRCLE, freeze: Shapes.FREEZE_ASPECT_RATIO , text: '', left: 0, top: 0, width: 100, height: 100, 
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true},
  { name: Shapes.TYPE_PROCESS, description: Shapes.DESC_PROCESS, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 160, height: 80, 
    modifiable: true, modifierX: 12, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0, modifyInLine: true, modifyInPercent: false },
  { name: Shapes.TYPE_DIAMOND, description: Shapes.DESC_DIAMOND, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 160, height: 80, 
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true },
  { name: Shapes.TYPE_PARALLELOGRAM, description: Shapes.DESC_PARALLELOGRAM, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 160, height: 80, 
    modifiable: true, modifierX: 12, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.8, modifierEndY: 0, modifyInLine: true, modifyInPercent: false },
  { name: Shapes.TYPE_HEXAGON, description: Shapes.DESC_HEXAGON, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 160, height: 80, 
    modifiable: true, modifierX: 0.3, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0, modifyInLine: true, modifyInPercent: true },
  { name: Shapes.TYPE_TRIANGLE, description: Shapes.DESC_TRIANGLE, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 100, height: 100, 
    modifiable: true, modifierX: 0.5, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 1, modifierEndY: 0, modifyInLine: true, modifyInPercent: true },
  { name: Shapes.TYPE_CYLINDER, description: Shapes.DESC_CYLINDER, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 100, height: 120, 
    modifiable: true, modifierX: 0, modifierY: 0.25, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0.5, modifyInLine: true, modifyInPercent: true },
  { name: Shapes.TYPE_CLOUD, description: Shapes.DESC_CLOUD, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 160, height: 80, 
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true },
  { name: Shapes.TYPE_DOCUMENT, description: Shapes.DESC_DOCUMENT, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 120, height: 80, 
    modifiable: true, modifierX: 0, modifierY: 0.7, modifierStartX: 0, modifierStartY: 0.5, modifierEndX: 0, modifierEndY: 1, modifyInLine: true, modifyInPercent: true },
  { name: Shapes.TYPE_INTERNAL_STORAGE, description: Shapes.DESC_INTERNAL_STORAGE, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 140, height: 100, 
    modifiable: true, modifierX: 16, modifierY: 16, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: false },
  { name: Shapes.TYPE_CUBE, description: Shapes.DESC_CUBE, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 120, height: 80, 
    modifiable: true, modifierX: 25, modifierY: 20, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.6, modifierEndY: 0.6, modifyInLine: false, modifyInPercent: false },
  { name: Shapes.TYPE_STEP, description: Shapes.DESC_STEP, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 160, height: 80, 
    modifiable: true, modifierX: 0.2, modifierY: 0, modifierStartX: 0.1, modifierStartY: 0.5, modifierEndX: 0.9, modifierEndY: 0.5, modifyInLine: true, modifyInPercent: true },
  { name: Shapes.TYPE_TRAPEZOID, description: Shapes.DESC_TRAPEZOID, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 160, height: 80, 
    modifiable: true, modifierX: 12, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0, modifyInLine: true, modifyInPercent: false },
  { name: Shapes.TYPE_TAPE, description: Shapes.DESC_TAPE, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 140, height: 100, 
    modifiable: true, modifierX: 0, modifierY: 0.3, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0.5, modifyInLine: true, modifyInPercent: true },
  { name: Shapes.TYPE_NOTE, description: Shapes.DESC_NOTE, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 80, height: 120, 
    modifiable: true, modifierX: 0.5, modifierY: 0.5, modifierStartX: 0.5, modifierStartY: 0, modifierEndX: 1, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true },
  { name: Shapes.TYPE_CARD, description: Shapes.DESC_CARD, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 160, height: 80, 
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true },
  { name: Shapes.TYPE_CALLOUT, description: Shapes.DESC_CALLOUT, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 160, height: 80, 
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true },
  { name: Shapes.TYPE_ACTOR, description: Shapes.DESC_ACTOR, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 160, height: 80, 
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true },
]

export interface ShapeOptions {
  shapeType: string
  freezetype: string
  enableLengthWidthRatio?: boolean
  lengthWidthRatio?: number
}

export class ShapeEntity extends Entity {
  private _enableLengthWidthRatio: boolean

  private _lengthWidthRatio: number

  public constructor(left: number, top: number, width: number, height: number, shapeOptions: ShapeOptions = { shapeType: Shapes.TYPE_RECTANGLE,  freezetype: Shapes.FREEZE_NONE }) {
    super(left, top, width, height)
    this.type = shapeOptions.shapeType
    this._enableLengthWidthRatio = shapeOptions.enableLengthWidthRatio ? shapeOptions.enableLengthWidthRatio : false
    this._lengthWidthRatio = shapeOptions.lengthWidthRatio ? shapeOptions.lengthWidthRatio : 1
    ShapeTypes.forEach(shapeType => {
      if(shapeType.name == shapeOptions.shapeType) {
        this.modifiable = shapeType.modifiable
        this.modifier = new Point2(shapeType.modifierX, shapeType.modifierY)
      }
    }) 
    let text = this.parseEntityShapeText(this.type)
    let typeInfo = this.parseTypeInfo(shapeOptions)
    this._shape = new EntityShape(text, left, top, width, height, typeInfo)
  }

  public get enableLengthWidthRatio(): boolean {
    return this._enableLengthWidthRatio
  }

  public set enableLengthWidthRatio(value: boolean) {
    this._enableLengthWidthRatio = value
  }
  public get lengthWidthRatio(): number {
    return this._lengthWidthRatio
  }

  public set lengthWidthRatio(value: number) {
    this._lengthWidthRatio = value
  }

  public getShapeType() {
    let theShapeType = ShapeTypes[0]
    ShapeTypes.forEach(shapeType => {
      if(shapeType.name == this.type) {
        theShapeType = shapeType
      }
    })
    return theShapeType
  }

  public get types(): Type[] {
    return ShapeTypes
  }

  public get category(): string {
    return Categories.SHAPE
  }

  protected save(data: any) { }

  protected load(data: any) { }

  private parseEntityShapeText(type: string): string {
    let text = ''
    ShapeTypes.forEach(shapeType => {
      if(shapeType.name == type) {
        text = shapeType.text
      }
    }) 
    return text
  }

  private parseEntityShapeFreezeType(freezeType: string): EntityShapeFreezeType {
    let entityFreezeType = EntityShapeFreezeType.None
    switch (freezeType) {
      case Shapes.FREEZE_WIDTH:
        entityFreezeType = EntityShapeFreezeType.Width
        break;
      case Shapes.FREEZE_HEIGHT:
        entityFreezeType = EntityShapeFreezeType.Height
        break;
      case Shapes.FREEZE_WIDTH_HEIGHT:
        entityFreezeType = EntityShapeFreezeType.WidthHeight
        break;
        case Shapes.FREEZE_ASPECT_RATIO:
          entityFreezeType = EntityShapeFreezeType.AspectRatio
          break;
        case Shapes.FREEZE_NONE:
      default:  
        entityFreezeType = EntityShapeFreezeType.None
        break;
    }

    return entityFreezeType;
  }

  private parseTypeInfo(shapeOptions: ShapeOptions): ShapeTypeInfo{
    let theShapeType = ShapeTypes[0]
    ShapeTypes.forEach(shapeType => {
      if(shapeType.name == shapeOptions.shapeType) {
        theShapeType = shapeType
      }
    }) 
    let freezeType = this.parseEntityShapeFreezeType(shapeOptions.freezetype)
    let shapeType = this.parseEntityShapeType(this.type)
    return {
      type: shapeType, 
      freeze: freezeType,
      text: theShapeType.text,
      left: theShapeType.left,
      top: theShapeType.top,
      width: theShapeType.width,
      height: theShapeType.height,
      modifier: new Point2(theShapeType.modifierX, theShapeType.modifierY),
      modifierStart: new Point2(theShapeType.modifierStartX, theShapeType.modifierStartY),
      modifierEnd: new Point2(theShapeType.modifierEndX, theShapeType.modifierEndY),
      modifyInLine: theShapeType.modifyInLine,
      modifyInPercent: theShapeType.modifyInPercent
    }
  }

  private parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.Rectangle
    switch (type) {
      case Shapes.TYPE_RECTANGLE:
        shapeType = EntityShapeType.Rectangle
        break;
      case Shapes.TYPE_ROUND_RECTANGLE:
        shapeType = EntityShapeType.RoundRectangle
        break;
      case Shapes.TYPE_TEXT:
        shapeType = EntityShapeType.Text
        break;
      case Shapes.TYPE_ELLIPSE:
        shapeType = EntityShapeType.Ellipse
        break;
      case Shapes.TYPE_SQUARE:
        shapeType = EntityShapeType.Square
        break;
      case Shapes.TYPE_CIRCLE:
        shapeType = EntityShapeType.Circle
        break;
      case Shapes.TYPE_PROCESS:
        shapeType = EntityShapeType.Process
        break;
      case Shapes.TYPE_DIAMOND:
        shapeType = EntityShapeType.Diamond
        break;
      case Shapes.TYPE_PARALLELOGRAM:
        shapeType = EntityShapeType.Parallelogram
        break;
      case Shapes.TYPE_HEXAGON:
        shapeType = EntityShapeType.Hexagon
        break;
      case Shapes.TYPE_TRIANGLE:
        shapeType = EntityShapeType.Triangle
        break;
      case Shapes.TYPE_CYLINDER:
        shapeType = EntityShapeType.Cylinder
        break;
      case Shapes.TYPE_CLOUD:
        shapeType = EntityShapeType.Cloud
        break;
      case Shapes.TYPE_DOCUMENT:
        shapeType = EntityShapeType.Document
        break;
      case Shapes.TYPE_INTERNAL_STORAGE:
        shapeType = EntityShapeType.InternalStorage
        break;
      case Shapes.TYPE_CUBE:
        shapeType = EntityShapeType.Cube
        break;
      case Shapes.TYPE_STEP:
        shapeType = EntityShapeType.Step
        break;
      case Shapes.TYPE_TRAPEZOID:
        shapeType = EntityShapeType.Trapezoid
        break;
      case Shapes.TYPE_TAPE:
        shapeType = EntityShapeType.Tape
        break;
      case Shapes.TYPE_NOTE:
        shapeType = EntityShapeType.Note
        break;
      case Shapes.TYPE_CARD:
        shapeType = EntityShapeType.Card
        break;
      case Shapes.TYPE_CALLOUT:
        shapeType = EntityShapeType.Callout
        break;
      case Shapes.TYPE_ACTOR:
        shapeType = EntityShapeType.Actor
        break;
    }
    return shapeType
  }
}
