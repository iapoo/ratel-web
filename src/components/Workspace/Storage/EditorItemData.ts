/* eslint-disable max-params */

import { ShapeData, } from './ShapeData'

export class EditorItemData {
    public type: string
    public category: string
    public left: number
    public top: number
    public width: number
    public height: number
    public text: string
    public items: Array<EditorItemData> = new Array<EditorItemData>(0)
    public shape: ShapeData

    public constructor (type = 'Shape', category = 'Rectangle', left = 0, top = 0, width = 100, height = 100, text = '') {
      this.type = type
      this.category = category
      this.left = left
      this.top = top
      this.width = width
      this.height = height
      this.text = text
      this.shape = new ShapeData()
    }
}
