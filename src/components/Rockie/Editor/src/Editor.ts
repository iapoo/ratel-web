/* eslint-disable max-depth */
/* eslint-disable max-params */
/* eslint-disable complexity */
import { Painter, } from '@/components/Painter'
import { Engine, Point2, Rectangle2D, Rotation, Shape, Line2D, Node, Container, Rectangle, Graphics, Colors, MouseEvent, MouseCode, PointerEvent as UniPointerEvent, Control, PointerEvent, Path, Scale, KeyEvent, } from '../../../Engine'
import { Action, } from '../../Actions'
import { Holder, } from '../../Design'
import { Connector, Entity, Item, ShapeEntity, TableEntity, } from '../../Items'
import { EditorItem, } from './EditorItem'
import { ContentLayer, } from './ContentLayer'
import { ControllerLayer, } from './ControllerLayer'
import { EditorLayer, } from './EditorLayer'
import { HoverLayer, } from './HoverLayer'
import { MaskLayer, } from './MaskLayer'
import { SelectionLayer, } from './SelectionLayer'
import { time, timeStamp, } from 'console'
import { BackgroundLayer, } from './BackgroundLayer'

export class Editor extends Painter {
  /**
   * Shadow size
   */
  public static readonly SHADOW_SIZE = 100

  /**
   * Test region size
   */
  private static readonly TEST_RADIUS = 8;
  private static readonly TEST_SIZE = 16;
  /**
   * Check time offset for double click
   */
  private static readonly DOUBLE_CLICK_TIME = 500

  private _backgroundLayer: BackgroundLayer
  private _contentLayer: EditorLayer;
  private _controllerLayer: EditorLayer;
  private _hoverLayer: EditorLayer;
  private _selectionLayer: EditorLayer;
  private _maskLayer: EditorLayer;
  private _zoom = 1.00;
  private _inMoving = false;
  private _gridSize = 16;
  private _action: Action | undefined;
  private _startPointX = 0;
  private _startPointY = 0;
  private _target: EditorItem | undefined;
  private _targetTime = 0;
  private _inCreatingConnector = false;
  private _textArea: HTMLTextAreaElement
  private _textInputStatus = 'CHAR_TYPING'
  private _textCommandKey = false
  private _textFocused = false
  private _targetRowResizing = false
  private _targetColumnResizing = false
  private _targetRowIndex = 0
  private _targetColumnIndex = 0
  private _targetItemIndex = 0
  private _targetItem: EditorItem | undefined
  private _title: string
  private _key: string
  private _modified: boolean

  public constructor (canvasId: string | HTMLCanvasElement) {
    super(canvasId)
    this._backgroundLayer = new BackgroundLayer(this, 0, 0, this.width, this.height, this.gridSize)
    this._contentLayer = new ContentLayer(0, 0, this.width, this.height)
    this._controllerLayer = new ControllerLayer(0, 0, this.width, this.height)
    this._hoverLayer = new HoverLayer(0, 0, this.width, this.height)
    this._selectionLayer = new SelectionLayer(0, 0, this.width, this.height)
    this._maskLayer = new MaskLayer(0, 0, this.width, this.height)
    this._contentLayer.editor = this
    this._controllerLayer.editor = this
    this._hoverLayer.editor = this
    this._selectionLayer.editor = this
    this._maskLayer.editor = this
    this._title = ''
    this._key = ''
    this._modified = false
    this.root.addNode(this._backgroundLayer)
    this.root.addNode(this._contentLayer)
    this.root.addNode(this._controllerLayer)
    this.root.addNode(this._maskLayer)
    this.root.addNode(this._hoverLayer)
    this.root.addNode(this._selectionLayer)

    this._textArea = document.createElement('textarea')
    this.initializeTextArea()

    this.maskLayer.onPointerDown((e) => {
      this.handlePointerDown(e)
    })

    this.maskLayer.onPointerUp((e) => {
      this.handlePointerUp(e)
    })

    this.maskLayer.onPointerMove((e) => {
      this.handlePointerMove(e)
    })
    this.maskLayer.onPointerClick((e) => {
      this.handlePointerClick(e)
    })

    this.maskLayer.onKeyDown((e) => {
      this.handleKeyDown(e)
    })

    this.maskLayer.onKeyUp((e) => {
      this.handleKeyUp(e)
    })

    this.maskLayer.onKeyPress((e) => {
      this.handleKeyPress(e)
    })
  }

  public get gridSize (): number {
    return this._gridSize
  }

  public set gridSize (value: number) {
    this._gridSize = value
    this._backgroundLayer.gridSize = value
  }

  public get inMoving (): boolean {
    return this._inMoving
  }

  public set inMoving (value: boolean) {
    this._inMoving = value
  }

  public get contentLayer (): EditorLayer {
    return this._contentLayer
  }

