/* eslint-disable max-params */
import { PoolLabelShape } from '../../Shapes'
import { ShapeConstants, ShapeEntity, ShapeOptions, ShapeType, ShapeTypes } from './ShapeEntity'

export class PoolLabelEntity extends ShapeEntity {
  private _textHorizontal: boolean

  public constructor(
    left: number,
    top: number,
    width: number,
    height: number,
    textHorizontal: boolean,
    shapeOptions: ShapeOptions = { shapeType: ShapeConstants.TYPE_RECTANGLE },
    shapeTypes: ShapeType[] = ShapeTypes,
  ) {
    super(left, top, width, height, shapeOptions, shapeTypes)
    const customTypeInfo = this.parseTypeInfo(shapeOptions)
    this._shape = new PoolLabelShape(left, top, width, height, textHorizontal, customTypeInfo)
    this._textHorizontal = textHorizontal
    this._shape.clipped = true
    //this.strokeColor = Colors.Gray
    this.lineWidth = 1.5
    // this._shape.filled = false
  }

  public get textHorizontal() {
    return this._textHorizontal
  }

  public set textHorizontal(value: boolean) {
    this._textHorizontal = value
    ;(this._shape as PoolLabelShape).textHorizontal = value
  }

  public get fixed() {
    return true
  }
}
