import { Graphics, MathUtils, ParagraphDirection, Rectangle } from '@/components/Engine'
import { EntityShapeType } from '../../../Shapes/src/EntityShape'
import { CustomShape } from '../../../Shapes'
import { CustomEntity, Shapes } from '../../../Items'
import { Type } from '../../../Items/src/Item'

const TYPE_POLYGON = 'Polygon'
const DESC_POLYGON = 'Polygon'
const TEXT_POLYGON = ''

export const PolygonTypes = [{ name: TYPE_POLYGON, description: DESC_POLYGON, 
  freeze: Shapes.FREEZE_NONE, text: TEXT_POLYGON, left: 0, top: 0, width: 100, height: 100, 
  modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, 
  modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
  adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, 
  adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
}]

export class Polygon extends CustomEntity {
  
  public constructor(left: number, top: number, width: number, height: number) {
    super(left, top, width, height, '', {shapeType: TYPE_POLYGON}, PolygonTypes)
    const customTypeInfo = this.parseTypeInfo({shapeType: TYPE_POLYGON})
    this._shape = new CustomShape(left, top, width, height, this.buildShape, customTypeInfo)
    this.initializeTheme()
  }


  public get types(): Type[] {
    return PolygonTypes
  }

  public buildShape(theThis: CustomShape) {
    const points = MathUtils.getPolygonInSquare(theThis.width, 5)
    theThis.path.reset()
    theThis.path.moveTo(points[0].x, points[0].y)
    for(let i = 1; i < 5; i ++) {
      theThis.path.lineTo(points[i].x, points[i].y)
    }
    theThis.path.close()
  }

  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.CustomShape
    return shapeType
  } 

}
