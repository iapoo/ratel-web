import { Color, Colors, Point2, StrokeDashStyle, TextAlignment, TextVerticalAlignment } from '@ratel-web/engine'
import { Arrows } from '../../CustomItems/Arrows'
import { BasicShapes } from '../../CustomItems/BasicShapes'
import { ERCustomShapes } from '../../CustomItems/EntityRelation'
import { FlowChartShapes } from '../../CustomItems/FlowChart'
import { MockupShapes } from '../../CustomItems/Mockup'
import {
  UMLBasicShapes,
  UMLConnectors,
  UMLContainerShapes,
  UMLCustomContainers,
  UMLCustomShapes,
  UMLCustomTables,
  UMLFrameShapes,
} from '../../CustomItems/UML'
import {
  ConnectorArrowInfo,
  ConnectorArrowType,
  ContainerEntity,
  CustomConnector,
  CustomConnectorTypeInfo,
  CustomContainerEntity,
  CustomEntity,
  CustomTableEntity,
  CustomTableType,
  FrameEntity,
  ShapeEntity,
  ShapeType,
} from '../../Items'
import {
  ConnectorArrowDisplayMode,
  ConnectorArrowDisplayType,
  ConnectorDirection,
  ConnectorMode,
  ConnectorType,
} from '../../Shapes'
import { Constants } from './Constants'

export interface CustomShapeType {
  type: typeof CustomEntity
  shapeType: ShapeType
}

export interface CustomTableShapeType {
  type: typeof CustomTableEntity
  shapeType: CustomTableType
}

export interface ContainerShapeType {
  type: typeof ContainerEntity
  shapeType: ShapeType
}

export interface ExtendedShapeType {
  type: typeof ShapeEntity
  shapeType: ShapeType
}

export interface CustomConnectorType {
  type: typeof CustomConnector
  shapeType: CustomConnectorTypeInfo
}

export interface FrameShapeType {
  type: typeof FrameEntity
  shapeType: ShapeType
}

export interface CustomContainerType {
  type: typeof CustomContainerEntity
  shapeType: ShapeType
}

//FIXME, Move it to better place
export const CustomShapes = [
  ...BasicShapes,
  ...Arrows,
  ...FlowChartShapes,
  ...UMLCustomShapes,
  ...ERCustomShapes,
  ...MockupShapes,
]

export const CustomTableShapes = [...UMLCustomTables]

export const ExtendedContainerTypes = [...UMLContainerShapes]

export const ExtendedShapes = [...UMLBasicShapes]

export const CustomConnectors = [...UMLConnectors]

export const FrameShapes = [...UMLFrameShapes]

export const CustomContainers = [...UMLCustomContainers]

export class CommonUtils {
  public static CONNECTOR_TYPE_STRAIGHT_LINE = 'StraightLine'
  public static CONNECTOR_TYPE_CURVE = 'Curve'
  public static CONNECTOR_TYPE_CROSS_LINE = 'Orthogonal'

  public static parseConnectorType(connectorType: string): ConnectorType {
    switch (connectorType) {
      case Constants.CONNECTOR_LINE_TYPE_CURVED:
        return ConnectorType.Curve
        break
      case Constants.CONNECTOR_LINE_TYPE_STRAIGHT:
        return ConnectorType.StraightLine
        break
      case Constants.CONNECTOR_LINE_TYPE_ORTHOGONAL:
      default:
        return ConnectorType.Orthogonal
        break
    }
  }

  public static generateConnectorType(connectorType: ConnectorType): string {
    switch (connectorType) {
      case ConnectorType.Curve:
        return Constants.CONNECTOR_LINE_TYPE_CURVED
        break
      case ConnectorType.StraightLine:
        return Constants.CONNECTOR_LINE_TYPE_STRAIGHT
        break
      case ConnectorType.Orthogonal:
      default:
        return Constants.CONNECTOR_LINE_TYPE_ORTHOGONAL
        break
    }
  }
  // public static parseConnectorType(connectorType: ConnectorType): string {
  //   switch (connectorType) {
  //     case ConnectorType.Curve:
  //       return this.CONNECTOR_TYPE_CURVE
  //       break
  //     case ConnectorType.Orthogonal:
  //       return this.CONNECTOR_TYPE_CROSS_LINE
  //       break
  //     case ConnectorType.StraightLine:
  //     default:
  //       return this.CONNECTOR_TYPE_STRAIGHT_LINE
  //       break
  //   }
  // }
  //
  // public static parseConnectorTypeString(connectorType: string): ConnectorType {
  //   switch (connectorType) {
  //     case this.CONNECTOR_TYPE_CURVE:
  //       return ConnectorType.Curve
  //       break
  //     case this.CONNECTOR_TYPE_CROSS_LINE:
  //       return ConnectorType.Orthogonal
  //       break
  //     case this.CONNECTOR_TYPE_STRAIGHT_LINE:
  //     default:
  //       return ConnectorType.StraightLine
  //       break
  //   }
  // }

