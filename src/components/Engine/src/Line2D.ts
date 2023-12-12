/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Colors, FontStyle, Graphics, Paint, PaintStyle, Point2, Rectangle, } from './Graphics'
import { Shape, } from './Shape'

export class Line2D extends Shape {
  private _start: Point2
  private _end: Point2

  public constructor (startX: number, startY: number, endX: number, endY: number) {
    super(Math.min(startX, endX), Math.min(startY, endY), Math.abs(startX - endX), Math.abs(startY - endY))
    this._start = new Point2(startX, startY)
    this._end = new Point2(endX, endY)
    this.filled = false
  }

  public get start (): Point2 {
    return this._start
  }

  public set start (start: Point2) {
    this._start = new Point2(start.x, start.y)
    this.markDirty()
  }

  public get end () : Point2 {
    return this._end
  }

  public set end (end: Point2) {
    this._end = new Point2(end.x, end.y)
    this.markDirty()
  }

  public update () {
    super.update()
    if (this.dirty) {
      this.boundary = Rectangle.makeLTWH(Math.min(this.start.x, this.end.x), Math.min(this.start.y, this.end.y), Math.abs(this.start.x - this.end.x), Math.abs(this.start.y - this.end.y))

      this.position = new Point2(this.left, this.top)
      this.clip.reset()
      this.clip.addRectangle(Rectangle.makeLTWH(-1, -1, this.width + 2, this.height + 2))
      this.path.reset()
      this.path.moveTo(this.start.x - this.left, this.start.y - this.top)
      this.path.lineTo(this.end.x - this.left, this.end.y - this.top)
      this.path.close()
    }
  }
}
