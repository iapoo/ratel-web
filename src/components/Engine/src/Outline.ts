/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Colors, FontStyle, Graphics, Paint, PaintStyle, Point2, Rectangle, } from './Graphics'
import { Shape, } from './Shape'
import { Line, Arc, } from '@antv/g-math'

enum SegmentType {
  ARC,
  BEZIER,
  CIRCLE,
  CUBIC,
  ELLIPSE,
  LINE,
  POLYGON,
  POLYLINE,
  QUADRATIC,
  RECT
}

class Segment {
  constructor(type: SegmentType, data: any[]) {

  }
}
export class Outline extends Shape {
  private _segments = new Array<Segment>(0)

  public constructor(startX: number, startY: number, endX: number, endY: number) {
    super(Math.min(startX, endX), Math.min(startY, endY), Math.abs(startX - endX), Math.abs(startY - endY))
    this.filled = false
  }

  public addArc(startX: number, startY: number, endX: number, endY: number) {

  }
  public addBezier(startX: number, startY: number, endX: number, endY: number) {

  }

  public addCircle(startX: number, startY: number, endX: number, endY: number) {

  }

  public addCubic(startX: number, startY: number, endX: number, endY: number) {

  }

  public addEllipse(startX: number, startY: number, endX: number, endY: number) {

  }

  public addLine(startX: number, startY: number, endX: number, endY: number) {
    const segment = new Segment(SegmentType.LINE, [])

    this._segments.push(segment)
  }

  public addPolygon(startX: number, startY: number, endX: number, endY: number) {

  }

  public addPolyline(startX: number, startY: number, endX: number, endY: number) {

  }

  public addQuadratic(startX: number, startY: number, endX: number, endY: number) {

  }

  public addRectangle(startX: number, startY: number, endX: number, endY: number) {

  }

  public update() {
    super.update()
    if (this.dirty) {
      this.position = new Point2(this.left, this.top)
      this.clip.reset()
      this.clip.addRectangle(Rectangle.makeLTWH(-1, -1, this.width + 2, this.height + 2))
      this.path.reset()
      this.path.close()
    }
  }
}