  public get controllerLayer (): EditorLayer {
    return this._controllerLayer
  }

  public get maskLayer (): EditorLayer {
    return this._maskLayer
  }

  public get selectionLayer (): EditorLayer {
    return this._selectionLayer
  }

  public get hoverLayer (): EditorLayer {
    return this._hoverLayer
  }

  public get zoom (): number {
    return this._zoom
  }

  public set zoom (value: number) {
    this._zoom = value
    this.resize(this.width, this.height)
  }

  public get action (): Action | undefined {
    return this._action
  }

  public set action (value: Action | undefined) {
    this._action = value
  }

  public get title () {
    return this._title
  }

  public set title (value: string) {
    this._title = value
  }

  public get key () {
    return this._key
  }

  public set key (value: string) {
    this._key = value
  }

  public isModified(): boolean {
    return this._modified
  }

  public resetModified() {
    this._modified = false
  }

  public resize (width: number, height: number) {
    super.resize(width * this._zoom, height * this._zoom)
  }

  public invalidate () {
    super.invalidate()
    const newBoundary = new Rectangle(0, 0, this.width, this.height)
    this._backgroundLayer.boundary = newBoundary
    this._contentLayer.boundary = newBoundary
    this._controllerLayer.boundary = newBoundary
    this._hoverLayer.boundary = newBoundary
    this._selectionLayer.boundary = newBoundary
    this._maskLayer.boundary = newBoundary
    this._backgroundLayer.invalidateLayer()
  }

  /**
   * while Editor become focused or activated
   */
  public activate () {
    if (this.engine.container?.parentElement) {
      this.engine.container.parentElement.append(this._textArea)
    }
  }

  // render
  public render () {
    this._contentLayer.scale = new Scale(this._zoom, this._zoom)
    this._contentLayer.scale = new Scale(this._zoom, this._zoom)
    this._selectionLayer.scale = new Scale(this._zoom, this._zoom)
    this._controllerLayer.scale = new Scale(this._zoom, this._zoom)
    this._hoverLayer.scale = new Scale(this._zoom, this._zoom)
    super.render()
  }

  public handlePointerMove (e: PointerEvent) {
    // console.log(`Moving... x = ${e.x} action=${this._action}`)
    if (this._action) {
      //  in creating action
      this.handlePointMoveinAction(e, this._action)
    } else if (this._targetRowResizing) {
      this.handleTargetRowResizing(e)
    } else if (this._targetColumnResizing) {
      this.handleTargetColumnResizing(e)
    } else if (this.inMoving) {
      // EditorItem is in moving
      this.handlePointMoveInMoving(e)
    } else if (this._inCreatingConnector) {
      // in creating connector
      this.handlePointMoveInCreatingConnector(e)
    } else {
      const theHoverLayer: HoverLayer = this.hoverLayer as HoverLayer
      const theSelectionLayer: SelectionLayer = this.selectionLayer as SelectionLayer
      const editorItem = this.findEditorItem(e.x, e.y)
      // console.log(`Finding ...... ${editorItem}`)
      const isEdge = editorItem ? this.hasEditorItemJoint(editorItem, e.x, e.y) : false
      // console.log(` Find editor item edge = ${isEdge}`)
      if (editorItem && isEdge) {
        const inEditorItem = this.isInEditorItem(editorItem, e.x, e.y)
        const targetPoint = this.findEditorItemJoint(editorItem, e.x, e.y, inEditorItem)
        if (targetPoint) {
          //  console.log(`Find editor item joint: x = ${targetPoint.x} y = ${targetPoint.y} `)
        } else {
          console.log(`It shouldn't be here`)
        }
      } else if (editorItem !== null && editorItem !== undefined) {
        // DO hover but not include those selected
        if (!theSelectionLayer.hasEditorItem(editorItem)) {
          // don't remove if already exists
          if (!theHoverLayer.hasEditorItem(editorItem)) {
            // console.log('1==========')
            theHoverLayer.removeAllEditorItems()
            theHoverLayer.addEditorItem(editorItem)
          } else if (!theHoverLayer.inHolder) {
            // console.log('2==========')
            theHoverLayer.inHolder = true
            theHoverLayer.invalidateLayer()
          }
        } else {
          if (editorItem instanceof TableEntity) {
            const targetPoint = this.findEditorItemPoint(editorItem, e.x, e.y)
            const [ targetRow, targetRowIndex, ] = this.isTableRowtResizable(editorItem, targetPoint.x, targetPoint.y)
            const [ targetColumn, targetColumnIndex, ] = this.isTableColumnResizable(editorItem, targetPoint.x, targetPoint.y)
            if (targetRow) {
              // console.log('========2')
              // this._targetRow = true
              // this._targetRowIndex = targetRowIndex
            } else if (targetColumn) {
              // console.log('========3')
              // this._targetColumn = targetColumn
              // this._targetColumnIndex = targetColumnIndex
            }
          }
        }
      } else {
        // console.log('test code here')
        if (theHoverLayer.getEditorItemCount() > 0) {
          const hoverEditorItem = theHoverLayer.getEditorItem(0)
          if (hoverEditorItem instanceof Connector) {
            // console.log('Connector is found')
            const editorItem = this.findEditorItem(e.x, e.y)
            if (editorItem !== null && editorItem !== undefined) {
              theHoverLayer.inHolder = false
              theHoverLayer.invalidateLayer()
            } else {
              theHoverLayer.inHolder = true
              theHoverLayer.removeAllEditorItems()
            }
          } else {
            // console.log('Connector is not found')
            if (hoverEditorItem.left - Holder.PADDING < e.x / this._zoom && hoverEditorItem.right + Holder.PADDING > e.x / this._zoom &&
              hoverEditorItem.top - Holder.PADDING < e.y / this._zoom && hoverEditorItem.bottom + Holder.PADDING > e.y / this._zoom) {
              // console.log('inHolder = false')
              theHoverLayer.inHolder = false
              theHoverLayer.invalidateLayer()
            } else {
              // console.log('inHolder = true')
              theHoverLayer.inHolder = true
              theHoverLayer.removeAllEditorItems()
            }
          }
        }
      }
    }
  }

