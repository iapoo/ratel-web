import { Point2, } from '@/components/Engine'
import { Item, SvgContainer, } from '../../Items'
import { Action, } from './Action'
import { Editor } from '../../Editor'

export class SvgContainerAction extends Action {

  private _data: string
  private _width: number
  private _height: number

  public constructor (editor: Editor, type: string | undefined = undefined, data: string = '', width: number = 100, height: number = 100) {
    super(editor, type)
    this._data = data
    this._width = width
    this._height =  height
    this.build()
  }

  protected buildItem (): Item {
    return new SvgContainer(0, 0, this._width, this._height, this._data)
  }
}
