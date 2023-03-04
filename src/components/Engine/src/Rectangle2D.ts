/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Colors, FontStyle, Graphics, Paint, PaintStyle, Rectangle, } from './Graphics'
import { Shape, } from './Shape'

export class Rectangle2D extends Shape {
  constructor (left: number, top: number, width: number, height: number) {
    super(left, top, width, height)
    this.path.addRectangle(Rectangle.makeLTWH(0, 0, width, height))
  }

  public update () {
    super.update()
    if (this.dirty) {
      this.path.reset()
      this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
    }
  }
}
