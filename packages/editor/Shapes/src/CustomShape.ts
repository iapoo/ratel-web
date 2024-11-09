/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */

import { Graphics } from '@ratel-web/engine'
import { EntityShape, ShapeTypeInfo } from './EntityShape'

export class CustomShape extends EntityShape {
  private _buildShape: (theThis: CustomShape) => void

  public constructor(left: number, top: number, width: number, height: number, buildShape: (_this: CustomShape) => void, shapeTypeInfo: ShapeTypeInfo) {
    super('', left, top, width, height, shapeTypeInfo)
    this._buildShape = buildShape
  }

  public render(graphics: Graphics): void {
    super.render(graphics)
    if (this.secondFilled) {
      graphics.drawPath(this.secondPath, this.secondFill)
    }
    if (this.secondStroked) {
      graphics.drawPath(this.secondPath, this.secondStroke)
    }
    if (this.thirdFilled) {
      graphics.drawPath(this.thirdPath, this.thirdFill)
    }
    if (this.thirdStroked) {
      graphics.drawPath(this.thirdPath, this.thirdStroke)
    }
    if (this.fourthFilled) {
      graphics.drawPath(this.fourthPath, this.fourthFill)
    }
    if (this.fourthStroked) {
      graphics.drawPath(this.fourthPath, this.fourthStroke)
    }
  }

  public update() {
    super.update()
    this._buildShape(this)
  }

  public dispose(): void {
    this.secondPath.delete()
    this.thirdPath.delete()
    this.fourthPath.delete()
  }
}
