/* eslint-disable max-params */
import { Colors, Graphics, Paint, PaintStyle, Path, PathOp, Point2, Rectangle } from './Graphics'
import { Node } from './Node'

export abstract class Shape extends Node {
  private _stroke: Paint
  private _fill: Paint
  private _filled: boolean
  private _stroked: boolean
  private _path: Path
  private _boundary: Rectangle
  private _clipped: boolean
  private _clip: Path
  private _hittable: boolean
  private _opPath: Path

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  constructor(left = 0, top = 0, width = 100, height = 100) {
    super()
    this._boundary = Rectangle.makeLTWH(left, top, width, height)
    this.position = new Point2(left, top)
    this._stroke = new Paint()
    this._stroke.setPaintStyle(PaintStyle.STROKE)
    this._stroke.setColor(Colors.Blue)
    this._stroke.setStrokeWidth(1)
    this._stroke.setAntiAlias(true)
    this._fill = new Paint()
    this._fill.setPaintStyle(PaintStyle.FILL)
    this._fill.setColor(Colors.Green)
    this._stroke.setAntiAlias(true)
    this._stroked = true
    this._filled = true
    this._clipped = true
    this._hittable = true
    this._clip = new Path()
    this._path = new Path()
    this._opPath = new Path()
    this._clip.addRectangle(Rectangle.makeLTWH(0, 0, width, height))
  }

  public get clipped() {
    return this._clipped
  }

  protected set clipped(clipped: boolean) {
    this._clipped = clipped
  }

  public get hittable() {
    return this._hittable
  }

  public set hittable(hittable: boolean) {
    this._hittable = hittable
  }

  public get clip() {
    return this._clip
  }

  public get boundary() {
    return this._boundary
  }

  public set boundary(boundary: Rectangle) {
    if (this.left !== boundary.left || this.top !== boundary.top || this.width !== boundary.width || this.height !== boundary.height) {
      this._boundary = Rectangle.makeLTWH(boundary.left, boundary.top, boundary.width, boundary.height)
      //this.position = new Point2(this._boundary.left, this._boundary.top)
      this.markDirty()
      this.update()
    }
  }

  public get width() {
    return this._boundary.width
  }

  public set width(width: number) {
    this._boundary = Rectangle.makeLTWH(this._boundary.left, this._boundary.top, width, this._boundary.height)
    this.markDirty()
  }

  public get height() {
    return this._boundary.height
  }

  public set height(height: number) {
    this._boundary = Rectangle.makeLTWH(this._boundary.left, this._boundary.top, this._boundary.width, height)
    this.markDirty()
  }

  public get left() {
    return this._boundary.left
  }

  public set left(left: number) {
    this._boundary = Rectangle.makeLTWH(left, this._boundary.top, this._boundary.width, this._boundary.height)
    this.markDirty()
  }

  public get top() {
    return this._boundary.top
  }

  public set top(top: number) {
    this._boundary = Rectangle.makeLTWH(this._boundary.left, top, this._boundary.width, this._boundary.height)
    this.markDirty()
  }

  public get right() {
    return this._boundary.right
  }

  public set right(right: number) {
    this._boundary = Rectangle.makeLTWH(this._boundary.left, this._boundary.top, right - this._boundary.left, this._boundary.height)
    this.markDirty()
  }

  public get bottom() {
    return this._boundary.bottom
  }

  public set bottom(bottom: number) {
    this._boundary = Rectangle.makeLTWH(this._boundary.left, this._boundary.top, this._boundary.width, bottom - this._boundary.top)
    this.markDirty()
  }

  public get path(): Path {
    return this._path
  }

  public get filled(): boolean {
    return this._filled
  }

  public set filled(filled: boolean) {
    if (this._filled !== filled) {
      this._filled = filled
      this.markDirty()
    }
  }

  public get stroked(): boolean {
    return this._stroked
  }

  public set stroked(stroked: boolean) {
    if (this._stroked !== stroked) {
      this._stroked = stroked
      this.markDirty()
    }
  }

  public get stroke(): Paint {
    return this._stroke
  }

  public set stroke(stroke: Paint) {
    if (this._stroke !== stroke) {
      this._stroke = stroke
      this.markDirty()
    }
  }

  public get fill(): Paint {
    return this._fill
  }

  public set fill(fill: Paint) {
    if (this._fill !== fill) {
      this._fill = fill
      this.markDirty()
    }
  }

  public contains(x: number, y: number) {
    if (this.worldInverseTransform) {
      const point = [x, y]
      const inversePoint = this.worldInverseTransform.makePoints(point)
      return this._path.contains(inversePoint[0], inversePoint[1])
    } else {
      return false
    }
  }

  public intersects(left: number, top: number, width: number, height: number) {
    if (this.worldInverseTransform) {
      const p1 = [left, top]
      const p2 = [left + width, top]
      const p3 = [left + width, top + height]
      const p4 = [left, top + height]
      const inverseP1 = this.worldInverseTransform.makePoints(p1)
      const inverseP2 = this.worldInverseTransform.makePoints(p2)
      const inverseP3 = this.worldInverseTransform.makePoints(p3)
      const inverseP4 = this.worldInverseTransform.makePoints(p4)
      this._opPath.reset()
      this._opPath.moveTo(inverseP1[0], inverseP1[1])
      this._opPath.lineTo(inverseP2[0], inverseP2[1])
      this._opPath.lineTo(inverseP3[0], inverseP3[1])
      this._opPath.lineTo(inverseP4[0], inverseP4[1])
      this._opPath.close()
      const op = this._opPath.op(this._path, PathOp.INTERSECT)
      // const p: any = op
      // console.log(p.toSVGString())
      // console.log(this.path.isEmpty())
      if (op && !op.isEmpty()) {
        //op.delete()
        return true
      }
    }
    return false
    // return this.contains(left, top) || this.contains(left + width, top) || this.contains(left + width, top + height) || this.contains(left, top + height)
  }

  public update() {
    super.update()
    if (this.dirty) {
      this.position = new Point2(this.left, this.top)
      this._clip.reset()
      this._clip.addRectangle(Rectangle.makeLTWH(-1, -1, this.width + 2, this.height + 2))
    }
  }

  public render(graphics: Graphics) {
    super.render(graphics)
    if (!this.visible) {
      return
    }
    this._stroke.setPaintStyle(PaintStyle.STROKE)
    this._fill.setPaintStyle(PaintStyle.FILL)
    if (this._filled) {
      graphics.drawPath(this._path, this._fill)
    }
    if (this._stroked) {
      //this._stroke.setColorFilter(this._stroke.getColor())
      graphics.drawPath(this._path, this._stroke)
    }
  }

  public dispose(): void {
    this._stroke.delete()
    this._fill.delete()
    this._path.delete()
    this._clip.delete()
    this._opPath.delete()
    super.dispose()
  }
}
