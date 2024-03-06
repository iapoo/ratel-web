import { Graphics, MathUtils, ParagraphDirection, Rectangle } from '@/components/Engine'
import { EntityShapeType } from '../../../Shapes/src/EntityShape'
import { CustomShape } from '../../../Shapes'
import { CustomEntity, Shapes } from '../../../Items'
import { Type } from '../../../Items/src/Item'

const TYPE_ARROW_RIGHT = 'ArrowRight'
const DESC_ARROW_RIGHT = 'ArrowRight'
const TYPE_ARROW_LEFT = 'ArrowLeft'
const DESC_ARROW_LEFT = 'ArrowLeft'
const TYPE_ARROW_TOP = 'ArrowTop'
const DESC_ARROW_TOP = 'ArrowTop'
const TYPE_ARROW_BOTTOM = 'ArrowBottom'
const DESC_ARROW_BOTTOM = 'ArrowBottom'
const TYPE_ARROW_BOTH_WAY_HORIZONTAL = 'ArrowBothWayHorizontal'
const DESC_ARROW_BOTH_WAY_HORIZONTAL = 'ArrowBothWayHorizontal'
const TYPE_ARROW_BOTH_WAY_VERTICAL = 'Decagon'
const DESC_ARROW_BOTH_WAY_VERTICAL = 'Decagon'
const TEXT_ARROW = ''

export const ArrowTypes = [
  { name: TYPE_ARROW_RIGHT, description: DESC_ARROW_RIGHT, freeze: Shapes.FREEZE_NONE, text: TEXT_ARROW, left: 0, top: 0, width: 120, height: 70, 
    modifiable: true, modifierX: 0.85, modifierY: 0.6, modifierStartX: 0, modifierStartY: 0, modifierEndX: 1, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: true, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0.5, controllerEndX: 0.8, controllerEndY: 0.5, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
]

export class Arrow extends CustomEntity {
  
  public constructor(left: number, top: number, width: number, height: number, arrowType: string) {
    super(left, top, width, height, '', {shapeType: arrowType}, ArrowTypes)
    const customTypeInfo = this.parseTypeInfo({shapeType: arrowType})
    this._shape = new CustomShape(left, top, width, height, this.buildShape, customTypeInfo)
    this.initializeTheme()
  }


  public get types(): Type[] {
    return ArrowTypes
  }

  public buildShape(theThis: CustomShape) {
    let modifierWidth = theThis.modifier.x + theThis.typeInfo.modifierStart.x * theThis.width
    let modifierHeight = theThis.modifier.y + theThis.typeInfo.modifierStart.y * theThis.height
    let controllerWidth = theThis.controller.x + theThis.typeInfo.controllerStart.x * theThis.width
    let controllerHeight = theThis.controller.y + theThis.typeInfo.controllerStart.y * theThis.height
    if(theThis.typeInfo.modifyInPercent) {
      modifierWidth = theThis.width * theThis.modifier.x * (theThis.typeInfo.modifierEnd.x - theThis.typeInfo.modifierStart.x) + theThis.typeInfo.modifierStart.x * theThis.width
      modifierHeight = theThis.height * theThis.modifier.y * (theThis.typeInfo.modifierEnd.y - theThis.typeInfo.modifierStart.y) + theThis.typeInfo.modifierStart.y * theThis.height
    }
    if(theThis.typeInfo.modifyInPercent) {
      controllerWidth = theThis.width * theThis.controller.x * (theThis.typeInfo.controllerEnd.x - theThis.typeInfo.controllerStart.x) + theThis.typeInfo.controllerStart.x * theThis.width
      controllerHeight = theThis.height * theThis.controller.y * (theThis.typeInfo.controllerEnd.y - theThis.typeInfo.controllerStart.y) + theThis.typeInfo.controllerStart.y * theThis.height
    }
    theThis.path.reset()
    theThis.path.moveTo(0, modifierHeight)
    theThis.path.lineTo(modifierWidth, modifierHeight)
    theThis.path.lineTo(modifierWidth, 0)
    theThis.path.lineTo(theThis.width, theThis.height * 0.5)
    theThis.path.lineTo(modifierWidth, theThis.height)
    theThis.path.lineTo(modifierWidth, theThis.height - modifierHeight)
    theThis.path.lineTo(0, theThis.height - modifierHeight)
    theThis.path.lineTo(0, modifierHeight)
    theThis.path.close()

  }

  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.CustomShape
    return shapeType
  } 

}
