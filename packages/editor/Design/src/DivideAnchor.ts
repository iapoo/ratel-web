import { Rectangle } from '@ratel-web/engine'
import { Anchor } from './Anchor'

/**
 * 创建分段点
 */
export class DivideAnchor extends Anchor {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public handlePointerClick(x: number, y: number) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public handlePointerDown(x: number, y: number) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public handlePointerUp(x: number, y: number) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public handlePointerMove(x: number, y: number) {}
  public handlePointerEnter(): void {}

  public handlePointerLeave(): void {}
  protected buildAnchor() {
    this.path.reset()
    this.path.addOval(Rectangle.makeLTWH(0, 0, this.width, this.height))
  }
}
