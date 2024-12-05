import { Graphics, ParagraphDirection } from '@ratel-web/engine'
import { EntityShape, ShapeTypeInfo } from './EntityShape'

export class PoolLabelShape extends EntityShape {
  private _textHorizontal: boolean

  public constructor(left: number, top: number, width: number, height: number, textHorizontal = true, shapeTypeInfo: ShapeTypeInfo) {
    super('', left, top, width, height, shapeTypeInfo)
    this._textHorizontal = textHorizontal
  }

  public get textHorizontal() {
    return this._textHorizontal
  }

  public set textHorizontal(value: boolean) {
    this._textHorizontal = value
    this.markDirty()
  }

  public render(graphics: Graphics): void {
    super.render(graphics)
    if (this.secondFilled) {
      graphics.drawPath(this.secondPath, this.secondFill)
    }
    if (this.secondStroked) {
      graphics.drawPath(this.secondPath, this.secondStroke)
    }
    if (this.thirdFilled) {
      graphics.drawPath(this.thirdPath, this.thirdFill)
    }
    if (this.thirdStroked) {
      graphics.drawPath(this.thirdPath, this.thirdStroke)
    }
    if (this.fourthFilled) {
      graphics.drawPath(this.fourthPath, this.fourthFill)
    }
    if (this.fourthStroked) {
      graphics.drawPath(this.fourthPath, this.fourthStroke)
    }
  }

  public update() {
    super.update()
    if (this.dirty) {
      if (!this._textHorizontal) {
        this.textWidth = this.height
        this.textHeight = this.width
        this.paragraphDirection = ParagraphDirection.BottomTop
      } else {
        this.textWidth = this.width
        this.textHeight = this.height
        this.paragraphDirection = ParagraphDirection.LeftRight
      }
    }
  }

  public dispose(): void {
    this.secondPath.delete()
    this.thirdPath.delete()
    this.fourthPath.delete()
  }
}
