import { StyleInfo } from "../../Shapes/src/EntityUtils"
import { EditorItemInfo } from "./EditorItemInfo"
import { Categories } from "./Item"
import { TableEntity } from "./TableEntity"

export class TableInfo extends EditorItemInfo {

    public rowCount: number
    public columnCount: number

    public constructor (left = 0, top = 0, width = 100, height = 100, rowCount: number = 3, columnCount: number = 3
        , rotation = 0, styles: StyleInfo[] = [], useTheme = true, strokeColor: string | null = null
        , fillColor: string | null = null, lineWidth: number | null = null) {
        super( TableEntity.TABLE_TYPE_TABLE, Categories.TABLE, left, top, width, height, ''
            , rotation, styles, useTheme, strokeColor, fillColor, lineWidth)
        this.rowCount = rowCount
        this.columnCount = columnCount
    }
}