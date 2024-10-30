import { Graphics, MathUtils, ParagraphDirection, Rectangle } from '@/components/Engine'
import { EntityShapeType } from '../../../Shapes/src/EntityShape'
import { CustomShape } from '../../../Shapes'
import { CustomEntity, Shapes } from '../../../Items'
import { Type } from '../../../Items/src/Item'

const TYPE_POLYGON_5 = 'Hexagon'
const DESC_POLYGON_5 = 'Hexagon'
const TYPE_POLYGON_6 = 'Heptagon'
const DESC_POLYGON_6 = 'Heptagon'
const TYPE_POLYGON_8 = 'Octagonn'
const DESC_POLYGON_8 = 'Octagonn'
const TYPE_POLYGON_10 = 'Decagon'
const DESC_POLYGON_10 = 'Decagon'
const TEXT_POLYGON = ''

export const PolygonTypes = [
  {
    name: TYPE_POLYGON_5, description: DESC_POLYGON_5, freeze: Shapes.FREEZE_NONE, text: TEXT_POLYGON, left: 0, top: 0, width: 100, height: 100, enableMask: false,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: TYPE_POLYGON_6, description: DESC_POLYGON_6, freeze: Shapes.FREEZE_NONE, text: TEXT_POLYGON, left: 0, top: 0, width: 100, height: 100, enableMask: false,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: TYPE_POLYGON_8, description: DESC_POLYGON_8, freeze: Shapes.FREEZE_NONE, text: TEXT_POLYGON, left: 0, top: 0, width: 100, height: 100, enableMask: false,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: TYPE_POLYGON_10, description: DESC_POLYGON_10, freeze: Shapes.FREEZE_NONE, text: TEXT_POLYGON, left: 0, top: 0, width: 100, height: 100, enableMask: false,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
]

export class Polygon extends CustomEntity {

  public constructor(left: number, top: number, width: number, height: number, polygonType: string) {
    super(left, top, width, height, '', { shapeType: polygonType }, PolygonTypes)
    const customTypeInfo = this.parseTypeInfo({ shapeType: polygonType })
    this._shape = new CustomShape(left, top, width, height, this.buildShape, customTypeInfo)
    this.initializeTheme()
  }


  public get types(): Type[] {
    return PolygonTypes
  }

  public buildShape(theThis: CustomShape) {
    let sideCount = 5
    switch (theThis.typeInfo.name) {
      case TYPE_POLYGON_5:
        sideCount = 5
        break
      case TYPE_POLYGON_6:
        sideCount = 6
        break
      case TYPE_POLYGON_8:
        sideCount = 7
        break
      case TYPE_POLYGON_10:
        sideCount = 10
        break
      default:
        sideCount = 5
        break
    }
    const points = MathUtils.getPolygonInSquare(theThis.width, sideCount)
    theThis.path.reset()
    theThis.path.moveTo(points[0].x, points[0].y)
    for (let i = 1; i < sideCount; i++) {
      theThis.path.lineTo(points[i].x, points[i].y)
    }
    theThis.path.close()
  }

  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.CustomShape
    return shapeType
  }

}
