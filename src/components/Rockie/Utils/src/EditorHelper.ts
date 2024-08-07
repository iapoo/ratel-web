import { Paint, Path, Point2, Rectangle, Woff2Utils } from "@/components/Engine";
import { Editor } from "../../Editor";
import { Categories, Connector, ConnectorInfo, EditorItem, EditorItemInfo, Entity, Item, ShapeEntity } from "../../Items";
import { Operation, OperationHelper, OperationType } from "../../Operations";
import { RequestUtils, SystemUtils } from "@/components/Workspace/Utils";
import { Style, StyleInfo } from "../../Shapes/src/EntityUtils";
import { ImageUtils } from "./ImageUtils";
import { MyShape, MyShapeType, MyShapes } from "@/components/Workspace/Utils/RequestUtils";
import opentype from 'opentype.js'
import { ConnectorArrowDisplayType, ConnectorMode, ConnectorType } from "../../Shapes";

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

    public static refreshSelections(selection: EditorItemInfo, editorItems: EditorItem[]) {
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

    public static exportSelected(editor: Editor, format: 'png' | 'jpg' = 'png', forIcon: boolean = false, encoded: boolean = true): any {
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
            const sizeFactor = width > 300 || height > 300 ? 0.5 : (width > 200 || height > 200 ? 0.75 : 1)
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
                if (forIcon) {
                    editorItem.lineWidth = sizeFactor * editorItem.lineWidth * lineWidthFactor
                    editorItem.fontSize = editorItem.fontSize * fontSizeFactor
                    editorItem.items.forEach(item => {
                        item.lineWidth = sizeFactor * item.lineWidth * lineWidthFactor
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
            const image = editor.engine.surface.makeImageSnapshot([left + selectionLeft - 10, top + selectionTop - 10, left + selectionRight + 10, top + selectionBottom + 10])
            const data = image.encodeToBytes()
            image.delete()
            let base64Data = ''
            if (data && encoded) {
                base64Data = ImageUtils.convertUint8ArrayToBase64(data)
                return base64Data
            } else {
                return data
            }
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
            image.delete()
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

    public static async addToMyShapes(editor: Editor, callback: () => void) {
        const settingData = await RequestUtils.getSettings()
        if (settingData.status == 200 && settingData.data.success) {
            console.log(`Succeed to get settings`)
            const settings = settingData.data.data.settings
            let myShapes: MyShapes = settings ? JSON.parse(settings) : {}
            const selectionInfos = EditorHelper.generateEditorSelections(editor)
            const [left, top, right, bottom] = editor.getSelectionBoundary()
            const data = EditorHelper.exportSelected(editor, 'png', true)
            const largeData = EditorHelper.exportSelected(editor, 'png', false)
            const imageData = 'data:image/png;base64,' + data
            const largeImageData = 'data:image/png;base64,' + largeData
            const imageInfo = JSON.stringify(selectionInfos)
            const id = SystemUtils.generateID()
            if (!myShapes || !myShapes.shapes) {
                myShapes = {
                    shapes: [
                        { icon: imageData, image: largeImageData, info: imageInfo, type: MyShapeType.SELECTION, name: 'Custom Shape', id: id, width: right - left, height: bottom - top }
                    ]
                }
            } else {
                myShapes.shapes.push({ icon: imageData, image: largeImageData, info: imageInfo, type: MyShapeType.SELECTION, name: 'Custom Shape', id: id, width: right - left, height: bottom - top })
            }

            const myShapesInfo = JSON.stringify(myShapes)
            // console.log(`myShapesInfo= ${myShapes}`)
            const updateSettingsData = await RequestUtils.updateSettings(myShapesInfo)
            if (updateSettingsData.status == 200 && updateSettingsData.data.success) {
                console.log(`Succeed to update settings`)
            } else {
                console.log(`Fail to update settings`)
            }
            // SystemUtils.generateDownloadFile(data, 'test.png')
            if (callback) {
                callback()
            }
        } else {
            console.log(`Fail to get settings`)
        }
    }

    public static async addImageToMyShapes(icon: string, imageData: string, myShapes: MyShape[], callback: () => void, imageWidth: number, imageHeight: number) {
        const imageInfo = imageData
        const id = SystemUtils.generateID()
        myShapes.push({ icon: icon, image: imageData, info: imageInfo, type: MyShapeType.IMAGE, name: 'Custom Image', id: id, width: imageWidth, height: imageHeight })

        const myShapesInfo = JSON.stringify({ shapes: myShapes })
        // console.log(`myShapesInfo= ${myShapes}`)
        const updateSettingsData = await RequestUtils.updateSettings(myShapesInfo)
        if (updateSettingsData.status == 200 && updateSettingsData.data.success) {
            console.log(`Succeed to update settings`)
        } else {
            console.log(`Fail to update settings`)
        }
        // SystemUtils.generateDownloadFile(data, 'test.png')
        if (callback) {
            callback()
        }
    }

    public static async addSvgToMyShapes(svgData: string, myShapes: MyShape[], callback: () => void, imageWidth: number, imageHeight: number) {
        const imageInfo = ImageUtils.convertBase64ImageToString(svgData)
        const id = SystemUtils.generateID()
        myShapes.push({ icon: svgData, image: svgData, info: imageInfo, type: MyShapeType.SVG, name: 'Custom SVG', id: id, width: imageWidth, height: imageHeight })

        const myShapesInfo = JSON.stringify({ shapes: myShapes })
        // console.log(`myShapesInfo= ${myShapes}`)
        const updateSettingsData = await RequestUtils.updateSettings(myShapesInfo)
        if (updateSettingsData.status == 200 && updateSettingsData.data.success) {
            console.log(`Succeed to update settings`)
        } else {
            console.log(`Fail to update settings`)
        }
        // SystemUtils.generateDownloadFile(data, 'test.png')
        if (callback) {
            callback()
        }
    }

    public static async exportToSVG(editor: Editor) {
        const a = new opentype.Path()
        const ttfdata = await Woff2Utils.decompress('a')
        const arrayBuffer = ttfdata.buffer.slice(ttfdata.byteOffset, ttfdata.byteLength + ttfdata.byteOffset)
        const font = opentype.parse(arrayBuffer)
        console.log(`Font info = ${font}`)
        const textPath = font.getPath('abc', 30, 30, 24)
        const textSVG = textPath.toSVG()
        return textSVG
    }

    public static async exportSelectedToSVG(editor: Editor) {
        return EditorHelper.generatEditorSVG(editor)
    }

    private static generatEditorSVG(editor: Editor) {
        let content = ''
        editor.contentLayer.getAllEditorItems().forEach(editorItem => {
            content += EditorHelper.generateSVGItem(editorItem as Item)
        })
        const result = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" width="${editor.origWidth}" ` +
            `height="${editor.origHeight}">` +
            `${content}` +
            `\n</svg>`
        return result
    }

    private static generatEditorItemSVG(item: Item) {
        const itemSVG = EditorHelper.generateSVGItem(item)
        let itemsSVG = ''
        if (item.items.length > 0) {
            itemsSVG += '\n<g>'
            item.items.forEach(child => {
                itemsSVG += EditorHelper.generatEditorItemSVG(child as Item)
            })
            itemsSVG += '</g>'
        }
        const result = itemSVG + itemsSVG
        return result
    }

    private static generateSVGItem(item: Item) {
        const transformSVG = EditorHelper.generateSVGTransform(item)
        if (item instanceof Connector) {
            const connectorArrowPathSVG = this.generateSVGConnectorArrow(item)
            return `\n<g id="${item.id}" ${transformSVG}>${connectorArrowPathSVG}\n</g>`
        } else {
            const pathSvg = EditorHelper.generateSVGPath(item.shape.path)
            const strokeSVG = EditorHelper.generateSVGPaint(item.shape.stroke, true, item.shape.stroked)
            const fillSVG = EditorHelper.generateSVGPaint(item.shape.fill, false, item.shape.filled)
            const disableSecond = item.shape.secondPath.isEmpty()
            const disableThird = item.shape.thirdPath.isEmpty()
            const disableFourth = item.shape.fourthPath.isEmpty()
            const secondPathSvg = disableSecond ? '' : EditorHelper.generateSVGPath(item.shape.secondPath)
            const secondStrokeSVG = disableSecond ? '' : EditorHelper.generateSVGPaint(item.shape.secondStroke, true, item.shape.secondStroked)
            const secondFillSVG = disableSecond ? '' : EditorHelper.generateSVGPaint(item.shape.secondFill, false, item.shape.secondFilled)
            const thirdPathSvg = disableThird ? '' : EditorHelper.generateSVGPath(item.shape.thirdPath)
            const thirdtrokeSVG = disableThird ? '' : EditorHelper.generateSVGPaint(item.shape.thirdStroke, true, item.shape.thirdStroked)
            const thirdFillSVG = disableThird ? '' : EditorHelper.generateSVGPaint(item.shape.thirdFill, false, item.shape.thirdFilled)
            const fourthPathSvg = disableFourth ? '' : EditorHelper.generateSVGPath(item.shape.fourthPath)
            const fourthStrokeSVG = disableFourth ? '' : EditorHelper.generateSVGPaint(item.shape.fourthStroke, true, item.shape.fourthStroked)
            const fourthFillSVG = disableFourth ? '' : EditorHelper.generateSVGPaint(item.shape.fourthFill, false, item.shape.fourthFilled)
            const secondSVG = disableSecond ? '' : `\n    <path ${secondFillSVG} ${secondStrokeSVG} ${secondPathSvg}/>`
            const thirdSVG = disableThird ? '' : `\n    <path ${thirdFillSVG} ${thirdtrokeSVG} ${thirdPathSvg}/>`
            const fourthSVG = disableFourth ? '' : `\n    <path ${fourthFillSVG} ${fourthStrokeSVG} ${fourthPathSvg}/>`

            return `\n<g id="${item.id}" ${transformSVG}>\n    <path ${fillSVG} ${strokeSVG} ${pathSvg}/> ${secondSVG} ${thirdSVG} ${fourthSVG}\n</g>`
        }
    }

    private static generateSVGConnectorArrow(connector: Connector) {
        const connectorShape = connector.connectorShape
        const pathSvg = EditorHelper.generateSVGPath(connectorShape.path)
        const strokeSVG = EditorHelper.generateSVGPaint(connectorShape.stroke, true, connectorShape.stroked)
        const fillSVG = EditorHelper.generateSVGPaint(connectorShape.fill, false, connectorShape.filled)
        const startArrowPathSVG = EditorHelper.generateSVGPath(connectorShape.startArrowPath)
        const endArrowPathSVG = EditorHelper.generateSVGPath(connectorShape.endArrowPath)
        const connectorDoubleLinePathSVG = EditorHelper.generateSVGPath(connectorShape.connectorDoubleLinePath)
        const arrowStrokeSVG = EditorHelper.generateSVGPaint(connectorShape.arrowStroke, false, true)
        const arrowFillSVG = EditorHelper.generateSVGPaint(connectorShape.arrowFill, false, true)
        const arrowOutlineSVG = EditorHelper.generateSVGPaint(connectorShape.arrowOutline, true, true)
        const connectorDoubleLineStrokeSVG = EditorHelper.generateSVGPaint(connectorShape.connectorDoubleLineStroke, true, true)
        const connectorDoubleLineFillSVG = EditorHelper.generateSVGPaint(connectorShape.connectorDoubleLineFill, true, true)
        const connectorDoubleLinePaintSVG = EditorHelper.generateSVGPaint(connectorShape.connectorDoubleLinePaint, true, true)
        let result = ''
        // `<path ${fillSVG} ${strokeSVG} ${pathSvg}/>`
        switch (connector.connectorType) {
            case ConnectorType.Curve:
                switch (connector.connectorMode) {
                    case ConnectorMode.Double:
                        result += `\n    <path fill='none' ${connectorDoubleLineStrokeSVG} ${pathSvg}/>`
                        result += `\n    <path fill='none' ${connectorDoubleLineFillSVG} ${pathSvg}/>`
                        break;
                    case ConnectorMode.DoubleAndStartArrow:
                    case ConnectorMode.DoubleAndEndArrow:
                    case ConnectorMode.DoubleAndBothArrows:
                    case ConnectorMode.Single:
                    default:
                        result += `\n    <path fill='none' ${strokeSVG} ${pathSvg}/>`
                        break
                }
                break;
            case ConnectorType.Orthogonal:
                switch (connector.connectorMode) {
                    case ConnectorMode.DoubleAndStartArrow:
                    case ConnectorMode.DoubleAndEndArrow:
                    case ConnectorMode.DoubleAndBothArrows:
                        result += `\n    <path fill='none' ${connectorDoubleLinePaintSVG} ${connectorDoubleLinePathSVG}/>`
                        break;
                    case ConnectorMode.Double:
                        result += `\n    <path fill='none' ${connectorDoubleLineStrokeSVG} ${pathSvg}/>`
                        result += `\n    <path fill='none' ${connectorDoubleLineFillSVG} ${pathSvg}/>`
                        break;
                    case ConnectorMode.Single:
                    default:
                        result += `\n    <path fill='none' ${strokeSVG} ${pathSvg}/>`
                        break
                }
                break;
            case ConnectorType.StraightLine:
            default:
                result += `\n    <path fill='none' ${strokeSVG} ${pathSvg}/>`
                break;
        }
        result += `<path ${fillSVG} ${strokeSVG} ${pathSvg}/>`
        if (connector.connectorMode == ConnectorMode.Single) {
            if (connector.startArrow.type != ConnectorArrowDisplayType.None) {
                if (connector.startArrow.close) {
                    if (connector.startArrow.outline) {
                        result += `\n    <path ${arrowFillSVG} ${startArrowPathSVG}/>`
                    } else {
                        result += `\n    <path ${arrowStrokeSVG} ${startArrowPathSVG}/>`
                    }
                }
                result += `\n    <path fill='none' ${arrowOutlineSVG} ${startArrowPathSVG}/>`
            }
            if (connector.endArrow.type != ConnectorArrowDisplayType.None) {
                if (connector.endArrow.close) {
                    if (connector.endArrow.outline) {
                        result += `\n    <path ${arrowFillSVG} ${endArrowPathSVG}/>`
                    } else {
                        result += `\n    <path ${arrowStrokeSVG} ${endArrowPathSVG}/>`
                    }
                }
                result += `\n    <path fill='none' ${arrowOutlineSVG} ${endArrowPathSVG}/>`
            }
        }
        return result
    }

    private static generateSVGTransform(item: Item) {
        const translate = (item.shape.position.x == 0 && item.shape.position.y == 0) ? '' : `translate(${item.shape.position.x}, ${item.shape.position.y})`
        const rotate = (item.shape.rotation.px == 0 && item.shape.rotation.py == 0 && item.shape.rotation.radius == 0) ? '' : `rotate(${item.shape.rotation.radius * 180 / Math.PI}, ${item.shape.rotation.px}, ${item.shape.rotation.py})`
        const result = `transform="${translate} ${rotate}"`
        return result
    }

    private static generateSVGPath(path: Path) {
        const result = `d="${path.toSVGString()}"`
        return result
    }

    private static generateSVGPaint(paint: Paint, isStroke: boolean, isEnabled: boolean) {
        let color = 'none'
        if (isEnabled) {
            color = SystemUtils.generateColorString(paint.getColor())
        }
        if (isStroke) {
            const result = `stroke="${color}" stroke-width="${paint.getStroketWidth()}"`
            return result
        } else {
            const result = `fill="${color}"`
            return result
        }
    }

}