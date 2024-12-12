import { Rectangle2D } from '@ratel-web/engine'
import { EditorItem, EditorItemInfo } from '../../Items'
import { EditorUtils } from '../../Theme'
import { BackgroundLayer } from './BackgroundLayer'
import { ContainerLayer } from './ContainerLayer'
import { ContentLayer } from './ContentLayer'
import { ControllerLayer } from './ControllerLayer'
import { Editor } from './Editor'
import { EditorEvent } from './EditorEvent'
import { EditorLayer } from './EditorLayer'
import { EditorOperationEvent } from './EditorOperationEvent'
import { HoverLayer } from './HoverLayer'
import { MaskLayer } from './MaskLayer'
import { SelectionLayer } from './SelectionLayer'
import { TableLayer } from './TableLayer'

export class EditorContext {
  private _editor: Editor
  private _inMoving = false
  private _moveStarted = false //Check if movement already started
  private _startPointX = 0
  private _startPointY = 0
  private _inCreatingConnector = false
  private _targetTime = 0
  private _targetRowResizing = false
  private _targetColumnResizing = false
  private _targetRowIndex = 0
  private _targetColumnIndex = 0
  private _targetItemIndex = -1 //It needs to be -1 since first cell have 0 index
  private _textInputStatus = 'CHAR_TYPING'
  private _textCommandKey = false
  private _textFocused = false
  private _startEditorItemInfos: EditorItemInfo[] = []
  private _textSelecting: boolean = false
  private _inRangeSelecting: boolean = false
  private _rangeSelectionShape: Rectangle2D = new Rectangle2D(0, 0, 0, 0)
  private _inContainerSelection: boolean = false
  private _containerSelectionShape: Rectangle2D = new Rectangle2D(0, 0, 0, 0)
  private _selectionOutlineShape: Rectangle2D = new Rectangle2D(0, 0, 0, 0)
  private _tableActiveCellShape: Rectangle2D = new Rectangle2D(0, 0, 0, 0)
  private _selectionChangeListeners = new Array<(e: EditorEvent) => void>(0)
  private _operationChangeListeners = new Array<(e: EditorEvent) => void>(0)
  private _sizeChangeListeners = new Array<(e: EditorEvent) => void>(0)
  private _textEditStartListeners = new Array<(e: EditorEvent) => void>(0)
  private _textEditEndListeners = new Array<(e: EditorEvent) => void>(0)
  private _codeEditStartListeners = new Array<(e: EditorEvent) => void>(0)
  private _codeEditEndListeners = new Array<(e: EditorEvent) => void>(0)
  private _selectionResizedListeners = new Array<(e: EditorEvent) => void>(0)
  private _selectionResizingListeners = new Array<(e: EditorEvent) => void>(0)
  private _textEditStyleChangeListeners = new Array<(e: EditorEvent) => void>(0)
  private _tableTextEditStartListeners = new Array<(e: EditorEvent) => void>(0)
  private _tableTextEditEndListeners = new Array<(e: EditorEvent) => void>(0)
  private _editorModeChangeListeners = new Array<(e: EditorEvent) => void>(0)
  private _editorOperationEventListeners = new Array<(e: EditorOperationEvent) => void>(0)
  private _operationCompleteListeners = new Array<(e: EditorEvent) => void>(0)
  private readonly _controllerLayer: EditorLayer
  private readonly _maskLayer: EditorLayer
  private readonly _rangeLayer: EditorLayer
  private readonly _moveLayer: EditorLayer
  private readonly _containerLayer: EditorLayer
  private readonly _tableLayer: EditorLayer
  private readonly _backgroundLayer: BackgroundLayer
  private readonly _contentLayer: EditorLayer
  private readonly _hoverLayer: EditorLayer
  private readonly _selectionLayer: EditorLayer
  private readonly _exportLayer: EditorLayer
  private _target: EditorItem | undefined
  private _targetItem: EditorItem | undefined
  private _modified: boolean
  private readonly _textArea: HTMLTextAreaElement
  private _targetPoolXResizing: boolean = false
  private _targetPoolYResizing: boolean = false
  private _targetPoolIndex: number = 0 // -2: header, -1 stage region or pool region, 0+ stage index or pool index
  private _codeEditing: boolean = false

