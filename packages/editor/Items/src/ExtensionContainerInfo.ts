import { StyleInfo } from '../../Shapes'
import { Containers } from './ContainerEntity'
import { ContainerInfo } from './ContainerInfo'
import { Categories } from './Item'

/* eslint-disable max-params */
export class ExtensionContainerInfo extends ContainerInfo {
  public extensionCategory: string
  public plugin: string
  public constructor(
    type = Containers.TYPE_CONTAINER,
    category = Categories.CONTAINER,
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
