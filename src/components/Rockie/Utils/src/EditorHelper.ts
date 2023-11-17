import { Point2 } from "@/components/Engine";
import { Editor } from "../../Editor";
import { Categories, Connector, ConnectorInfo, EditorItem, EditorItemInfo, Entity } from "../../Items";
import { OperationHelper } from "../../Operations";
import { SystemUtils } from "@/components/Workspace/Utils";

export class EditorHelper {

    public static DEFAULT_OFFSET_X = 32
    public static DEFAULT_OFFSET_Y = 32

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

    public static validateSelections(data: string) {
        let selections: EditorItemInfo[]
        let validation = false
        try {
            selections = JSON.parse(data)
            if (selections instanceof Array) {
                selections.forEach(selection => {
                    if (selection.type && selection.category && selection.id && selection.items instanceof Array) {
                        validation = true
                    } else {
                        validation = false
                    }
                })
            }
        } catch (error) {
            validation = false
        }

        return validation
    }

    public static readSelections(data: string) {
        let selections: EditorItemInfo[] = []
        if (EditorHelper.validateSelections(data)) {
            selections = JSON.parse(data)
        }
        return selections
    }

    public static pasteSelections(selections: EditorItemInfo[], editor: Editor, pasteFromSystem: boolean, pasteLocation: Point2) {
        if (selections.length > 0) {
            let offsetX = EditorHelper.DEFAULT_OFFSET_X
            let offsetY = EditorHelper.DEFAULT_OFFSET_Y
            if (!pasteFromSystem) {
                offsetX = pasteLocation.x - selections[0].left
                offsetY = pasteLocation.y - selections[0].top
            }
            //refresh connections of shapes & Setup new location
            let editorItems: Array<EditorItem> = []
            selections.forEach(selection => {
                selection.left = selection.left + offsetX
                selection.top = selection.top + offsetY
                let editorItem = OperationHelper.loadItem(selection)
                editorItems.push(editorItem)
            })
            //regenerate item id & load
            selections.forEach(selection => {
                EditorHelper.refreshSelections(selection, editorItems)
            })
            //regenerate item id & load
            editorItems.forEach(editorItem => {
                EditorHelper.refreshEditorItem(editorItem)
                editor.contentLayer.addEditorItem(editorItem)
            })
        }
    }

    private static refreshSelections(selection: EditorItemInfo, editorItems: EditorItem[]) {
        if (selection.category == Categories.CONNECTOR) {
            let connectorInfo = selection as ConnectorInfo
            let connector: Connector | null = null
            editorItems.forEach(editorItem => {
                if (connectorInfo.id == editorItem.id) {
                    connector = editorItem as Connector
                    this.refreshConnector(connectorInfo, connector, editorItems)
                }
            })
        }
        selection.items.forEach(item => {
            this.refreshSelections(item, editorItems)
        })
    }


    private static refreshConnector(connectorInfo: ConnectorInfo, connector: Connector, editorItems: EditorItem[]) {
        editorItems.forEach(editorItem => {
            if (connectorInfo.source == editorItem.id) {
                let entity = editorItem as Entity
                connector.source = entity
                entity.addConnector(connector)
            }
            if (connectorInfo.target == editorItem.id) {
                let entity = editorItem as Entity
                connector.target = entity
                entity.addConnector(connector)
            }
            if (editorItem.items.length > 0) {
                this.refreshConnector(connectorInfo, connector, editorItem.items)
            }
        })
    }

    private static refreshEditorItem(editorItem: EditorItem) {
        editorItem.id = SystemUtils.generateID()
        editorItem.items.forEach(childItem => {
            EditorHelper.refreshEditorItem(childItem)
        })
    }
}