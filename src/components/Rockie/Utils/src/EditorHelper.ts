import { Point2, Rectangle } from "@/components/Engine";
import { Editor } from "../../Editor";
import { Categories, Connector, ConnectorInfo, EditorItem, EditorItemInfo, Entity, Item, ShapeEntity } from "../../Items";
import { Operation, OperationHelper, OperationType } from "../../Operations";
import { SystemUtils } from "@/components/Workspace/Utils";
import { Style, StyleInfo } from "../../Shapes/src/EntityUtils";
import { ImageUtils } from "./ImageUtils";

export class EditorHelper {

    public static DEFAULT_OFFSET_X = 32
    public static DEFAULT_OFFSET_Y = 32

    public static generateEditorItems(editor: Editor): EditorItemInfo[] {
        const editorItemInfos: Array<EditorItemInfo> = []
        const editorItems = editor.contentLayer.getAllEditorItems()
        editorItems.forEach(editorItem => {
            let editorItemInfo = OperationHelper.saveEditorItem(editorItem)
            editorItemInfos.push(editorItemInfo)
        })
        return editorItemInfos
    }

    public static generateEditorSelections(editor: Editor): EditorItemInfo[] {
        const selections: Array<EditorItemInfo> = []
        const editorItems = editor.selectionLayer.getAllEditorItems()
        editorItems.forEach(editorItem => {
            let editorItemInfo = OperationHelper.saveEditorItem(editorItem)
            selections.push(editorItemInfo)
        })
        return selections
    }

