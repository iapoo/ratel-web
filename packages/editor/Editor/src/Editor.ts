/* eslint-disable max-depth */
/* eslint-disable max-params */
/* eslint-disable complexity */
import { Painter } from '@ratel-web/painter'
import { DocumentThemeType, DocumentThemeTypes, EditorUtils } from '../../Theme'

import { Color, Colors, KeyEvent, Matrix, MouseCode, Point2, PointerEvent, Rectangle, Rotation, Scale } from '@ratel-web/engine'
import { Action, MyShapeAction } from '../../Actions'
import { Holder } from '../../Design'
import {
  Connector,
  ContainerEntity,
  EditorItem,
  EditorItemInfo,
  Entity,
  FrameEntity,
  ImageContainer,
  Item,
  ShapeEntity,
  SvgContainer,
  TableEntity,
} from '../../Items'
import { Operation, OperationHelper, OperationService, OperationType } from '../../Operations'
import { ConnectorDirection } from '../../Shapes'
import { CommonUtils } from '../../Utils'
import { ControllerLayer } from './ControllerLayer'
import { EditorContext } from './EditorContext'
import { EditorEvent } from './EditorEvent'
import { EditorLayer } from './EditorLayer'
import { EditorOperationEvent } from './EditorOperationEvent'
import { HoverLayer } from './HoverLayer'
import { SelectionLayer } from './SelectionLayer'

export enum EditorMode {
  AUTO,
  DEFAULT,
  ALL_SCROLL,
  HELP,
  MOVE,
  POINTER,
  PROGRESS,
  TEXT,
  VERTICAL_TEXT,
  WAIT,
  NO_DROP,
  NOT_ALLOWED,
  E_RESIZE,
  N_RESIZE,
  S_RESIZE,
  W_RESIZE,
  NE_RESIZE,
  NW_RESIZE,
  SE_RESIZE,
  SW_RESIZE,
  ROW_RESIZE,
  COL_RESIZE,
  CROSSHAIR,
}

export class Editor extends Painter {
  /**
   * Shadow size
   */
  public static readonly SHADOW_SIZE = 0

  /**
   * Test region size
   */
  private static readonly TEST_RADIUS = 8
  private static readonly TEST_SIZE = 16
  /**
   * Check time offset for double click
   */
  private static readonly DOUBLE_CLICK_TIME = 500

  /**
   * Margin area can be reached, but not printable or exportable. Range selection need to extend to out of page.
   */
  public static readonly HORIZONTAL_SPACE_DEFAULT = 1256
  public static readonly VERTICAL_SPACE_DEFAULT = 1256

  public static readonly ORIG_WIDTH_DEFAULT = 800
  public static readonly ORIG_HEIGHT_DEFAULT = 600

  private _zoom = 1.0
  private _gridSize = 10
  private _action: Action | undefined
  private _target: EditorItem | undefined
  private readonly _textArea: HTMLTextAreaElement
  private _targetItem: EditorItem | undefined
  private _title: string
  private _key: string
  private readonly _id: string
  private _modified: boolean
  private _operationService: OperationService = OperationService.instance
  private _origWidth: number
  private _origHeight: number
  private _showGrid: boolean = true
  private _snapToGrid: boolean = true
  private _gridColor: Color = Colors.Gray
  private _showBackground: boolean = false
  private _backgroundColor: Color = Colors.White
  private _mode: EditorMode = EditorMode.AUTO
  private _horizontalSpace: number = Editor.HORIZONTAL_SPACE_DEFAULT
  private _verticalSpace: number = Editor.VERTICAL_SPACE_DEFAULT
  private _theme: DocumentThemeType = DocumentThemeTypes[0]
  private _enableDarkTheme: boolean = true
  private _editorContext: EditorContext

  public constructor(canvasId: string | HTMLCanvasElement) {
    super(canvasId)
    this._editorContext = new EditorContext(this)
    this._title = ''
    this._key = ''
    this._id = CommonUtils.generateID()
    this._modified = false
    this._origWidth = Editor.ORIG_WIDTH_DEFAULT * this._zoom
    this._origHeight = Editor.ORIG_HEIGHT_DEFAULT * this.zoom
    this._showGrid = true
    this.root.addNode(this._editorContext.backgroundLayer)
    this.root.addNode(this._editorContext.contentLayer)
    this.root.addNode(this._editorContext.exportLayer)
    this.root.addNode(this._editorContext.controllerLayer)
    this.root.addNode(this._editorContext.rangeLayer)
    this.root.addNode(this._editorContext.containerLayer)
    this.root.addNode(this._editorContext.tableLayer)
    this.root.addNode(this._editorContext.moveLayer)
    this.root.addNode(this._editorContext.maskLayer)
    this.root.addNode(this._editorContext.hoverLayer)
    this.root.addNode(this._editorContext.selectionLayer)

    this._textArea = document.createElement('textarea')
    this.initializeTextArea()
    EditorUtils.enableDarkTheme = this._enableDarkTheme

    this._editorContext.maskLayer.onPointerDown((e) => {
      this.handlePointerDown(e)
    })

    this._editorContext.maskLayer.onPointerUp((e) => {
      this.handlePointerUp(e)
    })

    this._editorContext.maskLayer.onPointerMove((e) => {
      this.handlePointerMove(e)
    })
    this._editorContext.maskLayer.onPointerClick((e) => {
      this.handlePointerClick(e)
    })

    this._editorContext.maskLayer.onKeyDown((e) => {
      this.handleKeyDown(e)
    })

    this._editorContext.maskLayer.onKeyUp((e) => {
      this.handleKeyUp(e)
    })

    this._editorContext.maskLayer.onKeyPress((e) => {
      this.handleKeyPress(e)
    })
  }

  public get id(): string {
    return this._id
  }

  public get enableDarkTheme() {
    return this._enableDarkTheme
  }

  public set enableDarkTheme(value: boolean) {
    this._enableDarkTheme = value
    EditorUtils.enableDarkTheme = value
  }

  public get operationService() {
    return this._operationService
  }

  public get mode() {
    return this._mode
  }

  public get horizontalSpace() {
    return this._horizontalSpace
  }

  public set horizontalSpace(value: number) {
    if (this._horizontalSpace !== value) {
      this._horizontalSpace = value
      this.setup(this.zoom, this.origWidth, this.origHeight)
    }
  }

  public get verticalSpace() {
    return this._verticalSpace
  }

  public set verticalSpace(value: number) {
    if (this._verticalSpace !== value) {
      this._verticalSpace = value
      this.setup(this.zoom, this.origWidth, this.origHeight)
    }
  }

  public get workWidth(): number {
    return this.width - this.horizontalSpace * 2
  }

  public get workHeight(): number {
    return this.height - this.verticalSpace * 2
  }

  public get theme(): DocumentThemeType {
    return this._theme
  }

  public set theme(value: DocumentThemeType) {
    this._theme = value
  }

  public onOperationChange(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.operationChangeListeners.indexOf(callback)
    if (index < 0) {
      this._editorContext.operationChangeListeners.push(callback)
    }
  }

  public removeOperationChange(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.operationChangeListeners.indexOf(callback)
    if (index >= 0) {
      this._editorContext.operationChangeListeners.splice(index, 1)
    }
  }

  public hasOperationChange(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.operationChangeListeners.indexOf(callback)
    return index >= 0
  }

  public onOperationComplete(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.operationCompleteListeners.indexOf(callback)
    if (index < 0) {
      this._editorContext.operationCompleteListeners.push(callback)
    }
  }

  public removeOperationComplete(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.operationCompleteListeners.indexOf(callback)
    if (index >= 0) {
      this._editorContext.operationCompleteListeners.splice(index, 1)
    }
  }

  public hasOperationComplete(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.operationCompleteListeners.indexOf(callback)
    return index >= 0
  }

  public onSelectionChange(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.selectionChangeListeners.indexOf(callback)
    if (index < 0) {
      this._editorContext.selectionChangeListeners.push(callback)
    }
  }

  public removeSelectionChange(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.selectionChangeListeners.indexOf(callback)
    if (index >= 0) {
      this._editorContext.selectionChangeListeners.splice(index, 1)
    }
  }

  public hasSelectionChange(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.selectionChangeListeners.indexOf(callback)
    return index >= 0
  }

  public onTextEditStart(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.textEditStartListeners.indexOf(callback)
    if (index < 0) {
      this._editorContext.textEditStartListeners.push(callback)
    }
  }

  public removeTextEditStart(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.textEditStartListeners.indexOf(callback)
    if (index >= 0) {
      this._editorContext.textEditStartListeners.splice(index, 1)
    }
  }

  public hasTextEditStart(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.textEditStartListeners.indexOf(callback)
    return index >= 0
  }

  public onTextEditEnd(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.textEditEndListeners.indexOf(callback)
    if (index < 0) {
      this._editorContext.textEditEndListeners.push(callback)
    }
  }

  public removeTextEditEnd(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.textEditEndListeners.indexOf(callback)
    if (index >= 0) {
      this._editorContext.textEditEndListeners.splice(index, 1)
    }
  }

  public hasTextEditEnd(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.textEditEndListeners.indexOf(callback)
    return index >= 0
  }

  public onTableTextEditStart(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.tableTextEditStartListeners.indexOf(callback)
    if (index < 0) {
      this._editorContext.tableTextEditStartListeners.push(callback)
    }
  }

  public removeTableTextEditStart(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.tableTextEditStartListeners.indexOf(callback)
    if (index >= 0) {
      this._editorContext.tableTextEditStartListeners.splice(index, 1)
    }
  }

  public hasTableTextEditStart(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.tableTextEditStartListeners.indexOf(callback)
    return index >= 0
  }

  public onTableTextEditEnd(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.tableTextEditEndListeners.indexOf(callback)
    if (index < 0) {
      this._editorContext.tableTextEditEndListeners.push(callback)
    }
  }

  public removeTableTextEditEnd(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.tableTextEditEndListeners.indexOf(callback)
    if (index >= 0) {
      this._editorContext.tableTextEditEndListeners.splice(index, 1)
    }
  }

  public hasTableTextEditEnd(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.tableTextEditEndListeners.indexOf(callback)
    return index >= 0
  }

  public onSelectionResized(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.selectionResizedListeners.indexOf(callback)
    if (index < 0) {
      this._editorContext.selectionResizedListeners.push(callback)
    }
  }

  public removeSelectionResized(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.selectionResizedListeners.indexOf(callback)
    if (index >= 0) {
      this._editorContext.selectionResizedListeners.splice(index, 1)
    }
  }

  public hasSelectionResized(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.selectionResizedListeners.indexOf(callback)
    return index >= 0
  }

  public onSelectionResizing(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.selectionResizingListeners.indexOf(callback)
    if (index < 0) {
      this._editorContext.selectionResizingListeners.push(callback)
    }
  }

  public removeSelectionResizing(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.selectionResizingListeners.indexOf(callback)
    if (index >= 0) {
      this._editorContext.selectionResizingListeners.splice(index, 1)
    }
  }

  public hasSelectionResizing(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.selectionResizingListeners.indexOf(callback)
    return index >= 0
  }

  public onTextEditStyleChange(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.textEditStyleChangeListeners.indexOf(callback)
    if (index < 0) {
      this._editorContext.textEditStyleChangeListeners.push(callback)
    }
  }

  public removeTextEditStyleChange(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.textEditStyleChangeListeners.indexOf(callback)
    if (index >= 0) {
      this._editorContext.textEditStyleChangeListeners.splice(index, 1)
    }
  }

