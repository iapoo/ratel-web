import { CustomShape } from "../../Shapes"
import { EntityShapeType } from "../../Shapes/src/EntityShape"
import { CustomEntity } from "./CustomEntity"
import { Type } from "./Item"
import { Shapes } from "./ShapeEntity"
import {Path, Rect, SVG} from '@svgdotjs/svg.js'

const TYPE_LEFT_TRIANGLE = 'LeftTriangle'
const DESC_LEFT_TRIANGLE = 'LeftTriangle'
const TEXT_LEFT_TRIANGLE = ''

export const LeftTriangleTypes = [{ name: TYPE_LEFT_TRIANGLE, description: DESC_LEFT_TRIANGLE, 
  freeze: Shapes.FREEZE_NONE, text: TEXT_LEFT_TRIANGLE, left: 0, top: 0, width: 100, height: 100, 
  modifiable: true, modifierX: 0, modifierY: 0.5, modifierStartX: 0, modifierStartY: 0, 
  modifierEndX: 0, modifierEndY: 1, modifyInLine: true, modifyInPercent: true,
  controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
  adaptable: true, adapterX: 0, adapterY: 0, adapterDirection: 'Y', adapterSize: 1, 
  adapterStartX: 1, adapterStartY: 0, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true
}]

export class SvgContainer extends CustomEntity {
  private _svg =  ''
  public constructor(left: number, top: number, width: number, height: number) {
    super(left, top, width, height, '', {shapeType: TYPE_LEFT_TRIANGLE}, LeftTriangleTypes)
    const customTypeInfo = this.parseTypeInfo({shapeType: TYPE_LEFT_TRIANGLE})
    this._shape = new CustomShape(left, top, width, height, this.buildShape, customTypeInfo)
    this.initializeTheme()
    this.parseSVG()
  }


  public get types(): Type[] {
    return LeftTriangleTypes
  }

  private parseSVG() {
    const svg = SVG().size(90, 90)
    svg.rect(20, 20)
    const path = svg.path()
    const children = svg.children()
    children.forEach((element ,index, array) => {
      if(element instanceof Path) {
        element.array().forEach(value => {
          switch(value[0]) {
            
          }
        })
        console.log(element)
      }
    })
    console.log(svg.svg())
    console.log(children)
  }

  public buildShape(theThis: CustomShape) {
    theThis.path.reset()
    let modifierWidth = theThis.modifier.x + theThis.typeInfo.modifierStart.x * theThis.width
    let modifierHeight = theThis.modifier.y + theThis.typeInfo.modifierStart.y * theThis.height
    let adapterWidth = theThis.adapter.x +theThis.typeInfo.adapterStart.x * theThis.width
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
      adapterSizeX = theThis.adapterSize * (theThis.typeInfo.adapterEnd.x - theThis.typeInfo.adapterStart.x) * this.width
      adapterSizeY = theThis.adapterSize * (theThis.typeInfo.adapterEnd.y - theThis.typeInfo.adapterStart.y) * this.height
    }
    theThis.path.moveTo(0, modifierHeight)
    theThis.path.lineTo(theThis.width, adapterHeight + adapterSizeY)
    theThis.path.lineTo(theThis.width, adapterHeight)
    theThis.path.lineTo(0, modifierHeight)
  }

  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.CustomShape
    return shapeType
  } 

}
