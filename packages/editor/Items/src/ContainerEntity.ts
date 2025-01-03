import { ParagraphDirection } from '@ratel-web/engine'
import { EntityShapeType } from '../../Shapes'
import { Categories, Type } from './Item'
import { ShapeConstants, ShapeEntity, ShapeOptions, ShapeType } from './ShapeEntity'

export class Containers {
  public static TYPE_CONTAINER = 'Container'
  public static TYPE_HORIZONTAL_CONTAINER = 'Horizontal Container'
  public static TYPE_HORIZONTAL_CONTAINER_2 = 'Horizontal Container 2'
  public static TYPE_VERTICAL_CONTAINER = 'Vertical Container'
  public static TYPE_VERTICAL_CONTAINER_2 = 'Vertical Container 2'

  public static DESC_CONTAINER = 'Container'
  public static DESC_HORIZONTAL_CONTAINER = 'Horizontal Container'
  public static DESC_VERTICAL_CONTAINER = 'Vertical Container'
}

export const ContainerTypes = [
  {
    name: Containers.TYPE_CONTAINER,
    description: Containers.DESC_CONTAINER,
    freeze: ShapeConstants.FREEZE_NONE,
    text: 'Container',
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
    controllable: false,
    controllerX: 0,
    controllerY: 0,
    controllerStartX: 0,
    controllerStartY: 0,
    controllerEndX: 0,
    controllerEndY: 0,
    controlInLine: true,
    controlInPercent: true,
    adaptable: false,
    adapterX: 0,
    adapterY: 0,
    adapterDirection: 'X',
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: Containers.TYPE_HORIZONTAL_CONTAINER,
    description: Containers.DESC_HORIZONTAL_CONTAINER,
    freeze: ShapeConstants.FREEZE_NONE,
    text: 'Horizontal Container',
    left: 0,
    top: 0,
    width: 200,
    height: 200,
    enableMask: false,
    modifiable: true,
    modifierX: 32,
    modifierY: 0,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 0.5,
    modifierEndY: 0,
    modifyInLine: true,
    modifyInPercent: false,
    controllable: true,
    controllerX: 0,
    controllerY: 0,
    controllerStartX: 0.05,
    controllerStartY: 0,
    controllerEndX: 0.05,
    controllerEndY: 1,
    controlInLine: true,
    controlInPercent: true,
    adaptable: false,
    adapterX: 0,
    adapterY: 0,
    adapterDirection: 'X',
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: Containers.TYPE_HORIZONTAL_CONTAINER_2,
    description: Containers.DESC_HORIZONTAL_CONTAINER,
    freeze: ShapeConstants.FREEZE_NONE,
    text: 'Container',
    left: 0,
    top: 0,
    width: 200,
    height: 200,
    enableMask: false,
    modifiable: true,
    modifierX: 32,
    modifierY: 0,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 0.5,
    modifierEndY: 0,
    modifyInLine: true,
    modifyInPercent: false,
    controllable: true,
    controllerX: 0,
    controllerY: 90,
    controllerStartX: 0.05,
    controllerStartY: 0,
    controllerEndX: 0.05,
    controllerEndY: 1,
    controlInLine: true,
    controlInPercent: false,
    adaptable: false,
    adapterX: 0,
    adapterY: 0,
    adapterDirection: 'X',
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: Containers.TYPE_VERTICAL_CONTAINER,
    description: Containers.DESC_VERTICAL_CONTAINER,
    freeze: ShapeConstants.FREEZE_NONE,
    text: 'Vertical Container',
    left: 0,
    top: 0,
    width: 200,
    height: 200,
    enableMask: false,
    modifiable: true,
    modifierX: 0,
    modifierY: 32,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 0,
    modifierEndY: 0.5,
    modifyInLine: true,
    modifyInPercent: false,
    controllable: true,
    controllerX: 1,
    controllerY: 0,
    controllerStartX: 0,
    controllerStartY: 0.05,
    controllerEndX: 1,
    controllerEndY: 0.05,
    controlInLine: true,
    controlInPercent: true,
    adaptable: false,
    adapterX: 0,
    adapterY: 0,
    adapterDirection: 'X',
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: Containers.TYPE_VERTICAL_CONTAINER_2,
    description: Containers.DESC_VERTICAL_CONTAINER,
    freeze: ShapeConstants.FREEZE_NONE,
    text: 'Container',
    left: 0,
    top: 0,
    width: 200,
    height: 200,
    enableMask: false,
    modifiable: true,
    modifierX: 0,
    modifierY: 32,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 0,
    modifierEndY: 0.5,
    modifyInLine: true,
    modifyInPercent: false,
    controllable: true,
    controllerX: 90,
    controllerY: 0,
    controllerStartX: 0,
    controllerStartY: 0.05,
    controllerEndX: 1,
    controllerEndY: 0.05,
    controlInLine: true,
    controlInPercent: false,
    adaptable: false,
    adapterX: 0,
    adapterY: 0,
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
export class ContainerEntity extends ShapeEntity {
  public constructor(
    left: number,
    top: number,
    width: number,
    height: number,
    shapeOptions: ShapeOptions = { shapeType: Containers.TYPE_CONTAINER },
    shapeTypes: ShapeType[] = ContainerTypes,
  ) {
    super(left, top, width, height, shapeOptions, shapeTypes)
    switch (shapeOptions.shapeType) {
      case Containers.TYPE_HORIZONTAL_CONTAINER:
      case Containers.TYPE_HORIZONTAL_CONTAINER_2:
        this.shape.paragraphDirection = ParagraphDirection.BottomTop
        break
      case Containers.TYPE_VERTICAL_CONTAINER:
      case Containers.TYPE_VERTICAL_CONTAINER_2:
        break
      default:
      case Containers.TYPE_CONTAINER:
        break
    }
  }

  public get isContainer(): boolean {
    return true
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
        break
      case Containers.TYPE_HORIZONTAL_CONTAINER:
      case Containers.TYPE_HORIZONTAL_CONTAINER_2:
        shapeType = EntityShapeType.HorizontalContainer
        break
      case Containers.TYPE_VERTICAL_CONTAINER:
      case Containers.TYPE_VERTICAL_CONTAINER_2:
        shapeType = EntityShapeType.VerticalContainer
        break
    }
    return shapeType
  }
}
