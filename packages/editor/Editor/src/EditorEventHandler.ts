import { Matrix, MouseCode, Point2, PointerEvent, Rectangle, Rotation } from '@ratel-web/engine'
import { Action, MyShapeAction } from '../../Actions'
import { Holder } from '../../Design'
import {
  CodeContainer,
  Connector,
  ContainerEntity,
  EditorItem,
  EditorItemInfo,
  Entity,
  Item,
  PoolCustomContainer,
  PoolLabelEntity,
  ShapeEntity,
  TableEntity,
} from '../../Items'
import { Operation, OperationHelper, OperationType } from '../../Operations'
import { EditorUtils } from '../../Theme'
import { ControllerLayer } from './ControllerLayer'
import { Editor, EditorMode } from './Editor'
import { EditorContext } from './EditorContext'
import { HoverLayer } from './HoverLayer'
import { SelectionLayer } from './SelectionLayer'

export class EditorEventHandler {
  /**
   * Check time offset for double click
   */
  private static readonly DOUBLE_CLICK_TIME = 500

  private readonly _editor: Editor
  private readonly _editorContext: EditorContext

  public constructor(editor: Editor, editorContext: EditorContext) {
    this._editor = editor
    this._editorContext = editorContext
  }

  public handlePointerLeave(e: PointerEvent) {
    console.log(`Leaving editor ... ${e}`)
  }

  public handlePointerEnter(e: PointerEvent) {
    console.log(`Enter editor ... ${e}`)
  }

  public handlePointerMove(e: PointerEvent) {
    //console.log(`Moving... x = ${e.x} action=${this._action}`)
    if (this._editor.action) {
      //  in creating action
      this.handlePointMoveInAction(e, this._editor.action)
    } else if (this._editorContext.targetRowResizing) {
      this.handleTargetRowResizing(e)
    } else if (this._editorContext.targetColumnResizing) {
      this.handleTargetColumnResizing(e)
    } else if (this._editorContext.targetPoolXResizing) {
      this.handleTargetPoolXResizing(e)
    } else if (this._editorContext.targetPoolYResizing) {
      this.handleTargetPoolYResizing(e)
    } else if (this._editorContext.inMoving) {
      // EditorItem is in moving
      this.handlePointMoveInMoving(e)
    } else if (this._editorContext.inCreatingConnector) {
      // in creating connector
      this.handlePointMoveInCreatingConnector(e)
    } else if (this._editorContext.inRangeSelecting) {
      // in range selecting
      this.handleRangeSelecting(e)
    } else {
      this.handleDefaultPointMove(e)
    }
  }

  public handlePointerDown(e: PointerEvent) {
    //console.log(`handle Mouse Down ... x = ${e.x}`)
    if (e.mouseCode === MouseCode.RIGHT_MOUSE_DOWN) {
      //Popup menu require this
      this.handleMouseRightButtonDown(e)
      return
    }
    this._editorContext.startPointX = e.x
    this._editorContext.startPointY = e.y
    this._editorContext.modified = true
    if (this._editor.action) {
      this.handleCreationAction(e)
    } else {
      const clickedEditorItem = this._editor.findEditorItem(e.x, e.y, false)
      const theSelectionLayer = this._editorContext.selectionLayer as SelectionLayer
      const isEdge = clickedEditorItem
        ? this._editor.hasEditorItemJoint(clickedEditorItem, e.x, e.y) && !clickedEditorItem.fixed && !((clickedEditorItem as Item).parent instanceof Connector)
        : false
      const inClickEditorItem = clickedEditorItem ? this._editor.isInEditorItem(clickedEditorItem, e.x, e.y) : false
      if (clickedEditorItem && isEdge && !inClickEditorItem) {
        //Create connector
        this.createConnector(clickedEditorItem, e)
      } else if (clickedEditorItem) {
        if (!theSelectionLayer.hasEditorItem(clickedEditorItem)) {
          this.updateSelection(clickedEditorItem)
          this._editorContext.target = clickedEditorItem
          //if (!((clickedEditorItem as Item).parent instanceof FrameEntity || clickedEditorItem.fixed)) {
          // this._editorContext.inMoving = true
          //}
          //console.log(`Check start info count on mouse down = ${this._editorContext.startEditorItemInfos.length}`)
          if (!clickedEditorItem.locked) {
            this._editorContext.inMoving = true
          }
          if (clickedEditorItem instanceof TableEntity) {
            if (!clickedEditorItem.locked) {
              this.selectTable(clickedEditorItem, e, true)
            }
          } else if (clickedEditorItem instanceof PoolCustomContainer) {
            this.selectPoolCustomContainer(clickedEditorItem, e, true)
          } else {
          }
        } else if (clickedEditorItem instanceof TableEntity) {
          this.selectTable(clickedEditorItem, e, false)
        } else if (clickedEditorItem instanceof PoolCustomContainer) {
          this.selectPoolCustomContainer(clickedEditorItem, e, false)
        } else if (this._editorContext.textFocused) {
          const targetPoint = this.findEditorItemPoint(clickedEditorItem, e.x, e.y)
          this.updateTextCursorLocation(clickedEditorItem, targetPoint.x, targetPoint.y)
          clickedEditorItem.shape.enter(targetPoint.x, targetPoint.y)
          this._editorContext.textSelecting = true
        } else {
          if (!clickedEditorItem.locked) {
            //if (!((clickedEditorItem as Item).parent instanceof FrameEntity) || clickedEditorItem.fixed) {
            this._editor.beginOperation()
            this._editorContext.target = clickedEditorItem
            this._editorContext.inMoving = true
            this.startMoveOutline()
            //}
          }
        }
      } else {
        this.removeSelection()
        this.startRangeSelecting(e)
      }
    }
    //Code Editor may still have focus and we check and force to
    if (this._editor.inCodeEditing()) {
      let forceFinish = true
      const selectionLayer = this._editorContext.selectionLayer
      if (selectionLayer.getEditorItemCount() === 1 && selectionLayer.getEditorItem(0) instanceof CodeContainer) {
        forceFinish = false
      }
      if (forceFinish) {
        this._editor.finishCodeEdit()
      }
    }
  }

  public handlePointerUp(e: PointerEvent) {
    //console.log(`Pointer up event = ${e}`)
    //console.log(`Check start info count on mouse up = ${this._editorContext.startEditorItemInfos.length}`)
    if (e.mouseCode === MouseCode.RIGHT_MOUSE_UP) {
      return
    }
    if (this._editor.action) {
      // It shouldn't happen here
      //console.log(`It is a exception here, shouldn't be reached`)
      this.handleActionOperation()
      this._editor.action = undefined
    } else if (this._editorContext.inCreatingConnector) {
      //console.log(`It is a exception here, shouldn't be reached`)
      this.handleMouseUpForConnectorCreation()
    } else if (this._editorContext.inContainerSelection) {
      //Editor target is undefined if move unselected shape into container and we can use following code to resolve this
      // const clickedEditorItem = this._editor.findEditorItem(e.x, e.y, false)
      // if (clickedEditorItem) {
      //   this.handleMouseUpDefault(clickedEditorItem, e)
      // }
      this.finishContainerSelection(e)
    } else {
      const clickedEditorItem = this._editor.findEditorItem(e.x, e.y, false)
      if (clickedEditorItem) {
        this.handleMouseUpDefault(clickedEditorItem, e)
      }
    }
    if (this._editorContext.inMoving) {
      // Shape is moved out of container here
      this.removeItemsFromContainer(e)
    }
    if (this._editorContext.inMoving && this._editorContext.moveStarted && this._editorContext.target && this._editorContext.startEditorItemInfos.length > 0) {
      this._editor.finishOperation()
    }
    if (this._editorContext.inRangeSelecting) {
      this.endRangeSelecting(e)
    }
    if (this._editorContext.inMoving) {
      this.endMoveOutline()
      this._editorContext.inMoving = false
      this._editorContext.moveStarted = false
    }
    this._editorContext.inCreatingConnector = false
    this._editorContext.targetRowResizing = false
    this._editorContext.targetColumnResizing = false
    this._editorContext.targetPoolXResizing = false
    this._editorContext.targetPoolYResizing = false
  }

  private handleDefaultPointMove(e: PointerEvent) {
    const theHoverLayer: HoverLayer = this._editorContext.hoverLayer as HoverLayer
    const theSelectionLayer: SelectionLayer = this._editor.selectionLayer as SelectionLayer
    const editorItem = this._editor.findEditorItem(e.x, e.y, false)
    //console.log(`Finding ...... ${editorItem}`)
    const isEdge = editorItem
      ? this._editor.hasEditorItemJoint(editorItem, e.x, e.y) && !editorItem.fixed && !((editorItem as Item).parent instanceof Connector)
      : false
    const hasFixedItems = editorItem ? this.hasFixedItems(editorItem, e.x, e.y) : false
    const ifFixedItemIsTarget = editorItem ? this.ifFixedItemIsTarget(editorItem, e.x, e.y) : false
    //fixed item is in text edit mode and mouse over on it now
    const isFixedItemSelected = hasFixedItems && !editorItem!.fixed && ifFixedItemIsTarget && editorItem !== this._editorContext.target
    //parent is in text edit mode and mouse over on it now
    const isParentItemSelected = editorItem ? !hasFixedItems && !editorItem.fixed && editorItem === this._editorContext.target : false
    //Fixed item is clicked and it is in text mode
    const isFixedItemInTextEditing = editorItem ? hasFixedItems && ifFixedItemIsTarget && !editorItem.fixed && editorItem !== this._editorContext.target : false
    // console.log(
    //   ` Find editor item edge = ${isEdge}, hasFixedItems=${hasFixedItems} isFixedItemSelected=${isFixedItemSelected} isParentItemSelected=${isParentItemSelected} `,
    // )
    if (editorItem && isEdge) {
      //console.log(` Check here1`)
      if (!editorItem.locked) {
        const inEditorItem = this._editor.isInEditorItem(editorItem, e.x, e.y)
        //const targetPoint = this.findEditorItemJoint(editorItem, e.x, e.y, inEditorItem)
        if (inEditorItem) {
          //console.log(` Check here2 ${this._textFocused}`)
          if (this._editorContext.textFocused && (!hasFixedItems || isFixedItemSelected)) {
            //console.log(` Check here21 ${this._textFocused}`)
            this._editor.updateEditorMode(EditorMode.TEXT)
          } else {
            //console.log(` Check here22 ${this._textFocused}`)
            this._editor.updateEditorMode(EditorMode.MOVE)
          }
        } else {
          //console.log(` Check here3`)
          this._editor.updateEditorMode(EditorMode.CROSSHAIR)
        }
        //if (targetPoint) {
        //  console.log(`Find editor item joint: x = ${targetPoint.x} y = ${targetPoint.y} `)
        //} else {
        //  console.log(`It shouldn't be here`)
        //}
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
        if (editorItem instanceof TableEntity) {
          if (!editorItem.locked) {
            const targetPoint = this.findEditorItemPoint(editorItem, e.x, e.y)
            const [targetRow] = this.isTableRowResizable(editorItem, targetPoint.x, targetPoint.y)
            const [targetColumn] = this.isTableColumnResizable(editorItem, targetPoint.x, targetPoint.y)
            if (targetRow) {
              this._editor.updateEditorMode(EditorMode.ROW_RESIZE)
            } else if (targetColumn) {
              this._editor.updateEditorMode(EditorMode.COL_RESIZE)
            } else if (this._editorContext.targetItem && this._editorContext.textFocused && this._editorContext.textSelecting) {
              this._editor.updateEditorMode(EditorMode.TEXT)
            } else {
              this._editor.updateEditorMode(EditorMode.MOVE)
            }
          }
        } else if (this._editorContext.textFocused && this._editorContext.textSelecting && !hasFixedItems) {
          this._editor.updateEditorMode(EditorMode.TEXT)
        } else if (editorItem instanceof PoolCustomContainer) {
          if (!editorItem.locked) {
            this.handleMouseOverOnPool(editorItem, e, false)
          }
        } else {
          if (!editorItem.locked) {
            this._editor.updateEditorMode(EditorMode.MOVE)
          }
        }
      } else {
        if (editorItem instanceof TableEntity) {
          if (!editorItem.locked) {
            const targetPoint = this.findEditorItemPoint(editorItem, e.x, e.y)
            const [targetRow] = this.isTableRowResizable(editorItem, targetPoint.x, targetPoint.y)
            const [targetColumn] = this.isTableColumnResizable(editorItem, targetPoint.x, targetPoint.y)
            if (targetRow) {
              // console.log('========2')
              // this._targetRow = true
              // this._targetRowIndex = targetRowIndex
              this._editor.updateEditorMode(EditorMode.ROW_RESIZE)
            } else if (targetColumn) {
              // console.log('========3')
              // this._targetColumn = targetColumn
              // this._targetColumnIndex = targetColumnIndex
              this._editor.updateEditorMode(EditorMode.COL_RESIZE)
            } else if (this._editorContext.targetItem && this._editorContext.textFocused && this._editorContext.textSelecting) {
              const cellPoint = this.findEditorItemPoint(this._editorContext.targetItem, e.x, e.y)
              this._editorContext.targetItem.shape.enterTo(cellPoint.x, cellPoint.y)
              this._editor.updateEditorMode(EditorMode.TEXT)
            } else if (this._editorContext.targetItem && this._editorContext.textFocused) {
              this._editor.updateEditorMode(EditorMode.TEXT)
            } else {
              this._editor.updateEditorMode(EditorMode.MOVE)
            }
          }
        } else if (
          this._editorContext.textFocused &&
          this._editorContext.textSelecting &&
          (isParentItemSelected || isFixedItemSelected || isFixedItemInTextEditing)
        ) {
          const targetPoint = this.findEditorItemPoint(this._editorContext.target!, e.x, e.y)
          this._editorContext.target!.shape.enterTo(targetPoint.x, targetPoint.y)
          this._editor.updateEditorMode(EditorMode.TEXT)
        } else if (this._editorContext.textFocused && (isParentItemSelected || isFixedItemSelected)) {
          this._editor.updateEditorMode(EditorMode.TEXT)
        } else if (editorItem instanceof PoolCustomContainer) {
          if (!editorItem.locked) {
            this.handleMouseOverOnPool(editorItem, e, false)
          }
        } else {
          if (!editorItem.locked) {
            this._editor.updateEditorMode(EditorMode.MOVE)
          }
        }
      }
    } else {
      //console.log('test code here')
      if (theHoverLayer.getEditorItemCount() > 0) {
        const hoverEditorItem = theHoverLayer.getEditorItem(0)
        if (hoverEditorItem instanceof Connector) {
          // console.log('Connector is found')
          const editorItem = this._editor.findEditorItem(e.x, e.y, false)
          if (editorItem !== null && editorItem !== undefined) {
            theHoverLayer.inHolder = false
            theHoverLayer.invalidateLayer()
          } else {
            theHoverLayer.inHolder = true
            theHoverLayer.removeAllEditorItems()
          }
          this._editor.updateEditorMode(EditorMode.AUTO)
        } else {
          // console.log('Connector is not found')
          if (
            hoverEditorItem.left - Holder.PADDING < (e.x - this._editor.horizontalSpace) / this._editor.zoom &&
            hoverEditorItem.right + Holder.PADDING > (e.x - this._editor.horizontalSpace) / this._editor.zoom &&
            hoverEditorItem.top - Holder.PADDING < (e.y - this._editor.verticalSpace) / this._editor.zoom &&
            hoverEditorItem.bottom + Holder.PADDING > (e.y - this._editor.verticalSpace) / this._editor.zoom
          ) {
            // console.log('inHolder = false')
            theHoverLayer.inHolder = false
            theHoverLayer.invalidateLayer()
          } else {
            // console.log('inHolder = true')
            theHoverLayer.inHolder = true
            theHoverLayer.removeAllEditorItems()
          }
          this._editor.updateEditorMode(EditorMode.AUTO)
        }
      } else {
        this._editor.updateEditorMode(EditorMode.AUTO)
      }
    }
  }

