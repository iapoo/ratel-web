/* eslint-disable max-params */
import { Color, Colors, FontWeight, FontWidth, FontSlant, Paint, PaintStyle, Rectangle, Rotation, StrokeDashStyle, TextDecoration, TextAlignment, TextDirection, TextVerticalAlignment, MatrixHelper, Matrix, EngineUtils, } from './../../../Engine'
import { Connector, } from './Connector'
import { EntityShape, } from '../../Shapes'
import { Editor, } from '../../Editor'
import { SystemUtils } from '@/components/Workspace/Utils'
import { EditorItemInfo } from './EditorItemInfo'
import { EditorItem } from './EditorItem'
import { DocumentThemes, ThemeUtils } from '@/components/Rockie/Theme'

export interface Type {
  name: string
  description: string
}

export class Categories {
  public static CONNECTOR = 'Connector'
  public static LINE = 'Line'
  public static SHAPE = 'Shape'
  public static CONTAINER = 'Container'
  public static TABLE = 'Table'
  public static FRAME = 'Frame'
  public static GROUP = 'Group'
  public static CUSTOM_SHAPE = 'CustomShape'
  public static CUSTOM_SVG_SHAPE = 'CustomSvgShape'
  public static CUSTOM_IMAGE_SHAPE = 'CustomImageShape'
  public static CUSTOM_TABLE = 'CustomTable'
  public static EXTENDED_CONTAINER = 'ExtendedContainer'
  public static EXTENDED_SHAPE = 'ExtendedShape'
  public static CUSTOM_CONNECTOR = 'CustomConnector'
  public static CUSTOM_CONTAINER = 'CustomContainer'
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

  protected _shape: EntityShape

  private _boundary: Rectangle

  private _rotation: Rotation = new Rotation(0, 0, 0);

  private _sourceConnectors: Connector[] = [];

  private _targetConnectors: Connector[] = [];

  private _type = ''

  private _items: Array<EditorItem> = new Array<EditorItem>(0);

  private _id: string = SystemUtils.generateID()

  private _strokeColor: Color = Colors.Black

  private _fillColor: Color = Colors.White

  private _useTheme: boolean = true

  private _themeName: string = DocumentThemes.TYPE_DEFAULT

  private _lineWidth: number = 1

  private _fontName: string = EngineUtils.FONT_NAME_DEFAULT

  private _fontSize: number = 14

  private _fontColor: Color = Colors.AliceBlue

  private _fontWeight: FontWeight = FontWeight.NORMAL

  private _fontWidth: FontWidth = FontWidth.NORMAL

  private _fontSlant: FontSlant = FontSlant.UP_RIGHT

  private _textAlignment: TextAlignment = TextAlignment.LEFT

  private _textDirection: TextDirection = TextDirection.LTR

  private _textDecoration: TextDecoration = TextDecoration.NONE

  private _textVerticalAlignment: TextVerticalAlignment = TextVerticalAlignment.MIDDLE

  private _textWrap: boolean = true

  private _multipleLines: boolean = true

  private _filled: boolean = true

  private _stroked: boolean = true

  private _strokeDashStyle: StrokeDashStyle = StrokeDashStyle.SOLID

  private _parent: Item | undefined = undefined

  private _locked: boolean = false
  private _secondStrokeColor: Color = Colors.Black
  private _secondFillColor: Color = Colors.White
  private _thirdStrokeColor: Color = Colors.Black
  private _thirdFillColor: Color = Colors.White
  private _fourthStrokeColor: Color = Colors.Black
  private _fourthFillColor: Color = Colors.White

  public constructor(left: number, top: number, width: number, height: number) {
    this._boundary = Rectangle.makeLTWH(left, top, width, height)
    this._shape = new EntityShape('', left, top, width, height)
    this.initializeTheme()
  }

  public get isContainer(): boolean {
    return false
  }

  public get parent() {
    return this._parent
  }

  public get id(): string {
    return this._id
  }

  public set id(value: string) {
    this._id = value
  }

  public get locked() {
    return this._locked
  }

  public set locked(value: boolean) {
    this._locked = value
  }

  public get minWidth(): number {
    return Item.MIN_WIDTH
  }

  public get minHeight(): number {
    return Item.MIN_HEIGHT
  }

  public get rotation(): Rotation {
    return this._rotation
  }

  public set rotation(value: Rotation) {
    this._rotation = value
    this._shape.rotation = value
  }

  public get shape(): EntityShape {
    return this._shape
  }

  public get width(): number {
    return this._boundary.width
  }

  public get height(): number {
    return this._boundary.height
  }

  public get left(): number {
    return this._boundary.left
  }

  public get top(): number {
    return this._boundary.top
  }

  public get right(): number {
    return this._boundary.left + this.boundary.width
  }

