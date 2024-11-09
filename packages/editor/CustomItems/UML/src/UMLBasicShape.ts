import { Categories, ShapeConstants, ShapeEntity, ShapeOptions, ShapeType, Type } from '../../../Items'
import { EntityShapeType } from '../../../Shapes'

export class UMLBasicShapes {
  public static TYPE_USE_CASE = 'Use Case'
  public static DESC_USE_CASE = 'Use Case'
  public static TEXT_USE_CASE = 'Use Case'
  public static TYPE_NOTE = 'Note'
  public static DESC_NOTE = 'Note'
  public static TEXT_NOTE = ''
  public static TYPE_ACTOR = 'Actor'
  public static DESC_ACTOR = 'Actor'
  public static TEXT_ACTOR = ''
  public static TYPE_ACTION = 'Action'
  public static DESC_ACTION = 'Action'
  public static TEXT_ACTION = 'Action'
  public static TYPE_DECISION = 'Decision'
  public static DESC_DECISION = 'Decision'
  public static TEXT_DECISION = ''
}

export const UMLBasicShapeTypes = [
  {
    name: UMLBasicShapes.TYPE_USE_CASE,
    description: UMLBasicShapes.DESC_USE_CASE,
    freeze: ShapeConstants.FREEZE_NONE,
    text: UMLBasicShapes.TEXT_USE_CASE,
    left: 0,
    top: 0,
    width: 120,
    height: 60,
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
    name: UMLBasicShapes.TYPE_NOTE,
    description: UMLBasicShapes.DESC_NOTE,
    freeze: ShapeConstants.FREEZE_NONE,
    text: UMLBasicShapes.TEXT_NOTE,
    left: 0,
    top: 0,
    width: 120,
    height: 80,
    enableMask: false,
    modifiable: true,
    modifierX: 0.6,
    modifierY: 0.4,
    modifierStartX: 0.5,
    modifierStartY: 0,
    modifierEndX: 1,
    modifierEndY: 0.5,
    modifyInLine: false,
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
    name: UMLBasicShapes.TYPE_ACTOR,
    description: UMLBasicShapes.DESC_ACTOR,
    freeze: ShapeConstants.FREEZE_NONE,
    text: UMLBasicShapes.TEXT_ACTOR,
    left: 0,
    top: 0,
    width: 30,
    height: 60,
    enableMask: true,
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
    name: UMLBasicShapes.TYPE_ACTION,
    description: UMLBasicShapes.DESC_ACTION,
    freeze: ShapeConstants.FREEZE_NONE,
    text: UMLBasicShapes.TEXT_ACTION,
    left: 0,
    top: 0,
    width: 120,
    height: 60,
    enableMask: false,
    modifiable: true,
    modifierX: 0.2,
    modifierY: 0.2,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 0.5,
    modifierEndY: 0.5,
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
    name: UMLBasicShapes.TYPE_DECISION,
    description: UMLBasicShapes.DESC_DECISION,
    freeze: ShapeConstants.FREEZE_NONE,
    text: UMLBasicShapes.TEXT_DECISION,
    left: 0,
    top: 0,
    width: 60,
    height: 60,
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
]

export class UMLBasicShape extends ShapeEntity {
  public constructor(
    left: number,
    top: number,
    width: number,
    height: number,
    shapeOptions: ShapeOptions = { shapeType: UMLBasicShapes.TYPE_USE_CASE },
    shapeTypes: ShapeType[] = UMLBasicShapeTypes,
  ) {
    super(left, top, width, height, shapeOptions, shapeTypes)
    this.initializeShape()
  }

  public get types(): Type[] {
    return UMLBasicShapeTypes
  }

  public get category(): string {
    return Categories.EXTENDED_SHAPE
  }

  private initializeShape() {
    switch (this.shapeType.name) {
      case UMLBasicShapes.TYPE_USE_CASE:
        break
      case UMLBasicShapes.TYPE_NOTE:
        break
      case UMLBasicShapes.TYPE_ACTOR:
        break
      case UMLBasicShapes.TYPE_ACTION:
        break
      case UMLBasicShapes.TYPE_DECISION:
        break
    }
  }
  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.Rectangle
    switch (type) {
      case UMLBasicShapes.TYPE_USE_CASE:
        shapeType = EntityShapeType.Ellipse
        break
      case UMLBasicShapes.TYPE_NOTE:
        shapeType = EntityShapeType.Note
        break
      case UMLBasicShapes.TYPE_ACTOR:
        shapeType = EntityShapeType.Actor
        break
      case UMLBasicShapes.TYPE_ACTION:
        shapeType = EntityShapeType.RoundRectangle
        break
      case UMLBasicShapes.TYPE_DECISION:
        shapeType = EntityShapeType.Diamond
        break
    }
    return shapeType
  }
}
