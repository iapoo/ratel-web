import { Point2 } from '@ratel-web/engine'
import { Editor } from '../../Editor'
import { CustomConnector, CustomConnectorTypeInfo, Item, ShapeEntity } from '../../Items'
import { Action } from './Action'

export class CustomConnectorAction extends Action {
  private _classType: typeof CustomConnector
  private _customConnectorTypeInfo: CustomConnectorTypeInfo

  public constructor(
    editor: Editor,
    type: string | undefined,
    classType: typeof CustomConnector,
    customConnectorTypeInfo: CustomConnectorTypeInfo,
  ) {
    super(editor, type)
    this._classType = classType
    this._customConnectorTypeInfo = customConnectorTypeInfo
    this.build()
  }

  protected buildItems(): Item[] {
    if (this._classType && this._customConnectorTypeInfo) {
      let start = new Point2(this._customConnectorTypeInfo.startX, this._customConnectorTypeInfo.startY)
      let end = new Point2(this._customConnectorTypeInfo.endX, this._customConnectorTypeInfo.endY)
      const customEntity = new this._classType(start, end, this._customConnectorTypeInfo.name, [
        this._customConnectorTypeInfo,
      ])
      // @ts-ignore
      return [customEntity]
    }
    return [new ShapeEntity(0, 0, 100, 100)]
  }
}
