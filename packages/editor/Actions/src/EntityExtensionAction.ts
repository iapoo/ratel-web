import { Point2 } from '@ratel-web/engine'
import { Editor } from '../../Editor'
import {
  CustomConnectorTypeInfo,
  CustomEntity,
  CustomTableType,
  ExtensionCategory,
  ExtensionConnector,
  ExtensionContainer,
  ExtensionEntity,
  ExtensionImageContainer,
  ExtensionSvgContainer,
  ExtensionTable,
  ExtensionUtils,
  Item,
  Plugin,
  ShapeType,
} from '../../Items'
import { ConnectorConfig, EntityExtension, ShapeConfig, TableConfig } from '../../Shapes'
import { Action } from './Action'

export class EntityExtensionAction extends Action {
  private readonly _entityExtension: EntityExtension
  private readonly _extensionCategory: ExtensionCategory
  private readonly _plugin: Plugin
  public constructor(editor: Editor, entityExtension: EntityExtension, extensionCategory: ExtensionCategory, plugin: Plugin) {
    super(editor, undefined)
    this._entityExtension = entityExtension
    this._extensionCategory = extensionCategory
    this._plugin = plugin
    this.build()
  }

  protected buildItems(): Item[] {
    if (this._entityExtension) {
      const typeInfo = ExtensionUtils.buildTypeInfo(this._entityExtension)
      if (this._entityExtension.type === 'shape') {
        const shapeConfig = this._entityExtension.config as ShapeConfig
        const left = shapeConfig.left
        const top = shapeConfig.top
        const width = shapeConfig.width
        const height = shapeConfig.height
        const extendedEntity = new ExtensionEntity(
          left,
          top,
          width,
          height,
          this._entityExtension,
          this._extensionCategory,
          this._plugin,
          { shapeType: this._entityExtension.name },
          [typeInfo as ShapeType],
        )
        return [extendedEntity]
      } else if (this._entityExtension.type === 'table') {
        const shapeConfig = this._entityExtension.config as TableConfig
        const left = shapeConfig.left
        const top = shapeConfig.top
        const width = shapeConfig.width
        const height = shapeConfig.height
        const extendedEntity = new ExtensionTable(left, top, width, height, this._entityExtension, this._extensionCategory, this._plugin, [
          typeInfo as CustomTableType,
        ])
        return [extendedEntity]
      } else if (this._entityExtension.type === 'container') {
        const containerConfig = this._entityExtension.config as ShapeConfig
        const left = containerConfig.left
        const top = containerConfig.top
        const width = containerConfig.width
        const height = containerConfig.height
        const extendedContainer = new ExtensionContainer(
          left,
          top,
          width,
          height,
          this._entityExtension,
          this._extensionCategory,
          this._plugin,
          { shapeType: this._entityExtension.name },
          [typeInfo as ShapeType],
        )
        return [extendedContainer]
      } else if (this._entityExtension.type === 'connector') {
        const connectorConfig = this._entityExtension.config as ConnectorConfig
        const startX = connectorConfig.startX
        const startY = connectorConfig.startY
        const endX = connectorConfig.endX
        const endY = connectorConfig.endY
        const start = new Point2(startX, startY)
        const end = new Point2(endX, endY)

        const connectorEntity = new ExtensionConnector(start, end, this._entityExtension, this._extensionCategory, this._plugin, [
          typeInfo as CustomConnectorTypeInfo,
        ])
        return [connectorEntity]
      } else if (this._entityExtension.type === 'image') {
        const extendedImageContainer = new ExtensionImageContainer(
          0,
          0,
          this._entityExtension.config.width,
          this._entityExtension.config.height,
          this._entityExtension,
          this._extensionCategory,
          this._plugin,
        )
        return [extendedImageContainer]
      } else if (this._entityExtension.type === 'svg') {
        const extendedSvgContainer = new ExtensionSvgContainer(
          0,
          0,
          this._entityExtension.config.width,
          this._entityExtension.config.height,
          this._entityExtension,
          this._extensionCategory,
          this._plugin,
        )
        return [extendedSvgContainer]
      }
    }
    return [new CustomEntity(0, 0, 100, 100)]
  }
}
