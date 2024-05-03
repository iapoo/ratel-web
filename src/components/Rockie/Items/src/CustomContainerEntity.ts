import { Graphics, ParagraphDirection, Rectangle } from '@/components/Engine'
import { EntityShapeType } from '../../Shapes/src/EntityShape'
import { Categories, Type } from './Item'
import { ShapeEntity, ShapeOptions, ShapeType, Shapes, } from './ShapeEntity'
import { CustomContainerShape, CustomShape } from '../../Shapes'
import { ContainerEntity } from './ContainerEntity'

export class CustomContainerEntities {
  public static TYPE_ACTOR_LIFELINE = 'Actor Lifeline'
  public static DESC_ACTOR_LIFELINE = 'Actor Lifeline'
  public static TEXT_ACTOR_LIFELINE = 'Actor Lifeline'
  public static TYPE_OBJECT_LIFELINE = 'Object Lifeline'
  public static DESC_OBJECT_LIFELINE = 'Object Lifeline'
  public static TEXT_OBJECT_LIFELINE = 'Object'
}

export interface CustomContainerEntityType {
  name: string
  description: string
  freeze: string
  text: string
  left: number 
  top: number
  width: number
  height: number 
  enableMask: boolean
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

export const CustomContainerEntityTypes = [
  { name: CustomContainerEntities.TYPE_ACTOR_LIFELINE, description: CustomContainerEntities.DESC_ACTOR_LIFELINE, freeze: Shapes.FREEZE_NONE, text: CustomContainerEntities.TEXT_ACTOR_LIFELINE, left: 0, top: 0, width: 160, height: 300, enableMask: false, 
    modifiable: true, modifierX: 0, modifierY: 40,  modifierStartX: 0.5, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: true, modifyInPercent: false,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true  },
  { name: CustomContainerEntities.TYPE_OBJECT_LIFELINE, description: CustomContainerEntities.DESC_OBJECT_LIFELINE, freeze: Shapes.FREEZE_NONE, text: CustomContainerEntities.TEXT_OBJECT_LIFELINE, left: 0, top: 0, width: 160, height: 300, enableMask: false, 
    modifiable: true, modifierX: 0, modifierY: 40,  modifierStartX: 0.5, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: true, modifyInPercent: false,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true  },
]

export class CustomContainerEntity extends ContainerEntity {
  
  public constructor(left: number, top: number, width: number, height: number, name: string = '',
      shapeOptions: ShapeOptions = { shapeType: CustomContainerEntities.TYPE_OBJECT_LIFELINE },
      shapeTypes: ShapeType[] = CustomContainerEntityTypes) {
    super(left, top, width, height, shapeOptions, shapeTypes)
    const customTypeInfo = this.parseTypeInfo(shapeOptions)
    this._shape = new CustomContainerShape(left, top, width, height, this.buildShape, customTypeInfo)
  }
  public get types(): Type[] {
    return CustomContainerEntityTypes
  }

  public get category(): string {
    return Categories.CUSTOM_SHAPE
  }

  public buildShape(theThis: CustomContainerShape) {
    theThis.path.reset()
    theThis.path.addOval(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
  }

  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.CustomContainer
    return shapeType
  } 
}
