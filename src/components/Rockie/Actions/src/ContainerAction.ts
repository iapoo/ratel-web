import { Theme, } from '@/components/Workspace/Theme'
import { ContainerEntity, Item, Shapes, } from '../../Items'
import { Action, } from './Action'
import { ShapeTypes } from '../../Items/src/ShapeEntity'

export class ContainerAction extends Action {

  protected buildItem(): Item {
    let left = 0
    let top = 0
    let width = 100
    let height = 100
    ShapeTypes.forEach(shapeType => {
      if(shapeType.name == this.type) {
        left = shapeType.left
        top = shapeType.top
        width = shapeType.width
        height = shapeType.height
      }
    })
    const shapeEntity = new ContainerEntity(left, top, width, height, {
      shapeType: this.type ? this.type : Shapes.TYPE_RECTANGLE
    })
    shapeEntity.shape.stroke.setColor(Theme.DEFAULT_STROKE_COLOR)

    return shapeEntity
  }

}
