/* eslint-disable max-params */
import * as CanvasKitInit from 'canvaskit-wasm'
// eslint-disable-next-line no-unused-vars
import { CanvasKit, Paint, RRect, FontMgr, Typeface, TypefaceFontProvider, PaintStyle, Canvas, Surface, Path, ClipOp, InputRect, InputRRect, InputMatrix, ColorIntArray, AngleInDegrees, Image, InputFlattenedRectangleArray, InputFlattenedRSXFormArray, BlendMode, CubicResampler, FilterOptions, InputColor, ColorInt, InputGlyphIDArray, InputFlattenedPointArray, Font, FilterMode, MipmapMode, InputIRect, Paragraph, Color, SkPicture, PointMode, InputVector3, TextBlob, Vertices, Matrix4x4, ImageInfo, MallocObj, ImageFilter, SaveLayerFlag, AlphaType, ColorType, ColorSpace, } from 'canvaskit-wasm/types'
import { EngineUtils, WebFonts, } from './EngineUtils'
import { Graphics, } from './Graphics'
import { Node, } from './Node'
import { Shape, } from './Shape'

export class Engine {
  private static _canvasKit: CanvasKit
  private static _typeFaceFontProvider: TypefaceFontProvider
  private static _fontDatas: Map<string, ArrayBuffer> = new Map<string, ArrayBuffer>()
  private static _typeFaces: Map<string, Typeface | null> = new Map<string, Typeface | null>()
  private static _initialized = false
  private static _fontInitialized = false
  private static _canvaskitInitialized = false
  private static _webFonts: WebFonts = new WebFonts()

  public static async initialize () {
    if (!this._initialized) {
      await Engine.initilizeCanvasKit()
      await Engine.initializeFonts()
      Engine._initialized = true
    }
  }

  public static async registerFont (fontName: string, fontUrl: string) {
    const response = await fetch(fontUrl)
    const fontData = await response.arrayBuffer()
    this._fontDatas.set(fontName, fontData)
    this._typeFaceFontProvider.registerFont(fontData, fontName)
    const typeface = Engine._canvasKit.Typeface.MakeFreeTypeFaceFromData(fontData)
    this._typeFaces.set(fontName, typeface)
  }

  public static get fontDatas () {
    return Engine._fontDatas
  }

  public static get canvasKit (): CanvasKit {
    return Engine._canvasKit
  }

  public static get typeFaceFontProvider () {
    return Engine._typeFaceFontProvider
  }

  public static get typeFaces() {
    return Engine._typeFaces
  }

  public static getFontData (fontName: string): ArrayBuffer | undefined {
    return this._fontDatas.get(fontName)
  }

  public static getTypeFace (fontName: string): Typeface | null {
    let typeface = this._typeFaces.get(fontName)
    if (typeface == undefined) {
      typeface = null
    }
    return typeface
  }

  public static makeFont (fontName: string, fontSize = 14): Font {
    const typeFace = this.getTypeFace(fontName)
    const font = new Engine._canvasKit.Font(typeFace, fontSize)
    font.setSubpixel(true)
    return font
  }

  public static makeEngine (canvasKit: CanvasKit, canvasId: string | HTMLCanvasElement): Engine {
    const surface = canvasKit.MakeWebGLCanvasSurface(canvasId)!
    const canvas = surface.getCanvas()
    if (canvasId instanceof HTMLCanvasElement) {
      const container = canvasId
      const engine = new Engine(surface, canvas, container)
      return engine
    } else {
      const container = document.getElementById(canvasId) as HTMLCanvasElement
      const engine = new Engine(surface, canvas, container)
      return engine
    }
  }

  public static makeMatrix (): number[] {
    return Engine._canvasKit.Matrix.identity()
  }

  public static makePaint (): Paint {
    return new Engine._canvasKit.Paint()
  }

  public static makePaintFrom (paint: Paint): Paint {
    return paint.copy()
  }

  public static makePath (): Path {
    return new Engine._canvasKit.Path()
  }

