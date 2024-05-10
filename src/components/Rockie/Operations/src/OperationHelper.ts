/* eslint-disable max-params */

import { SystemUtils } from "@/components/Workspace/Utils"
import { Categories, CellEntity, Connector, ConnectorArrowInfo, ContainerEntity, ContainerInfo, CustomConnector, CustomConnectorInfo, CustomEntity, CustomShapeInfo, CustomTableEntity, CustomTableInfo, EditorItem, EditorItemInfo, Entity, FrameEntity, FrameEntityInfo, GroupEntity, ImageContainer, ImageContainerInfo, Item, LineEntity, ShapeEntity, SvgContainer, SvgContainerInfo, TableEntity } from "../../Items"
import { ConnectorInfo } from "../../Items/src/ConnectorInfo"
import { LineInfo } from "../../Items/src/LineInfo"
import { Rotation } from "@/components/Engine"
import { CommonUtils, } from "../../Utils"
import { ShapeInfo } from "../../Items/src/ShapeInfo"
import { Style, StyleInfo } from "../../Shapes/src/EntityUtils"
import { ConnectorMode, ConnectorType } from "../../Shapes"
import { TableInfo } from "../../Items/src/TableInfo"
import { ThemeUtils } from "@/components/Rockie/Theme"
import { Editor } from "../../Editor"
import { ContainerShapeType, ExtendedContainerTypes, CustomContainerType, CustomContainers, CustomTableShapeType, CustomTableShapes, CustomShapeType, CustomShapes, CustomConnectors, CustomConnectorType, ExtendedShapeType, ExtendedShapes, FrameShapeType, FrameShapes } from "../../Utils/src/CommonUtils"
import { CustomContainerEntity } from "../../Items/src/CustomContainerEntity"
import { ShapeType } from "../../Items/src/ShapeEntity"
import { CustomConnectorTypeInfo } from "../../Items/src/CustomConnector"

export class OperationHelper {

