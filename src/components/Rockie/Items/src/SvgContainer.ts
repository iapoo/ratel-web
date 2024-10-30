import { CustomShape, CustomSvgShape } from "../../Shapes"
import { EntityShapeType } from "../../Shapes/src/EntityShape"
import { SvgUtils } from "../../Utils"
import { CustomEntity } from "./CustomEntity"
import { Categories, Type } from "./Item"
import { ShapeEntity, Shapes } from "./ShapeEntity"
import { Path, Rect, SVG } from '@svgdotjs/svg.js'
import test from '@/components/Resource/svg/test2.txt'
import { Color, Colors, Node, Shape } from "@/components/Engine"
import Yaya from "@/components/Resource/images/test.png"

const TYPE_SVG_CONTAINER = 'SVGContainer'
const DESC_SVG_CONTAINER = 'SVGContainer'
const TEXT_SVG_CONTAINER = ''

export const SvgContainerTypes = [{
  name: TYPE_SVG_CONTAINER, description: DESC_SVG_CONTAINER,
  freeze: Shapes.FREEZE_NONE, text: TEXT_SVG_CONTAINER, left: 0, top: 0, width: 100, height: 100, enableMask: false,
  modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
  controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
  adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'Y', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
}]

export class SvgContainer extends ShapeEntity {
  private _svg: string
  private _svgShape: CustomSvgShape
  private _enableStrokeColor: boolean
  private _enableFillColor: boolean

  public constructor(left: number, top: number, width: number, height: number, svg: string) {
    super(left, top, width, height, { shapeType: TYPE_SVG_CONTAINER }, SvgContainerTypes)
    this._svg = svg
    const customTypeInfo = this.parseTypeInfo({ shapeType: TYPE_SVG_CONTAINER })
    this._svgShape = new CustomSvgShape(left, top, width, height, svg, this.buildShape, customTypeInfo)
    this._shape = this._svgShape
    this._enableFillColor = false
    this._enableStrokeColor = false
    this.initializeTheme()
    // this.stroked = false
    // this.filled = false
    // this.strokeColor = Colors.Transparent
    // this.fillColor = Colors.Blue
    this._svgShape.svgInitialized = true
  }

  public get svgShape() {
    return this._svgShape
  }

  public get enableStrokeColor() {
    return this._enableStrokeColor
  }

  public set enableStrokeColor(value: boolean) {
    this._enableStrokeColor = value
    this._svgShape.enableStrokeColor = value
  }

  public get enableFillColor() {
    return this._enableFillColor
  }

  public set enableFillColor(value: boolean) {
    this._enableFillColor = value
    this._svgShape.enableFillColor = value
  }

  public get strokeColor(): Color {
    return super.strokeColor
  }

  public set strokeColor(value: Color) {
    super.strokeColor = value
    if (this._svgShape && this._svgShape.svgInitialized) {
      this._enableStrokeColor = true
      this._svgShape.enableStrokeColor = true
    }
  }

  public get fillColor(): Color {
    return super.fillColor
  }

  public set fillColor(value: Color) {
    super.fillColor = value
    if (this._svgShape && this._svgShape.svgInitialized) {
      this._enableFillColor = true
      this._svgShape.enableFillColor = true
    }
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
    //const yaya = Yaya
    //console.log(yaya)
    //console.log(this._svg)
    SvgUtils.parse(theThis.svg, theThis)
  }

  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.CustomShape
    return shapeType
  }
}
