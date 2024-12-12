/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */

import { Graphics, Image, Rectangle } from '@ratel-web/engine'
import { EntityShape, ShapeTypeInfo } from './EntityShape'

export class CustomCodeShape extends EntityShape {
  private _buildShape: (theThis: CustomCodeShape) => void
  private _image: string
  private _imageData: Image | undefined

  public constructor(
    left: number,
    top: number,
    width: number,
    height: number,
    image: string,
    buildShape: (_this: CustomCodeShape) => void,
    shapeTypeInfo: ShapeTypeInfo,
  ) {
    super('', left, top, width, height, shapeTypeInfo)
    this._image = image
    this._buildShape = buildShape
    this._imageData = undefined
    // this.filled = false
    // this.stroked = false
  }

  public get image() {
    return this._image
  }

  public set image(value: string) {
    this._image = value
    this.markDirty()
  }

  public get imageData() {
    return this._imageData
  }

  public set imageData(value: Image | undefined) {
    this._imageData = value
    this.markDirty()
  }

  public render(graphics: Graphics): void {
    super.render(graphics)
    if (this._imageData) {
      graphics.drawImageRect(
        this._imageData,
        Rectangle.makeLTWH(0, 0, this._imageData.width, this._imageData.height),
        Rectangle.makeLTWH(0, 0, this.width, this.height),
        this.fill,
        true,
      )
    }
  }

  public update() {
    super.update()
    this._buildShape(this)
  }
}
