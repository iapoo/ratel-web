/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */

import { Point2, Rectangle, Rotation, Shape, } from '@/components/Engine'
import { Line, } from '@antv/g-math'
import { EntityShape, } from './EntityShape'

export enum ConnectorType {
  LINE,
  POLYLINE,
  BEZIER,
  QUADRATIC
}

export class ConnectorShape extends EntityShape {
  private static DETECTION_DISTANCE = 16
  private _start: Point2
  private _end: Point2

  public constructor (startX: number, startY: number, endX: number, endY: number) {
    super('', Math.min(startX, endX), Math.min(startY, endY), Math.abs(startX - endX), Math.abs(startY - endY))
    this._start = new Point2(startX, startY)
    this._end = new Point2(endX, endY)
    this.filled = false
  }

  public get start (): Point2 {
    return this._start
  }

  public set start (value: Point2) {
    // console.log(`ConnectorShape.start-> start.x = ${value.x} start.y = ${value.y} boundary.left = ${this.boundary.left} boundary.top = ${this.boundary.top}`)
    this._start = new Point2(value.x, value.y)
    // console.log(`Connection shape = start= x = ${value.x}  y=  ${value.y}  `)
    this.boundary = Rectangle.makeLTWH(Math.min(this._start.x, this._end.x), Math.min(this._start.y, this._end.y), Math.abs(this._start.x - this._end.x), Math.abs(this._start.y - this._end.y))
    this.markDirty()
  }

  public get end () : Point2 {
    return this._end
  }

  public set end (value: Point2) {
    this._end = new Point2(value.x, value.y)
    this.boundary = Rectangle.makeLTWH(Math.min(this._start.x, this._end.x), Math.min(this._start.y, this._end.y), Math.abs(this._start.x - this._end.x), Math.abs(this._start.y - this._end.y))
    this.markDirty()
  }

  public set boundary (boundary: Rectangle) {
    super.boundary = boundary
    // console.log(`ConnectorShape.boundary-> start.x = ${this._start.x} start.y = ${this._start.y} boundary.left = ${this.boundary.left} boundary.top = ${this.boundary.top}`)
  }

  public get boundary () {
    return super.boundary
  }

  public contains (x: number, y: number) {
    if (this.worldInverseTransform) {
      const point = [ x, y, ]
      const inversePoint = this.worldInverseTransform.makePoints(point)
      const distance = Line.pointDistance(this._start.x, this._start.y, this._end.x, this._end.y, inversePoint[0], inversePoint[1])
      return distance <= ConnectorShape.DETECTION_DISTANCE
    } else {
      return false
    }
  }

  public intersects (left: number, top: number, width: number, height: number) {
    if (this.worldInverseTransform) {
      const p1 = [ left, top, ]
      const p2 = [ left + width, top, ]
      const p3 = [ left + width, top + height, ]
      const p4 = [ left, top + height, ]
      const startPoint = [ this._start.x, this._start.y, ]
      const endPoint = [ this._end.x, this._end.y, ]
      const inverseStart = this.worldInverseTransform.makePoints(startPoint)
      const inverseEnd = this.worldInverseTransform.makePoints(endPoint)
      const inverseP1 = this.worldInverseTransform.makePoints(p1)
      const inverseP2 = this.worldInverseTransform.makePoints(p2)
      const inverseP3 = this.worldInverseTransform.makePoints(p3)
      const inverseP4 = this.worldInverseTransform.makePoints(p4)
      const distance1 = Line.pointDistance(inverseStart[0], inverseStart[1], inverseEnd[0], inverseEnd[1], inverseP1[0], inverseP1[1])
      const distance2 = Line.pointDistance(inverseStart[0], inverseStart[1], inverseEnd[0], inverseEnd[1], inverseP2[0], inverseP2[1])
      const distance3 = Line.pointDistance(inverseStart[0], inverseStart[1], inverseEnd[0], inverseEnd[1], inverseP3[0], inverseP3[1])
      const distance4 = Line.pointDistance(inverseStart[0], inverseStart[1], inverseEnd[0], inverseEnd[1], inverseP4[0], inverseP4[1])
      // console.log(` checking startx= ${this.start.x}, starty= ${this.start.y}, endx=${this.end.x}, endy=${this.end.y}, 1 = ${distance1}, 2 = ${distance2}, 3 = ${distance3}, 4 = ${distance4} `)
      // console.log(` inverse p1x= ${inverseP1[0]}, p1y= ${inverseP1[1]},p2x= ${inverseP2[0]}, p2y= ${inverseP2[1]}, p3x= ${inverseP3[0]}, p3y= ${inverseP3[1]}, p4x= ${inverseP4[0]}, p4y= ${inverseP4[1]},`)
      return distance1 <= ConnectorShape.DETECTION_DISTANCE && distance2 <= ConnectorShape.DETECTION_DISTANCE && distance3 <= ConnectorShape.DETECTION_DISTANCE && distance4 <= ConnectorShape.DETECTION_DISTANCE
    }
    return false
  }

  public update () {
    super.update()
    if (this.dirty) {
      const distance = Math.sqrt((this._start.x - this._end.x) * (this._start.x - this._end.x) + (this._start.y - this._end.y) * (this._start.y - this._end.y))
      let angle = Math.asinh((this._end.x - this.start.x) / distance)
      if (angle >= 0) {
        if (this._end.y >= this._start.y) {
          angle = angle * 180 / Math.PI
        } else {
          angle = 360 - angle * 180 / Math.PI
        }
      } else {
        if (this._end.y <= this._start.y) {
          angle = 180 + angle * 180 / Math.PI
        } else {
          angle = 180 - angle * 180 / Math.PI
        }
      }
      // this.position = new Point2(this.left, this.top)
      // this.rotation = new Rotation(angle / 180 * Math.PI)
      // this.clip.reset()
      // this.clip.addRectangle(Rectangle.makeLTWH(-1, -1, this.width + 2, this.height + 2))
      // this.path.reset()
      // this.path.addRectangle(new Rectangle(0, -5, distance, 5))

      this.position = new Point2(this.left, this.top)
      this.clip.reset()
      this.clip.addRectangle(Rectangle.makeLTWH(-1, -1, this.width + 2, this.height + 2))
      this.path.reset()
      this.path.moveTo(this.start.x - this.left, this.start.y - this.top)
      this.path.lineTo(this.end.x - this.left, this.end.y - this.top)
      this.path.close()
      // console.log(`left = ${this.left} top =${this.top} startx = ${this.start.x} starty = ${this.start.y}  endx = ${this.end.x} end.y = ${this.end.y}`)
    }
  }
}
