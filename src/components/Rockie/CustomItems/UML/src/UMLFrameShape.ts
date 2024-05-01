import { Colors, FontWeight, Graphics, ParagraphDirection, Rectangle, StrokeDashStyle, TextAlignment, TextVerticalAlignment } from '@/components/Engine'
import { EntityShapeType } from '../../../Shapes/src/EntityShape'
import { FrameShape } from '../../../Shapes'
import { FrameEntity, ShapeEntity, Shapes } from '../../../Items'
import { Type } from '../../../Items/src/Item'
import { ShapeOptions, ShapeType } from '@/components/Rockie/Items/src/ShapeEntity'

export class UMLFrameShapes {
  public static TYPE_LOOP = 'Loop'
  public static DESC_LOOP = 'Loop'
  public static TEXT_LOOP = 'Loop'
  public static TYPE_OPT = 'Opt'
  public static DESC_OPT = 'Opt'
  public static TEXT_OPT = 'Opt'
  public static TYPE_ALT = 'Alt'
  public static DESC_ALT = 'Alt'
  public static TEXT_ALT = 'Alt'
  public static TYPE_PAR = 'Par'
  public static DESC_PAR = 'Par'
  public static TEXT_PAR = 'Par'
  public static TYPE_OTHER = 'Other'
  public static DESC_OTHER = 'Other'
  public static TEXT_OTHER = 'Other'
}

export const UMLFrameShapeTypes: ShapeType[] = [
  { name: UMLFrameShapes.TYPE_LOOP, description: UMLFrameShapes.DESC_LOOP, freeze: Shapes.FREEZE_NONE, text: UMLFrameShapes.TEXT_LOOP, left: 0, top: 0, width: 200, height: 200, enableMask: false, 
    modifiable: true, modifierX: 70, modifierY: 30, modifierStartX: 0, modifierStartY: 0, modifierEndX: 1, modifierEndY: 1, modifyInLine: false, modifyInPercent: false,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true},
  { name: UMLFrameShapes.TYPE_OPT, description: UMLFrameShapes.DESC_OPT, freeze: Shapes.FREEZE_NONE, text: UMLFrameShapes.TEXT_OPT, left: 0, top: 0, width: 200, height: 200, enableMask: false, 
    modifiable: true, modifierX: 70, modifierY: 30, modifierStartX: 0, modifierStartY: 0, modifierEndX: 1, modifierEndY: 1, modifyInLine: false, modifyInPercent: false,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true},
  { name: UMLFrameShapes.TYPE_ALT, description: UMLFrameShapes.DESC_ALT, freeze: Shapes.FREEZE_NONE, text: UMLFrameShapes.TEXT_ALT, left: 0, top: 0, width: 200, height: 200, enableMask: false, 
    modifiable: true, modifierX: 70, modifierY: 30, modifierStartX: 0, modifierStartY: 0, modifierEndX: 1, modifierEndY: 1, modifyInLine: false, modifyInPercent: false,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true},
  { name: UMLFrameShapes.TYPE_PAR, description: UMLFrameShapes.DESC_PAR, freeze: Shapes.FREEZE_NONE, text: UMLFrameShapes.TEXT_PAR, left: 0, top: 0, width: 200, height: 200, enableMask: false, 
    modifiable: true, modifierX: 70, modifierY: 30, modifierStartX: 0, modifierStartY: 0, modifierEndX: 1, modifierEndY: 1, modifyInLine: false, modifyInPercent: false,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true},
  { name: UMLFrameShapes.TYPE_OTHER, description: UMLFrameShapes.DESC_OTHER, freeze: Shapes.FREEZE_NONE, text: UMLFrameShapes.TEXT_OTHER, left: 0, top: 0, width: 200, height: 200, enableMask: false, 
    modifiable: true, modifierX: 70, modifierY: 30, modifierStartX: 0, modifierStartY: 0, modifierEndX: 1, modifierEndY: 1, modifyInLine: false, modifyInPercent: false,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true},
  ]

