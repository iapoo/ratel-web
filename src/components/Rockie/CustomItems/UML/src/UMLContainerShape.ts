import { FontSlant, FontWeight, Graphics, ParagraphDirection, Point2, Rectangle, TextAlignment } from '@/components/Engine'
import { EntityShapeType } from '../../../Shapes/src/EntityShape'
import { CustomShape } from '../../../Shapes'
import { ContainerEntity, CustomEntity, CustomTableEntity, Shapes, TableEntity } from '../../../Items'
import { Categories, Type } from '../../../Items/src/Item'
import { ShapeOptions, ShapeType } from '@/components/Rockie/Items/src/ShapeEntity'


export class UMLContainers {
  public static TYPE_PACKAGE = 'Package'
  public static DESC_PACKAGE = 'Package'
  public static TEXT_PACKAGE = 'Package'
  public static TYPE_CONTAINER = 'Container'
  public static DESC_CONTAINER = 'Container'
  public static TEXT_CONTAINER = ''
}

export const UMLContainerTypes = [
  { name: UMLContainers.TYPE_PACKAGE, description: UMLContainers.DESC_PACKAGE, freeze: Shapes.FREEZE_NONE, text: UMLContainers.TEXT_PACKAGE, left: 0, top: 0, width: 200, height: 200, enableMask: false, 
    modifiable: true, modifierX: 0, modifierY: 32,  modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0.5, modifyInLine: true, modifyInPercent: false,
    controllable: true, controllerX: 90, controllerY: 0, controllerStartX: 0, controllerStartY: 0.05, controllerEndX: 1, controllerEndY: 0.05, controlInLine: true, controlInPercent: false,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true  },
  { name: UMLContainers.TYPE_CONTAINER, description: UMLContainers.DESC_CONTAINER, freeze: Shapes.FREEZE_NONE, text: UMLContainers.TEXT_CONTAINER, left: 0, top: 0, width: 200, height: 200, enableMask: false, 
    modifiable: false, modifierX: 0, modifierY: 32,  modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0.5, modifyInLine: true, modifyInPercent: false,
    controllable: false, controllerX: 90, controllerY: 0, controllerStartX: 0, controllerStartY: 0.05, controllerEndX: 1, controllerEndY: 0.05, controlInLine: true, controlInPercent: false,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true  },
]

export class UMLContainerShape extends ContainerEntity {

    public constructor(left: number, top: number, width: number, height: number, shapeOptions: ShapeOptions = { shapeType: UMLContainers.TYPE_PACKAGE }, shapeTypes: ShapeType[] = UMLContainerTypes) {
      super(left, top, width, height, shapeOptions, shapeTypes)
    }

    public get types(): Type[] {
      return UMLContainerTypes
    }

    public get category(): string {
      return Categories.CONTAINER
    }   

    protected parseEntityShapeType(type: string): EntityShapeType {
      let shapeType = EntityShapeType.Rectangle
      switch (type) {
        case UMLContainers.TYPE_PACKAGE:
          shapeType = EntityShapeType.VerticalContainer
          break;
        case UMLContainers.TYPE_CONTAINER:
          shapeType = EntityShapeType.Container
          break;
      }
      return shapeType
    } 

}
