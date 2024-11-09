/* eslint-disable max-params */
import {
  Color,
  Colors,
  EngineUtils,
  Font,
  FontSlant,
  FontStyle,
  FontUtils,
  FontWeight,
  FontWidth,
  Graphics,
  Paint,
  Path,
  TextStyle,
} from '@ratel-web/engine'
import { CommonUtils } from '../../Utils'

export class TextCursor {
  private _linePaint: Paint
  private _pathPaint: Paint
  private _left: number
  private _top: number
  private _bottom: number
  private _path: Path
  private _interval = 2

  public constructor(lineColor: Color, pathColor: Color, left: number, top: number, bottom: number, interval: number) {
    this._linePaint = new Paint()
    this._linePaint.setColor(lineColor)
    this._pathPaint = new Paint()
    this._pathPaint.setColor(pathColor)
    this._left = left
    this._top = top
    this._bottom = bottom
    this._interval = interval
    this._path = new Path()
  }

  public set interval(value: number) {
    this._interval = value
  }

  public get interval() {
    return this._interval
  }

  public get path() {
    return this._path
  }

  public place(left: number, top: number, bottom: number) {
    this._left = left
    this._top = top
    this._bottom = bottom
    this._path.reset()
  }

  public renderBefore(graphics: Graphics) {
    if (this._path) {
      graphics.drawPath(this._path, this._pathPaint)
    }
  }

  public renderAfter(graphics: Graphics) {
    if (Math.floor(Date.now() / this._interval) & 1) {
      graphics.drawLine(this._left, this._top, this._left, this._bottom, this._linePaint)
    }
  }
}

export class Style {
  private _length: number
  private _typeFaceName: string
  private _size: number
  private _color: Color
  private _bold: boolean
  private _italic: boolean
  private _underline: boolean
  private _font: Font

  public constructor(
    length: number = 0,
    typeFaceName: string = EngineUtils.FONT_NAME_DEFAULT,
    size: number = EngineUtils.FONT_SIZE_DEFAULT,
    color: Color = Colors.Black,
    bold: boolean = false,
    italic: boolean = false,
    underline: boolean = false,
  ) {
    this._length = length
    this._typeFaceName = typeFaceName
    this._size = size
    this._color = color
    this._bold = bold
    this._italic = italic
    this._underline = underline
    this._font = new Font(typeFaceName)
    this._font.embolden = bold
    this._font.fontSize = size
  }

  public get font() {
    return this._font
  }

  public get length() {
    return this._length
  }

  public set length(value: number) {
    this._length = value
  }

  public get typeFaceName() {
    return this._typeFaceName
  }

  public set typeFaceName(value: string) {
    this._typeFaceName = value
    this._font = new Font(value)
    this._font.embolden = this.bold
    this._font.fontSize = this.size
  }

  public get size() {
    return this._size
  }

  public set size(value: number) {
    this._size = value
    this._font.fontSize = value
  }

  public get color() {
    return this._color
  }

  public set color(value: Color) {
    this._color = value
  }

  public get bold() {
    return this._bold
  }

  public set bold(value: boolean) {
    this._bold = value
    this._font.embolden = value
  }

  public get italic() {
    return this._italic
  }

  public set italic(value: boolean) {
    this._italic = value
  }

  public get underline() {
    return this._underline
  }

  public set underline(value: boolean) {
    this._underline = value
  }

  public clone(): Style {
    return new Style(this.length, this.typeFaceName, this.size, this.color, this.bold, this.italic, this.underline)
  }

  public get typeface() {
    return FontUtils.getTypeFace(this.typeFaceName)
  }

  public isSameStyle(style: Style): boolean {
    if (
      this.typeFaceName === style.typeFaceName &&
      this.size === style.size &&
      this.color.equals(style.color) &&
      this.bold === style.bold &&
      this.italic === style.italic &&
      this.underline === style.underline
    ) {
      return true
    }
    return false
  }

  public makeStyleInfo() {
    let colorValue = CommonUtils.generateColorString(this.color)
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return new StyleInfo(this.length, this.typeFaceName, this.size, colorValue, this.bold, this.italic, this.underline)
  }

  public static makeStyleInfos(styles: Style[]): StyleInfo[] {
    let styleInfos: StyleInfo[] = []
    styles.forEach((style) => {
      let styleInfo = style.makeStyleInfo()
      styleInfos.push(styleInfo)
    })
    return styleInfos
  }

  public makeTextStyle() {
    let textStyle = new TextStyle({
      fontFamilies: [this.typeFaceName],
      fontSize: this.size,
      fontStyle: new FontStyle({
        weight: this.bold ? FontWeight.BOLD : FontWeight.NORMAL,
        width: FontWidth.NORMAL,
        slant: this.italic ? FontSlant.ITALIC : FontSlant.UP_RIGHT,
      }),
      //decoration: this.underline ? 2 : 3
    })
    return textStyle
  }

  public mergeFrom(src: Style) {
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

    if (this.bold !== src.bold) {
      this.bold = src.bold
      layoutChanged = true
    }
    if (this.italic !== src.italic) {
      this.italic = src.italic
      layoutChanged = true
    }
    if (this.underline !== src.underline) {
      this.underline = src.underline
      layoutChanged = true
    }

    return layoutChanged
  }
}

export class StyleInfo {
  public constructor(
    public length: number = 0,
    public typeFaceName: string = EngineUtils.FONT_NAME_DEFAULT,
    public size: number = EngineUtils.FONT_SIZE_DEFAULT,
    public color: string = '',
    public bold: boolean = false,
    public italic: boolean = false,
    public underline: boolean = false,
  ) {}

  public makeStyle() {
    let color = CommonUtils.parseColorString(this.color)
    if (!color) {
      color = Colors.Black
    }
    return new Style(this.length, this.typeFaceName, this.size, color, this.bold, this.italic, this.underline)
  }

  public static makeStyles(styleInfos: StyleInfo[]): Style[] {
    let styles: Style[] = []
    styleInfos.forEach((styleInfo) => {
      let style = styleInfo.makeStyle()
      styles.push(style)
    })
    return styles
  }
}
