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

export class TableEntity extends ContainerEntity {
  public static TABLE_TYPE_TABLE = 'Table'
  public static TABLE_DESC_TABLE = 'Table'
  private _rowCount: number
  private _columnCount: number

  public constructor(left: number, top: number, width: number, height: number, rowCount = 3, columnCount = 3) {
    super(left, top, width, height, { shapeType: TableEntity.TABLE_TYPE_TABLE, })
    this._rowCount = rowCount
    this._columnCount = columnCount
    this.type = TableEntity.TABLE_TYPE_TABLE
    this.refreshTable()
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

  public get boundary (): Rectangle {
    return super.boundary
  }

  public set boundary (value: Rectangle) {
    const oldWidth = this.width
    const oldHeight = this.height
    super.boundary = value
    this.updateTableBoundary(oldWidth, oldHeight)
  }

  public getAllTypes(): Type[] {
    return [{ name: TableEntity.TABLE_TYPE_TABLE, description: TableEntity.TABLE_DESC_TABLE, },]
  }

  public get category(): string {
    return Categories.TABLE
  }

  public insertRowBefore(rowIndex: number) {
    if(rowIndex >= 0 && rowIndex < this._rowCount) {      
      for(let i = 0; i < this._columnCount; i ++) {
        const beforeCell = this.items[rowIndex * this._columnCount + i * 2]
        const cell = new CellEntity(beforeCell.left, beforeCell.top, beforeCell.width, beforeCell.height)
        this.addItemAt(cell, rowIndex * this._columnCount + i)
      }
      for(let j = rowIndex + 1; j < this._rowCount + 1; j ++) {
        for(let i = 0; i < this._columnCount; i ++) {
          const beforeCell = this.items[rowIndex * this._columnCount + i]
          const cell = this.items[j * this._columnCount + i]
          cell.boundary = Rectangle.makeLTWH(cell.left, cell.top + beforeCell.height, cell.width, cell.height)
        }
      }
      this._rowCount ++
      this.boundary = Rectangle.makeLTWH(this.left, this.top, this.width, this.height +  this.items[rowIndex * this.columnCount].height)
    }
  }


  public insertRowAfter(rowIndex: number) {
    if(rowIndex >= 0 && rowIndex < this._rowCount) {      
      for(let i = 0; i < this._columnCount; i ++) {
        const beforeCell = this.items[rowIndex * this._columnCount + i]
        const cell = new CellEntity(beforeCell.left, beforeCell.top, beforeCell.width, beforeCell.height)
        this.addItemAt(cell, (rowIndex + 1) * this._columnCount + i)
      }
      for(let j = rowIndex + 1; j < this._rowCount + 1; j ++) {
        for(let i = 0; i < this._columnCount; i ++) {
          const beforeCell = this.items[rowIndex * this._columnCount + i]
          const cell = this.items[j * this._columnCount + i]
          cell.boundary = Rectangle.makeLTWH(cell.left, cell.top + beforeCell.height, cell.width, cell.height)
        }
      }
      this._rowCount ++
      this.boundary = Rectangle.makeLTWH(this.left, this.top, this.width, this.height +  this.items[rowIndex * this.columnCount].height)
    }
  }


  public insertColumnBefore(columnIndex: number) {
    if(columnIndex >= 0 && columnIndex < this._columnCount) {      
      for(let i = 0; i < this._rowCount; i ++) {
        const beforeCell = this.items[i * this._columnCount + columnIndex +  i]
        const cell = new CellEntity(beforeCell.left, beforeCell.top, beforeCell.width, beforeCell.height)
        this.addItemAt(cell, i * this.columnCount + columnIndex + i)
      }
      for(let j = columnIndex + 1; j < this._columnCount + 1; j ++) {
        for(let i = 0; i < this._rowCount; i ++) {
          const beforeCell = this.items[i * this._columnCount + columnIndex + i]
          const cell = this.items[i * this._columnCount + j + i]
          cell.boundary = Rectangle.makeLTWH(cell.left + beforeCell.width, cell.top, cell.width, cell.height)
        }
      }
      this._columnCount ++
      this.boundary = Rectangle.makeLTWH(this.left, this.top, this.width +  this.items[columnIndex].width, this.height)
    }
  }


  public insertColumnAfter(columnIndex: number) {
    if(columnIndex >= 0 && columnIndex < this._columnCount) {      
      for(let i = 0; i < this._rowCount; i ++) {
        const beforeCell = this.items[i * this._columnCount + columnIndex +  i]
        const cell = new CellEntity(beforeCell.left, beforeCell.top, beforeCell.width, beforeCell.height)
        this.addItemAt(cell, i * this.columnCount + columnIndex + i + 1)
      }
      for(let j = columnIndex + 1; j < this._columnCount + 1; j ++) {
        for(let i = 0; i < this._rowCount; i ++) {
          const beforeCell = this.items[i * this._columnCount + columnIndex + i]
          const cell = this.items[i * this._columnCount + j + i]
          cell.boundary = Rectangle.makeLTWH(cell.left + beforeCell.width, cell.top, cell.width, cell.height)
        }
      }
      this._columnCount ++
      this.boundary = Rectangle.makeLTWH(this.left, this.top, this.width +  this.items[columnIndex].width, this.height)
    }
  }


  public deleteRow(rowIndex: number) {
    if(rowIndex >= 0 && rowIndex < this._rowCount) { 
      for(let j = rowIndex + 1; j < this._rowCount; j ++) {
        for(let i = 0; i < this._columnCount; i ++) {
          const beforeCell = this.items[rowIndex * this._columnCount + i]
          const cell = this.items[j * this._columnCount + i]
          cell.boundary = Rectangle.makeLTWH(cell.left, cell.top - beforeCell.height, cell.width, cell.height)
        }
      }
      this.boundary = Rectangle.makeLTWH(this.left, this.top, this.width, this.height -  this.items[rowIndex * this._rowCount].height)
      for(let i =  0;  i < this._columnCount; i ++) {
        this.removeItemAt(rowIndex * this._columnCount);
      }
      this._rowCount --
    }
  }

  public deleteColumn(columnIndex: number) {
    if(columnIndex >= 0 && columnIndex < this._columnCount) { 
      for(let j = columnIndex + 1; j < this._columnCount; j ++) {
        for(let i = 0; i < this._rowCount; i ++) {
          const beforeCell = this.items[i * this._columnCount + columnIndex]
          const cell = this.items[i * this._columnCount + j]
          cell.boundary = Rectangle.makeLTWH(cell.left - beforeCell.width, cell.top, cell.width, cell.height)
        }
      }
      this.boundary = Rectangle.makeLTWH(this.left, this.top, this.width - this.items[columnIndex].width, this.height)
      for(let i =  this._rowCount - 1;  i >= 0; i --) {
        this.removeItemAt(i * this._columnCount + columnIndex);
      }
      this._columnCount --
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

  private refreshTable() {
    this.removeAllItems()
    const cellWidth = this.width / this.columnCount
    const cellHeight = this.height / this.rowCount
    for (let rowIndex = 0; rowIndex < this._rowCount; rowIndex++) {
      for (let columnIndex = 0; columnIndex < this._columnCount; columnIndex++) {
        const cell = new CellEntity(columnIndex * cellWidth, rowIndex * cellHeight, cellWidth, cellHeight)
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

  private updateTableBoundary(oldWidth: number, oldHeight: number) {
    const widthRatio =  this.width / oldWidth
    const heightRatio =  this.height / oldHeight
    for (let rowIndex = 0; rowIndex < this._rowCount; rowIndex++) {
      for (let columnIndex = 0; columnIndex < this._columnCount; columnIndex++) {
        const cell = this.items[rowIndex * this._columnCount + columnIndex]
        cell.boundary =  Rectangle.makeLTWH(cell.left * widthRatio, cell.top * heightRatio, cell.width * widthRatio, cell.height * heightRatio)
      }
    }
  }
}
