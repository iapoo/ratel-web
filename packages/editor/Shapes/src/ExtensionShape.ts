/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */

import { Color, Graphics, Path, StrokeDashStyle } from '@ratel-web/engine'
import { EditorItem } from '../../Items'
import { EntityShape, ShapeTypeInfo } from './EntityShape'

export interface RenderContext {
  readonly path: Path
  readonly secondPath: Path
  readonly fourthPath: Path
  readonly thirdPath: Path
  readonly strokeColor: Color
  readonly fillColor: Color
  readonly lineWidth: number
  filled: boolean
  stroked: boolean
  strokeDashStyle: StrokeDashStyle
  secondStrokeColor: Color
  secondFillColor: Color
  secondStroked: boolean
  secondFilled: boolean
  thirdStrokeColor: Color
  thirdFillColor: Color
  thirdStroked: boolean
  thirdFilled: boolean
  fourthStrokeColor: Color
  fourthFillColor: Color
  fourthStroked: boolean
  fourthFilled: boolean
  readonly width: number
  readonly height: number
  readonly modifierWidth: number
  readonly modifierHeight: number
  readonly controllerWidth: number
  readonly controllerHeight: number
  readonly adapterWidth: number
  readonly adapterHeight: number
  readonly adapterSizeX: number
  readonly adapterSizeY: number
  addItem(item: EditorItem): void
}

export interface ShapeConfig {
  freeze: 'None' | 'Width' | 'WidthHeight' | 'Height' | 'AspectRatio'
  text: string
  left: number
  top: number
  width: number
  height: number
  enableMask: boolean
  modifiable: boolean
  modifierX: number
  modifierY: number
  modifierStartX: number
  modifierStartY: number
  modifierEndX: number
  modifierEndY: number
  modifyInLine: boolean
  modifyInPercent: boolean
  controllable: boolean
  controllerX: number
  controllerY: number
  controllerStartX: number
  controllerStartY: number
  controllerEndX: number
  controllerEndY: number
  controlInLine: boolean
  controlInPercent: boolean
  adaptable: boolean
  adapterX: number
  adapterY: number
  adapterDirection: 'X' | 'Y'
  adapterSize: number
  adapterStartX: number
  adapterStartY: number
  adapterEndX: number
  adapterEndY: number
  adaptInLine: boolean
  adaptInPercent: boolean
}

export interface ConnectorConfig {
  text: string
  startX: number
  startY: number
  endX: number
  endY: number
  startArrowTypeName: string
  endArrowTypeName: string
  strokeDashStyle: 'solid' | 'dash' | 'dot' | 'dash-dot' | 'dash-dot-dot'
  connectorType: 'straight' | 'curved' | 'orthogonal'
  width: number
  height: number
}

export interface TableConfig {
  freeze: 'None' | 'Width' | 'WidthHeight' | 'Height' | 'AspectRatio'
  text: string
  left: number
  top: number
  width: number
  height: number
  rowCount: number
  columnCount: number
  fixedFirstRow: boolean
  firstRowHeight: number
  fixedFirstColumn: boolean
  firstColumnWidth: number
  enableMask: boolean
  modifiable: boolean
  modifierX: number
  modifierY: number
  modifierStartX: number
  modifierStartY: number
  modifierEndX: number
  modifierEndY: number
  modifyInLine: boolean
  modifyInPercent: boolean
  controllable: boolean
  controllerX: number
  controllerY: number
  controllerStartX: number
  controllerStartY: number
  controllerEndX: number
  controllerEndY: number
  controlInLine: boolean
  controlInPercent: boolean
  adaptable: boolean
  adapterX: number
  adapterY: number
  adapterDirection: 'X' | 'Y'
  adapterSize: number
  adapterStartX: number
  adapterStartY: number
  adapterEndX: number
  adapterEndY: number
  adaptInLine: boolean
  adaptInPercent: boolean
}

export interface EntityExtension {
  name: string
  description: string
  icon: string
  type: 'shape' | 'container' | 'connector' | 'table' | 'frame'
  setup: ((config: ShapeConfig | ConnectorConfig | TableConfig) => EditorItem[]) | null
  render: ((renderContext: RenderContext, config: ShapeConfig | ConnectorConfig | TableConfig) => void) | null
  config: ShapeConfig | ConnectorConfig | TableConfig
}

export class EntityRenderContext implements RenderContext {
  private _extensionShape: ExtensionShape
  private _modifierWidth: number = 0
  private _modifierHeight: number = 0
  private _controllerWidth: number = 0
  private _controllerHeight: number = 0
  private _adapterWidth: number = 0
  private _adapterHeight: number = 0
  private _adapterSizeX: number = 0
  private _adapterSizeY: number = 0

