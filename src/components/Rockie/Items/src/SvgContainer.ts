import { CustomShape } from "../../Shapes"
import { EntityShapeType } from "../../Shapes/src/EntityShape"
import { SvgUtils } from "../../Utils"
import { CustomEntity } from "./CustomEntity"
import { Type } from "./Item"
import { Shapes } from "./ShapeEntity"
import {Path, Rect, SVG} from '@svgdotjs/svg.js'

const TYPE_LEFT_TRIANGLE = 'LeftTriangle'
const DESC_LEFT_TRIANGLE = 'LeftTriangle'
const TEXT_LEFT_TRIANGLE = ''

export const LeftTriangleTypes = [{ name: TYPE_LEFT_TRIANGLE, description: DESC_LEFT_TRIANGLE, 
  freeze: Shapes.FREEZE_NONE, text: TEXT_LEFT_TRIANGLE, left: 0, top: 0, width: 100, height: 100, 
  modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, 
  modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
  controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
  adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'Y', adapterSize: 0, 
  adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
}]

export class SvgContainer extends CustomEntity {
  private _svg =  ''
  public constructor(left: number, top: number, width: number, height: number) {
    super(left, top, width, height, '', {shapeType: TYPE_LEFT_TRIANGLE}, LeftTriangleTypes)
    const customTypeInfo = this.parseTypeInfo({shapeType: TYPE_LEFT_TRIANGLE})
    this._shape = new CustomShape(left, top, width, height, this.buildShape, customTypeInfo)
    this.initializeTheme()
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
    SvgUtils.parse('', theThis)
  }

  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.CustomShape
    return shapeType
  } 

}
