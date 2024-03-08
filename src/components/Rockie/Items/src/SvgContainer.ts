import { CustomShape, CustomSvgShape } from "../../Shapes"
import { EntityShapeType } from "../../Shapes/src/EntityShape"
import { SvgUtils } from "../../Utils"
import { CustomEntity } from "./CustomEntity"
import { Categories, Type } from "./Item"
import { ShapeEntity, Shapes } from "./ShapeEntity"
import {Path, Rect, SVG} from '@svgdotjs/svg.js'
import test from '@/components/Resource/svg/test2.txt'

const TYPE_SVG_CONTAINER = 'SVGContainer'
const DESC_SVG_CONTAINER = 'SVGContainer'
const TEXT_SVG_CONTAINER = ''

export const SvgContainerTypes = [{ name: TYPE_SVG_CONTAINER, description: DESC_SVG_CONTAINER, 
  freeze: Shapes.FREEZE_NONE, text: TEXT_SVG_CONTAINER, left: 0, top: 0, width: 100, height: 100, 
  modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, 
  modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
  controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
  adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'Y', adapterSize: 0, 
  adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
}]

export class SvgContainer extends ShapeEntity {
  private _svg: string

  public constructor(left: number, top: number, width: number, height: number, svg: string) {    
    super(left, top, width, height, {shapeType: TYPE_SVG_CONTAINER}, SvgContainerTypes)
    this._svg =  svg
    const customTypeInfo = this.parseTypeInfo({shapeType: TYPE_SVG_CONTAINER})
    this._shape = new CustomSvgShape(left, top, width, height, svg, this.buildShape, customTypeInfo)
    this.initializeTheme()
  }

  public get svg() {
    return this._svg
  }

  public set svg(value: string) {
    this._svg = value
    this.updateTheme()
  }

  public get types(): Type[] {
    return SvgContainerTypes
  }

  public get category(): string {
    return Categories.CUSTOM_SVG_SHAPE
  }

  public buildShape(theThis: CustomSvgShape) {
    SvgUtils.parse(theThis.svg, theThis)
  }

  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.CustomShape
    return shapeType
  } 

}