  private static initialized = false
  private static customShapes = new Map<string, CustomShapeType>()
  private static customTableShapes = new Map<string, CustomTableShapeType>()
  private static extendedContainerTypes = new Map<string, ContainerShapeType>()
  private static extendedShapeTypes = new Map<string, ExtendedShapeType>()
  private static CustomConnectorTypes = new Map<string, CustomConnectorType>()
  private static frameShapeTypes = new Map<string, FrameShapeType>()
  private static customContainerTypes = new Map<string, CustomContainerType>()

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
      case Categories.CUSTOM_TABLE:
        editorItem = this.loadCustomTable(itemInfo)
        break
      case Categories.FRAME:
        editorItem = this.loadFrame(itemInfo)
        break
      case Categories.GROUP:
        editorItem = this.loadGroup(itemInfo)
        break
      case Categories.CUSTOM_SHAPE:
        editorItem = this.loadCustomEntity(itemInfo)
        break
      case Categories.CUSTOM_SVG_SHAPE:
        editorItem = this.loadSvgContainer(itemInfo)
        break
      case Categories.CUSTOM_IMAGE_SHAPE:
        editorItem = this.loadImageContainer(itemInfo)
        break
      case Categories.EXTENDED_CONTAINER:
        editorItem = this.loadExtendedContainerEntity(itemInfo)
        break
      case Categories.EXTENDED_SHAPE:
        editorItem = this.loadExtendedShapeEntity(itemInfo)
        break
      case Categories.CUSTOM_CONNECTOR:
        editorItem = this.loadCustomConnector(itemInfo, editor)
        break
      case Categories.CUSTOM_CONTAINER:
        editorItem = this.loadCustomContainerEntity(itemInfo)
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
    editorItem.locked = itemInfo.locked
    editorItem.useTheme = itemInfo.useTheme
    if(itemInfo.useTheme) {
      if(itemInfo.category == Categories.CONNECTOR) {
        editorItem.strokeColor = ThemeUtils.getConnectorStrokeColor(itemInfo.themeName)
        editorItem.fillColor = ThemeUtils.getConnectorFillColor(itemInfo.themeName)
        editorItem.fontColor = ThemeUtils.getConnectorFontColor(itemInfo.themeName)
      } else {
        editorItem.strokeColor = ThemeUtils.getShapeStrokeColor(itemInfo.themeName)
        editorItem.fillColor = ThemeUtils.getShapeFillColor(itemInfo.themeName)
        editorItem.fontColor = ThemeUtils.getShapeFontColor(itemInfo.themeName)
      }
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
    editorItem.textAlignment = SystemUtils.parseTextAlignment(itemInfo.textAlignment)
    editorItem.textVerticalAlignment = SystemUtils.parseTextVerticalAligment(itemInfo.textVerticalAlignment)
    editorItem.stroked = itemInfo.stroked
    editorItem.filled = itemInfo.filled
    // editorItem.fontW

    //TODO: FIXME : Some cleanup or intializeation
    if(editorItem instanceof SvgContainer) {
      editorItem.svgShape.svgInitialized = true
    }
    if(editorItem instanceof ImageContainer) {
      editorItem.shape.stroked = false
      editorItem.shape.filled = false
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

  public static loadCustomConnector(itemInfo: EditorItemInfo, editor: Editor): Connector {
    if(!OperationHelper.initialized) {
      OperationHelper.initializeCustomEntities()
    }
    const customConnectorInfo = itemInfo as CustomConnectorInfo
    const customConnectorTypeInfo = OperationHelper.CustomConnectorTypes.get(customConnectorInfo.type)    
    let start = SystemUtils.parsePointString(customConnectorInfo.start)
    let end = SystemUtils.parsePointString(customConnectorInfo.end)
    const customConnectorTypeInfos: CustomConnectorTypeInfo[] = []
    let connector = new Connector(start, end)
    if(customConnectorTypeInfo) {
      customConnectorTypeInfos.push(customConnectorTypeInfo.shapeType)
      connector = new customConnectorTypeInfo.type(start, end, customConnectorTypeInfo.shapeType.name, customConnectorTypeInfos)
    }
    connector.connectorType = customConnectorInfo.connectorType ? CommonUtils.parseConnectorTypeString(customConnectorInfo.connectorType) : ConnectorType.Orthogonal
    if(customConnectorInfo.source) {
      //connector.source = connectorInfo.source
    }
    if(customConnectorInfo.target) {

    }
    if(customConnectorInfo.sourceJoint) {
      connector.sourceJoint = SystemUtils.parsePointString(customConnectorInfo.sourceJoint)
    }
    if(customConnectorInfo.targetJoint) {
      connector.targetJoint = SystemUtils.parsePointString(customConnectorInfo.targetJoint)
    }
    connector.id = customConnectorInfo.id
    connector.text = customConnectorInfo.text
    connector.startArrow = SystemUtils.parseConnectorArrow(customConnectorInfo.startArrow!)
    connector.endArrow = SystemUtils.parseConnectorArrow(customConnectorInfo.endArrow!)
    connector.curveStartModifier = SystemUtils.parsePointString(customConnectorInfo.curveStartModifier)
    connector.curveEndModifier = SystemUtils.parsePointString(customConnectorInfo.curveEndModifier)
    connector.startDirection = SystemUtils.parseConnectorDirection(customConnectorInfo.startDirection)
    connector.endDirection = SystemUtils.parseConnectorDirection(customConnectorInfo.endDirection)
    connector.orthogonalPoints = SystemUtils.parsePointsString(customConnectorInfo.orthogonalPoints)
    connector.connectorMode = customConnectorInfo.connectorMode ? SystemUtils.parseConnectorMode(customConnectorInfo.connectorMode) : ConnectorMode.Single
    connector.connectorDoubleLineGap = customConnectorInfo.connectorDoubleLineGap
    connector.connectorDoubleLineArrowLength = customConnectorInfo.connectorDoubleLineArrowLength
    connector.connectorDoubleLineArrowDistance = customConnectorInfo.connectorDoubleLineArrowDistance
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
    shapeEntity.shape.controller  = SystemUtils.parsePointString(shapeInfo.controller)
    shapeEntity.shape.adapter = SystemUtils.parsePointString(shapeInfo.adapter)
    shapeEntity.shape.adapterSize = shapeInfo.adapterSize
    return shapeEntity
  }

  public static loadExtendedShapeEntity(itemInfo: EditorItemInfo): ShapeEntity {
    if(!OperationHelper.initialized) {
      OperationHelper.initializeCustomEntities()
    }
    let extendedShapeInfo = itemInfo as CustomShapeInfo
    const extendedShapeTypeInfo = OperationHelper.extendedShapeTypes.get(extendedShapeInfo.type)
    const extendedShapeTypeInfos: ShapeType[] = []
    let shapeEntity: ShapeEntity
    if(extendedShapeTypeInfo) {
      extendedShapeTypeInfos.push(extendedShapeTypeInfo.shapeType)
      shapeEntity = new extendedShapeTypeInfo.type(extendedShapeInfo.left, extendedShapeInfo.top, extendedShapeInfo.width, extendedShapeInfo.height, {shapeType: extendedShapeInfo.type}, extendedShapeTypeInfos)
    } else {
      shapeEntity = new ShapeEntity(extendedShapeInfo.left, extendedShapeInfo.top, extendedShapeInfo.width, extendedShapeInfo.height, {shapeType: extendedShapeInfo.type})
    }
    shapeEntity.type = extendedShapeInfo.type
    shapeEntity.text = extendedShapeInfo.text
    shapeEntity.id = extendedShapeInfo.id
    if (extendedShapeInfo.rotation) {
      shapeEntity.rotation = new Rotation(extendedShapeInfo.rotation, shapeEntity.width / 2, shapeEntity.height / 2)
    }
    shapeEntity.shape.modifier = SystemUtils.parsePointString(extendedShapeInfo.modifier)
    shapeEntity.shape.controller  = SystemUtils.parsePointString(extendedShapeInfo.controller)
    shapeEntity.shape.adapter = SystemUtils.parsePointString(extendedShapeInfo.adapter)
    shapeEntity.shape.adapterSize = extendedShapeInfo.adapterSize
    return shapeEntity
}

  public static loadFrame(itemInfo: EditorItemInfo): ShapeEntity {
    if(!OperationHelper.initialized) {
      OperationHelper.initializeCustomEntities()
    }
    const frameInfo = itemInfo as FrameEntityInfo
    const frameTypeInfo = OperationHelper.frameShapeTypes.get(frameInfo.type)
    const shapeTypes: ShapeType[] = []
    let containerEntity: FrameEntity
    if(frameTypeInfo) {
      shapeTypes.push(frameTypeInfo.shapeType)
      containerEntity = new frameTypeInfo.type(itemInfo.left, itemInfo.top, itemInfo.width, itemInfo.height, {shapeType: frameInfo.type}, shapeTypes)
    } else {
      containerEntity = new FrameEntity(itemInfo.left, itemInfo.top, itemInfo.width, itemInfo.height, {shapeType: frameInfo.type}, shapeTypes)
    }
    containerEntity.id = frameInfo.id
    if (frameInfo.rotation) {
      containerEntity.rotation = new Rotation(frameInfo.rotation, frameInfo.width / 2, frameInfo.height / 2)
    }
    containerEntity.shape.modifier = SystemUtils.parsePointString(frameInfo.modifier)
    containerEntity.shape.adapter = SystemUtils.parsePointString(frameInfo.adapter)
    containerEntity.shape.adapterSize = frameInfo.adapterSize

    containerEntity.removeAllItems()
    itemInfo.items.forEach(childItemInfo => {
      let childItem = OperationHelper.loadTableCellEntity(childItemInfo)
      containerEntity.addItem(childItem)
    })
    return containerEntity
  }

  public static loadGroup(itemInfo: EditorItemInfo): ShapeEntity {
    if(!OperationHelper.initialized) {
      OperationHelper.initializeCustomEntities()
    }
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

  private static initializeCustomEntities() {
    CustomShapes.forEach(customShape => {
      OperationHelper.customShapes.set(customShape.name, {type: customShape.type, shapeType: customShape.typeInfo})
    })
    CustomTableShapes.forEach(customShape => {
      OperationHelper.customTableShapes.set(customShape.name,{type: customShape.type, shapeType: customShape.typeInfo})
    })
    ExtendedContainerTypes.forEach(customShape => {
      OperationHelper.extendedContainerTypes.set(customShape.name,{type: customShape.type, shapeType: customShape.typeInfo})
    })
    ExtendedShapes.forEach(customShape => {
      OperationHelper.extendedShapeTypes.set(customShape.name,{type: customShape.type, shapeType: customShape.typeInfo})
    })
    CustomConnectors.forEach(customShape => {
      OperationHelper.CustomConnectorTypes.set(customShape.name, {type: customShape.type, shapeType: customShape.typeInfo})
    })
    FrameShapes.forEach(customShape => {
      OperationHelper.frameShapeTypes.set(customShape.name, {type: customShape.type, shapeType: customShape.typeInfo})
    })
    CustomContainers.forEach(customShape => {
      OperationHelper.customContainerTypes.set(customShape.name, {type: customShape.type, shapeType: customShape.typeInfo})
    })
  }

  public static loadCustomEntity(itemInfo: EditorItemInfo): ShapeEntity {
    if(!OperationHelper.initialized) {
      OperationHelper.initializeCustomEntities()
    }
    let shapeInfo = itemInfo as CustomShapeInfo
    let customShapeType = OperationHelper.customShapes.get(shapeInfo.type)
    let shapeEntity: ShapeEntity
    if(customShapeType) {
      shapeEntity = new customShapeType.type(shapeInfo.left, shapeInfo.top, shapeInfo.width, shapeInfo.height, shapeInfo.type)
    } else {
      shapeEntity = new ShapeEntity(shapeInfo.left, shapeInfo.top, shapeInfo.width, shapeInfo.height, {shapeType: shapeInfo.type})
    }
    shapeEntity.type = shapeInfo.type
    shapeEntity.text = shapeInfo.text
    shapeEntity.id = shapeInfo.id
    if (shapeInfo.rotation) {
      shapeEntity.rotation = new Rotation(shapeInfo.rotation, shapeEntity.width / 2, shapeEntity.height / 2)
    }
    shapeEntity.shape.modifier = SystemUtils.parsePointString(shapeInfo.modifier)
    shapeEntity.shape.controller  = SystemUtils.parsePointString(shapeInfo.controller)
    shapeEntity.shape.adapter = SystemUtils.parsePointString(shapeInfo.adapter)
    shapeEntity.shape.adapterSize = shapeInfo.adapterSize
    return shapeEntity
  }

  public static loadSvgContainer(itemInfo: EditorItemInfo): ShapeEntity {
    let svgContainerInfo = itemInfo as SvgContainerInfo
    const svgContainer = new SvgContainer(svgContainerInfo.left, svgContainerInfo.top, svgContainerInfo.width, svgContainerInfo.height, svgContainerInfo.svg)
    svgContainer.svgShape.svgInitialized = false
    svgContainer.type = svgContainerInfo.type
    svgContainer.text = svgContainerInfo.text
    svgContainer.id = svgContainerInfo.id
    if (svgContainerInfo.rotation) {
      svgContainer.rotation = new Rotation(svgContainerInfo.rotation, svgContainer.width / 2, svgContainer.height / 2)
    }
    svgContainer.shape.modifier = SystemUtils.parsePointString(svgContainerInfo.modifier)
    svgContainer.shape.controller  = SystemUtils.parsePointString(svgContainerInfo.controller)
    svgContainer.shape.adapter = SystemUtils.parsePointString(svgContainerInfo.adapter)
    svgContainer.shape.adapterSize = svgContainerInfo.adapterSize
    if(svgContainerInfo.enableFillColor) {
      svgContainer.enableFillColor = svgContainerInfo.enableFillColor
    }
    if(svgContainerInfo.enableStrokeColor) {
      svgContainer.enableStrokeColor = svgContainerInfo.enableStrokeColor
    }

    return svgContainer    
  }

  public static loadImageContainer(itemInfo: EditorItemInfo): ShapeEntity {
    let imageContainerInfo = itemInfo as ImageContainerInfo
    const imageContainer = new ImageContainer(imageContainerInfo.left, imageContainerInfo.top, imageContainerInfo.width, imageContainerInfo.height, imageContainerInfo.image)
    imageContainer.type = imageContainerInfo.type
    imageContainer.text = imageContainerInfo.text
    imageContainer.id = imageContainerInfo.id
    if (imageContainerInfo.rotation) {
      imageContainer.rotation = new Rotation(imageContainerInfo.rotation, imageContainer.width / 2, imageContainer.height / 2)
    }
    imageContainer.shape.modifier = SystemUtils.parsePointString(imageContainerInfo.modifier)
    imageContainer.shape.controller  = SystemUtils.parsePointString(imageContainerInfo.controller)
    imageContainer.shape.adapter = SystemUtils.parsePointString(imageContainerInfo.adapter)
    imageContainer.shape.adapterSize = imageContainerInfo.adapterSize
    return imageContainer    
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

  public static loadExtendedContainerEntity(itemInfo: EditorItemInfo): ContainerEntity {
    if(!OperationHelper.initialized) {
      OperationHelper.initializeCustomEntities()
    }
    const extendedContainerInfo = itemInfo as ContainerInfo
    const extendedContainerTypeInfo = OperationHelper.extendedContainerTypes.get(extendedContainerInfo.type)
    let containerEntity: ContainerEntity
    if(extendedContainerTypeInfo) {
      containerEntity = new extendedContainerTypeInfo.type(itemInfo.left, itemInfo.top, itemInfo.width, itemInfo.height, {shapeType: extendedContainerInfo.type}, [extendedContainerTypeInfo.shapeType])
    } else {
      containerEntity = new ContainerEntity(itemInfo.left, itemInfo.top, itemInfo.width, itemInfo.height, {shapeType: extendedContainerInfo.type})
    }
    containerEntity.id = extendedContainerInfo.id
    if (extendedContainerInfo.rotation) {
      containerEntity.rotation = new Rotation(extendedContainerInfo.rotation, extendedContainerInfo.width / 2, extendedContainerInfo.height / 2)
    }
    containerEntity.shape.modifier = SystemUtils.parsePointString(extendedContainerInfo.modifier)
    containerEntity.shape.adapter = SystemUtils.parsePointString(extendedContainerInfo.adapter)
    containerEntity.shape.adapterSize = extendedContainerInfo.adapterSize

    containerEntity.removeAllItems()
    itemInfo.items.forEach(childItemInfo => {
      let childItem = OperationHelper.loadTableCellEntity(childItemInfo)
      containerEntity.addItem(childItem)
    })
    return containerEntity
}


  public static loadCustomContainerEntity(itemInfo: EditorItemInfo): CustomContainerEntity {
    if(!OperationHelper.initialized) {
      OperationHelper.initializeCustomEntities()
    }
    const extendedContainerInfo = itemInfo as ContainerInfo
    const extendedContainerTypeInfo = OperationHelper.customContainerTypes.get(extendedContainerInfo.type)
    let containerEntity: CustomContainerEntity
    if(extendedContainerTypeInfo) {
      containerEntity = new extendedContainerTypeInfo.type(itemInfo.left, itemInfo.top, itemInfo.width, itemInfo.height, extendedContainerInfo.type, [extendedContainerTypeInfo.shapeType])
    } else {
      containerEntity = new CustomContainerEntity(itemInfo.left, itemInfo.top, itemInfo.width, itemInfo.height, extendedContainerInfo.type)
    }
    containerEntity.id = extendedContainerInfo.id
    if (extendedContainerInfo.rotation) {
      containerEntity.rotation = new Rotation(extendedContainerInfo.rotation, extendedContainerInfo.width / 2, extendedContainerInfo.height / 2)
    }
    containerEntity.shape.modifier = SystemUtils.parsePointString(extendedContainerInfo.modifier)
    containerEntity.shape.adapter = SystemUtils.parsePointString(extendedContainerInfo.adapter)
    containerEntity.shape.adapterSize = extendedContainerInfo.adapterSize

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
  
  public static loadCustomTable(itemInfo: EditorItemInfo): CustomTableEntity {
    if(!OperationHelper.initialized) {
      OperationHelper.initializeCustomEntities()
    }
    const customTableInfo = itemInfo as CustomTableInfo
    const customTableTypeInfo = OperationHelper.customTableShapes.get(customTableInfo.type)
    let customTableTypeInfos: CustomTableShapeType[] = []
    let customTableEntity: CustomTableEntity
    if(customTableTypeInfo) {
      customTableTypeInfos.push(customTableTypeInfo)
      customTableEntity = new customTableTypeInfo.type(itemInfo.left, itemInfo.top, itemInfo.width, itemInfo.height, customTableInfo.customTableTypeName, [], customTableInfo.rowCount, customTableInfo.columnCount)
    } else {
      customTableEntity = new CustomTableEntity(itemInfo.left, itemInfo.top, itemInfo.width, itemInfo.height, customTableInfo.customTableTypeName, [], customTableInfo.rowCount, customTableInfo.columnCount)
    }
    customTableEntity.id = customTableInfo.id
    if (customTableInfo.rotation) {
      customTableEntity.rotation = new Rotation(customTableInfo.rotation, customTableInfo.width / 2, customTableInfo.height / 2)
    }
    customTableEntity.removeAllItems()
    itemInfo.items.forEach(childItemInfo => {
      let childItem = OperationHelper.loadTableCellEntity(childItemInfo)
      customTableEntity.addItem(childItem)
    })
    return customTableEntity
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
        editorItemInfo = this.saveContainer(editorItem as ContainerEntity)
        break;
      case Categories.FRAME:
        editorItemInfo = this.saveFrame(editorItem as FrameEntity)
        break;
      case Categories.GROUP:
        editorItemInfo = this.saveGroup(editorItem as GroupEntity)
        break;
      case Categories.CUSTOM_SHAPE:
        editorItemInfo = this.saveCustomShape(editorItem as CustomEntity)
        break;
      case Categories.CUSTOM_SVG_SHAPE:
        editorItemInfo = this.saveCustomSvgShape(editorItem as SvgContainer)
        break;
      case Categories.CUSTOM_IMAGE_SHAPE:
        editorItemInfo = this.saveCustomImageShape(editorItem as ImageContainer)
        break;
      case Categories.EXTENDED_CONTAINER:
        editorItemInfo = this.saveExtendedContainer(editorItem as CustomContainerEntity)
        break;
      case Categories.EXTENDED_SHAPE:
        editorItemInfo = this.saveExtendedShape(editorItem as ShapeEntity)
        break;
      case Categories.CUSTOM_CONNECTOR:
        editorItemInfo = this.saveCustomConnector(editorItem as CustomConnector)
        break;
      case Categories.CUSTOM_CONTAINER:
        editorItemInfo = this.saveCustomContainer(editorItem as CustomContainerEntity)
        break;
      case Categories.CUSTOM_TABLE:
        editorItemInfo = this.saveCustomTable(editorItem as CustomTableEntity)
        break;
      case Categories.SHAPE:
      default:
        editorItemInfo = this.saveShape(editorItem as ShapeEntity)
        break
    }
    editorItemInfo.id = editorItem.id
    editorItemInfo.items.length = 0
    editorItemInfo.useTheme = editorItem.useTheme
    editorItemInfo.themeName = editorItem.themeName
    editorItemInfo.locked = editorItem.locked
    if(editorItem.useTheme) {
      editorItemInfo.strokeColor = null
      editorItemInfo.fillColor = null
      editorItemInfo.lineWidth = null
    } else {
      editorItemInfo.strokeColor = SystemUtils.generateColorString(editorItem.strokeColor)
      editorItemInfo.fillColor = SystemUtils.generateColorString(editorItem.fillColor)
      editorItemInfo.lineWidth = editorItem.lineWidth
    }

    editorItemInfo.textAlignment = SystemUtils.generateTextAlignment(editorItem.textAlignment)
    editorItemInfo.textVerticalAlignment = SystemUtils.generateTextVerticalAligment(editorItem.textVerticalAlignment)
    editorItemInfo.stroked = editorItem.stroked
    editorItemInfo.filled = editorItem.filled
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
    shapeinfo.controller = shapeEntity.shape.controller.x + ',' + shapeEntity.shape.controller.y
    shapeinfo.adapter = shapeEntity.shape.adapter.x + ',' + shapeEntity.shape.adapter.y
    shapeinfo.adapterSize = shapeEntity.shape.adapterSize

    return shapeinfo
  }

  public static  saveCustomShape(customEntity: CustomEntity) : EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(customEntity.shape.styles)
    let shapeinfo = new ShapeInfo(customEntity.type, customEntity.category, customEntity.left, customEntity.top, customEntity.width, customEntity.height, customEntity.text, customEntity.rotation.radius, styleInfos)
    shapeinfo.rotation = customEntity.rotation.radius
    shapeinfo.modifier = customEntity.shape.modifier.x + ',' + customEntity.shape.modifier.y
    shapeinfo.controller = customEntity.shape.controller.x + ',' + customEntity.shape.controller.y
    shapeinfo.adapter = customEntity.shape.adapter.x + ',' + customEntity.shape.adapter.y
    shapeinfo.adapterSize = customEntity.shape.adapterSize

    return shapeinfo
  }

  public static  saveExtendedShape(customEntity: ShapeEntity) : EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(customEntity.shape.styles)
    let shapeinfo = new CustomShapeInfo(customEntity.type, customEntity.category, customEntity.left, customEntity.top, customEntity.width, customEntity.height, customEntity.text, customEntity.rotation.radius, styleInfos)
    shapeinfo.rotation = customEntity.rotation.radius
    shapeinfo.modifier = customEntity.shape.modifier.x + ',' + customEntity.shape.modifier.y
    shapeinfo.controller = customEntity.shape.controller.x + ',' + customEntity.shape.controller.y
    shapeinfo.adapter = customEntity.shape.adapter.x + ',' + customEntity.shape.adapter.y
    shapeinfo.adapterSize = customEntity.shape.adapterSize

    return shapeinfo
  }

  public static  saveCustomSvgShape(svgContainer: SvgContainer) : EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(svgContainer.shape.styles)
    let svgContainerInfo = new SvgContainerInfo(svgContainer.type, svgContainer.category, svgContainer.left, svgContainer.top, svgContainer.width, svgContainer.height, svgContainer.text, svgContainer.rotation.radius, styleInfos)
    svgContainerInfo.rotation = svgContainer.rotation.radius
    svgContainerInfo.modifier = svgContainer.shape.modifier.x + ',' + svgContainer.shape.modifier.y
    svgContainerInfo.controller = svgContainer.shape.controller.x + ',' + svgContainer.shape.controller.y
    svgContainerInfo.adapter = svgContainer.shape.adapter.x + ',' + svgContainer.shape.adapter.y
    svgContainerInfo.adapterSize = svgContainer.shape.adapterSize
    svgContainerInfo.svg = svgContainer.svg
    svgContainerInfo.enableFillColor = svgContainer.enableFillColor
    svgContainerInfo.enableStrokeColor = svgContainer.enableStrokeColor

    return svgContainerInfo
  }

  public static  saveCustomImageShape(imageContainer: ImageContainer) : EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(imageContainer.shape.styles)
    let imageContainerInfo = new ImageContainerInfo(imageContainer.type, imageContainer.category, imageContainer.left, imageContainer.top, imageContainer.width, imageContainer.height, imageContainer.text, imageContainer.rotation.radius, styleInfos)
    imageContainerInfo.rotation = imageContainer.rotation.radius
    imageContainerInfo.modifier = imageContainer.shape.modifier.x + ',' + imageContainer.shape.modifier.y
    imageContainerInfo.controller = imageContainer.shape.controller.x + ',' + imageContainer.shape.controller.y
    imageContainerInfo.adapter = imageContainer.shape.adapter.x + ',' + imageContainer.shape.adapter.y
    imageContainerInfo.adapterSize = imageContainer.shape.adapterSize
    imageContainerInfo.image = imageContainer.image

    return imageContainerInfo
  }