  public static isNumeric(str: string): boolean {
    // @ts-ignore
    return !isNaN(parseFloat(str)) && isFinite(str)
  }

  /**
   * REF: https://blog.csdn.net/qq_23365135/article/details/123833406
   * @param point
   * @returns
   */
  public static isPointString(point: string): boolean {
    if (point && point.length >= 3) {
      let index = point.indexOf(',')
      if (index >= 1 && index < point.length - 1) {
        let x = point.substring(0, index)
        let y = point.substring(index + 1)
        return this.isNumeric(x) && this.isNumeric(y)
      }
    }
    return false
  }

  public static generatePointString(point: Point2): string {
    return point.x + ',' + point.y
  }

  public static parsePointString(point: string): Point2 {
    if (point && point.length >= 3) {
      let index = point.indexOf(',')
      if (index >= 1 && index < point.length - 1) {
        let x = point.substring(0, index)
        let y = point.substring(index + 1)
        return new Point2(parseFloat(x), parseFloat(y))
      }
    }
    return new Point2()
  }
  public static generateID(): string {
    let d = new Date().getTime()
    if (window.performance && typeof window.performance.now === 'function') {
      d += performance.now()
    }
    let id = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
    })
    return id
  }

  public static generatePointsString(points: Point2[]): string {
    let result = ''
    const count = points.length
    for (let i = 0; i < count; i++) {
      const point = points[i]
      result += point.x + ',' + point.y + ';'
    }
    return result
  }

  public static parsePointsString(points: string): Point2[] {
    let result: Point2[] = []
    if (points && points.length > 3) {
      const pointStrs = points.split(';')
      if (pointStrs.length > 0) {
        pointStrs.forEach((pointStr) => {
          if (pointStr && pointStr.length > 0) {
            // It may be emptyt string here and need to ignore
            const point = CommonUtils.parsePointString(pointStr)
            if (point) {
              result.push(point)
            }
          }
        })
      }
    }
    return result
  }

  public static generateColorString(color: Color): string {
    let rstr = '0' + Math.round(color.r * 255).toString(16)
    let gstr = '0' + Math.round(color.g * 255).toString(16)
    let bstr = '0' + Math.round(color.b * 255).toString(16)
    let astr = '0' + Math.round(color.a * 255).toString(16)
    let rgba = '#' + rstr.slice(-2) + gstr.slice(-2) + bstr.slice(-2) + astr.slice(-2)
    return rgba.toUpperCase()
  }

  public static parseStrokeDashStyle(strokeDashStyle: string): StrokeDashStyle {
    switch (strokeDashStyle) {
      case Constants.STROKE_DASH_STYLE_DASH:
        return StrokeDashStyle.DASH
        break
      case Constants.STROKE_DASH_STYLE_DOT:
        return StrokeDashStyle.DOT
        break
      case Constants.STROKE_DASH_STYLE_DASH_DOT:
        return StrokeDashStyle.DASH_DOT
        break
      case Constants.STROKE_DASH_STYLE_DASH_DOT_DOT:
        return StrokeDashStyle.DASH_DOT_DOT
        break
      case Constants.STROKE_DASH_STYLE_SOLID:
      default:
        return StrokeDashStyle.SOLID
        break
    }
  }

  public static generateStrokeDashStyle(strokeDashStyle: StrokeDashStyle): string {
    switch (strokeDashStyle) {
      case StrokeDashStyle.DASH: {
        return Constants.STROKE_DASH_STYLE_DASH
        break
      }
      case StrokeDashStyle.DOT: {
        return Constants.STROKE_DASH_STYLE_DOT
      }
      case StrokeDashStyle.DASH_DOT: {
        return Constants.STROKE_DASH_STYLE_DASH_DOT
        break
      }
      case StrokeDashStyle.DASH_DOT_DOT: {
        return Constants.STROKE_DASH_STYLE_DASH_DOT_DOT
        break
      }
      case StrokeDashStyle.SOLID:
      default:
        return Constants.STROKE_DASH_STYLE_SOLID
        break
    }
  }

  public static parseTextAlignment(textAlignment: string): TextAlignment {
    switch (textAlignment) {
      case Constants.TEXT_ALIGNMENT_CENTER:
        return TextAlignment.CENTER
        break
      case Constants.TEXT_ALIGNMENT_END:
        return TextAlignment.END
        break
      case Constants.TEXT_ALIGNMENT_JUSTIFY:
        return TextAlignment.JUSTIFY
        break
      case Constants.TEXT_ALIGNMENT_RIGHT:
        return TextAlignment.RIGHT
        break
      case Constants.TEXT_ALIGNMENT_START:
        return TextAlignment.START
        break
      case Constants.TEXT_ALIGNMENT_LEFT:
      default:
        return TextAlignment.LEFT
        break
    }
  }

  public static generateTextAlignment(textAlignment: TextAlignment): string {
    switch (textAlignment) {
      case TextAlignment.CENTER:
        return Constants.TEXT_ALIGNMENT_CENTER
        break
      case TextAlignment.END:
        return Constants.TEXT_ALIGNMENT_END
        break
      case TextAlignment.JUSTIFY:
        return Constants.TEXT_ALIGNMENT_JUSTIFY
        break
      case TextAlignment.RIGHT:
        return Constants.TEXT_ALIGNMENT_RIGHT
        break
      case TextAlignment.START:
        return Constants.TEXT_ALIGNMENT_START
        break
      case TextAlignment.LEFT:
      default:
        return Constants.TEXT_ALIGNMENT_LEFT
        break
    }
  }

  public static parseTextVerticalAligment(textVerticalAlignment: string): TextVerticalAlignment {
    switch (textVerticalAlignment) {
      case Constants.PLACE_HOLDER_ALIGNMENT_BOTTOM:
        return TextVerticalAlignment.BOTTOM
        break
      case Constants.PLACE_HOLDER_ALIGNMENT_TOP:
        return TextVerticalAlignment.TOP
        break
      case Constants.PLACE_HOLDER_ALIGNMENT_MIDDLE:
      default:
        return TextVerticalAlignment.MIDDLE
        break
    }
  }

  public static generateTextVerticalAligment(textVerticalAlignment: TextVerticalAlignment): string {
    switch (textVerticalAlignment) {
      case TextVerticalAlignment.BOTTOM:
        return Constants.PLACE_HOLDER_ALIGNMENT_BOTTOM
        break
      case TextVerticalAlignment.TOP:
        return Constants.PLACE_HOLDER_ALIGNMENT_TOP
        break
      case TextVerticalAlignment.MIDDLE:
      default:
        return Constants.PLACE_HOLDER_ALIGNMENT_MIDDLE
        break
    }
  }

  public static parseConnectorMode(connectorMode: string): ConnectorMode {
    switch (connectorMode) {
      case Constants.CONNECTOR_LINE_MODE_DOUBLE:
        return ConnectorMode.Double
        break
      case Constants.CONNECTOR_LINE_MODE_DOUBLE_START:
        return ConnectorMode.DoubleAndStartArrow
        break
      case Constants.CONNECTOR_LINE_MODE_DOUBLE_END:
        return ConnectorMode.DoubleAndEndArrow
        break
      case Constants.CONNECTOR_LINE_MODE_DOUBLE_BOTH:
        return ConnectorMode.DoubleAndBothArrows
        break
      case Constants.CONNECTOR_LINE_MODE_SIGNLE:
      default:
        return ConnectorMode.Single
        break
    }
  }

  public static generateConnectorMode(connectorMode: ConnectorMode): string {
    switch (connectorMode) {
      case ConnectorMode.Double:
        return Constants.CONNECTOR_LINE_MODE_DOUBLE
        break
      case ConnectorMode.DoubleAndStartArrow:
        return Constants.CONNECTOR_LINE_MODE_DOUBLE_START
        break
      case ConnectorMode.DoubleAndEndArrow:
        return Constants.CONNECTOR_LINE_MODE_DOUBLE_END
        break
      case ConnectorMode.DoubleAndBothArrows:
        return Constants.CONNECTOR_LINE_MODE_DOUBLE_BOTH
        break
      case ConnectorMode.Single:
      default:
        return Constants.CONNECTOR_LINE_MODE_SIGNLE
        break
    }
  }

  public static generateConnectorArrow(arrow: ConnectorArrowType): ConnectorArrowInfo {
    return new ConnectorArrowInfo(
      arrow.name,
      arrow.description,
      CommonUtils.generateConnectorArrowDisplayType(arrow.type),
      arrow.height,
      arrow.width,
      arrow.modifier,
      arrow.count,
      arrow.outline,
      arrow.close,
      CommonUtils.generateConnectorArrowDisplayMode(arrow.displayMode),
    )
  }

  public static parseConnectorArrow(arrowInfo: ConnectorArrowInfo): ConnectorArrowType {
    return {
      name: arrowInfo.name,
      description: arrowInfo.description,
      type: CommonUtils.parseConnectorArrowDisplayType(arrowInfo.type),
      height: arrowInfo.height,
      width: arrowInfo.width,
      modifier: arrowInfo.modifier,
      count: arrowInfo.count,
      outline: arrowInfo.outline,
      close: arrowInfo.close,
      displayMode: CommonUtils.parseConnectorArrowDisplayMode(arrowInfo.displayMode),
    }
  }

  public static generateConnectorArrowDisplayType(displayType: ConnectorArrowDisplayType): string {
    switch (displayType) {
      case ConnectorArrowDisplayType.Triangle:
        return Constants.CONNECTOR_ARROW_DISPLAY_TYPE_TRIANGLE
      case ConnectorArrowDisplayType.Diamond:
        return Constants.CONNECTOR_ARROW_DISPLAY_TYPE_DIAMOND
      case ConnectorArrowDisplayType.Ellipse:
        return Constants.CONNECTOR_ARROW_DISPLAY_TYPE_ELLIPSE
      case ConnectorArrowDisplayType.LeftParenthesis:
        return Constants.CONNECTOR_ARROW_DISPLAY_TYPE_LEFT_PARENTHESIS
      case ConnectorArrowDisplayType.RightParenthesis:
        return Constants.CONNECTOR_ARROW_DISPLAY_TYPE_RIGHT_PARENTHESIS
      case ConnectorArrowDisplayType.Orthogonal:
        return Constants.CONNECTOR_ARROW_DISPLAY_TYPE_ORTHOGONAL
      case ConnectorArrowDisplayType.ForewardSlash:
        return Constants.CONNECTOR_ARROW_DISPLAY_TYPE_FOREWARD_SLASH
      case ConnectorArrowDisplayType.Backslashe:
        return Constants.CONNECTOR_ARROW_DISPLAY_TYPE_BACKSLASHE
      case ConnectorArrowDisplayType.VerticalLine:
        return Constants.CONNECTOR_ARROW_DISPLAY_TYPE_VERTICAL_LINE
      case ConnectorArrowDisplayType.LeftAngleBracket:
        return Constants.CONNECTOR_ARROW_DISPLAY_TYPE_LEFT_ANGLE_BRACKET
      case ConnectorArrowDisplayType.VerticaleLineAndLeftAngleBacket:
        return Constants.CONNECTOR_ARROW_DISPLAY_TYPE_VERTICALE_LINE_LEFT_ANGLE_BACKET
      case ConnectorArrowDisplayType.CircleAndLeftBacket:
        return Constants.CONNECTOR_ARROW_DISPLAY_TYPE_CIRCLE_AND_LEFT_BACKET
      case ConnectorArrowDisplayType.CircleAndVerticalLine:
        return Constants.CONNECTOR_ARROW_DISPLAY_TYPE_CIRCLE_AND_VERTICAL_LINE
      case ConnectorArrowDisplayType.None:
      default:
        return Constants.CONNECTOR_ARROW_DISPLAY_TYPE_NONE
    }
  }

  public static parseConnectorArrowDisplayType(displayType: string): ConnectorArrowDisplayType {
    switch (displayType) {
      case Constants.CONNECTOR_ARROW_DISPLAY_TYPE_TRIANGLE:
        return ConnectorArrowDisplayType.Triangle
      case Constants.CONNECTOR_ARROW_DISPLAY_TYPE_DIAMOND:
        return ConnectorArrowDisplayType.Diamond
      case Constants.CONNECTOR_ARROW_DISPLAY_TYPE_ELLIPSE:
        return ConnectorArrowDisplayType.Ellipse
      case Constants.CONNECTOR_ARROW_DISPLAY_TYPE_LEFT_PARENTHESIS:
        return ConnectorArrowDisplayType.LeftParenthesis
      case Constants.CONNECTOR_ARROW_DISPLAY_TYPE_RIGHT_PARENTHESIS:
        return ConnectorArrowDisplayType.RightParenthesis
      case Constants.CONNECTOR_ARROW_DISPLAY_TYPE_ORTHOGONAL:
        return ConnectorArrowDisplayType.Orthogonal
      case Constants.CONNECTOR_ARROW_DISPLAY_TYPE_FOREWARD_SLASH:
        return ConnectorArrowDisplayType.ForewardSlash
      case Constants.CONNECTOR_ARROW_DISPLAY_TYPE_BACKSLASHE:
        return ConnectorArrowDisplayType.Backslashe
      case Constants.CONNECTOR_ARROW_DISPLAY_TYPE_VERTICAL_LINE:
        return ConnectorArrowDisplayType.VerticalLine
      case Constants.CONNECTOR_ARROW_DISPLAY_TYPE_LEFT_ANGLE_BRACKET:
        return ConnectorArrowDisplayType.LeftAngleBracket
      case Constants.CONNECTOR_ARROW_DISPLAY_TYPE_VERTICALE_LINE_LEFT_ANGLE_BACKET:
        return ConnectorArrowDisplayType.VerticaleLineAndLeftAngleBacket
      case Constants.CONNECTOR_ARROW_DISPLAY_TYPE_CIRCLE_AND_LEFT_BACKET:
        return ConnectorArrowDisplayType.CircleAndLeftBacket
      case Constants.CONNECTOR_ARROW_DISPLAY_TYPE_CIRCLE_AND_VERTICAL_LINE:
        return ConnectorArrowDisplayType.CircleAndVerticalLine
      case Constants.CONNECTOR_ARROW_DISPLAY_TYPE_NONE:
      default:
        return ConnectorArrowDisplayType.None
    }
  }

  public static generateConnectorArrowDisplayMode(displayMode: ConnectorArrowDisplayMode): string {
    switch (displayMode) {
      case ConnectorArrowDisplayMode.Top:
        return Constants.CONNECTOR_ARROW_DISPLAY_MODE_TOP
      case ConnectorArrowDisplayMode.Bottom:
        return Constants.CONNECTOR_ARROW_DISPLAY_MODE_BOTTOM
      case ConnectorArrowDisplayMode.Full:
      default:
        return Constants.CONNECTOR_ARROW_DISPLAY_MODE_FULL
    }
  }

  public static parseConnectorArrowDisplayMode(displayMode: string): ConnectorArrowDisplayMode {
    switch (displayMode) {
      case Constants.CONNECTOR_ARROW_DISPLAY_MODE_TOP:
        return ConnectorArrowDisplayMode.Top
      case Constants.CONNECTOR_ARROW_DISPLAY_MODE_BOTTOM:
        return ConnectorArrowDisplayMode.Bottom
      case Constants.CONNECTOR_ARROW_DISPLAY_MODE_FULL:
      default:
        return ConnectorArrowDisplayMode.Full
    }
  }

  public static generateConnectorDirection(direction: ConnectorDirection): string {
    switch (direction) {
      case ConnectorDirection.Top:
        return Constants.CONNECTOR_DIRECTION_TOP
      case ConnectorDirection.Right:
        return Constants.CONNECTOR_DIRECTION_RIGHT
      case ConnectorDirection.Bottom:
        return Constants.CONNECTOR_DIRECTION_BOTTOM
      case ConnectorDirection.Left:
      default:
        return Constants.CONNECTOR_DIRECTION_LEFT
    }
  }

  public static parseConnectorDirection(direction: string): ConnectorDirection {
    switch (direction) {
      case Constants.CONNECTOR_DIRECTION_TOP:
        return ConnectorDirection.Top
      case Constants.CONNECTOR_DIRECTION_RIGHT:
        return ConnectorDirection.Right
      case Constants.CONNECTOR_DIRECTION_BOTTOM:
        return ConnectorDirection.Bottom
      case Constants.CONNECTOR_DIRECTION_LEFT:
      default:
        return ConnectorDirection.Left
    }
  }
  /**
   *
   * @param rgba #F0F0F0FF or #FFFFFF
   * @returns
   */
  public static parseColorString(rgba: string | null): Color | null {
    if (rgba === null) {
      return null
    }
    if (rgba && rgba.length === 9 && rgba[0] === '#') {
      let r = parseInt(rgba.slice(1, 3), 16)
      let g = parseInt(rgba.slice(3, 5), 16)
      let b = parseInt(rgba.slice(5, 7), 16)
      let a = parseInt(rgba.slice(7, 9), 16)
      return new Color(r, g, b, a)
    } else if (rgba && rgba.length === 7 && rgba[0] === '#') {
      let r = parseInt(rgba.slice(1, 3), 16)
      let g = parseInt(rgba.slice(3, 5), 16)
      let b = parseInt(rgba.slice(5, 7), 16)
      let a = 255
      return new Color(r, g, b, a)
    }

    return Colors.White
  }
}
