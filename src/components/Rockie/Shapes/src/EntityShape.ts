/* eslint-disable complexity */
/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */

import { Colors, Font, GlyphRun, Graphics, Paint, Paragraph, ParagraphBuilder, ParagraphStyle, Path, Point2, Rectangle, Rotation, RoundRectangle, Shape, ShapedLine, } from '@/components/Engine'
import { Block, CursorMaker, Style, } from './EntityUtils'
import { AbstractTextShape, } from './AbstractTextShape'

export enum EntityShapeType {
  Rectangle,
  RoundRectangle,
  Text,
  Ellipse,
  Square,
  Circle,
  Process,
  Diamond,
  Parallelogram,
  Hexagon,
  Triangle,
  Cylinder,
  Cloud,
  Document,
  InternalStorage,
  Cube,
  Step,
  Trapezoid,
  Tape,
  Note,
  Card,
  Callout,
  Actor
}

export class EntityShape extends AbstractTextShape {
  private _type: EntityShapeType = EntityShapeType.Rectangle

  constructor (text = '', left = 0, top = 0, width = 100, height = 100) {
    super(text, left, top, width, height)
    this._type = EntityShapeType.Ellipse
  }

  public get type () {
    return this._type
  }

  public set type (value: EntityShapeType) {
    this._type = value
  }

  protected buildShape () {
    switch (this._type) {
    case EntityShapeType.RoundRectangle:
      this.path.addRRect(new RoundRectangle(0, 0, this.width, this.height, 6, 6))
      break
    case EntityShapeType.Text:
      this.stroked = false
      this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
      break
    case EntityShapeType.Ellipse:
      this.path.addOval(Rectangle.makeLTWH(0, 0, this.width, this.height))
      break
    case EntityShapeType.Square:
      this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
      break
    case EntityShapeType.Circle:
      this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
      break
    case EntityShapeType.Process:
      this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
      break
    case EntityShapeType.Diamond:
      this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
      break
    case EntityShapeType.Parallelogram:
      this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
      break
    case EntityShapeType.Hexagon:
      this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
      break
    case EntityShapeType.Triangle:
      this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
      break
    case EntityShapeType.Cylinder:
      this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
      break
    case EntityShapeType.Cloud:
      this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
      break
    case EntityShapeType.Document:
      this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
      break
    case EntityShapeType.InternalStorage:
      this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
      break
    case EntityShapeType.Cube:
      this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
      break
    case EntityShapeType.Step:
      this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
      break
    case EntityShapeType.Trapezoid:
      this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
      break
    case EntityShapeType.Tape:
      this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
      break
    case EntityShapeType.Note:
      this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
      break
    case EntityShapeType.Card:
      this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
      break
    case EntityShapeType.Callout:
      this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
      break
    case EntityShapeType.Actor:
      this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
      break
    case EntityShapeType.Rectangle:
    default:
      this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
      break
    }
  }
}
