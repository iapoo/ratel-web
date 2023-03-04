/* eslint-disable max-params */
import { CreationAnchor, } from './CreationAnchor'
import { DivideAnchor, } from './DivideAnchor'
import { ConnectionAnchor, } from './ConnectionAnchor'
import { ResizeAnchor, ResizeType, } from './ResizeAnchor'
import { RotationAnchor, } from './RotationAnchor'
import { ReshapeAnchor, } from './ReshapeAnchor'
import { Control, Rectangle, Scale, } from '@/components/Engine'
import { Connector, Item, LineEntity, LineType, } from '../../Items'
import { Editor, } from '../../Editor/src/Editor'
import { PointAnchor, } from './PointAnchor'

export class Holder extends Control {
  public static readonly PADDING = 32;
  public static readonly ANCHOR_RADIUS = 4;
  public static readonly ANCHOR_DISTANCE = 24;
  private _divideAnchors: DivideAnchor[] = [];
  private _rotationAnchor: RotationAnchor;
  private _reshapeAnchor: ReshapeAnchor;
  private _leftCreationAnchor: CreationAnchor;
  private _topCreationAnchor: CreationAnchor;
  private _rightCreationAnchor: CreationAnchor;
  private _bottomCreationAnchor: CreationAnchor;
  private _leftResizeAnchor: ResizeAnchor;
  private _leftTopResizeAnchor: ResizeAnchor;
  private _topResizeAnchor: ResizeAnchor;
  private _rightTopResizeAnchor: ResizeAnchor;
  private _rightResizeAnchor: ResizeAnchor;
  private _rightBottomResizeAnchor: ResizeAnchor;
  private _bottomResizeAnchor: ResizeAnchor;
  private _leftBottomResizeAnchor: ResizeAnchor;
  private _sourceConnectionAnchor: ConnectionAnchor;
  private _targetConnectionAnchor: ConnectionAnchor;
  private _startAnchor:PointAnchor
  private _endAnchor: PointAnchor
  private _target: Item;
  private _inHolder: boolean;
  private _editor: Editor;
  private _inSelection: boolean

  public constructor (editor: Editor, target: Item, inHolder: boolean, inSelection: boolean) {
    super()
    this._editor = editor
    this._rotationAnchor = new RotationAnchor(editor, this)
    this._reshapeAnchor = new ReshapeAnchor(editor, this)
    this._leftCreationAnchor = new CreationAnchor(editor, this)
    this._topCreationAnchor = new CreationAnchor(editor, this)
    this._rightCreationAnchor = new CreationAnchor(editor, this)
    this._bottomCreationAnchor = new CreationAnchor(editor, this)
    this._leftResizeAnchor = new ResizeAnchor(editor, this, ResizeType.Left)
    this._leftTopResizeAnchor = new ResizeAnchor(editor, this, ResizeType.LeftTop)
    this._topResizeAnchor = new ResizeAnchor(editor, this, ResizeType.Top)
    this._rightTopResizeAnchor = new ResizeAnchor(editor, this, ResizeType.RightTop)
    this._rightResizeAnchor = new ResizeAnchor(editor, this, ResizeType.Right)
    this._rightBottomResizeAnchor = new ResizeAnchor(editor, this, ResizeType.RightBottom)
    this._bottomResizeAnchor = new ResizeAnchor(editor, this, ResizeType.Bottom)
    this._leftBottomResizeAnchor = new ResizeAnchor(editor, this, ResizeType.LeftBottom)
    this._sourceConnectionAnchor = new ConnectionAnchor(editor, this)
    this._targetConnectionAnchor = new ConnectionAnchor(editor, this)
    this._startAnchor = new PointAnchor(editor, this, true)
    this._endAnchor = new PointAnchor(editor, this, false)
    this.stroked = false
    this.filled = false
    this.clipped = false
    this._target = target
    this._inHolder = inHolder
    this._inSelection = inSelection
    this.boundary = Rectangle.makeLTWH(
      target.boundary.left,
      target.boundary.top,
      target.boundary.width,
      target.boundary.height
    )
    this.hittable = false
    this.rotation = target.rotation

    this._rotationAnchor.target = target
    this._reshapeAnchor.target = target
    this._leftResizeAnchor.target = target
    this.leftTopResizeAnchor.target = target
    this.topResizeAnchor.target = target
    this._rightTopResizeAnchor.target = target
    this._rightResizeAnchor.target = target
    this._rightBottomResizeAnchor.target = target
    this._bottomResizeAnchor.target = target
    this._leftBottomResizeAnchor.target = target
    this._leftCreationAnchor.target = target
    this._topCreationAnchor.target = target
    this._rightCreationAnchor.target = target
    this._bottomCreationAnchor.target = target
    this._startAnchor.target = target
    this._endAnchor.target = target
    this.layoutAnchors()
    if (this._inHolder) {
      this.addAnchors()
    }
  }

  public get editor (): Editor {
    return this._editor
  }
  public get inHolder (): boolean {
    return this._inHolder
  }

