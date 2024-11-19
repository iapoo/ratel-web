import { Point2, Rectangle } from '@ratel-web/engine'
import { ConnectorConfig, EntityExtension, EntityRenderContext, EntityShapeType, ExtensionShape, ShapeConfig, TableConfig } from '../../Shapes'
import { CommonUtils } from '../../Utils'
import { CustomConnector, CustomConnectorTypeInfo } from './CustomConnector'
import { CustomContainerEntity } from './CustomContainerEntity'
import { CustomEntities, CustomEntityTypes } from './CustomEntity'
import { CustomTableEntity, CustomTableType } from './CustomTableEntity'
import { ImageContainer } from './ImageContainer'
import { Categories, Type } from './Item'
import { ShapeEntity, ShapeOptions, ShapeType } from './ShapeEntity'
import { SvgContainer } from './SvgContainer'

export interface ExtensionCategory {
  name: string
  description: string
  extensions: EntityExtension[]
}

export interface Plugin {
  name: string
  description: string
  author: string
  homepage: string
  email: string
  categories: ExtensionCategory[]
}

export class ExtensionEntity extends ShapeEntity {
  private readonly _entityExtension: EntityExtension
  private readonly _plugin: Plugin
  private readonly _extensionCategory: ExtensionCategory
  public constructor(
    left: number,
    top: number,
    width: number,
    height: number,
    entityExtension: EntityExtension,
    extensionCategory: ExtensionCategory,
    plugin: Plugin,
    shapeOptions: ShapeOptions = { shapeType: CustomEntities.TYPE_CUSTOM_SHAPE },
    shapeTypes: ShapeType[] = CustomEntityTypes,
  ) {
    super(left, top, width, height, shapeOptions, shapeTypes)
    this._entityExtension = entityExtension
    this._extensionCategory = extensionCategory
    this._plugin = plugin
    const customTypeInfo = this.parseTypeInfo(shapeOptions)
    this._shape = new ExtensionShape(left, top, width, height, this._entityExtension, this.buildShape, customTypeInfo)
    if (entityExtension.setup) {
      entityExtension.setup(this, entityExtension.config)
    }
  }

  public get extensionCategory(): ExtensionCategory {
    return this._extensionCategory
  }

  public get entityExtension(): EntityExtension {
    return this._entityExtension
  }

  public get plugin(): Plugin {
    return this._plugin
  }

  public get types(): Type[] {
    return CustomEntityTypes
  }

