import { Point2 } from '@ratel-web/engine'
import { Item, LineEntity } from '../../Items'
import { Action } from './Action'

export class LineAction extends Action {
  protected buildItems(): Item[] {
    return [new LineEntity(new Point2(100, 100), new Point2(300, 300))]
  }
}
