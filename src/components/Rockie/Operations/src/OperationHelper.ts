/* eslint-disable max-params */

import { SystemUtils } from "@/components/Workspace/Utils"
import { Categories, Connector, EditorItem, EditorItemInfo, Entity, Item, LineEntity, ShapeEntity, TableEntity } from "../../Items"
import { ConnectorInfo } from "../../Items/src/ConnectorInfo"
import { LineInfo } from "../../Items/src/LineInfo"
import { Rotation } from "@/components/Engine"
import { CommonUtils } from "../../Utils"
import { ShapeInfo } from "../../Items/src/ShapeInfo"
import { Style, StyleInfo } from "../../Shapes/src/EntityUtils"
import { ConnectorType } from "../../Shapes"
import { TableInfo } from "../../Items/src/TableInfo"

export class OperationHelper {
  public static loadItem(itemInfo: EditorItemInfo): EditorItem {
    let editorItem: Item
    switch (itemInfo.category) {
      case Categories.LINE:
        editorItem = this.loadLine(itemInfo)
        break
      case Categories.CONNECTOR:
        editorItem = this.loadConnector(itemInfo)
        break
      case Categories.TABLE:
        editorItem = this.loadTableEntity(itemInfo)
        break
      case Categories.SHAPE:
      default:
        editorItem = this.loadShapeEntity(itemInfo)
        break
    }
    editorItem.shape.styles = StyleInfo.makeStyles(itemInfo.styles)
    itemInfo.items.forEach(childItemInfo => {
      let childItem = OperationHelper.loadItem(childItemInfo)
      editorItem.addItem(childItem)
    })
    return editorItem
  }

  public static refreshItem(itemInfo: EditorItemInfo, items: EditorItem[]) {
    if (itemInfo.category == Categories.CONNECTOR) {
      let connectorInfo = itemInfo as ConnectorInfo
      let connector: Connector | null = null
      items.forEach(item => {
        if(connectorInfo.id == item.id) {
          connector = item as Connector
        }
      })
      items.forEach(item => {
        if(connectorInfo.source == item.id && connector) {
          let entity = item as Entity
          connector.source =  entity
          entity.addSourceConnector(connector)
        }
        if(connectorInfo.target == item.id && connector) {
          let entity = item as Entity
          connector.target =  entity
          entity.addTargetConnector(connector)
        }
      })
      console.log(connector)
    }
  }

  public static loadLine(itemInfo: EditorItemInfo): LineEntity {
    let lineInfo = itemInfo as LineInfo
    let start = SystemUtils.parsePointString(lineInfo.start)
    let end = SystemUtils.parsePointString(lineInfo.end)
    let lineEntity = new LineEntity(start, end)
    if (lineInfo.rotation) {
      lineEntity.rotation = new Rotation(lineInfo.rotation, lineEntity.width / 2, lineEntity.height / 2)
    }
    lineEntity.text = lineInfo.text
    lineEntity.id = lineInfo.id
    return lineEntity
  }

  public static loadConnector(itemInfo: EditorItemInfo): Connector {
    let connectorInfo = itemInfo as ConnectorInfo
    let start = SystemUtils.parsePointString(connectorInfo.start)
    let end = SystemUtils.parsePointString(connectorInfo.end)
    let connector = new Connector(start, end)
    connector.connectorType = connectorInfo.connectorType ? CommonUtils.parseConnectorTypeString(connectorInfo.connectorType) : ConnectorType.Orthogonal
    connector.id = connectorInfo.id
    return connector
  }