  public constructor(editor: Editor) {
    this._editor = editor
    this._backgroundLayer = new BackgroundLayer(editor, editor.horizontalSpace, editor.verticalSpace, editor.workWidth, editor.workHeight, editor.gridSize)
    this._controllerLayer = new ControllerLayer(editor.horizontalSpace, editor.verticalSpace, editor.workWidth, editor.workHeight)
    this._maskLayer = new MaskLayer(0, 0, editor.width, editor.height)
    this._rangeLayer = new MaskLayer(0, 0, editor.width, editor.height)
    this._moveLayer = new MaskLayer(editor.horizontalSpace, editor.verticalSpace, editor.workWidth, editor.workHeight)
    this._containerLayer = new ContainerLayer(editor.horizontalSpace, editor.verticalSpace, editor.workWidth, editor.workHeight)
    this._tableLayer = new TableLayer(0, 0, editor.width, editor.height)
    this._contentLayer = new ContentLayer(editor.horizontalSpace, editor.verticalSpace, editor.workWidth, editor.workHeight)
    this._hoverLayer = new HoverLayer(0, 0, editor.width, editor.height)
    this._selectionLayer = new SelectionLayer(0, 0, editor.width, editor.height)
    this._exportLayer = new ContentLayer(editor.horizontalSpace, editor.verticalSpace, editor.workWidth, editor.workHeight)
    this._contentLayer.editor = editor
    this._hoverLayer.editor = editor
    this._selectionLayer.editor = editor
    this._exportLayer.editor = editor
    this._controllerLayer.editor = editor
    this._maskLayer.editor = editor
    this._moveLayer.editor = editor
    this._rangeLayer.editor = editor
    this._containerLayer.editor = editor
    this._tableLayer.editor = editor

    this._modified = false
    this._rangeSelectionShape.fill.setColor(EditorUtils.rangeSelectionFillColor)
    this._rangeSelectionShape.fill.setAlpha(EditorUtils.rangeSelectionFillAlpha)
    this._rangeSelectionShape.stroke.setColor(EditorUtils.rangeSelectionStrokeColor)
    this._rangeSelectionShape.stroke.setStrokeWidth(EditorUtils.rangeSelectionStrokeLineWidth)
    this._rangeSelectionShape.stroke.setAntiAlias(EditorUtils.rangeSelectionStrokeAntiAlias)
    this._rangeSelectionShape.stroke.setAlpha(EditorUtils.rangeSelectionStrokeAlpha)
    this._containerSelectionShape.fill.setColor(EditorUtils.containerSelectionFillColor)
    this._containerSelectionShape.fill.setAlpha(EditorUtils.containerSelectionFillAlpha)
    this._containerSelectionShape.stroke.setColor(EditorUtils.containerSelectionStrokeColor)
    this._containerSelectionShape.stroke.setStrokeWidth(EditorUtils.containerSelectionStrokeLineWidth)
    this._selectionOutlineShape.stroke.setColor(EditorUtils.selectionOutlineStrokeColor)
    this._selectionOutlineShape.stroke.setStrokeWidth(EditorUtils.selectionOutlineStrokeLineWidth)
    this._selectionOutlineShape.stroke.setAntiAlias(EditorUtils.selectionOutlineStrokeAntiAlias)
    this._selectionOutlineShape.stroke.setStrokeDashStyle(EditorUtils.selectionOutlineStrokeDashStyle)
    this._selectionOutlineShape.filled = false
    this._tableActiveCellShape.filled = false
    this._tableActiveCellShape.stroke.setColor(EditorUtils.tableActiveCellStrokeColor)
    this._tableActiveCellShape.stroke.setStrokeWidth(EditorUtils.tableActiveCellStrokeLineWidth)
    this._tableActiveCellShape.stroke.setStrokeDashStyle(EditorUtils.tableActiveCellStrokeDashStyle)
    this._tableActiveCellShape.stroke.setAntiAlias(EditorUtils.tableActiveCellStrokeAntiAlias)

    this._tableLayer.addNode(this._tableActiveCellShape)
    this._textArea = document.createElement('textarea')
    this.initializeTextArea()
  }

