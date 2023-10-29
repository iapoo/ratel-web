/* eslint-disable radix */
/* eslint-disable @typescript-eslint/prefer-for-of */
import React, { useEffect, useState, useRef, FC, } from 'react'
import styles from './index.css'
import { Button, ColorPicker, Divider, FloatButton, InputNumber, Space, Tabs, Tooltip, theme, } from 'antd'
import { Consts, SystemUtils, Utils, } from '../Utils'
import { Editor, EditorEvent, } from '../../Rockie/Editor'

import { Engine, Rectangle2D, EngineUtils, Line2D, FontWeight, FontSlant, TextDecoration, } from '../../Engine'
import { StorageService, } from '../Storage'
import { Operation, OperationType } from '@/components/Rockie/Operations'
import { AlignCenterOutlined, AlignLeftOutlined, AlignRightOutlined, BoldOutlined, ItalicOutlined, QuestionCircleOutlined, UnderlineOutlined, VerticalAlignBottomOutlined, VerticalAlignMiddleOutlined, VerticalAlignTopOutlined } from '@ant-design/icons'
import { Item } from '@/components/Rockie/Items'
import { useIntl, setLocale, getLocale, FormattedMessage, } from 'umi';

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
  const [ toolbarLeft, setToolbarLeft, ] = useState<number>(0)
  const [ toolbarTop, setToolbarTop, ] = useState<number>(0)
  const [ toolbarVisible, setToolbarVisible,  ] = useState<boolean>(false)
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

  const newTabIndex = useRef(4)

  useEffect(() => {
    if (!initialized) {
      initialize()
    }

    // 根据浏览器窗口大小来调整各子div的滚动范围
    window.addEventListener('resize', calculateViewSize)
    // const timer = setInterval(() => {

    // }, 100)

    return () => {
      window.removeEventListener('resize', calculateViewSize)
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
    onEditorChange(oldEditor, Utils.currentEditor)
    updateEditors(panes)
    Utils.onEditorSizeChanged = updateEditorSize
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
    onEditorChange(oldEditor, Utils.currentEditor)
    updateEditors(panes)
    checkIfDocumentModified(false)
    oldEditor?.removeSelectionChange(handleSelectionChange)
    Utils.currentEditor.onSelectionChange(handleSelectionChange)
    oldEditor?.removeTextEditStart(handleTextEditStart)
    Utils.currentEditor.onTextEditStart(handleTextEditStart)
    oldEditor?.removeTextEditEnd(handleTextEditEnd)
    Utils.currentEditor.onTextEditEnd(handleTextEditEnd)
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
      }
    }
    updateEditors(panes)
  }

  const handleSelectionChange = (e: EditorEvent) => {
  }

  const handleTextEditStart = (e: EditorEvent) => {
    console.log(`handle text start`)
    if(Utils.currentEditor && e.source.selectionLayer.getEditorItemCount() == 1 ) {
      let item = e.source.selectionLayer.getEditorItem(0) as Item
      let container = document.getElementById('editor-container')
      let postion = getElementAbsolutePosition(container)
      let left = item.left
      let top = item.top
      let right = item.right
      let bottom = item.bottom
      setToolbarLeft(left + postion.left)
      setToolbarTop(top + postion.top)
      setToolbarVisible(true)

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
    setToolbarVisible(false)
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
    onEditorChange(oldEditor, Utils.currentEditor)
    updateEditors(panes)
    oldEditor?.removeSelectionChange(handleSelectionChange)
    Utils.currentEditor.onSelectionChange(handleSelectionChange)
    oldEditor?.removeTextEditStart(handleTextEditStart)
    Utils.currentEditor.onTextEditStart(handleTextEditStart)
    oldEditor?.removeTextEditEnd(handleTextEditEnd)
    Utils.currentEditor.onTextEditEnd(handleTextEditEnd)
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
    setFontSize(value)
    if (Utils.currentEditor) {
      let editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      editorItems.forEach(editorItem => {
        //let shape = editorItem.shape
        //shape.font = new Font(EngineUtils.FONT_NAME_DEFAULT, value)
        //shape.markDirty()
        editorItem.fontSize = value
      })
    }
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
    }
  }

  const handleBoldChanged = () => {
    setFontBold(!fontBold)
    if(Utils.currentEditor) {
      let editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      editorItems.forEach(editorItem => {
        editorItem.fontWeight = fontBold ? FontWeight.NORMAL : FontWeight.BOLD
      })
    }
  }

  const handleItalicChanged = () => {
    setFontItalic(!fontItalic)
    if(Utils.currentEditor) {
      let editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      editorItems.forEach(editorItem => {
        editorItem.fontSlant = fontItalic ? FontSlant.UP_RIGHT : FontSlant.ITALIC
      })
    }
  }

  const handleUnderlineChanged = () => {
    setFontUnderline(!fontUnderline)
    if(Utils.currentEditor) {
      let editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      editorItems.forEach(editorItem => {
        editorItem.textDecoration = fontUnderline ? TextDecoration.NONE : TextDecoration.UNDERLINE
      })
    }
  }

  const handleTextAlignmentChanged = (textAlignment: string) => {
    setTextAlignment(textAlignment)
    if(Utils.currentEditor) {
      let editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      editorItems.forEach(editorItem => {
        editorItem.textAlignment = SystemUtils.parseTextAlignment(textAlignment)
      })
    }
  }

  const handleTextVerticalAlignmentChanged = (textVerticalAlignment: string) => {
    setTextVerticalAlignment(textVerticalAlignment)
    if(Utils.currentEditor) {
      let editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      editorItems.forEach(editorItem => {
        editorItem.textVerticalAlignment = SystemUtils.parseTextVerticalAligment(textVerticalAlignment)
      })
    }
  }


  return (
    <div  style={{ position: 'absolute', top: '0px', bottom: '0px', left: x, right: y, backgroundColor: 'lightgray', }}>
      <div style={{ position: 'absolute', width: '100%', height: `calc(100% - ${Utils.TITLE_HEIGHT}px + 16px) `, zIndex: 2, }} >
        <div style={{ width: '100%', height: '100%', overflow: 'scroll', display: 'grid', placeItems: 'center', }}>
          <div style={{ width: contentWidth, height: contentHeight, }}>
            <div style={{ width: '100%', height: Editor.SHADOW_SIZE, backgroundColor: 'lightgray', }} />
            <div style={{ width: '100%', height: editorHeight, boxSizing: 'border-box', }}>
              <div style={{ width: Editor.SHADOW_SIZE, height: '100%', float: 'left', backgroundColor: 'lightgray', }} />
              <div id='editor-container' style={{ width: editorWidth, height: '100%', float: 'left', backgroundColor: 'darkgray', }} >                
                <FloatButton.Group style={{left: toolbarLeft, top: toolbarTop - 32, height: 32, display: toolbarVisible ? 'block' : 'none', zIndex: 99999 }}>                  
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
                      <InputNumber min={Consts.FONT_SIZE_MIN} max={Consts.FONT_SIZE_MAX} value={fontSize} onChange={handleFontSizeChange} size='small' style={{ width: 60 }} />
                    </Tooltip>
                    <Tooltip title={<FormattedMessage id='workspace.header.title.font-color'/>}>
                      <ColorPicker size='small' value={fontColor} onChange={handleFontColorChange} />
                    </Tooltip>
                  </Space>
                </FloatButton.Group>
              </div>
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
    </div>
  )
}

export default Content