  public handlePointerLeave (e: PointerEvent) { }

  public handlePointerEnter (e: PointerEvent) { }

  public handlePointerClick (e: PointerEvent) { }

  public handlePointerDown (e: PointerEvent) {
    // console.log(`handle Mouse Down ... x = ${e.x}`)
    this._startPointX = e.x
    this._startPointY = e.y
    this._modified = true
    if (this._action) {
      // console.log(`handlePointerClick... x = ${e.x}  start=${this.action_.item.start.x} end=${this.action_.item.end.x} width=${this.action_.item.width}  height=${this.action_.item.height}`)
      this.contentLayer.addEditorItem(this._action.item)
      this.controllerLayer.removeAllEditorItems()
      this.controllerLayer.clear()
      if (this._target) {
        this._target.shape.focused = false
      }
      this._textFocused = false
      if (this._target) {
        this._target.shape.focused = false
      }
      if (this._targetItem) {
        this._targetItem.shape.focused = false
      }
      this._target = undefined
      this._targetTime = 0
      this._targetColumnResizing = false
      this._targetRowResizing = false
      this._targetItem = undefined
      this._targetItemIndex = 0
    } else {
      const clickedEditorItem = this.findEditorItem(e.x, e.y)
      const theSelectionLayer = this.selectionLayer as SelectionLayer
      const isEdge = clickedEditorItem ? this.hasEditorItemJoint(clickedEditorItem, e.x, e.y) : false
      const inClickEditorItem = clickedEditorItem ? this.isInEditorItem(clickedEditorItem, e.x, e.y) : false
      if (clickedEditorItem && isEdge && !inClickEditorItem) {
        const targetPoint = this.findEditorItemJoint(clickedEditorItem, e.x, e.y, false)
        const targetEntity = clickedEditorItem as Entity
        const theControllerLayer = this.controllerLayer as ControllerLayer
        this._inCreatingConnector = true
        const worldTargetPoint = clickedEditorItem.shape.worldTransform.makePoint(targetPoint)
        const connector = new Connector(worldTargetPoint, new Point2(worldTargetPoint.x + 10, worldTargetPoint.y + 10))
        // const sourceJoint = new Point2(targetPoint.x - targetEntity.left, targetPoint.y - targetEntity.top)
        connector.source = targetEntity
        connector.sourceJoint = targetPoint
        theControllerLayer.removeAllEditorItems()
        theControllerLayer.addEditorItem(connector)
        targetEntity.addConnector(connector)
        if (this._target) {
          this._target.shape.focused = false
        }
        this._textFocused = false
        if (this._target) {
          this._target.shape.focused = false
        }
        if (this._targetItem) {
          this._targetItem.shape.focused = false
        }
        this._target = undefined
        this._targetTime = 0
        this._targetColumnResizing = false
        this._targetRowResizing = false
        this._targetItem = undefined
        this._targetItemIndex = 0
      } else if (clickedEditorItem) {
        // const data = {}
        // const item: Item = clickedEditorItem as Item
        // item.saveData(data)
        // console.log(data)
        if (!theSelectionLayer.hasEditorItem(clickedEditorItem)) {
          theSelectionLayer.inHolder = true
          theSelectionLayer.removeAllEditorItems()
          theSelectionLayer.addEditorItem(clickedEditorItem)
          this._targetColumnResizing = false
          this._targetRowResizing = false
        } else {
          if (clickedEditorItem instanceof TableEntity) {
            const targetPoint = this.findEditorItemPoint(clickedEditorItem, e.x, e.y)
            const [ targetRow, targetRowIndex, ] = this.isTableRowtResizable(clickedEditorItem, targetPoint.x, targetPoint.y)
            const [ targetColumn, targetColumnIndex, ] = this.isTableColumnResizable(clickedEditorItem, targetPoint.x, targetPoint.y)
            if (targetRow) {
              // console.log('========1')
              this._targetRowResizing = true
              this._targetRowIndex = targetRowIndex
              this._target = clickedEditorItem
              if (this._targetItem) {
                this._targetItem.shape.focused = false
              }
              this._targetItem = undefined
              this._targetItemIndex = 0
            } else if (targetColumn) {
              // console.log('========0')
              this._targetColumnResizing = targetColumn
              this._targetColumnIndex = targetColumnIndex
              this._target = clickedEditorItem
              if (this._targetItem) {
                this._targetItem.shape.focused = false
              }
              this._targetItem = undefined
              this._targetItemIndex = 0
            } else {
              const itemIndex = this.findTableItemIndex(clickedEditorItem, targetPoint.x, targetPoint.y)
              this._targetItemIndex = itemIndex
              if (this._targetItem) {
                this._targetItem.shape.focused = false
              }
              this._targetItem = clickedEditorItem.items[itemIndex]
              this._targetItem.shape.focused = true
            }
          }
        }

        this.inMoving = true
      } else {
        theSelectionLayer.removeAllEditorItems()
        if (this._target) {
          this._target.shape.focused = false
        }

        if (this._targetItem) {
          this._targetItem.shape.focused = false
        }
        this._target = undefined
        this._targetTime = 0
        this._targetColumnResizing = false
        this._targetRowResizing = false
        this._targetItem = undefined
        this._targetItemIndex = 0
      }
    }
  }

