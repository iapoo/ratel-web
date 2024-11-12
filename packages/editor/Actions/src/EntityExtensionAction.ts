import { Point2 } from '@ratel-web/engine'
import { Editor } from '../../Editor'
import {
  CustomConnectorTypeInfo,
  CustomEntity,
  CustomTableType,
  ExtendedConnector,
  ExtendedContainer,
  ExtendedEntity,
  ExtendedImageContainer,
  ExtendedSvgContainer,
  ExtendedTable,
  Item,
  ShapeType,
} from '../../Items'
import { ConnectorConfig, EntityExtension, ShapeConfig, TableConfig } from '../../Shapes'
import { CommonUtils } from '../../Utils'
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
      const typeInfo = this.buildTypeInfo()
      if (this._entityExtension.type === 'shape') {
        const shapeConfig = this._entityExtension.config as ShapeConfig
        const left = shapeConfig.left
        const top = shapeConfig.top
        const width = shapeConfig.width
        const height = shapeConfig.height
        const extendedEntity = new ExtendedEntity(left, top, width, height, this._entityExtension, { shapeType: this._entityExtension.name }, [
          typeInfo as ShapeType,
        ])
        return [extendedEntity]
      } else if (this._entityExtension.type === 'table') {
        const shapeConfig = this._entityExtension.config as TableConfig
        const left = shapeConfig.left
        const top = shapeConfig.top
        const width = shapeConfig.width
        const height = shapeConfig.height
        const extendedEntity = new ExtendedTable(left, top, width, height, this._entityExtension, [typeInfo as CustomTableType])
        return [extendedEntity]
      } else if (this._entityExtension.type === 'container') {
        const containerConfig = this._entityExtension.config as ShapeConfig
        const left = containerConfig.left
        const top = containerConfig.top
        const width = containerConfig.width
        const height = containerConfig.height
        const extendedContainer = new ExtendedContainer(left, top, width, height, this._entityExtension, { shapeType: this._entityExtension.name }, [
          typeInfo as ShapeType,
        ])
        return [extendedContainer]
      } else if (this._entityExtension.type === 'connector') {
        const connectorConfig = this._entityExtension.config as ConnectorConfig
        const startX = connectorConfig.startX
        const startY = connectorConfig.startY
        const endX = connectorConfig.endX
        const endY = connectorConfig.endY
        const start = new Point2(startX, startY)
        const end = new Point2(endX, endY)

        const connectorEntity = new ExtendedConnector(start, end, this._entityExtension, [typeInfo as CustomConnectorTypeInfo])
        return [connectorEntity]
      } else if (this._entityExtension.type === 'image') {
        const extendedImageContainer = new ExtendedImageContainer(
          0,
          0,
          this._entityExtension.config.width,
          this._entityExtension.config.height,
          this._entityExtension,
        )
        return [extendedImageContainer]
      } else if (this._entityExtension.type === 'svg') {
        const extendedSvgContainer = new ExtendedSvgContainer(
          0,
          0,
          this._entityExtension.config.width,
          this._entityExtension.config.height,
          this._entityExtension,
        )
        return [extendedSvgContainer]
      }
    }
    return [new CustomEntity(0, 0, 100, 100)]
  }

  private buildTypeInfo(): ShapeType | CustomConnectorTypeInfo | CustomTableType | null {
    if (this._entityExtension.type === 'shape' || this._entityExtension.type === 'container') {
      const shapeConfig = this._entityExtension.config as ShapeConfig
      return {
        name: this._entityExtension.name,
        description: this._entityExtension.description,
        freeze: shapeConfig.freeze,
        text: shapeConfig.text,
        left: shapeConfig.left,
        top: shapeConfig.top,
        width: shapeConfig.width,
        height: shapeConfig.height,
        enableMask: shapeConfig.enableMask,
        modifiable: shapeConfig.modifiable,
        modifierX: shapeConfig.modifierX,
        modifierY: shapeConfig.modifierY,
        modifierStartX: shapeConfig.modifierStartX,
        modifierStartY: shapeConfig.modifierStartY,
        modifierEndX: shapeConfig.modifierEndX,
        modifierEndY: shapeConfig.modifierEndY,
        modifyInLine: shapeConfig.modifyInLine,
        modifyInPercent: shapeConfig.modifyInPercent,
        controllable: shapeConfig.controllable,
        controllerX: shapeConfig.controllerX,
        controllerY: shapeConfig.controllerY,
        controllerStartX: shapeConfig.controllerStartX,
        controllerStartY: shapeConfig.controllerStartY,
        controllerEndX: shapeConfig.controllerEndX,
        controllerEndY: shapeConfig.controllerEndY,
        controlInLine: shapeConfig.controlInLine,
        controlInPercent: shapeConfig.controlInPercent,
        adaptable: shapeConfig.adaptable,
        adapterX: shapeConfig.adapterX,
        adapterY: shapeConfig.adapterY,
        adapterSize: shapeConfig.adapterSize,
        adapterDirection: shapeConfig.adapterDirection,
        adapterStartX: shapeConfig.adapterStartX,
        adapterStartY: shapeConfig.adapterStartY,
        adapterEndX: shapeConfig.adapterEndX,
        adapterEndY: shapeConfig.adapterEndY,
        adaptInLine: shapeConfig.adaptInLine,
        adaptInPercent: shapeConfig.adaptInPercent,
      }
    } else if (this._entityExtension.type === 'table') {
      const tableConfig = this._entityExtension.config as TableConfig
      return {
        name: this._entityExtension.name,
        description: this._entityExtension.description,
        freeze: tableConfig.freeze,
        text: tableConfig.text,
        left: tableConfig.left,
        top: tableConfig.top,
        width: tableConfig.width,
        height: tableConfig.height,
        rowCount: tableConfig.rowCount,
        columnCount: tableConfig.columnCount,
        fixedFirstRow: tableConfig.fixedFirstRow,
        firstRowHeight: tableConfig.firstRowHeight,
        fixedFirstColumn: tableConfig.fixedFirstColumn,
        firstColumnWidth: tableConfig.firstColumnWidth,
        enableMask: tableConfig.enableMask,
        modifiable: tableConfig.modifiable,
        modifierX: tableConfig.modifierX,
        modifierY: tableConfig.modifierY,
        modifierStartX: tableConfig.modifierStartX,
        modifierStartY: tableConfig.modifierStartY,
        modifierEndX: tableConfig.modifierEndX,
        modifierEndY: tableConfig.modifierEndY,
        modifyInLine: tableConfig.modifyInLine,
        modifyInPercent: tableConfig.modifyInPercent,
        controllable: tableConfig.controllable,
        controllerX: tableConfig.controllerX,
        controllerY: tableConfig.controllerY,
        controllerStartX: tableConfig.controllerStartX,
        controllerStartY: tableConfig.controllerStartY,
        controllerEndX: tableConfig.controllerEndX,
        controllerEndY: tableConfig.controllerEndY,
        controlInLine: tableConfig.controlInLine,
        controlInPercent: tableConfig.controlInPercent,
        adaptable: tableConfig.adaptable,
        adapterX: tableConfig.adapterX,
        adapterY: tableConfig.adapterY,
        adapterSize: tableConfig.adapterSize,
        adapterDirection: tableConfig.adapterDirection,
        adapterStartX: tableConfig.adapterStartX,
        adapterStartY: tableConfig.adapterStartY,
        adapterEndX: tableConfig.adapterEndX,
        adapterEndY: tableConfig.adapterEndY,
        adaptInLine: tableConfig.adaptInLine,
        adaptInPercent: tableConfig.adaptInPercent,
      }
    } else if (this._entityExtension.type === 'connector') {
      const connectorConfig = this._entityExtension.config as ConnectorConfig
      return {
        name: this._entityExtension.name,
        description: this._entityExtension.description,
        text: connectorConfig.text,
        startX: connectorConfig.startX,
        startY: connectorConfig.startY,
        endX: connectorConfig.endX,
        endY: connectorConfig.endY,
        startArrowTypeName: connectorConfig.startArrowTypeName,
        endArrowTypeName: connectorConfig.endArrowTypeName,
        strokeDashStyle: CommonUtils.parseStrokeDashStyle(connectorConfig.strokeDashStyle),
        connectorType: CommonUtils.parseConnectorType(connectorConfig.connectorType),
        width: connectorConfig.width,
        height: connectorConfig.height,
      }
    } else {
      return null
    }
  }
}
