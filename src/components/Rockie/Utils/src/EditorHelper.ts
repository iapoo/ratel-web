import { Editor } from "../../Editor";
import { EditorItemInfo } from "../../Items";
import { OperationHelper } from "../../Operations";

export class EditorHelper {

    public static exportEditorSelections(editor: Editor): string {
        let selections: Array<EditorItemInfo> = []
        let editorItems = editor.selectionLayer.getAllEditorItems()
        editorItems.forEach(editorItem => {
            let editorItemInfo = OperationHelper.saveEditorItem(editorItem)
            selections.push(editorItemInfo)
        })
        let json = JSON.stringify(selections)
        return json
    }

    
}