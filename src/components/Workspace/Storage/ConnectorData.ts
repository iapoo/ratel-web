import { Connector, } from "@/components/Rockie/Items";
import { EditorItemData } from "./EditorItemData";
import { Categories } from "@/components/Rockie/Items/src/Item";

export class ConnectorData extends EditorItemData {
    
    public start: string

    public end: string

    public source: string = ''

    public target: string = ''

    public connectorType: string | null = null

    public constructor(startX: number, startY: number, endX: number, endY: number, text: string = '', rotation: number = 0){
        super(Connector.CONNECTOR_TYPE_CONNECTOR, Categories.CONNECTOR, Math.min(startX, endX), Math.min(startY, endY), Math.abs(startX - endX), Math.abs(startY - endY), text, rotation)
        this.start = startX + ',' + startY
        this.end = endX + ',' + endY
    }
}