  public static makePathFrom (path: Path): Path {
    return path.copy()
  }

  public static makeImage (imageInfo: ImageInfo, bytes: number[], bytesPerRow: number): Image | null {
    return Engine._canvasKit.MakeImage(imageInfo, bytes, bytesPerRow)
  }

  public static makeImageFromEncoded (bytes: ArrayBuffer): Image | null {
    return Engine._canvasKit.MakeImageFromEncoded(bytes)
  }

  public static makeRoundRectangle (rect: number[], rx: number, ry: number): RRect {
    return Engine._canvasKit.RRectXY(rect, rx, ry)
  }

  public static makePathFromSVG (svg: string): Path {
    let path = Engine._canvasKit.Path.MakeFromSVGString(svg)
    if (!path) {
      path = this.makePath()
    }

    return path
  }

  public static makePathFromCmds (commands: number[]) {
    let path = Engine._canvasKit.Path.MakeFromCmds(commands)
    if (!path) {
      path = this.makePath()
    }

    return path
  }

  private static async initilizeCanvasKit () {
    if (!this._canvaskitInitialized) {
      const canvasKit: CanvasKit = await CanvasKitInit({
        locateFile: (file: any) => '/resources/' + file,
      })
      //console.log(canvasKit)

      Engine._canvasKit = canvasKit
      Engine._typeFaceFontProvider = Engine._canvasKit.TypefaceFontProvider.Make()
      Engine._canvaskitInitialized = true
    }
  }

  private static async initializeFonts () {
    if (!this._fontInitialized) {
      await this.registerFont(EngineUtils.FONT_NAME_ROBOTO, '/fonts/Roboto-Regular.woff2')
      await this.registerFont(EngineUtils.FONT_NAME_NOTOSERIFSC, '/fonts/Noto-Serif-SC-Regular.woff2')
      this._fontInitialized = true
    }
  }

  private _canvas: Canvas

  private _surface: Surface

  private _root: Node | undefined

  private _graphics: Graphics

  private _container: HTMLCanvasElement | undefined

  public get container () {
    return this._container
  }

  public get root (): Node | undefined {
    return this._root
  }

  public set root (field: Node | undefined) {
    this._root = field
  }

  public get graphics (): Graphics {
    return this._graphics
  }

  public get canvas () {
    return this._canvas
  }

  public get surface () {
    return this._surface
  }

  public get height () {
    return this._surface.height()
  }

  public get width () {
    return this._surface.width()
  }

  private constructor (surface: Surface, canvas: Canvas, container: HTMLCanvasElement | undefined) {
    this._canvas = canvas
    this._surface = surface
    this._graphics = new Graphics(this)
    this._container = container
  }

  public clear (color: number[]) {
    this._canvas.clear(color)
  }

  public clipPath (path: Path, op: ClipOp, doAntiAlias: boolean) {
    this._canvas.clipPath(path, op, doAntiAlias)
  }

  public clipRect (rect: InputRect, op: ClipOp, doAntiAlias: boolean) {
    this._canvas.clipRect(rect, op, doAntiAlias)
  }

  public clipRRect (rrect: InputRRect, op: ClipOp, doAntiAlias: boolean) {
    this._canvas.clipRRect(rrect, op, doAntiAlias)
  }

  public concat (m: number[]) {
    this._canvas.concat(m)
  }

  public drawArc (oval: number[], startAngle: number, sweepAngle: number,
    useCenter: boolean, paint: Paint) {
    this._canvas.drawArc(oval, startAngle, sweepAngle, useCenter, paint)
  }

  public drawAtlas (atlas: Image, srcRects: InputFlattenedRectangleArray,
    dstXforms: InputFlattenedRSXFormArray, paint: Paint,
    blendMode?: BlendMode | null, colors?: ColorIntArray | null,
    sampling?: CubicResampler | FilterOptions) {
    this._canvas.drawAtlas(atlas, srcRects, dstXforms, paint, blendMode, colors, sampling)
  }

