/* eslint-disable radix */
/* eslint-disable @typescript-eslint/prefer-for-of */
import React, { useEffect, useState, useRef, FC, MouseEventHandler, SyntheticEvent, } from 'react'
import styles from './index.css'
import { Button, ColorPicker, Divider, Dropdown, FloatButton, Input, InputNumber, MenuProps, Space, Tabs, Tooltip, theme, } from 'antd'
import { Consts, SystemUtils, Utils, } from '../Utils'
import { Editor, EditorEvent, } from '../../Rockie/Editor'

import { Engine, Rectangle2D, EngineUtils, Line2D, FontWeight, FontSlant, TextDecoration, Point2, } from '../../Engine'
import { StorageService, } from '../Storage'
import { Operation, OperationHelper, OperationType } from '@/components/Rockie/Operations'
import { AlignCenterOutlined, AlignLeftOutlined, AlignRightOutlined, BoldOutlined, DeleteColumnOutlined, DeleteRowOutlined, InsertRowAboveOutlined, InsertRowBelowOutlined, InsertRowLeftOutlined, InsertRowRightOutlined, ItalicOutlined, QuestionCircleOutlined, UnderlineOutlined, VerticalAlignBottomOutlined, VerticalAlignMiddleOutlined, VerticalAlignTopOutlined } from '@ant-design/icons'
import { Item, ShapeEntity, TableEntity } from '@/components/Rockie/Items'
import { useIntl, setLocale, getLocale, FormattedMessage, } from 'umi';
import ClipboardJS from 'clipboard'
import { EditorHelper } from '@/components/Rockie/Utils'

interface Pane {
  title: string,
  content: string,
  key: string,
  editor: Editor | null
}

interface ContentProps {
  onEditorChange: (oldEditor: Editor | undefined, newEditor: Editor | undefined) => void
  x: string
  y: string
}

const { TabPane, } = Tabs
const DOCUMENT_PREFIX = 'File '
const DOCUMENT_CONTENT = 'Dummy'
//TODO FIXME, if setup with same width and height, some strange behavor may happen while zooming. and so make default value some strange
const DEFAULT_PAINTER_WIDTH = 801
const DEFAULT_PAINTER_HEIGHT = 599

const initialPanes: Pane[] = [
  { title: DOCUMENT_PREFIX + '1', content: DOCUMENT_CONTENT, key: '1', editor: null, },
  { title: DOCUMENT_PREFIX + '2', content: DOCUMENT_CONTENT, key: '2', editor: null, },
  { title: DOCUMENT_PREFIX + '3', content: DOCUMENT_CONTENT, key: '3', editor: null, },
]

//const {  useToken, } = theme