  public get bottom(): number {
    return this._boundary.top + this.boundary.height
  }

  public get boundary(): Rectangle {
    return this._boundary
  }

  public set boundary(value: Rectangle) {
    //const oldBoundary = this._boundary
    this._boundary = value
    this._shape.boundary = value
    //this.updateItemsBoundary(oldBoundary, value)
  }

  public get text(): string {
    return this._shape.text
  }

  public set text(value: string) {
    this._shape.text = value
  }

  public get type(): string {
    return this._type
  }

  public set type(value: string) {
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

  public get themeName(): string {
    return this._themeName
  }

  public set themeName(value: string) {
    this._themeName = value
    this._useTheme = true
    this.updateTheme()
  }

  public get strokeColor(): Color {
    return this._strokeColor
  }

  public set strokeColor(value: Color) {
    this._strokeColor = value
    this.updateTheme()
  }

  public get fillColor(): Color {
    return this._fillColor
  }

  public set fillColor(value: Color) {
    this._fillColor = value
    this.updateTheme()
  }

  public get secondStrokeColor(): Color {
    return this._secondStrokeColor
  }

  public set secondStrokeColor(value: Color) {
    this._secondStrokeColor = value
    this.shape.secondStroke.setColor(value)
  }

  public get secondFillColor(): Color {
    return this._secondFillColor
  }

  public set secondFillColor(value: Color) {
    this._secondFillColor = value
    this.shape.secondFill.setColor(value)
  }

  public get thirdStrokeColor(): Color {
    return this._thirdStrokeColor
  }

  public set thirdStrokeColor(value: Color) {
    this._thirdStrokeColor = value
    this.shape.thirdStroke.setColor(value)
  }

  public get thirdFillColor(): Color {
    return this._thirdFillColor
  }

  public set thirdFillColor(value: Color) {
    this._thirdFillColor = value
    this.shape.thirdFill.setColor(value)
  }

  public get fourthStrokeColor(): Color {
    return this._fourthStrokeColor
  }

  public set fourthStrokeColor(value: Color) {
    this._fourthStrokeColor = value
    this.shape.fourthStroke.setColor(value)
  }

  public get fourthFillColor(): Color {
    return this._fourthFillColor
  }

  public set fourthFillColor(value: Color) {
    this._fourthFillColor = value
    this.shape.fourthFill.setColor(value)
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
    this.updateTheme()
  }
  public get lineWidth() {
    return this._lineWidth
  }

  public set lineWidth(value: number) {
    this._lineWidth = value
    this._shape.stroke.setStrokeWidth(value)
    //this.updateTheme()
  }

  public get fontName() {
    this._fontName = this._shape.fontName
    return this._fontName
  }

  public set fontName(value: string) {
    this._fontName = value
    //this.updateTheme()
    this._shape.fontName = value
  }

  public get fontColor() {
    this._fontColor = this._shape.fontColor
    return this._shape.fontColor
  }

  public set fontColor(value: Color) {
    this._fontColor = value
    //this.updateTheme()
    this._shape.fontColor = value
  }

  public get fontWeight() {
    this._fontWeight = this._shape.fontWeight
    return this._shape.fontWeight
  }

  public set fontWeight(value: FontWeight) {
    this._fontWeight = value
    //this.updateTheme()
    this._shape.fontWeight = value
  }

  public get fontWidth() {
    return this._fontWidth
  }

  public set fontWidth(value: FontWidth) {
    this._fontWidth = value
    //this._shape.fontWidth = value
    this.updateTheme()
  }

  public get fontSlant() {
    this._fontSlant = this._shape.fontSlant
    return this._shape.fontSlant
  }

  public set fontSlant(value: FontSlant) {
    this._fontSlant = value
    //this.updateTheme()
    this._shape.fontSlant = value
  }

  public get fontSize() {
    this._fontSize = this._shape.fontSize
    return this._shape.fontSize
  }

  public set fontSize(value: number) {
    this._fontSize = value
    //this.updateTheme()
    this._shape.fontSize = value
  }

  public get textAlignment() {
    this._textAlignment = this._shape.textAlignment
    return this._shape.textAlignment
  }

  public set textAlignment(value: TextAlignment) {
    this._textAlignment = value
    //this.updateTheme()
    this._shape.textAlignment = value
  }

  public get textDirection() {
    return this._textDirection
  }

  public set textDirection(value: TextDirection) {
    this._textDirection = value
    this.updateTheme()
  }

  public get textDecoration() {
    this._textDecoration = this._shape.textDecoration
    return this._shape.textDecoration
  }

  public set textDecoration(value: TextDecoration) {
    this._textDecoration = value
    //this.updateTheme()
    this._shape.textDecoration = value
  }

  public get textVerticalAlignment() {
    return this._textVerticalAlignment
  }

  public set textVerticalAlignment(value: TextVerticalAlignment) {
    this._textVerticalAlignment = value
    //this.updateTheme()
    this._shape.textVerticalAlignment = value
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
    // this.updateTheme()
    this._shape.stroke.setStrokeDashStyle(value)
  }

  public updateTheme() {
    if (this._useTheme) {
      if (this.category == Categories.CONNECTOR) {
        this._shape.stroke.setColor(ThemeUtils.getConnectorStrokeColor(this._themeName))
        this._shape.fill.setColor(ThemeUtils.getConnectorFillColor(this._themeName))
        this._shape.fontColor = ThemeUtils.getConnectorFontColor(this._themeName)
        this._strokeColor = ThemeUtils.getConnectorStrokeColor(this._themeName)
        this._fillColor = ThemeUtils.getConnectorFillColor(this._themeName)
        this._fontColor = ThemeUtils.getConnectorFontColor(this._themeName)
      } else {
        this._shape.stroke.setColor(ThemeUtils.getShapeStrokeColor(this._themeName))
        this._shape.fill.setColor(ThemeUtils.getShapeFillColor(this._themeName))
        this._shape.fontColor = ThemeUtils.getShapeFontColor(this._themeName)
        this._strokeColor = ThemeUtils.getShapeStrokeColor(this._themeName)
        this._fillColor = ThemeUtils.getShapeFillColor(this._themeName)
        this._fontColor = ThemeUtils.getShapeFontColor(this._themeName)
      }
      // this._shape.stroke.setStrokeWidth(ThemeUtils.lineWidth)
      // this._shape.stroke.setStrokeDashStyle(ThemeUtils.strokeDashStyle)
      //this._shape.fontColor = ThemeUtils.fontColor
      //this._shape.fontSize = ThemeUtils.fontSize
      // if(this.category == Categories.CUSTOM_SVG_SHAPE || this.category == Categories.CUSTOM_IMAGE_SHAPE) {
      // } else {
      //   this._shape.filled = ThemeUtils.filled
      //   this._shape.stroked = ThemeUtils.stroked
      // }
      this._shape.filled = this._filled
      this._shape.stroked = this._stroked
      //this._shape.fontWeight = ThemeUtils.fontWeight
      //this._shape.fontSlant = ThemeUtils.fontSlant
      //this._shape.textDecoration = ThemeUtils.textDecoration
      //this._shape.textAlignment = ThemeUtils.textAlignment
      //this._shape.textVerticalAlignment = ThemeUtils.textVerticalAlignment
    } else {
      this._shape.stroke.setColor(this._strokeColor)
      this._shape.fill.setColor(this._fillColor)
      // this._shape.stroke.setStrokeWidth(this._lineWidth)
      // this._shape.stroke.setStrokeDashStyle(this._strokeDashStyle)
      this._shape.fontColor = this._fontColor
      //this._shape.fontSize = this._fontSize
      this._shape.filled = this._filled
      this._shape.stroked = this._stroked
      //this._shape.fontWeight = this._fontWeight
      //this._shape.fontSlant = this._fontSlant
      //this._shape.textDecoration = this._textDecoration
      //this._shape.textAlignment = this._textAlignment
      //this._shape.textVerticalAlignment = this._textVerticalAlignment
    }
    // Direct update of shape stroke or fill may not cause shape update. Here force it
    this._shape.markDirty()
  }

  public initializeTheme() {
    if (this.category == Categories.CONNECTOR) {
      this.strokeColor = ThemeUtils.getConnectorStrokeColor(this._themeName)
      this.fillColor = ThemeUtils.getConnectorFillColor(this._themeName)
    } else {
      this.strokeColor = ThemeUtils.getShapeStrokeColor(this._themeName)
      this.fillColor = ThemeUtils.getShapeFillColor(this._themeName)
    }
    this.lineWidth = ThemeUtils.lineWidth
    this.fontSize = ThemeUtils.fontSize
    this.fontColor = ThemeUtils.fontColor
    this.strokeDashStyle = ThemeUtils.strokeDashStyle
    this.fontWeight = ThemeUtils.fontWeight
    this.fontSlant = ThemeUtils.fontSlant
    this.textDecoration = ThemeUtils.textDecoration
    this.textAlignment = ThemeUtils.textAlignment
    this.textVerticalAlignment = ThemeUtils.textVerticalAlignment
    this.updateTheme()
  }

  public get items(): EditorItem[] {
    return this._items
  }

  public get worldTransform() {
    const worldTransform = new Matrix()
    if (this.parent) {
      worldTransform.multiply(this.parent.worldTransform.source)
    }
    worldTransform.multiply(this.internalTransform.source)
    return worldTransform
  }

  public get worldInverseTransform() {
    const worldTransform = new Matrix()
    if (this.parent) {
      worldTransform.multiply(this.parent.worldTransform.source)
    }
    return worldTransform.invert()
  }

  public get internalTransform() {
    return this._shape.internalTransform
  }

  public addItem(item: EditorItem) {
    const editorItem = item as Item
    if (editorItem && this._items.indexOf(editorItem) < 0) {
      if (editorItem.parent) {
        editorItem.parent.removeItem(editorItem)
      }
      editorItem._parent = this
      this._items.push(editorItem)
      this.shape.addNode(editorItem.shape)
    }
  }

  public addItemAt(item: EditorItem, index: number) {
    const editorItem = item as Item
    if (editorItem && this._items.indexOf(editorItem) < 0) {
      if (editorItem.parent) {
        editorItem.parent.removeItem(editorItem)
      }
      editorItem._parent = this
      this._items.splice(index, 0, item)
      this.shape.addNode(editorItem.shape)
    }
  }

  public removeItem(item: EditorItem) {
    const editorItem = item as Item
    const index = this._items.indexOf(item)
    if (index >= 0) {
      editorItem._parent = undefined
      this._items.splice(index, 1)
      this.shape.removeNode(item.shape)
    }
  }

  public removeItemAt(index: number) {
    if (index >= 0 && index < this._items.length) {
      const editorItem = this._items[index] as Item
      editorItem._parent = undefined
      this._items.splice(index, 1)
      this.shape.removeNodeAt(index)
    }
  }

  public removeAllItems() {
    const count = this._items.length
    for (let i = 0; i < count; i++) {
      const item = this._items[i] as Item
      item._parent = undefined
    }
    this.items.length = 0
    this.shape.clear()
  }

  public addSourceConnector(connector: Connector) {
    const index = this._sourceConnectors.indexOf(connector)
    if (index < 0) {
      this._sourceConnectors.push(connector)
    }
  }

  public removeSourceConnector(connector: Connector) {
    const index = this._sourceConnectors.indexOf(connector)
    if (index >= 0) {
      this._sourceConnectors.splice(index, 1)
    }
  }

  public getSourceConnector(index: number): Connector {
    return this._sourceConnectors[index]
  }

  public removeSourceConnectorAt(index: number) {
    this._sourceConnectors.splice(index, 1)
  }

  public removeAllSourceConnectors() {
    this._sourceConnectors.length = 0
  }

  public getAllSourceConnectors(): Connector[] {
    return [...this._sourceConnectors,]
  }

  public getSourceConnectorCount(): number {
    return this._sourceConnectors.length
  }

  public hasSourceConnector(connector: Connector): boolean {
    return this._sourceConnectors.includes(connector)
  }

  public getIndexOfSourceConnector(connector: Connector): number {
    return this._sourceConnectors.indexOf(connector)
  }

  public addTargetConnector(connector: Connector) {
    const index = this._targetConnectors.indexOf(connector)
    if (index < 0) {
      this._targetConnectors.push(connector)
    }
  }

  public removeTargetConnector(connector: Connector) {
    const index = this._targetConnectors.indexOf(connector)
    if (index >= 0) {
      this._targetConnectors.splice(index, 1)
    }
  }

  public getTargetConnector(index: number): Connector {
    return this._targetConnectors[index]
  }

  public removeTargetConnectorAt(index: number) {
    this._targetConnectors.splice(index, 1)
  }

  public removeAllTargetConnectors() {
    this._targetConnectors.length = 0
  }

  public getAllTargetConnectors(): Connector[] {
    return [...this._targetConnectors,]
  }

  public getTargetConnectorCount(): number {
    return this._targetConnectors.length
  }

  public hasTargetConnector(connector: Connector): boolean {
    return this._targetConnectors.includes(connector)
  }

  public getIndexOfTargetConnector(connector: Connector): number {
    return this._targetConnectors.indexOf(connector)
  }

  public saveData(): EditorItemInfo {
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

  public loadData(data: EditorItemInfo, editor: Editor) {
    this.boundary = Rectangle.makeLTWH(data.left, data.top, data.width, data.height)
    this.text = data.text
    this.type = data.type
    //this.rotation = data.rotation
    // this.items
  }


  // private updateItemsBoundary (oldBoundary: Rectangle, newBoundary: Rectangle) {
  //   const widthZoom = newBoundary.width / oldBoundary.width
  //   const heightZoom = newBoundary.height / oldBoundary.height
  //   this.items.forEach(item => {
  //     item.boundary = Rectangle.makeLTWH(item.left * widthZoom, item.top * heightZoom, item.width * widthZoom, item.height * heightZoom)
  //   })
  // }

  //public abstract clone(): EditorItem

  public abstract get types(): Type[]

  public abstract get category(): string

  protected abstract save(): EditorItemInfo

  protected abstract load(data: EditorItemInfo, editor: Editor): void
}
