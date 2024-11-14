import { StyleInfo } from '../../Shapes'
import { ShapeInfo } from './ShapeInfo'

/* eslint-disable max-params */
export class ExtensionEntityInfo extends ShapeInfo {
  public extensionCategory: string
  public plugin: string
  public constructor(
    type = 'Shape',
    category = 'Rectangle',
    extensionCategory = '',
    plugin = '',
    left = 0,
    top = 0,
    width = 100,
    height = 100,
    text = '',
    rotation = 0,
    styles: StyleInfo[] = [],
    useTheme = true,
    strokeColor: string | null = null,
    fillColor: string | null = null,
    lineWidth: number | null = null,
  ) {
    super(type, category, left, top, width, height, text, rotation, styles, useTheme, strokeColor, fillColor, lineWidth)
    this.extensionCategory = extensionCategory
    this.plugin = plugin
  }
}
