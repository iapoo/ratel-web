/* eslint-disable no-useless-constructor */
/* eslint-disable @typescript-eslint/no-parameter-properties */
/* eslint-disable max-params */
import { Engine, } from './Engine'
import { EngineUtils, } from './EngineUtils'
import { Color, Colors, Graphics, Paint, Path, TextStyle, } from './Graphics'

export class CursorMaker {
    private _linePaint: Paint
    private _pathPaint: Paint
    private _x: number
    private _top: number
    private _bottom: number
    private _path: Path | undefined
    private _interval = 2

    public constructor (lineColor: Color, pathColor: Color, x: number, top: number, bottom: number, interval: number) {
      this._linePaint = new Paint()
      this._linePaint.setColor(lineColor)
      this._pathPaint = new Paint()
      this._pathPaint.setColor(pathColor)
      this._x = x
      this._top = top
      this._bottom = bottom
      this._interval = interval
    }

    /**
     * mill seconds to blink
     */
    public set interval (value: number) {
      this._interval = value
    }

    public get interval () {
      return this._interval
    }

    public get path () {
      return this._path
    }

    public set path (value: Path | undefined) {
      this._path = value
    }

    public place (x: number, top: number, bottom: number) {
      this._x = x
      this._top = top
      this._bottom = bottom
      this._path = null
    }

    public renderBefore (graphics: Graphics) {
      if (this._path) {
        graphics.drawPath(this._path, this._pathPaint)
      }
    }

    public renderAfter (graphics: Graphics) {
      if (!this._path && (Math.floor(Date.now() / this._interval) & 1)) {
        graphics.drawLine(this._x, this._top, this._x, this._bottom, this._linePaint)
      }
    }
}

export class MouseMaker {
    private _startX = 0
    private _startY = 0
    private _currentX = 0
    private _currentY = 0
    private _active = false

    public get active () {
      return this._active
    }

    public down (x: number, y: number) {
      this._startX = this._currentX = x
      this._startY = this._currentY = y
      this._active = true
    }

    public move (x: number, y: number) {

    }

    public up (x: number, y: number) {

    }

    public getPosition (dx: number, dy: number) {
      return [ this._startX + dx, this._startY + dy, this._currentX + dx, this._currentY + dy, ]
    }
}

export class Block {
    private _textStyle : TextStyle

    public constructor (public typefaceName: string, public length: number, public size: number, public fakeBold: boolean = false, public fakeItalic: boolean = false) {
      this._textStyle = new TextStyle({
        fontFamilies: [ typefaceName, ],
        fontSize: size,
      })
    }

    public get textStyle () {
      return this._textStyle
    }

    public get typeface () {
      return Engine.getTypeFace(this.typefaceName)!
    }
}

export class Style {
  public constructor (public length: number = 0, public typeFaceName: string = EngineUtils.FONT_NAME_DEFAULT, public size: number = EngineUtils.FONT_SIZE_DEFAULT, public color: Color = Colors.Black, public bold: boolean = false, public italic: boolean = false, public underline: boolean = false) {

  }

  public clone (): Style {
    return new Style(this.length, this.typeFaceName, this.size, this.color, this.bold, this.italic, this.underline)
  }

  public get typeface () {
    return Engine.getTypeFace(this.typeFaceName)
  }

  public mergeFrom (src: Style) {
    let layoutChanged = false

    if (src.typeFaceName && this.typeFaceName !== src.typeFaceName) {
      this.typeFaceName = src.typeFaceName
      layoutChanged = true
    }
    if (this.size !== src.size) {
      this.size = src.size
      layoutChanged = true
    }
    if (!this.color.equals(src.color)) {
      this.color = src.color
      layoutChanged = true
    }

    if (this.bold != src.bold) {
      this.bold = src.bold
      layoutChanged = true
    }
    if (this.italic != src.italic) {
      this.italic = src.italic
      layoutChanged = true
    }
    if (this.underline != src.underline) {
      this.underline = src.underline
      layoutChanged = true
    }

    return layoutChanged
  }
}
