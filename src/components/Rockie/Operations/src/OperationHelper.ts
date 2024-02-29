/* eslint-disable max-params */

import { SystemUtils } from "@/components/Workspace/Utils"
import { Categories, CellEntity, Connector, ConnectorArrowInfo, ContainerEntity, ContainerInfo, EditorItem, EditorItemInfo, Entity, Item, LineEntity, ShapeEntity, TableEntity } from "../../Items"
import { ConnectorInfo } from "../../Items/src/ConnectorInfo"
import { LineInfo } from "../../Items/src/LineInfo"
import { Rotation } from "@/components/Engine"
import { CommonUtils } from "../../Utils"
import { ShapeInfo } from "../../Items/src/ShapeInfo"
import { Style, StyleInfo } from "../../Shapes/src/EntityUtils"
import { ConnectorMode, ConnectorType } from "../../Shapes"
import { TableInfo } from "../../Items/src/TableInfo"
import { ThemeUtils } from "@/components/Workspace/Theme"
import { Editor } from "../../Editor"

export class OperationHelper {
  public static loadItem(itemInfo: EditorItemInfo, editor: Editor): EditorItem {
    let editorItem: Item
    switch (itemInfo.category) {
      case Categories.LINE:
        editorItem = this.loadLine(itemInfo)
        break
      case Categories.CONNECTOR:
        editorItem = this.loadConnector(itemInfo, editor)
        break
      case Categories.CONTAINER:
        editorItem = this.loadContainerEntity(itemInfo)
        break
      case Categories.TABLE:
        editorItem = this.loadTableEntity(itemInfo)
        break
      case Categories.SHAPE:
      default:
        editorItem = this.loadShapeEntity(itemInfo)
        break
    }
    //Need to use correct StyleInfo    
    OperationHelper.fixStyleInfo(itemInfo)    
    editorItem.shape.styles = StyleInfo.makeStyles(itemInfo.styles)
    if(itemInfo.category != Categories.TABLE) {
      itemInfo.items.forEach(childItemInfo => {
        let childItem = OperationHelper.loadItem(childItemInfo, editor)
        editorItem.addItem(childItem)
      })
    }
    editorItem.id = itemInfo.id
    if (itemInfo.rotation) {
      editorItem.rotation = new Rotation(itemInfo.rotation, itemInfo.width / 2, itemInfo.height / 2)
    }
    editorItem.useTheme = itemInfo.useTheme
    if(itemInfo.useTheme) {
      editorItem.strokeColor = ThemeUtils.strokeColor
      editorItem.fillColor = ThemeUtils.fillColor
      editorItem.lineWidth = ThemeUtils.lineWidth
    } else {
      let strokeColor = SystemUtils.parseColorString(itemInfo.strokeColor)
      if(strokeColor) {
        editorItem.strokeColor = strokeColor
      }
      let fillColor = SystemUtils.parseColorString(itemInfo.fillColor)
      if(fillColor) {
        editorItem.fillColor = fillColor
      }
      if(itemInfo.lineWidth) {
        editorItem.lineWidth = itemInfo.lineWidth
      }
    }

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

  public static loadConnector(itemInfo: EditorItemInfo, editor: Editor): Connector {
    let connectorInfo = itemInfo as ConnectorInfo
    let start = SystemUtils.parsePointString(connectorInfo.start)
    let end = SystemUtils.parsePointString(connectorInfo.end)
    let connector = new Connector(start, end)
    connector.connectorType = connectorInfo.connectorType ? CommonUtils.parseConnectorTypeString(connectorInfo.connectorType) : ConnectorType.Orthogonal
    if(connectorInfo.source) {
      //connector.source = connectorInfo.source
    }
    if(connectorInfo.target) {

    }
    if(connectorInfo.sourceJoint) {
      connector.sourceJoint = SystemUtils.parsePointString(connectorInfo.sourceJoint)
    }
    if(connectorInfo.targetJoint) {
      connector.targetJoint = SystemUtils.parsePointString(connectorInfo.targetJoint)
    }
    connector.id = connectorInfo.id
    connector.text = connectorInfo.text
    connector.startArrow = SystemUtils.parseConnectorArrow(connectorInfo.startArrow!)
    connector.endArrow = SystemUtils.parseConnectorArrow(connectorInfo.endArrow!)
    connector.curveStartModifier = SystemUtils.parsePointString(connectorInfo.curveStartModifier)
    connector.curveEndModifier = SystemUtils.parsePointString(connectorInfo.curveEndModifier)
    connector.startDirection = SystemUtils.parseConnectorDirection(connectorInfo.startDirection)
    connector.endDirection = SystemUtils.parseConnectorDirection(connectorInfo.endDirection)
    connector.orthogonalPoints = SystemUtils.parsePointsString(connectorInfo.orthogonalPoints)
    connector.connectorMode = connectorInfo.connectorMode ? SystemUtils.parseConnectorMode(connectorInfo.connectorMode) : ConnectorMode.Single
    connector.connectorDoubleLineGap = connectorInfo.connectorDoubleLineGap
    connector.connectorDoubleLineArrowLength = connectorInfo.connectorDoubleLineArrowLength
    connector.connectorDoubleLineArrowDistance = connectorInfo.connectorDoubleLineArrowDistance
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
    shapeEntity.shape.adapterSize = shapeInfo.adapterSize
    return shapeEntity
  }

  public static loadContainerEntity(itemInfo: EditorItemInfo): ContainerEntity {
    const containerInfo = itemInfo as ContainerInfo
    const containerEntity = new ContainerEntity(itemInfo.left, itemInfo.top, itemInfo.width, itemInfo.height, {shapeType: containerInfo.type})
    containerEntity.id = containerInfo.id
    if (containerInfo.rotation) {
      containerEntity.rotation = new Rotation(containerInfo.rotation, containerInfo.width / 2, containerInfo.height / 2)
    }
    containerEntity.shape.modifier = SystemUtils.parsePointString(containerInfo.modifier)
    containerEntity.shape.adapter = SystemUtils.parsePointString(containerInfo.adapter)
    containerEntity.shape.adapterSize = containerInfo.adapterSize

    containerEntity.removeAllItems()
    itemInfo.items.forEach(childItemInfo => {
      let childItem = OperationHelper.loadTableCellEntity(childItemInfo)
      containerEntity.addItem(childItem)
    })
    return containerEntity
  }

  public static loadTableEntity(itemInfo: EditorItemInfo): TableEntity {
    const tableInfo = itemInfo as TableInfo
    const tableEntity = new TableEntity(itemInfo.left, itemInfo.top, itemInfo.width, itemInfo.height, tableInfo.rowCount, tableInfo.columnCount)
    tableEntity.id = tableInfo.id
    if (tableInfo.rotation) {
      tableEntity.rotation = new Rotation(tableInfo.rotation, tableInfo.width / 2, tableInfo.height / 2)
    }
    tableEntity.removeAllItems()
    itemInfo.items.forEach(childItemInfo => {
      let childItem = OperationHelper.loadTableCellEntity(childItemInfo)
      tableEntity.addItem(childItem)
    })
    return tableEntity
  }
  
  public static loadTableCellEntity(itemInfo: EditorItemInfo): CellEntity {
    let shapeInfo = itemInfo as ShapeInfo
    const shapeEntity = new CellEntity(shapeInfo.left, shapeInfo.top, shapeInfo.width, shapeInfo.height, {shapeType: shapeInfo.type})
    shapeEntity.type = shapeInfo.type
    shapeEntity.text = shapeInfo.text
    shapeEntity.id = shapeInfo.id
    if (shapeInfo.rotation) {
      shapeEntity.rotation = new Rotation(shapeInfo.rotation, shapeEntity.width / 2, shapeEntity.height / 2)
    }
    shapeEntity.shape.modifier = SystemUtils.parsePointString(shapeInfo.modifier)
    shapeEntity.shape.adapter = SystemUtils.parsePointString(shapeInfo.adapter)
    OperationHelper.fixStyleInfo(shapeInfo)
    shapeEntity.shape.styles = StyleInfo.makeStyles(shapeInfo.styles)
    return shapeEntity
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
      case Categories.CONTAINER:
        editorItemInfo = this.saveContainer(editorItem as TableEntity)
        break;
      case Categories.SHAPE:
      default:
        editorItemInfo = this.saveShape(editorItem as ShapeEntity)
        break
    }
    editorItemInfo.id = editorItem.id
    editorItemInfo.items.length = 0
    editorItemInfo.useTheme = editorItem.useTheme
    if(editorItem.useTheme) {
      editorItemInfo.strokeColor = null
      editorItemInfo.fillColor = null
      editorItemInfo.lineWidth = null
    } else {
      editorItemInfo.strokeColor = SystemUtils.generateColorString(editorItem.strokeColor)
      editorItemInfo.fillColor = SystemUtils.generateColorString(editorItem.fillColor)
      editorItemInfo.lineWidth = editorItem.lineWidth
    }

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
    let shapeinfo = new ShapeInfo(shapeEntity.type, shapeEntity.category, shapeEntity.left, shapeEntity.top, shapeEntity.width, shapeEntity.height, shapeEntity.text, shapeEntity.rotation.radius, styleInfos)
    shapeinfo.rotation = shapeEntity.rotation.radius
    shapeinfo.modifier = shapeEntity.shape.modifier.x + ',' + shapeEntity.shape.modifier.y
    shapeinfo.adapter = shapeEntity.shape.adapter.x + ',' + shapeEntity.shape.adapter.y
    shapeinfo.adapterSize = shapeEntity.shape.adapterSize

    return shapeinfo
  }