  private handleCreationAction(e: PointerEvent) {
    if (this._editor.action) {
      // console.log(`handlePointerClick... x = ${e.x}  start=${this.action_.item.start.x} end=${this.action_.item.end.x} width=${this.action_.item.width}  height=${this.action_.item.height}`)
      const clickedEditorItem = this._editor.findEditorItem(e.x, e.y, false)
      if (clickedEditorItem && clickedEditorItem instanceof ContainerEntity && !(clickedEditorItem instanceof TableEntity)) {
        let point = this.findEditorItemPoint(clickedEditorItem, e.x, e.y)
        let [left, top, right, bottom] = Editor.getItemsBoundary(this._editor.action.items)
        let width = right - left
        let height = bottom - top
        let x = this._editor.alignToGridSize(point.x / this._editor.zoom - width / 2)
        let y = this._editor.alignToGridSize(point.y / this._editor.zoom - height / 2)
        this._editor.action.items.forEach((item) => {
          if (item instanceof Connector) {
            this._editor.contentLayer.addEditorItem(item)
            this.handleActionOperation()
          } else {
            item.boundary = Rectangle.makeLTWH(x + item.left - left, y + item.top - top, item.width, item.height)
            clickedEditorItem.addItem(item)
          }
        })
        this._editor.selectionLayer.removeAllEditorItems()
        this._editor.selectionLayer.addEditorItems(this._editor.action.items)
      } else {
        this._editor.contentLayer.addEditorItems(this._editor.action.items)
        this.handleActionOperation()
      }
      this._editorContext.controllerLayer.removeAllEditorItems()
      this._editorContext.controllerLayer.clear()
      this._editor.action = undefined
      this.cleanupOperation()
    }
  }

  private handleDefaultMoveInMoving(e: PointerEvent) {
    const theSelectionLayer = this._editor.selectionLayer as SelectionLayer
    const theHoverLayer = this._editorContext.hoverLayer as HoverLayer
    const count = theSelectionLayer.getEditorItemCount()
    const moveX = e.x / this._editor.zoom - this._editorContext.startPointX / this._editor.zoom
    const moveY = e.y / this._editor.zoom - this._editorContext.startPointY / this._editor.zoom
    const alignMoveX = this._editor.alignToGridSize(moveX)
    const alignMoveY = this._editor.alignToGridSize(moveY)
    for (let i = 0; i < count; i++) {
      const editorItem = theSelectionLayer.getEditorItem(i) as Item
      if (editorItem.locked) {
        continue
      }
      const left = editorItem.left
      const top = editorItem.top
      // const sourceConnectorCount = editorItem.getSourceConnectorCount()
      // const targetConnectorCount = editorItem.getTargetConnectorCount()
      //const ex = Number(Math.round((left + e.x / this._zoom - this._startPointX / this._zoom) / 1))
      //const ey = Number(Math.round((top + e.y / this._zoom - this._startPointY / this._zoom) / 1))
      //const ex = left + e.x / this._zoom - this._startPointX / this._zoom
      //const ey = top + e.y / this._zoom - this._startPointY / this._zoom
      const newLeft = left + alignMoveX
      const newTop = top + alignMoveY
      //console.log(`startx=${this._startPointX} starty=${this._startPointY} e.x=${e.x} e.y = ${e.y} ex = ${ex} ey=${ey} left=` + (left + e.x - this._startPointX) + ', top = ' + (top + e.y - this._startPointY) + ', width = ' + editorItem.width + ', height = ' + editorItem.height)
      editorItem.boundary = Rectangle.makeLTWH(newLeft, newTop, editorItem.width, editorItem.height)
      if (editorItem instanceof Connector) {
        const startX = editorItem.start.x + alignMoveX
        const startY = editorItem.start.y + alignMoveY
        const endX = editorItem.end.x + alignMoveX
        const endY = editorItem.end.y + alignMoveY
        editorItem.autoRefreshOrthogonalPoints = false
        if (!editorItem.source) {
          editorItem.start = new Point2(startX, startY)
        }
        if (!editorItem.target) {
          editorItem.end = new Point2(endX, endY)
        }
        editorItem.autoRefreshOrthogonalPoints = true
        //console.log(`startx = ${startX} start.y=${startY} end.x = ${endX} end.y = ${endY}`)
      } else if (editorItem instanceof Entity) {
      }
      this.checkConnectorsWhenMoving(editorItem, alignMoveX, alignMoveY)
    }
    if (alignMoveX !== 0) {
      //this._startPointX = e.x
      this._editorContext.startPointX = this._editorContext.startPointX + alignMoveX * this._editor.zoom
    }
    if (alignMoveY !== 0) {
      //this._startPointY = e.y
      this._editorContext.startPointY = this._editorContext.startPointY + alignMoveY * this._editor.zoom
    }
    this._editorContext.moveStarted = true
    theSelectionLayer.invalidateLayer()
    theHoverLayer.removeAllEditorItems()
    //Need this to update toolbar in time, Just hide here because of performance issue
    this._editor.triggerSelectionResizing()
    //Update active table cell outline
    this.handleTableActiveCellShape()
  }

  private handleMouseRightButtonDown(e: PointerEvent) {
    this._editorContext.startPointX = e.x
    this._editorContext.startPointY = e.y
    this._editorContext.modified = true
    const clickedEditorItem = this._editor.findEditorItem(e.x, e.y, false)
    const theSelectionLayer = this._editor.selectionLayer as SelectionLayer
    if (clickedEditorItem) {
      if (!theSelectionLayer.hasEditorItem(clickedEditorItem)) {
        this.updateSelection(clickedEditorItem)
      } else if (this._editorContext.textFocused) {
        if (clickedEditorItem.shape.selection.length === 0) {
          const targetPoint = this.findEditorItemPoint(clickedEditorItem, e.x, e.y)
          this.updateTextCursorLocation(clickedEditorItem, targetPoint.x, targetPoint.y)
          clickedEditorItem.shape.enter(targetPoint.x, targetPoint.y)
        }
      }
    } else {
      this.removeSelection()
    }
  }

  private handlePointMoveInAction(e: PointerEvent, action: Action) {
    if (this._editorContext.controllerLayer.count === 0) {
      this._editorContext.controllerLayer.addEditorItems(action.items)
    }
    // const controllerItem = this.controllerLayer.getEditorItem(0)
    // console.log(`Moving... x = ${e.x} width=${controllerItem.width} `)
    let [left, top, right, bottom] = Editor.getItemsBoundary(action.items)
    let width = right - left
    let height = bottom - top
    let ex = this._editor.alignToGridSize((e.x - this._editor.horizontalSpace) / this._editor.zoom - width / 2)
    let ey = this._editor.alignToGridSize((e.y - this._editor.verticalSpace) / this._editor.zoom - height / 2)
    //Action can be multiple items for MyShapes
    action.items.forEach((item) => {
      let itemWidth = item.width //this.alignToGridSize(item.width)
      let itemHeight = item.height //this.alignToGridSize(item.height)
      if (action instanceof MyShapeAction) {
        itemWidth = item.width
        itemHeight = item.height
      }

      if (item instanceof Connector) {
        // const targetPoint = this.findEditorItemPoint(controllerItem, e.x, e.y)
        // controllerItem.start = new Point2(ex + controllerItem.start.x, ey + controllerItem.start.y)
        // controllerItem.end = new Point2(ex + controllerItem.end.x, ey + controllerItem.end.y)
        item.autoRefreshOrthogonalPoints = false
        item.start = new Point2(ex + item.start.x - left, ey + item.start.y - top)
        item.end = new Point2(ex + item.end.x - left, ey + item.end.y - top)
        item.autoRefreshOrthogonalPoints = true
      } else if (item instanceof Entity) {
        item.boundary = Rectangle.makeLTWH(ex + item.left - left, ey + item.top - top, itemWidth, itemHeight)
      }

      //console.log(`Moving... x = ${e.x}  start=${controllerItem.left} end=${controllerItem.top} width=${controllerItem.width}  height=${controllerItem.height}`)
    })

    const containerEntity = this.findContainerEntity(e.x, e.y)
    let checkIfInContainer = true
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    // console.log(`checkResult2 = ${containerEntity}`)
    action.items.forEach((item) => {
      const checkResult = containerEntity && this._editor.checkIfCreationInContainer(item, containerEntity)
      // console.log(`checkResult =  ${checkResult} ${containerEntity}  --- ${containerEntity ? this_.checkIfCreationInContainer(item, containerEntity) : false}`)
      if (!checkResult) {
        checkIfInContainer = false
      }
    })
    // console.log(`in Container check: container = ${checkIfInContainer} , checkIfIn =  ${checkIfInContainer}`)
    if (containerEntity && checkIfInContainer) {
      this.startContainerSelection()
      this.handleContainerSelection(containerEntity)
    } else {
      this.endContainerSelection()
    }
  }

  private handleTargetRowResizing(e: PointerEvent) {
    const tableEntity = this._editorContext.target as TableEntity
    const rowIndex = this._editorContext.targetRowIndex
    const minHeight = Item.MIN_HEIGHT
    const columnCount = tableEntity.columnCount
    let maxHeight = 0
    for (let i = rowIndex; i <= rowIndex + 1; i++) {
      maxHeight += tableEntity.items[i * tableEntity.columnCount].height
    }
    maxHeight -= Item.MIN_HEIGHT
    const newHeight = tableEntity.items[rowIndex * columnCount].height + e.y / this._editor.zoom - this._editorContext.startPointY / this._editor.zoom
    const nextNewTop = tableEntity.items[(rowIndex + 1) * columnCount].top + e.y / this._editor.zoom - this._editorContext.startPointY / this._editor.zoom
    const nextNewHeight = tableEntity.items[(rowIndex + 1) * columnCount].height - e.y / this._editor.zoom + this._editorContext.startPointY / this._editor.zoom
    if (newHeight >= minHeight && newHeight <= maxHeight) {
      for (let i = 0; i < columnCount; i++) {
        const shapeEntity = tableEntity.items[rowIndex * columnCount + i] as ShapeEntity
        shapeEntity.boundary = Rectangle.makeLTWH(shapeEntity.left, shapeEntity.top, shapeEntity.width, newHeight)
        const nextShapeEntity = tableEntity.items[(rowIndex + 1) * columnCount + i] as ShapeEntity
        nextShapeEntity.boundary = Rectangle.makeLTWH(nextShapeEntity.left, nextNewTop, nextShapeEntity.width, nextNewHeight)
      }
    }
    // console.log(`newHeight = ${newHeight} nextNewHeight = ${nextNewHeight} maxHeight = ${maxHeight} `)
    this._editorContext.startPointX = e.x
    this._editorContext.startPointY = e.y
  }

  private handleTargetColumnResizing(e: PointerEvent) {
    const tableEntity = this._editorContext.target as TableEntity
    const columnIndex = this._editorContext.targetColumnIndex
    const minWidth = Item.MIN_WIDTH
    const rowCount = tableEntity.rowCount
    let maxWidth = 0
    for (let i = columnIndex; i <= columnIndex + 1; i++) {
      maxWidth += tableEntity.items[i].width
    }
    maxWidth -= Item.MIN_WIDTH
    const newWidth = tableEntity.items[columnIndex].width + e.x / this._editor.zoom - this._editorContext.startPointX / this._editor.zoom
    const nextNewLeft = tableEntity.items[columnIndex + 1].left + e.x / this._editor.zoom - this._editorContext.startPointX / this._editor.zoom
    const nextNewWidth = tableEntity.items[columnIndex + 1].width - e.x / this._editor.zoom + this._editorContext.startPointX / this._editor.zoom
    if (newWidth >= minWidth && newWidth <= maxWidth) {
      for (let i = 0; i < rowCount; i++) {
        const shapeEntity = tableEntity.items[columnIndex + rowCount * i] as ShapeEntity
        shapeEntity.boundary = Rectangle.makeLTWH(shapeEntity.left, shapeEntity.top, newWidth, shapeEntity.height)
        const nextShapeEntity = tableEntity.items[columnIndex + 1 + rowCount * i] as ShapeEntity
        nextShapeEntity.boundary = Rectangle.makeLTWH(nextNewLeft, nextShapeEntity.top, nextNewWidth, nextShapeEntity.height)
      }
    }
    // console.log(`newWidth = ${newWidth} nextNewWidth = ${nextNewWidth} maxWidth = ${maxWidth} `)
    this._editorContext.startPointX = e.x
    this._editorContext.startPointY = e.y
  }

