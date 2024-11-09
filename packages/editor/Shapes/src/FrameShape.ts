/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */

import { Graphics } from '@ratel-web/engine'
import { EntityShape, ShapeTypeInfo } from './EntityShape'

export class FrameShape extends EntityShape {
  private _buildShape: (theThis: FrameShape, entity: any) => void
  private _entity: any

  public constructor(
    left: number,
    top: number,
    width: number,
    height: number,
    entity: any,
    buildShape: (_this: FrameShape, entity: any) => void,
    shapeTypeInfo: ShapeTypeInfo,
  ) {
    super('', left, top, width, height, shapeTypeInfo)
    this.clipped = true
    this._entity = entity
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
    this._buildShape(this, this._entity)
  }
}
