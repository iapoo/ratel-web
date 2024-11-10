import { Editor } from '../../Editor'
import { CustomEntity, ExtendedEntity, Item, ShapeType } from '../../Items'
import { EntityExtension } from '../../Shapes'
import { Action } from './Action'

export class EntityExtensionAction extends Action {
  private _entityExtension: EntityExtension

  public constructor(editor: Editor, entityExtension: EntityExtension) {
    super(editor, undefined)
    this._entityExtension = entityExtension
    this.build()
  }

  protected buildItems(): Item[] {
    if (this._entityExtension) {
      let left = this._entityExtension.config.left
      let top = this._entityExtension.config.top
      let width = this._entityExtension.config.width
      let height = this._entityExtension.config.height
      const typeInfo = this.buildTypeInfo()
      const extendedEntity = new ExtendedEntity(left, top, width, height, this._entityExtension, { shapeType: this._entityExtension.name }, [typeInfo])
      return [extendedEntity]
    }
    return [new CustomEntity(0, 0, 100, 100)]
  }

  private buildTypeInfo(): ShapeType {
    return {
      name: this._entityExtension.name,
      description: this._entityExtension.description,
      freeze: this._entityExtension.config.freeze,
      text: this._entityExtension.config.text,
      left: this._entityExtension.config.left,
      top: this._entityExtension.config.top,
      width: this._entityExtension.config.width,
      height: this._entityExtension.config.height,
      enableMask: this._entityExtension.config.enableMask,
      modifiable: this._entityExtension.config.modifiable,
      modifierX: this._entityExtension.config.modifierX,
      modifierY: this._entityExtension.config.modifierY,
      modifierStartX: this._entityExtension.config.modifierStartX,
      modifierStartY: this._entityExtension.config.modifierStartY,
      modifierEndX: this._entityExtension.config.modifierEndX,
      modifierEndY: this._entityExtension.config.modifierEndY,
      modifyInLine: this._entityExtension.config.modifyInLine,
      modifyInPercent: this._entityExtension.config.modifyInPercent,
      controllable: this._entityExtension.config.controllable,
      controllerX: this._entityExtension.config.controllerX,
      controllerY: this._entityExtension.config.controllerY,
      controllerStartX: this._entityExtension.config.controllerStartX,
      controllerStartY: this._entityExtension.config.controllerStartY,
      controllerEndX: this._entityExtension.config.controllerEndX,
      controllerEndY: this._entityExtension.config.controllerEndY,
      controlInLine: this._entityExtension.config.controlInLine,
      controlInPercent: this._entityExtension.config.controlInPercent,
      adaptable: this._entityExtension.config.adaptable,
      adapterX: this._entityExtension.config.adapterX,
      adapterY: this._entityExtension.config.adapterY,
      adapterSize: this._entityExtension.config.adapterSize,
      adapterDirection: this._entityExtension.config.adapterDirection,
      adapterStartX: this._entityExtension.config.adapterStartX,
      adapterStartY: this._entityExtension.config.adapterStartY,
      adapterEndX: this._entityExtension.config.adapterEndX,
      adapterEndY: this._entityExtension.config.adapterEndY,
      adaptInLine: this._entityExtension.config.adaptInLine,
      adaptInPercent: this._entityExtension.config.adaptInPercent,
    }
  }
}