  private handlePointMoveInMoving(e: PointerEvent) {
    const [left, top, right, bottom] = this._editor.getSelectionBoundary()
    const containerEntity = this.findContainerEntityCoverBoundary(e.x, e.y, left, top, right, bottom)
    if (containerEntity) {
      this.startContainerSelection()
      this.handleContainerSelection(containerEntity)
      this.handleDefaultMoveInMoving(e)
      this.handleMoveOutline()
    } else {
      this.endContainerSelection()
      this.handleDefaultMoveInMoving(e)
      this.handleMoveOutline()
    }
  }

  private handlePointMoveInCreatingConnector(e: PointerEvent) {
    // console.log('4========== x= ' + e.x + ',  y = ' + e.y)
    const theControllerLayer = this._editorContext.controllerLayer as ControllerLayer
    const connector = theControllerLayer.getEditorItem(0) as Connector
    const editorItem = this._editor.findEditorItem(e.x, e.y, false)
    const isEdge = editorItem
      ? this._editor.hasEditorItemJoint(editorItem, e.x, e.y) && !editorItem.fixed && !((editorItem as Item).parent instanceof Connector)
      : false
    //console.log(`create connector ...1 ${editorItem !== connector.source} ${isEdge}`)
    if (editorItem && isEdge) {
      // && editorItem !== connector.source) {
      //console.log(`create connector ...2`)
      const inEditorItem = this._editor.isInEditorItem(editorItem, e.x, e.y)
      const targetPoint = this._editor.findEditorItemJoint(editorItem, e.x, e.y, inEditorItem)
      const endDirection = this._editor.findConnectorDirection(editorItem, e.x, e.y)
      // const targetJoint = new Point2(targetPoint.x - editorItem.left, targetPoint.y - editorItem.top)
      connector.endDirection = endDirection
      connector.target = editorItem as Entity
      connector.targetJoint = targetPoint
      connector.target.addTargetConnector(connector)
    } else {
      //console.log(`create connector ...3`)
      if (connector.target) {
        connector.target.removeTargetConnector(connector)
      }
      connector.target = undefined
      connector.end = new Point2((e.x - this._editor.horizontalSpace) / this._editor.zoom, (e.y - this._editor.verticalSpace) / this._editor.zoom)
      //console.log(`connector end is x= ${(e.x - this.horizontalSpace) / this._zoom} e.x=${e.x} connector start is x = ${connector.start.x}`)
    }
  }

  private handleRangeSelecting(e: PointerEvent) {
    //console.log(`range selecting ${this._startPointX} ${this._startPointY} ${e.x} ${e.y}`)
    let left = Math.min(this._editorContext.startPointX, e.x)
    let top = Math.min(this._editorContext.startPointY, e.y)
    let width = Math.abs(this._editorContext.startPointX - e.x)
    let height = Math.abs(this._editorContext.startPointY - e.y)
    this._editorContext.rangeSelectionShape.boundary = Rectangle.makeLTWH(left, top, width, height)
    if (!this._editorContext.rangeLayer.hasNode(this._editorContext.rangeSelectionShape)) {
      this._editorContext.rangeLayer.addNode(this._editorContext.rangeSelectionShape)
    }
  }

  private createTextBoxInConnector(connector: Connector, x: number, y: number) {
    const textBox = new ShapeEntity(x - 40, y - 15, 40, 20)
    textBox.text = 'text'
    // textBox.fillColor = Colors.Transparent
    // textBox.strokeColor = Colors.Transparent
    textBox.stroked = false
    textBox.filled = false
    connector.addItem(textBox)
  }

  private checkConnectorsWhenMoving(editorItem: Item, alignMoveX: number, alignMoveY: number) {
    this.checkAndUpdateConnectorsWhenMoving(editorItem, alignMoveX, alignMoveY)
    if (editorItem.isContainer) {
      for (let i = 0; i < editorItem.items.length; i++) {
        const child = editorItem.items[i]
        this.checkConnectorsWhenMoving(child as Item, alignMoveX, alignMoveY)
      }
    }
  }

  private checkAndUpdateConnectorsWhenMoving(editorItem: Item, alignMoveX: number, alignMoveY: number) {
    const sourceConnectorCount = editorItem.getSourceConnectorCount()
    const targetConnectorCount = editorItem.getTargetConnectorCount()
    const theSelectionLayer = this._editor.selectionLayer as SelectionLayer
    const count = theSelectionLayer.getEditorItemCount()
    for (let j = 0; j < sourceConnectorCount; j++) {
      const connector = editorItem.getSourceConnector(j)
      let connectorInSelection = false
      for (let k = 0; k < count; k++) {
        const checkItem = theSelectionLayer.getEditorItem(k) as Item
        if (checkItem === connector) {
          connectorInSelection = true
        }
      }
      if (connector.source === editorItem) {
        // connector.updateSourceJoint()
        // if (connector.sourceJoint) {
        //  connector.sourceJoint = new Point2(connector.sourceJoint.x + e.x / this._zoom - this._startPointX / this._zoom, connector.sourceJoint.y + e.y / this._zoom - this._startPointY / this._zoom)
        // }
        if (connectorInSelection) {
          connector.autoRefreshOrthogonalPoints = false
          connector.start = new Point2(connector.start.x + alignMoveX, connector.start.y + alignMoveY)
          connector.autoRefreshOrthogonalPoints = true
        } else {
          connector.start = new Point2(connector.start.x + alignMoveX, connector.start.y + alignMoveY)
        }
      }
    }
    for (let j = 0; j < targetConnectorCount; j++) {
      const connector = editorItem.getTargetConnector(j)
      let connectorInSelection = false
      for (let k = 0; k < count; k++) {
        const checkItem = theSelectionLayer.getEditorItem(k) as Item
        if (checkItem === connector) {
          connectorInSelection = true
        }
      }
      if (connector.target === editorItem) {
        // connector.updateTargetJoint()
        // connector.end = new Point2(connector.end.x + e.x - this._startPointX, connector.end.y + e.y - this._startPointY)
        if (connectorInSelection) {
          connector.autoRefreshOrthogonalPoints = false
          connector.end = new Point2(connector.end.x + alignMoveX, connector.end.y + alignMoveY)
          connector.autoRefreshOrthogonalPoints = true
        } else {
          connector.end = new Point2(connector.end.x + alignMoveX, connector.end.y + alignMoveY)
        }
        //connector.end = new Point2(connector.end.x + e.x - this._startPointX, connector.end.y + e.y - this._startPointY)
        //console.log(`end is connector.end.x = ${connector.end.x} connector.end.y = ${connector.end.y} item.x = ${editorItem.left} item.y = ${editorItem.top}`)
      }
    }
  }
  private startMoveOutline() {
    this._editorContext.moveLayer.addNode(this._editorContext.selectionOutlineShape)
  }

  private endMoveOutline() {
    this._editorContext.moveLayer.removeNode(this._editorContext.selectionOutlineShape)
  }

  private handleMoveOutline() {
    //Don't show outline if only connector selected
    if (this._editor.selectionLayer.getEditorItemCount() === 1 && this._editor.selectionLayer.getEditorItem(0) instanceof Connector) {
      this._editorContext.selectionOutlineShape.boundary = Rectangle.makeLTWH(0, 0, 0, 0)
      return
    }
    const [left, top, right, bottom] = this._editor.getSelectionBoundary()
    this._editorContext.selectionOutlineShape.boundary = Rectangle.makeLTWH(left, top, right - left, bottom - top)
    //this._selectionOutlineShape.boundary = Rectangle.makeLTWH(left * this._zoom, top * this._zoom, (right - left) * this._zoom, (bottom - top) * this._zoom)
  }

