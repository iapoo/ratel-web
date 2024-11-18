import { Rectangle } from '@ratel-web/engine'
import { CustomShape, EntityShapeType } from '../../Shapes'
import { Categories, Type } from './Item'
import { ShapeConstants, ShapeEntity, ShapeOptions, ShapeType } from './ShapeEntity'

export class CustomEntities {
  public static TYPE_CUSTOM_SHAPE = 'CustomShape'
  public static DESC_CUSTOM_SHAPE = 'CustomShape'
}

export interface CustomEntityType {
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

export interface CustomEntityTypeInfo {
  name: string
  type: typeof CustomEntity
  typeInfo: ShapeType
}

export const CustomEntityTypes = [
  {
    name: CustomEntities.TYPE_CUSTOM_SHAPE,
    description: CustomEntities.DESC_CUSTOM_SHAPE,
    freeze: ShapeConstants.FREEZE_NONE,
    text: 'Custom Shape',
    left: 0,
    top: 0,
    width: 200,
    height: 200,
    enableMask: false,
    modifiable: false,
    modifierX: 0,
    modifierY: 0,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 0,
    modifierEndY: 0,
    modifyInLine: true,
    modifyInPercent: true,
    adaptable: false,
    adapterX: 0,
    adapterY: 0,
    controllable: false,
    controllerX: 0,
    controllerY: 0,
    controllerStartX: 0,
    controllerStartY: 0,
    controllerEndX: 0,
    controllerEndY: 0,
    controlInLine: true,
    controlInPercent: true,
    adapterDirection: 'X',
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
]

export class CustomEntity extends ShapeEntity {
  public constructor(
    left: number,
    top: number,
    width: number,
    height: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    name: string = '',
    shapeOptions: ShapeOptions = { shapeType: CustomEntities.TYPE_CUSTOM_SHAPE },
    shapeTypes: ShapeType[] = CustomEntityTypes,
  ) {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.CustomShape
    return shapeType
  }
}