  public get codeEditing() {
    return this._codeEditing
  }

  public set codeEditing(value: boolean) {
    this._codeEditing = value
  }

  public get inMoving() {
    return this._inMoving
  }

  public set inMoving(value: boolean) {
    this._inMoving = value
  }

  public get moveStarted() {
    return this._moveStarted
  }

  public set moveStarted(value: boolean) {
    this._moveStarted = value
  }

  public get startPointX() {
    return this._startPointX
  }

  public set startPointX(value: number) {
    this._startPointX = value
  }

  public get startPointY() {
    return this._startPointY
  }

  public set startPointY(value: number) {
    this._startPointY = value
  }

  public get inCreatingConnector() {
    return this._inCreatingConnector
  }

  public set inCreatingConnector(value: boolean) {
    this._inCreatingConnector = value
  }

  public get targetTime() {
    return this._targetTime
  }

  public set targetTime(value: number) {
    this._targetTime = value
  }

  public get targetRowIndex() {
    return this._targetRowIndex
  }

  public set targetRowIndex(value: number) {
    this._targetRowIndex = value
  }

  public get targetColumnIndex() {
    return this._targetColumnIndex
  }

  public set targetColumnIndex(value: number) {
    this._targetColumnIndex = value
  }

  public get targetItemIndex() {
    return this._targetItemIndex
  }

  public set targetItemIndex(value: number) {
    this._targetItemIndex = value
  }

  public get targetRowResizing() {
    return this._targetRowResizing
  }

  public set targetRowResizing(value: boolean) {
    this._targetRowResizing = value
  }

  public get targetColumnResizing() {
    return this._targetColumnResizing
  }

  public set targetColumnResizing(value: boolean) {
    this._targetColumnResizing = value
  }

  public get textInputStatus() {
    return this._textInputStatus
  }

  public set textInputStatus(value: string) {
    this._textInputStatus = value
  }

  public get textCommandKey() {
    return this._textCommandKey
  }

  public set textCommandKey(value: boolean) {
    this._textCommandKey = value
  }

  public get textFocused() {
    return this._textFocused
  }

  public set textFocused(value: boolean) {
    this._textFocused = value
  }

  public get startEditorItemInfos() {
    return this._startEditorItemInfos
  }

  public get textSelecting() {
    return this._textSelecting
  }

  public set textSelecting(value: boolean) {
    this._textSelecting = value
  }

  public get inContainerSelection() {
    return this._inContainerSelection
  }

  public set inContainerSelection(value: boolean) {
    this._inContainerSelection = value
  }

  public get containerSelectionShape() {
    return this._containerSelectionShape
  }

  public get selectionOutlineShape() {
    return this._selectionOutlineShape
  }

  public get inRangeSelecting() {
    return this._inRangeSelecting
  }

  public set inRangeSelecting(value: boolean) {
    this._inRangeSelecting = value
  }

  public get rangeSelectionShape() {
    return this._rangeSelectionShape
  }

  public get tableActiveCellShape() {
    return this._tableActiveCellShape
  }

  public get selectionChangeListeners() {
    return this._selectionChangeListeners
  }

  public get operationChangeListeners() {
    return this._operationChangeListeners
  }

  public get sizeChangeListeners() {
    return this._sizeChangeListeners
  }

  public get textEditStartListeners() {
    return this._textEditStartListeners
  }

  public get textEditEndListeners() {
    return this._textEditEndListeners
  }

  public get codeEditStartListeners() {
    return this._codeEditStartListeners
  }

