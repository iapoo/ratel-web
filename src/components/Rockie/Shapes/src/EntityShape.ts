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

export enum ModifierDirection {
  X,
  Y,
  XY
}

export interface ShapeTypeInfo {
  type: EntityShapeType
  freeze: EntityShapeFreezeType
  text: string
  left: number
  top: number
  width: number
  height: number
  modifier: Point2
  modifierStart: Point2
  modifierEnd: Point2
  modifyInLine: boolean
  modifyInPercent: boolean
}


export class EntityShape extends AbstractTextShape {
  private _typeInfo: ShapeTypeInfo
  private _modifier: Point2

  constructor (text = '', left = 0, top = 0, width = 100, height = 100, typeInfo: ShapeTypeInfo =  {
    type: EntityShapeType.Rectangle, 
    freeze: EntityShapeFreezeType.None,
    text: '',
    left: 0,
    top: 0,
    width: 100,
    height: 100,
    modifier: new Point2(),
    modifierStart: new Point2(0,0),
    modifierEnd: new Point2(0,0),
    modifyInLine: true,
    modifyInPercent: true
  }) {
    super(text, left, top, width, height)
    this._typeInfo = typeInfo
    this._modifier = typeInfo.modifier
  }

  public get modifier() {
    return this._modifier
  }

