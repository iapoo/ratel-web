import { Paint, Point2, } from '@/components/Engine'
import { Theme, Themes, } from '@/components/Rockie/Theme'
import { Connector, CustomConnector, CustomConnectorTypeInfo, Item, ShapeEntity, Shapes, } from '../../Items'
import { Action, } from './Action'
import { ShapeType, ShapeTypes } from '../../Items/src/ShapeEntity'
import { UMLBasicShape, UMLBasicShapeTypes, UMLBasicShapes } from '../../CustomItems/UML/src/UMLBasicShape'
import { Editor } from '../../Editor'

export class CustomConnectorAction extends Action {

  private _classType: typeof CustomConnector
  private _customConnectorTypeInfo: CustomConnectorTypeInfo
  
  public constructor (editor: Editor, type: string | undefined, classType: typeof CustomConnector, customConnectorTypeInfo: CustomConnectorTypeInfo) {
    super(editor, type)
    this._classType = classType
    this._customConnectorTypeInfo = customConnectorTypeInfo
    this.build()
  }

  protected buildItems(): Item[] {
    if(this._classType && this._customConnectorTypeInfo) {
      let start = new Point2(this._customConnectorTypeInfo.startX, this._customConnectorTypeInfo.startY)
      let end = new Point2(this._customConnectorTypeInfo.endX, this._customConnectorTypeInfo.endY)
      const customEntity = new this._classType(start, end, this._customConnectorTypeInfo.name, [this._customConnectorTypeInfo])
      return [customEntity]
    } 
    return [new ShapeEntity(0, 0, 100, 100)]

  }
}
