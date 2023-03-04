/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Colors, Graphics, Paint, PaintStyle, Rectangle, PointerEvent, } from './Graphics'
import { Control, } from './Control'

export class Button extends Control {
  constructor (left = 0, top = 0, width = 100, height = 100, text = 'Button') {
    super(left, top, width, height, text)
    this.onPointerEnter(this.handleOnPainterEnter.bind(this))
    this.onPointerLeave(this.handleOnPainterLeave.bind(this))
    this.onPointerClick(this.handleOnPainterClick.bind(this))
  }

  private handleOnPainterEnter (e: PointerEvent): void {
    this.fill.setColor(Colors.AliceBlue)
  }

  private handleOnPainterLeave (e: PointerEvent): void {
    this.fill.setColor(Colors.LightGrey)
  }

  private handleOnPainterClick (e: PointerEvent): void {

  }
}
