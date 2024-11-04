/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Point2, Rectangle } from './Graphics'
import { Shape } from './Shape'

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
  RECT,
}

class Segment {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-useless-constructor
  constructor(type: SegmentType, data: any[]) {}
}
export class Outline extends Shape {
  private _segments = new Array<Segment>(0)

  public constructor(startX: number, startY: number, endX: number, endY: number) {
    super(Math.min(startX, endX), Math.min(startY, endY), Math.abs(startX - endX), Math.abs(startY - endY))
    this.filled = false
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public addArc(startX: number, startY: number, endX: number, endY: number) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public addBezier(startX: number, startY: number, endX: number, endY: number) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public addCircle(startX: number, startY: number, endX: number, endY: number) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public addCubic(startX: number, startY: number, endX: number, endY: number) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public addEllipse(startX: number, startY: number, endX: number, endY: number) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public addLine(startX: number, startY: number, endX: number, endY: number) {
    const segment = new Segment(SegmentType.LINE, [])

    this._segments.push(segment)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public addPolygon(startX: number, startY: number, endX: number, endY: number) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public addPolyline(startX: number, startY: number, endX: number, endY: number) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public addQuadratic(startX: number, startY: number, endX: number, endY: number) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public addRectangle(startX: number, startY: number, endX: number, endY: number) {}

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
