/* eslint-disable max-params */
import { Point2, Rotation } from '@/components/Engine'
import { Editor, EditorItem, } from '@/components/Rockie/Editor'
import { Connector, ConnectorType, LineEntity, ShapeEntity, ShapeTypes, Shapes, TableEntity, } from '@/components/Rockie/Items'
import { Categories, } from '@/components/Rockie/Items/src/Item'
import { EditorData, } from './EditorData'
import { EditorItemData, } from './EditorItemData'
import { StorageData, } from './StorageData'
import { EntityShape } from '@/components/Rockie/Shapes'
import { ShapeData } from './ShapeData'
import { LineData } from './LineData'
import { ConnectorData } from './ConnectorData'
import { Consts } from '../Utils'

export class StorageService {
  public static loadItemData(itemData: EditorItemData): EditorItem {
    switch (itemData.category) {
      case Categories.LINE:
        return this.loadLineEntity(itemData)
      case Categories.CONNECTOR:
        return this.loadConnector(itemData)
      case Categories.TABLE:
        return this.loadTableEntity(itemData)
      case Categories.SHAPE:
      default:
        return this.loadShapeEntity(itemData)
    }
  }

  private static loadLineEntity(itemData: EditorItemData): EditorItem {
    let lineData = itemData as LineData
    let lineEntity = new LineEntity(new Point2(lineData.startX, lineData.startY), new Point2(lineData.endX, lineData.endY))
    if (itemData.rotation) {
      lineEntity.rotation = new Rotation(itemData.rotation, lineEntity.width / 2, lineEntity.height / 2)
    }
    lineEntity.text = itemData.text
    return lineEntity
  }

  private static loadConnector(itemData: EditorItemData): EditorItem {
    let connectorData = itemData as ConnectorData
    let connector = new Connector(new Point2(connectorData.startX, connectorData.startY), new Point2(connectorData.endX, connectorData.endY))
    connector.connectorType = connectorData.connectorType ? Consts.parseConnectorTypeString(connectorData.connectorType) : undefined
    return connector
  }

  private static loadShapeEntity(itemData: EditorItemData): EditorItem {
    let shapeData = itemData as ShapeData
    const shapeEntity = new ShapeEntity(shapeData.left, shapeData.top, shapeData.width, shapeData.height, {
      shapeType: shapeData.type
    })
    shapeEntity.type = shapeData.type
    shapeEntity.text = shapeData.text
    if (shapeData.rotation) {
      shapeEntity.rotation = new Rotation(shapeData.rotation, shapeEntity.width / 2, shapeEntity.height / 2)
    }
    shapeEntity.shape.modifier = new Point2(shapeData.modifierX, shapeData.modifierY)
    shapeEntity.shape.adapter = new Point2(shapeData.adapterX, shapeData.adapterY)

    return shapeEntity
  }

  private static loadTableEntity(itemData: EditorItemData): EditorItem {
    const tableEntity = new TableEntity(itemData.left, itemData.top, itemData.width, itemData.height)

    return tableEntity
  }
  private _editors: Array<Editor> = new Array<Editor>(0)
  private _storageData: StorageData = new StorageData()

  public get editors() {
    return this._editors
  }

  public set editors(value: Array<Editor>) {
    this._editors = [...value,]
  }

  public get storageData() {
    return this._storageData
  }

  public save() {
    this._storageData.sheets.length = 0
    const count = this._editors.length
    for (let i = 0; i < count; i++) {
      const editor = this._editors[i]
      const editorData = new EditorData()
      this.saveEditor(editor, editorData)
      this._storageData.sheets.push(editorData)
    }

    const data = JSON.stringify(this._storageData)
    console.log(data)
    StorageService.testdata = data
  }

  public static testdata = ''

  public load() {
    let source = `{"version":"1.0","author":"","sheets":[{"name":"","index":0,"zoom":1,"x":0,"y":0,"width":2000,"height":2000,"title":"File 1","key":"1","items":[{"type":"Rectangle","left":12,"top":28,"width":200,"height":200,"text":"","items":[],"shape":{"left":0,"top":0,"width":100,"height":100,"text":""}}]},{"name":"","index":0,"zoom":1,"x":0,"y":0,"width":2000,"height":2000,"title":"File 2","key":"2","items":[{"type":"Rectangle","left":220,"top":188,"width":200,"height":200,"text":"","items":[],"shape":{"left":0,"top":0,"width":100,"height":100,"text":""}}]},{"name":"","index":0,"zoom":1,"x":0,"y":0,"width":2000,"height":2000,"title":"File 3","key":"3","items":[{"type":"Rectangle","left":572,"top":-4,"width":200,"height":200,"text":"","items":[],"shape":{"left":0,"top":0,"width":100,"height":100,"text":""}}]}]}`

    source = `
    {"version":"1.0","author":"","sheets":[{"name":"","index":0,"zoom":1,"x":0,"y":0,"width":2000,"height":2000,"title":"File 1","key":"1","items":[{"type":"Rectangle","category":"Shape","left":124,"top":44,"width":200,"height":200,"text":"fasfsffa","items":[],"shape":{"left":0,"top":0,"width":100,"height":100,"text":""}},{"type":"","category":"Table","left":410,"top":154,"width":300,"height":300,"text":"","items":[],"shape":{"left":0,"top":0,"width":100,"height":100,"text":""}}]},{"name":"","index":0,"zoom":1,"x":0,"y":0,"width":2000,"height":2000,"title":"File 2","key":"2","items":[]},{"name":"","index":0,"zoom":1,"x":0,"y":0,"width":2000,"height":2000,"title":"File 3","key":"3","items":[]}]}
    `
    let data = JSON.parse(source)
    data = JSON.parse(StorageService.testdata)
    this._storageData = data

    console.log(this._storageData)
    // const count = this._editors.length
    // for (let i = 0; i < count; i++) {
    //  const editor = this._editors[i]
    //  const editorData = this._storageData.sheets[i]
    //  this.loadEditor(editor, editorData)
    // }
  }

