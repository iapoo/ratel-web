import { Point2, } from '@/components/Engine'
import { Item, LineEntity, } from '../../Items'
import { Action, } from './Action'

export class LineAction extends Action {
  protected buildItem (): Item {
    return new LineEntity(new Point2(100, 100), new Point2(300, 300))
  }
}
