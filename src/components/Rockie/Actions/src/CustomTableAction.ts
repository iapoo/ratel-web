import { Point2, } from '@/components/Engine'
import { Item, TableEntity, } from '../../Items'
import { Action, } from './Action'
import { CustomTableEntity } from '../../Items/src/CustomTableEntity'

export class CustomTableAction extends Action {
  protected buildItem (): Item {
    return new CustomTableEntity(100, 100, 240, 120)
  }
}
