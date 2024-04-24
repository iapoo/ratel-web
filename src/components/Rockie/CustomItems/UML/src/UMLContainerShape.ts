import { FontSlant, FontWeight, Graphics, ParagraphDirection, Point2, Rectangle, TextAlignment } from '@/components/Engine'
import { EntityShapeType } from '../../../Shapes/src/EntityShape'
import { CustomShape } from '../../../Shapes'
import { ContainerEntity, CustomEntity, CustomTableEntity, Shapes, TableEntity } from '../../../Items'
import { Type } from '../../../Items/src/Item'
import { ShapeOptions } from '@/components/Rockie/Items/src/ShapeEntity'


export class UMLContainers {
  public static TYPE_HORIZONTAL_CONTAINER = 'Horizontal Container'
  public static TYPE_VERTICAL_CONTAINER = 'Vertical Container'

  public static DESC_HORIZONTAL_CONTAINER = 'Horizontal Container'
  public static DESC_VERTICAL_CONTAINER = 'Vertical Container'

  public static FREEZE_NONE = 'None'
  public static FREEZE_WIDTH = 'Width'
  public static FREEZE_WIDTH_HEIGHT =  'WidthHeight'
  public static FREEZE_HEIGHT = 'Height'
  public static FREEZE_ASPECT_RATIO = 'AspectRatio'

  public static ADAPTER_DIRECTION_X = 'X'
  public static ADAPTER_DIRECTION_Y = 'Y'

}

export const UMLContainerTypes = [
  { name: UMLContainers.TYPE_HORIZONTAL_CONTAINER, description: UMLContainers.DESC_HORIZONTAL_CONTAINER, freeze: UMLContainers.FREEZE_NONE, text: 'Horizontal Container', left: 0, top: 0, width: 200, height: 200, enableMask: false, 
    modifiable: true, modifierX: 32, modifierY: 0,  modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0, modifyInLine: true, modifyInPercent: false,
    controllable: true, controllerX: 0, controllerY: 1, controllerStartX: 0.05, controllerStartY: 0, controllerEndX: 0.05, controllerEndY: 1, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true  },
  { name: UMLContainers.TYPE_VERTICAL_CONTAINER, description: UMLContainers.DESC_VERTICAL_CONTAINER, freeze: UMLContainers.FREEZE_NONE, text: 'Vertical Container', left: 0, top: 0, width: 200, height: 200, enableMask: false, 
    modifiable: true, modifierX: 0, modifierY: 32,  modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0.5, modifyInLine: true, modifyInPercent: false,
    controllable: true, controllerX: 1, controllerY: 0, controllerStartX: 0, controllerStartY: 0.05, controllerEndX: 1, controllerEndY: 0.05, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true  },
]
/**
 * TODO： Not implemented yet
 */
export class UMLContainerEntity extends ContainerEntity {

    public constructor(left: number, top: number, width: number, height: number, shapeOptions: ShapeOptions = { shapeType: UMLContainers.TYPE_VERTICAL_CONTAINER }) {
      super(left, top, width, height, shapeOptions)
      this.shape.controller = new Point2(0.4, 0)
    }

}
