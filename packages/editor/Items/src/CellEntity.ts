/* eslint-disable max-params */
import { ShapeConstants, ShapeEntity, ShapeOptions, ShapeType, ShapeTypes } from './ShapeEntity'

export class CellEntity extends ShapeEntity {
  public constructor(
    left: number,
    top: number,
    width: number,
    height: number,
    shapeOptions: ShapeOptions = { shapeType: ShapeConstants.TYPE_RECTANGLE },
    shapeTypes: ShapeType[] = ShapeTypes,
  ) {
    super(left, top, width, height, shapeOptions, shapeTypes)
    this._shape.clipped = true
    //this.strokeColor = Colors.Gray
    this.lineWidth = 1.5
    // this._shape.filled = false
  }
}