  public drawCircle (cx: number, cy: number, radius: number, paint: Paint) {
    this._canvas.drawCircle(cx, cy, radius, paint)
  }

  public drawColor (color: InputColor, blendMode?: BlendMode) {
    this._canvas.drawColor(color, blendMode)
  }

  public drawColorComponents (r: number, g: number, b: number, a: number, blendMode?: BlendMode) {
    this._canvas.drawColorComponents(r, g, b, a, blendMode)
  }

  public drawColorInt (color: ColorInt, blendMode?: BlendMode) {
    this._canvas.drawColorInt(color, blendMode)
  }

  public drawDRRect (outer: InputRRect, inner: InputRRect, paint: Paint) {
    this._canvas.drawDRRect(outer, inner, paint)
  }

  public drawGlyphs (glyphs: InputGlyphIDArray,
    positions: InputFlattenedPointArray,
    x: number, y: number,
    font: Font, paint: Paint) {
    this._canvas.drawGlyphs(glyphs, positions, x, y, font, paint)
  }

  public drawImage (img: Image, left: number, top: number, paint?: Paint | null) {
    this._canvas.drawImage(img, left, top, paint)
  }

  public drawImageCubic (img: Image, left: number, top: number, B: number, C: number,
    paint?: Paint | null) {
    this._canvas.drawImageCubic(img, left, top, B, C, paint)
  }

  public drawImageOptions (img: Image, left: number, top: number, fm: FilterMode,
    mm: MipmapMode, paint?: Paint | null) {
    this._canvas.drawImageOptions(img, left, top, fm, mm, paint)
  }

  public drawImageNine (img: Image, center: InputIRect, dest: InputRect, filter: FilterMode,
    paint?: Paint | null) {
    this._canvas.drawImageNine(img, center, dest, filter, paint)
  }

  public drawImageRect (img: Image, src: InputRect, dest: InputRect, paint: Paint,
    fastSample?: boolean) {
    this._canvas.drawImageRect(img, src, dest, paint, fastSample)
  }

  public drawImageRectCubic (img: Image, src: InputRect, dest: InputRect,
    B: number, C: number, paint?: Paint | null) {
    this._canvas.drawImageRectCubic(img, src, dest, B, C, paint)
  }

  public drawImageRectOptions (img: Image, src: InputRect, dest: InputRect, fm: FilterMode,
    mm: MipmapMode, paint?: Paint | null) {
    this._canvas.drawImageRectOptions(img, src, dest, fm, mm, paint)
  }

  public drawLine (x0: number, y0: number, x1: number, y1: number, paint: Paint) {
    this._canvas.drawLine(x0, y0, x1, y1, paint)
  }

  public drawOval (oval: InputRect, paint: Paint) {
    this._canvas.drawOval(oval, paint)
  }

  public drawPaint (paint: Paint) {
    this._canvas.drawPaint(paint)
  }

  public drawParagraph (p: Paragraph, x: number, y: number) {
    this._canvas.drawParagraph(p, x, y)
  }

  public drawPath (path: Path, paint: Paint) {
    this._canvas.drawPath(path, paint)
  }

  public drawPatch (cubics: InputFlattenedPointArray,
    colors?: ColorIntArray | Color[] | null,
    texs?: InputFlattenedPointArray | null,
    mode?: BlendMode | null,
    paint?: Paint) {
    this._canvas.drawPatch(cubics, colors, texs, mode, paint)
  }

  public drawPicture (skp: SkPicture) {
    this._canvas.drawPicture(skp)
  }

  public drawPoints (mode: PointMode, points: InputFlattenedPointArray, paint: Paint) {
    this._canvas.drawPoints(mode, points, paint)
  }

  public drawRect (rect: InputRect, paint: Paint) {
    this._canvas.drawRect(rect, paint)
  }

  public drawRect4f (left: number, top: number, right: number, bottom: number, paint: Paint) {
    this._canvas.drawRect4f(left, top, right, bottom, paint)
  }

