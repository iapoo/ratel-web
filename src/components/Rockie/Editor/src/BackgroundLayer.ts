/* eslint-disable max-params */
import { Color, Colors, Graphics, Paint, PaintStyle, Path, Rectangle, } from '@/components/Engine'
import { Editor, } from './Editor'
import { EditorLayer, } from './EditorLayer'

export class BackgroundLayer extends EditorLayer {
  private _mainStroke: Paint
  private _subStroke: Paint
  private _mainPath: Path
  private _subPath: Path
  private _gridSize: number
  private _gridZoom: number
  private _editor: Editor

  public constructor (editor: Editor, left = 0, top = 0, width = 100, height = 100, gridSize = 16, gridZoom = 1.0) {
    super(left, top, width, height, true)
    this._mainStroke = new Paint()
    this._mainStroke.setPaintStyle(PaintStyle.STROKE)
    this._mainStroke.setColor(Colors.Gray)
    this._mainStroke.setStrokeWidth(1)
    this._mainStroke.setAntiAlias(false)
    this._mainStroke.setAlpha(0.3)
    this._subStroke = new Paint()
    this._subStroke.setPaintStyle(PaintStyle.STROKE)
    this._subStroke.setColor(Colors.LightGrey)
    this._subStroke.setStrokeWidth(1)
    this._subStroke.setAntiAlias(false)
    this._subStroke.setAlpha(0.3)
    this._mainPath = new Path()
    this._subPath = new Path()
    this._gridSize = gridSize
    this._gridZoom = gridZoom
    this._editor = editor
    this.buildLayer()
  }

  public get gridZoom () {
    return this._gridZoom
  }

  public set gridZoom (value: number) {
    this._gridZoom = value
    this.invalidateLayer()
  }

  public set gridSize (value: number) {
    this._gridSize = value
    this.invalidateLayer()
  }

  public get gridSize () {
    return this._gridSize
  }

  public render (graphics: Graphics): void {
    super.render(graphics)

    graphics.drawPath(this._subPath, this._subStroke)
    graphics.drawPath(this._mainPath, this._mainStroke)
  }

  protected buildLayer () {
    const theGridSize = this._gridSize * this._editor.zoom
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
}
