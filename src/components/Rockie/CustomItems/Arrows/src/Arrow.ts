import { Graphics, MathUtils, ParagraphDirection, Rectangle } from '@/components/Engine'
import { EntityShapeType } from '../../../Shapes/src/EntityShape'
import { CustomShape } from '../../../Shapes'
import { CustomEntity, Shapes } from '../../../Items'
import { Type } from '../../../Items/src/Item'

const TYPE_ARROW_RIGHT = 'ArrowRight'
const DESC_ARROW_RIGHT = 'Arrow Right'
const TYPE_ARROW_LEFT = 'ArrowLeft'
const DESC_ARROW_LEFT = 'Arrow Left'
const TYPE_ARROW_TOP = 'ArrowTop'
const DESC_ARROW_TOP = 'Arrow Top'
const TYPE_ARROW_BOTTOM = 'ArrowBottom'
const DESC_ARROW_BOTTOM = 'Arrow Bottom'
const TYPE_ARROW_BOTH_WAY_HORIZONTAL = 'ArrowBothWayHorizontal'
const DESC_ARROW_BOTH_WAY_HORIZONTAL = 'Arrow Two Way Horizontal'
const TYPE_ARROW_BOTH_WAY_VERTICAL = 'ArrowBothWayVertical'
const DESC_ARROW_BOTH_WAY_VERTICAL = 'Arrow Two Way Vertical'
const TYPE_ARROW_JUMP_IN_LEFT = 'ArrowJumpInLeft'
const DESC_ARROW_JUMP_IN_LEFT = 'Arrow Jump In Left'
const TYPE_ARROW_JUMP_IN_RIGHT = 'ArrowJumpInRight'
const DESC_ARROW_JUMP_IN_RIGHT = 'Arrow Jump In Right'
const TEXT_ARROW = ''

export const ArrowTypes = [
  {
    name: TYPE_ARROW_RIGHT, description: DESC_ARROW_RIGHT, freeze: Shapes.FREEZE_NONE, text: TEXT_ARROW, left: 0, top: 0, width: 120, height: 70, enableMask: false,
    modifiable: true, modifierX: 0.7, modifierY: 0.6, modifierStartX: 0, modifierStartY: 0, modifierEndX: 1, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: true, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0.5, controllerEndX: 0.8, controllerEndY: 0.5, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: TYPE_ARROW_LEFT, description: DESC_ARROW_LEFT, freeze: Shapes.FREEZE_NONE, text: TEXT_ARROW, left: 0, top: 0, width: 120, height: 70, enableMask: false,
    modifiable: true, modifierX: 0.3, modifierY: 0.6, modifierStartX: 0, modifierStartY: 0, modifierEndX: 1, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: true, controllerX: 1, controllerY: 0, controllerStartX: 0.2, controllerStartY: 0.5, controllerEndX: 1, controllerEndY: 0.5, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: TYPE_ARROW_TOP, description: DESC_ARROW_TOP, freeze: Shapes.FREEZE_NONE, text: TEXT_ARROW, left: 0, top: 0, width: 70, height: 120, enableMask: false,
    modifiable: true, modifierX: 0.6, modifierY: 0.3, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 1, modifyInLine: false, modifyInPercent: true,
    controllable: true, controllerX: 0, controllerY: 1, controllerStartX: 0.5, controllerStartY: 0.2, controllerEndX: 0.5, controllerEndY: 1, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: TYPE_ARROW_BOTTOM, description: DESC_ARROW_BOTTOM, freeze: Shapes.FREEZE_NONE, text: TEXT_ARROW, left: 0, top: 0, width: 70, height: 120, enableMask: false,
    modifiable: true, modifierX: 0.6, modifierY: 0.7, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 1, modifyInLine: false, modifyInPercent: true,
    controllable: true, controllerX: 0, controllerY: 0, controllerStartX: 0.5, controllerStartY: 0, controllerEndX: 0.5, controllerEndY: 0.8, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: TYPE_ARROW_BOTH_WAY_HORIZONTAL, description: DESC_ARROW_BOTH_WAY_HORIZONTAL, freeze: Shapes.FREEZE_NONE, text: TEXT_ARROW, left: 0, top: 0, width: 120, height: 70, enableMask: false,
    modifiable: true, modifierX: 0.4, modifierY: 0.6, modifierStartX: 0.5, modifierStartY: 0, modifierEndX: 1, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: TYPE_ARROW_BOTH_WAY_VERTICAL, description: DESC_ARROW_BOTH_WAY_VERTICAL, freeze: Shapes.FREEZE_NONE, text: TEXT_ARROW, left: 0, top: 0, width: 70, height: 120, enableMask: false,
    modifiable: true, modifierX: 0.6, modifierY: 0.4, modifierStartX: 0, modifierStartY: 0.5, modifierEndX: 0.5, modifierEndY: 1, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: TYPE_ARROW_JUMP_IN_LEFT, description: DESC_ARROW_JUMP_IN_LEFT, freeze: Shapes.FREEZE_NONE, text: TEXT_ARROW, left: 0, top: 0, width: 100, height: 100, enableMask: false,
    modifiable: true, modifierX: 0, modifierY: 1, modifierStartX: 1, modifierStartY: 0.5, modifierEndX: 1, modifierEndY: 1, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: true, adapterX: 0.5, adapterY: 0.2, adapterDirection: 'Y', adapterSize: 0.5, adapterStartX: 0, adapterStartY: 0, adapterEndX: 1, adapterEndY: 1, adaptInLine: false, adaptInPercent: true
  },
  {
    name: TYPE_ARROW_JUMP_IN_RIGHT, description: DESC_ARROW_JUMP_IN_RIGHT, freeze: Shapes.FREEZE_NONE, text: TEXT_ARROW, left: 0, top: 0, width: 100, height: 100, enableMask: false,
    modifiable: true, modifierX: 0, modifierY: 1, modifierStartX: 0, modifierStartY: 0.5, modifierEndX: 0, modifierEndY: 1, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: true, adapterX: 0.5, adapterY: 0.2, adapterDirection: 'Y', adapterSize: 0.5, adapterStartX: 0, adapterStartY: 0, adapterEndX: 1, adapterEndY: 1, adaptInLine: false, adaptInPercent: true
  },
]

