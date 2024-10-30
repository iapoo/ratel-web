import { Operation } from "../../Operations"
import { Editor } from "./Editor"

export class EditorOperationEvent {

    readonly source: Editor
    readonly operation: Operation
    readonly isUndo: boolean
    constructor(source: Editor, operation: Operation, isUndo: boolean) {
        this.source = source
        this.operation = operation
        this.isUndo = isUndo
    }
}