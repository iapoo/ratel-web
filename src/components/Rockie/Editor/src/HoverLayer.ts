/* eslint-disable max-params */
import { Holder, } from '../../Design'
import { EditorItem, Item, } from '../../Items'
import { EditorLayer, } from './EditorLayer'

export class HoverLayer extends EditorLayer {
  private _holders: Holder[] = [];
  private _inHolder = true;

  public constructor (left = 0, top = 0, width = 100, height = 100) {
    super(left, top, width, height, false)
    this.hittable = false
  }

  public get inHolder (): boolean {
    return this._inHolder
  }

  public set inHolder (value: boolean) {
    this._inHolder = value
  }

  protected buildLayer () {
    // console.log(`checking holder = ${this.inHolder_}`)
    if (this.requireRebuild) {
      this.clear()
      if (this.getEditorItemCount() <= 0) {
        this._holders.length = 0
      } else {
        for (let i = 0; i < this.getEditorItemCount(); i++) {
          const editorItem: EditorItem = this.getEditorItem(i)
          const item: Item = editorItem as Item
          const holder: Holder = new Holder(this.editor!, item, this._inHolder, false)
          this._holders.push(holder)
          this.addNode(holder)
        }
      }
    } else {
      this._holders.forEach((holder) => {
        holder.layoutAnchors()
      })
    }
  }
}
