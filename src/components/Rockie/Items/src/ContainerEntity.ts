import { EntityShapeType } from '../../Shapes/src/EntityShape'
import { Categories, Type } from './Item'
import { ShapeEntity, ShapeOptions, ShapeType, Shapes, } from './ShapeEntity'

export class Containers {
  public static TYPE_CONTAINER = 'Container'
  public static TYPE_HORIZONTAL_CONTAINER = 'Horizontal Container'
  public static TYPE_VERTICAL_CONTAINER = 'Vertical Container'

  public static DESC_CONTAINER = 'Container'
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

export const ContainerTypes = [
  { name: Containers.TYPE_CONTAINER, description: Containers.DESC_CONTAINER, freeze: Containers.FREEZE_NONE, text: 'Container', left: 0, top: 0, width: 200, height: 200, 
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true  },
  { name: Containers.TYPE_HORIZONTAL_CONTAINER, description: Containers.DESC_HORIZONTAL_CONTAINER, freeze: Containers.FREEZE_NONE, text: 'Horizontal Container', left: 0, top: 0, width: 200, height: 200, 
    modifiable: true, modifierX: 32, modifierY: 0,  modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0, modifyInLine: true, modifyInPercent: false,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true  },
  { name: Containers.TYPE_VERTICAL_CONTAINER, description: Containers.DESC_VERTICAL_CONTAINER, freeze: Containers.FREEZE_NONE, text: 'Vertical Container', left: 0, top: 0, width: 200, height: 200, 
    modifiable: true, modifierX: 0, modifierY: 32,  modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0.5, modifyInLine: true, modifyInPercent: false,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true  },
]
export class ContainerEntity extends ShapeEntity {

    public constructor(left: number, top: number, width: number, height: number, shapeOptions: ShapeOptions = { shapeType: Containers.TYPE_CONTAINER }) {
      super(left, top, width, height, shapeOptions, ContainerTypes)
    }

    public get types(): Type[] {
      return ContainerTypes
    }

    public get category(): string {
      return Categories.CONTAINER
    }   

    protected parseEntityShapeType(type: string): EntityShapeType {
      let shapeType = EntityShapeType.Rectangle
      switch (type) {
        case Containers.TYPE_CONTAINER:
          shapeType = EntityShapeType.Container
          break;
        case Containers.TYPE_HORIZONTAL_CONTAINER:
          shapeType = EntityShapeType.HorizontalContainer
          break;
        case Containers.TYPE_VERTICAL_CONTAINER:
          shapeType = EntityShapeType.VerticalContainer
          break;
      }
      return shapeType
    } 

}