  public handleDoubleClick (e: PointerEvent) {
  }

  public handlePointerUp (e: MouseEvent) {
    this._action = undefined
    if (this._inCreatingConnector) {
      const theControllerLayer = this.controllerLayer as ControllerLayer
      const connector = theControllerLayer.getEditorItem(0)
      this.controllerLayer.removeAllEditorItems()
      this.contentLayer.addEditorItem(connector)
      this._textFocused = false
      // } else if (this.inMoving_) {
      //  const theSelectionLayer = this.selectionLayer
      //  const editorItem = theSelectionLayer.getEditorItem(0)
      //  this.selectionLayer.removeAllEditorItems()
      //  this.contentLayer.addEditorItem(editorItem)
    } else {
      const clickedEditorItem = this.findEditorItem(e.x, e.y)
      if (clickedEditorItem) {
        const targetPoint = this.findEditorItemPoint(clickedEditorItem, e.x, e.y)
        if (this._target !== clickedEditorItem) {
          if (this._target) {
            this._target.shape.focused = false
            this._textFocused = false
          }
          this._target = clickedEditorItem
          this._targetTime = Date.now()
        } else {
          if (clickedEditorItem instanceof TableEntity) {
            const itemIndex = this.findTableItemIndex(clickedEditorItem, targetPoint.x, targetPoint.y)
            if (itemIndex === this._targetItemIndex && this._targetItem) {
              const nowTime = Date.now()
              if (this._targetItem.shape.focused) {
                this._textArea.focus()
                this.updateTextCursorLocation(this._targetItem, targetPoint.x, targetPoint.y)
                this._targetItem.shape.enter(targetPoint.x, targetPoint.y)
              } else {
                // Check double click
                if (nowTime - this._targetTime < Editor.DOUBLE_CLICK_TIME) {
                  // console.log('Double click is detected')
                  // this.handleDoubleClick(e)
                  this._textArea.focus()
                  this._targetItem.shape.enter(targetPoint.x, targetPoint.y)
                  this._textFocused = true
                  if (this._targetItem) {
                    this._targetItem.shape.focused = true
                  }
                  this._textArea.textContent = ''
                  this.updateTextCursorLocation(this._targetItem, targetPoint.x, targetPoint.y)
                }
              }
              this._targetTime = nowTime
            }
          } else {
            const nowTime = Date.now()
            if (this._target.shape.focused) {
              this._textArea.focus()
              this.updateTextCursorLocation(clickedEditorItem, targetPoint.x, targetPoint.y)
              this._target.shape.enter(targetPoint.x, targetPoint.y)
            } else {
              // Check double click
              if (nowTime - this._targetTime < Editor.DOUBLE_CLICK_TIME) {
                console.log('Double click is detected')
                // this.handleDoubleClick(e)
                this._textArea.focus()
                this._target.shape.enter(targetPoint.x, targetPoint.y)
                this._textFocused = true
                if (this._target) {
                  this._target.shape.focused = true
                }
                this._textArea.textContent = ''
                this.updateTextCursorLocation(clickedEditorItem, targetPoint.x, targetPoint.y)
              }
            }
            this._targetTime = nowTime
          }
        }
      }
    }
    this.inMoving = false
    this._inCreatingConnector = false
    this._targetRowResizing = false
    this._targetColumnResizing = false
  }

