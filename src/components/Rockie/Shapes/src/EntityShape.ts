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

export enum EntityShapeFreezeType {
  None,
  AspectRatio,
  Width,
  Height,
  WidthHeight
}

export interface ShapeTypeInfo {
  type: EntityShapeType
  freeze: EntityShapeFreezeType
  text: string
  left: number
  top: number
  width: number
  height: number
  modifier: number
  modifierStart: Point2
  modifierEnd: Point2
}

export class EntityShape extends AbstractTextShape {
  private _typeInfo: ShapeTypeInfo
  private _modifier: number

  constructor (text = '', left = 0, top = 0, width = 100, height = 100, typeInfo: ShapeTypeInfo =  {
    type: EntityShapeType.Rectangle, 
    freeze: EntityShapeFreezeType.None,
    text: '',
    left: 0,
    top: 0,
    width: 100,
    height: 100,
    modifier: 0,
    modifierStart: new Point2(0,0),
    modifierEnd: new Point2(0,0)
  }) {
    super(text, left, top, width, height)
    this._typeInfo = typeInfo
    this._modifier = typeInfo.modifier
  }

  public get modifier() {
    return this._modifier
  }

  public set modifier(value: number) {
    this._modifier = value
    this.markDirty()
  }

  public get typeInfo () {
    return this._typeInfo
  }

  public set typeInfo (value: ShapeTypeInfo) {
    this._typeInfo = value
  }


  protected buildShape () {    
    if(!this._typeInfo) {
      return
    }
    switch (this._typeInfo.type) {
    case EntityShapeType.RoundRectangle:
      let roundWidth = this.width * this.modifier * (this.typeInfo.modifierEnd.x - this.typeInfo.modifierStart.x)
      let roundHeight = this.height * this.modifier * (this.typeInfo.modifierEnd.x - this.typeInfo.modifierStart.x)
      this.path.addRRect(new RoundRectangle(0, 0, this.width, this.height, roundWidth, roundHeight))
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
      this.path.addOval(Rectangle.makeLTWH(0, 0, this.width, this.height))
      break
    case EntityShapeType.Process:
      this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
      this.path.addRectangle(Rectangle.makeLTWH(10, 0, this.width - 20, this.height))
      break
    case EntityShapeType.Diamond:
      this.path.moveTo(this.width / 2, 0)
      this.path.lineTo(this.width, this.height / 2)
      this.path.lineTo(this.width / 2, this.height)
      this.path.lineTo(0, this.height / 2)
      this.path.lineTo(this.width / 2, 0)
      break
    case EntityShapeType.Parallelogram:
      this.path.moveTo(20, 0)
      this.path.lineTo(this.width, 0)
      this.path.lineTo(this.width - 20, this.height)
      this.path.lineTo(0, this.height)
      this.path.lineTo(20, 0)
      break
    case EntityShapeType.Hexagon:
      this.path.moveTo(20, 0)
      this.path.lineTo(this.width - 20, 0)
      this.path.lineTo(this.width, this.height / 2)
      this.path.lineTo(this.width - 20, this.height)
      this.path.lineTo(20, this.height)
      this.path.lineTo(0, this.height / 2)
      this.path.lineTo(20, 0)
      break
    case EntityShapeType.Triangle:
      this.path.moveTo(this.width / 2, 0)
      this.path.lineTo(this.width, this.height)
      this.path.lineTo(0, this.height)
      this.path.lineTo(this.width / 2, 0)
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
