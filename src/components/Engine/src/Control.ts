/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Colors, Graphics, Paint, PaintStyle, Rectangle, } from './Graphics'
import { TextShape, } from './TextShape'

export class Control extends TextShape {
  constructor(left = 0, top = 0, width = 100, height = 100, text = '') {
    super(text, left, top, width, height)
    this.stroke.setStrokeWidth(1.0)
    this.stroke.setColor(Colors.DarkGray)
    this.fill.setColor(Colors.LightGrey)
  }
}
