import { Point2, Rectangle } from '@ratel-web/engine'
import { EntityExtension, EntityRenderContext, EntityShapeType, ExtensionShape } from '../../Shapes'
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

export class ExtendedEntity extends ShapeEntity {
  private _entityExtension: EntityExtension
  public constructor(
    left: number,
    top: number,
    width: number,
    height: number,
    entityExtension: EntityExtension,
    shapeOptions: ShapeOptions = { shapeType: CustomEntities.TYPE_CUSTOM_SHAPE },
    shapeTypes: ShapeType[] = CustomEntityTypes,
  ) {
    super(left, top, width, height, shapeOptions, shapeTypes)
    this._entityExtension = entityExtension
    const customTypeInfo = this.parseTypeInfo(shapeOptions)
    this._shape = new ExtensionShape(left, top, width, height, this._entityExtension, this.buildShape, customTypeInfo)
    if (entityExtension.setup) {
      entityExtension.setup(this, entityExtension.config)
    }
  }

  public get types(): Type[] {
    return CustomEntityTypes
  }

  public get category(): string {
    return Categories.CUSTOM_SHAPE
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

export class ExtendedConnector extends CustomConnector {
  private _entityExtension: EntityExtension
  public constructor(start: Point2, end: Point2, entityExtension: EntityExtension, connectorTypeInfos: CustomConnectorTypeInfo[]) {
    super(start, end, entityExtension.name, connectorTypeInfos)
    this._entityExtension = entityExtension
    if (entityExtension.setup) {
      entityExtension.setup(this, entityExtension.config)
    }
  }
}

export class ExtendedTable extends CustomTableEntity {
  private _entityExtension: EntityExtension

  public constructor(left: number, top: number, width: number, height: number, entityExtension: EntityExtension, customTableTypeInfos: CustomTableType[]) {
    super(left, top, width, height, entityExtension.name, customTableTypeInfos, 1, 1)
    this._entityExtension = entityExtension
    this.buildTable()
    if (entityExtension.setup) {
      entityExtension.setup(this, entityExtension.config)
    }
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

export class ExtendedContainer extends CustomContainerEntity {
  private readonly _entityExtension: EntityExtension
  public constructor(
    left: number,
    top: number,
    width: number,
    height: number,
    entityExtension: EntityExtension,
    shapeOptions: ShapeOptions,
    shapeTypes: ShapeType[],
  ) {
    super(left, top, width, height, entityExtension.name, shapeTypes)
    this._entityExtension = entityExtension
    const customTypeInfo = this.parseTypeInfo({ shapeType: entityExtension.name })
    this._shape = new ExtensionShape(left, top, width, height, this._entityExtension, this.buildContainer, customTypeInfo)
    if (entityExtension.setup) {
      entityExtension.setup(this, entityExtension.config)
    }
    this.initializeTheme()
    this.initializeShape()
  }

  public get types(): Type[] {
    return []
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

export class ExtendedImageContainer extends ImageContainer {
  private readonly _entityExtension: EntityExtension
  public constructor(left: number, top: number, width: number, height: number, entityExtension: EntityExtension) {
    super(left, top, width, height, entityExtension.icon)
    this._entityExtension = entityExtension
  }

  public get entityExtension() {
    return this._entityExtension
  }
}

export class ExtendedSvgContainer extends SvgContainer {
  private readonly _entityExtension: EntityExtension
  public constructor(left: number, top: number, width: number, height: number, entityExtension: EntityExtension) {
    super(left, top, width, height, entityExtension.icon)
    this._entityExtension = entityExtension
  }

  public get entityExtension() {
    return this._entityExtension
  }
}
