import { Graphics, MathUtils, ParagraphDirection, Rectangle } from '@/components/Engine'
import { EntityShapeType } from '../../../Shapes/src/EntityShape'
import { CustomShape } from '../../../Shapes'
import { CustomEntity, ShapeEntity, Shapes } from '../../../Items'
import { Categories, Type } from '../../../Items/src/Item'
import { ShapeOptions, ShapeType } from '@/components/Rockie/Items/src/ShapeEntity'

export class UMLBasicShapes {
  public static TYPE_USE_CASE = 'Use Case'
  public static DESC_USE_CASE = 'Use Case'
  public static TEXT_USE_CASE = 'Use Case'
  public static TYPE_NOTE = 'Note'
  public static DESC_NOTE = 'Note'
  public static TEXT_NOTE = 'Note'
  public static TYPE_ACTOR = 'Actor'
  public static DESC_ACTOR = 'Actor'
  public static TEXT_ACTOR = 'Actor'
}

export const UMLBasicShapeTypes = [
  { name: UMLBasicShapes.TYPE_USE_CASE, description: UMLBasicShapes.DESC_USE_CASE, freeze: Shapes.FREEZE_NONE, text: UMLBasicShapes.TEXT_USE_CASE, left: 0, top: 0, width: 120, height: 60, enableMask: false, 
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true  },
  { name: Shapes.TYPE_NOTE, description: Shapes.DESC_NOTE, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 120, height: 80,  enableMask: false,
    modifiable: true, modifierX: 0.6, modifierY: 0.4, modifierStartX: 0.5, modifierStartY: 0, modifierEndX: 1, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true  },
    { name: Shapes.TYPE_ACTOR, description: Shapes.DESC_ACTOR, freeze: Shapes.FREEZE_NONE, text: '', left: 0, top: 0, width: 30, height: 60,  enableMask: true,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true },
]

export class UMLBasicShape extends ShapeEntity {

    public constructor(left: number, top: number, width: number, height: number, shapeOptions: ShapeOptions = { shapeType: UMLBasicShapes.TYPE_USE_CASE }, shapeTypes: ShapeType[] = UMLBasicShapeTypes) {
      super(left, top, width, height, shapeOptions, shapeTypes)
    }

    public get types(): Type[] {
      return UMLBasicShapeTypes
    }

    public get category(): string {
      return Categories.SHAPE
    }   

    protected parseEntityShapeType(type: string): EntityShapeType {
      let shapeType = EntityShapeType.Rectangle
      switch (type) {
        case UMLBasicShapes.TYPE_USE_CASE:
          shapeType = EntityShapeType.Ellipse
          break;
        case UMLBasicShapes.TYPE_NOTE:
          shapeType = EntityShapeType.Note
          break;
        case UMLBasicShapes.TYPE_ACTOR:
          shapeType = EntityShapeType.Actor
          break;
      }
      return shapeType
    } 

}
