/* eslint-disable complexity */
/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */

// @ts-ignore
import { Colors, Paint, PaintStyle, Path, Point2, Rectangle, RoundRectangle } from '@ratel-web/engine'
import { AbstractTextShape } from './AbstractTextShape'
import { ConnectorShape } from './ConnectorShape'

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
  Actor,
  Container,
  HorizontalContainer,
  VerticalContainer,
  CustomShape,
  CustomContainer,
  Table,
  Frame,
  Group,
}

export enum EntityShapeFreezeType {
  None,
  AspectRatio,
  Width,
  Height,
  WidthHeight,
}

export enum ModifierDirection {
  X,
  Y,
  XY,
}

export enum AdapterDirection {
  X,
  Y,
}

export interface ShapeTypeInfo {
  name: string
  type: EntityShapeType
  freeze: EntityShapeFreezeType
  text: string
  left: number
  top: number
  width: number
  height: number
  enableMask: boolean
  modifier: Point2
  modifierStart: Point2
  modifierEnd: Point2
  modifyInLine: boolean
  modifyInPercent: boolean
  controller: Point2
  controllerStart: Point2
  controllerEnd: Point2
  controlInLine: boolean
  controlInPercent: boolean
  adapter: Point2
  adapterDirection: AdapterDirection
  adapterSize: number
  adapterStart: Point2
  adapterEnd: Point2
  adaptInLine: boolean
  adaptInPercent: boolean
}

export class EntityShape extends AbstractTextShape {
  private _typeInfo: ShapeTypeInfo
  private _modifier: Point2
  private _controller: Point2
  private _adapter: Point2
  private _adapterSize: number
  private _maskPath: Path
  private _secondStroke: Paint = Paint.makeColorPaint(Colors.Black)
  private _secondFill: Paint = Paint.makeColorPaint(Colors.White)
  private _thirdStroke: Paint = Paint.makeColorPaint(Colors.Black)
  private _thirdFill: Paint = Paint.makeColorPaint(Colors.White)
  private _fourthStroke: Paint = Paint.makeColorPaint(Colors.Black)
  private _fourthFill: Paint = Paint.makeColorPaint(Colors.White)
  private _secondPath: Path
  private _secondFilled: boolean
  private _secondStroked: boolean
  private _thirdPath: Path
  private _thirdFilled: boolean
  private _thirdStroked: boolean
  private _fourthPath: Path
  private _fourthFilled: boolean
  private _fourthStroked: boolean

  constructor(
    text = '',
    left = 0,
    top = 0,
    width = 100,
    height = 100,
    typeInfo: ShapeTypeInfo = {
      name: '',
      type: EntityShapeType.Rectangle,
      freeze: EntityShapeFreezeType.None,
      text: '',
      left: 0,
      top: 0,
      width: 100,
      height: 100,
      enableMask: true,
      modifier: new Point2(),
      modifierStart: new Point2(0, 0),
      modifierEnd: new Point2(0, 0),
      modifyInLine: true,
      modifyInPercent: true,
      controller: new Point2(),
      controllerStart: new Point2(0, 0),
      controllerEnd: new Point2(0, 0),
      controlInLine: true,
      controlInPercent: true,
      adapter: new Point2(0, 0),
      adapterDirection: AdapterDirection.X,
      adapterSize: 0,
      adapterStart: new Point2(),
      adapterEnd: new Point2(),
      adaptInLine: true,
      adaptInPercent: true,
    },
  ) {
    super(text, left, top, width, height)
    this._typeInfo = typeInfo
    this._modifier = typeInfo.modifier
    this._controller = typeInfo.controller
    this._adapter = typeInfo.adapter
    this._adapterSize = typeInfo.adapterSize
    this._maskPath = new Path()
    this.secondStroke.setAntiAlias(true)
    this.secondStroke.setPaintStyle(PaintStyle.STROKE)
    this.secondStroke.setStrokeWidth(this.stroke.getStrokeWidth())
    this.secondFill.setPaintStyle(PaintStyle.FILL)
    this.thirdStroke.setAntiAlias(true)
    this.thirdStroke.setPaintStyle(PaintStyle.STROKE)
    this.thirdStroke.setStrokeWidth(this.stroke.getStrokeWidth())
    this.thirdFill.setPaintStyle(PaintStyle.FILL)
    this.fourthStroke.setAntiAlias(true)
    this.fourthStroke.setPaintStyle(PaintStyle.STROKE)
    this.fourthStroke.setStrokeWidth(this.stroke.getStrokeWidth())
    this.fourthFill.setPaintStyle(PaintStyle.FILL)
    this._secondPath = new Path()
    this._secondFilled = true
    this._secondStroked = true
    this._thirdPath = new Path()
    this._thirdFilled = true
    this._thirdStroked = true
    this._fourthPath = new Path()
    this._fourthFilled = true
    this._fourthStroked = true
  }

