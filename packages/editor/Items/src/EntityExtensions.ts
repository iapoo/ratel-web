import { Color, Path, StrokeDashStyle } from '@ratel-web/engine'

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
}

export interface ShapeConfig {
  freeze: string
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
  adapterDirection: string
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
  buildShape: (renderContext: RenderContext) => void
  config: ShapeConfig
}
