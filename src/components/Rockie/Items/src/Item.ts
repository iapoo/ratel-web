/* eslint-disable max-params */
import { Color, Colors, FontWeight, FontWidth, FontSlant, Paint, PaintStyle, Rectangle, Rotation, StrokeDashStyle, } from './../../../Engine'
import { Connector, } from './Connector'
import { EntityShape, } from '../../Shapes'
import { Editor, } from '../../Editor'
import { SystemUtils } from '@/components/Workspace/Utils';
import { EditorItemInfo } from './EditorItemInfo';
import { EditorItem } from './EditorItem';
import { ThemeUtils } from '@/components/Workspace/Theme';

export interface Type {
  name: string;
  description: string;
}

export class Categories {
  public static CONNECTOR = 'Connector'
  public static LINE = 'Line'
  public static SHAPE = 'Shape'
  public static TABLE = 'Table'
}

export abstract class Item implements EditorItem {
  public static MIN_WIDTH = 24;

  public static MIN_HEIGHT = 24;

  public static DEFAULT_LINE_WIDTH = 1;

  public static DEFAULT_STROKE_MODE = PaintStyle.STROKE;

  public static DEFAULT_STROKE_COLOR = Colors.Black;

  public static DEFAULT_FILL_MODE = PaintStyle.FILL;

  public static DEFAULT_FILL_COLOR = Colors.White;

  public static DEFAULT_TEXT = '';

  public static DEFAULT_FONT_SIZE = 14;

  protected _shape: EntityShape;

  private _boundary: Rectangle;

  private _rotation: Rotation = new Rotation(0, 0, 0);

  private _connectors: Connector[] = [];

  private _type = ''

  private _items: Array<EditorItem> = new Array<EditorItem>(0);

  private _id: string = SystemUtils.generateID()

  private _strokeColor: Color = Colors.Black

  private _fillColor: Color = Colors.White

  private _useTheme: boolean = false

  private _lineWidth: number = 1

  private _fontName: string = ''

  private _fontSize: number = 14

  private _fontColor: Color = Colors.AliceBlue

  private _fontWeight: FontWeight = FontWeight.NORMAL

  private _fontWidth: FontWidth = FontWidth.NORMAL

  private _fontSlant: FontSlant = FontSlant.UP_RIGHT

  private _textAlignment: number = 1

  private _textDirection: number = 1

  private _textWrap: boolean = true

  private _multipleLines: boolean = true

  private _filled: boolean = true

  private _stroked: boolean = true

  private _strokeDashStyle: StrokeDashStyle = StrokeDashStyle.SOLID

  public constructor (left: number, top: number, width: number, height: number) {
    this._boundary = Rectangle.makeLTWH(left, top, width, height)
    this._shape = new EntityShape('', left, top, width, height)
    this.initializeTheme()
  }

  public get id(): string {
    return this._id
  }

  public set id(value: string) {
    this._id = value
  }
  
  public get minWidth (): number {
    return Item.MIN_WIDTH
  }

  public get minHeight (): number {
    return Item.MIN_HEIGHT
  }

  public get rotation (): Rotation {
    return this._rotation
  }

  public set rotation (value: Rotation) {
    this._rotation = value
    this._shape.rotation = value
  }

  public get shape (): EntityShape {
    return this._shape
  }

  public get width (): number {
    return this._boundary.width
  }

  public get height (): number {
    return this._boundary.height
  }

  public get left (): number {
    return this._boundary.left
  }

  public get top (): number {
    return this._boundary.top
  }

  public get right (): number {
    return this._boundary.left + this.boundary.width
  }

  public get bottom (): number {
    return this._boundary.top + this.boundary.height
  }

  public get boundary (): Rectangle {
    return this._boundary
  }

  public set boundary (value: Rectangle) {
    const oldBoundary = this._boundary
    this._boundary = value
    this._shape.boundary = value
    this.updateItemsBoundary(oldBoundary, value)
  }

  public get text (): string {
    return this._shape.text
  }