  public hasTextEditStyleChange(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.textEditStyleChangeListeners.indexOf(callback)
    return index >= 0
  }

  public onSizeChange(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.sizeChangeListeners.indexOf(callback)
    if (index < 0) {
      this._editorContext.sizeChangeListeners.push(callback)
    }
  }

  public removeSizeChange(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.sizeChangeListeners.indexOf(callback)
    if (index >= 0) {
      this._editorContext.sizeChangeListeners.splice(index, 1)
    }
  }

  public hasSizeChange(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.sizeChangeListeners.indexOf(callback)
    return index >= 0
  }

  public onEditorModeChange(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.editorModeChangeListeners.indexOf(callback)
    if (index < 0) {
      this._editorContext.editorModeChangeListeners.push(callback)
    }
  }

  public removeEditorModeChange(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.editorModeChangeListeners.indexOf(callback)
    if (index >= 0) {
      this._editorContext.editorModeChangeListeners.splice(index, 1)
    }
  }

  public hasEditorModeChange(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.editorModeChangeListeners.indexOf(callback)
    return index >= 0
  }

  public onEditorOperationEvent(callback: (e: EditorOperationEvent) => void) {
    const index = this._editorContext.editorOperationEventListeners.indexOf(callback)
    if (index < 0) {
      this._editorContext.editorOperationEventListeners.push(callback)
    }
  }

  public removeEditorOperationEvent(callback: (e: EditorOperationEvent) => void) {
    const index = this._editorContext.editorOperationEventListeners.indexOf(callback)
    if (index >= 0) {
      this._editorContext.editorOperationEventListeners.splice(index, 1)
    }
  }

  public hasEditorOperationEvent(callback: (e: EditorOperationEvent) => void) {
    const index = this._editorContext.editorOperationEventListeners.indexOf(callback)
    return index >= 0
  }

  public get gridSize(): number {
    return this._gridSize
  }

  public set gridSize(value: number) {
    this._gridSize = value
    this._editorContext.backgroundLayer.gridSize = value
  }

  public get showGrid(): boolean {
    return this._showGrid
  }

  public set showGrid(value: boolean) {
    this._showGrid = value
    this._editorContext.backgroundLayer.invalidateLayer()
  }

  public get snapToGrid(): boolean {
    return this._snapToGrid
  }

  public set snapToGrid(value: boolean) {
    this._snapToGrid = value
    this._editorContext.backgroundLayer.invalidateLayer()
  }

  public get gridColor() {
    return this._gridColor
  }

  public set gridColor(value: Color) {
    this._gridColor = value
    this._editorContext.backgroundLayer.gridColor = value
  }

  public get showBackground() {
    return this._showBackground
  }

  public set showBackground(value: boolean) {
    this._showBackground = value
    this._editorContext.backgroundLayer.invalidateLayer()
  }

  public get backgroundColor() {
    return this._backgroundColor
  }

  public set backgroundColor(value: Color) {
    this._backgroundColor = value
    this._editorContext.backgroundLayer.backgroundColor = value
  }

  public get isTextEditting(): boolean {
    return this._editorContext.textFocused
  }

  public get contentLayer(): EditorLayer {
    return this._editorContext.contentLayer
  }

  public get exportLayer(): EditorLayer {
    return this._editorContext.exportLayer
  }

  public get selectionLayer(): EditorLayer {
    return this._editorContext.selectionLayer
  }

  public get hoverLayer(): EditorLayer {
    return this._editorContext.hoverLayer
  }

  public get target(): EditorItem | undefined {
    return this._target
  }

  public get targetItem(): EditorItem | undefined {
    return this._targetItem
  }

  public get targetItemIndex(): number {
    return this._editorContext.targetItemIndex
  }

  public get zoom(): number {
    return this._zoom
  }

  public set zoom(value: number) {
    this._zoom = value
    this.resize(this._origWidth, this._origHeight)
    this.triggerSizeChange()
  }

  public setup(zoom: number, origWidth: number, origHeight: number) {
    this._origWidth = origWidth
    this._origHeight = origHeight
    this._zoom = zoom
    this.resize(this._origWidth, this._origHeight)
    this.triggerSizeChange()
  }

  public get action(): Action | undefined {
    return this._action
  }

  public set action(value: Action | undefined) {
    this._action = value
    if (this._action) {
      //If theme is setup for document, we need to prepare theme for new shapes in editor here, but we need to skip for SVG and Image
      if (this._action.items[0] instanceof Connector && !(this._action instanceof MyShapeAction)) {
        this._action.items[0].strokeColor = CommonUtils.parseColorString(this._theme.connectorStrokeColor)!
        this._action.items[0].fillColor = CommonUtils.parseColorString(this._theme.connectorFillColor)!
        this._action.items[0].fontColor = CommonUtils.parseColorString(this._theme.connectorFontColor)!
      } else if (
        this._action.items[0].useTheme &&
        !(this._action.items[0] instanceof SvgContainer || this._action.items[0] instanceof ImageContainer) &&
        !(this._action instanceof MyShapeAction)
      ) {
        this._action.items.forEach((item) => {
          this.updateItemTheme(item)
        })
      }
    }
  }

  private updateItemTheme(item: EditorItem) {
    item.themeName = this._theme.name
    item.strokeColor = CommonUtils.parseColorString(this._theme.shapeStrokeColor)!
    item.fillColor = CommonUtils.parseColorString(this._theme.shapeFillColor)!
    item.fontColor = CommonUtils.parseColorString(this._theme.shapeFontColor)!
    item.items.forEach((child) => {
      this.updateItemTheme(child)
    })
  }

  public get title() {
    return this._title
  }

  public set title(value: string) {
    this._title = value
  }

  public get key() {
    return this._key
  }

  public set key(value: string) {
    this._key = value
  }

  public get origWidth() {
    return this._origWidth
  }

  public get origHeight() {
    return this._origHeight
  }

  public isModified(): boolean {
    return this._modified
  }

  public resetModified() {
    this._modified = false
  }

  public resize(origWidth: number, origHeight: number) {
    super.resize(origWidth * this._zoom + this.horizontalSpace * 2, origHeight * this._zoom + this.verticalSpace * 2)
  }

  public invalidate() {
    super.invalidate()
    const newBoundary = new Rectangle(this.horizontalSpace, this.verticalSpace, this.width - this.horizontalSpace, this.height - this.verticalSpace)
    const newFullBoundary = new Rectangle(0, 0, this.width, this.height)
    this._editorContext.backgroundLayer.boundary = newBoundary
    this._editorContext.contentLayer.boundary = newBoundary
    this._editorContext.exportLayer.boundary = newBoundary
    this._editorContext.controllerLayer.boundary = newBoundary
    this._editorContext.hoverLayer.boundary = newFullBoundary
    this._editorContext.selectionLayer.boundary = newFullBoundary
    this._editorContext.maskLayer.boundary = newFullBoundary
    this._editorContext.rangeLayer.boundary = newFullBoundary
    this._editorContext.moveLayer.boundary = newBoundary
    this._editorContext.containerLayer.boundary = newBoundary
    this._editorContext.tableLayer.boundary = newFullBoundary
    this._editorContext.backgroundLayer.invalidateLayer()
  }

  /**
   * while Editor become focused or activated
   */
  public activate() {
    if (this.engine.container?.parentElement) {
      this.engine.container.parentElement.append(this._textArea)
    }
  }

  // render
  public render() {
    this._editorContext.contentLayer.scale = new Scale(this._zoom, this._zoom)
    this._editorContext.exportLayer.scale = new Scale(this._zoom, this._zoom)
    //this._selectionLayer.scale = new Scale(this._zoom, this._zoom)
    this._editorContext.controllerLayer.scale = new Scale(this._zoom, this._zoom)
    //this._hoverLayer.scale = new Scale(this._zoom, this._zoom)
    //this._rangeLayer.scale = new Scale(this._zoom, this._zoom)
    //this._moveLayer.scale = new Scale(this._zoom, this._zoom)
    //this._containerLayer.scale = new Scale(this._zoom, this._zoom)
    super.render()
  }

  public undo() {
    let operation = this._operationService.getUndoOperation()
    if (operation) {
      switch (operation.type) {
        case OperationType.ADD_ITEMS:
          this.handleOperationUndoAddItems(operation.itemInfos)
          break
        case OperationType.REMOVE_ITEMS:
          this.handleOperationUndoRemoveItems(operation.itemInfos)
          break
        case OperationType.UPDATE_ITEMS:
          this.handleOperationUndoUpdateItems(operation.origItemInfos)
          break
        case OperationType.ADD_SELECTION_ITEMS:
          this.handleOperationUndoAddSelectionItems(operation.itemInfos)
          break
        case OperationType.REMOVE_SELECTION_ITEMS:
          this.handleOperationUndoRemoveSelectionItems(operation.itemInfos)
          break
        case OperationType.SELECT_EDITOR:
          this.triggerEditorOperationEvent(operation, true)
          break
        case OperationType.ADD_EDITOR:
          this.triggerEditorOperationEvent(operation, true)
          break
        case OperationType.REMOVE_EDITOR:
          this.triggerEditorOperationEvent(operation, true)
          break
        case OperationType.RENAME_EDITOR:
          this.triggerEditorOperationEvent(operation, true)
          break
        case OperationType.MOVE_EDITOR:
          this.triggerEditorOperationEvent(operation, true)
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
          this.triggerEditorOperationEvent(operation, true)
          break
        default:
          break
      }
      this._operationService.undo()
      this.triggerOperationComplete()
    }
  }

  public redo() {
    let operation = this._operationService.getRedoOperation()
    if (operation) {
      switch (operation.type) {
        case OperationType.ADD_ITEMS:
          this.handleOperationRedoAddItems(operation.itemInfos)
          break
        case OperationType.REMOVE_ITEMS:
          this.handleOperationRedoRemoveItems(operation.itemInfos)
          break
        case OperationType.UPDATE_ITEMS:
          this.handleOperationRedoUpdateItems(operation.itemInfos)
          break
        case OperationType.ADD_SELECTION_ITEMS:
          this.handleOperationRedoAddSelectionItems(operation.itemInfos)
          break
        case OperationType.REMOVE_SELECTION_ITEMS:
          this.handleOperationRedoRemoveSelectionItems(operation.itemInfos)
          break
        case OperationType.SELECT_EDITOR:
          this.triggerEditorOperationEvent(operation, false)
          break
        case OperationType.ADD_EDITOR:
          this.triggerEditorOperationEvent(operation, false)
          break
        case OperationType.REMOVE_EDITOR:
          this.triggerEditorOperationEvent(operation, false)
          break
        case OperationType.RENAME_EDITOR:
          this.triggerEditorOperationEvent(operation, false)
          break
        case OperationType.MOVE_EDITOR:
          this.triggerEditorOperationEvent(operation, false)
          break
        case OperationType.SHAPE_TEXT_EDIT:
          this.handleOperationRedoShapTextEdit(operation)
          break
        case OperationType.TABLE_TEXT_EDIT:
          this.handleOperationRedoTableTextEdit(operation)
          break
        case OperationType.ADD_ITEMS_TO_CONTAINER:
          break
        case OperationType.REMOVE_ITEMS_FROM_CONTAINER:
          break
        case OperationType.UPDATE_DOCUMENT_THEME:
          this.triggerEditorOperationEvent(operation, false)
          break
        default:
          break
      }
      this._operationService.redo()
      this.triggerOperationComplete()
    }
  }

