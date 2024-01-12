import { Point2, } from '@/components/Engine'
import { Connector, Item, LineEntity, } from '../../Items'
import { Action, } from './Action'

export class ConnectorAction extends Action {
  protected buildItem (): Item {
    return new Connector(new Point2(0, 0), new Point2(200, 200))
  }
}
