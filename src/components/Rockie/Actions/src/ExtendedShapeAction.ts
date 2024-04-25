import { Paint, } from '@/components/Engine'
import { Theme, Themes, } from '@/components/Rockie/Theme'
import { Item, ShapeEntity, Shapes, } from '../../Items'
import { Action, } from './Action'
import { ShapeType, ShapeTypes } from '../../Items/src/ShapeEntity'
import { UMLBasicShape, UMLBasicShapeTypes, UMLBasicShapes } from '../../CustomItems/UML/src/UMLShape'
import { Editor } from '../../Editor'

export class ExtendedShapeAction extends Action {

  private _classType: typeof ShapeEntity
  private _shapeType: ShapeType
  
  public constructor (editor: Editor, type: string | undefined, classType: typeof ShapeEntity, shapeType: ShapeType) {
    super(editor, type)
    this._classType = classType
    this._shapeType = shapeType
    this.build()
  }

  protected buildItem(): Item {
    if(this._classType && this._shapeType) {
      let left = this._shapeType.left
      let top = this._shapeType.top
      let width = this._shapeType.width
      let height = this._shapeType.height
      const customEntity = new this._classType(left, top, width, height, {shapeType: this._shapeType.name}, [this._shapeType])
      return customEntity
    } 
    return new ShapeEntity(0, 0, 100, 100)

  }
}
