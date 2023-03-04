/* eslint-disable complexity */
/* eslint-disable no-useless-constructor */
/* eslint-disable @typescript-eslint/no-parameter-properties */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable no-unused-vars */
/* eslint-disable max-params */
import { MatrixHelper, Engine, } from './Engine'
import { EngineUtils, } from './EngineUtils'
import { Node, } from './Node'

export class Point2 {
  public constructor (public readonly x: number = 0, public readonly y: number = 0) {}

  public clone (): Point2 {
    return new Point2(this.x, this.y)
  }

  public equals (point: Point2): boolean {
    return point.x === this.x && point.y === this.y
  }
}

export class Point3 {
  public constructor (
    public readonly x: number,
    public readonly y: number,
    public readonly z: number
  ) {}

  public clone (): Point3 {
    return new Point3(this.x, this.y, this.z)
  }

  public equals (vector: Point3): boolean {
    return vector.x === this.x && vector.y === this.y && vector.z === this.z
  }
}

export class Rectangle {
  public static makeLTWH (left: number, top: number, width: number, height: number): Rectangle {
    return new Rectangle(left, top, left + width, top + height)
  }

  private _source: number[];

  public constructor (left: number, top: number, right: number, bottom: number) {
    this._source = [ left, top, right, bottom, ]
  }

  public get source () {
    return this._source
  }
  public get left () {
    return this._source[0]
  }

  public get top () {
    return this._source[1]
  }

  public get right () {
    return this._source[2]
  }

  public get bottom () {
    return this._source[3]
  }

  public get width () {
    return this._source[2] - this._source[0]
  }

  public get height () {
    return this._source[3] - this._source[1]
  }

  public clone (): Rectangle {
    return new Rectangle(this._source[0], this._source[1], this._source[2], this._source[3])
  }

  public equals (rectangle: Rectangle): boolean {
    return (
      rectangle._source[0] === this._source[0] &&
      rectangle._source[1] === this._source[1] &&
      rectangle._source[2] === this._source[2] &&
      rectangle._source[3] === this._source[3]
    )
  }
}

export class RoundRectangle {
  private _source: number[];
  public constructor (
    left: number,
    top: number,
    right: number,
    bottom: number,
    rx: number,
    ry: number
  ) {
    this._source = [ left, top, right, bottom, rx, ry, rx, ry, rx, ry, rx, ry, ]
  }

  public get source () {
    return this._source
  }
  public get left () {
    return this._source[0]
  }

  public get top () {
    return this._source[1]
  }

  public get right () {
    return this._source[2]
  }

  public get bottom () {
    return this._source[3]
  }

  public get width () {
    return this._source[2] - this._source[0]
  }

  public get height () {
    return this._source[3] - this._source[1]
  }

  public get radiusX () {
    return this._source[4]
  }

  public get radiusY () {
    return this._source[5]
  }

  public clone (): RoundRectangle {
    return new RoundRectangle(
      this._source[0],
      this._source[1],
      this._source[2],
      this._source[3],
      this._source[4],
      this._source[5]
    )
  }

  public equals (rectangle: RoundRectangle): boolean {
    return (
      rectangle._source[0] === this._source[0] &&
      rectangle._source[1] === this._source[1] &&
      rectangle._source[2] === this._source[2] &&
      rectangle._source[3] === this._source[3] &&
      rectangle._source[4] === this._source[4] &&
      rectangle._source[5] === this._source[5]
    )
  }
}

export class Color {
  public static makeFromRGBA (rgba: number): Color {
    const color = new Color(rgba >> 24, (rgba << 8) >> 24, (rgba << 16) >> 24, (rgba << 24) >> 24)
    return color
  }

  public static makeFromFloatArray (source: number[]): Color {
    const color = new Color(source[0] * 255, source[1] * 255, source[2] * 255, source[3] * 255)
    return color
  }

  private _source: number[];

  constructor (r: number, g: number, b: number, a: number) {
    this._source = [ (r & 0xff) / 255, (g & 0xff) / 255, (b & 0xff) / 255, (a & 0xff) / 255, ]
  }

  public get a (): number {
    return this._source[0]
  }

  public get r (): number {
    return this._source[1]
  }

  public get g (): number {
    return this._source[2]
  }

  public get b (): number {
    return this._source[3]
  }

  public get source (): number[] {
    return this._source
  }

  public equals (color: Color): boolean {
    return this.a == color.a && this.r == color.r && this.g == color.g && this.b == color.b
  }
}

export class Colors {
  public static LightPink = new Color(255, 182, 193, 255);
  public static Pink = new Color(255, 192, 203, 255);
  public static Crimson = new Color(220, 20, 60, 255);
  public static LavenderBlush = new Color(255, 240, 245, 255);
  public static PaleVioletRed = new Color(219, 112, 147, 255);
  public static HotPink = new Color(255, 105, 180, 255);
  public static DeepPink = new Color(255, 20, 147, 255);
  public static MediumVioletRed = new Color(199, 21, 133, 255);
  public static Orchid = new Color(218, 112, 214, 255);
  public static Thistle = new Color(216, 191, 216, 255);
  public static plum = new Color(221, 160, 221, 255);
  public static Violet = new Color(238, 130, 238, 255);
  public static Magenta = new Color(255, 0, 255, 255);
  public static Fuchsia = new Color(255, 0, 255, 255);
  public static DarkMagenta = new Color(139, 0, 139, 255);
  public static Purple = new Color(128, 0, 128, 255);
  public static MediumOrchid = new Color(186, 85, 211, 255);
  public static DarkVoilet = new Color(148, 0, 211, 255);
  public static DarkOrchid = new Color(153, 50, 204, 255);
  public static Indigo = new Color(75, 0, 130, 255);
  public static BlueViolet = new Color(138, 43, 226, 255);
  public static MediumPurple = new Color(147, 112, 219, 255);
  public static MediumSlateBlue = new Color(123, 104, 238, 255);
  public static SlateBlue = new Color(106, 90, 205, 255);
  public static DarkSlateBlue = new Color(72, 61, 139, 255);
  public static Lavender = new Color(230, 230, 250, 255);
  public static GhostWhite = new Color(248, 248, 255, 255);
  public static Blue = new Color(0, 0, 255, 255);
  public static MediumBlue = new Color(0, 0, 205, 255);
  public static MidnightBlue = new Color(25, 25, 112, 255);
  public static DarkBlue = new Color(0, 0, 139, 255);
  public static Navy = new Color(0, 0, 128, 255);
  public static RoyalBlue = new Color(65, 105, 225, 255);
  public static CornflowerBlue = new Color(100, 149, 237, 255);
  public static LightSteelBlue = new Color(176, 196, 222, 255);
  public static LightSlateGray = new Color(119, 136, 153, 255);
  public static SlateGray = new Color(112, 128, 144, 255);
  public static DoderBlue = new Color(30, 144, 255, 255);
  public static AliceBlue = new Color(240, 248, 255, 255);
  public static SteelBlue = new Color(70, 130, 180, 255);
  public static LightSkyBlue = new Color(135, 206, 250, 255);
  public static SkyBlue = new Color(135, 206, 235, 255);
  public static DeepSkyBlue = new Color(0, 191, 255, 255);
  public static LightBLue = new Color(173, 216, 230, 255);
  public static PowDerBlue = new Color(176, 224, 230, 255);
  public static CadetBlue = new Color(95, 158, 160, 255);
  public static Azure = new Color(240, 255, 255, 255);
  public static LightCyan = new Color(225, 255, 255, 255);
  public static PaleTurquoise = new Color(175, 238, 238, 255);
  public static Cyan = new Color(0, 255, 255, 255);
  public static Aqua = new Color(0, 255, 255, 255);
  public static DarkTurquoise = new Color(0, 206, 209, 255);
  public static DarkSlateGray = new Color(47, 79, 79, 255);
  public static DarkCyan = new Color(0, 139, 139, 255);
  public static Teal = new Color(0, 128, 128, 255);
  public static MediumTurquoise = new Color(72, 209, 204, 255);
  public static LightSeaGreen = new Color(32, 178, 170, 255);
  public static Turquoise = new Color(64, 224, 208, 255);
  public static Auqamarin = new Color(127, 255, 170, 255);
  public static MediumAquamarine = new Color(0, 250, 154, 255);
  public static MediumSpringGreen = new Color(245, 255, 250, 255);
  public static MintCream = new Color(0, 255, 127, 255);
  public static SpringGreen = new Color(60, 179, 113, 255);
  public static SeaGreen = new Color(46, 139, 87, 255);
  public static Honeydew = new Color(240, 255, 240, 255);
  public static LightGreen = new Color(144, 238, 144, 255);
  public static PaleGreen = new Color(152, 251, 152, 255);
  public static DarkSeaGreen = new Color(143, 188, 143, 255);
  public static LimeGreen = new Color(50, 205, 50, 255);
  public static Lime = new Color(0, 255, 0, 255);
  public static ForestGreen = new Color(34, 139, 34, 255);
  public static Green = new Color(0, 128, 0, 255);
  public static DarkGreen = new Color(0, 100, 0, 255);
  public static Chartreuse = new Color(127, 255, 0, 255);
  public static LawnGreen = new Color(124, 252, 0, 255);
  public static GreenYellow = new Color(173, 255, 47, 255);
  public static OliveDrab = new Color(85, 107, 47, 255);
  public static Beige = new Color(107, 142, 35, 255);
  public static LightGoldenrodYellow = new Color(250, 250, 210, 255);
  public static Ivory = new Color(255, 255, 240, 255);
  public static LightYellow = new Color(255, 255, 224, 255);
  public static Yellow = new Color(255, 255, 0, 255);
  public static Olive = new Color(128, 128, 0, 255);
  public static DarkKhaki = new Color(189, 183, 107, 255);
  public static LemonChiffon = new Color(255, 250, 205, 255);
  public static PaleGodenrod = new Color(238, 232, 170, 255);
  public static Khaki = new Color(240, 230, 140, 255);
  public static Gold = new Color(255, 215, 0, 255);
  public static Cornislk = new Color(255, 248, 220, 255);
  public static GoldEnrod = new Color(218, 165, 32, 255);
  public static FloralWhite = new Color(255, 250, 240, 255);
  public static OldLace = new Color(253, 245, 230, 255);
  public static Wheat = new Color(245, 222, 179, 255);
  public static Moccasin = new Color(255, 228, 181, 255);
  public static Orange = new Color(255, 165, 0, 255);
  public static PapayaWhip = new Color(255, 239, 213, 255);
  public static BlanchedAlmond = new Color(255, 235, 205, 255);
  public static NavajoWhite = new Color(255, 222, 173, 255);
  public static AntiqueWhite = new Color(250, 235, 215, 255);
  public static Tan = new Color(210, 180, 140, 255);
  public static BrulyWood = new Color(222, 184, 135, 255);
  public static Bisque = new Color(255, 228, 196, 255);
  public static DarkOrange = new Color(255, 140, 0, 255);
  public static Linen = new Color(250, 240, 230, 255);
  public static Peru = new Color(205, 133, 63, 255);
  public static PeachPuff = new Color(255, 218, 185, 255);
  public static SandyBrown = new Color(244, 164, 96, 255);
  public static Chocolate = new Color(210, 105, 30, 255);
  public static SaddleBrown = new Color(139, 69, 19, 255);
  public static SeaShell = new Color(255, 245, 238, 255);
  public static Sienna = new Color(160, 82, 45, 255);
  public static LightSalmon = new Color(255, 160, 122, 255);
  public static Coral = new Color(255, 127, 80, 255);
  public static OrangeRed = new Color(255, 69, 0, 255);
  public static DarkSalmon = new Color(233, 150, 122, 255);
  public static Tomato = new Color(255, 99, 71, 255);
  public static MistyRose = new Color(255, 228, 225, 255);
  public static Salmon = new Color(250, 128, 114, 255);
  public static Snow = new Color(255, 250, 250, 255);
  public static LightCoral = new Color(240, 128, 128, 255);
  public static RosyBrown = new Color(188, 143, 143, 255);
  public static IndianRed = new Color(205, 92, 92, 255);
  public static Red = new Color(255, 0, 0, 255);
  public static Brown = new Color(165, 42, 42, 255);
  public static FireBrick = new Color(178, 34, 34, 255);
  public static DarkRed = new Color(139, 0, 0, 255);
  public static Maroon = new Color(128, 0, 0, 255);
  public static White = new Color(255, 255, 255, 255);
  public static WhiteSmoke = new Color(245, 245, 245, 255);
  public static Gainsboro = new Color(220, 220, 220, 255);
  public static LightGrey = new Color(211, 211, 211, 255);
  public static Silver = new Color(192, 192, 192, 255);
  public static DarkGray = new Color(169, 169, 169, 255);
  public static Gray = new Color(128, 128, 128, 255);
  public static DimGray = new Color(105, 105, 105, 255);
  public static Black = new Color(0, 0, 0, 255);
  public static Transparent = new Color(0, 0, 0, 0);
}

