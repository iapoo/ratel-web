/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Shape } from './Shape'

export class Layer extends Shape {
  constructor(left: number, top: number, width: number, height: number) {
    super(left, top, width, height)
    this.clipped = false
  }

  public update() {
    super.update()
  }
}
