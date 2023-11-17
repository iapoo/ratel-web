/* eslint-disable max-params */
import { Point2, Rectangle, Rotation, } from '@/components/Engine'
import { EntityShape, } from '../../Shapes'
import { Entity, } from './Entity'
import { Categories, Type, } from './Item'
import { AdapterDirection, EntityShapeFreezeType, EntityShapeType, ShapeTypeInfo } from '../../Shapes/src/EntityShape'
import { EditorItem } from './EditorItem'
import { EditorItemInfo } from './EditorItemInfo'
import { Editor } from '../../Editor'
import { ShapeInfo } from './ShapeInfo'
import { SystemUtils } from '@/components/Workspace/Utils'

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

  public static ADAPTER_DIRECTION_X = 'X'
  public static ADAPTER_DIRECTION_Y = 'Y'

}

export interface ShapeType {
  name: string
  description: string
  freeze: string
  text: string
  left: number 
  top: number
  width: number
  height: number, 
  modifiable: boolean
  modifierX: number
  modifierY: number
  modifierStartX: number
  modifierStartY: number
  modifierEndX: number
  modifierEndY: number
  modifyInLine: boolean
  modifyInPercent: boolean
  adaptable: boolean
  adapterX: number
  adapterY: number 
  adapterDirection: string
  adapterSize: number
  adapterStartX: number
  adapterStartY: number
  adapterEndX: number
  adapterEndY: number
  adaptInLine: boolean
  adaptInPercent: boolean
}

export const ShapeTypes = [
  { name: Shapes.TYPE_RECTANGLE, description: Shapes.DESC_RECTANGLE, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 120, height: 60, 
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true  },
  { name: Shapes.TYPE_ROUND_RECTANGLE, description: Shapes.DESC_ROUND_RECTANGLE, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 120, height: 60, 
    modifiable: true, modifierX: 0.2,modifierY: 0.2,  modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: true, modifyInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true  },
  { name: Shapes.TYPE_TEXT, description: Shapes.DESC_TEXT, freeze: Shapes.FREEZE_NONE, text: 'Text', left: 0, top: 0, width: 120, height: 60, 
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true  },
  { name: Shapes.TYPE_ELLIPSE, description: Shapes.DESC_ELLIPSE, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 120, height: 80, 
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true  },
  { name: Shapes.TYPE_SQUARE, description: Shapes.DESC_SQUARE, freeze: Shapes.FREEZE_ASPECT_RATIO, text: '', left: 0, top: 0, width: 120, height: 120, 
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true  },
  { name: Shapes.TYPE_CIRCLE, description: Shapes.DESC_CIRCLE, freeze: Shapes.FREEZE_ASPECT_RATIO , text: '', left: 0, top: 0, width: 120, height: 120, 
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true },
  { name: Shapes.TYPE_PROCESS, description: Shapes.DESC_PROCESS, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 120, height: 60, 
    modifiable: true, modifierX: 12, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0, modifyInLine: true, modifyInPercent: false,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true  },
  { name: Shapes.TYPE_DIAMOND, description: Shapes.DESC_DIAMOND, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 120, height: 120, 
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true  },
  { name: Shapes.TYPE_PARALLELOGRAM, description: Shapes.DESC_PARALLELOGRAM, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 120, height: 80, 
    modifiable: true, modifierX: 12, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.8, modifierEndY: 0, modifyInLine: true, modifyInPercent: false,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true  },
  { name: Shapes.TYPE_HEXAGON, description: Shapes.DESC_HEXAGON, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 120, height: 80, 
    modifiable: true, modifierX: 0.3, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true  },
  { name: Shapes.TYPE_TRIANGLE, description: Shapes.DESC_TRIANGLE, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 120, height: 120, 
    modifiable: true, modifierX: 0.5, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 1, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true  },
  { name: Shapes.TYPE_CYLINDER, description: Shapes.DESC_CYLINDER, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 80, height: 120, 
    modifiable: true, modifierX: 0, modifierY: 0.25, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0.5, modifyInLine: true, modifyInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true  },
  { name: Shapes.TYPE_CLOUD, description: Shapes.DESC_CLOUD, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 120, height: 80, 
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true  },
  { name: Shapes.TYPE_DOCUMENT, description: Shapes.DESC_DOCUMENT, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 120, height: 80, 
    modifiable: true, modifierX: 0, modifierY: 0.7, modifierStartX: 0, modifierStartY: 0.5, modifierEndX: 0, modifierEndY: 1, modifyInLine: true, modifyInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true  },
  { name: Shapes.TYPE_INTERNAL_STORAGE, description: Shapes.DESC_INTERNAL_STORAGE, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 120, height: 80, 
    modifiable: true, modifierX: 16, modifierY: 16, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: false,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true  },
  { name: Shapes.TYPE_CUBE, description: Shapes.DESC_CUBE, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 120, height: 100, 
    modifiable: true, modifierX: 40, modifierY: 20, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.6, modifierEndY: 0.6, modifyInLine: false, modifyInPercent: false,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true  },
  { name: Shapes.TYPE_STEP, description: Shapes.DESC_STEP, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 120, height: 80, 
    modifiable: true, modifierX: 0.2, modifierY: 0, modifierStartX: 0, modifierStartY: 0.5, modifierEndX: 0.95, modifierEndY: 0.5, modifyInLine: true, modifyInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true  },
  { name: Shapes.TYPE_TRAPEZOID, description: Shapes.DESC_TRAPEZOID, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 120, height: 80, 
    modifiable: true, modifierX: 12, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0, modifyInLine: true, modifyInPercent: false,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true  },
  { name: Shapes.TYPE_TAPE, description: Shapes.DESC_TAPE, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 120, height: 90, 
    modifiable: true, modifierX: 0, modifierY: 0.3, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0.45, modifyInLine: true, modifyInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true  },
  { name: Shapes.TYPE_NOTE, description: Shapes.DESC_NOTE, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 90, height: 120, 
    modifiable: true, modifierX: 0.4, modifierY: 0.4, modifierStartX: 0.5, modifierStartY: 0, modifierEndX: 1, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true  },
  { name: Shapes.TYPE_CARD, description: Shapes.DESC_CARD, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 90, height: 120, 
    modifiable: true, modifierX: 0.3, modifierY: 0.3, modifierStartX: 0, modifierStartY: 0, modifierEndX: 1, modifierEndY: 1, modifyInLine: false, modifyInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true  },
  { name: Shapes.TYPE_CALLOUT, description: Shapes.DESC_CALLOUT, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 120, height: 80, 
    modifiable: true, modifierX: 0.3, modifierY: 0, modifierStartX: 0, modifierStartY: 1, modifierEndX: 1, modifierEndY: 1, modifyInLine: true, modifyInPercent: true,
    adaptable: true, adapterX: 0.3, adapterY: 0.7, adapterDirection: 'X', adapterSize: 0.3, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0.95, adapterEndY: 1, adaptInLine: false, adaptInPercent: true},
  { name: Shapes.TYPE_ACTOR, description: Shapes.DESC_ACTOR, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 60, height: 120, 
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true },
]