export enum StrokeCap {
  FLAT = 0,
  SQUARE = 1,
  ROUND = 2,
  TRIANGLE = 3,
}

export enum StrokeJoin {
  MITER = 0,
  BEVEL = 1,
  ROUND = 2,
  MITER_OR_BEVEL = 3,
}

export enum StrokeDashStyle {
  SOLID = 0,
  DASH = 1,
  DOT = 2,
  DASH_DOT = 3,
  DASH_DOT_DOT = 4,
  CUSTOM = 5,
}

export enum PaintStyle {
  STROKE = 0,
  FILL = 1,
}

export enum FillType {
  Winding = 0,
  EvenOdd = 1,
}

export enum FontWeight {
  INVISIBLE = 0,
  THIN = 1,
  EXTRA_LIGHT = 2,
  LIGHT = 3,
  NORMAL = 4,
  MEDIUM = 5,
  SEMI_BOLD = 6,
  BOLD = 7,
  EXTRA_BOLD = 8,
  BLACK = 9,
  EXTRA_BLACK = 10,
}

export enum FontWidth {
  ULTRA_CONDENSED = 0,
  EXTRA_CONDENSED = 1,
  CONDENSED = 2,
  SEMI_CONDESED = 3,
  NORMAL = 4,
  SEMI_EXPANDED = 5,
  EXPANDED = 6,
  EXTRA_EXPANDED = 7,
  ULTRA_EXPANDED = 8,
}

export enum FontSlant {
  UP_RIGHT = 0,
  ITALIC = 1,
  OBLIQUE = 2,
}

export enum FontStretch {
  NORMAL = 0,
}

export enum TextDecoration {
  NONE = 0,
  UNDERLINE = 2,
  OVERLINE = 3,
  LINETHROUGH = 4,
}

export enum TextAlignment {
  LEFT = 0,
  RIGHT = 1,
  CENTER = 2,
  JUSTIFY = 3,
  START = 4,
  END = 5,
}

export enum PlaceholderAlignment {
  BASELINE = 0,
  ABOVE_BASELINE = 1,
  BELOW_BASELINE = 2,
  TOP = 3,
  BOTTOM = 4,
  MIDDLE = 5,
}

export enum TextBaseline {
  ALPHABETIC = 0,
  IDEOGRAPHIC = 1,
}

export enum DecorationStyle {
  SOLID = 0,
  DOUBLE = 1,
  DOTTED = 2,
  DASHED = 3,
  WAVY = 4,
}

export enum TextDirection {
  LTR = 0,
  RTL = 1,
}

export enum TextHeightBehavior {
  ALL = 0,
  DISABLE_FIRST_ASCENT = 1,
  DISABLE_LAST_DESCENT = 2,
  DISABLE_ALL = 3,
}

export enum ClipOp {
  DIFFERENCE = 0,
  INTERSECT = 1,
}

export enum AlphaType {
  OPAQUE = 0,
  PREMUL = 1,
  UNPREMUL = 2,
}

export enum ColorSpace {
  SRGB = 0,
  DISPLAY_P3 = 1,
  ADOBE_RGB = 2,
}

export enum ColorType {
  ALPHA_8 = 0,
  RGB_565 = 1,
  RGBA_8888 = 2,
  BGRA_8888 = 3,
  RGBA_1010102 = 4,
  RGB_101010x = 5,
  GRAY_8 = 6,
  RGBA_F16 = 7,
  RGBA_F32 = 8,
}

export enum BlendMode {
  CLEAR = 0,
  SRC = 1,
  DST = 2,
  SRC_OVER = 3,
  DST_OVER = 4,
  SRC_IN = 5,
  DST_IN = 6,
  SRC_OUT = 7,
  DST_OUT = 8,
  SRC_ATOP = 9,
  DST_ATOP = 10,
  XOR = 11,
  PLUS = 12,
  MODULATE = 13,
  SCREEN = 14,
  OVERLAY = 15,
  DARKEN = 16,
  LIGHTEN = 17,
  COLOR_DODGE = 18,
  COLOR_BURN = 19,
  HARD_LIGHT = 20,
  SOFT_LIGHT = 21,
  DIFFERENCE = 22,
  EXCLUSION = 23,
  MULTIPLY = 24,
  HUE = 25,
  SATURATION = 26,
  COLOR = 27,
  LUMINOSITY = 28,
}

export enum FilterMode {
  LINEAR = 0,
  NEAREST = 1,
}

export enum MipmapMode {
  NONE = 0,
  NEAREST = 1,
  LINEAR = 2,
}

export enum PointMode {
  POINTS = 0,
  LINES = 1,
  POLYGON = 2,
}

export enum PathOp {
  DIFFERENCE = 0,
  INTERSECT = 1,
  UNION = 2,
  XOR = 3,
  REVERSE_DIFFERENCE = 4,
}

export class TextFontFeature {
  public readonly name: string;
  public readonly value: number;
  constructor (name: string, value: number) {
    this.name = name
    this.value = value
  }
}

export class TextShadow {
  constructor (
    public readonly color: Color,
    public readonly offset: number[],
    public readonly blurRadius: number
  ) {}
}

export interface ParagraphStyleOptions {
  disableHinting?: boolean;
  ellipsis?: string;
  heightMultiplier?: number;
  maxLines?: number;
  strutStyle?: StrutStyle;
  textAlignment?: TextAlignment;
  textDirection?: TextDirection;
  textHeightBehavior?: TextHeightBehavior;
  textStyle: TextStyle;
}

export class ParagraphStyle {
  private _source;
  private _disableHinting?: boolean;
  private _ellipsis?: string;
  private _heightMultiplier: number;
  private _maxLines: number;
  private _strutStyle: StrutStyle;
  private _textAlignment: TextAlignment;
  private _textDirection: TextDirection;
  private _textHeightBehavior: TextHeightBehavior;
  private _textStyle: TextStyle;