  public handleKeyDown (e: KeyEvent) {
    console.log(`key down event: ${e.code}   ${e.key}`)
  }

  public handleKeyUp (e: KeyEvent) {
    console.log(`key up event: ${e.code}   ${e.key}`)
  }

  public handleKeyPress (e: KeyEvent) {
    console.log(`key press event: ${e.code}   ${e.key}`)
  }

  private initializeTextArea () {
    if (this.engine.container?.parentElement) {
      this.engine.container.parentElement.append(this._textArea)
    }
    // document.getElementsByTagName('body')[0].append(this._textArea)
    this._textArea.tabIndex = 0
    this._textArea.style.zIndex = '-9999'
    this._textArea.style.position = 'absolute'
    this._textArea.style.left = '0'
    this._textArea.style.top = '0'
    this._textArea.style.opacity = '0'
    this._textArea.addEventListener('compositionstart', (e: CompositionEvent) => {
      this._textInputStatus = 'CHINESE_TYPING'
    }, false)
    this._textArea.addEventListener('input', (e) => {
      if (this._textInputStatus === 'CHINESE_TYPING') {
        return
      }
      if (this._targetItem && e.data) {
        this._targetItem.shape.insert(e.data)
      } else if (this._target && e.data) {
        this._target.shape.insert(e.data)
      }
      this._textInputStatus = 'CHAR_TYPING'
    })
    this._textArea.addEventListener('compositionend', (e: CompositionEvent) => {
      if (this._textInputStatus === 'CHINESE_TYPING') {
        if (this._targetItem) {
          this._targetItem.shape.insert(e.data)
        } else if (this._target) {
          this._target.shape.insert(e.data)
        }
        this._textInputStatus = 'CHAR_TYPING'
      }
    })

    this._textArea.addEventListener('keydown', (event) => {
      this.handleTextAreaKeyDown(event)
    })
    this._textArea.addEventListener('keyup', (event) => {
      this.handleTextAreaKeyUp(event)
    })
  }

  /**
   * Update cursor location in page
   */
  private updateElementLocation () {

  }

  /**
   * Update textarea component location
   * @param editorItem
   * @param x
   * @param y
   */
  private updateTextAreaLocation (editorItem: EditorItem, x: number, y: number) {

  }

  private getRelativePosition (element: HTMLElement) {
    let acturalLeft = element.offsetLeft
    let acturalTop = element.offsetTop
    let curElement = element.offsetParent
    while (curElement) {
      acturalLeft += curElement.offsetLeft
      acturalTop += curElement.offsetTop
      curElement = curElement.offsetParent
    }
    return {
      left: acturalLeft - element.scrollLeft,
      width: acturalTop - element.scrollTop,
    }
  }
  /**
   * update cursor location in text
   * @param editorItem
   * @param x
   * @param y
   */

  private updateTextCursorLocation (editorItem: EditorItem, x: number, y: number) {
    // this._textArea.style.position = 'absolute'
    const parent = this._textArea.parentElement
    // const pos = this.getRelativePosition(parent)
    const pos = parent.getBoundingClientRect()
    // console.log(`'Cursor x = ${parent.offsetLeft} , pos = ${pos}`)
    this._textArea.style.left = (Editor.SHADOW_SIZE + (editorItem.left + x) * this._zoom + pos.left) + 'px'
    this._textArea.style.top = (Editor.SHADOW_SIZE + (editorItem.top + y) * this._zoom + pos.top) + 'px'
  }

  private handleTextAreaKeyDown (e: KeyboardEvent) {
    // console.log(`Key Down ${e.code}`)
    this._textCommandKey = false
  }

  private handleTextAreaKeyUp (e: KeyboardEvent) {
    // console.log(`Key Up ${e.code} ${this._textContent} `)
    if (e.key === 'Meta' || e.key === 'Control') {
      this._textCommandKey = true
    }
    if (this._textCommandKey && e.key === 'a') {
      if (this._targetItem) {
        this._targetItem.shape.selectAll()
      } else if (this._target) {
        this._target.shape.selectAll()
      }
      return
    }
    if (this._textFocused && e.key === 'Backspace') {
      if (this._targetItem) {
        this._targetItem.shape.handleBackspace()
      } else if (this._target) {
        this._target.shape.handleBackspace()
      }
    }

    if (this._textFocused && e.key === 'ArrowLeft') {
      if (this._targetItem) {
        this._targetItem.shape.moveColumns(-1)
      } else if (this._target) {
        this._target.shape.moveColumns(-1)
      }
    }
    if (this._textFocused && e.key === 'ArrowRight') {
      if (this._targetItem) {
        this._targetItem.shape.moveColumns(1)
      } else if (this._target) {
        this._target.shape.moveColumns(1)
      }
    }
    if (this._textFocused && e.key === 'ArrowUp') {
      if (this._targetItem) {
        this._targetItem.shape.moveRows(-1)
      } else if (this._target) {
        this._target.shape.moveRows(-1)
      }
    }
    if (this._textFocused && e.key === 'ArrowDown') {
      if (this._targetItem) {
        this._targetItem.shape.moveRows(1)
      } else if (this._target) {
        this._target.shape.moveRows(1)
      }
    }
    if (this._textFocused && e.key === 'Enter') {
      if (this._targetItem) {
        this._targetItem.shape.handleReturn()
      } else if (this._target) {
        this._target.shape.handleReturn()
      }
    }
  }