  public static loadShapeEntity(itemInfo: EditorItemInfo): ShapeEntity {
    let shapeInfo = itemInfo as ShapeInfo
    const shapeEntity = new ShapeEntity(shapeInfo.left, shapeInfo.top, shapeInfo.width, shapeInfo.height, {shapeType: shapeInfo.type})
    shapeEntity.type = shapeInfo.type
    shapeEntity.text = shapeInfo.text
    shapeEntity.id = shapeInfo.id
    if (shapeInfo.rotation) {
      shapeEntity.rotation = new Rotation(shapeInfo.rotation, shapeEntity.width / 2, shapeEntity.height / 2)
    }
    shapeEntity.shape.modifier = SystemUtils.parsePointString(shapeInfo.modifier)
    shapeEntity.shape.adapter = SystemUtils.parsePointString(shapeInfo.adapter)

    return shapeEntity
  }

  public static loadTableEntity(itemInfo: EditorItemInfo): TableEntity {
    const tableInfo = itemInfo as TableInfo
    const tableEntity = new TableEntity(itemInfo.left, itemInfo.top, itemInfo.width, itemInfo.height, tableInfo.rowCount, tableInfo.columnCount)

    return tableEntity
  }
  
  public static saveEditorItem(editorItem: EditorItem): EditorItemInfo {
    let editorItemInfo: EditorItemInfo
    switch (editorItem.category) {
      case Categories.LINE:
        editorItemInfo = this.saveLine(editorItem as LineEntity)
        break
      case Categories.CONNECTOR:
        editorItemInfo = this.saveConnector(editorItem as Connector)
        break;
      case Categories.TABLE:
        editorItemInfo = this.saveTable(editorItem as TableEntity)
        break;
      case Categories.SHAPE:
      default:
        editorItemInfo = this.saveShape(editorItem as ShapeEntity)
        break
    }
    editorItemInfo.id = editorItem.id
    editorItemInfo.items.length = 0
    const itemCount = editorItem.items.length
    for (let i = 0; i < itemCount; i++) {
      const childItem = editorItem.items[i]
      const childEditorItemData = this.saveEditorItem(childItem)
      editorItemInfo.items.push(childEditorItemData)
    }
    return editorItemInfo
  }

  public static  saveShape(shapeEntity: ShapeEntity) : EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(shapeEntity.shape.styles)
    let shapeData = new ShapeInfo(shapeEntity.type, shapeEntity.category, shapeEntity.left, shapeEntity.top, shapeEntity.width, shapeEntity.height, shapeEntity.text, shapeEntity.rotation.radius, styleInfos)
    shapeData.rotation = shapeEntity.rotation.radius
    shapeData.modifier = shapeEntity.shape.modifier.x + ',' + shapeEntity.shape.modifier.y
    shapeData.adapter = shapeEntity.shape.adapter.x + ',' + shapeEntity.shape.adapter.y
    shapeData.adapterSize = shapeEntity.shape.adapterSize

    return shapeData
  }

  public static  saveTable(tableEntity: TableEntity) : EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(tableEntity.shape.styles)
    let tableInfo = new TableInfo(tableEntity.left, tableEntity.top, tableEntity.width, tableEntity.height, tableEntity.rowCount, tableEntity.columnCount, tableEntity.rotation.radius, styleInfos)

    return tableInfo
  }

  public static  saveLine(lineEntity: LineEntity) : EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(lineEntity.shape.styles)
    let lineData = new LineInfo(lineEntity.start.x, lineEntity.start.y, lineEntity.end.x, lineEntity.end.y, lineEntity.text, lineEntity.rotation.radius, styleInfos)

    return lineData
  }

  public static  saveConnector(connector: Connector) : EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(connector.shape.styles)
    let connectorData = new ConnectorInfo(connector.start.x, connector.start.y, connector.end.x, connector.end.y, connector.text, connector.rotation.radius, styleInfos)
    if(connector.source) {
      connectorData.source = connector.source.id
    }
    if(connector.target) {
      connectorData.target = connector.target.id
    }
    if(connector.sourceJoint) {
      //connectorData.s
    }
    if(connector.targetJoint) {

    }
    connectorData.connectorType = connector.connectorType ?  CommonUtils.parseConnectorType(connector.connectorType) : null

    return connectorData
  }
}
