/* eslint-disable complexity */
import { Colors, Engine, Graphics, Layer, MouseCode, Node, Rectangle, Shape, KeyEvent as UniKeyEvent, PointerEvent as UniPointerEvent } from '@ratel-web/engine'

export class Painter {
  private _canvasId: string | HTMLCanvasElement
  private _engine: Engine
  private _root: Layer
  private _graphics: Graphics
  private _pointerMoveTarget: Shape | undefined
  private _pointerDownTarget: Shape | undefined
  private _focusTarget: Shape | undefined
  private _timer: any
  private _started: boolean

  public constructor(canvasId: string | HTMLCanvasElement) {
    this._canvasId = canvasId
    this._engine = Engine.makeEngine(Engine.canvasKit, this._canvasId)
    this._graphics = this._engine.graphics
    this._root = new Layer(0, 0, this._engine.width, this._engine.height)
    this._engine.root = this._root
    this._started = false
    this.initialize()
  }

  public get engine() {
    return this._engine
  }

  public get container() {
    return this._engine.container
  }

  public get width() {
    return this._engine.width
  }

  public get height() {
    return this._engine.height
  }

  public get root(): Layer {
    return this._root
  }

  public get canvasId() {
    return this._canvasId
  }

  public get canvas() {
    return this._engine.container
  }

  public dispose() {
    this._engine.dispose()
  }

  public start() {
    if (!this._started) {
      this._started = true
      this._timer = setInterval(() => {
        this.render()
      }, 15)
    }
  }

  public stop() {
    if (this._started) {
      clearInterval(this._timer)
      this._started = false
    }
  }

  // render
  public render() {
    this._graphics.clear(Colors.White)
    if (this._root) {
      this.renderNode(this._root)
    }
    /*
    const paint = new Paint()
    paint.setPaintStyle(PaintStyle.STROKE)
    paint.setColor(Colors.Red)
    paint.setStrokeWidth(2)
    const path = new Path()
    path.moveTo(100, 100)
    path.lineTo(400, 400)
    path.lineTo(400, 399)
    // path.lineTo(400, 100)
    path.close()
    // path.addRectangle(new Rectangle(100, 100, 400, 400))
    const path2 = new Path()
    path2.addRectangle(new Rectangle(200, 200, 240, 240))
    const a = path2.countPoints()
    console.log(a)

    // path2.addRectangle(new Rectangle(380, 200, 420, 240))
    const path3 = path.op(path2, PathOp.INTERSECT)
    const empty = path3?.isEmpty()
    console.log(empty)
    this._graphics.drawPath(path, paint)
    // this._graphics.drawPath(path2, paint)
*/
    this._engine.surface.flush()
  }

  public resize(width: number, height: number) {
    if (this._engine.container) {
      this._engine.container.width = width
      this._engine.container.height = height
      this.invalidate()
    }
  }

  public invalidate() {
    // if (this._engine) {
    //   this._engine.dispose()
    // }
    this._engine = Engine.makeEngine(Engine.canvasKit, this._canvasId)
    this._graphics = this._engine.graphics
    this._root.boundary = new Rectangle(0, 0, this._engine.width, this._engine.height)
    //this._root = new Layer(0, 0, this._engine.width, this._engine.height)
    //this._engine.root = this._root
    //this.initialize()
  }

  private initialize() {
    const container = this._engine.container
    if (container) {
      container.addEventListener('pointerenter', this.handlePointerEvent.bind(this))
      container.addEventListener('pointerleave', this.handlePointerEvent.bind(this))
      container.addEventListener('pointermove', this.handlePointerEvent.bind(this))
      container.addEventListener('pointerdown', this.handlePointerEvent.bind(this))
      container.addEventListener('pointerup', this.handlePointerEvent.bind(this))
      container.addEventListener('keydown', this.handleKeyDownEvent.bind(this))
      container.addEventListener('keyup', this.handleKeyUpEvent.bind(this))
      container.addEventListener('keypress', this.handleKeyPressEvent.bind(this))
      container.addEventListener('resize', this.handleResize.bind(this))
      container.addEventListener('scroll', this.handleScrollEvent.bind(this))
      container.addEventListener('wheel', this.handleWheelEvent.bind(this))
      container.addEventListener('blur', this.handleFocusEvent.bind(this))
      container.addEventListener('focus', this.handleFocusEvent.bind(this))
      container.addEventListener('drag', this.handleDragEvent.bind(this))
      container.addEventListener('dragend', this.handleDragEvent.bind(this))
      container.addEventListener('dragenter', this.handleDragEvent.bind(this))
      container.addEventListener('dragleave', this.handleDragEvent.bind(this))
      container.addEventListener('dragover', this.handleDragEvent.bind(this))
      container.addEventListener('dragstart', this.handleDragEvent.bind(this))
      container.addEventListener('drop', this.handleDragEvent.bind(this))
    }
  }