  public get undoable() {
    return this._operationService.getUndoOperations().length > 0
  }

  public get redoable() {
    return this._operationService.getRedoOperations().length > 0
  }

  public handlePointerMove(e: PointerEvent) {
    //console.log(`Moving... x = ${e.x} action=${this._action}`)
    if (this._action) {
      //  in creating action
      this.handlePointMoveInAction(e, this._action)
    } else if (this._editorContext.targetRowResizing) {
      this.handleTargetRowResizing(e)
    } else if (this._editorContext.targetColumnResizing) {
      this.handleTargetColumnResizing(e)
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public handlePointerLeave(e: PointerEvent) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public handlePointerEnter(e: PointerEvent) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public handlePointerClick(e: PointerEvent) {}

  public handlePointerDown(e: PointerEvent) {
    //console.log(`handle Mouse Down ... x = ${e.x}`)
    if (e.mouseCode === MouseCode.RIGHT_MOUSE_DOWN) {
      //Popup menu require this
      this.handleMouseRightButtonDown(e)
      return
    }
    this._editorContext.startPointX = e.x
    this._editorContext.startPointY = e.y
    this._modified = true
    if (this._action) {
      this.handleCreationAction(e)
    } else {
      const clickedEditorItem = this.findEditorItem(e.x, e.y, false)
      const theSelectionLayer = this.selectionLayer as SelectionLayer
      const isEdge = clickedEditorItem ? this.hasEditorItemJoint(clickedEditorItem, e.x, e.y) && !this.checkParentType(clickedEditorItem, FrameEntity) : false
      const inClickEditorItem = clickedEditorItem ? this.isInEditorItem(clickedEditorItem, e.x, e.y) : false
      if (clickedEditorItem && isEdge && !inClickEditorItem) {
        //Create connector
        const targetPoint = this.findEditorItemJoint(clickedEditorItem, e.x, e.y, false)
        //const horizontal = this.checkIfConnectorHorizontal(clickedEditorItem, e.x, e.y)
        const startDirection = this.findConnectorDirection(clickedEditorItem, e.x, e.y)
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
        theControllerLayer.removeAllEditorItems()
        theControllerLayer.addEditorItem(connector)
        targetEntity.addSourceConnector(connector)
        if (this._target) {
          this._target.shape.focused = false
        }
        this.checkAndEndTextEdit()
        this.finishTextEditOperation()
        if (this._target) {
          this._target.shape.focused = false
        }
        if (this._targetItem) {
          this._targetItem.shape.focused = false
        }
        this._target = undefined
        this._editorContext.targetTime = 0
        this._editorContext.targetColumnResizing = false
        this._editorContext.targetRowResizing = false
        this._targetItem = undefined
        this._editorContext.targetItemIndex = -1
        this.handleTableActiveCellShape()
      } else if (clickedEditorItem) {
        if (!theSelectionLayer.hasEditorItem(clickedEditorItem)) {
          theSelectionLayer.inHolder = true
          theSelectionLayer.removeAllEditorItems()
          theSelectionLayer.addEditorItem(clickedEditorItem)
          this.triggerSelectionChange()
          this._editorContext.targetColumnResizing = false
          this._editorContext.targetRowResizing = false
          this.beginOperation(clickedEditorItem)
          this.checkAndEndTextEdit()
          this.finishTextEditOperation()
          this.startMoveOutline(e)
          if (this._target) {
            this._target.shape.focused = false
          }
          if (this._targetItem) {
            this._targetItem.shape.focused = false
          }
          this._targetItem = undefined
          this._editorContext.targetItemIndex = -1
          if (!((clickedEditorItem as Item).parent instanceof FrameEntity)) {
            this._editorContext.inMoving = true
          }
        } else if (clickedEditorItem instanceof TableEntity) {
          if (!clickedEditorItem.locked) {
            const targetPoint = this.findEditorItemPoint(clickedEditorItem, e.x, e.y)
            const [targetRow, targetRowIndex] = this.isTableRowResizable(clickedEditorItem, targetPoint.x, targetPoint.y)
            const [targetColumn, targetColumnIndex] = this.isTableColumnResizable(clickedEditorItem, targetPoint.x, targetPoint.y)
            this._target = clickedEditorItem
            if (targetRow) {
              // console.log('========1')
              this.checkAndEndTextEdit()
              this.finishTextEditOperation()
              this._editorContext.targetRowResizing = true
              this._editorContext.targetRowIndex = targetRowIndex
              if (this._targetItem) {
                this._targetItem.shape.focused = false
              }
              this._targetItem = undefined
              this._editorContext.targetItemIndex = -1
              this.handleTableActiveCellShape()
              this._editorContext.inMoving = true
              this.startMoveOutline(e)
            } else if (targetColumn) {
              // console.log('========0')
              this.checkAndEndTextEdit()
              this.finishTextEditOperation()
              this._editorContext.targetColumnResizing = targetColumn
              this._editorContext.targetColumnIndex = targetColumnIndex
              if (this._targetItem) {
                this._targetItem.shape.focused = false
              }
              this._targetItem = undefined
              this.handleTableActiveCellShape()
              this._editorContext.targetItemIndex = -1
              this._editorContext.inMoving = true
              this.startMoveOutline(e)
            } else {
              const itemIndex = this.findTableItemIndex(clickedEditorItem, targetPoint.x, targetPoint.y)
              if (this._editorContext.targetItemIndex !== itemIndex) {
                this._editorContext.targetItemIndex = itemIndex
                if (this._targetItem) {
                  this._targetItem.shape.focused = false
                }
                this._targetItem = clickedEditorItem.items[itemIndex]
                this._targetItem.shape.focused = true
                this.handleTableActiveCellShape()
                this._editorContext.inMoving = true
                this.checkAndStartTextEdit()
                this.beginTextEditOperation(clickedEditorItem)
                this.startMoveOutline(e)
                const cellPoint = this.findEditorItemPoint(this._targetItem, e.x, e.y)
                this.updateTextCursorLocation(this._targetItem, cellPoint.x, cellPoint.y)
                this._targetItem.shape.enter(cellPoint.x, cellPoint.y)
                this._editorContext.textSelecting = true
              } else {
                //In text Editting
                if (this.isTextEditting && this._targetItem) {
                  this._editorContext.inMoving = false
                  const cellPoint = this.findEditorItemPoint(this._targetItem, e.x, e.y)
                  this.updateTextCursorLocation(this._targetItem, cellPoint.x, cellPoint.y)
                  this._targetItem.shape.enter(cellPoint.x, cellPoint.y)
                  this._editorContext.textSelecting = true
                } else {
                  this._editorContext.inMoving = true
                  this.checkAndEndTextEdit()
                  this.finishTextEditOperation()
                  this.startMoveOutline(e)
                }
              }
            }
            this.beginOperation(clickedEditorItem)
          }
        } else if (this._editorContext.textFocused) {
          const targetPoint = this.findEditorItemPoint(clickedEditorItem, e.x, e.y)
          this.updateTextCursorLocation(clickedEditorItem, targetPoint.x, targetPoint.y)
          clickedEditorItem.shape.enter(targetPoint.x, targetPoint.y)
          this._editorContext.textSelecting = true
        } else {
          if (!clickedEditorItem.locked) {
            if (!((clickedEditorItem as Item).parent instanceof FrameEntity)) {
              this.beginOperation(clickedEditorItem)
              this._editorContext.inMoving = true
              this.startMoveOutline(e)
            }
          }
        }
      } else {
        theSelectionLayer.removeAllEditorItems()
        this.triggerSelectionChange()
        this.checkAndEndTextEdit()
        this.finishTextEditOperation()
        if (this._target) {
          this._target.shape.focused = false
        }

        if (this._targetItem) {
          this._targetItem.shape.focused = false
        }
        this._target = undefined
        this._editorContext.targetTime = 0
        this._editorContext.targetColumnResizing = false
        this._editorContext.targetRowResizing = false
        this._targetItem = undefined
        this._editorContext.targetItemIndex = -1
        this.handleTableActiveCellShape()
        this.startRangeSelecting(e)
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public handleDoubleClick(e: PointerEvent) {}

  public handlePointerUp(e: PointerEvent) {
    //console.log(`Pointer up event = ${e}`)
    if (e.mouseCode === MouseCode.RIGHT_MOUSE_UP) {
      return
    }
    if (this._action) {
      // It shouldn't happen here
      //console.log(`It is a exception here, shouldn't be reached`)
      this.selectionLayer.removeAllEditorItems()
      this.selectionLayer.addEditorItems(this._action.items)
      let editorItemInfos = OperationHelper.saveEditorItems(this._action.items)
      let operation = new Operation(this, OperationType.ADD_ITEMS, editorItemInfos, true, [])
      this._operationService.addOperation(operation)
      this.triggerOperationChange()
      this._action = undefined
    } else if (this._editorContext.inCreatingConnector) {
      //console.log(`It is a exception here, shouldn't be reached`)
      const theControllerLayer = this._editorContext.controllerLayer as ControllerLayer
      const theSelectionLayer = this.selectionLayer as SelectionLayer
      const connector = theControllerLayer.getEditorItem(0)
      this._editorContext.controllerLayer.removeAllEditorItems()
      this.contentLayer.addEditorItem(connector)
      theSelectionLayer.inHolder = true
      theSelectionLayer.removeAllEditorItems()
      theSelectionLayer.addEditorItem(connector)
      theSelectionLayer.invalidateLayer()
      let editorItemInfo = OperationHelper.saveEditorItem(connector)
      let operation = new Operation(this, OperationType.ADD_ITEMS, [editorItemInfo], true, [])
      this._operationService.addOperation(operation)
      this.triggerOperationChange()
      //this.triggerSelectionResized()
      this.triggerSelectionChange()
      this._action = undefined
      // } else if (this.inMoving_) {
      //  const theSelectionLayer = this.selectionLayer
      //  const editorItem = theSelectionLayer.getEditorItem(0)
      //  this.selectionLayer.removeAllEditorItems()
      //  this.contentLayer.addEditorItem(editorItem)
    } else if (this._editorContext.inContainerSelection) {
      this.finishContainerSelection(e)
    } else {
      const clickedEditorItem = this.findEditorItem(e.x, e.y, false)
      if (clickedEditorItem) {
        const targetPoint = this.findEditorItemPoint(clickedEditorItem, e.x, e.y)
        if (clickedEditorItem instanceof TableEntity) {
          //Need this to update toolbar in time
          this.triggerSelectionResized()
        }
        if (this._target !== clickedEditorItem) {
          if (this._target) {
            this._target.shape.focused = false
            this.checkAndEndTextEdit()
            this.finishTextEditOperation()
          }
          this._target = clickedEditorItem
          this._editorContext.targetTime = Date.now()
        } else {
          if (clickedEditorItem instanceof TableEntity) {
            if (!clickedEditorItem.locked) {
              const itemIndex = this.findTableItemIndex(clickedEditorItem, targetPoint.x, targetPoint.y)
              if (itemIndex === this._editorContext.targetItemIndex && this._targetItem) {
                const cellPoint = this.findEditorItemPoint(this._targetItem, e.x, e.y)
                const nowTime = Date.now()
                if (this._targetItem.shape.focused) {
                  this._textArea.focus()
                  this.updateTextCursorLocation(this._targetItem, cellPoint.x, cellPoint.y)
                  this._targetItem.shape.enterTo(cellPoint.x, cellPoint.y)
                  this._editorContext.textSelecting = false
                  this.triggerTextEditStyleChange()
                } else {
                  // Check double click
                  if (nowTime - this._editorContext.targetTime < Editor.DOUBLE_CLICK_TIME) {
                    // console.log('Double click is detected')
                    // this.handleDoubleClick(e)
                    this._textArea.focus()
                    this._targetItem.shape.enter(cellPoint.x, cellPoint.y)
                    this.checkAndStartTextEdit()
                    if (this._targetItem) {
                      this._targetItem.shape.focused = true
                    }
                    this._textArea.textContent = ''
                    this.updateTextCursorLocation(this._targetItem, cellPoint.x, cellPoint.y)
                    this.triggerTextEditStyleChange()
                    this.beginTextEditOperation(clickedEditorItem)
                  }
                }
                this._editorContext.targetTime = nowTime
              }
            }
          } else {
            if (!clickedEditorItem.locked) {
              const nowTime = Date.now()
              if (this._target.shape.focused) {
                this._textArea.focus()
                this.updateTextCursorLocation(clickedEditorItem, targetPoint.x, targetPoint.y)
                this._target.shape.enterTo(targetPoint.x, targetPoint.y)
                this._editorContext.textSelecting = false
                this.triggerTextEditStyleChange()
              } else {
                // Check double click
                if (nowTime - this._editorContext.targetTime < Editor.DOUBLE_CLICK_TIME) {
                  //console.log('Double click is detected')
                  // this.handleDoubleClick(e)
                  if (this._target instanceof Connector) {
                    let origItemInfo = OperationHelper.saveEditorItem(this._target)
                    this.createTextBoxInConnector(this._target, targetPoint.x, targetPoint.y)
                    let editorItemInfo = OperationHelper.saveEditorItem(this._target)
                    let operation = new Operation(this, OperationType.UPDATE_ITEMS, [editorItemInfo], true, [origItemInfo])
                    this._operationService.addOperation(operation)
                    this.triggerOperationChange()
                  } else {
                    this._textArea.focus()
                    this._target.shape.enter(targetPoint.x, targetPoint.y)
                    this.checkAndStartTextEdit()
                    if (this._target) {
                      this._target.shape.focused = true
                    }
                    this._textArea.textContent = ''
                    this.updateTextCursorLocation(clickedEditorItem, targetPoint.x, targetPoint.y)
                    this.triggerTextEditStyleChange()
                    this.beginTextEditOperation(this._target)
                  }
                }
              }
              this._editorContext.targetTime = nowTime
            }
          }
        }
      }
    }
    if (this._editorContext.inMoving && this._editorContext.moveStarted && this._target && this._editorContext.startEditorItemInfos.length > 0) {
      this.finishOperation(this._target)
    }
    if (this._editorContext.inRangeSelecting) {
      this.endRangeSelecting(e)
    }
    if (this._editorContext.inMoving) {
      // Shape is moved out of container here
      this.removeItemsFromContainer(e)
      this.endMoveOutline(e)
      this._editorContext.inMoving = false
      this._editorContext.moveStarted = false
    }
    this._editorContext.inCreatingConnector = false
    this._editorContext.targetRowResizing = false
    this._editorContext.targetColumnResizing = false
  }

  public selectAll() {
    this.contentLayer.getAllEditorItems().forEach((editorItem) => {
      this.selectionLayer.addEditorItem(editorItem)
    })
    this.triggerSelectionChange()
  }

  public focus() {
    if (this._editorContext.textFocused) {
      this._textArea.focus()
    }
  }

  public handleKeyDown(e: KeyEvent) {
    console.log(`key down event: ${e.code}   ${e.key}`)
  }

  public handleKeyUp(e: KeyEvent) {
    console.log(`key up event: ${e.code}   ${e.key}`)
  }

  public handleKeyPress(e: KeyEvent) {
    console.log(`key press event: ${e.code}   ${e.key}`)
  }

  public invalideHolder() {
    this._editorContext.selectionLayer.invalidateLayer()
    this._editorContext.hoverLayer.invalidateLayer()
  }

  private initializeTextArea() {
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this._textArea.addEventListener(
      'compositionstart',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (e: CompositionEvent) => {
        this._editorContext.textInputStatus = 'CHINESE_TYPING'
      },
      false,
    )
    this._textArea.addEventListener('input', (e: any): void => {
      if (this._editorContext.textInputStatus === 'CHINESE_TYPING') {
        return
      }
      if (this._target && this._targetItem && e.data) {
        const [origEditorItemInfo, startIndex, endIndex] = this.beginShapeTextEditOperation(this._target)
        this._targetItem.shape.insert(e.data)
        this.finishShapeTextEditOperation(origEditorItemInfo, startIndex, endIndex)
        this.triggerTextEditStyleChange()
      } else if (this._target && e.data) {
        const [origEditorItemInfo, startIndex, endIndex] = this.beginShapeTextEditOperation(this._target)
        this._target.shape.insert(e.data)
        this.finishShapeTextEditOperation(origEditorItemInfo, startIndex, endIndex)
        this.triggerTextEditStyleChange()
      }
      this._editorContext.textInputStatus = 'CHAR_TYPING'
    })
    this._textArea.addEventListener('compositionend', (e: CompositionEvent) => {
      if (this._editorContext.textInputStatus === 'CHINESE_TYPING') {
        if (this._target && this._targetItem) {
          const [origEditorItemInfo, startIndex, endIndex] = this.beginShapeTextEditOperation(this._target)
          this._targetItem.shape.insert(e.data)
          this.finishShapeTextEditOperation(origEditorItemInfo, startIndex, endIndex)
          this.triggerTextEditStyleChange()
        } else if (this._target) {
          const [origEditorItemInfo, startIndex, endIndex] = this.beginShapeTextEditOperation(this._target)
          this._target.shape.insert(e.data)
          this.finishShapeTextEditOperation(origEditorItemInfo, startIndex, endIndex)
          this.triggerTextEditStyleChange()
        }
        this._editorContext.textInputStatus = 'CHAR_TYPING'
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
      this._textArea.style.left = Editor.SHADOW_SIZE + point.x * this._zoom + this.horizontalSpace - scrollContainer.scrollLeft + 'px'
      this._textArea.style.top = Editor.SHADOW_SIZE + point.y * this._zoom + this.verticalSpace - scrollContainer.scrollTop + 'px'
      //console.log(`'Check left = ${editorItem.left}  x=${x} text.left = ${this._textArea.style.left}  scroll=${scrollContainer.scrollLeft}`)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private handleTextAreaKeyDown(e: KeyboardEvent) {
    // console.log(`Key Down ${e.code}`)
    this._editorContext.textCommandKey = false
  }

  private handleTextAreaKeyUp(e: KeyboardEvent) {
    //console.log(`Key Up ${e.code}  ${e.altKey}  ${e.ctrlKey} ${e.key}`)
    if (e.key === 'Meta' || e.key === 'Control') {
      this._editorContext.textCommandKey = true
    }
    if (e.ctrlKey && e.key === 'a') {
      if (this._targetItem) {
        this._targetItem.shape.selectAll()
      } else if (this._target) {
        this._target.shape.selectAll()
      }
      return
    }

    if (this._editorContext.textFocused && e.key === 'Backspace') {
      if (this._target && this._targetItem) {
        const [origEditorItemInfo, startIndex, endIndex] = this.beginShapeTextEditOperation(this._target)
        this._targetItem.shape.handleBackspace()
        this.finishShapeTextEditOperation(origEditorItemInfo, startIndex, endIndex)
      } else if (this._target) {
        const [origEditorItemInfo, startIndex, endIndex] = this.beginShapeTextEditOperation(this._target)
        this._target.shape.handleBackspace()
        this.finishShapeTextEditOperation(origEditorItemInfo, startIndex, endIndex)
      }
    }

    if (this._editorContext.textFocused && e.key === 'Delete') {
      if (this._target && this._targetItem) {
        const [origEditorItemInfo, startIndex, endIndex] = this.beginShapeTextEditOperation(this._target)
        this._targetItem.shape.handleDelete()
        this.finishShapeTextEditOperation(origEditorItemInfo, startIndex, endIndex)
      } else if (this._target) {
        const [origEditorItemInfo, startIndex, endIndex] = this.beginShapeTextEditOperation(this._target)
        this._target.shape.handleDelete()
        this.finishShapeTextEditOperation(origEditorItemInfo, startIndex, endIndex)
      }
    }

    if (this._editorContext.textFocused && e.key === 'ArrowLeft') {
      if (this._targetItem) {
        this._targetItem.shape.moveColumns(-1)
      } else if (this._target) {
        this._target.shape.moveColumns(-1)
      }
    }
    if (this._editorContext.textFocused && e.key === 'ArrowRight') {
      if (this._targetItem) {
        this._targetItem.shape.moveColumns(1)
      } else if (this._target) {
        this._target.shape.moveColumns(1)
      }
    }
    if (this._editorContext.textFocused && e.key === 'ArrowUp') {
      if (this._targetItem) {
        this._targetItem.shape.moveRows(-1)
      } else if (this._target) {
        this._target.shape.moveRows(-1)
      }
    }
    if (this._editorContext.textFocused && e.key === 'ArrowDown') {
      if (this._targetItem) {
        this._targetItem.shape.moveRows(1)
      } else if (this._target) {
        this._target.shape.moveRows(1)
      }
    }
    if (this._editorContext.textFocused && e.key === 'Home') {
      if (this._targetItem) {
        this._targetItem.shape.moveColumnsToHome()
      } else if (this._target) {
        this._target.shape.moveColumnsToHome()
      }
    }
    if (this._editorContext.textFocused && e.key === 'End') {
      if (this._targetItem) {
        this._targetItem.shape.moveColumnsToEnd()
      } else if (this._target) {
        this._target.shape.moveColumnsToEnd()
      }
    }
    if (this._editorContext.textFocused && e.key === 'Enter') {
      if (this._target && this._targetItem) {
        const [origEditorItemInfo, startIndex, endIndex] = this.beginShapeTextEditOperation(this._target)
        this._targetItem.shape.handleReturn()
        this.finishShapeTextEditOperation(origEditorItemInfo, startIndex, endIndex)
      } else if (this._target) {
        const [origEditorItemInfo, startIndex, endIndex] = this.beginShapeTextEditOperation(this._target)
        this._target.shape.handleReturn()
        this.finishShapeTextEditOperation(origEditorItemInfo, startIndex, endIndex)
      }
    }
  }

  public toFront(editorItems: EditorItem[]) {
    editorItems.forEach((editorItem) => {
      this.contentLayer.removeEditorItem(editorItem)
      this.contentLayer.addEditorItem(editorItem)
    })
  }

  public toBack(editorItems: EditorItem[]) {
    editorItems.forEach((editorItem) => {
      this.contentLayer.removeEditorItem(editorItem)
      this.contentLayer.addEditorItemAt(editorItem, 0)
    })
  }

  public sendBackward(editorItem: EditorItem) {
    const index = this.contentLayer.getIndexOfEditorItem(editorItem)
    if (index > 0) {
      this.contentLayer.removeEditorItem(editorItem)
      this.contentLayer.addEditorItemAt(editorItem, index - 1)
    }
  }

  public bringForeward(editorItem: EditorItem) {
    const index = this.contentLayer.getIndexOfEditorItem(editorItem)
    if (index < this.contentLayer.getEditorItemCount() - 1) {
      this.contentLayer.removeEditorItem(editorItem)
      this.contentLayer.addEditorItemAt(editorItem, index + 1)
    }
  }

  public isInEditorItem(editorItem: EditorItem, x: number, y: number): boolean {
    const shape = editorItem.shape
    const inClickEditorItem = shape.contains(x, y)
    return inClickEditorItem
  }

  public findEditorItem(x: number, y: number, excludeConnector: boolean = false): EditorItem | undefined {
    let result
    const count = this.contentLayer.getEditorItemCount()
    for (let i = count - 1; i >= 0; i--) {
      const editorItem = this.contentLayer.getEditorItem(i)
      result = this.findEditorItemDetail(editorItem, x, y, excludeConnector)
      if (result) {
        break
      }
    }
    return result
  }

  private findEditorItemDetail(editorItem: EditorItem, x: number, y: number, excludeConnector: boolean = false): EditorItem | undefined {
    let result = undefined
    const count = editorItem.items.length
    const shape = editorItem.shape
    //const worldTransform = shape.worldInverseTransform
    //let newX = x
    //let newY = y
    //if(worldTransform) {
    //  const newPoint = worldTransform.makePoint(new Point2(x, y))
    //  newX = newPoint.x
    //  newY = newPoint.y
    //}
    if (editorItem instanceof Connector && excludeConnector) {
      result = undefined
      // } else if((editorItem as Item).parent instanceof FrameEntity) {
      //   result = undefined
    } else {
      if (shape.intersects(x - Editor.TEST_RADIUS, y - Editor.TEST_RADIUS, Editor.TEST_SIZE, Editor.TEST_SIZE)) {
        result = editorItem
      }
      // if(!(editorItem instanceof TableEntity) && !(editorItem instanceof FrameEntity)) {
      if (!(editorItem instanceof TableEntity)) {
        for (let i = count - 1; i >= 0; i--) {
          const child = editorItem.items[i]
          let childResult = this.findEditorItemDetail(child, x, y, excludeConnector)
          if (childResult) {
            result = childResult
            break
          }
        }
      }
    }
    return result
  }

  public findEditorItemById(id: string): EditorItem | undefined {
    let result
    const count = this.contentLayer.getEditorItemCount()
    for (let i = count - 1; i >= 0; i--) {
      const editorItem = this.contentLayer.getEditorItem(i)
      if (editorItem.id === id) {
        return editorItem
      }
      result = this.findEditorItemDetailById(editorItem, id)
      if (result) {
        break
      }
    }
    return undefined
  }

  public findEditorItemDetailById(editorItem: EditorItem, id: string): EditorItem | undefined {
    let result
    const count = editorItem.items.length
    for (let i = 0; i < count; i++) {
      const childEditorItem = editorItem.items[i]
      if (childEditorItem.id === id) {
        return childEditorItem
      }
      result = this.findEditorItemDetailById(childEditorItem, id)
      if (result) {
        break
      }
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
    const count = this.contentLayer.getEditorItemCount()
    for (let i = 0; i < count; i++) {
      const editorItem = this.contentLayer.getEditorItem(i)
      const shape = editorItem.shape
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
      if (!this._action || this._action.items.length === 0) {
        const selectionCount = this.selectionLayer.getEditorItemCount()
        for (let j = 0; j < selectionCount; j++) {
          const selection = this.selectionLayer.getEditorItem(j)
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

  public hasEditorItemJoint(editorItem: EditorItem, x: number, y: number): boolean {
    let result = false
    const shape = editorItem.shape
    let inEditorItem = false
    let outEditorItem = false
    const startX = x - Editor.TEST_RADIUS
    const startY = y - Editor.TEST_RADIUS
    const endX = x + Editor.TEST_RADIUS
    const endY = y + Editor.TEST_RADIUS
    //console.log(`Finding items ${x}    ${y}    ==== ${shape.position.x}    ${shape.position.y}  ${shape.width}`)
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

  public findEditorItemJoint(editorItem: EditorItem, x: number, y: number, inEditorItem: boolean): Point2 {
    const shape = editorItem.shape
    const centerX = x
    const centerY = y
    const startX = x - Editor.TEST_RADIUS
    const startY = y - Editor.TEST_RADIUS
    //const endX = x + Editor.TEST_RADIUS
    //const endY = y + Editor.TEST_RADIUS
    let distance = 999999999
    let targetX = startX
    let targetY = startY
    // for (let i = startX; i <= endX; i++) {
    //   for (let j = startY; j <= endY; j++) {
    //     let contained = shape.contains(i, j)
    //     // 如果鼠标在外面则求里面的点到目标点最近距离，否则外面的点到目标点点最近距离
    //     if (inEditorItem) {
    //       contained = !contained
    //     }
    //     if (contained) {
    //       const newDistance = (centerX - i) * (centerX - i) + (centerY - j) * (centerY - j)
    //       if (newDistance < distance) {
    //         distance = newDistance
    //         targetX = i
    //         targetY = j
    //       }
    //     }
    //   }
    // }
    //Need to start from center to outside
    for (let i = 0; i < Editor.TEST_RADIUS; i++) {
      const startX = x - i
      const startY = y - i
      const endX = x + i
      const endY = y + i
      for (let j = startX; j <= endX; j++) {
        for (let k = 0; k < 1; k++) {
          // check top & bottom
          let pointX = j
          let pointY = startY
          if (k === 0) {
            pointX = j
            pointY = startY
          } else {
            pointX = j
            pointY = endY
          }
          let contained = shape.contains(pointX, pointY)
          // 如果鼠标在外面则求里面的点到目标点最近距离，否则外面的点到目标点点最近距离
          if (inEditorItem) {
            contained = !contained
          }
          if (contained) {
            const newDistance = (centerX - pointX) * (centerX - pointX) + (centerY - pointY) * (centerY - pointY)
            if (newDistance < distance) {
              distance = newDistance
              targetX = pointX
              targetY = pointY
            }
          }
        }
      }
      for (let j = startY; j <= endY; j++) {
        for (let k = 0; k < 1; k++) {
          // check left & right
          let pointX = startX
          let pointY = j
          if (k === 0) {
            pointX = startX
            pointY = j
          } else {
            pointX = endX
            pointY = j
          }
          let contained = shape.contains(pointX, pointY)
          // 如果鼠标在外面则求里面的点到目标点最近距离，否则外面的点到目标点点最近距离
          if (inEditorItem) {
            contained = !contained
          }
          if (contained) {
            const newDistance = (centerX - pointX) * (centerX - pointX) + (centerY - pointY) * (centerY - pointY)
            if (newDistance < distance) {
              distance = newDistance
              targetX = pointX
              targetY = pointY
            }
          }
        }
      }
    }
    //Force to align with grid
    targetX = this.alignToGridSize((targetX - this.horizontalSpace) / this._zoom)
    targetY = this.alignToGridSize((targetY - this.verticalSpace) / this._zoom)
    targetX = targetX * this._zoom + this.horizontalSpace
    targetY = targetY * this.zoom + this.verticalSpace

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
   * @returns
   */
  private findEditorItemPoint(editorItem: EditorItem, x: number, y: number): Point2 {
    if (editorItem.shape.worldInverseTransform) {
      const point = editorItem.shape.worldInverseTransform.makePoint(new Point2(x, y))
      return point
    }
    return new Point2(x / this._zoom, y / this._zoom)
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

  private handleMouseRightButtonDown(e: PointerEvent) {
    this._editorContext.startPointX = e.x
    this._editorContext.startPointY = e.y
    this._modified = true
    const clickedEditorItem = this.findEditorItem(e.x, e.y, false)
    const theSelectionLayer = this.selectionLayer as SelectionLayer
    if (clickedEditorItem) {
      if (!theSelectionLayer.hasEditorItem(clickedEditorItem)) {
        theSelectionLayer.inHolder = true
        theSelectionLayer.removeAllEditorItems()
        theSelectionLayer.addEditorItem(clickedEditorItem)
        this.triggerSelectionChange()
        this._editorContext.targetColumnResizing = false
        this._editorContext.targetRowResizing = false
        this.beginOperation(clickedEditorItem)
        this.checkAndEndTextEdit()
        this.finishTextEditOperation()
        this.startMoveOutline(e)
        if (this._target) {
          this._target.shape.focused = false
        }
        if (this._targetItem) {
          this._targetItem.shape.focused = false
        }
        this._targetItem = undefined
        this._editorContext.targetItemIndex = -1
      } else if (this._editorContext.textFocused) {
        if (clickedEditorItem.shape.selection.length === 0) {
          const targetPoint = this.findEditorItemPoint(clickedEditorItem, e.x, e.y)
          this.updateTextCursorLocation(clickedEditorItem, targetPoint.x, targetPoint.y)
          clickedEditorItem.shape.enter(targetPoint.x, targetPoint.y)
        }
      }
    } else {
      theSelectionLayer.removeAllEditorItems()
      this.triggerSelectionChange()
      this.checkAndEndTextEdit()
      this.finishTextEditOperation()
      if (this._target) {
        this._target.shape.focused = false
      }

      if (this._targetItem) {
        this._targetItem.shape.focused = false
      }
      this._target = undefined
      this._editorContext.targetTime = 0
      this._editorContext.targetColumnResizing = false
      this._editorContext.targetRowResizing = false
      this._targetItem = undefined
      this._editorContext.targetItemIndex = -1
      this.handleTableActiveCellShape()
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
    let ex = this.alignToGridSize((e.x - this.horizontalSpace) / this._zoom - width / 2)
    let ey = this.alignToGridSize((e.y - this.verticalSpace) / this._zoom - height / 2)
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
    const this_ = this
    // console.log(`checkResult2 = ${containerEntity}`)
    action.items.forEach((item) => {
      const checkResult = containerEntity && this_.checkIfCreationInContainer(item, containerEntity)
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

  private handlePointMoveInMoving(e: PointerEvent) {
    const containerEntity = this.findContainerEntity(e.x, e.y)
    if (containerEntity && this.checkIfSelectionInContainer(containerEntity)) {
      this.startContainerSelection()
      this.handleContainerSelection(containerEntity)
      this.handleDefaultMoveInMoving(e)
      this.handleMoveOutline(e)
    } else {
      this.endContainerSelection()
      this.handleDefaultMoveInMoving(e)
      this.handleMoveOutline(e)
    }
  }

  private handlePointMoveInCreatingConnector(e: PointerEvent) {
    // console.log('4========== x= ' + e.x + ',  y = ' + e.y)
    const theControllerLayer = this._editorContext.controllerLayer as ControllerLayer
    const connector = theControllerLayer.getEditorItem(0) as Connector
    const editorItem = this.findEditorItem(e.x, e.y, false)
    const isEdge = editorItem ? this.hasEditorItemJoint(editorItem, e.x, e.y) && !this.checkParentType(editorItem, FrameEntity) : false
    //console.log(`create connector ...1 ${editorItem !== connector.source} ${isEdge}`)
    if (editorItem && isEdge) {
      // && editorItem !== connector.source) {
      //console.log(`create connector ...2`)
      const inEditorItem = this.isInEditorItem(editorItem, e.x, e.y)
      const targetPoint = this.findEditorItemJoint(editorItem, e.x, e.y, inEditorItem)
      const endDirection = this.findConnectorDirection(editorItem, e.x, e.y)
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
      connector.end = new Point2((e.x - this.horizontalSpace) / this._zoom, (e.y - this.verticalSpace) / this._zoom)
      //console.log(`connector end is x= ${(e.x - this.horizontalSpace) / this._zoom} e.x=${e.x} connector start is x = ${connector.start.x}`)
    }
  }

  private handleTargetRowResizing(e: PointerEvent) {
    const tableEntity = this._target as TableEntity
    const rowIndex = this._editorContext.targetRowIndex
    const minHeight = Item.MIN_HEIGHT
    const columnCount = tableEntity.columnCount
    let maxHeight = 0
    for (let i = rowIndex; i <= rowIndex + 1; i++) {
      maxHeight += tableEntity.items[i * tableEntity.columnCount].height
    }
    maxHeight -= Item.MIN_HEIGHT
    const newHeight = tableEntity.items[rowIndex * columnCount].height + e.y / this._zoom - this._editorContext.startPointY / this._zoom
    const nextNewTop = tableEntity.items[(rowIndex + 1) * columnCount].top + e.y / this._zoom - this._editorContext.startPointY / this._zoom
    const nextNewHeight = tableEntity.items[(rowIndex + 1) * columnCount].height - e.y / this._zoom + this._editorContext.startPointY / this._zoom
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
    const tableEntity = this._target as TableEntity
    const columnIndex = this._editorContext.targetColumnIndex
    const minWidth = Item.MIN_WIDTH
    const rowCount = tableEntity.rowCount
    let maxWidth = 0
    for (let i = columnIndex; i <= columnIndex + 1; i++) {
      maxWidth += tableEntity.items[i].width
    }
    maxWidth -= Item.MIN_WIDTH
    const newWidth = tableEntity.items[columnIndex].width + e.x / this._zoom - this._editorContext.startPointX / this._zoom
    const nextNewLeft = tableEntity.items[columnIndex + 1].left + e.x / this._zoom - this._editorContext.startPointX / this._zoom
    const nextNewWidth = tableEntity.items[columnIndex + 1].width - e.x / this._zoom + this._editorContext.startPointX / this._zoom
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

  public triggerSelectionChange() {
    this._editorContext.selectionChangeListeners.forEach((callback) => {
      const event = new EditorEvent(this)
      callback(event)
    })
  }

  public triggerSizeChange() {
    this._editorContext.sizeChangeListeners.forEach((callback) => {
      const event = new EditorEvent(this)
      callback(event)
    })
  }

  public triggerOperationChange() {
    //It can only run once and so need to break immediately
    let runOnce = false
    this._editorContext.operationChangeListeners.forEach((callback) => {
      if (!runOnce) {
        runOnce = true
        const event = new EditorEvent(this)
        callback(event)
      }
    })
  }

  public triggerOperationComplete() {
    this._editorContext.operationCompleteListeners.forEach((callback) => {
      const event = new EditorEvent(this)
      callback(event)
    })
  }

  public triggerTextEditStart() {
    this._editorContext.textEditStartListeners.forEach((callback) => {
      const event = new EditorEvent(this)
      callback(event)
    })
  }

  public triggerTextEditEnd() {
    this._editorContext.textEditEndListeners.forEach((callback) => {
      const event = new EditorEvent(this)
      callback(event)
    })
  }

  public triggerTableTextEditStart() {
    this._editorContext.tableTextEditStartListeners.forEach((callback) => {
      const event = new EditorEvent(this)
      callback(event)
    })
  }

  public triggerTableTextEditEnd() {
    this._editorContext.tableTextEditEndListeners.forEach((callback) => {
      const event = new EditorEvent(this)
      callback(event)
    })
  }

  public triggerSelectionResized() {
    this._editorContext.selectionResizedListeners.forEach((callback) => {
      const event = new EditorEvent(this)
      callback(event)
    })
  }

  public triggerSelectionResizing() {
    this._editorContext.selectionResizingListeners.forEach((callback) => {
      const event = new EditorEvent(this)
      callback(event)
    })
  }

  public triggerTextEditStyleChange() {
    this._editorContext.textEditStyleChangeListeners.forEach((callback) => {
      const event = new EditorEvent(this)
      callback(event)
    })
  }

  public triggerEditorModeChange() {
    this._editorContext.editorModeChangeListeners.forEach((callback) => {
      const event = new EditorEvent(this)
      callback(event)
    })
  }

  public triggerEditorOperationEvent(operation: Operation, isUndo: boolean) {
    //It can only run once and so need to break immediately
    let runOnce = false
    this._editorContext.editorOperationEventListeners.forEach((callback) => {
      if (!runOnce) {
        runOnce = true
        const event = new EditorOperationEvent(this, operation, isUndo)
        callback(event)
      }
    })
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
    let editorItem = OperationHelper.loadItem(editorItemInfo, this)
    this._editorContext.contentLayer.addEditorItem(editorItem)
    return editorItem
  }

  private handleAddEditorItemIntoEditorItem(editorItemInfo: EditorItemInfo, parentId: string) {
    let parent = this.findEditorItemById(parentId)
    if (parent) {
      const parentItem = parent as Item
      let editorItem = OperationHelper.loadItem(editorItemInfo, this)
      parentItem.addItem(editorItem)
    }
  }

  private handleUpdateEditorItem(editorItemInfo: EditorItemInfo): boolean {
    let items = this._editorContext.contentLayer.getAllEditorItems()
    let count = items.length
    for (let i = count - 1; i >= 0; i--) {
      let item = items[i] as Item
      if (item.id === editorItemInfo.id) {
        this.updateEditorItemDetail(item, editorItemInfo)
        return true
      }
      let found = this.updateEditorItem(item, editorItemInfo)
      if (found) {
        return true
      }
    }
    return false
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
    const editorItem = this.findEditorItemById(editorItemInfo.id)
    if (editorItem) {
      const newEditorItem = this.updateEditorItemDetail(editorItem as Item, editorItemInfo)
      this.selectionLayer.removeAllEditorItems()
      this.selectionLayer.addEditorItem(newEditorItem)
      this._target = newEditorItem
      this._textArea.focus()
      this.checkAndStartTextEdit()
      newEditorItem.shape.focused = true
      newEditorItem.shape.select(startIndex, endIndex)
      //editorItem.shape.enter(150, 150)
      //this.updateTextCursorLocation(editorItem, 380, 280)
      this._textArea.textContent = ''
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
    const editorItem = this.findEditorItemById(editorItemInfo.id)
    if (editorItem) {
      const newEditorItem = this.updateEditorItemDetail(editorItem as Item, editorItemInfo)
      const newTableEntity = newEditorItem as TableEntity
      const tableCell = newTableEntity.items[tableCellIndex]
      this.selectionLayer.removeAllEditorItems()
      this.selectionLayer.addEditorItem(newEditorItem)
      this._target = newEditorItem
      this._targetItem = tableCell
      this._editorContext.targetItemIndex = tableCellIndex
      this._textArea.focus()
      this.checkAndStartTextEdit()
      tableCell.shape.focused = true
      tableCell.shape.select(startIndex, endIndex)
      //editorItem.shape.enter(150, 150)
      //this.updateTextCursorLocation(editorItem, 380, 280)
      this._textArea.textContent = ''
      this.handleTableActiveCellShape()
    }
  }

  private handleTableTextEditOld(operation: Operation, isUndo: boolean) {
    if (isUndo) {
      this.handleUpdateEditorItem(operation.itemInfos[0])
    } else {
      this.handleUpdateEditorItem(operation.origItemInfos[0])
    }
  }

  private removeItemById(item: Item, id: string): boolean {
    let count = item.items.length
    for (let i = count - 1; i >= 0; i--) {
      let childItem = item.items[i] as Item
      if (childItem.id === id) {
        childItem.removeItemAt(i)
        return true
      }
      let found = this.removeItemById(childItem, childItem.id)
      if (found) {
        return true
      }
    }
    return false
  }

  private handleOperationUndoAddItems(items: EditorItemInfo[]) {
    items.forEach((editorItemInfo) => {
      const id = editorItemInfo.id
      this.handleRemoveEditorItem(id)
    })
    this.selectionLayer.removeAllEditorItems()
    this.triggerSelectionChange()
    this.checkAndEndTextEdit()
    this._target = undefined
    this._targetItem = undefined
    this.handleTableActiveCellShape()
  }

  private handleOperationUndoRemoveItems(items: EditorItemInfo[]) {
    items.forEach((editorItemInfo) => {
      const editorItem = this.handleAddEditorItem(editorItemInfo)
      this.selectionLayer.addEditorItem(editorItem)
      this.triggerSelectionChange()
    })
  }

  private handleOperationUndoUpdateItems(items: EditorItemInfo[]) {
    items.forEach((editorItemInfo) => {
      this.handleUpdateEditorItem(editorItemInfo)
    })
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
      this.selectionLayer.addEditorItem(editorItem)
      this.triggerSelectionChange()
    })
  }

  private handleOperationRedoRemoveItems(items: EditorItemInfo[]) {
    items.forEach((editorItemInfo) => {
      const id = editorItemInfo.id
      this.handleRemoveEditorItem(id)
    })
    this.selectionLayer.removeAllEditorItems()
    this.triggerSelectionChange()
    this.checkAndEndTextEdit()
    this._target = undefined
    this._targetItem = undefined
    this.handleTableActiveCellShape()
  }

  private handleOperationRedoUpdateItems(items: EditorItemInfo[]) {
    items.forEach((editorItemInfo) => {
      this.handleUpdateEditorItem(editorItemInfo)
    })
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

  private handleOperationRedoShapTextEdit(operation: Operation) {
    this.handleShapeTextEdit(operation, false)
  }

  private handleOperationRedoTableTextEdit(operation: Operation) {
    this.handleTableTextEdit(operation, false)
  }

  public checkAndStartTextEdit() {
    if (!this._editorContext.textFocused) {
      this._editorContext.textFocused = true
      this.triggerTextEditStart()
    }
  }

  public checkAndEndTextEdit() {
    if (this._target) {
      this._target.shape.focused = false
    }
    if (this._editorContext.textFocused) {
      this._editorContext.textFocused = false
      this.triggerTextEditEnd()
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private startRangeSelecting(e: PointerEvent) {
    this._editorContext.inRangeSelecting = true
  }

  private endRangeSelecting(e: PointerEvent) {
    this._editorContext.inRangeSelecting = false
    this._editorContext.rangeLayer.removeNode(this._editorContext.rangeSelectionShape)
    let left = Math.min(this._editorContext.startPointX, e.x) - this.horizontalSpace
    let top = Math.min(this._editorContext.startPointY, e.y) - this.verticalSpace
    let right = Math.max(this._editorContext.startPointX, e.x) - this.horizontalSpace
    let bottom = Math.max(this._editorContext.startPointY, e.y) - this.verticalSpace
    let itemCount = this.contentLayer.getEditorItemCount()
    for (let i = 0; i < itemCount; i++) {
      let item = this.contentLayer.getEditorItem(i)
      if (item.left > left && item.top > top && item.right < right && item.bottom < bottom) {
        this.selectionLayer.addEditorItem(item)
      }
    }
    this.triggerSelectionChange()
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
    const containerEntity = this.findContainerEntity(e.x, e.y)
    if (this._editorContext.inContainerSelection && containerEntity) {
      let selectionCount = this.selectionLayer.getEditorItemCount()
      for (let i = 0; i < selectionCount; i++) {
        const selection = this.selectionLayer.getEditorItem(i) as Item
        if (selection.parent === containerEntity) {
          //Do nothing here
        } else if (selection === containerEntity) {
          // It occurs when container selected and then create new shape into the container
          //Do nothing here
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
            this.contentLayer.removeEditorItem(selection)
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

  public getSelectionBoundary(): [number, number, number, number] {
    let left = 0
    let top = 0
    let right = 0
    let bottom = 0
    let selectionCount = this.selectionLayer.getEditorItemCount()
    for (let i = 0; i < selectionCount; i++) {
      const selection = this.selectionLayer.getEditorItem(i)
      const worldTransform = selection.worldTransform
      const leftTopPoint = worldTransform.makePoint(new Point2(0, 0))
      const rightTopPoint = worldTransform.makePoint(new Point2(selection.width, 0))
      const rightBottomPoint = worldTransform.makePoint(new Point2(selection.width, selection.height))
      const leftBottomPoint = worldTransform.makePoint(new Point2(0, selection.height))
      const selectionLeft = Math.min(leftTopPoint.x, rightTopPoint.x, rightBottomPoint.x, leftBottomPoint.x)
      const selectionTop = Math.min(leftTopPoint.y, rightTopPoint.y, rightBottomPoint.y, leftBottomPoint.y)
      const selectionRight = Math.max(leftTopPoint.x, rightTopPoint.x, rightBottomPoint.x, leftBottomPoint.x)
      const selectionBottom = Math.max(leftTopPoint.y, rightTopPoint.y, rightBottomPoint.y, leftBottomPoint.y)
      if (i === 0) {
        left = selectionLeft
        top = selectionTop
        right = selectionRight
        bottom = selectionBottom
      } else {
        left = selectionLeft < left ? selectionLeft : left
        top = selectionTop < top ? selectionTop : top
        right = selectionRight > right ? selectionRight : right
        bottom = selectionBottom > bottom ? selectionBottom : bottom
      }
    }
    return [left, top, right, bottom]
  }

  private checkIfSelectionInContainer(containerEntity: ContainerEntity): boolean {
    const [left, top, right, bottom] = this.getSelectionBoundary()
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

  public checkIfCreationInContainer(editorItem: EditorItem, containerEntity: ContainerEntity): boolean {
    const left = editorItem.left
    const top = editorItem.top
    const right = editorItem.right
    const bottom = editorItem.bottom
    const [cLeft, cTop, cRight, cBottom] = Editor.getItemsBoundary([containerEntity])
    if (cLeft <= left && cTop <= top && cRight >= right && cBottom >= bottom) {
      return true
    }
    //console.log(`check selection in container 3... ${containerEntity.left} ${containerEntity.top} ${containerEntity.right} ${containerEntity.bottom} ${left} ${top} ${right} ${bottom}`)
    // if (containerEntity.left <= left && containerEntity.top <= top && containerEntity.right >= right && containerEntity.bottom >= bottom) {
    //   //console.log(`check selection in container 4... ${containerEntity}`)
    //   return true
    // }
    return false
  }

  private handleDefaultPointMove(e: PointerEvent) {
    const theHoverLayer: HoverLayer = this.hoverLayer as HoverLayer
    const theSelectionLayer: SelectionLayer = this.selectionLayer as SelectionLayer
    const editorItem = this.findEditorItem(e.x, e.y, false)
    //console.log(`Finding ...... ${editorItem}`)
    const isEdge = editorItem ? this.hasEditorItemJoint(editorItem, e.x, e.y) && !this.checkParentType(editorItem, FrameEntity) : false
    //console.log(` Find editor item edge = ${isEdge}`)
    if (editorItem && isEdge) {
      //console.log(` Check here1`)
      if (!editorItem.locked) {
        const inEditorItem = this.isInEditorItem(editorItem, e.x, e.y)
        //const targetPoint = this.findEditorItemJoint(editorItem, e.x, e.y, inEditorItem)
        if (inEditorItem) {
          //console.log(` Check here2 ${this._textFocused}`)
          if (this._editorContext.textFocused) {
            //console.log(` Check here21 ${this._textFocused}`)
            this.updateEditorMode(EditorMode.TEXT)
          } else {
            //console.log(` Check here22 ${this._textFocused}`)
            this.updateEditorMode(EditorMode.MOVE)
          }
        } else {
          //console.log(` Check here3`)
          this.updateEditorMode(EditorMode.CROSSHAIR)
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
              this.updateEditorMode(EditorMode.ROW_RESIZE)
            } else if (targetColumn) {
              this.updateEditorMode(EditorMode.COL_RESIZE)
            } else if (this._targetItem && this._editorContext.textFocused && this._editorContext.textSelecting) {
              this.updateEditorMode(EditorMode.TEXT)
            } else {
              this.updateEditorMode(EditorMode.MOVE)
            }
          }
        } else if (this._editorContext.textFocused && this._editorContext.textSelecting) {
          this.updateEditorMode(EditorMode.TEXT)
        } else {
          if (!editorItem.locked) {
            this.updateEditorMode(EditorMode.MOVE)
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
              this.updateEditorMode(EditorMode.ROW_RESIZE)
            } else if (targetColumn) {
              // console.log('========3')
              // this._targetColumn = targetColumn
              // this._targetColumnIndex = targetColumnIndex
              this.updateEditorMode(EditorMode.COL_RESIZE)
            } else if (this._targetItem && this._editorContext.textFocused && this._editorContext.textSelecting) {
              const cellPoint = this.findEditorItemPoint(this._targetItem, e.x, e.y)
              this._targetItem.shape.enterTo(cellPoint.x, cellPoint.y)
              this.updateEditorMode(EditorMode.TEXT)
            } else if (this._targetItem && this._editorContext.textFocused) {
              this.updateEditorMode(EditorMode.TEXT)
            } else {
              this.updateEditorMode(EditorMode.MOVE)
            }
          }
        } else if (this._editorContext.textFocused && this._editorContext.textSelecting) {
          const targetPoint = this.findEditorItemPoint(editorItem, e.x, e.y)
          editorItem.shape.enterTo(targetPoint.x, targetPoint.y)
          this.updateEditorMode(EditorMode.TEXT)
        } else if (this._editorContext.textFocused) {
          this.updateEditorMode(EditorMode.TEXT)
        } else {
          if (!editorItem.locked) {
            this.updateEditorMode(EditorMode.MOVE)
          }
        }
      }
    } else {
      //console.log('test code here')
      if (theHoverLayer.getEditorItemCount() > 0) {
        const hoverEditorItem = theHoverLayer.getEditorItem(0)
        if (hoverEditorItem instanceof Connector) {
          // console.log('Connector is found')
          const editorItem = this.findEditorItem(e.x, e.y, false)
          if (editorItem !== null && editorItem !== undefined) {
            theHoverLayer.inHolder = false
            theHoverLayer.invalidateLayer()
          } else {
            theHoverLayer.inHolder = true
            theHoverLayer.removeAllEditorItems()
          }
          this.updateEditorMode(EditorMode.AUTO)
        } else {
          // console.log('Connector is not found')
          if (
            hoverEditorItem.left - Holder.PADDING < (e.x - this.horizontalSpace) / this._zoom &&
            hoverEditorItem.right + Holder.PADDING > (e.x - this.horizontalSpace) / this._zoom &&
            hoverEditorItem.top - Holder.PADDING < (e.y - this.verticalSpace) / this._zoom &&
            hoverEditorItem.bottom + Holder.PADDING > (e.y - this.verticalSpace) / this._zoom
          ) {
            // console.log('inHolder = false')
            theHoverLayer.inHolder = false
            theHoverLayer.invalidateLayer()
          } else {
            // console.log('inHolder = true')
            theHoverLayer.inHolder = true
            theHoverLayer.removeAllEditorItems()
          }
          this.updateEditorMode(EditorMode.AUTO)
        }
      } else {
        this.updateEditorMode(EditorMode.AUTO)
      }
    }
  }

  private handleCreationAction(e: PointerEvent) {
    if (this._action) {
      // console.log(`handlePointerClick... x = ${e.x}  start=${this.action_.item.start.x} end=${this.action_.item.end.x} width=${this.action_.item.width}  height=${this.action_.item.height}`)
      const clickedEditorItem = this.findEditorItem(e.x, e.y, false)
      if (clickedEditorItem && clickedEditorItem instanceof ContainerEntity && !(clickedEditorItem instanceof TableEntity)) {
        let point = this.findEditorItemPoint(clickedEditorItem, e.x, e.y)
        let [left, top, right, bottom] = Editor.getItemsBoundary(this._action.items)
        let width = right - left
        let height = bottom - top
        let x = this.alignToGridSize(point.x / this._zoom - width / 2)
        let y = this.alignToGridSize(point.y / this._zoom - height / 2)
        this._action.items.forEach((item) => {
          item.boundary = Rectangle.makeLTWH(x + item.left - left, y + item.top - top, item.width, item.height)
          clickedEditorItem.addItem(item)
        })
        this.selectionLayer.removeAllEditorItems()
        this.selectionLayer.addEditorItems(this._action.items)
      } else {
        this.contentLayer.addEditorItems(this._action.items)
        this.selectionLayer.removeAllEditorItems()
        this.selectionLayer.addEditorItems(this._action.items)
        let editorItemInfos = OperationHelper.saveEditorItems(this._action.items)
        let operation = new Operation(this, OperationType.ADD_ITEMS, editorItemInfos, true, [])
        this._operationService.addOperation(operation)
        this.triggerOperationChange()
        this.triggerSelectionChange()
      }
      this._editorContext.controllerLayer.removeAllEditorItems()
      this._editorContext.controllerLayer.clear()
      if (this._target) {
        this._target.shape.focused = false
      }
      this.checkAndEndTextEdit()
      this.finishTextEditOperation()
      if (this._target) {
        this._target.shape.focused = false
      }
      if (this._targetItem) {
        this._targetItem.shape.focused = false
      }
      this._action = undefined
      this._target = undefined
      this._editorContext.targetTime = 0
      this._editorContext.targetColumnResizing = false
      this._editorContext.targetRowResizing = false
      this._targetItem = undefined
      this._editorContext.targetItemIndex = -1
      this.handleTableActiveCellShape()
    }
  }

  private handleDefaultMoveInMoving(e: PointerEvent) {
    const theSelectionLayer = this.selectionLayer as SelectionLayer
    const theHoverLayer = this.hoverLayer as HoverLayer
    const count = theSelectionLayer.getEditorItemCount()
    const moveX = e.x / this._zoom - this._editorContext.startPointX / this._zoom
    const moveY = e.y / this._zoom - this._editorContext.startPointY / this._zoom
    const alignMoveX = this.alignToGridSize(moveX)
    const alignMoveY = this.alignToGridSize(moveY)
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
      this._editorContext.startPointX = this._editorContext.startPointX + alignMoveX * this._zoom
    }
    if (alignMoveY !== 0) {
      //this._startPointY = e.y
      this._editorContext.startPointY = this._editorContext.startPointY + alignMoveY * this._zoom
    }
    this._editorContext.moveStarted = true
    theSelectionLayer.invalidateLayer()
    theHoverLayer.removeAllEditorItems()
    //Need this to update toolbar in time, Just hide here because of performance issue
    this.triggerSelectionResizing()
    //Update active table cell outline
    this.handleTableActiveCellShape()
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
    const theSelectionLayer = this.selectionLayer as SelectionLayer
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private startMoveOutline(e: PointerEvent) {
    this._editorContext.moveLayer.addNode(this._editorContext.selectionOutlineShape)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private endMoveOutline(e: PointerEvent) {
    this._editorContext.moveLayer.removeNode(this._editorContext.selectionOutlineShape)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private handleMoveOutline(e: PointerEvent) {
    //Don't show outline if only connector selected
    if (this.selectionLayer.getEditorItemCount() === 1 && this.selectionLayer.getEditorItem(0) instanceof Connector) {
      return
    }
    const [left, top, right, bottom] = this.getSelectionBoundary()
    this._editorContext.selectionOutlineShape.boundary = Rectangle.makeLTWH(left, top, right - left, bottom - top)
    //this._selectionOutlineShape.boundary = Rectangle.makeLTWH(left * this._zoom, top * this._zoom, (right - left) * this._zoom, (bottom - top) * this._zoom)
  }

  private handleTableActiveCellShape() {
    if (this._targetItem) {
      const margin = EditorUtils.tableActiveCellMargin
      this._editorContext.tableActiveCellShape.transform = this._targetItem.shape.worldTransform
      this._editorContext.tableActiveCellShape.boundary = Rectangle.makeLTWH(
        margin,
        margin,
        this._targetItem.width - margin * 2,
        this._targetItem.height - margin * 2,
      )
      this.triggerTableTextEditStart()
    } else {
      this._editorContext.tableActiveCellShape.transform = new Matrix()
      this._editorContext.tableActiveCellShape.boundary = Rectangle.makeLTWH(0, 0, 0, 0)
      this.triggerTableTextEditEnd()
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private removeItemsFromContainer(e: PointerEvent) {
    let requireRemove = false
    const [left, top, right, bottom] = this.getSelectionBoundary()
    if (this.selectionLayer.getEditorItemCount() > 0) {
      const firstSelection = this.selectionLayer.getEditorItem(0) as Item
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
      const count = this.selectionLayer.getEditorItemCount()
      for (let i = 0; i < count; i++) {
        const selection = this.selectionLayer.getEditorItem(i) as Item
        if (selection.parent) {
          const [pLeft, pTop] = Editor.getItemsBoundary([selection.parent])
          const left = selection.left + pLeft
          const top = selection.top + pTop
          const rotation = selection.rotation.radius + selection.parent.rotation.radius
          selection.boundary = Rectangle.makeLTWH(left, top, selection.width, selection.height)
          selection.rotation = new Rotation(rotation)
          selection.parent.removeItem(selection)
          this.contentLayer.addEditorItem(selection)
        }
      }
    }
  }

  /**
   * Check and decide how to draw connector orthogonal line
   * @param editorItem
   * @param x
   * @param y
   * @returns
   */
  public findConnectorDirection(editorItem: EditorItem, x: number, y: number): ConnectorDirection {
    let result = ConnectorDirection.Right
    const shape = editorItem.shape
    const matrix = shape.worldInverseTransform
    if (matrix) {
      const position = matrix.makePoint(new Point2(x, y))
      if (Math.abs(position.y - shape.height / 2) < Math.abs(position.x - shape.width / 2)) {
        if (position.x > shape.width / 2) {
          result = ConnectorDirection.Right
        } else {
          result = ConnectorDirection.Left
        }
      } else {
        if (position.y < shape.height / 2) {
          result = ConnectorDirection.Top
        } else {
          result = ConnectorDirection.Bottom
        }
      }
    }
    return result
  }

  public alignToGridSize(value: number) {
    if (this._snapToGrid) {
      //return value - value % this._gridSize
      return Math.round(value / this._gridSize) * this._gridSize
    } else {
      return value
    }
  }

  public updateEditorMode(mode: EditorMode) {
    //console.log(` this.mode= ${this._mode}  mode =  ${mode}`)
    if (this._mode !== mode) {
      this._mode = mode
      this.triggerEditorModeChange()
    }
  }

  public beginOperation(editorItem: EditorItem) {
    const theItem = editorItem as Item
    if (theItem.parent) {
      this._editorContext.startEditorItemInfos.length = 0
      let editorItemInfo = OperationHelper.saveEditorItem(theItem.parent)
      this._editorContext.startEditorItemInfos.push(editorItemInfo)
    } else {
      this._editorContext.startEditorItemInfos.length = 0
      let editorItemInfo = OperationHelper.saveEditorItem(editorItem)
      this._editorContext.startEditorItemInfos.push(editorItemInfo)
    }
  }

  private beginTextEditOperation(editorItem: EditorItem) {
    this._editorContext.startEditorItemInfos.length = 0
    let editorItemInfo = OperationHelper.saveEditorItem(editorItem)
    this._editorContext.startEditorItemInfos.push(editorItemInfo)
    //console.log(`save: ${editorItemInfo}`)
  }

  private beginShapeTextEditOperation(editorItem: EditorItem): [EditorItemInfo, number, number] {
    if (this._target && this._targetItem) {
      const editorItemInfo = OperationHelper.saveEditorItem(editorItem)
      return [editorItemInfo, this._targetItem.shape.startIndex, this._targetItem.shape.endIndex]
    } else {
      const editorItemInfo = OperationHelper.saveEditorItem(editorItem)
      return [editorItemInfo, editorItem.shape.startIndex, editorItem.shape.endIndex]
    }
  }

  public finishOperation(editorItem: EditorItem) {
    const theItem = editorItem as Item
    if (theItem.parent) {
      let origItemInfo = this._editorContext.startEditorItemInfos[0]
      let editorItemInfo = OperationHelper.saveEditorItem(theItem.parent)
      let operation = new Operation(this, OperationType.UPDATE_ITEMS, [editorItemInfo], true, [origItemInfo])
      this._operationService.addOperation(operation)
      this.triggerOperationChange()
      this._editorContext.startEditorItemInfos.length = 0
    } else {
      let origItemInfo = this._editorContext.startEditorItemInfos[0]
      let editorItemInfo = OperationHelper.saveEditorItem(editorItem)
      let operation = new Operation(this, OperationType.UPDATE_ITEMS, [editorItemInfo], true, [origItemInfo])
      this._operationService.addOperation(operation)
      this.triggerOperationChange()
      this._editorContext.startEditorItemInfos.length = 0
    }
  }

  public dispose() {
    super.dispose()
    this._editorContext.backgroundLayer.dispose()
    this._editorContext.contentLayer.dispose()
    this._editorContext.controllerLayer.dispose()
    this._editorContext.hoverLayer.dispose()
    this._editorContext.selectionLayer.dispose()
    this._editorContext.maskLayer.dispose()
    this._editorContext.rangeLayer.dispose()
    this._editorContext.moveLayer.dispose()
    this._editorContext.containerLayer.dispose()
    this._editorContext.tableLayer.dispose()
    this._editorContext.exportLayer.dispose()
  }

  private finishTextEditOperation() {
    if (this._target && this._targetItem && this._editorContext.startEditorItemInfos.length > 0) {
      let origItemInfo = this._editorContext.startEditorItemInfos[0]
      let editorItemInfo = OperationHelper.saveEditorItem(this._target)
      let operation = new Operation(this, OperationType.UPDATE_ITEMS, [editorItemInfo], true, [origItemInfo])
      this._operationService.addOperation(operation)
      //console.log(`finish: ${editorItemInfo}`)
      //console.log(`finish2: ${origItemInfo}`)
      this.triggerOperationChange()
      this._editorContext.startEditorItemInfos.length = 0
    } else if (this._target && this._editorContext.startEditorItemInfos.length > 0) {
      let origItemInfo = this._editorContext.startEditorItemInfos[0]
      let editorItemInfo = OperationHelper.saveEditorItem(this._target)
      let operation = new Operation(this, OperationType.UPDATE_ITEMS, [editorItemInfo], true, [origItemInfo])
      this._operationService.addOperation(operation)
      //console.log(`finish3: ${editorItemInfo}`)
      //console.log(`finish4: ${origItemInfo}`)
      this.triggerOperationChange()
      this._editorContext.startEditorItemInfos.length = 0
    }
  }

  private finishShapeTextEditOperation(origEditorItemInfo: EditorItemInfo, startIndex: number, endIndex: number) {
    if (this._target && this._targetItem) {
      let editorItemInfo = OperationHelper.saveEditorItem(this._target)
      let operation = new Operation(
        this,
        OperationType.TABLE_TEXT_EDIT,
        [editorItemInfo],
        true,
        [origEditorItemInfo],
        '',
        null,
        null,
        null,
        null,
        true,
        this._targetItem.shape.startIndex,
        this._targetItem.shape.endIndex,
        startIndex,
        endIndex,
        '',
        '',
        null,
        this._editorContext.targetItemIndex,
      )
      this._operationService.addOperation(operation)
      this.triggerOperationChange()
      this._editorContext.startEditorItemInfos.length = 0
    } else if (this._target) {
      let editorItemInfo = OperationHelper.saveEditorItem(this._target)
      let operation = new Operation(
        this,
        OperationType.SHAPE_TEXT_EDIT,
        [editorItemInfo],
        true,
        [origEditorItemInfo],
        '',
        null,
        null,
        null,
        null,
        true,
        this._target.shape.startIndex,
        this._target.shape.endIndex,
        startIndex,
        endIndex,
      )
      this._operationService.addOperation(operation)
      this.triggerOperationChange()
      this._editorContext.startEditorItemInfos.length = 0
    }
  }

  private createTextBoxInConnector(connector: Connector, x: number, y: number) {
    const textBox = new ShapeEntity(x - 40, y - 15, 40, 20)
    textBox.text = 'text'
    textBox.fillColor = Colors.Transparent
    textBox.strokeColor = Colors.Transparent
    connector.addItem(textBox)
  }

  private checkParentType(editorItem: EditorItem, parentType: typeof Item): boolean {
    let result = false
    //console.log(`check parent = ${item.parent instanceof parentType}   == ${item.parent}`)
    let checkItem: Item = editorItem as Item
    while (checkItem.parent) {
      if (checkItem.parent instanceof parentType) {
        return true
      }
      checkItem = checkItem.parent
    }
    return result
  }

  private static getItemsBoundary(items: Item[]) {
    let left = 0
    let top = 0
    let right = 0
    let bottom = 0
    let itemCount = items.length
    for (let i = 0; i < itemCount; i++) {
      const item = items[i]
      const worldTransform = item.worldTransform
      const leftTopPoint = worldTransform.makePoint(new Point2(0, 0))
      const rightTopPoint = worldTransform.makePoint(new Point2(item.width, 0))
      const rightBottomPoint = worldTransform.makePoint(new Point2(item.width, item.height))
      const leftBottomPoint = worldTransform.makePoint(new Point2(0, item.height))
      const itemLeft = Math.min(leftTopPoint.x, rightTopPoint.x, rightBottomPoint.x, leftBottomPoint.x)
      const itemTop = Math.min(leftTopPoint.y, rightTopPoint.y, rightBottomPoint.y, leftBottomPoint.y)
      const itemRight = Math.max(leftTopPoint.x, rightTopPoint.x, rightBottomPoint.x, leftBottomPoint.x)
      const itemBottom = Math.max(leftTopPoint.y, rightTopPoint.y, rightBottomPoint.y, leftBottomPoint.y)
      if (i === 0) {
        left = itemLeft
        top = itemTop
        right = itemRight
        bottom = itemBottom
      } else {
        left = itemLeft < left ? itemLeft : left
        top = itemTop < top ? itemTop : top
        right = itemRight > right ? itemRight : right
        bottom = itemBottom > bottom ? itemBottom : bottom
      }
    }
    return [left, top, right, bottom]
  }

  public setBackgroundVisible(visible: boolean) {
    this._editorContext.backgroundLayer.visible = visible
  }

  public setSelectionVisible(visible: boolean) {
    this._editorContext.selectionLayer.visible = visible
  }

  public setContentVisible(visible: boolean) {
    this._editorContext.contentLayer.visible = visible
  }
}