export class UMLFrameShape extends FrameEntity {
  private _label: ShapeEntity

  public constructor(left: number, top: number, width: number, height: number, shapeOptions: ShapeOptions ,frameShapeTypes: ShapeType[]) {
    super(left, top, width, height, shapeOptions, frameShapeTypes)
    const frameTypeInfo = this.parseTypeInfo({shapeType: shapeOptions.shapeType})
    this._shape = new FrameShape(left, top, width, height, this, this.buildShape, frameTypeInfo)
    this._label = new ShapeEntity(0, 0, 120, 30)
    this.initializeTheme()
    this.initializeShape()
  }

  // public get types(): Type[] {
  //   return this._frameShapeTypes
  // }

  private initializeShape() {
    switch(this._shape.typeInfo.name) {
      case UMLFrameShapes.TYPE_LOOP: 
      case UMLFrameShapes.TYPE_ALT:
      case UMLFrameShapes.TYPE_OPT:
      case UMLFrameShapes.TYPE_PAR:
      case UMLFrameShapes.TYPE_OTHER: {
        // this._label.locked = true
        this.textVerticalAlignment = TextVerticalAlignment.TOP
        this.textAlignment = TextAlignment.LEFT
        this.text = 'Parameters'
        this.addItem(this._label)
        this._label.textAlignment = TextAlignment.LEFT
        this._label.stroked = false
        this._label.filled = false
        this._label.fontWeight = FontWeight.BOLD
        this._label.text = this._shape.typeInfo.text    
        break;
      }
    }
  }

