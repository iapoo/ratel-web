import { Theme, Themes, } from '@/components/Rockie/Theme'
import { ContainerEntity, ContainerTypes, Containers, Item, Shapes, } from '../../Items'
import { Action, } from './Action'
import { ShapeTypes } from '../../Items/src/ShapeEntity'

export class ContainerAction extends Action {

  protected buildItem(): Item {
    let left = 0
    let top = 0
    let width = 100
    let height = 100
    ContainerTypes.forEach(containerType => {
      if(containerType.name == this.type) {
        left = containerType.left
        top = containerType.top
        width = containerType.width
        height = containerType.height
      }
    })
    const shapeEntity = new ContainerEntity(left, top, width, height, {
      shapeType: this.type ? this.type : Containers.TYPE_CONTAINER
    })
    //shapeEntity.shape.stroke.setColor(Themes.strokeColor)

    return shapeEntity
  }

}
