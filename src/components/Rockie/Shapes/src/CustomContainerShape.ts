/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */

import { Color, Colors, FillType, Graphics, MathUtils, Paint, PaintStyle, Path, PathOp, Point2, Rectangle, Rotation, Shape, } from '@/components/Engine'
import { Line, Cubic, } from '@antv/g-math'
import { EntityShape, ShapeTypeInfo, } from './EntityShape'
import { Consts, SystemUtils } from '@/components/Workspace/Utils'
import { ConnectorArrowType } from '../../Items/src/Connector'
import { ConnectorDirection } from './ConnectorShape'

export class CustomContainerShape extends EntityShape {

  private _buildShape: (theThis: CustomContainerShape) => void
  private _secondPath: Path
  private _secondFilled: boolean
  private _secondStroked: boolean
  private _thirdPath: Path
  private _thirdFilled: boolean
  private _thirdStroked: boolean
  private _fourthPath: Path
  private _fourthFilled: boolean
  private _fourthStroked: boolean

  public constructor(left: number, top: number, width: number, height: number, buildShape: (_this: CustomContainerShape) => void, shapeTypeInfo: ShapeTypeInfo) {
    super('', left, top, width, height, shapeTypeInfo)
    this._secondPath = new Path()
    this._secondFilled = true
    this._secondStroked = true
    this._thirdPath = new Path()
    this._thirdFilled = true
    this._thirdStroked = true
    this._fourthPath = new Path()
    this._fourthFilled = true
    this._fourthStroked = true
    this._buildShape = buildShape
  }

  public get secondPath() {
    return this._secondPath
  }
  public get thirdPath() {
    return this._thirdPath
  }

  public get fourthPath() {
    return this._fourthPath
  }

  public render(graphics: Graphics): void {
    super.render(graphics)
    if (this._secondFilled) {
      graphics.drawPath(this._secondPath, this.secondFill)
    }
    if (this._secondStroked) {
      graphics.drawPath(this._secondPath, this.secondStroke)
    }
    if (this._thirdFilled) {
      graphics.drawPath(this._thirdPath, this.thirdFill)
    }
    if (this._thirdStroked) {
      graphics.drawPath(this._thirdPath, this.thirdStroke)
    }
    if (this._fourthFilled) {
      graphics.drawPath(this._fourthPath, this.fourthFill)
    }
    if (this._fourthStroked) {
      graphics.drawPath(this._fourthPath, this.fourthStroke)
    }
  }

  public update() {
    super.update()
    this._buildShape(this)
  }

}
