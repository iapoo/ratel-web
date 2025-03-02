import { Rectangle, RoundRectangle, StrokeDashStyle, TextDecoration } from '@ratel-web/engine'
import { CustomEntity, ShapeConstants, Type } from '../../../Items'
import { CustomShape, EntityShapeType } from '../../../Shapes'

export class ERCustomShapes {
  public static TYPE_ENTITY = 'Entity'
  public static DESC_ENTITY = 'Entity'
  public static TEXT_ENTITY = 'Entity'
  public static TYPE_ENTITY_2 = 'Entity (Rounded)'
  public static DESC_ENTITY_2 = 'Entity (Rounded)'
  public static TEXT_ENTITY_2 = 'Entity'
  public static TYPE_ATTRIBUTE = 'Attribute'
  public static DESC_ATTRIBUTE = 'Attribute'
  public static TEXT_ATTRIBUTE = 'Attribute'
  public static TYPE_ATTRIBUTE_2 = 'Key Attribute'
  public static DESC_ATTRIBUTE_2 = 'Key Attribute'
  public static TEXT_ATTRIBUTE_2 = 'Attribute'
  public static TYPE_ATTRIBUTE_3 = 'Derived Attribute'
  public static DESC_ATTRIBUTE_3 = 'Derived Attribute'
  public static TEXT_ATTRIBUTE_3 = 'Attribute'
  public static TYPE_ATTRIBUTE_4 = 'Multivalue Attribute'
  public static DESC_ATTRIBUTE_4 = 'Multivalue Attribute'
  public static TEXT_ATTRIBUTE_4 = 'Attribute'
  public static TYPE_RELATIONSHIP = 'Relationship'
  public static DESC_RELATIONSHIP = 'Relationship'
  public static TEXT_RELATIONSHIP = 'Relationship'
  public static TYPE_RELATIONSHIP_2 = 'Identifying Relationship'
  public static DESC_RELATIONSHIP_2 = 'Identifying Relationship'
  public static TEXT_RELATIONSHIP_2 = 'Relationship'
}