  public get target (): Item {
    return this._target
  }

  public get divideAnchors (): DivideAnchor[] {
    return this._divideAnchors
  }

  public get rotationAnchor (): RotationAnchor {
    return this._rotationAnchor
  }
  public get reshapeAnchor (): ReshapeAnchor {
    return this._reshapeAnchor
  }
  public get leftCreationAnchor (): CreationAnchor {
    return this._leftCreationAnchor
  }
  public get topCreationAnchor (): CreationAnchor {
    return this._topCreationAnchor
  }
  public get rightCreationAnchor (): CreationAnchor {
    return this._rightCreationAnchor
  }
  public get bottomCreationAnchor (): CreationAnchor {
    return this._bottomCreationAnchor
  }
  public get leftResizeAnchor (): ResizeAnchor {
    return this._leftResizeAnchor
  }
  public get leftTopResizeAnchor (): ResizeAnchor {
    return this._leftTopResizeAnchor
  }
  public get topResizeAnchor (): ResizeAnchor {
    return this._topResizeAnchor
  }
  public get rightTopResizeAnchor (): ResizeAnchor {
    return this._rightTopResizeAnchor
  }
  public get rightResizeAnchor (): ResizeAnchor {
    return this._rightResizeAnchor
  }
  public get rightBottomResizeAnchor (): ResizeAnchor {
    return this._rightBottomResizeAnchor
  }
  public get bottomResizeAnchor (): ResizeAnchor {
    return this._bottomResizeAnchor
  }
  public get leftBottomResizeAnchor (): ResizeAnchor {
    return this._leftBottomResizeAnchor
  }
  public get sourceConnectionAnchor (): ConnectionAnchor {
    return this._sourceConnectionAnchor
  }
  public get targetConnectionAnchor (): ConnectionAnchor {
    return this._targetConnectionAnchor
  }

  public layoutAnchors () {
    this._rotationAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
    this._reshapeAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
    this._leftCreationAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
    this._topCreationAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
    this._rightCreationAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
    this._bottomCreationAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
    this._leftResizeAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
    this._leftTopResizeAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
    this._topResizeAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
    this._rightTopResizeAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
    this._rightResizeAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
    this._rightBottomResizeAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
    this._bottomResizeAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
    this._leftBottomResizeAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
    this._sourceConnectionAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
    this._targetConnectionAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)

