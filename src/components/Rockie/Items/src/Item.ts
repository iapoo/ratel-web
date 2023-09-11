/* eslint-disable max-params */
import { Colors, PaintStyle, Rectangle, Point2, Rotation, Rectangle2D, } from './../../../Engine'
import { Connector, } from './Connector'
import { EntityShape, } from '../../Shapes'
import { EditorItem, } from '../../Editor'
import { ShapeTypes } from './ShapeEntity';

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

  private _stype = ''

  private _items: Array<EditorItem> = new Array<EditorItem>(0);

  private _modifiable = false

  private _modifier = 0

  public constructor (left: number, top: number, width: number, height: number) {
    this._boundary = Rectangle.makeLTWH(left, top, width, height)
    this._shape = new EntityShape('', left, top, width, height)
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

  public get modifiable(): boolean {
    return this._modifiable
  }

  public set modifiable(value: boolean) {
    this._modifiable = value
  }


  public get modifier(): number {
    return this._modifier
  }

  public set modifier(value: number) {
    if(value < 0) {
      this._modifier = 0
    } else if(value > 1) {
      this._modifier = 1
    } else {
      this._modifier = value
    }
    this._shape.modifier = this._modifier
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
    return this._stype
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
      this._stype = value
    }
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

  public saveData (data: any) {
    data.type = this.type
    data.text = this.text
    data.left = this.left
    data.top = this.top
    data.width = this.width
    data.height = this.height
    data.rotation = {}
    data.rotation.radius = this.rotation.radius
    data.rotation.px = this.rotation.px
    data.rotation.py = this.rotation.py
    data.items = []
    this.items.forEach(child => {
      const itemData = {}
      const item = child as Item
      item.saveData(itemData)
      data.items.push(itemData)
    })
    this.save(data)
  }

  public loadData (data: any) {
    this.boundary = Rectangle.makeLTWH(data.left, data.top, data.width, data.height)
    this.text = data.text
    this.type = data.type
    this.rotation = data.rotation
    // this.items
  }

  private updateItemsBoundary (oldBoundary: Rectangle, newBoundary: Rectangle) {
    const widthZoom = newBoundary.width / oldBoundary.width
    const heightZoom = newBoundary.height / oldBoundary.height
    this.items.forEach(item => {
      item.boundary = Rectangle.makeLTWH(item.left * widthZoom, item.top * heightZoom, item.width * widthZoom, item.height * heightZoom)
    })
  }



  public abstract get types(): Type[]

  public abstract get category(): string;

  protected abstract save(data: any): void

  protected abstract load(data: any): void
}
