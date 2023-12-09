import { ConnectorType } from "../../Shapes";

export class CommonUtils {
    public static CONNECTOR_TYPE_STRAIGHT_LINE = 'StraightLine'
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
            case ConnectorType.StraightLine:
            default:
                return this.CONNECTOR_TYPE_STRAIGHT_LINE
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
            case this.CONNECTOR_TYPE_STRAIGHT_LINE:
            default:
                return ConnectorType.StraightLine
                break;
        }
    }
}