  public get codeEditEndListeners() {
    return this._codeEditEndListeners
  }

  public get selectionResizedListeners() {
    return this._selectionResizedListeners
  }

  public get selectionResizingListeners() {
    return this._selectionResizingListeners
  }

  public get textEditStyleChangeListeners() {
    return this._textEditStyleChangeListeners
  }

  public get tableTextEditStartListeners() {
    return this._tableTextEditStartListeners
  }

  public get tableTextEditEndListeners() {
    return this._tableTextEditEndListeners
  }

  public get editorModeChangeListeners() {
    return this._editorModeChangeListeners
  }

  public get editorOperationEventListeners() {
    return this._editorOperationEventListeners
  }

  public get operationCompleteListeners() {
    return this._operationCompleteListeners
  }

  public get controllerLayer() {
    return this._controllerLayer
  }

  public get maskLayer(): EditorLayer {
    return this._maskLayer
  }

  public get rangeLayer(): EditorLayer {
    return this._rangeLayer
  }

  public get moveLayer(): EditorLayer {
    return this._moveLayer
  }

  public get containerLayer(): EditorLayer {
    return this._containerLayer
  }

  public get tableLayer(): EditorLayer {
    return this._tableLayer
  }

  public get backgroundLayer(): BackgroundLayer {
    return this._backgroundLayer
  }

  public get contentLayer(): EditorLayer {
    return this._contentLayer
  }

  public get exportLayer(): EditorLayer {
    return this._exportLayer
  }

  public get selectionLayer(): EditorLayer {
    return this._selectionLayer
  }

  public get hoverLayer(): EditorLayer {
    return this._hoverLayer
  }

  public get target(): EditorItem | undefined {
    return this._target
  }

  public set target(value: EditorItem | undefined) {
    this._target = value
  }

  public get targetItem(): EditorItem | undefined {
    return this._targetItem
  }

  public set targetItem(value: EditorItem | undefined) {
    this._targetItem = value
  }

  public get modified() {
    return this._modified
  }

  public set modified(value: boolean) {
    this._modified = value
  }

  public get textArea() {
    return this._textArea
  }

  public get targetPoolXResizing() {
    return this._targetPoolXResizing
  }

  public set targetPoolXResizing(value: boolean) {
    this._targetPoolXResizing = value
  }

  public get targetPoolYResizing() {
    return this._targetPoolYResizing
  }

  public set targetPoolYResizing(value: boolean) {
    this._targetPoolYResizing = value
  }
  /**
   *   -2: header, -1 stage region or pool region, 0+ stage index or pool index
   */
  public get targetPoolIndex() {
    return this._targetPoolIndex
  }

  public set targetPoolIndex(value: number) {
    this._targetPoolIndex = value
  }

