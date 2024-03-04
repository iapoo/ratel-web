import { Graphics, ParagraphDirection, Rectangle } from '@/components/Engine'
import { EntityShapeType } from '../../Shapes/src/EntityShape'
import { Categories, Type } from './Item'
import { ShapeEntity, ShapeOptions, ShapeType, Shapes, } from './ShapeEntity'
import { CustomShape } from '../../Shapes'

export class CustomEntities {
  public static TYPE_CUSTOMER_SHAPE = 'CustomShape'
  public static DESC_CUSTOMER_SHAPE = 'CustomShape'
}

export interface CustomEntityType {
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

export const CustomEntityTypes = [{ name: CustomEntities.TYPE_CUSTOMER_SHAPE, description: CustomEntities.DESC_CUSTOMER_SHAPE, 
    freeze: Shapes.FREEZE_NONE, text: 'Custom Shape', left: 0, top: 0, width: 200, height: 200, 
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, 
    modifierEndY: 0, modifyInLine: true, modifyInPercent: true, adaptable: false, adapterX: 0, adapterY: 0,
    adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, 
    adaptInLine: true, adaptInPercent: true
}]

export class CustomEntity extends ShapeEntity {
  
  public constructor(left: number, top: number, width: number, height: number, 
      shapeOptions: ShapeOptions = { shapeType: CustomEntities.TYPE_CUSTOMER_SHAPE },
      shapeTypes: ShapeType[] = CustomEntityTypes) {
    super(left, top, width, height, shapeOptions, shapeTypes)
    const customTypeInfo = this.parseTypeInfo(shapeOptions)
    this._shape = new CustomShape(left, top, width, height, this.buildShape, customTypeInfo)
  }
  public get types(): Type[] {
    return CustomEntityTypes
  }

  public get category(): string {
    return Categories.CUSTOM_SHAPE
  }

  public buildShape(theThis: CustomShape) {
    theThis.path.reset()
    theThis.path.addOval(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
  }

  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.CustomShape
    return shapeType
  } 
}
