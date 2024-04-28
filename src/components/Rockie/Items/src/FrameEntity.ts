import { Graphics, ParagraphDirection, Rectangle } from '@/components/Engine'
import { EntityShapeType } from '../../Shapes/src/EntityShape'
import { Categories, Type } from './Item'
import { ShapeEntity, ShapeOptions, ShapeType, Shapes, } from './ShapeEntity'
import { FrameShape } from '../../Shapes'

export class FrameEntities {
  public static TYPE_FRAME_SHAPE = 'FrameShape'
  public static DESC_FRAME_SHAPE = 'FrameShape'
}

export interface FrameEntityType {
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

export const FrameEntityTypes = [{ name: FrameEntities.TYPE_FRAME_SHAPE, description: FrameEntities.DESC_FRAME_SHAPE, 
    freeze: Shapes.FREEZE_NONE, text: 'Frame Shape', left: 0, top: 0, width: 200, height: 200, enableMask: false, 
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, 
    modifierEndY: 0, modifyInLine: true, modifyInPercent: true, adaptable: false, adapterX: 0, adapterY: 0,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, 
    adaptInLine: true, adaptInPercent: true
}]

export class FrameEntity extends ShapeEntity {
  
  public constructor(left: number, top: number, width: number, height: number, name: string = '',
      shapeOptions: ShapeOptions = { shapeType: FrameEntities.TYPE_FRAME_SHAPE },
      shapeTypes: ShapeType[] = FrameEntityTypes) {
    super(left, top, width, height, shapeOptions, shapeTypes)
    const customTypeInfo = this.parseTypeInfo(shapeOptions)
    this._shape = new FrameShape(left, top, width, height, this, this.buildShape, customTypeInfo)
  }
  public get types(): Type[] {
    return FrameEntityTypes
  }

  public get category(): string {
    return Categories.FRAME
  }

  public buildShape(theThis: FrameShape, entity: any) {
    theThis.path.reset()
    theThis.path.addOval(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
  }

  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.Frame
    return shapeType
  } 
}
