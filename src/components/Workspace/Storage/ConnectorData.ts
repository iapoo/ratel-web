import { Connector, LineEntity } from "@/components/Rockie/Items";
import { EditorItemData } from "./EditorItemData";
import { Categories } from "@/components/Rockie/Items/src/Item";
import { Consts } from "../Utils";

export class ConnectorData extends EditorItemData {
    
    public startX: number

    public startY: number

    public endX: number

    public endY: number

    public source: string = ''

    public target: string = ''

    public connectorType: string | null = Consts.CONNECTOR_TYPE_LINE

    public constructor(startX: number, startY: number, endX: number, endY: number, text: string = '', rotation: number = 0){
        super(Connector.CONNECTOR_TYPE_CONNECTOR, Categories.CONNECTOR, Math.min(startX, endX), Math.min(startY, endY), Math.abs(startX - endX), Math.abs(startY - endY), text, rotation)
        this.startX = startX
        this.startY = startY
        this.endX = endX
        this.endY = endY
    }
}