  public set text (value: string) {
    this._shape.text = value
  }

  public get type (): string {
    return this._type
  }

  public set type (value: string) {
    const shapeTypes = this.types
    let index = -1
    shapeTypes.forEach((shapeType, shapeTypeIndex) => {
      if (value === shapeType.name) {
        index = shapeTypeIndex
      }
    })
    if (index >= 0) {
      this._type = value
    }
  }

  public get useTheme(): boolean {
    return this._useTheme
  }

  public set useTheme(value: boolean) {
    this._useTheme = value
    this.updateTheme()
  }

  public get strokeColor(): Color  {
    return this._strokeColor
  }

  public set strokeColor(value: Color ) {
    this._strokeColor = value
    this.updateTheme()
  }

  public get fillColor(): Color {
    return this._fillColor
  }

  public set fillColor(value: Color ) {
    this._fillColor = value
    this.updateTheme()
  }

  public get filled() {
    return this._filled
  }

  public set filled(value: boolean) {
    this._filled = value
    this.updateTheme()
  }

  public get stroked() {
    return this._stroked
  }

  public set stroked(value: boolean) {
    this._stroked = value
    this.updateTheme
  }
  public get lineWidth() {
    return this._lineWidth
  }

  public set lineWidth(value: number) {
    this._lineWidth = value
    this.updateTheme()
  }

  public get fontName() {
    return this._fontName
  }

  public set fontName(value: string) {
    this._fontName = value
    this.updateTheme()
  }

  public get fontColor() {
    return this._fontColor
  }

  public set fontColor(value: Color) {
    this._fontColor = value
    this.updateTheme()
  }

  public get fontWeight() {
    return this._fontWeight
  }

  public set fontWeight(value: FontWeight) {
    this._fontWeight = value
    this.updateTheme()
  }

  public get fontWidth() {
    return this._fontWidth
  }

  public set fontWidth(value: FontWidth) {
    this._fontWidth = value
    this.updateTheme()
  }

  public get fontSlant() {
    return this._fontSlant
  }

  public set fontSlant(value: FontSlant) {
    this._fontSlant = value
    this.updateTheme()
  }

  public get fontSize() {
    return this._fontSize
  }

  public set fontSize(value: number) {
    this._fontSize = value
    this.updateTheme()
  }

  public get textAlignment() {
    return this._textAlignment
  }

  public set textAlignment(value: number) {
    this._textAlignment = value
    this.updateTheme()
  }

  public get textDirection() {
    return this._textDirection
  }

  public set textDirection(value: number) {
    this._textDirection = value
    this.updateTheme()
  }

  public get textWrap() {
    return this._textWrap
  }

  public set textWrap(value: boolean) {
    this._textWrap = value
    this.updateTheme()
  }

  public get multipleLines() {
    return this._multipleLines
  }

  public set multipleLines(value: boolean) {
    this._multipleLines = value
    this.updateTheme()
  }

  public get strokeDashStyle() {
    return this._strokeDashStyle
  }

  public set strokeDashStyle(value: StrokeDashStyle) {
    this._strokeDashStyle = value
    this.updateTheme()
  }

  public updateTheme() {
    if(this._useTheme) {
      this._shape.stroke.setColor(ThemeUtils.strokeColor)
      this._shape.fill.setColor(ThemeUtils.fillColor)
      this._shape.stroke.setStrokeWidth(ThemeUtils.lineWidth)
      this._shape.stroke.setStrokeDashStyle(ThemeUtils.strokeDashStyle)
      //this._shape.font.fontSize = ThemeUtils.fontSize
      //this._shape.fontPaint.setColor(ThemeUtils.fontColor)
      this._shape.fontColor = ThemeUtils.fontColor
      this._shape.fontSize = ThemeUtils.fontSize
      this._shape.filled = ThemeUtils.filled
      this._shape.stroked = ThemeUtils.stroked
    } else {
      this._shape.stroke.setColor(this._strokeColor)
      this._shape.fill.setColor(this._fillColor)    
      this._shape.stroke.setStrokeWidth(this._lineWidth)
      this._shape.stroke.setStrokeDashStyle(this._strokeDashStyle)
      //this._shape.font.fontSize = this._fontSize
      this._shape.fontColor = this._fontColor
      this._shape.fontSize = this._fontSize
      this._shape.filled = this._filled
      this._shape.stroked = this._stroked
      //this._shape.fontPaint.setColor(this._fontColor)
    }
  }