  public loadDocument(documentData: string) {
    let data = JSON.parse(documentData)
    this._storageData = data
  }

  public loadNewDocument() {
    let documentData = `
    {"version":"1.0","author":"",
    "sheets":[{"name":"","index":0,"zoom":1,"x":0,"y":0,"width":2000,"height":2000,"title":"File 1","key":"1","items":[]},
    {"name":"","index":0,"zoom":1,"x":0,"y":0,"width":2000,"height":2000,"title":"File 2","key":"2","items":[]},
    {"name":"","index":0,"zoom":1,"x":0,"y":0,"width":2000,"height":2000,"title":"File 3","key":"3","items":[]}]}
    `
    let data = JSON.parse(documentData)
    this._storageData = data
  }

  private loadEditor(editor: Editor, editorData: EditorData) {
    editor.contentLayer.removeAllEditorItems()
    const itemCount = editorData.items.length
    for (let i = 0; i < itemCount; i++) {
      const editorItemData = editorData.items[i]
      const editorItem = editor.contentLayer.getEditorItem(i)
      this.loadEditorItem(editorItem, editorItemData)
    }
  }

  private loadEditorItem(editorItem: EditorItem, editorItemData: EditorItemData) {

  }

  private saveEditor(editor: Editor, editorData: EditorData) {
    editorData.title = editor.title
    editorData.key = editor.key
    const itemCount = editor.contentLayer.getEditorItemCount()
    for (let i = 0; i < itemCount; i++) {
      const editorItem = editor.contentLayer.getEditorItem(i)
      const editorItemData = this.saveEditorItem(editorItem)
      editorData.items.push(editorItemData)
    }
  }

  private saveEditorItem(editorItem: EditorItem): EditorItemData {
    let editorItemData: EditorItemData
    switch (editorItem.category) {
      case Categories.LINE:
        editorItemData = this.saveLineData(editorItem as LineEntity)
        break
      case Categories.CONNECTOR:
        editorItemData = this.saveConnectorData(editorItem as Connector)
        break;
      case Categories.TABLE:
      case Categories.SHAPE:
      default:
        editorItemData = this.saveShapeData(editorItem as ShapeEntity)
        break
    }
    editorItemData.id = editorItem.id
    editorItemData.items.length = 0
    const itemCount = editorItem.items.length
    for (let i = 0; i < itemCount; i++) {
      const childItem = editorItem.items[i]
      const childEditorItemData = this.saveEditorItem(childItem)
      editorItemData.items.push(childEditorItemData)
    }
    return editorItemData
  }

  private saveShapeData(shapeEntity: ShapeEntity) : EditorItemData {
    let shapeData = new ShapeData(shapeEntity.type, shapeEntity.category, shapeEntity.left, shapeEntity.top, shapeEntity.width, shapeEntity.height, shapeEntity.text,)
    shapeData.rotation = shapeEntity.rotation.radius
    shapeData.modifierX = shapeEntity.shape.modifier.x
    shapeData.modifierY = shapeEntity.shape.modifier.y
    shapeData.adapterX = shapeEntity.shape.adapter.x
    shapeData.adapterY = shapeEntity.shape.adapter.y
    shapeData.adapterSize = shapeEntity.shape.adapterSize

    return shapeData
  }

  private saveLineData(lineEntity: LineEntity) : EditorItemData {
    let lineData = new LineData(lineEntity.start.x, lineEntity.start.y, lineEntity.end.x, lineEntity.end.y, lineEntity.text, lineEntity.rotation.radius)

    return lineData
  }


  private saveConnectorData(connector: Connector) : EditorItemData {
    let connectorData = new ConnectorData(connector.start.x, connector.start.y, connector.end.x, connector.end.y, connector.text, connector.rotation.radius)
    if(connector.source) {
      connectorData.source = connector.source.id
    }
    if(connector.target) {
      connectorData.target = connector.target.id
    }
    if(connector.sourceJoint) {

    }
    if(connector.targetJoint) {

    }
    connectorData.connectorType = connector.connectorType ?  Consts.parseConnectorType(connector.connectorType) : null

    return connectorData
  }

}
