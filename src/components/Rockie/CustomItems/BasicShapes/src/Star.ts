import { Graphics, MathUtils, ParagraphDirection, Point2, Rectangle } from '@/components/Engine'
import { EntityShapeType } from '../../../Shapes/src/EntityShape'
import { CustomShape } from '../../../Shapes'
import { CustomEntity, Shapes } from '../../../Items'
import { Type } from '../../../Items/src/Item'
import { Line } from '@antv/g-math'

const TYPE_STAR = 'Star'
const DESC_STAR = 'Star'
const TEXT_STAR = ''

export const StarTypes = [{ name: TYPE_STAR, description: DESC_STAR, 
  freeze: Shapes.FREEZE_NONE, text: TEXT_STAR, left: 0, top: 0, width: 100, height: 100, 
  modifiable: true, modifierX: 0.5, modifierY: 0.5, modifierStartX: 0, modifierStartY: 0, 
  modifierEndX: 1, modifierEndY: 1, modifyInLine: true, modifyInPercent: true,
  adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, 
  adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
}]

export class Star extends CustomEntity {
  private _initialized: boolean = false

  public constructor(left: number, top: number, width: number, height: number) {
    super(left, top, width, height, {shapeType: TYPE_STAR}, StarTypes)
    const customTypeInfo = this.parseTypeInfo({shapeType: TYPE_STAR})
    this._shape = new CustomShape(left, top, width, height, this.buildShape, customTypeInfo)
    this.initializeTheme()
  }


  public get types(): Type[] {
    return StarTypes
  }

  public buildShape(theThis: CustomShape) {
    const [points, newPoints, centerPoint, adapterPoint] = MathUtils.getStar(theThis.width, 5)
    if(!this._initialized) {
      theThis.typeInfo.modifierStart = new Point2(centerPoint.x / theThis.width, centerPoint.y / theThis.height)
      theThis.typeInfo.modifierEnd = new Point2(adapterPoint.x / theThis.width, adapterPoint.y / theThis.height)
      this._initialized = true
    }
    let modifierWidth = theThis.modifier.x + theThis.typeInfo.modifierStart.x * theThis.width
    let modifierHeight = theThis.modifier.y + theThis.typeInfo.modifierStart.y * theThis.height
    let adapterWidth = theThis.adapter.x + theThis.typeInfo.adapterStart.x * theThis.width
    let adapterHeight = theThis.adapter.y + theThis.typeInfo.adapterStart.y * theThis.height
    let adapterSizeX = theThis.adapterSize
    let adapterSizeY = theThis.adapterSize
    if(theThis.typeInfo.modifyInPercent) {
      modifierWidth = theThis.width * theThis.modifier.x * (theThis.typeInfo.modifierEnd.x - theThis.typeInfo.modifierStart.x) + theThis.typeInfo.modifierStart.x * theThis.width
      modifierHeight = theThis.height * theThis.modifier.y * (theThis.typeInfo.modifierEnd.y - theThis.typeInfo.modifierStart.y) + theThis.typeInfo.modifierStart.y * theThis.height
    }
    if(theThis.typeInfo.adaptInPercent) {
      adapterWidth = theThis.width * theThis.adapter.x * (theThis.typeInfo.adapterEnd.x - theThis.typeInfo.adapterStart.x) + theThis.typeInfo.adapterStart.x * theThis.width
      adapterHeight = theThis.height * theThis.adapter.y * (theThis.typeInfo.adapterEnd.y - theThis.typeInfo.adapterStart.y) + theThis.typeInfo.adapterStart.y * theThis.height
      adapterSizeX = theThis.adapterSize * (theThis.typeInfo.adapterEnd.x - theThis.typeInfo.adapterStart.x) * theThis.width
      adapterSizeY = theThis.adapterSize * (theThis.typeInfo.adapterEnd.y - theThis.typeInfo.adapterStart.y) * theThis.height
    }
    console.log(`=====${(modifierWidth - centerPoint.x) ^ 2}    ${(modifierWidth - centerPoint.x) * (modifierWidth - centerPoint.x)}`)
    const modifier = Math.sqrt((modifierWidth - centerPoint.x) * (modifierWidth - centerPoint.x) + (modifierHeight - centerPoint.y) * (modifierHeight - centerPoint.y)) / Math.sqrt((adapterPoint.x - centerPoint.x) * (adapterPoint.x - centerPoint.x) + (adapterPoint.y - centerPoint.y) * (adapterPoint.y - centerPoint.y))
    theThis.path.reset()
    theThis.path.moveTo(points[0].x, points[0].y)
    for(let i = 0; i < 5; i ++) {      
      const point = Line.pointAt(centerPoint.x, centerPoint.y, newPoints[i].x, newPoints[i].y, modifier)
      theThis.path.lineTo(point.x, point.y)
      theThis.path.lineTo(points[i < 4 ? i + 1 : 0].x, points[i < 4 ? i + 1 : 0].y)
    }
    theThis.path.close()
  }

  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.CustomShape
    return shapeType
  } 

}
