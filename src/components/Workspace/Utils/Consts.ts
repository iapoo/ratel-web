import { ConnectorType } from "@/components/Rockie/Items";



export class Consts {
    public static CONNECTOR_TYPE_LINE = 'Line'
    public static CONNECTOR_TYPE_CURVE = 'Curve'
    public static CONNECTOR_TYPE_CROSS_LINE = 'CrossLine'
    
    public static parseConnectorType(connectorType: ConnectorType) : string {
        switch(connectorType) {
            case ConnectorType.Curve:
                return Consts.CONNECTOR_TYPE_CURVE
                break;
            case ConnectorType.CrossLine:
                return Consts.CONNECTOR_TYPE_CROSS_LINE
                break;
            case ConnectorType.Line:
            default:
                return Consts.CONNECTOR_TYPE_LINE
                break;
        }
    }

    public static parseConnectorTypeString(connectorType: string) : ConnectorType {
        switch(connectorType) {
            case Consts.CONNECTOR_TYPE_CURVE:
                return ConnectorType.Curve
                break;
            case Consts.CONNECTOR_TYPE_CROSS_LINE:
                return ConnectorType.CrossLine
                break;
            case Consts.CONNECTOR_TYPE_LINE:
            default:
                return ConnectorType.Line
                break;
        }
    }
}
