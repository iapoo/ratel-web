/* eslint-disable max-depth */
/* eslint-disable max-params */
/* eslint-disable complexity */
import { Painter } from '@ratel-web/painter'
import { DocumentThemeType, DocumentThemeTypes, EditorUtils } from '../../Theme'

import { Color, Colors, KeyEvent, Point2, PointerEvent, Rectangle, Scale } from '@ratel-web/engine'
import { Action, MyShapeAction } from '../../Actions'
import { Connector, ContainerEntity, EditorItem, EditorItemInfo, ImageContainer, Item, SvgContainer } from '../../Items'
import { Operation, OperationHelper, OperationService, OperationType } from '../../Operations'
import { ConnectorDirection } from '../../Shapes'
import { CommonUtils } from '../../Utils'
import { EditorContext } from './EditorContext'
import { EditorEvent } from './EditorEvent'
import { EditorEventHandler } from './EditorEventHandler'
import { EditorLayer } from './EditorLayer'
import { EditorOperationEvent } from './EditorOperationEvent'

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
  public static readonly TEST_RADIUS = 8
  public static readonly TEST_SIZE = 16

  /**
   * Margin area can be reached, but not printable or exportable. Range selection need to extend to out of page.
   */
  public static readonly HORIZONTAL_SPACE_DEFAULT = 1256
  public static readonly VERTICAL_SPACE_DEFAULT = 1256

  public static readonly ORIG_WIDTH_DEFAULT = 1600
  public static readonly ORIG_HEIGHT_DEFAULT = 1200

  private _zoom = 1.0
  private _gridSize = 10
  private _action: Action | undefined
  private _title: string
  private _key: string
  private readonly _id: string
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
  private readonly _editorContext: EditorContext
  private _editorEventHandler: EditorEventHandler

  public constructor(canvasId: string | HTMLCanvasElement) {
    super(canvasId)
    this._editorContext = new EditorContext(this)
    this._editorEventHandler = new EditorEventHandler(this, this._editorContext)
    this._title = ''
    this._key = ''
    this._id = CommonUtils.generateID()
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

  public onCodeEditStart(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.codeEditStartListeners.indexOf(callback)
    if (index < 0) {
      this._editorContext.codeEditStartListeners.push(callback)
    }
  }

  public removeCodeEditStart(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.codeEditStartListeners.indexOf(callback)
    if (index >= 0) {
      this._editorContext.codeEditStartListeners.splice(index, 1)
    }
  }

  public hasCodeEditStart(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.codeEditStartListeners.indexOf(callback)
    return index >= 0
  }

  public onCodeEditEnd(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.codeEditEndListeners.indexOf(callback)
    if (index < 0) {
      this._editorContext.codeEditEndListeners.push(callback)
    }
  }

  public removeCodeEditEnd(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.codeEditEndListeners.indexOf(callback)
    if (index >= 0) {
      this._editorContext.codeEditEndListeners.splice(index, 1)
    }
  }

  public hasCodeEditEnd(callback: (e: EditorEvent) => void) {
    const index = this._editorContext.codeEditEndListeners.indexOf(callback)
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

  public get target(): EditorItem | undefined {
    return this._editorContext.target
  }

  public get targetItem(): EditorItem | undefined {
    return this._editorContext.targetItem
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
      //If theme is set up for document, we need to prepare theme for new shapes in editor here, but we need to skip for SVG and Image
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
    return this._editorContext.modified
  }

  public resetModified() {
    this._editorContext.modified = false
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
      this.engine.container.parentElement.append(this._editorContext.textArea)
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
    this._editorEventHandler.undo()
  }

  public redo() {
    this._editorEventHandler.redo()
  }

  public get undoable() {
    return this._operationService.getUndoOperations().length > 0
  }

  public get redoable() {
    return this._operationService.getRedoOperations().length > 0
  }

  public handlePointerMove(e: PointerEvent) {
    this._editorEventHandler.handlePointerMove(e)
  }

  public handlePointerLeave(e: PointerEvent) {
    this._editorEventHandler.handlePointerLeave(e)
  }

  public handlePointerEnter(e: PointerEvent) {
    this._editorEventHandler.handlePointerEnter(e)
  }

  public handlePointerDown(e: PointerEvent) {
    this._editorEventHandler.handlePointerDown(e)
  }

  public handlePointerUp(e: PointerEvent) {
    this._editorEventHandler.handlePointerUp(e)
  }

  public selectAll() {
    this.contentLayer.getAllEditorItems().forEach((editorItem) => {
      this.selectionLayer.addEditorItem(editorItem)
    })
    this.triggerSelectionChange()
  }

  public focus() {
    if (this._editorContext.textFocused) {
      this._editorContext.textArea.focus()
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

  public invalidateHolder() {
    this._editorContext.selectionLayer.invalidateLayer()
    this._editorContext.hoverLayer.invalidateLayer()
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

  public bringForward(editorItem: EditorItem) {
    const index = this.contentLayer.getIndexOfEditorItem(editorItem)
    if (index < this.contentLayer.getEditorItemCount() - 1) {
      this.contentLayer.removeEditorItem(editorItem)
      this.contentLayer.addEditorItemAt(editorItem, index + 1)
    }
  }

  public isInEditorItem(editorItem: EditorItem, x: number, y: number): boolean {
    const shape = editorItem.shape
    return shape.contains(x, y)
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
    if (editorItem instanceof Connector && excludeConnector) {
      result = undefined
    } else if (editorItem instanceof Connector) {
      let textBoxFound = false
      for (let i = count - 1; i >= 0; i--) {
        const child = editorItem.items[i]
        let childResult = this.findEditorItemDetail(child, x, y, excludeConnector)
        if (childResult) {
          result = childResult
          textBoxFound = true
        }
      }
      if (!textBoxFound) {
        if (shape.intersects(x - Editor.TEST_RADIUS, y - Editor.TEST_RADIUS, Editor.TEST_SIZE, Editor.TEST_SIZE)) {
          result = editorItem
        } else {
          result = undefined
        }
      }
    } else if (shape.intersects(x - Editor.TEST_RADIUS, y - Editor.TEST_RADIUS, Editor.TEST_SIZE, Editor.TEST_SIZE)) {
      result = editorItem
      if (editorItem.fixed) {
        result = (editorItem as Item).parent
      } else {
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
      return editorItem.shape.worldInverseTransform.makePoint(new Point2(targetX / this._zoom, targetY / this._zoom))
    }
    return new Point2(x / this._zoom, y / this._zoom)
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

  public triggerCodeEditStart() {
    this._editorContext.codeEditStartListeners.forEach((callback) => {
      const event = new EditorEvent(this)
      callback(event)
    })
  }

  public triggerCodeEditEnd() {
    this._editorContext.codeEditEndListeners.forEach((callback) => {
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

  public checkAndStartTextEdit() {
    if (!this._editorContext.textFocused) {
      this._editorContext.textFocused = true
      this.triggerTextEditStart()
    }
  }

  public checkAndEndTextEdit() {
    if (this._editorContext.target) {
      this._editorContext.target.shape.focused = false
    }
    if (this._editorContext.textFocused) {
      this._editorContext.textFocused = false
      this.triggerTextEditEnd()
      this.finishTextEditOperation()
    }
  }

  public getSelectionBoundary(): [number, number, number, number] {
    return this.getContentBoundary(true)
  }

  public getContentBoundary(onlySelected: boolean): [number, number, number, number] {
    let left = 0
    let top = 0
    let right = 0
    let bottom = 0
    const layer = onlySelected ? this.selectionLayer : this.contentLayer
    let selectionCount = layer.getEditorItemCount()
    for (let i = 0; i < selectionCount; i++) {
      const selection = layer.getEditorItem(i)
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

  public beginOperation() {
    const selectedEditorItems = this.selectionLayer.getAllEditorItems()
    this._editorContext.startEditorItemInfos.length = 0
    for (let i = 0; i < selectedEditorItems.length; i++) {
      let operationItem = selectedEditorItems[i] as Item
      while (operationItem.parent) {
        operationItem = operationItem.parent
      }
      let editorItemInfo = OperationHelper.saveEditorItem(operationItem)
      this._editorContext.startEditorItemInfos.push(editorItemInfo)
    }
  }

  public finishOperation() {
    const selectedEditorItems = this.selectionLayer.getAllEditorItems()
    let origItemInfos: EditorItemInfo[] = []
    origItemInfos = origItemInfos.concat(this._editorContext.startEditorItemInfos)
    const editorItemInfos: EditorItemInfo[] = []
    for (let i = 0; i < selectedEditorItems.length; i++) {
      let operationItem = selectedEditorItems[i] as Item
      while (operationItem.parent) {
        operationItem = operationItem.parent
      }
      let editorItemInfo = OperationHelper.saveEditorItem(operationItem)
      editorItemInfos.push(editorItemInfo)
    }
    let operation = new Operation(this, OperationType.UPDATE_ITEMS, editorItemInfos, true, origItemInfos)
    this._operationService.addOperation(operation)
    this.triggerOperationChange()
    this._editorContext.startEditorItemInfos.length = 0
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

  public static getItemsBoundary(items: Item[]) {
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

  public beginTextEditOperation(editorItem: EditorItem) {
    this._editorContext.startEditorItemInfos.length = 0
    let editorItemInfo = OperationHelper.saveEditorItem(editorItem)
    this._editorContext.startEditorItemInfos.push(editorItemInfo)
    //console.log(`save: ${editorItemInfo}`)
  }

  public beginShapeTextEditOperation(editorItem: EditorItem): [EditorItemInfo, number, number] {
    if (this._editorContext.target && this._editorContext.targetItem) {
      const editorItemInfo = OperationHelper.saveEditorItem(editorItem)
      return [editorItemInfo, this._editorContext.targetItem.shape.startIndex, this._editorContext.targetItem.shape.endIndex]
    } else {
      const editorItemInfo = OperationHelper.saveEditorItem(editorItem)
      return [editorItemInfo, editorItem.shape.startIndex, editorItem.shape.endIndex]
    }
  }

  public finishTextEditOperation() {
    if (this._editorContext.target && this._editorContext.targetItem && this._editorContext.startEditorItemInfos.length > 0) {
      let origItemInfo = this._editorContext.startEditorItemInfos[0]
      let editorItemInfo = OperationHelper.saveEditorItem(this._editorContext.target)
      let operation = new Operation(this, OperationType.UPDATE_ITEMS, [editorItemInfo], true, [origItemInfo])
      this._operationService.addOperation(operation)
      //console.log(`finish: ${editorItemInfo}`)
      //console.log(`finish2: ${origItemInfo}`)
      this.triggerOperationChange()
      this._editorContext.startEditorItemInfos.length = 0
    } else if (this._editorContext.target && this._editorContext.startEditorItemInfos.length > 0) {
      let origItemInfo = this._editorContext.startEditorItemInfos[0]
      let editorItemInfo = OperationHelper.saveEditorItem(this._editorContext.target)
      let operation = new Operation(this, OperationType.UPDATE_ITEMS, [editorItemInfo], true, [origItemInfo])
      this._operationService.addOperation(operation)
      //console.log(`finish3: ${editorItemInfo}`)
      //console.log(`finish4: ${origItemInfo}`)
      this.triggerOperationChange()
      this._editorContext.startEditorItemInfos.length = 0
    }
  }

  public finishShapeTextEditOperation(origEditorItemInfo: EditorItemInfo, startIndex: number, endIndex: number) {
    if (this._editorContext.target && this._editorContext.targetItem) {
      let editorItemInfo = OperationHelper.saveEditorItem(this._editorContext.target)
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
        this._editorContext.targetItem.shape.startIndex,
        this._editorContext.targetItem.shape.endIndex,
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
    } else if (this._editorContext.target) {
      let editorItemInfo = OperationHelper.saveEditorItem(this._editorContext.target)
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
        this._editorContext.target.shape.startIndex,
        this._editorContext.target.shape.endIndex,
        startIndex,
        endIndex,
      )
      this._operationService.addOperation(operation)
      this.triggerOperationChange()
      this._editorContext.startEditorItemInfos.length = 0
    }
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

  public beginCodeEdit() {
    this._editorContext.codeEditing = true
    this.triggerCodeEditStart()
  }

  public finishCodeEdit() {
    this._editorContext.codeEditing = false
    this.triggerCodeEditEnd()
  }

  public inCodeEditing() {
    return this._editorContext.codeEditing
  }
}