  public static  saveTable(tableEntity: TableEntity) : EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(tableEntity.shape.styles)
    let tableInfo = new TableInfo(tableEntity.left, tableEntity.top, tableEntity.width, tableEntity.height, tableEntity.rowCount, tableEntity.columnCount, tableEntity.rotation.radius, styleInfos)

    return tableInfo
  }


  public static  saveContainer(container: ContainerEntity) : EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(container.shape.styles)
    let containerInfo = new ContainerInfo(container.type, container.category, container.left, container.top, container.width, container.height, container.text,  container.rotation.radius, styleInfos)
    containerInfo.rotation = container.rotation.radius
    containerInfo.modifier = container.shape.modifier.x + ',' + container.shape.modifier.y
    containerInfo.adapter = container.shape.adapter.x + ',' + container.shape.adapter.y
    containerInfo.adapterSize = container.shape.adapterSize

    return containerInfo
  }


  public static  saveLine(lineEntity: LineEntity) : EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(lineEntity.shape.styles)
    let lineData = new LineInfo(lineEntity.start.x, lineEntity.start.y, lineEntity.end.x, lineEntity.end.y, lineEntity.text, lineEntity.rotation.radius, styleInfos)

    return lineData
  }

  public static  saveConnector(connector: Connector) : EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(connector.shape.styles)
    let connectorInfo = new ConnectorInfo(connector.start.x, connector.start.y, connector.end.x, connector.end.y, connector.text, connector.rotation.radius, styleInfos)
    if(connector.source) {
      connectorInfo.source = connector.source.id
    }
    if(connector.target) {
      connectorInfo.target = connector.target.id
    }
    if(connector.sourceJoint) {
      connectorInfo.sourceJoint = SystemUtils.generatePointString(connector.sourceJoint)
    }
    if(connector.targetJoint) {
        connectorInfo.targetJoint = SystemUtils.generatePointString(connector.targetJoint)
    }
    
    connectorInfo.text = connector.text
    connectorInfo.connectorType = connector.connectorType ?  CommonUtils.parseConnectorType(connector.connectorType) : null
    connectorInfo.startArrow = SystemUtils.generateConnectorArrow(connector.startArrow)
    connectorInfo.endArrow = SystemUtils.generateConnectorArrow(connector.endArrow)
    connectorInfo.curveStartModifier = SystemUtils.generatePointString(connector.curveStartModifier)
    connectorInfo.curveEndModifier = SystemUtils.generatePointString(connector.curveEndModifier)
    connectorInfo.startDirection = SystemUtils.generateConnectorDirection(connector.startDirection)
    connectorInfo.endDirection = SystemUtils.generateConnectorDirection(connector.endDirection)
    connectorInfo.orthogonalPoints = SystemUtils.generatePointsString(connector.orthogonalPoints)
    connectorInfo.connectorMode = SystemUtils.generateConnectorMode(connector.connectorMode)
    connectorInfo.connectorDoubleLineGap = connector.connectorDoubleLineGap
    connectorInfo.connectorDoubleLineArrowLength = connector.connectorDoubleLineArrowLength
    connectorInfo.connectorDoubleLineArrowDistance = connector.connectorDoubleLineArrowDistance

    return connectorInfo
  }


  private static fixStyleInfo(editorItemInfo: EditorItemInfo) {
    let count = editorItemInfo.styles.length
    for(let i = 0; i < count; i ++) {
        let oldStyleInfo = editorItemInfo.styles[i]
        let styleInfo = new StyleInfo(oldStyleInfo.length, oldStyleInfo.typeFaceName, oldStyleInfo.size, oldStyleInfo.color, oldStyleInfo.bold, oldStyleInfo.italic, oldStyleInfo.underline)
        editorItemInfo.styles[i] = styleInfo
    }
    editorItemInfo.items.forEach(child => {
        OperationHelper.fixStyleInfo(child)
    })
}

}
