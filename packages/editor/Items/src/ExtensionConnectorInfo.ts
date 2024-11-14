import { StyleInfo } from '../../Shapes'
import { CustomConnectorInfo } from './CustomConnectorInfo'

export class ExtensionConnectorInfo extends CustomConnectorInfo {
  public extensionCategory: string
  public plugin: string

  public constructor(
    type: string,
    category = '',
    extensionCategory = '',
    plugin = '',
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    text: string = '',
    rotation: number = 0,
    styles: StyleInfo[] = [],
    useTheme = true,
    strokeColor: string | null = null,
    fillColor: string | null = null,
    lineWidth: number | null = null,
  ) {
    super(type, startX, startY, endX, endY, text, rotation, styles, useTheme, strokeColor, fillColor, lineWidth)
    this.category = category
    this.extensionCategory = extensionCategory
    this.plugin = plugin
  }
}
