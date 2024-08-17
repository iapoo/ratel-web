/* eslint-disable max-params */
import { Color, Colors, Graphics, Paint, PaintStyle, Path, Rectangle, } from '@/components/Engine'
import { Editor, } from './Editor'
import { EditorLayer, } from './EditorLayer'
import { EditorUtils } from '../../Theme'

export class BackgroundLayer extends EditorLayer {
  private _mainStroke: Paint
  private _subStroke: Paint
  private _mainPath: Path
  private _subPath: Path
  private _gridSize: number
  private _gridZoom: number
  private _theEditor: Editor
  private _gridColor: Color
  private _backgroundBrush: Paint
  private _backgroundColor: Color
  private _workPaint: Paint
  private _spacePaint: Paint

  public constructor(editor: Editor, left = 0, top = 0, width = 100, height = 100, gridSize = 16, gridZoom = 1.0) {
    super(left, top, width, height, true)
    this.editor = editor
    this._gridColor = editor.gridColor
    this._backgroundColor = editor.backgroundColor
    this._spacePaint = new Paint()
    this._spacePaint.setColor(EditorUtils.backgroundSpaceColor)
    this._workPaint = new Paint()
    this._workPaint.setColor(EditorUtils.backgroundWorkColor)
    this._mainStroke = new Paint()
    this._subStroke = new Paint()
    this._backgroundBrush = new Paint()
    this.refreshGridPaints()
    this._mainPath = new Path()
    this._subPath = new Path()
    this._gridSize = gridSize
    this._gridZoom = gridZoom
    this._theEditor = editor
    this.buildLayer()
  }

  public get gridZoom() {
    return this._gridZoom
  }

  public set gridZoom(value: number) {
    this._gridZoom = value
    this.invalidateLayer()
  }

  public set gridSize(value: number) {
    this._gridSize = value
    this.invalidateLayer()
  }

  public get gridSize() {
    return this._gridSize
  }

  public get gridColor() {
    return this._gridColor
  }

  public set gridColor(value: Color) {
    this._gridColor = value
    this.refreshGridPaints()
    this.invalidateLayer()
  }

  public get backgroundColor() {
    return this._backgroundColor
  }

  public set backgroundColor(value: Color) {
    this._backgroundColor = value
    this.refreshGridPaints()
    this.invalidateLayer()
  }

  public render(graphics: Graphics): void {
    super.render(graphics)
    this._spacePaint.setColor(EditorUtils.backgroundSpaceColor)
    this._workPaint.setColor(EditorUtils.backgroundWorkColor)
    if (this.editor) {
      graphics.drawRectangle(Rectangle.makeLTWH(-this.editor.horizontalSpace, -this.editor.verticalSpace, this.editor.width, this.editor.height), this._spacePaint)
    }
    graphics.drawRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height), this._workPaint)
    if (this._theEditor.showBackground) {
      graphics.drawRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height), this._backgroundBrush)
    }
    if (this._theEditor.showGrid) {
      graphics.drawPath(this._subPath, this._subStroke)
      graphics.drawPath(this._mainPath, this._mainStroke)
    }
  }

  public dispose(): void {
    super.dispose()
    if (this._mainStroke) {
      this._mainPath.delete()
    }
    if (this._subStroke) {
      this._subStroke.delete()
    }
    if (this._mainPath) {
      this._mainPath.delete()
    }
    if (this._subPath) {
      this._subPath.delete()
    }
    if (this._backgroundBrush) {
      this._backgroundBrush.delete()
    }
    if (this._workPaint) {
      this._workPaint.delete()
    }
    if (this._spacePaint) {
      this._spacePaint.delete()
    }
  }
  protected buildLayer() {
    const theGridSize = this._gridSize * this._theEditor.zoom
    this._subPath.reset()
    this._mainPath.reset()
    let count = Math.round(this.height / theGridSize)
    for (let i = 0; i < count; i++) {
      this._subPath.moveTo(0, i * theGridSize)
      this._subPath.lineTo(this.width, i * theGridSize)
    }
    count = Math.round(this.width / theGridSize)
    for (let i = 0; i < count; i++) {
      this._subPath.moveTo(i * theGridSize, 0)
      this._subPath.lineTo(i * theGridSize, this.height)
    }
    count = Math.floor(this.height / theGridSize / 5)
    for (let i = 0; i < count; i++) {
      this._mainPath.moveTo(0, i * theGridSize * 5)
      this._mainPath.lineTo(this.width, i * theGridSize * 5)
    }
    count = Math.round(this.width / theGridSize / 5)
    for (let i = 0; i < count; i++) {
      this._mainPath.moveTo(i * theGridSize * 5, 0)
      this._mainPath.lineTo(i * theGridSize * 5, this.height)
    }
    this._mainPath.addRectangle(new Rectangle(0, 0, this.width, this.height))
  }

  private refreshGridPaints() {
    let r = Math.round((this._gridColor.r + (1 - this._gridColor.r) * 0.75) * 255)
    let g = Math.round((this._gridColor.g + (1 - this._gridColor.g) * 0.75) * 255)
    let b = Math.round((this._gridColor.b + (1 - this._gridColor.b) * 0.75) * 255)
    let a = 255
    this._mainStroke.setPaintStyle(PaintStyle.STROKE)
    this._mainStroke.setColor(this._gridColor)
    this._mainStroke.setStrokeWidth(1)
    this._mainStroke.setAntiAlias(false)
    this._mainStroke.setAlpha(0.3)
    this._subStroke.setPaintStyle(PaintStyle.STROKE)
    this._subStroke.setColor(new Color(r, g, b, a))
    this._subStroke.setStrokeWidth(1)
    this._subStroke.setAntiAlias(false)
    this._subStroke.setAlpha(0.3)
    this._backgroundBrush.setPaintStyle(PaintStyle.FILL)
    this._backgroundBrush.setColor(this._backgroundColor)
  }
}