  public initializeTheme() {
    this.fillColor = ThemeUtils.fillColor
    this.strokeColor = ThemeUtils.strokeColor
    this.lineWidth = ThemeUtils.lineWidth
    this.fontSize = ThemeUtils.fontSize
    this.fontColor = ThemeUtils.fontColor
    this.strokeDashStyle = ThemeUtils.strokeDashStyle
    this.updateTheme()
}

  public get items (): EditorItem[] {
    return this._items
  }

  public addItem (item: EditorItem) {
    // console.log(item)

    if (item && this._items.indexOf(item) < 0) {
      this._items.push(item)
      this.shape.addNode(item.shape)
    }
  }

  public removeItem (item: EditorItem) {
    const index = this._items.indexOf(item)
    if (index >= 0) {
      this._items.splice(index, 1)
      this.shape.removeNode(item.shape)
    }
  }

  public removeItemAt (index : number) {
    if (index >= 0 && index < this._items.length) {
      this._items.splice(index, 1)
      this.shape.removeNodeAt(index)
    }
  }

  public removeAllItems () {
    this.items.length = 0
    this.shape.clear()
  }

  public addConnector (connector: Connector) {
    const index = this._connectors.indexOf(connector)
    if (index < 0) {
      this._connectors.push(connector)
    }
  }

  public removeConnector (connector: Connector) {
    const index = this._connectors.indexOf(connector)
    if (index >= 0) {
      this._connectors.splice(index, 1)
    }
  }

  public getConnector (index: number): Connector {
    return this._connectors[index]
  }

  public removeConnectorAt (index: number) {
    this._connectors.splice(index, 1)
  }

  public removeAllConnectors () {
    this._connectors.length = 0
  }

  public getAllConnectors (): Connector[] {
    return [ ...this._connectors, ]
  }

  public getConnectorCount (): number {
    return this._connectors.length
  }

  public hasConnector (connector: Connector): boolean {
    return this._connectors.includes(connector)
  }

  public getIndexOfConnector (connector: Connector): number {
    return this._connectors.indexOf(connector)
  }

  public saveData (): EditorItemInfo {
    let data = new EditorItemInfo()
    data.type = this.type
    data.text = this.text
    data.left = this.left
    data.top = this.top
    data.width = this.width
    data.height = this.height
    //data.rotation = {}
    //data.rotation.radius = this.rotation.radius
    //data.rotation.px = this.rotation.px
    //data.rotation.py = this.rotation.py
    data.items = []
    this.items.forEach(child => {
      const itemData = {}
      const item = child as Item
      //item.saveData(itemData)
     // data.items.push(itemData)
    })
    this.save(data)
    return data
  }

  public loadData (data: EditorItemInfo, editor: Editor) {
    this.boundary = Rectangle.makeLTWH(data.left, data.top, data.width, data.height)
    this.text = data.text
    this.type = data.type
    //this.rotation = data.rotation
    // this.items
  }

  
  private updateItemsBoundary (oldBoundary: Rectangle, newBoundary: Rectangle) {
    const widthZoom = newBoundary.width / oldBoundary.width
    const heightZoom = newBoundary.height / oldBoundary.height
    this.items.forEach(item => {
      item.boundary = Rectangle.makeLTWH(item.left * widthZoom, item.top * heightZoom, item.width * widthZoom, item.height * heightZoom)
    })
  }

  //public abstract clone(): EditorItem

  public abstract get types(): Type[]

  public abstract get category(): string;

  protected abstract save(): EditorItemInfo

  protected abstract load(data: EditorItemInfo, editor: Editor): void
}
