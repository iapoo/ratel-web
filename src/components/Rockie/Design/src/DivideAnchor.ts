import { Rectangle } from '@/components/Engine'
import { Anchor, } from './Anchor'

/**
 * 创建分段点
 */
export class DivideAnchor extends Anchor {
  public handlePointerClick (x: number, y: number) {

  }
  public handlePointerDown (x: number, y: number) {

  }
  public handlePointerUp (x: number, y: number) {
  }
  public handlePointerMove (x: number, y: number) {

  }
  protected buildAnchor () {
    this.path.reset()
    this.path.addOval(Rectangle.makeLTWH(0, 0, this.width, this.height))
  }
}