  private renderNode(node: Node) {
    try {
      this._graphics.save()
      if (node.dirty) {
        this.buildNode(node)
      }
      if (node.visible) {
        this._graphics.concat(node.internalTransform)
        if (node.clipped) {
          this._graphics.clipPath(node.clip)
          if (node instanceof Shape && node.width >= 119 && node.width <= 131) {
            // console.log(`clip test = ${node.clip.contains(50, 50)}  = ${node.clip.contains(500, 500)}`)
            // this._graphics.drawRectangle( Rectangle.makeLTWH(0, 0, 300, 300), node.stroke)
            // this._graphics.clipPath(node.clip)
            //  this._graphics.clipRectangle(Rectangle.makeLTWH(0, 0, 6, 6))
          }
          //this._graphics.clipRectangle(Rectangle.makeLTWH(0, 0, 60, 60))
        }
        node.render(this._graphics)
        const count = node.children.length
        for (let i = 0; i < count; i++) {
          const child = node.children[i]
          this.renderNode(child)
        }
        if (node.clipped) {
          // this._graphics.clear()
        }
      }
    } finally {
      this._graphics.restore()
    }
  }

  private buildNode(node: Node) {
    node.update()
    const count = node.children.length
    for (let i = 0; i < count; i++) {
      const child = node.children[i]
      this.buildNode(child)
    }
    node.resetDirty()
  }

  private findTarget(shape: Shape, x: number, y: number): Shape | undefined {
    if (shape.visible) {
      if (shape.contains(x, y)) {
        const count = shape.children.length
        for (let i = count - 1; i >= 0; i--) {
          const child = shape.children[i] as Shape
          const target = this.findTarget(child, x, y)
          if (target) {
            return target
          }
        }
        if (shape.hittable) {
          return shape
        } else {
          return undefined
        }
      } else {
        if (shape.clipped) {
          return undefined
        } else {
          const count = shape.children.length
          for (let i = count - 1; i >= 0; i--) {
            const child = shape.children[i] as Shape
            const target = this.findTarget(child, x, y)
            if (target) {
              return target
            }
          }
          return undefined
        }
      }
    } else {
      return undefined
    }
  }

  private handlePointerEvent(e: PointerEvent) {
    // const target = this.findTarget(this._root, e.offsetX, e.offsetY)
    // console.log('Target is ' + target + ', type=' + e.type)
    if (e.type === 'pointerdown') {
      this.handlePointerDownType(e)
    } else if (e.type === 'pointerup') {
      this.handlePointerUpType(e)
    } else if (e.type === 'pointermove') {
      this.handlePointerMoveType(e)
    }
    // Use this to make TextArea in Editor works !!!!!!!
    e.preventDefault()
  }

  private handlePointerDownType(e: PointerEvent) {
    const target = this.findTarget(this._root, e.offsetX, e.offsetY)
    let mouseCode = MouseCode.LEFT_MOUSE_DOWN
    if (e.button === 2) {
      mouseCode = MouseCode.RIGHT_MOUSE_DOWN
    }
    if (target?.worldInverseTransform) {
      const point = target.worldInverseTransform.makePoints([e.offsetX, e.offsetY])
      target.pointerDownListeners.forEach((callback) => {
        const event = new UniPointerEvent(
          target,
          point[0],
          point[1],
          mouseCode,
          e.shiftKey,
          e.ctrlKey,
          e.altKey,
          e.height,
          e.isPrimary,
          e.pointerId,
          e.pointerType,
          e.pressure,
          e.tangentialPressure,
          e.tiltX,
          e.tiltY,
          e.twist,
          e.width,
        )
        callback(event)
      })
    }
    if (target) {
      this._pointerDownTarget = target
      this._focusTarget = target
      const container = this._engine.container
      if (container) {
        // container.focus()
      }
    } else {
      this._focusTarget = undefined
    }
    // this.test()
    // this.endEditting()
    //Force to blur, it is for rename sheet title since it looks keep focus even after mouse down in canvas.
    const activeElement = document.activeElement
    if (activeElement instanceof HTMLElement) {
      activeElement.blur()
    }
  }

