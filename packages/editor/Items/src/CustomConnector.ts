import { Point2, StrokeDashStyle } from '@ratel-web/engine'
import { ConnectorType } from '../../Shapes'
import { Connector, ConnectorArrowTypes } from './Connector'
import { Categories } from './Item'

export class CustomConnectors {
  public static TYPE_INHERITANCE = 'CustomConnector'
  public static DESC_INHERITANCE = 'CustomConnector'
  public static TEXT_INHERITANCE = 'CustomConnector'
}

export interface CustomConnectorTypeInfo {
  name: string
  description: string
  text: string
  startX: number
  startY: number
  endX: number
  endY: number
  startArrowTypeName: string
  endArrowTypeName: string
  strokeDashStyle: StrokeDashStyle
  connectorType: ConnectorType
  width: number
  height: number
}

const CustomConnectorTypes: CustomConnectorTypeInfo[] = [
  {
    name: CustomConnectors.TYPE_INHERITANCE,
    description: CustomConnectors.DESC_INHERITANCE,
    text: CustomConnectors.TEXT_INHERITANCE,
    width: 190,
    height: 60,
    startX: 30,
    startY: 30,
    endX: 190,
    endY: 30,
    startArrowTypeName: 'None',
    endArrowTypeName: 'Triangle-4',
    strokeDashStyle: StrokeDashStyle.SOLID,
    connectorType: ConnectorType.StraightLine,
  },
]

export class CustomConnector extends Connector {
  private _connectorTypeInfo: CustomConnectorTypeInfo
  private _connectorTypeInfos: CustomConnectorTypeInfo[]

  public constructor(start: Point2, end: Point2, connectorTypeInfoName: string, connectorTypeInfos: CustomConnectorTypeInfo[] = CustomConnectorTypes) {
    super(start, end)
    this._connectorTypeInfos = connectorTypeInfos
    this._connectorTypeInfo = this.findConnectorTypeInfo(connectorTypeInfoName)
    ConnectorArrowTypes.forEach((connectorArrayType) => {
      if (connectorArrayType.name === this._connectorTypeInfo.startArrowTypeName) {
        const startArrow = connectorArrayType
        this.startArrow = startArrow
      }
      if (connectorArrayType.name === this._connectorTypeInfo.endArrowTypeName) {
        const endArrow = connectorArrayType
        this.endArrow = endArrow
      }
    })
    this.strokeDashStyle = this._connectorTypeInfo.strokeDashStyle
    this.connectorType = this._connectorTypeInfo.connectorType
  }

  public get connectorTypeInfo() {
    return this._connectorTypeInfo
  }

  public get category() {
    return Categories.CUSTOM_CONNECTOR
  }

  private findConnectorTypeInfo(connectorTypeInfoName: string) {
    let result = this._connectorTypeInfos[0]
    this._connectorTypeInfos.forEach((connectorTypeInfo) => {
      if (connectorTypeInfo.name === connectorTypeInfoName) {
        result = connectorTypeInfo
      }
    })
    return result
  }
}
