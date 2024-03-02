/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */

import { Color, Colors, FillType, Graphics, MathUtils, Paint, PaintStyle, Path, PathOp, Point2, Rectangle, Rotation, Shape, } from '@/components/Engine'
import { Line, Cubic, } from '@antv/g-math'
import { EntityShape, ShapeTypeInfo, } from './EntityShape'
import { Consts, SystemUtils } from '@/components/Workspace/Utils'
import { ConnectorArrowType } from '../../Items/src/Connector'
import { ConnectorDirection } from './ConnectorShape'

export class CustomShape extends EntityShape {

  private _buildShape: (theThis: CustomShape)=> void
  
  public constructor (left: number, top: number, width: number, height: number, buildShape: (_this: CustomShape)=> void, shapeTypeInfo: ShapeTypeInfo) {
    super('', left, top, width, height, shapeTypeInfo)
    this._buildShape = buildShape
  }

  public render (graphics: Graphics): void {
    super.render(graphics)
  }

  public update () {
    super.update()
    this._buildShape(this)
  }

}
