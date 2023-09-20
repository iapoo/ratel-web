import { EditorItemData } from "./EditorItemData"

/* eslint-disable max-params */
export class ShapeData extends EditorItemData {
    public modifierX: number = 0
    public modifierY: number = 0
    public adapterX: number = 0
    public adapterY: number = 0
    public adapterSize: number = 0

    public constructor (type = 'Shape', category = 'Rectangle', left = 0, top = 0, width = 100, height = 100, text = '') {
      super(type, category, left, top, width, height, text)
    }
}
