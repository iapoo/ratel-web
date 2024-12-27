/* eslint-disable max-params */
import { PluginManager } from '@/components/Workspace/Utils/PluginManager'
import { Rotation } from '@ratel-web/engine'
import { Editor } from '../../Editor'
import {
  Categories,
  CellEntity,
  CodeContainer,
  Connector,
  ConnectorInfo,
  ContainerEntity,
  ContainerInfo,
  CustomConnector,
  CustomConnectorInfo,
  CustomConnectorTypeInfo,
  CustomContainerEntity,
  CustomEntity,
  CustomShapeInfo,
  CustomTableEntity,
  CustomTableInfo,
  CustomTableType,
  EditorItem,
  EditorItemInfo,
  Entity,
  ExtensionConnector,
  ExtensionContainer,
  ExtensionEntity,
  ExtensionEntityInfo,
  ExtensionImageContainer,
  ExtensionSvgContainer,
  ExtensionTable,
  ExtensionUtils,
  FrameEntity,
  FrameEntityInfo,
  GroupEntity,
  ImageContainer,
  ImageContainerInfo,
  Item,
  LineEntity,
  LineInfo,
  PoolCustomContainer,
  ShapeEntity,
  ShapeInfo,
  ShapeType,
  SvgContainer,
  SvgContainerInfo,
  TableEntity,
  TableInfo,
} from '../../Items'
import { CodeContainerInfo } from '../../Items/src/CodeContainerInfo'
import { ExtensionConnectorInfo } from '../../Items/src/ExtensionConnectorInfo'
import { ExtensionContainerInfo } from '../../Items/src/ExtensionContainerInfo'
import { ExtensionImageContainerInfo } from '../../Items/src/ExtensionImageContainerInfo'
import { ExtensionSvgContainerInfo } from '../../Items/src/ExtensionSvgContainerInfo'
import { ExtensionTableInfo } from '../../Items/src/ExtensionTableInfo'
import { PoolCustomContainerInfo } from '../../Items/src/PoolCustomContainerInfo'
import { PoolLabelEntity } from '../../Items/src/PoolLabelEntity'
import { PoolLabelInfo } from '../../Items/src/PoolLabelInfo'
import { ConnectorMode, ConnectorType, Style, StyleInfo } from '../../Shapes'
import {
  CommonUtils,
  ContainerShapeType,
  CustomConnectors,
  CustomConnectorType,
  CustomContainers,
  CustomContainerType,
  CustomShapes,
  CustomShapeType,
  CustomTableShapes,
  CustomTableShapeType,
  ExtendedContainerTypes,
  ExtendedShapes,
  ExtendedShapeType,
  FrameShapes,
  FrameShapeType,
} from '../../Utils'

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
        editorItem = this.loadContainerEntity(itemInfo, editor)
        break
      case Categories.TABLE:
        editorItem = this.loadTableEntity(itemInfo)
        break
      case Categories.CUSTOM_TABLE:
        editorItem = this.loadCustomTable(itemInfo)
        break
      case Categories.FRAME:
        editorItem = this.loadFrame(itemInfo, editor)
        break
      case Categories.GROUP:
        editorItem = this.loadGroup(itemInfo, editor)
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
        editorItem = this.loadExtendedContainerEntity(itemInfo, editor)
        break
      case Categories.EXTENDED_SHAPE:
        editorItem = this.loadExtendedShapeEntity(itemInfo)
        break
      case Categories.CUSTOM_CONNECTOR:
        editorItem = this.loadCustomConnector(itemInfo, editor)
        break
      case Categories.CUSTOM_CONTAINER:
        editorItem = this.loadCustomContainerEntity(itemInfo, editor)
        break
      case Categories.EXTENSION_ENTITY:
        editorItem = this.loadExtensionEntity(itemInfo)
        break
      case Categories.EXTENSION_CONNECTOR:
        editorItem = this.loadExtensionConnector(itemInfo, editor)
        break
      case Categories.EXTENSION_CONTAINER:
        editorItem = this.loadExtensionContainer(itemInfo, editor)
        break
      case Categories.EXTENSION_TABLE:
        editorItem = this.loadExtensionTable(itemInfo)
        break
      case Categories.EXTENSION_IMAGE:
        editorItem = this.loadExtensionImageContainer(itemInfo)
        break
      case Categories.EXTENSION_SVG:
        editorItem = this.loadExtensionSvgContainer(itemInfo)
        break
      case Categories.POOL:
        editorItem = this.loadPool(itemInfo, editor)
        break
      case Categories.POOL_LABEL:
        editorItem = this.loadPoolLabelEntity(itemInfo)
        break
      case Categories.CODE_CONTAINER:
        editorItem = this.loadCodeContainer(itemInfo)
        break
      case Categories.SHAPE:
      default:
        editorItem = this.loadShapeEntity(itemInfo)
        break
    }
    //Need to use correct StyleInfo
    OperationHelper.fixStyleInfo(itemInfo)
    editorItem.shape.styles = StyleInfo.makeStyles(itemInfo.styles)
    if (!editorItem.isContainer) {
      itemInfo.items.forEach((childItemInfo) => {
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
    editorItem.themeName = itemInfo.themeName
    // if (itemInfo.useTheme) {
    //   if (itemInfo.category == Categories.CONNECTOR) {
    //     editorItem.strokeColor = ThemeUtils.getConnectorStrokeColor(itemInfo.themeName)
    //     editorItem.fillColor = ThemeUtils.getConnectorFillColor(itemInfo.themeName)
    //     editorItem.fontColor = ThemeUtils.getConnectorFontColor(itemInfo.themeName)
    //   } else {
    //     editorItem.strokeColor = ThemeUtils.getShapeStrokeColor(itemInfo.themeName)
    //     editorItem.fillColor = ThemeUtils.getShapeFillColor(itemInfo.themeName)
    //     editorItem.fontColor = ThemeUtils.getShapeFontColor(itemInfo.themeName)
    //   }
    //   editorItem.lineWidth = ThemeUtils.lineWidth
    // } else {
    //   let strokeColor = SystemUtils.parseColorString(itemInfo.strokeColor)
    //   if (strokeColor) {
    //     editorItem.strokeColor = strokeColor
    //   }
    //   let fillColor = SystemUtils.parseColorString(itemInfo.fillColor)
    //   if (fillColor) {
    //     editorItem.fillColor = fillColor
    //   }
    //   if (itemInfo.lineWidth) {
    //     editorItem.lineWidth = itemInfo.lineWidth
    //   }
    // }
    let strokeColor = CommonUtils.parseColorString(itemInfo.strokeColor)
    if (strokeColor) {
      editorItem.strokeColor = strokeColor
    }
    let fillColor = CommonUtils.parseColorString(itemInfo.fillColor)
    if (fillColor) {
      editorItem.fillColor = fillColor
    }
    if (itemInfo.lineWidth) {
      editorItem.lineWidth = itemInfo.lineWidth
    }
    editorItem.textAlignment = CommonUtils.parseTextAlignment(itemInfo.textAlignment)
    editorItem.textVerticalAlignment = CommonUtils.parseTextVerticalAligment(itemInfo.textVerticalAlignment)
    editorItem.stroked = itemInfo.stroked
    editorItem.filled = itemInfo.filled
    // editorItem.fontW

    //TODO: FIXME : Some cleanup or intializeation
    if (editorItem instanceof SvgContainer) {
      editorItem.svgShape.svgInitialized = true
    }
    if (editorItem instanceof ImageContainer) {
      editorItem.shape.stroked = false
      editorItem.shape.filled = false
    }
    return editorItem
  }

  public static refreshItem(itemInfo: EditorItemInfo, items: EditorItem[]) {
    if (itemInfo.category === Categories.CONNECTOR || itemInfo.category === Categories.CUSTOM_CONNECTOR) {
      let connectorInfo = itemInfo as ConnectorInfo
      let connector: Connector | null = null
      items.forEach((item) => {
        if (connectorInfo.id === item.id) {
          connector = item as Connector
        }
      })
      items.forEach((item) => {
        if (connectorInfo.source === item.id && connector) {
          let entity = item as Entity
          connector.source = entity
          entity.addSourceConnector(connector)
        }
        if (connectorInfo.target === item.id && connector) {
          let entity = item as Entity
          connector.target = entity
          entity.addTargetConnector(connector)
        }
      })
      //console.log(connector)
    }
  }

  public static loadLine(itemInfo: EditorItemInfo): LineEntity {
    let lineInfo = itemInfo as LineInfo
    let start = CommonUtils.parsePointString(lineInfo.start)
    let end = CommonUtils.parsePointString(lineInfo.end)
    let lineEntity = new LineEntity(start, end)
    if (lineInfo.rotation) {
      lineEntity.rotation = new Rotation(lineInfo.rotation, lineEntity.width / 2, lineEntity.height / 2)
    }
    lineEntity.text = lineInfo.text
    lineEntity.id = lineInfo.id
    return lineEntity
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static loadConnector(itemInfo: EditorItemInfo, editor: Editor): Connector {
    let connectorInfo = itemInfo as ConnectorInfo
    let start = CommonUtils.parsePointString(connectorInfo.start)
    let end = CommonUtils.parsePointString(connectorInfo.end)
    let connector = new Connector(start, end)
    connector.connectorType = connectorInfo.connectorType ? CommonUtils.parseConnectorType(connectorInfo.connectorType) : ConnectorType.Orthogonal
    if (connectorInfo.source) {
      //connector.source = connectorInfo.source
    }
    if (connectorInfo.target) {
    }
    if (connectorInfo.sourceJoint) {
      connector.sourceJoint = CommonUtils.parsePointString(connectorInfo.sourceJoint)
    }
    if (connectorInfo.targetJoint) {
      connector.targetJoint = CommonUtils.parsePointString(connectorInfo.targetJoint)
    }
    connector.id = connectorInfo.id
    connector.text = connectorInfo.text
    connector.startArrow = CommonUtils.parseConnectorArrow(connectorInfo.startArrow!)
    connector.endArrow = CommonUtils.parseConnectorArrow(connectorInfo.endArrow!)
    connector.curveStartModifier = CommonUtils.parsePointString(connectorInfo.curveStartModifier)
    connector.curveEndModifier = CommonUtils.parsePointString(connectorInfo.curveEndModifier)
    connector.startDirection = CommonUtils.parseConnectorDirection(connectorInfo.startDirection)
    connector.endDirection = CommonUtils.parseConnectorDirection(connectorInfo.endDirection)
    connector.orthogonalPoints = CommonUtils.parsePointsString(connectorInfo.orthogonalPoints)
    connector.connectorMode = connectorInfo.connectorMode ? CommonUtils.parseConnectorMode(connectorInfo.connectorMode) : ConnectorMode.Single
    connector.connectorDoubleLineGap = connectorInfo.connectorDoubleLineGap
    connector.connectorDoubleLineArrowLength = connectorInfo.connectorDoubleLineArrowLength
    connector.connectorDoubleLineArrowDistance = connectorInfo.connectorDoubleLineArrowDistance
    return connector
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static loadCustomConnector(itemInfo: EditorItemInfo, editor: Editor): Connector {
    if (!OperationHelper.initialized) {
      OperationHelper.initializeCustomEntities()
    }
    const customConnectorInfo = itemInfo as CustomConnectorInfo
    const customConnectorTypeInfo = OperationHelper.CustomConnectorTypes.get(customConnectorInfo.type)
    let start = CommonUtils.parsePointString(customConnectorInfo.start)
    let end = CommonUtils.parsePointString(customConnectorInfo.end)
    const customConnectorTypeInfos: CustomConnectorTypeInfo[] = []
    let connector = new Connector(start, end)
    if (customConnectorTypeInfo) {
      customConnectorTypeInfos.push(customConnectorTypeInfo.shapeType)
      connector = new customConnectorTypeInfo.type(start, end, customConnectorTypeInfo.shapeType.name, customConnectorTypeInfos)
    }
    connector.connectorType = customConnectorInfo.connectorType ? CommonUtils.parseConnectorType(customConnectorInfo.connectorType) : ConnectorType.Orthogonal
    if (customConnectorInfo.source) {
      //connector.source = connectorInfo.source
    }
    if (customConnectorInfo.target) {
    }
    if (customConnectorInfo.sourceJoint) {
      connector.sourceJoint = CommonUtils.parsePointString(customConnectorInfo.sourceJoint)
    }
    if (customConnectorInfo.targetJoint) {
      connector.targetJoint = CommonUtils.parsePointString(customConnectorInfo.targetJoint)
    }
    connector.id = customConnectorInfo.id
    connector.text = customConnectorInfo.text
    connector.startArrow = CommonUtils.parseConnectorArrow(customConnectorInfo.startArrow!)
    connector.endArrow = CommonUtils.parseConnectorArrow(customConnectorInfo.endArrow!)
    connector.curveStartModifier = CommonUtils.parsePointString(customConnectorInfo.curveStartModifier)
    connector.curveEndModifier = CommonUtils.parsePointString(customConnectorInfo.curveEndModifier)
    connector.startDirection = CommonUtils.parseConnectorDirection(customConnectorInfo.startDirection)
    connector.endDirection = CommonUtils.parseConnectorDirection(customConnectorInfo.endDirection)
    connector.orthogonalPoints = CommonUtils.parsePointsString(customConnectorInfo.orthogonalPoints)
    connector.connectorMode = customConnectorInfo.connectorMode ? CommonUtils.parseConnectorMode(customConnectorInfo.connectorMode) : ConnectorMode.Single
    connector.connectorDoubleLineGap = customConnectorInfo.connectorDoubleLineGap
    connector.connectorDoubleLineArrowLength = customConnectorInfo.connectorDoubleLineArrowLength
    connector.connectorDoubleLineArrowDistance = customConnectorInfo.connectorDoubleLineArrowDistance
    return connector
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static loadExtensionConnector(itemInfo: EditorItemInfo, editor: Editor): Connector {
    if (!OperationHelper.initialized) {
      OperationHelper.initializeCustomEntities()
    }
    const extensionEntityInfo = itemInfo as ExtensionConnectorInfo
    let start = CommonUtils.parsePointString(extensionEntityInfo.start)
    let end = CommonUtils.parsePointString(extensionEntityInfo.end)
    const pluginName = extensionEntityInfo.plugin
    const extensionCategoryName = extensionEntityInfo.extensionCategory
    const extensionName = extensionEntityInfo.type
    const plugin = PluginManager.findPlugin(pluginName)
    const extensionCategory = PluginManager.findExtensionCategory(pluginName, extensionCategoryName)
    const entityExtension = PluginManager.findExtension(pluginName, extensionCategoryName, extensionName)
    const typeInfo = ExtensionUtils.buildTypeInfo(entityExtension!)
    let extensionConnector: ExtensionConnector
    if (plugin && extensionCategory && entityExtension) {
      extensionConnector = new ExtensionConnector(start, end, entityExtension, extensionCategory, plugin, [typeInfo as CustomConnectorTypeInfo])
    } else {
      extensionConnector = new ExtensionConnector(start, end, entityExtension!, extensionCategory!, plugin!, [typeInfo as CustomConnectorTypeInfo])
    }
    extensionConnector.connectorType = extensionEntityInfo.connectorType
      ? CommonUtils.parseConnectorType(extensionEntityInfo.connectorType)
      : ConnectorType.Orthogonal
    if (extensionEntityInfo.source) {
      //connector.source = connectorInfo.source
    }
    if (extensionEntityInfo.target) {
    }
    if (extensionEntityInfo.sourceJoint) {
      extensionConnector.sourceJoint = CommonUtils.parsePointString(extensionEntityInfo.sourceJoint)
    }
    if (extensionEntityInfo.targetJoint) {
      extensionConnector.targetJoint = CommonUtils.parsePointString(extensionEntityInfo.targetJoint)
    }
    extensionConnector.id = extensionEntityInfo.id
    extensionConnector.text = extensionEntityInfo.text
    extensionConnector.startArrow = CommonUtils.parseConnectorArrow(extensionEntityInfo.startArrow!)
    extensionConnector.endArrow = CommonUtils.parseConnectorArrow(extensionEntityInfo.endArrow!)
    extensionConnector.curveStartModifier = CommonUtils.parsePointString(extensionEntityInfo.curveStartModifier)
    extensionConnector.curveEndModifier = CommonUtils.parsePointString(extensionEntityInfo.curveEndModifier)
    extensionConnector.startDirection = CommonUtils.parseConnectorDirection(extensionEntityInfo.startDirection)
    extensionConnector.endDirection = CommonUtils.parseConnectorDirection(extensionEntityInfo.endDirection)
    extensionConnector.orthogonalPoints = CommonUtils.parsePointsString(extensionEntityInfo.orthogonalPoints)
    extensionConnector.connectorMode = extensionEntityInfo.connectorMode
      ? CommonUtils.parseConnectorMode(extensionEntityInfo.connectorMode)
      : ConnectorMode.Single
    extensionConnector.connectorDoubleLineGap = extensionEntityInfo.connectorDoubleLineGap
    extensionConnector.connectorDoubleLineArrowLength = extensionEntityInfo.connectorDoubleLineArrowLength
    extensionConnector.connectorDoubleLineArrowDistance = extensionEntityInfo.connectorDoubleLineArrowDistance
    return extensionConnector
  }

  public static loadShapeEntity(itemInfo: EditorItemInfo): ShapeEntity {
    let shapeInfo = itemInfo as ShapeInfo
    const shapeEntity = new ShapeEntity(shapeInfo.left, shapeInfo.top, shapeInfo.width, shapeInfo.height, {
      shapeType: shapeInfo.type,
    })
    shapeEntity.type = shapeInfo.type
    shapeEntity.text = shapeInfo.text
    shapeEntity.id = shapeInfo.id
    if (shapeInfo.rotation) {
      shapeEntity.rotation = new Rotation(shapeInfo.rotation, shapeEntity.width / 2, shapeEntity.height / 2)
    }
    shapeEntity.shape.modifier = CommonUtils.parsePointString(shapeInfo.modifier)
    shapeEntity.shape.controller = CommonUtils.parsePointString(shapeInfo.controller)
    shapeEntity.shape.adapter = CommonUtils.parsePointString(shapeInfo.adapter)
    shapeEntity.shape.adapterSize = shapeInfo.adapterSize
    return shapeEntity
  }

  public static loadExtendedShapeEntity(itemInfo: EditorItemInfo): ShapeEntity {
    if (!OperationHelper.initialized) {
      OperationHelper.initializeCustomEntities()
    }
    let extendedShapeInfo = itemInfo as CustomShapeInfo
    const extendedShapeTypeInfo = OperationHelper.extendedShapeTypes.get(extendedShapeInfo.type)
    const extendedShapeTypeInfos: ShapeType[] = []
    let shapeEntity: ShapeEntity
    if (extendedShapeTypeInfo) {
      extendedShapeTypeInfos.push(extendedShapeTypeInfo.shapeType)
      shapeEntity = new extendedShapeTypeInfo.type(
        extendedShapeInfo.left,
        extendedShapeInfo.top,
        extendedShapeInfo.width,
        extendedShapeInfo.height,
        { shapeType: extendedShapeInfo.type },
        extendedShapeTypeInfos,
      )
    } else {
      shapeEntity = new ShapeEntity(extendedShapeInfo.left, extendedShapeInfo.top, extendedShapeInfo.width, extendedShapeInfo.height, {
        shapeType: extendedShapeInfo.type,
      })
    }
    shapeEntity.type = extendedShapeInfo.type
    shapeEntity.text = extendedShapeInfo.text
    shapeEntity.id = extendedShapeInfo.id
    if (extendedShapeInfo.rotation) {
      shapeEntity.rotation = new Rotation(extendedShapeInfo.rotation, shapeEntity.width / 2, shapeEntity.height / 2)
    }
    shapeEntity.shape.modifier = CommonUtils.parsePointString(extendedShapeInfo.modifier)
    shapeEntity.shape.controller = CommonUtils.parsePointString(extendedShapeInfo.controller)
    shapeEntity.shape.adapter = CommonUtils.parsePointString(extendedShapeInfo.adapter)
    shapeEntity.shape.adapterSize = extendedShapeInfo.adapterSize
    return shapeEntity
  }

  public static loadFrame(itemInfo: EditorItemInfo, editor: Editor): ShapeEntity {
    if (!OperationHelper.initialized) {
      OperationHelper.initializeCustomEntities()
    }
    const frameInfo = itemInfo as FrameEntityInfo
    const frameTypeInfo = OperationHelper.frameShapeTypes.get(frameInfo.type)
    const shapeTypes: ShapeType[] = []
    let frameEntity: FrameEntity
    if (frameTypeInfo) {
      shapeTypes.push(frameTypeInfo.shapeType)
      frameEntity = new frameTypeInfo.type(itemInfo.left, itemInfo.top, itemInfo.width, itemInfo.height, { shapeType: frameInfo.type }, shapeTypes)
    } else {
      frameEntity = new FrameEntity(itemInfo.left, itemInfo.top, itemInfo.width, itemInfo.height, { shapeType: frameInfo.type }, shapeTypes)
    }
    frameEntity.id = frameInfo.id
    if (frameInfo.rotation) {
      frameEntity.rotation = new Rotation(frameInfo.rotation, frameInfo.width / 2, frameInfo.height / 2)
    }
    frameEntity.text = frameInfo.text
    frameEntity.shape.modifier = CommonUtils.parsePointString(frameInfo.modifier)
    frameEntity.shape.adapter = CommonUtils.parsePointString(frameInfo.adapter)
    frameEntity.shape.adapterSize = frameInfo.adapterSize

    frameEntity.removeAllItems()
    itemInfo.items.forEach((childItemInfo) => {
      let childItem = OperationHelper.loadItem(childItemInfo, editor)
      frameEntity.addItem(childItem)
    })
    return frameEntity
  }

  public static loadGroup(itemInfo: EditorItemInfo, editor: Editor): ShapeEntity {
    if (!OperationHelper.initialized) {
      OperationHelper.initializeCustomEntities()
    }
    const containerInfo = itemInfo as ContainerInfo
    const containerEntity = new ContainerEntity(itemInfo.left, itemInfo.top, itemInfo.width, itemInfo.height, {
      shapeType: containerInfo.type,
    })
    containerEntity.id = containerInfo.id
    if (containerInfo.rotation) {
      containerEntity.rotation = new Rotation(containerInfo.rotation, containerInfo.width / 2, containerInfo.height / 2)
    }
    containerEntity.shape.modifier = CommonUtils.parsePointString(containerInfo.modifier)
    containerEntity.shape.adapter = CommonUtils.parsePointString(containerInfo.adapter)
    containerEntity.shape.adapterSize = containerInfo.adapterSize

    containerEntity.removeAllItems()
    itemInfo.items.forEach((childItemInfo) => {
      let childItem = OperationHelper.loadItem(childItemInfo, editor)
      containerEntity.addItem(childItem)
    })
    return containerEntity
  }

  private static initializeCustomEntities() {
    // @ts-ignore
    CustomShapes.forEach((customShape) => {
      OperationHelper.customShapes.set(customShape.name, { type: customShape.type, shapeType: customShape.typeInfo })
    })
    // @ts-ignore
    CustomTableShapes.forEach((customShape) => {
      OperationHelper.customTableShapes.set(customShape.name, {
        type: customShape.type,
        shapeType: customShape.typeInfo,
      })
    })
    // @ts-ignore
    ExtendedContainerTypes.forEach((customShape) => {
      OperationHelper.extendedContainerTypes.set(customShape.name, {
        type: customShape.type,
        shapeType: customShape.typeInfo,
      })
    })
    // @ts-ignore
    ExtendedShapes.forEach((customShape) => {
      OperationHelper.extendedShapeTypes.set(customShape.name, {
        type: customShape.type,
        shapeType: customShape.typeInfo,
      })
    })
    // @ts-ignore
    CustomConnectors.forEach((customShape) => {
      OperationHelper.CustomConnectorTypes.set(customShape.name, {
        type: customShape.type,
        shapeType: customShape.typeInfo,
      })
    })
    // @ts-ignore
    FrameShapes.forEach((customShape) => {
      OperationHelper.frameShapeTypes.set(customShape.name, { type: customShape.type, shapeType: customShape.typeInfo })
    })
    // @ts-ignore
    CustomContainers.forEach((customShape) => {
      OperationHelper.customContainerTypes.set(customShape.name, {
        type: customShape.type,
        shapeType: customShape.typeInfo,
      })
    })
  }

  public static loadCustomEntity(itemInfo: EditorItemInfo): ShapeEntity {
    if (!OperationHelper.initialized) {
      OperationHelper.initializeCustomEntities()
    }
    let shapeInfo = itemInfo as CustomShapeInfo
    let customShapeType = OperationHelper.customShapes.get(shapeInfo.type)
    let shapeEntity: ShapeEntity
    if (customShapeType) {
      shapeEntity = new customShapeType.type(shapeInfo.left, shapeInfo.top, shapeInfo.width, shapeInfo.height, shapeInfo.type)
    } else {
      shapeEntity = new ShapeEntity(shapeInfo.left, shapeInfo.top, shapeInfo.width, shapeInfo.height, {
        shapeType: shapeInfo.type,
      })
    }
    shapeEntity.type = shapeInfo.type
    shapeEntity.text = shapeInfo.text
    shapeEntity.id = shapeInfo.id
    if (shapeInfo.rotation) {
      shapeEntity.rotation = new Rotation(shapeInfo.rotation, shapeEntity.width / 2, shapeEntity.height / 2)
    }
    shapeEntity.shape.modifier = CommonUtils.parsePointString(shapeInfo.modifier)
    shapeEntity.shape.controller = CommonUtils.parsePointString(shapeInfo.controller)
    shapeEntity.shape.adapter = CommonUtils.parsePointString(shapeInfo.adapter)
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
    svgContainer.shape.modifier = CommonUtils.parsePointString(svgContainerInfo.modifier)
    svgContainer.shape.controller = CommonUtils.parsePointString(svgContainerInfo.controller)
    svgContainer.shape.adapter = CommonUtils.parsePointString(svgContainerInfo.adapter)
    svgContainer.shape.adapterSize = svgContainerInfo.adapterSize
    if (svgContainerInfo.enableFillColor) {
      svgContainer.enableFillColor = svgContainerInfo.enableFillColor
    }
    if (svgContainerInfo.enableStrokeColor) {
      svgContainer.enableStrokeColor = svgContainerInfo.enableStrokeColor
    }

    return svgContainer
  }

  public static loadExtensionSvgContainer(itemInfo: EditorItemInfo): ShapeEntity {
    let extensionSvgContainerInfo = itemInfo as ExtensionSvgContainerInfo
    const pluginName = extensionSvgContainerInfo.plugin
    const extensionCategoryName = extensionSvgContainerInfo.extensionCategory
    const extensionName = extensionSvgContainerInfo.type
    const plugin = PluginManager.findPlugin(pluginName)
    const extensionCategory = PluginManager.findExtensionCategory(pluginName, extensionCategoryName)
    const entityExtension = PluginManager.findExtension(pluginName, extensionCategoryName, extensionName)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const typeInfo = ExtensionUtils.buildTypeInfo(entityExtension!)
    let extensionSvgContainer: ExtensionSvgContainer
    if (plugin && extensionCategory && entityExtension) {
      extensionSvgContainer = new ExtensionSvgContainer(
        extensionSvgContainerInfo.left,
        extensionSvgContainerInfo.top,
        extensionSvgContainerInfo.width,
        extensionSvgContainerInfo.height,
        entityExtension,
        extensionCategory,
        plugin,
      )
    } else {
      extensionSvgContainer = new ExtensionSvgContainer(
        extensionSvgContainerInfo.left,
        extensionSvgContainerInfo.top,
        extensionSvgContainerInfo.width,
        extensionSvgContainerInfo.height,
        entityExtension!,
        extensionCategory!,
        plugin!,
      )
    }
    extensionSvgContainer.svgShape.svgInitialized = false
    extensionSvgContainer.type = extensionSvgContainerInfo.type
    extensionSvgContainer.text = extensionSvgContainerInfo.text
    extensionSvgContainer.id = extensionSvgContainerInfo.id
    if (extensionSvgContainerInfo.rotation) {
      extensionSvgContainer.rotation = new Rotation(extensionSvgContainerInfo.rotation, extensionSvgContainer.width / 2, extensionSvgContainer.height / 2)
    }
    extensionSvgContainer.shape.modifier = CommonUtils.parsePointString(extensionSvgContainerInfo.modifier)
    extensionSvgContainer.shape.controller = CommonUtils.parsePointString(extensionSvgContainerInfo.controller)
    extensionSvgContainer.shape.adapter = CommonUtils.parsePointString(extensionSvgContainerInfo.adapter)
    extensionSvgContainer.shape.adapterSize = extensionSvgContainerInfo.adapterSize
    if (extensionSvgContainerInfo.enableFillColor) {
      extensionSvgContainer.enableFillColor = extensionSvgContainerInfo.enableFillColor
    }
    if (extensionSvgContainerInfo.enableStrokeColor) {
      extensionSvgContainer.enableStrokeColor = extensionSvgContainerInfo.enableStrokeColor
    }

    return extensionSvgContainer
  }

  public static loadPool(itemInfo: EditorItemInfo, editor: Editor): ShapeEntity {
    let poolCustomContainerInfo = itemInfo as PoolCustomContainerInfo
    const poolCustomContainer = new PoolCustomContainer(
      poolCustomContainerInfo.left,
      poolCustomContainerInfo.top,
      poolCustomContainerInfo.width,
      poolCustomContainerInfo.height,
      poolCustomContainerInfo.poolCount,
      poolCustomContainerInfo.stageCount,
      poolCustomContainerInfo.horizontal,
      poolCustomContainerInfo.poolTextHorizontal,
      poolCustomContainerInfo.stageTextHorizontal,
    )
    poolCustomContainer.type = poolCustomContainerInfo.type
    poolCustomContainer.text = poolCustomContainerInfo.text
    poolCustomContainer.id = poolCustomContainerInfo.id
    if (poolCustomContainerInfo.rotation) {
      poolCustomContainer.rotation = new Rotation(poolCustomContainerInfo.rotation, poolCustomContainer.width / 2, poolCustomContainer.height / 2)
    }
    poolCustomContainer.shape.modifier = CommonUtils.parsePointString(poolCustomContainerInfo.modifier)
    poolCustomContainer.shape.controller = CommonUtils.parsePointString(poolCustomContainerInfo.controller)
    poolCustomContainer.shape.adapter = CommonUtils.parsePointString(poolCustomContainerInfo.adapter)
    poolCustomContainer.shape.adapterSize = poolCustomContainerInfo.adapterSize

    poolCustomContainer.removeAllItems()

    itemInfo.items.forEach((childItemInfo) => {
      let childItem = OperationHelper.loadItem(childItemInfo, editor)
      poolCustomContainer.addItem(childItem)
    })

    return poolCustomContainer
  }

  public static loadPoolLabelEntity(itemInfo: EditorItemInfo): PoolLabelEntity {
    let poolLabelInfo = itemInfo as PoolLabelInfo
    const poolLabelEntity = new PoolLabelEntity(
      poolLabelInfo.left,
      poolLabelInfo.top,
      poolLabelInfo.width,
      poolLabelInfo.height,
      poolLabelInfo.textHorizontal,
      {
        shapeType: poolLabelInfo.type,
      },
    )
    poolLabelEntity.textHorizontal = poolLabelInfo.textHorizontal
    poolLabelEntity.type = poolLabelInfo.type
    poolLabelEntity.text = poolLabelInfo.text
    poolLabelEntity.textAlignment = CommonUtils.parseTextAlignment(poolLabelInfo.textAlignment)
    poolLabelEntity.textVerticalAlignment = CommonUtils.parseTextVerticalAligment(poolLabelInfo.textVerticalAlignment)
    poolLabelEntity.id = poolLabelInfo.id
    if (poolLabelInfo.rotation) {
      poolLabelEntity.rotation = new Rotation(poolLabelInfo.rotation, poolLabelEntity.width / 2, poolLabelEntity.height / 2)
    }
    poolLabelEntity.shape.modifier = CommonUtils.parsePointString(poolLabelInfo.modifier)
    poolLabelEntity.shape.adapter = CommonUtils.parsePointString(poolLabelInfo.adapter)
    OperationHelper.fixStyleInfo(poolLabelInfo)
    poolLabelEntity.shape.styles = StyleInfo.makeStyles(poolLabelInfo.styles)
    return poolLabelEntity
  }

  public static loadCodeContainer(itemInfo: EditorItemInfo): ShapeEntity {
    let codeContainerInfo = itemInfo as CodeContainerInfo
    const codeContainer = new CodeContainer(
      codeContainerInfo.left,
      codeContainerInfo.top,
      codeContainerInfo.width,
      codeContainerInfo.height,
      codeContainerInfo.codeContent,
      codeContainerInfo.codeImage,
    )
    codeContainer.type = codeContainerInfo.type
    codeContainer.text = codeContainerInfo.text
    codeContainer.id = codeContainerInfo.id
    if (codeContainerInfo.rotation) {
      codeContainer.rotation = new Rotation(codeContainerInfo.rotation, codeContainer.width / 2, codeContainer.height / 2)
    }
    codeContainer.shape.modifier = CommonUtils.parsePointString(codeContainerInfo.modifier)
    codeContainer.shape.controller = CommonUtils.parsePointString(codeContainerInfo.controller)
    codeContainer.shape.adapter = CommonUtils.parsePointString(codeContainerInfo.adapter)
    codeContainer.shape.adapterSize = codeContainerInfo.adapterSize

    return codeContainer
  }

  public static loadImageContainer(itemInfo: EditorItemInfo): ShapeEntity {
    let imageContainerInfo = itemInfo as ImageContainerInfo
    const imageContainer = new ImageContainer(
      imageContainerInfo.left,
      imageContainerInfo.top,
      imageContainerInfo.width,
      imageContainerInfo.height,
      imageContainerInfo.image,
    )
    imageContainer.type = imageContainerInfo.type
    imageContainer.text = imageContainerInfo.text
    imageContainer.id = imageContainerInfo.id
    if (imageContainerInfo.rotation) {
      imageContainer.rotation = new Rotation(imageContainerInfo.rotation, imageContainer.width / 2, imageContainer.height / 2)
    }
    imageContainer.shape.modifier = CommonUtils.parsePointString(imageContainerInfo.modifier)
    imageContainer.shape.controller = CommonUtils.parsePointString(imageContainerInfo.controller)
    imageContainer.shape.adapter = CommonUtils.parsePointString(imageContainerInfo.adapter)
    imageContainer.shape.adapterSize = imageContainerInfo.adapterSize
    return imageContainer
  }

  public static loadExtensionImageContainer(itemInfo: EditorItemInfo): ShapeEntity {
    let extensionImageContainerInfo = itemInfo as ExtensionImageContainerInfo
    const pluginName = extensionImageContainerInfo.plugin
    const extensionCategoryName = extensionImageContainerInfo.extensionCategory
    const extensionName = extensionImageContainerInfo.type
    const plugin = PluginManager.findPlugin(pluginName)
    const extensionCategory = PluginManager.findExtensionCategory(pluginName, extensionCategoryName)
    const entityExtension = PluginManager.findExtension(pluginName, extensionCategoryName, extensionName)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const typeInfo = ExtensionUtils.buildTypeInfo(entityExtension!)
    let imageContainer: ExtensionImageContainer
    if (plugin && extensionCategory && entityExtension) {
      imageContainer = new ExtensionImageContainer(
        extensionImageContainerInfo.left,
        extensionImageContainerInfo.top,
        extensionImageContainerInfo.width,
        extensionImageContainerInfo.height,
        entityExtension,
        extensionCategory,
        plugin,
      )
    } else {
      imageContainer = new ExtensionImageContainer(
        extensionImageContainerInfo.left,
        extensionImageContainerInfo.top,
        extensionImageContainerInfo.width,
        extensionImageContainerInfo.height,
        entityExtension!,
        extensionCategory!,
        plugin!,
      )
    }
    imageContainer.type = extensionImageContainerInfo.type
    imageContainer.text = extensionImageContainerInfo.text
    imageContainer.id = extensionImageContainerInfo.id
    if (extensionImageContainerInfo.rotation) {
      imageContainer.rotation = new Rotation(extensionImageContainerInfo.rotation, imageContainer.width / 2, imageContainer.height / 2)
    }
    imageContainer.shape.modifier = CommonUtils.parsePointString(extensionImageContainerInfo.modifier)
    imageContainer.shape.controller = CommonUtils.parsePointString(extensionImageContainerInfo.controller)
    imageContainer.shape.adapter = CommonUtils.parsePointString(extensionImageContainerInfo.adapter)
    imageContainer.shape.adapterSize = extensionImageContainerInfo.adapterSize
    return imageContainer
  }

  public static loadContainerEntity(itemInfo: EditorItemInfo, editor: Editor): ContainerEntity {
    const containerInfo = itemInfo as ContainerInfo
    const containerEntity = new ContainerEntity(itemInfo.left, itemInfo.top, itemInfo.width, itemInfo.height, {
      shapeType: containerInfo.type,
    })
    containerEntity.id = containerInfo.id
    containerEntity.text = containerInfo.text
    if (containerInfo.rotation) {
      containerEntity.rotation = new Rotation(containerInfo.rotation, containerInfo.width / 2, containerInfo.height / 2)
    }
    containerEntity.shape.modifier = CommonUtils.parsePointString(containerInfo.modifier)
    containerEntity.shape.adapter = CommonUtils.parsePointString(containerInfo.adapter)
    containerEntity.shape.adapterSize = containerInfo.adapterSize

    containerEntity.removeAllItems()
    itemInfo.items.forEach((childItemInfo) => {
      let childItem = OperationHelper.loadItem(childItemInfo, editor)
      containerEntity.addItem(childItem)
    })
    return containerEntity
  }

  public static loadExtendedContainerEntity(itemInfo: EditorItemInfo, editor: Editor): ContainerEntity {
    if (!OperationHelper.initialized) {
      OperationHelper.initializeCustomEntities()
    }
    const extendedContainerInfo = itemInfo as ContainerInfo
    const extendedContainerTypeInfo = OperationHelper.extendedContainerTypes.get(extendedContainerInfo.type)
    let containerEntity: ContainerEntity
    if (extendedContainerTypeInfo) {
      containerEntity = new extendedContainerTypeInfo.type(
        itemInfo.left,
        itemInfo.top,
        itemInfo.width,
        itemInfo.height,
        { shapeType: extendedContainerInfo.type },
        [extendedContainerTypeInfo.shapeType],
      )
    } else {
      containerEntity = new ContainerEntity(itemInfo.left, itemInfo.top, itemInfo.width, itemInfo.height, {
        shapeType: extendedContainerInfo.type,
      })
    }
    containerEntity.id = extendedContainerInfo.id
    if (extendedContainerInfo.rotation) {
      containerEntity.rotation = new Rotation(extendedContainerInfo.rotation, extendedContainerInfo.width / 2, extendedContainerInfo.height / 2)
    }
    containerEntity.shape.modifier = CommonUtils.parsePointString(extendedContainerInfo.modifier)
    containerEntity.shape.adapter = CommonUtils.parsePointString(extendedContainerInfo.adapter)
    containerEntity.shape.adapterSize = extendedContainerInfo.adapterSize

    containerEntity.removeAllItems()
    itemInfo.items.forEach((childItemInfo) => {
      let childItem = OperationHelper.loadItem(childItemInfo, editor)
      containerEntity.addItem(childItem)
    })
    return containerEntity
  }

  public static loadCustomContainerEntity(itemInfo: EditorItemInfo, editor: Editor): CustomContainerEntity {
    if (!OperationHelper.initialized) {
      OperationHelper.initializeCustomEntities()
    }
    const extendedContainerInfo = itemInfo as ContainerInfo
    const extendedContainerTypeInfo = OperationHelper.customContainerTypes.get(extendedContainerInfo.type)
    let containerEntity: CustomContainerEntity
    if (extendedContainerTypeInfo) {
      containerEntity = new extendedContainerTypeInfo.type(itemInfo.left, itemInfo.top, itemInfo.width, itemInfo.height, extendedContainerInfo.type, [
        extendedContainerTypeInfo.shapeType,
      ])
    } else {
      containerEntity = new CustomContainerEntity(itemInfo.left, itemInfo.top, itemInfo.width, itemInfo.height, extendedContainerInfo.type)
    }
    containerEntity.id = extendedContainerInfo.id
    if (extendedContainerInfo.rotation) {
      containerEntity.rotation = new Rotation(extendedContainerInfo.rotation, extendedContainerInfo.width / 2, extendedContainerInfo.height / 2)
    }
    containerEntity.shape.modifier = CommonUtils.parsePointString(extendedContainerInfo.modifier)
    containerEntity.shape.adapter = CommonUtils.parsePointString(extendedContainerInfo.adapter)
    containerEntity.shape.adapterSize = extendedContainerInfo.adapterSize

    containerEntity.removeAllItems()
    itemInfo.items.forEach((childItemInfo) => {
      let childItem = OperationHelper.loadItem(childItemInfo, editor)
      containerEntity.addItem(childItem)
    })
    return containerEntity
  }

  public static loadExtensionContainer(itemInfo: EditorItemInfo, editor: Editor): CustomContainerEntity {
    if (!OperationHelper.initialized) {
      OperationHelper.initializeCustomEntities()
    }
    const extensionContainerInfo = itemInfo as ExtensionContainerInfo
    const pluginName = extensionContainerInfo.plugin
    const extensionCategoryName = extensionContainerInfo.extensionCategory
    const extensionName = extensionContainerInfo.type
    const plugin = PluginManager.findPlugin(pluginName)
    const extensionCategory = PluginManager.findExtensionCategory(pluginName, extensionCategoryName)
    const entityExtension = PluginManager.findExtension(pluginName, extensionCategoryName, extensionName)
    const typeInfo = ExtensionUtils.buildTypeInfo(entityExtension!)
    let extensionContainer: ExtensionContainer
    if (plugin && extensionCategory && entityExtension) {
      extensionContainer = new ExtensionContainer(
        itemInfo.left,
        itemInfo.top,
        itemInfo.width,
        itemInfo.height,
        entityExtension,
        extensionCategory,
        plugin,
        { shapeType: extensionName },
        [typeInfo as ShapeType],
      )
    } else {
      extensionContainer = new ExtensionContainer(
        itemInfo.left,
        itemInfo.top,
        itemInfo.width,
        itemInfo.height,
        entityExtension!,
        extensionCategory!,
        plugin!,
        { shapeType: extensionName },
        [typeInfo as ShapeType],
      )
    }
    extensionContainer.id = extensionContainerInfo.id
    if (extensionContainerInfo.rotation) {
      extensionContainer.rotation = new Rotation(extensionContainerInfo.rotation, extensionContainerInfo.width / 2, extensionContainerInfo.height / 2)
    }
    extensionContainer.shape.modifier = CommonUtils.parsePointString(extensionContainerInfo.modifier)
    extensionContainer.shape.adapter = CommonUtils.parsePointString(extensionContainerInfo.adapter)
    extensionContainer.shape.adapterSize = extensionContainerInfo.adapterSize

    extensionContainer.removeAllItems()
    itemInfo.items.forEach((childItemInfo) => {
      let childItem = OperationHelper.loadItem(childItemInfo, editor)
      extensionContainer.addItem(childItem)
    })
    return extensionContainer
  }

  public static loadTableEntity(itemInfo: EditorItemInfo): TableEntity {
    const tableInfo = itemInfo as TableInfo
    const tableEntity = new TableEntity(itemInfo.left, itemInfo.top, itemInfo.width, itemInfo.height, tableInfo.rowCount, tableInfo.columnCount)
    tableEntity.id = tableInfo.id
    if (tableInfo.rotation) {
      tableEntity.rotation = new Rotation(tableInfo.rotation, tableInfo.width / 2, tableInfo.height / 2)
    }
    tableEntity.removeAllItems()
    itemInfo.items.forEach((childItemInfo) => {
      let childItem = OperationHelper.loadTableCellEntity(childItemInfo)
      tableEntity.addItem(childItem)
    })
    return tableEntity
  }

  public static loadCustomTable(itemInfo: EditorItemInfo): CustomTableEntity {
    if (!OperationHelper.initialized) {
      OperationHelper.initializeCustomEntities()
    }
    const customTableInfo = itemInfo as CustomTableInfo
    const customTableTypeInfo = OperationHelper.customTableShapes.get(customTableInfo.type)
    let customTableTypeInfos: CustomTableShapeType[] = []
    let customTableEntity: CustomTableEntity
    if (customTableTypeInfo) {
      customTableTypeInfos.push(customTableTypeInfo)
      customTableEntity = new customTableTypeInfo.type(
        itemInfo.left,
        itemInfo.top,
        itemInfo.width,
        itemInfo.height,
        customTableInfo.customTableTypeName,
        [],
        customTableInfo.rowCount,
        customTableInfo.columnCount,
      )
    } else {
      customTableEntity = new CustomTableEntity(
        itemInfo.left,
        itemInfo.top,
        itemInfo.width,
        itemInfo.height,
        customTableInfo.customTableTypeName,
        [],
        customTableInfo.rowCount,
        customTableInfo.columnCount,
      )
    }
    customTableEntity.id = customTableInfo.id
    if (customTableInfo.rotation) {
      customTableEntity.rotation = new Rotation(customTableInfo.rotation, customTableInfo.width / 2, customTableInfo.height / 2)
    }
    customTableEntity.removeAllItems()
    itemInfo.items.forEach((childItemInfo) => {
      let childItem = OperationHelper.loadTableCellEntity(childItemInfo)
      customTableEntity.addItem(childItem)
    })
    return customTableEntity
  }

  public static loadExtensionTable(itemInfo: EditorItemInfo): CustomTableEntity {
    if (!OperationHelper.initialized) {
      OperationHelper.initializeCustomEntities()
    }
    const extensionTableInfo = itemInfo as ExtensionTableInfo

    const pluginName = extensionTableInfo.plugin
    const extensionCategoryName = extensionTableInfo.extensionCategory
    const extensionName = extensionTableInfo.customTableTypeName
    const plugin = PluginManager.findPlugin(pluginName)
    const extensionCategory = PluginManager.findExtensionCategory(pluginName, extensionCategoryName)
    const entityExtension = PluginManager.findExtension(pluginName, extensionCategoryName, extensionName)
    const typeInfo = ExtensionUtils.buildTypeInfo(entityExtension!)
    let extensionTable: ExtensionTable
    if (plugin && extensionCategory && entityExtension) {
      extensionTable = new ExtensionTable(itemInfo.left, itemInfo.top, itemInfo.width, itemInfo.height, entityExtension, extensionCategory, plugin, [
        typeInfo as CustomTableType,
      ])
    } else {
      extensionTable = new ExtensionTable(itemInfo.left, itemInfo.top, itemInfo.width, itemInfo.height, entityExtension!, extensionCategory!, plugin!, [
        typeInfo as CustomTableType,
      ])
    }
    extensionTable.id = extensionTableInfo.id
    if (extensionTableInfo.rotation) {
      extensionTable.rotation = new Rotation(extensionTableInfo.rotation, extensionTableInfo.width / 2, extensionTableInfo.height / 2)
    }
    extensionTable.removeAllItems()
    itemInfo.items.forEach((childItemInfo) => {
      let childItem = OperationHelper.loadTableCellEntity(childItemInfo)
      extensionTable.addItem(childItem)
    })
    return extensionTable
  }

  public static loadTableCellEntity(itemInfo: EditorItemInfo): CellEntity {
    let shapeInfo = itemInfo as ShapeInfo
    const shapeEntity = new CellEntity(shapeInfo.left, shapeInfo.top, shapeInfo.width, shapeInfo.height, {
      shapeType: shapeInfo.type,
    })
    shapeEntity.type = shapeInfo.type
    shapeEntity.text = shapeInfo.text
    shapeEntity.textAlignment = CommonUtils.parseTextAlignment(shapeInfo.textAlignment)
    shapeEntity.textVerticalAlignment = CommonUtils.parseTextVerticalAligment(shapeInfo.textVerticalAlignment)
    shapeEntity.id = shapeInfo.id
    if (shapeInfo.rotation) {
      shapeEntity.rotation = new Rotation(shapeInfo.rotation, shapeEntity.width / 2, shapeEntity.height / 2)
    }
    shapeEntity.shape.modifier = CommonUtils.parsePointString(shapeInfo.modifier)
    shapeEntity.shape.adapter = CommonUtils.parsePointString(shapeInfo.adapter)
    OperationHelper.fixStyleInfo(shapeInfo)
    shapeEntity.shape.styles = StyleInfo.makeStyles(shapeInfo.styles)
    return shapeEntity
  }

  public static loadExtensionEntity(itemInfo: EditorItemInfo): Entity {
    if (!OperationHelper.initialized) {
      OperationHelper.initializeCustomEntities()
    }
    let extensionEntityInfo = itemInfo as ExtensionEntityInfo
    const pluginName = extensionEntityInfo.plugin
    const extensionCategoryName = extensionEntityInfo.extensionCategory
    const extensionName = extensionEntityInfo.type
    const plugin = PluginManager.findPlugin(pluginName)
    const extensionCategory = PluginManager.findExtensionCategory(pluginName, extensionCategoryName)
    const entityExtension = PluginManager.findExtension(pluginName, extensionCategoryName, extensionName)
    const typeInfo = ExtensionUtils.buildTypeInfo(entityExtension!)
    let shapeEntity: ExtensionEntity
    if (plugin && extensionCategory && entityExtension) {
      shapeEntity = new ExtensionEntity(
        extensionEntityInfo.left,
        extensionEntityInfo.top,
        extensionEntityInfo.width,
        extensionEntityInfo.height,
        entityExtension,
        extensionCategory,
        plugin,
        { shapeType: extensionName },
        [typeInfo as ShapeType],
      )
    } else {
      shapeEntity = new ExtensionEntity(
        extensionEntityInfo.left,
        extensionEntityInfo.top,
        extensionEntityInfo.width,
        extensionEntityInfo.height,
        entityExtension!,
        extensionCategory!,
        plugin!,
        { shapeType: extensionName },
        [typeInfo as ShapeType],
      )
    }
    shapeEntity.type = extensionEntityInfo.type
    shapeEntity.text = extensionEntityInfo.text
    shapeEntity.id = extensionEntityInfo.id
    if (extensionEntityInfo.rotation) {
      shapeEntity.rotation = new Rotation(extensionEntityInfo.rotation, shapeEntity.width / 2, shapeEntity.height / 2)
    }
    shapeEntity.shape.modifier = CommonUtils.parsePointString(extensionEntityInfo.modifier)
    shapeEntity.shape.controller = CommonUtils.parsePointString(extensionEntityInfo.controller)
    shapeEntity.shape.adapter = CommonUtils.parsePointString(extensionEntityInfo.adapter)
    shapeEntity.shape.adapterSize = extensionEntityInfo.adapterSize
    return shapeEntity
  }

  public static saveEditorItems(editorItems: EditorItem[]): EditorItemInfo[] {
    const editorItemInfos: EditorItemInfo[] = []
    editorItems.forEach((editorItem) => {
      const editorItemInfo = OperationHelper.saveEditorItem(editorItem)
      editorItemInfos.push(editorItemInfo)
    })
    return editorItemInfos
  }

  public static saveEditorItem(editorItem: EditorItem): EditorItemInfo {
    let editorItemInfo: EditorItemInfo
    switch (editorItem.category) {
      case Categories.LINE:
        editorItemInfo = this.saveLine(editorItem as LineEntity)
        break
      case Categories.CONNECTOR:
        editorItemInfo = this.saveConnector(editorItem as Connector)
        break
      case Categories.TABLE:
        editorItemInfo = this.saveTable(editorItem as TableEntity)
        break
      case Categories.CONTAINER:
        editorItemInfo = this.saveContainer(editorItem as ContainerEntity)
        break
      case Categories.FRAME:
        editorItemInfo = this.saveFrame(editorItem as FrameEntity)
        break
      case Categories.GROUP:
        editorItemInfo = this.saveGroup(editorItem as GroupEntity)
        break
      case Categories.CUSTOM_SHAPE:
        editorItemInfo = this.saveCustomShape(editorItem as CustomEntity)
        break
      case Categories.CUSTOM_SVG_SHAPE:
        editorItemInfo = this.saveCustomSvgShape(editorItem as SvgContainer)
        break
      case Categories.CUSTOM_IMAGE_SHAPE:
        editorItemInfo = this.saveCustomImageShape(editorItem as ImageContainer)
        break
      case Categories.EXTENDED_CONTAINER:
        editorItemInfo = this.saveExtendedContainer(editorItem as CustomContainerEntity)
        break
      case Categories.EXTENDED_SHAPE:
        editorItemInfo = this.saveExtendedShape(editorItem as ShapeEntity)
        break
      case Categories.CUSTOM_CONNECTOR:
        editorItemInfo = this.saveCustomConnector(editorItem as CustomConnector)
        break
      case Categories.CUSTOM_CONTAINER:
        editorItemInfo = this.saveCustomContainer(editorItem as CustomContainerEntity)
        break
      case Categories.CUSTOM_TABLE:
        editorItemInfo = this.saveCustomTable(editorItem as CustomTableEntity)
        break
      case Categories.EXTENSION_ENTITY:
        editorItemInfo = this.saveExtensionEntity(editorItem as ExtensionEntity)
        break
      case Categories.EXTENSION_CONTAINER:
        editorItemInfo = this.saveExtensionContainer(editorItem as ExtensionContainer)
        break
      case Categories.EXTENSION_TABLE:
        editorItemInfo = this.saveExtensionTable(editorItem as ExtensionTable)
        break
      case Categories.EXTENSION_CONNECTOR:
        editorItemInfo = this.saveExtensionConnector(editorItem as ExtensionConnector)
        break
      case Categories.EXTENSION_IMAGE:
        editorItemInfo = this.saveExtensionImageShape(editorItem as ExtensionImageContainer)
        break
      case Categories.EXTENSION_SVG:
        editorItemInfo = this.saveExtensionSvgContainer(editorItem as ExtensionSvgContainer)
        break
      case Categories.POOL:
        editorItemInfo = this.savePool(editorItem as PoolCustomContainer)
        break
      case Categories.POOL_LABEL:
        editorItemInfo = this.savePoolLabel(editorItem as PoolLabelEntity)
        break
      case Categories.CODE_CONTAINER:
        editorItemInfo = this.saveCodeContainer(editorItem as CodeContainer)
        break
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
    // if (editorItem.useTheme) {
    //   editorItemInfo.strokeColor = null
    //   editorItemInfo.fillColor = null
    //   editorItemInfo.lineWidth = null
    // } else {
    //   editorItemInfo.strokeColor = SystemUtils.generateColorString(editorItem.strokeColor)
    //   editorItemInfo.fillColor = SystemUtils.generateColorString(editorItem.fillColor)
    //   editorItemInfo.lineWidth = editorItem.lineWidth
    // }
    editorItemInfo.strokeColor = CommonUtils.generateColorString(editorItem.strokeColor)
    editorItemInfo.fillColor = CommonUtils.generateColorString(editorItem.fillColor)
    editorItemInfo.lineWidth = editorItem.lineWidth

    editorItemInfo.textAlignment = CommonUtils.generateTextAlignment(editorItem.textAlignment)
    editorItemInfo.textVerticalAlignment = CommonUtils.generateTextVerticalAligment(editorItem.textVerticalAlignment)
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

  public static saveExtensionEntity(extensionEntity: ExtensionEntity): EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(extensionEntity.shape.styles)
    let extensionEntityInfo = new ExtensionEntityInfo(
      extensionEntity.entityExtension.name,
      extensionEntity.category,
      extensionEntity.extensionCategory.name,
      extensionEntity.plugin.name,
      extensionEntity.left,
      extensionEntity.top,
      extensionEntity.width,
      extensionEntity.height,
      extensionEntity.text,
      extensionEntity.rotation.radius,
      styleInfos,
    )
    extensionEntityInfo.rotation = extensionEntity.rotation.radius
    extensionEntityInfo.modifier = extensionEntity.shape.modifier.x + ',' + extensionEntity.shape.modifier.y
    extensionEntityInfo.controller = extensionEntity.shape.controller.x + ',' + extensionEntity.shape.controller.y
    extensionEntityInfo.adapter = extensionEntity.shape.adapter.x + ',' + extensionEntity.shape.adapter.y
    extensionEntityInfo.adapterSize = extensionEntity.shape.adapterSize

    return extensionEntityInfo
  }

  public static saveShape(shapeEntity: ShapeEntity): EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(shapeEntity.shape.styles)
    let shapeinfo = new ShapeInfo(
      shapeEntity.type,
      shapeEntity.category,
      shapeEntity.left,
      shapeEntity.top,
      shapeEntity.width,
      shapeEntity.height,
      shapeEntity.text,
      shapeEntity.rotation.radius,
      styleInfos,
    )
    shapeinfo.rotation = shapeEntity.rotation.radius
    shapeinfo.modifier = shapeEntity.shape.modifier.x + ',' + shapeEntity.shape.modifier.y
    shapeinfo.controller = shapeEntity.shape.controller.x + ',' + shapeEntity.shape.controller.y
    shapeinfo.adapter = shapeEntity.shape.adapter.x + ',' + shapeEntity.shape.adapter.y
    shapeinfo.adapterSize = shapeEntity.shape.adapterSize

    return shapeinfo
  }

  public static saveCustomShape(customEntity: CustomEntity): EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(customEntity.shape.styles)
    let shapeinfo = new ShapeInfo(
      customEntity.type,
      customEntity.category,
      customEntity.left,
      customEntity.top,
      customEntity.width,
      customEntity.height,
      customEntity.text,
      customEntity.rotation.radius,
      styleInfos,
    )
    shapeinfo.rotation = customEntity.rotation.radius
    shapeinfo.modifier = customEntity.shape.modifier.x + ',' + customEntity.shape.modifier.y
    shapeinfo.controller = customEntity.shape.controller.x + ',' + customEntity.shape.controller.y
    shapeinfo.adapter = customEntity.shape.adapter.x + ',' + customEntity.shape.adapter.y
    shapeinfo.adapterSize = customEntity.shape.adapterSize

    return shapeinfo
  }

  public static saveExtendedShape(customEntity: ShapeEntity): EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(customEntity.shape.styles)
    let shapeinfo = new CustomShapeInfo(
      customEntity.type,
      customEntity.category,
      customEntity.left,
      customEntity.top,
      customEntity.width,
      customEntity.height,
      customEntity.text,
      customEntity.rotation.radius,
      styleInfos,
    )
    shapeinfo.rotation = customEntity.rotation.radius
    shapeinfo.modifier = customEntity.shape.modifier.x + ',' + customEntity.shape.modifier.y
    shapeinfo.controller = customEntity.shape.controller.x + ',' + customEntity.shape.controller.y
    shapeinfo.adapter = customEntity.shape.adapter.x + ',' + customEntity.shape.adapter.y
    shapeinfo.adapterSize = customEntity.shape.adapterSize

    return shapeinfo
  }

  public static saveCustomSvgShape(svgContainer: SvgContainer): EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(svgContainer.shape.styles)
    let svgContainerInfo = new SvgContainerInfo(
      svgContainer.type,
      svgContainer.category,
      svgContainer.left,
      svgContainer.top,
      svgContainer.width,
      svgContainer.height,
      svgContainer.text,
      svgContainer.rotation.radius,
      styleInfos,
    )
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

  public static saveExtensionSvgContainer(extensionSvgContainer: ExtensionSvgContainer): EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(extensionSvgContainer.shape.styles)
    let extensionSvgContainerInfo = new ExtensionSvgContainerInfo(
      extensionSvgContainer.entityExtension.name,
      extensionSvgContainer.category,
      extensionSvgContainer.extensionCategory.name,
      extensionSvgContainer.plugin.name,
      extensionSvgContainer.left,
      extensionSvgContainer.top,
      extensionSvgContainer.width,
      extensionSvgContainer.height,
      extensionSvgContainer.text,
      extensionSvgContainer.rotation.radius,
      styleInfos,
    )
    extensionSvgContainerInfo.rotation = extensionSvgContainer.rotation.radius
    extensionSvgContainerInfo.modifier = extensionSvgContainer.shape.modifier.x + ',' + extensionSvgContainer.shape.modifier.y
    extensionSvgContainerInfo.controller = extensionSvgContainer.shape.controller.x + ',' + extensionSvgContainer.shape.controller.y
    extensionSvgContainerInfo.adapter = extensionSvgContainer.shape.adapter.x + ',' + extensionSvgContainer.shape.adapter.y
    extensionSvgContainerInfo.adapterSize = extensionSvgContainer.shape.adapterSize
    extensionSvgContainerInfo.svg = extensionSvgContainer.svg
    extensionSvgContainerInfo.enableFillColor = extensionSvgContainer.enableFillColor
    extensionSvgContainerInfo.enableStrokeColor = extensionSvgContainer.enableStrokeColor

    return extensionSvgContainerInfo
  }

  public static savePool(poolCustomContainer: PoolCustomContainer): EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(poolCustomContainer.shape.styles)
    let poolCustomContainerInfo = new PoolCustomContainerInfo(
      poolCustomContainer.type,
      poolCustomContainer.category,
      poolCustomContainer.left,
      poolCustomContainer.top,
      poolCustomContainer.width,
      poolCustomContainer.height,
      poolCustomContainer.poolCount,
      poolCustomContainer.stageCount,
      poolCustomContainer.horizontal,
      poolCustomContainer.poolTextHorizontal,
      poolCustomContainer.stageTextHorizontal,
      poolCustomContainer.text,
      poolCustomContainer.rotation.radius,
      styleInfos,
    )
    poolCustomContainerInfo.rotation = poolCustomContainer.rotation.radius
    poolCustomContainerInfo.modifier = poolCustomContainer.shape.modifier.x + ',' + poolCustomContainer.shape.modifier.y
    poolCustomContainerInfo.controller = poolCustomContainer.shape.controller.x + ',' + poolCustomContainer.shape.controller.y
    poolCustomContainerInfo.adapter = poolCustomContainer.shape.adapter.x + ',' + poolCustomContainer.shape.adapter.y
    poolCustomContainerInfo.adapterSize = poolCustomContainer.shape.adapterSize

    return poolCustomContainerInfo
  }

  public static savePoolLabel(poolLabelEntity: PoolLabelEntity): EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(poolLabelEntity.shape.styles)
    let poolLabelInfo = new PoolLabelInfo(
      poolLabelEntity.type,
      poolLabelEntity.category,
      poolLabelEntity.left,
      poolLabelEntity.top,
      poolLabelEntity.width,
      poolLabelEntity.height,
      poolLabelEntity.text,
      poolLabelEntity.rotation.radius,
      styleInfos,
    )
    poolLabelInfo.textHorizontal = poolLabelEntity.textHorizontal
    poolLabelInfo.rotation = poolLabelEntity.rotation.radius
    poolLabelInfo.modifier = poolLabelEntity.shape.modifier.x + ',' + poolLabelEntity.shape.modifier.y
    poolLabelInfo.controller = poolLabelEntity.shape.controller.x + ',' + poolLabelEntity.shape.controller.y
    poolLabelInfo.adapter = poolLabelEntity.shape.adapter.x + ',' + poolLabelEntity.shape.adapter.y
    poolLabelInfo.adapterSize = poolLabelEntity.shape.adapterSize

    return poolLabelInfo
  }

  public static saveCodeContainer(codeContainer: CodeContainer): EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(codeContainer.shape.styles)
    let codeContainerInfo = new CodeContainerInfo(
      codeContainer.type,
      codeContainer.category,
      codeContainer.left,
      codeContainer.top,
      codeContainer.width,
      codeContainer.height,
      codeContainer.text,
      codeContainer.rotation.radius,
      styleInfos,
    )
    codeContainerInfo.rotation = codeContainer.rotation.radius
    codeContainerInfo.modifier = codeContainer.shape.modifier.x + ',' + codeContainer.shape.modifier.y
    codeContainerInfo.controller = codeContainer.shape.controller.x + ',' + codeContainer.shape.controller.y
    codeContainerInfo.adapter = codeContainer.shape.adapter.x + ',' + codeContainer.shape.adapter.y
    codeContainerInfo.adapterSize = codeContainer.shape.adapterSize
    codeContainerInfo.codeImage = codeContainer.codeImage
    codeContainerInfo.codeContent = codeContainer.codeContent

    return codeContainerInfo
  }

  public static saveCustomImageShape(imageContainer: ImageContainer): EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(imageContainer.shape.styles)
    let imageContainerInfo = new ImageContainerInfo(
      imageContainer.type,
      imageContainer.category,
      imageContainer.left,
      imageContainer.top,
      imageContainer.width,
      imageContainer.height,
      imageContainer.text,
      imageContainer.rotation.radius,
      styleInfos,
    )
    imageContainerInfo.rotation = imageContainer.rotation.radius
    imageContainerInfo.modifier = imageContainer.shape.modifier.x + ',' + imageContainer.shape.modifier.y
    imageContainerInfo.controller = imageContainer.shape.controller.x + ',' + imageContainer.shape.controller.y
    imageContainerInfo.adapter = imageContainer.shape.adapter.x + ',' + imageContainer.shape.adapter.y
    imageContainerInfo.adapterSize = imageContainer.shape.adapterSize
    imageContainerInfo.image = imageContainer.image

    return imageContainerInfo
  }

  public static saveExtensionImageShape(extensionImageContainer: ExtensionImageContainer): EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(extensionImageContainer.shape.styles)
    let extensionImageContainerInfo = new ExtensionImageContainerInfo(
      extensionImageContainer.entityExtension.name,
      extensionImageContainer.category,
      extensionImageContainer.extensionCategory.name,
      extensionImageContainer.plugin.name,
      extensionImageContainer.left,
      extensionImageContainer.top,
      extensionImageContainer.width,
      extensionImageContainer.height,
      extensionImageContainer.text,
      extensionImageContainer.rotation.radius,
      styleInfos,
    )
    extensionImageContainerInfo.rotation = extensionImageContainer.rotation.radius
    extensionImageContainerInfo.modifier = extensionImageContainer.shape.modifier.x + ',' + extensionImageContainer.shape.modifier.y
    extensionImageContainerInfo.controller = extensionImageContainer.shape.controller.x + ',' + extensionImageContainer.shape.controller.y
    extensionImageContainerInfo.adapter = extensionImageContainer.shape.adapter.x + ',' + extensionImageContainer.shape.adapter.y
    extensionImageContainerInfo.adapterSize = extensionImageContainer.shape.adapterSize
    extensionImageContainerInfo.image = extensionImageContainer.image

    return extensionImageContainerInfo
  }
  public static saveTable(tableEntity: TableEntity): EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(tableEntity.shape.styles)
    let tableInfo = new TableInfo(
      tableEntity.left,
      tableEntity.top,
      tableEntity.width,
      tableEntity.height,
      tableEntity.rowCount,
      tableEntity.columnCount,
      tableEntity.rotation.radius,
      styleInfos,
    )

    return tableInfo
  }

  public static saveCustomTable(customTableEntity: CustomTableEntity): EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(customTableEntity.shape.styles)
    let tableInfo = new CustomTableInfo(
      customTableEntity.left,
      customTableEntity.top,
      customTableEntity.width,
      customTableEntity.height,
      customTableEntity.customTableTypeName,
      customTableEntity.rowCount,
      customTableEntity.columnCount,
      customTableEntity.rotation.radius,
      styleInfos,
    )

    return tableInfo
  }

  public static saveExtensionTable(extensionTable: ExtensionTable): EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(extensionTable.shape.styles)
    let extensionTableInfo = new ExtensionTableInfo(
      extensionTable.left,
      extensionTable.top,
      extensionTable.width,
      extensionTable.height,
      extensionTable.entityExtension.name,
      extensionTable.extensionCategory.name,
      extensionTable.plugin.name,
      extensionTable.rowCount,
      extensionTable.columnCount,
      extensionTable.rotation.radius,
      styleInfos,
    )

    return extensionTableInfo
  }

  public static saveContainer(container: ContainerEntity): EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(container.shape.styles)
    let containerInfo = new ContainerInfo(
      container.type,
      container.category,
      container.left,
      container.top,
      container.width,
      container.height,
      container.text,
      container.rotation.radius,
      styleInfos,
    )
    containerInfo.rotation = container.rotation.radius
    containerInfo.modifier = container.shape.modifier.x + ',' + container.shape.modifier.y
    containerInfo.adapter = container.shape.adapter.x + ',' + container.shape.adapter.y
    containerInfo.adapterSize = container.shape.adapterSize

    return containerInfo
  }

  public static saveCustomContainer(container: CustomContainerEntity): EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(container.shape.styles)
    let containerInfo = new ContainerInfo(
      container.type,
      container.category,
      container.left,
      container.top,
      container.width,
      container.height,
      container.text,
      container.rotation.radius,
      styleInfos,
    )
    containerInfo.rotation = container.rotation.radius
    containerInfo.modifier = container.shape.modifier.x + ',' + container.shape.modifier.y
    containerInfo.adapter = container.shape.adapter.x + ',' + container.shape.adapter.y
    containerInfo.adapterSize = container.shape.adapterSize

    return containerInfo
  }

  public static saveExtensionContainer(extensionContainer: ExtensionContainer): EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(extensionContainer.shape.styles)
    let containerInfo = new ExtensionContainerInfo(
      extensionContainer.entityExtension.name,
      extensionContainer.category,
      extensionContainer.extensionCategory.name,
      extensionContainer.plugin.name,
      extensionContainer.left,
      extensionContainer.top,
      extensionContainer.width,
      extensionContainer.height,
      extensionContainer.text,
      extensionContainer.rotation.radius,
      styleInfos,
    )
    containerInfo.rotation = extensionContainer.rotation.radius
    containerInfo.modifier = extensionContainer.shape.modifier.x + ',' + extensionContainer.shape.modifier.y
    containerInfo.adapter = extensionContainer.shape.adapter.x + ',' + extensionContainer.shape.adapter.y
    containerInfo.adapterSize = extensionContainer.shape.adapterSize

    return containerInfo
  }

  public static saveExtendedContainer(customContainer: CustomContainerEntity): EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(customContainer.shape.styles)
    let containerInfo = new ContainerInfo(
      customContainer.type,
      customContainer.category,
      customContainer.left,
      customContainer.top,
      customContainer.width,
      customContainer.height,
      customContainer.text,
      customContainer.rotation.radius,
      styleInfos,
    )
    containerInfo.rotation = customContainer.rotation.radius
    containerInfo.modifier = customContainer.shape.modifier.x + ',' + customContainer.shape.modifier.y
    containerInfo.adapter = customContainer.shape.adapter.x + ',' + customContainer.shape.adapter.y
    containerInfo.adapterSize = customContainer.shape.adapterSize

    return containerInfo
  }

  public static saveFrame(frame: FrameEntity): EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(frame.shape.styles)
    let frameEntityInfo = new FrameEntityInfo(
      frame.type,
      frame.category,
      frame.left,
      frame.top,
      frame.width,
      frame.height,
      frame.text,
      frame.rotation.radius,
      styleInfos,
    )
    frameEntityInfo.rotation = frame.rotation.radius
    frameEntityInfo.modifier = frame.shape.modifier.x + ',' + frame.shape.modifier.y
    frameEntityInfo.adapter = frame.shape.adapter.x + ',' + frame.shape.adapter.y
    frameEntityInfo.adapterSize = frame.shape.adapterSize

    return frameEntityInfo
  }

  public static saveGroup(container: GroupEntity): EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(container.shape.styles)
    let containerInfo = new ContainerInfo(
      container.type,
      container.category,
      container.left,
      container.top,
      container.width,
      container.height,
      container.text,
      container.rotation.radius,
      styleInfos,
    )
    containerInfo.rotation = container.rotation.radius
    containerInfo.modifier = container.shape.modifier.x + ',' + container.shape.modifier.y
    containerInfo.adapter = container.shape.adapter.x + ',' + container.shape.adapter.y
    containerInfo.adapterSize = container.shape.adapterSize

    return containerInfo
  }

  public static saveLine(lineEntity: LineEntity): EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(lineEntity.shape.styles)
    let lineData = new LineInfo(
      lineEntity.start.x,
      lineEntity.start.y,
      lineEntity.end.x,
      lineEntity.end.y,
      lineEntity.text,
      lineEntity.rotation.radius,
      styleInfos,
    )

    return lineData
  }

  public static saveConnector(connector: Connector): EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(connector.shape.styles)
    let connectorInfo = new ConnectorInfo(
      connector.start.x,
      connector.start.y,
      connector.end.x,
      connector.end.y,
      connector.text,
      connector.rotation.radius,
      styleInfos,
    )
    if (connector.source) {
      connectorInfo.source = connector.source.id
    }
    if (connector.target) {
      connectorInfo.target = connector.target.id
    }
    if (connector.sourceJoint) {
      connectorInfo.sourceJoint = CommonUtils.generatePointString(connector.sourceJoint)
    }
    if (connector.targetJoint) {
      connectorInfo.targetJoint = CommonUtils.generatePointString(connector.targetJoint)
    }

    connectorInfo.text = connector.text
    connectorInfo.connectorType = connector.connectorType ? CommonUtils.generateConnectorType(connector.connectorType) : null
    connectorInfo.startArrow = CommonUtils.generateConnectorArrow(connector.startArrow)
    connectorInfo.endArrow = CommonUtils.generateConnectorArrow(connector.endArrow)
    connectorInfo.curveStartModifier = CommonUtils.generatePointString(connector.curveStartModifier)
    connectorInfo.curveEndModifier = CommonUtils.generatePointString(connector.curveEndModifier)
    connectorInfo.startDirection = CommonUtils.generateConnectorDirection(connector.startDirection)
    connectorInfo.endDirection = CommonUtils.generateConnectorDirection(connector.endDirection)
    connectorInfo.orthogonalPoints = CommonUtils.generatePointsString(connector.orthogonalPoints)
    connectorInfo.connectorMode = CommonUtils.generateConnectorMode(connector.connectorMode)
    connectorInfo.connectorDoubleLineGap = connector.connectorDoubleLineGap
    connectorInfo.connectorDoubleLineArrowLength = connector.connectorDoubleLineArrowLength
    connectorInfo.connectorDoubleLineArrowDistance = connector.connectorDoubleLineArrowDistance

    return connectorInfo
  }

  public static saveCustomConnector(customConnector: CustomConnector): EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(customConnector.shape.styles)
    let connectorInfo = new CustomConnectorInfo(
      customConnector.connectorTypeInfo.name,
      customConnector.start.x,
      customConnector.start.y,
      customConnector.end.x,
      customConnector.end.y,
      customConnector.text,
      customConnector.rotation.radius,
      styleInfos,
    )
    if (customConnector.source) {
      connectorInfo.source = customConnector.source.id
    }
    if (customConnector.target) {
      connectorInfo.target = customConnector.target.id
    }
    if (customConnector.sourceJoint) {
      connectorInfo.sourceJoint = CommonUtils.generatePointString(customConnector.sourceJoint)
    }
    if (customConnector.targetJoint) {
      connectorInfo.targetJoint = CommonUtils.generatePointString(customConnector.targetJoint)
    }

    connectorInfo.text = customConnector.text
    connectorInfo.connectorType = customConnector.connectorType ? CommonUtils.generateConnectorType(customConnector.connectorType) : null
    connectorInfo.startArrow = CommonUtils.generateConnectorArrow(customConnector.startArrow)
    connectorInfo.endArrow = CommonUtils.generateConnectorArrow(customConnector.endArrow)
    connectorInfo.curveStartModifier = CommonUtils.generatePointString(customConnector.curveStartModifier)
    connectorInfo.curveEndModifier = CommonUtils.generatePointString(customConnector.curveEndModifier)
    connectorInfo.startDirection = CommonUtils.generateConnectorDirection(customConnector.startDirection)
    connectorInfo.endDirection = CommonUtils.generateConnectorDirection(customConnector.endDirection)
    connectorInfo.orthogonalPoints = CommonUtils.generatePointsString(customConnector.orthogonalPoints)
    connectorInfo.connectorMode = CommonUtils.generateConnectorMode(customConnector.connectorMode)
    connectorInfo.connectorDoubleLineGap = customConnector.connectorDoubleLineGap
    connectorInfo.connectorDoubleLineArrowLength = customConnector.connectorDoubleLineArrowLength
    connectorInfo.connectorDoubleLineArrowDistance = customConnector.connectorDoubleLineArrowDistance

    return connectorInfo
  }

  public static saveExtensionConnector(extensionConnector: ExtensionConnector): EditorItemInfo {
    let styleInfos: StyleInfo[] = Style.makeStyleInfos(extensionConnector.shape.styles)
    let connectorInfo = new ExtensionConnectorInfo(
      extensionConnector.connectorTypeInfo.name,
      extensionConnector.category,
      extensionConnector.extensionCategory.name,
      extensionConnector.plugin.name,
      extensionConnector.start.x,
      extensionConnector.start.y,
      extensionConnector.end.x,
      extensionConnector.end.y,
      extensionConnector.text,
      extensionConnector.rotation.radius,
      styleInfos,
    )
    if (extensionConnector.source) {
      connectorInfo.source = extensionConnector.source.id
    }
    if (extensionConnector.target) {
      connectorInfo.target = extensionConnector.target.id
    }
    if (extensionConnector.sourceJoint) {
      connectorInfo.sourceJoint = CommonUtils.generatePointString(extensionConnector.sourceJoint)
    }
    if (extensionConnector.targetJoint) {
      connectorInfo.targetJoint = CommonUtils.generatePointString(extensionConnector.targetJoint)
    }

    connectorInfo.text = extensionConnector.text
    connectorInfo.connectorType = extensionConnector.connectorType ? CommonUtils.generateConnectorType(extensionConnector.connectorType) : null
    connectorInfo.startArrow = CommonUtils.generateConnectorArrow(extensionConnector.startArrow)
    connectorInfo.endArrow = CommonUtils.generateConnectorArrow(extensionConnector.endArrow)
    connectorInfo.curveStartModifier = CommonUtils.generatePointString(extensionConnector.curveStartModifier)
    connectorInfo.curveEndModifier = CommonUtils.generatePointString(extensionConnector.curveEndModifier)
    connectorInfo.startDirection = CommonUtils.generateConnectorDirection(extensionConnector.startDirection)
    connectorInfo.endDirection = CommonUtils.generateConnectorDirection(extensionConnector.endDirection)
    connectorInfo.orthogonalPoints = CommonUtils.generatePointsString(extensionConnector.orthogonalPoints)
    connectorInfo.connectorMode = CommonUtils.generateConnectorMode(extensionConnector.connectorMode)
    connectorInfo.connectorDoubleLineGap = extensionConnector.connectorDoubleLineGap
    connectorInfo.connectorDoubleLineArrowLength = extensionConnector.connectorDoubleLineArrowLength
    connectorInfo.connectorDoubleLineArrowDistance = extensionConnector.connectorDoubleLineArrowDistance

    return connectorInfo
  }

  private static fixStyleInfo(editorItemInfo: EditorItemInfo) {
    let count = editorItemInfo.styles.length
    for (let i = 0; i < count; i++) {
      let oldStyleInfo = editorItemInfo.styles[i]
      editorItemInfo.styles[i] = new StyleInfo(
        oldStyleInfo.length,
        oldStyleInfo.typeFaceName,
        oldStyleInfo.size,
        oldStyleInfo.color,
        oldStyleInfo.bold,
        oldStyleInfo.italic,
        oldStyleInfo.underline,
      )
    }
    editorItemInfo.items.forEach((child) => {
      OperationHelper.fixStyleInfo(child)
    })
  }
}
