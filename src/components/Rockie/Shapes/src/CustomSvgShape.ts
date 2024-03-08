/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */

import { Graphics, } from '@/components/Engine'
import { EntityShape, ShapeTypeInfo, } from './EntityShape'

export class CustomSvgShape extends EntityShape {

  private _buildShape: (theThis: CustomSvgShape)=> void
  private _svg: string

  public constructor (left: number, top: number, width: number, height: number, svg: string, buildShape: (_this: CustomSvgShape)=> void, shapeTypeInfo: ShapeTypeInfo) {
    super('', left, top, width, height, shapeTypeInfo)
    this._svg = svg
    this._buildShape = buildShape
  }

  public get svg() {
    return this._svg
  }

  public render (graphics: Graphics): void {
    super.render(graphics)
  }

  public update () {
    super.update()
    this._buildShape(this)
  }

}
