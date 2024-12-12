import { Editor } from '../../Editor'
import { CodeContainer, Item } from '../../Items'
import { Action } from './Action'

export class CodeContainerAction extends Action {
  private _data: string
  private _width: number
  private _height: number

  public constructor(editor: Editor, type: string | undefined = undefined, data: string = '', width: number = 200, height: number = 200) {
    super(editor, type)
    this._data = data
    this._width = width
    this._height = height
    this.build()
  }

  protected buildItems(): Item[] {
    return [new CodeContainer(0, 0, this._width, this._height, this._data, this._data)]
  }
}
