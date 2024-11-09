import { ContainerEntity, ContainerTypes, Containers, Item } from '../../Items'
import { Action } from './Action'

export class ContainerAction extends Action {
  protected buildItems(): Item[] {
    let left = 0
    let top = 0
    let width = 100
    let height = 100
    // @ts-ignore
    ContainerTypes.forEach((containerType) => {
      if (containerType.name === this.type) {
        left = containerType.left
        top = containerType.top
        width = containerType.width
        height = containerType.height
      }
    })
    const shapeEntity = new ContainerEntity(left, top, width, height, {
      shapeType: this.type ? this.type : Containers.TYPE_CONTAINER,
    })
    //shapeEntity.shape.stroke.setColor(Themes.strokeColor)

    return [shapeEntity]
  }
}
