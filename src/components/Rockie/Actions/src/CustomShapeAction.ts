import { Paint, } from '@/components/Engine'
import { Theme, Themes, } from '@/components/Workspace/Theme'
import { CustomEntity, Item, ShapeEntity, Shapes, } from '../../Items'
import { Action, } from './Action'
import { ShapeTypes } from '../../Items/src/ShapeEntity'
import { BottomTriangle, Star, TopTriangle } from '../../CustomItems/BasicShapes'

export class CustomShapeAction extends Action {

  protected buildItem(): Item {
    let left = 0
    let top = 0
    let width = 100
    let height = 100
    const customEntity = new TopTriangle(left, top, width, height)
    return customEntity
  }

}
