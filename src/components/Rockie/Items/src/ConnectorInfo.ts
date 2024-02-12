import { StyleInfo } from "../../Shapes/src/EntityUtils"
import { Connector } from "./Connector"
import { EditorItemInfo } from "./EditorItemInfo"
import { Categories } from "./Item"

export class ConnectorInfo extends EditorItemInfo {
    
    public start: string

    public end: string

    public sourceJoint: string = ''

    public targetJoint: string = ''

    public source: string = ''

    public target: string = ''

    public connectorType: string | null = null

    public constructor(startX: number, startY: number, endX: number, endY: number, text: string = '', rotation: number = 0, styles: StyleInfo[] = []){
        super(Connector.CONNECTOR_TYPE_CONNECTOR, Categories.CONNECTOR, Math.min(startX, endX), Math.min(startY, endY), Math.abs(startX - endX), Math.abs(startY - endY), text, rotation, styles)
        this.start = startX + ',' + startY
        this.end = endX + ',' + endY
    }
}