  public set clipped(clipped: boolean) {
    // @ts-ignore
    super.clipped = clipped
  }

  public get modifier() {
    return this._modifier
  }

  public set modifier(value: Point2) {
    this._modifier = value
    this.markDirty()
  }

  public get controller() {
    return this._controller
  }

  public set controller(value: Point2) {
    this._controller = value
    this.markDirty()
  }

  public get adapter() {
    return this._adapter
  }

  public set adapter(value: Point2) {
    this._adapter = value
    this.markDirty()
  }

  public get adapterSize() {
    return this._adapterSize
  }

  public set adapterSize(value: number) {
    this._adapterSize = value
    this.markDirty()
  }

  public get typeInfo() {
    return this._typeInfo
  }

  public set typeInfo(value: ShapeTypeInfo) {
    this._typeInfo = value
  }

  public get secondStroke() {
    return this._secondStroke
  }

  public get secondFill() {
    return this._secondFill
  }

  public get thirdStroke() {
    return this._thirdStroke
  }

  public get thirdFill() {
    return this._thirdFill
  }

  public get fourthStroke() {
    return this._fourthStroke
  }

  public get fourthFill() {
    return this._fourthFill
  }

  public get secondPath() {
    return this._secondPath
  }

  public get thirdPath() {
    return this._thirdPath
  }

  public get fourthPath() {
    return this._fourthPath
  }

  public get secondFilled() {
    return this._secondFilled
  }

  public set secondFilled(value: boolean) {
    this._secondFilled = value
  }

  public get secondStroked() {
    return this._secondStroked
  }

  public set secondStroked(value: boolean) {
    this._secondStroked = value
  }

  public get thirdFilled() {
    return this._thirdFilled
  }

  public set thirdFilled(value: boolean) {
    this._thirdFilled = value
  }

  public get thirdStroked() {
    return this._thirdStroked
  }

  public set thirdStroked(value: boolean) {
    this._thirdStroked = value
  }

  public get fourthFilled() {
    return this._fourthFilled
  }

  public set fourthFilled(value: boolean) {
    this._fourthFilled = value
  }

  public get fourthStroked() {
    return this._fourthStroked
  }

  public set fourthStroked(value: boolean) {
    this._fourthStroked = value
  }

  public update() {
    super.update()
    if (this.dirty) {
      this._maskPath.reset()
      this._maskPath.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
      // console.log(`update is called with width=${this.width} height = ${this.height}`)
    }
  }

  public contains(x: number, y: number) {
    if (this.worldInverseTransform) {
      const point = [x, y]
      const inversePoint = this.worldInverseTransform.makePoints(point)
      if (this.typeInfo.enableMask) {
        return this._maskPath.contains(inversePoint[0], inversePoint[1])
      } else {
        return this.path.contains(inversePoint[0], inversePoint[1])
      }
    } else {
      return false
    }
  }

  public intersects(left: number, top: number, width: number, height: number) {
    if (this.typeInfo.enableMask) {
      return this.contains(left, top) || this.contains(left + width, top) || this.contains(left + width, top + height) || this.contains(left, top + height)
    } else {
      return super.intersects(left, top, width, height)
    }
  }