  constructor (
    options: ParagraphStyleOptions = {
      maxLines: 0,
      textAlignment: TextAlignment.LEFT,
      textDirection: TextDirection.LTR,
      textStyle: new TextStyle(),
    }
  ) {
    this._textStyle = options.textStyle
    this._strutStyle = options.strutStyle ? options.strutStyle : new StrutStyle()
    this._textAlignment = options.textAlignment ? options.textAlignment : TextAlignment.LEFT
    this._textDirection = options.textDirection ? options.textDirection : TextDirection.LTR
    this._textHeightBehavior = options.textHeightBehavior
      ? options.textHeightBehavior
      : TextHeightBehavior.ALL
    this._disableHinting = options.disableHinting ? options.disableHinting : false
    this._ellipsis = options.ellipsis
    this._heightMultiplier = options.heightMultiplier ? options.heightMultiplier : 0
    this._maxLines = options.maxLines ? options.maxLines : 0
    this._source = new Engine.canvasKit.ParagraphStyle({
      textStyle: this._textStyle.source,
      strutStyle: this._strutStyle?.source,
      textAlign: GraphicsUtils.convertTextAlignment(this._textAlignment),
      textDirection: GraphicsUtils.convertTextDirection(this._textDirection),
      textHeightBehavior: GraphicsUtils.convertTextHeightBehavior(this._textHeightBehavior),
      disableHinting: this._disableHinting,
      ellipsis: this._ellipsis,
      heightMultiplier: this._heightMultiplier,
      maxLines: this._maxLines,
    })
  }

  public get source () {
    return this._source
  }

  public get textAlignment () {
    return this._textAlignment
  }

  public get textDirection () {
    return this._textDirection
  }

  public get maxLines () {
    return this._maxLines
  }

  public get textStyle () {
    return this._textStyle
  }

  public get strutStyle () {
    return this._strutStyle
  }
}

export class Paragraph {
  private _source;

  constructor (paragraphBuilder: ParagraphBuilder) {
    this._source = paragraphBuilder.source.build()
  }

  public get source () {
    return this._source
  }

  public layout (width: number) {
    this._source.layout(width)
  }

  public getShapedLines (): ShapedLine[] {
    return this._source.getShapedLines()
  }

  public getHeight (): number {
    return this._source.getHeight()
  }

  public getMaxWidth (): number {
    return this._source.getMaxWidth()
  }
}

export interface FontStyleOptions {
  weight?: FontWeight;
  width?: FontWidth;
  slant?: FontSlant;
}

export class FontStyle {
  private _weight: FontWeight;
  private _width: FontWidth;
  private _slant: FontSlant;

  constructor (options?: FontStyleOptions) {
    this._weight = options?.weight ? options.weight : FontWeight.NORMAL
    this._width = options?.width ? options.width : FontWidth.NORMAL
    this._slant = options?.slant ? options.slant : FontSlant.UP_RIGHT
  }

  public get weight () {
    return this._weight
  }

  public get width () {
    return this._width
  }

  public get slant () {
    return this._slant
  }
}

export interface TextStyleOptions {
  backgroundColor?: Color;
  color?: Color;
  decoration?: number;
  decorationColor?: Color;
  decorationThickness?: number;
  decorationStyle?: DecorationStyle;
  fontFamilies?: string[];
  fontFeatures?: TextFontFeature[];
  fontSize?: number;
  fontStyle?: FontStyle;
  foregroundColor?: Color;
  heightMultiplier?: number;
  halfLeading?: boolean;
  letterSpacing?: number;
  locale?: string;
  shadows?: TextShadow[];
  textBaseline?: TextBaseline;
  wordSpacing?: number;
}

export class TextStyle {
  private _source;
  private _backgroundColor?: Color;
  private _color: Color;
  private _decoration: number;
  private _decorationColor?: Color;
  private _decorationThickness: number;
  private _decorationStyle: DecorationStyle;
  private _fontFamilies: string[];
  private _fontFeatures: TextFontFeature[];
  private _fontSize: number;
  private _fontStyle: FontStyle;
  private _foregroundColor?: Color;
  private _heightMultiplier: number;
  private _halfLeading: boolean;
  private _letterSpacing: number;
  private _locale?: string;
  private _shadows: TextShadow[];
  private _textBaseline: TextBaseline;
  private _wordSpacing: number;

  constructor (
    textStyle: TextStyleOptions = {
      color: Colors.Black,
      fontSize: 14,
      fontFamilies: [ EngineUtils.FONT_NAME_SANS, ],
    }
  ) {
    this._backgroundColor = textStyle.backgroundColor ? textStyle.backgroundColor : undefined
    this._color = textStyle.color ? textStyle.color : Colors.Black
    this._decoration = textStyle.decoration ? textStyle.decoration : 0
    this._decorationColor = textStyle.decorationColor ? textStyle.decorationColor : undefined
    this._decorationThickness = textStyle.decorationThickness ? textStyle.decorationThickness : 0
    this._decorationStyle = textStyle.decorationStyle
      ? textStyle.decorationStyle
      : DecorationStyle.SOLID
    this._fontFamilies = textStyle.fontFamilies ? textStyle.fontFamilies : []
    this._fontFeatures = textStyle.fontFeatures ? textStyle.fontFeatures : []
    this._fontSize = textStyle.fontSize ? textStyle.fontSize : 14
    this._fontStyle = textStyle.fontStyle ? textStyle.fontStyle : new FontStyle()
    this._foregroundColor = textStyle.foregroundColor ? textStyle.foregroundColor : undefined
    this._heightMultiplier = textStyle.heightMultiplier ? textStyle.heightMultiplier : 0
    this._halfLeading = textStyle.halfLeading ? textStyle.halfLeading : false
    this._letterSpacing = textStyle.heightMultiplier ? textStyle.heightMultiplier : 0
    this._locale = textStyle.locale ? textStyle.locale : undefined
    this._shadows = textStyle.shadows ? textStyle.shadows : []
    this._textBaseline = textStyle.textBaseline ? textStyle.textBaseline : TextBaseline.ALPHABETIC
    this._wordSpacing = textStyle.wordSpacing ? textStyle.wordSpacing : 0
    this._source = new Engine.canvasKit.TextStyle({
      backgroundColor: this._backgroundColor?.source,
      color: this._color.source,
      decoration: this._decoration,
      decorationColor: this._decorationColor?.source,
      decorationThickness: this._decorationThickness,
      decorationStyle: GraphicsUtils.convertDecorationStyle(this._decorationStyle),
      fontFamilies: this._fontFamilies,
      fontFeatures: this._fontFeatures,
      fontSize: this._fontSize,
      fontStyle: GraphicsUtils.convertFontStyle(this._fontStyle),
      foregroundColor: this._foregroundColor?.source,
      heightMultiplier: this._heightMultiplier,
      halfLeading: this._halfLeading,
      letterSpacing: this._letterSpacing,
      locale: this._locale,
      shadows: GraphicsUtils.convertShadow(this._shadows),
      textBaseline: GraphicsUtils.convertTextBaseline(this._textBaseline),
      wordSpacing: this._wordSpacing,
    })
  }

  public get source () {
    return this._source
  }

  public get backgroundColor () {
    return this._backgroundColor
  }

  public get color () {
    return this._color
  }

  public get decoration () {
    return this._decoration
  }

  public get decorationColor () {
    return this._decorationColor
  }

  public get decorationThickness () {
    return this._decorationThickness
  }

  public get decorationStyle () {
    return this._decorationStyle
  }

  public get fontFamilies () {
    return this._fontFamilies
  }

  public get fontFeatures () {
    return this._fontFeatures
  }

  public get fontSize () {
    return this._fontSize
  }

  public get fontStyle () {
    return this._fontStyle
  }

  public get foregroundColor () {
    return this._foregroundColor
  }

  public get heightMultiplier () {
    return this._heightMultiplier
  }

  public get halfLeading () {
    return this._halfLeading
  }

  public get letterSpacing () {
    return this._letterSpacing
  }

  public get locale () {
    return this._locale
  }

  public get shadows () {
    return this._shadows
  }

  public get textBaseline () {
    return this._textBaseline
  }

  public get wordSpacing () {
    return this._wordSpacing
  }
}

export interface StrutStyleOptions {
  strutEnabled?: boolean;
  fontFamilies?: string[];
  fontStyle?: FontStyle;
  fontSize?: number;
  heightMultiplier?: number;
  halfLeading?: boolean;
  leading?: number;
  forceStrutHeight?: boolean;
}

export class StrutStyle {
  private _source;
  private _strutEnabled: boolean;
  private _fontFamilies: string[];
  private _fontStyle: FontStyle;
  private _fontSize: number;
  private _heightMultiplier: number;
  private _halfLeading: boolean;
  private _leading: number;
  private _forceStrutHeight: boolean;

  public constructor (options?: StrutStyleOptions) {
    this._strutEnabled = options?.strutEnabled ? options.strutEnabled : false
    this._fontFamilies = options?.fontFamilies ? options.fontFamilies : []
    this._fontStyle = options?.fontStyle ? options.fontStyle : new FontStyle()
    this._fontSize = options?.fontSize ? options.fontSize : 0
    this._heightMultiplier = options?.heightMultiplier ? options.heightMultiplier : 0
    this._halfLeading = options?.halfLeading ? options.halfLeading : false
    this._leading = options?.leading ? options.leading : 0
    this._forceStrutHeight = options?.forceStrutHeight ? options.forceStrutHeight : false
    this._source = {
      strutEnabled: this._strutEnabled,
      fontFamilies: this._fontFamilies,
      fontStyle: GraphicsUtils.convertFontStyle(this._fontStyle),
      fontSize: this._fontSize,
      heightMultiplier: this._heightMultiplier,
      halfLeading: this._halfLeading,
      leading: this._leading,
      forceStrutHeight: this._forceStrutHeight,
    }
  }

  public get source () {
    return this._source
  }

  public get strutEnabled () {
    return this._strutEnabled
  }

  public get fontFamilies () {
    return this._fontFamilies
  }

  public get fontStyle () {
    return this._fontStyle
  }

  public get fontSize () {
    return this._fontSize
  }

  public get heightMultiplier () {
    return this._heightMultiplier
  }

  public get halfLeading () {
    return this._halfLeading
  }

  public get leading () {
    return this._leading
  }

  public get forceStrutHeight () {
    return this._forceStrutHeight
  }
}