  public set modifier(value: Point2) {
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
    let modifierWidth = this.modifier.x + this.typeInfo.modifierStart.x * this.width
    let modifierHeight = this.modifier.y + this.typeInfo.modifierStart.y * this.height
    if(this._typeInfo?.modifyInPercent) {
      modifierWidth = this.width * this.modifier.x * (this.typeInfo.modifierEnd.x - this.typeInfo.modifierStart.x) + this.typeInfo.modifierStart.x * this.width
      modifierHeight = this.height * this.modifier.y * (this.typeInfo.modifierEnd.y - this.typeInfo.modifierStart.y) + this.typeInfo.modifierStart.y * this.height
    }
    switch (this._typeInfo.type) {
    case EntityShapeType.RoundRectangle:
      this.path.addRRect(new RoundRectangle(0, 0, this.width, this.height, modifierWidth, modifierHeight))
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
      this.path.moveTo(modifierWidth + 1, 0)
      this.path.lineTo(modifierWidth + 1, this.height)
      this.path.moveTo(this.width - modifierWidth - 1, 0)
      this.path.lineTo(this.width - modifierWidth - 1, this.height)
      break
    case EntityShapeType.Diamond:
      this.path.moveTo(this.width / 2, 0)
      this.path.lineTo(this.width, this.height / 2)
      this.path.lineTo(this.width / 2, this.height)
      this.path.lineTo(0, this.height / 2)
      this.path.lineTo(this.width / 2, 0)
      break
    case EntityShapeType.Parallelogram:
      this.path.moveTo(modifierWidth, 0)
      this.path.lineTo(this.width, 0)
      this.path.lineTo(this.width - modifierWidth, this.height)
      this.path.lineTo(0, this.height)
      this.path.lineTo(modifierWidth, 0)
      break
    case EntityShapeType.Hexagon:
      this.path.moveTo(modifierWidth, 0)
      this.path.lineTo(this.width - modifierWidth, 0)
      this.path.lineTo(this.width, this.height / 2)
      this.path.lineTo(this.width - modifierWidth, this.height)
      this.path.lineTo(modifierWidth, this.height)
      this.path.lineTo(0, this.height / 2)
      this.path.lineTo(modifierWidth, 0)
      break
    case EntityShapeType.Triangle:
      this.path.moveTo(modifierWidth, 0)
      this.path.lineTo(this.width, this.height)
      this.path.lineTo(0, this.height)
      this.path.lineTo(modifierWidth, 0)
      break
    case EntityShapeType.Cylinder: {
      //Ref to: https://www.ibashu.cn/news/show_261576.html
      //Ref to: https://blog.csdn.net/jeremyjone/article/details/102069294
      let k = modifierHeight / 0.75
      this.path.addArc(Rectangle.makeLTWH(0, 0, this.width, modifierHeight * 2), 0, 360)
      this.path.moveTo(0, modifierHeight)
      this.path.lineTo(0, this.height - modifierHeight)
      this.path.cubicTo(0, this.height - modifierHeight + k, this.width, this.height - modifierHeight + k, this.width, this.height - modifierHeight)
      this.path.moveTo(this.width, this.height - modifierHeight)
      this.path.lineTo(this.width, modifierHeight)
      this.path.cubicTo(this.width, modifierHeight + k, 0, modifierHeight + k, 0, modifierHeight)
      break
    }
    case EntityShapeType.Cloud:
      //this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
      this.path.moveTo(0.25 * this.width, 0.25 * this.height)
      this.path.cubicTo(0.25 * this.width, 0.01 * this.height, 0.6 * this.width, 0.01 * this.height, 0.65 * this.width, 0.2 * this.height)
      //this.path.moveTo(0.6 * this.width, 0.22 * this.height)
      this.path.cubicTo(0.7 * this.width, 0.05 * this.height, 0.9 * this.width, 0.05 * this.height, 0.85 * this.width, 0.4 * this.height)
      //this.path.moveTo(0.85 * this.width, 0.5 * this.height)
      this.path.cubicTo(0.95 * this.width, 0.5 * this.height, 0.9 * this.width, 0.75 * this.height, 0.8 * this.width, 0.75 * this.height)
      //this.path.moveTo(0.8 * this.width, 0.75 * this.height)
      this.path.cubicTo(0.75 * this.width, 0.85 * this.height, 0.6 * this.width, 0.95 * this.height, 0.6 * this.width, 0.75 * this.height)
      //this.path.moveTo(0.6 * this.width, 0.75 * this.height)
      this.path.cubicTo(0.55 * this.width, 0.95 * this.height, 0.3 * this.width, 0.92 * this.height, 0.25 * this.width, 0.75 * this.height)
      //this.path.moveTo(0.25 * this.width, 0.75 * this.height)
      this.path.cubicTo(0.01 * this.width, 0.7 * this.height, 0.02 * this.width, 0.28 * this.height, 0.25 * this.width, 0.25 * this.height)
      break
    case EntityShapeType.Document: {
      modifierHeight = this.height - modifierHeight
      let k = modifierHeight / 0.75
      //this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
      this.path.moveTo(0, 0)
      this.path.lineTo(0, this.height - modifierHeight)
      this.path.cubicTo(this.width * 0.05, this.height - modifierHeight + k, this.width * 0.45, this.height - modifierHeight + k, this.width * 0.5, this.height  - modifierHeight)
      this.path.cubicTo(this.width * 0.55, this.height  - modifierHeight - k, this.width * 0.95, this.height  - modifierHeight - k, this.width, this.height  - modifierHeight)
      this.path.lineTo(this.width, 0)
      this.path.lineTo(0, 0)
      break
    }
    case EntityShapeType.InternalStorage:
      // TODO: FIX 1 Offset
      this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
      this.path.moveTo(modifierWidth + 1, 0)
      this.path.lineTo(modifierWidth + 1, this.height)
      this.path.moveTo(0, modifierHeight + 1)
      this.path.lineTo(this.width, modifierHeight + 1)
      break
    case EntityShapeType.Cube:
      this.path.moveTo(0, 0)
      this.path.lineTo(0, this.height - modifierHeight)
      this.path.lineTo(modifierWidth, this.height)
      this.path.lineTo(modifierWidth, modifierHeight)
      this.path.lineTo(0, 0)
      this.path.lineTo(modifierWidth, modifierHeight)
      this.path.lineTo(this.width, modifierHeight)
      this.path.lineTo(this.width - modifierWidth, 0)
      this.path.lineTo(0, 0)
      this.path.addRectangle(Rectangle.makeLTWH(modifierWidth, modifierHeight, this.width - modifierWidth, this.height - modifierHeight))
      break
    case EntityShapeType.Step:
      this.path.moveTo(0, 0)
      this.path.lineTo(modifierWidth, this.height /2)
      this.path.lineTo(0, this.height)
      this.path.lineTo(this.width - modifierWidth, this.height)
      this.path.lineTo(this.width, this.height / 2)
      this.path.lineTo(this.width - modifierWidth, 0)
      this.path.lineTo(0, 0)
      break
    case EntityShapeType.Trapezoid:
      this.path.moveTo(modifierWidth, 0)
      this.path.lineTo(0, this.height)
      this.path.lineTo(this.width, this.height)
      this.path.lineTo(this.width - modifierWidth, 0)
      this.path.lineTo(modifierWidth, 0)
      break
    case EntityShapeType.Tape: {
      let k = modifierHeight / 0.75
      //this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
      this.path.moveTo(0, modifierHeight)
      this.path.lineTo(0, this.height - modifierHeight)
      this.path.cubicTo(this.width * 0.05, this.height - modifierHeight + k, this.width * 0.45, this.height - modifierHeight + k, this.width * 0.5, this.height  - modifierHeight)
      this.path.cubicTo(this.width * 0.55, this.height - modifierHeight - k, this.width * 0.95, this.height - modifierHeight - k, this.width, this.height  - modifierHeight)
      this.path.lineTo(this.width, modifierHeight)
      this.path.cubicTo(this.width * 0.95, modifierHeight - k, this.width * 0.55, modifierHeight - k, this.width * 0.5, modifierHeight)
      this.path.cubicTo(this.width * 0.45, modifierHeight + k, this.width * 0.05, modifierHeight + k, 0, modifierHeight)
      break
    }
    case EntityShapeType.Note:
      this.path.moveTo(0, 0)
      this.path.lineTo(0, this.height)
      this.path.lineTo(this.width, this.height)
      this.path.lineTo(this.width, modifierHeight)
      this.path.lineTo(modifierWidth, modifierHeight)
      this.path.lineTo(modifierWidth, 0)
      this.path.lineTo(0, 0)
      this.path.moveTo(modifierWidth, 0)
      this.path.lineTo(modifierWidth, modifierHeight)
      this.path.lineTo(this.width, modifierHeight)
      this.path.lineTo(modifierWidth, 0)
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
