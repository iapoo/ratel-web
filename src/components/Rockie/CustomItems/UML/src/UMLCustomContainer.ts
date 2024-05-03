import { Colors, FontSlant, FontWeight, Graphics, ParagraphDirection, Rectangle, StrokeDashStyle, TextDecoration } from '@/components/Engine'
import { EntityShapeType } from '../../../Shapes/src/EntityShape'
import { CustomContainerShape } from '../../../Shapes'
import { CustomEntity, Shapes } from '../../../Items'
import { Type } from '../../../Items/src/Item'
import { CustomContainerEntity } from '@/components/Rockie/Items/src/CustomContainerEntity'

export class UMLCustomContainers {
  public static TYPE_ACTOR_LIFELINE = 'Actor Lifeline'
  public static DESC_ACTOR_LIFELINE = 'Actor Lifeline'
  public static TEXT_ACTOR_LIFELINE = 'Actor Lifeline'
  public static TYPE_OBJECT_LIFELINE = 'Object Lifeline'
  public static DESC_OBJECT_LIFELINE = 'Object Lifeline'
  public static TEXT_OBJECT_LIFELINE = 'Object'
}

export const UMLCustomContainerTypes = [
  { name: UMLCustomContainers.TYPE_ACTOR_LIFELINE, description: UMLCustomContainers.DESC_ACTOR_LIFELINE, freeze: Shapes.FREEZE_NONE, text: UMLCustomContainers.TEXT_ACTOR_LIFELINE, left: 0, top: 0, width: 20, height: 200, enableMask: true, 
    modifiable: true, modifierX: 0, modifierY: 40, modifierStartX: 0.5, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 1, modifyInLine: true, modifyInPercent: false,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true},
  { name: UMLCustomContainers.TYPE_OBJECT_LIFELINE, description: UMLCustomContainers.DESC_OBJECT_LIFELINE, freeze: Shapes.FREEZE_NONE, text: UMLCustomContainers.TEXT_OBJECT_LIFELINE, left: 0, top: 0, width: 80, height: 200, enableMask: true, 
    modifiable: true, modifierX: 0, modifierY: 40, modifierStartX: 0.5, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 1, modifyInLine: true, modifyInPercent: false,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true},
]

export class UMLCustomContainer extends CustomContainerEntity {
  
  public constructor(left: number, top: number, width: number, height: number, typeName: string) {
    super(left, top, width, height, '', {shapeType: typeName}, UMLCustomContainerTypes)
    const customTypeInfo = this.parseTypeInfo({shapeType: typeName})
    this._shape = new CustomContainerShape(left, top, width, height, this.buildShape, customTypeInfo)
    this.initializeTheme()
    this.initializeShape()
  }

  public get types(): Type[] {
    return UMLCustomContainerTypes
  }

  private initializeShape() {
    switch(this._shape.typeInfo.name) {
      case UMLCustomContainers.TYPE_ACTOR_LIFELINE: {        
        break;
      }
      case UMLCustomContainers.TYPE_OBJECT_LIFELINE: {
        this.text = this._shape.typeInfo.text
        break;
      }
      default:
        break;
    }
  }

  public buildShape(theThis: CustomContainerShape) {
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
      case UMLCustomContainers.TYPE_ACTOR_LIFELINE: {
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
      case UMLCustomContainers.TYPE_OBJECT_LIFELINE: {
        theThis.textHeight = modifierHeight
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, modifierHeight))
        theThis.secondStroke.setStrokeDashStyle(StrokeDashStyle.DASH)
        theThis.secondPath.moveTo(theThis.width / 2, modifierHeight)
        theThis.secondPath.lineTo(theThis.width / 2, theThis.height)
        break;
      }
    }
  }

  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.CustomContainer
    return shapeType
  } 

}