export class GraphicsUtils {
  public static convertPlaceholderAlignment (placeholderAlignment: PlaceholderAlignment) {
    switch (placeholderAlignment) {
    case PlaceholderAlignment.BASELINE:
      return Engine.canvasKit.PlaceholderAlignment.Baseline
    case PlaceholderAlignment.ABOVE_BASELINE:
      return Engine.canvasKit.PlaceholderAlignment.AboveBaseline
    case PlaceholderAlignment.BELOW_BASELINE:
      return Engine.canvasKit.PlaceholderAlignment.BelowBaseline
    case PlaceholderAlignment.BOTTOM:
      return Engine.canvasKit.PlaceholderAlignment.Bottom
    case PlaceholderAlignment.TOP:
      return Engine.canvasKit.PlaceholderAlignment.Top
    case PlaceholderAlignment.MIDDLE:
      return Engine.canvasKit.PlaceholderAlignment.Middle
    }
  }

  public static convertTextBaseline (textBaseline: TextBaseline) {
    switch (textBaseline) {
    case TextBaseline.ALPHABETIC:
      return Engine.canvasKit.TextBaseline.Alphabetic
    case TextBaseline.IDEOGRAPHIC:
      return Engine.canvasKit.TextBaseline.Ideographic
    }
  }

  public static convertTextAlignment (textAlignment: TextAlignment) {
    switch (textAlignment) {
    case TextAlignment.LEFT:
      return Engine.canvasKit.TextAlign.Left
    case TextAlignment.RIGHT:
      return Engine.canvasKit.TextAlign.Right
    case TextAlignment.CENTER:
      return Engine.canvasKit.TextAlign.Center
    case TextAlignment.JUSTIFY:
      return Engine.canvasKit.TextAlign.Justify
    case TextAlignment.START:
      return Engine.canvasKit.TextAlign.Start
    case TextAlignment.END:
      return Engine.canvasKit.TextAlign.End
    }
  }

  public static convertDecorationStyle (decorationStyle: DecorationStyle) {
    switch (decorationStyle) {
    case DecorationStyle.SOLID:
      return Engine.canvasKit.DecorationStyle.Solid
    case DecorationStyle.DOUBLE:
      return Engine.canvasKit.DecorationStyle.Double
    case DecorationStyle.DOTTED:
      return Engine.canvasKit.DecorationStyle.Dotted
    case DecorationStyle.DASHED:
      return Engine.canvasKit.DecorationStyle.Dashed
    case DecorationStyle.WAVY:
      return Engine.canvasKit.DecorationStyle.Wavy
    }
  }

  public static convertFontStyle (fontStyle: FontStyle) {
    let fontWeight = Engine.canvasKit.FontWeight.Normal
    let fontWidth = Engine.canvasKit.FontWidth.Normal
    let fontSlant = Engine.canvasKit.FontSlant.Upright
    switch (fontStyle.weight) {
    case FontWeight.INVISIBLE:
      fontWeight = Engine.canvasKit.FontWeight.Invisible
      break
    case FontWeight.THIN:
      fontWeight = Engine.canvasKit.FontWeight.Thin
      break
    case FontWeight.EXTRA_LIGHT:
      fontWeight = Engine.canvasKit.FontWeight.ExtraLight
      break
    case FontWeight.LIGHT:
      fontWeight = Engine.canvasKit.FontWeight.Light
      break
    case FontWeight.NORMAL:
      fontWeight = Engine.canvasKit.FontWeight.Normal
      break
    case FontWeight.MEDIUM:
      fontWeight = Engine.canvasKit.FontWeight.Medium
      break
    case FontWeight.SEMI_BOLD:
      fontWeight = Engine.canvasKit.FontWeight.SemiBold
      break
    case FontWeight.BOLD:
      fontWeight = Engine.canvasKit.FontWeight.Bold
      break
    case FontWeight.EXTRA_BOLD:
      fontWeight = Engine.canvasKit.FontWeight.ExtraBold
      break
    case FontWeight.BLACK:
      fontWeight = Engine.canvasKit.FontWeight.Black
      break
    case FontWeight.EXTRA_BLACK:
      fontWeight = Engine.canvasKit.FontWeight.ExtraBlack
      break
    }
    switch (fontStyle.width) {
    case FontWidth.ULTRA_CONDENSED:
      fontWidth = Engine.canvasKit.FontWidth.UltraCondensed
      break
    case FontWidth.EXTRA_CONDENSED:
      fontWidth = Engine.canvasKit.FontWidth.ExtraCondensed
      break
    case FontWidth.CONDENSED:
      fontWidth = Engine.canvasKit.FontWidth.Condensed
      break
    case FontWidth.SEMI_CONDESED:
      fontWidth = Engine.canvasKit.FontWidth.SemiCondensed
      break
    case FontWidth.NORMAL:
      fontWidth = Engine.canvasKit.FontWidth.Normal
      break
    case FontWidth.SEMI_EXPANDED:
      fontWidth = Engine.canvasKit.FontWidth.SemiExpanded
      break
    case FontWidth.EXPANDED:
      fontWidth = Engine.canvasKit.FontWidth.Expanded
      break
    case FontWidth.EXTRA_EXPANDED:
      fontWidth = Engine.canvasKit.FontWidth.ExtraExpanded
      break
    case FontWidth.ULTRA_EXPANDED:
      fontWidth = Engine.canvasKit.FontWidth.UltraExpanded
      break
    }
    switch (fontStyle.slant) {
    case FontSlant.UP_RIGHT:
      fontSlant = Engine.canvasKit.FontSlant.Upright
      break
    case FontSlant.ITALIC:
      fontSlant = Engine.canvasKit.FontSlant.Italic
      break
    case FontSlant.OBLIQUE:
      fontSlant = Engine.canvasKit.FontSlant.Oblique
      break
    }
    return {
      weight: fontWeight,
      width: fontWidth,
      slant: fontSlant,
    }
  }

  public static convertShadow (shadows: TextShadow[]) {
    const shadowsSource: { color: number[]; offset: number[]; blurRadius: number }[] = []
    shadows.forEach((shadow) => {
      shadowsSource.push({
        color: shadow.color.source,
        offset: shadow.offset,
        blurRadius: shadow.blurRadius,
      })
    })

    return shadowsSource
  }

  public static convertTextDirection (textDirection: TextDirection) {
    switch (textDirection) {
    case TextDirection.LTR:
      return Engine.canvasKit.TextDirection.LTR
    case TextDirection.RTL:
      return Engine.canvasKit.TextDirection.RTL
    }
  }

  public static convertTextHeightBehavior (textHeightBehavior: TextHeightBehavior) {
    switch (textHeightBehavior) {
    case TextHeightBehavior.ALL:
      return Engine.canvasKit.TextHeightBehavior.All
    case TextHeightBehavior.DISABLE_FIRST_ASCENT:
      return Engine.canvasKit.TextHeightBehavior.DisableFirstAscent
    case TextHeightBehavior.DISABLE_LAST_DESCENT:
      return Engine.canvasKit.TextHeightBehavior.DisableLastDescent
    case TextHeightBehavior.DISABLE_ALL:
      return Engine.canvasKit.TextHeightBehavior.DisableAll
    }
  }

  public static convertClipOp (clipOp: ClipOp) {
    switch (clipOp) {
    case ClipOp.DIFFERENCE:
      return Engine.canvasKit.ClipOp.Difference
    case ClipOp.INTERSECT:
      return Engine.canvasKit.ClipOp.Intersect
    }
  }

  public static convertAlphaType (alphaType: AlphaType) {
    switch (alphaType) {
    case AlphaType.OPAQUE:
      return Engine.canvasKit.AlphaType.Opaque
    case AlphaType.PREMUL:
      return Engine.canvasKit.AlphaType.Premul
    case AlphaType.UNPREMUL:
      return Engine.canvasKit.AlphaType.Unpremul
    }
  }

  public static convertColorSpace (colorSpace: ColorSpace) {
    switch (colorSpace) {
    case ColorSpace.SRGB:
      return Engine.canvasKit.ColorSpace.SRGB
    case ColorSpace.DISPLAY_P3:
      return Engine.canvasKit.ColorSpace.DISPLAY_P3
    case ColorSpace.ADOBE_RGB:
      return Engine.canvasKit.ColorSpace.ADOBE_RGB
    }
  }

  public static convertColorType (colorType: ColorType) {
    switch (colorType) {
    case ColorType.ALPHA_8:
      return Engine.canvasKit.ColorType.Alpha_8
    case ColorType.RGB_565:
      return Engine.canvasKit.ColorType.RGB_565
    case ColorType.RGBA_8888:
      return Engine.canvasKit.ColorType.RGBA_8888
    case ColorType.BGRA_8888:
      return Engine.canvasKit.ColorType.BGRA_8888
    case ColorType.RGBA_1010102:
      return Engine.canvasKit.ColorType.RGBA_1010102
    case ColorType.RGB_101010x:
      return Engine.canvasKit.ColorType.RGB_101010x
    case ColorType.GRAY_8:
      return Engine.canvasKit.ColorType.Gray_8
    case ColorType.RGBA_F16:
      return Engine.canvasKit.ColorType.RGBA_F16
    case ColorType.RGBA_F32:
      return Engine.canvasKit.ColorType.RGBA_F32
    }
  }

