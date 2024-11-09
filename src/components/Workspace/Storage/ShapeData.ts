import { EditorItemData } from './EditorItemData'

/* eslint-disable max-params */
export class ShapeData extends EditorItemData {
  public modifier: string = '0,0'
  public adapter: string = '0,0'
  public adapterSize: number = 0

  public constructor(type = 'Shape', category = 'Rectangle', left = 0, top = 0, width = 100, height = 100, text = '') {
    super(type, category, left, top, width, height, text)
  }
}