  public buildShape(theThis: FrameShape, entity: any) {
    const frameEntity: UMLFrameShape = entity    
    let modifierWidth = theThis.modifier.x + theThis.typeInfo.modifierStart.x * theThis.width
    let modifierHeight = theThis.modifier.y + theThis.typeInfo.modifierStart.y * theThis.height
    let controllerWidth = theThis.controller.x + theThis.typeInfo.controllerStart.x * theThis.width
    let controllerHeight = theThis.controller.y + theThis.typeInfo.controllerStart.y * theThis.height
    let adapterWidth = theThis.adapter.x +theThis.typeInfo.adapterStart.x * theThis.width
    let adapterHeight = theThis.adapter.y + theThis.typeInfo.adapterStart.y * theThis.height
    let adapterSizeX = theThis.adapterSize
    let adapterSizeY = theThis.adapterSize
    if(theThis.typeInfo.modifyInPercent) {
      modifierWidth = theThis.width * theThis.modifier.x * (theThis.typeInfo.modifierEnd.x - theThis.typeInfo.modifierStart.x) + theThis.typeInfo.modifierStart.x * theThis.width
      modifierHeight = theThis.height * theThis.modifier.y * (theThis.typeInfo.modifierEnd.y - theThis.typeInfo.modifierStart.y) + theThis.typeInfo.modifierStart.y * theThis.height
    }
    if(theThis.typeInfo.controlInPercent) {
      controllerWidth = theThis.width * theThis.controller.x * (theThis.typeInfo.controllerEnd.x - theThis.typeInfo.controllerStart.x) + theThis.typeInfo.controllerStart.x * theThis.width
      controllerHeight = theThis.height * theThis.controller.y * (theThis.typeInfo.controllerEnd.y - theThis.typeInfo.controllerStart.y) + theThis.typeInfo.controllerStart.y * theThis.height
    }
    if(theThis.typeInfo.adaptInPercent) {
      adapterWidth = theThis.width * theThis.adapter.x * (theThis.typeInfo.adapterEnd.x - theThis.typeInfo.adapterStart.x) + theThis.typeInfo.adapterStart.x * theThis.width
      adapterHeight = theThis.height * theThis.adapter.y * (theThis.typeInfo.adapterEnd.y - theThis.typeInfo.adapterStart.y) + theThis.typeInfo.adapterStart.y * theThis.height
      adapterSizeX = theThis.adapterSize * (theThis.typeInfo.adapterEnd.x - theThis.typeInfo.adapterStart.x) * this.width
      adapterSizeY = theThis.adapterSize * (theThis.typeInfo.adapterEnd.y - theThis.typeInfo.adapterStart.y) * this.height
    }
    theThis.path.reset()
    theThis.secondPath.reset()
    switch(theThis.typeInfo.name) {
      case UMLFrameShapes.TYPE_LOOP: {
        frameEntity._label.boundary = Rectangle.makeLTWH(0, 0, modifierWidth, modifierHeight)
        theThis.textTop = modifierHeight
        theThis.textHeight = theThis.height - modifierHeight
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        theThis.path.moveTo(0, 0)
        theThis.path.lineTo(0, modifierHeight)
        theThis.path.lineTo(modifierWidth, modifierHeight)
        theThis.path.lineTo(modifierWidth + modifierHeight * 0.4, modifierHeight * 0.6)
        theThis.path.lineTo(modifierWidth + modifierHeight * 0.4, 0)
        theThis.path.close()
        break;
      }
      case UMLFrameShapes.TYPE_ALT: {
        frameEntity._label.boundary = Rectangle.makeLTWH(0, 0, modifierWidth, modifierHeight)
        theThis.textTop = modifierHeight
        theThis.textHeight = theThis.height - modifierHeight
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        theThis.path.moveTo(0, 0)
        theThis.path.lineTo(0, modifierHeight)
        theThis.path.lineTo(modifierWidth, modifierHeight)
        theThis.path.lineTo(modifierWidth + modifierHeight * 0.4, modifierHeight * 0.6)
        theThis.path.lineTo(modifierWidth + modifierHeight * 0.4, 0)
        theThis.path.close()
        break;
      }
      case UMLFrameShapes.TYPE_OPT: {
        frameEntity._label.boundary = Rectangle.makeLTWH(0, 0, modifierWidth, modifierHeight)
        theThis.textTop = modifierHeight
        theThis.textHeight = theThis.height - modifierHeight
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        theThis.path.moveTo(0, 0)
        theThis.path.lineTo(0, modifierHeight)
        theThis.path.lineTo(modifierWidth, modifierHeight)
        theThis.path.lineTo(modifierWidth + modifierHeight * 0.4, modifierHeight * 0.6)
        theThis.path.lineTo(modifierWidth + modifierHeight * 0.4, 0)
        theThis.path.close()
        break;
      }
      case UMLFrameShapes.TYPE_PAR: {
        frameEntity._label.boundary = Rectangle.makeLTWH(0, 0, modifierWidth, modifierHeight)
        theThis.textTop = modifierHeight
        theThis.textHeight = theThis.height - modifierHeight
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        theThis.path.moveTo(0, 0)
        theThis.path.lineTo(0, modifierHeight)
        theThis.path.lineTo(modifierWidth, modifierHeight)
        theThis.path.lineTo(modifierWidth + modifierHeight * 0.4, modifierHeight * 0.6)
        theThis.path.lineTo(modifierWidth + modifierHeight * 0.4, 0)
        theThis.path.close()
        break;
      }
      case UMLFrameShapes.TYPE_OTHER: {
        frameEntity._label.boundary = Rectangle.makeLTWH(0, 0, modifierWidth, modifierHeight)
        theThis.textTop = modifierHeight
        theThis.textHeight = theThis.height - modifierHeight
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        theThis.path.moveTo(0, 0)
        theThis.path.lineTo(0, modifierHeight)
        theThis.path.lineTo(modifierWidth, modifierHeight)
        theThis.path.lineTo(modifierWidth + modifierHeight * 0.4, modifierHeight * 0.6)
        theThis.path.lineTo(modifierWidth + modifierHeight * 0.4, 0)
        theThis.path.close()
        break;
      }
    }
    theThis.path.close()
  }

  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.Frame
    return shapeType
  } 

}
