import { Paint, } from '@/components/Engine'
import { Theme, } from '@/components/Workspace/Theme'
import { Item, ShapeEntity, } from '../../Items'
import { Action, } from './Action'

export class ShapeAction extends Action {
  protected buildItem (): Item {
    const rectangle = new ShapeEntity(250, 250, 200, 200)

    rectangle.shape.stroke.setColor(Theme.DEFAULT_STROKE_COLOR)
    return rectangle
  }
}
