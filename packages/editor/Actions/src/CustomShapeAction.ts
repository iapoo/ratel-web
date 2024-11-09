import { Editor } from '../../Editor'
import { CustomEntity, Item, ShapeType } from '../../Items'
import { Action } from './Action'

export class CustomShapeAction extends Action {
  private _classType: typeof CustomEntity
  private _shapeType: ShapeType

  public constructor(editor: Editor, type: string | undefined, classType: typeof CustomEntity, shapeType: ShapeType) {
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
    return [new CustomEntity(0, 0, 100, 100)]
  }
}
