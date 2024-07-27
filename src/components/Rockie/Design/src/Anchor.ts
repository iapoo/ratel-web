import { Colors, Control, Paint, Rectangle, Shape, } from '@/components/Engine'
import { Item, } from '../../Items'
import { Editor, } from '../../Editor/src/Editor'
import { Holder, } from './Holder'

export abstract class Anchor extends Shape {
  protected static readonly MIN_MOVING_INTERVAL = 100;
  private _target: Item | undefined;
  private _editor: Editor;
  private _holder: Holder;
  private _lastMovingTime = new Date().getTime();

  public constructor(editor: Editor, holder: Holder) {
    super()
    this._editor = editor
    this._holder = holder
    this.width = 10
    this.height = 10
    this.stroke.setColor(Colors.Blue)
    this.fill.setColor(Colors.White)
    this.stroke.setAntiAlias(true)
    this.onPointerClick((e) => {
      this.handlePointerClick(e.x, e.y)
    })

    this.onPointerDown((e) => {
      this.handlePointerDown(e.x, e.y)
    })

    this.onPointerUp((e) => {
      this.handlePointerUp(e.x, e.y)
    })

    this.onPointerMove((e) => {
      this.handlePointerMove(e.x, e.y)
    })

    this.onPointerEnter((e) => {
      this.handlePointerEnter()
    })

    this.onPointerLeave((e) => {
      this.handlePointerLeave()
    })
    this.buildAnchor()
  }

  public abstract handlePointerClick(x: number, y: number): void
  public abstract handlePointerDown(x: number, y: number): void
  public abstract handlePointerUp(x: number, y: number): void
  public abstract handlePointerMove(x: number, y: number): void
  public abstract handlePointerEnter(): void
  public abstract handlePointerLeave(): void

  protected get lastMovingTime(): number {
    return this._lastMovingTime
  }

  protected set lastMovingTime(value: number) {
    this._lastMovingTime = value
  }

  public get editor(): Editor {
    return this._editor
  }

  public get holder(): Holder {
    return this._holder
  }

  public get target(): Item | undefined {
    return this._target
  }

  public set target(value: Item | undefined) {
    this._target = value
  }

  protected abstract buildAnchor(): void;
}
