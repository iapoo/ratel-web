import { ConnectorType } from "@/components/Rockie/Items";



export class Consts {
    public static CONNECTOR_TYPE_LINE = 'Line'
    public static CONNECTOR_TYPE_CURVE = 'Curve'
    public static CONNECTOR_TYPE_CROSS_LINE = 'CrossLine'

    public static ZOOM_DEFAULT = 1

    public static FONT_SIZE_DEFAULT = 14
    public static FONT_SIZE_MIN = 6
    public static FONT_SIZE_MAX = 72
    
    public static LINE_WIDTH_DEFAULT = 1
    public static LINE_WIDTH_MIN = 0.25
    public static LINE_WIDTH_MAX = 64

    public static COLOR_STROKE_DEFAULT = '#000000'
    public static COLOR_FILL_DEFAULT = '#FFFFFF'


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
