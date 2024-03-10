import { Arrows } from "../../CustomItems/Arrows";
import { BasicShapes } from "../../CustomItems/BasicShapes";
import { CustomEntity } from "../../Items";
import { ShapeType } from "../../Items/src/ShapeEntity";
import { ConnectorType } from "../../Shapes";

export interface CustomShapeType {
    type: typeof CustomEntity
    shapeType: ShapeType
}

//FIXME, Move it to better place
export const CustomShapes = [
    ...BasicShapes,
    ...Arrows
  ]

export class CommonUtils {
    public static CONNECTOR_TYPE_STRAIGHT_LINE = 'StraightLine'
    public static CONNECTOR_TYPE_CURVE = 'Curve'
    public static CONNECTOR_TYPE_CROSS_LINE = 'Orthogonal'

    public static parseConnectorType(connectorType: ConnectorType) : string {
        switch(connectorType) {
            case ConnectorType.Curve:
                return this.CONNECTOR_TYPE_CURVE
                break;
            case ConnectorType.Orthogonal:
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
                return ConnectorType.Orthogonal
                break;
            case this.CONNECTOR_TYPE_STRAIGHT_LINE:
            default:
                return ConnectorType.StraightLine
                break;
        }
    }

}