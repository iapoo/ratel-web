/* eslint-disable max-params */
import { Point2, Rotation } from '@/components/Engine'
import { Editor, EditorInfo, } from '@/components/Rockie/Editor'
import { Connector, EditorItem, Entity, LineEntity, ShapeEntity, ShapeTypes, Shapes, TableEntity, } from '@/components/Rockie/Items'
import { Categories, } from '@/components/Rockie/Items/src/Item'
import { EditorData, } from './EditorData'
import { EditorItemData, } from './EditorItemData'
import { StorageData, } from './StorageData'
import { ConnectorType, EntityShape } from '@/components/Rockie/Shapes'
import { ShapeData } from './ShapeData'
import { LineData } from './LineData'
import { ConnectorData } from './ConnectorData'
import { Consts, SystemUtils } from '../Utils'
import { CommonUtils } from '@/components/Rockie/Utils'
import { ThemeUtils } from '../Theme'
import { OperationHelper } from '@/components/Rockie/Operations'

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

  public static refreshItemData(itemData: EditorItemData, items: EditorItem[]) {
    if (itemData.category == Categories.CONNECTOR) {
      let connectorData = itemData as ConnectorData
      let connector: Connector | null = null
      items.forEach(item => {
        if(connectorData.id == item.id) {
          connector = item as Connector
        }
      })
      items.forEach(item => {
        if(connectorData.source == item.id && connector) {
          let entity = item as Entity
          connector.source =  entity
          entity.addSourceConnector(connector)
        }
        if(connectorData.target == item.id && connector) {
          let entity = item as Entity
          connector.target =  entity
          entity.addTargetConnector(connector)
        }
      })
      console.log(connector)
    }
  }

  private static loadLineEntity(itemData: EditorItemData): EditorItem {
    let lineData = itemData as LineData
    let start = SystemUtils.parsePointString(lineData.start)
    let end = SystemUtils.parsePointString(lineData.end)
    let lineEntity = new LineEntity(start, end)
    if (itemData.rotation) {
      lineEntity.rotation = new Rotation(itemData.rotation, lineEntity.width / 2, lineEntity.height / 2)
    }
    lineEntity.text = itemData.text
    lineEntity.id = itemData.id
    return lineEntity
  }

  private static loadConnector(itemData: EditorItemData): EditorItem {
    let connectorData = itemData as ConnectorData
    let start = SystemUtils.parsePointString(connectorData.start)
    let end = SystemUtils.parsePointString(connectorData.end)
    let connector = new Connector(start, end)
    connector.connectorType = connectorData.connectorType ? CommonUtils.parseConnectorTypeString(connectorData.connectorType) : ConnectorType.Orthogonal
    connector.id = connectorData.id
    return connector
  }

  private static loadShapeEntity(itemData: EditorItemData): EditorItem {
    let shapeData = itemData as ShapeData
    const shapeEntity = new ShapeEntity(shapeData.left, shapeData.top, shapeData.width, shapeData.height, {
      shapeType: shapeData.type
    })
    shapeEntity.type = shapeData.type
    shapeEntity.text = shapeData.text
    shapeEntity.id = shapeData.id
    if (shapeData.rotation) {
      shapeEntity.rotation = new Rotation(shapeData.rotation, shapeEntity.width / 2, shapeEntity.height / 2)
    }
    shapeEntity.useTheme = itemData.useTheme
    if(itemData.useTheme) {
      shapeEntity.strokeColor = ThemeUtils.strokeColor
      shapeEntity.fillColor = ThemeUtils.fillColor
      shapeEntity.lineWidth = ThemeUtils.lineWidth
    } else {
      let strokeColor = SystemUtils.parseColorString(shapeData.strokeColor)
      if(strokeColor) {
        shapeEntity.strokeColor = strokeColor
      }
      let fillColor = SystemUtils.parseColorString(shapeData.fillColor)
      if(fillColor) {
        shapeEntity.fillColor = fillColor
      }
      if(shapeData.lineWidth) {
        shapeEntity.lineWidth = shapeData.lineWidth
      }
    }
    shapeEntity.shape.modifier = SystemUtils.parsePointString(shapeData.modifier)
    shapeEntity.shape.adapter = SystemUtils.parsePointString(shapeData.adapter)

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

  public saveOld() {
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

  public save() {
    this._storageData.sheets.length = 0
    const count = this._editors.length
    for (let i = 0; i < count; i++) {
      const editor = this._editors[i]
      const editorInfo = new EditorInfo()
      this.saveEditor(editor, editorInfo)
      this._storageData.sheets.push(editorInfo)
    }

    const data = JSON.stringify(this._storageData)
    console.log(data)
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

  //private loadEditor(editor: Editor, editorData: EditorData) {
  //  editor.contentLayer.removeAllEditorItems()
  //  const itemCount = editorData.items.length
  //  for (let i = 0; i < itemCount; i++) {
  //    const editorItemData = editorData.items[i]
  //    const editorItem = editor.contentLayer.getEditorItem(i)
  //    this.loadEditorItem(editorItem, editorItemData)
  //  }
  //}

  //private loadEditorItem(editorItem: EditorItem, editorItemData: EditorItemData) {

  //}

  private saveEditor(editor: Editor, editorData: EditorData) {
    editorData.title = editor.title
    editorData.key = editor.key
    const itemCount = editor.contentLayer.getEditorItemCount()
    for (let i = 0; i < itemCount; i++) {
      const editorItem = editor.contentLayer.getEditorItem(i)
      const editorItemInfo = OperationHelper.saveEditorItem(editorItem)
      editorData.items.push(editorItemInfo)
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
    editorItemData.useTheme = editorItem.useTheme
    if(editorItem.useTheme) {
      editorItemData.strokeColor = null
      editorItemData.fillColor = null
      editorItemData.lineWidth = null
    } else {
      editorItemData.strokeColor = SystemUtils.generateColorString(editorItem.strokeColor)
      editorItemData.fillColor = SystemUtils.generateColorString(editorItem.strokeColor)
      editorItemData.lineWidth = editorItem.lineWidth
    }
    
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
    shapeData.modifier = SystemUtils.generatePointString(shapeEntity.shape.modifier)
    shapeData.adapter = SystemUtils.generatePointString(shapeEntity.shape.adapter)
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
      //connectorData.s
    }
    if(connector.targetJoint) {

    }
    connectorData.connectorType = connector.connectorType ?  CommonUtils.parseConnectorType(connector.connectorType) : null

    return connectorData
  }

}
