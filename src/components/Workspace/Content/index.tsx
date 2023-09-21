/* eslint-disable radix */
/* eslint-disable @typescript-eslint/prefer-for-of */
import React, { useEffect, useState, useRef, } from 'react'
import styles from './index.css'
import Workspace from '@/components/Workspace'
import { Button, Tabs, } from 'antd'
import { Utils, } from '../Utils'
import { Editor, } from '../../Rockie/Editor'
import { ShapeAction, } from '../../Rockie/Actions'
import View from '../View'

import { Engine, Rectangle2D, EngineUtils, Line2D, } from '../../Engine'
import { Util, } from '@antv/g-math'
import { StorageService, } from '../Storage'

interface Pane {
  title: string,
  content: string,
  key: string,
  editor: Editor | null
}

const { TabPane, } = Tabs
const DOCUMENT_PREFIX = 'File '
const DOCUMENT_CONTENT = 'Dummy'
const DEFAULT_PAINTER_WIDTH = 800
const DEFAULT_PAINTER_HEIGHT = 600

const initialPanes: Pane[] = [
  { title: DOCUMENT_PREFIX + '1', content: DOCUMENT_CONTENT, key: '1', editor: null, },
  { title: DOCUMENT_PREFIX + '2', content: DOCUMENT_CONTENT, key: '2', editor: null, },
  { title: DOCUMENT_PREFIX + '3', content: DOCUMENT_CONTENT, key: '3', editor: null, },
]

export default (props: any) => {
  const [ initialized, setInitialized, ] = useState<boolean>(false)
  const [ activeKey, setActiveKey, ] = useState(initialPanes[0].key)
  const [ panes, setPanes, ] = useState(initialPanes)
  const [ viewWidth, setViewWidth, ] = useState<number>(300)
  const [ viewHeight, setViewHeight, ] = useState<number>(300)
  const [ contentWidth, setContentWidth, ] = useState<string>(DEFAULT_PAINTER_WIDTH + 'px')
  const [ contentHeight, setContentHeight, ] = useState<string>(DEFAULT_PAINTER_HEIGHT + 'px')
  const [ editorWidth, setEditorWidth, ] = useState<string>(DEFAULT_PAINTER_WIDTH + 'px')
  const [ editorHeight, setEditorHeight, ] = useState<string>(DEFAULT_PAINTER_HEIGHT + 'px')
  const [ documentModified, setdocumentModified, ] = useState<boolean>(false)

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
    }
    const container = document.getElementById('editor-container')
    const editor = panes[0].editor
    const canvas = editor?.container
    container?.append(canvas!)
    editor?.activate()
    Utils.currentEditor = editor!
    updateEditors(panes)
    Utils.onEditorSizeChanged = updateEditorSize
    Utils.loadData = loadData
    Utils.checkIfModified = checkIfDocumentModified
    updateEditorSize()
    checkIfDocumentModified(false)
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
    Utils.currentEditor = activeEditor!
    updateEditors(panes)
    checkIfDocumentModified(false)
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
        Utils.currentEditor = editor!
      }
    }
    updateEditors(panes)
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
    Utils.currentEditor = editor!
    updateEditors(panes)
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

  return (
    <div {...props}>
      <div style={{ position: 'absolute', width: '100%', height: `calc(100% - ${Utils.TITLE_HEIGHT}px + 16px) `, zIndex: 2, }} >
        <div style={{ width: '100%', height: '100%', overflow: 'scroll', display: 'grid', placeItems: 'center', }}>
          <div style={{ width: contentWidth, height: contentHeight, }}>
            <div style={{ width: '100%', height: Editor.SHADOW_SIZE, backgroundColor: 'lightgray', }} />
            <div style={{ width: '100%', height: editorHeight, boxSizing: 'border-box', }}>
              <div style={{ width: Editor.SHADOW_SIZE, height: '100%', float: 'left', backgroundColor: 'lightgray', }} />
              <div id='editor-container' style={{ width: editorWidth, height: '100%', float: 'left', backgroundColor: 'darkgray', }} />
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