  public static convertBlendMode (blendMode: BlendMode) {
    switch (blendMode) {
    case BlendMode.CLEAR:
      return Engine.canvasKit.BlendMode.Clear
    case BlendMode.SRC:
      return Engine.canvasKit.BlendMode.Src
    case BlendMode.DST:
      return Engine.canvasKit.BlendMode.Dst
    case BlendMode.SRC_OVER:
      return Engine.canvasKit.BlendMode.SrcOver
    case BlendMode.DST_OVER:
      return Engine.canvasKit.BlendMode.DstOver
    case BlendMode.SRC_IN:
      return Engine.canvasKit.BlendMode.SrcIn
    case BlendMode.DST_IN:
      return Engine.canvasKit.BlendMode.DstIn
    case BlendMode.SRC_OUT:
      return Engine.canvasKit.BlendMode.SrcOut
    case BlendMode.DST_OUT:
      return Engine.canvasKit.BlendMode.DstOut
    case BlendMode.SRC_ATOP:
      return Engine.canvasKit.BlendMode.SrcATop
    case BlendMode.DST_ATOP:
      return Engine.canvasKit.BlendMode.DstATop
    case BlendMode.XOR:
      return Engine.canvasKit.BlendMode.Xor
    case BlendMode.PLUS:
      return Engine.canvasKit.BlendMode.Plus
    case BlendMode.MODULATE:
      return Engine.canvasKit.BlendMode.Modulate
    case BlendMode.SCREEN:
      return Engine.canvasKit.BlendMode.Screen
    case BlendMode.OVERLAY:
      return Engine.canvasKit.BlendMode.Overlay
    case BlendMode.DARKEN:
      return Engine.canvasKit.BlendMode.Darken
    case BlendMode.LIGHTEN:
      return Engine.canvasKit.BlendMode.Lighten
    case BlendMode.COLOR_DODGE:
      return Engine.canvasKit.BlendMode.ColorDodge
    case BlendMode.COLOR_BURN:
      return Engine.canvasKit.BlendMode.ColorBurn
    case BlendMode.HARD_LIGHT:
      return Engine.canvasKit.BlendMode.HardLight
    case BlendMode.SOFT_LIGHT:
      return Engine.canvasKit.BlendMode.SoftLight
    case BlendMode.DIFFERENCE:
      return Engine.canvasKit.BlendMode.Difference
    case BlendMode.EXCLUSION:
      return Engine.canvasKit.BlendMode.Exclusion
    case BlendMode.MULTIPLY:
      return Engine.canvasKit.BlendMode.Multiply
    case BlendMode.HUE:
      return Engine.canvasKit.BlendMode.Hue
    case BlendMode.SATURATION:
      return Engine.canvasKit.BlendMode.Saturation
    case BlendMode.COLOR:
      return Engine.canvasKit.BlendMode.Color
    case BlendMode.LUMINOSITY:
      return Engine.canvasKit.BlendMode.Luminosity
    }
  }

  public static convertFilterMode (filterMode: FilterMode) {
    switch (filterMode) {
    case FilterMode.LINEAR:
      return Engine.canvasKit.FilterMode.Linear
    case FilterMode.NEAREST:
      return Engine.canvasKit.FilterMode.Nearest
    }
  }

  public static convertMipmapMode (mipmapMode: MipmapMode) {
    switch (mipmapMode) {
    case MipmapMode.NONE:
      return Engine.canvasKit.MipmapMode.None
    case MipmapMode.NEAREST:
      return Engine.canvasKit.MipmapMode.Nearest
    case MipmapMode.LINEAR:
      return Engine.canvasKit.MipmapMode.Linear
    }
  }

  public static convertPointMode (pointMode: PointMode) {
    switch (pointMode) {
    case PointMode.POINTS:
      return Engine.canvasKit.PointMode.Points
    case PointMode.LINES:
      return Engine.canvasKit.PointMode.Lines
    case PointMode.POLYGON:
      return Engine.canvasKit.PointMode.Polygon
    }
  }

  public static convertPathOp (pathOp: PathOp) {
    switch (pathOp) {
    case PathOp.DIFFERENCE:
      return Engine.canvasKit.PathOp.Difference
    case PathOp.INTERSECT:
      return Engine.canvasKit.PathOp.Intersect
    case PathOp.UNION:
      return Engine.canvasKit.PathOp.Union
    case PathOp.XOR:
      return Engine.canvasKit.PathOp.XOR
    case PathOp.REVERSE_DIFFERENCE:
      return Engine.canvasKit.PathOp.ReverseDifference
    }
  }

  /**
   * 求3个点的组成的三角形的角度。target为目标角的点。如target = A, start = B, end = C， 则计算角度为角度BAC
   * @param target
   * @param start
   * @param end
   * @returns
   */
  public static getTriangleAngle (target: Point2, start: Point2, end: Point2): number {
    const se = GraphicsUtils.getPointDistance(start, end)
    const ts = GraphicsUtils.getPointDistance(target, start)
    const te = GraphicsUtils.getPointDistance(target, end)

    const angle = (Math.acos((ts * ts + te * te - se * se) / (2 * ts * te)) * 180) / Math.PI
    return angle
  }

  private static getPointDistance (start: Point2, end: Point2): number {
    return Math.sqrt((start.x - end.x) * (start.x - end.x) + (start.y - end.y) * (start.y - end.y))
  }
}

export class ParagraphBuilder {
  private _source;
  constructor (paragraphStyle: ParagraphStyle) {
    this._source = Engine.canvasKit.ParagraphBuilder.MakeFromFontProvider(
      paragraphStyle.source,
      Engine.typeFaceFontProvider
    )
  }

  public get source () {
    return this._source
  }

  public build (): Paragraph {
    return new Paragraph(this)
  }

  public addPlaceholder (
    width: number,
    height: number,
    alignment: PlaceholderAlignment,
    baseline: TextBaseline,
    offset: number
  ): void {
    const alignmentSource = GraphicsUtils.convertPlaceholderAlignment(alignment)
    const baselineSource = GraphicsUtils.convertTextBaseline(baseline)
    this._source?.addPlaceholder(width, height, alignmentSource, baselineSource, offset)
  }

  public addText (str: string): void {
    this._source?.addText(str)
  }

  public pop (): void {
    this._source?.pop()
  }

  public pushStyle (textStyle: TextStyle): void {
    this._source?.pushStyle(textStyle.source)
  }

  public pushPaintStyle (textStyle: TextStyle, fg: Paint, bg: Paint): void {
    this._source?.pushPaintStyle(textStyle.source, fg.source, bg.source)
  }

  public reset (): void {
    this._source?.reset()
  }
}

export class Paint {
  private _source;

  public static makeColorPaint (color: Color): Paint {
    const paint: Paint = new Paint()
    paint.setColor(color)
    return paint
  }
  constructor (paint: Paint | null = null) {
    if (paint) {
      this._source = Engine.makePaintFrom(paint._source)
    } else {
      this._source = Engine.makePaint()
    }
  }

  public get source () {
    return this._source
  }

  public setColor (color: Color) {
    this._source.setColor(color.source)
  }

  public getColor (): Color {
    const color = this._source.getColor()
    if (color && color.length >= 4) {
      return new Color(
        Math.round(color[0] * 255),
        Math.round(color[1] * 255),
        Math.round(color[2] * 255),
        Math.round(color[3] * 255)
      )
    }
    return Colors.Black
  }

  public getStrokeCap (): StrokeCap {
    const strokeCap = this._source.getStrokeCap()
    return strokeCap.value
  }

  public setStrokeCap (strokeCap: StrokeCap) {
    // this._source.setStrokeCap(strokeCap)
  }

  public getStrokeJoin (): StrokeJoin {
    const strokeJoin = this._source.getStrokeJoin()
    return strokeJoin.value
  }

  public setStrokeJoin (strokeJoin: StrokeJoin) {
    // this._source.setStrokeJoin(strokeJoin)
  }

  public setPaintStyle (paintStyle: PaintStyle) {
    if (paintStyle == PaintStyle.STROKE) {
      this._source.setStyle(Engine.canvasKit.PaintStyle.Stroke)
    } else {
      this._source.setStyle(Engine.canvasKit.PaintStyle.Fill)
    }
  }

  public getStrokeMiter (): number {
    const strokeMiter = this._source.getStrokeMiter()
    return strokeMiter
  }

  public getStrokgetStrokeWidtheMiter (): number {
    const strokeWidth = this._source.getStrokeWidth()
    return strokeWidth
  }

  public setAlpha (alpha: number) {
    this._source.setAlphaf(alpha)
  }

  public setAntiAlias (antiAlias: boolean) {
    this._source.setAntiAlias(antiAlias)
  }

  public setBlendMode (blendMode: number) {
    // const newBlendMode = { value: blendMode, }
    // this.source.setBlendMode(newBlendMode)
  }

  public setColorComponents (r: number, g: number, b: number, a: number) {
    // this._paint.setColorComponents(r, g, b, a)
  }
  public setColorFilter (colorFilter: any) {
    // TODO
    // CanvasKitHelper.Paint.setColorFilter(colorFilter)
  }
  // public setColorInt (color: number) {
  //  this._source.setColorInt(color)
  // }
  public setImageFilter (imageFilter: number) {}
  public setMaskFilter (maskFilter: number) {}
  public setPathEffect (pathEffect: number) {}
  public setShader (shader: number) {}
  public setStrokeMiter (strokeMiter: number) {}
  public setStrokeWidth (stokeWidth: number) {
    this._source.setStrokeWidth(stokeWidth)
  }
}

export class Font {
  private _fontName: string;
  private _fontSize: number;
  private _source;

  constructor (fontName: string = EngineUtils.FONT_NAME_DEFAULT, fontSize = 14) {
    this._fontName = fontName
    this._fontSize = fontSize
    this._source = Engine.makeFont(fontName, fontSize)
  }

  public get source () {
    return this._source
  }

  public get fontName (): string {
    return this._fontName
  }

  public get fontSize (): number {
    return this._fontSize
  }

  public set fontSize (value: number) {
    this._fontSize = value
    this._source.setSize(value)
  }

  public get embolden (): boolean {
    return this._source.isEmbolden()
  }

  public set embolden (value: boolean) {
    this._source.setEmbolden(value)
  }

  public get skewX (): number {
    return this._source.getSkewX()
  }

