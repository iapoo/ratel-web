/* eslint-disable max-params */
import { Colors, Paint, Rectangle, } from '@/components/Engine'
import { ContainerEntity, } from './ContainerEntity'
import { Categories, Item, Type, } from './Item'
import { ShapeEntity, } from './ShapeEntity'

export class TableEntity extends ContainerEntity {
  public static TABLE_TYPE_TABLE = 'Table'
  public static TABLE_DESC_TABLE = 'Table'
      private _rowCount: number
    private _columnCount: number

    public constructor (left: number, top: number, width: number, height: number) {
      super(left, top, width, height, { shapeType: TableEntity.TABLE_TYPE_TABLE, })
      this._rowCount = 3
      this._columnCount = 3
      this.type = TableEntity.TABLE_TYPE_TABLE
      this.refreshTable()
    }

    public get rowCount () {
      return this._rowCount
    }

    public set rowCount (value: number) {
      this._rowCount = value
      this.refreshTable()
    }

    public get columnCount () {
      return this._columnCount
    }

    public set columnCount (value: number) {
      this._columnCount = value
      this.refreshTable()
    }

    public getAllTypes (): Type[] {
      return [ { name: TableEntity.TABLE_TYPE_TABLE, description: TableEntity.TABLE_DESC_TABLE, }, ]
    }

    public get category (): string {
      return Categories.TABLE
    }

    private refreshTable () {
      this.removeAllItems()
      const cellWidth = this.width / this.columnCount
      const cellHeight = this.height / this.rowCount
      for (let rowIndex = 0; rowIndex < this._rowCount; rowIndex++) {
        for (let columnIndex = 0; columnIndex < this._columnCount; columnIndex++) {
          const cell = new ShapeEntity(columnIndex * cellWidth, rowIndex * cellHeight, cellWidth, cellHeight)
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