  private isInEditorItem (editorItem: EditorItem, x: number, y: number): boolean {
    const shape = editorItem.shape
    const inClickEditorItem = shape.contains(x, y)
    return inClickEditorItem
  }

  private findEditorItem (x: number, y: number): EditorItem | undefined {
    let result
    const count = this.contentLayer.getEditorItemCount()
    for (let i = count - 1; i >= 0; i--) {
      const editorItem = this.contentLayer.getEditorItem(i)
      const shape = editorItem.shape

      // console.log(`Finding items ${x}    ${y}    ==== ${shape.position.x}    ${shape.position.y}`)
      if (shape.intersects(x - Editor.TEST_RADIUS, y - Editor.TEST_RADIUS, Editor.TEST_SIZE, Editor.TEST_SIZE)) {
        result = editorItem
        break
      }
    }
    return result
  }

  private hasEditorItemJoint (editorItem: EditorItem, x: number, y: number): boolean {
    let result = false
    const shape = editorItem.shape
    let inEditorItem = false
    let outEditorItem = false
    const startX = x - Editor.TEST_RADIUS
    const startY = y - Editor.TEST_RADIUS
    const endX = x + Editor.TEST_RADIUS
    const endY = y + Editor.TEST_RADIUS
    // console.log(`Finding items ${x}    ${y}    ==== ${shape.position.x}    ${shape.position.y}`)
    for (let i = startX; i <= endX; i++) {
      for (let j = startY; j <= endY; j++) {
        if (shape.contains(i, j)) {
          inEditorItem = true
        } else {
          outEditorItem = true
        }
      }
    }
    if (inEditorItem && outEditorItem) {
      result = true
    }
    return result
  }

  private findEditorItemJoint (editorItem: EditorItem, x: number, y: number, inEditorItem: boolean): Point2 {
    const shape = editorItem.shape
    const centerX = x
    const centerY = y
    const startX = x - Editor.TEST_RADIUS
    const startY = y - Editor.TEST_RADIUS
    const endX = x + Editor.TEST_RADIUS
    const endY = y + Editor.TEST_RADIUS
    let distance = 999999999
    let targetX = startX
    let targetY = startY
    for (let i = startX; i <= endX; i++) {
      for (let j = startY; j <= endY; j++) {
        let contained = shape.contains(i, j)
        // 如果鼠标在外面则求里面的点到目标点最近距离，否则外面的点到目标点点最近距离
        if (inEditorItem) {
          contained = !contained
        }
        if (contained) {
          const newDistance = (centerX - i) * (centerX - i) + (centerY - j) * (centerY - j)
          if (newDistance < distance) {
            distance = newDistance
            targetX = i
            targetY = j
          }
        }
      }
    }
    if (editorItem.shape.worldInverseTransform) {
      const point = editorItem.shape.worldInverseTransform.makePoint(new Point2(targetX / this._zoom, targetY / this._zoom))
      return point
    }
    return new Point2(x / this._zoom, y / this._zoom)
  }

  /**
 * 返回命中的位置
 * @param editorItem
 * @param x
 * @param y
 * @param inEditorItem
 * @returns
 */
  private findEditorItemPoint (editorItem: EditorItem, x: number, y: number): Point2 {
    if (editorItem.shape.worldInverseTransform) {
      const point = editorItem.shape.worldInverseTransform.makePoint(new Point2(x, y))
      return point
    }
    return new Point2(x / this._zoom, y / this._zoom)
  }

  /**
   * Check if can modify row height or column width
   * @param tableEntity
   * @param x
   * @param y
   * @returns
   */
  private isTableRowtResizable (tableEntity: TableEntity, x: number, y: number): [boolean, number] {
    const rowCount = tableEntity.rowCount
    const columnCount = tableEntity.columnCount
    const items = tableEntity.items

    let pos = 0
    for (let i = 0; i < rowCount - 1; i++) {
      const item = items[i * columnCount]
      pos += item.height
      if (pos <= y + Editor.TEST_RADIUS && pos >= y - Editor.TEST_RADIUS) {
        return [ true, i, ]
      }
    }
    return [ false, 0, ]
  }