  public addItem(item: EditorItem) {
    console.log(item)
  }
  public constructor(extensionShape: ExtensionShape) {
    this._extensionShape = extensionShape
  }

  public get path() {
    return this._extensionShape.path
  }
  public get secondPath() {
    return this._extensionShape.secondPath
  }
  public get fourthPath() {
    return this._extensionShape.fourthPath
  }
  public get thirdPath() {
    return this._extensionShape.thirdPath
  }
  public get strokeColor() {
    return this._extensionShape.stroke.getColor()
  }
  public get fillColor() {
    return this._extensionShape.fill.getColor()
  }
  public get lineWidth() {
    return this._extensionShape.stroke.getStrokeWidth()
  }

  public get filled() {
    return this._extensionShape.filled
  }
  public set filled(value: boolean) {
    this._extensionShape.filled = value
  }
  public get stroked() {
    return this._extensionShape.stroked
  }

  public set stroked(value: boolean) {
    this._extensionShape.stroked = value
  }

  public get strokeDashStyle() {
    return this._extensionShape.stroke.getStrokeDashStyle()
  }

  public set strokeDashStyle(value: StrokeDashStyle) {
    this._extensionShape.stroke.setStrokeDashStyle(value)
  }

  public get secondStrokeColor() {
    return this._extensionShape.secondStroke.getColor()
  }

  public set secondStrokeColor(value: Color) {
    this._extensionShape.secondStroke.setColor(value)
  }

  public get secondFillColor() {
    return this._extensionShape.secondFill.getColor()
  }

  public set secondFillColor(value: Color) {
    this._extensionShape.secondFill.setColor(value)
  }

  public get secondStroked() {
    return this._extensionShape.secondStroked
  }

  public set secondStroked(value: boolean) {
    this._extensionShape.secondStroked = value
  }

  public get secondFilled() {
    return this._extensionShape.secondFilled
  }

  public set secondFilled(value) {
    this._extensionShape.secondFilled = value
  }

  public get thirdStrokeColor() {
    return this._extensionShape.thirdStroke.getColor()
  }

  public set thirdStrokeColor(value: Color) {
    this._extensionShape.thirdStroke.setColor(value)
  }

  public get thirdFillColor() {
    return this._extensionShape.thirdFill.getColor()
  }

  public set thirdFillColor(value: Color) {
    this._extensionShape.thirdFill.setColor(value)
  }

  public get thirdStroked() {
    return this._extensionShape.thirdStroked
  }

  public set thirdStroked(value: boolean) {
    this._extensionShape.thirdStroked = value
  }

  public get thirdFilled() {
    return this._extensionShape.thirdFilled
  }
  public set thirdFilled(value) {
    this._extensionShape.thirdFilled = value
  }

  public get fourthStrokeColor() {
    return this._extensionShape.fourthStroke.getColor()
  }

  public set fourthStrokeColor(value: Color) {
    this._extensionShape.fourthStroke.setColor(value)
  }

  public get fourthFillColor() {
    return this._extensionShape.fourthFill.getColor()
  }

  public set fourthFillColor(value: Color) {
    this._extensionShape.fourthFill.setColor(value)
  }

  public get fourthStroked() {
    return this._extensionShape.fourthStroked
  }

  public set fourthStroked(value: boolean) {
    this._extensionShape.fourthStroked = value
  }

  public get fourthFilled() {
    return this._extensionShape.fourthFilled
  }

  public set fourthFilled(value: boolean) {
    this._extensionShape.fourthFilled = value
  }

  public get width() {
    return this._extensionShape.width
  }

  public get height() {
    return this._extensionShape.height
  }

  public get modifierWidth() {
    return this._modifierWidth
  }

  public get modifierHeight() {
    return this._modifierHeight
  }

  public get controllerWidth() {
    return this._controllerWidth
  }

  public get controllerHeight() {
    return this._controllerHeight
  }

  public get adapterWidth() {
    return this._adapterWidth
  }

  public get adapterHeight() {
    return this._adapterHeight
  }

  public get adapterSizeX() {
    return this._adapterSizeX
  }

  public get adapterSizeY() {
    return this._adapterSizeY
  }