  public get category(): string {
    return Categories.EXTENSION_ENTITY
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public buildShape(renderContext: EntityRenderContext, extensionShape: ExtensionShape, entityExtension: EntityExtension) {
    renderContext.prepareRender()
    renderContext.path.reset()
    renderContext.secondPath.reset()
    renderContext.thirdPath.reset()
    renderContext.fourthPath.reset()
    if (entityExtension.render) {
      entityExtension.render(renderContext, entityExtension.config)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected parseEntityShapeType(type: string): EntityShapeType {
    return EntityShapeType.CustomShape
  }
}

export class ExtensionConnector extends CustomConnector {
  private readonly _entityExtension: EntityExtension
  private readonly _plugin: Plugin
  private readonly _extensionCategory: ExtensionCategory
  public constructor(
    start: Point2,
    end: Point2,
    entityExtension: EntityExtension,
    extensionCategory: ExtensionCategory,
    plugin: Plugin,
    connectorTypeInfos: CustomConnectorTypeInfo[],
  ) {
    super(start, end, entityExtension.name, connectorTypeInfos)
    this._entityExtension = entityExtension
    this._extensionCategory = extensionCategory
    this._plugin = plugin
    if (entityExtension.setup) {
      entityExtension.setup(this, entityExtension.config)
    }
  }
  public get extensionCategory(): ExtensionCategory {
    return this._extensionCategory
  }

  public get entityExtension(): EntityExtension {
    return this._entityExtension
  }

  public get plugin(): Plugin {
    return this._plugin
  }

  public get category(): string {
    return Categories.EXTENSION_CONNECTOR
  }
}

export class ExtensionTable extends CustomTableEntity {
  private _entityExtension: EntityExtension
  private readonly _plugin: Plugin
  private readonly _extensionCategory: ExtensionCategory

  public constructor(
    left: number,
    top: number,
    width: number,
    height: number,
    entityExtension: EntityExtension,
    extensionCategory: ExtensionCategory,
    plugin: Plugin,
    customTableTypeInfos: CustomTableType[],
  ) {
    super(left, top, width, height, entityExtension.name, customTableTypeInfos, 1, 1)
    this._entityExtension = entityExtension
    this._extensionCategory = extensionCategory
    this._plugin = plugin
    this.buildTable()
    if (entityExtension.setup) {
      entityExtension.setup(this, entityExtension.config)
    }
  }

  public get extensionCategory(): ExtensionCategory {
    return this._extensionCategory
  }

  public get entityExtension(): EntityExtension {
    return this._entityExtension
  }

  public get plugin(): Plugin {
    return this._plugin
  }

  public get category(): string {
    return Categories.EXTENSION_TABLE
  }

  public buildTable() {
    for (let i = 0; i < this.customTableeType.rowCount - 1; i++) {
      this.insertRowAfter(this.rowCount - 1, false)
    }
    for (let i = 0; i < this.customTableeType.columnCount - 1; i++) {
      this.insertColumnAfter(this.columnCount - 1, false)
    }
    this.refreshGrid()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected parseEntityShapeType(type: string): EntityShapeType {
    return EntityShapeType.Table
  }

  private refreshGrid() {
    const cellWidth =
      this.customTableeType.fixedFirstColumn && this.customTableeType.columnCount > 1
        ? (this.width - this.customTableeType.firstColumnWidth) / (this.customTableeType.columnCount - 1)
        : this.width / this.customTableeType.columnCount
    const cellHeight =
      this.customTableeType.fixedFirstRow && this.customTableeType.rowCount > 1
        ? (this.height - this.customTableeType.firstRowHeight) / (this.customTableeType.rowCount - 1)
        : this.height / this.customTableeType.rowCount
    const firstRowHeight = this.customTableeType.fixedFirstRow ? this.customTableeType.firstRowHeight : cellHeight
    const firstColumnWidth = this.customTableeType.fixedFirstColumn ? this.customTableeType.firstColumnWidth : cellWidth
    let cellTop = 0
    for (let rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
      let cellLeft = 0
      for (let columnIndex = 0; columnIndex < this.columnCount; columnIndex++) {
        const cell = this.items[this.columnCount * rowIndex + columnIndex]
        const theCellWidth = columnIndex === 0 ? firstColumnWidth : cellWidth
        const theCellHeight = rowIndex === 0 ? firstRowHeight : cellHeight
        cell.boundary = Rectangle.makeLTWH(Math.round(cellLeft), Math.round(cellTop), Math.round(theCellWidth), Math.round(theCellHeight))
        cellLeft += theCellWidth
      }
      cellTop += rowIndex === 0 ? firstRowHeight : cellHeight
    }
  }
}

export class ExtensionContainer extends CustomContainerEntity {
  private readonly _entityExtension: EntityExtension
  private readonly _plugin: Plugin
  private readonly _extensionCategory: ExtensionCategory
  public constructor(
    left: number,
    top: number,
    width: number,
    height: number,
    entityExtension: EntityExtension,
    extensionCategory: ExtensionCategory,
    plugin: Plugin,
    shapeOptions: ShapeOptions,
    shapeTypes: ShapeType[],
  ) {
    super(left, top, width, height, entityExtension.name, shapeTypes)
    this._entityExtension = entityExtension
    this._extensionCategory = extensionCategory
    this._plugin = plugin
    const customTypeInfo = this.parseTypeInfo({ shapeType: entityExtension.name })
    this._shape = new ExtensionShape(left, top, width, height, this._entityExtension, this.buildContainer, customTypeInfo)
    if (entityExtension.setup) {
      entityExtension.setup(this, entityExtension.config)
    }
    this.initializeTheme()
    this.initializeShape()
  }

  public get extensionCategory(): ExtensionCategory {
    return this._extensionCategory
  }

  public get entityExtension(): EntityExtension {
    return this._entityExtension
  }

  public get plugin(): Plugin {
    return this._plugin
  }

  public get category(): string {
    return Categories.EXTENSION_CONTAINER
  }

  private initializeShape() {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public buildContainer(renderContext: EntityRenderContext, extensionShape: ExtensionShape, entityExtension: EntityExtension) {
    renderContext.prepareRender()
    renderContext.path.reset()
    renderContext.secondPath.reset()
    renderContext.thirdPath.reset()
    renderContext.fourthPath.reset()
    if (entityExtension.render) {
      entityExtension.render(renderContext, entityExtension.config)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected parseEntityShapeType(type: string): EntityShapeType {
    return EntityShapeType.CustomContainer
  }
}

export class ExtensionImageContainer extends ImageContainer {
  private readonly _entityExtension: EntityExtension
  private readonly _plugin: Plugin
  private readonly _extensionCategory: ExtensionCategory
  public constructor(
    left: number,
    top: number,
    width: number,
    height: number,
    entityExtension: EntityExtension,
    extensionCategory: ExtensionCategory,
    plugin: Plugin,
  ) {
    super(left, top, width, height, entityExtension.icon)
    this._entityExtension = entityExtension
    this._extensionCategory = extensionCategory
    this._plugin = plugin
  }

  public get extensionCategory(): ExtensionCategory {
    return this._extensionCategory
  }

  public get entityExtension(): EntityExtension {
    return this._entityExtension
  }

  public get plugin(): Plugin {
    return this._plugin
  }

  public get category(): string {
    return Categories.EXTENSION_IMAGE
  }
}

export class ExtensionSvgContainer extends SvgContainer {
  private readonly _entityExtension: EntityExtension
  private readonly _plugin: Plugin
  private readonly _extensionCategory: ExtensionCategory
  public constructor(
    left: number,
    top: number,
    width: number,
    height: number,
    entityExtension: EntityExtension,
    extensionCategory: ExtensionCategory,
    plugin: Plugin,
  ) {
    super(left, top, width, height, entityExtension.icon)
    this._entityExtension = entityExtension
    this._extensionCategory = extensionCategory
    this._plugin = plugin
    this.enableFillColor = false
    this.enableStrokeColor = false
  }

  public get extensionCategory(): ExtensionCategory {
    return this._extensionCategory
  }

  public get entityExtension(): EntityExtension {
    return this._entityExtension
  }

  public get plugin(): Plugin {
    return this._plugin
  }

  public get category(): string {
    return Categories.EXTENSION_SVG
  }
}

export class ExtensionUtils {
  public static buildTypeInfo(entityExtension: EntityExtension): ShapeType | CustomConnectorTypeInfo | CustomTableType | null {
    if (entityExtension.type === 'shape' || entityExtension.type === 'container') {
      const shapeConfig = entityExtension.config as ShapeConfig
      return {
        name: entityExtension.name,
        description: entityExtension.description,
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
    } else if (entityExtension.type === 'table') {
      const tableConfig = entityExtension.config as TableConfig
      return {
        name: entityExtension.name,
        description: entityExtension.description,
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
    } else if (entityExtension.type === 'connector') {
      const connectorConfig = entityExtension.config as ConnectorConfig
      return {
        name: entityExtension.name,
        description: entityExtension.description,
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
