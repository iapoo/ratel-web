import { ShapeEntity, ShapeOptions, Shapes, } from './ShapeEntity'

export class ContainerEntity extends ShapeEntity {

    public constructor(left: number, top: number, width: number, height: number, shapeOptions: ShapeOptions = { shapeType: Shapes.TYPE_RECTANGLE }) {
        super(left, top, width, height, shapeOptions)
      }
}
