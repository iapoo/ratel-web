import { StyleInfo } from '../../Shapes'
import { EditorItemInfo } from './EditorItemInfo'

/* eslint-disable max-params */
export class CodeContainerInfo extends EditorItemInfo {
  public modifier: string = '0,0'
  public controller: string = '0,0'
  public adapter: string = '0,0'
  public adapterSize: number = 0
  public codeImage: string = ''
  public codeContent: string = ''

  public constructor(
    type = 'CustomShape',
    category = 'CustomShape',
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
  }
}
