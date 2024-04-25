import { Point2, } from '@/components/Engine'
import { Item, TableEntity, } from '../../Items'
import { Action, } from './Action'
import { UMLGridShape } from '../../CustomItems/UML'
import { Editor } from '../../Editor'

export class CustomTableAction extends Action {

  public constructor(editor: Editor, type: string | undefined) {
    super(editor, type)
  }
  protected buildItem (): Item {
    return new UMLGridShape(100, 100, 240, 120, this.type!)
  }
}
