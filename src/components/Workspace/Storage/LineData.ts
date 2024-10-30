import { LineEntity } from "@/components/Rockie/Items"
import { EditorItemData } from "./EditorItemData"
import { Categories } from "@/components/Rockie/Items/src/Item"

export class LineData extends EditorItemData {

    public start: string

    public end: string

    public constructor(startX: number, startY: number, endX: number, endY: number, text: string = '', rotation: number = 0) {
        super(LineEntity.LINE_TYPE_LINE, Categories.LINE, Math.min(startX, endX), Math.min(startY, endY), Math.abs(startX - endX), Math.abs(startY - endY), text, rotation)
        this.start = startX + ',' + startY
        this.end = endX + ',' + endY
    }
}