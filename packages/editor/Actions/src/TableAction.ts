import { Item, TableEntity } from '../../Items'
import { Action } from './Action'

export class TableAction extends Action {
  protected buildItems(): Item[] {
    return [new TableEntity(100, 100, 240, 120)]
  }
}
