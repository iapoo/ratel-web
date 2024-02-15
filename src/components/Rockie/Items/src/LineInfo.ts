import { StyleInfo } from "../../Shapes/src/EntityUtils"
import { EditorItemInfo } from "./EditorItemInfo"

export class LineInfo extends EditorItemInfo {    
    
    public start: string

    public end: string

    public constructor(startX: number, startY: number, endX: number, endY: number, text: string = '', 
                rotation: number = 0, styles: StyleInfo[] = [], useTheme = true, strokeColor: string | null = null
                , fillColor: string | null = null, lineWidth: number | null = null){
        super(' ','', Math.min(startX, endX), Math.min(startY, endY), Math.abs(startX - endX), Math.abs(startY - endY), 
            text, rotation, styles, useTheme, strokeColor, fillColor, lineWidth)
        this.start = startX + ',' + startY
        this.end = endX + ',' + endY
    }
}