    public static exportEditorSelections(editor: Editor): string {
        const selections: Array<EditorItemInfo> = EditorHelper.generateEditorSelections(editor)
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
                    if (selection.category && selection.id && selection.items instanceof Array) {
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
                offsetX = pasteLocation.x - selections[0].left - editor.horizontalSpace
                offsetY = pasteLocation.y - selections[0].top - editor.verticalSpace
            }
            //refresh connections of shapes & Setup new location
            let editorItems: Array<EditorItem> = []
            selections.forEach(selection => {
                let editorItem = OperationHelper.loadItem(selection, editor)
                if (editorItem instanceof Connector && editorItem.start && editorItem.end) {
                    const start = editorItem.start
                    const end = editorItem.end
                    editorItem.start = new Point2(start.x + offsetX, start.y + offsetY)
                    editorItem.end = new Point2(end.x + offsetX, end.y + offsetY)
                } else if (editorItem instanceof Item) {
                    editorItem.boundary = Rectangle.makeLTWH(editorItem.left + offsetX, editorItem.top + offsetY, editorItem.width, editorItem.height)
                }
                editorItems.push(editorItem)
            })
            //regenerate item id & load
            selections.forEach(selection => {
                EditorHelper.refreshSelections(selection, editorItems)
            })
            //regenerate item id & load
            //Make them selected
            editor.selectionLayer.removeAllEditorItems()
            editorItems.forEach(editorItem => {
                EditorHelper.refreshEditorItem(editorItem)
                editor.contentLayer.addEditorItem(editorItem)
                editor.selectionLayer.addEditorItem(editorItem)
            })
            const newEditorItems = EditorHelper.generateEditorSelections(editor)
            const operation = new Operation(editor, OperationType.ADD_SELECTION_ITEMS, newEditorItems, true)
            editor.operationService.addOperation(operation)
            editor.triggerOperationChange()
        }
    }

    public static deleteSelections(editor: Editor) {
        const editorItems = editor.selectionLayer.getAllEditorItems()
        let deleteChildItem: boolean = false
        let parentItem: Item | undefined = undefined
        for (let i = 0; i < editorItems.length; i++) {
            const editorItem = editorItems[i]
            const item = editorItem as Item
            if (item.parent) {
                deleteChildItem = true
                parentItem = item.parent
            }
        }
        if (deleteChildItem && parentItem) {
            const origEditItemInfo = OperationHelper.saveEditorItem(parentItem)
            for (let i = 0; i < editorItems.length; i++) {
                const editorItem = editorItems[i]
                parentItem.removeItem(editorItem)
            }
            const editorItemInfo = OperationHelper.saveEditorItem(parentItem)
            editor.selectionLayer.removeAllEditorItems()
            const operation = new Operation(editor, OperationType.UPDATE_ITEMS, [editorItemInfo], true, [origEditItemInfo])
            editor.operationService.addOperation(operation)
            editor.triggerOperationChange()
        } else {
            const selections = EditorHelper.generateEditorSelections(editor)
            for (let i = 0; i < editorItems.length; i++) {
                const editorItem = editorItems[i]
                editor.contentLayer.removeEditorItem(editorItem)
            }
            EditorHelper.exportEditorSelections(editor)
            editor.selectionLayer.removeAllEditorItems()
            const operation = new Operation(editor, OperationType.REMOVE_SELECTION_ITEMS, selections, true)
            editor.operationService.addOperation(operation)
            editor.triggerOperationChange()
        }
    }

    private static refreshSelections(selection: EditorItemInfo, editorItems: EditorItem[]) {
        if (selection.category == Categories.CONNECTOR) {
            let connectorInfo = selection as ConnectorInfo
            let connector: Connector | null = null
            editorItems.forEach(editorItem => {
                if (connectorInfo.id == editorItem.id) {
                    connector = editorItem as Connector
                    EditorHelper.refreshConnector(connectorInfo, connector, editorItems)
                }
            })
        }
        selection.items.forEach(item => {
            EditorHelper.refreshSelections(item, editorItems)
        })
    }


    private static refreshConnector(connectorInfo: ConnectorInfo, connector: Connector, editorItems: EditorItem[]) {
        editorItems.forEach(editorItem => {
            if (connectorInfo.source == editorItem.id) {
                let entity = editorItem as Entity
                connector.source = entity
                entity.addSourceConnector(connector)
            }
            if (connectorInfo.target == editorItem.id) {
                let entity = editorItem as Entity
                connector.target = entity
                entity.addTargetConnector(connector)
            }
            if (editorItem.items.length > 0) {
                EditorHelper.refreshConnector(connectorInfo, connector, editorItem.items)
            }
        })
        //Need to restore points here
        connector.startDirection = SystemUtils.parseConnectorDirection(connectorInfo.startDirection)
        connector.endDirection = SystemUtils.parseConnectorDirection(connectorInfo.endDirection)
        connector.orthogonalPoints = SystemUtils.parsePointsString(connectorInfo.orthogonalPoints)
    }

    private static refreshEditorItem(editorItem: EditorItem) {
        editorItem.id = SystemUtils.generateID()
        editorItem.items.forEach(childItem => {
            EditorHelper.refreshEditorItem(childItem)
        })
    }

    public static exportSelected(editor: Editor, format: 'png' | 'jpg' = 'png', forIcon: boolean = false): any {
        try {
            const left = editor.horizontalSpace
            const top = editor.verticalSpace
            const right = editor.workWidth + editor.horizontalSpace
            const bottom = editor.workHeight + editor.verticalSpace
            const [selectionLeft, selectionTop, selectionRight, selectionBottom] = editor.getSelectionBoundary()
            const width = selectionRight - selectionLeft
            const height = selectionBottom - selectionTop
            const iconWidth = 32
            const iconHeight = 32
            const fontSizeFactor = 1
            const lineWidthFactor = width / iconWidth > height / iconHeight ? width / iconWidth : height / iconHeight
            const selections: Array<EditorItemInfo> = []
            const allEditorItems = editor.selectionLayer.getAllEditorItems()
            const editorItems: Array<EditorItem> = []
            editor.exportLayer.removeAllEditorItems()
            allEditorItems.forEach(editorItem => {
                let editorItemInfo = OperationHelper.saveEditorItem(editorItem)
                selections.push(editorItemInfo)
            })
            selections.forEach(selection => {
                let editorItem = OperationHelper.loadItem(selection, editor)
                if (editorItem instanceof Connector && editorItem.start && editorItem.end) {
                    const start = editorItem.start
                    const end = editorItem.end
                    editorItem.start = new Point2(start.x, start.y)
                    editorItem.end = new Point2(end.x, end.y)
                } else if (editorItem instanceof Item) {
                    editorItem.boundary = Rectangle.makeLTWH(editorItem.left, editorItem.top, editorItem.width, editorItem.height)
                }
                if(forIcon) {
                    editorItem.lineWidth = 0.5 * editorItem.lineWidth * lineWidthFactor 
                    editorItem.fontSize = editorItem.fontSize * fontSizeFactor
                    editorItem.items.forEach(item => {
                        item.lineWidth = 0.5 * item.lineWidth * lineWidthFactor 
                        item.fontSize = item.fontSize * fontSizeFactor
                    })
                }
                editorItems.push(editorItem)
            })
            editorItems.forEach(editorItem => {
                editor.exportLayer.addEditorItem(editorItem)
            })
            editor.backgroundLayer.visible = false
            editor.selectionLayer.visible = false
            editor.contentLayer.visible = false
            editor.render()
            const image = editor.engine.surface.makeImageSnapshot([left + selectionLeft - 10, top + selectionTop - 10, left + selectionRight+ 10, top + selectionBottom + 10])
            const data = image.encodeToBytes()
            let base64Data = ''
            if(data) {
                base64Data = ImageUtils.convertUint8ArrayToBase64(data)
            }
            return base64Data
        } finally {
            editor.backgroundLayer.visible = true
            editor.selectionLayer.visible = true
            editor.contentLayer.visible = true
            editor.exportLayer.removeAllEditorItems()
        }
    }

    public static export(editor: Editor, format: 'png' | 'jpg' = 'png'): any {
        try {
            editor.backgroundLayer.visible = false
            editor.selectionLayer.visible = false
            editor.render()
            const image = editor.engine.surface.makeImageSnapshot([editor.horizontalSpace, editor.verticalSpace, editor.workWidth + editor.horizontalSpace, editor.workHeight + editor.verticalSpace])
            const data = image.encodeToBytes()
            let encoded = ''
            if (data) {
                //encoded = Buffer.from(data).toString('base64');
            }
            return data
        } finally {
            editor.backgroundLayer.visible = true
            editor.selectionLayer.visible = true
        }
    }

}