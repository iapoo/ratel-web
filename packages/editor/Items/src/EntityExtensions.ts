import { Point2, Rectangle } from '@ratel-web/engine'
import { CustomContainerShape, EntityExtension, EntityRenderContext, EntityShapeType, ExtensionShape, FrameShape } from '../../Shapes'
import { CustomConnector, CustomConnectorTypeInfo } from './CustomConnector'
import { CustomContainerEntity } from './CustomContainerEntity'
import { CustomEntities, CustomEntityTypes } from './CustomEntity'
import { CustomTableEntity, CustomTableType } from './CustomTableEntity'
import { FrameEntity } from './FrameEntity'
import { Categories, Type } from './Item'
import { ShapeEntity, ShapeOptions, ShapeType } from './ShapeEntity'

export interface Plugin {
  name: string
  description: string
  author: string
  homepage: string
  email: string
  extensions: EntityExtension[]
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
      const items = entityExtension.setup(entityExtension.config)
      if (items && items.length > 0) {
        items.forEach((item) => {
          this.addItem(item)
        })
      }
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
    let shapeType = EntityShapeType.CustomShape
    return shapeType
  }
}

export class ExtendedConnector extends CustomConnector {
  private _entityExtension: EntityExtension
  public constructor(start: Point2, end: Point2, entityExtension: EntityExtension, connectorTypeInfos: CustomConnectorTypeInfo[]) {
    super(start, end, entityExtension.name, connectorTypeInfos)
    this._entityExtension = entityExtension
    if (entityExtension.setup) {
      const items = entityExtension.setup(entityExtension.config)
      if (items && items.length > 0) {
        items.forEach((item) => {
          this.addItem(item)
        })
      }
    }
  }
}

export class ExtendedTable extends CustomTableEntity {
  public constructor(left: number, top: number, width: number, height: number, customTableType: string, customTableTypeInfos: CustomTableType[]) {
    super(left, top, width, height, customTableType, customTableTypeInfos, 1, 1)
    this.buildShape()
  }

  public buildShape() {
    for (let i = 0; i < this.customTableeType.rowCount - 1; i++) {
      this.insertRowAfter(this.rowCount - 1, false)
    }
    for (let i = 0; i < this.customTableeType.columnCount - 1; i++) {
      this.insertColumnAfter(this.columnCount - 1, false)
    }
    //this.boundary =  Rectangle.makeLTWH(0, 0, this.width, this.height)
    this.refreshGrid()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.Table
    return shapeType
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
  public constructor(left: number, top: number, width: number, height: number, typeName: string, shapeTypes: ShapeType[]) {
    super(left, top, width, height, typeName, shapeTypes)
    const customTypeInfo = this.parseTypeInfo({ shapeType: typeName })
    this._shape = new CustomContainerShape(left, top, width, height, this.buildShape, customTypeInfo)
    this.initializeTheme()
    this.initializeShape()
  }

  public get types(): Type[] {
    return []
  }

  private initializeShape() {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public buildShape(theThis: CustomContainerShape) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.CustomContainer
    return shapeType
  }
}

export class ExtendedFrame extends FrameEntity {
  private _label: ShapeEntity

  public constructor(left: number, top: number, width: number, height: number, shapeOptions: ShapeOptions, frameShapeTypes: ShapeType[]) {
    super(left, top, width, height, shapeOptions, frameShapeTypes)
    const frameTypeInfo = this.parseTypeInfo({ shapeType: shapeOptions.shapeType })
    this._shape = new FrameShape(left, top, width, height, this, this.buildShape, frameTypeInfo)
    this._label = new ShapeEntity(0, 0, 120, 30)
    this.initializeTheme()
    this.initializeShape()
  }

  // public get types(): Type[] {
  //   return this._frameShapeTypes
  // }

  private initializeShape() {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public buildShape(theThis: FrameShape, entity: any) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.Frame
    return shapeType
  }
}
