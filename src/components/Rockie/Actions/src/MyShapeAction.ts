import { Paint, } from '@/components/Engine'
import { Theme, Themes, } from '@/components/Rockie/Theme'
import { CustomEntity, EditorItemInfo, Item, ShapeEntity, Shapes, } from '../../Items'
import { Action, } from './Action'
import { ShapeType, ShapeTypes } from '../../Items/src/ShapeEntity'
import { BottomTriangle, Star, TopTriangle } from '../../CustomItems/BasicShapes'
import { Editor } from '../../Editor'
import { CustomShape } from '../../Shapes'
import { MyShape, MyShapeType } from '@/components/Workspace/Utils/RequestUtils'
import { EditorHelper } from '../../Utils'
import { OperationHelper } from '../../Operations'

export class MyShapeAction extends Action {
  private _myShape: MyShape

  public constructor (editor: Editor, myShape: MyShape) {
    super(editor, undefined)
    this._myShape = myShape
    this.build()
  }

  protected buildItems(): Item[] {
    if(this._myShape) {
      switch(this._myShape.type) {
        case MyShapeType.IMAGE: {
          break;
        }
        case MyShapeType.SVG: {
          break;
        }
        default:
        case MyShapeType.SELECTION: {
          const shapeData = this._myShape.info
          const shapeInfos: EditorItemInfo[] = JSON.parse(shapeData)
          const items: Item[] = []
          shapeInfos.forEach(shapeInfo => {
            const editorItem = OperationHelper.loadItem(shapeInfo, this.editor)
            items.push(editorItem as Item)            
          })
          return items
        }
      }
    } 
    return [new CustomEntity(0, 0, 100, 100)]

  }

}
