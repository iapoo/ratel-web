import { Point2, } from '@/components/Engine'
import { Item, TableEntity, } from '../../Items'
import { Action, } from './Action'
import { CustomTableEntity } from '../../Items/src/CustomTableEntity'
import { UMLGridShape } from '../../CustomItems/UML'
import { Editor } from '../../Editor'
import { UMLContainerShape } from '../../CustomItems/UML/src/UMLContainerShape'

export class UMLContainerAction extends Action {

  public constructor(editor: Editor, type: string | undefined) {
    super(editor, type)
  }
  protected buildItem (): Item {
    return new UMLContainerShape(100, 100, 200, 200)
  }
}
