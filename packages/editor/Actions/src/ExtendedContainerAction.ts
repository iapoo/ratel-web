import { Editor } from '../../Editor'
import { ContainerEntity, Item, ShapeType } from '../../Items'
import { Action } from './Action'

export class ExtendedContainerAction extends Action {
  private _classType: typeof ContainerEntity
  private _shapeType: ShapeType

  public constructor(
    editor: Editor,
    type: string | undefined,
    classType: typeof ContainerEntity,
    shapeType: ShapeType,
  ) {
    super(editor, type)
    this._classType = classType
    this._shapeType = shapeType
    this.build()
  }

  protected buildItems(): Item[] {
    if (this._classType && this._shapeType) {
      let left = this._shapeType.left
      let top = this._shapeType.top
      let width = this._shapeType.width
      let height = this._shapeType.height
      const extendedContainer = new this._classType(left, top, width, height, { shapeType: this._shapeType.name }, [
        this._shapeType,
      ])
      return [extendedContainer]
    }

    return [new ContainerEntity(0, 0, 100, 100)]
  }
}
