import { Graphics, MathUtils, ParagraphDirection, Point2, Rectangle } from '@/components/Engine'
import { EntityShape, EntityShapeType } from '../../../Shapes/src/EntityShape'
import { CustomShape } from '../../../Shapes'
import { CustomEntity, Shapes } from '../../../Items'
import { Type } from '../../../Items/src/Item'
import { Line } from '@antv/g-math'

const TYPE_STAR_4 = 'Star4'
const DESC_STAR_4 = 'Star4'
const TYPE_STAR_5 = 'Star5'
const DESC_STAR_5 = 'Star5'
const TYPE_STAR_6 = 'Star6'
const DESC_STAR_6 = 'Star6'
const TYPE_STAR_7 = 'Star7'
const DESC_STAR_7 = 'Star7'
const TYPE_STAR_8 = 'Star8'
const DESC_STAR_8 = 'Star8'
const TYPE_STAR_16 = 'Star16'
const DESC_STAR_16 = 'Star16'
const TYPE_STAR_24 = 'Star24'
const DESC_STAR_24 = 'Star24'
const TYPE_STAR_32 = 'Star32'
const DESC_STAR_32 = 'Star32'
const TEXT_STAR = ''

export const StarTypes = [
  { name: TYPE_STAR_4, description: DESC_STAR_4, freeze: Shapes.FREEZE_NONE, text: TEXT_STAR, left: 0, top: 0, width: 100, height: 100, enableMask: false, 
    modifiable: true, modifierX: 0.5, modifierY: 0.5, modifierStartX: 0, modifierStartY: 0, modifierEndX: 1, modifierEndY: 1, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_STAR_5, description: DESC_STAR_5, freeze: Shapes.FREEZE_NONE, text: TEXT_STAR, left: 0, top: 0, width: 100, height: 100, enableMask: false, 
    modifiable: true, modifierX: 0.5, modifierY: 0.5, modifierStartX: 0, modifierStartY: 0, modifierEndX: 1, modifierEndY: 1, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_STAR_6, description: DESC_STAR_6, freeze: Shapes.FREEZE_NONE, text: TEXT_STAR, left: 0, top: 0, width: 100, height: 100, enableMask: false, 
    modifiable: true, modifierX: 0.5, modifierY: 0.5, modifierStartX: 0, modifierStartY: 0, modifierEndX: 1, modifierEndY: 1, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_STAR_7, description: DESC_STAR_7, freeze: Shapes.FREEZE_NONE, text: TEXT_STAR, left: 0, top: 0, width: 100, height: 100, enableMask: false, 
    modifiable: true, modifierX: 0.5, modifierY: 0.5, modifierStartX: 0, modifierStartY: 0, modifierEndX: 1, modifierEndY: 1, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_STAR_8, description: DESC_STAR_8, freeze: Shapes.FREEZE_NONE, text: TEXT_STAR, left: 0, top: 0, width: 100, height: 100, enableMask: false, 
    modifiable: true, modifierX: 0.5, modifierY: 0.5, modifierStartX: 0, modifierStartY: 0, modifierEndX: 1, modifierEndY: 1, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_STAR_16, description: DESC_STAR_16, freeze: Shapes.FREEZE_NONE, text: TEXT_STAR, left: 0, top: 0, width: 100, height: 100, enableMask: false, 
    modifiable: true, modifierX: 0.5, modifierY: 0.5, modifierStartX: 0, modifierStartY: 0, modifierEndX: 1, modifierEndY: 1, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_STAR_24, description: DESC_STAR_24, freeze: Shapes.FREEZE_NONE, text: TEXT_STAR, left: 0, top: 0, width: 100, height: 100, enableMask: false, 
    modifiable: true, modifierX: 0.5, modifierY: 0.5, modifierStartX: 0, modifierStartY: 0, modifierEndX: 1, modifierEndY: 1, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_STAR_32, description: DESC_STAR_32, freeze: Shapes.FREEZE_NONE, text: TEXT_STAR, left: 0, top: 0, width: 100, height: 100, enableMask: false, 
    modifiable: true, modifierX: 0.5, modifierY: 0.5, modifierStartX: 0, modifierStartY: 0, modifierEndX: 1, modifierEndY: 1, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
]

export class Star extends CustomEntity {

  public constructor(left: number, top: number, width: number, height: number, starType: string) {
    super(left, top, width, height, starType, {shapeType: starType}, StarTypes)
    const customTypeInfo = this.parseTypeInfo({shapeType: starType})
    this._shape = new CustomShape(left, top, width, height, this.buildShape, customTypeInfo)
    this.initializeTheme()
    this.updateTypeInfo(this._shape)
  }


  public get types(): Type[] {
    return StarTypes
  }

  public buildShape(theThis: CustomShape) {
    let sideCount = 5
    switch(theThis.typeInfo.name) {
      case TYPE_STAR_4: 
        sideCount = 4 
        break
      case TYPE_STAR_5: 
        sideCount = 5
        break
      case TYPE_STAR_6: 
        sideCount = 6
        break
      case TYPE_STAR_7: 
        sideCount = 7
        break
      case TYPE_STAR_8: 
        sideCount = 8
        break
      case TYPE_STAR_16: 
        sideCount = 16
        break
      case TYPE_STAR_24: 
        sideCount = 24
        break
      case TYPE_STAR_32: 
        sideCount = 32
        break
      default: 
        sideCount = 5
        break
    }
    const [points, newPoints, centerPoint, adapterPoint] = MathUtils.getStar(theThis.width, sideCount)
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
    //console.log(`=====${(modifierWidth - centerPoint.x) ^ 2}    ${(modifierWidth - centerPoint.x) * (modifierWidth - centerPoint.x)}`)
    const modifier = Math.sqrt((modifierWidth - centerPoint.x) * (modifierWidth - centerPoint.x) + (modifierHeight - centerPoint.y) * (modifierHeight - centerPoint.y)) / Math.sqrt((adapterPoint.x - centerPoint.x) * (adapterPoint.x - centerPoint.x) + (adapterPoint.y - centerPoint.y) * (adapterPoint.y - centerPoint.y))
    theThis.path.reset()
    theThis.path.moveTo(points[0].x, points[0].y)
    for(let i = 0; i < sideCount; i ++) {      
      const point = Line.pointAt(centerPoint.x, centerPoint.y, newPoints[i].x, newPoints[i].y, modifier)
      theThis.path.lineTo(point.x, point.y)
      theThis.path.lineTo(points[i < sideCount - 1 ? i + 1 : 0].x, points[i < sideCount - 1 ? i + 1 : 0].y)
    }
    theThis.path.close()
  }

  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.CustomShape
    return shapeType
  } 

  private updateTypeInfo(shape: EntityShape) {
    const [points, newPoints, centerPoint, adapterPoint] = MathUtils.getStar(shape.width, 5)
    shape.typeInfo.modifierStart = new Point2(centerPoint.x / shape.width, centerPoint.y / shape.height)
    shape.typeInfo.modifierEnd = new Point2(adapterPoint.x / shape.width, adapterPoint.y / shape.height)
    this.shapeType.modifierStartX = centerPoint.x / shape.width
    this.shapeType.modifierStartY = centerPoint.y / shape.height
    this.shapeType.modifierEndX = adapterPoint.x / shape.width
    this.shapeType.modifierEndY = adapterPoint.y / shape.height
  }
}