const Content: FC<ContentProps> = ({
  onEditorChange, x, y
}) => {
  //const { token, } =  useToken()
  const intl = useIntl();

  const getDefaultContentWidth = () => {
    if (Utils.currentEditor) {
      return Math.round(Utils.currentEditor.width + Editor.SHADOW_SIZE * 2) + 'px'
    } else {
      return (DEFAULT_PAINTER_WIDTH + Editor.SHADOW_SIZE * 2) + 'px'
    } 
  }
  
  const getDefaultContentHeight = () => {
    if (Utils.currentEditor) {      
      return Math.round(Utils.currentEditor.height + Editor.SHADOW_SIZE * 2) + 'px'
    } else {
      return (DEFAULT_PAINTER_HEIGHT + Editor.SHADOW_SIZE * 2) + 'px'
    }
  }
  const getDefaultEditorWidth = () => {
    if (Utils.currentEditor) {
      return Math.round(Utils.currentEditor.width) + 'px'
    } else {
      return DEFAULT_PAINTER_WIDTH + 'px'
    }
  }
  const getDefaultEditorHeight = () => {
    if (Utils.currentEditor) {
      return Math.round(Utils.currentEditor.height) + 'px'
    } else {
      return DEFAULT_PAINTER_HEIGHT + 'px'
    }
  }

  const [ initialized, setInitialized, ] = useState<boolean>(false)
  const [ activeKey, setActiveKey, ] = useState(initialPanes[0].key)
  const [ panes, setPanes, ] = useState(initialPanes)
  const [ viewWidth, setViewWidth, ] = useState<number>(300)
  const [ viewHeight, setViewHeight, ] = useState<number>(300)
  const [ contentWidth, setContentWidth, ] = useState<string>(getDefaultContentWidth())
  const [ contentHeight, setContentHeight, ] = useState<string>(getDefaultContentHeight())
  const [ editorWidth, setEditorWidth, ] = useState<string>(getDefaultEditorWidth())
  const [ editorHeight, setEditorHeight, ] = useState<string>(getDefaultEditorHeight())
  const [ documentModified, setdocumentModified, ] = useState<boolean>(false)
  const [ textToolbarLeft, setTextToolbarLeft, ] = useState<number>(0)
  const [ textToolbarTop, setTextToolbarTop, ] = useState<number>(0)
  const [ textToolbarVisible, setTextToolbarVisible,  ] = useState<boolean>(false)
  const [ tableToolbarLeft, setTableToolbarLeft, ] = useState<number>(0)
  const [ tableToolbarTop, setTableToolbarTop, ] = useState<number>(0)
  const [ tableToolbarVisible, setTableToolbarVisible,  ] = useState<boolean>(false)
  const [fontSize, setFontSize,] = useState<number>(Consts.FONT_SIZE_DEFAULT)
  const [fontColor, setFontColor, ] = useState<string>(Consts.COLOR_FONT_DEFAULT)
  const [fontWeight, setFontWeight, ] = useState<string>(Consts.FONT_WEIGHT_NORMAL)
  const [fontSlant, setFontSlant, ] = useState<string>(Consts.FONT_SLANT_UP_RIGHT)
  const [fontWidth, setFontWidth, ] = useState<string>(Consts.FONT_WIDTH_NORMAL)
  const [textAlignment, setTextAlignment, ] = useState<string>(Consts.TEXT_ALIGNMENT_LEFT)
  const [textDecoration, setTextDecoration, ] = useState<string>(Consts.TEXT_DECORATION_NONE)
  const [textVerticalAlignment, setTextVerticalAlignment, ] = useState<string>(Consts.PLACE_HOLDER_ALIGNMENT_MIDDLE)
  const [fontBold, setFontBold, ] = useState<boolean>(false)
  const [fontItalic, setFontItalic,] = useState<boolean>(false)
  const [fontUnderline, setFontUnderline, ] = useState<boolean>(false)
  const [currentEditor, setCurrentEditor, ] = useState<Editor | null  >(null)
  const [fontSizeNode, setFontSizeNode, ] = useState<any>(null)
  const [popupMenuVisible, setPopupMenuVisible] = useState<boolean>(false)
  const [shapeSelected, setShapeSelected, ] = useState<boolean>(false)
  const [pasteLocation, setPasteLocation, ] = useState<Point2>(new Point2())
  const [pasteFromSystem, setPasteFromSystem, ] = useState<boolean>(true)

  const newTabIndex = useRef(4)

  useEffect(() => {
    if (!initialized) {
      initialize()
    }

    // 根据浏览器窗口大小来调整各子div的滚动范围
    window.addEventListener('resize', calculateViewSize)
    window.addEventListener('copy', handleCopyDetail)
    window.addEventListener('cut', handleCutDetail)
    window.addEventListener('paste', handlePasteDetail)
    // const timer = setInterval(() => {
    // }, 100)

    return () => {
      window.removeEventListener('resize', calculateViewSize)
      window.removeEventListener('copy', handleCopyDetail)
      window.removeEventListener('cut', handleCutDetail)
      window.removeEventListener('paste', handlePasteDetail)
        // clearInterval(timer)
    }
  })

  const updateEditorSize = () => {
    if (Utils.currentEditor) {
      const newContentWidth = Math.round(Utils.currentEditor.width + Editor.SHADOW_SIZE * 2) + 'px'
      if (contentWidth !== newContentWidth) {
        setContentWidth(newContentWidth)
      }
      const newContentHeight = Math.round(Utils.currentEditor.height + Editor.SHADOW_SIZE * 2) + 'px'
      if (contentHeight !== newContentHeight) {
        setContentHeight(newContentHeight)
      }
      const newEditorWidth = Math.round(Utils.currentEditor.width) + 'px'
      if (editorWidth !== newEditorWidth) {
        setEditorWidth(newEditorWidth)
      }
      const newEditorHeight = Math.round(Utils.currentEditor.height) + 'px'
      if (editorHeight !== newEditorHeight) {
        setEditorHeight(newEditorHeight)
      }
    } else {
      const newContentWidth = (DEFAULT_PAINTER_WIDTH + Editor.SHADOW_SIZE * 2) + 'px'
      if (contentWidth !== newContentWidth) {
        setContentWidth(newContentWidth)
      }
      const newContentHeight = (DEFAULT_PAINTER_HEIGHT + Editor.SHADOW_SIZE * 2) + 'px'
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
  }


  const calculateViewSize = () => {
    const container = document.getElementById('tab-container')
    if (container?.lastElementChild) {
      if (viewWidth != container.lastElementChild.scrollWidth) {
        setViewWidth(container.lastElementChild.clientWidth)
      }
      if (viewHeight != container.lastElementChild.scrollHeight) {
        setViewHeight(container.lastElementChild.clientHeight)
      }
    }
  }

  calculateViewSize()

  const initialize = async () => {
    setInitialized(true)
    await Engine.initialize()
    let firstEditor: Editor | undefined = undefined
    for (let i = 0; i < panes.length; i++) {
      const pane = panes[i]
      const canvasId = 'editor-' + pane.key
      const canvas = document.createElement('canvas')
      canvas.width = DEFAULT_PAINTER_WIDTH
      canvas.height = DEFAULT_PAINTER_HEIGHT
      canvas.id = canvasId
      const editor = new Editor(canvas)
      pane.editor = editor
      editor.key = pane.key
      editor.title = pane.title
      editor.start()
      if(i == 0) {
        firstEditor = editor
      } else {        
        editor.operationService = firstEditor!.operationService
      }
    }
    const container = document.getElementById('editor-container')
    const editor = panes[0].editor
    const canvas = editor?.container
    container?.append(canvas!)
    editor?.activate()
    let oldEditor = Utils.currentEditor
    Utils.currentEditor = editor!
    setCurrentEditor(editor!)
    onEditorChange(oldEditor, Utils.currentEditor)
    updateEditors(panes)
    Utils.updateEditorSize = updateEditorSize
    Utils.loadData = loadData
    Utils.checkIfModified = checkIfDocumentModified
    updateEditorSize()
    checkIfDocumentModified(false)
    oldEditor?.removeSelectionChange(handleSelectionChange)
    Utils.currentEditor.onSelectionChange(handleSelectionChange)
    oldEditor?.removeTextEditStart(handleTextEditStart)
    Utils.currentEditor.onTextEditStart(handleTextEditStart)
    oldEditor?.removeTextEditEnd(handleTextEditEnd)
    Utils.currentEditor.onTextEditEnd(handleTextEditEnd)
    oldEditor?.removeSelectionResized(handleSelectionResized)
    Utils.currentEditor.onSelectionResized(handleSelectionResized)
    oldEditor?.removeTextEditStyleChange(handleTextEditStyleChange)
    Utils.currentEditor.onTextEditStyleChange(handleTextEditStyleChange)
  }

  const updateEditors = (panes: Pane[]) => {
    Utils.editors.length = 0
    panes.forEach(pane => {
      Utils.editors.push(pane.editor!)
    })
    updateEditorSize()
  }

  const saveData = () => {

  }

  const loadData = () => {
    if (!Utils.storageData) {
      return
    }
    const storageData = Utils.storageData
    const sheetCount = storageData.sheets.length
    let activeKey = ''
    let activateCanvas = null
    let activeEditor = null
    const panes: Pane[] = []
    for (let sheetIndex = 0; sheetIndex < sheetCount; sheetIndex++) {
      const sheetData = storageData.sheets[sheetIndex]
      const pane: Pane = { title: sheetData.title, content: DOCUMENT_CONTENT, key: sheetData.key, editor: null, }
      const canvasId = 'editor-' + pane.key
      const canvas = document.createElement('canvas')
      canvas.width = DEFAULT_PAINTER_WIDTH
      canvas.height = DEFAULT_PAINTER_HEIGHT
      canvas.id = canvasId
      const editor = new Editor(canvas)
      pane.editor = editor
      editor.key = pane.key
      editor.title = pane.title
      sheetData.items.forEach(itemData => {
        const item = StorageService.loadItemData(itemData)
        editor.contentLayer.addEditorItem(item)
      })
      //Update item reference by id
      sheetData.items.forEach(itemData => {
        StorageService.refreshItemData(itemData, editor.contentLayer.getAllEditorItems())
      })
      editor.resetModified()
      editor.start()
      panes.push(pane)
      if (sheetIndex == 0) {
        activeKey = sheetData.key
        activateCanvas = canvas
        activeEditor = editor
      }
    }
    setPanes(panes)
    setActiveKey(activeKey)

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
    updateEditors(panes)
    checkIfDocumentModified(false)
    oldEditor?.removeSelectionChange(handleSelectionChange)
    Utils.currentEditor.onSelectionChange(handleSelectionChange)
    oldEditor?.removeTextEditStart(handleTextEditStart)
    Utils.currentEditor.onTextEditStart(handleTextEditStart)
    oldEditor?.removeTextEditEnd(handleTextEditEnd)
    Utils.currentEditor.onTextEditEnd(handleTextEditEnd)
    oldEditor?.removeSelectionResized(handleSelectionResized)
    Utils.currentEditor.onSelectionResized(handleSelectionResized)
  }

  const onChange = (newActiveKey: string) => {
    const container = document.getElementById('editor-container')
    setActiveKey(newActiveKey)
    while (container?.hasChildNodes()) {
      container?.removeChild(container.lastChild!)
    }
    for (let i = 0; i < panes.length; i++) {
      const pane = panes[i]
      if (pane.key == newActiveKey) {
        const editor = pane.editor
        const canvas = editor?.container
        container?.append(canvas!)
        editor?.activate()
        let oldEditor = Utils.currentEditor
        Utils.currentEditor = editor!
        setCurrentEditor(editor!)
        onEditorChange(oldEditor, Utils.currentEditor)
        if(oldEditor) {
          let operation = new Operation(oldEditor, OperationType.SELECT_EDITOR, [])
          Utils.currentEditor.operationService.addOperation(operation)
        }
        oldEditor?.removeSelectionChange(handleSelectionChange)
        Utils.currentEditor.onSelectionChange(handleSelectionChange)
        oldEditor?.removeTextEditStart(handleTextEditStart)
        Utils.currentEditor.onTextEditStart(handleTextEditStart)
        oldEditor?.removeTextEditEnd(handleTextEditEnd)
        Utils.currentEditor.onTextEditEnd(handleTextEditEnd)
        oldEditor?.removeSelectionResized(handleSelectionResized)
        Utils.currentEditor.onSelectionResized(handleSelectionResized)
      }
    }
    updateEditors(panes)
  }


  const refreshSelectionInfo = (editor: Editor) => {
    if (editor.selectionLayer.getEditorItemCount() > 0) {
      let editorItem = editor.selectionLayer.getEditorItem(0)
      setFontSize(editorItem.fontSize)
      let fontColorValue = SystemUtils.generateColorString(editorItem.fontColor)
      setFontColor(fontColorValue.substring(0, 7))
      //setFontColor(shape.fontPaint.getColor)
      setFontBold(editorItem.fontWeight == FontWeight.BOLD)
      setFontItalic(editorItem.fontSlant == FontSlant.ITALIC)
      setFontUnderline(editorItem.textDecoration == TextDecoration.UNDERLINE)
      let textAlignmentValue = SystemUtils.generateTextAlignment(editorItem.textAlignment)
      setTextAlignment(textAlignmentValue)
      let textVerticalAlignmentValue = SystemUtils.generateTextVerticalAligment(editorItem.textVerticalAlignment)
      setTextVerticalAlignment(textVerticalAlignmentValue)
    }
  }

  const handleSelectionChange = (e: EditorEvent) => {
    let tableSelected = false
    if(Utils.currentEditor && e.source.selectionLayer.getEditorItemCount() == 1 ) {
      let item = e.source.selectionLayer.getEditorItem(0) as Item
      if(item instanceof TableEntity) {
        let container = document.getElementById('editor-container')
        let postion = getElementAbsolutePosition(container)
        let left = item.left
        let top = item.top
        setTableToolbarLeft(left + postion.left)
        setTableToolbarTop(top + postion.top)
        setTableToolbarVisible(true)
        tableSelected = true
      }
      refreshSelectionInfo(Utils.currentEditor)
    }
    if(!tableSelected) {
      setTableToolbarVisible(false)
    }
    if(Utils.currentEditor && e.source.selectionLayer.getEditorItemCount() > 0 ) {
      setShapeSelected(true)
    } else {
      setShapeSelected(false)
    }
  }


  const handleSelectionResized = (e: EditorEvent) => {
    //console.log(`handle selection resized`)
    if(Utils.currentEditor && e.source.selectionLayer.getEditorItemCount() == 1 ) {
      let item = e.source.selectionLayer.getEditorItem(0) as Item
      let container = document.getElementById('editor-container')
      let postion = getElementAbsolutePosition(container)
      let left = item.left
      let top = item.top
      if(item instanceof TableEntity) {
        setTableToolbarLeft(left + postion.left)
        setTableToolbarTop(top + postion.top)
        setTableToolbarVisible(true)
      } else if(item instanceof ShapeEntity && e.source.isTextEditting) {
        setTextToolbarLeft(left + postion.left)
        setTextToolbarTop(top + postion.top)
        setTextToolbarVisible(true)
      }
    }
  }

  const handleTextEditStyleChange = (e: EditorEvent) => {
    if(Utils.currentEditor && e.source.selectionLayer.getEditorItemCount() == 1 ) {
      refreshSelectionInfo(Utils.currentEditor)
    }
  }

  const handleTextEditStart = (e: EditorEvent) => {
    //console.log(`handle text start`)
    if(Utils.currentEditor && e.source.selectionLayer.getEditorItemCount() == 1 ) {
      let item = e.source.selectionLayer.getEditorItem(0) as Item
      let container = document.getElementById('editor-container')
      let postion = getElementAbsolutePosition(container)
      let left = item.left
      let top = item.top
      setTextToolbarLeft(left + postion.left)
      setTextToolbarTop(top + postion.top)
      setTextToolbarVisible(true)
      refreshSelectionInfo(Utils.currentEditor)
    }
  }

  const getElementAbsolutePosition = (element: HTMLElement | null) => {
    if(element) {
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
        top: 0
      }
    }
  }

  const handleTextEditEnd = (e: EditorEvent) => {
    console.log(`handle text end`)
    setTextToolbarVisible(false)
  }


  const add = () => {
    const newActiveKey = `${newTabIndex.current++}`
    const newPanes = [ ...panes, ]
    const pane: Pane = { title: DOCUMENT_PREFIX + newActiveKey, content: DOCUMENT_CONTENT, key: newActiveKey, editor: null, }
    const canvasId = 'editor-' + pane.key
    const canvas = document.createElement('canvas')
    canvas.width = DEFAULT_PAINTER_WIDTH
    canvas.height = DEFAULT_PAINTER_HEIGHT
    canvas.id = canvasId
    const editor = new Editor(canvas)
    pane.editor = editor
    editor.key = pane.key
    editor.title = pane.title
    editor.start()
    newPanes.push(pane)
    setPanes(newPanes)
    setActiveKey(newActiveKey)
    const container = document.getElementById('editor-container')
    while (container?.hasChildNodes()) {
      container?.removeChild(container.lastChild!)
    }
    container?.append(canvas!)

    let oldEditor = Utils.currentEditor
    Utils.currentEditor = editor!
    setCurrentEditor(editor!)
    onEditorChange(oldEditor, Utils.currentEditor)
    updateEditors(panes)
    oldEditor?.removeSelectionChange(handleSelectionChange)
    Utils.currentEditor.onSelectionChange(handleSelectionChange)
    oldEditor?.removeTextEditStart(handleTextEditStart)
    Utils.currentEditor.onTextEditStart(handleTextEditStart)
    oldEditor?.removeTextEditEnd(handleTextEditEnd)
    Utils.currentEditor.onTextEditEnd(handleTextEditEnd)
    oldEditor?.removeSelectionResized(handleSelectionResized)
    Utils.currentEditor.onSelectionResized(handleSelectionResized)
    let operation = new Operation(Utils.currentEditor, OperationType.ADD_EDITOR, [])
    Utils.currentEditor.operationService.addOperation(operation)
}

  const remove = (targetKey: string) => {
    let newActiveKey = activeKey
    let lastIndex = -1
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1
      }
    })
    const newPanes = panes.filter(pane => pane.key !== targetKey)
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key
      } else {
        newActiveKey = newPanes[0].key
      }
    }
    setPanes(newPanes)
    setActiveKey(newActiveKey)
    updateEditors(panes)
    if(Utils.currentEditor) {
      let operation = new Operation(Utils.currentEditor, OperationType.REMOVE_EDITOR, [])
      Utils.currentEditor.operationService.addOperation(operation)
      //oldEditor?.removeSelectionChange(handleSelectionChange)
      Utils.currentEditor.onSelectionChange(handleSelectionChange)
      Utils.currentEditor.onTextEditStart(handleTextEditStart)
      Utils.currentEditor.onTextEditEnd(handleTextEditEnd)
      Utils.currentEditor.onTextEditEnd(handleTextEditEnd)
      Utils.currentEditor.onSelectionResized(handleSelectionResized)
    }
  }

  const onEdit = (targetKey: string, action: 'add' | 'remove') => {
    checkIfDocumentModified(true)
    if (action === 'add') {
      add()
    } else {
      remove(targetKey)
    }
  }

  const checkIfDocumentModified = (ifModified: boolean)=> {
    if(ifModified) {
      setdocumentModified(true)
      Utils.isModified = true
    } else {
      let modified = false
      Utils.editors.forEach( editor => {
        if(editor.isModified()) {
          modified = true
        }
      })
      setdocumentModified(modified)
      Utils.isModified = modified
    }

  }


  const handleFontSizeChange = (value: any) => {
    console.log('font size changed')
    setFontSize(value)
    if (Utils.currentEditor) {
      let editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      editorItems.forEach(editorItem => {
        //let shape = editorItem.shape
        //shape.font = new Font(EngineUtils.FONT_NAME_DEFAULT, value)
        //shape.markDirty()
        editorItem.fontSize = value
      })
      Utils.currentEditor.focus()
    }
    if(fontSizeNode) {
      console.log('font size blue trigger on size change')
      fontSizeNode.blur()
    }
  }
  
  const handleFontSizeStepChange = (value: number, info : any) => {
    console.log('font size step changed')
    if(Utils.currentEditor) {
      Utils.currentEditor.focus()
    }
    if(fontSizeNode) {
      console.log('font size blue trigger on size step change')
      fontSizeNode.blur()
    }
  }

  const handleFontSizeBlur = () => {
    console.log('font size is blured')
    if(Utils.currentEditor) {
      Utils.currentEditor.focus()
    }
  }

  const handleFontSizePressEnter = (e: KeyboardEvent) => {
    console.log('font size is pressed Enter Key')       
    if(fontSizeNode) {
      console.log('font size blue trigger on size step change')
      //fontSizeNode.blur()
    }
    //e.stopPropagation()
  }


  const handleFontColorChange = (value: any) => {
    setFontColor(value)
    if (Utils.currentEditor) {
      let editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      editorItems.forEach(editorItem => {
        let color = SystemUtils.parseColorString(value.toHexString())
        if(color) {
          editorItem.fontColor = color
        }
      })
      Utils.currentEditor.focus()    
    }
  }

  const handleBoldChanged = () => {
    setFontBold(!fontBold)
    if(Utils.currentEditor) {
      let editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      editorItems.forEach(editorItem => {
        editorItem.fontWeight = fontBold ? FontWeight.NORMAL : FontWeight.BOLD
      })
      Utils.currentEditor.focus()    
    }
  }

  const handleItalicChanged = () => {
    setFontItalic(!fontItalic)
    if(Utils.currentEditor) {
      let editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      editorItems.forEach(editorItem => {
        editorItem.fontSlant = fontItalic ? FontSlant.UP_RIGHT : FontSlant.ITALIC
      })
      Utils.currentEditor.focus()    
    }
  }

  const handleUnderlineChanged = () => {
    setFontUnderline(!fontUnderline)
    if(Utils.currentEditor) {
      let editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      editorItems.forEach(editorItem => {
        editorItem.textDecoration = fontUnderline ? TextDecoration.NONE : TextDecoration.UNDERLINE
      })
      Utils.currentEditor.focus()    
    }
  }

  const handleTextAlignmentChanged = (textAlignment: string) => {
    setTextAlignment(textAlignment)
    if(Utils.currentEditor) {
      let editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      editorItems.forEach(editorItem => {
        editorItem.textAlignment = SystemUtils.parseTextAlignment(textAlignment)
      })
      Utils.currentEditor.focus()    
    }
  }

  const handleTextVerticalAlignmentChanged = (textVerticalAlignment: string) => {
    setTextVerticalAlignment(textVerticalAlignment)
    if(Utils.currentEditor) {
      let editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      editorItems.forEach(editorItem => {
        editorItem.textVerticalAlignment = SystemUtils.parseTextVerticalAligment(textVerticalAlignment)
      })
      Utils.currentEditor.focus()    
    }
  }

  /**
   * Handle copy command from system or application.
   * @param e 
   */
  const handleCopyDetail = (e: ClipboardEvent) => {
    if(e.clipboardData && Utils.currentEditor) {
      let data = EditorHelper.exportEditorSelections(Utils.currentEditor)
      //data = `a${data}a`
      e.clipboardData.clearData()
      e.clipboardData.setData('text/plain', data)
      //e.clipboardData.setData('text/retel', data)
      console.log(`copy data = ${data}`) 
      e.preventDefault()
    }
  }

  // Handle copy command only for application by menu
  const handleCopy = async () => {
    if(Utils.currentEditor) {
      console.log(`copy is triggered`)
      const data = EditorHelper.exportEditorSelections(Utils.currentEditor)
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
      if(!clipboard) {
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
    if(e.clipboardData && Utils.currentEditor) {
      let data = EditorHelper.exportEditorSelections(Utils.currentEditor)
      //data = `a${data}a`
      e.clipboardData.clearData()
      e.clipboardData.setData('text/plain', data)
      //e.clipboardData.setData('text/retel', data)
      console.log(`cube data = ${data}`) 
      //deleteCurrentDocumentSelection()
      e.preventDefault()
    }
  }

  const handleCut = async () => {
    if(Utils.currentEditor) {
      console.log(`cut is triggered`)
      let clipboard = navigator.clipboard
      if(!clipboard) {
        SystemUtils.handleInternalError(intl.formatMessage({ id: 'workspace.content.message-clipboard-not-supported' }))
        return
      }
      const data = EditorHelper.exportEditorSelections(Utils.currentEditor)
      await clipboard.writeText(data)
    }
  }

  /**
   * Handle paste for system & application. It can be triggered by system paste or by application:HandlePaste
   * @param e 
   */
  const handlePasteDetail = (e: ClipboardEvent) => {
    if(Utils.currentEditor && e.clipboardData && e.clipboardData.types.indexOf('text/plain') > -1) {
      let data = e.clipboardData.getData('text/plain')
      console.log(`oldData = ${data}`)
      let selections = EditorHelper.readSelections(data)
      console.log(`paste selections = ${selections}`)
      EditorHelper.pasteSelections(selections, Utils.currentEditor, pasteFromSystem, pasteLocation)
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
    if(!clipboard) {
      SystemUtils.handleInternalError(intl.formatMessage({ id: 'workspace.content.message-clipboard-not-supported' }))
      return
    }
    const text = await clipboard.readText()
    //const clipboardItems = await clipboard.readText()
    //let textBlob: Blob
    //let text = ''
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
    dataTransfer.effectAllowed = "uninitialized"
    //let data = EditorHelper.exportEditorSelections(Utils.currentEditor!)
    dataTransfer.setData('text/plain', text)
    dataTransfer.setData('text/retel', text)
    window.dispatchEvent(new ClipboardEvent('paste', {
      bubbles: true,
      cancelable: true,
      composed: true,
      clipboardData: dataTransfer
    }))
    //let sandbox = document.getElementById('sandbox')
    //if(sandbox) {
    //  sandbox.focus()    
    //  let result = document.execCommand('paste', false, 'a')
    //  console.log(`Paste execution result is ${result}`)
    //}


  }

  const handleContextTrigger = (e: any) => {
    setPasteLocation(new Point2(e.nativeEvent.offsetX, e.nativeEvent.offsetY))
  }

  const handleSelectAll = () => {

  }

  const handleDelete = () => {

  }

  const handleDuplicate = () => {

  }

  const handleLock = () => {

  }

  const handleToFront = () => {

  }

  const handleToBack = () => {

  }

  const handleBringForeward = () => {

  }

  const handleSendBackward = () => {

  }

  const handleUndo = () => {
    if (currentEditor) {
      let operationService = currentEditor.operationService
      let operation = operationService.getUndoOperation()
      if (operation) {
        switch (operation.type) {
          case OperationType.ADD_EDITOR:
            removeEditor(operation.editor)
            break;
          case OperationType.REMOVE_EDITOR:
            break;
          case OperationType.RENAME_EDITOR:
            break;
          case OperationType.SELECT_EDITOR:
            break;
          case OperationType.MOVE_EDITOR:
            break;
          default:
            break;
        }
        currentEditor.undo()
      }
    }
  }

  const removeEditor = (editor: Editor) => {

  }

  const popupShapeItems: MenuProps['items'] = [
    {label: 'Delete', key: '3', onClick: handleDelete, },
    {type: 'divider' },
    {label: 'Copy', key: '1', onClick: handleCopy, },
    {label: 'Cut', key: '2', onClick: handleCut, },
    {label: 'Paste', key: '3', onClick: handlePaste, },
    {label: 'Duplicate', key: '3', onClick: handleDuplicate, },
    {type: 'divider' },
    {label: 'Lock', key: '3', onClick: handleLock, },
    {type: 'divider' },
    {label: 'To Front', key: '3', onClick: handleToFront, },
    {label: 'To Back', key: '3', onClick: handleToBack, },
    {label: 'Bring Foreward', key: '3', onClick: handleBringForeward, },
    {label: 'Send Backward', key: '3', onClick: handleSendBackward, },
  ]

  const popupEditorItems: MenuProps['items'] = [
    {label: 'Undo', key: '1', onClick: handleUndo, },
    {type: 'divider' },
    {label: 'Paste', key: '1', onClick: handlePaste, },
    {label: 'Paste', key: '1', onClick: handlePaste, },
    {type: 'divider' },
    {label: 'Select All', key: '5', onClick: handleSelectAll, },
  ]


  return (
    <div  style={{ position: 'absolute', top: '0px', bottom: '0px', left: x, right: y, backgroundColor: 'lightgray', }}>
      <div style={{ position: 'absolute', width: '100%', height: `calc(100% - ${Utils.TITLE_HEIGHT}px + 16px) `, zIndex: 2, }} >
        <div style={{ width: '100%', height: '100%', overflow: 'scroll', display: 'grid', placeItems: 'center', }}>
          <div style={{ width: contentWidth, height: contentHeight, }}>
            <div style={{ width: '100%', height: Editor.SHADOW_SIZE, backgroundColor: 'lightgray', }} />
            <div style={{ width: '100%', height: editorHeight, boxSizing: 'border-box', }}>
              <div style={{ width: Editor.SHADOW_SIZE, height: '100%', float: 'left', backgroundColor: 'lightgray', }} />
              <Dropdown menu={{items: shapeSelected ? popupShapeItems : popupEditorItems }} trigger={['contextMenu']} >
                <div id='editor-container' style={{ width: editorWidth, height: '100%', float: 'left', backgroundColor: 'darkgray', }} onContextMenu={handleContextTrigger} >
                  <FloatButton.Group style={{left: textToolbarLeft, top: textToolbarTop - 40, height: 32, display: textToolbarVisible ? 'block' : 'none' }}>                  
                    <Space direction='horizontal' style={{backgroundColor: 'white', borderColor: 'silver', borderWidth: 1, borderStyle: 'solid', padding: 2}}>
                      <Tooltip title={<FormattedMessage id='workspace.header.title.font-bold'/>}>
                        <Button type={fontBold ? 'primary' : 'text'} size='small' icon={<BoldOutlined/>}  onClick={handleBoldChanged} />
                        </Tooltip>
                      <Tooltip title={<FormattedMessage id='workspace.header.title.font-italic'/>}>
                        <Button type={fontItalic ? 'primary' : 'text'} size='small' icon={<ItalicOutlined/>} onClick={handleItalicChanged} />
                      </Tooltip>
                      <Tooltip title={<FormattedMessage id='workspace.header.title.font-underline'/>}>
                        <Button type={fontUnderline ? 'primary' : 'text'} size='small' icon={<UnderlineOutlined/>} onClick={handleUnderlineChanged} />
                      </Tooltip>
                      <Divider type='vertical' style={{ margin: 0 }} />
                      <Tooltip title={<FormattedMessage id='workspace.header.title.text-left'/>}>
                        <Button type={textAlignment == Consts.TEXT_ALIGNMENT_LEFT ? 'primary' : 'text'} size='small' icon={<AlignLeftOutlined/>} onClick={() => handleTextAlignmentChanged(Consts.TEXT_ALIGNMENT_LEFT)} />
                      </Tooltip>
                      <Tooltip title={<FormattedMessage id='workspace.header.title.text-center'/>}>
                        <Button type={textAlignment == Consts.TEXT_ALIGNMENT_CENTER ? 'primary' : 'text'} size='small' icon={<AlignCenterOutlined/>} onClick={() => handleTextAlignmentChanged(Consts.TEXT_ALIGNMENT_CENTER)} />
                      </Tooltip>
                      <Tooltip title={<FormattedMessage id='workspace.header.title.text-right'/>}>
                        <Button type={textAlignment == Consts.TEXT_ALIGNMENT_RIGHT ? 'primary' : 'text'} size='small' icon={<AlignRightOutlined/>} onClick={() => handleTextAlignmentChanged(Consts.TEXT_ALIGNMENT_RIGHT)} />
                      </Tooltip>
                      <Divider type='vertical' style={{ margin: 0 }} />
                      <Tooltip title={<FormattedMessage id='workspace.header.title.text-top'/>}>
                        <Button type={textVerticalAlignment == Consts.PLACE_HOLDER_ALIGNMENT_TOP ? 'primary' : 'text'} size='small' icon={<VerticalAlignTopOutlined/>} onClick={() => handleTextVerticalAlignmentChanged(Consts.PLACE_HOLDER_ALIGNMENT_TOP)} />
                      </Tooltip>
                      <Tooltip title={<FormattedMessage id='workspace.header.title.text-middle'/>}>
                        <Button type={textVerticalAlignment == Consts.PLACE_HOLDER_ALIGNMENT_MIDDLE ? 'primary' : 'text'} size='small' icon={<VerticalAlignMiddleOutlined/>}  onClick={() => handleTextVerticalAlignmentChanged(Consts.PLACE_HOLDER_ALIGNMENT_MIDDLE)} />
                      </Tooltip>
                      <Tooltip title={<FormattedMessage id='workspace.header.title.text-bottom'/>}>
                        <Button type={textVerticalAlignment == Consts.PLACE_HOLDER_ALIGNMENT_BOTTOM ? 'primary' : 'text'} size='small' icon={<VerticalAlignBottomOutlined/>} onClick={() => handleTextVerticalAlignmentChanged(Consts.PLACE_HOLDER_ALIGNMENT_BOTTOM)} />
                      </Tooltip>
                      <Divider type='vertical' style={{ margin: 0 }} />
                      <Tooltip title={<FormattedMessage id='workspace.header.title.font-size'/>}>
                        <InputNumber min={Consts.FONT_SIZE_MIN} max={Consts.FONT_SIZE_MAX} value={fontSize} 
                          ref={(node) => {setFontSizeNode(node)}} 
                          onChange={handleFontSizeChange}  onStep={handleFontSizeStepChange} onBlur={handleFontSizeBlur} onPressEnter={handleFontSizePressEnter} size='small' style={{ width: 60 }} />
                      </Tooltip>
                      <Tooltip title={<FormattedMessage id='workspace.header.title.font-color'/>}>
                        <ColorPicker size='small' value={fontColor} onChange={handleFontColorChange} />
                      </Tooltip>
                    </Space>
                  </FloatButton.Group>
                  <FloatButton.Group style={{left: tableToolbarLeft, top: tableToolbarTop - 40, height: 32, display: tableToolbarVisible ? 'block' : 'none'}}>                  
                    <Space direction='horizontal' style={{backgroundColor: 'white', borderColor: 'silver', borderWidth: 1, borderStyle: 'solid', padding: 2}}>
                      <Tooltip title={<FormattedMessage id='workspace.header.title.font-bold'/>}>
                        <Button type='text' size='small' icon={<InsertRowAboveOutlined/>}  onClick={handleBoldChanged} />
                        </Tooltip>
                      <Tooltip title={<FormattedMessage id='workspace.header.title.font-italic'/>}>
                        <Button type='text' size='small' icon={<InsertRowBelowOutlined/>} onClick={handleItalicChanged} />
                        </Tooltip>
                      <Tooltip title={<FormattedMessage id='workspace.header.title.font-underline'/>}>
                        <Button type='text' size='small' icon={<InsertRowLeftOutlined/>} onClick={handleUnderlineChanged} />
                      </Tooltip>
                      <Tooltip title={<FormattedMessage id='workspace.header.title.font-underline'/>}>
                        <Button type='text' size='small' icon={<InsertRowRightOutlined/>} onClick={handleUnderlineChanged} />
                      </Tooltip>
                      <Divider type='vertical' style={{ margin: 0 }} />
                      <Tooltip title={<FormattedMessage id='workspace.header.title.text-left'/>}>
                        <Button type='text' size='small' icon={<DeleteRowOutlined/>} onClick={() => handleTextAlignmentChanged(Consts.TEXT_ALIGNMENT_LEFT)} />
                      </Tooltip>
                      <Tooltip title={<FormattedMessage id='workspace.header.title.text-center'/>}>
                        <Button type='text' size='small' icon={<DeleteColumnOutlined/>} onClick={() => handleTextAlignmentChanged(Consts.TEXT_ALIGNMENT_CENTER)} />
                      </Tooltip>
                    </Space>
                  </FloatButton.Group>
                </div>
              </Dropdown>
              <div style={{ width: Editor.SHADOW_SIZE, height: '100%', float: 'left', backgroundColor: 'lightgray', }} />
            </div>
            <div style={{ width: '100%', height: Editor.SHADOW_SIZE, backgroundColor: 'lightgray', }} />
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: `${Utils.TITLE_HEIGHT}px`, zIndex: 1, }} >
        <Tabs type='editable-card' size='small' tabPosition='bottom' onChange={onChange} activeKey={activeKey} onEdit = {onEdit} >
          {
            panes.map(pane => (
              <TabPane tab={pane.title} key={pane.key} />
            ))
          }
        </Tabs>
      </div>
      <div >
          <Input id='sandbox'/>
      </div>
    </div>
  )
}

export default Content