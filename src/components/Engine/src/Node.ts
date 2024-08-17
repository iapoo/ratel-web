import { Graphics, Matrix, Path, Point2, Rotation, Scale, Skew, MouseEvent, MouseMoveEvent, KeyEvent, KeyPressEvent, CharEvent, TouchFingerEvent, PointerEvent, } from './Graphics'

export abstract class Node {
  private _parent?: Node;

  private _nodes: Array<Node>;

  private _alpha: number;

  private _worldAlpha: number;

  private _position: Point2;

  private _rotation: Rotation;

  private _scale: Scale;

  private _skew: Skew;

  private _transform: Matrix;

  private _internalTransform: Matrix;

  private _worldTransform: Matrix;

  private _worldInverseTransform: Matrix | null

  private _visible: boolean;

  private _worldVisible: boolean;

  private _dirty: boolean;

  private _suspendUpdate: boolean;

  private _pointerEnterListeners = new Array<(e: PointerEvent) => void>(0)

  private _pointerLeaveListeners = new Array<(e: PointerEvent) => void>(0)

  private _pointerMoveListeners = new Array<(e: PointerEvent) => void>(0)

  private _pointerDownListeners = new Array<(e: PointerEvent) => void>(0)

  private _pointerUpListeners = new Array<(e: PointerEvent) => void>(0)

  private _pointerClickListeners = new Array<(e: PointerEvent) => void>(0)

  private _keyDownListeners = new Array<(e: KeyEvent) => void>(0)

  private _keyUpListeners = new Array<(e: KeyEvent) => void>(0)

  private _keyPressListeners = new Array<(e: KeyEvent) => void>(0)

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  constructor() {
    this._nodes = new Array<Node>(0)
    this._alpha = 1
    this._worldAlpha = 1
    this._position = new Point2(0, 0)
    this._rotation = new Rotation(0, 0, 0)
    this._scale = new Scale(1, 1, 0, 0)
    this._skew = new Skew(0, 0, 0, 0)
    this._visible = true
    this._worldVisible = true
    this._parent = undefined
    this._internalTransform = new Matrix()
    this._worldTransform = new Matrix()
    this._transform = new Matrix()
    this._worldInverseTransform = this._worldTransform.invert()
    this._dirty = true
    this._suspendUpdate = false
  }

  public abstract get clipped(): boolean

  public abstract get clip(): Path

  public get alpha(): number {
    return this._alpha
  }

  public set alpha(alpha: number) {
    if (this._alpha != alpha) {
      this._alpha = alpha
      this.updateAlpha()
      this.markDirty()
    }
  }

  public get pointerEnterListeners() {
    return this._pointerEnterListeners
  }

  public get pointerLeaveListeners() {
    return this._pointerLeaveListeners
  }

  public get pointerMoveListeners() {
    return this._pointerMoveListeners
  }

  public get pointerDownListeners() {
    return this._pointerDownListeners
  }

  public get pointerUpListeners() {
    return this._pointerUpListeners
  }

  public get pointerClickListeners() {
    return this._pointerClickListeners
  }

  public get keyDownListeners() {
    return this._keyDownListeners
  }

  public get keyUpListeners() {
    return this._keyUpListeners
  }

  public get keyPressListeners() {
    return this._keyPressListeners
  }

  public markDirty(): void {
    this._dirty = true
    this._nodes.forEach(node => {
      node.markDirty()
    })
  }

  public resetDirty() {
    this._dirty = false
  }

  public get dirty(): boolean {
    return this._dirty
  }

  public get position(): Point2 {
    return this._position
  }

  public set position(point: Point2) {
    if (this._position.x != point.x || this._position.y != point.y) {
      this._position = point
      this.updateTransform()
      this.markDirty()
    }
  }

  public get rotation(): Rotation {
    return this._rotation
  }

  public set rotation(rotation: Rotation) {
    if (!this._rotation.equals(rotation)) {
      this._rotation = rotation
      this.updateTransform()
      this.markDirty()
    }
  }

  public get scale(): Scale {
    return this._scale
  }

  public set scale(scale: Scale) {
    if (!this._scale.equals(scale)) {
      this._scale = scale
      this.updateTransform()
      this.markDirty()
    }
  }

  public get skew(): Skew {
    return this._skew
  }

  public set skew(skew: Skew) {
    if (!this._skew.equals(skew)) {
      this._skew = skew
      this.updateTransform()
      this.markDirty()
    }
  }

  public get transform(): Matrix {
    return this._transform
  }

  public set transform(transform: Matrix) {
    if (!this._transform.equals(transform)) {
      this._transform = transform
      this.updateTransform()
      this.markDirty()
    }
  }

  public get internalTransform(): Matrix {
    return this._internalTransform
  }

  public get worldTransform(): Matrix {
    return this._worldTransform
  }

  public get worldInverseTransform(): Matrix | null {
    return this._worldInverseTransform
  }

  public get visible(): boolean {
    return this._visible
  }

