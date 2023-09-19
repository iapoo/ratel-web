/* eslint-disable max-params */
export class ShapeData {
    public left: number
    public top: number
    public width: number
    public height: number
    public text: string
    public modifierX: number = 0
    public modifierY: number = 0
    public adapterX: number = 0
    public adapterY: number = 0
    public adapterSize: number = 0

    public constructor (left = 0, top = 0, width = 100, height = 100, text = '') {
      this.left = left
      this.top = top
      this.width = width
      this.height = height
      this.text = text
    }
}
