import { Graphics, ParagraphDirection, Rectangle } from '@/components/Engine'
import { EntityShapeType } from '../../../Shapes/src/EntityShape'
import { CustomShape } from '../../../Shapes'
import { CustomEntity, Shapes } from '../../../Items'
import { Type } from '../../../Items/src/Item'

const TYPE_STAR = 'Star'
const DESC_STAR = 'Star'
const TEXT_STAR = 'Star'

export const StarTypes = [{ name: TYPE_STAR, description: DESC_STAR, 
  freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 120, height: 80, 
  modifiable: true, modifierX: 0.3, modifierY: 0, modifierStartX: 0, modifierStartY: 0, 
  modifierEndX: 0.5, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
  adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, 
  adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
}]

export class Star extends CustomEntity {
  
  public constructor(left: number, top: number, width: number, height: number) {
    super(left, top, width, height, {shapeType: TYPE_STAR}, StarTypes)
    const customTypeInfo = this.parseTypeInfo({shapeType: TYPE_STAR})
    this._shape = new CustomShape(left, top, width, height, this.buildShape, customTypeInfo)
    this.initializeTheme()
    CustomEntity.registry(Star)
  }


  public get types(): Type[] {
    return StarTypes
  }

  public buildShape(theThis: CustomShape) {
    theThis.path.reset()
    let modifierWidth = theThis.modifier.x + theThis.typeInfo.modifierStart.x * theThis.width
    let modifierHeight = theThis.modifier.y + theThis.typeInfo.modifierStart.y * theThis.height
    let adapterWidth = theThis.adapter.x +theThis.typeInfo.adapterStart.x * theThis.width
    let adapterHeight = theThis.adapter.y + theThis.typeInfo.adapterStart.y * theThis.height
    let adapterSizeX = theThis.adapterSize
    let adapterSizeY = theThis.adapterSize
    if(theThis.typeInfo.modifyInPercent) {
      modifierWidth = theThis.width * theThis.modifier.x * (theThis.typeInfo.modifierEnd.x - theThis.typeInfo.modifierStart.x) + theThis.typeInfo.modifierStart.x * theThis.width
      modifierHeight = theThis.height * theThis.modifier.y * (theThis.typeInfo.modifierEnd.y - theThis.typeInfo.modifierStart.y) + theThis.typeInfo.modifierStart.y * theThis.height
    }
    if(theThis.typeInfo.adaptInPercent) {
      adapterWidth = theThis.width * theThis.adapter.x * (theThis.typeInfo.adapterEnd.x - theThis.typeInfo.adapterStart.x) + theThis.typeInfo.adapterStart.x * theThis.width
      adapterHeight = theThis.height * theThis.adapter.y * (theThis.typeInfo.adapterEnd.y - theThis.typeInfo.adapterStart.y) + theThis.typeInfo.adapterStart.y * theThis.height
      adapterSizeX = theThis.adapterSize * (theThis.typeInfo.modifierEnd.x - theThis.typeInfo.modifierStart.x) * this.width
      adapterSizeY = theThis.adapterSize * (theThis.typeInfo.modifierEnd.y - theThis.typeInfo.modifierStart.y) * this.height
    }
    theThis.path.moveTo(modifierWidth, 0)
    theThis.path.lineTo(this.width - modifierWidth, 0)
    theThis.path.lineTo(this.width, this.height / 2)
    theThis.path.lineTo(this.width - modifierWidth, this.height)
    theThis.path.lineTo(modifierWidth, this.height)
    theThis.path.lineTo(0, this.height / 2)
    theThis.path.lineTo(modifierWidth, 0)
  }

  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.CustomShape
    return shapeType
  } 

}
