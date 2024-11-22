import { Rectangle2D } from '@ratel-web/engine'
import { EditorItemInfo } from '../../Items'
import { EditorUtils } from '../../Theme'
import { Editor } from './Editor'
import { EditorEvent } from './EditorEvent'
import { EditorOperationEvent } from './EditorOperationEvent'

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
  private _selectionResizedListeners = new Array<(e: EditorEvent) => void>(0)
  private _selectionResizingListeners = new Array<(e: EditorEvent) => void>(0)
  private _textEditStyleChangeListeners = new Array<(e: EditorEvent) => void>(0)
  private _tableTextEditStartListeners = new Array<(e: EditorEvent) => void>(0)
  private _tableTextEditEndListeners = new Array<(e: EditorEvent) => void>(0)
  private _editorModeChangeListeners = new Array<(e: EditorEvent) => void>(0)
  private _editorOperationEventListeners = new Array<(e: EditorOperationEvent) => void>(0)
  private _operationCompleteListeners = new Array<(e: EditorEvent) => void>(0)

  public constructor(editor: Editor) {
    this._editor = editor
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
}