  /**
   * Check if can modify row height or column width
   * @param tableEntity
   * @param x
   * @param y
   * @returns
   */
  private isTableColumnResizable (tableEntity: TableEntity, x: number, y: number): [boolean, number] {
    const columnCount = tableEntity.columnCount
    const items = tableEntity.items

    let pos = 0
    for (let i = 0; i < columnCount - 1; i++) {
      const item = items[i]
      pos += item.width
      if (pos <= x + Editor.TEST_RADIUS && pos >= x - Editor.TEST_RADIUS) {
        return [ true, i, ]
      }
    }
    return [ false, 0, ]
  }

  /**
   * Find pos in table
   * @param tableEntity
   * @param x
   * @param y
   * @returns
   */
  private findTableItemIndex (tableEntity: TableEntity, x: number, y: number): number {
    const columnCount = tableEntity.columnCount
    const rowCount = tableEntity.rowCount
    const items = tableEntity.items
    const itemCount = items.length

    for (let i = 0; i < itemCount; i++) {
      const item = items[i]
      if (x >= item.left && x <= item.right && y >= item.top && y <= item.bottom) {
        return i
      }
    }
    return 0
  }

  private handlePointMoveinAction (e: PointerEvent, action: Action) {
    if (this.controllerLayer.count == 0) {
      this.controllerLayer.addEditorItem(action.item)
    }
    const controllerItem = this.controllerLayer.getEditorItem(0)
    // console.log(`Moving... x = ${e.x} width=${controllerItem.width} `)
    const width = controllerItem.width
    const height = controllerItem.height
    const ex = Math.round(e.x / this._zoom / this.gridSize) * this.gridSize
    const ey = Math.round(e.y / this._zoom / this.gridSize) * this.gridSize
    controllerItem.boundary = Rectangle.makeLTWH(Math.round(ex - controllerItem.width / 2), Math.round(ey - controllerItem.height / 2), width, height)
    // if (controllerItem instanceof Connector) {
    //  controllerItem.start = new Point2(Math.round(e.x / this._zoom - width / 2), Math.round(e.y / this._zoom - height / 2))
    //  controllerItem.end = new Point2(Math.round(e.x / this._zoom + width / 2), Math.round(e.y / this._zoom + height / 2))
    // } else if (controllerItem instanceof Entity) {
    // }

    // console.log(`Moving... x = ${e.x}  start=${controllerItem.left} end=${controllerItem.top} width=${controllerItem.width}  height=${controllerItem.height}`)
  }

  private handlePointMoveInMoving (e: PointerEvent) {
    // console.log('5==========')
    const theSelectionLayer = this.selectionLayer as SelectionLayer
    const theHoverLayer = this.hoverLayer as HoverLayer
    const count = theSelectionLayer.getEditorItemCount()
    for (let i = 0; i < count; i++) {
      const editorItem = theSelectionLayer.getEditorItem(i) as Item
      const left = editorItem.left
      const top = editorItem.top
      const connectorCount = editorItem.getConnectorCount()
      // console.log('left=' + (left + e.x - this._startPointX) + ', top = ' + (top + e.y - this._startPointY) + ', width = ' + editorItem.width + ', height = ' + editorItem.height)
      const ex = Number(Math.round((left + e.x / this._zoom - this._startPointX / this._zoom) / 1))
      const ey = Number(Math.round((top + e.y / this._zoom - this._startPointY / this._zoom) / 1))
      editorItem.boundary = Rectangle.makeLTWH(ex, ey, editorItem.width, editorItem.height)
      for (let j = 0; j < connectorCount; j++) {
        const connector = editorItem.getConnector(j)
        if (connector.source == editorItem) {
          // connector.updateSourceJoint()
          // if (connector.sourceJoint) {
          //  connector.sourceJoint = new Point2(connector.sourceJoint.x + e.x / this._zoom - this._startPointX / this._zoom, connector.sourceJoint.y + e.y / this._zoom - this._startPointY / this._zoom)
          // }
          connector.start = new Point2(connector.start.x + (e.x - this._startPointX) / this._zoom, connector.start.y + (e.y - this._startPointY) / this._zoom)
        }
        if (connector.target == editorItem) {
          // connector.updateTargetJoint()
          // console.log(`end is connector.end.x = ${connector.end.x} connector.end.y = ${connector.end.y}`)
          // connector.end = new Point2(connector.end.x + e.x - this._startPointX, connector.end.y + e.y - this._startPointY)
          connector.end = new Point2(connector.end.x + (e.x - this._startPointX) / this._zoom, connector.end.y + (e.y - this._startPointY) / this._zoom)
        }
      }
    }
    this._startPointX = e.x
    this._startPointY = e.y
    theSelectionLayer.invalidateLayer()
    theHoverLayer.removeAllEditorItems()
  }

