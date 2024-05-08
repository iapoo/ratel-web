import { Arrows } from "../../CustomItems/Arrows";
import { BasicShapes } from "../../CustomItems/BasicShapes";
import { FlowChartShapes } from "../../CustomItems/FlowChart";
import { UMLBasicShapes, UMLConnectors, UMLContainerShapes, UMLCustomContainers, UMLCustomShapes, UMLCustomTables, UMLFrameShapes, } from "../../CustomItems/UML";
import { ContainerEntity, CustomConnector, CustomEntity, CustomTableEntity, FrameEntity } from "../../Items";
import { CustomConnectorTypeInfo } from "../../Items/src/CustomConnector";
import { CustomContainerEntity } from "../../Items/src/CustomContainerEntity";
import { CustomTableType } from "../../Items/src/CustomTableEntity";
import { ShapeEntity, ShapeType } from "../../Items/src/ShapeEntity";
import { ConnectorType } from "../../Shapes";

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

export interface ExtendedConnectorType {
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
    ...UMLCustomShapes
  ]

export const CustomTableShapes = [
    ...UMLCustomTables
]

export const ExtendedContainerTypes = [
    ...UMLContainerShapes
]

export const ExtendedShapes = [
    ...UMLBasicShapes
]

export const ExtendConnectors = [
    ...UMLConnectors
]

export const FrameShapes = [
    ...UMLFrameShapes
]

export const CustomContainers = [
    ...UMLCustomContainers
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