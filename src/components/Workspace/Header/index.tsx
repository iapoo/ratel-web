import React, { useEffect, useState, useRef, FC } from 'react'
import styles from './index.css'
import { Form, Input, Checkbox, Row, Col, Button, Modal, Menu, Space, Tooltip, Dropdown, Divider, Select, InputNumber, ColorPicker, message, } from 'antd'
import type { MenuProps } from 'antd';
import { Consts, RequestUtils, SystemUtils, Utils, } from '../Utils'
import { setInterval } from 'timers'
import { UserInfo } from '../Utils/RequestUtils'
import LoginFormWindow from './LoginFormWindow'
import NewFileWindow from './NewFileWindow';
import { CheckOutlined, DownloadOutlined, FileAddOutlined, FileOutlined, FileTextOutlined, FolderOpenOutlined, FormOutlined, RedoOutlined, SaveOutlined, SearchOutlined, SolutionOutlined, UndoOutlined } from '@ant-design/icons';
import OpenFileWindow from './OpenFileWindow';
import { StorageService } from '../Storage';
import { Rectangle } from '@/components/Resource/LargeIcons';
import { EngineUtils, Font, GraphicsUtils, TextShape } from '@/components/Engine';
import { Editor, EditorEvent } from '@/components/Rockie/Editor';
import { useIntl, setLocale, getLocale, FormattedMessage, } from 'umi';
import { PlaceHolder, } from '@/components/Resource/Icons'
import { OperationType } from '@/components/Rockie/Operations';
import { Item, ShapeEntity } from '@/components/Rockie/Items';

interface HeaderProps {
  previousEditor: Editor | undefined
  currentEditor: Editor | undefined
}

