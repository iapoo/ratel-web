import { StyleInfo } from '../../Shapes'
import { EditorItemInfo } from './EditorItemInfo'
import { Categories } from './Item'

export class ExtensionTableInfo extends EditorItemInfo {
  public rowCount: number
  public columnCount: number
  public customTableTypeName: string
  public extensionCategory: string
  public plugin: string
  public constructor(
    left = 0,
    top = 0,
    width = 100,
    height = 100,
    customTableTypeName: string,
    extensionCategory = '',
    plugin = '',
    rowCount: number = 3,
    columnCount: number = 3,
    rotation = 0,
    styles: StyleInfo[] = [],
    useTheme = true,
    strokeColor: string | null = null,
    fillColor: string | null = null,
    lineWidth: number | null = null,
  ) {
    super('', Categories.EXTENSION_TABLE, left, top, width, height, '', rotation, styles, useTheme, strokeColor, fillColor, lineWidth)
    this.customTableTypeName = customTableTypeName
    this.rowCount = rowCount
    this.columnCount = columnCount
    this.extensionCategory = extensionCategory
    this.plugin = plugin
  }
}
