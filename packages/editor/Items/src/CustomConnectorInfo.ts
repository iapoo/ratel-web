import { StyleInfo } from '../../Shapes'
import { ConnectorArrowInfo } from './ConnectorArrowInfo'
import { EditorItemInfo } from './EditorItemInfo'
import { Categories } from './Item'

export class CustomConnectorInfo extends EditorItemInfo {
  public start: string

  public end: string

  public sourceJoint: string = ''

  public targetJoint: string = ''

  public source: string = ''

  public target: string = ''

  public connectorType: string | null = null

  public connectorMode: string | null = null

  public startArrow: ConnectorArrowInfo | null = null

  public endArrow: ConnectorArrowInfo | null = null

  public curveStartModifier: string = ''

  public curveEndModifier: string = ''

  public startDirection: string = ''

  public endDirection: string = ''

  public orthogonalPoints: string = ''

  public connectorDoubleLineGap: number = 1

  public connectorDoubleLineArrowLength: number = 1

  public connectorDoubleLineArrowDistance: number = 1

  public constructor(
    type: string,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    text: string = '',
    rotation: number = 0,
    styles: StyleInfo[] = [],
    useTheme = true,
    strokeColor: string | null = null,
    fillColor: string | null = null,
    lineWidth: number | null = null,
  ) {
    super(
      type,
      Categories.CUSTOM_CONNECTOR,
      Math.min(startX, endX),
      Math.min(startY, endY),
      Math.abs(startX - endX),
      Math.abs(startY - endY),
      text,
      rotation,
      styles,
      useTheme,
      strokeColor,
      fillColor,
      lineWidth,
    )
    this.start = startX + ',' + startY
    this.end = endX + ',' + endY
  }
}
