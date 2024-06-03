import { Paint, } from '@/components/Engine'
import { Theme, Themes, } from '@/components/Rockie/Theme'
import { CustomEntity, FrameEntity, Item, ShapeEntity, Shapes, } from '../../Items'
import { Action, } from './Action'
import { ShapeType, ShapeTypes } from '../../Items/src/ShapeEntity'
import { BottomTriangle, Star, TopTriangle } from '../../CustomItems/BasicShapes'
import { Editor } from '../../Editor'
import { CustomShape } from '../../Shapes'

export class FrameAction extends Action {

  private _classType: typeof FrameEntity
  private _shapeType: ShapeType

  public constructor (editor: Editor, type: string | undefined, classType: typeof FrameEntity, shapeType: ShapeType) {
    super(editor, type)
    this._classType = classType
    this._shapeType = shapeType
    this.build()
  }

  protected buildItems(): Item[] {
    if(this._classType && this._shapeType) {
      let left = this._shapeType.left
      let top = this._shapeType.top
      let width = this._shapeType.width
      let height = this._shapeType.height
      const customEntity = new this._classType(left, top, width, height, {shapeType: this.type!}, [this._shapeType])
      return [customEntity]
    } 
    return [new FrameEntity(0, 0, 100, 100)]

  }

}