  public set skewX (value: number) {
    this._source.setSkewX(value)
  }
  /**
  * Computes any intersections of a thick "line" and a run of positionsed glyphs.
  * The thick line is represented as a top and bottom coordinate (positive for
  * below the baseline, negative for above). If there are no intersections
  * (e.g. if this is intended as an underline, and there are no "collisions")
  * then the returned array will be empty. If there are intersections, the array
  * will contain pairs of X coordinates [start, end] for each segment that
  * intersected with a glyph.
  *
  * @param glyphs        the glyphs to intersect with
  * @param positions     x,y coordinates (2 per glyph) for each glyph
  * @param top           top of the thick "line" to use for intersection testing
  * @param bottom        bottom of the thick "line" to use for intersection testing
  * @return              array of [start, end] x-coordinate pairs. Maybe be empty.
  */
  public getGlyphIntercepts (glyphs: number[], positions: Float32Array | number[],
    top: number, bottom: number): Float32Array {
    return this._source.getGlyphIntercepts(glyphs, positions, top, bottom)
  }
}

export class Rotation {
  private _radius: number;

  private _px: number;

  private _py: number;

  public constructor (radius: number, px = 0, py = 0) {
    this._radius = radius
    this._px = px
    this._py = py
  }

  public get radius () {
    return this._radius
  }

  public get px () {
    return this._px
  }

  public get py () {
    return this._py
  }

  public clone (): Rotation {
    return new Rotation(this._radius, this._px, this._py)
  }

  public equals (rotation: Rotation): boolean {
    return (
      rotation._radius === this._radius && rotation._px === this._px && rotation._py === this._py
    )
  }
}

export class Scale {
  private _sx: number;

  private _sy: number;

  private _px: number;

  private _py: number;

  public constructor (sx: number, sy: number, px = 0, py = 0) {
    this._sx = sx
    this._sy = sy
    this._px = px
    this._py = py
  }

  public get sx () {
    return this._sx
  }

  public get sy () {
    return this._sy
  }

  public get px () {
    return this._px
  }

  public get py () {
    return this._py
  }

  public clone (): Scale {
    return new Scale(this._sx, this._sy, this._px, this._py)
  }

  public equals (scale: Scale): boolean {
    return (
      scale._sx === this._sx &&
      scale._sy === this._sy &&
      scale._px === this._px &&
      scale._py === this._py
    )
  }
}

export class Skew {
  private _kx: number;

  private _ky: number;

  private _px: number;

  private _py: number;

  public constructor (kx: number, ky: number, px = 0, py = 0) {
    this._kx = kx
    this._ky = ky
    this._px = px
    this._py = py
  }

  public get kx () {
    return this._kx
  }

  public get ky () {
    return this._ky
  }

  public get px () {
    return this._px
  }

  public get py () {
    return this._py
  }

  public clone (): Skew {
    return new Skew(this._kx, this._ky, this._px, this._py)
  }

  public equals (skew: Skew): boolean {
    return (
      skew._kx === this._kx &&
      skew._ky === this._ky &&
      skew._px === this._px &&
      skew._py === this._py
    )
  }
}
export class Vector3 {
  private _x: number;
  private _y: number;
  private _z: number;

  public constructor (x: number, y: number, z: number) {
    this._x = x
    this._y = y
    this._z = z
  }

  public get x () {
    return this._x
  }

  public get y () {
    return this._y
  }

  public get z () {
    return this._z
  }

  public clone (): Vector3 {
    return new Vector3(this._x, this._y, this._z)
  }

  public equals (vector: Vector3): boolean {
    return vector._x === this._x && vector._y === this._y && vector._z === this._z
  }
}

export class Matrix {
  private _source: number[];

  public constructor () {
    this._source = [ 1, 0, 0, 0, 1, 0, 0, 0, 1, ]
  }

  public get source (): number[] {
    return this._source
  }

  public identity () {
    this._source = MatrixHelper.identity()
  }

  public invert (): Matrix | null {
    const matrix = MatrixHelper.invert(this._source)
    if (matrix) {
      const invertMatrix = new Matrix()
      invertMatrix._source = matrix
      return invertMatrix
    } else {
      return null
    }
  }

  public rotate (radius: number, px = 0, py = 0) {
    this._source = MatrixHelper.multiply(this._source, MatrixHelper.rotate(radius, px, py))
  }

  public multiply (...matrices: number[][]) {
    this._source = MatrixHelper.multiply(this._source, ...matrices)
  }

  public scale (sx: number, sy: number, px = 0, py = 0) {
    this._source = MatrixHelper.multiply(this._source, MatrixHelper.scale(sx, sy, px, py))
  }

  public skew (kx: number, ky: number, px = 0, py = 0) {
    this._source = MatrixHelper.multiply(this._source, MatrixHelper.skew(kx, ky, px, py))
  }

  public translate (dx: number, dy: number) {
    this._source = MatrixHelper.multiply(this._source, MatrixHelper.translate(dx, dy))
  }

  public makePoints (points: number[]): number[] {
    return MatrixHelper.mapPoints(this._source, points)
  }

  public makePoint (point: Point2): Point2 {
    const points = MatrixHelper.mapPoints(this._source, [ point.x, point.y, ])
    return new Point2(points[0], points[1])
  }

  public equals (matrix: Matrix): boolean {
    if (matrix) {
      for (let i = 0; i < this._source.length; i++) {
        if (this._source[i] != matrix._source[i]) {
          return false
        }
      }
    }
    return false
  }
}

export class Matrix4 {
  public static make (source: number[]): Matrix4 {
    const matrix = new Matrix4()
    if (source) {
      matrix._source = source
    }
    return matrix
  }

  private _source: number[];

  public constructor () {
    this._source = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, ]
  }
}

export class Path {
  private _source;

  constructor (path: Path | null = null) {
    if (path) {
      this._source = Engine.makePathFrom(path._source)
    } else {
      this._source = Engine.makePath()
    }
  }
  public get source () {
    return this._source
  }

  public addArc (oval: Rectangle, startAngle: number, sweepAngle: number): Path {
    this._source.addArc(oval.source, startAngle, sweepAngle)
    return this
  }
  public addOval (oval: Rectangle, isCCW = true, startIndex = 0): Path {
    this._source.addOval(oval.source, isCCW, startIndex)
    return this
  }
  public addPath (...args: any[]): Path | null {
    return this
  }
  public addPolyline (points: number[], close: boolean): Path {
    this._source.addPoly(points, close)
    return this
  }

  public addRectangle (rectangle: Rectangle, isCCW = true): Path {
    this._source.addRect(rectangle.source, isCCW)
    return this
  }
  public addRRect (roundRectangle: RoundRectangle, isCCW = true): Path {
    this._source.addRRect(roundRectangle.source, isCCW)
    return this
  }
  // public addVerbsPointsWeights (verbs: VerbList, points: InputFlattenedPointArray,
  //  weights?: WeightList): Path {
  //  return this
  // }
  // public arc (x: number, y: number, radius: number, startAngle: AngleInRadians, endAngle: AngleInRadians,
  //  isCCW?: boolean): Path {
  //  return this
  // }
  // public arcToOval (oval: InputRect, startAngle: AngleInDegrees, endAngle: AngleInDegrees,
  //  forceMoveTo: boolean): Path {
  //  return this
  // }
  // public arcToRotated (rx: number, ry: number, xAxisRotate: AngleInDegrees, useSmallArc: boolean,
  //  isCCW: boolean, x: number, y: number): Path {
  //  return this
  // }
  // public arcToTangent (x1: number, y1: number, x2: number, y2: number, radius: number): Path {
  //  return this
  // }
  public close (): Path {
    this._source.close()
    return this
  }
  // public computeTightBounds (outputArray?: Rect): Rect {
  //  return this
  // }
  // public conicTo (x1: number, y1: number, x2: number, y2: number, w: number): Path {
  //  return this
  // }
  public contains (x: number, y: number): boolean {
    return this._source.contains(x, y)
  }

  public copy (): Path {
    return new Path(this)
  }

  public countPoints (): number {
    return this._source.countPoints()
  }

  public cubicTo (
    cpx1: number,
    cpy1: number,
    cpx2: number,
    cpy2: number,
    x: number,
    y: number
  ): Path {
    this._source.cubicTo(cpx1, cpy1, cpx2, cpy2, x, y)
    return this
  }

  public dash (on: number, off: number, phase: number): boolean {
    return this._source.dash(on, off, phase)
  }

  public equals (other: Path): boolean {
    return this._source.equals(other._source)
  }

  public getBounds (): Rectangle {
    const rectangle = this._source.getBounds()
    return new Rectangle(rectangle[0], rectangle[1], rectangle[2], rectangle[3])
  }

  // public getFillType (): FillType {

  // }
  // public getPoint (index: number, outputArray?: Point): Point {

  // }
  public isEmpty (): boolean {
    return this._source.isEmpty()
  }
  public isVolatile (): boolean {
    return this._source.isVolatile()
  }

  public lineTo (x: number, y: number): Path {
    this._source.lineTo(x, y)
    return this
  }
  public makeAsWinding (): Path | null {
    const newPath = this._source.makeAsWinding()
    if (newPath) {
      const path = new Path()
      path._source = newPath
      return path
    } else {
      return null
    }
  }

  public moveTo (x: number, y: number): Path {
    this._source.moveTo(x, y)
    return this
  }

  public offset (dx: number, dy: number): Path {
    this._source.offset(dx, dy)
    return this
  }

  public op (other: Path, op: PathOp): Path | undefined {
    const pathSource = this._source.op(other._source, GraphicsUtils.convertPathOp(op))
    if (pathSource) {
      const path = new Path()
      path._source = pathSource
      return path
    } else {
      return undefined
    }
  }

  public quadTo (x1: number, y1: number, x2: number, y2: number): Path {
    this._source.quadTo(x1, y1, x2, y2)
    return this
  }

