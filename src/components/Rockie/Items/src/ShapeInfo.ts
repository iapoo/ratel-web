import { StyleInfo } from "../../Shapes/src/EntityUtils"
import { EditorItemInfo } from "./EditorItemInfo"

/* eslint-disable max-params */
export class ShapeInfo extends EditorItemInfo {
  public modifier: string = '0,0'
  public adapter: string = '0,0'
  public adapterSize: number = 0

  public constructor (type = 'Shape', category = 'Rectangle', left = 0, top = 0, width = 100, height = 100, text = '', rotation = 0, styles: StyleInfo[] = []) {
    super(type, category, left, top, width, height, text, rotation, styles)
  }
}
