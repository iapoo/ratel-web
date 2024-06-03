import { Point2, } from '@/components/Engine'
import { ContainerEntity, Item, TableEntity, } from '../../Items'
import { Action, } from './Action'
import { CustomTableEntity } from '../../Items/src/CustomTableEntity'
import { UMLGridShape } from '../../CustomItems/UML'
import { Editor } from '../../Editor'
import { UMLContainerShape } from '../../CustomItems/UML/src/UMLContainerShape'
import { ShapeType } from '../../Items/src/ShapeEntity'

export class ExtendedContainerAction extends Action {

  private _classType: typeof ContainerEntity
  private _shapeType: ShapeType

  public constructor (editor: Editor, type: string | undefined, classType: typeof ContainerEntity, shapeType: ShapeType) {
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
      const extendedContainer = new this._classType(left, top, width, height, {shapeType: this._shapeType.name}, [this._shapeType])
      return [extendedContainer]
    } 

    return [new ContainerEntity(0, 0, 100, 100)]

  }

}