  private handlePointerUpType(e: PointerEvent) {
    let mouseCode = MouseCode.LEFT_MOUSE_UP
    if (e.button === 2) {
      mouseCode = MouseCode.RIGHT_MOUSE_UP
    }
    if (this._pointerDownTarget) {
      if (this._pointerDownTarget?.worldInverseTransform) {
        const point = this._pointerDownTarget.worldInverseTransform.makePoints([e.offsetX, e.offsetY])
        this._pointerDownTarget.pointerUpListeners.forEach((callback) => {
          const event = new UniPointerEvent(
            this._pointerDownTarget!,
            point[0],
            point[1],
            mouseCode,
            e.shiftKey,
            e.ctrlKey,
            e.altKey,
            e.height,
            e.isPrimary,
            e.pointerId,
            e.pointerType,
            e.pressure,
            e.tangentialPressure,
            e.tiltX,
            e.tiltY,
            e.twist,
            e.width,
          )
          callback(event)
        })
        this._pointerDownTarget.pointerClickListeners.forEach((callback) => {
          const event = new UniPointerEvent(
            this._pointerDownTarget!,
            point[0],
            point[1],
            mouseCode,
            e.shiftKey,
            e.ctrlKey,
            e.altKey,
            e.height,
            e.isPrimary,
            e.pointerId,
            e.pointerType,
            e.pressure,
            e.tangentialPressure,
            e.tiltX,
            e.tiltY,
            e.twist,
            e.width,
          )
          callback(event)
        })
      }
    }
    this._pointerDownTarget = undefined
    this._pointerMoveTarget = undefined
  }

  private handlePointerMoveType(e: PointerEvent) {
    const target = this.findTarget(this._root, e.offsetX, e.offsetY)
    // console.log('x1=' + e.offsetX + ', y=' + e.offsetY + ', left=' + this._edittingShape?.boundary.left + ', top=' + this._edittingShape?.boundary.top)
    // console.log(this._pointerDownTarget)
    if (this._pointerDownTarget !== null && this._pointerDownTarget !== undefined) {
      if (this._pointerDownTarget?.worldInverseTransform) {
        const point = this._pointerDownTarget.worldInverseTransform.makePoints([e.offsetX, e.offsetY])
        this._pointerDownTarget.pointerMoveListeners.forEach((callback) => {
          const event = new UniPointerEvent(
            this._pointerDownTarget!,
            point[0],
            point[1],
            MouseCode.LEFT_MOUSE_DOWN,
            e.shiftKey,
            e.ctrlKey,
            e.altKey,
            e.height,
            e.isPrimary,
            e.pointerId,
            e.pointerType,
            e.pressure,
            e.tangentialPressure,
            e.tiltX,
            e.tiltY,
            e.twist,
            e.width,
          )
          callback(event)
        })
      }
    } else if (this._pointerMoveTarget !== null && this._pointerMoveTarget !== undefined) {
      // console.log('x2=' + e.offsetX + ', y=' + e.offsetY + ', left=' + this._edittingShape?.boundary.left + ', top=' + this._edittingShape?.boundary.top)
      if (target) {
        if (target !== this._pointerMoveTarget) {
          // console.log('x3=' + e.offsetX + ', y=' + e.offsetY + ', left=' + this._edittingShape?.boundary.left + ', top=' + this._edittingShape?.boundary.top)
          if (this._pointerMoveTarget.worldInverseTransform) {
            const point = this._pointerMoveTarget.worldInverseTransform.makePoints([e.offsetX, e.offsetY])
            this._pointerMoveTarget.pointerLeaveListeners.forEach((callback) => {
              const event = new UniPointerEvent(
                this._pointerMoveTarget!,
                point[0],
                point[1],
                MouseCode.LEFT_MOUSE_DOWN,
                e.shiftKey,
                e.ctrlKey,
                e.altKey,
                e.height,
                e.isPrimary,
                e.pointerId,
                e.pointerType,
                e.pressure,
                e.tangentialPressure,
                e.tiltX,
                e.tiltY,
                e.twist,
                e.width,
              )
              callback(event)
            })
          }
          if (target.worldInverseTransform) {
            const point = target.worldInverseTransform.makePoints([e.offsetX, e.offsetY])
            target.pointerEnterListeners.forEach((callback) => {
              const event = new UniPointerEvent(
                target,
                point[0],
                point[1],
                MouseCode.LEFT_MOUSE_DOWN,
                e.shiftKey,
                e.ctrlKey,
                e.altKey,
                e.height,
                e.isPrimary,
                e.pointerId,
                e.pointerType,
                e.pressure,
                e.tangentialPressure,
                e.tiltX,
                e.tiltY,
                e.twist,
                e.width,
              )
              callback(event)
            })
          }
          this._pointerMoveTarget = target
        } else {
          if (target.worldInverseTransform) {
            const point = target.worldInverseTransform.makePoints([e.offsetX, e.offsetY])
            target.pointerMoveListeners.forEach((callback) => {
              const event = new UniPointerEvent(
                target,
                point[0],
                point[1],
                MouseCode.LEFT_MOUSE_DOWN,
                e.shiftKey,
                e.ctrlKey,
                e.altKey,
                e.height,
                e.isPrimary,
                e.pointerId,
                e.pointerType,
                e.pressure,
                e.tangentialPressure,
                e.tiltX,
                e.tiltY,
                e.twist,
                e.width,
              )
              callback(event)
            })
          }
        }
      } else {
        // console.log('x4=' + e.offsetX + ', y=' + e.offsetY + ', left=' + this._edittingShape?.boundary.left + ', top=' + this._edittingShape?.boundary.top)
        if (this._pointerMoveTarget.worldInverseTransform) {
          const point = this._pointerMoveTarget.worldInverseTransform.makePoints([e.offsetX, e.offsetY])
          this._pointerMoveTarget.pointerLeaveListeners.forEach((callback) => {
            const event = new UniPointerEvent(
              this._pointerMoveTarget!,
              point[0],
              point[1],
              MouseCode.LEFT_MOUSE_DOWN,
              e.shiftKey,
              e.ctrlKey,
              e.altKey,
              e.height,
              e.isPrimary,
              e.pointerId,
              e.pointerType,
              e.pressure,
              e.tangentialPressure,
              e.tiltX,
              e.tiltY,
              e.twist,
              e.width,
            )
            callback(event)
          })
        }
        this._pointerMoveTarget = undefined
      }
    } else {
      if (target) {
        if (target.worldInverseTransform) {
          const point = target.worldInverseTransform.makePoints([e.offsetX, e.offsetY])
          target.pointerEnterListeners.forEach((callback) => {
            const event = new UniPointerEvent(
              target,
              point[0],
              point[1],
              MouseCode.LEFT_MOUSE_DOWN,
              e.shiftKey,
              e.ctrlKey,
              e.altKey,
              e.height,
              e.isPrimary,
              e.pointerId,
              e.pointerType,
              e.pressure,
              e.tangentialPressure,
              e.tiltX,
              e.tiltY,
              e.twist,
              e.width,
            )
            callback(event)
          })
        }
        this._pointerMoveTarget = target
        if (target?.worldInverseTransform) {
          const point = target.worldInverseTransform.makePoints([e.offsetX, e.offsetY])
          target.pointerMoveListeners.forEach((callback) => {
            const event = new UniPointerEvent(
              target,
              point[0],
              point[1],
              MouseCode.LEFT_MOUSE_DOWN,
              e.shiftKey,
              e.ctrlKey,
              e.altKey,
              e.height,
              e.isPrimary,
              e.pointerId,
              e.pointerType,
              e.pressure,
              e.tangentialPressure,
              e.tiltX,
              e.tiltY,
              e.twist,
              e.width,
            )
            callback(event)
          })
        }
      }
    }
  }

