import { Paint, } from '@/components/Engine'
import { Theme, Themes, } from '@/components/Workspace/Theme'
import { CustomEntity, Item, ShapeEntity, Shapes, } from '../../Items'
import { Action, } from './Action'
import { ShapeTypes } from '../../Items/src/ShapeEntity'
import { BottomTriangle, Star, TopTriangle } from '../../CustomItems/BasicShapes'
import { Editor } from '../../Editor'
import { CustomShape } from '../../Shapes'

export class CustomShapeAction extends Action {

  private _classType: typeof CustomEntity

  public constructor (editor: Editor, type: string | undefined, classType: typeof CustomEntity) {
    super(editor, type)
    this._classType = classType
    this.build()
  }

  protected buildItem(): Item {
    let left = 0
    let top = 0
    let width = 100
    let height = 100
    if(this._classType) {
      const customEntity = new this._classType(left, top, width, height, this.type)
      return customEntity
    } 
    return new CustomEntity(left, top, width, height)

  }

}
