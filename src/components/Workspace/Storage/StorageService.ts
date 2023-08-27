/* eslint-disable max-params */
import { Rotation } from '@/components/Engine'
import { Editor, EditorItem, } from '@/components/Rockie/Editor'
import { Connector, LineEntity, ShapeEntity, Shapes, TableEntity, } from '@/components/Rockie/Items'
import { Categories, } from '@/components/Rockie/Items/src/Item'
import { EditorData, } from './EditorData'
import { EditorItemData, } from './EditorItemData'
import { StorageData, } from './StorageData'

export class StorageService {
  public static loadItemData (itemData: EditorItemData): EditorItem {
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

  private static loadLineEntity (itemData: EditorItemData): EditorItem {
    const lineEntity = new LineEntity()
    return lineEntity
  }

  private static loadConnector (itemData: EditorItemData): EditorItem {
    const connector = new Connector()

    return connector
  }

  private static loadShapeEntity (itemData: EditorItemData): EditorItem {
    const shapeEntity = new ShapeEntity(itemData.left, itemData.top, itemData.width, itemData.height)
    shapeEntity.type = itemData.type
    shapeEntity.text = itemData.text
    if(itemData.rotation) {
      shapeEntity.rotation = new Rotation(itemData.rotation, shapeEntity.width / 2, shapeEntity.height /2)
    }
    return shapeEntity
  }

  private static loadTableEntity (itemData: EditorItemData): EditorItem {
    const tableEntity = new TableEntity(itemData.left, itemData.top, itemData.width, itemData.height)

    return tableEntity
  }
  private _editors: Array<Editor> = new Array<Editor>(0)
  private _storageData: StorageData = new StorageData()

  public get editors () {
    return this._editors
  }

  public set editors (value: Array<Editor>) {
    this._editors = [ ...value, ]
  }

  public get storageData () {
    return this._storageData
  }

  public save () {
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

  public load () {
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

  public loadDocument (documentData: string) {
    let data = JSON.parse(documentData)
    this._storageData = data
  }

  public loadNewDocument () {
    let documentData = `
    {"version":"1.0","author":"",
    "sheets":[{"name":"","index":0,"zoom":1,"x":0,"y":0,"width":2000,"height":2000,"title":"File 1","key":"1","items":[]},
    {"name":"","index":0,"zoom":1,"x":0,"y":0,"width":2000,"height":2000,"title":"File 2","key":"2","items":[]},
    {"name":"","index":0,"zoom":1,"x":0,"y":0,"width":2000,"height":2000,"title":"File 3","key":"3","items":[]}]}
    `
    let data = JSON.parse(documentData)
    this._storageData = data
  }

  private loadEditor (editor: Editor, editorData: EditorData) {
    editor.contentLayer.removeAllEditorItems()
    const itemCount = editorData.items.length
    for (let i = 0; i < itemCount; i++) {
      const editorItemData = editorData.items[i]
      const editorItem = editor.contentLayer.getEditorItem(i)
      this.loadEditorItem(editorItem, editorItemData)
    }
  }

  private loadEditorItem (editorItem: EditorItem, editorItemData: EditorItemData) {

  }

  private saveEditor (editor: Editor, editorData: EditorData) {
    editorData.title = editor.title
    editorData.key = editor.key
    const itemCount = editor.contentLayer.getEditorItemCount()
    for (let i = 0; i < itemCount; i++) {
      const editorItem = editor.contentLayer.getEditorItem(i)
      const editorItemData = new EditorItemData()
      this.saveEditorItem(editorItem, editorItemData)
      editorData.items.push(editorItemData)
    }
  }

  private saveEditorItem (editorItem: EditorItem, editorItemData: EditorItemData) {
    editorItemData.left = editorItem.left
    editorItemData.top = editorItem.top
    editorItemData.width = editorItem.width
    editorItemData.height = editorItem.height
    editorItemData.rotation = editorItem.rotation.radius
    editorItemData.text = editorItem.text
    editorItemData.items.length = 0
    editorItemData.category = editorItem.category
    editorItemData.type = editorItem.type
    const itemCount = editorItem.items.length
    for (let i = 0; i < itemCount; i++) {
      const childItem = editorItem.items[i]
      const editorItemData = new EditorItemData()
      this.saveEditorItem(childItem, editorItemData)
      editorItemData.items.push(editorItemData)
    }
  }
}
