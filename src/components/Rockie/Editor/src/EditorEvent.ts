import { Editor } from "./Editor"

export class EditorEvent {

    readonly source: Editor

    constructor(source: Editor) {
        this.source = source
    }
}