  public drawRRect (rrect: InputRRect, paint: Paint) {
    this._canvas.drawRRect(rrect, paint)
  }

  public drawShadow (path: Path, zPlaneParams: InputVector3, lightPos: InputVector3, lightRadius: number,
    ambientColor: InputColor, spotColor: InputColor, flags: number) {
    this._canvas.drawShadow(path, zPlaneParams, lightPos, lightRadius, ambientColor, spotColor, flags)
  }

  public drawText (str: string, x: number, y: number, paint: Paint, font: Font) {
    this._canvas.drawText(str, x, y, paint, font)
  }

  public drawTextBlob (blob: TextBlob, x: number, y: number, paint: Paint) {
    this._canvas.drawTextBlob(blob, x, y, paint)
  }

  public drawVertices (verts: Vertices, mode: BlendMode, paint: Paint) {
    this._canvas.drawVertices(verts, mode, paint)
  }

  public getLocalToDevice (): Matrix4x4 | null {
    return this._canvas.getLocalToDevice()
  }

  public getSaveCount (): number {
    return this._canvas.getSaveCount()
  }

  public getTotalMatrix (): number[] {
    return this._canvas.getTotalMatrix()
  }

  public makeSurface (info: ImageInfo): Surface | null {
    return this._canvas.makeSurface(info)
  }

  public readPixels (srcX: number, srcY: number, imageInfo: ImageInfo, dest?: MallocObj,
    bytesPerRow?: number) {
    this._canvas.readPixels(srcX, srcY, imageInfo, dest, bytesPerRow)
  }

  public restore () {
    this._canvas.restore()
  }
  public restoreToCount (saveCount: number) {
    this._canvas.restoreToCount(saveCount)
  }

  public rotate (rot: AngleInDegrees, rx: number, ry: number) {
    this._canvas.rotate(rot, rx, ry)
  }

  public save () {
    this._canvas.save()
  }

  public saveLayer (paint?: Paint, bounds?: InputRect | null, backdrop?: ImageFilter | null,
    flags?: SaveLayerFlag) {
    this._canvas.saveLayer(paint, bounds, backdrop, flags)
  }

  public scale (sx: number, sy: number) {
    this._canvas.scale(sx, sy)
  }

  public skew (sx: number, sy: number) {
    this._canvas.skew(sx, sy)
  }

  public translate (dx: number, dy: number) {
    this._canvas.translate(dx, dy)
  }

  public writePixels (pixels: Uint8Array | number[], srcWidth: number, srcHeight: number,
    destX: number, destY: number, alphaType?: AlphaType, colorType?: ColorType,
    colorSpace?: ColorSpace) {
    this._canvas.writePixels(pixels, srcWidth, srcHeight, destX, destY, alphaType, colorType, colorSpace)
  }
}

export class MatrixHelper {
  public static identity (): number[] {
    return Engine.canvasKit.Matrix.identity()
  }

  public static invert (matrix: number[]): number[] | null {
    return Engine.canvasKit.Matrix.invert(matrix)
  }

  public static rotate (angle: number, px: number | undefined, py: number | undefined): number[] {
    return Engine.canvasKit.Matrix.rotated(angle, px, py)
  }

  public static multiply (...matrices: number[][]): number[] {
    return Engine.canvasKit.Matrix.multiply(...matrices)
  }

  public static scale (sx: number, sy: number, px?: number, py?: number): number[] {
    return Engine.canvasKit.Matrix.scaled(sx, sy, px, py)
  }

  public static skew (kx: number, ky: number, px?: number, py?: number): number[] {
    return Engine.canvasKit.Matrix.skewed(kx, ky, px, py)
  }
  public static translate (dx: number, dy: number): number[] {
    return Engine.canvasKit.Matrix.translated(dx, dy)
  }
  public static mapPoints (m: number[], points: number[]): number[] {
    return Engine.canvasKit.Matrix.mapPoints(m, points)
  }
}
