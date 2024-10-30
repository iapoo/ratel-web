/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */

import { Graphics, } from '@/components/Engine'
import { EntityShape, ShapeTypeInfo, } from './EntityShape'

export class CustomSvgShape extends EntityShape {

  private _buildShape: (theThis: CustomSvgShape) => void
  private _svg: string
  private _enableStrokeColor: boolean
  private _enableFillColor: boolean
  private _svgInitialized: boolean

  public constructor(left: number, top: number, width: number, height: number, svg: string, buildShape: (_this: CustomSvgShape) => void, shapeTypeInfo: ShapeTypeInfo) {
    super('', left, top, width, height, shapeTypeInfo)
    this._svg = svg
    this._buildShape = buildShape
    this._enableFillColor = false
    this._enableStrokeColor = false
    this._svgInitialized = false
  }

  public get svg() {
    return this._svg
  }

  public get svgInitialized() {
    return this._svgInitialized
  }

  public set svgInitialized(value: boolean) {
    this._svgInitialized = value
  }

  public get enableStrokeColor() {
    return this._enableStrokeColor
  }

  public set enableStrokeColor(value: boolean) {
    this._enableStrokeColor = value
    this.markDirty()
  }

  public get enableFillColor() {
    return this._enableFillColor
  }

  public set enableFillColor(value: boolean) {
    this._enableFillColor = value
    this.markDirty()
  }

  public render(graphics: Graphics): void {
    super.render(graphics)
  }

  public update() {
    super.update()
    this._buildShape(this)
  }

}