  protected buildShape() {
    if (!this._typeInfo) {
      return
    }
    if (this instanceof ConnectorShape) {
      this.textWidth = this.width
      this.textHeight = this.height
      return
    }
    let modifierWidth = this.modifier.x + this.typeInfo.modifierStart.x * this.width
    let modifierHeight = this.modifier.y + this.typeInfo.modifierStart.y * this.height
    let controllerWidth = this.controller.x + this.typeInfo.controllerStart.x * this.width
    let controllerHeight = this.controller.y + this.typeInfo.controllerStart.y * this.height
    let adapterWidth = this.adapter.x + this.typeInfo.adapterStart.x * this.width
    let adapterHeight = this.adapter.y + this.typeInfo.adapterStart.y * this.height
    let adapterSizeX = this.adapterSize
    let adapterSizeY = this.adapterSize
    if (this._typeInfo?.modifyInPercent) {
      modifierWidth = this.width * this.modifier.x * (this.typeInfo.modifierEnd.x - this.typeInfo.modifierStart.x) + this.typeInfo.modifierStart.x * this.width
      modifierHeight =
        this.height * this.modifier.y * (this.typeInfo.modifierEnd.y - this.typeInfo.modifierStart.y) + this.typeInfo.modifierStart.y * this.height
    }
    if (this.typeInfo.controlInPercent) {
      controllerWidth =
        this.width * this.controller.x * (this.typeInfo.controllerEnd.x - this.typeInfo.controllerStart.x) + this.typeInfo.controllerStart.x * this.width
      controllerHeight =
        this.height * this.controller.y * (this.typeInfo.controllerEnd.y - this.typeInfo.controllerStart.y) + this.typeInfo.controllerStart.y * this.height
    }
    if (this._typeInfo?.adaptInPercent) {
      adapterWidth = this.width * this.adapter.x * (this.typeInfo.adapterEnd.x - this.typeInfo.adapterStart.x) + this.typeInfo.adapterStart.x * this.width
      adapterHeight = this.height * this.adapter.y * (this.typeInfo.adapterEnd.y - this.typeInfo.adapterStart.y) + this.typeInfo.adapterStart.y * this.height
      adapterSizeX = this.adapterSize * (this.typeInfo.adapterEnd.x - this.typeInfo.adapterStart.x) * this.width
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      adapterSizeY = this.adapterSize * (this.typeInfo.adapterEnd.y - this.typeInfo.adapterStart.y) * this.height
    }
    this.textWidth = this.width
    this.textHeight = this.height
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
        this.textLeft = modifierWidth
        this.textWidth = this.width - modifierWidth * 2
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
        //Special textHeight to make it natural
        this.textHeight = this.height - modifierHeight
        let k = modifierHeight / 0.35
        //this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
        this.path.moveTo(0, 0)
        this.path.lineTo(0, this.height - modifierHeight)
        //this.path.cubicTo(this.width * 0.05, this.height - modifierHeight + k, this.width * 0.45, this.height - modifierHeight + k, this.width * 0.5, this.height  - modifierHeight)
        //this.path.cubicTo(this.width * 0.55, this.height  - modifierHeight - k, this.width * 0.95, this.height  - modifierHeight - k, this.width, this.height  - modifierHeight)
        this.path.cubicTo(
          this.width * 0.5,
          this.height - modifierHeight + k,
          this.width * 0.5,
          this.height - modifierHeight - k,
          this.width,
          this.height - modifierHeight,
        )
        this.path.lineTo(this.width, 0)
        this.path.lineTo(0, 0)
        break
      }
      case EntityShapeType.InternalStorage:
        this.textLeft = modifierWidth
        this.textTop = modifierHeight
        this.textWidth = this.width - modifierWidth
        this.textHeight = this.height - modifierHeight
        // TODO: FIX 1 Offset
        this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
        this.path.moveTo(modifierWidth + 1, 0)
        this.path.lineTo(modifierWidth + 1, this.height)
        this.path.moveTo(0, modifierHeight + 1)
        this.path.lineTo(this.width, modifierHeight + 1)
        break
      case EntityShapeType.Cube:
        this.textLeft = modifierWidth
        this.textTop = modifierHeight
        this.textWidth = this.width - modifierWidth
        this.textHeight = this.height - modifierHeight
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
        this.textLeft = modifierWidth
        this.textWidth = this.width - modifierWidth * 2
        this.path.moveTo(0, 0)
        this.path.lineTo(modifierWidth, this.height / 2)
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
        this.textTop = modifierHeight * 2
        this.textHeight = this.height - modifierHeight * 4
        let k = modifierHeight / 0.35
        //this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
        this.path.moveTo(0, modifierHeight)
        this.path.lineTo(0, this.height - modifierHeight)
        //this.path.cubicTo(this.width * 0.05, this.height - modifierHeight + k, this.width * 0.45, this.height - modifierHeight + k, this.width * 0.5, this.height  - modifierHeight)
        //this.path.cubicTo(this.width * 0.55, this.height - modifierHeight - k, this.width * 0.95, this.height - modifierHeight - k, this.width, this.height  - modifierHeight)
        this.path.cubicTo(
          this.width * 0.5,
          this.height - modifierHeight + k,
          this.width * 0.5,
          this.height - modifierHeight - k,
          this.width,
          this.height - modifierHeight,
        )
        this.path.lineTo(this.width, modifierHeight)
        //this.path.cubicTo(this.width * 0.95, modifierHeight - k, this.width * 0.55, modifierHeight - k, this.width * 0.5, modifierHeight)
        //this.path.cubicTo(this.width * 0.45, modifierHeight + k, this.width * 0.05, modifierHeight + k, 0, modifierHeight)
        this.path.cubicTo(this.width * 0.5, modifierHeight - k, this.width * 0.5, modifierHeight + k, 0, modifierHeight)
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
        this.path.moveTo(0, modifierHeight)
        this.path.lineTo(0, this.height)
        this.path.lineTo(this.width, this.height)
        this.path.lineTo(this.width, 0)
        this.path.lineTo(modifierWidth, 0)
        this.path.lineTo(0, modifierHeight)
        break
      case EntityShapeType.Callout:
        this.textHeight = adapterHeight
        this.path.moveTo(0, 0)
        this.path.lineTo(0, adapterHeight)
        this.path.lineTo(adapterWidth, adapterHeight)
        this.path.lineTo(modifierWidth, modifierHeight)
        this.path.lineTo(adapterWidth + adapterSizeX, adapterHeight)
        this.path.lineTo(this.width, adapterHeight)
        this.path.lineTo(this.width, 0)
        this.path.lineTo(0, 0)
        break
      case EntityShapeType.Actor:
        //this.filled = false
        this.path.addOval(Rectangle.makeLTWH(this.width * 0.25, 0, this.width * 0.5, this.height * 0.25))
        this.path.moveTo(0, this.height / 3)
        this.path.lineTo(this.width, this.height / 3)
        this.path.close()
        this.path.moveTo(this.width * 0.5, this.height * 0.25)
        this.path.lineTo(this.width * 0.5, (this.height * 2) / 3)
        this.path.close()
        this.path.moveTo(0, this.height)
        this.path.lineTo(this.width * 0.5, (this.height * 2) / 3)
        this.path.lineTo(this.width, this.height)
        this.path.lineTo(this.width * 0.5, (this.height * 2) / 3)
        this.path.lineTo(0, this.height)
        break
      case EntityShapeType.Container:
        this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
        break
      case EntityShapeType.HorizontalContainer:
        this.path.addRectangle(Rectangle.makeLTWH(0, controllerHeight, modifierWidth, this.height - controllerHeight))
        this.path.addRectangle(Rectangle.makeLTWH(modifierWidth, 0, this.width - modifierWidth, this.height))
        this.textLeft = -controllerHeight
        this.textWidth = this.height - controllerHeight
        this.textHeight = modifierWidth
        break
      case EntityShapeType.VerticalContainer:
        this.path.addRectangle(Rectangle.makeLTWH(0, 0, controllerWidth, modifierHeight))
        this.path.addRectangle(Rectangle.makeLTWH(0, modifierHeight, this.width, this.height - modifierHeight))
        this.textWidth = controllerWidth
        this.textHeight = modifierHeight
        break
      case EntityShapeType.Table:
        //this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
        break
      case EntityShapeType.Rectangle:
      default:
        this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
        // this.path.addRectangle(Rectangle.makeLTWH(0, 20, this.width + 20, this.height))
        break
    }
  }
}
