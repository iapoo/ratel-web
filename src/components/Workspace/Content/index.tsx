/* eslint-disable radix,@typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { EditorUtils, Languages } from '@/components/Workspace/Utils'
import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  ArrowDownOutlined,
  ArrowRightOutlined,
  BoldOutlined,
  DeleteColumnOutlined,
  DeleteRowOutlined,
  FontColorsOutlined,
  InsertRowAboveOutlined,
  InsertRowBelowOutlined,
  InsertRowLeftOutlined,
  InsertRowRightOutlined,
  ItalicOutlined,
  OrderedListOutlined,
  UnderlineOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons'
import { LanguageSupport, StreamLanguage } from '@codemirror/language'
import type { ViewUpdate } from '@codemirror/view'
import type { DragEndEvent } from '@dnd-kit/core'
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core'
import { arrayMove, horizontalListSortingStrategy, SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Editor, EditorEvent, EditorOperationEvent } from '@ratel-web/editor/Editor'
import { CodeContainer, EditorItem, EditorItemInfo, Item, PoolCustomContainer, ShapeEntity, TableEntity } from '@ratel-web/editor/Items'
import { Operation, OperationHelper, OperationType } from '@ratel-web/editor/Operations'
import { ThemeUtils } from '@ratel-web/editor/Theme'
import { CommonUtils, Constants, EditorHelper } from '@ratel-web/editor/Utils'
import { Engine, FontSlant, FontWeight, MouseCode, Node, Point2, PointerEvent, TextDecoration } from '@ratel-web/engine'
import { ValueType } from '@rc-component/mini-decimal'
import { SVG } from '@svgdotjs/svg.js'
import { langs } from '@uiw/codemirror-extensions-langs'
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { Button, ColorPicker, ConfigProvider, Divider, Dropdown, FloatButton, Input, MenuProps, Select, Space, Tabs, theme, Tooltip } from 'antd'
import html2canvas from 'html2canvas'
import React, { FC, KeyboardEvent, MutableRefObject, SyntheticEvent, UIEvent, useEffect, useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'umi'
import { FontSizeOptions, RequestUtils, SystemUtils, Utils } from '../Utils'

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-node-key': string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DraggableTabNode = ({ className, ...props }: DraggableTabPaneProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props['data-node-key'],
  })

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleX: 1 }),
    transition,
    cursor: 'move',
  }

  return React.cloneElement(props.children as React.ReactElement, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  })
}

interface Pane {
  title: string
  content: string
  key: string
  editor: Editor | null
  initialized: boolean
  scrollLeft: number
  scrollTop: number
  viewWidth: number
  viewHeight: number
  contentWidth: number
  contentHeight: number
  editorWorkWidth: number
  editorWorkHeight: number
  editorHorizontalSpace: number
  editorVerticalSpace: number
}

interface ContentProps {
  onEditorChange: (oldEditor: Editor | undefined, newEditor: Editor | undefined) => void
  onMyShapesUpdated: () => void
  x: string
  y: string
  showRuler: boolean
  documentThemeName: string
  onDocumentThemeChanged: (newThemeName: string) => void
}

const { TabPane } = Tabs
const DOCUMENT_PREFIX = 'File '
const DOCUMENT_CONTENT = 'Dummy'
//TODO FIXME, if setup with same width and height, some strange behave may happen while zooming. and so make default value some strange
const DEFAULT_PAINTER_WIDTH = 801
const DEFAULT_PAINTER_HEIGHT = 599
const MIN_VISUAL_SIZE = 32
const RULER_SIZE = 20

const initialPanes: Pane[] = [
  {
    title: DOCUMENT_PREFIX + '1',
    content: DOCUMENT_CONTENT,
    key: '1',
    editor: null,
    initialized: false,
    scrollLeft: 0,
    scrollTop: 0,
    viewWidth: 0,
    viewHeight: 0,
    contentWidth: 0,
    contentHeight: 0,
    editorWorkWidth: 0,
    editorWorkHeight: 0,
    editorHorizontalSpace: 0,
    editorVerticalSpace: 0,
  },
  {
    title: DOCUMENT_PREFIX + '2',
    content: DOCUMENT_CONTENT,
    key: '2',
    editor: null,
    initialized: false,
    scrollLeft: 0,
    scrollTop: 0,
    viewWidth: 0,
    viewHeight: 0,
    contentWidth: 0,
    contentHeight: 0,
    editorWorkWidth: 0,
    editorWorkHeight: 0,
    editorHorizontalSpace: 0,
    editorVerticalSpace: 0,
  },
  {
    title: DOCUMENT_PREFIX + '3',
    content: DOCUMENT_CONTENT,
    key: '3',
    editor: null,
    initialized: false,
    scrollLeft: 0,
    scrollTop: 0,
    viewWidth: 0,
    viewHeight: 0,
    contentWidth: 0,
    contentHeight: 0,
    editorWorkWidth: 0,
    editorWorkHeight: 0,
    editorHorizontalSpace: 0,
    editorVerticalSpace: 0,
  },
]

//const {  useToken, } = theme

enum PopupType {
  EDITOR,
  SHAPES,
  TEXT,
}

const Content: FC<ContentProps> = ({ onEditorChange, onMyShapesUpdated, x, y, showRuler, documentThemeName, onDocumentThemeChanged }) => {
  //const { token, } =  useToken()
  const intl = useIntl()

  const getDefaultContentWidth = () => {
    if (Utils.currentEditor) {
      // @ts-ignore
      return Math.round(Utils.currentEditor.width + Editor.SHADOW_SIZE * 2) + 'px'
    } else {
      return DEFAULT_PAINTER_WIDTH + Editor.SHADOW_SIZE * 2 + 'px'
    }
  }

  const getDefaultContentHeight = () => {
    if (Utils.currentEditor) {
      // @ts-ignore
      return Math.round(Utils.currentEditor.height + Editor.SHADOW_SIZE * 2) + 'px'
    } else {
      return DEFAULT_PAINTER_HEIGHT + Editor.SHADOW_SIZE * 2 + 'px'
    }
  }
  const getDefaultEditorWidth = () => {
    if (Utils.currentEditor) {
      // @ts-ignore
      return Math.round(Utils.currentEditor.width) + 'px'
    } else {
      return DEFAULT_PAINTER_WIDTH + 'px'
    }
  }
  const getDefaultEditorHeight = () => {
    if (Utils.currentEditor) {
      // @ts-ignore
      return Math.round(Utils.currentEditor.height) + 'px'
    } else {
      return DEFAULT_PAINTER_HEIGHT + 'px'
    }
  }

  const [forceUpdate, setForceUpdate] = useState<boolean>(false)
  const [initialized, setInitialized] = useState<boolean>(false)
  const [activeKey, setActiveKey] = useState(initialPanes[0].key)
  const [activePane, setActivePane] = useState<Pane | null>(initialPanes[0])
  const [viewWidth, setViewWidth] = useState<number>(300)
  const [viewHeight, setViewHeight] = useState<number>(300)
  const [contentWidth, setContentWidth] = useState<string>(getDefaultContentWidth())
  const [contentHeight, setContentHeight] = useState<string>(getDefaultContentHeight())
  const [editorWidth, setEditorWidth] = useState<string>(getDefaultEditorWidth())
  const [editorHeight, setEditorHeight] = useState<string>(getDefaultEditorHeight())
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [documentModified, setDocumentModified] = useState<boolean>(false)
  const [textToolbarLeft, setTextToolbarLeft] = useState<number>(0)
  const [textToolbarTop, setTextToolbarTop] = useState<number>(0)
  const [textToolbarVisible, setTextToolbarVisible] = useState<boolean>(false)
  const [tableToolbarLeft, setTableToolbarLeft] = useState<number>(0)
  const [tableToolbarTop, setTableToolbarTop] = useState<number>(0)
  const [tableToolbarVisible, setTableToolbarVisible] = useState<boolean>(false)
  const [poolToolbarLeft, setPoolToolbarLeft] = useState<number>(0)
  const [poolToolbarTop, setPoolToolbarTop] = useState<number>(0)
  const [poolToolbarVisible, setPoolToolbarVisible] = useState<boolean>(false)
  const [codeContainerToolbarLeft, setCodeContainerToolbarLeft] = useState<number>(0)
  const [codeContainerToolbarTop, setCodeContainerToolbarTop] = useState<number>(0)
  const [codeContainerToolbarVisible, setCodeContainerToolbarVisible] = useState<boolean>(false)
  const [fontSize, setFontSize] = useState<number>(Constants.FONT_SIZE_DEFAULT)
  const [fontColor, setFontColor] = useState<string>(Constants.COLOR_FONT_DEFAULT)
  //const [fontWeight, setFontWeight] = useState<string>(Constants.FONT_WEIGHT_NORMAL)
  //const [fontSlant, setFontSlant] = useState<string>(Constants.FONT_SLANT_UP_RIGHT)
  //const [fontWidth, setFontWidth] = useState<string>(Constants.FONT_WIDTH_NORMAL)
  const [textAlignment, setTextAlignment] = useState<string>(Constants.TEXT_ALIGNMENT_LEFT)
  //const [textDecoration, setTextDecoration] = useState<string>(Constants.TEXT_DECORATION_NONE)
  const [textVerticalAlignment, setTextVerticalAlignment] = useState<string>(Constants.PLACE_HOLDER_ALIGNMENT_MIDDLE)
  const [fontBold, setFontBold] = useState<boolean>(false)
  const [fontItalic, setFontItalic] = useState<boolean>(false)
  const [fontUnderline, setFontUnderline] = useState<boolean>(false)
  const [currentEditor, setCurrentEditor] = useState<Editor | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fontSizeNode, setFontSizeNode] = useState<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [popupMenuVisible, setPopupMenuVisible] = useState<boolean>(false)
  const [popupType, setPopupType] = useState<PopupType>(PopupType.EDITOR)
  const [pasteLocation, setPasteLocation] = useState<Point2>(new Point2())
  const [copyLocation, setCopyLocation] = useState<Point2>(new Point2())
  const [pasteFromSystem, setPasteFromSystem] = useState<boolean>(true)
  const [tableEdittable, setTableEdittable] = useState<boolean>(false)
  const [poolEdittable, setPoolEdittable] = useState<boolean>(true)
  const [poolHorizontal, setPoolHorizontal] = useState(true)
  const [poolTextHorizontal, setPoolTextHorizontal] = useState(false)
  const [poolStageTextHorizontal, setPoolStageTextHorizontal] = useState(true)
  const [editorCursor, setEditorCursor] = useState<string>(Constants.EDITOR_CURSOR_AUTO)
  const [codeContent, setCodeContent] = useState<string>('')
  const [codeContainerVisible, setCodeContainerVisible] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [codeImage, setCodeImage] = useState<string>('')
  const [codeContainerLeft, setCodeContainerLeft] = useState<number>(0)
  const [codeContainerTop, setCodeContainerTop] = useState<number>(0)
  const [codeContainerWidth, setCodeContainerWidth] = useState<number>(100)
  const [codeContainerHeight, setCodeContainerHeight] = useState<number>(100)
  const [languageSupport, setLanguageSupport] = useState<LanguageSupport | StreamLanguage<unknown> | undefined>(undefined)
  const [codeLanguage, setCodeLanguage] = useState<ValueType>(Languages.PlainText)
  const [showLineNumber, setShowLineNumber] = useState<boolean>(true)
  const newTabIndex = useRef(4)
  const [panes, setPanes] = useState(initialPanes)
  const panesRef = useRef(initialPanes)
  const codeContainerRef = useRef<ReactCodeMirrorRef>()
  const codeContainerTargetRef = useRef<CodeContainer>()
  const sensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  // const [paneTititle, setPaneTitle, ] = useState<string>('hello')
  //const paneTitleRef = useRef(null)
  const token = theme.useToken()
  const splitColor = token.token.colorSplit
  const workspaceBackground = token.token.colorBgElevated
  const scrollbarTrackColor = token.token.colorBgContainer
  const scrollbarThumbColor = token.token.colorTextQuaternary
  const horizontalRulerRef = useRef(null)
  const verticalRulerRef = useRef(null)
  const textColor = token.token.colorText
  // const handlePaneTitleChange = (text:string, position: Position) => {
  //   if(activePane) {
  //     activePane.title = text
  //   }
  // }

  // useEditable(paneTitleRef, handlePaneTitleChange)

  useEffect(() => {
    if (!initialized) {
      initialize()
    }

    refresh()
    generateRulers()
    // 根据浏览器窗口大小来调整各子div的滚动范围
    window.addEventListener('resize', calculateViewSize)
    window.addEventListener('copy', handleCopyDetail)
    window.addEventListener('cut', handleCutDetail)
    window.addEventListener('paste', handlePasteDetail)
    // @ts-ignore
    window.addEventListener('keydown', handleKeyDownEvent)
    // const timer = setInterval(() => {
    // }, 100)

    return () => {
      window.removeEventListener('resize', calculateViewSize)
      window.removeEventListener('copy', handleCopyDetail)
      window.removeEventListener('cut', handleCutDetail)
      window.removeEventListener('paste', handlePasteDetail)
      // @ts-ignore
      window.removeEventListener('keydown', handleKeyDownEvent)
      // clearInterval(timer)
    }
  })

  const updateEditorSize = (panes: Pane[], fromZoomChange: boolean) => {
    const contentContainer = document.getElementById('content-container')
    if (contentContainer) {
      const horizontalSpace = contentContainer.clientWidth - MIN_VISUAL_SIZE
      const verticalSpace = contentContainer.clientHeight - MIN_VISUAL_SIZE
      if (Utils.currentEditor) {
        Utils.currentEditor.horizontalSpace = horizontalSpace
        Utils.currentEditor.verticalSpace = verticalSpace
      }
    }
    if (Utils.currentEditor) {
      // @ts-ignore
      const newContentWidth = Math.round(Utils.currentEditor.width + Editor.SHADOW_SIZE * 2) + 'px'
      if (contentWidth !== newContentWidth) {
        setContentWidth(newContentWidth)
      }
      // @ts-ignore
      const newContentHeight = Math.round(Utils.currentEditor.height + Editor.SHADOW_SIZE * 2) + 'px'
      if (contentHeight !== newContentHeight) {
        setContentHeight(newContentHeight)
      }
      // @ts-ignore
      const newEditorWidth = Math.round(Utils.currentEditor.width) + 'px'
      if (editorWidth !== newEditorWidth) {
        setEditorWidth(newEditorWidth)
      }
      // @ts-ignore
      const newEditorHeight = Math.round(Utils.currentEditor.height) + 'px'
      if (editorHeight !== newEditorHeight) {
        setEditorHeight(newEditorHeight)
      }
    } else {
      const newContentWidth = DEFAULT_PAINTER_WIDTH + Editor.SHADOW_SIZE * 2 + 'px'
      if (contentWidth !== newContentWidth) {
        setContentWidth(newContentWidth)
      }
      const newContentHeight = DEFAULT_PAINTER_HEIGHT + Editor.SHADOW_SIZE * 2 + 'px'
      if (contentHeight !== newContentHeight) {
        setContentHeight(newContentHeight)
      }
      const newEditorWidth = DEFAULT_PAINTER_WIDTH + 'px'
      if (editorWidth !== newEditorWidth) {
        setEditorWidth(newEditorWidth)
      }
      const newEditorHeight = DEFAULT_PAINTER_HEIGHT + 'px'
      if (editorHeight !== newEditorHeight) {
        setEditorHeight(newEditorHeight)
      }
    }
    const currentPane = findCurrentPane(panesRef.current)
    if (contentContainer && currentPane && Utils.currentEditor) {
      const oldEditorWorkWidth = currentPane.editorWorkWidth
      const oldEditorWorkHeight = currentPane.editorWorkHeight
      const oldEditorHorizontalSpace = currentPane.editorHorizontalSpace
      const oldEditorVerticalSpace = currentPane.editorVerticalSpace
      const oldScrollLeft = currentPane.scrollLeft
      const oldScrollTop = currentPane.scrollTop
      if (currentPane.initialized) {
        if (fromZoomChange) {
          const oldScreenCenterX = oldScrollLeft + contentContainer.clientWidth / 2
          const oldEditorRatioX = (oldScreenCenterX - oldEditorHorizontalSpace) / oldEditorWorkWidth
          const oldScreenCenterY = oldScrollTop + contentContainer.clientHeight / 2
          const oldEditorRatioY = (oldScreenCenterY - oldEditorVerticalSpace) / oldEditorWorkHeight
          const newScrollLeft = Utils.currentEditor.workWidth * oldEditorRatioX + Utils.currentEditor.horizontalSpace - contentContainer.clientWidth * 0.5
          const newScrollTop = Utils.currentEditor.workHeight * oldEditorRatioY + Utils.currentEditor.verticalSpace - contentContainer.clientHeight * 0.5
          if (contentContainer.scrollWidth > contentContainer.clientWidth) {
            contentContainer.scrollLeft = newScrollLeft //currentPane.scrollLeft
          } else {
            contentContainer.scrollLeft = 0
          }
          if (contentContainer.scrollHeight > contentContainer.clientHeight) {
            contentContainer.scrollTop = newScrollTop // currentPane.scrollTop
          } else {
            contentContainer.scrollTop = 0
          }
        } else {
          if (contentContainer.scrollWidth > contentContainer.clientWidth) {
            contentContainer.scrollLeft = currentPane.scrollLeft
          } else {
            contentContainer.scrollLeft = 0
          }
          if (contentContainer.scrollHeight > contentContainer.clientHeight) {
            contentContainer.scrollTop = currentPane.scrollTop
          } else {
            contentContainer.scrollTop = 0
          }
        }
      } else {
        if (contentContainer.scrollWidth > contentContainer.clientWidth) {
          contentContainer.scrollLeft = (contentContainer.scrollWidth - contentContainer.clientWidth) / 2
        } else {
          contentContainer.scrollLeft = 0
        }
        if (contentContainer.scrollHeight > contentContainer.clientHeight) {
          contentContainer.scrollTop = (contentContainer.scrollHeight - contentContainer.clientHeight) / 2
        } else {
          contentContainer.scrollTop = 0
        }

        currentPane.scrollLeft = contentContainer.scrollLeft
        currentPane.scrollTop = contentContainer.scrollTop
        currentPane.initialized = true
        // const newPanes = clonePanes()
        // const newPane = findPane(currentPane.key, newPanes)
        // newPane.scrollLeft = contentContainer.scrollLeft
        // newPane.scrollTop = contentContainer.scrollTop
        // newPane.initialized = true
        // setPanes(newPanes)
      }
      currentPane.contentWidth = Math.round(Utils.currentEditor.width + Editor.SHADOW_SIZE * 2)
      currentPane.contentHeight = Math.round(Utils.currentEditor.height + Editor.SHADOW_SIZE * 2)
      currentPane.editorWorkWidth = Utils.currentEditor.workWidth
      currentPane.editorWorkHeight = Utils.currentEditor.workHeight
      currentPane.editorHorizontalSpace = Utils.currentEditor.horizontalSpace
      currentPane.editorVerticalSpace = Utils.currentEditor.verticalSpace
    }
  }

  const calculateViewSize = () => {
    const container = document.getElementById('tab-container')
    if (container?.lastElementChild) {
      if (viewWidth !== container.lastElementChild.scrollWidth) {
        setViewWidth(container.lastElementChild.clientWidth)
      }
      if (viewHeight !== container.lastElementChild.scrollHeight) {
        setViewHeight(container.lastElementChild.clientHeight)
      }
    }
  }

  calculateViewSize()

  const initialize = async () => {
    setInitialized(true)
    await Engine.initialize()
    //let firstEditor: Editor | undefined = undefined
    //const panes = panesRef.current
    const newPanes = clonePanes()
    for (let i = 0; i < newPanes.length; i++) {
      const pane = newPanes[i]
      const canvasId = 'editor-' + pane.key
      const canvas = document.createElement('canvas')
      canvas.width = DEFAULT_PAINTER_WIDTH
      canvas.height = DEFAULT_PAINTER_HEIGHT
      canvas.id = canvasId
      const editor = new Editor(canvas)
      pane.editor = editor
      editor.key = pane.key
      editor.title = pane.title
      // @ts-ignore
      editor.start()
      // if(i == 0) {
      //   firstEditor = editor
      // } else {
      //   editor.operationService = firstEditor!.operationService
      // }
    }
    const container = document.getElementById('editor-container')
    const editor = newPanes[0].editor
    // @ts-ignore
    const canvas = editor?.container
    container?.append(canvas!)
    editor?.activate()
    let oldEditor = Utils.currentEditor
    Utils.currentEditor = editor!
    setCurrentEditor(editor!)
    onEditorChange(oldEditor, Utils.currentEditor)
    updateEditors(newPanes)
    setPanes(newPanes)
    panesRef.current = newPanes
    setActiveKey(newPanes[0].key)
    setActivePane(newPanes[0])
    //setPaneTitle(newPanes[0].title)
    Utils.loadData = loadData
    Utils.checkIfModified = checkIfDocumentModified
    updateEditorSize(newPanes, false)
    updateScroll()
    checkIfDocumentModified(false)
    oldEditor?.removeSelectionChange(handleSelectionChange)
    Utils.currentEditor.onSelectionChange(handleSelectionChange)
    oldEditor?.removeTextEditStart(handleTextEditStart)
    Utils.currentEditor.onTextEditStart(handleTextEditStart)
    oldEditor?.removeTextEditEnd(handleTextEditEnd)
    Utils.currentEditor.onTextEditEnd(handleTextEditEnd)
    oldEditor?.removeTableTextEditStart(handleTableTextEditStart)
    Utils.currentEditor.onTableTextEditStart(handleTableTextEditStart)
    oldEditor?.removeTableTextEditEnd(handleTableTextEditEnd)
    Utils.currentEditor.onTableTextEditEnd(handleTableTextEditEnd)
    oldEditor?.removeSelectionResized(handleSelectionResized)
    Utils.currentEditor.onSelectionResized(handleSelectionResized)
    oldEditor?.removeSelectionResizing(handleSelectionResizing)
    Utils.currentEditor.onSelectionResizing(handleSelectionResizing)
    oldEditor?.removeTextEditStyleChange(handleTextEditStyleChange)
    Utils.currentEditor.onTextEditStyleChange(handleTextEditStyleChange)
    oldEditor?.removeEditorModeChange(handleEditorModeChange)
    Utils.currentEditor.onEditorModeChange(handleEditorModeChange)
    oldEditor?.removeEditorOperationEvent(handleEditorOperationEvent)
    Utils.currentEditor.onEditorOperationEvent(handleEditorOperationEvent)
    oldEditor?.removeSizeChange(handleEditorSizeChange)
    Utils.currentEditor.onSizeChange(handleEditorSizeChange)
    oldEditor?.removeCodeEditStart(handleCodeEditStart)
    Utils.currentEditor.onCodeEditStart(handleCodeEditStart)
    oldEditor?.removeCodeEditEnd(handleCodeEditEnd)
    Utils.currentEditor.onCodeEditEnd(handleCodeEditEnd)
  }

  const updateScroll = () => {
    const contentContainer = document.getElementById('content-container')
    if (contentContainer) {
      const horizontalSpace = contentContainer.clientWidth - MIN_VISUAL_SIZE
      const verticalSpace = contentContainer.clientHeight - MIN_VISUAL_SIZE
      if (Utils.currentEditor) {
        Utils.currentEditor.horizontalSpace = horizontalSpace
        Utils.currentEditor.verticalSpace = verticalSpace
      }
    }
  }

  const findCurrentPane = (panes: Pane[]) => {
    //const panes = panesRef.current
    for (let i = 0; i < panes.length; i++) {
      const pane = panes[i]
      if (pane.editor === Utils.currentEditor) {
        return pane
      }
    }
    return null
  }

  const updateEditors = (panes: Pane[]) => {
    Utils.editors.length = 0
    panes.forEach((pane) => {
      Utils.editors.push(pane.editor!)
    })
    updateEditorSize(panes, false)

    //Need to hide toolbar & terminate editting operations here
    setTextToolbarVisible(false)
    setTableToolbarVisible(false)
    setPoolToolbarVisible(false)
    setCodeContainerVisible(false)
  }
  //
  // const saveData = () => {}

  const loadData = () => {
    if (!Utils.storageData) {
      return
    }
    const storageData = Utils.storageData
    const sheetCount = storageData.sheets.length
    let activeKey = ''
    let activateCanvas = null
    let activeEditor = null
    let activePane: Pane | null = null
    const oldPanes = panes
    const newPanes: Pane[] = []
    for (let sheetIndex = 0; sheetIndex < sheetCount; sheetIndex++) {
      const sheetData = storageData.sheets[sheetIndex]
      const pane: Pane = {
        title: sheetData.title,
        content: DOCUMENT_CONTENT,
        key: sheetData.key,
        editor: null,
        initialized: false,
        scrollLeft: 0,
        scrollTop: 0,
        viewWidth: 0,
        viewHeight: 0,
        contentWidth: 0,
        contentHeight: 0,
        editorWorkWidth: 0,
        editorWorkHeight: 0,
        editorHorizontalSpace: 0,
        editorVerticalSpace: 0,
      }
      const canvasId = 'editor-' + pane.key
      const canvas = document.createElement('canvas')
      canvas.width = DEFAULT_PAINTER_WIDTH
      canvas.height = DEFAULT_PAINTER_HEIGHT
      canvas.id = canvasId
      const editor = new Editor(canvas)
      pane.editor = editor
      pane.editorWorkWidth = editor.width
      pane.editorWorkHeight = editor.height
      editor.key = pane.key
      //editor.origWidth = sheetData.width
      //editor.origHeight = sheetData.height
      editor.setup(sheetData.zoom, sheetData.width, sheetData.height)
      editor.title = pane.title
      sheetData.items.forEach((itemData: EditorItemInfo) => {
        const item = OperationHelper.loadItem(itemData, editor)
        editor.contentLayer.addEditorItem(item)
      })
      //Update item reference by id
      sheetData.items.forEach((itemData: EditorItemInfo) => {
        OperationHelper.refreshItem(itemData, editor.contentLayer.getAllEditorItems())
      })
      editor.resetModified()
      // @ts-ignore
      editor.start()
      newPanes.push(pane)
      if (sheetIndex === 0) {
        activeKey = sheetData.key
        activateCanvas = canvas
        activeEditor = editor
        activePane = pane
      }
    }
    setPanes(newPanes)
    panesRef.current = newPanes
    cleanupPanes(oldPanes)
    setActiveKey(activeKey)
    setActivePane(activePane)
    //setPaneTitle(activePane?.title)

    const container = document.getElementById('editor-container')
    while (container?.hasChildNodes()) {
      container?.removeChild(container.lastChild!)
    }

    container?.append(activateCanvas!)
    activeEditor?.activate()

    let oldEditor = Utils.currentEditor
    Utils.currentEditor = activeEditor!
    setCurrentEditor(activeEditor!)
    onEditorChange(oldEditor, Utils.currentEditor)
    updateEditors(newPanes)
    checkIfDocumentModified(false)
    oldEditor?.removeSelectionChange(handleSelectionChange)
    Utils.currentEditor.onSelectionChange(handleSelectionChange)
    oldEditor?.removeTextEditStart(handleTextEditStart)
    Utils.currentEditor.onTextEditStart(handleTextEditStart)
    oldEditor?.removeTextEditEnd(handleTextEditEnd)
    Utils.currentEditor.onTextEditEnd(handleTextEditEnd)
    oldEditor?.removeTableTextEditStart(handleTableTextEditStart)
    Utils.currentEditor.onTableTextEditStart(handleTableTextEditStart)
    oldEditor?.removeTableTextEditEnd(handleTableTextEditEnd)
    Utils.currentEditor.onTableTextEditEnd(handleTableTextEditEnd)
    oldEditor?.removeSelectionResized(handleSelectionResized)
    Utils.currentEditor.onSelectionResized(handleSelectionResized)
    oldEditor?.removeSelectionResizing(handleSelectionResizing)
    Utils.currentEditor.onSelectionResizing(handleSelectionResizing)
    oldEditor?.removeEditorModeChange(handleEditorModeChange)
    Utils.currentEditor.onEditorModeChange(handleEditorModeChange)
    oldEditor?.removeEditorOperationEvent(handleEditorOperationEvent)
    Utils.currentEditor.onEditorOperationEvent(handleEditorOperationEvent)
    oldEditor?.removeSizeChange(handleEditorSizeChange)
    Utils.currentEditor.onSizeChange(handleEditorSizeChange)
    oldEditor?.removeCodeEditStart(handleCodeEditStart)
    Utils.currentEditor.onCodeEditStart(handleCodeEditStart)
    oldEditor?.removeCodeEditEnd(handleCodeEditEnd)
    Utils.currentEditor.onCodeEditEnd(handleCodeEditEnd)
  }

  const cleanupPanes = (panes: Pane[]) => {
    panes.forEach((pane) => {
      pane.editor?.dispose()
    })
  }
  const onTabChange = (newActiveKey: string) => {
    handleTabChange(panes, newActiveKey, true)
  }

  const handleTabChange = (panes: Pane[], newActiveKey: string, requireOperation: boolean) => {
    const container = document.getElementById('editor-container')
    setActiveKey(newActiveKey)
    while (container?.hasChildNodes()) {
      container?.removeChild(container.lastChild!)
    }
    let currentPane: Pane | null = null
    //const panes = panesRef.current
    //const panes = clonePanes()
    for (let i = 0; i < panes.length; i++) {
      const pane = panes[i]
      if (pane.key === newActiveKey) {
        const editor = pane.editor
        // @ts-ignore
        const canvas = editor?.container
        container?.append(canvas!)
        editor?.activate()
        let oldEditor = Utils.currentEditor
        //Remove editor will trigger this, and so we need to skip it here
        if (oldEditor !== editor) {
          Utils.currentEditor = editor!
          setCurrentEditor(editor!)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          currentPane = pane
          setActivePane(pane)
          //setPaneTitle(pane.title)
          onEditorChange(oldEditor, Utils.currentEditor)

          if (oldEditor && requireOperation && Utils.currentEditor) {
            let operation = new Operation(Utils.currentEditor, OperationType.SELECT_EDITOR, [], false, [], '', oldEditor, null)
            Utils.currentEditor.operationService.addOperation(operation)
            Utils.currentEditor.triggerOperationChange()
          }
          oldEditor?.removeSelectionChange(handleSelectionChange)
          Utils.currentEditor.onSelectionChange(handleSelectionChange)
          oldEditor?.removeTextEditStart(handleTextEditStart)
          Utils.currentEditor.onTextEditStart(handleTextEditStart)
          oldEditor?.removeTextEditEnd(handleTextEditEnd)
          Utils.currentEditor.onTextEditEnd(handleTextEditEnd)
          oldEditor?.removeTableTextEditStart(handleTableTextEditStart)
          Utils.currentEditor.onTableTextEditStart(handleTableTextEditStart)
          oldEditor?.removeTableTextEditEnd(handleTableTextEditEnd)
          Utils.currentEditor.onTableTextEditEnd(handleTableTextEditEnd)
          oldEditor?.removeSelectionResized(handleSelectionResized)
          Utils.currentEditor.onSelectionResized(handleSelectionResized)
          oldEditor?.removeSelectionResizing(handleSelectionResizing)
          Utils.currentEditor.onSelectionResizing(handleSelectionResizing)
          oldEditor?.removeEditorModeChange(handleEditorModeChange)
          Utils.currentEditor.onEditorModeChange(handleEditorModeChange)
          oldEditor?.removeEditorOperationEvent(handleEditorOperationEvent)
          Utils.currentEditor.onEditorOperationEvent(handleEditorOperationEvent)
          oldEditor?.removeSizeChange(handleEditorSizeChange)
          Utils.currentEditor.onSizeChange(handleEditorSizeChange)
          oldEditor?.removeCodeEditStart(handleCodeEditStart)
          Utils.currentEditor.onCodeEditStart(handleCodeEditStart)
          oldEditor?.removeCodeEditEnd(handleCodeEditEnd)
          Utils.currentEditor.onCodeEditEnd(handleCodeEditEnd)
        }
      }
    }
    updateEditors(panes)
    setPanes(panes)
    panesRef.current = panes
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const doHandleShapeStyleChange = (item: EditorItem, styleName: string) => {
    item.themeName = styleName
    item.items.forEach((child) => {
      doHandleShapeStyleChange(child, styleName)
    })
  }

  const refresh = () => {
    if (Utils.currentEditor) {
      refreshSelectionInfo(Utils.currentEditor)
      refreshPaneTitleValues()
    }
    Utils.editors.forEach((editor) => {
      editor.theme = ThemeUtils.getDocumentTheme(documentThemeName)
      // let editorItems = editor.contentLayer.getAllEditorItems()
      // editorItems.forEach((editorItem: EditorItem) => {
      //   doHandleShapeStyleChange(editorItem, documentThemeName)
      // })
    })
  }

  const refreshPaneTitleValues = () => {
    const panes = panesRef.current
    panes.forEach((pane) => {
      const element = document.getElementById('pane-title-input-' + pane.key)
      if (element) {
        const input = element as HTMLInputElement
        input.value = pane.title
        input.defaultValue = pane.title
      }
    })
  }

  const refreshSelectionInfo = (editor: Editor) => {
    if (editor.selectionLayer.getEditorItemCount() > 0) {
      let editorItem = editor.selectionLayer.getEditorItem(0)
      if (editorItem instanceof TableEntity && editor.targetItem) {
        editorItem = editor.targetItem
      }
      setFontSize(editorItem.fontSize)
      let fontColorValue = CommonUtils.generateColorString(editorItem.fontColor)
      setFontColor(fontColorValue.substring(0, 7))
      //setFontColor(shape.fontPaint.getColor)
      setFontBold(editorItem.fontWeight === FontWeight.BOLD)
      setFontItalic(editorItem.fontSlant === FontSlant.ITALIC)
      setFontUnderline(editorItem.textDecoration === TextDecoration.UNDERLINE)
      let textAlignmentValue = CommonUtils.generateTextAlignment(editorItem.textAlignment)
      setTextAlignment(textAlignmentValue)
      let textVerticalAlignmentValue = CommonUtils.generateTextVerticalAligment(editorItem.textVerticalAlignment)
      setTextVerticalAlignment(textVerticalAlignmentValue)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleTableTextEditStart = (e: EditorEvent) => {
    setTableEdittable(true)
    //    console.log(`table edit  start check: ${tableEdittable}`)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleTableTextEditEnd = (e: EditorEvent) => {
    setTableEdittable(false)
    //    console.log(`table edit end check: ${tableEdittable}`)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePoolTextEditStart = (e: EditorEvent) => {
    setPoolEdittable(true)
    //    console.log(`table edit  start check: ${tableEdittable}`)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePoolTextEditEnd = (e: EditorEvent) => {
    setPoolEdittable(false)
    //    console.log(`table edit end check: ${tableEdittable}`)
  }

  const handleSelectionChange = (e: EditorEvent) => {
    let tableSelected = false
    let poolSelected = false
    let codeContainerSelected = false
    if (Utils.currentEditor && e.source.selectionLayer.getEditorItemCount() === 1) {
      let item = e.source.selectionLayer.getEditorItem(0) as Item
      let container = document.getElementById('editor-container')
      let position = getElementAbsolutePosition(container)
      const [scrollLeft, scrollTop] = findEditorScrollPosition()
      // @ts-ignore
      let worldTransform = item.shape.worldTransform
      let point = worldTransform.makePoint(new Point2(0, 0))
      let left = point.x * Utils.currentEditor.zoom - scrollLeft
      let top = point.y * Utils.currentEditor.zoom - scrollTop
      if (item instanceof TableEntity && item.customizable) {
        setTableToolbarLeft(left + position.left)
        setTableToolbarTop(top + position.top)
        setTableToolbarVisible(true)
        tableSelected = true
      } else if (item instanceof PoolCustomContainer) {
        setPoolToolbarLeft(left + position.left)
        setPoolToolbarTop(top + position.top)
        setPoolToolbarVisible(true)
        poolSelected = true
        setPoolHorizontal(item.horizontal)
        setPoolTextHorizontal(item.poolTextHorizontal)
        setPoolStageTextHorizontal(item.stageTextHorizontal)
      } else if (item instanceof CodeContainer) {
        setCodeContainerToolbarLeft(left + position.left)
        setCodeContainerToolbarTop(top + position.top)
        setCodeContainerToolbarVisible(true)
        codeContainerSelected = true
      }
      refreshSelectionInfo(Utils.currentEditor)
    }
    if (!tableSelected) {
      setTableToolbarVisible(false)
    }
    if (!poolSelected) {
      setPoolToolbarVisible(false)
    }
    if (!codeContainerSelected) {
      setCodeContainerToolbarVisible(false)
    }
    if (Utils.currentEditor && e.source.selectionLayer.getEditorItemCount() > 0) {
      setPopupType(PopupType.SHAPES)
    } else {
      setPopupType(PopupType.EDITOR)
    }
  }

  const handleSelectionResized = (e: EditorEvent) => {
    //console.log(`handle selection resized`)
    if (Utils.currentEditor && e.source.selectionLayer.getEditorItemCount() === 1) {
      let item = e.source.selectionLayer.getEditorItem(0) as Item
      let container = document.getElementById('editor-container')
      let position = getElementAbsolutePosition(container)
      // @ts-ignore
      let worldTransform = item.shape.worldTransform
      let point = worldTransform.makePoint(new Point2(0, 0))
      const [scrollLeft, scrollTop] = findEditorScrollPosition()
      let left = point.x * Utils.currentEditor.zoom - scrollLeft
      let top = point.y * Utils.currentEditor.zoom - scrollTop
      //let left = item.left * Utils.currentEditor.zoom
      //let top = item.top * Utils.currentEditor.zoom
      if (item instanceof TableEntity && item.customizable) {
        setTableToolbarLeft(left + position.left)
        setTableToolbarTop(top + position.top)
        setTableToolbarVisible(true)
        if (Utils.currentEditor.targetItem) {
          setTextToolbarLeft(left + position.left)
          setTextToolbarTop(top + position.top)
          setTextToolbarVisible(true)
        }
      } else if (item instanceof TableEntity) {
        if (Utils.currentEditor.targetItem) {
          setTextToolbarLeft(left + position.left)
          setTextToolbarTop(top + position.top)
          setTextToolbarVisible(true)
        }
      } else if (item instanceof ShapeEntity && e.source.isTextEditting) {
        setTextToolbarLeft(left + position.left)
        setTextToolbarTop(top + position.top)
        setTextToolbarVisible(true)
      } else if (item instanceof PoolCustomContainer) {
        setPoolToolbarLeft(left + position.left)
        setPoolToolbarTop(top + position.top)
        setPoolToolbarVisible(true)
        setPoolHorizontal(item.horizontal)
        setPoolTextHorizontal(item.poolTextHorizontal)
        setPoolStageTextHorizontal(item.stageTextHorizontal)
      } else if (item instanceof CodeContainer && Utils.currentEditor.inCodeEditing()) {
        setCodeContainerLeft(left + position.left)
        setCodeContainerTop(top + position.top)
        setCodeContainerWidth(item.width)
        setCodeContainerHeight(item.height)
        setCodeContainerVisible(true)
        setCodeContainerToolbarLeft(left + position.left)
        setCodeContainerToolbarTop(top + position.top)
        setCodeContainerToolbarVisible(true)
      } else if (item instanceof CodeContainer) {
        setCodeContainerToolbarLeft(left + position.left)
        setCodeContainerToolbarTop(top + position.top)
        setCodeContainerToolbarVisible(true)
        //Utils.currentEditor.beginCodeEdit()
        //refresh code editor appearance
        //handleCodeEditEnd(e)
      }
    }
  }

  const handleSelectionResizing = (e: EditorEvent) => {
    //console.log(`handle selection resizing`)
    if (Utils.currentEditor && e.source.selectionLayer.getEditorItemCount() === 1) {
      let item = e.source.selectionLayer.getEditorItem(0) as Item
      if (item instanceof TableEntity) {
        setTableToolbarVisible(false)
        if (Utils.currentEditor.targetItem) {
          setTextToolbarVisible(false)
        }
      } else if (item instanceof ShapeEntity && e.source.isTextEditting) {
        setTextToolbarVisible(false)
      } else if (item instanceof PoolCustomContainer) {
        setPoolToolbarVisible(false)
      } else if (item instanceof CodeContainer) {
        setCodeContainerVisible(false)
        setCodeContainerToolbarVisible(false)
      }
    }
  }

  const handleTextEditStyleChange = (e: EditorEvent) => {
    if (Utils.currentEditor && e.source.selectionLayer.getEditorItemCount() === 1) {
      refreshSelectionInfo(Utils.currentEditor)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleEditorModeChange = (e: EditorEvent) => {
    if (Utils.currentEditor) {
      const editorCursor = SystemUtils.generateEditorMode(Utils.currentEditor.mode)
      setEditorCursor(editorCursor)
      //console.log(`cursor is updated = ${editorCursor}`)
    }
  }

  const handleTextEditStart = (e: EditorEvent) => {
    //console.log(`handle text start`)
    if (Utils.currentEditor && e.source.selectionLayer.getEditorItemCount() === 1) {
      let item = e.source.selectionLayer.getEditorItem(0) as Item
      let container = document.getElementById('editor-container')
      let postion = getElementAbsolutePosition(container)
      const [scrollLeft, scrollTop] = findEditorScrollPosition()
      // @ts-ignore
      let worldTransform = item.shape.worldTransform
      let point = worldTransform.makePoint(new Point2(0, 0))
      let left = point.x * Utils.currentEditor.zoom - scrollLeft
      let top = point.y * Utils.currentEditor.zoom - scrollTop
      //let left = item.left * Utils.currentEditor.zoom
      //let top = item.top * Utils.currentEditor.zoom
      setTextToolbarLeft(left + postion.left)
      setTextToolbarTop(top + postion.top)
      setTextToolbarVisible(true)
      refreshSelectionInfo(Utils.currentEditor)
      setPopupType(PopupType.TEXT)
    }
  }

  const getElementAbsolutePosition = (element: HTMLElement | null) => {
    if (element) {
      let acturalLeft = element.offsetLeft
      let acturalTop = element.offsetTop
      let curElement = element.offsetParent as HTMLElement
      while (curElement) {
        acturalLeft += curElement.offsetLeft
        acturalTop += curElement.offsetTop
        curElement = curElement.offsetParent as HTMLElement
      }
      return {
        left: acturalLeft - element.scrollLeft,
        top: acturalTop - element.scrollTop,
      }
    } else {
      return {
        left: 0,
        top: 0,
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleTextEditEnd = (e: EditorEvent) => {
    //console.log(`handle text end`)
    setTextToolbarVisible(false)
  }

  const findEditorScrollPosition = () => {
    const contentContainer = document.getElementById('content-container')
    if (contentContainer) {
      return [contentContainer.scrollLeft, contentContainer.scrollTop]
    } else {
      return [0, 0]
    }
  }

  const addEditor = (requireOperation: boolean, fromEditor: Editor | null, afterEditor: Editor | null, beforeEditor: Editor | null) => {
    const newActiveKey = `${newTabIndex.current++}`
    const panes = panesRef.current
    const newPanes = [...panes]
    //let newPanes: Pane[] = []
    //newPanes = newPanes.concat(panes)

    const title = fromEditor ? fromEditor.title : DOCUMENT_PREFIX + newActiveKey
    const pane: Pane = {
      title: title,
      content: DOCUMENT_CONTENT,
      key: newActiveKey,
      editor: null,
      initialized: false,
      scrollLeft: 0,
      scrollTop: 0,
      viewWidth: 0,
      viewHeight: 0,
      contentWidth: 0,
      contentHeight: 0,
      editorWorkWidth: 0,
      editorWorkHeight: 0,
      editorHorizontalSpace: 0,
      editorVerticalSpace: 0,
    }

    //It may be called multiple times since event is listened by multiple editor
    let exists = false
    for (let i = 0; i < panes.length; i++) {
      const childPane = panes[i]
      if (childPane.editor === fromEditor) {
        exists = true
      }
    }

    const canvasId = fromEditor ? 'editor-' + fromEditor.key : 'editor-' + pane.key
    // @ts-ignore
    const canvas = fromEditor ? fromEditor.canvas! : document.createElement('canvas')
    canvas.width = DEFAULT_PAINTER_WIDTH
    canvas.height = DEFAULT_PAINTER_HEIGHT
    canvas.id = canvasId
    const editor = fromEditor ? fromEditor : new Editor(canvas)
    editor.theme = ThemeUtils.getDocumentTheme(documentThemeName)
    pane.editor = editor
    pane.editorWorkWidth = editor.width
    pane.editorWorkHeight = editor.height
    editor.key = pane.key
    editor.title = pane.title
    // @ts-ignore
    editor.start()
    if (afterEditor) {
      if (!exists) {
        for (let i = 0; i < panes.length; i++) {
          const childPane = panes[i]
          if (childPane.editor === afterEditor) {
            newPanes.splice(i + 1, 0, pane)
            break
          }
        }
      }
    } else if (beforeEditor) {
      if (!exists) {
        for (let i = 0; i < panes.length; i++) {
          const childPane = panes[i]
          if (childPane.editor === beforeEditor) {
            newPanes.splice(i, 0, pane)
            break
          }
        }
      }
    } else {
      newPanes.push(pane)
    }
    setPanes(newPanes)
    panesRef.current = newPanes
    setActiveKey(newActiveKey)
    setActivePane(pane)
    //(pane.title)
    const container = document.getElementById('editor-container')
    while (container?.hasChildNodes()) {
      container?.removeChild(container.lastChild!)
    }
    container?.append(canvas!)

    let oldEditor = Utils.currentEditor
    Utils.currentEditor = editor!
    setCurrentEditor(editor!)
    onEditorChange(oldEditor, Utils.currentEditor)
    updateEditors(newPanes)
    oldEditor?.removeSelectionChange(handleSelectionChange)
    Utils.currentEditor.onSelectionChange(handleSelectionChange)
    oldEditor?.removeTextEditStart(handleTextEditStart)
    Utils.currentEditor.onTextEditStart(handleTextEditStart)
    oldEditor?.removeTextEditEnd(handleTextEditEnd)
    Utils.currentEditor.onTextEditEnd(handleTextEditEnd)
    oldEditor?.removeTableTextEditStart(handleTableTextEditStart)
    Utils.currentEditor.onTableTextEditStart(handleTableTextEditStart)
    oldEditor?.removeTableTextEditEnd(handleTableTextEditEnd)
    Utils.currentEditor.onTableTextEditEnd(handleTableTextEditEnd)
    oldEditor?.removeSelectionResized(handleSelectionResized)
    Utils.currentEditor.onSelectionResized(handleSelectionResized)
    oldEditor?.removeSelectionResizing(handleSelectionResizing)
    Utils.currentEditor.onSelectionResizing(handleSelectionResizing)
    oldEditor?.removeEditorModeChange(handleEditorModeChange)
    Utils.currentEditor.onEditorModeChange(handleEditorModeChange)
    oldEditor?.removeEditorOperationEvent(handleEditorOperationEvent)
    Utils.currentEditor.onEditorOperationEvent(handleEditorOperationEvent)
    oldEditor?.removeSizeChange(handleEditorSizeChange)
    Utils.currentEditor.onSizeChange(handleEditorSizeChange)
    if (requireOperation) {
      let operation = new Operation(Utils.currentEditor, OperationType.ADD_EDITOR, [])
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
  }

  //TODO: FIXME, currently panes is old value if this is triggerred from menu, e.g. undo add new editor. And so we use useRef for panes
  const removeEditor = (targetKey: string | null, requireOperation: boolean, editor: Editor | null) => {
    let theTargetKey = targetKey
    let afterTargetKey: string | null = null
    let afterEditor: Editor | null = null
    let beforeTargetKey: string | null = null
    let beforeEditor: Editor | null = null
    let oldEditor = Utils.currentEditor
    const panes = panesRef.current
    if (!targetKey) {
      // for undo addEditorr, only happen on last tab because addEditor is for last tab
      for (let i = 0; i < panes.length; i++) {
        const pane = panes[i]
        if (pane.editor === editor) {
          theTargetKey = pane.key
          oldEditor = pane.editor!
        }
      }
    } else {
      for (let i = 0; i < panes.length; i++) {
        const pane = panes[i]
        if (pane.key === theTargetKey) {
          oldEditor = pane.editor!
          if (i > 0) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            afterTargetKey = panes[i - 1].key
            afterEditor = panes[i - 1].editor
          } else {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            beforeTargetKey = panes[1].key
            beforeEditor = panes[1].editor
          }
        }
      }
    }
    let newActiveKey = activeKey
    let lastIndex = -1
    let newActivePane: Pane | null = null
    let newPanes = panes.filter((pane) => pane.key !== theTargetKey)
    newPanes = [...newPanes]
    newActivePane = newPanes[0]
    if (!targetKey) {
      lastIndex = panes.length - 2
      newActiveKey = panes[lastIndex].key
      newActivePane = panes[lastIndex]
    } else {
      //Try to keep current page , and if current page will be delete then choose previouse page
      if (activeKey !== targetKey) {
        newPanes.forEach((pane, i) => {
          if (pane.key === activeKey) {
            lastIndex = i
          }
        })
      } else {
        panes.forEach((pane, i) => {
          if (pane.key === theTargetKey && i > 0) {
            lastIndex = i - 1
          } else {
            lastIndex = 0
          }
        })
        newActiveKey = panes[lastIndex].key
        newPanes.forEach((pane, i) => {
          if (pane.key === newActiveKey) {
            lastIndex = i
          }
        })
      }
    }
    if (newPanes.length > 0 && targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key
        newActivePane = newPanes[lastIndex]
      } else {
        newActiveKey = newPanes[0].key
        newActivePane = newPanes[0]
      }
    }
    setPanes(newPanes)
    panesRef.current = newPanes
    setActiveKey(newActiveKey)
    setActivePane(newActivePane)
    //setPaneTitle(newActivePane.title)

    Utils.currentEditor = newActivePane.editor!
    setCurrentEditor(newActivePane.editor!!)
    onEditorChange(oldEditor, Utils.currentEditor)
    updateEditors(newPanes)
    oldEditor?.removeSelectionChange(handleSelectionChange)
    Utils.currentEditor.onSelectionChange(handleSelectionChange)
    oldEditor?.removeTextEditStart(handleTextEditStart)
    Utils.currentEditor.onTextEditStart(handleTextEditStart)
    oldEditor?.removeTextEditEnd(handleTextEditEnd)
    Utils.currentEditor.onTextEditEnd(handleTextEditEnd)
    oldEditor?.removeTableTextEditStart(handleTableTextEditStart)
    Utils.currentEditor.onTableTextEditStart(handleTableTextEditStart)
    oldEditor?.removeTableTextEditEnd(handleTableTextEditEnd)
    Utils.currentEditor.onTableTextEditEnd(handleTableTextEditEnd)
    oldEditor?.removeSelectionResized(handleSelectionResized)
    Utils.currentEditor.onSelectionResized(handleSelectionResized)
    oldEditor?.removeSelectionResizing(handleSelectionResizing)
    Utils.currentEditor.onSelectionResizing(handleSelectionResizing)
    oldEditor?.removeEditorModeChange(handleEditorModeChange)
    Utils.currentEditor.onEditorModeChange(handleEditorModeChange)
    oldEditor?.removeEditorOperationEvent(handleEditorOperationEvent)
    Utils.currentEditor.onEditorOperationEvent(handleEditorOperationEvent)
    oldEditor?.removeSizeChange(handleEditorSizeChange)
    Utils.currentEditor.onSizeChange(handleEditorSizeChange)

    if (Utils.currentEditor) {
      if (requireOperation) {
        let operation = new Operation(oldEditor!, OperationType.REMOVE_EDITOR, [], false, [], undefined, afterEditor, null, beforeEditor, null)
        Utils.currentEditor.operationService.addOperation(operation)
        Utils.currentEditor.triggerOperationChange()
      }
    }

    //Canvas didn't update, here to update
    handleTabChange(newPanes, newActiveKey, requireOperation)
  }

  const renameSheet = (editor: Editor, fromName: string, toName: string) => {
    //const newPanes = panes
    const newPanes = clonePanes()
    let activatePane = newPanes[0]
    newPanes.forEach((pane) => {
      if (pane.key === editor.key) {
        pane.title = toName
        editor.title = toName
        activatePane = pane
      }
    })
    // const element = document.getElementById('pane-title-input-' + editor.key)
    // if(element) {
    //   const input = element as HTMLInputElement
    //   input.value = toName
    //   input.defaultValue = toName
    // }
    panesRef.current = newPanes
    setPanes(newPanes)
    setDocumentModified(true)
    setActivePane(activatePane)
    //setPaneTitle(activatePane.title)
    setForceUpdate(!forceUpdate)
    editor.triggerOperationChange()
  }

  const onEdit = (targetKey: string, action: 'add' | 'remove') => {
    checkIfDocumentModified(true)
    if (action === 'add') {
      addEditor(true, null, null, null)
    } else {
      if (panes.length > 1) {
        removeEditor(targetKey, true, null)
      }
    }
  }

  const checkIfDocumentModified = (ifModified: boolean) => {
    if (ifModified) {
      setDocumentModified(true)
      Utils.isModified = true
    } else {
      let modified = false
      if (Utils.editors.length > 0) {
        Utils.editors.forEach((editor) => {
          if (editor.isModified()) {
            modified = true
          }
        })
      }
      setDocumentModified(modified)
      Utils.isModified = modified
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleEditorSizeChange = (event: EditorEvent) => {
    updateEditorSize(panes, true)
  }

  const handleEditorOperationEvent = (event: EditorOperationEvent) => {
    checkIfDocumentModified(true)
    switch (event.operation.type) {
      case OperationType.SELECT_EDITOR:
        if (event.isUndo) {
          handleUndoSelectEditor(event.operation)
        } else {
          handleRedoSelectEditor(event.operation)
        }
        break
      case OperationType.ADD_EDITOR:
        if (event.isUndo) {
          handleUndoAddEditor(event.operation)
        } else {
          checkIfDocumentModified(true)
        }
        break
      case OperationType.REMOVE_EDITOR:
        if (event.isUndo) {
          handleUndoRemoveEditor(event.operation)
        } else {
          handleRedoRemoveEditor(event.operation)
        }
        break
      case OperationType.RENAME_EDITOR:
        if (event.isUndo) {
          handleUndoRenameEditor(event.operation)
        } else {
          handleRedoRenameEditor(event.operation)
        }
        break
      case OperationType.MOVE_EDITOR:
        if (event.isUndo) {
          handleUndoMoveEditor(event.operation)
        } else {
          handleRedoMoveEditor(event.operation)
        }
        break
      case OperationType.UPDATE_DOCUMENT_THEME:
        if (event.isUndo) {
          onDocumentThemeChanged(event.operation.origDocumentThemeName)
        } else {
          onDocumentThemeChanged(event.operation.documentThemeName)
        }
        break
      default:
        break
    }
  }

  const handleFontSizeChange = (value: any) => {
    console.log('font size changed')
    setFontSize(value)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach((editorItem: EditorItem) => {
        if (editorItem instanceof TableEntity) {
          if (Utils.currentEditor?.targetItem) {
            Utils.currentEditor.targetItem.fontSize = value
          }
        } else {
          editorItem.fontSize = value
        }
      })
      Utils.currentEditor.focus()
      Utils.currentEditor.triggerTextEditStyleChange()
      const afterSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      const operation: Operation = new Operation(
        Utils.currentEditor,
        OperationType.UPDATE_ITEMS,
        afterSelections,
        true,
        beforeSelections,
        '',
        null,
        null,
        null,
        null,
      )
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
    if (fontSizeNode) {
      console.log('font size blue trigger on size change')
      fontSizeNode.blur()
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleFontSizeStepChange = (value: number, info: any) => {
    console.log('font size step changed')
    if (Utils.currentEditor) {
      Utils.currentEditor.focus()
    }
    if (fontSizeNode) {
      console.log('font size blue trigger on size step change')
      fontSizeNode.blur()
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleFontSizeBlur = () => {
    console.log('font size is blured')
    if (Utils.currentEditor) {
      Utils.currentEditor.focus()
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleFontSizePressEnter = (e: KeyboardEvent) => {
    console.log('font size is pressed Enter Key')
    if (fontSizeNode) {
      console.log('font size blue trigger on size step change')
      //fontSizeNode.blur()
    }
    //e.stopPropagation()
  }

  const handleFontColorChange = (value: any) => {
    setFontColor(value)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach((editorItem: EditorItem) => {
        let color = CommonUtils.parseColorString(value.toHexString())
        if (color) {
          if (editorItem instanceof TableEntity) {
            if (Utils.currentEditor?.targetItem) {
              Utils.currentEditor.targetItem.fontColor = color
            }
          } else {
            editorItem.fontColor = color
          }
          editorItem.useTheme = false
        }
      })
      Utils.currentEditor.focus()
      Utils.currentEditor.triggerTextEditStyleChange()
      const afterSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      const operation: Operation = new Operation(
        Utils.currentEditor,
        OperationType.UPDATE_ITEMS,
        afterSelections,
        true,
        beforeSelections,
        '',
        null,
        null,
        null,
        null,
      )
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleFontColorChangeComplete = (value: any) => {
    if (Utils.currentEditor) {
      Utils.currentEditor.focus()
      Utils.currentEditor.triggerTextEditStyleChange()
    }
  }

  const handleBoldChanged = () => {
    setFontBold(!fontBold)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach((editorItem: EditorItem) => {
        if (editorItem instanceof TableEntity) {
          if (Utils.currentEditor?.targetItem) {
            Utils.currentEditor.targetItem.fontWeight = fontBold ? FontWeight.NORMAL : FontWeight.BOLD
          }
        } else {
          editorItem.fontWeight = fontBold ? FontWeight.NORMAL : FontWeight.BOLD
        }
      })
      Utils.currentEditor.focus()
      Utils.currentEditor.triggerTextEditStyleChange()
      const afterSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      const operation: Operation = new Operation(
        Utils.currentEditor,
        OperationType.UPDATE_ITEMS,
        afterSelections,
        true,
        beforeSelections,
        '',
        null,
        null,
        null,
        null,
      )
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
  }

  const handleItalicChanged = () => {
    setFontItalic(!fontItalic)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach((editorItem: EditorItem) => {
        if (editorItem instanceof TableEntity) {
          if (Utils.currentEditor?.targetItem) {
            Utils.currentEditor.targetItem.fontSlant = fontItalic ? FontSlant.UP_RIGHT : FontSlant.ITALIC
          }
        } else {
          editorItem.fontSlant = fontItalic ? FontSlant.UP_RIGHT : FontSlant.ITALIC
        }
      })
      Utils.currentEditor.focus()
      Utils.currentEditor.triggerTextEditStyleChange()
      const afterSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      const operation: Operation = new Operation(
        Utils.currentEditor,
        OperationType.UPDATE_ITEMS,
        afterSelections,
        true,
        beforeSelections,
        '',
        null,
        null,
        null,
        null,
      )
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
  }

  const handleUnderlineChanged = () => {
    setFontUnderline(!fontUnderline)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach((editorItem: EditorItem) => {
        if (editorItem instanceof TableEntity) {
          if (Utils.currentEditor?.targetItem) {
            Utils.currentEditor.targetItem.textDecoration = fontUnderline ? TextDecoration.NONE : TextDecoration.UNDERLINE
          }
        } else {
          editorItem.textDecoration = fontUnderline ? TextDecoration.NONE : TextDecoration.UNDERLINE
        }
      })
      Utils.currentEditor.focus()
      Utils.currentEditor.triggerTextEditStyleChange()
      const afterSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      const operation: Operation = new Operation(
        Utils.currentEditor,
        OperationType.UPDATE_ITEMS,
        afterSelections,
        true,
        beforeSelections,
        '',
        null,
        null,
        null,
        null,
      )
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
  }

  const handleTextAlignmentChanged = (textAlignment: string) => {
    setTextAlignment(textAlignment)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach((editorItem: EditorItem) => {
        if (editorItem instanceof TableEntity) {
          if (Utils.currentEditor?.targetItem) {
            Utils.currentEditor.targetItem.textAlignment = CommonUtils.parseTextAlignment(textAlignment)
          }
        } else {
          editorItem.textAlignment = CommonUtils.parseTextAlignment(textAlignment)
        }
      })
      Utils.currentEditor.focus()
      Utils.currentEditor.triggerTextEditStyleChange()
      Utils.currentEditor.focus()
      Utils.currentEditor.triggerTextEditStyleChange()
      const afterSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      const operation: Operation = new Operation(
        Utils.currentEditor,
        OperationType.UPDATE_ITEMS,
        afterSelections,
        true,
        beforeSelections,
        '',
        null,
        null,
        null,
        null,
      )
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
  }

  const handleTextVerticalAlignmentChanged = (textVerticalAlignment: string) => {
    setTextVerticalAlignment(textVerticalAlignment)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach((editorItem: EditorItem) => {
        if (editorItem instanceof TableEntity) {
          if (Utils.currentEditor?.targetItem) {
            Utils.currentEditor.targetItem.textVerticalAlignment = CommonUtils.parseTextVerticalAligment(textVerticalAlignment)
          }
        } else {
          editorItem.textVerticalAlignment = CommonUtils.parseTextVerticalAligment(textVerticalAlignment)
        }
      })
      Utils.currentEditor.focus()
      Utils.currentEditor.triggerTextEditStyleChange()
      const afterSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      const operation: Operation = new Operation(
        Utils.currentEditor,
        OperationType.UPDATE_ITEMS,
        afterSelections,
        true,
        beforeSelections,
        '',
        null,
        null,
        null,
        null,
      )
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
  }

  const handleKeyDownEvent = (event: KeyboardEvent) => {
    if (event.key === 'Delete') {
      event.preventDefault()
      handleDelete()
    }
    if (event.metaKey || event.ctrlKey) {
      switch (event.key) {
        case 'a':
          event.preventDefault()
          handleSelectAll()
          break
        case 'z':
          event.preventDefault()
          handleUndo()
          break
        case 'y':
          event.preventDefault()
          handleRedo()
          break
      }
    }
  }

  const handleCopyLocation = () => {
    if (Utils.currentEditor && Utils.currentEditor.selectionLayer.getEditorItemCount() > 0) {
      const firstSelection = Utils.currentEditor.selectionLayer.getEditorItem(0)
      const copyPoint = firstSelection.worldTransform.makePoint(new Point2(0, 0))
      const copyLocation = new Point2(copyPoint.x - firstSelection.left, copyPoint.y - firstSelection.top)
      setCopyLocation(copyLocation)
    }
  }

  /**
   * Handle copy command from system or application.
   * @param e
   */
  const handleCopyDetail = (e: ClipboardEvent) => {
    if (e.clipboardData && Utils.currentEditor) {
      if (textToolbarVisible) {
        let item = Utils.currentEditor.selectionLayer.getEditorItem(0) as Item
        let data = item.shape.richSelection
        if (item instanceof TableEntity && Utils.currentEditor.targetItem) {
          data = Utils.currentEditor.targetItem.shape.richSelection
        }
        if (data.length > 0) {
          e.clipboardData.clearData()
          e.clipboardData.setData('text/plain', data)
        }
      } else {
        let data = EditorHelper.exportEditorSelections(Utils.currentEditor)
        handleCopyLocation()
        //data = `a${data}a`
        e.clipboardData.clearData()
        e.clipboardData.setData('text/plain', data)
        //e.clipboardData.setData('text/retel', data)
        console.log(`copy data = ${data}`)
      }
      e.preventDefault()
    }
  }

  // Handle copy command only for application by menu
  const handleCopy = async () => {
    if (Utils.currentEditor) {
      console.log(`copy is triggered`)
      const data = EditorHelper.exportEditorSelections(Utils.currentEditor)
      handleCopyLocation()
      //let dataTransfer = new DataTransfer()
      //dataTransfer.dropEffect = 'none'
      //dataTransfer.effectAllowed = "uninitialized"
      //data = `a${data}a`
      //dataTransfer.setData('text/plain', data)
      //dataTransfer.setData('text/retel', data)
      //window.dispatchEvent(new ClipboardEvent('copy', {
      //    bubbles: true,
      //    cancelable: true,
      //    composed: true,
      //    clipboardData: dataTransfer
      //  }))

      //  document.dispatchEvent(new KeyboardEvent('keydown', {
      //    key: 'c',
      //    which: 67,
      //    ctrlKey: true,
      //    metaKey: true,
      //    bubbles:true,
      //  }))

      //  let sandbox = document.getElementById('sandbox')
      //  if(sandbox) {
      //    sandbox.focus()
      //    let result = document.execCommand('copy', false, 'a')
      //    console.log(`Copy execution result is ${result}`)
      //  }

      //document.execCommand('copy')

      let clipboard = navigator.clipboard
      if (!clipboard) {
        SystemUtils.handleInternalError(intl.formatMessage({ id: 'workspace.content.message-clipboard-not-supported' }))
        return
      }
      await clipboard.writeText(data)
      //clipboard.writeText('dummy')
      //let clipboardItems: ClipboardItem[] = []
      //let blob1 = new Blob([data], {type: 'text/plain'})
      //let blob2 = new Blob([data], {type: 'application/json'})
      //let clipboardItem1: ClipboardItem = new ClipboardItem({['text/plain']: blob1}) //, 'application/json': blob2})
      //let clipboardItem2: ClipboardItem = new ClipboardItem({'text/retel': data})
      //clipboard.
      //clipboardItems.push(clipboardItem1)
      //clipboardItems.push(clipboardItem2)
      //console.log(`begin write ${clipboardItems.length}`)
      //await clipboard.write(clipboardItems).then((value)=> {
      //  console.log(`finish good write ${clipboardItems.length}`)
      //}, (reason) => {
      //  console.log(`finish failed write ${reason}`)
      //})
      //console.log(`finish write ${clipboardItems.length}`)
      //let text = await clipboard.readText()
      //console.log(`read written text: ${text}`)
      //document.execCommand('copy')
    }
  }

  const handleCutDetail = (e: ClipboardEvent) => {
    if (e.clipboardData && Utils.currentEditor) {
      if (textToolbarVisible) {
        let item = Utils.currentEditor.selectionLayer.getEditorItem(0) as Item
        let data = item.shape.richSelection
        if (item instanceof TableEntity && Utils.currentEditor.targetItem) {
          data = Utils.currentEditor.targetItem.shape.richSelection
        }
        if (data.length > 0) {
          e.clipboardData.clearData()
          e.clipboardData.setData('text/plain', data)
          if (item instanceof TableEntity && Utils.currentEditor.targetItem) {
            Utils.currentEditor.targetItem.shape.deleteSelection()
          } else {
            item.shape.deleteSelection()
          }
        }
      } else {
        let data = EditorHelper.exportEditorSelections(Utils.currentEditor)
        handleCopyLocation()
        //data = `a${data}a`
        e.clipboardData.clearData()
        e.clipboardData.setData('text/plain', data)
        //e.clipboardData.setData('text/retel', data)
        EditorHelper.deleteSelections(Utils.currentEditor)
        console.log(`cube data = ${data}`)
        //deleteCurrentDocumentSelection()
      }
      e.preventDefault()
    }
  }

  const handleCut = async () => {
    if (Utils.currentEditor) {
      console.log(`cut is triggered`)
      let clipboard = navigator.clipboard
      if (!clipboard) {
        SystemUtils.handleInternalError(intl.formatMessage({ id: 'workspace.content.message-clipboard-not-supported' }))
        return
      }
      const data = EditorHelper.exportEditorSelections(Utils.currentEditor)
      handleCopyLocation()
      EditorHelper.deleteSelections(Utils.currentEditor)
      await clipboard.writeText(data)
    }
  }

  /**
   * Handle paste for system & application. It can be triggered by system paste or by application:HandlePaste
   * @param e
   */
  const handlePasteDetail = (e: ClipboardEvent) => {
    if (Utils.currentEditor && e.clipboardData && e.clipboardData.types.indexOf('text/plain') > -1) {
      let data = e.clipboardData.getData('text/plain')
      console.log(`oldData = ${data}`)
      if (textToolbarVisible) {
        let item = Utils.currentEditor.selectionLayer.getEditorItem(0) as Item
        if (item instanceof TableEntity && Utils.currentEditor.targetItem) {
          Utils.currentEditor.targetItem.shape.insertRichText(data)
        } else if (item instanceof ShapeEntity) {
          item.shape.insertRichText(data)
        }
      } else {
        let selections = EditorHelper.readSelections(data)
        console.log(`paste selections = ${selections}`)
        EditorHelper.pasteSelections(selections, Utils.currentEditor, pasteFromSystem, pasteLocation, copyLocation)
      }
      e.preventDefault()
    }
    setPasteFromSystem(true)
  }

  /**
   * Handle paste for application internally, it will trigger handlePasteDetail
   * @param e
   */
  const handlePaste = async () => {
    console.log(`paste is triggered`)
    setPasteFromSystem(false)
    const clipboard = navigator.clipboard
    if (!clipboard) {
      SystemUtils.handleInternalError(intl.formatMessage({ id: 'workspace.content.message-clipboard-not-supported' }))
      return
    }
    const text = await clipboard.readText()
    // const clipboardItems = await clipboard.read()
    // let textBlob: Blob
    // let text = ''
    // for(const clipboardItem of clipboardItems) {
    //   for(const type of clipboardItem.types) {
    //     if(type === 'text/html') {
    //       textBlob = await clipboardItem.getType(type)
    //       text = await textBlob.text()
    //       console.log(`html: ${text}`)
    //     }
    //     if(type === 'text/plain') {
    //       textBlob = await clipboardItem.getType(type)
    //       text = await textBlob.text()
    //       console.log(`text: ${text}`)
    //     }
    //     if(type === 'text/retel') {
    //       textBlob = await clipboardItem.getType(type)
    //       text = await textBlob.text()
    //       console.log(`retel: ${text}`)
    //     }
    //   }
    // }

    let dataTransfer = new DataTransfer()
    dataTransfer.dropEffect = 'none'
    dataTransfer.effectAllowed = 'uninitialized'
    //let data = EditorHelper.exportEditorSelections(Utils.currentEditor!)
    dataTransfer.setData('text/plain', text)
    dataTransfer.setData('text/retel', text)
    window.dispatchEvent(
      new ClipboardEvent('paste', {
        bubbles: true,
        cancelable: true,
        composed: true,
        clipboardData: dataTransfer,
      }),
    )
    //let sandbox = document.getElementById('sandbox')
    //if(sandbox) {
    //  sandbox.focus()
    //  let result = document.execCommand('paste', false, 'a')
    //  console.log(`Paste execution result is ${result}`)
    //}
  }

  // Handle copy command only for application by menu
  const handleTextCopy = async () => {
    if (Utils.currentEditor && Utils.currentEditor.selectionLayer.getEditorItemCount() === 1) {
      console.log(`text copy is triggered`)
      let item = Utils.currentEditor.selectionLayer.getEditorItem(0) as Item
      let data = item.shape.richSelection
      if (data.length <= 0) {
        return
      }
      let clipboard = navigator.clipboard
      if (!clipboard) {
        SystemUtils.handleInternalError(intl.formatMessage({ id: 'workspace.content.message-clipboard-not-supported' }))
        return
      }
      await clipboard.writeText(data)
    }
  }

  const handleTextCut = async () => {
    if (Utils.currentEditor && Utils.currentEditor.selectionLayer.getEditorItemCount() === 1) {
      console.log(`text cute is triggered`)
      let item = Utils.currentEditor.selectionLayer.getEditorItem(0) as Item
      let data = item.shape.selection
      if (data.length <= 0) {
        return
      }
      let clipboard = navigator.clipboard
      if (!clipboard) {
        SystemUtils.handleInternalError(intl.formatMessage({ id: 'workspace.content.message-clipboard-not-supported' }))
        return
      }
      await clipboard.writeText(data)
    }
  }

  /**
   * Handle paste for application internally, it will trigger handlePasteDetail
   * @param e
   */
  const handleTextPaste = async () => {
    console.log(`text paste is triggered`)
    setPasteFromSystem(false)
    const clipboard = navigator.clipboard
    if (!clipboard) {
      SystemUtils.handleInternalError(intl.formatMessage({ id: 'workspace.content.message-clipboard-not-supported' }))
      return
    }
    const text = await clipboard.readText()
    let dataTransfer = new DataTransfer()
    dataTransfer.dropEffect = 'none'
    dataTransfer.effectAllowed = 'uninitialized'
    //let data = EditorHelper.exportEditorSelections(Utils.currentEditor!)
    dataTransfer.setData('text/plain', text)
    dataTransfer.setData('text/retel', text)
    window.dispatchEvent(
      new ClipboardEvent('paste', {
        bubbles: true,
        cancelable: true,
        composed: true,
        clipboardData: dataTransfer,
      }),
    )
  }

  const handleContextTrigger = (e: any) => {
    setPasteLocation(new Point2(e.nativeEvent.offsetX, e.nativeEvent.offsetY))
  }

  const handleSelectAll = () => {
    if (Utils.currentEditor) {
      Utils.currentEditor.selectAll()
    }
  }

  const handleDuplicate = () => {
    handleCopy()
    handlePaste()
  }

  const handleLock = () => {
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach((editorItem: EditorItem) => {
        editorItem.locked = !editorItem.locked
      })
      Utils.currentEditor.invalidateHolder()
      const afterSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      const operation: Operation = new Operation(
        Utils.currentEditor,
        OperationType.UPDATE_ITEMS,
        afterSelections,
        true,
        beforeSelections,
        '',
        null,
        null,
        null,
        null,
      )
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
  }

  const handleToFront = () => {
    if (Utils.currentEditor) {
      const selections = Utils.currentEditor.selectionLayer.getAllEditorItems()
      Utils.currentEditor.toFront(selections)
    }
  }

  const handleToBack = () => {
    if (Utils.currentEditor) {
      const selections = Utils.currentEditor.selectionLayer.getAllEditorItems()
      Utils.currentEditor.toBack(selections)
    }
  }

  const handleBringForeward = () => {
    if (Utils.currentEditor) {
      const selections = Utils.currentEditor.selectionLayer.getAllEditorItems()
      if (selections.length === 1) {
        Utils.currentEditor.bringForward(selections[0])
      }
    }
  }

  const handleSendBackward = () => {
    if (Utils.currentEditor) {
      const selections = Utils.currentEditor.selectionLayer.getAllEditorItems()
      if (selections.length === 1) {
        Utils.currentEditor.sendBackward(selections[0])
      }
    }
  }

  const handleUndo = () => {
    if (currentEditor) {
      currentEditor.undo()
    }
  }

  const handleRedo = () => {
    if (currentEditor) {
      currentEditor.redo()
    }
  }

  const handleUndoSelectEditor = (operation: Operation) => {
    const panes = panesRef.current
    for (let i = 0; i < panes.length; i++) {
      const pane = panes[i]
      if (pane.editor === operation.afterEditor) {
        handleTabChange(panes, pane.key, false)
      }
    }
  }

  const handleRedoSelectEditor = (operation: Operation) => {
    const panes = panesRef.current
    for (let i = 0; i < panes.length; i++) {
      const pane = panes[i]
      if (pane.editor === operation.editor) {
        handleTabChange(panes, pane.key, false)
      }
    }
  }

  const handleUndoAddEditor = (operation: Operation) => {
    removeEditor(null, false, operation.editor)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleRedoAddEditor = (operation: Operation) => {
    addEditor(false, operation.editor, operation.afterEditor, operation.beforeEditor)
  }

  const handleUndoRemoveEditor = (operation: Operation) => {
    addEditor(false, operation.editor, operation.afterEditor, operation.beforeEditor)
  }

  const handleRedoRemoveEditor = (operation: Operation) => {
    removeEditor(null, false, operation.editor)
  }

  const handleUndoRenameEditor = (operation: Operation) => {
    renameSheet(operation.editor, operation.editorTitle, operation.origEditorTitle)
  }

  const handleRedoRenameEditor = (operation: Operation) => {
    renameSheet(operation.editor, operation.origEditorTitle, operation.editorTitle)
  }

  const handleUndoMoveEditor = (operation: Operation) => {
    if (operation.origEditor) {
      handleMoveEditor(operation.origEditor.key, operation.editor.key, false)
    }
  }

  const handleRedoMoveEditor = (operation: Operation) => {
    if (operation.origEditor) {
      handleMoveEditor(operation.editor.key, operation.origEditor.key, false)
    }
  }

  const handleDelete = () => {
    if (currentEditor) {
      if (currentEditor.isTextEditting) {
        // Editor already handle this
        // if(currentEditor.targetItem) {
        //  currentEditor.targetItem.shape.handleDelete()
        // } else if(currentEditor.target) {
        //   currentEditor.target.shape.handleDelete()
        // }
      } else {
        EditorHelper.deleteSelections(currentEditor)
      }
    }
  }

  const handleInsertRowBefore = () => {
    if (currentEditor && currentEditor.targetItem && currentEditor.selectionLayer.getEditorItemCount() === 1) {
      const tableEntity = currentEditor.selectionLayer.getEditorItem(0) as TableEntity
      const targetItemIndex = currentEditor.targetItemIndex
      const rowIndex = Math.floor(targetItemIndex / tableEntity.columnCount)
      tableEntity.insertRowBefore(rowIndex, true)
      currentEditor.invalidateHolder()
      currentEditor.triggerSelectionResized()
    }
  }

  const handleInsertRowAfter = () => {
    if (currentEditor && currentEditor.targetItem && currentEditor.selectionLayer.getEditorItemCount() === 1) {
      const tableEntity = currentEditor.selectionLayer.getEditorItem(0) as TableEntity
      const targetItemIndex = currentEditor.targetItemIndex
      const rowIndex = Math.floor(targetItemIndex / tableEntity.columnCount)
      tableEntity.insertRowAfter(rowIndex, true)
      currentEditor.invalidateHolder()
      currentEditor.triggerSelectionResized()
    }
  }

  const handleInsertColumnBefore = () => {
    if (currentEditor && currentEditor.targetItem && currentEditor.selectionLayer.getEditorItemCount() === 1) {
      const tableEntity = currentEditor.selectionLayer.getEditorItem(0) as TableEntity
      const targetItemIndex = currentEditor.targetItemIndex
      const columnIndex = targetItemIndex % tableEntity.columnCount
      tableEntity.insertColumnBefore(columnIndex, true)
      currentEditor.invalidateHolder()
      currentEditor.triggerSelectionResized()
    }
  }

  const handleInsertColumnAfter = () => {
    if (currentEditor && currentEditor.targetItem && currentEditor.selectionLayer.getEditorItemCount() === 1) {
      const tableEntity = currentEditor.selectionLayer.getEditorItem(0) as TableEntity
      const targetItemIndex = currentEditor.targetItemIndex
      const columnIndex = targetItemIndex % tableEntity.columnCount
      tableEntity.insertColumnAfter(columnIndex, true)
      currentEditor.invalidateHolder()
      currentEditor.triggerSelectionResized()
    }
  }

  const handleDeleteRow = () => {
    if (currentEditor && currentEditor.targetItem && currentEditor.selectionLayer.getEditorItemCount() === 1) {
      const tableEntity = currentEditor.selectionLayer.getEditorItem(0) as TableEntity
      const targetItemIndex = currentEditor.targetItemIndex
      const rowIndex = Math.floor(targetItemIndex / tableEntity.columnCount)
      tableEntity.deleteRow(rowIndex)
      currentEditor.invalidateHolder()
      currentEditor.triggerSelectionResized()
    }
  }

  const handleDeleteColumn = () => {
    if (currentEditor && currentEditor.targetItem && currentEditor.selectionLayer.getEditorItemCount() === 1) {
      const tableEntity = currentEditor.selectionLayer.getEditorItem(0) as TableEntity
      const targetItemIndex = currentEditor.targetItemIndex
      const columnIndex = targetItemIndex % tableEntity.columnCount
      tableEntity.deleteColumn(columnIndex)
      currentEditor.invalidateHolder()
      currentEditor.triggerSelectionResized()
    }
  }

  const handleAddPool = () => {
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach((editorItem: EditorItem) => {
        if (editorItem instanceof PoolCustomContainer) {
          editorItem.appendPool()
        }
      })
      const afterSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      const operation: Operation = new Operation(
        Utils.currentEditor,
        OperationType.UPDATE_ITEMS,
        afterSelections,
        true,
        beforeSelections,
        '',
        null,
        null,
        null,
        null,
      )
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
  }

  const handleRemovePool = () => {
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach((editorItem: EditorItem) => {
        if (editorItem instanceof PoolCustomContainer) {
          editorItem.removePool()
        }
      })
      const afterSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      const operation: Operation = new Operation(
        Utils.currentEditor,
        OperationType.UPDATE_ITEMS,
        afterSelections,
        true,
        beforeSelections,
        '',
        null,
        null,
        null,
        null,
      )
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
  }

  const handleAddStage = () => {
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach((editorItem: EditorItem) => {
        if (editorItem instanceof PoolCustomContainer) {
          editorItem.addStage()
        }
      })
      const afterSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      const operation: Operation = new Operation(
        Utils.currentEditor,
        OperationType.UPDATE_ITEMS,
        afterSelections,
        true,
        beforeSelections,
        '',
        null,
        null,
        null,
        null,
      )
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
  }

  const handleRemoveStage = () => {
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach((editorItem: EditorItem) => {
        if (editorItem instanceof PoolCustomContainer) {
          editorItem.removeStage()
        }
      })
      const afterSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      const operation: Operation = new Operation(
        Utils.currentEditor,
        OperationType.UPDATE_ITEMS,
        afterSelections,
        true,
        beforeSelections,
        '',
        null,
        null,
        null,
        null,
      )
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
  }

  const handlePoolDirectionChange = () => {
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach((editorItem: EditorItem) => {
        if (editorItem instanceof PoolCustomContainer) {
          editorItem.horizontal = !editorItem.horizontal
          setPoolHorizontal(editorItem.horizontal)
        }
      })
      const afterSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      const operation: Operation = new Operation(
        Utils.currentEditor,
        OperationType.UPDATE_ITEMS,
        afterSelections,
        true,
        beforeSelections,
        '',
        null,
        null,
        null,
        null,
      )
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
  }

  const handlePoolHeaderTextDirectionChange = () => {
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach((editorItem: EditorItem) => {
        if (editorItem instanceof PoolCustomContainer) {
          editorItem.poolTextHorizontal = !editorItem.poolTextHorizontal
          setPoolTextHorizontal(editorItem.poolTextHorizontal)
        }
      })
      const afterSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      const operation: Operation = new Operation(
        Utils.currentEditor,
        OperationType.UPDATE_ITEMS,
        afterSelections,
        true,
        beforeSelections,
        '',
        null,
        null,
        null,
        null,
      )
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
  }

  const handlePoolStageTextDirectionChange = () => {
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach((editorItem: EditorItem) => {
        if (editorItem instanceof PoolCustomContainer) {
          editorItem.stageTextHorizontal = !editorItem.stageTextHorizontal
          setPoolStageTextHorizontal(editorItem.stageTextHorizontal)
        }
      })
      const afterSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      const operation: Operation = new Operation(
        Utils.currentEditor,
        OperationType.UPDATE_ITEMS,
        afterSelections,
        true,
        beforeSelections,
        '',
        null,
        null,
        null,
        null,
      )
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
  }

  const handleScroll = (event: UIEvent) => {
    const scrollLeft = event.currentTarget.scrollLeft
    const scrollTop = event.currentTarget.scrollTop
    if (activePane) {
      activePane.scrollLeft = scrollLeft
      activePane.scrollTop = scrollTop
    }
    generateRulers()
  }

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (over) {
      // @ts-ignore
      handleMoveEditor(active.id, over.id, true)
    }
  }

  const handleMoveEditor = (fromKey: string, toKey: string, requireOperation: boolean) => {
    if (fromKey !== toKey) {
      let panes = clonePanes()
      const activeIndex = panes.findIndex((i) => i.key === fromKey)
      const activePane = panes[activeIndex]
      const overIndex = panes.findIndex((i) => i.key === toKey)
      const origPane = panes[overIndex]
      panes = arrayMove(panes, activeIndex, overIndex)
      panesRef.current = panes
      setPanes(panes)
      setForceUpdate(!forceUpdate)
      if (activePane.editor && requireOperation) {
        const operation = new Operation(
          activePane.editor,
          OperationType.MOVE_EDITOR,
          [],
          false,
          [],
          '',
          null,
          null,
          null,
          null,
          false,
          0,
          0,
          0,
          0,
          '',
          '',
          origPane.editor,
        )
        activePane.editor.operationService.addOperation(operation)
      }
      if (Utils.currentEditor) {
        Utils.currentEditor.triggerOperationChange()
      }
    }
  }

  const handleRenamePaneTitle = (key: string) => {
    const element = document.getElementById('pane-title-input-' + activeKey)
    if (element) {
      const input = element as HTMLInputElement
      //input.readOnly = false
      input.focus()
      setActiveKey(key)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDuplicatePane = (key: string) => {
    const oldEditor = Utils.currentEditor
    addEditor(true, null, null, null)
    if (oldEditor) {
      const editorItemInfos = EditorHelper.generateEditorItems(oldEditor)
      if (Utils.currentEditor) {
        editorItemInfos.forEach((editorItemInfo) => {
          const editorItem = OperationHelper.loadItem(editorItemInfo, Utils.currentEditor!)
          Utils.currentEditor!.contentLayer.addEditorItem(editorItem)
        })
      }
    }
  }

  const handleDeletePane = (key: string) => {
    removeEditor(key, true, null)
  }

  const handlePaneTitlePointerEnter = (event: SyntheticEvent<HTMLInputElement>) => {
    // @ts-ignore
    if (event.target && event.target.style) {
      // @ts-ignore
      event.target.style.cursor = 'move'
    }
  }

  const handlePaneTitleDoubleClick = (pane: Pane, event: SyntheticEvent<HTMLInputElement>) => {
    // @ts-ignore
    if (event.target && event.target.style) {
      // @ts-ignore
      event.target.style.cursor = 'text'
    }
    // @ts-ignore
    event.target.readOnly = false
    // @ts-ignore
    event.target.defaultValue = pane.title
    // @ts-ignore
    event.target.value = pane.title
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePaneTitleLabelDoubleClick = (pane: Pane, event: SyntheticEvent<HTMLInputElement>) => {
    // @ts-ignore
    event.target.style.display = 'none'
    const element = document.getElementById('pane-title-input-' + pane.key)
    if (element) {
      const input = element as HTMLInputElement
      input.defaultValue = pane.title
      input.value = pane.title
      input.defaultValue = pane.title
      input.style.display = 'inline'
      input.focus()
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePaneTitleClick = (key: string, event: SyntheticEvent<HTMLInputElement>) => {
    if (activePane?.key !== key) {
      onTabChange(key)
    }
  }

  const handlePaneTitleChangeBlur = (pane: Pane, event: SyntheticEvent<HTMLInputElement>) => {
    // @ts-ignore
    if (!event.target.readOnly) {
      handlePaneTitleChangeCompleted(pane, event)
    }
  }

  const handlePaneTitleChangeCompleted = (pane: Pane, event: SyntheticEvent<HTMLInputElement>) => {
    const newPanes = clonePanes()
    const newPane = findPane(pane.key, newPanes)
    // @ts-ignore
    newPane.title = event.target.value
    if (newPane.editor) {
      newPane.editor.title = newPane.title
    }
    panesRef.current = newPanes
    setPanes(newPanes)
    setActivePane(newPane)
    setActiveKey(newPane.key)
    // @ts-ignore
    event.target.style.width = event.target.value.length * 8
    // @ts-ignore
    event.target.readOnly = true
    // @ts-ignore
    event.target.value = newPane.title
    //event.target.blur()
    if (newPane.editor) {
      const operation = new Operation(
        newPane.editor,
        OperationType.RENAME_EDITOR,
        [],
        false,
        [],
        '',
        null,
        null,
        null,
        null,
        false,
        0,
        0,
        0,
        0,
        newPane.title,
        pane.title,
      )
      newPane.editor.operationService.addOperation(operation)
      setDocumentModified(true)
      newPane.editor.triggerOperationChange()
    }
    // const element = document.getElementById('pane-title-label-' + pane.key)
    // if(element) {
    //   const input = element as HTMLInputElement
    //   input.style.display = 'inline'
    // }
    //event.target.style.display = 'none'
  }

  const clonePanes = () => {
    const newPanes: Pane[] = []
    const panes = panesRef.current
    panes.forEach((pane) => {
      const newPane = {
        title: pane.title,
        content: pane.content,
        key: pane.key,
        editor: pane.editor,
        initialized: pane.initialized,
        scrollLeft: pane.scrollLeft,
        scrollTop: pane.scrollTop,
        viewWidth: pane.viewWidth,
        viewHeight: pane.viewHeight,
        contentWidth: pane.contentWidth,
        contentHeight: pane.contentHeight,
        editorWorkWidth: pane.editorWorkWidth,
        editorWorkHeight: pane.editorWorkHeight,
        editorHorizontalSpace: pane.editorHorizontalSpace,
        editorVerticalSpace: pane.editorVerticalSpace,
      }
      newPanes.push(newPane)
    })
    return newPanes
  }

  const findPane = (key: string, panes: Pane[]) => {
    let newPane = panes[0]
    panes.forEach((pane) => {
      if (key === pane.key) {
        newPane = pane
      }
    })
    return newPane
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePaneTitleChange = (pane: Pane, titleValue: string, e: any) => {
    console.log(`${pane.title}, ${titleValue}`)
    // const newPanes = clonePanes()
    // const newPane = findPane(pane.key, newPanes)
    // newPane.title = titleValue
    // newPane.editor!.title = newPane.title
    // panesRef.current = newPanes
    // setPanes(newPanes)
    // setActivePane(newPane)
    // setActiveKey(newPane.key)
  }

  const handleAddToMyShapes = async () => {
    if (Utils.currentEditor) {
      //const a = Utils.currentEditor.contentLayer.getEditorItem(0).shape.path.toSVGString()
      // const a = await Utils.currentEditor.exportToSVG()
      const a = await EditorHelper.exportSelectedToSVG(Utils.currentEditor)
      //const a = await EditorHelper.exportToSVG(Utils.currentEditor)
      console.log(`${a}`)
      if (RequestUtils.online) {
        await EditorUtils.addToMyShapes(Utils.currentEditor, onMyShapesUpdated)
      } else {
        SystemUtils.handleInternalError(intl.formatMessage({ id: 'workspace.content.message-login-is-required' }))
      }
    }
  }

  //Currently editor can't handle this event internally, and so we trigger it manually to complete creation of shape
  const handleEditorMouseUp = (e: SyntheticEvent<HTMLDivElement>) => {
    if (Utils.currentEditor?.action) {
      const pointerEvent = new PointerEvent(
        null as unknown as Node,
        // @ts-ignore
        e.nativeEvent.offsetX,
        // @ts-ignore
        e.nativeEvent.offsetY,
        MouseCode.LEFT_MOUSE_DOWN,
        false,
        false,
        false,
        0,
        false,
        0,
        '',
        0,
        0,
        0,
        0,
        0,
        0,
      )
      Utils.currentEditor.handlePointerDown(pointerEvent)
      Utils.currentEditor.handlePointerUp(pointerEvent)
    }
  }

  // const handleEditorDrop = (e: SyntheticEvent<HTMLDivElement>) => {
  //   e.preventDefault()
  //   if(Utils.currentEditor?.action) {
  //     const imageId = Utils.currentEditor.action.imageId
  //     const largeImae = document.getElementById(imageId)
  //     if(largeImae) {
  //       largeImae.style.display = ''
  //     }
  //   }
  //   if(Utils.currentEditor) {
  //     const pointerEvent = new PointerEvent(null as Node, e.nativeEvent.offsetX, e.nativeEvent.offsetY, MouseCode.LEFT_MOUSE_DOWN, false, false, false, 0, false, 0, '', 0, 0, 0, 0, 0, 0, 0)
  //     Utils.currentEditor.handlePointerDown(pointerEvent)
  //   }
  // }

  // const handleEditorDragOver = (e: SyntheticEvent) => {
  //   e.preventDefault()
  //   //console.log(`drag event: x = ${e.nativeEvent.offsetX} x = ${e.clientX}`)
  //   if(Utils.currentEditor) {
  //     const pointerEvent = new PointerEvent(null as Node, e.nativeEvent.offsetX, e.nativeEvent.offsetY, MouseCode.LEFT_MOUSE_UP, false, false, false, 0, false, 0, '', 0, 0, 0, 0, 0, 0, 0)
  //     Utils.currentEditor.handlePointerMove(pointerEvent)
  //     if(Utils.currentEditor.action) {
  //     }
  //   }
  // }

  // const handleEditorDragEnter = (e: SyntheticEvent) => {
  //   e.preventDefault()
  //   //console.log(`drag event: x = ${e.nativeEvent.offsetX} x = ${e.clientX}`)
  //   // if(e.dataTransfer) {
  //   //   const data = e.dataTransfer.getData('text/plain')
  //   //   const image = e.dataTransfer.getDataImage()
  //   //   console.log(`${data}`)
  //   // }
  //  if(Utils.currentEditor?.action) {
  //     const imageId = Utils.currentEditor.action.imageId
  //     const largeImage = document.getElementById(imageId)
  //     if(largeImage) {
  //       largeImage.style.display = 'none'
  //     }
  //     // if(e.dataTransfer) {
  //     //   e.dataTransfer.setDragImage(largeImage, 0, 0)
  //     //  }
  //   }
  // }

  // const handleEditorDragLeave = (e: SyntheticEvent) => {
  //   e.preventDefault()
  //   //console.log(`drag event: x = ${e.nativeEvent.offsetX} x = ${e.clientX}`)
  //   if(Utils.currentEditor?.action) {
  //     const imageId = Utils.currentEditor.action.imageId
  //     const largeImae = document.getElementById(imageId)
  //     if(largeImae) {
  //       largeImae.style.display = ''
  //     }
  //   }
  // }

  const generateRulers = () => {
    const horizontalRuler = SVG()
    const verticalRuler = SVG()
    const container = document.getElementById('content-container') as HTMLDivElement
    const width = container.clientWidth
    const height = container.clientHeight
    const scrollLeft = activePane ? activePane.scrollLeft : 0
    const scrollTop = activePane ? activePane.scrollTop : 0
    if (Utils.currentEditor && horizontalRulerRef.current) {
      const divContainer = horizontalRulerRef.current as HTMLDivElement
      while (divContainer.hasChildNodes()) {
        divContainer.removeChild(divContainer.children[0])
      }
      horizontalRuler.width(width)
      horizontalRuler.height(RULER_SIZE)
      const rulerLeft = Utils.currentEditor.horizontalSpace - scrollLeft
      const rulerWidth = Utils.currentEditor.origWidth * Utils.currentEditor.zoom
      const rulerOrigWidth = Utils.currentEditor.origWidth
      let rulerStep = 100
      if (Utils.currentEditor.zoom <= 0.25) {
        rulerStep = 200
      }
      if (Utils.currentEditor.zoom >= 2) {
        rulerStep = 50
      }
      if (Utils.currentEditor.zoom >= 4) {
        rulerStep = 25
      }

      let position = 0
      horizontalRuler.rect(rulerWidth, RULER_SIZE).attr('x', rulerLeft).attr('fill', workspaceBackground)
      while (position <= rulerOrigWidth) {
        for (let i = 0; i < 10; i++) {
          const x = rulerLeft + (position + rulerStep * i * 0.1) * Utils.currentEditor.zoom
          const pointerHeight = i === 0 || i === 5 || i === 10 ? RULER_SIZE * 0.5 : RULER_SIZE * 0.25
          const y = RULER_SIZE - pointerHeight
          if (x <= rulerOrigWidth * Utils.currentEditor.zoom + rulerLeft) {
            horizontalRuler.rect(1, 10).attr('x', x).attr('y', y).attr('fill', textColor).attr('opacity', 0.5)
          }
        }
        horizontalRuler
          .text('' + position)
          .attr('x', rulerLeft + position * Utils.currentEditor.zoom + 2)
          .attr('y', 11)
          .attr('fill', textColor)
          .attr('font-size', 9)
          .attr('opacity', 0.5)
        position += rulerStep
      }
      horizontalRuler.addTo(horizontalRulerRef.current)
    }
    if (Utils.currentEditor && verticalRulerRef.current) {
      const divContainer = verticalRulerRef.current as HTMLDivElement
      while (divContainer.hasChildNodes()) {
        divContainer.removeChild(divContainer.children[0])
      }
      verticalRuler.width(RULER_SIZE)
      verticalRuler.height(height)
      const rulerTop = Utils.currentEditor.verticalSpace - scrollTop
      const rulerHeight = Utils.currentEditor.origHeight * Utils.currentEditor.zoom
      const rulerOrigHeight = Utils.currentEditor.origHeight
      let rulerStep = 100
      if (Utils.currentEditor.zoom <= 0.25) {
        rulerStep = 200
      }
      if (Utils.currentEditor.zoom >= 2) {
        rulerStep = 50
      }
      if (Utils.currentEditor.zoom >= 4) {
        rulerStep = 25
      }

      let position = 0
      verticalRuler.rect(RULER_SIZE, rulerHeight).attr('y', rulerTop).attr('fill', workspaceBackground)
      while (position <= rulerOrigHeight) {
        for (let i = 0; i < 10; i++) {
          const y = rulerTop + (position + rulerStep * i * 0.1) * Utils.currentEditor.zoom
          const pointerWidth = i === 0 || i === 5 || i === 10 ? RULER_SIZE * 0.5 : RULER_SIZE * 0.25
          const x = RULER_SIZE - pointerWidth
          if (y <= rulerOrigHeight * Utils.currentEditor.zoom + rulerTop) {
            verticalRuler.rect(10, 1).attr('x', x).attr('y', y).attr('fill', textColor).attr('opacity', 0.5)
          }
        }
        const textSource = '' + position
        //TODO: FIXME. Following offset is expertimental and should have better solution.
        const yOffset = textSource.length === 1 ? 6 : textSource.length * 4
        const xOffset = textSource.length === 1 ? 5 : 0
        const text = verticalRuler.text(textSource)
        text
          .attr('y', rulerTop + position * Utils.currentEditor.zoom + 2)
          .attr('x', xOffset)
          .attr('fill', textColor)
          .attr('font-size', 9)
          .attr('opacity', 0.5)
        text.rotate(270).translate(0, yOffset) //, textHeight * 0.5, textHeight * 0.5) //.transform({rotate: 270})
        position += rulerStep
      }
      verticalRuler.addTo(verticalRulerRef.current)
    }
  }

  const handleCodeEditStart = (e: EditorEvent) => {
    if (Utils.currentEditor && e.source.selectionLayer.getEditorItemCount() === 1) {
      let item = e.source.selectionLayer.getEditorItem(0) as Item
      let container = document.getElementById('editor-container')
      let position = getElementAbsolutePosition(container)
      const [scrollLeft, scrollTop] = findEditorScrollPosition()
      // @ts-ignore
      let worldTransform = item.shape.worldTransform
      let point = worldTransform.makePoint(new Point2(0, 0))
      let left = point.x * Utils.currentEditor.zoom - scrollLeft
      let top = point.y * Utils.currentEditor.zoom - scrollTop
      if (item instanceof CodeContainer && Utils.currentEditor.inCodeEditing()) {
        setCodeContainerLeft(left + position.left)
        setCodeContainerTop(top + position.top)
        // setCodeContainerLeft(left)
        //setCodeContainerTop(top)
        setCodeContainerWidth(item.width)
        setCodeContainerHeight(item.height)
        setCodeContainerVisible(true)
        codeContainerTargetRef.current = item
        //setCodeContent(item.codeContent)
        if (codeContainerRef.current?.view?.state) {
          const text = codeContainerRef.current.view.state.doc
          const textLength = text.length
          codeContainerRef.current.view.dispatch({ changes: { from: 0, to: textLength, insert: item.codeContent } })
        }
      }
      refreshSelectionInfo(Utils.currentEditor)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCodeEditEnd = (e: EditorEvent) => {
    if (Utils.currentEditor && codeContainerTargetRef.current) {
      console.log(`code target = ${codeContainerTargetRef.current}`)
    }
    if (codeContainerRef.current && codeContainerRef.current.editor && codeContainerRef.current.state && codeContainerRef.current.view?.state) {
      //TODO: FIXME, doesn't work and so comment now. Move & reset selection to start,
      //codeContainerRef.current.view.dispatch({ selection: { anchor: 0, head: 0 } })
      //codeContainerRef.current.view.dispatch({ selection: EditorSelection.create([EditorSelection.cursor(0)], 0) })

      const codeContent = codeContainerRef.current.view.state.doc.toString()
      setCodeContent(codeContent ? codeContent : '')
      html2canvas(codeContainerRef.current.editor).then((canvas) => {
        const url = canvas.toDataURL()
        setCodeImage(url)
        //SystemUtils.generateDownloadFile(url, `test.txt`)
        if (Utils.currentEditor && codeContainerTargetRef.current) {
          const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
          codeContainerTargetRef.current.codeContent = codeContent
          codeContainerTargetRef.current.codeImage = url
          const afterSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
          const operation: Operation = new Operation(
            Utils.currentEditor,
            OperationType.UPDATE_ITEMS,
            afterSelections,
            true,
            beforeSelections,
            '',
            null,
            null,
            null,
            null,
          )
          Utils.currentEditor.operationService.addOperation(operation)
          Utils.currentEditor.triggerOperationChange()
          codeContainerTargetRef.current = undefined
        }
      })
    }
    setCodeContainerVisible(false)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCodeChange = (value: string, viewUpdate: ViewUpdate) => {
    //setCodeContent(value)
  }

  const handleCodeFocus = () => {
    if (codeContainerRef.current && Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      editorItems.forEach((editorItem: EditorItem) => {
        if (editorItem instanceof CodeContainer) {
          codeContainerTargetRef.current = editorItem
        }
      })
    }
  }

  const handleCodeBlur = () => {
    if (Utils.currentEditor) {
      Utils.currentEditor.finishCodeEdit()
    }
  }

  const codeLanguages = [
    { value: Languages.PlainText, label: Languages.PlainText },
    { value: Languages.C, label: Languages.C },
    { value: Languages.CPP, label: Languages.CPP },
    { value: Languages.CSharp, label: Languages.CSharp },
    { value: Languages.CSS, label: Languages.CSS },
    { value: Languages.D, label: Languages.D },
    { value: Languages.DART, label: Languages.DART },
    { value: Languages.GO, label: Languages.GO },
    { value: Languages.HTML, label: Languages.HTML },
    { value: Languages.KOTLIN, label: Languages.KOTLIN },
    { value: Languages.Java, label: Languages.Java },
    { value: Languages.Javascript, label: Languages.Javascript },
    { value: Languages.JSON, label: Languages.JSON },
    { value: Languages.PHP, label: Languages.PHP },
    { value: Languages.PYTHON, label: Languages.PYTHON },
    { value: Languages.RUBY, label: Languages.RUBY },
    { value: Languages.RUST, label: Languages.RUST },
    { value: Languages.SQL, label: Languages.SQL },
    { value: Languages.SWIFT, label: Languages.SWIFT },
    { value: Languages.TYPESCRIPT, label: Languages.TYPESCRIPT },
  ]

  const handleCodeLanguageChange = (value: ValueType) => {
    setCodeLanguage(value)
    switch (value) {
      case Languages.C:
        setLanguageSupport(langs.c())
        break
      case Languages.CPP:
        setLanguageSupport(langs.cpp())
        break
      case Languages.CSharp:
        setLanguageSupport(langs.csharp())
        break
      case Languages.CSS:
        setLanguageSupport(langs.css())
        break
      case Languages.D:
        setLanguageSupport(langs.d())
        break
      case Languages.DART:
        setLanguageSupport(langs.dart())
        break
      case Languages.GO:
        setLanguageSupport(langs.go())
        break
      case Languages.HTML:
        setLanguageSupport(langs.html())
        break
      case Languages.KOTLIN:
        setLanguageSupport(langs.kotlin())
        break
      case Languages.Javascript:
        setLanguageSupport(langs.javascript())
        break
      case Languages.Java:
        setLanguageSupport(langs.java())
        break
      case Languages.JSON:
        setLanguageSupport(langs.json())
        break
      case Languages.PHP:
        setLanguageSupport(langs.php())
        break
      case Languages.PYTHON:
        setLanguageSupport(langs.python())
        break
      case Languages.RUBY:
        setLanguageSupport(langs.ruby())
        break
      case Languages.RUST:
        setLanguageSupport(langs.rust())
        break
      case Languages.SQL:
        setLanguageSupport(langs.sql())
        break
      case Languages.SWIFT:
        setLanguageSupport(langs.swift())
        break
      case Languages.TYPESCRIPT:
        setLanguageSupport(langs.typescript())
        break
      case Languages.PlainText:
      default:
        setLanguageSupport(undefined)
        break
    }
    if (Utils.currentEditor) {
      Utils.currentEditor.beginCodeEdit()
    }
  }

  const handleShowLineNumberChanged = () => {
    setShowLineNumber(!showLineNumber)
    if (Utils.currentEditor) {
      Utils.currentEditor.beginCodeEdit()
    }
  }

  const popupShapeItems: MenuProps['items'] = [
    { label: <FormattedMessage id="workspace.content.popup-shape-delete" />, key: '1', onClick: handleDelete },
    { type: 'divider' },
    { label: <FormattedMessage id="workspace.content.popup-shape-copy" />, key: '2', onClick: handleCopy },
    { label: <FormattedMessage id="workspace.content.popup-shape-cut" />, key: '3', onClick: handleCut },
    { label: <FormattedMessage id="workspace.content.popup-shape-paste" />, key: '4', onClick: handlePaste },
    { label: <FormattedMessage id="workspace.content.popup-shape-duplicate" />, key: '5', onClick: handleDuplicate },
    { type: 'divider' },
    { label: <FormattedMessage id="workspace.content.popup-shape-lock" />, key: '6', onClick: handleLock },
    { type: 'divider' },
    { label: <FormattedMessage id="workspace.content.popup-shape-to-front" />, key: '7', onClick: handleToFront },
    { label: <FormattedMessage id="workspace.content.popup-shape-to-back" />, key: '8', onClick: handleToBack },
    {
      label: <FormattedMessage id="workspace.content.popup-shape-bring-foreward" />,
      key: '9',
      onClick: handleBringForeward,
    },
    {
      label: <FormattedMessage id="workspace.content.popup-shape-send-backward" />,
      key: '10',
      onClick: handleSendBackward,
    },
    { type: 'divider' },
    {
      label: <FormattedMessage id="workspace.content.popup-shape-add-to-my-shapes" />,
      key: '116',
      onClick: handleAddToMyShapes,
    },
  ]

  const popupEditorItems: MenuProps['items'] = [
    { label: <FormattedMessage id="workspace.content.popup-editor-undo" />, key: '1', onClick: handleUndo },
    { label: <FormattedMessage id="workspace.content.popup-editor-redo" />, key: '3', onClick: handlePaste },
    { type: 'divider' },
    { label: <FormattedMessage id="workspace.content.popup-editor-paste" />, key: '2', onClick: handlePaste },
    { type: 'divider' },
    { label: <FormattedMessage id="workspace.content.popup-editor-select-all" />, key: '4', onClick: handleSelectAll },
  ]

  const popupText: MenuProps['items'] = [
    { label: <FormattedMessage id="workspace.content.popup-text-undo" />, key: '1', onClick: handleUndo },
    { label: <FormattedMessage id="workspace.content.popup-text-redo" />, key: '2', onClick: handleRedo },
    { type: 'divider' },
    { label: <FormattedMessage id="workspace.content.popup-text-cut" />, key: '3', onClick: handleTextCut },
    { label: <FormattedMessage id="workspace.content.popup-text-copy" />, key: '4', onClick: handleTextCopy },
    { label: <FormattedMessage id="workspace.content.popup-text-paste" />, key: '5', onClick: handleTextPaste },
    { type: 'divider' },
    { label: <FormattedMessage id="workspace.content.popup-text-select-all" />, key: '6', onClick: handleSelectAll },
  ]

  const popupPaneTitle = (key: string): MenuProps['items'] => {
    return [
      {
        label: <FormattedMessage id="workspace.content.popup-menu-rename-pane-title" />,
        key: '1',
        onClick: () => handleRenamePaneTitle(key),
      },
      {
        label: <FormattedMessage id="workspace.content.popup-menu-duplicate-pane" />,
        key: '2',
        onClick: () => handleDuplicatePane(key),
      },
      {
        label: <FormattedMessage id="workspace.content.popup-menu-delete-pane" />,
        key: '3',
        onClick: () => handleDeletePane(key),
      },
    ]
  }

  const textToolbars = (
    <FloatButton.Group style={{ left: textToolbarLeft, top: textToolbarTop - 40, height: 32, display: textToolbarVisible ? 'block' : 'none' }}>
      <Space
        direction="horizontal"
        style={{
          backgroundColor: Utils.currentEditor?.enableDarkTheme ? workspaceBackground : 'white',
          borderColor: 'silver',
          borderWidth: 1,
          borderStyle: 'solid',
          padding: 2,
        }}
      >
        <Tooltip title={<FormattedMessage id="workspace.header.title.font-bold" />}>
          <Button type={fontBold ? 'primary' : 'text'} size="small" icon={<BoldOutlined />} onClick={handleBoldChanged} />
        </Tooltip>
        <Tooltip title={<FormattedMessage id="workspace.header.title.font-italic" />}>
          <Button type={fontItalic ? 'primary' : 'text'} size="small" icon={<ItalicOutlined />} onClick={handleItalicChanged} />
        </Tooltip>
        <Tooltip title={<FormattedMessage id="workspace.header.title.font-underline" />}>
          <Button type={fontUnderline ? 'primary' : 'text'} size="small" icon={<UnderlineOutlined />} onClick={handleUnderlineChanged} />
        </Tooltip>
        <Divider type="vertical" style={{ margin: 0 }} />
        <Tooltip title={<FormattedMessage id="workspace.header.title.text-left" />}>
          <Button
            type={textAlignment === Constants.TEXT_ALIGNMENT_LEFT ? 'primary' : 'text'}
            size="small"
            icon={<AlignLeftOutlined />}
            onClick={() => handleTextAlignmentChanged(Constants.TEXT_ALIGNMENT_LEFT)}
          />
        </Tooltip>
        <Tooltip title={<FormattedMessage id="workspace.header.title.text-center" />}>
          <Button
            type={textAlignment === Constants.TEXT_ALIGNMENT_CENTER ? 'primary' : 'text'}
            size="small"
            icon={<AlignCenterOutlined />}
            onClick={() => handleTextAlignmentChanged(Constants.TEXT_ALIGNMENT_CENTER)}
          />
        </Tooltip>
        <Tooltip title={<FormattedMessage id="workspace.header.title.text-right" />}>
          <Button
            type={textAlignment === Constants.TEXT_ALIGNMENT_RIGHT ? 'primary' : 'text'}
            size="small"
            icon={<AlignRightOutlined />}
            onClick={() => handleTextAlignmentChanged(Constants.TEXT_ALIGNMENT_RIGHT)}
          />
        </Tooltip>
        <Divider type="vertical" style={{ margin: 0 }} />
        <Tooltip title={<FormattedMessage id="workspace.header.title.text-top" />}>
          <Button
            type={textVerticalAlignment === Constants.PLACE_HOLDER_ALIGNMENT_TOP ? 'primary' : 'text'}
            size="small"
            icon={<VerticalAlignTopOutlined />}
            onClick={() => handleTextVerticalAlignmentChanged(Constants.PLACE_HOLDER_ALIGNMENT_TOP)}
          />
        </Tooltip>
        <Tooltip title={<FormattedMessage id="workspace.header.title.text-middle" />}>
          <Button
            type={textVerticalAlignment === Constants.PLACE_HOLDER_ALIGNMENT_MIDDLE ? 'primary' : 'text'}
            size="small"
            icon={<VerticalAlignMiddleOutlined />}
            onClick={() => handleTextVerticalAlignmentChanged(Constants.PLACE_HOLDER_ALIGNMENT_MIDDLE)}
          />
        </Tooltip>
        <Tooltip title={<FormattedMessage id="workspace.header.title.text-bottom" />}>
          <Button
            type={textVerticalAlignment === Constants.PLACE_HOLDER_ALIGNMENT_BOTTOM ? 'primary' : 'text'}
            size="small"
            icon={<VerticalAlignBottomOutlined />}
            onClick={() => handleTextVerticalAlignmentChanged(Constants.PLACE_HOLDER_ALIGNMENT_BOTTOM)}
          />
        </Tooltip>
        <Divider type="vertical" style={{ margin: 0 }} />
        <Tooltip title={<FormattedMessage id="workspace.header.title.font-size" />}>
          {/** TODO:  FIXME, HIDE TEMPORARY*/}
          {/* <InputNumber min={Consts.FONT_SIZE_MIN} max={Consts.FONT_SIZE_MAX} value={fontSize}
          ref={(node) => { setFontSizeNode(node) }}
          onChange={handleFontSizeChange} onStep={handleFontSizeStepChange} onBlur={handleFontSizeBlur} onPressEnter={handleFontSizePressEnter} size='small' style={{ width: 60, display: 'none' }} /> */}
          <Select size="small" value={fontSize} onChange={handleFontSizeChange} style={{ width: 64 }} options={FontSizeOptions} bordered={false} />
        </Tooltip>
        <Tooltip title={<FormattedMessage id="workspace.header.title.font-color" />}>
          <ColorPicker
            size="small"
            value={fontColor}
            onChange={handleFontColorChange}
            onChangeComplete={handleFontColorChangeComplete}
            destroyTooltipOnHide={true}
            trigger="hover"
          />
        </Tooltip>
      </Space>
    </FloatButton.Group>
  )

  const tableToolbars = (
    <FloatButton.Group
      style={{
        left: tableToolbarLeft,
        top: tableToolbarTop - 40 - (textToolbarVisible ? 40 : 0),
        height: 32,
        display: tableToolbarVisible ? 'block' : 'none',
      }}
    >
      <Space
        direction="horizontal"
        style={{
          backgroundColor: Utils.currentEditor?.enableDarkTheme ? workspaceBackground : 'white',
          borderColor: 'silver',
          borderWidth: 1,
          borderStyle: 'solid',
          padding: 2,
        }}
      >
        <Tooltip title={<FormattedMessage id="workspace.header.title.table-tool-bar.insert-row-above" />}>
          <Button type="text" size="small" icon={<InsertRowAboveOutlined />} onClick={handleInsertRowBefore} disabled={!tableEdittable} />
        </Tooltip>
        <Tooltip title={<FormattedMessage id="workspace.header.title.table-tool-bar.insert-row-below" />}>
          <Button type="text" size="small" icon={<InsertRowBelowOutlined />} onClick={handleInsertRowAfter} disabled={!tableEdittable} />
        </Tooltip>
        <Tooltip title={<FormattedMessage id="workspace.header.title.table-tool-bar.insert-column-before" />}>
          <Button type="text" size="small" icon={<InsertRowLeftOutlined />} onClick={handleInsertColumnBefore} disabled={!tableEdittable} />
        </Tooltip>
        <Tooltip title={<FormattedMessage id="workspace.header.title.table-tool-bar.insert-column-after" />}>
          <Button type="text" size="small" icon={<InsertRowRightOutlined />} onClick={handleInsertColumnAfter} disabled={!tableEdittable} />
        </Tooltip>
        <Divider type="vertical" style={{ margin: 0 }} />
        <Tooltip title={<FormattedMessage id="workspace.header.title.table-tool-bar.delete-row" />}>
          <Button type="text" size="small" icon={<DeleteRowOutlined />} onClick={() => handleDeleteRow()} disabled={!tableEdittable} />
        </Tooltip>
        <Tooltip title={<FormattedMessage id="workspace.header.title.table-tool-bar.delete-column" />}>
          <Button type="text" size="small" icon={<DeleteColumnOutlined />} onClick={() => handleDeleteColumn()} disabled={!tableEdittable} />
        </Tooltip>
      </Space>
    </FloatButton.Group>
  )

  const poolToolbars = (
    <FloatButton.Group
      style={{
        left: poolToolbarLeft,
        top: poolToolbarTop - 40 - (textToolbarVisible ? 40 : 0),
        height: 32,
        display: poolToolbarVisible ? 'block' : 'none',
      }}
    >
      <Space
        direction="horizontal"
        style={{
          backgroundColor: Utils.currentEditor?.enableDarkTheme ? workspaceBackground : 'white',
          borderColor: 'silver',
          borderWidth: 1,
          borderStyle: 'solid',
          padding: 2,
        }}
      >
        <Tooltip title={<FormattedMessage id="workspace.header.title.pool-toolbar.add-pool" />}>
          <Button type="text" size="small" icon={<InsertRowBelowOutlined />} onClick={handleAddPool} disabled={!poolEdittable} />
        </Tooltip>
        <Tooltip title={<FormattedMessage id="workspace.header.title.pool-toolbar.delete-pool" />}>
          <Button type="text" size="small" icon={<DeleteColumnOutlined />} onClick={handleRemovePool} disabled={!poolEdittable} />
        </Tooltip>
        <Tooltip title={<FormattedMessage id="workspace.header.title.pool-toolbar.add-stage" />}>
          <Button type="text" size="small" icon={<InsertRowRightOutlined />} onClick={handleAddStage} disabled={!poolEdittable} />
        </Tooltip>
        <Tooltip title={<FormattedMessage id="workspace.header.title.pool-toolbar.delete-stage" />}>
          <Button type="text" size="small" icon={<DeleteRowOutlined />} onClick={handleRemoveStage} disabled={!poolEdittable} />
        </Tooltip>
        <Divider type="vertical" style={{ margin: 0 }} />
        <Tooltip title={<FormattedMessage id="workspace.header.title.pool-toolbar.switch-pool-direction" />}>
          <Button
            type="text"
            size="small"
            icon={poolHorizontal ? <ArrowRightOutlined /> : <ArrowDownOutlined />}
            onClick={handlePoolDirectionChange}
            disabled={!poolEdittable}
          />
        </Tooltip>
        <Divider type="vertical" style={{ margin: 0 }} />
        <Tooltip title={<FormattedMessage id="workspace.header.title.pool-toolbar.switch-header-pool-text-direction" />}>
          <Button
            type="text"
            size="small"
            icon={<FontColorsOutlined rotate={poolTextHorizontal ? 90 : 0} />}
            onClick={handlePoolHeaderTextDirectionChange}
            disabled={!poolEdittable}
          />
        </Tooltip>
        <Divider type="vertical" style={{ margin: 0 }} />
        <Tooltip title={<FormattedMessage id="workspace.header.title.pool-toolbar.switch-stage-text-direction" />}>
          <Button
            type="text"
            size="small"
            icon={<FontColorsOutlined rotate={poolStageTextHorizontal ? 90 : 0} />}
            onClick={handlePoolStageTextDirectionChange}
            disabled={!poolEdittable}
          />
        </Tooltip>
      </Space>
    </FloatButton.Group>
  )

  const codeContainerToolbars = (
    <FloatButton.Group
      style={{
        left: codeContainerToolbarLeft,
        top: codeContainerToolbarTop - 40,
        height: 32,
        display: codeContainerToolbarVisible ? 'block' : 'none',
      }}
    >
      <Space
        direction="horizontal"
        style={{
          backgroundColor: Utils.currentEditor?.enableDarkTheme ? workspaceBackground : 'white',
          borderColor: 'silver',
          borderWidth: 1,
          borderStyle: 'solid',
          padding: 2,
        }}
      >
        <Tooltip title={<FormattedMessage id="workspace.header.title.pool-toolbar.add-pool" />}>
          <Select size="small" value={codeLanguage} onChange={handleCodeLanguageChange} style={{ width: 100 }} options={codeLanguages} bordered={false} />
        </Tooltip>
        <Divider type="vertical" style={{ margin: 0 }} />
        <Tooltip title={<FormattedMessage id="workspace.header.title.pool-toolbar.delete-pool" />}>
          <Button type={showLineNumber ? 'primary' : 'text'} size="small" icon={<OrderedListOutlined />} onClick={handleShowLineNumberChanged} />
        </Tooltip>
      </Space>
    </FloatButton.Group>
  )

  const codeContainer = (
    <CodeMirror
      ref={codeContainerRef as MutableRefObject<ReactCodeMirrorRef>}
      value={codeContent}
      extensions={languageSupport ? [languageSupport] : []}
      //language={'JavaScript'}
      //rehypePlugins={[[rehypePrism, { ignoreMissing: true, showLineNumbers: true }]]}
      onChange={handleCodeChange}
      onBlur={handleCodeBlur}
      onFocus={handleCodeFocus}
      width={codeContainerWidth + 'px'}
      height={codeContainerHeight + 'px'}
      basicSetup={{
        lineNumbers: showLineNumber,
        highlightActiveLine: false,
        highlightActiveLineGutter: false,
        foldGutter: false,
      }}
      style={{
        position: 'fixed',
        left: codeContainerLeft,
        top: codeContainerTop,
        width: codeContainerWidth,
        height: codeContainerHeight,
        display: codeContainerVisible ? 'block' : 'none',
        //backgroundColor: '#F5F5F5',
        overflow: 'auto',
        fontSize: fontSize,
        fontFamily: 'ui-monospace, SF Mono, Consolas, Menlo, monospace',
      }}
    />
  )

  return (
    <div style={{ position: 'absolute', top: '0px', bottom: '0px', left: x, right: y, backgroundColor: workspaceBackground }}>
      <div style={{ position: 'absolute', width: '100%', height: `calc(100% - ${Utils.TITLE_HEIGHT}px + 0px) `, zIndex: 2 }}>
        <div
          id="content-container"
          style={{
            width: '100%',
            height: '100%',
            overflow: 'scroll',
            scrollbarWidth: 'thin',
            display: 'grid',
            placeItems: 'center',
            scrollbarColor: Utils.currentEditor?.enableDarkTheme ? `${scrollbarThumbColor} ${scrollbarTrackColor}` : undefined,
          }}
          onScroll={handleScroll}
        >
          {textToolbars}
          {tableToolbars}
          {poolToolbars}
          {codeContainer}
          {codeContainerToolbars}
          <div style={{ width: contentWidth, height: contentHeight }}>
            <div style={{ width: '100%', height: Editor.SHADOW_SIZE, backgroundColor: workspaceBackground }} />
            <div style={{ width: '100%', height: editorHeight, boxSizing: 'border-box' }}>
              <div style={{ width: Editor.SHADOW_SIZE, height: '100%', float: 'left', backgroundColor: workspaceBackground }} />
              <Dropdown
                menu={{ items: popupType === PopupType.SHAPES ? popupShapeItems : popupType === PopupType.EDITOR ? popupEditorItems : popupText }}
                trigger={['contextMenu']}
              >
                <div
                  id="editor-container"
                  style={{
                    width: editorWidth,
                    height: '100%',
                    float: 'left',
                    backgroundColor: 'darkgray',
                    cursor: editorCursor,
                  }}
                  onContextMenu={handleContextTrigger}
                  onMouseUp={handleEditorMouseUp}
                  // onDrop={handleEditorDrop} onDragOver={handleEditorDragOver}
                  // onDragEnter={handleEditorDragEnter} onDragLeave={handleEditorDragLeave}
                ></div>
              </Dropdown>
              <div style={{ width: Editor.SHADOW_SIZE, height: '100%', float: 'left', backgroundColor: workspaceBackground }} />
            </div>
            <div style={{ width: '100%', height: Editor.SHADOW_SIZE, backgroundColor: workspaceBackground }} />
          </div>
          <div
            ref={horizontalRulerRef}
            id="horizontalRuler"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: RULER_SIZE,
              backgroundColor: workspaceBackground,
              borderBottom: `0.3px solid ${splitColor}`,
              borderTop: `0.3px solid ${splitColor}`,
              display: showRuler ? 'block' : 'none',
            }}
          />
          <div
            ref={verticalRulerRef}
            id="verticalRuler"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: RULER_SIZE,
              height: '100%',
              backgroundColor: workspaceBackground,
              borderRight: `0.3px solid ${splitColor}`,
              borderLeft: `0.3px solid ${splitColor}`,
              display: showRuler ? 'block' : 'none',
            }}
          />
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: `${Utils.TITLE_HEIGHT}px`, zIndex: 9999 }}>
        <ConfigProvider
          theme={{
            components: {
              Tabs: {
                cardHeight: 34,
                cardPaddingSM: '2px 4px',
                horizontalItemPaddingSM: '4px 0',
                horizontalMargin: '0 0 4px 0',
              },
              Input: {
                paddingInlineSM: 2,
              },
              Button: {
                paddingInlineSM: 2,
              },
            },
          }}
        >
          <Tabs
            type="editable-card"
            size="small"
            tabPosition="bottom"
            onChange={onTabChange}
            activeKey={activeKey}
            // @ts-ignore
            onEdit={onEdit}
            renderTabBar={(tabBarProps: any, DefaultTabBar: any) => (
              <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
                <SortableContext items={panes.map((i) => i.key)} strategy={horizontalListSortingStrategy}>
                  <DefaultTabBar {...tabBarProps}>
                    {(node: any) => (
                      <DraggableTabNode {...node.props} key={node.key}>
                        {node}
                      </DraggableTabNode>
                    )}
                  </DefaultTabBar>
                </SortableContext>
              </DndContext>
            )}
          >
            {panes.map((pane) => {
              const paneTitle = (
                <Dropdown menu={{ items: popupPaneTitle(pane.key) }} trigger={['contextMenu']}>
                  <div>
                    <Input
                      id={`pane-title-input-${pane.key}`}
                      defaultValue={pane.title}
                      size="small"
                      variant="borderless"
                      maxLength={32}
                      style={{ width: '50px', display: 'inline' }}
                      // onCompositionUpdate={e => handlePaneTitleInitialize(pane, e)}
                      // onCompositionEnd={e => handlePaneTitleInitialize(pane, e)}
                      // onEnded={e => handlePaneTitleInitialize(pane, e)}
                      onChange={(e) => handlePaneTitleChange(pane, e.target.value, e)}
                      readOnly={true}
                      onPointerEnter={handlePaneTitlePointerEnter}
                      onDoubleClick={(e) => handlePaneTitleDoubleClick(pane, e)}
                      onPressEnter={(e) => handlePaneTitleChangeCompleted(pane, e)}
                      onBlur={(e) => handlePaneTitleChangeBlur(pane, e)}
                      //onFocus={e => handlePaneTitleDoubleClick(pane, e)}
                      onPointerDown={(e) => handlePaneTitleClick(pane.key, e)}
                    />
                    {/* <label id={`pane-title-label-${pane.key}`} style={{display: 'inline'}}
                        onDoubleClick={ e => handlePaneTitleLabelDoubleClick(pane, e)}
                        onPointerDown={e => handlePaneTitleClick(pane.key, e)}
                        >{pane.title}</label> */}
                  </div>
                </Dropdown>
              )
              return <TabPane tab={paneTitle} key={pane.key} closable={pane.key === activeKey} />
            })}
          </Tabs>
        </ConfigProvider>
      </div>
      <div style={{ display: 'none' }}>
        <Input id="sandbox" />
      </div>
    </div>
  )
}

export default Content
