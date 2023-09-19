import { Item, } from '../../Items'
import { Editor, } from '../../Editor/src/Editor'

export abstract class Action {
  private _name: string | undefined;
  private _type: string | undefined;
  private _url: string | undefined;
  private _description: string | undefined;
  private _item: Item;
  private _editor: Editor;

  public constructor (editor: Editor, type: string | undefined = undefined, name: string | undefined = undefined,  description: string | undefined = undefined, url: string | undefined = undefined) {
    this._editor = editor
    this._type = type
    this._name = name
    this._description = description
    this._url = url
    this._item = this.buildItem()

    this.build()
  }

  public get editor (): Editor {
    return this._editor
  }

  public get item (): Item {
    return this._item
  }

  public build () {
    const newItem = this.buildItem()
    this._item = newItem
  }

  protected abstract buildItem(): Item;

  public get type (): string | undefined {
    return this._type
  }

  public set type (value: string | undefined) {
    this._type = value
  }
     
  public get description (): string | undefined {
    return this._description
  }

  public set description (value: string | undefined) {
    this._description = value
  }

  public get name (): string | undefined {
    return this._name
  }

  public set name (value: string | undefined) {
    this._name = value
  }

  public get url (): string | undefined {
    return this._url
  }

  public set url (value: string | undefined) {
    this._url = value
  }
}
