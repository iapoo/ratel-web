import { Editor } from '../../Editor'
import { Item, ShapeEntity, ShapeType } from '../../Items'
import { Action } from './Action'

export class ExtendedShapeAction extends Action {
  private _classType: typeof ShapeEntity
  private _shapeType: ShapeType

  public constructor(editor: Editor, type: string | undefined, classType: typeof ShapeEntity, shapeType: ShapeType) {
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
      const customEntity = new this._classType(left, top, width, height, { shapeType: this._shapeType.name }, [
        this._shapeType,
      ])
      return [customEntity]
    }
    return [new ShapeEntity(0, 0, 100, 100)]
  }
}
