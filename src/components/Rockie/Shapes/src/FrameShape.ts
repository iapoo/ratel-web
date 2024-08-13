/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */

import { Color, Colors, FillType, Graphics, MathUtils, Paint, PaintStyle, Path, PathOp, Point2, Rectangle, Rotation, Shape, } from '@/components/Engine'
import { Line, Cubic, } from '@antv/g-math'
import { EntityShape, ShapeTypeInfo, } from './EntityShape'
import { Consts, SystemUtils } from '@/components/Workspace/Utils'
import { ConnectorArrowType } from '../../Items/src/Connector'
import { ConnectorDirection } from './ConnectorShape'

export class FrameShape extends EntityShape {

  private _buildShape: (theThis: FrameShape, entity: any) => void
  private _entity: any

  public constructor(left: number, top: number, width: number, height: number, entity: any, buildShape: (_this: FrameShape, entity: any) => void, shapeTypeInfo: ShapeTypeInfo) {
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
