/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Control } from './Control';
import { Colors, PointerEvent } from './Graphics';

export class Button extends Control {
  constructor(left = 0, top = 0, width = 100, height = 100, text = 'Button') {
    super(left, top, width, height, text);
    this.onPointerEnter(this.handleOnPainterEnter.bind(this));
    this.onPointerLeave(this.handleOnPainterLeave.bind(this));
    this.onPointerClick(this.handleOnPainterClick.bind(this));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private handleOnPainterEnter(e: PointerEvent): void {
    this.fill.setColor(Colors.AliceBlue);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private handleOnPainterLeave(e: PointerEvent): void {
    this.fill.setColor(Colors.LightGrey);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private handleOnPainterClick(e: PointerEvent): void {}
}
