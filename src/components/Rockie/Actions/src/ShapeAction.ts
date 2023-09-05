import { Paint, } from '@/components/Engine'
import { Theme, } from '@/components/Workspace/Theme'
import { Item, ShapeEntity, Shapes, } from '../../Items'
import { Action, } from './Action'

export class ShapeAction extends Action {

  protected buildItem(): Item {
    const shapeEntity = new ShapeEntity(250, 250, 200, 200, {
      shapeType: this.type ? this.type : Shapes.TYPE_RECTANGLE,
      freezetype: this.freezeType ? this.freezeType : Shapes.FREEZE_NONE
    })
    shapeEntity.shape.stroke.setColor(Theme.DEFAULT_STROKE_COLOR)

    return shapeEntity
  }

}
