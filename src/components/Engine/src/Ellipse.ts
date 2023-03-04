/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Colors, FontStyle, Graphics, Paint, PaintStyle, Rectangle, } from './Graphics'
import { Shape, } from './Shape'

export class Ellipse extends Shape {
  public constructor (left: number, top: number, width: number, height: number) {
    super(left, top, width, height)
    this.path.reset()
    this.path.addOval(Rectangle.makeLTWH(0, 0, width, height))
  }
}