  public static  saveTable(tableEntity: TableEntity) : EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(tableEntity.shape.styles)
    let tableInfo = new TableInfo(tableEntity.left, tableEntity.top, tableEntity.width, tableEntity.height, tableEntity.rowCount, tableEntity.columnCount, tableEntity.rotation.radius, styleInfos)

    return tableInfo
  }

  public static  saveCustomTable(customTableEntity: CustomTableEntity) : EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(customTableEntity.shape.styles)
    let tableInfo = new CustomTableInfo(customTableEntity.left, customTableEntity.top, customTableEntity.width, customTableEntity.height,customTableEntity.customTableTypeName, customTableEntity.rowCount, customTableEntity.columnCount, customTableEntity.rotation.radius, styleInfos)

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

  public static  saveCustomContainer(container: CustomContainerEntity) : EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(container.shape.styles)
    let containerInfo = new ContainerInfo(container.type, container.category, container.left, container.top, container.width, container.height, container.text,  container.rotation.radius, styleInfos)
    containerInfo.rotation = container.rotation.radius
    containerInfo.modifier = container.shape.modifier.x + ',' + container.shape.modifier.y
    containerInfo.adapter = container.shape.adapter.x + ',' + container.shape.adapter.y
    containerInfo.adapterSize = container.shape.adapterSize

    return containerInfo
  }

  public static  saveExtendedContainer(customContainer: CustomContainerEntity) : EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(customContainer.shape.styles)
    let containerInfo = new ContainerInfo(customContainer.type, customContainer.category, customContainer.left, customContainer.top, customContainer.width, customContainer.height, customContainer.text,  customContainer.rotation.radius, styleInfos)
    containerInfo.rotation = customContainer.rotation.radius
    containerInfo.modifier = customContainer.shape.modifier.x + ',' + customContainer.shape.modifier.y
    containerInfo.adapter = customContainer.shape.adapter.x + ',' + customContainer.shape.adapter.y
    containerInfo.adapterSize = customContainer.shape.adapterSize

    return containerInfo
  }

  public static  saveFrame(frame: FrameEntity) : EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(frame.shape.styles)
    let frameEntityInfo = new FrameEntityInfo(frame.type, frame.category, frame.left, frame.top, frame.width, frame.height, frame.text,  frame.rotation.radius, styleInfos)
    frameEntityInfo.rotation = frame.rotation.radius
    frameEntityInfo.modifier = frame.shape.modifier.x + ',' + frame.shape.modifier.y
    frameEntityInfo.adapter = frame.shape.adapter.x + ',' + frame.shape.adapter.y
    frameEntityInfo.adapterSize = frame.shape.adapterSize

    return frameEntityInfo
  }

  public static  saveGroup(container: GroupEntity) : EditorItemInfo {
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


  public static  saveCustomConnector(customConnector: CustomConnector) : EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(customConnector.shape.styles)
    let connectorInfo = new CustomConnectorInfo(customConnector.connectorTypeInfo.name, customConnector.start.x, customConnector.start.y, customConnector.end.x, customConnector.end.y, customConnector.text, customConnector.rotation.radius, styleInfos)
    if(customConnector.source) {
      connectorInfo.source = customConnector.source.id
    }
    if(customConnector.target) {
      connectorInfo.target = customConnector.target.id
    }
    if(customConnector.sourceJoint) {
      connectorInfo.sourceJoint = SystemUtils.generatePointString(customConnector.sourceJoint)
    }
    if(customConnector.targetJoint) {
        connectorInfo.targetJoint = SystemUtils.generatePointString(customConnector.targetJoint)
    }
    
    connectorInfo.text = customConnector.text
    connectorInfo.connectorType = customConnector.connectorType ?  CommonUtils.parseConnectorType(customConnector.connectorType) : null
    connectorInfo.startArrow = SystemUtils.generateConnectorArrow(customConnector.startArrow)
    connectorInfo.endArrow = SystemUtils.generateConnectorArrow(customConnector.endArrow)
    connectorInfo.curveStartModifier = SystemUtils.generatePointString(customConnector.curveStartModifier)
    connectorInfo.curveEndModifier = SystemUtils.generatePointString(customConnector.curveEndModifier)
    connectorInfo.startDirection = SystemUtils.generateConnectorDirection(customConnector.startDirection)
    connectorInfo.endDirection = SystemUtils.generateConnectorDirection(customConnector.endDirection)
    connectorInfo.orthogonalPoints = SystemUtils.generatePointsString(customConnector.orthogonalPoints)
    connectorInfo.connectorMode = SystemUtils.generateConnectorMode(customConnector.connectorMode)
    connectorInfo.connectorDoubleLineGap = customConnector.connectorDoubleLineGap
    connectorInfo.connectorDoubleLineArrowLength = customConnector.connectorDoubleLineArrowLength
    connectorInfo.connectorDoubleLineArrowDistance = customConnector.connectorDoubleLineArrowDistance

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
