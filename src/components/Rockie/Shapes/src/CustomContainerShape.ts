/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */

import { Color, Colors, FillType, Graphics, MathUtils, Paint, PaintStyle, Path, PathOp, Point2, Rectangle, Rotation, Shape, } from '@/components/Engine'
import { Line, Cubic, } from '@antv/g-math'
import { EntityShape, ShapeTypeInfo, } from './EntityShape'
import { Consts, SystemUtils } from '@/components/Workspace/Utils'
import { ConnectorArrowType } from '../../Items/src/Connector'
import { ConnectorDirection } from './ConnectorShape'

export class CustomContainerShape extends EntityShape {

  private _buildShape: (theThis: CustomContainerShape)=> void
  private _secondPath: Path
  private _secondFill: Paint
  private _secondStroke: Paint
  private _secondFilled: boolean
  private _secondStroked: boolean
  
  public constructor (left: number, top: number, width: number, height: number, buildShape: (_this: CustomContainerShape)=> void, shapeTypeInfo: ShapeTypeInfo) {
    super('', left, top, width, height, shapeTypeInfo)    
    this._secondPath = new Path()
    this._secondStroke = new Paint()
    this._secondStroke.setPaintStyle(PaintStyle.STROKE)
    this._secondStroke.setColor(this.stroke.getColor())
    this._secondFill = new Paint()
    this._secondFill.setPaintStyle(PaintStyle.FILL)
    this._secondFill.setColor(this.fill.getColor())
    this._secondFilled = true
    this._secondStroked = true
    this._buildShape = buildShape
  }

  public get secondPath() {
    return this._secondPath
  }

  public get secondFill() {
    return this._secondFill
  }

  public get secondStroke() {
    return this._secondStroke
  }

  public render (graphics: Graphics): void {
    super.render(graphics)
    if (this._secondFilled) {
      graphics.drawPath(this._secondPath, this._secondFill)
    }
    if (this._secondStroked) {
      graphics.drawPath(this._secondPath, this._secondStroke)
    }
  }

  public update () {
    super.update()
    this._secondStroke.setColor(this.stroke.getColor())
    this._secondFill.setColor(this.fill.getColor())
    this._buildShape(this)
  }

}
