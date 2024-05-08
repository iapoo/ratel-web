import { StyleInfo } from "../../Shapes/src/EntityUtils"
import { EditorItemInfo } from "./EditorItemInfo"
import { Categories } from "./Item"

export class CustomTableInfo extends EditorItemInfo {

    public rowCount: number
    public columnCount: number
    public customTableTypeName: string
    public constructor (left = 0, top = 0, width = 100, height = 100, customTableTypeName: string, rowCount: number = 3, columnCount: number = 3
        , rotation = 0, styles: StyleInfo[] = [], useTheme = true, strokeColor: string | null = null
        , fillColor: string | null = null, lineWidth: number | null = null) {
        super('', Categories.CUSTOM_TABLE, left, top, width, height, '', rotation, styles, useTheme, strokeColor, fillColor, lineWidth)
        this.customTableTypeName = customTableTypeName
        this.rowCount = rowCount
        this.columnCount = columnCount
    }
}