  public rArcTo (
    rx: number,
    ry: number,
    xAxisRotate: number,
    useSmallArc: boolean,
    isCCW: boolean,
    dx: number,
    dy: number
  ): Path {
    this._source.rArcTo(rx, ry, xAxisRotate, useSmallArc, isCCW, dx, dy)
    return this
  }
  public rConicTo (dx1: number, dy1: number, dx2: number, dy2: number, w: number): Path {
    this._source.rConicTo(dx1, dy1, dx2, dy2, w)
    return this
  }
  public rCubicTo (
    cpx1: number,
    cpy1: number,
    cpx2: number,
    cpy2: number,
    x: number,
    y: number
  ): Path {
    this._source.rCubicTo(cpx1, cpy1, cpx2, cpy2, x, y)
    return this
  }
  public reset (): void {
    this._source.reset()
  }
  public rewind (): void {
    this._source.rewind()
  }
  public rLineTo (x: number, y: number): Path {
    this._source.rLineTo(x, y)
    return this
  }
  public rMoveTo (x: number, y: number): Path {
    this._source.rMoveTo(x, y)
    return this
  }
  public rQuadTo (x1: number, y1: number, x2: number, y2: number): Path {
    this._source.rQuadTo(x1, y1, x2, y2)
    return this
  }
  public setFillType (fill: FillType): void {
    if (fill == FillType.Winding) {
      this._source.setFillType(Engine.canvasKit.FillType.Winding)
    } else {
      this._source.setFillType(Engine.canvasKit.FillType.EvenOdd)
    }
  }
  public setIsVolatile (volatile: boolean): void {
    this._source.setIsVolatile(volatile)
  }

  public simplify (): boolean {
    return this._source.simplify()
  }

  // public stroke(opts?: StrokeOpts): Path | null {
  //  return this
  // }
  // public toCmds(): Float32Array {

  // }
  public toSVGString (): string {
    return this._source.toSVGString()
  }
  // public transform(...args: any[]): Path {
  //  return this
  // }
  // public trim(startT: number, stopT: number, isComplement: boolean): Path | null {
  //  return this
  // }
}

export class ImageInfo {
  private _source;
  constructor (
    readonly alphaType: AlphaType,
    readonly colorSpace: ColorSpace,
    readonly colorType: ColorType,
    readonly width: number,
    readonly height: number
  ) {
    this._source = {
      alphaType: GraphicsUtils.convertAlphaType(alphaType),
      colorSpace: GraphicsUtils.convertColorSpace(colorSpace),
      colorType: GraphicsUtils.convertColorType(colorType),
      width: width,
      height: height,
    }
  }

  public get source () {
    return this._source
  }
}
export class Image {
  public static makeFrom (imageInfo: ImageInfo, bytes: number[], bytesPerRow: number): Image {
    const image = new Image()
    image._source = Engine.canvasKit.MakeImage(imageInfo.source, bytes, bytesPerRow)
    return image
  }

  public static make (bytes: ArrayBuffer): Image {
    const image = new Image()
    image._source = Engine.canvasKit.MakeImageFromEncoded(bytes)
    return image
  }
  private _source: any;

  private constructor () {}

  public get source () {
    return this._source
  }
}

export class Range {
  public constructor (public first: number, public last: number) {

  }
}

export class TextRange {
  public constructor (public start: number, public end: number) {

  }
}
export class GlyphRun {
  public constructor (public typefaceName: string, public size: number, public fakeBold: boolean, public fakeItalic: boolean, public glyphs: Uint16Array, public positions: Float32Array, public offsets: Uint32Array, public flags: number, public textRange: TextRange, public indices: number[]) {

  }

  public get typeface () {
    return Engine.getTypeFace(this.typefaceName)!
  }
}

export class ShapedLine {
  public constructor (public textRange: Range, public top: number, public bottom: number, public baseline: number, public runs: GlyphRun[]) {

  }
}

export class Graphics {
  private _engine: Engine;

  public constructor (engine: Engine) {
    this._engine = engine
  }

  public clear (color: Color = Colors.Black) {
    this._engine.clear(color.source)
  }

  public clipPath (path: Path, clipOp: ClipOp = ClipOp.INTERSECT, antiAlias = false) {
    this._engine.clipPath(path.source, GraphicsUtils.convertClipOp(clipOp), antiAlias)
  }

  public clipRectangle (rectangle: Rectangle, clipOp: ClipOp = ClipOp.INTERSECT, antiAlias = false) {
    this._engine.clipRect(rectangle.source, GraphicsUtils.convertClipOp(clipOp), antiAlias)
  }

  public clipRoundedRectangle (roundRectangle: RoundRectangle, clipOp: ClipOp, antiAlias: boolean) {
    this._engine.clipRRect(roundRectangle.source, GraphicsUtils.convertClipOp(clipOp), antiAlias)
  }

  public concat (matrix: Matrix) {
    this._engine.concat(matrix.source)
  }

  public drawArc (
    rectangle: Rectangle,
    startAngle: number,
    sweepAngle: number,
    useCenter: boolean,
    paint: Paint
  ) {
    const rect = [ rectangle.left, rectangle.top, rectangle.right, rectangle.bottom, ]
    this._engine.drawArc(rect, startAngle, sweepAngle, useCenter, paint.source)
  }

  public drawAtlas (
    atlas: Image,
    srcRects: number[],
    dstXForms: number[],
    paint: Paint,
    blendMode: BlendMode
  ) {
    this._engine.drawAtlas(
      atlas.source,
      srcRects,
      dstXForms,
      paint.source,
      GraphicsUtils.convertBlendMode(blendMode)
    )
  }

  public drawCircle (cx: number, cy: number, radius: number, paint: Paint) {
    this._engine.drawCircle(cx, cy, radius, paint.source)
  }

  public drawColor (color: Color, blendMode: BlendMode) {
    this._engine.drawColor(color.source, GraphicsUtils.convertBlendMode(blendMode))
  }

  public drawColorComponents (r: number, g: number, b: number, a: number, blendMode: BlendMode) {
    this._engine.drawColorComponents(r, g, b, a, GraphicsUtils.convertBlendMode(blendMode))
  }

  public drawDRRect (outer: RoundRectangle, inner: RoundRectangle, paint: Paint) {
    this._engine.drawDRRect(outer.source, inner.source, paint.source)
  }

  public drawGlyphs (
    glyphs: number[],
    positions: number[],
    x: number,
    y: number,
    font: Font,
    paint: Paint
  ) {
    this._engine.drawGlyphs(glyphs, positions, x, y, font.source, paint.source)
  }

  public drawImage (image: Image, left: number, top: number, paint?: Paint) {
    this._engine.drawImage(image.source, left, top, paint?.source)
  }

  public drawImageCubic (
    image: Image,
    left: number,
    top: number,
    B: number,
    C: number,
    paint?: Paint
  ) {
    this._engine.drawImageCubic(image.source, left, top, B, C, paint?.source)
  }

  public drawImageOptions (
    image: Image,
    left: number,
    top: number,
    filterMode: FilterMode,
    mipMapMode: MipmapMode,
    paint?: Paint
  ) {
    this._engine.drawImageOptions(
      image.source,
      left,
      top,
      GraphicsUtils.convertFilterMode(filterMode),
      GraphicsUtils.convertMipmapMode(mipMapMode),
      paint?.source
    )
  }

  public drawImageNine (
    image: Image,
    center: Rectangle,
    dest: Rectangle,
    filter: FilterMode,
    paint?: Paint
  ) {
    this._engine.drawImageNine(
      image.source,
      center.source,
      dest.source,
      GraphicsUtils.convertFilterMode(filter),
      paint?.source
    )
  }

  public drawImageRect (
    image: Image,
    src: Rectangle,
    dest: Rectangle,
    paint: Paint,
    fastSample: boolean
  ) {
    this._engine.drawImageRect(image.source, src.source, dest.source, paint.source, fastSample)
  }

  public drawImageRectCubic (
    image: Image,
    src: Rectangle,
    dest: Rectangle,
    b: number,
    c: number,
    paint?: Paint
  ) {
    this._engine.drawImageRectCubic(image.source, src.source, dest.source, b, c, paint?.source)
  }

  public drawImageRectOptions (
    image: Image,
    src: Rectangle,
    dest: Rectangle,
    filterMode: FilterMode,
    mipmapMode: MipmapMode,
    paint?: Paint
  ) {
    this._engine.drawImageRectOptions(
      image.source,
      src.source,
      dest.source,
      GraphicsUtils.convertFilterMode(filterMode),
      GraphicsUtils.convertMipmapMode(mipmapMode),
      paint?.source
    )
  }

  public drawLine (x0: number, y0: number, x1: number, y1: number, paint: Paint) {
    this._engine.drawLine(x0, y0, x1, y1, paint.source)
  }

  public drawOval (rectangle: Rectangle, paint: Paint) {
    this._engine.drawOval(rectangle.source, paint.source)
  }

  public drawPaint (paint: Paint) {
    this._engine.drawPaint(paint.source)
  }

  public drawParagraph (paragraph: Paragraph, x: number, y: number) {
    this._engine.drawParagraph(paragraph.source, x, y)
  }

  public drawPath (path: Path, paint: Paint) {
    this._engine.drawPath(path.source, paint.source)
  }

  public drawPatch (
    cubics: number[],
    colors: number[],
    texs: number[],
    mode: BlendMode,
    paint: Paint
  ) {
    this._engine.drawPatch(
      cubics,
      colors,
      texs,
      GraphicsUtils.convertBlendMode(mode),
      paint.source
    )
  }

  // public drawPicture () {
  // Engine.canvasKit.Pict
  // }

  public drawPoints (points: number[], pointMode: PointMode, paint: Paint) {
    this._engine.drawPoints(GraphicsUtils.convertPointMode(pointMode), points, paint.source)
  }