export class Arrow extends CustomEntity {

  public constructor(left: number, top: number, width: number, height: number, arrowType: string) {
    super(left, top, width, height, '', { shapeType: arrowType }, ArrowTypes)
    const customTypeInfo = this.parseTypeInfo({ shapeType: arrowType })
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
    let adapterWidth = theThis.adapter.x + theThis.typeInfo.adapterStart.x * theThis.width
    let adapterHeight = theThis.adapter.y + theThis.typeInfo.adapterStart.y * theThis.height
    let adapterSizeX = theThis.adapterSize
    let adapterSizeY = theThis.adapterSize
    if (theThis.typeInfo.modifyInPercent) {
      modifierWidth = theThis.width * theThis.modifier.x * (theThis.typeInfo.modifierEnd.x - theThis.typeInfo.modifierStart.x) + theThis.typeInfo.modifierStart.x * theThis.width
      modifierHeight = theThis.height * theThis.modifier.y * (theThis.typeInfo.modifierEnd.y - theThis.typeInfo.modifierStart.y) + theThis.typeInfo.modifierStart.y * theThis.height
    }
    if (theThis.typeInfo.controlInPercent) {
      controllerWidth = theThis.width * theThis.controller.x * (theThis.typeInfo.controllerEnd.x - theThis.typeInfo.controllerStart.x) + theThis.typeInfo.controllerStart.x * theThis.width
      controllerHeight = theThis.height * theThis.controller.y * (theThis.typeInfo.controllerEnd.y - theThis.typeInfo.controllerStart.y) + theThis.typeInfo.controllerStart.y * theThis.height
    }
    if (theThis.typeInfo.adaptInPercent) {
      adapterWidth = theThis.width * theThis.adapter.x * (theThis.typeInfo.adapterEnd.x - theThis.typeInfo.adapterStart.x) + theThis.typeInfo.adapterStart.x * theThis.width
      adapterHeight = theThis.height * theThis.adapter.y * (theThis.typeInfo.adapterEnd.y - theThis.typeInfo.adapterStart.y) + theThis.typeInfo.adapterStart.y * theThis.height
      adapterSizeX = theThis.adapterSize * (theThis.typeInfo.adapterEnd.x - theThis.typeInfo.adapterStart.x) * this.width
      adapterSizeY = theThis.adapterSize * (theThis.typeInfo.adapterEnd.y - theThis.typeInfo.adapterStart.y) * this.height
    }
    theThis.path.reset()
    switch (theThis.typeInfo.name) {
      case TYPE_ARROW_LEFT:
        theThis.path.moveTo(theThis.width, modifierHeight)
        theThis.path.lineTo(modifierWidth, modifierHeight)
        theThis.path.lineTo(modifierWidth, 0)
        theThis.path.lineTo(0, controllerHeight)
        theThis.path.lineTo(modifierWidth, theThis.height)
        theThis.path.lineTo(modifierWidth, theThis.height - modifierHeight)
        theThis.path.lineTo(theThis.width, theThis.height - modifierHeight)
        theThis.path.lineTo(controllerWidth, controllerHeight)
        theThis.path.lineTo(theThis.width, modifierHeight)
        break
      case TYPE_ARROW_TOP:
        theThis.path.moveTo(modifierWidth, theThis.height)
        theThis.path.lineTo(modifierWidth, modifierHeight)
        theThis.path.lineTo(0, modifierHeight)
        theThis.path.lineTo(controllerWidth, 0)
        theThis.path.lineTo(theThis.width, modifierHeight)
        theThis.path.lineTo(theThis.width - modifierWidth, modifierHeight)
        theThis.path.lineTo(theThis.width - modifierWidth, theThis.height)
        theThis.path.lineTo(controllerWidth, controllerHeight)
        theThis.path.lineTo(modifierWidth, theThis.height)
        break
      case TYPE_ARROW_BOTTOM:
        theThis.path.moveTo(modifierWidth, 0)
        theThis.path.lineTo(modifierWidth, modifierHeight)
        theThis.path.lineTo(0, modifierHeight)
        theThis.path.lineTo(controllerWidth, theThis.height)
        theThis.path.lineTo(theThis.width, modifierHeight)
        theThis.path.lineTo(theThis.width - modifierWidth, modifierHeight)
        theThis.path.lineTo(theThis.width - modifierWidth, 0)
        theThis.path.lineTo(controllerWidth, controllerHeight)
        theThis.path.lineTo(modifierWidth, 0)
        break
      case TYPE_ARROW_BOTH_WAY_HORIZONTAL:
        theThis.path.moveTo(0, theThis.height * 0.5)
        theThis.path.lineTo(theThis.width - modifierWidth, theThis.height)
        theThis.path.lineTo(theThis.width - modifierWidth, theThis.height - modifierHeight)
        theThis.path.lineTo(modifierWidth, theThis.height - modifierHeight)
        theThis.path.lineTo(modifierWidth, theThis.height)
        theThis.path.lineTo(theThis.width, theThis.height * 0.5)
        theThis.path.lineTo(modifierWidth, 0)
        theThis.path.lineTo(modifierWidth, modifierHeight)
        theThis.path.lineTo(theThis.width - modifierWidth, modifierHeight)
        theThis.path.lineTo(theThis.width - modifierWidth, 0)
        theThis.path.lineTo(0, theThis.height * 0.5)
        break
      case TYPE_ARROW_BOTH_WAY_VERTICAL:
        theThis.path.moveTo(theThis.width * 0.5, 0)
        theThis.path.lineTo(0, theThis.height - modifierHeight)
        theThis.path.lineTo(modifierWidth, theThis.height - modifierHeight)
        theThis.path.lineTo(modifierWidth, modifierHeight)
        theThis.path.lineTo(0, modifierHeight)
        theThis.path.lineTo(theThis.width * 0.5, theThis.height)
        theThis.path.lineTo(theThis.width, modifierHeight)
        theThis.path.lineTo(theThis.width - modifierWidth, modifierHeight)
        theThis.path.lineTo(theThis.width - modifierWidth, theThis.height - modifierHeight)
        theThis.path.lineTo(theThis.width, theThis.height - modifierHeight)
        theThis.path.lineTo(theThis.width * 0.5, 0)
        break
      case TYPE_ARROW_JUMP_IN_LEFT: {
        if (adapterHeight > this.height / 2) {
          adapterHeight = this.height / 2
        }
        if (adapterSizeY < adapterHeight) {
          adapterSizeY = adapterHeight
        }
        let height = adapterHeight + adapterSizeY
        theThis.path.moveTo(this.width, modifierHeight)
        theThis.path.quadTo(this.width, adapterHeight, adapterWidth, adapterHeight)
        theThis.path.lineTo(adapterWidth, 0)
        theThis.path.lineTo(0, height / 2)
        theThis.path.lineTo(adapterWidth, height)
        theThis.path.lineTo(adapterWidth, height - adapterHeight)
        theThis.path.quadTo(this.width, height - adapterHeight, this.width, this.height)
        theThis.path.lineTo(this.width, modifierHeight)
        break
      }
      case TYPE_ARROW_JUMP_IN_RIGHT: {
        if (adapterHeight > this.height / 2) {
          adapterHeight = this.height / 2
        }
        if (adapterSizeY < adapterHeight) {
          adapterSizeY = adapterHeight
        }
        let height = adapterHeight + adapterSizeY
        theThis.path.moveTo(0, modifierHeight)
        theThis.path.quadTo(0, adapterHeight, adapterWidth, adapterHeight)
        theThis.path.lineTo(adapterWidth, 0)
        theThis.path.lineTo(this.width, height / 2)
        theThis.path.lineTo(adapterWidth, height)
        theThis.path.lineTo(adapterWidth, height - adapterHeight)
        theThis.path.quadTo(0, height - adapterHeight, 0, this.height)
        theThis.path.lineTo(0, modifierHeight)
        break
      }
      case TYPE_ARROW_RIGHT:
      default:
        theThis.path.moveTo(0, modifierHeight)
        theThis.path.lineTo(modifierWidth, modifierHeight)
        theThis.path.lineTo(modifierWidth, 0)
        theThis.path.lineTo(theThis.width, controllerHeight)
        theThis.path.lineTo(modifierWidth, theThis.height)
        theThis.path.lineTo(modifierWidth, theThis.height - modifierHeight)
        theThis.path.lineTo(0, theThis.height - modifierHeight)
        theThis.path.lineTo(controllerWidth, controllerHeight)
        theThis.path.lineTo(0, modifierHeight)
        break
    }
    theThis.path.close()

  }

  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.CustomShape
    return shapeType
  }

}