export interface ShapeOptions {
  shapeType: string
}

export class ShapeEntity extends Entity {
  private _shapeType: ShapeType
  private _shapeTypes: ShapeType[]

  public constructor(left: number, top: number, width: number, height: number, shapeOptions: ShapeOptions = { shapeType: Shapes.TYPE_RECTANGLE }, 
      shapeTypes: ShapeType[] = ShapeTypes) {
    super(left, top, width, height)
    this._shapeTypes = shapeTypes
    this.type = shapeOptions.shapeType
    this._shapeType = this.getShapeType()
    let text = this.parseEntityShapeText(this.type)
    let typeInfo = this.parseTypeInfo(shapeOptions)
    this._shape = new EntityShape(text, left, top, width, height, typeInfo)
    this.initializeTheme()
  }

  public get types(): Type[] {
    return this._shapeTypes
  }

  public get category(): string {
    return Categories.SHAPE
  }

  public get shapeType():  ShapeType {
    return this._shapeType
  }

  // public clone(): EditorItem {    
  //   let shapeEntity = new ShapeEntity(this.left, this.top, this.width, this.height)
  //   return shapeEntity
  // }

  protected save(): EditorItemInfo {
    let shapeInfo = new ShapeInfo(this.type, this.category, this.left, this.top, this.width, this.height, this.text,)
    shapeInfo.rotation = this.rotation.radius
    shapeInfo.modifier = this.shape.modifier.x + ',' + this.shape.modifier.y
    shapeInfo.adapter = this.shape.adapter.x + ',' + this.shape.adapter.y
    shapeInfo.adapterSize = this.shape.adapterSize

    return shapeInfo
  }

  protected load(itemInfo: EditorItemInfo, editor: Editor): void {
    let shapeInfo = itemInfo as ShapeInfo
    this.boundary = Rectangle.makeLTWH(shapeInfo.left, shapeInfo.top, shapeInfo.width, shapeInfo.height)
    this.type = shapeInfo.type
    this.text = shapeInfo.text
    this.id = shapeInfo.id
    if (shapeInfo.rotation) {
      this.rotation = new Rotation(shapeInfo.rotation, this.width / 2, this.height / 2)
    }
    this.shape.modifier = SystemUtils.parsePointString(shapeInfo.modifier)
    this.shape.adapter = SystemUtils.parsePointString(shapeInfo.adapter)
  }

  protected getShapeType(): ShapeType {
    let theShapeType = this._shapeTypes[0]
    this._shapeTypes.forEach(shapeType => {
      if(shapeType.name == this.type) {
        theShapeType = shapeType
      }
    })
    return theShapeType
  }

  private parseEntityShapeText(type: string): string {
    let text = ''
    this._shapeTypes.forEach(shapeType => {
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

  private parseAdaptDirection(adapterDirection: string) {
    let theAdaptDirection = AdapterDirection.X
    switch(adapterDirection) {
      case Shapes.ADAPTER_DIRECTION_X:
        theAdaptDirection = AdapterDirection.X
        break;
      case Shapes.ADAPTER_DIRECTION_Y:
        theAdaptDirection = AdapterDirection.Y
        break;
    }
    return theAdaptDirection
  }

  private parseTypeInfo(shapeOptions: ShapeOptions): ShapeTypeInfo{
    let theShapeType = this._shapeTypes[0]
    this._shapeTypes.forEach(shapeType => {
      if(shapeType.name == shapeOptions.shapeType) {
        theShapeType = shapeType
      }
    }) 
    let freezeType = this.parseEntityShapeFreezeType(theShapeType.freeze)
    let shapeType = this.parseEntityShapeType(this.type)
    let adapterDirection = this.parseAdaptDirection(theShapeType.adapterDirection)
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
      modifyInPercent: theShapeType.modifyInPercent,
      adapter: new Point2(theShapeType.adapterX, theShapeType.adapterY),
      adapterSize: theShapeType.adapterSize,
      adapterDirection:adapterDirection,
      adapterStart: new Point2(theShapeType.adapterStartX, theShapeType.adapterStartY),
      adapterEnd: new Point2(theShapeType.adapterEndX, theShapeType.adapterEndY),
      adaptInLine: theShapeType.adaptInLine,
      adaptInPercent: theShapeType.adaptInPercent
    }
  }

  protected parseEntityShapeType(type: string): EntityShapeType {
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