  private handleKeyDownEvent(e: KeyboardEvent) {
    console.log(333)
    if (this._focusTarget !== null && this._focusTarget !== undefined) {
      const target = this._focusTarget
      target.keyDownListeners.forEach((callback) => {
        const event = new UniKeyEvent(target, e.key, e.code, e.shiftKey, e.ctrlKey, e.altKey, e.metaKey, e.repeat, e.isComposing)
        callback(event)
      })
    }
  }

  private handleKeyUpEvent(e: KeyboardEvent) {
    if (this._focusTarget !== null && this._focusTarget !== undefined) {
      const target = this._focusTarget
      target.keyUpListeners.forEach((callback) => {
        const event = new UniKeyEvent(target, e.key, e.code, e.shiftKey, e.ctrlKey, e.altKey, e.metaKey, e.repeat, e.isComposing)
        callback(event)
      })
    }
  }

  private handleKeyPressEvent(e: KeyboardEvent) {
    if (this._focusTarget !== null && this._focusTarget !== undefined) {
      const target = this._focusTarget
      target.keyPressListeners.forEach((callback) => {
        const event = new UniKeyEvent(target, e.key, e.code, e.shiftKey, e.ctrlKey, e.altKey, e.metaKey, e.repeat, e.isComposing)
        callback(event)
      })
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private handleResize(e: UIEvent) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private handleScrollEvent(e: Event) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private handleWheelEvent(e: WheelEvent) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private handleFocusEvent(e: FocusEvent) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private handleDragEvent(e: DragEvent) {}
}
