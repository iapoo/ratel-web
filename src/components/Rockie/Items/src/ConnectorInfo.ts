import { EditorItemInfo } from "../../Editor"

export class ConnectorInfo extends EditorItemInfo {
    
    public start: string

    public end: string

    public source: string = ''

    public target: string = ''

    public connectorType: string | null = null

    public constructor(startX: number, startY: number, endX: number, endY: number, text: string = '', rotation: number = 0){
        super(' ','', Math.min(startX, endX), Math.min(startY, endY), Math.abs(startX - endX), Math.abs(startY - endY), text, rotation)
        this.start = startX + ',' + startY
        this.end = endX + ',' + endY
    }
}