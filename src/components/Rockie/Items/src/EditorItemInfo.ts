/* eslint-disable max-params */

import { TextAlignment, TextVerticalAlignment } from "@/components/Engine"
import { StyleInfo } from "../../Shapes/src/EntityUtils"

export class EditorItemInfo {
  public type: string
  public category: string
  public left: number
  public top: number
  public width: number
  public height: number
  public rotation: number
  public text: string
  public items: Array<EditorItemInfo> = new Array<EditorItemInfo>(0)
  public id: string = ''
  public parentId: string | null = null
  public styles: StyleInfo[] = []
  public useTheme: boolean
  public themeName: string = ''
  public strokeColor: string | null
  public fillColor: string | null
  public lineWidth: number | null
  public locked: boolean = false
  public textAlignment: string = ''
  public textVerticalAlignment: string = ''
  public stroked: boolean = true
  public filled: boolean = true

  public constructor(type = 'Shape', category = 'Rectangle', left = 0, top = 0, width = 100, height = 100, text = ''
    , rotation = 0, styles: StyleInfo[] = [], useTheme = true, strokeColor: string | null = null
    , fillColor: string | null = null, lineWidth: number | null = null) {
    this.type = type
    this.category = category
    this.left = left
    this.top = top
    this.width = width
    this.height = height
    this.text = text
    this.rotation = rotation
    this.styles = styles
    this.useTheme = useTheme
    this.strokeColor = strokeColor
    this.fillColor = fillColor
    this.lineWidth = lineWidth
  }
}