  public prepareRender() {
    this._modifierWidth = this._extensionShape.modifier.x + this._extensionShape.typeInfo.modifierStart.x * this._extensionShape.width
    this._modifierHeight = this._extensionShape.modifier.y + this._extensionShape.typeInfo.modifierStart.y * this._extensionShape.height
    this._controllerWidth = this._extensionShape.controller.x + this._extensionShape.typeInfo.controllerStart.x * this._extensionShape.width
    this._controllerHeight = this._extensionShape.controller.y + this._extensionShape.typeInfo.controllerStart.y * this._extensionShape.height
    this._adapterWidth = this._extensionShape.adapter.x + this._extensionShape.typeInfo.adapterStart.x * this._extensionShape.width
    this._adapterHeight = this._extensionShape.adapter.y + this._extensionShape.typeInfo.adapterStart.y * this._extensionShape.height
    this._adapterSizeX = this._extensionShape.adapterSize
    this._adapterSizeY = this._extensionShape.adapterSize
    if (this._extensionShape.typeInfo.modifyInPercent) {
      this._modifierWidth =
        this._extensionShape.width *
          this._extensionShape.modifier.x *
          (this._extensionShape.typeInfo.modifierEnd.x - this._extensionShape.typeInfo.modifierStart.x) +
        this._extensionShape.typeInfo.modifierStart.x * this._extensionShape.width
      this._modifierHeight =
        this._extensionShape.height *
          this._extensionShape.modifier.y *
          (this._extensionShape.typeInfo.modifierEnd.y - this._extensionShape.typeInfo.modifierStart.y) +
        this._extensionShape.typeInfo.modifierStart.y * this._extensionShape.height
    }
    if (this._extensionShape.typeInfo.controlInPercent) {
      this._controllerWidth =
        this._extensionShape.width *
          this._extensionShape.controller.x *
          (this._extensionShape.typeInfo.controllerEnd.x - this._extensionShape.typeInfo.controllerStart.x) +
        this._extensionShape.typeInfo.controllerStart.x * this._extensionShape.width
      this._controllerHeight =
        this._extensionShape.height *
          this._extensionShape.controller.y *
          (this._extensionShape.typeInfo.controllerEnd.y - this._extensionShape.typeInfo.controllerStart.y) +
        this._extensionShape.typeInfo.controllerStart.y * this._extensionShape.height
    }
    if (this._extensionShape.typeInfo.adaptInPercent) {
      this._adapterWidth =
        this._extensionShape.width *
          this._extensionShape.adapter.x *
          (this._extensionShape.typeInfo.adapterEnd.x - this._extensionShape.typeInfo.adapterStart.x) +
        this._extensionShape.typeInfo.adapterStart.x * this._extensionShape.width
      this._adapterHeight =
        this._extensionShape.height *
          this._extensionShape.adapter.y *
          (this._extensionShape.typeInfo.adapterEnd.y - this._extensionShape.typeInfo.adapterStart.y) +
        this._extensionShape.typeInfo.adapterStart.y * this._extensionShape.height
      this._adapterSizeX =
        this._extensionShape.adapterSize * (this._extensionShape.typeInfo.adapterEnd.x - this._extensionShape.typeInfo.adapterStart.x) * this.width
      this._adapterSizeY =
        this._extensionShape.adapterSize * (this._extensionShape.typeInfo.adapterEnd.y - this._extensionShape.typeInfo.adapterStart.y) * this.height
    }
  }
}

export class ExtensionShape extends EntityShape {
  private _buildShape: (renderContext: EntityRenderContext, extensionShape: ExtensionShape, entityExtension: EntityExtension) => void
  private _entityExtension: EntityExtension
  private _renderContext: EntityRenderContext

  public constructor(
    left: number,
    top: number,
    width: number,
    height: number,
    entityExtension: EntityExtension,
    buildShape: (renderContext: EntityRenderContext, extensionShape: ExtensionShape, entityExtension: EntityExtension) => void,
    shapeTypeInfo: ShapeTypeInfo,
  ) {
    super('', left, top, width, height, shapeTypeInfo)
    this._buildShape = buildShape
    this._entityExtension = entityExtension
    this._renderContext = new EntityRenderContext(this)
  }

  public render(graphics: Graphics): void {
    super.render(graphics)
    if (this.secondFilled) {
      graphics.drawPath(this.secondPath, this.secondFill)
    }
    if (this.secondStroked) {
      graphics.drawPath(this.secondPath, this.secondStroke)
    }
    if (this.thirdFilled) {
      graphics.drawPath(this.thirdPath, this.thirdFill)
    }
    if (this.thirdStroked) {
      graphics.drawPath(this.thirdPath, this.thirdStroke)
    }
    if (this.fourthFilled) {
      graphics.drawPath(this.fourthPath, this.fourthFill)
    }
    if (this.fourthStroked) {
      graphics.drawPath(this.fourthPath, this.fourthStroke)
    }
  }

  public update() {
    super.update()
    this._buildShape(this._renderContext, this, this._entityExtension)
  }

  public dispose(): void {
    this.secondPath.delete()
    this.thirdPath.delete()
    this.fourthPath.delete()
  }
}