  private handleTableActiveCellShape() {
    if (this._editorContext.targetItem) {
      const margin = EditorUtils.tableActiveCellMargin
      this._editorContext.tableActiveCellShape.transform = this._editorContext.targetItem.shape.worldTransform
      this._editorContext.tableActiveCellShape.boundary = Rectangle.makeLTWH(
        margin,
        margin,
        this._editorContext.targetItem.width - margin * 2,
        this._editorContext.targetItem.height - margin * 2,
      )
      this._editor.triggerTableTextEditStart()
    } else {
      this._editorContext.tableActiveCellShape.transform = new Matrix()
      this._editorContext.tableActiveCellShape.boundary = Rectangle.makeLTWH(0, 0, 0, 0)
      this._editor.triggerTableTextEditEnd()
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private removeItemsFromContainer(e: PointerEvent) {
    let requireRemove = false
    const [left, top, right, bottom] = this._editor.getSelectionBoundary()
    if (this._editor.selectionLayer.getEditorItemCount() > 0) {
      const firstSelection = this._editor.selectionLayer.getEditorItem(0) as Item
      if (firstSelection.parent) {
        const parent = firstSelection.parent
        const [pLeft, pTop, pRight, pBottom] = Editor.getItemsBoundary([firstSelection.parent])
        if ((left >= pLeft && top >= pTop && right <= pRight && bottom <= pBottom) || !(parent instanceof ContainerEntity)) {
          requireRemove = false
        } else {
          requireRemove = true
        }
      }
      //if(firstSelection.parent && !firstSelection.parent.shape.intersects(left, top, right, bottom)) {
      //  requireRemove = true
      //}
    }
    if (requireRemove) {
      const count = this._editor.selectionLayer.getEditorItemCount()
      for (let i = 0; i < count; i++) {
        const selection = this._editor.selectionLayer.getEditorItem(i) as Item
        if (selection.parent) {
          const [pLeft, pTop] = Editor.getItemsBoundary([selection.parent])
          const left = selection.left + pLeft
          const top = selection.top + pTop
          const rotation = selection.rotation.radius + selection.parent.rotation.radius
          selection.boundary = Rectangle.makeLTWH(left, top, selection.width, selection.height)
          selection.rotation = new Rotation(rotation)
          selection.parent.removeItem(selection)
          this._editor.contentLayer.addEditorItem(selection)
        }
      }
    }
  }

  /**
   * 返回命中的位置
   * @param editorItem
   * @param x
   * @param y
   * @returns
   */
  private findEditorItemPoint(editorItem: EditorItem, x: number, y: number): Point2 {
    if (editorItem.shape.worldInverseTransform) {
      const point = editorItem.shape.worldInverseTransform.makePoint(new Point2(x, y))
      return point
    }
    return new Point2(x / this._editor.zoom, y / this._editor.zoom)
  }

  /**
   * Check if we can modify row height or column width
   * @param tableEntity
   * @param x
   * @param y
   * @returns
   */
  private isTableRowResizable(tableEntity: TableEntity, x: number, y: number): [boolean, number] {
    const rowCount = tableEntity.rowCount
    const columnCount = tableEntity.columnCount
    const items = tableEntity.items

    let pos = 0
    for (let i = 0; i < rowCount - 1; i++) {
      const item = items[i * columnCount]
      pos += item.height
      if (pos <= y + Editor.TEST_RADIUS && pos >= y - Editor.TEST_RADIUS) {
        return [true, i]
      }
    }
    return [false, 0]
  }

  /**
   * Check if we can modify row height or column width
   * @param tableEntity
   * @param x
   * @param y
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private isTableColumnResizable(tableEntity: TableEntity, x: number, y: number): [boolean, number] {
    const columnCount = tableEntity.columnCount
    const items = tableEntity.items

    let pos = 0
    for (let i = 0; i < columnCount - 1; i++) {
      const item = items[i]
      pos += item.width
      if (pos <= x + Editor.TEST_RADIUS && pos >= x - Editor.TEST_RADIUS) {
        return [true, i]
      }
    }
    return [false, 0]
  }

  /**
   * Find pos in table
   * @param tableEntity
   * @param x
   * @param y
   * @returns
   */
  private findTableItemIndex(tableEntity: TableEntity, x: number, y: number): number {
    //const columnCount = tableEntity.columnCount
    //const rowCount = tableEntity.rowCount
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

  /**
   * update cursor location in text
   * @param editorItem
   * @param x
   * @param y
   */

  private updateTextCursorLocation(editorItem: EditorItem, x: number, y: number) {
    // this._textArea.style.position = 'absolute'
    //const parent = this._textArea.parentElement
    //const scrollContainer = parent?.parentElement?.parentElement?.parentElement
    const scrollContainer = document.getElementById('content-container')
    const worldTransform = editorItem.worldTransform
    // const pos = this.getRelativePosition(parent)
    if (parent && scrollContainer) {
      //const position = worldTransform.makePoint(new Point2(0, 0))
      const point = worldTransform.makePoint(new Point2(x, y))
      //const pos = parent.getBoundingClientRect()
      //this._textArea.style.left = (Editor.SHADOW_SIZE + (editorItem.left + x) * this._zoom + this.horizontalSpace  + pos.left - scrollContainer.scrollLeft) + 'px'
      //this._textArea.style.top = (Editor.SHADOW_SIZE + (editorItem.top + y) * this._zoom + this.verticalSpace  + pos.top - scrollContainer.scrollTop) + 'px'
      this._editorContext.textArea.style.left =
        Editor.SHADOW_SIZE + point.x * this._editor.zoom + this._editor.horizontalSpace - scrollContainer.scrollLeft + 'px'
      this._editorContext.textArea.style.top = Editor.SHADOW_SIZE + point.y * this._editor.zoom + this._editor.verticalSpace - scrollContainer.scrollTop + 'px'
      //console.log(`'Check left = ${editorItem.left}  x=${x} text.left = ${this._textArea.style.left}  scroll=${scrollContainer.scrollLeft}`)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private startRangeSelecting(e: PointerEvent) {
    this._editorContext.inRangeSelecting = true
  }

  private checkAndPopulateItemInRangeSelection(item: Item, left: number, top: number, right: number, bottom: number) {
    const [boundaryLeft, boundaryTop, boundaryRight, boundaryBottom] = Editor.getItemsBoundary([item])
    if (boundaryLeft >= left && boundaryTop >= top && boundaryRight <= right && boundaryBottom <= bottom) {
      this._editor.selectionLayer.addEditorItem(item)
    } else if (
      item instanceof ContainerEntity &&
      Math.max(boundaryLeft, left) <= Math.min(boundaryRight, right) &&
      Math.max(boundaryTop, top) <= Math.min(boundaryBottom, bottom)
    ) {
      item.items.forEach((child) => {
        if (!child.fixed) {
          this.checkAndPopulateItemInRangeSelection(child as Item, left, top, right, bottom)
        }
      })
    }
  }

  private endRangeSelecting(e: PointerEvent) {
    this._editorContext.inRangeSelecting = false
    this._editorContext.rangeLayer.removeNode(this._editorContext.rangeSelectionShape)
    let left = (Math.min(this._editorContext.startPointX, e.x) - this._editor.horizontalSpace) / this._editor.zoom
    let top = (Math.min(this._editorContext.startPointY, e.y) - this._editor.verticalSpace) / this._editor.zoom
    let right = (Math.max(this._editorContext.startPointX, e.x) - this._editor.horizontalSpace) / this._editor.zoom
    let bottom = (Math.max(this._editorContext.startPointY, e.y) - this._editor.verticalSpace) / this._editor.zoom
    let itemCount = this._editor.contentLayer.getEditorItemCount()
    for (let i = 0; i < itemCount; i++) {
      let item = this._editor.contentLayer.getEditorItem(i) as Item
      this.checkAndPopulateItemInRangeSelection(item, left, top, right, bottom)
    }
    this._editor.triggerSelectionChange()
  }

  private startContainerSelection() {
    this._editorContext.inContainerSelection = true
    this._editorContext.containerLayer.addNode(this._editorContext.containerSelectionShape)
  }

  private endContainerSelection() {
    this._editorContext.inContainerSelection = false
    this._editorContext.containerLayer.removeNode(this._editorContext.containerSelectionShape)
  }

  private handleContainerSelection(container: ContainerEntity) {
    //console.log(`Container 1... `)
    if (this._editorContext.inContainerSelection) {
      //console.log(`Container 2 ... `)
      const containerBoundary = Editor.getItemsBoundary([container])
      this._editorContext.containerSelectionShape.boundary = Rectangle.makeLTWH(
        containerBoundary[0],
        containerBoundary[1],
        containerBoundary[2] - containerBoundary[0],
        containerBoundary[3] - containerBoundary[1],
      )
    } else {
      //console.log(`Container 3 ... `)
      this._editorContext.containerSelectionShape.boundary = Rectangle.makeLTWH(0, 0, 0, 0)
    }
  }

  private finishContainerSelection(e: PointerEvent) {
    const [left, top, right, bottom] = this._editor.getSelectionBoundary()
    const containerEntity = this.findContainerEntityCoverBoundary(e.x, e.y, left, top, right, bottom)
    if (this._editorContext.inContainerSelection && containerEntity) {
      let selectionCount = this._editor.selectionLayer.getEditorItemCount()
      for (let i = 0; i < selectionCount; i++) {
        const selection = this._editor.selectionLayer.getEditorItem(i) as Item
        if (selection.parent === containerEntity) {
          //Do nothing here
        } else if (selection === containerEntity) {
          // It occurs when container selected and then create new shape into the container
          //Do nothing here
        } else if (selection instanceof Connector) {
          // Do nothing for Connector
        } else {
          const [sLeft, sTop] = Editor.getItemsBoundary([selection])
          const [cLeft, cTop] = Editor.getItemsBoundary([containerEntity])
          const left = sLeft - cLeft
          const top = sTop - cTop
          const rotation = selection.rotation.radius - containerEntity.rotation.radius

          selection.boundary = Rectangle.makeLTWH(left, top, selection.width, selection.height)
          selection.rotation = new Rotation(rotation)
          if (selection.parent) {
            selection.parent.removeItem(selection)
            containerEntity.addItem(selection)
          } else {
            this._editor.contentLayer.removeEditorItem(selection)
            containerEntity.addItem(selection)
          }
        }
      }
      // if (this.target) {
      //   this.target.items.forEach((item) => {
      //     this.selectionLayer.addEditorItem(item)
      //   })
      // }
      this._editorContext.inContainerSelection = false
      this._editorContext.containerLayer.removeNode(this._editorContext.containerSelectionShape)
      //this.selectionLayer.removeAllEditorItems()
    }
  }

  private checkIfSelectionInContainer(containerEntity: ContainerEntity): boolean {
    const [left, top, right, bottom] = this._editor.getSelectionBoundary()
    const [cLeft, cTop, cRight, cBottom] = Editor.getItemsBoundary([containerEntity])
    if (cLeft <= left && cTop <= top && cRight >= right && cBottom >= bottom) {
      return true
    }
    // //console.log(`check selection in container 3... ${containerEntity.left} ${containerEntity.top} ${containerEntity.right} ${containerEntity.bottom} ${left} ${top} ${right} ${bottom}`)
    // if (containerEntity.left <= left && containerEntity.top <= top && containerEntity.right >= right && containerEntity.bottom >= bottom) {
    //   //console.log(`check selection in container 4... ${containerEntity}`)
    //   return true
    // }
    return false
  }

  /**
   * Check if container exists on x,y and within boundary left, top, right and bottom.
   * @param x
   * @param y
   * @param left
   * @param top
   * @param right
   * @param bottom
   * @private
   */
  private findContainerEntityCoverBoundary(x: number, y: number, left: number, top: number, right: number, bottom: number): ContainerEntity | undefined {
    let result
    const count = this._editor.contentLayer.getEditorItemCount()
    for (let i = 0; i < count; i++) {
      const editorItem = this._editor.contentLayer.getEditorItem(i) as Item
      const [cLeft, cTop, cRight, cBottom] = Editor.getItemsBoundary([editorItem])
      if (
        editorItem instanceof ContainerEntity &&
        !(editorItem instanceof TableEntity) &&
        cLeft <= left &&
        cTop <= top &&
        cRight >= right &&
        cBottom >= bottom
      ) {
        const containerEntity = this.findContainerEntityInContainerCoverBoundary(x, y, editorItem, left, top, right, bottom)
        //console.log(`Enter container now with container = ${containerEntity}, left=${containerEntity ? containerEntity.left : 0}...`)
        if (containerEntity) {
          result = containerEntity
        }
      }
    }
    return result
  }

  /**
   * Check if container exists on x,y and within boundary left, top, right and bottom.
   * @param x
   * @param y
   * @param container
   * @param left
   * @param top
   * @param right
   * @param bottom
   * @private
   */
  private findContainerEntityInContainerCoverBoundary(
    x: number,
    y: number,
    container: ContainerEntity,
    left: number,
    top: number,
    right: number,
    bottom: number,
  ): ContainerEntity | undefined {
    let result
    const count = container.items.length
    for (let i = 0; i < count; i++) {
      const editorItem = container.items[i] as Item
      const [cLeft, cTop, cRight, cBottom] = Editor.getItemsBoundary([editorItem])
      //console.log(`Finding items ${x}    ${y}    ==== ${shape.position.x}    ${shape.position.y}`)
      //console.log(`check container: ${editorItem instanceof ContainerEntity}`)
      if (
        editorItem instanceof ContainerEntity &&
        !(editorItem instanceof TableEntity) &&
        cLeft <= left &&
        cTop <= top &&
        cRight >= right &&
        cBottom >= bottom
      ) {
        const containerEntity = this.findContainerEntityInContainerCoverBoundary(x, y, editorItem, left, top, right, bottom)
        if (containerEntity) {
          result = containerEntity
        }
      }
    }
    if (!result) {
      //console.log(`check container now....`)
      let inSelection = false
      //Check and Skip if current container is in selection (moving container). However, skip check if in creating shapes.
      if (!this._editor.action || this._editor.action.items.length === 0) {
        const selectionCount = this._editor.selectionLayer.getEditorItemCount()
        for (let j = 0; j < selectionCount; j++) {
          const selection = this._editor.selectionLayer.getEditorItem(j)
          if (container === selection) {
            inSelection = true
          }
        }
      }
      //TODO: Need to check & explain why following code here
      // const controlCount = this.controllerLayer.getEditorItemCount()
      // for (let j = 0; j < controlCount; j++) {
      //   const selection = this.controllerLayer.getEditorItem(j)
      //   if (editorItem === selection) {
      //     console.log(`check container now for controller ....`)
      //     inSelection = true
      //   }
      // }
      if (!inSelection) {
        result = container
      }
      //console.log(
      //  `check container now.... result= ${result}  selectionCount = ${selectionCount}  controlCount = ${controlCount} inSelection = ${inSelection}`,
      //)
    }

    return result
  }

  /**
   * Check if container exists on x,y
   * @param x
   * @param y
   * @private
   */
  private findContainerEntity(x: number, y: number): ContainerEntity | undefined {
    let result
    const count = this._editor.contentLayer.getEditorItemCount()
    for (let i = 0; i < count; i++) {
      const editorItem = this._editor.contentLayer.getEditorItem(i)
      const shape = editorItem.shape
      if (
        editorItem instanceof ContainerEntity &&
        !(editorItem instanceof TableEntity) &&
        shape.intersects(x - Editor.TEST_RADIUS, y - Editor.TEST_RADIUS, Editor.TEST_SIZE, Editor.TEST_SIZE)
      ) {
        const containerEntity = this.findContainerEntityInContainer(x, y, editorItem)
        //console.log(`Enter container now with container = ${containerEntity}, left=${containerEntity ? containerEntity.left : 0}...`)
        if (containerEntity) {
          result = containerEntity
        }
      }
    }
    return result
  }

  /**
   * Check if container exists on x,y
   * @param x
   * @param y
   * @param container
   * @private
   */
  private findContainerEntityInContainer(x: number, y: number, container: ContainerEntity): ContainerEntity | undefined {
    let result
    const count = container.items.length
    for (let i = 0; i < count; i++) {
      const editorItem = container.items[i]
      const shape = editorItem.shape
      //console.log(`Finding items ${x}    ${y}    ==== ${shape.position.x}    ${shape.position.y}`)
      //console.log(`check container: ${editorItem instanceof ContainerEntity}`)
      if (
        editorItem instanceof ContainerEntity &&
        !(editorItem instanceof TableEntity) &&
        shape.intersects(x - Editor.TEST_RADIUS, y - Editor.TEST_RADIUS, Editor.TEST_SIZE, Editor.TEST_SIZE)
      ) {
        const containerEntity = this.findContainerEntityInContainer(x, y, editorItem)
        if (containerEntity) {
          result = containerEntity
        }
      }
    }
    if (!result) {
      //console.log(`check container now....`)
      let inSelection = false
      //Check and Skip if current container is in selection (moving container). However, skip check if in creating shapes.
      if (!this._editor.action || this._editor.action.items.length === 0) {
        const selectionCount = this._editor.selectionLayer.getEditorItemCount()
        for (let j = 0; j < selectionCount; j++) {
          const selection = this._editor.selectionLayer.getEditorItem(j)
          if (container === selection) {
            inSelection = true
          }
        }
      }
      //TODO: Need to check & explain why following code here
      // const controlCount = this.controllerLayer.getEditorItemCount()
      // for (let j = 0; j < controlCount; j++) {
      //   const selection = this.controllerLayer.getEditorItem(j)
      //   if (editorItem === selection) {
      //     console.log(`check container now for controller ....`)
      //     inSelection = true
      //   }
      // }
      if (!inSelection) {
        result = container
      }
      //console.log(
      //  `check container now.... result= ${result}  selectionCount = ${selectionCount}  controlCount = ${controlCount} inSelection = ${inSelection}`,
      //)
    }

    return result
  }

  public undo() {
    let operation = this._editor.operationService.getUndoOperation()
    if (operation) {
      switch (operation.type) {
        case OperationType.ADD_ITEMS:
          this.handleOperationUndoAddItems(operation.itemInfos)
          break
        case OperationType.REMOVE_ITEMS:
          this.handleOperationUndoRemoveItems(operation.itemInfos)
          break
        case OperationType.UPDATE_ITEMS:
          this.handleOperationUndoUpdateItems(operation.itemInfos, operation.origItemInfos)
          break
        case OperationType.ADD_SELECTION_ITEMS:
          this.handleOperationUndoAddSelectionItems(operation.itemInfos)
          break
        case OperationType.REMOVE_SELECTION_ITEMS:
          this.handleOperationUndoRemoveSelectionItems(operation.itemInfos)
          break
        case OperationType.SELECT_EDITOR:
          this._editor.triggerEditorOperationEvent(operation, true)
          break
        case OperationType.ADD_EDITOR:
          this._editor.triggerEditorOperationEvent(operation, true)
          break
        case OperationType.REMOVE_EDITOR:
          this._editor.triggerEditorOperationEvent(operation, true)
          break
        case OperationType.RENAME_EDITOR:
          this._editor.triggerEditorOperationEvent(operation, true)
          break
        case OperationType.MOVE_EDITOR:
          this._editor.triggerEditorOperationEvent(operation, true)
          break
        case OperationType.SHAPE_TEXT_EDIT:
          this.handleOperationUndoShapTextEdit(operation)
          break
        case OperationType.TABLE_TEXT_EDIT:
          this.handleOperationUndoTableTextEdit(operation)
          break
        case OperationType.ADD_ITEMS_TO_CONTAINER:
          break
        case OperationType.REMOVE_ITEMS_FROM_CONTAINER:
          break
        case OperationType.UPDATE_DOCUMENT_THEME:
          this._editor.triggerEditorOperationEvent(operation, true)
          break
        default:
          break
      }
      this._editor.operationService.undo()
      this._editor.triggerOperationComplete()
    }
  }

  public redo() {
    let operation = this._editor.operationService.getRedoOperation()
    if (operation) {
      switch (operation.type) {
        case OperationType.ADD_ITEMS:
          this.handleOperationRedoAddItems(operation.itemInfos)
          break
        case OperationType.REMOVE_ITEMS:
          this.handleOperationRedoRemoveItems(operation.itemInfos)
          break
        case OperationType.UPDATE_ITEMS:
          this.handleOperationRedoUpdateItems(operation.itemInfos, operation.origItemInfos)
          break
        case OperationType.ADD_SELECTION_ITEMS:
          this.handleOperationRedoAddSelectionItems(operation.itemInfos)
          break
        case OperationType.REMOVE_SELECTION_ITEMS:
          this.handleOperationRedoRemoveSelectionItems(operation.itemInfos)
          break
        case OperationType.SELECT_EDITOR:
          this._editor.triggerEditorOperationEvent(operation, false)
          break
        case OperationType.ADD_EDITOR:
          this._editor.triggerEditorOperationEvent(operation, false)
          break
        case OperationType.REMOVE_EDITOR:
          this._editor.triggerEditorOperationEvent(operation, false)
          break
        case OperationType.RENAME_EDITOR:
          this._editor.triggerEditorOperationEvent(operation, false)
          break
        case OperationType.MOVE_EDITOR:
          this._editor.triggerEditorOperationEvent(operation, false)
          break
        case OperationType.SHAPE_TEXT_EDIT:
          this.handleOperationRedoShapeTextEdit(operation)
          break
        case OperationType.TABLE_TEXT_EDIT:
          this.handleOperationRedoTableTextEdit(operation)
          break
        case OperationType.ADD_ITEMS_TO_CONTAINER:
          break
        case OperationType.REMOVE_ITEMS_FROM_CONTAINER:
          break
        case OperationType.UPDATE_DOCUMENT_THEME:
          this._editor.triggerEditorOperationEvent(operation, false)
          break
        default:
          break
      }
      this._editor.operationService.redo()
      this._editor.triggerOperationComplete()
    }
  }

  private handleOperationUndoAddItems(items: EditorItemInfo[]) {
    items.forEach((editorItemInfo) => {
      const id = editorItemInfo.id
      this.handleRemoveEditorItem(id)
    })
    this._editor.selectionLayer.removeAllEditorItems()
    this._editor.triggerSelectionChange()
    this._editor.checkAndEndTextEdit()
    this._editorContext.target = undefined
    this._editorContext.targetItem = undefined
    this.handleTableActiveCellShape()
  }

  private handleOperationUndoRemoveItems(items: EditorItemInfo[]) {
    items.forEach((editorItemInfo) => {
      const editorItem = this.handleAddEditorItem(editorItemInfo)
      this._editor.selectionLayer.addEditorItem(editorItem)
      this._editor.triggerSelectionChange()
    })
  }

  /**
   * Items are very different if they are moved into our out from container.
   * @param itemInfos
   * @param origItemInfos
   * @private
   */
  private handleOperationUndoUpdateItems(itemInfos: EditorItemInfo[], origItemInfos: EditorItemInfo[]) {
    const selectedItems = this._editorContext.selectionLayer.getAllEditorItems()
    let restoreSelectionOutline = selectedItems.length === origItemInfos.length
    if (itemInfos.length === origItemInfos.length) {
      origItemInfos.forEach((origEditorItemInfo, index) => {
        this.handleUpdateEditorItem(origEditorItemInfo, itemInfos[index])
        if (restoreSelectionOutline) {
          const found = this.findSelectedItem(origEditorItemInfo, selectedItems)
          if (!found) {
            restoreSelectionOutline = false
          }
        }
      })
      if (restoreSelectionOutline) {
        this.restoreSelectionOutline(selectedItems)
      }
    }
  }

  private findEditorItemById(id: string, editorItems: EditorItem[]): EditorItem | undefined {
    for (let i = 0; i < editorItems.length; i++) {
      const editorItem = editorItems[i]
      if (editorItem.id === id) {
        return editorItem
      }
      let foundEditorItem = this.findEditorItemById(id, editorItem.items)
      if (foundEditorItem) {
        return foundEditorItem
      }
    }
    return undefined
  }

  private findSelectedItem(editorItemInfo: EditorItemInfo, selectedItems: EditorItem[]) {
    let found = false
    for (let i = 0; i < selectedItems.length; i++) {
      const selectedItem = selectedItems[i]
      if (selectedItem.id === editorItemInfo.id) {
        found = true
      }
    }
    for (let i = 0; i < editorItemInfo.items.length; i++) {
      const childInfo = editorItemInfo.items[i]
      const foundAsChild = this.findSelectedItem(childInfo, selectedItems)
      if (foundAsChild) {
        found = true
      }
    }
    return found
  }

  private restoreSelectionOutline(selectedItems: EditorItem[]) {
    const newSelectedItems: EditorItem[] = []
    const editorItems = this._editorContext.contentLayer.getAllEditorItems()
    selectedItems.forEach((selectedItem) => {
      const item = this.findEditorItemById(selectedItem.id, editorItems)
      if (item) {
        newSelectedItems.push(item)
      }
    })
    if (newSelectedItems.length > 0) {
      this._editorContext.selectionLayer.removeAllEditorItems()
      this._editor.selectionLayer.addEditorItems(newSelectedItems)
    }
    this.handleMoveOutline()
  }

  private handleOperationUndoAddSelectionItems(items: EditorItemInfo[]) {
    items.forEach((editorItemInfo) => {
      const id = editorItemInfo.id
      this.handleRemoveEditorItem(id)
    })
  }

  private handleOperationUndoRemoveSelectionItems(items: EditorItemInfo[]) {
    items.forEach((editorItemInfo) => {
      this.handleAddEditorItem(editorItemInfo)
    })
  }

  private handleOperationUndoShapTextEdit(operation: Operation) {
    this.handleShapeTextEdit(operation, true)
  }

  private handleOperationUndoTableTextEdit(operation: Operation) {
    this.handleTableTextEdit(operation, true)
  }

  private handleOperationRedoAddItems(items: EditorItemInfo[]) {
    items.forEach((editorItemInfo) => {
      const editorItem = this.handleAddEditorItem(editorItemInfo)
      this._editor.selectionLayer.addEditorItem(editorItem)
      this._editor.triggerSelectionChange()
    })
  }

  private handleOperationRedoRemoveItems(items: EditorItemInfo[]) {
    items.forEach((editorItemInfo) => {
      const id = editorItemInfo.id
      this.handleRemoveEditorItem(id)
    })
    this._editor.selectionLayer.removeAllEditorItems()
    this._editor.triggerSelectionChange()
    this._editor.checkAndEndTextEdit()
    this._editorContext.target = undefined
    this._editorContext.targetItem = undefined
    this.handleTableActiveCellShape()
  }

  /**
   * Items are very different if they are moved into our out from container.
   * @param itemInfos
   * @param origItemInfos
   * @private
   */
  private handleOperationRedoUpdateItems(itemInfos: EditorItemInfo[], origItemInfos: EditorItemInfo[]) {
    const selectedItems = this._editorContext.selectionLayer.getAllEditorItems()
    let restoreSelectionOutline = selectedItems.length === itemInfos.length
    if (itemInfos.length === origItemInfos.length) {
      itemInfos.forEach((editorItemInfo, index) => {
        this.handleUpdateEditorItem(editorItemInfo, origItemInfos[index])
        if (restoreSelectionOutline) {
          const found = this.findSelectedItem(editorItemInfo, selectedItems)
          if (!found) {
            restoreSelectionOutline = false
          }
        }
      })
      if (restoreSelectionOutline) {
        this.restoreSelectionOutline(selectedItems)
      }
    }
  }

  private handleOperationRedoAddSelectionItems(items: EditorItemInfo[]) {
    items.forEach((editorItemInfo) => {
      this.handleAddEditorItem(editorItemInfo)
    })
  }

  private handleOperationRedoRemoveSelectionItems(items: EditorItemInfo[]) {
    items.forEach((editorItemInfo) => {
      const id = editorItemInfo.id
      this.handleRemoveEditorItem(id)
    })
  }

  private handleOperationRedoShapeTextEdit(operation: Operation) {
    this.handleShapeTextEdit(operation, false)
  }

  private handleOperationRedoTableTextEdit(operation: Operation) {
    this.handleTableTextEdit(operation, false)
  }

  private handleRemoveEditorItem(id: string) {
    let itemCount = this._editorContext.contentLayer.getEditorItemCount()
    for (let i = itemCount - 1; i >= 0; i--) {
      let editorItem = this._editorContext.contentLayer.getEditorItem(i) as Item
      if (editorItem.id === id) {
        this._editorContext.contentLayer.removeEditorItemAt(i)
        break
      }
      let found = this.removeItemById(editorItem, id)
      if (found) {
        break
      }
    }
  }

  private handleAddEditorItem(editorItemInfo: EditorItemInfo) {
    let editorItem = OperationHelper.loadItem(editorItemInfo, this._editor)
    this._editorContext.contentLayer.addEditorItem(editorItem)
    return editorItem
  }

  private handleAddEditorItemIntoEditorItem(editorItemInfo: EditorItemInfo, parentId: string) {
    let parent = this._editor.findEditorItemById(parentId)
    if (parent) {
      const parentItem = parent as Item
      let editorItem = OperationHelper.loadItem(editorItemInfo, this._editor)
      parentItem.addItem(editorItem)
    }
  }

  private containsItemIdInContainer(itemId: string, containerInfo: EditorItemInfo) {
    if (containerInfo.id === itemId) {
      return true
    }
    for (let i = 0; i < containerInfo.items.length; i++) {
      const inContainer = this.containsItemIdInContainer(itemId, containerInfo.items[i])
      if (inContainer) {
        return true
      }
    }
    return false
  }

  private handleUpdateEditorItem(toEditorItemInfo: EditorItemInfo, fromEditorItemInfo: EditorItemInfo): boolean {
    //Id is difference if item is moved from or out of container.
    if (toEditorItemInfo.id === fromEditorItemInfo.id) {
      let items = this._editorContext.contentLayer.getAllEditorItems()
      let count = items.length
      for (let i = count - 1; i >= 0; i--) {
        let item = items[i] as Item
        if (item.id === toEditorItemInfo.id) {
          this.updateEditorItemDetail(item, toEditorItemInfo)
          return true
        }
        let found = this.updateEditorItem(item, toEditorItemInfo)
        if (found) {
          return true
        }
      }
      return false
    } else {
      const targetInContainer = this.containsItemIdInContainer(toEditorItemInfo.id, fromEditorItemInfo)
      if (targetInContainer) {
        this.handleRemoveEditorItem(toEditorItemInfo.id)
        this.handleAddEditorItem(toEditorItemInfo)
      } else {
        this.handleRemoveEditorItem(toEditorItemInfo.id)
        this.handleRemoveEditorItem(fromEditorItemInfo.id)
        this.handleAddEditorItem(toEditorItemInfo)
      }
      return true
    }
  }

  private updateEditorItem(item: Item, editorItemInfo: EditorItemInfo): boolean {
    let count = item.items.length
    for (let i = count - 1; i >= 0; i--) {
      let childItem = item.items[i] as Item
      if (childItem.id === editorItemInfo.id) {
        this.updateEditorItemDetail(childItem, editorItemInfo)
        return true
      }
      let found = this.updateEditorItem(childItem, editorItemInfo)
      if (found) {
        return true
      }
    }
    return false
  }

  private updateEditorItemDetail(item: Item, editorItemInfo: EditorItemInfo) {
    //item.type =  editorItemInfo.type
    //item.boundary = Rectangle.makeLTWH(editorItemInfo.left, editorItemInfo.top, editorItemInfo.width, editorItemInfo.height)
    //item.rotation = new Rotation(item.width / 2, item.height / 2, editorItemInfo.rotation)
    //item.text = editorItemInfo.text

    this.handleRemoveEditorItem(item.id)
    return this.handleAddEditorItem(editorItemInfo)
  }

  private handleShapeTextEdit(operation: Operation, isUndo: boolean) {
    let editorItemInfo = operation.origItemInfos[0]
    let startIndex = operation.origTextStart
    let endIndex = operation.origTextEnd
    if (!isUndo) {
      editorItemInfo = operation.itemInfos[0]
      startIndex = operation.textStart
      endIndex = operation.textEnd
    }
    const editorItem = this._editor.findEditorItemById(editorItemInfo.id)
    if (editorItem) {
      const newEditorItem = this.updateEditorItemDetail(editorItem as Item, editorItemInfo)
      this._editor.selectionLayer.removeAllEditorItems()
      this._editor.selectionLayer.addEditorItem(newEditorItem)
      this._editorContext.target = newEditorItem
      this._editorContext.textArea.focus()
      this._editor.checkAndStartTextEdit()
      newEditorItem.shape.focused = true
      newEditorItem.shape.select(startIndex, endIndex)
      //editorItem.shape.enter(150, 150)
      //this.updateTextCursorLocation(editorItem, 380, 280)
      this._editorContext.textArea.textContent = ''
    }
  }

  private handleTableTextEdit(operation: Operation, isUndo: boolean) {
    let editorItemInfo = operation.origItemInfos[0]
    let startIndex = operation.origTextStart
    let endIndex = operation.origTextEnd
    let tableCellIndex = operation.tableCellIndex
    if (!isUndo) {
      editorItemInfo = operation.itemInfos[0]
      startIndex = operation.textStart
      endIndex = operation.textEnd
    }
    const editorItem = this._editor.findEditorItemById(editorItemInfo.id)
    if (editorItem) {
      const newEditorItem = this.updateEditorItemDetail(editorItem as Item, editorItemInfo)
      const newTableEntity = newEditorItem as TableEntity
      const tableCell = newTableEntity.items[tableCellIndex]
      this._editor.selectionLayer.removeAllEditorItems()
      this._editor.selectionLayer.addEditorItem(newEditorItem)
      this._editorContext.target = newEditorItem
      this._editorContext.targetItem = tableCell
      this._editorContext.targetItemIndex = tableCellIndex
      this._editorContext.textArea.focus()
      this._editor.checkAndStartTextEdit()
      tableCell.shape.focused = true
      tableCell.shape.select(startIndex, endIndex)
      //editorItem.shape.enter(150, 150)
      //this.updateTextCursorLocation(editorItem, 380, 280)
      this._editorContext.textArea.textContent = ''
      this.handleTableActiveCellShape()
    }
  }

  private removeItemById(item: Item, id: string): boolean {
    let count = item.items.length
    for (let i = count - 1; i >= 0; i--) {
      let childItem = item.items[i] as Item
      if (childItem.id === id) {
        item.removeItemAt(i)
        return true
      }
      let found = this.removeItemById(childItem, childItem.id)
      if (found) {
        return true
      }
    }
    return false
  }

  private cleanupOperation() {
    if (this._editorContext.target) {
      this._editorContext.target.shape.focused = false
    }
    this._editor.checkAndEndTextEdit()
    //this._editor.finishTextEditOperation()
    if (this._editorContext.target) {
      this._editorContext.target.shape.focused = false
    }
    if (this._editorContext.targetItem) {
      this._editorContext.targetItem.shape.focused = false
    }
    this._editorContext.target = undefined
    this._editorContext.targetTime = 0
    this._editorContext.targetColumnResizing = false
    this._editorContext.targetRowResizing = false
    this._editorContext.targetItem = undefined
    this._editorContext.targetItemIndex = -1
    this.handleTableActiveCellShape()
  }

  private updateSelection(clickedEditorItem: EditorItem) {
    const theSelectionLayer = this._editor.selectionLayer as SelectionLayer
    theSelectionLayer.inHolder = true
    theSelectionLayer.removeAllEditorItems()
    theSelectionLayer.addEditorItem(clickedEditorItem)
    this._editor.triggerSelectionChange()
    this._editorContext.targetColumnResizing = false
    this._editorContext.targetRowResizing = false
    this._editor.beginOperation()
    this._editor.checkAndEndTextEdit()
    //this._editor.finishTextEditOperation()
    this.startMoveOutline()
    if (this._editorContext.target) {
      this._editorContext.target.shape.focused = false
    }
    if (this._editorContext.targetItem) {
      this._editorContext.targetItem.shape.focused = false
    }
    this._editorContext.targetItem = undefined
    this._editorContext.targetItemIndex = -1
  }

  private removeSelection() {
    const theSelectionLayer = this._editor.selectionLayer as SelectionLayer
    theSelectionLayer.removeAllEditorItems()
    this._editor.triggerSelectionChange()
    this.cleanupOperation()
  }

  private createConnector(clickedEditorItem: EditorItem, e: PointerEvent) {
    const targetPoint = this._editor.findEditorItemJoint(clickedEditorItem, e.x, e.y, false)
    //const horizontal = this.checkIfConnectorHorizontal(clickedEditorItem, e.x, e.y)
    const startDirection = this._editor.findConnectorDirection(clickedEditorItem, e.x, e.y)
    //console.log(`Check horizontal : ${horizontal}`)
    const targetEntity = clickedEditorItem as Entity
    const theControllerLayer = this._editorContext.controllerLayer as ControllerLayer
    this._editorContext.inCreatingConnector = true
    const worldTargetPoint = clickedEditorItem.worldTransform.makePoint(targetPoint)
    //const startPoint = new Point2(worldTargetPoint.x - this.horizontalSpace, worldTargetPoint.y - this.verticalSpace)
    const connector = new Connector(worldTargetPoint, new Point2(worldTargetPoint.x + 10, worldTargetPoint.y + 10), startDirection)
    // const sourceJoint = new Point2(targetPoint.x - targetEntity.left, targetPoint.y - targetEntity.top)
    connector.source = targetEntity
    connector.sourceJoint = targetPoint
    //Need to set up startDirection again since constructor may reset it cause empty source and empty target.
    connector.startDirection = startDirection
    theControllerLayer.removeAllEditorItems()
    theControllerLayer.addEditorItem(connector)
    targetEntity.addSourceConnector(connector)
    this.cleanupOperation()
  }
  private handleActionOperation() {
    if (this._editor.action) {
      this._editor.selectionLayer.removeAllEditorItems()
      this._editor.selectionLayer.addEditorItems(this._editor.action.items)
      if (this._editor.action.items.length === 1 && this._editor.action.items[0] instanceof CodeContainer) {
        this._editor.beginCodeEdit()
      }
      let editorItemInfos = OperationHelper.saveEditorItems(this._editor.action.items)
      let operation = new Operation(this._editor, OperationType.ADD_ITEMS, editorItemInfos, true, [])
      this._editor.operationService.addOperation(operation)
      this._editor.triggerOperationChange()
      this._editor.triggerSelectionChange()
    }
  }
  private selectTable(clickedEditorItem: TableEntity, e: PointerEvent, onlyResizing: boolean) {
    const targetPoint = this.findEditorItemPoint(clickedEditorItem, e.x, e.y)
    const [targetRow, targetRowIndex] = this.isTableRowResizable(clickedEditorItem, targetPoint.x, targetPoint.y)
    const [targetColumn, targetColumnIndex] = this.isTableColumnResizable(clickedEditorItem, targetPoint.x, targetPoint.y)
    this._editorContext.target = clickedEditorItem
    if (targetRow) {
      // console.log('========1')
      this._editor.checkAndEndTextEdit()
      //this._editor.finishTextEditOperation()
      this._editorContext.targetRowResizing = true
      this._editorContext.targetRowIndex = targetRowIndex
      if (this._editorContext.targetItem) {
        this._editorContext.targetItem.shape.focused = false
      }
      this._editorContext.targetItem = undefined
      this._editorContext.targetItemIndex = -1
      this.handleTableActiveCellShape()
      this._editorContext.inMoving = true
      this.startMoveOutline()
    } else if (targetColumn) {
      // console.log('========0')
      this._editor.checkAndEndTextEdit()
      //this._editor.finishTextEditOperation()
      this._editorContext.targetColumnResizing = targetColumn
      this._editorContext.targetColumnIndex = targetColumnIndex
      if (this._editorContext.targetItem) {
        this._editorContext.targetItem.shape.focused = false
      }
      this._editorContext.targetItem = undefined
      this.handleTableActiveCellShape()
      this._editorContext.targetItemIndex = -1
      this._editorContext.inMoving = true
      this.startMoveOutline()
    } else if (!onlyResizing) {
      const itemIndex = this.findTableItemIndex(clickedEditorItem, targetPoint.x, targetPoint.y)
      if (this._editorContext.targetItemIndex !== itemIndex) {
        this._editorContext.targetItemIndex = itemIndex
        if (this._editorContext.targetItem) {
          this._editorContext.targetItem.shape.focused = false
        }
        this._editorContext.targetItem = clickedEditorItem.items[itemIndex]
        this._editorContext.targetItem.shape.focused = true
        this.handleTableActiveCellShape()
        this._editorContext.inMoving = true
        this._editor.checkAndStartTextEdit()
        this._editor.beginTextEditOperation(clickedEditorItem)
        this.startMoveOutline()
        const cellPoint = this.findEditorItemPoint(this._editorContext.targetItem, e.x, e.y)
        this.updateTextCursorLocation(this._editorContext.targetItem, cellPoint.x, cellPoint.y)
        this._editorContext.targetItem.shape.enter(cellPoint.x, cellPoint.y)
        this._editorContext.textSelecting = true
      } else {
        //In text Editting
        if (this._editor.isTextEditting && this._editorContext.targetItem) {
          this._editorContext.inMoving = false
          const cellPoint = this.findEditorItemPoint(this._editorContext.targetItem, e.x, e.y)
          this.updateTextCursorLocation(this._editorContext.targetItem, cellPoint.x, cellPoint.y)
          this._editorContext.targetItem.shape.enter(cellPoint.x, cellPoint.y)
          this._editorContext.textSelecting = true
        } else {
          this._editorContext.inMoving = true
          this._editor.checkAndEndTextEdit()
          //this._editor.finishTextEditOperation()
          this.startMoveOutline()
        }
      }
    }

    this._editor.beginOperation()
  }

  private handleMouseUpForConnectorCreation() {
    const theControllerLayer = this._editorContext.controllerLayer as ControllerLayer
    const theSelectionLayer = this._editor.selectionLayer as SelectionLayer
    const connector = theControllerLayer.getEditorItem(0)
    this._editorContext.controllerLayer.removeAllEditorItems()
    this._editor.contentLayer.addEditorItem(connector)
    theSelectionLayer.inHolder = true
    theSelectionLayer.removeAllEditorItems()
    theSelectionLayer.addEditorItem(connector)
    theSelectionLayer.invalidateLayer()
    let editorItemInfo = OperationHelper.saveEditorItem(connector)
    let operation = new Operation(this._editor, OperationType.ADD_ITEMS, [editorItemInfo], true, [])
    this._editor.operationService.addOperation(operation)
    this._editor.triggerOperationChange()
    //this.triggerSelectionResized()
    this._editor.triggerSelectionChange()
    this._editor.action = undefined
    // } else if (this.inMoving_) {
    //  const theSelectionLayer = this.selectionLayer
    //  const editorItem = theSelectionLayer.getEditorItem(0)
    //  this.selectionLayer.removeAllEditorItems()
    //  this.contentLayer.addEditorItem(editorItem)
  }

  private handleMouseUpForTable(clickedEditorItem: TableEntity, targetPoint: Point2, e: PointerEvent) {
    const itemIndex = this.findTableItemIndex(clickedEditorItem, targetPoint.x, targetPoint.y)
    if (itemIndex === this._editorContext.targetItemIndex && this._editorContext.targetItem) {
      const cellPoint = this.findEditorItemPoint(this._editorContext.targetItem, e.x, e.y)
      const nowTime = Date.now()
      if (this._editorContext.targetItem.shape.focused) {
        this._editorContext.textArea.focus()
        this.updateTextCursorLocation(this._editorContext.targetItem, cellPoint.x, cellPoint.y)
        this._editorContext.targetItem.shape.enterTo(cellPoint.x, cellPoint.y)
        this._editorContext.textSelecting = false
        // Check double click
        if (nowTime - this._editorContext.targetTime < EditorEventHandler.DOUBLE_CLICK_TIME) {
          this._editorContext.targetItem.shape.selectAll()
        }
        this._editor.triggerTextEditStyleChange()
      } else {
        // Check double click
        if (nowTime - this._editorContext.targetTime < EditorEventHandler.DOUBLE_CLICK_TIME) {
          // console.log('Double click is detected')
          // this.handleDoubleClick(e)
          this._editorContext.textArea.focus()
          this._editorContext.targetItem.shape.enter(cellPoint.x, cellPoint.y)
          this._editor.checkAndStartTextEdit()
          if (this._editorContext.targetItem) {
            this._editorContext.targetItem.shape.focused = true
          }
          this._editorContext.textArea.textContent = ''
          this.updateTextCursorLocation(this._editorContext.targetItem, cellPoint.x, cellPoint.y)
          this._editor.triggerTextEditStyleChange()
          this._editor.beginTextEditOperation(clickedEditorItem)
        }
      }
      this._editorContext.targetTime = nowTime
    }
  }

  private handleMouseUpDefault(clickedEditorItem: EditorItem, e: PointerEvent) {
    const targetPoint = this.findEditorItemPoint(clickedEditorItem, e.x, e.y)
    if (clickedEditorItem instanceof TableEntity || clickedEditorItem instanceof PoolCustomContainer || clickedEditorItem instanceof CodeContainer) {
      //Need this to update toolbar in time
      this._editor.triggerSelectionResized()
    }
    if (this._editorContext.target !== clickedEditorItem) {
      //Need to check pool label here
      const nowTime = Date.now()
      if (
        clickedEditorItem instanceof PoolCustomContainer &&
        this._editorContext.target &&
        this._editorContext.target.shape.focused &&
        this.ifFixedItemIsTarget(clickedEditorItem, e.x, e.y)
      ) {
        const targetItemPoint = this.findEditorItemPoint(this._editorContext.target, e.x, e.y)
        this._editorContext.textArea.focus()
        this.updateTextCursorLocation(this._editorContext.target, targetItemPoint.x, targetItemPoint.y)
        this._editorContext.target.shape.enterTo(targetItemPoint.x, targetItemPoint.y)
        this._editorContext.textSelecting = false
        this._editor.triggerTextEditStyleChange()
        // Check double click
        //console.log(`Double check for pool container`)
        if (nowTime - this._editorContext.targetTime < EditorEventHandler.DOUBLE_CLICK_TIME) {
          this._editorContext.target.shape.selectAll()
        }
        this._editorContext.targetTime = nowTime
      } else {
        if (this._editorContext.target) {
          this._editorContext.target.shape.focused = false
          this._editor.checkAndEndTextEdit()
          //this._editor.finishTextEditOperation()
        }
        this._editorContext.target = clickedEditorItem
        this._editorContext.targetTime = Date.now()
      }
    } else {
      if (clickedEditorItem instanceof TableEntity) {
        if (!clickedEditorItem.locked) {
          this.handleMouseUpForTable(clickedEditorItem, targetPoint, e)
        }
      } else {
        if (!clickedEditorItem.locked) {
          const nowTime = Date.now()
          if (this._editorContext.target.shape.focused) {
            this._editorContext.textArea.focus()
            this.updateTextCursorLocation(clickedEditorItem, targetPoint.x, targetPoint.y)
            this._editorContext.target.shape.enterTo(targetPoint.x, targetPoint.y)
            this._editorContext.textSelecting = false
            this._editor.triggerTextEditStyleChange()
            // Check double click
            if (nowTime - this._editorContext.targetTime < EditorEventHandler.DOUBLE_CLICK_TIME) {
              this._editorContext.target.shape.selectAll()
            }
          } else {
            // Check double click
            if (nowTime - this._editorContext.targetTime < EditorEventHandler.DOUBLE_CLICK_TIME) {
              this.handleDoubleClickCheck(e, targetPoint)
            }
          }
          this._editorContext.targetTime = nowTime
        }
      }
    }
  }

  private hasFixedItems(editorItem: EditorItem, x: number, y: number) {
    let result = false
    for (let i = 0; i < editorItem.items.length; i++) {
      let child = editorItem.items[i]
      if (child.fixed && this._editor.isInEditorItem(child, x, y)) {
        result = true
        break
      }
    }
    return result
  }

  private ifFixedItemIsTarget(editorItem: EditorItem, x: number, y: number) {
    let result = false
    for (let i = 0; i < editorItem.items.length; i++) {
      let child = editorItem.items[i]
      if (child.fixed && this._editor.isInEditorItem(child, x, y) && child === this._editor.target) {
        result = true
        break
      }
    }
    return result
  }

  private handleDoubleClickCheck(e: PointerEvent, targetPoint: Point2) {
    if (this._editorContext.target) {
      let theTargetPoint = targetPoint
      let theTarget = this._editorContext.target as Item
      for (let i = 0; i < theTarget.items.length; i++) {
        let child = theTarget.items[i]
        if (child.fixed && this._editor.isInEditorItem(child, e.x, e.y)) {
          theTarget = child as Item
          this._editorContext.target = child
          theTargetPoint = this.findEditorItemPoint(theTarget, e.x, e.y)
          break
        }
      }
      //console.log('Double click is detected')
      // this.handleDoubleClick(e)
      if (theTarget instanceof CodeContainer) {
        this._editor.beginCodeEdit()
      } else if (theTarget instanceof Connector) {
        let origItemInfo = OperationHelper.saveEditorItem(theTarget)
        this.createTextBoxInConnector(theTarget, theTargetPoint.x, theTargetPoint.y)
        let editorItemInfo = OperationHelper.saveEditorItem(theTarget)
        let operation = new Operation(this._editor, OperationType.UPDATE_ITEMS, [editorItemInfo], true, [origItemInfo])
        this._editor.operationService.addOperation(operation)
        this._editor.triggerOperationChange()
      } else {
        this._editorContext.textArea.focus()
        theTarget.shape.enter(theTargetPoint.x, theTargetPoint.y)
        this._editor.checkAndStartTextEdit()
        theTarget.shape.focused = true
        this._editorContext.textArea.textContent = ''
        this.updateTextCursorLocation(theTarget, theTargetPoint.x, theTargetPoint.y)
        this._editor.triggerTextEditStyleChange()
        this._editor.beginTextEditOperation(theTarget)
      }
    }
  }

  /**
   *  -2: header, -1 stage region or pool region, 0+ stage index or pool index
   * @param editorItem
   * @param e
   * @Param updateResizing
   * @private
   */
  private handleMouseOverOnPool(editorItem: PoolCustomContainer, e: PointerEvent, updateResizing: boolean) {
    const targetPoint = this.findEditorItemPoint(editorItem, e.x, e.y)
    let xResizing = false
    let yResizing = false
    if (updateResizing) {
      this._editorContext.targetPoolXResizing = false
      this._editorContext.targetPoolYResizing = false
    }
    if (editorItem.horizontal) {
      const header = editorItem.items[0]
      if (editorItem.stageCount > 1) {
        if (editorItem.poolCount > 0) {
          const firstPoolLabel = editorItem.items[1 + editorItem.stageCount]
          if (Math.abs(header.width - targetPoint.x) <= Editor.TEST_RADIUS) {
            xResizing = true
            this._editorContext.targetPoolIndex = -2
          } else if (Math.abs(firstPoolLabel.right - targetPoint.x) <= Editor.TEST_RADIUS && firstPoolLabel.top <= targetPoint.y) {
            xResizing = true
            this._editorContext.targetPoolIndex = -1
          } else {
            for (let i = 0; i < editorItem.stageCount - 1; i++) {
              const stageLabel = editorItem.items[1 + i]
              if (Math.abs(stageLabel.right - targetPoint.x) <= Editor.TEST_RADIUS) {
                xResizing = true
                this._editorContext.targetPoolIndex = i
              }
            }
          }
        } else {
          if (Math.abs(header.width - targetPoint.x) <= Editor.TEST_RADIUS) {
            xResizing = true
            this._editorContext.targetPoolIndex = -2
          } else {
            for (let i = 0; i < editorItem.stageCount - 1; i++) {
              const stageLabel = editorItem.items[1 + i]
              if (Math.abs(stageLabel.right - targetPoint.x) <= Editor.TEST_RADIUS) {
                xResizing = true
                this._editorContext.targetPoolIndex = i
              }
            }
          }
        }
        const firstStageLabel = editorItem.items[1]
        if (Math.abs(firstStageLabel.bottom - targetPoint.y) <= Editor.TEST_RADIUS && firstStageLabel.left <= targetPoint.x) {
          yResizing = true
          this._editorContext.targetPoolIndex = -1
        }
        for (let i = 0; i < editorItem.poolCount - 1; i++) {
          const poolLabel = editorItem.items[1 + editorItem.stageCount + i]
          if (Math.abs(poolLabel.bottom - targetPoint.y) <= Editor.TEST_RADIUS && poolLabel.left <= targetPoint.x) {
            yResizing = true
            this._editorContext.targetPoolIndex = i
          }
        }
      } else {
        // stage count = 1
        if (editorItem.poolCount > 0) {
          const firstPoolLabel = editorItem.items[1]
          if (Math.abs(header.width - targetPoint.x) <= Editor.TEST_RADIUS) {
            xResizing = true
            this._editorContext.targetPoolIndex = -2
          } else if (Math.abs(header.width + firstPoolLabel.width - targetPoint.x) <= Editor.TEST_RADIUS) {
            xResizing = true
            this._editorContext.targetPoolIndex = -1
          }
        } else {
          if (Math.abs(header.width - targetPoint.x) <= Editor.TEST_RADIUS) {
            xResizing = true
            this._editorContext.targetPoolIndex = -2
          }
        }
        for (let i = 0; i < editorItem.poolCount - 1; i++) {
          const poolLabel = editorItem.items[1 + i]
          if (Math.abs(poolLabel.bottom - targetPoint.y) <= Editor.TEST_RADIUS) {
            yResizing = true
            this._editorContext.targetPoolIndex = i
          }
        }
      }
    } else {
      // horizontal = false
      const header = editorItem.items[0]
      if (editorItem.stageCount > 1) {
        if (editorItem.poolCount > 0) {
          const firstPoolLabel = editorItem.items[1 + editorItem.stageCount]
          if (Math.abs(header.height - targetPoint.y) <= Editor.TEST_RADIUS) {
            yResizing = true
            this._editorContext.targetPoolIndex = -2
          } else if (Math.abs(firstPoolLabel.bottom - targetPoint.y) <= Editor.TEST_RADIUS && firstPoolLabel.left <= targetPoint.x) {
            yResizing = true
            this._editorContext.targetPoolIndex = -1
          } else {
            for (let i = 0; i < editorItem.stageCount - 1; i++) {
              const stageLabel = editorItem.items[1 + i]
              if (Math.abs(stageLabel.bottom - targetPoint.y) <= Editor.TEST_RADIUS && stageLabel.left <= targetPoint.x) {
                yResizing = true
                this._editorContext.targetPoolIndex = i
              }
            }
          }
        } else {
          if (Math.abs(header.height - targetPoint.y) <= Editor.TEST_RADIUS) {
            yResizing = true
            this._editorContext.targetPoolIndex = -2
          } else {
            for (let i = 0; i < editorItem.stageCount - 1; i++) {
              const stageLabel = editorItem.items[1 + i]
              if (Math.abs(stageLabel.bottom - targetPoint.y) <= Editor.TEST_RADIUS) {
                yResizing = true
                this._editorContext.targetPoolIndex = i
              }
            }
          }
        }
        const firstStageLabel = editorItem.items[1]
        if (Math.abs(firstStageLabel.right - targetPoint.x) <= Editor.TEST_RADIUS && firstStageLabel.top <= targetPoint.y) {
          xResizing = true
          this._editorContext.targetPoolIndex = -1
        }
        for (let i = 0; i < editorItem.poolCount - 1; i++) {
          const poolLabel = editorItem.items[1 + editorItem.stageCount + i]
          if (Math.abs(poolLabel.right - targetPoint.x) <= Editor.TEST_RADIUS && poolLabel.top <= targetPoint.y) {
            xResizing = true
            this._editorContext.targetPoolIndex = i
          }
        }
      } else {
        // stage count = 1
        if (editorItem.poolCount > 0) {
          const firstPoolLabel = editorItem.items[1 + (editorItem.stageCount > 1 ? editorItem.stageCount : 0)]
          if (Math.abs(header.height - targetPoint.y) <= Editor.TEST_RADIUS) {
            yResizing = true
            this._editorContext.targetPoolIndex = -2
          } else if (Math.abs(firstPoolLabel.bottom - targetPoint.y) <= Editor.TEST_RADIUS) {
            yResizing = true
            this._editorContext.targetPoolIndex = -1
          }
        } else {
          if (Math.abs(header.height - targetPoint.y) <= Editor.TEST_RADIUS) {
            yResizing = true
            this._editorContext.targetPoolIndex = -2
          }
        }
        for (let i = 0; i < editorItem.poolCount - 1; i++) {
          const poolLabel = editorItem.items[1 + i]
          if (Math.abs(poolLabel.right - targetPoint.x) <= Editor.TEST_RADIUS && poolLabel.top <= targetPoint.y) {
            xResizing = true
            this._editorContext.targetPoolIndex = i
          }
        }
      }
    }
    if (xResizing) {
      this._editor.updateEditorMode(EditorMode.COL_RESIZE)
      if (updateResizing) {
        this._editorContext.targetPoolXResizing = xResizing
      }
    } else if (yResizing) {
      this._editor.updateEditorMode(EditorMode.ROW_RESIZE)
      if (updateResizing) {
        this._editorContext.targetPoolYResizing = yResizing
      }
    } else {
      if (this._editorContext.target && this._editorContext.target.shape.focused && this.ifFixedItemIsTarget(editorItem, e.x, e.y)) {
        this._editor.updateEditorMode(EditorMode.TEXT)
      } else {
        this._editor.updateEditorMode(EditorMode.MOVE)
      }
    }
  }

  private selectPoolCustomContainer(editorItem: PoolCustomContainer, e: PointerEvent, onlyResizing: boolean) {
    //const targetPoint = this.findEditorItemPoint(editorItem, e.x, e.y)
    this.handleMouseOverOnPool(editorItem, e, true)
    if (!onlyResizing) {
      if (this._editorContext.targetPoolXResizing || this._editorContext.targetPoolYResizing) {
        this.updateSelection(editorItem)
        this._editorContext.target = editorItem
      } else {
        if (this._editorContext.textFocused) {
          const targetPoint = this.findEditorItemPoint(editorItem, e.x, e.y)
          const hasFixedItems = editorItem ? this.hasFixedItems(editorItem, e.x, e.y) : false
          const ifFixedItemIsTarget = editorItem ? this.ifFixedItemIsTarget(editorItem, e.x, e.y) : false
          //Fixed item is clicked and parent is in text edit mode
          const isFixedItemSelected = hasFixedItems && !editorItem.fixed && editorItem === this._editorContext.target
          //Fixed item is in text edit mode and parent or other fixed item is in clicked
          const isParentItemSelected =
            (!hasFixedItems && !editorItem.fixed && editorItem !== this._editorContext.target) ||
            (hasFixedItems && !editorItem.fixed && !ifFixedItemIsTarget && editorItem !== this._editorContext.target)
          //Fixed item is clicked and it is in text mode
          const isFixedItemInTextEditing = hasFixedItems && ifFixedItemIsTarget && !editorItem.fixed && editorItem !== this._editorContext.target
          if (isFixedItemSelected || isParentItemSelected) {
            this.updateSelection(editorItem)
            this._editor.beginOperation()
            this._editorContext.inMoving = true
            this.startMoveOutline()
          } else if (isFixedItemInTextEditing && this._editorContext.target) {
            const targetItemPoint = this.findEditorItemPoint(this._editorContext.target, e.x, e.y)
            this.updateTextCursorLocation(this._editorContext.target, targetItemPoint.x, targetItemPoint.y)
            this._editorContext.target.shape.enter(targetItemPoint.x, targetItemPoint.y)
            this._editorContext.textSelecting = true
          } else {
            this.updateTextCursorLocation(editorItem, targetPoint.x, targetPoint.y)
            editorItem.shape.enter(targetPoint.x, targetPoint.y)
            this._editorContext.textSelecting = true
          }
        } else {
          if (!editorItem.locked) {
            this._editor.beginOperation()
            this._editorContext.inMoving = true
            this.startMoveOutline()
          }
        }
      }
    } else {
      this.updateSelection(editorItem)
      this._editorContext.target = editorItem
    }
  }

  private handleTargetPoolXResizing(e: PointerEvent) {
    const target = this._editorContext.target as PoolCustomContainer
    const targetPoolIndex = this._editorContext.targetPoolIndex
    let maxSize = 0
    let minSize = Item.MIN_WIDTH
    if (!target) {
      return
    }
    const header = target.items[0] as PoolLabelEntity
    const offset = e.x / this._editor.zoom - this._editorContext.startPointX / this._editor.zoom
    if (target.horizontal) {
      if (targetPoolIndex === -2) {
        // Header width
        const minPoolWidth = target.poolCount > 0 ? (target.stageCount > 1 ? target.items[1 + target.stageCount].width : target.items[1].width) : 0
        const firstPoolLabelWidth = target.poolCount === 0 ? 0 : target.items[1 + (target.stageCount > 1 ? target.stageCount : 0)].width
        const minStageWidth = target.poolCount === 0 ? target.stageCount * Item.MIN_WIDTH : target.stageCount * (Item.MIN_WIDTH + firstPoolLabelWidth)
        maxSize = target.width - minPoolWidth - minStageWidth
        const newWidth = header.width + offset
        if (newWidth >= minSize && newWidth <= maxSize) {
          header.boundary = Rectangle.makeLTWH(header.left, header.top, newWidth, header.height)
          if (target.stageCount > 1) {
            for (let i = 0; i < target.poolCount; i++) {
              const poolLabel = target.items[1 + target.stageCount + i]
              poolLabel.boundary = Rectangle.makeLTWH(poolLabel.left + offset, poolLabel.top, poolLabel.width, poolLabel.height)
            }
            for (let i = 0; i < target.stageCount; i++) {
              const stageLabel = target.items[1 + i]
              stageLabel.boundary = Rectangle.makeLTWH(
                stageLabel.left + offset - (offset / target.stageCount) * i,
                stageLabel.top,
                stageLabel.width - offset / target.stageCount,
                stageLabel.height,
              )
            }
          } else {
            for (let i = 0; i < target.poolCount; i++) {
              const poolLabel = target.items[1 + i]
              poolLabel.boundary = Rectangle.makeLTWH(poolLabel.left + offset, poolLabel.top, poolLabel.width, poolLabel.height)
            }
          }
        }
      } else if (targetPoolIndex === -1) {
        //Pool width and so pool count > 0
        const firstPoolLabel = target.items[1 + (target.stageCount > 1 ? target.stageCount : 0)]
        const maxSize = (target.width - header.width) / target.stageCount - minSize
        const newWidth = firstPoolLabel.width + offset
        if (newWidth >= minSize && newWidth <= maxSize) {
          if (target.stageCount > 1) {
            for (let i = 0; i < target.poolCount; i++) {
              const poolLabel = target.items[1 + target.stageCount + i]
              poolLabel.boundary = Rectangle.makeLTWH(poolLabel.left, poolLabel.top, poolLabel.width + offset, poolLabel.height)
            }
          } else {
            for (let i = 0; i < target.poolCount; i++) {
              const poolLabel = target.items[1 + i]
              poolLabel.boundary = Rectangle.makeLTWH(poolLabel.left, poolLabel.top, poolLabel.width + offset, poolLabel.height)
            }
          }
        }
      } else {
        //Update stage with index = i, and stage count > 1
        const firstPoolLabelWidth = target.poolCount === 0 ? 0 : target.items[1 + (target.stageCount > 1 ? target.stageCount : 0)].width
        if (this._editorContext.targetPoolIndex === 0) {
          const firstStage = target.items[1]
          const secondStage = target.items[2]
          const minStageWidth = Item.MIN_WIDTH + firstPoolLabelWidth
          const maxStageWidth = firstStage.width + secondStage.width - Item.MIN_WIDTH
          const newStageWidth = firstStage.width + offset
          if (newStageWidth >= minStageWidth && newStageWidth <= maxStageWidth) {
            const secondStageLeft = secondStage.left + offset
            const secondStageWidth = secondStage.width - offset
            firstStage.boundary = Rectangle.makeLTWH(firstStage.left, firstStage.top, newStageWidth, firstStage.height)
            secondStage.boundary = Rectangle.makeLTWH(secondStageLeft, secondStage.top, secondStageWidth, firstStage.height)
          }
        } else {
          const currentStage = target.items[this._editorContext.targetPoolIndex + 1]
          const nextStage = target.items[this._editorContext.targetPoolIndex + 2]
          const minStageWidth = Item.MIN_WIDTH
          const maxStageWidth = currentStage.width + nextStage.width - minStageWidth
          const newStageWidth = currentStage.width + offset
          if (newStageWidth >= minStageWidth && newStageWidth <= maxStageWidth) {
            const nextStageLeft = nextStage.left + offset
            const nextStageWidth = nextStage.width - offset
            currentStage.boundary = Rectangle.makeLTWH(currentStage.left, currentStage.top, newStageWidth, currentStage.height)
            nextStage.boundary = Rectangle.makeLTWH(nextStageLeft, nextStage.top, nextStageWidth, nextStage.height)
          }
        }
      }
    } else {
      // target.horizontal = false
      // targetPoolIndex === -2 will never happen here and skip it
      if (targetPoolIndex === -1) {
        //Stage width and so stage count > 1
        const firstStageLabel = target.items[1]
        const newWidth = firstStageLabel.width + offset
        if (target.poolCount >= 1) {
          const firstPoolLabel = target.items[1 + target.stageCount]
          const maxStageWidth = firstStageLabel.width + firstPoolLabel.width - Item.MIN_WIDTH
          if (newWidth >= minSize && newWidth <= maxStageWidth) {
            for (let i = 0; i < target.stageCount; i++) {
              const stageLabel = target.items[1 + i]
              stageLabel.boundary = Rectangle.makeLTWH(stageLabel.left, stageLabel.top, newWidth, stageLabel.height)
            }
            const firstPoolLabelWidth = firstPoolLabel.width - offset
            const firstPoolLabelLeft = firstPoolLabel.left + offset
            firstPoolLabel.boundary = Rectangle.makeLTWH(firstPoolLabelLeft, firstPoolLabel.top, firstPoolLabelWidth, firstPoolLabel.height)
          }
        } else {
          const maxStageWidth = target.width - Item.MIN_WIDTH
          if (newWidth >= minSize && newWidth <= maxStageWidth) {
            for (let i = 0; i < target.stageCount; i++) {
              const stageLabel = target.items[1 + i]
              stageLabel.boundary = Rectangle.makeLTWH(stageLabel.left, stageLabel.top, newWidth, stageLabel.height)
            }
          }
        }
      } else if (targetPoolIndex >= 0) {
        const currentPoolLabel = target.items[1 + (target.stageCount > 1 ? target.stageCount : 0) + targetPoolIndex]
        const nextPoolLabel = target.items[1 + (target.stageCount > 1 ? target.stageCount : 0) + targetPoolIndex + 1]
        const maxPoolLabelWidth = currentPoolLabel.width + nextPoolLabel.width - Item.MIN_WIDTH
        const newPoolLabelWidth = currentPoolLabel.width + offset
        if (newPoolLabelWidth >= minSize && newPoolLabelWidth <= maxPoolLabelWidth) {
          const nextPoolLabelLeft = nextPoolLabel.left + offset
          const nextPoolLabelWidth = nextPoolLabel.width - offset
          currentPoolLabel.boundary = Rectangle.makeLTWH(currentPoolLabel.left, currentPoolLabel.top, newPoolLabelWidth, currentPoolLabel.height)
          nextPoolLabel.boundary = Rectangle.makeLTWH(nextPoolLabelLeft, nextPoolLabel.top, nextPoolLabelWidth, nextPoolLabel.height)
        }
      }
    }
    if (target) {
      target.shape.markDirty()
    }
    this._editorContext.startPointX = e.x
    this._editorContext.startPointY = e.y
  }

  private handleTargetPoolYResizing(e: PointerEvent) {
    const target = this._editorContext.target as PoolCustomContainer
    const targetPoolIndex = this._editorContext.targetPoolIndex
    let maxSize = 0
    let minSize = Item.MIN_HEIGHT
    if (!target) {
      return
    }
    const header = target.items[0] as PoolLabelEntity
    const offset = e.y / this._editor.zoom - this._editorContext.startPointY / this._editor.zoom
    if (target.horizontal) {
      // targetPoolIndex === -2 will never happen here and skip it
      if (targetPoolIndex === -1) {
        //Stage width and so stage count > 1
        const firstStageLabel = target.items[1]
        const newHeight = firstStageLabel.height + offset
        if (target.poolCount >= 1) {
          const firstPoolLabel = target.items[1 + target.stageCount]
          const maxStageHeight = firstStageLabel.height + firstPoolLabel.height - Item.MIN_HEIGHT
          if (newHeight >= minSize && newHeight <= maxStageHeight) {
            for (let i = 0; i < target.stageCount; i++) {
              const stageLabel = target.items[1 + i]
              stageLabel.boundary = Rectangle.makeLTWH(stageLabel.left, stageLabel.top, stageLabel.width, newHeight)
            }
            const firstPoolLabelHeight = firstPoolLabel.height - offset
            const firstPoolLabelTop = firstPoolLabel.top + offset
            firstPoolLabel.boundary = Rectangle.makeLTWH(firstPoolLabel.left, firstPoolLabelTop, firstPoolLabel.width, firstPoolLabelHeight)
          }
        } else {
          const maxStageHeight = target.height - Item.MIN_HEIGHT
          if (newHeight >= minSize && newHeight <= maxStageHeight) {
            for (let i = 0; i < target.stageCount; i++) {
              const stageLabel = target.items[1 + i]
              stageLabel.boundary = Rectangle.makeLTWH(stageLabel.left, stageLabel.top, stageLabel.width, newHeight)
            }
          }
        }
      } else if (targetPoolIndex >= 0) {
        const currentPoolLabel = target.items[1 + (target.stageCount > 1 ? target.stageCount : 0) + targetPoolIndex]
        const nextPoolLabel = target.items[1 + (target.stageCount > 1 ? target.stageCount : 0) + targetPoolIndex + 1]
        const maxPoolLabelHeight = currentPoolLabel.height + nextPoolLabel.height - Item.MIN_HEIGHT
        const newPoolLabelHeight = currentPoolLabel.height + offset
        if (newPoolLabelHeight >= minSize && newPoolLabelHeight <= maxPoolLabelHeight) {
          const nextPoolLabelTop = nextPoolLabel.top + offset
          const nextPoolLabelHeight = nextPoolLabel.height - offset
          currentPoolLabel.boundary = Rectangle.makeLTWH(currentPoolLabel.left, currentPoolLabel.top, currentPoolLabel.width, newPoolLabelHeight)
          nextPoolLabel.boundary = Rectangle.makeLTWH(nextPoolLabel.left, nextPoolLabelTop, nextPoolLabel.width, nextPoolLabelHeight)
        }
      }
    } else {
      if (targetPoolIndex === -2) {
        // Header height
        const minPoolHeight = target.poolCount > 0 ? (target.stageCount > 1 ? target.items[1 + target.stageCount].height : target.items[1].height) : 0
        const firstPoolLabelHeight = target.poolCount === 0 ? 0 : target.items[1 + (target.stageCount > 1 ? target.stageCount : 0)].height
        const minStageHeight = target.poolCount === 0 ? target.stageCount * Item.MIN_HEIGHT : target.stageCount * (Item.MIN_HEIGHT + firstPoolLabelHeight)
        maxSize = target.height - minPoolHeight - minStageHeight
        const newHeight = header.height + offset
        if (newHeight >= minSize && newHeight <= maxSize) {
          header.boundary = Rectangle.makeLTWH(header.left, header.top, header.width, newHeight)
          if (target.stageCount > 1) {
            for (let i = 0; i < target.poolCount; i++) {
              const poolLabel = target.items[1 + target.stageCount + i]
              poolLabel.boundary = Rectangle.makeLTWH(poolLabel.left, poolLabel.top + offset, poolLabel.width, poolLabel.height)
            }
            for (let i = 0; i < target.stageCount; i++) {
              const stageLabel = target.items[1 + i]
              stageLabel.boundary = Rectangle.makeLTWH(
                stageLabel.left,
                stageLabel.top + offset - (offset / target.stageCount) * i,
                stageLabel.width,
                stageLabel.height - offset / target.stageCount,
              )
            }
          } else {
            for (let i = 0; i < target.poolCount; i++) {
              const poolLabel = target.items[1 + i]
              poolLabel.boundary = Rectangle.makeLTWH(poolLabel.left, poolLabel.top + offset, poolLabel.width, poolLabel.height)
            }
          }
        }
      } else if (targetPoolIndex === -1) {
        //Pool height and so pool count > 0
        const firstPoolLabel = target.items[1 + (target.stageCount > 1 ? target.stageCount : 0)]
        const maxSize = (target.height - header.height) / target.stageCount - minSize
        const newHeight = firstPoolLabel.height + offset
        if (newHeight >= minSize && newHeight <= maxSize) {
          if (target.stageCount > 1) {
            for (let i = 0; i < target.poolCount; i++) {
              const poolLabel = target.items[1 + target.stageCount + i]
              poolLabel.boundary = Rectangle.makeLTWH(poolLabel.left, poolLabel.top, poolLabel.width, poolLabel.height + offset)
            }
          } else {
            for (let i = 0; i < target.poolCount; i++) {
              const poolLabel = target.items[1 + i]
              poolLabel.boundary = Rectangle.makeLTWH(poolLabel.left, poolLabel.top, poolLabel.width, poolLabel.height + offset)
            }
          }
        }
      } else {
        //Update stage with index = i, and stage count > 1
        const firstPoolLabelHeight = target.poolCount === 0 ? 0 : target.items[1 + (target.stageCount > 1 ? target.stageCount : 0)].height
        if (this._editorContext.targetPoolIndex === 0) {
          const firstStage = target.items[1]
          const secondStage = target.items[2]
          const minStageHeight = Item.MIN_HEIGHT + firstPoolLabelHeight
          const maxStageHeight = firstStage.height + secondStage.height - Item.MIN_HEIGHT
          const newStageHeight = firstStage.height + offset
          if (newStageHeight >= minStageHeight && newStageHeight <= maxStageHeight) {
            const secondStageTop = secondStage.top + offset
            const secondStageHeight = secondStage.height - offset
            firstStage.boundary = Rectangle.makeLTWH(firstStage.left, firstStage.top, firstStage.width, newStageHeight)
            secondStage.boundary = Rectangle.makeLTWH(secondStage.left, secondStageTop, secondStage.width, secondStageHeight)
          }
        } else {
          const currentStage = target.items[this._editorContext.targetPoolIndex + 1]
          const nextStage = target.items[this._editorContext.targetPoolIndex + 2]
          const minStageHeight = Item.MIN_HEIGHT
          const maxStageHeight = currentStage.height + nextStage.height - minStageHeight
          const newStageHeight = currentStage.height + offset
          if (newStageHeight >= minStageHeight && newStageHeight <= maxStageHeight) {
            const nextStageTop = nextStage.top + offset
            const nextStageHeight = nextStage.height - offset
            currentStage.boundary = Rectangle.makeLTWH(currentStage.left, currentStage.top, currentStage.width, newStageHeight)
            nextStage.boundary = Rectangle.makeLTWH(nextStage.left, nextStageTop, nextStage.width, nextStageHeight)
          }
        }
      }
    }
    if (target) {
      target.shape.markDirty()
    }
    this._editorContext.startPointX = e.x
    this._editorContext.startPointY = e.y
  }

  /**
   * Mouse down on Pool while it is in text editing
   * @param editorItem
   * @param e
   * @private
   */
  private handleTextEdittingInPoolCustomContainer(editorItem: PoolCustomContainer, e: PointerEvent) {
    this.handleMouseOverOnPool(editorItem, e, true)
  }
}