  public set visible(visible: boolean) {
    if (this._visible != visible) {
      this._visible = visible
      this.updateVisible()
      this.markDirty()
    }
  }

  public get worldVisible(): boolean {
    return this._worldVisible
  }

  public set parent(parent: Node | undefined) {
    if (this._parent) {
      this._parent.removeNode(this)
    }
    if (parent) {
      parent.addNode(this)
    }
  }

  public get parent(): Node | undefined {
    return this._parent
  }

  public addNode(node: Node): void {
    if (this._nodes.indexOf(node) < 0) {
      if (node.parent) {
        node.parent.removeNode(node)
      }
      this._nodes.push(node)
      node._parent = this
      node.updateAlpha()
      node.updateTransform()
      node.updateVisible()
      this.markDirty()
    }
  }

  public addNodeAt(node: Node, index: number): void {
    if (this._nodes.indexOf(node) < 0) {
      if (node.parent) {
        node.parent.removeNode(node)
      }
      //this._nodes.push(node)
      this._nodes.splice(index, 0, node)
      node._parent = this
      node.updateAlpha()
      node.updateTransform()
      node.updateVisible()
      this.markDirty()
    }
  }

  public hasNode(node: Node): boolean {
    const index = this._nodes.indexOf(node)
    return index >= 0
  }

  public removeNode(node: Node): void {
    const index = this._nodes.indexOf(node)
    if (index >= 0) {
      this._nodes.splice(index, 1)
      node._parent = undefined
      this.markDirty()
    }
  }

  public removeNodeAt(index: number): void {
    if (index >= 0 && index < this._nodes.length) {
      const node = this._nodes[index]
      node._parent = undefined
      this._nodes.splice(index, 1)
      this.markDirty()
    }
  }

  public get count() {
    return this._nodes.length
  }

  public get children(): Array<Node> {
    return this._nodes
  }

  public clear(): void {
    const count = this._nodes.length
    for (let i = 0; i < count; i++) {
      const child = this._nodes[i]
      child._parent = undefined
    }
    this._nodes.length = 0
    this.markDirty()
  }

  public suspendUpdate() {
    this._suspendUpdate = true
  }

  public resumeUpdate() {
    this._suspendUpdate = false
  }

  public update() {
    if (this._dirty) {
      this.updateAlpha()
      this.updateVisible()
      this.updateTransform()
    }
  }

  public render(graphics: Graphics) {

  }

  public onPointerEnter(callback: (e: PointerEvent) => void) {
    this._pointerEnterListeners.push(callback)
  }

  public onPointerLeave(callback: (e: PointerEvent) => void) {
    this._pointerLeaveListeners.push(callback)
  }

  public onPointerMove(callback: (e: PointerEvent) => void) {
    this._pointerMoveListeners.push(callback)
  }

  public onPointerDown(callback: (e: PointerEvent) => void) {
    this._pointerDownListeners.push(callback)
  }

  public onPointerUp(callback: (e: PointerEvent) => void) {
    this._pointerUpListeners.push(callback)
  }

  public onPointerClick(callback: (e: PointerEvent) => void) {
    this._pointerClickListeners.push(callback)
  }

  public onKeyDown(callback: (e: KeyEvent) => void) {
    this._keyDownListeners.push(callback)
  }

  public onKeyUp(callback: (e: KeyEvent) => void) {
    this._keyDownListeners.push(callback)
  }

  public onKeyPress(callback: (e: KeyEvent) => void) {
    this._keyDownListeners.push(callback)
  }

  public dispose() {
    const count = this._nodes.length
    for (let i = 0; i < count; i++) {
      const child = this._nodes[i]
      child.dispose()
    }
  }

  private updateAlpha(): void {
    if (this._suspendUpdate) {
      return
    }
    if (this._parent) {
      this._worldAlpha = this._alpha * this._parent._worldAlpha
    } else {
      this._worldAlpha = this._alpha
    }
  }

  private updateTransform(): void {
    if (this._suspendUpdate) {
      return
    }
    this._internalTransform.identity()
    this._internalTransform.translate(this._position.x, this._position.y)
    this._internalTransform.scale(this._scale.sx, this._scale.sy, this._scale.px, this._scale.py)
    this._internalTransform.rotate(this._rotation.radius, this._rotation.px, this._rotation.py)
    this._internalTransform.skew(this._skew.kx, this._skew.ky, this._skew.py, this._skew.py)
    this._internalTransform.multiply(this._transform.source)

    this._worldTransform.identity()
    if (this._parent) {
      this._worldTransform.multiply(this._parent._worldTransform.source)
    }
    this._worldTransform.multiply(this._internalTransform.source)
    this._worldInverseTransform = this._worldTransform.invert()
  }

  private updateVisible(): void {
    if (this._suspendUpdate) {
      return
    }
    if (this._parent) {
      this._worldVisible = this._visible && this._worldVisible
    } else {
      this._worldVisible = this._visible
    }
  }
}