    this._rotationAnchor.left = this._target.width - Holder.ANCHOR_RADIUS
    this._rotationAnchor.top = -Holder.ANCHOR_DISTANCE
    this._reshapeAnchor.left = Holder.ANCHOR_DISTANCE
    this._reshapeAnchor.top = Holder.ANCHOR_DISTANCE
    this._leftResizeAnchor.left = -Holder.ANCHOR_RADIUS
    this._leftResizeAnchor.top = this._target.height / 2 - Holder.ANCHOR_RADIUS
    this.leftTopResizeAnchor.left = -Holder.ANCHOR_RADIUS
    this.leftTopResizeAnchor.top = -Holder.ANCHOR_RADIUS
    this.topResizeAnchor.left = this._target.width / 2 - Holder.ANCHOR_RADIUS
    this.topResizeAnchor.top = -Holder.ANCHOR_RADIUS
    this._rightTopResizeAnchor.left = this._target.width - Holder.ANCHOR_RADIUS
    this._rightTopResizeAnchor.top = -Holder.ANCHOR_RADIUS
    this._rightResizeAnchor.left = this._target.width - Holder.ANCHOR_RADIUS
    this._rightResizeAnchor.top = this._target.height / 2 - Holder.ANCHOR_RADIUS
    this._rightBottomResizeAnchor.left = this._target.width - Holder.ANCHOR_RADIUS
    this._rightBottomResizeAnchor.top = this._target.height - Holder.ANCHOR_RADIUS
    this._bottomResizeAnchor.left = this._target.width / 2 - Holder.ANCHOR_RADIUS
    this._bottomResizeAnchor.top = this._target.height - Holder.ANCHOR_RADIUS
    this._leftBottomResizeAnchor.left = -Holder.ANCHOR_RADIUS
    this._leftBottomResizeAnchor.top = this._target.height - Holder.ANCHOR_RADIUS
    this._leftCreationAnchor.left = -Holder.ANCHOR_DISTANCE
    this._leftCreationAnchor.top = this._target.height / 2 - Holder.ANCHOR_RADIUS
    this._topCreationAnchor.left = this._target.width / 2 - Holder.ANCHOR_RADIUS
    this._topCreationAnchor.top = -Holder.ANCHOR_DISTANCE
    this._rightCreationAnchor.left = this._target.width + Holder.ANCHOR_DISTANCE
    this._rightCreationAnchor.top = this._target.height / 2 - Holder.ANCHOR_RADIUS
    this._bottomCreationAnchor.left = this._target.width / 2 - Holder.ANCHOR_RADIUS
    this._bottomCreationAnchor.top = this._target.height + Holder.ANCHOR_DISTANCE
    if (this._target instanceof Connector) {
      this._sourceConnectionAnchor.left = (this._target.start.x > this._target.end.x) ? (this._target.start.x - this._target.end.x) - Holder.ANCHOR_RADIUS : -Holder.ANCHOR_RADIUS
      this._sourceConnectionAnchor.top = (this._target.start.y > this._target.end.y) ? (this._target.start.y - this._target.end.y) - Holder.ANCHOR_RADIUS : -Holder.ANCHOR_RADIUS
      this._targetConnectionAnchor.left = (this._target.start.x > this._target.end.x) ? -Holder.ANCHOR_RADIUS : Math.abs(this._target.start.x - this._target.end.x) - Holder.ANCHOR_RADIUS
      this._targetConnectionAnchor.top = (this._target.start.y > this._target.end.y) ? -Holder.ANCHOR_RADIUS : Math.abs(this._target.start.y - this._target.end.y) - Holder.ANCHOR_RADIUS
    }
    if (this._target instanceof LineEntity) {
      switch (this._target.lineType) {
      case LineType.LEFT_TOP:
        this._startAnchor.left = -Holder.ANCHOR_RADIUS
        this._startAnchor.top = -Holder.ANCHOR_RADIUS
        this._endAnchor.left = this._target.width - Holder.ANCHOR_RADIUS
        this._endAnchor.top = this._target.height - Holder.ANCHOR_RADIUS
        break
      case LineType.LEFT_BOTTOM:
        this._startAnchor.left = -Holder.ANCHOR_RADIUS
        this._startAnchor.top = this._target.height - -Holder.ANCHOR_RADIUS
        this._endAnchor.left = this._target.width - Holder.ANCHOR_RADIUS
        this._endAnchor.top = -Holder.ANCHOR_RADIUS
        break
      case LineType.RIGHT_TOP:
        this._startAnchor.left = this._target.width - Holder.ANCHOR_RADIUS
        this._startAnchor.top = -Holder.ANCHOR_RADIUS
        this._endAnchor.left = -Holder.ANCHOR_RADIUS
        this._endAnchor.top = this._target.height - Holder.ANCHOR_RADIUS
        break
      case LineType.RIGHT_BOTTOM:
        this._startAnchor.left = this._target.width - Holder.ANCHOR_RADIUS
        this._startAnchor.top = this._target.height - Holder.ANCHOR_RADIUS
        this._endAnchor.left = -Holder.ANCHOR_RADIUS
        this._endAnchor.top = -Holder.ANCHOR_RADIUS
        break
      }
    }
    if (this._inHolder) {
      this.addAnchors()
    } else {
      this.removeAnchors()
    }
  }

  private addAnchors () {
    if (this._target instanceof LineEntity) {
      this.addNode(this._startAnchor)
      this.addNode(this._endAnchor)
    } else if (this._target instanceof Connector) {
      this.addNode(this._sourceConnectionAnchor)
      this.addNode(this._targetConnectionAnchor)
    } else {
      if (this._inSelection) {
        this.addNode(this._leftCreationAnchor)
        this.addNode(this._topCreationAnchor)
        this.addNode(this._rightCreationAnchor)
        this.addNode(this._bottomCreationAnchor)
        this.addNode(this._rotationAnchor)
        if (this._target.modifiable) {
          this.addNode(this._reshapeAnchor)
        }
      }
      this.addNode(this._leftResizeAnchor)
      this.addNode(this._leftTopResizeAnchor)
      this.addNode(this._topResizeAnchor)
      this.addNode(this._rightTopResizeAnchor)
      this.addNode(this._rightResizeAnchor)
      this.addNode(this._rightBottomResizeAnchor)
      this.addNode(this._bottomResizeAnchor)
      this.addNode(this._leftBottomResizeAnchor)
    }
  }

  private removeAnchors () {
    if (this._target instanceof LineEntity) {
      this.removeNode(this._startAnchor)
      this.removeNode(this._endAnchor)
    } else if (this._target instanceof Connector) {
      this.removeNode(this._sourceConnectionAnchor)
      this.removeNode(this._targetConnectionAnchor)
    } else {
      if (this._inSelection) {
        this.removeNode(this._leftCreationAnchor)
        this.removeNode(this._topCreationAnchor)
        this.removeNode(this._rightCreationAnchor)
        this.removeNode(this._bottomCreationAnchor)
        this.removeNode(this._rotationAnchor)
        if (this._target.modifiable) {
          this.removeNode(this._reshapeAnchor)
        }
      }
      this.removeNode(this._leftResizeAnchor)
      this.removeNode(this._leftTopResizeAnchor)
      this.removeNode(this._topResizeAnchor)
      this.removeNode(this._rightTopResizeAnchor)
      this.removeNode(this._rightResizeAnchor)
      this.removeNode(this._rightBottomResizeAnchor)
      this.removeNode(this._bottomResizeAnchor)
      this.removeNode(this._leftBottomResizeAnchor)
    }
  }
}
