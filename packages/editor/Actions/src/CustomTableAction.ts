import { Editor } from '../../Editor'
import { CustomTableEntity, CustomTableType, Item } from '../../Items'
import { Action } from './Action'

export class CustomTableAction extends Action {
  private _classType: typeof CustomTableEntity
  private _shapeType: CustomTableType

  public constructor(editor: Editor, type: string | undefined, classType: typeof CustomTableEntity, shapeType: CustomTableType) {
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
      const customEntity = new this._classType(left, top, width, height, this.type!, [this._shapeType])
      return [customEntity]
    }

    return [new CustomTableEntity(100, 100, 240, 120)]
  }
}