export const ERCustomShapeTypes = [
  {
    name: ERCustomShapes.TYPE_ENTITY,
    description: ERCustomShapes.DESC_ENTITY,
    freeze: ShapeConstants.FREEZE_NONE,
    text: ERCustomShapes.TEXT_ENTITY,
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
    name: ERCustomShapes.TYPE_ENTITY_2,
    description: ERCustomShapes.DESC_ENTITY_2,
    freeze: ShapeConstants.FREEZE_NONE,
    text: ERCustomShapes.TEXT_ENTITY_2,
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
    name: ERCustomShapes.TYPE_ATTRIBUTE,
    description: ERCustomShapes.DESC_ATTRIBUTE,
    freeze: ShapeConstants.FREEZE_NONE,
    text: ERCustomShapes.TEXT_ATTRIBUTE,
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
    name: ERCustomShapes.TYPE_ATTRIBUTE_2,
    description: ERCustomShapes.DESC_ATTRIBUTE_2,
    freeze: ShapeConstants.FREEZE_NONE,
    text: ERCustomShapes.TEXT_ATTRIBUTE_2,
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
    name: ERCustomShapes.TYPE_ATTRIBUTE_3,
    description: ERCustomShapes.DESC_ATTRIBUTE_3,
    freeze: ShapeConstants.FREEZE_NONE,
    text: ERCustomShapes.TEXT_ATTRIBUTE_3,
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
    name: ERCustomShapes.TYPE_ATTRIBUTE_4,
    description: ERCustomShapes.DESC_ATTRIBUTE_4,
    freeze: ShapeConstants.FREEZE_NONE,
    text: ERCustomShapes.TEXT_ATTRIBUTE_4,
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
    name: ERCustomShapes.TYPE_RELATIONSHIP,
    description: ERCustomShapes.DESC_RELATIONSHIP,
    freeze: ShapeConstants.FREEZE_NONE,
    text: ERCustomShapes.TEXT_RELATIONSHIP,
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
    name: ERCustomShapes.TYPE_RELATIONSHIP_2,
    description: ERCustomShapes.DESC_RELATIONSHIP_2,
    freeze: ShapeConstants.FREEZE_NONE,
    text: ERCustomShapes.TEXT_RELATIONSHIP_2,
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
]

export class ERCustomShape extends CustomEntity {
  public constructor(left: number, top: number, width: number, height: number, typeName: string) {
    super(left, top, width, height, '', { shapeType: typeName }, ERCustomShapeTypes)
    const customTypeInfo = this.parseTypeInfo({ shapeType: typeName })
    this._shape = new CustomShape(left, top, width, height, this.buildShape, customTypeInfo)
    this.initializeTheme()
    this.initializeShape()
  }

  public get types(): Type[] {
    return ERCustomShapeTypes
  }

  private initializeShape() {
    switch (this._shape.typeInfo.name) {
      case ERCustomShapes.TYPE_ENTITY: {
        this.text = this._shape.typeInfo.text
        break
      }
      case ERCustomShapes.TYPE_ENTITY_2: {
        this.text = this._shape.typeInfo.text
        break
      }
      case ERCustomShapes.TYPE_ATTRIBUTE: {
        this.text = this._shape.typeInfo.text
        break
      }
      case ERCustomShapes.TYPE_ATTRIBUTE_2: {
        this.textDecoration = TextDecoration.UNDERLINE
        this.text = this._shape.typeInfo.text
        break
      }
      case ERCustomShapes.TYPE_ATTRIBUTE_3: {
        this.strokeDashStyle = StrokeDashStyle.DASH
        this.text = this._shape.typeInfo.text
        break
      }
      case ERCustomShapes.TYPE_ATTRIBUTE_4: {
        this.text = this._shape.typeInfo.text
        break
      }
      case ERCustomShapes.TYPE_RELATIONSHIP: {
        this.text = this._shape.typeInfo.text
        break
      }
      case ERCustomShapes.TYPE_RELATIONSHIP_2: {
        this.text = this._shape.typeInfo.text
        break
      }
      default:
        break
    }
  }

  public buildShape(theThis: CustomShape) {
    let modifierWidth = theThis.modifier.x + theThis.typeInfo.modifierStart.x * theThis.width
    let modifierHeight = theThis.modifier.y + theThis.typeInfo.modifierStart.y * theThis.height
    let controllerWidth = theThis.controller.x + theThis.typeInfo.controllerStart.x * theThis.width
    let controllerHeight = theThis.controller.y + theThis.typeInfo.controllerStart.y * theThis.height
    let adapterWidth = theThis.adapter.x + theThis.typeInfo.adapterStart.x * theThis.width
    let adapterHeight = theThis.adapter.y + theThis.typeInfo.adapterStart.y * theThis.height
    let adapterSizeX = theThis.adapterSize
    let adapterSizeY = theThis.adapterSize
    if (theThis.typeInfo.modifyInPercent) {
      modifierWidth =
        theThis.width * theThis.modifier.x * (theThis.typeInfo.modifierEnd.x - theThis.typeInfo.modifierStart.x) +
        theThis.typeInfo.modifierStart.x * theThis.width
      modifierHeight =
        theThis.height * theThis.modifier.y * (theThis.typeInfo.modifierEnd.y - theThis.typeInfo.modifierStart.y) +
        theThis.typeInfo.modifierStart.y * theThis.height
    }
    if (theThis.typeInfo.controlInPercent) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      controllerWidth =
        theThis.width * theThis.controller.x * (theThis.typeInfo.controllerEnd.x - theThis.typeInfo.controllerStart.x) +
        theThis.typeInfo.controllerStart.x * theThis.width
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      controllerHeight =
        theThis.height * theThis.controller.y * (theThis.typeInfo.controllerEnd.y - theThis.typeInfo.controllerStart.y) +
        theThis.typeInfo.controllerStart.y * theThis.height
    }
    if (theThis.typeInfo.adaptInPercent) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      adapterWidth =
        theThis.width * theThis.adapter.x * (theThis.typeInfo.adapterEnd.x - theThis.typeInfo.adapterStart.x) + theThis.typeInfo.adapterStart.x * theThis.width
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      adapterHeight =
        theThis.height * theThis.adapter.y * (theThis.typeInfo.adapterEnd.y - theThis.typeInfo.adapterStart.y) +
        theThis.typeInfo.adapterStart.y * theThis.height
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      adapterSizeX = theThis.adapterSize * (theThis.typeInfo.adapterEnd.x - theThis.typeInfo.adapterStart.x) * this.width
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      adapterSizeY = theThis.adapterSize * (theThis.typeInfo.adapterEnd.y - theThis.typeInfo.adapterStart.y) * this.height
    }
    theThis.path.reset()
    theThis.secondPath.reset()
    switch (theThis.typeInfo.name) {
      case ERCustomShapes.TYPE_ENTITY: {
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        break
      }
      case ERCustomShapes.TYPE_ENTITY_2: {
        theThis.path.addRRect(new RoundRectangle(0, 0, this.width, this.height, modifierWidth, modifierHeight))
        break
      }
      case ERCustomShapes.TYPE_ATTRIBUTE: {
        theThis.path.addOval(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        break
      }
      case ERCustomShapes.TYPE_ATTRIBUTE_2: {
        theThis.path.addOval(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        break
      }
      case ERCustomShapes.TYPE_ATTRIBUTE_3: {
        theThis.path.addOval(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        break
      }
      case ERCustomShapes.TYPE_ATTRIBUTE_4: {
        const offsetWidth = theThis.height * 0.1
        const offsetHeight = theThis.height * 0.1
        theThis.secondStroke.setColor(theThis.stroke.getColor())
        theThis.secondStroke.setStrokeWidth(theThis.stroke.getStrokeWidth())
        theThis.secondStroke.setStrokeDashStyle(theThis.stroke.getStrokeDashStyle())
        theThis.secondFill.setAlpha(0)
        theThis.path.addOval(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        theThis.secondPath.addOval(Rectangle.makeLTWH(offsetWidth, offsetHeight, theThis.width - offsetWidth * 2, theThis.height - offsetHeight * 2))
        break
      }
      case ERCustomShapes.TYPE_RELATIONSHIP: {
        theThis.path.moveTo(this.width / 2, 0)
        theThis.path.lineTo(this.width, this.height / 2)
        theThis.path.lineTo(this.width / 2, this.height)
        theThis.path.lineTo(0, this.height / 2)
        theThis.path.lineTo(this.width / 2, 0)
        break
      }
      case ERCustomShapes.TYPE_RELATIONSHIP_2: {
        const offsetWidth = theThis.width * 0.1
        const offsetHeight = theThis.height * 0.1
        theThis.secondStroke.setColor(theThis.stroke.getColor())
        theThis.secondStroke.setStrokeWidth(theThis.stroke.getStrokeWidth())
        theThis.secondStroke.setStrokeDashStyle(theThis.stroke.getStrokeDashStyle())
        theThis.secondFill.setAlpha(0)
        theThis.path.moveTo(this.width / 2, 0)
        theThis.path.lineTo(this.width, this.height / 2)
        theThis.path.lineTo(this.width / 2, this.height)
        theThis.path.lineTo(0, this.height / 2)
        theThis.path.lineTo(this.width / 2, 0)
        theThis.secondPath.moveTo(this.width / 2, offsetHeight)
        theThis.secondPath.lineTo(this.width - offsetWidth, this.height / 2)
        theThis.secondPath.lineTo(this.width / 2, this.height - offsetHeight)
        theThis.secondPath.lineTo(offsetWidth, this.height / 2)
        theThis.secondPath.lineTo(this.width / 2, offsetHeight)
        break
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.CustomShape
    return shapeType
  }
}
