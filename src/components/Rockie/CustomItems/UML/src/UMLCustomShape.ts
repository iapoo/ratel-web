import { Colors, Graphics, ParagraphDirection, Rectangle, StrokeDashStyle } from '@/components/Engine'
import { EntityShapeType } from '../../../Shapes/src/EntityShape'
import { CustomShape } from '../../../Shapes'
import { CustomEntity, Shapes } from '../../../Items'
import { Type } from '../../../Items/src/Item'

export class UMLCustomShapes {
  public static TYPE_ACTOR_LIFELINE = 'Actor Lifeline'
  public static DESC_ACTOR_LIFELINE = 'Actor Lifeline'
  public static TEXT_ACTOR_LIFELINE = 'Actor Lifeline'
  public static TYPE_OBJECT_LIFELINE = 'Object Lifeline'
  public static DESC_OBJECT_LIFELINE = 'Object Lifeline'
  public static TEXT_OBJECT_LIFELINE = 'Object Lifeline'
  public static TYPE_ACTIVATION = 'Activation'
  public static DESC_ACTIVATION = 'Activation'
  public static TEXT_ACTIVATION = 'Activation'
  public static TYPE_LOOP = 'Loop'
  public static DESC_LOOP = 'Loop'
  public static TEXT_LOOP = 'Parameters'
}

export const UMLCustomShapeTypes = [
  { name: UMLCustomShapes.TYPE_ACTOR_LIFELINE, description: UMLCustomShapes.DESC_ACTOR_LIFELINE, freeze: Shapes.FREEZE_NONE, text: UMLCustomShapes.TEXT_ACTOR_LIFELINE, left: 0, top: 0, width: 20, height: 200, enableMask: true, 
  modifiable: true, modifierX: 0, modifierY: 40, modifierStartX: 0.5, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 1, modifyInLine: true, modifyInPercent: false,
  controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
  adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true},
  { name: UMLCustomShapes.TYPE_OBJECT_LIFELINE, description: UMLCustomShapes.DESC_OBJECT_LIFELINE, freeze: Shapes.FREEZE_NONE, text: UMLCustomShapes.TEXT_OBJECT_LIFELINE, left: 0, top: 0, width: 80, height: 200, enableMask: false, 
  modifiable: true, modifierX: 0, modifierY: 40, modifierStartX: 0.5, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 1, modifyInLine: true, modifyInPercent: false,
  controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
  adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true},
  { name: UMLCustomShapes.TYPE_ACTIVATION, description: UMLCustomShapes.DESC_ACTIVATION, freeze: Shapes.FREEZE_NONE, text: UMLCustomShapes.TEXT_ACTIVATION, left: 0, top: 0, width: 10, height: 80, enableMask: false, 
  modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
  controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
  adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true},
  { name: UMLCustomShapes.TYPE_LOOP, description: UMLCustomShapes.DESC_LOOP, freeze: Shapes.FREEZE_NONE, text: UMLCustomShapes.TEXT_LOOP, left: 0, top: 0, width: 10, height: 80, enableMask: false, 
    modifiable: true, modifierX: 90, modifierY: 30, modifierStartX: 0, modifierStartY: 0, modifierEndX: 1, modifierEndY: 1, modifyInLine: false, modifyInPercent: false,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true},
  ]

export class UMLCustomShape extends CustomEntity {
  
  public constructor(left: number, top: number, width: number, height: number, typeName: string) {
    super(left, top, width, height, '', {shapeType: typeName}, UMLCustomShapeTypes)
    const customTypeInfo = this.parseTypeInfo({shapeType: typeName})
    this._shape = new CustomShape(left, top, width, height, this.buildShape, customTypeInfo)
    this.initializeTheme()
  }

  public get types(): Type[] {
    return UMLCustomShapeTypes
  }

  public buildShape(theThis: CustomShape) {
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
      case UMLCustomShapes.TYPE_ACTOR_LIFELINE: {
        theThis.textHeight = modifierHeight
        theThis.path.addOval(Rectangle.makeLTWH(theThis.width * 0.25, 0, theThis.width * 0.5, modifierHeight * 0.25))
        theThis.path.moveTo(0, modifierHeight / 3)
        theThis.path.lineTo(theThis.width, modifierHeight / 3)
        theThis.path.close()
        theThis.path.moveTo(theThis.width * 0.5, modifierHeight * 0.25)
        theThis.path.lineTo(theThis.width * 0.5, modifierHeight * 2 / 3)
        theThis.path.close()
        theThis.path.moveTo(0, modifierHeight)
        theThis.path.lineTo(theThis.width * 0.5, modifierHeight * 2 / 3)
        theThis.path.lineTo(theThis.width, modifierHeight)
        theThis.path.lineTo(theThis.width * 0.5, modifierHeight * 2 / 3)
        theThis.path.lineTo(0, modifierHeight)
        theThis.secondStroke.setStrokeDashStyle(StrokeDashStyle.DASH)
        theThis.secondPath.moveTo(theThis.width / 2, modifierHeight)
        theThis.secondPath.lineTo(theThis.width / 2, theThis.height)
        break;
      }
      case UMLCustomShapes.TYPE_OBJECT_LIFELINE: {
        theThis.textHeight = modifierHeight
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, modifierHeight))
        theThis.secondStroke.setStrokeDashStyle(StrokeDashStyle.DASH)
        theThis.secondPath.moveTo(theThis.width / 2, modifierHeight)
        theThis.secondPath.lineTo(theThis.width / 2, theThis.height)
        break;
      }
      case UMLCustomShapes.TYPE_ACTIVATION: {
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        break;
      }
      case UMLCustomShapes.TYPE_LOOP: {
        theThis.textHeight = modifierHeight
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, modifierHeight))
        theThis.secondStroke.setStrokeDashStyle(StrokeDashStyle.DASH)
        theThis.secondPath.moveTo(theThis.width / 2, modifierHeight)
        theThis.secondPath.lineTo(theThis.width / 2, theThis.height)
        break;
      }
    }
    theThis.path.close()
  }

  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.CustomShape
    return shapeType
  } 

}
