import { Point2, } from '@/components/Engine'
import { Item, SvgContainer, } from '../../Items'
import { Action, } from './Action'

export class SvgContainerAction extends Action {
  protected buildItem (): Item {
    return new SvgContainer(100, 100, 240, 120)
  }
}