  private handlePointMoveInCreatingConnector (e: PointerEvent) {
    // console.log('4========== x= ' + e.x + ',  y = ' + e.y)
    const theControllerLayer = this.controllerLayer as ControllerLayer
    const connector = theControllerLayer.getEditorItem(0) as Connector
    const editorItem = this.findEditorItem(e.x, e.y)
    const isEdge = editorItem ? this.hasEditorItemJoint(editorItem, e.x, e.y) : false
    if (editorItem && isEdge && editorItem !== connector.source) {
      const inEditorItem = this.isInEditorItem(editorItem, e.x, e.y)
      const targetPoint = this.findEditorItemJoint(editorItem, e.x, e.y, inEditorItem)
      // const targetJoint = new Point2(targetPoint.x - editorItem.left, targetPoint.y - editorItem.top)
      connector.target = editorItem as Entity
      connector.targetJoint = targetPoint
      connector.target.addConnector(connector)
    } else {
      if (connector.target) {
        connector.target.removeConnector(connector)
      }
      connector.target = undefined
      connector.end = new Point2(e.x / this._zoom, e.y / this._zoom)
    }
  }

  private handleTargetRowResizing (e: PointerEvent) {
    const tableEntity = this._target as TableEntity
    const rowIndex = this._targetRowIndex
    const minHeight = Item.MIN_HEIGHT
    const columnCount = tableEntity.columnCount
    let maxHeight = 0
    for (let i = rowIndex; i <= rowIndex + 1; i++) {
      maxHeight += tableEntity.items[i * tableEntity.columnCount].height
    }
    maxHeight -= Item.MIN_HEIGHT
    const newHeight = tableEntity.items[rowIndex * columnCount].height + e.y / this._zoom - this._startPointY / this._zoom
    const nextNewTop = tableEntity.items[(rowIndex + 1) * columnCount].top + e.y / this._zoom - this._startPointY / this._zoom
    const nextNewHeight = tableEntity.items[(rowIndex + 1) * columnCount].height - e.y / this._zoom + this._startPointY / this._zoom
    if (newHeight >= minHeight && newHeight <= maxHeight) {
      for (let i = 0; i < columnCount; i++) {
        const shapeEntity = tableEntity.items[rowIndex * columnCount + i] as ShapeEntity
        shapeEntity.boundary = Rectangle.makeLTWH(shapeEntity.left, shapeEntity.top, shapeEntity.width, newHeight)
        const nextShapeEntity = tableEntity.items[(rowIndex + 1) * columnCount + i] as ShapeEntity
        nextShapeEntity.boundary = Rectangle.makeLTWH(nextShapeEntity.left, nextNewTop, nextShapeEntity.width, nextNewHeight)
      }
    }
    // console.log(`newHeight = ${newHeight} nextNewHeight = ${nextNewHeight} maxHeight = ${maxHeight} `)
    this._startPointX = e.x
    this._startPointY = e.y
  }

  private handleTargetColumnResizing (e: PointerEvent) {
    const tableEntity = this._target as TableEntity
    const columnIndex = this._targetColumnIndex
    const minWidth = Item.MIN_WIDTH
    const rowCount = tableEntity.rowCount
    let maxWidth = 0
    for (let i = columnIndex; i <= columnIndex + 1; i++) {
      maxWidth += tableEntity.items[i].width
    }
    maxWidth -= Item.MIN_WIDTH
    const newWidth = tableEntity.items[columnIndex].width + e.x / this._zoom - this._startPointX / this._zoom
    const nextNewLeft = tableEntity.items[columnIndex + 1].left + e.x / this._zoom - this._startPointX / this._zoom
    const nextNewWidth = tableEntity.items[columnIndex + 1].width - e.x / this._zoom + this._startPointX / this._zoom
    if (newWidth >= minWidth && newWidth <= maxWidth) {
      for (let i = 0; i < rowCount; i++) {
        const shapeEntity = tableEntity.items[columnIndex + rowCount * i] as ShapeEntity
        shapeEntity.boundary = Rectangle.makeLTWH(shapeEntity.left, shapeEntity.top, newWidth, shapeEntity.height)
        const nextShapeEntity = tableEntity.items[columnIndex + 1 + rowCount * i] as ShapeEntity
        nextShapeEntity.boundary = Rectangle.makeLTWH(nextNewLeft, nextShapeEntity.top, nextNewWidth, nextShapeEntity.height)
      }
    }
    // console.log(`newWidth = ${newWidth} nextNewWidth = ${nextNewWidth} maxWidth = ${maxWidth} `)
    this._startPointX = e.x
    this._startPointY = e.y
  }
}
