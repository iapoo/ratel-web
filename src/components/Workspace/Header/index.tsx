import React, { useEffect, useState, useRef, FC } from 'react'
import styles from './index.css'
import { Form, Input, Checkbox, Row, Col, Button, Modal, Menu, Space, Tooltip, Dropdown, Divider, Select, InputNumber, ColorPicker, message, } from 'antd'
import type { MenuProps } from 'antd';
import { ConnectorLineEndArrows, ConnectorLineModes, ConnectorLineStartArrows, ConnectorLineTypes, Consts, RequestUtils, StrokeDashStyles, SystemUtils, Utils, } from '../Utils'
import { setInterval } from 'timers'
import { UserInfo } from '../Utils/RequestUtils'
import LoginFormWindow from './LoginFormWindow'
import NewFileWindow from './NewFileWindow';
import { AlignCenterOutlined, AlignLeftOutlined, AlignRightOutlined, BoldOutlined, CheckOutlined, DownloadOutlined, FileAddOutlined, FileOutlined, FileTextOutlined, FolderOpenOutlined, FormOutlined, ItalicOutlined, RedoOutlined, SaveOutlined, SearchOutlined, SettingOutlined, SolutionOutlined, UnderlineOutlined, UndoOutlined, VerticalAlignBottomOutlined, VerticalAlignMiddleOutlined, VerticalAlignTopOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import OpenFileWindow from './OpenFileWindow';
import { StorageService } from '../Storage';
import { Rectangle } from '@/components/Resource/LargeIcons';
import { EngineUtils, Font, FontSlant, FontWeight, GraphicsUtils, Matrix, Point2, TextDecoration, TextShape } from '@/components/Engine';
import { Editor, EditorEvent } from '@/components/Rockie/Editor';
import { useIntl, setLocale, getLocale, FormattedMessage, } from 'umi';
import { Placeholder, } from '@/components/Resource/Icons'
import { OperationType } from '@/components/Rockie/Operations';
import { Connector, ContainerEntity, ContainerTypes, Item, ShapeEntity, ShapeTypes, TableEntity } from '@/components/Rockie/Items';
import { ShapeAction } from '@/components/Rockie/Actions';
import { ConnectorArrowTypes } from '@/components/Rockie/Items/src/Connector';
import { ConnectorDirection } from '@/components/Rockie/Shapes';

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
  const [zoom, setZoom,] = useState<number>(currentEditor? currentEditor.zoom : Consts.ZOOM_DEFAULT)
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
  const [selectionValid, setSelectionValid,] = useState<boolean>(false)
  const [editorUndoable, setEditorUndoable,] = useState<boolean>(false)
  const [editorRedoable, setEditorRedoable,] = useState<boolean>(false)
  const [fontSizeNode, setFontSizeNode, ] = useState<any>(null)
  const [ strokeDashStyle, setStrokeDashStyle, ] = useState<string>(Consts.STROKE_DASH_STYLE_SOLID)
  const [ connectorLineType, setConnectorLineType, ] = useState<string>(Consts.CONNECTOR_LINE_TYPE_STRAIGHT)
  const [ connectorLineMode, setConnectorLineMode, ] = useState<string>(Consts.CONNECTOR_LINE_MODE_SIGNLE)
  const [ connectorLineStartArrow, setConnectorLineStartArrow, ] = useState<string>(ConnectorArrowTypes[0].name)
  const [ connectorLineEndArrow, setConnectorLineEndArrow, ] = useState<string>(ConnectorArrowTypes[0].name)
  const [ connectorSelected, setConnectorSelected, ] = useState<boolean>(false)

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
      previousEditor.removeTextEditStyleChange(handleTextEditStyleChange)
    }
    if (currentEditor) {
      refreshSelectionInfo(currentEditor)
      refreshOperationInfos()
      currentEditor.onSelectionChange(handleSelectionChange)
      currentEditor.onOperationChange(handleOperationChange)
      currentEditor.onTextEditStyleChange(handleTextEditStyleChange)
      if (currentEditor.selectionLayer.getEditorItemCount() > 0) {
        setSelectionValid(true)
      } else {
        setSelectionValid(false)
      }
      let connectorSelected = true
      if (currentEditor.selectionLayer.getEditorItemCount() > 0) {
        currentEditor.selectionLayer.getAllEditorItems().forEach(editorItem => {
          if(!(editorItem instanceof Connector)) {
            connectorSelected = false          
          }
        })
      } else {
        connectorSelected = false
      }
      setConnectorSelected(connectorSelected)
    } else {
      initializeSelectionInfo()
    }
  }

  const refreshSelectionInfo = (editor: Editor) => {
    if (editor.selectionLayer.getEditorItemCount() > 0) {
      let editorItem = editor.selectionLayer.getEditorItem(0)
      if(editorItem instanceof TableEntity && editor.targetItem) {
        editorItem = editor.targetItem
      }
      //let shape = editorItem.shape
      setZoom(editor.zoom)
      setFontSize(editorItem.fontSize)
      setLineWidth(editorItem.lineWidth)
      let fillColorValue = SystemUtils.generateColorString(editorItem.fillColor)
      setFillColor(fillColorValue.substring(0, 7))
      let strokeColorValue = SystemUtils.generateColorString(editorItem.strokeColor)
      setStrokeColor(strokeColorValue.substring(0, 7))
      //console.log(`${fillColorValue.substring(0, 7)}   ${strokeColorValue.substring(0, 7)}`)
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
      let strokeDashStyleValue = SystemUtils.generateStrokeDashStyle(editorItem.strokeDashStyle)
      setStrokeDashStyle(strokeDashStyleValue)
      if(editorItem instanceof Connector) {
        const connectorTypeValue = SystemUtils.generateConnectorType(editorItem.connectorType)
        const connectorStartArrowType = SystemUtils.findConnectorArrowType(editorItem.startArrow.name)
        const connectorEndArrowType = SystemUtils.findConnectorArrowType(editorItem.endArrow.name)
        setConnectorLineType(connectorTypeValue)
        setConnectorLineStartArrow(connectorStartArrowType)
        setConnectorLineEndArrow(connectorEndArrowType)

      } else {
        setConnectorLineType(Consts.CONNECTOR_LINE_TYPE_ORTHOGONAL)
      }
      //let connectorLineTypeValue = SystemUtils.generateStrokeDashStyle(editorItem.strokeDashStyle)
      //setStrokeDashStyle(strokeDashStyleValue)
    } else {
      initializeSelectionInfo()
    }
  }

  const initializeSelectionInfo = () => {
    //console.log(`aa  ${Utils.currentEditor?.zoom}     ${zoom}`)
    if(Utils.currentEditor) {
      setZoom(Utils.currentEditor.zoom)
    } else {
      setZoom(Consts.ZOOM_DEFAULT)
    }
    setFontSize(Consts.FONT_SIZE_DEFAULT)
    setLineWidth(Consts.LINE_WIDTH_DEFAULT)
    setFillColor(Consts.COLOR_FILL_DEFAULT)
    setStrokeColor(Consts.COLOR_STROKE_DEFAULT)
    setFontColor(Consts.COLOR_FONT_DEFAULT)
    setStrokeDashStyle(Consts.STROKE_DASH_STYLE_SOLID)
    setConnectorLineStartArrow(ConnectorArrowTypes[0].name)
    setConnectorLineEndArrow(ConnectorArrowTypes[0].name)
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

  const handleTextEditStyleChange  = (e: EditorEvent) => {
    refreshSelectionInfo(e.source)
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


  const zoomOptions = [
    { value: 0.25, label: '25%' },
    { value: 0.5, label: '50%' },
    { value: 0.75, label: '75%' },
    { value: 1, label: '100%' },
    { value: 1.25, label: '125%' },
    { value: 1.5, label: '150%' },
    { value: 2, label: '200%' },
    { value: 3, label: '300%' },
    { value: 4, label: '400%' },
  ]

  const handleZoom = (value: number) => {
    setZoom(value)
    if (Utils.currentEditor) {
      Utils.currentEditor.zoom = value
    }
    if (Utils.updateEditorSize) {
      Utils.updateEditorSize()
    }
  }

  const handleZoomIn = () => {
    handleZoomChange(true)
  }

  const handleZoomOut = () => {
    handleZoomChange(false)
  }

  const handleZoomChange = (zoomIn: boolean) => {
    if (Utils.currentEditor) {
      let count = zoomOptions.length
      let zoomIndex = 0
      let update = false
      for (let index = 0; index < count; index++) {
        if (Utils.currentEditor.zoom == zoomOptions[index].value) {
          zoomIndex = index
        }
      }
      if (zoomIn) {
        if (zoomIndex < zoomOptions.length - 1) {
          zoomIndex++
          update = true
        }
      } else {
        if (zoomIndex > 0) {
          zoomIndex--
          update = true
        }
      }
      if(update) {
        setZoom(zoomOptions[zoomIndex].value)
        Utils.currentEditor.zoom = zoomOptions[zoomIndex].value
        if (Utils.updateEditorSize) {
          Utils.updateEditorSize()
        }
      }
    }
  }

  const handleFontSizeChange = (value: any) => {
    console.log('font size changed')
    setFontSize(value)
    if (Utils.currentEditor) {
      let editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      editorItems.forEach(editorItem => {
        if(editorItem instanceof TableEntity) {
          if(Utils.currentEditor?.targetItem) {
            Utils.currentEditor.targetItem.fontSize = value
          }
        } else {
          editorItem.fontSize = value
        }
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

  const handleLineWidthChange = (value: number | null) => {
    if (value != null) {
      setLineWidth(value)
      if (Utils.currentEditor) {
        let editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
        editorItems.forEach(editorItem => {
          if(editorItem instanceof TableEntity) {
            if(Utils.currentEditor?.targetItem) {
              Utils.currentEditor.targetItem.lineWidth = value
            }
          } else {
            editorItem.lineWidth = value
          }
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
      Utils.currentEditor.focus()
    }
  }

  const handleBoldChanged = () => {
    setFontBold(!fontBold)
    if(currentEditor) {
      let editorItems = currentEditor.selectionLayer.getAllEditorItems()
      editorItems.forEach(editorItem => {
        if(editorItem instanceof TableEntity) {
          if(Utils.currentEditor?.targetItem) {
            Utils.currentEditor.targetItem.fontWeight = fontBold ? FontWeight.NORMAL : FontWeight.BOLD
          }
        } else {
          editorItem.fontWeight = fontBold ? FontWeight.NORMAL : FontWeight.BOLD
        }
      })
      currentEditor.focus()
    }
    
  }

  const handleItalicChanged = () => {
    setFontItalic(!fontItalic)
    if(currentEditor) {
      let editorItems = currentEditor.selectionLayer.getAllEditorItems()
      editorItems.forEach(editorItem => {
        if(editorItem instanceof TableEntity) {
          if(Utils.currentEditor?.targetItem) {
            Utils.currentEditor.targetItem.fontSlant = fontItalic ? FontSlant.UP_RIGHT : FontSlant.ITALIC
          }
        } else {
          editorItem.fontSlant = fontItalic ? FontSlant.UP_RIGHT : FontSlant.ITALIC
        }
      })
      currentEditor.focus()
    }
  }

  const handleUnderlineChanged = () => {
    setFontUnderline(!fontUnderline)
    if(currentEditor) {
      let editorItems = currentEditor.selectionLayer.getAllEditorItems()
      editorItems.forEach(editorItem => {
        if(editorItem instanceof TableEntity) {
          if(Utils.currentEditor?.targetItem) {
            Utils.currentEditor.targetItem.textDecoration = fontUnderline ? TextDecoration.NONE : TextDecoration.UNDERLINE
          }
        } else {
          editorItem.textDecoration = fontUnderline ? TextDecoration.NONE : TextDecoration.UNDERLINE
        }
      })
      currentEditor.focus()
    }
  }

  const handleTextAlignmentChanged = (textAlignment: string) => {
    setTextAlignment(textAlignment)
    if(currentEditor) {
      let editorItems = currentEditor.selectionLayer.getAllEditorItems()
      editorItems.forEach(editorItem => {
        if(editorItem instanceof TableEntity) {
          if(Utils.currentEditor?.targetItem) {
            Utils.currentEditor.targetItem.textAlignment = SystemUtils.parseTextAlignment(textAlignment)
          }
        } else {
          editorItem.textAlignment = SystemUtils.parseTextAlignment(textAlignment)
        }
      })
      currentEditor.focus()
    }
  }

  const handleTextVerticalAlignmentChanged = (textVerticalAlignment: string) => {
    setTextVerticalAlignment(textVerticalAlignment)
    if(currentEditor) {
      let editorItems = currentEditor.selectionLayer.getAllEditorItems()
      editorItems.forEach(editorItem => {
        if(editorItem instanceof TableEntity) {
          if(Utils.currentEditor?.targetItem) {
            Utils.currentEditor.targetItem.textVerticalAlignment = SystemUtils.parseTextVerticalAligment(textVerticalAlignment)
          }
        } else {
          editorItem.textVerticalAlignment = SystemUtils.parseTextVerticalAligment(textVerticalAlignment)
        }
      })
      currentEditor.focus()
    }
  }

  const handleLocale = (locale: string) => {
    setLocale(locale, false)
    messageApi.info(intl.formatMessage({ id: 'workspace.header.message-apply-locale' }))
  }

  const handleStrokeDashStyleChange = (value: string) => {
    setStrokeDashStyle(value)
    if(currentEditor) {
      let editorItems = currentEditor.selectionLayer.getAllEditorItems()
      editorItems.forEach(editorItem => {
        let strokeDashStyle = SystemUtils.parseStrokeDashStyle(value)
        if(editorItem instanceof TableEntity) {
          if(Utils.currentEditor?.targetItem) {
            Utils.currentEditor.targetItem.strokeDashStyle = strokeDashStyle
          }
        } else {
          editorItem.strokeDashStyle = strokeDashStyle
        }
      })
    }
  }

  const handleConnectorLineTypeChange = (value: string) => {
    setConnectorLineType(value)
    if(currentEditor) {
      let editorItems = currentEditor.selectionLayer.getAllEditorItems()
      editorItems.forEach(editorItem => {
        if(editorItem instanceof Connector) {
          editorItem.connectorType = SystemUtils.parseConnectorType(value)
        }
      })
      currentEditor.focus()
      currentEditor.invalideHolder()
    }
  }

  const handleConnectorLineModeChange = (value: string) => {
    setConnectorLineMode(value)
  }

  const handleConnectorArrowStartTypeChange = (value: string) => {
    //console.log(`orig value = ${connectorLineStartArrow}`)
    setConnectorLineStartArrow(value)
    if(currentEditor) {
      let editorItems = currentEditor.selectionLayer.getAllEditorItems()
      editorItems.forEach(editorItem => {
        if(editorItem instanceof Connector) {
          ConnectorArrowTypes.forEach(connectorArrayType => {
            if(connectorArrayType.name == value) {
              const startArrow = SystemUtils.cloneConnectorLineArrowType(connectorArrayType)              
              editorItem.startArrow = startArrow
            }
          })
        }
      })
      currentEditor.focus()
      currentEditor.invalideHolder()
    }
  }

  const handleConnectorArrowEndTypeChange = (value: string) => {
    setConnectorLineEndArrow(value)
    if(currentEditor) {
      let editorItems = currentEditor.selectionLayer.getAllEditorItems()
      editorItems.forEach(editorItem => {
        if(editorItem instanceof Connector) {
          ConnectorArrowTypes.forEach(connectorArrayType => {
            if(connectorArrayType.name == value) {
              const endArrow = SystemUtils.cloneConnectorLineArrowType(connectorArrayType)  
              editorItem.endArrow = endArrow
            }
          })
        }
      })
      currentEditor.focus()
      currentEditor.invalideHolder()
    }
  }

  const strokeDashStyles = StrokeDashStyles.map(strokeDashStyle=> {
    return {value: strokeDashStyle.name, label: <img alt='intl.formatMessage({ id: strokeDashStyle.label})' src={'/images/line-' + strokeDashStyle.name.toLowerCase() + '.png'} width='64' height='24' />}
  })

  const connectorLineTypes = ConnectorLineTypes.map(connectorLineType=> {
    return {value: connectorLineType.name, label: <img alt='intl.formatMessage({ id: connectorLineType.label})' src={'/images/connector-line-type-' + connectorLineType.name.toLowerCase() + '.png'} width='16' height='16' />}
  })
 
  const connectorLineModes = ConnectorLineModes.map(connectorLineMode=> {
    return {value: connectorLineMode.name, label: <img alt='intl.formatMessage({ id: connectorLineMode.label})' src={'/images/connector-line-mode-' + connectorLineMode.name.toLowerCase() + '.png'} width='16' height='16' />}
  })
 
  const connectorLineStartArrows = ConnectorArrowTypes.map(connectorArrowType=> {
    return {value: connectorArrowType.name, label: <img alt={connectorArrowType.description} src={'/images/connector-line-start-arrow-' + connectorArrowType.name.toLowerCase() + '.png'} width='16' height='16' />}
  })

  const connectorLineEndArrows = ConnectorArrowTypes.map(connectorArrowType=> {
    return {value: connectorArrowType.name, label: <img alt={connectorArrowType.description} src={'/images/connector-line-end-arrow-' + connectorArrowType.name.toLowerCase() + '.png'} width='16' height='16' />}
  })

  const handleTestCode = () => {
    let matrix1 = new Matrix()
    let matrix2 = new Matrix()
    matrix1.translate(26, 29)
    matrix1.rotate(29, 26, 29)
    matrix1.translate(79,111)
    matrix1.rotate(19, 105, 140)
    matrix1.translate(59,131)
    matrix1.rotate(79, 164, 271)
    matrix2.translate(164,271)
    matrix2.rotate(127, 164, 271)
    console.log(`aa ${matrix1} ${matrix2}`)

  }

  const handleTest = () => {
    if(currentEditor) {
      let count = ContainerTypes.length
      for(let i = 0; i < count; i ++) {
        let shapeType = ContainerTypes[i]
        let margin = 5 //2
        let lineFactor = 1 //1
        let fontFactor = 1 //0.5
        let sizeFactor = 1 //0.25
        let modifierFactor = 1 //0.25
        currentEditor.contentLayer.removeAllEditorItems()
        let left = shapeType.left + margin
        if(shapeType.width < shapeType.height) {
          left = Math.round(shapeType.left + (shapeType.height - shapeType.width) * sizeFactor * 0.5) + margin
        }
        let shapeEntity = new ContainerEntity(left, shapeType.top + margin, shapeType.width * sizeFactor, shapeType.height * sizeFactor, {shapeType: shapeType.name})
        shapeEntity.lineWidth = shapeEntity.lineWidth * lineFactor
        shapeEntity.fontSize = shapeEntity.fontSize * fontFactor
        if(!shapeType.modifyInPercent) {
          shapeEntity.shape.modifier = new Point2(Math.round(shapeEntity.shape.modifier.x * modifierFactor), Math.round(shapeEntity.shape.modifier.y * modifierFactor))
        }
        if(shapeType.width < shapeType.height) {
          currentEditor.resize(shapeType.height * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        } else {
          currentEditor.resize(shapeType.width * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        }
        currentEditor.contentLayer.addEditorItem(shapeEntity)
        const data = currentEditor.export()
        SystemUtils.generateDownloadFile(data, `${shapeType.name}.png`)
      }
    }
  }


  const handleTest2 = () => {
    if(currentEditor) {
      let count = ShapeTypes.length
      for(let i = 0; i < count; i ++) {
        let shapeType = ShapeTypes[i]
        let margin = 5 //2
        let lineFactor = 1 //1
        let fontFactor = 1 //0.5
        let sizeFactor = 1 //0.25
        let modifierFactor = 1 //0.25
        currentEditor.contentLayer.removeAllEditorItems()
        let left = shapeType.left + margin
        if(shapeType.width < shapeType.height) {
          left = Math.round(shapeType.left + (shapeType.height - shapeType.width) * sizeFactor * 0.5) + margin
        }
        let shapeEntity = new ShapeEntity(left, shapeType.top + margin, shapeType.width * sizeFactor, shapeType.height * sizeFactor, {shapeType: shapeType.name})
        shapeEntity.lineWidth = shapeEntity.lineWidth * lineFactor
        shapeEntity.fontSize = shapeEntity.fontSize * fontFactor
        if(!shapeType.modifyInPercent) {
          shapeEntity.shape.modifier = new Point2(Math.round(shapeEntity.shape.modifier.x * modifierFactor), Math.round(shapeEntity.shape.modifier.y * modifierFactor))
        }
        if(shapeType.width < shapeType.height) {
          currentEditor.resize(shapeType.height * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        } else {
          currentEditor.resize(shapeType.width * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        }
        currentEditor.contentLayer.addEditorItem(shapeEntity)
        const data = currentEditor.export()
        SystemUtils.generateDownloadFile(data, `${shapeType.name}.png`)
      }
    }
  }

  const handleTest3 = () => {
    if(currentEditor) {
      let count = ConnectorArrowTypes.length
      let y = 16
      let x = 0
      for(let i = 0; i < count; i ++) {
        currentEditor.contentLayer.removeAllEditorItems()
        let connectorArrowType = ConnectorArrowTypes[i]
        let connector = new Connector(new Point2(x, y), new Point2(x + 32, y), ConnectorDirection.Right)
        connector.startArrow = connectorArrowType
        currentEditor.contentLayer.addEditorItem(connector)
        // y += 32
        // if(i > 0 && i % 15 == 0) {
        //   x += 64
        //   y = 16
        // }
        currentEditor.resize(32, 32)
        const data = currentEditor.export()
        console.log(`download file = connector-line-start-arrow-${connectorArrowType.name.toLowerCase()}.png`)
        SystemUtils.generateDownloadFile(data, `connector-line-start-arrow-${connectorArrowType.name.toLowerCase()}.png`)
      }
    }
  }

  const handleTest4 = () => {
    if(currentEditor) {
      let count = ConnectorArrowTypes.length
      let y = 16
      let x = 0
      for(let i = 0; i < count; i ++) {
        currentEditor.contentLayer.removeAllEditorItems()
        let connectorArrowType = ConnectorArrowTypes[i]
        let connector = new Connector(new Point2(x + 32, y), new Point2(x, y), ConnectorDirection.Left)
        connector.startArrow = connectorArrowType
        currentEditor.contentLayer.addEditorItem(connector)
        //y += 32
        //if(i > 0 && i % 15 == 0) {
        //  x += 64
        //  y = 16
        //}
        currentEditor.resize(32, 32)
        const data = currentEditor.export()
        console.log(`download file = connector-line-end-arrow-${connectorArrowType.name.toLowerCase()}.png`)
        SystemUtils.generateDownloadFile(data, `connector-line-end-arrow-${connectorArrowType.name.toLowerCase()}.png`)
      }
    }
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
        { key: 'zh-CN', label: '中文', onClick: () => handleLocale('zh-CN'), icon: getLocale() == 'zh-CN' ? <CheckOutlined /> : <Placeholder />, },
        { key: 'en-US', label: 'English(US)', onClick: () => handleLocale('en-US'), icon: getLocale() == 'en-US' ? <CheckOutlined /> : <Placeholder />, },
      ]
    },
    { key: 'OpenFrom', label: 'OpenFrom', },
    { key: 'Open', label: 'Open', },
    { key: 'Save', label: 'Save', },
    { key: 'SaveAs', label: 'SaveAs', onClick: handleTestCode },
    { key: 'Test Shapes', label: 'Test Shapes', onClick: handleTest, },
    { key: 'Test Start Arrows', label: 'Test Start Arrows', onClick: handleTest3, },
    { key: 'Test End Arrows', label: 'Test End Arrows', onClick: handleTest4, },
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
              <Select style={{ width: 100 }} value={zoom} size='small' onChange={handleZoom} bordered={false}
                  options={zoomOptions}
                />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.zoom-out'/>}>
                <Button type="text" size='small' icon={<ZoomInOutlined />} disabled={zoom >= zoomOptions[zoomOptions.length - 1].value}  onClick={handleZoomIn} />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.zoom-in'/>}>
                <Button type="text" size='small' icon={<ZoomOutOutlined />} disabled={zoom <= zoomOptions[0].value } onClick={handleZoomOut} />
              </Tooltip>
              <Divider type='vertical' style={{ margin: 0 }} />
              <Tooltip title={<FormattedMessage id='workspace.header.title.undo'/>}>
                <Button type="text" size='small' icon={<UndoOutlined />} disabled={!editorUndoable} onClick={handleUndo} />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.redo'/>}>
                <Button type="text" size='small' icon={<RedoOutlined />} disabled={!editorRedoable} onClick={handleRedo} />
              </Tooltip>
              <Divider type='vertical' style={{ margin: 0 }} />
              <Tooltip title={<FormattedMessage id='workspace.header.title.font-bold'/>}>
                <Button type={fontBold ? 'primary' : 'text'} size='small' icon={<BoldOutlined/>} disabled={!selectionValid} onClick={handleBoldChanged} />
                </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.font-italic'/>}>
                <Button type={fontItalic ? 'primary' : 'text'} size='small' icon={<ItalicOutlined/>} disabled={!selectionValid} onClick={handleItalicChanged} />
                </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.font-underline'/>}>
                <Button type={fontUnderline ? 'primary' : 'text'} size='small' icon={<UnderlineOutlined/>} disabled={!selectionValid} onClick={handleUnderlineChanged} />
              </Tooltip>
              <Divider type='vertical' style={{ margin: 0 }} />
              <Tooltip title={<FormattedMessage id='workspace.header.title.text-left'/>}>
                <Button type={textAlignment == Consts.TEXT_ALIGNMENT_LEFT ? 'primary' : 'text'} size='small' icon={<AlignLeftOutlined/>} disabled={!selectionValid} onClick={() => handleTextAlignmentChanged(Consts.TEXT_ALIGNMENT_LEFT)} />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.text-center'/>}>
                <Button type={textAlignment == Consts.TEXT_ALIGNMENT_CENTER ? 'primary' : 'text'} size='small' icon={<AlignCenterOutlined/>} disabled={!selectionValid} onClick={() => handleTextAlignmentChanged(Consts.TEXT_ALIGNMENT_CENTER)} />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.text-right'/>}>
                <Button type={textAlignment == Consts.TEXT_ALIGNMENT_RIGHT ? 'primary' : 'text'} size='small' icon={<AlignRightOutlined/>} disabled={!selectionValid} onClick={() => handleTextAlignmentChanged(Consts.TEXT_ALIGNMENT_RIGHT)} />
              </Tooltip>
              <Divider type='vertical' style={{ margin: 0 }} />
              <Tooltip title={<FormattedMessage id='workspace.header.title.text-top'/>}>
                <Button type={textVerticalAlignment == Consts.PLACE_HOLDER_ALIGNMENT_TOP ? 'primary' : 'text'} size='small' icon={<VerticalAlignTopOutlined/>} disabled={!selectionValid} onClick={() => handleTextVerticalAlignmentChanged(Consts.PLACE_HOLDER_ALIGNMENT_TOP)} />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.text-middle'/>}>
                <Button type={textVerticalAlignment == Consts.PLACE_HOLDER_ALIGNMENT_MIDDLE ? 'primary' : 'text'} size='small' icon={<VerticalAlignMiddleOutlined/>} disabled={!selectionValid} onClick={() => handleTextVerticalAlignmentChanged(Consts.PLACE_HOLDER_ALIGNMENT_MIDDLE)} />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.text-bottom'/>}>
                <Button type={textVerticalAlignment == Consts.PLACE_HOLDER_ALIGNMENT_BOTTOM ? 'primary' : 'text'} size='small' icon={<VerticalAlignBottomOutlined/>} disabled={!selectionValid} onClick={() => handleTextVerticalAlignmentChanged(Consts.PLACE_HOLDER_ALIGNMENT_BOTTOM)} />
              </Tooltip>
              <Divider type='vertical' style={{ margin: 0 }} />
              <Tooltip title={<FormattedMessage id='workspace.header.title.font-size'/>}>
                <InputNumber min={Consts.FONT_SIZE_MIN} max={Consts.FONT_SIZE_MAX} value={fontSize} 
                  ref={(node) => {setFontSizeNode(node)}} 
                  onChange={handleFontSizeChange}  onStep={handleFontSizeStepChange} onBlur={handleFontSizeBlur} onPressEnter={handleFontSizePressEnter} size='small' style={{ width: 60 }} disabled={!selectionValid} />
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
                <InputNumber min={Consts.LINE_WIDTH_MIN} max={Consts.LINE_WIDTH_MAX} value={lineWidth} onChange={handleLineWidthChange} size='small' style={{ width: 50 }} disabled={!selectionValid} />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.stroke-type'/>}>
                <Select size='small' value={strokeDashStyle} onChange={handleStrokeDashStyleChange} style={{width: 110 }} dropdownStyle={{width: 110}} options={strokeDashStyles} bordered={false} disabled={!selectionValid} />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.connector-line-type'/>}>
                <Select size='small' value={connectorLineType} onChange={handleConnectorLineTypeChange} style={{width: 56 }} disabled={!connectorSelected} options={connectorLineTypes} bordered={false}/>
              </Tooltip>
              {/** TODO:  */}
              <Tooltip title={<FormattedMessage id='workspace.header.title.connector-line-mode'/>}>
                <Select size='small' value={connectorLineMode} onChange={handleConnectorLineModeChange} style={{width: 56, display:'none' }} disabled={!connectorSelected} options={connectorLineModes} bordered={false}/>
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.connector-arrow-start-type'/>}>
                <Select size='small' value={connectorLineStartArrow} onChange={handleConnectorArrowStartTypeChange} style={{width: 56 }} disabled={!connectorSelected} options={connectorLineStartArrows} bordered={false}/>
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.connector-arrow-end-type'/>}>
              <Select size='small' value={connectorLineEndArrow} onChange={handleConnectorArrowEndTypeChange} style={{width: 56 }} disabled={!connectorSelected} options={connectorLineEndArrows} bordered={false}/>
              </Tooltip>
            </Space>
          </Space>
        </div>
        <div style={{ float: 'right', height: '100%', display: 'table', marginRight: '8px' }}>
          <Space direction="horizontal" style={{ display: 'table-cell', verticalAlign: 'middle' }}>
            <Space wrap>
              <Tooltip title="Property Editor">
                <Button shape="circle" type="text" icon={<SettingOutlined />} onClick={handlePropertyEditorChange} />
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