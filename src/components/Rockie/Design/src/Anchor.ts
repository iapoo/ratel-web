import { Colors, Control, Paint, } from '@/components/Engine'
import { Item, } from '../../Items'
import { Editor, } from '../../Editor/src/Editor'
import { Holder, } from './Holder'

export abstract class Anchor extends Control {
  protected static readonly MIN_MOVING_INTERVAL = 100;
  private _target: Item | undefined;
  private _editor: Editor;
  private _holder: Holder;
  private _lastMovingTime = new Date().getTime();

  public constructor (editor: Editor, holder: Holder) {
    super()
    this._editor = editor
    this._holder = holder
    this.width = 8
    this.height = 8
    this.stroke = Paint.makeColorPaint(Colors.Blue)
    this.fill = Paint.makeColorPaint(Colors.White)
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
    this.buildAnchor()
  }

  public abstract handlePointerClick(x: number, y: number): void;
  public abstract handlePointerDown(x: number, y: number): void;
  public abstract handlePointerUp(x: number, y: number): void;
  public abstract handlePointerMove(x: number, y: number): void;

  protected get lastMovingTime (): number {
    return this._lastMovingTime
  }

  protected set lastMovingTime (value: number) {
    this._lastMovingTime = value
  }

  public get editor (): Editor {
    return this._editor
  }

  public get holder (): Holder {
    return this._holder
  }

  public get target (): Item | undefined {
    return this._target
  }

  public set target (value: Item | undefined) {
    this._target = value
  }

  protected abstract buildAnchor(): void;
}
