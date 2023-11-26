import { StyleInfo } from "../../Shapes/src/EntityUtils"
import { EditorItemInfo } from "./EditorItemInfo"

export class LineInfo extends EditorItemInfo {    
    
    public start: string

    public end: string

    public constructor(startX: number, startY: number, endX: number, endY: number, text: string = '', rotation: number = 0, styles: StyleInfo[] = []){
        super(' ','', Math.min(startX, endX), Math.min(startY, endY), Math.abs(startX - endX), Math.abs(startY - endY), text, rotation, styles)
        this.start = startX + ',' + startY
        this.end = endX + ',' + endY
    }
}