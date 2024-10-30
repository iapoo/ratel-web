import { Graphics, ParagraphDirection, Rectangle } from '@/components/Engine'
import { EntityShapeType } from '../../../Shapes/src/EntityShape'
import { CustomShape } from '../../../Shapes'
import { CustomEntity, Shapes } from '../../../Items'
import { Type } from '../../../Items/src/Item'

const TYPE_RIGHT_TRIANGLE = 'RightTriangle'
const DESC_RIGHT_TRIANGLE = 'Right Triangle'
const TEXT_RIGHT_TRIANGLE = ''

export const RightTriangleTypes = [{
  name: TYPE_RIGHT_TRIANGLE, description: DESC_RIGHT_TRIANGLE,
  freeze: Shapes.FREEZE_NONE, text: TEXT_RIGHT_TRIANGLE, left: 0, top: 0, width: 100, height: 100, enableMask: false,
  modifiable: true, modifierX: 0, modifierY: 0.5, modifierStartX: 1, modifierStartY: 0, modifierEndX: 1, modifierEndY: 1, modifyInLine: true, modifyInPercent: true,
  controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
  adaptable: true, adapterX: 0, adapterY: 0, adapterDirection: 'Y', adapterSize: 1, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 1, adaptInLine: true, adaptInPercent: true
}]

export class RightTriangle extends CustomEntity {

  public constructor(left: number, top: number, width: number, height: number) {
    super(left, top, width, height, '', { shapeType: TYPE_RIGHT_TRIANGLE }, RightTriangleTypes)
    const customTypeInfo = this.parseTypeInfo({ shapeType: TYPE_RIGHT_TRIANGLE })
    this._shape = new CustomShape(left, top, width, height, this.buildShape, customTypeInfo)
    this.initializeTheme()
  }


  public get types(): Type[] {
    return RightTriangleTypes
  }

  public buildShape(theThis: CustomShape) {
    theThis.path.reset()
    let modifierWidth = theThis.modifier.x + theThis.typeInfo.modifierStart.x * theThis.width
    let modifierHeight = theThis.modifier.y + theThis.typeInfo.modifierStart.y * theThis.height
    let adapterWidth = theThis.adapter.x + theThis.typeInfo.adapterStart.x * theThis.width
    let adapterHeight = theThis.adapter.y + theThis.typeInfo.adapterStart.y * theThis.height
    let adapterSizeX = theThis.adapterSize
    let adapterSizeY = theThis.adapterSize
    if (theThis.typeInfo.modifyInPercent) {
      modifierWidth = theThis.width * theThis.modifier.x * (theThis.typeInfo.modifierEnd.x - theThis.typeInfo.modifierStart.x) + theThis.typeInfo.modifierStart.x * theThis.width
      modifierHeight = theThis.height * theThis.modifier.y * (theThis.typeInfo.modifierEnd.y - theThis.typeInfo.modifierStart.y) + theThis.typeInfo.modifierStart.y * theThis.height
    }
    if (theThis.typeInfo.adaptInPercent) {
      adapterWidth = theThis.width * theThis.adapter.x * (theThis.typeInfo.adapterEnd.x - theThis.typeInfo.adapterStart.x) + theThis.typeInfo.adapterStart.x * theThis.width
      adapterHeight = theThis.height * theThis.adapter.y * (theThis.typeInfo.adapterEnd.y - theThis.typeInfo.adapterStart.y) + theThis.typeInfo.adapterStart.y * theThis.height
      adapterSizeX = theThis.adapterSize * (theThis.typeInfo.adapterEnd.x - theThis.typeInfo.adapterStart.x) * this.width
      adapterSizeY = theThis.adapterSize * (theThis.typeInfo.adapterEnd.y - theThis.typeInfo.adapterStart.y) * this.height
    }
    theThis.path.moveTo(theThis.width, modifierHeight)
    theThis.path.lineTo(0, adapterHeight + adapterSizeY)
    theThis.path.lineTo(0, adapterHeight)
    theThis.path.lineTo(theThis.width, modifierHeight)
  }

  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.CustomShape
    return shapeType
  }

}
