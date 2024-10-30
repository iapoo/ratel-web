/* eslint-disable max-params */
import { Control, Graphics, Rectangle, } from '@/components/Engine'
import { Editor, } from './Editor'
import { EditorItem } from '../../Items'

export abstract class EditorLayer extends Control {
  private _editorItems: EditorItem[] = [];
  private _showEditorItems: boolean
  private _editor: Editor | undefined
  private _requireRebuild: boolean

  public constructor(left = 0, top = 0, width = 100, height = 100, showEditorItems = true) {
    super(left, top, width, height, '')
    this._showEditorItems = showEditorItems
    this.stroked = false
    this.filled = false
    this._requireRebuild = false
    this.clipped = false
    this.boundary = Rectangle.makeLTWH(left, top, width, height)
  }

  public get requireRebuild(): boolean {
    return this._requireRebuild
  }

  public get editor(): Editor | undefined {
    return this._editor
  }

  public set editor(value: Editor | undefined) {
    this._editor = value
  }

  public get showEditorItems(): boolean {
    return this._showEditorItems
  }

  public addEditorItem(editorItem: EditorItem) {
    // console.log(`editorItem= ${editorItem} , node = ${editorItem.node}`)
    this._editorItems.push(editorItem)
    if (this._showEditorItems) {
      this.addNode(editorItem.shape)
    }
    this._requireRebuild = true
    this.build()
  }

  public addEditorItems(editorItems: EditorItem[]) {
    const this_ = this
    editorItems.forEach(editorItem => {
      this_.addEditorItem(editorItem)
    })
  }

  public addEditorItemAt(editorItem: EditorItem, index: number): void {
    if (this._editorItems.indexOf(editorItem) < 0) {
      this._editorItems.splice(index, 0, editorItem)
      if (this._showEditorItems) {
        this.addNodeAt(editorItem.shape, index)
      }
      this._requireRebuild = true
      this.build()
    }
  }

  public removeEditorItem(editorItem: EditorItem) {
    const index = this._editorItems.indexOf(editorItem)
    if (index >= 0) {
      this._editorItems.splice(index, 1)
      if (this._showEditorItems) {
        this.removeNodeAt(index)
      }
      this._requireRebuild = true
      this.build()
    }
  }

  public getEditorItem(index: number): EditorItem {
    return this._editorItems[index]
  }

  public removeEditorItemAt(index: number) {
    this._editorItems.splice(index, 1)
    if (this._showEditorItems) {
      this.removeNodeAt(index)
    }
    this._requireRebuild = true
    this.build()
  }

  public removeAllEditorItems() {
    this._editorItems.length = 0
    if (this._showEditorItems) {
      this.clear()
    }
    this._requireRebuild = true
    this.build()
  }

  public getAllEditorItems(): EditorItem[] {
    return [...this._editorItems,]
  }

  public getEditorItemCount(): number {
    return this._editorItems.length
  }

  public hasEditorItem(editorItem: EditorItem): boolean {
    return this._editorItems.includes(editorItem)
  }

  public getIndexOfEditorItem(editorItem: EditorItem): number {
    return this._editorItems.indexOf(editorItem)
  }

  public invalidateLayer() {
    this._requireRebuild = true
    this.build()
  }

  private build() {
    this.buildLayer()
    this._requireRebuild = false
  }

  protected abstract buildLayer(): void
}
