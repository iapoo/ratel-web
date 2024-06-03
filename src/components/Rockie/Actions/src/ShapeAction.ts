import { Paint, } from '@/components/Engine'
import { Theme, Themes, } from '@/components/Rockie/Theme'
import { Item, ShapeEntity, Shapes, } from '../../Items'
import { Action, } from './Action'
import { ShapeTypes } from '../../Items/src/ShapeEntity'

export class ShapeAction extends Action {

  protected buildItems(): Item[] {
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
    const shapeEntity = new ShapeEntity(left, top, width, height, {
      shapeType: this.type ? this.type : Shapes.TYPE_RECTANGLE
    })
    //shapeEntity.shape.stroke.setColor(Themes.strokeColor)

    return [shapeEntity]
  }

}
