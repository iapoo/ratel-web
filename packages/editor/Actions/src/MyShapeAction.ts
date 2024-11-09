import { Editor } from '../../Editor'
import { CustomEntity, EditorItemInfo, ImageContainer, Item, MyShape, MyShapeType, SvgContainer } from '../../Items'
import { OperationHelper } from '../../Operations'
import { EditorHelper } from '../../Utils'
import { Action } from './Action'

export class MyShapeAction extends Action {
  private _myShape: MyShape

  public constructor(editor: Editor, myShape: MyShape) {
    super(editor, undefined)
    this._myShape = myShape
    this.build()
  }

  protected buildItems(): Item[] {
    if (this._myShape) {
      switch (this._myShape.type) {
        case MyShapeType.IMAGE: {
          return [new ImageContainer(0, 0, this._myShape.width, this._myShape.height, this._myShape.info)]
        }
        case MyShapeType.SVG: {
          return [new SvgContainer(0, 0, this._myShape.width, this._myShape.height, this._myShape.info)]
        }
        default:
        case MyShapeType.SELECTION: {
          const shapeData = this._myShape.info
          const shapeInfos: EditorItemInfo[] = JSON.parse(shapeData)
          const items: Item[] = []
          shapeInfos.forEach((shapeInfo) => {
            const editorItem = OperationHelper.loadItem(shapeInfo, this.editor)
            items.push(editorItem as Item)
          })
          //regenerate item id & load
          shapeInfos.forEach((shapeInfo) => {
            EditorHelper.refreshSelections(shapeInfo, items)
          })
          return items
        }
      }
    }
    return [new CustomEntity(0, 0, 100, 100)]
  }
}
