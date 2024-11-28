import { Graphics } from '@ratel-web/engine'
import { EntityShape, ShapeTypeInfo } from './EntityShape'

export class PoolContainerShape extends EntityShape {
  private readonly _buildShape: (theThis: PoolContainerShape) => void
  private _horizontal: boolean
  private _poolCount: number
  private _stageCount: number

  public constructor(
    left: number,
    top: number,
    width: number,
    height: number,
    poolCount = 2,
    stageCount = 2,
    horizontal = true,
    buildShape: (_this: PoolContainerShape) => void,
    shapeTypeInfo: ShapeTypeInfo,
  ) {
    super('', left, top, width, height, shapeTypeInfo)
    this._horizontal = horizontal
    this._poolCount = poolCount
    this._stageCount = stageCount
    this._buildShape = buildShape
  }

  public get poolCount(): number {
    return this._poolCount
  }

  public set poolCount(value: number) {
    this._poolCount = value
  }

  public get stageCount() {
    return this._stageCount
  }

  public set stageCount(value: number) {
    this._stageCount = value
  }

  public get horizontal() {
    return this._horizontal
  }

  public set horizontal(value: boolean) {
    this._horizontal = value
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
    this._buildShape(this)
  }

  public dispose(): void {
    this.secondPath.delete()
    this.thirdPath.delete()
    this.fourthPath.delete()
  }
}
