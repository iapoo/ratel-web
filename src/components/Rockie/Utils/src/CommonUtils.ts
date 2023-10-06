import { ConnectorType } from "../../Items";

export class CommonUtils {
    public static CONNECTOR_TYPE_LINE = 'Line'
    public static CONNECTOR_TYPE_CURVE = 'Curve'
    public static CONNECTOR_TYPE_CROSS_LINE = 'CrossLine'

    public static parseConnectorType(connectorType: ConnectorType) : string {
        switch(connectorType) {
            case ConnectorType.Curve:
                return this.CONNECTOR_TYPE_CURVE
                break;
            case ConnectorType.CrossLine:
                return this.CONNECTOR_TYPE_CROSS_LINE
                break;
            case ConnectorType.Line:
            default:
                return this.CONNECTOR_TYPE_LINE
                break;
        }
    }

    public static parseConnectorTypeString(connectorType: string) : ConnectorType {
        switch(connectorType) {
            case this.CONNECTOR_TYPE_CURVE:
                return ConnectorType.Curve
                break;
            case this.CONNECTOR_TYPE_CROSS_LINE:
                return ConnectorType.CrossLine
                break;
            case this.CONNECTOR_TYPE_LINE:
            default:
                return ConnectorType.Line
                break;
        }
    }
}