const Header: FC<HeaderProps> = ({
  previousEditor, currentEditor
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const intl = useIntl();

  const DOCUMENT_MODIFIED_TEXT_NO = intl.formatMessage({ id: 'workspace.header.document-modified-text-no', });
  const DOCUMENT_MODIFIED_TEXT_YES = intl.formatMessage({ id: 'workspace.header.document-modified-text-yes', });
  const DOCUMENT_NEW_NAME_PREFIX = 'Untitled'

  const ON_LOGIN_SAVE = 'Save'
  const ON_LOGIN_OPEN = 'Open'
  const ON_LOGIN_NONE = 'None'

  const [initialized, setInitialized,] = useState<boolean>(false)
  const [online, setOnline,] = useState<boolean>(false)
  const [userInfo, setUserInfo,] = useState<UserInfo | null>(null)
  const [documentModifiedText, setDocumentModifiedText] = useState<string>(DOCUMENT_MODIFIED_TEXT_NO)
  const [loginFormWindowVisible, setLoginFormWindowVisible,] = useState<boolean>(false)
  const [newFileWindowVisible, setNewFileWindowVisible,] = useState<boolean>(false)
  const [openFileWindowVisible, setOpenFileWindowVisible,] = useState<boolean>(false)
  const [selectedDocumentName, setSelectedDocumentName,] = useState<string>(DOCUMENT_NEW_NAME_PREFIX)
  const [selectedFolderId, setSelectedFolderId,] = useState<number | null>(null)
  const [selectedDocumentId, setSelectedDocumentId,] = useState<number | null>(null);
  const [discardModifiedDocumentWindowVisible, setDiscardModifiedDocumentWindowVisible,] = useState<boolean>(false)
  const [newDocumentIndex, setNewDocumentIndex,] = useState<number>(0)
  const [disableFileName, setDisableFileName,] = useState<boolean>(false)
  const [onLoginFormWindowOk, setOnLoginFormWindowOk,] = useState<string>(ON_LOGIN_NONE)
  const [fillColor, setFillColor,] = useState<string>(Consts.COLOR_FILL_DEFAULT)
  const [strokeColor, setStrokeColor,] = useState<string>(Consts.COLOR_STROKE_DEFAULT)
  const [lineWidth, setLineWidth,] = useState<number>(Consts.LINE_WIDTH_DEFAULT)
  const [zoom, setZoom,] = useState<number>(Consts.ZOOM_DEFAULT)
  const [fontSize, setFontSize,] = useState<number>(Consts.FONT_SIZE_DEFAULT)
  const [fontColor, setFontColor, ] = useState<string>(Consts.COLOR_FONT_DEFAULT)
  const [selectionValid, setSelectionValid,] = useState<boolean>(false)
  const [editorUndoable, setEditorUndoable,] = useState<boolean>(false)
  const [editorRedoable, setEditorRedoable,] = useState<boolean>(false)

  useEffect(() => {
    if (!initialized) {
      initialize()
    }
    refresh()
  })

  const initialize = () => {
    setInitialized(true)
    refreshNewDocumentName()
    const timer = setInterval(async () => {
      if (Utils.checkIfModified) {
        Utils.checkIfModified(false)
      }
      let modifiedText = DOCUMENT_MODIFIED_TEXT_NO
      if (Utils.isModified) {
        modifiedText = DOCUMENT_MODIFIED_TEXT_YES
      }
      setDocumentModifiedText(modifiedText)
      const onlineResult = await RequestUtils.isOnline()
      setOnline(onlineResult)
      setUserInfo(RequestUtils.userInfo)
    }, 2000)

    return () => {
      clearInterval(timer)
    }
  }

  const refresh = () => {
    if (previousEditor) {
      previousEditor.removeSelectionChange(handleSelectionChange)
      previousEditor.removeOperationChange(handleOperationChange)
    }
    if (currentEditor) {
      refreshSelectionInfo(currentEditor)
      refreshOperationInfos()
      currentEditor.onSelectionChange(handleSelectionChange)
      currentEditor.onOperationChange(handleOperationChange)
      if (currentEditor.selectionLayer.getEditorItemCount() > 0) {
        setSelectionValid(true)
      } else {
        setSelectionValid(false)
      }

    } else {
      initializeSelectionInfo()
    }
  }

  const refreshSelectionInfo = (editor: Editor) => {
    if (editor.selectionLayer.getEditorItemCount() > 0) {
      let editorItem = editor.selectionLayer.getEditorItem(0)
      let shape = editorItem.shape
      setZoom(editor.zoom)
      setFontSize(editorItem.fontSize)
      setLineWidth(editorItem.lineWidth)
      let fillColorValue = SystemUtils.generateColorString(editorItem.fillColor)
      setFillColor(fillColorValue.substring(0, 7))
      let strokeColorValue = SystemUtils.generateColorString(editorItem.strokeColor)
      setStrokeColor(strokeColorValue.substring(0, 7))
      console.log(`${fillColorValue.substring(0, 7)}   ${strokeColorValue.substring(0, 7)}`)
      let fontColorValue = SystemUtils.generateColorString(editorItem.fontColor)
      setFontColor(fontColorValue.substring(0, 7))
      //setFontColor(shape.fontPaint.getColor)
    } else {
      initializeSelectionInfo()
    }
  }

  const initializeSelectionInfo = () => {
    setZoom(Consts.ZOOM_DEFAULT)
    setFontSize(Consts.FONT_SIZE_DEFAULT)
    setLineWidth(Consts.LINE_WIDTH_DEFAULT)
    setFillColor(Consts.COLOR_FILL_DEFAULT)
    setStrokeColor(Consts.COLOR_STROKE_DEFAULT)
    setFontColor(Consts.COLOR_FONT_DEFAULT)
  }

  const handleSelectionChange = (e: EditorEvent) => {
    refreshSelectionInfo(e.source)
    if (e.source.selectionLayer.getEditorItemCount() > 0) {
      setSelectionValid(true)
    } else {
      setSelectionValid(false)
    }
  }

  const handleOperationChange = (e: EditorEvent) => {
    refreshOperationInfos()
  }

  const refreshOperationInfos = () => {
    setEditorUndoable(currentEditor ? currentEditor.undoable : false)
    setEditorRedoable(currentEditor ? currentEditor.redoable : false)
  }

  const refreshNewDocumentName = () => {
    let newIndex = newDocumentIndex + 1
    setNewDocumentIndex(newIndex)
    setSelectedDocumentName(DOCUMENT_NEW_NAME_PREFIX + newIndex)
  }

  const login = (onLogin: string) => {
    setOnLoginFormWindowOk(onLogin)
    setLoginFormWindowVisible(!loginFormWindowVisible)
  }

  const handleLoginFormWindowCancel = () => {
    setLoginFormWindowVisible(false)
  }

  const handleLoginFormWindowOk = () => {
    setLoginFormWindowVisible(false)
    console.log(onLoginFormWindowOk)
    console.log(setOnLoginFormWindowOk)
    switch (onLoginFormWindowOk) {
      case ON_LOGIN_SAVE:
        doHandleFileSave()
        break;
      case ON_LOGIN_OPEN:
        doHandleFileOpen()
        break;
      case ON_LOGIN_NONE:
      default:
        break;
    }
  }

  const handleNewFileWindowCancel = () => {
    setNewFileWindowVisible(false)
  }
  const handleNewFileWindowOk = () => {
    setNewFileWindowVisible(false)
    const storage = new StorageService()
    storage.editors = Utils.editors
    storage.loadNewDocument()
    Utils.storageData = storage.storageData
    if (Utils.loadData) {
      Utils.loadData()
    }
    refreshNewDocumentName()
  }

  const handleOpenFileWindowCancel = () => {
    setOpenFileWindowVisible(false)
  }

  const handleOpenFileWindowOk = (documentId: number, documentName: string | null, folderId: number | null) => {
    if (disableFileName) { // Save File, will do in popup window
      if (documentName != null) {
        setOpenFileWindowVisible(false)
        setSelectedDocumentId(documentId)
        setSelectedDocumentName(documentName)
        setSelectedFolderId(folderId)
      } else {
        messageApi.error(intl.formatMessage({ id: 'workspace.header.message-invalid-document-name' }))
      }
    } else { // Open File
      if (documentId == null) {
        messageApi.error(intl.formatMessage({ id: 'workspace.header.message-invalid-document-id' }))
        return
      }
      const fetchDocumentData = async () => {
        const documentData = await RequestUtils.loadDocument(documentId)
        if (documentData.data?.success) {
          console.log(`Load document successfully: documentId = ${documentId}`)
          let content = documentData.data.data.content.content
          const storage = new StorageService()
          storage.editors = Utils.editors
          storage.loadDocument(content)
          Utils.storageData = storage.storageData
          if (Utils.loadData) {
            Utils.loadData()
          }
          if (Utils.checkIfModified) {
            Utils.checkIfModified(false)
          }
          setSelectedDocumentId(documentId)
          setSelectedFolderId(documentData.data.data.folderId)
          setSelectedDocumentName(documentData.data.data.documentName)
        } else {
          console.log(`Load document failed: documentId = ${documentId}`)
        }
        setOpenFileWindowVisible(false)
      }
      fetchDocumentData()
    }
  }

  const logout = () => {
    RequestUtils.logout()
  }

  const handleUpdateDocumentName = (e: any) => {
    if (e.target.value) {
      setSelectedDocumentName(e.target.value)
    }
  }

  const handleFileNew = () => {
    if (Utils.checkIfModified) {
      Utils.checkIfModified(false)
    }
    if (Utils.isModified) {
      setDiscardModifiedDocumentWindowVisible(true)
    } else {
      setNewFileWindowVisible(!newFileWindowVisible)
    }
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
        refreshOperationInfos()
      }
    }
  }

  const removeEditor = (editor: Editor) => {

  }
  

  const handleRedo = () => {
    if (currentEditor) {
      currentEditor.redo()
      refreshOperationInfos()
    }
  }

  const handleFileOpen = () => {
    if (online) {
      doHandleFileOpen()
    } else {
      login(ON_LOGIN_OPEN)
    }
  }

  const doHandleFileOpen = () => {
    setOpenFileWindowVisible(!openFileWindowVisible)
    setDisableFileName(false)
  }

  const handleFileSave = () => {
    if (online) {
      doHandleFileSave()
    } else {
      login(ON_LOGIN_SAVE)
    }
  }

  const doHandleFileSave = () => {
    if (!selectedDocumentId) {
      setOpenFileWindowVisible(!openFileWindowVisible)
      setDisableFileName(true)
      if (Utils.checkIfModified) {
        Utils.checkIfModified(false)
      }
    } else {
      const storage = new StorageService()
      storage.editors = Utils.editors
      storage.save()
      const documentData = storage.storageData
      const documentContent = JSON.stringify(documentData)
      console.log(documentContent)
      const saveDocumentData = async () => {
        let documentData = null
        documentData = await RequestUtils.updateDocument(selectedDocumentId, selectedDocumentName, documentContent, selectedFolderId)
        if (documentData.data?.success) {
          console.log('Save document wwith data: ', documentData.data.data)
          Utils.editors.forEach(editor => {
            editor.resetModified()
          })
        } else {
          console.log('Save document with error: ', documentData.data)
          alert(`${intl.formatMessage({ id: 'workspace.header.alert-failed-ave-document' })} ${documentData.data.message}`)
        }
      }
      saveDocumentData()
    }
  }

  const handleExport = () => {
    if (Utils.currentEditor) {
      const data = Utils.currentEditor.export()
      SystemUtils.generateDownloadFile(data, 'test.png')
    }
  }

  const confirmDiscardModifiedDocument = () => {
    setDiscardModifiedDocumentWindowVisible(false)
    if (online) {
      setNewFileWindowVisible(!newFileWindowVisible)
    } else {
      login(ON_LOGIN_NONE)
    }
  }

  const cancelDiscardModifiedDocument = () => {
    setDiscardModifiedDocumentWindowVisible(false)
  }

  const handlePropertyEditorChange = () => {
    Utils.enablePropertyEditor = !Utils.enablePropertyEditor
  }

  const handleZoom = (value: number) => {
    setZoom(value)
    if (Utils.currentEditor) {
      Utils.currentEditor.zoom = value
    }
    if (Utils.onEditorSizeChanged) {
      Utils.onEditorSizeChanged()
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

  const handleLineWidthChange = (value: number | null) => {
    if (value != null) {
      setLineWidth(value)
      if (Utils.currentEditor) {
        let editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
        editorItems.forEach(editorItem => {
          editorItem.lineWidth = value
          //let shape = editorItem.shape
          //let stroke = shape.stroke
          //stroke.setStrokeWidth(value)
          //shape.font = new Font(EngineUtils.FONT_NAME_DEFAULT, value)
          //shape.markDirty()        
        })
      }
    }
  }

  const handleFillColorChange = (value: any) => {
    setFillColor(value)
    if (Utils.currentEditor) {
      let editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      editorItems.forEach(editorItem => {
        let color = SystemUtils.parseColorString(value.toHexString())
        if(color) {
          editorItem.fillColor = color
        }
      })
    }
  }

  const handleStrokeColorChange = (value: any) => {
    setStrokeColor(value)
    if (Utils.currentEditor) {
      let editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      editorItems.forEach(editorItem => {
        let color = SystemUtils.parseColorString(value.toHexString())
        if(color) {
          editorItem.strokeColor = color
        }
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

  const handleLocale = (locale: string) => {
    setLocale(locale, false)
    messageApi.info(intl.formatMessage({ id: 'workspace.header.message-apply-locale' }))
  }

  const fileItems: MenuProps['items'] = [
    { key: 'New', label: <FormattedMessage id='workspace.header.menu-file-new' />, icon: <FileAddOutlined />, onClick: handleFileNew },
    { key: 'OpenFrom', label: <FormattedMessage id='workspace.header.menu-file-open-from' />, disabled: true, icon: <FolderOpenOutlined />, },
    { key: 'Open', label: <FormattedMessage id='workspace.header.menu-file-open' />, icon: <FolderOpenOutlined />, onClick: handleFileOpen, },
    { key: 'Save', label: <FormattedMessage id='workspace.header.menu-file-save' />, icon: <SaveOutlined />, onClick: handleFileSave },
    { key: 'Export', label: <FormattedMessage id='workspace.header.menu-file-export' />, icon: <DownloadOutlined />, onClick: handleExport },
  ];

  const editItems: MenuProps['items'] = [
    { key: 'New', label: 'New', },
    { key: 'OpenFrom', label: 'OpenFrom', },
    { key: 'Open', label: 'Open', },
    { key: 'Save', label: 'Save', },
    { key: 'SaveAs', label: 'SaveAs', },
    { key: 'Export', label: 'Export', },
  ];

  const viewItems: MenuProps['items'] = [
    { key: 'New', label: 'New', },
    { key: 'OpenFrom', label: 'OpenFrom', },
    { key: 'Open', label: 'Open', },
    { key: 'Save', label: 'Save', },
    { key: 'SaveAs', label: 'SaveAs', },
    { key: 'Export', label: 'Export', },
  ];

  const operationItems: MenuProps['items'] = [
    { key: 'New', label: 'New', },
    { key: 'OpenFrom', label: 'OpenFrom', },
    { key: 'Open', label: 'Open', },
    { key: 'Save', label: 'Save', },
    { key: 'SaveAs', label: 'SaveAs', },
    { key: 'Export', label: 'Export', },
  ];

  const optionItems: MenuProps['items'] = [
    {
      key: 'Language', label: 'Language', children: [
        { key: 'zh-CN', label: '中文', onClick: () => handleLocale('zh-CN'), icon: getLocale() == 'zh-CN' ? <CheckOutlined /> : <PlaceHolder />, },
        { key: 'en-US', label: 'English(US)', onClick: () => handleLocale('en-US'), icon: getLocale() == 'en-US' ? <CheckOutlined /> : <PlaceHolder />, },
      ]
    },
    { key: 'OpenFrom', label: 'OpenFrom', },
    { key: 'Open', label: 'Open', },
    { key: 'Save', label: 'Save', },
    { key: 'SaveAs', label: 'SaveAs', },
    { key: 'Export', label: 'Export', },
  ];

  const helpItems: MenuProps['items'] = [
    { key: 'New', label: 'New', },
    { key: 'OpenFrom', label: 'OpenFrom', },
    { key: 'Open', label: 'Open', },
    { key: 'Save', label: 'Save', },
    { key: 'SaveAs', label: 'SaveAs', },
    { key: 'Export', label: 'Export', },
  ];

  return (
    <div style={{ position: 'absolute', top: '0px', height: `${Utils.HEADER_HEIGHT}px`, width: '100%' }}>
      {contextHolder}
      <div style={{ width: '100%', height: '50%', borderBottomStyle: 'inset', borderBottomWidth: '1px' }}>
        <div style={{ width: '100%', height: '100%', float: 'left', display: 'table' }}>
          <Space direction="horizontal" style={{ display: 'table-cell', verticalAlign: 'middle' }}>
            <Space wrap>
              <Dropdown menu={{ items: fileItems }}>
                <Button type='text' size='small'><FormattedMessage id='workspace.header.menu-file' /></Button>
              </Dropdown>
              <Dropdown menu={{ items: editItems }}>
                <Button type='text' size='small'><FormattedMessage id='workspace.header.menu-edit' /></Button>
              </Dropdown>
              <Dropdown menu={{ items: viewItems }}>
                <Button type='text' size='small'><FormattedMessage id='workspace.header.menu-view' /></Button>
              </Dropdown>
              <Dropdown menu={{ items: operationItems }}>
                <Button type='text' size='small'><FormattedMessage id='workspace.header.menu-operation' /></Button>
              </Dropdown>
              <Dropdown menu={{ items: optionItems }}>
                <Button type='text' size='small'><FormattedMessage id='workspace.header.menu-option' /></Button>
              </Dropdown>
              <Dropdown menu={{ items: helpItems }}>
                <Button type='text' size='small'><FormattedMessage id='workspace.header.menu-help' /></Button>
              </Dropdown>
              <Button type='text' size='small' icon={<FileOutlined />} style={{ paddingLeft: '0px', fontSize: '11px', color: 'gray', fontStyle: 'italic', marginLeft: '24px' }}>{documentModifiedText}</Button>
              <FileTextOutlined />
              <Input placeholder='Document Name' type='text' value={selectedDocumentName} bordered={false} style={{ paddingLeft: '0px', paddingRight: '0px', width: '70px', fontWeight: 'bolder' }} onChange={handleUpdateDocumentName} />
            </Space>
          </Space>
        </div>
        <div style={{ position: 'absolute', height: '50%', width: '240px', right: '0px' }}>
          <div style={{ float: 'right', display: 'table', height: '100%', marginRight: '8px' }}>
            <div style={{ display: 'table-cell', verticalAlign: 'middle', }}>
              {online ? intl.formatMessage({ id: 'workspace.header.welcome' }) + ' ' + userInfo?.customerName + ' ' : " "}
              <Button type='primary' style={{ display: online ? 'inline' : 'none' }} onClick={logout}><FormattedMessage id='workspace.header.button-logout-title' /></Button>
              <Button type='primary' style={{ display: online ? 'none' : 'inline' }} hidden={!online} onClick={() => login(ON_LOGIN_NONE)}><FormattedMessage id='workspace.header.button-login-title' /></Button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: '100%', height: '50%', }}>
        <div style={{ float: 'left', height: '100%', display: 'table', marginLeft: '8px' }}>
          <Space direction="horizontal" style={{ display: 'table-cell', verticalAlign: 'middle' }}>
            <Space wrap>
            <Tooltip title={<FormattedMessage id='workspace.header.title.zoom'/>}>
              <Select style={{ width: 100 }} value={zoom} size='small' onChange={handleZoom}
                  options={[
                    { value: 0.25, label: '25%' },
                    { value: 0.5, label: '50%' },
                    { value: 0.75, label: '75%' },
                    { value: 1, label: '100%' },
                    { value: 1.25, label: '125%' },
                    { value: 1.5, label: '150%' },
                    { value: 2, label: '200%' },
                    { value: 3, label: '300%' },
                    { value: 4, label: '400%' },
                  ]}
                />
              </Tooltip>
              <Divider type='vertical' style={{ margin: 0 }} />
              <Tooltip title={<FormattedMessage id='workspace.header.title.undo'/>}>
                <Button shape="circle" type="text" size='small' icon={<UndoOutlined />} disabled={!editorUndoable} onClick={handleUndo} />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.redo'/>}>
                <Button shape="circle" type="text" size='small' icon={<RedoOutlined />} disabled={!editorRedoable} onClick={handleRedo} />
              </Tooltip>
              <Divider type='vertical' style={{ margin: 0 }} />
              <Tooltip title={<FormattedMessage id='workspace.header.title.redo'/>}>
                <InputNumber min={Consts.FONT_SIZE_MIN} max={Consts.FONT_SIZE_MAX} value={fontSize} onChange={handleFontSizeChange} size='small' style={{ width: 60 }} disabled={!selectionValid} />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.fill-color'/>}>
                <ColorPicker size='small' value={fillColor} onChange={handleFillColorChange} disabled={!selectionValid} />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.stroke-color'/>}>
                <ColorPicker size='small' value={strokeColor} onChange={handleStrokeColorChange} disabled={!selectionValid} />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.font-color'/>}>
                <ColorPicker size='small' value={fontColor} onChange={handleFontColorChange} disabled={!selectionValid} />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.line-width'/>}>
                <InputNumber min={Consts.LINE_WIDTH_MIN} max={Consts.LINE_WIDTH_MAX} value={lineWidth} onChange={handleLineWidthChange} size='small' style={{ width: 55 }} disabled={!selectionValid} />
              </Tooltip>
            </Space>
          </Space>
        </div>
        <div style={{ float: 'right', height: '100%', display: 'table', marginRight: '8px' }}>
          <Space direction="horizontal" style={{ display: 'table-cell', verticalAlign: 'middle' }}>
            <Space wrap>
              <Tooltip title="Property Editor">
                <Button shape="circle" type="text" icon={<Rectangle />} onClick={handlePropertyEditorChange} />
              </Tooltip>
            </Space>
          </Space>
        </div>
      </div>
      <LoginFormWindow visible={loginFormWindowVisible} x={60} y={60} onWindowCancel={handleLoginFormWindowCancel} onWindowOk={handleLoginFormWindowOk} />
      <NewFileWindow visible={newFileWindowVisible} x={60} y={60} onWindowCancel={handleNewFileWindowCancel} onWindowOk={handleNewFileWindowOk} />
      <OpenFileWindow visible={openFileWindowVisible} x={60} y={60} onWindowCancel={handleOpenFileWindowCancel} onWindowOk={handleOpenFileWindowOk} disableFileName={disableFileName} selectedFolderId={selectedFolderId} selectedDocumentId={selectedDocumentId} selectedDocumentName={selectedDocumentName} />
      <Modal title="Modal" centered open={discardModifiedDocumentWindowVisible} onOk={confirmDiscardModifiedDocument} onCancel={cancelDiscardModifiedDocument} okText="确认" cancelText="取消" >
        <p>File is modified, are you sure to discard your modification?</p>
      </Modal>
    </div>
  )
}


export default Header