import { Colors, Graphics, ParagraphDirection, Rectangle, StrokeDashStyle } from '@/components/Engine'
import { EntityShapeType } from '../../../Shapes/src/EntityShape'
import { FrameShape } from '../../../Shapes'
import { FrameEntity, Shapes } from '../../../Items'
import { Type } from '../../../Items/src/Item'

export class UMLFrameShapes {
  public static TYPE_LOOP = 'Loop'
  public static DESC_LOOP = 'Loop'
  public static TEXT_LOOP = 'Parameters'
}

export const UMLFrameShapeTypes = [
  { name: UMLFrameShapes.TYPE_LOOP, description: UMLFrameShapes.DESC_LOOP, freeze: Shapes.FREEZE_NONE, text: UMLFrameShapes.TEXT_LOOP, left: 0, top: 0, width: 10, height: 80, enableMask: false, 
    modifiable: true, modifierX: 90, modifierY: 30, modifierStartX: 0, modifierStartY: 0, modifierEndX: 1, modifierEndY: 1, modifyInLine: false, modifyInPercent: false,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true},
  ]

export class UMLFrameShape extends FrameEntity {
  
  public constructor(left: number, top: number, width: number, height: number, typeName: string) {
    super(left, top, width, height, '', {shapeType: typeName}, UMLFrameShapeTypes)
    const frameTypeInfo = this.parseTypeInfo({shapeType: typeName})
    this._shape = new FrameShape(left, top, width, height, this, this.buildShape, frameTypeInfo)
    this.initializeTheme()
  }

  public get types(): Type[] {
    return UMLFrameShapeTypes
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
    let shapeType = EntityShapeType.Frame
    return shapeType
  } 

}
