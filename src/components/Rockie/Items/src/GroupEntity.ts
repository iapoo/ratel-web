import { Graphics, ParagraphDirection, Rectangle } from '@/components/Engine'
import { EntityShapeType } from '../../Shapes/src/EntityShape'
import { Categories, Type } from './Item'
import { ShapeEntity, ShapeOptions, ShapeType, Shapes, } from './ShapeEntity'
import { GroupShape } from '../../Shapes'

export class GroupEntities {
  public static TYPE_GROUP_SHAPE = 'GroupShape'
  public static DESC_GROUP_SHAPE = 'GroupShape'
}

export interface GroupEntityType {
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

export const GroupEntityTypes = [{ name: GroupEntities.TYPE_GROUP_SHAPE, description: GroupEntities.DESC_GROUP_SHAPE, 
    freeze: Shapes.FREEZE_NONE, text: 'Group Shape', left: 0, top: 0, width: 200, height: 200, enableMask: false, 
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, 
    modifierEndY: 0, modifyInLine: true, modifyInPercent: true, adaptable: false, adapterX: 0, adapterY: 0,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, 
    adaptInLine: true, adaptInPercent: true
}]

export class GroupEntity extends ShapeEntity {
  
  public constructor(left: number, top: number, width: number, height: number, name: string = '',
      shapeOptions: ShapeOptions = { shapeType: GroupEntities.TYPE_GROUP_SHAPE },
      shapeTypes: ShapeType[] = GroupEntityTypes) {
    super(left, top, width, height, shapeOptions, shapeTypes)
    const customTypeInfo = this.parseTypeInfo(shapeOptions)
    this._shape = new GroupShape(left, top, width, height, this.buildShape, customTypeInfo)
  }
  public get types(): Type[] {
    return GroupEntityTypes
  }

  public get category(): string {
    return Categories.GROUP
  }

  public buildShape(theThis: GroupShape) {
    theThis.path.reset()
    theThis.path.addOval(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
  }

  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.Group
    return shapeType
  } 
}
