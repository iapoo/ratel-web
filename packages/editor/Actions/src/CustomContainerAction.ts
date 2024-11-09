import { Editor } from '../../Editor'
import { CustomContainerEntity, Item, ShapeType } from '../../Items'
import { Action } from './Action'

export class CustomContainerAction extends Action {
  private _classType: typeof CustomContainerEntity
  private _shapeType: ShapeType

  public constructor(
    editor: Editor,
    type: string | undefined,
    classType: typeof CustomContainerEntity,
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
      const customEntity = new this._classType(left, top, width, height, this.type)
      return [customEntity]
    }
    return [new CustomContainerEntity(0, 0, 100, 100)]
  }
}