  private initializeTextArea() {
    if (this._editor.engine.container?.parentElement) {
      this._editor.engine.container.parentElement.append(this._textArea)
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
        this._textInputStatus = 'CHINESE_TYPING'
      },
      false,
    )
    this._textArea.addEventListener('input', (e: any): void => {
      if (this._textInputStatus === 'CHINESE_TYPING') {
        return
      }
      if (this._target && this._targetItem && e.data) {
        const [origEditorItemInfo, startIndex, endIndex] = this._editor.beginShapeTextEditOperation(this._target)
        this._targetItem.shape.insert(e.data)
        this._editor.finishShapeTextEditOperation(origEditorItemInfo, startIndex, endIndex)
        this._editor.triggerTextEditStyleChange()
      } else if (this._target && e.data) {
        const [origEditorItemInfo, startIndex, endIndex] = this._editor.beginShapeTextEditOperation(this._target)
        this._target.shape.insert(e.data)
        this._editor.finishShapeTextEditOperation(origEditorItemInfo, startIndex, endIndex)
        this._editor.triggerTextEditStyleChange()
      }
      this._textInputStatus = 'CHAR_TYPING'
    })
    this._textArea.addEventListener('compositionend', (e: CompositionEvent) => {
      if (this._textInputStatus === 'CHINESE_TYPING') {
        if (this._target && this._targetItem) {
          const [origEditorItemInfo, startIndex, endIndex] = this._editor.beginShapeTextEditOperation(this._target)
          this._targetItem.shape.insert(e.data)
          this._editor.finishShapeTextEditOperation(origEditorItemInfo, startIndex, endIndex)
          this._editor.triggerTextEditStyleChange()
        } else if (this._target) {
          const [origEditorItemInfo, startIndex, endIndex] = this._editor.beginShapeTextEditOperation(this._target)
          this._target.shape.insert(e.data)
          this._editor.finishShapeTextEditOperation(origEditorItemInfo, startIndex, endIndex)
          this._editor.triggerTextEditStyleChange()
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private handleTextAreaKeyDown(e: KeyboardEvent) {
    // console.log(`Key Down ${e.code}`)
    this._textCommandKey = false
  }

  private handleTextAreaKeyUp(e: KeyboardEvent) {
    //console.log(`Key Up ${e.code}  ${e.altKey}  ${e.ctrlKey} ${e.key}`)
    if (e.key === 'Meta' || e.key === 'Control') {
      this._textCommandKey = true
    }
    if (e.ctrlKey && e.key === 'a') {
      if (this._targetItem) {
        this._targetItem.shape.selectAll()
      } else if (this._target) {
        this._target.shape.selectAll()
      }
      return
    }

    if (this._textFocused && e.key === 'Backspace') {
      if (this._target && this._targetItem) {
        const [origEditorItemInfo, startIndex, endIndex] = this._editor.beginShapeTextEditOperation(this._target)
        this._targetItem.shape.handleBackspace()
        this._editor.finishShapeTextEditOperation(origEditorItemInfo, startIndex, endIndex)
      } else if (this._target) {
        const [origEditorItemInfo, startIndex, endIndex] = this._editor.beginShapeTextEditOperation(this._target)
        this._target.shape.handleBackspace()
        this._editor.finishShapeTextEditOperation(origEditorItemInfo, startIndex, endIndex)
      }
    }

    if (this._textFocused && e.key === 'Delete') {
      if (this._target && this._targetItem) {
        const [origEditorItemInfo, startIndex, endIndex] = this._editor.beginShapeTextEditOperation(this._target)
        this._targetItem.shape.handleDelete()
        this._editor.finishShapeTextEditOperation(origEditorItemInfo, startIndex, endIndex)
      } else if (this._target) {
        const [origEditorItemInfo, startIndex, endIndex] = this._editor.beginShapeTextEditOperation(this._target)
        this._target.shape.handleDelete()
        this._editor.finishShapeTextEditOperation(origEditorItemInfo, startIndex, endIndex)
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
    if (this._textFocused && e.key === 'Home') {
      if (this._targetItem) {
        this._targetItem.shape.moveColumnsToHome()
      } else if (this._target) {
        this._target.shape.moveColumnsToHome()
      }
    }
    if (this._textFocused && e.key === 'End') {
      if (this._targetItem) {
        this._targetItem.shape.moveColumnsToEnd()
      } else if (this._target) {
        this._target.shape.moveColumnsToEnd()
      }
    }
    if (this._textFocused && e.key === 'Enter') {
      if (this._target && this._targetItem) {
        const [origEditorItemInfo, startIndex, endIndex] = this._editor.beginShapeTextEditOperation(this._target)
        this._targetItem.shape.handleReturn()
        this._editor.finishShapeTextEditOperation(origEditorItemInfo, startIndex, endIndex)
      } else if (this._target) {
        const [origEditorItemInfo, startIndex, endIndex] = this._editor.beginShapeTextEditOperation(this._target)
        this._target.shape.handleReturn()
        this._editor.finishShapeTextEditOperation(origEditorItemInfo, startIndex, endIndex)
      }
    }
  }
}
