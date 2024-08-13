/* eslint-disable max-params */
import { Colors, Paint, Rectangle, } from '@/components/Engine'
import { ContainerEntity, } from './ContainerEntity'
import { Categories, Item, Type, } from './Item'
import { ShapeEntity, } from './ShapeEntity'
import { EditorItem } from './EditorItem'
import { EditorItemInfo } from './EditorItemInfo'
import { Editor } from '../../Editor'
import { TableInfo } from './TableInfo'
import { CellEntity } from './CellEntity'
import { EntityShapeType } from '../../Shapes/src/EntityShape'


export class Tables {
  public static TYPE_TABLE = 'Table'

  public static DESC_TABLE = 'Table'

  public static FREEZE_NONE = 'None'
  public static FREEZE_WIDTH = 'Width'
  public static FREEZE_WIDTH_HEIGHT = 'WidthHeight'
  public static FREEZE_HEIGHT = 'Height'
  public static FREEZE_ASPECT_RATIO = 'AspectRatio'

  public static ADAPTER_DIRECTION_X = 'X'
  public static ADAPTER_DIRECTION_Y = 'Y'

}

export const TableTypes = [
  {
    name: Tables.TYPE_TABLE, description: Tables.DESC_TABLE, freeze: Tables.FREEZE_NONE, text: '', left: 0, top: 0, width: 240, height: 120, enableMask: true,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
]

export class TableEntity extends ContainerEntity {
  public static TABLE_TYPE_TABLE = 'Table'
  public static TABLE_DESC_TABLE = 'Table'
  private _rowCount: number
  private _columnCount: number

  public constructor(left: number, top: number, width: number, height: number, rowCount = 3, columnCount = 3) {
    super(left, top, width, height, { shapeType: TableEntity.TABLE_TYPE_TABLE, }, TableTypes)
    this._rowCount = rowCount
    this._columnCount = columnCount
    this.type = TableEntity.TABLE_TYPE_TABLE
    this.refreshTable()
  }

  public get isContainer(): boolean {
    return true
  }

  public get customizable() {
    return true
  }

  public get rowCount() {
    return this._rowCount
  }

  public get columnCount() {
    return this._columnCount
  }

  public get boundary(): Rectangle {
    return super.boundary
  }

  public set boundary(value: Rectangle) {
    const oldWidth = this.width
    const oldHeight = this.height
    super.boundary = value
    // this.updateTableBoundary(oldWidth, oldHeight)
  }

  public getAllTypes(): Type[] {
    return [{ name: TableEntity.TABLE_TYPE_TABLE, description: TableEntity.TABLE_DESC_TABLE, },]
  }

  public get category(): string {
    return Categories.TABLE
  }

  public insertRowBefore(rowIndex: number, refreshBoundary: boolean) {
    if (rowIndex >= 0 && rowIndex < this._rowCount) {
      for (let i = 0; i < this._columnCount; i++) {
        const beforeCell = this.items[rowIndex * this._columnCount + i * 2]
        const cell = new CellEntity(beforeCell.left, beforeCell.top, beforeCell.width, beforeCell.height)
        this.addItemAt(cell, rowIndex * this._columnCount + i)
      }
      for (let j = rowIndex + 1; j < this._rowCount + 1; j++) {
        for (let i = 0; i < this._columnCount; i++) {
          const beforeCell = this.items[rowIndex * this._columnCount + i]
          const cell = this.items[j * this._columnCount + i]
          cell.boundary = Rectangle.makeLTWH(cell.left, cell.top + beforeCell.height, cell.width, cell.height)
        }
      }
      this._rowCount++
      if (refreshBoundary) {
        this.boundary = Rectangle.makeLTWH(this.left, this.top, this.width, this.height + this.items[rowIndex * this.columnCount].height)
      }
    }
  }


  public insertRowAfter(rowIndex: number, refreshBoundary: boolean) {
    if (rowIndex >= 0 && rowIndex < this._rowCount) {
      for (let i = 0; i < this._columnCount; i++) {
        const beforeCell = this.items[rowIndex * this._columnCount + i]
        const cell = new CellEntity(beforeCell.left, beforeCell.top, beforeCell.width, beforeCell.height)
        this.addItemAt(cell, (rowIndex + 1) * this._columnCount + i)
      }
      for (let j = rowIndex + 1; j < this._rowCount + 1; j++) {
        for (let i = 0; i < this._columnCount; i++) {
          const beforeCell = this.items[rowIndex * this._columnCount + i]
          const cell = this.items[j * this._columnCount + i]
          cell.boundary = Rectangle.makeLTWH(cell.left, cell.top + beforeCell.height, cell.width, cell.height)
        }
      }
      this._rowCount++
      if (refreshBoundary) {
        this.boundary = Rectangle.makeLTWH(this.left, this.top, this.width, this.height + this.items[rowIndex * this.columnCount].height)
      }
    }
  }


  public insertColumnBefore(columnIndex: number, refreshBoundary: boolean) {
    if (columnIndex >= 0 && columnIndex < this._columnCount) {
      for (let i = 0; i < this._rowCount; i++) {
        const beforeCell = this.items[i * this._columnCount + columnIndex + i]
        const cell = new CellEntity(beforeCell.left, beforeCell.top, beforeCell.width, beforeCell.height)
        this.addItemAt(cell, i * this.columnCount + columnIndex + i)
      }
      for (let j = columnIndex + 1; j < this._columnCount + 1; j++) {
        for (let i = 0; i < this._rowCount; i++) {
          const beforeCell = this.items[i * this._columnCount + columnIndex + i]
          const cell = this.items[i * this._columnCount + j + i]
          cell.boundary = Rectangle.makeLTWH(cell.left + beforeCell.width, cell.top, cell.width, cell.height)
        }
      }
      this._columnCount++
      if (refreshBoundary) {
        this.boundary = Rectangle.makeLTWH(this.left, this.top, this.width + this.items[columnIndex].width, this.height)
      }
    }
  }


  public insertColumnAfter(columnIndex: number, refreshBoundary: boolean) {
    if (columnIndex >= 0 && columnIndex < this._columnCount) {
      for (let i = 0; i < this._rowCount; i++) {
        const beforeCell = this.items[i * this._columnCount + columnIndex + i]
        const cell = new CellEntity(beforeCell.left, beforeCell.top, beforeCell.width, beforeCell.height)
        this.addItemAt(cell, i * this.columnCount + columnIndex + i + 1)
      }
      for (let j = columnIndex + 1; j < this._columnCount + 1; j++) {
        for (let i = 0; i < this._rowCount; i++) {
          const beforeCell = this.items[i * this._columnCount + columnIndex + i]
          const cell = this.items[i * this._columnCount + j + i]
          cell.boundary = Rectangle.makeLTWH(cell.left + beforeCell.width, cell.top, cell.width, cell.height)
        }
      }
      this._columnCount++
      if (refreshBoundary) {
        this.boundary = Rectangle.makeLTWH(this.left, this.top, this.width + this.items[columnIndex].width, this.height)
      }
    }
  }


  public deleteRow(rowIndex: number) {
    if (rowIndex >= 0 && rowIndex < this._rowCount) {
      for (let j = rowIndex + 1; j < this._rowCount; j++) {
        for (let i = 0; i < this._columnCount; i++) {
          const beforeCell = this.items[rowIndex * this._columnCount + i]
          const cell = this.items[j * this._columnCount + i]
          cell.boundary = Rectangle.makeLTWH(cell.left, cell.top - beforeCell.height, cell.width, cell.height)
        }
      }
      this.boundary = Rectangle.makeLTWH(this.left, this.top, this.width, this.height - this.items[rowIndex * this._rowCount].height)
      for (let i = 0; i < this._columnCount; i++) {
        this.removeItemAt(rowIndex * this._columnCount);
      }
      this._rowCount--
    }
  }

  public deleteColumn(columnIndex: number) {
    if (columnIndex >= 0 && columnIndex < this._columnCount) {
      for (let j = columnIndex + 1; j < this._columnCount; j++) {
        for (let i = 0; i < this._rowCount; i++) {
          const beforeCell = this.items[i * this._columnCount + columnIndex]
          const cell = this.items[i * this._columnCount + j]
          cell.boundary = Rectangle.makeLTWH(cell.left - beforeCell.width, cell.top, cell.width, cell.height)
        }
      }
      this.boundary = Rectangle.makeLTWH(this.left, this.top, this.width - this.items[columnIndex].width, this.height)
      for (let i = this._rowCount - 1; i >= 0; i--) {
        this.removeItemAt(i * this._columnCount + columnIndex);
      }
      this._columnCount--
    }
  }

  public recalculateTableBoundary(oldWidth: number, oldHeight: number) {
    const widthRatio = this.width / oldWidth
    const heightRatio = this.height / oldHeight
    for (let rowIndex = 0; rowIndex < this._rowCount; rowIndex++) {
      for (let columnIndex = 0; columnIndex < this._columnCount; columnIndex++) {
        const cell = this.items[rowIndex * this._columnCount + columnIndex]
        cell.boundary = Rectangle.makeLTWH(cell.left * widthRatio, cell.top * heightRatio, cell.width * widthRatio, cell.height * heightRatio)
      }
    }
  }

  // public clone(): EditorItem {
  //   let tableEntity = new TableEntity(this.left, this.top, this.width, this.height)
  //   return tableEntity
  // }

  protected save(): EditorItemInfo {
    return new TableInfo()
  }

  protected load(data: EditorItemInfo, editor: Editor): void {

  }

  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.Table
    return shapeType
  }

  private refreshTable() {
    this.removeAllItems()
    const cellWidth = this.width / this.columnCount
    const cellHeight = this.height / this.rowCount
    for (let rowIndex = 0; rowIndex < this._rowCount; rowIndex++) {
      for (let columnIndex = 0; columnIndex < this._columnCount; columnIndex++) {
        const cell = new CellEntity(Math.round(columnIndex * cellWidth), Math.round(rowIndex * cellHeight), Math.round(cellWidth), Math.round(cellHeight))
        // console.log(cell)
        // const paint = new Paint()
        // if (rowIndex == 0) {
        //  paint.setColor(Colors.Black)
        // } else if (rowIndex == 1) {
        //  paint.setColor(Colors.Blue)
        // } else {
        //  paint.setColor(Colors.Green)
        // }
        // cell.shape.fill = paint
        this.addItem(cell)
      }
    }
  }

}
