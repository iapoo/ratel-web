/* eslint-disable max-params */
import { Point2, Rectangle, Rotation, } from '@/components/Engine'
import { EntityShape, } from '../../Shapes'
import { Entity, } from './Entity'
import { Categories, Type, } from './Item'
import { AdapterDirection, EntityShapeFreezeType, EntityShapeType, ShapeTypeInfo } from '../../Shapes/src/EntityShape'
import { EditorItem } from './EditorItem'
import { EditorItemInfo } from './EditorItemInfo'
import { Editor } from '../../Editor'
import { ShapeInfo } from './ShapeInfo'
import { SystemUtils } from '@/components/Workspace/Utils'
import { ShapeEntity, ShapeOptions, ShapeType, ShapeTypes, Shapes } from './ShapeEntity'

export class CellEntity extends ShapeEntity {

  public constructor(left: number, top: number, width: number, height: number, shapeOptions: ShapeOptions = { shapeType: Shapes.TYPE_RECTANGLE }, 
      shapeTypes: ShapeType[] = ShapeTypes) {
    super(left, top, width, height, shapeOptions, shapeTypes)
    this._shape.clipped = true
    // this._shape.filled = false
  }

}