  public drawRectangle (rectangle: Rectangle, paint: Paint) {
    this._engine.drawRect(rectangle.source, paint.source)
  }

  public drawRect4f (left: number, top: number, right: number, bottom: number, paint: Paint) {
    this._engine.drawRect4f(left, top, right, bottom, paint.source)
  }

  public drawRoundRectangle (roundRectangle: RoundRectangle, paint: Paint) {
    this._engine.drawRRect(roundRectangle.source, paint.source)
  }

  public drawShadow (
    path: Path,
    zPlaneParams: number[],
    lightPos: number[],
    lightRadius: number,
    ambientColor: Color,
    spotColor: Color,
    flags: number
  ) {
    this._engine.drawShadow(
      path.source,
      zPlaneParams,
      lightPos,
      lightRadius,
      ambientColor.source,
      spotColor.source,
      flags
    )
  }

  public drawText (str: string, x: number, y: number, paint: Paint, font: Font) {
    this._engine.drawText(str, x, y, paint.source, font.source)
  }

  // public drawTextBlob () {

  // }
  // public drawVertices () {

  // }
  // public getLocalToDevice (): Matrix4 {
  //  const matrix = this._engine.getLocalToDevice()
  //  if (matrix) {
  //    return Matrix4.make(matrix)
  //  } else {
  //    return new Matrix4()
  //  }
  // }

  public getSaveCount (): number {
    return this._engine.getSaveCount()
  }

  public getTotalMatrix (): number[] {
    return this._engine.getTotalMatrix()
  }

  // public makeSurface (): null {
  //  return null
  // }

  // public readPixels () {

  // }

  public restore () {
    this._engine.restore()
  }

  public restoreToCount (saveCount: number) {
    this._engine.restoreToCount(saveCount)
  }

  public rotate (angleInDegrees: number, rx: number, ry: number) {
    this._engine.rotate(angleInDegrees, rx, ry)
  }

  public save () {
    this._engine.save()
  }

  public saveLayer (paint?: Paint, bounds?: Rectangle) {
    this._engine.saveLayer(paint?.source, bounds?.source)
  }

  public scale (sx: number, sy: number) {
    this._engine.scale(sx, sy)
  }

  public skew (sx: number, sy: number) {
    this._engine.skew(sx, sy)
  }

  public translate (dx: number, dy: number) {
    this._engine.translate(dx, dy)
  }

  // public writePixels () {

  // }
}

export enum MouseCode {
  LEFT_MOUSE_DOWN = 0,
  LEFT_MOUSE_UP = 1,
  MIDDLE_MOUSE_DOWN = 2,
  MIDDLE_MOUSE_UP = 3,
  RIGHT_MOUSE_DOWN = 4,
  RIGHT_MOUSE_UP = 5,
}

export enum KeyCode {
  KEY_UNKNOWN = 0,

  KEY_BACK = 1,
  KEY_TAB = 2,
  KEY_RETURN = 3,
  KEY_SHIFT = 4,
  KEY_CONTROL = 5,
  KEY_ALT = 6,
  KEY_PAUSE = 7,
  KEY_CAPITAL,
  KEY_ESCAPE,
  KEY_SPACE,

  KEY_PRIOR,
  KEY_NEXT,
  KEY_END,
  KEY_HOME,
  KEY_LEFT,
  KEY_UP,
  KEY_RIGHT,
  KEY_DOWN,
  KEY_SNAPSHOT,
  KEY_INSERT,
  KEY_DELETE,

  KEY_F1,
  KEY_F2,
  KEY_F3,
  KEY_F4,
  KEY_F5,
  KEY_F6,
  KEY_F7,
  KEY_F8,
  KEY_F9,
  KEY_F10,
  KEY_F11,
  KEY_F12,
  KEY_F13,
  KEY_F14,
  KEY_F15,
  KEY_F16,
  KEY_F17,
  KEY_F18,
  KEY_F19,
  KEY_F20,
  KEY_F21,
  KEY_F22,
  KEY_F23,
  KEY_F24,

  KEY_NUMPAD0,
  KEY_NUMPAD1,
  KEY_NUMPAD2,
  KEY_NUMPAD3,
  KEY_NUMPAD4,
  KEY_NUMPAD5,
  KEY_NUMPAD6,
  KEY_NUMPAD7,
  KEY_NUMPAD8,
  KEY_NUMPAD9,
  KEY_MULTIPLY,
  KEY_ADD,
  KEY_SUBTRACT,
  KEY_DECIMAL,
  KEY_DIVIDE,

  KEY_0,
  KEY_1,
  KEY_2,
  KEY_3,
  KEY_4,
  KEY_5,
  KEY_6,
  KEY_7,
  KEY_8,
  KEY_9,

  KEY_A,
  KEY_B,
  KEY_C,
  KEY_D,
  KEY_E,
  KEY_F,
  KEY_G,
  KEY_H,
  KEY_I,
  KEY_J,
  KEY_K,
  KEY_L,
  KEY_M,
  KEY_N,
  KEY_O,
  KEY_P,
  KEY_Q,
  KEY_R,
  KEY_S,
  KEY_T,
  KEY_U,
  KEY_V,
  KEY_W,
  KEY_X,
  KEY_Y,
  KEY_Z,

  KEY_LSHIFT,
  KEY_RSHIFT,
  KEY_LCONTROL,
  KEY_RCONTROL,
  KEY_LALT,
  KEY_RALT,
}

export enum FingerType {
  FINGER_UP = 0,
  FINGER_DOWN = 1,
  FINGER_MOTION = 2,
}

export class NodeEvent {
  readonly source: Node;
  constructor (source: Node) {
    this.source = source
  }
}

export class NodeChangeEvent extends NodeEvent {
  readonly target: Node;
  constructor (source: Node, target: Node) {
    super(source)
    this.target = target
  }
}

export class KeyEvent extends NodeEvent {
  readonly key: string;
  readonly code: string;
  readonly shift: boolean;
  readonly control: boolean;
  readonly alt: boolean;
  readonly metaKey: boolean;
  readonly repeat: boolean;
  readonly isComposing: boolean;

  constructor (
    source: Node,
    key: string,
    code: string,
    shift: boolean,
    control: boolean,
    alt: boolean,
    metaKey: boolean,
    repeat: boolean,
    isComposing: boolean
  ) {
    super(source)
    this.key = key
    this.code = code
    this.shift = shift
    this.control = control
    this.alt = alt
    this.metaKey = metaKey
    this.repeat = repeat
    this.isComposing = isComposing
  }
}

export class KeyPressEvent extends NodeEvent {
  readonly keyCode: KeyCode;
  readonly shift: boolean;
  readonly control: boolean;
  readonly alt: boolean;

  constructor (source: Node, keyCode: KeyCode, shift: boolean, control: boolean, alt: boolean) {
    super(source)
    this.keyCode = keyCode
    this.shift = shift
    this.control = control
    this.alt = alt
  }
}

export class CharEvent extends NodeEvent {
  readonly charCode: number;

  constructor (source: Node, charCode: number) {
    super(source)
    this.charCode = charCode
  }
}

export class MouseEvent extends NodeEvent {
  readonly x: number;
  readonly y: number;
  readonly mouseCode: MouseCode;
  readonly shift: boolean;
  readonly control: boolean;
  readonly alt: boolean;

  constructor (
    source: Node,
    x: number,
    y: number,
    mouseCode: MouseCode,
    shift: boolean,
    control: boolean,
    alt: boolean
  ) {
    super(source)
    this.x = x
    this.y = y
    this.mouseCode = mouseCode
    this.shift = shift
    this.control = control
    this.alt = alt
  }
}

export class MouseMoveEvent extends NodeEvent {
  readonly x: number;
  readonly y: number;
  readonly shift: boolean;
  readonly control: boolean;
  readonly alt: boolean;

  constructor (source: Node, x: number, y: number, shift: boolean, control: boolean, alt: boolean) {
    super(source)
    this.x = x
    this.y = y
    this.shift = shift
    this.control = control
    this.alt = alt
  }
}

export class TouchFingerEvent extends NodeEvent {
  readonly fingerType: FingerType;
  readonly fingerId: number;
  readonly touchId: number;
  readonly x: number;
  readonly y: number;
  readonly dx: number;
  readonly dy: number;
  readonly pressure: number;

  constructor (
    source: Node,
    fingerType: FingerType,
    fingerId: number,
    touchId: number,
    x: number,
    y: number,
    dx: number,
    dy: number,
    pressure: number
  ) {
    super(source)
    this.fingerType = fingerType
    this.fingerId = fingerId
    this.touchId = touchId
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.pressure = pressure
  }
}

export class PointerEvent extends MouseEvent {
  readonly height: number;
  readonly isPrimary: boolean;
  readonly pointerId: number;
  readonly pointerType: string;
  readonly pressure: number;
  readonly tangentialPressure: number;
  readonly tiltX: number;
  readonly tiltY: number;
  readonly twist: number;
  readonly width: number;

  constructor (
    source: Node,
    x: number,
    y: number,
    mouseCode: MouseCode,
    shift: boolean,
    control: boolean,
    alt: boolean,
    height: number,
    isPrimary: boolean,
    pointerId: number,
    pointerType: string,
    pressure: number,
    tangentialPressure: number,
    tiltX: number,
    tiltY: number,
    twist: number,
    width: number
  ) {
    super(source, x, y, mouseCode, shift, control, alt)
    this.height = height
    this.isPrimary = isPrimary
    this.pointerId = pointerId
    this.pointerType = pointerType
    this.pressure = pressure
    this.tangentialPressure = tangentialPressure
    this.tiltX = tiltX
    this.tiltY = tiltY
    this.twist = twist
    this.width = width
  }
}
