import React, { useEffect, useState, useRef, FC } from 'react'
import styles from './index.css'
import { Form, Input, Checkbox, Row, Col, Button, Modal, Menu, Space, Tooltip, Dropdown, Divider, Select, InputNumber, ColorPicker, message, Upload, theme, } from 'antd'
import type { ConfigProviderProps, GetProp, MappingAlgorithm, MenuProps, UploadProps } from 'antd';
import { ConnectorLineEndArrows, ConnectorLineModes, ConnectorLineStartArrows, ConnectorLineTypes, Consts, FontSizeOptions, LineWidthOptions, RequestUtils, StrokeDashStyles, SystemUtils, Utils, } from '../Utils'
import { setInterval } from 'timers'
import { UserInfo } from '../Utils/RequestUtils'
import LoginFormWindow from './LoginFormWindow'
import NewFileWindow from './NewFileWindow';
import { AlignCenterOutlined, AlignLeftOutlined, AlignRightOutlined, BoldOutlined, CheckOutlined, DownloadOutlined, FileAddOutlined, FileOutlined, FileTextOutlined, FolderOpenOutlined, FormOutlined, GithubOutlined, ItalicOutlined, MoonOutlined, RedoOutlined, SaveOutlined, SearchOutlined, SettingOutlined, SolutionOutlined, SunOutlined, UnderlineOutlined, UndoOutlined, UserOutlined, VerticalAlignBottomOutlined, VerticalAlignMiddleOutlined, VerticalAlignTopOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import OpenFileWindow from './OpenFileWindow';
import { StorageService } from '../Storage';
import { Rectangle } from '@/components/Resource/LargeIcons';
import { EngineUtils, Font, FontSlant, FontUtils, FontWeight, GraphicsUtils, Matrix, Point2, TextDecoration, TextShape } from '@/components/Engine';
import { Editor, EditorEvent } from '@/components/Rockie/Editor';
import { useIntl, setLocale, getLocale, FormattedMessage, useParams, } from 'umi';
import { useLocation } from 'react-router-dom'
import { Placeholder, } from '@/components/Resource/Icons'
import { Operation, OperationHelper, OperationType } from '@/components/Rockie/Operations';
import { Connector, ContainerEntity, ContainerTypes, CustomEntity, CustomTableEntity, ImageContainer, Item, ShapeEntity, ShapeTypes, SvgContainer, TableEntity } from '@/components/Rockie/Items';
import { ShapeAction } from '@/components/Rockie/Actions';
import { ConnectorArrowTypes } from '@/components/Rockie/Items/src/Connector';
import { ConnectorDirection, ConnectorMode } from '@/components/Rockie/Shapes';
import { ConnectorLineModesForCurve, DoubleLineGapOptions, FontNameOptions } from '../Utils/Consts';
import { BasicShapes } from '@/components/Rockie/CustomItems/BasicShapes';
import { Arrows } from '@/components/Rockie/CustomItems/Arrows';
import { AliyunShapes } from '@/components/Rockie/CustomItems/Aliyun';
import { AwsShapes } from '@/components/Rockie/CustomItems/Aws';
import { FlowChartShapeTypes } from '@/components/Rockie/CustomItems/FlowChart/src/FlowChartShape';
import { FlowChartShapes } from '@/components/Rockie/CustomItems/FlowChart';
import { DocumentThemeTypes, EditorUtils, ThemeUtils } from '@/components/Rockie/Theme';
import { EditorHelper } from '@/components/Rockie/Utils';
import RegisterFormWindowPage from './RegisterFormWindow';
import PasswordFormWindowPage from './PasswordFormWindow';
import ProfileFormWindowPage from './ProfileFormWindow';
import { UMLConnectors, UMLContainerShapes, UMLCustomTable, UMLCustomTableTypes, UMLCustomTables } from '@/components/Rockie/CustomItems/UML';
import { UMLContainerShape, UMLContainerTypes } from '@/components/Rockie/CustomItems/UML/src/UMLContainerShape';
import { UMLBasicShape, UMLBasicShapeTypes } from '@/components/Rockie/CustomItems/UML/src/UMLBasicShape';
import { UMLConnector, UMLConnectorTypeInfos } from '@/components/Rockie/CustomItems/UML/src/UMLConnector';
import { UMLCustomShape, UMLCustomShapeTypes } from '@/components/Rockie/CustomItems/UML/src/UMLCustomShape';
import { UMLFrameShape, UMLFrameShapeTypes } from '@/components/Rockie/CustomItems/UML/src/UMLFrameShape';
import { RcFile, UploadChangeParam } from 'antd/es/upload';
import { parse, stringify } from 'querystringify';
import { ERCustomShape, ERCustomShapeTypes } from '@/components/Rockie/CustomItems/EntityRelation/src/ERCustomShape';
import { MockupCustomShape, MockupCustomShapeTypes } from '@/components/Rockie/CustomItems/Mockup/src/MockupCustomShape';
import { Shapes, ShapeType } from '@/components/Rockie/Items/src/ShapeEntity';
import { TableTypes } from '@/components/Rockie/Items/src/TableEntity';
import { CustomEntityTypeInfo } from '@/components/Rockie/Items/src/CustomEntity';
import { CustomTableType } from '@/components/Rockie/Items/src/CustomTableEntity';
import { CustomConnector, CustomConnectorTypeInfo } from '@/components/Rockie/Items/src/CustomConnector';
import { UMLCustomContainer, UMLCustomContainerTypes } from '@/components/Rockie/CustomItems/UML/src/UMLCustomContainer';
import { useAntdConfig, useAntdConfigSetter } from 'umi'
import AboutWindowPage from './AboutWindow';
import { DocumentThemeType } from '@/components/Rockie/Theme/DocumentTheme';
import { OSType } from '../Utils/SystemUtils';

interface HeaderProps {
  previousEditor: Editor | undefined
  currentEditor: Editor | undefined
  onLogin: () => void
  onLogout: () => void
  onMyShapesUpdated: () => void
  adRegionWidth: number
  onShowRulerChanged: () => void
  showRuler: boolean
  onDocumentThemeChanged: (newThemeName: string) => void
  documentThemeName: string
}

const Header: FC<HeaderProps> = ({
  previousEditor, currentEditor, onLogin, onLogout, onMyShapesUpdated, adRegionWidth, onShowRulerChanged, showRuler, onDocumentThemeChanged, documentThemeName
}) => {
  const setAntdConfig = useAntdConfigSetter()
  const antdConfig = useAntdConfig()
  const intl = useIntl();
  const [messageApi, contextHolder] = message.useMessage();
  const { confirm } = Modal

  const DOCUMENT_MODIFIED_TEXT_NO = intl.formatMessage({ id: 'workspace.header.document-modified-text-no', });
  const DOCUMENT_MODIFIED_TEXT_YES = intl.formatMessage({ id: 'workspace.header.document-modified-text-yes', });
  const DOCUMENT_NEW_NAME_PREFIX = 'Untitled'

  const ON_LOGIN_SAVE = 'Save'
  const ON_LOGIN_OPEN = 'Open'
  const ON_LOGIN_NONE = 'None'

  const STAGING_DOCUMENT_ID = 'stagingDocumentId'
  const STAGING_DOCUMENT_NAME = 'stagingDocumentName'
  const STAGING_FOLDER_ID = 'stagingFolderId'

  const RATEL_FORMAT = 'ratel'

  const [forceUpdate, setForceUpdate,] = useState<boolean>(false)
  const [initialized, setInitialized,] = useState<boolean>(false)
  const [online, setOnline,] = useState<boolean>(false)
  const [userInfo, setUserInfo,] = useState<UserInfo | null>(null)
  const [documentModifiedText, setDocumentModifiedText] = useState<string>(DOCUMENT_MODIFIED_TEXT_NO)
  const [loginFormWindowVisible, setLoginFormWindowVisible,] = useState<boolean>(false)
  const [registerFormWindowVisible, setRegisterFormWindowVisible,] = useState<boolean>(false)
  const [passwordFormWindowVisible, setPasswordFormWindowVisible,] = useState<boolean>(false)
  const [profileFormWindowVisible, setProfileFormWindowVisible,] = useState<boolean>(false)
  const [aboutWindowVisible, setAboutWindowVisible,] = useState<boolean>(false)
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
  const [doubleLineGap, setDoubleLineGap,] = useState<number>(Consts.DOUBLE_LINE_GAP_DEFAULT)
  const [zoom, setZoom,] = useState<number>(currentEditor ? currentEditor.zoom : Consts.ZOOM_DEFAULT)
  const [fontName, setFontName,] = useState<string>(Consts.FONT_NAME_DEFAULT)
  const [fontSize, setFontSize,] = useState<number>(Consts.FONT_SIZE_DEFAULT)
  const [fontColor, setFontColor,] = useState<string>(Consts.COLOR_FONT_DEFAULT)
  const [fontWeight, setFontWeight,] = useState<string>(Consts.FONT_WEIGHT_NORMAL)
  const [fontSlant, setFontSlant,] = useState<string>(Consts.FONT_SLANT_UP_RIGHT)
  const [fontWidth, setFontWidth,] = useState<string>(Consts.FONT_WIDTH_NORMAL)
  const [textAlignment, setTextAlignment,] = useState<string>(Consts.TEXT_ALIGNMENT_LEFT)
  const [textDecoration, setTextDecoration,] = useState<string>(Consts.TEXT_DECORATION_NONE)
  const [textVerticalAlignment, setTextVerticalAlignment,] = useState<string>(Consts.PLACE_HOLDER_ALIGNMENT_MIDDLE)
  const [fontBold, setFontBold,] = useState<boolean>(false)
  const [fontItalic, setFontItalic,] = useState<boolean>(false)
  const [fontUnderline, setFontUnderline,] = useState<boolean>(false)
  const [selectionValid, setSelectionValid,] = useState<boolean>(false)
  const [editorUndoable, setEditorUndoable,] = useState<boolean>(false)
  const [editorRedoable, setEditorRedoable,] = useState<boolean>(false)
  const [fontSizeNode, setFontSizeNode,] = useState<any>(null)
  const [strokeDashStyle, setStrokeDashStyle,] = useState<string>(Consts.STROKE_DASH_STYLE_SOLID)
  const [connectorLineType, setConnectorLineType,] = useState<string>(Consts.CONNECTOR_LINE_TYPE_STRAIGHT)
  const [connectorLineMode, setConnectorLineMode,] = useState<string>(Consts.CONNECTOR_LINE_MODE_SIGNLE)
  const [connectorLineStartArrow, setConnectorLineStartArrow,] = useState<string>(ConnectorArrowTypes[0].name)
  const [connectorLineEndArrow, setConnectorLineEndArrow,] = useState<string>(ConnectorArrowTypes[0].name)
  const [connectorSelected, setConnectorSelected,] = useState<boolean>(false)
  // const [exportForm, ] = Form.useForm()
  // const [downloadDocumentForm, ] = Form.useForm()
  const timerCountRef = useRef(0)
  const token = theme.useToken()
  const splitColor = token.token.colorSplit
  const workspaceBackground = token.token.colorBgElevated
  const osType = SystemUtils.getOS()

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
      //console.log(`online is ${onlineResult} ${timerCountRef.current} ${forceUpdate}` )
      setOnline(onlineResult)
      setUserInfo(RequestUtils.userInfo)
      // if(timerCountRef.current >= 30) {
      //   timerCountRef.current = 0
      // } else {
      timerCountRef.current = timerCountRef.current + 1
      //      }
      setForceUpdate(old => {
        return !old
      })
    }, 2000)

    // const autoSaveTimer = setInterval(async () => {
    // }, 60000)

    const delayTimer = setTimeout(() => {
      const hasLink = checkLink()
      if (!hasLink) {
        loadStagingDocument()
      }
    }, 2000)
    return () => {
      clearInterval(timer)
      clearTimeout(delayTimer)
      // clearInterval(autoSaveTimer)
    }
  }

  const checkLink = async () => {
    const url = document.URL
    const urlObject = SystemUtils.parseUrl(url)
    if (urlObject?.query && urlObject?.path) {
      if (urlObject.path == '/document' && urlObject.query.id) {
        loadLinkDocument(urlObject.query.id)
        return true
      }
    }
    return false
  }

  const loadLinkDocument = async (id: string) => {
    const onlineResult = await RequestUtils.isOnline()
    // handleOpenFileWindowOk(parseInt(id), '', 0)
    console.log(`load link document now.`)
  }

  const loadStagingDocument = async () => {
    const onlineResult = await RequestUtils.isOnline()
    const documentId = localStorage.getItem(STAGING_DOCUMENT_ID)
    const documentName = localStorage.getItem(STAGING_DOCUMENT_NAME)
    let folderId: string | number | null = localStorage.getItem(STAGING_FOLDER_ID)
    if (folderId && folderId != 'null') {
      folderId = parseInt(folderId)
    }
    if (onlineResult && documentId) {
      handleOpenFileWindowOk(parseInt(documentId), documentName, folderId as number)
    }
  }
  const refresh = () => {
    if (previousEditor) {
      previousEditor.removeSelectionChange(handleSelectionChange)
      previousEditor.removeOperationChange(handleOperationChange)
      previousEditor.removeTextEditStyleChange(handleTextEditStyleChange)
      previousEditor.removeOperationComplete(handleOperationComplete)
    }
    if (currentEditor) {
      refreshSelectionInfo(currentEditor)
      refreshOperationInfos()
      currentEditor.onSelectionChange(handleSelectionChange)
      currentEditor.onOperationChange(handleOperationChange)
      currentEditor.onTextEditStyleChange(handleTextEditStyleChange)
      currentEditor.onOperationComplete(handleOperationComplete)
      if (currentEditor.selectionLayer.getEditorItemCount() > 0) {
        setSelectionValid(true)
      } else {
        setSelectionValid(false)
      }
      let connectorSelected = true
      if (currentEditor.selectionLayer.getEditorItemCount() > 0) {
        currentEditor.selectionLayer.getAllEditorItems().forEach(editorItem => {
          if (!(editorItem instanceof Connector)) {
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
      if (editorItem instanceof TableEntity && editor.targetItem) {
        editorItem = editor.targetItem
      }
      //let shape = editorItem.shape
      setZoom(editor.zoom)
      setFontSize(editorItem.fontSize)
      setFontName(editorItem.fontName)
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
      if (editorItem instanceof Connector) {
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
    if (Utils.currentEditor) {
      setZoom(Utils.currentEditor.zoom)
    } else {
      setZoom(Consts.ZOOM_DEFAULT)
    }
    setFontName(Consts.FONT_NAME_DEFAULT)
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
    let connectorSelected = true
    if (e.source.selectionLayer.getEditorItemCount() > 0) {
      e.source.selectionLayer.getAllEditorItems().forEach(editorItem => {
        if (!(editorItem instanceof Connector)) {
          connectorSelected = false
        }
      })
    } else {
      connectorSelected = false
    }
    setConnectorSelected(connectorSelected)
  }

  const handleOperationChange = (e: EditorEvent) => {
    refreshOperationInfos()
  }

  const handleOperationComplete = (e: EditorEvent) => {
    refreshSelectionInfo(e.source)
    if (e.source.selectionLayer.getEditorItemCount() > 0) {
      setSelectionValid(true)
    } else {
      setSelectionValid(false)
    }
    let connectorSelected = true
    if (e.source.selectionLayer.getEditorItemCount() > 0) {
      e.source.selectionLayer.getAllEditorItems().forEach(editorItem => {
        if (!(editorItem instanceof Connector)) {
          connectorSelected = false
        }
      })
    } else {
      connectorSelected = false
    }
    setConnectorSelected(connectorSelected)

  }

  const handleTextEditStyleChange = (e: EditorEvent) => {
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
    setSelectedDocumentId(null)

  }

  const login = (onLogin: string) => {
    setOnLoginFormWindowOk(onLogin)
    setLoginFormWindowVisible(!loginFormWindowVisible)
  }

  const register = () => {
    setRegisterFormWindowVisible(!registerFormWindowVisible)
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
    if (onLogin) {
      onLogin()
    }
  }

  const handleRegisterFormWindowCancel = () => {
    setRegisterFormWindowVisible(false)
  }

  const handleRegisterFormWindowOk = () => {
    setRegisterFormWindowVisible(false)
  }

  const handlePasswordFormWindowCancel = () => {
    setPasswordFormWindowVisible(false)
  }

  const handlePasswordFormWindowOk = () => {
    setPasswordFormWindowVisible(false)
  }

  const handleProfileFormWindowCancel = () => {
    setProfileFormWindowVisible(false)
  }

  const handleProfileFormWindowOk = () => {
    setProfileFormWindowVisible(false)
  }


  const handleAboutWindowCancel = () => {
    setAboutWindowVisible(false)
  }

  const handleAboutWindowOk = () => {
    setAboutWindowVisible(false)
  }
  const handleNewFileWindowCancel = () => {
    setNewFileWindowVisible(false)
  }
  const handleNewFileWindowOk = (templateContent: string | null) => {
    setNewFileWindowVisible(false)
    const storage = new StorageService()
    storage.editors = Utils.editors
    if (templateContent) {
      storage.loadDocument(templateContent)
    } else {
      storage.loadNewDocument()
    }
    Utils.storageData = storage.storageData
    if (Utils.loadData) {
      Utils.loadData()
    }
    refreshNewDocumentName()
    if(onDocumentThemeChanged) {
      onDocumentThemeChanged(DocumentThemeTypes[0].name)
    }
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
          localStorage.setItem(STAGING_DOCUMENT_ID, `${documentId}`)
          localStorage.setItem(STAGING_FOLDER_ID, `${documentData.data.data.folderId}`)
          localStorage.setItem(STAGING_DOCUMENT_NAME, `${documentData.data.data.documentName}`)
          //All editors have same theme name and so we use first one
          if(storage.storageData.theme) {
            onDocumentThemeChanged(storage.storageData.theme)
          } else {
            onDocumentThemeChanged(DocumentThemeTypes[0].name)
          }
          } else {
          console.log(`Load document failed: documentId = ${documentId}`)
        }
        setOpenFileWindowVisible(false)
      }
      fetchDocumentData()
    }
  }

  const logout = () => {
    if (Utils.isModified) {
      confirm({
        title: intl.formatMessage({ id: 'workspace.header.logout-confirm-title' }),
        type: 'warning',
        content: intl.formatMessage({ id: 'workspace.header.logout-confirm-message' }),
        onOk() {
          RequestUtils.logout()
          handleNewFileWindowOk(null)
        },
        onCancel() {

        }
      })
    } else {
      RequestUtils.logout()
      handleNewFileWindowOk(null)
    }
    if (onLogout) {
      onLogout()
    }
  }

  const handleAbout = () => {
    setAboutWindowVisible(true)
  }

  const handleUpdatePassword = () => {
    setPasswordFormWindowVisible(true)
  }

  const handleUpdateProfile = () => {
    setProfileFormWindowVisible(true)
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
      currentEditor.undo()
      refreshOperationInfos()
    }
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

  const handleAutoSave = () => {
    //console.log(`Autosave is started`)
    //console.log(`online is ${online} ${timerCountRef.current}, ${forceUpdate},  ${selectedDocumentId}, ${selectedDocumentName}, ${selectedFolderId}` )
    //const online = await RequestUtils.isOnline()
    if (online && timerCountRef.current >= 300 && selectedDocumentId && Utils.isModified) {
      timerCountRef.current = 0
      doHandleAutoFileSave(selectedDocumentId, selectedDocumentName, selectedFolderId)
    } else if (timerCountRef.current >= 300) {
      timerCountRef.current = 0
    } else {
      // messageApi.open({
      //   type: 'warning',
      //   content: intl.formatMessage({ id: 'workspace.header.message-auto-save-disabled-without-login', })
      // })
    }
  }

  //UI & Timer will call here and so some state need to be provided first
  const doHandleAutoFileSave = (selectedDocumentId: number, selectedDocumentName: string, selectedFolderId: number | null) => {
    const storage = new StorageService()
    storage.editors = Utils.editors
    storage.save(documentThemeName, Consts.DOCUMENT_VERSION)
    const documentData = storage.storageData
    const documentContent = JSON.stringify(documentData)
    console.log(documentContent)
    const saveDocumentData = async () => {
      let documentData = null
      documentData = await RequestUtils.updateDocument(selectedDocumentId, selectedDocumentName, documentContent, selectedFolderId)
      if (documentData.data?.success) {
        console.log('Save document with data: ', documentData.data.data)
        Utils.editors.forEach(editor => {
          editor.resetModified()
        })
      } else {
        console.log('Save document with error: ', documentData.data)
        //alert(`${intl.formatMessage({ id: 'workspace.header.alert-failed-save-document' })} ${documentData.data.message}`)
        const errorMessage = `${intl.formatMessage({ id: 'workspace.header.alert-failed-save-document' })} ${documentData.data.message}`
        messageApi.open({
          type: 'error',
          content: errorMessage
        })
      }
    }
    saveDocumentData()
  }

  handleAutoSave()


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
      doHandleAutoFileSave(selectedDocumentId, selectedDocumentName, selectedFolderId)
    }
  }

  const handleBeforeImportDocument = (file: RcFile, FileList: RcFile[]) => {
    console.log(`${file.name.substring(file.name.length - 6)}`)
    const isRATEL = file.name.length > 6 && file.name.substring(file.name.length - 6) === '.ratel';
    if (!isRATEL) {
      message.error(`${file.name} ${intl.formatMessage({ id: 'workspace.header.message-import-document-format-is-invalid' })}`);
    }
    const isLessThan1M = file.size < 1 * 1024 * 1024
    if (!isLessThan1M) {
      message.error(`${file.name} ${intl.formatMessage({ id: 'workspace.header.message-import-document-size-must-be-less-than' })}`);
    }
    return (isRATEL && isLessThan1M) || Upload.LIST_IGNORE;
  }

  type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

  const getRatelgFromFile = (ratel: FileType, callback: (data: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string))
    reader.readAsText(ratel)
  }

  const handleAfterImportDocument = (info: UploadChangeParam) => {
    if (info.file.status == 'done') {
      getRatelgFromFile(info.file.originFileObj as FileType, (data) => {
        console.log(`image data = ${data}`)
        const storage = new StorageService()
        storage.editors = Utils.editors
        storage.loadDocument(data)
        Utils.storageData = storage.storageData
        if (Utils.loadData) {
          Utils.loadData()
        }
        if (Utils.checkIfModified) {
          Utils.checkIfModified(false)
        }
        setSelectedDocumentId(null)
        setSelectedFolderId(null)
        setSelectedDocumentName(info.file.fileName ? info.file.fileName : DOCUMENT_NEW_NAME_PREFIX)        
        if(storage.storageData.theme) {
          onDocumentThemeChanged(storage.storageData.theme)
        } else {
          onDocumentThemeChanged(DocumentThemeTypes[0].name)
        }
      })
    }
  }

  const handleExport = (format: 'png' | 'jpg' = 'png') => {
    if (Utils.currentEditor) {
      const data = EditorHelper.export(Utils.currentEditor, format)
      SystemUtils.generateDownloadFile(data, selectedDocumentName + '.' + format)
    }
  }

  const handleExportSelected = (format: 'png' | 'jpg' = 'png') => {
    if (Utils.currentEditor) {
      const data = EditorHelper.exportSelected(Utils.currentEditor, format, false, false)
      SystemUtils.generateDownloadFile(data, selectedDocumentName + '.' + format)
    }
  }

  const handleExportSVG = async () => {
    if (Utils.currentEditor) {
      const data = await EditorHelper.exportToSVG(Utils.currentEditor)
      SystemUtils.generateDownloadFile(data, selectedDocumentName + '.svg')
    }
  }

  const handleExportSelectedSVG = async () => {
    if (Utils.currentEditor) {
      const data = await EditorHelper.exportSelectedToSVG(Utils.currentEditor)
      SystemUtils.generateDownloadFile(data, selectedDocumentName + '.svg')
    }
  }
  const handleDownload = () => {
    const storage = new StorageService()
    storage.editors = Utils.editors
    storage.save(documentThemeName, Consts.DOCUMENT_VERSION)
    const documentData = storage.storageData
    const documentContent = JSON.stringify(documentData)
    SystemUtils.generateDownloadFile(documentContent, selectedDocumentName + '.' + RATEL_FORMAT)
  }

  const confirmDiscardModifiedDocument = () => {
    setDiscardModifiedDocumentWindowVisible(false)
    setNewFileWindowVisible(!newFileWindowVisible)
    // if (online) {
    //   setNewFileWindowVisible(!newFileWindowVisible)
    // } else {
    //   login(ON_LOGIN_NONE)
    // }
  }

  const cancelDiscardModifiedDocument = () => {
    setDiscardModifiedDocumentWindowVisible(false)
  }

  const handleThemeChange = () => {
    setAntdConfig((config: ConfigProviderProps) => {
      if (config.theme?.algorithm) {
        const algorithmMap = config.theme.algorithm as MappingAlgorithm[]
        const hasDark = algorithmMap.includes(theme.darkAlgorithm)
        if (hasDark) {
          config.theme.algorithm = [theme.defaultAlgorithm]
          if (Utils.currentEditor) {
            Utils.currentEditor.enableDarkTheme = false
          }
        } else {
          config.theme.algorithm = [theme.darkAlgorithm]
          if (Utils.currentEditor) {
            Utils.currentEditor.enableDarkTheme = true
          }
        }
      }
      return config
    })
  }

  const handlePropertyEditorChange = () => {
    Utils.enablePropertyEditor = !Utils.enablePropertyEditor
  }


  const onExportFormFinish = (values: any) => {
    console.log('Receive values:', values)
    const { folderName } = values
    let parentId: number | null = null
  }

  const onDownloadDocumentFormFinish = (values: any) => {
    console.log('Receive values:', values)
    const { folderName } = values
    let parentId: number | null = null
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


  const handleShowGrid = () => {
    if (Utils.currentEditor) {
      Utils.currentEditor.showGrid = !Utils.currentEditor.showGrid
    }
  }


  const handleShowRuler = () => {
    if(onShowRulerChanged) {
      onShowRulerChanged()
    }
  }

  const ifEditorSupportCopy = () => {
    if (Utils.currentEditor) {
      if (Utils.currentEditor.isTextEditting) {
        if (Utils.currentEditor.selectionLayer.getEditorItemCount() == 1) {
          const item = Utils.currentEditor.selectionLayer.getEditorItem(0) as Item
          return item.shape.selection.length > 0
        }
      }
      if (Utils.currentEditor.selectionLayer.getEditorItemCount() > 0) {
        return true
      }
    }
    return false
  }

  const ifEditorSupportCut = () => {
    if (Utils.currentEditor) {
      if (Utils.currentEditor.isTextEditting) {
        if (Utils.currentEditor.selectionLayer.getEditorItemCount() == 1) {
          const item = Utils.currentEditor.selectionLayer.getEditorItem(0) as Item
          return item.shape.selection.length > 0
        }
      }
      if (Utils.currentEditor.selectionLayer.getEditorItemCount() > 0) {
        return true
      }
    }
    return false
  }

  const ifEditorSupportPaste = () => {
    if (Utils.currentEditor) {
      if (Utils.currentEditor.isTextEditting) {
        if (Utils.currentEditor.selectionLayer.getEditorItemCount() == 1) {
          return true
        }
      }
      if (Utils.currentEditor.selectionLayer.getEditorItemCount() > 0) {
        return true
      }
    }
    return false
  }

  const ifEditorSupportDuplicate = () => {
    if (Utils.currentEditor && !Utils.currentEditor.isTextEditting && Utils.currentEditor.selectionLayer.getEditorItemCount() > 0) {
      return true
    }
    return false
  }
  const ifEditorSupportDelete = () => {
    if (Utils.currentEditor && !Utils.currentEditor.isTextEditting && Utils.currentEditor.selectionLayer.getEditorItemCount() > 0) {
      return true
    }
    return false
  }
  const ifEditorSupportLock = () => {
    if (Utils.currentEditor && !Utils.currentEditor.isTextEditting && Utils.currentEditor.selectionLayer.getEditorItemCount() > 0) {
      return true
    }
    return false
  }
  const ifEditorSupportToFront = () => {
    if (Utils.currentEditor && !Utils.currentEditor.isTextEditting && Utils.currentEditor.selectionLayer.getEditorItemCount() > 0) {
      return true
    }
    return false
  }
  const ifEditorSupportToBack = () => {
    if (Utils.currentEditor && !Utils.currentEditor.isTextEditting && Utils.currentEditor.selectionLayer.getEditorItemCount() > 0) {
      return true
    }
    return false
  }
  const ifEditorSupportBringForeward = () => {
    if (Utils.currentEditor && !Utils.currentEditor.isTextEditting && Utils.currentEditor.selectionLayer.getEditorItemCount() > 0) {
      return true
    }
    return false
  }
  const ifEditorSupportSendBackward = () => {
    if (Utils.currentEditor && !Utils.currentEditor.isTextEditting && Utils.currentEditor.selectionLayer.getEditorItemCount() > 0) {
      return true
    }
    return false
  }
  const ifEditorSupportAddToMyShapes = () => {
    if (Utils.currentEditor && !Utils.currentEditor.isTextEditting && Utils.currentEditor.selectionLayer.getEditorItemCount() > 0) {
      return true
    }
    return false
  }

  const handleCopy = async () => {
    if (Utils.currentEditor) {
      if (Utils.currentEditor.isTextEditting && Utils.currentEditor.selectionLayer.getEditorItemCount() == 1) {
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
      } else {
        console.log(`copy is triggered`)
        const data = EditorHelper.exportEditorSelections(Utils.currentEditor)

        let clipboard = navigator.clipboard
        if (!clipboard) {
          SystemUtils.handleInternalError(intl.formatMessage({ id: 'workspace.content.message-clipboard-not-supported' }))
          return
        }
        await clipboard.writeText(data)
      }
    }
  }
  const handleCut = async () => {
    if (Utils.currentEditor) {
      if (Utils.currentEditor.isTextEditting && Utils.currentEditor.selectionLayer.getEditorItemCount() == 1) {
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
      } else {
        console.log(`cut is triggered`)
        let clipboard = navigator.clipboard
        if (!clipboard) {
          SystemUtils.handleInternalError(intl.formatMessage({ id: 'workspace.content.message-clipboard-not-supported' }))
          return
        }
        const data = EditorHelper.exportEditorSelections(Utils.currentEditor)
        EditorHelper.deleteSelections(Utils.currentEditor)
        await clipboard.writeText(data)
      }
    }
  }
  const handlePaste = async () => {
    if (Utils.currentEditor) {
      if (Utils.currentEditor.isTextEditting && Utils.currentEditor.selectionLayer.getEditorItemCount() == 1) {
        console.log(`text paste is triggered`)
        //setPasteFromSystem(false)
        const clipboard = navigator.clipboard
        if (!clipboard) {
          SystemUtils.handleInternalError(intl.formatMessage({ id: 'workspace.content.message-clipboard-not-supported' }))
          return
        }
        const text = await clipboard.readText()
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
      } else {
        console.log(`paste is triggered`)
        //setPasteFromSystem(false)
        const clipboard = navigator.clipboard
        if (!clipboard) {
          SystemUtils.handleInternalError(intl.formatMessage({ id: 'workspace.content.message-clipboard-not-supported' }))
          return
        }
        const text = await clipboard.readText()


        let dataTransfer = new DataTransfer()
        dataTransfer.dropEffect = 'none'
        dataTransfer.effectAllowed = "uninitialized"
        dataTransfer.setData('text/plain', text)
        dataTransfer.setData('text/retel', text)
        window.dispatchEvent(new ClipboardEvent('paste', {
          bubbles: true,
          cancelable: true,
          composed: true,
          clipboardData: dataTransfer
        }))
      }
    }
  }
  const handleDuplicate = () => {
    handleCopy()
    handlePaste()
  }
  const handleDelete = () => {
    if (Utils.currentEditor) {
      if (!Utils.currentEditor.isTextEditting) {
        EditorHelper.deleteSelections(Utils.currentEditor)
      }
    }
  }
  const handleLock = () => {
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach(editorItem => {
        editorItem.locked = !editorItem.locked
      })
      Utils.currentEditor.invalideHolder()
      const afterSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      const operation: Operation = new Operation(Utils.currentEditor, OperationType.UPDATE_ITEMS, afterSelections, true, beforeSelections, '', null, null, null, null)
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
  const handleBringForewared = () => {
    if (Utils.currentEditor) {
      const selections = Utils.currentEditor.selectionLayer.getAllEditorItems()
      if (selections.length == 1) {
        Utils.currentEditor.bringForeward(selections[0])
      }
    }
  }
  const handleSendBackward = () => {
    if (Utils.currentEditor) {
      const selections = Utils.currentEditor.selectionLayer.getAllEditorItems()
      if (selections.length == 1) {
        Utils.currentEditor.sendBackward(selections[0])
      }
    }
  }
  const handleAddToMyShapes = async () => {
    if (Utils.currentEditor) {
      if (RequestUtils.online) {
        await EditorHelper.addToMyShapes(Utils.currentEditor, onMyShapesUpdated)
      } else {
        SystemUtils.handleInternalError(intl.formatMessage({ id: 'workspace.content.message-login-is-required' }))
      }
    }

  }

  const handleZoom = (value: number) => {
    setZoom(value)
    if (Utils.currentEditor) {
      Utils.currentEditor.zoom = value
    }
  }

  const handleResetView = () => {
    handleZoom(1)
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
      if (update) {
        setZoom(zoomOptions[zoomIndex].value)
        Utils.currentEditor.zoom = zoomOptions[zoomIndex].value
      }
    }
  }

  const handleFontNameChange = (value: any) => {
    console.log('font name changed')
    setFontName(value)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach(editorItem => {
        if (editorItem instanceof TableEntity) {
          if (Utils.currentEditor?.targetItem) {
            Utils.currentEditor.targetItem.fontName = value
          }
        } else {
          editorItem.fontName = value
        }
      })
      Utils.currentEditor.focus()
      Utils.currentEditor.triggerTextEditStyleChange()
      const afterSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      const operation: Operation = new Operation(Utils.currentEditor, OperationType.UPDATE_ITEMS, afterSelections, true, beforeSelections, '', null, null, null, null)
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
  }

  const handleFontSizeChange = (value: any) => {
    console.log('font size changed')
    setFontSize(value)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach(editorItem => {
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
      const operation: Operation = new Operation(Utils.currentEditor, OperationType.UPDATE_ITEMS, afterSelections, true, beforeSelections, '', null, null, null, null)
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
    if (fontSizeNode) {
      console.log('font size blue trigger on size change')
      fontSizeNode.blur()
    }
  }

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

  const handleFontSizeBlur = () => {
    console.log('font size is blured')
    if (Utils.currentEditor) {
      Utils.currentEditor.focus()
    }
  }

  const handleFontSizePressEnter = (e: KeyboardEvent) => {
    console.log('font size is pressed Enter Key')
    if (fontSizeNode) {
      console.log('font size blue trigger on size step change')
      //fontSizeNode.blur()
    }
    //e.stopPropagation()
  }

  const handleLineWidthChange = (value: number | null) => {
    if (value != null) {
      setLineWidth(value)
      if (Utils.currentEditor) {
        const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
        const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
        editorItems.forEach(editorItem => {
          if (editorItem instanceof TableEntity) {
            if (Utils.currentEditor?.targetItem) {
              Utils.currentEditor.targetItem.lineWidth = value
            }
          } else {
            editorItem.lineWidth = value
          }
        })
        const afterSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
        const operation: Operation = new Operation(Utils.currentEditor, OperationType.UPDATE_ITEMS, afterSelections, true, beforeSelections, '', null, null, null, null)
        Utils.currentEditor.operationService.addOperation(operation)
        Utils.currentEditor.triggerOperationChange()
      }
    }
  }

  const handleFillColorChange = (value: any) => {
    setFillColor(value)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach(editorItem => {
        let color = SystemUtils.parseColorString(value.toHexString())
        if (color) {
          editorItem.fillColor = color
        }
        editorItem.useTheme = false
      })
      const afterSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      const operation: Operation = new Operation(Utils.currentEditor, OperationType.UPDATE_ITEMS, afterSelections, true, beforeSelections, '', null, null, null, null)
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
  }

  const handleFillColorChangeComplete = (value: any) => {
  }

  const handleStrokeColorChange = (value: any) => {
    setStrokeColor(value)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach(editorItem => {
        let color = SystemUtils.parseColorString(value.toHexString())
        if (color) {
          editorItem.strokeColor = color
        }
        editorItem.useTheme = false
      })
      const afterSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      const operation: Operation = new Operation(Utils.currentEditor, OperationType.UPDATE_ITEMS, afterSelections, true, beforeSelections, '', null, null, null, null)
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
  }

  const handleStrokeColorChangeComplete = (value: any) => {
  }

  const handleFontColorChange = (value: any) => {
    setFontColor(value)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach(editorItem => {
        let color = SystemUtils.parseColorString(value.toHexString())
        if (color) {
          editorItem.fontColor = color
        }
        editorItem.useTheme = false
      })
      Utils.currentEditor.focus()
      Utils.currentEditor.triggerTextEditStyleChange()
      const afterSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      const operation: Operation = new Operation(Utils.currentEditor, OperationType.UPDATE_ITEMS, afterSelections, true, beforeSelections, '', null, null, null, null)
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
  }

  const handleFontColorChangeComplete = (value: any) => {
    if (Utils.currentEditor) {
      Utils.currentEditor.focus()
    }
  }

  const handleBoldChanged = () => {
    setFontBold(!fontBold)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach(editorItem => {
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
      const operation: Operation = new Operation(Utils.currentEditor, OperationType.UPDATE_ITEMS, afterSelections, true, beforeSelections, '', null, null, null, null)
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
  }

  const handleItalicChanged = () => {
    setFontItalic(!fontItalic)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach(editorItem => {
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
      const operation: Operation = new Operation(Utils.currentEditor, OperationType.UPDATE_ITEMS, afterSelections, true, beforeSelections, '', null, null, null, null)
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
  }

  const handleUnderlineChanged = () => {
    setFontUnderline(!fontUnderline)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach(editorItem => {
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
      const operation: Operation = new Operation(Utils.currentEditor, OperationType.UPDATE_ITEMS, afterSelections, true, beforeSelections, '', null, null, null, null)
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
  }

  const handleTextAlignmentChanged = (textAlignment: string) => {
    setTextAlignment(textAlignment)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach(editorItem => {
        if (editorItem instanceof TableEntity) {
          if (Utils.currentEditor?.targetItem) {
            Utils.currentEditor.targetItem.textAlignment = SystemUtils.parseTextAlignment(textAlignment)
          }
        } else {
          editorItem.textAlignment = SystemUtils.parseTextAlignment(textAlignment)
        }
      })
      Utils.currentEditor.focus()
      Utils.currentEditor.triggerTextEditStyleChange()
      const afterSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      const operation: Operation = new Operation(Utils.currentEditor, OperationType.UPDATE_ITEMS, afterSelections, true, beforeSelections, '', null, null, null, null)
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
  }

  const handleTextVerticalAlignmentChanged = (textVerticalAlignment: string) => {
    setTextVerticalAlignment(textVerticalAlignment)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach(editorItem => {
        if (editorItem instanceof TableEntity) {
          if (Utils.currentEditor?.targetItem) {
            Utils.currentEditor.targetItem.textVerticalAlignment = SystemUtils.parseTextVerticalAligment(textVerticalAlignment)
          }
        } else {
          editorItem.textVerticalAlignment = SystemUtils.parseTextVerticalAligment(textVerticalAlignment)
        }
      })
      Utils.currentEditor.focus()
      Utils.currentEditor.triggerTextEditStyleChange()
      const afterSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      const operation: Operation = new Operation(Utils.currentEditor, OperationType.UPDATE_ITEMS, afterSelections, true, beforeSelections, '', null, null, null, null)
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
  }

  const handleLocale = (locale: string) => {
    setLocale(locale, false)
    messageApi.info(intl.formatMessage({ id: 'workspace.header.message-apply-locale' }))
  }

  const handleStrokeDashStyleChange = (value: string) => {
    setStrokeDashStyle(value)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach(editorItem => {
        let strokeDashStyle = SystemUtils.parseStrokeDashStyle(value)
        if (editorItem instanceof TableEntity) {
          if (Utils.currentEditor?.targetItem) {
            Utils.currentEditor.targetItem.strokeDashStyle = strokeDashStyle
          }
        } else {
          editorItem.strokeDashStyle = strokeDashStyle
        }
      })
      const afterSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      const operation: Operation = new Operation(Utils.currentEditor, OperationType.UPDATE_ITEMS, afterSelections, true, beforeSelections, '', null, null, null, null)
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
  }

  const handleConnectorLineTypeChange = (value: string) => {
    setConnectorLineType(value)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach(editorItem => {
        if (editorItem instanceof Connector) {
          editorItem.connectorType = SystemUtils.parseConnectorType(value)
        }
      })
      //Update it to default if not supported
      if (value == Consts.CONNECTOR_LINE_TYPE_CURVED && connectorLineMode != Consts.CONNECTOR_LINE_MODE_SIGNLE && connectorLineMode != Consts.CONNECTOR_LINE_MODE_DOUBLE) {
        setConnectorLineMode(Consts.CONNECTOR_LINE_MODE_SIGNLE)
        let editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
        editorItems.forEach(editorItem => {
          if (editorItem instanceof Connector) {
            editorItem.connectorMode = SystemUtils.parseConnectorMode(Consts.CONNECTOR_LINE_MODE_SIGNLE)
          }
        })
      }
      Utils.currentEditor.focus()
      Utils.currentEditor.invalideHolder()
      const afterSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      const operation: Operation = new Operation(Utils.currentEditor, OperationType.UPDATE_ITEMS, afterSelections, true, beforeSelections, '', null, null, null, null)
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
  }

  const handleConnectorLineModeChange = (value: string) => {
    setConnectorLineMode(value)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach(editorItem => {
        if (editorItem instanceof Connector) {
          editorItem.connectorMode = SystemUtils.parseConnectorMode(value)
        }
      })
      Utils.currentEditor.focus()
      Utils.currentEditor.triggerTextEditStyleChange()
      const afterSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      const operation: Operation = new Operation(Utils.currentEditor, OperationType.UPDATE_ITEMS, afterSelections, true, beforeSelections, '', null, null, null, null)
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
  }

  const handleDoubleLineGapChange = (value: number) => {
    setDoubleLineGap(value)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach(editorItem => {
        if (editorItem instanceof Connector) {
          editorItem.connectorDoubleLineGap = value
        }
      })
      Utils.currentEditor.focus()
      Utils.currentEditor.triggerTextEditStyleChange()
      const afterSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      const operation: Operation = new Operation(Utils.currentEditor, OperationType.UPDATE_ITEMS, afterSelections, true, beforeSelections, '', null, null, null, null)
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
  }

  const handleConnectorArrowStartTypeChange = (value: string) => {
    //console.log(`orig value = ${connectorLineStartArrow}`)
    setConnectorLineStartArrow(value)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach(editorItem => {
        if (editorItem instanceof Connector) {
          ConnectorArrowTypes.forEach(connectorArrayType => {
            if (connectorArrayType.name == value) {
              const startArrow = SystemUtils.cloneConnectorLineArrowType(connectorArrayType)
              editorItem.startArrow = startArrow
            }
          })
        }
      })
      Utils.currentEditor.focus()
      Utils.currentEditor.triggerTextEditStyleChange()
      const afterSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      const operation: Operation = new Operation(Utils.currentEditor, OperationType.UPDATE_ITEMS, afterSelections, true, beforeSelections, '', null, null, null, null)
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
  }

  const handleConnectorArrowEndTypeChange = (value: string) => {
    setConnectorLineEndArrow(value)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach(editorItem => {
        if (editorItem instanceof Connector) {
          ConnectorArrowTypes.forEach(connectorArrayType => {
            if (connectorArrayType.name == value) {
              const endArrow = SystemUtils.cloneConnectorLineArrowType(connectorArrayType)
              editorItem.endArrow = endArrow
            }
          })
        }
      })
      Utils.currentEditor.focus()
      Utils.currentEditor.triggerTextEditStyleChange()
      const afterSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      const operation: Operation = new Operation(Utils.currentEditor, OperationType.UPDATE_ITEMS, afterSelections, true, beforeSelections, '', null, null, null, null)
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
  }

  const strokeDashStyles = StrokeDashStyles.map(strokeDashStyle => {
    return { value: strokeDashStyle.name, label: <img alt='intl.formatMessage({ id: strokeDashStyle.label})' src={process.env.BASIC_PATH + '/icons/line-' + strokeDashStyle.name.toLowerCase() + '.svg'} width='48' height='16' style={{ filter: Utils.currentEditor?.enableDarkTheme ? 'invert(100%)' : '' }} /> }
  })

  const connectorLineTypes = ConnectorLineTypes.map(connectorLineType => {
    return { value: connectorLineType.name, label: <img alt='intl.formatMessage({ id: connectorLineType.label})' src={process.env.BASIC_PATH + '/icons/connector-line-type-' + connectorLineType.name.toLowerCase() + '.svg'} width='16' height='16' style={{ filter: Utils.currentEditor?.enableDarkTheme ? 'invert(100%)' : '' }} /> }
  })

  const connectorLineModes = ConnectorLineModes.map(connectorLineMode => {
    return { value: connectorLineMode.name, label: <img alt='intl.formatMessage({ id: connectorLineMode.label})' src={process.env.BASIC_PATH + '/icons/connector-line-mode-' + connectorLineMode.name.toLowerCase() + '.svg'} width='16' height='16' style={{ filter: Utils.currentEditor?.enableDarkTheme ? 'invert(100%)' : '' }} /> }
  })

  const connectorLineModesForCurve = ConnectorLineModesForCurve.map(connectorLineMode => {
    return { value: connectorLineMode.name, label: <img alt='intl.formatMessage({ id: connectorLineMode.label})' src={process.env.BASIC_PATH + '/icons/connector-line-mode-' + connectorLineMode.name.toLowerCase() + '.svg'} width='16' height='16' style={{ filter: Utils.currentEditor?.enableDarkTheme ? 'invert(100%)' : '' }} /> }
  })

  const connectorLineStartArrows = ConnectorArrowTypes.map(connectorArrowType => {
    const path = process.env.BASIC_PATH + '/icons/connector-line-start-arrow-' + connectorArrowType.name.toLowerCase() + '.svg'
    const id = 'header-' + path
    return {
      value: connectorArrowType.name, label: <img id={id} alt={connectorArrowType.description} src={path} width='16' height='16' style={{ filter: Utils.currentEditor?.enableDarkTheme ? 'invert(100%)' : '' }} />
    }
  })

  const connectorLineEndArrows = ConnectorArrowTypes.map(connectorArrowType => {
    const path = process.env.BASIC_PATH + '/icons/connector-line-end-arrow-' + connectorArrowType.name.toLowerCase() + '.svg'
    const id = 'header' + path
    return { value: connectorArrowType.name, label: <img id={id} alt={connectorArrowType.description} src={path} width='16' height='16' style={{ filter: Utils.currentEditor?.enableDarkTheme ? 'invert(100%)' : '' }} /> }
  })

  const handleGenerateIconsForConnector = async () => {
    if (currentEditor) {
      const connectorWidth = 128
      const connectorHeight = 128
      const connectorTypeName = 'Line'
      let margin = 5 //2
      let lineFactor = 1 //1
      let fontFactor = 1 //0.5
      let sizeFactor = 1 //0.25
      let modifierFactor = 1 //0.25
      currentEditor.contentLayer.removeAllEditorItems()
      let left = margin
      let top = margin
      let shapeEntity = new Connector(new Point2(left, top), new Point2(left + connectorWidth, top + connectorHeight))
      shapeEntity.lineWidth = shapeEntity.lineWidth * lineFactor
      shapeEntity.fontSize = shapeEntity.fontSize * fontFactor
      currentEditor.setup(1, connectorWidth * sizeFactor + margin * 2, connectorHeight * sizeFactor + margin * 2)
      currentEditor.contentLayer.addEditorItem(shapeEntity)
      currentEditor.render()
      const data = await EditorHelper.exportToSVG(currentEditor)
      SystemUtils.generateDownloadFile(data, `${connectorTypeName}.svg`)
    }
  }


  const handleGenerateIconsForCustomConnector = async (connectorTypes: CustomConnectorTypeInfo[], connectorClass: typeof CustomConnector) => {
    if (currentEditor) {
      let count = connectorTypes.length
      for (let i = 0; i < count; i++) {
        let shapeType = connectorTypes[i]
        let margin = 5
        let lineFactor = 1
        let fontFactor = 1
        let sizeFactor = 1
        currentEditor.contentLayer.removeAllEditorItems()
        shapeType.startX *= sizeFactor
        shapeType.endX *= sizeFactor
        shapeType.startY *= sizeFactor
        shapeType.endY *= sizeFactor
        let start = new Point2(shapeType.startX, shapeType.startY)
        let end = new Point2(shapeType.endX, shapeType.endY)
        let width = shapeType.width
        let height = shapeType.height
        let shapeEntity = new connectorClass(start, end, shapeType.name, connectorTypes)
        shapeEntity.lineWidth = shapeEntity.lineWidth * lineFactor
        shapeEntity.fontSize = shapeEntity.fontSize * fontFactor
        if (width < height) {
          currentEditor.setup(1, height + margin * 2, height + margin * 2)
        } else {
          currentEditor.setup(1, width + margin * 2, width + margin * 2)
        }
        currentEditor.contentLayer.addEditorItem(shapeEntity)
        currentEditor.render()
        const data = await EditorHelper.exportToSVG(currentEditor)
        SystemUtils.generateDownloadFile(data, `${shapeType.name}.svg`)
        console.log(`download file: ${shapeType.name}.svg`)
      }
    }
  }

  const handleGenerateIconsForShape = async (shapeTypes: ShapeType[] | CustomTableType[], classType: typeof ShapeEntity |
    typeof TableEntity | typeof Connector | typeof ContainerEntity | typeof CustomEntity |
    typeof UMLCustomTable | typeof UMLContainerShape | typeof UMLBasicShape | typeof UMLCustomShape |
    typeof UMLCustomContainer | typeof UMLFrameShape | typeof ERCustomShape | MockupCustomShape, margin: number) => {
    if (currentEditor) {
      let count = shapeTypes.length
      for (let i = 0; i < count; i++) {
        let shapeType = shapeTypes[i]
        //let margin = 1 //2
        let lineFactor = 1 //1
        let fontFactor = 1 //0.5
        let sizeFactor = 1 //0.25
        let modifierFactor = 1 //0.25
        currentEditor.contentLayer.removeAllEditorItems()
        let left = shapeType.left + margin
        if (shapeType.width < shapeType.height) {
          left = Math.round(shapeType.left + (shapeType.height - shapeType.width) * sizeFactor * 0.5) + margin
        }
        let shapeEntity
        switch (classType) {
          case MockupCustomShape:
            shapeEntity = new MockupCustomShape(left, shapeType.top + margin, shapeType.width * sizeFactor, shapeType.height * sizeFactor, shapeType.name)
            break;
          case ERCustomShape:
            shapeEntity = new ERCustomShape(left, shapeType.top + margin, shapeType.width * sizeFactor, shapeType.height * sizeFactor, shapeType.name)
            break;
          case UMLFrameShape:
            shapeEntity = new UMLFrameShape(left, shapeType.top + margin, shapeType.width * sizeFactor, shapeType.height * sizeFactor, { shapeType: shapeType.name }, shapeTypes)
            break;
          case UMLCustomContainer:
            shapeEntity = new UMLCustomContainer(left, shapeType.top + margin, shapeType.width * sizeFactor, shapeType.height * sizeFactor, shapeType.name, shapeTypes)
            break;
          case UMLCustomShape:
            shapeEntity = new UMLCustomShape(left, shapeType.top + margin, shapeType.width * sizeFactor, shapeType.height * sizeFactor, shapeType.name)
            break;
          case UMLBasicShape:
            shapeEntity = new UMLBasicShape(left, shapeType.top + margin, shapeType.width * sizeFactor, shapeType.height * sizeFactor, { shapeType: shapeType.name }, shapeTypes)
            break;
          case UMLContainerShape:
            shapeEntity = new UMLContainerShape(left, shapeType.top + margin, shapeType.width * sizeFactor, shapeType.height * sizeFactor, { shapeType: shapeType.name }, shapeTypes)
            break;
          case UMLCustomTable:
            shapeEntity = new UMLCustomTable(left, shapeType.top + margin, shapeType.width * sizeFactor, shapeType.height * sizeFactor, shapeType.name, shapeTypes as CustomTableType[])
            break;
          case TableEntity:
            shapeEntity = new TableEntity(left, shapeType.top + margin, shapeType.width * sizeFactor, shapeType.height * sizeFactor)
            break;
          case ContainerEntity:
            shapeEntity = new ContainerEntity(left, shapeType.top + margin, shapeType.width * sizeFactor, shapeType.height * sizeFactor, { shapeType: shapeType.name }, shapeTypes)
            break;
          default:
            shapeEntity = new ShapeEntity(left, shapeType.top + margin, shapeType.width * sizeFactor, shapeType.height * sizeFactor, { shapeType: shapeType.name }, shapeTypes)
            break;
        }
        shapeEntity.lineWidth = shapeEntity.lineWidth * lineFactor
        shapeEntity.fontSize = shapeEntity.fontSize * fontFactor
        if (!shapeType.modifyInPercent) {
          shapeEntity.shape.modifier = new Point2(Math.round(shapeEntity.shape.modifier.x * modifierFactor), Math.round(shapeEntity.shape.modifier.y * modifierFactor))
        }
        if (shapeType.width < shapeType.height) {
          currentEditor.setup(1, shapeType.height * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        } else {
          currentEditor.setup(1, shapeType.width * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        }
        currentEditor.contentLayer.addEditorItem(shapeEntity)
        currentEditor.render()
        const data = await EditorHelper.exportToSVG(currentEditor)
        SystemUtils.generateDownloadFile(data, `${shapeType.name}.svg`)
      }
    }
  }

  const handleGenerateIconsForCustomShape = async (shapeTypes: CustomEntityTypeInfo[]) => {
    if (currentEditor) {
      let count = shapeTypes.length
      for (let i = 0; i < count; i++) {
        const margin = 5
        currentEditor.contentLayer.removeAllEditorItems()
        const customShapeInfo = shapeTypes[i].typeInfo
        const customShapeTypeName = shapeTypes[i].name
        const customEntity = new shapeTypes[i].type(customShapeInfo.left + margin, customShapeInfo.top + margin, customShapeInfo.width, customShapeInfo.height, customShapeTypeName)
        currentEditor.contentLayer.addEditorItem(customEntity)
        currentEditor.setup(1, customShapeInfo.width + margin * 2, customShapeInfo.height + margin * 2)
        currentEditor.render()
        const data = await EditorHelper.exportToSVG(currentEditor)
        console.log(`download file = ${customShapeInfo.name}.png`)
        SystemUtils.generateDownloadFile(data, `${customShapeInfo.name}.svg`)
      }
    }
  }

  const handleGenerateIcons = async () => {
    const enableShapes = false
    const enableLine = false
    const enableTable = false
    const enableContainer = false
    const enableBasicShapes = false
    const enableArrows = false
    const enableFlowchartShapes = false
    const enableUMLCustomTableShapes = false
    const enableUMLContainerShapes = false
    const enableUMLBasicShapes = false
    const enableUMLConnectorShapes = false
    const enableUMLCustomShapes = false
    const enableUMLCustomContainers = false
    const enableUMLFrameShapes = false
    const enableERCustomShapes = false
    const enableMockupCustomShapes = false


    if (enableShapes) handleGenerateIconsForShape(ShapeTypes, ShapeEntity, 5)
    if (enableLine) handleGenerateIconsForConnector()
    if (enableTable) handleGenerateIconsForShape(TableTypes, TableEntity, 5)
    if (enableContainer) handleGenerateIconsForShape(ContainerTypes, ContainerEntity, 5)
    if (enableBasicShapes) handleGenerateIconsForCustomShape(BasicShapes)
    if (enableArrows) handleGenerateIconsForCustomShape(Arrows)
    if (enableFlowchartShapes) handleGenerateIconsForCustomShape(FlowChartShapes)
    if (enableUMLCustomTableShapes) handleGenerateIconsForShape(UMLCustomTableTypes, UMLCustomTable, 5)
    if (enableUMLContainerShapes) handleGenerateIconsForShape(UMLContainerTypes, UMLContainerShape, 5)
    if (enableUMLBasicShapes) handleGenerateIconsForShape(UMLBasicShapeTypes, UMLBasicShape, 5)
    if (enableUMLConnectorShapes) handleGenerateIconsForCustomConnector(UMLConnectorTypeInfos, UMLConnector)
    if (enableUMLCustomShapes) handleGenerateIconsForShape(UMLCustomShapeTypes, UMLCustomShape, 5)
    if (enableUMLCustomContainers) handleGenerateIconsForShape(UMLCustomContainerTypes, UMLCustomContainer, 5)
    if (enableUMLFrameShapes) handleGenerateIconsForShape(UMLFrameShapeTypes, UMLFrameShape, 5)
    if (enableERCustomShapes) handleGenerateIconsForShape(ERCustomShapeTypes, ERCustomShape, 5)
    if (enableMockupCustomShapes) handleGenerateIconsForShape(MockupCustomShapeTypes, MockupCustomShape, 1)
  }

  const handleTestCode = () => {
    let matrix1 = new Matrix()
    let matrix2 = new Matrix()
    matrix1.translate(26, 29)
    matrix1.rotate(29, 26, 29)
    matrix1.translate(79, 111)
    matrix1.rotate(19, 105, 140)
    matrix1.translate(59, 131)
    matrix1.rotate(79, 164, 271)
    matrix2.translate(164, 271)
    matrix2.rotate(127, 164, 271)
    console.log(`aa ${matrix1} ${matrix2}`)

  }

  const handleContainerShapesLarge = () => {
    if (currentEditor) {
      let count = ContainerTypes.length
      for (let i = 0; i < count; i++) {
        let shapeType = ContainerTypes[i]
        let margin = 5 //2
        let lineFactor = 1 //1
        let fontFactor = 1 //0.5
        let sizeFactor = 1 //0.25
        let modifierFactor = 1 //0.25
        let controllerFactor = 1 //0.25
        currentEditor.contentLayer.removeAllEditorItems()
        let left = shapeType.left + margin
        if (shapeType.width < shapeType.height) {
          left = Math.round(shapeType.left + (shapeType.height - shapeType.width) * sizeFactor * 0.5) + margin
        }
        let shapeEntity = new ContainerEntity(left, shapeType.top + margin, shapeType.width * sizeFactor, shapeType.height * sizeFactor, { shapeType: shapeType.name })
        shapeEntity.lineWidth = shapeEntity.lineWidth * lineFactor
        shapeEntity.fontSize = shapeEntity.fontSize * fontFactor
        if (!shapeType.modifyInPercent) {
          shapeEntity.shape.modifier = new Point2(Math.round(shapeEntity.shape.modifier.x * modifierFactor), Math.round(shapeEntity.shape.modifier.y * modifierFactor))
        }
        if (!shapeType.controlInPercent) {
          shapeEntity.shape.controller = new Point2(Math.round(shapeEntity.shape.controller.x * controllerFactor), Math.round(shapeEntity.shape.controller.y * controllerFactor))
        }
        if (shapeType.width < shapeType.height) {
          currentEditor.resize(shapeType.height * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        } else {
          currentEditor.resize(shapeType.width * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        }
        currentEditor.contentLayer.addEditorItem(shapeEntity)
        const data = EditorHelper.export(currentEditor)
        SystemUtils.generateDownloadFile(data, `${shapeType.name}.png`)
      }
    }
  }

  const handleContainerShapesSmall = () => {
    if (currentEditor) {
      let count = ContainerTypes.length
      for (let i = 0; i < count; i++) {
        let shapeType = ContainerTypes[i]
        let margin = 2
        let lineFactor = 1
        let fontFactor = 0.1
        let sizeFactor = 0.13
        let modifierFactor = 0.2
        let controllerFactor = 0.2
        currentEditor.contentLayer.removeAllEditorItems()
        let left = shapeType.left + margin
        if (shapeType.width < shapeType.height) {
          left = Math.round(shapeType.left + (shapeType.height - shapeType.width) * sizeFactor * 0.5) + margin
        }
        let shapeEntity = new ContainerEntity(left, shapeType.top + margin, shapeType.width * sizeFactor, shapeType.height * sizeFactor, { shapeType: shapeType.name })
        shapeEntity.lineWidth = shapeEntity.lineWidth * lineFactor
        shapeEntity.fontSize = shapeEntity.fontSize * fontFactor
        if (!shapeType.modifyInPercent) {
          shapeEntity.shape.modifier = new Point2(Math.round(shapeEntity.shape.modifier.x * modifierFactor), Math.round(shapeEntity.shape.modifier.y * modifierFactor))
        }
        if (!shapeType.controlInPercent) {
          shapeEntity.shape.controller = new Point2(Math.round(shapeEntity.shape.controller.x * controllerFactor), Math.round(shapeEntity.shape.controller.y * controllerFactor))
        }
        if (shapeType.width < shapeType.height) {
          currentEditor.resize(shapeType.height * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        } else {
          currentEditor.resize(shapeType.width * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        }
        currentEditor.contentLayer.addEditorItem(shapeEntity)
        const data = EditorHelper.export(currentEditor)
        SystemUtils.generateDownloadFile(data, `${shapeType.name}.png`)
      }
    }
  }


  const handleTest2 = () => {
    if (currentEditor) {
      let count = ShapeTypes.length
      for (let i = 0; i < count; i++) {
        let shapeType = ShapeTypes[i]
        let margin = 5 //2
        let lineFactor = 1 //1
        let fontFactor = 1 //0.5
        let sizeFactor = 1 //0.25
        let modifierFactor = 1 //0.25
        currentEditor.contentLayer.removeAllEditorItems()
        let left = shapeType.left + margin
        if (shapeType.width < shapeType.height) {
          left = Math.round(shapeType.left + (shapeType.height - shapeType.width) * sizeFactor * 0.5) + margin
        }
        let shapeEntity = new ShapeEntity(left, shapeType.top + margin, shapeType.width * sizeFactor, shapeType.height * sizeFactor, { shapeType: shapeType.name })
        shapeEntity.lineWidth = shapeEntity.lineWidth * lineFactor
        shapeEntity.fontSize = shapeEntity.fontSize * fontFactor
        if (!shapeType.modifyInPercent) {
          shapeEntity.shape.modifier = new Point2(Math.round(shapeEntity.shape.modifier.x * modifierFactor), Math.round(shapeEntity.shape.modifier.y * modifierFactor))
        }
        if (shapeType.width < shapeType.height) {
          currentEditor.resize(shapeType.height * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        } else {
          currentEditor.resize(shapeType.width * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        }
        currentEditor.contentLayer.addEditorItem(shapeEntity)
        const data = EditorHelper.export(currentEditor)
        SystemUtils.generateDownloadFile(data, `${shapeType.name}.png`)
      }
    }
  }

  const handleGenerateConnectorStartArrows = async () => {
    if (currentEditor) {
      let count = ConnectorArrowTypes.length
      let y = 15
      let x = 2
      let lineFactor = 1.5 //1
      for (let i = 0; i < count; i++) {
        currentEditor.contentLayer.removeAllEditorItems()
        let connectorArrowType = ConnectorArrowTypes[i]
        let connector = new Connector(new Point2(x, y), new Point2(x + 28, y), ConnectorDirection.Right)
        connector.startArrow = connectorArrowType
        connector.lineWidth = connector.lineWidth * lineFactor
        currentEditor.contentLayer.addEditorItem(connector)
        currentEditor.setup(1, 32, 32)
        currentEditor.render()
        const data = await EditorHelper.exportToSVG(currentEditor)
        console.log(`download file = connector-line-start-arrow-${connectorArrowType.name.toLowerCase()}.svg`)
        SystemUtils.generateDownloadFile(data, `connector-line-start-arrow-${connectorArrowType.name.toLowerCase()}.svg`)
      }
    }
  }

  const handleGenerateConnectorEndArrows = async () => {
    if (currentEditor) {
      let count = ConnectorArrowTypes.length
      let y = 15
      let x = 2
      let lineFactor = 1.5 //1
      for (let i = 0; i < count; i++) {
        currentEditor.contentLayer.removeAllEditorItems()
        let connectorArrowType = ConnectorArrowTypes[i]
        let connector = new Connector(new Point2(x + 28, y), new Point2(x, y), ConnectorDirection.Left)
        connector.startArrow = connectorArrowType
        connector.lineWidth = connector.lineWidth * lineFactor
        currentEditor.contentLayer.addEditorItem(connector)
        currentEditor.setup(1, 32, 32)
        currentEditor.render()
        const data = await EditorHelper.exportToSVG(currentEditor)
        console.log(`download file = connector-line-end-arrow-${connectorArrowType.name.toLowerCase()}.svg`)
        SystemUtils.generateDownloadFile(data, `connector-line-end-arrow-${connectorArrowType.name.toLowerCase()}.svg`)
      }
    }
  }

  const handleGenerateConnectorLineModes = async () => {
    if (currentEditor) {
      let count = ConnectorLineModes.length
      let y = 24
      let x = 3
      let lineFactor = 2 //1
      for (let i = 0; i < count; i++) {
        const connectorLineMode = ConnectorLineModes[i]
        let connector = new Connector(new Point2(x + 42, y), new Point2(x, y), ConnectorDirection.Left)
        currentEditor.contentLayer.removeAllEditorItems()
        connector.connectorMode = SystemUtils.parseConnectorMode(connectorLineMode.name)
        connector.connectorDoubleLineGap = 10
        connector.lineWidth = connector.lineWidth * lineFactor
        currentEditor.contentLayer.addEditorItem(connector)
        currentEditor.setup(1, 48, 48)
        currentEditor.render()
        const data = await EditorHelper.exportToSVG(currentEditor)
        console.log(`download file = connector-line-mode-${connectorLineMode.name}}.svg`)
        SystemUtils.generateDownloadFile(data, `connector-line-mode-${connectorLineMode.name}.svg`)
      }
    }
  }

  const handleGenerateConnectorLineTypes = async () => {
    if (currentEditor) {
      let count = ConnectorLineTypes.length
      let y = 3
      let x = 3
      let lineFactor = 2 //1
      for (let i = 0; i < count; i++) {
        const connectorLineType = ConnectorLineTypes[i]
        let connector = new Connector(new Point2(x, y), new Point2(x + 42, y + 42), ConnectorDirection.Left)
        currentEditor.contentLayer.removeAllEditorItems()
        connector.connectorType = SystemUtils.parseConnectorType(connectorLineType.name)
        connector.lineWidth = connector.lineWidth * lineFactor
        connector.curveStartModifier = new Point2(1, 0.2)
        connector.curveEndModifier = new Point2(-1, -0.2)
        currentEditor.contentLayer.addEditorItem(connector)
        currentEditor.setup(1, 48, 48)
        currentEditor.render()
        const data = await EditorHelper.exportToSVG(currentEditor)
        console.log(`download file = connector-line-type-${connectorLineType.name}}.svg`)
        SystemUtils.generateDownloadFile(data, `connector-line-type-${connectorLineType.name}.svg`)
      }
    }
  }

  const handleGenerateDashStyles = async () => {
    if (currentEditor) {
      let count = StrokeDashStyles.length
      let y = 8
      let x = 1
      let lineFactor = 1
      for (let i = 0; i < count; i++) {
        const strokeDashStyle = StrokeDashStyles[i]
        let connector = new Connector(new Point2(x, y), new Point2(x + 46, y), ConnectorDirection.Left)
        currentEditor.contentLayer.removeAllEditorItems()
        connector.strokeDashStyle = SystemUtils.parseStrokeDashStyle(strokeDashStyle.name)
        currentEditor.contentLayer.addEditorItem(connector)
        currentEditor.setup(1, 48, 16)
        currentEditor.render()
        const data = await EditorHelper.exportToSVG(currentEditor)
        console.log(`download file = line-${strokeDashStyle.name}}.svg`)
        SystemUtils.generateDownloadFile(data, `line-${strokeDashStyle.name}.svg`)
      }
    }
  }

  const handleTest5 = () => {
    if (currentEditor) {
      let count = BasicShapes.length
      for (let i = 0; i < count; i++) {
        const margin = 5
        currentEditor.contentLayer.removeAllEditorItems()
        const customShapeInfo = BasicShapes[i].typeInfo
        const customShapeTypeName = BasicShapes[i].name
        const customEntity = new BasicShapes[i].type(customShapeInfo.left + margin, customShapeInfo.top + margin, customShapeInfo.width, customShapeInfo.height, customShapeTypeName)
        currentEditor.contentLayer.addEditorItem(customEntity)
        currentEditor.resize(customShapeInfo.width + margin * 2, customShapeInfo.height + margin * 2)
        const data = EditorHelper.export(currentEditor)
        console.log(`download file = ${customShapeInfo.name}.png`)
        SystemUtils.generateDownloadFile(data, `${customShapeInfo.name}.png`)
      }
    }
  }

  const handleTest6 = () => {
    if (currentEditor) {
      let count = BasicShapes.length
      for (let i = 0; i < count; i++) {
        const margin = 2
        let lineFactor = 1
        let fontFactor = 0.5
        let sizeFactor = 0.25
        let modifierFactor = 0.25
        currentEditor.contentLayer.removeAllEditorItems()
        const customShapeInfo = BasicShapes[i].typeInfo
        const customShapeTypeName = BasicShapes[i].name
        const customEntity = new BasicShapes[i].type(customShapeInfo.left + margin, customShapeInfo.top + margin, customShapeInfo.width * sizeFactor, customShapeInfo.height * sizeFactor, customShapeTypeName)
        customEntity.lineWidth = customEntity.lineWidth * lineFactor
        customEntity.fontSize = customEntity.fontSize * fontFactor
        if (!customShapeInfo.modifyInPercent) {
          customEntity.shape.modifier = new Point2(Math.round(customEntity.shape.modifier.x * modifierFactor), Math.round(customEntity.shape.modifier.y * modifierFactor))
        }
        currentEditor.contentLayer.addEditorItem(customEntity)
        currentEditor.resize(customShapeInfo.width * sizeFactor + margin * 2, customShapeInfo.height * sizeFactor + margin * 2)
        const data = EditorHelper.export(currentEditor)
        console.log(`download file = ${customShapeInfo.name}.png`)
        SystemUtils.generateDownloadFile(data, `${customShapeInfo.name}.png`)
      }
    }
  }

  const handleTestArrows = () => {
    if (currentEditor) {
      let count = Arrows.length
      for (let i = 0; i < count; i++) {
        const margin = 5
        currentEditor.contentLayer.removeAllEditorItems()
        const customShapeInfo = Arrows[i].typeInfo
        let left = customShapeInfo.left + margin
        if (customShapeInfo.width < customShapeInfo.height) {
          left = Math.round(customShapeInfo.left + (customShapeInfo.height - customShapeInfo.width) * 0.5) + margin
        }
        const customShapeTypeName = Arrows[i].name
        const customEntity = new Arrows[i].type(left + margin, customShapeInfo.top + margin, customShapeInfo.width, customShapeInfo.height, customShapeTypeName)
        currentEditor.contentLayer.addEditorItem(customEntity)
        if (customShapeInfo.width < customShapeInfo.height) {
          currentEditor.resize(customShapeInfo.height + margin * 2, customShapeInfo.height + margin * 2)
        } else {
          currentEditor.resize(customShapeInfo.width + margin * 2, customShapeInfo.height + margin * 2)
        }
        const data = EditorHelper.export(currentEditor)
        console.log(`download file = ${customShapeInfo.name}.png`)
        SystemUtils.generateDownloadFile(data, `${customShapeInfo.name}.png`)
      }
    }
  }

  const handleTestArrowsSmall = () => {
    if (currentEditor) {
      let count = Arrows.length
      for (let i = 0; i < count; i++) {
        const margin = 2
        let lineFactor = 1
        let fontFactor = 0.5
        let sizeFactor = 0.25
        let modifierFactor = 0.25
        currentEditor.contentLayer.removeAllEditorItems()
        const customShapeInfo = Arrows[i].typeInfo
        let left = customShapeInfo.left + margin
        if (customShapeInfo.width < customShapeInfo.height) {
          left = Math.round(customShapeInfo.left + (customShapeInfo.height - customShapeInfo.width) * sizeFactor * 0.5) + margin
        }
        const customShapeTypeName = Arrows[i].name
        const customEntity = new Arrows[i].type(left + margin, customShapeInfo.top + margin, customShapeInfo.width * sizeFactor, customShapeInfo.height * sizeFactor, customShapeTypeName)
        customEntity.lineWidth = customEntity.lineWidth * lineFactor
        customEntity.fontSize = customEntity.fontSize * fontFactor
        if (!customShapeInfo.modifyInPercent) {
          customEntity.shape.modifier = new Point2(Math.round(customEntity.shape.modifier.x * modifierFactor), Math.round(customEntity.shape.modifier.y * modifierFactor))
        }
        currentEditor.contentLayer.addEditorItem(customEntity)
        if (customShapeInfo.width < customShapeInfo.height) {
          currentEditor.resize(customShapeInfo.height * sizeFactor + margin * 2, customShapeInfo.height * sizeFactor + margin * 2)
        } else {
          currentEditor.resize(customShapeInfo.width * sizeFactor + margin * 2, customShapeInfo.height * sizeFactor + margin * 2)
        }
        const data = EditorHelper.export(currentEditor)
        console.log(`download file = ${customShapeInfo.name}.png`)
        SystemUtils.generateDownloadFile(data, `${customShapeInfo.name}.png`)
      }
    }
  }

  const handleTestSvgShapes = () => {
    if (currentEditor) {
      let count = AliyunShapes.length
      for (let i = 0; i < count; i++) {
        const margin = 5
        currentEditor.contentLayer.removeAllEditorItems()
        const customShapeInfo = AliyunShapes[i]
        const customEntity = new SvgContainer(margin, margin, customShapeInfo.width, customShapeInfo.height, customShapeInfo.data)
        currentEditor.contentLayer.addEditorItem(customEntity)
        currentEditor.resize(customShapeInfo.width + margin * 2, customShapeInfo.height + margin * 2)
        const data = EditorHelper.export(currentEditor)
        console.log(`download file = ${customShapeInfo.name}.png`)
        SystemUtils.generateDownloadFile(data, `${customShapeInfo.name}.png`)
      }
    }
  }

  const handleTestSvgShapesSmall = () => {
    if (currentEditor) {
      let count = AliyunShapes.length
      for (let i = 0; i < count; i++) {
        const margin = 2
        let sizeFactor = 0.25
        currentEditor.contentLayer.removeAllEditorItems()
        const customShapeInfo = AliyunShapes[i]
        const customEntity = new SvgContainer(margin, margin, customShapeInfo.width * sizeFactor, customShapeInfo.height * sizeFactor, customShapeInfo.data)
        currentEditor.contentLayer.addEditorItem(customEntity)
        currentEditor.resize(customShapeInfo.width * sizeFactor + margin * 2, customShapeInfo.height * sizeFactor + margin * 2)
        const data = EditorHelper.export(currentEditor)
        console.log(`download file = ${customShapeInfo.name}.png`)
        SystemUtils.generateDownloadFile(data, `${customShapeInfo.name}.png`)
      }
    }
  }

  const handleTestImageShapes = () => {
    if (currentEditor) {
      let count = AwsShapes.length
      for (let i = 0; i < count; i++) {
        const margin = 5
        currentEditor.contentLayer.removeAllEditorItems()
        const customShapeInfo = AwsShapes[i]
        const customEntity = new ImageContainer(margin, margin, customShapeInfo.width, customShapeInfo.height, customShapeInfo.data)
        currentEditor.contentLayer.addEditorItem(customEntity)
        currentEditor.resize(customShapeInfo.width + margin * 2, customShapeInfo.height + margin * 2)
        const data = EditorHelper.export(currentEditor)
        console.log(`download file = ${customShapeInfo.name}.png`)
        SystemUtils.generateDownloadFile(data, `${customShapeInfo.name}.png`)
      }
    }
  }

  const handleTestImageShapesSmall = () => {
    if (currentEditor) {
      let count = AliyunShapes.length
      for (let i = 0; i < count; i++) {
        const margin = 2
        let sizeFactor = 0.25
        currentEditor.contentLayer.removeAllEditorItems()
        const customShapeInfo = AwsShapes[i]
        const customEntity = new ImageContainer(margin, margin, customShapeInfo.width * sizeFactor, customShapeInfo.height * sizeFactor, customShapeInfo.data)
        currentEditor.contentLayer.addEditorItem(customEntity)
        currentEditor.resize(customShapeInfo.width * sizeFactor + margin * 2, customShapeInfo.height * sizeFactor + margin * 2)
        const data = EditorHelper.export(currentEditor)
        console.log(`download file = ${customShapeInfo.name}.png`)
        SystemUtils.generateDownloadFile(data, `${customShapeInfo.name}.png`)
      }
    }
  }


  const handleTestFlowChartShapes = () => {
    if (currentEditor) {
      let count = FlowChartShapes.length
      for (let i = 0; i < count; i++) {
        const margin = 5
        currentEditor.contentLayer.removeAllEditorItems()
        const customShapeInfo = FlowChartShapes[i].typeInfo
        let left = customShapeInfo.left + margin
        if (customShapeInfo.width < customShapeInfo.height) {
          left = Math.round(customShapeInfo.left + (customShapeInfo.height - customShapeInfo.width) * 0.5) + margin
        }
        const customShapeTypeName = FlowChartShapes[i].name
        const customEntity = new FlowChartShapes[i].type(left, customShapeInfo.top + margin, customShapeInfo.width, customShapeInfo.height, customShapeTypeName)
        currentEditor.contentLayer.addEditorItem(customEntity)
        if (customShapeInfo.width < customShapeInfo.height) {
          currentEditor.resize(customShapeInfo.height + margin * 2, customShapeInfo.height + margin * 2)
        } else {
          currentEditor.resize(customShapeInfo.width + margin * 2, customShapeInfo.height + margin * 2)
        }
        const data = EditorHelper.export(currentEditor)
        console.log(`download file = ${customShapeInfo.name}.png`)
        SystemUtils.generateDownloadFile(data, `${customShapeInfo.name}.png`)
      }
    }
  }

  const handleTestFlowChartShapesSmall = () => {
    if (currentEditor) {
      let count = FlowChartShapes.length
      for (let i = 0; i < count; i++) {
        const margin = 2
        let lineFactor = 1
        let fontFactor = 0.5
        let sizeFactor = 0.25
        let modifierFactor = 0.25
        currentEditor.contentLayer.removeAllEditorItems()
        const customShapeInfo = FlowChartShapes[i].typeInfo
        let left = customShapeInfo.left + margin
        if (customShapeInfo.width < customShapeInfo.height) {
          left = Math.round(customShapeInfo.left + (customShapeInfo.height - customShapeInfo.width) * sizeFactor * 0.5) + margin
        }
        const customShapeTypeName = FlowChartShapes[i].name
        const customEntity = new FlowChartShapes[i].type(left, customShapeInfo.top + margin, customShapeInfo.width * sizeFactor, customShapeInfo.height * sizeFactor, customShapeTypeName)
        customEntity.lineWidth = customEntity.lineWidth * lineFactor
        customEntity.fontSize = customEntity.fontSize * fontFactor
        if (!customShapeInfo.modifyInPercent) {
          customEntity.shape.modifier = new Point2(Math.round(customEntity.shape.modifier.x * modifierFactor), Math.round(customEntity.shape.modifier.y * modifierFactor))
        }
        currentEditor.contentLayer.addEditorItem(customEntity)
        if (customShapeInfo.width < customShapeInfo.height) {
          currentEditor.resize(customShapeInfo.height * sizeFactor + margin * 2, customShapeInfo.height * sizeFactor + margin * 2)
        } else {
          currentEditor.resize(customShapeInfo.width * sizeFactor + margin * 2, customShapeInfo.height * sizeFactor + margin * 2)
        }
        const data = EditorHelper.export(currentEditor)
        console.log(`download file = ${customShapeInfo.name}.png`)
        SystemUtils.generateDownloadFile(data, `${customShapeInfo.name}.png`)
      }
    }
  }

  const handleTestUMLCustomTableLarge = () => {
    if (currentEditor) {
      let count = UMLCustomTableTypes.length
      for (let i = 0; i < count; i++) {
        const margin = 2
        let lineFactor = 1
        let fontFactor = 1
        let sizeFactor = 1
        let modifierFactor = 1
        let controllerFactor = 1
        let firstRowHeightFactor = 1
        currentEditor.contentLayer.removeAllEditorItems()
        const customShapeInfo = UMLCustomTables[i].typeInfo
        customShapeInfo.firstRowHeight = customShapeInfo.firstRowHeight * firstRowHeightFactor
        let left = customShapeInfo.left + margin
        if (customShapeInfo.width < customShapeInfo.height) {
          left = Math.round(customShapeInfo.left + (customShapeInfo.height - customShapeInfo.width) * sizeFactor * 0.5) + margin
        }
        const customShapeTypeName = UMLCustomTables[i].name
        const customEntity = new UMLCustomTables[i].type(left, customShapeInfo.top + margin, customShapeInfo.width * sizeFactor, customShapeInfo.height * sizeFactor, customShapeTypeName, [customShapeInfo])
        customEntity.lineWidth = customEntity.lineWidth * lineFactor
        customEntity.fontSize = customEntity.fontSize * fontFactor
        customEntity.items.forEach(item => {
          item.fontSize = customEntity.fontSize * fontFactor
        })
        if (!customShapeInfo.modifyInPercent) {
          customEntity.shape.modifier = new Point2(Math.round(customEntity.shape.modifier.x * modifierFactor), Math.round(customEntity.shape.modifier.y * modifierFactor))
        }
        if (!customShapeInfo.controlInPercent) {
          customEntity.shape.controller = new Point2(Math.round(customEntity.shape.controller.x * controllerFactor), Math.round(customEntity.shape.controller.y * controllerFactor))
        }
        currentEditor.contentLayer.addEditorItem(customEntity)
        if (customShapeInfo.width < customShapeInfo.height) {
          currentEditor.resize(customShapeInfo.height * sizeFactor + margin * 2, customShapeInfo.height * sizeFactor + margin * 2)
        } else {
          currentEditor.resize(customShapeInfo.width * sizeFactor + margin * 2, customShapeInfo.height * sizeFactor + margin * 2)
        }
        const data = EditorHelper.export(currentEditor)
        console.log(`download file = ${customShapeInfo.name}.png`)
        SystemUtils.generateDownloadFile(data, `${customShapeInfo.name}.png`)
      }
    }
  }

  const handleTestUMLCustomTableSmall = () => {
    if (currentEditor) {
      let count = UMLCustomTables.length
      for (let i = 0; i < count; i++) {
        const margin = 2
        let lineFactor = 1
        let fontFactor = 0.15
        let sizeFactor = 0.20
        let modifierFactor = 0.20
        let controllerFactor = 0.20
        let firstRowHeightFactor = 0.20
        currentEditor.contentLayer.removeAllEditorItems()
        const customShapeInfo = UMLCustomTables[i].typeInfo
        customShapeInfo.firstRowHeight = customShapeInfo.firstRowHeight * firstRowHeightFactor
        let left = customShapeInfo.left + margin
        if (customShapeInfo.width < customShapeInfo.height) {
          left = Math.round(customShapeInfo.left + (customShapeInfo.height - customShapeInfo.width) * sizeFactor * 0.5) + margin
        }
        const customShapeTypeName = UMLCustomTables[i].name
        const customEntity = new UMLCustomTables[i].type(left, customShapeInfo.top + margin, customShapeInfo.width * sizeFactor, customShapeInfo.height * sizeFactor, customShapeTypeName, [customShapeInfo])
        customEntity.lineWidth = customEntity.lineWidth * lineFactor
        customEntity.fontSize = customEntity.fontSize * fontFactor
        customEntity.items.forEach(item => {
          item.fontSize = customEntity.fontSize * fontFactor
        })
        if (!customShapeInfo.modifyInPercent) {
          customEntity.shape.modifier = new Point2(Math.round(customEntity.shape.modifier.x * modifierFactor), Math.round(customEntity.shape.modifier.y * modifierFactor))
        }
        if (!customShapeInfo.controlInPercent) {
          customEntity.shape.controller = new Point2(Math.round(customEntity.shape.controller.x * controllerFactor), Math.round(customEntity.shape.controller.y * controllerFactor))
        }
        currentEditor.contentLayer.addEditorItem(customEntity)
        if (customShapeInfo.width < customShapeInfo.height) {
          currentEditor.resize(customShapeInfo.height * sizeFactor + margin * 2, customShapeInfo.height * sizeFactor + margin * 2)
        } else {
          currentEditor.resize(customShapeInfo.width * sizeFactor + margin * 2, customShapeInfo.height * sizeFactor + margin * 2)
        }
        const data = EditorHelper.export(currentEditor)
        console.log(`download file = ${customShapeInfo.name}.png`)
        SystemUtils.generateDownloadFile(data, `${customShapeInfo.name}.png`)
      }
    }
  }


  const handleTestUMLContainerShapeLarge = () => {
    if (currentEditor) {
      let count = UMLContainerTypes.length
      for (let i = 0; i < count; i++) {
        let shapeType = UMLContainerTypes[i]
        let margin = 5
        let lineFactor = 1
        let fontFactor = 1
        let sizeFactor = 1
        let modifierFactor = 1
        let controllerFactor = 1
        currentEditor.contentLayer.removeAllEditorItems()
        let left = shapeType.left + margin
        // if(shapeType.width < shapeType.height) {
        //   left = Math.round(shapeType.left + (shapeType.height - shapeType.width) * sizeFactor * 0.5) + margin
        // }
        let shapeEntity = new UMLContainerShape(left, shapeType.top + margin, shapeType.width * sizeFactor, shapeType.height * sizeFactor, { shapeType: shapeType.name })
        shapeEntity.lineWidth = shapeEntity.lineWidth * lineFactor
        shapeEntity.fontSize = shapeEntity.fontSize * fontFactor
        if (!shapeType.modifyInPercent) {
          shapeEntity.shape.modifier = new Point2(Math.round(shapeEntity.shape.modifier.x * modifierFactor), Math.round(shapeEntity.shape.modifier.y * modifierFactor))
        }
        if (!shapeType.controlInPercent) {
          shapeEntity.shape.controller = new Point2(Math.round(shapeEntity.shape.controller.x * controllerFactor), Math.round(shapeEntity.shape.controller.y * controllerFactor))
        }
        currentEditor.resize(shapeType.width * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        // if(shapeType.width < shapeType.height) {
        //   currentEditor.resize(shapeType.height * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        // } else {
        //   currentEditor.resize(shapeType.width * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        // }
        currentEditor.contentLayer.addEditorItem(shapeEntity)
        const data = EditorHelper.export(currentEditor)
        SystemUtils.generateDownloadFile(data, `${shapeType.name}.png`)
      }
    }
  }

  const handleTestUMLContainerShapeSmall = () => {
    if (currentEditor) {
      let count = UMLContainerTypes.length
      for (let i = 0; i < count; i++) {
        let shapeType = UMLContainerTypes[i]
        let margin = 2
        let lineFactor = 1
        const factor = shapeType.width >= shapeType.height ? shapeType.width : shapeType.height
        let fontFactor = 28 / factor
        let sizeFactor = 28 / factor
        let modifierFactor = 28 / factor
        let controllerFactor = 28 / factor
        currentEditor.contentLayer.removeAllEditorItems()
        let left = shapeType.left + margin
        if (shapeType.width < shapeType.height) {
          left = Math.round(shapeType.left + (shapeType.height - shapeType.width) * sizeFactor * 0.5) + margin
        }
        let shapeEntity = new UMLContainerShape(left, shapeType.top + margin, shapeType.width * sizeFactor, shapeType.height * sizeFactor, { shapeType: shapeType.name })
        shapeEntity.lineWidth = shapeEntity.lineWidth * lineFactor
        shapeEntity.fontSize = shapeEntity.fontSize * fontFactor
        if (!shapeType.modifyInPercent) {
          shapeEntity.shape.modifier = new Point2(Math.round(shapeEntity.shape.modifier.x * modifierFactor), Math.round(shapeEntity.shape.modifier.y * modifierFactor))
        }
        if (!shapeType.controlInPercent) {
          shapeEntity.shape.controller = new Point2(Math.round(shapeEntity.shape.controller.x * controllerFactor), Math.round(shapeEntity.shape.controller.y * controllerFactor))
        }
        if (shapeType.width < shapeType.height) {
          currentEditor.resize(shapeType.height * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        } else {
          currentEditor.resize(shapeType.width * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        }
        currentEditor.contentLayer.addEditorItem(shapeEntity)
        const data = EditorHelper.export(currentEditor)
        SystemUtils.generateDownloadFile(data, `${shapeType.name}.png`)
      }
    }
  }

  const handleTestUMLBasicShapeLarge = () => {
    if (currentEditor) {
      let count = UMLBasicShapeTypes.length
      for (let i = 0; i < count; i++) {
        let shapeType = UMLBasicShapeTypes[i]
        let margin = 5
        let lineFactor = 1
        let fontFactor = 1
        let sizeFactor = 1
        let modifierFactor = 1
        let controllerFactor = 1
        currentEditor.contentLayer.removeAllEditorItems()
        let left = shapeType.left + margin
        if (shapeType.width < shapeType.height) {
          left = Math.round(shapeType.left + (shapeType.height - shapeType.width) * sizeFactor * 0.5) + margin
        }
        let shapeEntity = new UMLBasicShape(left, shapeType.top + margin, shapeType.width * sizeFactor, shapeType.height * sizeFactor, { shapeType: shapeType.name })
        shapeEntity.lineWidth = shapeEntity.lineWidth * lineFactor
        shapeEntity.fontSize = shapeEntity.fontSize * fontFactor
        if (!shapeType.modifyInPercent) {
          shapeEntity.shape.modifier = new Point2(Math.round(shapeEntity.shape.modifier.x * modifierFactor), Math.round(shapeEntity.shape.modifier.y * modifierFactor))
        }
        if (!shapeType.controlInPercent) {
          shapeEntity.shape.controller = new Point2(Math.round(shapeEntity.shape.controller.x * controllerFactor), Math.round(shapeEntity.shape.controller.y * controllerFactor))
        }
        if (shapeType.width < shapeType.height) {
          currentEditor.resize(shapeType.height * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        } else {
          currentEditor.resize(shapeType.width * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        }
        currentEditor.contentLayer.addEditorItem(shapeEntity)
        const data = EditorHelper.export(currentEditor)
        SystemUtils.generateDownloadFile(data, `${shapeType.name}.png`)
      }
    }
  }

  const handleTestUMLBasicShapeSmall = () => {
    if (currentEditor) {
      let count = UMLBasicShapeTypes.length
      for (let i = 0; i < count; i++) {
        let shapeType = UMLBasicShapeTypes[i]
        let margin = 2
        let lineFactor = 1
        let fontFactor = 0.25
        let sizeFactor = 0.4
        let modifierFactor = 0.4
        let controllerFactor = 0.4
        currentEditor.contentLayer.removeAllEditorItems()
        let left = shapeType.left + margin
        if (shapeType.width < shapeType.height) {
          left = Math.round(shapeType.left + (shapeType.height - shapeType.width) * sizeFactor * 0.5) + margin
        }
        let shapeEntity = new UMLBasicShape(left, shapeType.top + margin, shapeType.width * sizeFactor, shapeType.height * sizeFactor, { shapeType: shapeType.name })
        shapeEntity.lineWidth = shapeEntity.lineWidth * lineFactor
        shapeEntity.fontSize = shapeEntity.fontSize * fontFactor
        if (!shapeType.modifyInPercent) {
          shapeEntity.shape.modifier = new Point2(Math.round(shapeEntity.shape.modifier.x * modifierFactor), Math.round(shapeEntity.shape.modifier.y * modifierFactor))
        }
        if (!shapeType.controlInPercent) {
          shapeEntity.shape.controller = new Point2(Math.round(shapeEntity.shape.controller.x * controllerFactor), Math.round(shapeEntity.shape.controller.y * controllerFactor))
        }
        if (shapeType.width < shapeType.height) {
          currentEditor.resize(shapeType.height * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        } else {
          currentEditor.resize(shapeType.width * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        }
        currentEditor.contentLayer.addEditorItem(shapeEntity)
        const data = EditorHelper.export(currentEditor)
        SystemUtils.generateDownloadFile(data, `${shapeType.name}.png`)
      }
    }
  }


  const handleTestUMLConnectorShapeLarge = () => {
    if (currentEditor) {
      let count = UMLConnectors.length
      for (let i = 0; i < count; i++) {
        let shapeType = UMLConnectors[i]
        let margin = 5
        let lineFactor = 1
        let fontFactor = 1
        let sizeFactor = 1
        currentEditor.contentLayer.removeAllEditorItems()
        shapeType.typeInfo.startX *= sizeFactor
        shapeType.typeInfo.endX *= sizeFactor
        shapeType.typeInfo.startY *= sizeFactor
        shapeType.typeInfo.endY *= sizeFactor
        let start = new Point2(shapeType.typeInfo.startX, shapeType.typeInfo.startY)
        let end = new Point2(shapeType.typeInfo.endX, shapeType.typeInfo.endY)
        let width = Math.max(shapeType.typeInfo.endX - shapeType.typeInfo.startX, shapeType.typeInfo.endY - shapeType.typeInfo.startY)
        let height = width
        let shapeEntity = new UMLConnector(start, end, shapeType.name, [shapeType.typeInfo])
        shapeEntity.lineWidth = shapeEntity.lineWidth * lineFactor
        shapeEntity.fontSize = shapeEntity.fontSize * fontFactor
        if (width < height) {
          currentEditor.resize(height + margin * 2, height + margin * 2)
        } else {
          currentEditor.resize(width + margin * 2, width + margin * 2)
        }
        currentEditor.contentLayer.addEditorItem(shapeEntity)
        const data = EditorHelper.export(currentEditor)
        SystemUtils.generateDownloadFile(data, `${shapeType.name}.png`)
        console.log(`download file: ${shapeType.name}.png`)
      }
    }
  }

  const handleTestUMLConnectorShapeSmall = () => {
    if (currentEditor) {
      let count = UMLConnectors.length
      for (let i = 0; i < count; i++) {
        let shapeType = UMLConnectors[i]
        let margin = 5
        let lineFactor = 1.5
        let fontFactor = 0.05
        let sizeFactor = 0.3
        currentEditor.contentLayer.removeAllEditorItems()
        shapeType.typeInfo.startX *= sizeFactor
        shapeType.typeInfo.endX *= sizeFactor
        shapeType.typeInfo.startY *= sizeFactor
        shapeType.typeInfo.endY *= sizeFactor
        let start = new Point2(shapeType.typeInfo.startX, shapeType.typeInfo.startY)
        let end = new Point2(shapeType.typeInfo.endX, shapeType.typeInfo.endY)
        let width = Math.max(shapeType.typeInfo.endX - shapeType.typeInfo.startX, shapeType.typeInfo.endY - shapeType.typeInfo.startY)
        let height = width
        let shapeEntity = new UMLConnector(start, end, shapeType.name, [shapeType.typeInfo])
        shapeEntity.lineWidth = shapeEntity.lineWidth * lineFactor
        shapeEntity.fontSize = shapeEntity.fontSize * fontFactor
        if (width < height) {
          currentEditor.resize(height + margin * 2, height + margin * 2)
        } else {
          currentEditor.resize(width + margin * 2, width + margin * 2)
        }
        currentEditor.contentLayer.addEditorItem(shapeEntity)
        const data = EditorHelper.export(currentEditor)
        SystemUtils.generateDownloadFile(data, `${shapeType.name}.png`)
        console.log(`download file: ${shapeType.name}.png`)
      }
    }
  }

  const handleTestStyle = () => {
    if (currentEditor) {
      let count = DocumentThemeTypes.length
      for (let i = 0; i < count; i++) {
        const documentTheme = DocumentThemeTypes[i]
        let shapeType = ShapeTypes[0]
        let margin = 5 //2
        let lineFactor = 1 //1
        let fontFactor = 1 //0.5
        let sizeFactor = 0.5 //0.25
        let modifierFactor = 1 //0.25
        currentEditor.contentLayer.removeAllEditorItems()
        let left = shapeType.left + margin
        if (shapeType.width < shapeType.height) {
          left = Math.round(shapeType.left + (shapeType.height - shapeType.width) * sizeFactor * 0.5) + margin
        }
        let shapeEntity = new ShapeEntity(left, shapeType.top + margin, shapeType.width * sizeFactor, shapeType.height * sizeFactor, { shapeType: shapeType.name })
        shapeEntity.lineWidth = shapeEntity.lineWidth * lineFactor
        shapeEntity.fontSize = shapeEntity.fontSize * fontFactor
        shapeEntity.text = 'Text'
        if (!shapeType.modifyInPercent) {
          shapeEntity.shape.modifier = new Point2(Math.round(shapeEntity.shape.modifier.x * modifierFactor), Math.round(shapeEntity.shape.modifier.y * modifierFactor))
        }
        const start = new Point2(left + shapeType.width * sizeFactor * 0.25, shapeType.top + margin + shapeType.height * sizeFactor)
        const end = new Point2(left + shapeType.width * sizeFactor * 0.75, shapeType.top + margin + shapeType.height * sizeFactor)
        const connector = new Connector(start, end, ConnectorDirection.Bottom, ConnectorDirection.Bottom)
        connector.endArrow = ConnectorArrowTypes[1]
        connector.orthogonalPoints = [new Point2(0, 0), new Point2(0, 12), new Point2(0, 24), new Point2(30, 24), new Point2(30, 12), new Point2(30, 0),]
        shapeEntity.themeName = documentTheme.name
        connector.themeName = documentTheme.name
        if (shapeType.width < shapeType.height) {
          currentEditor.resize(shapeType.height * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        } else {
          currentEditor.resize(shapeType.width * sizeFactor + margin * 2, shapeType.height * sizeFactor * 1.8 + margin * 2)
        }
        currentEditor.contentLayer.addEditorItem(shapeEntity)
        currentEditor.contentLayer.addEditorItem(connector)
        const data = EditorHelper.export(currentEditor)
        SystemUtils.generateDownloadFile(data, `${documentTheme.name}.png`)
      }
    }
  }

  const handleTestUMLCustomShapeLarge = () => {
    if (currentEditor) {
      let count = UMLCustomShapeTypes.length
      for (let i = 0; i < count; i++) {
        let shapeType = UMLCustomShapeTypes[i]
        let margin = 5
        let lineFactor = 1
        let fontFactor = 1
        let sizeFactor = 1
        let modifierFactor = 1
        let controllerFactor = 1
        currentEditor.contentLayer.removeAllEditorItems()
        let left = shapeType.left + margin
        // if(shapeType.width < shapeType.height) {
        //   left = Math.round(shapeType.left + (shapeType.height - shapeType.width) * sizeFactor * 0.5) + margin
        // }
        let shapeEntity = new UMLCustomShape(left, shapeType.top + margin, shapeType.width * sizeFactor, shapeType.height * sizeFactor, shapeType.name)
        shapeEntity.lineWidth = shapeEntity.lineWidth * lineFactor
        shapeEntity.fontSize = shapeEntity.fontSize * fontFactor
        if (!shapeType.modifyInPercent) {
          shapeEntity.shape.modifier = new Point2(Math.round(shapeEntity.shape.modifier.x * modifierFactor), Math.round(shapeEntity.shape.modifier.y * modifierFactor))
        }
        if (!shapeType.controlInPercent) {
          shapeEntity.shape.controller = new Point2(Math.round(shapeEntity.shape.controller.x * controllerFactor), Math.round(shapeEntity.shape.controller.y * controllerFactor))
        }
        currentEditor.resize(shapeType.width * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        // if(shapeType.width < shapeType.height) {
        //   currentEditor.resize(shapeType.height * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        // } else {
        //   currentEditor.resize(shapeType.width * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        // }
        currentEditor.contentLayer.addEditorItem(shapeEntity)
        const data = EditorHelper.export(currentEditor)
        SystemUtils.generateDownloadFile(data, `${shapeType.name}.png`)

      }
    }
  }

  const handleTestUMLCustomShapeSmall = () => {
    if (currentEditor) {
      let count = UMLCustomShapeTypes.length
      for (let i = 0; i < count; i++) {
        let shapeType = UMLCustomShapeTypes[i]
        let margin = 2
        let lineFactor = 1
        const factor = shapeType.width >= shapeType.height ? shapeType.width : shapeType.height
        let fontFactor = 28 / factor
        let sizeFactor = 28 / factor
        let modifierFactor = 28 / factor
        let controllerFactor = 28 / factor
        currentEditor.contentLayer.removeAllEditorItems()
        let left = shapeType.left + margin
        if (shapeType.width < shapeType.height) {
          left = Math.round(shapeType.left + (shapeType.height - shapeType.width) * sizeFactor * 0.5) + margin
        }
        let shapeEntity = new UMLCustomShape(left, shapeType.top + margin, shapeType.width * sizeFactor, shapeType.height * sizeFactor, shapeType.name)
        shapeEntity.lineWidth = shapeEntity.lineWidth * lineFactor
        shapeEntity.fontSize = shapeEntity.fontSize * fontFactor
        if (!shapeType.modifyInPercent) {
          shapeEntity.shape.modifier = new Point2(Math.round(shapeEntity.shape.modifier.x * modifierFactor), Math.round(shapeEntity.shape.modifier.y * modifierFactor))
        }
        if (!shapeType.controlInPercent) {
          shapeEntity.shape.controller = new Point2(Math.round(shapeEntity.shape.controller.x * controllerFactor), Math.round(shapeEntity.shape.controller.y * controllerFactor))
        }
        if (shapeType.width < shapeType.height) {
          currentEditor.resize(shapeType.height * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        } else {
          currentEditor.resize(shapeType.width * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        }
        currentEditor.contentLayer.addEditorItem(shapeEntity)
        const data = EditorHelper.export(currentEditor)
        SystemUtils.generateDownloadFile(data, `${shapeType.name}.png`)
      }
    }
  }

  const handleTestUMLFrameShapeLarge = () => {
    if (currentEditor) {
      let count = UMLFrameShapeTypes.length
      for (let i = 0; i < count; i++) {
        let shapeType = UMLFrameShapeTypes[i]
        let margin = 5
        let lineFactor = 1
        let fontFactor = 1
        let sizeFactor = 1
        let modifierFactor = 1
        let controllerFactor = 1
        currentEditor.contentLayer.removeAllEditorItems()
        let left = shapeType.left + margin
        if (shapeType.width < shapeType.height) {
          left = Math.round(shapeType.left + (shapeType.height - shapeType.width) * sizeFactor * 0.5) + margin
        }
        let shapeEntity = new UMLFrameShape(left, shapeType.top + margin, shapeType.width * sizeFactor, shapeType.height * sizeFactor, { shapeType: shapeType.name }, [shapeType])
        shapeEntity.lineWidth = shapeEntity.lineWidth * lineFactor
        shapeEntity.fontSize = shapeEntity.fontSize * fontFactor
        shapeEntity.items.forEach(item => {
          item.fontSize = shapeEntity.fontSize * fontFactor
        })
        if (!shapeType.modifyInPercent) {
          shapeEntity.shape.modifier = new Point2(Math.round(shapeEntity.shape.modifier.x * modifierFactor), Math.round(shapeEntity.shape.modifier.y * modifierFactor))
        }
        if (!shapeType.controlInPercent) {
          shapeEntity.shape.controller = new Point2(Math.round(shapeEntity.shape.controller.x * controllerFactor), Math.round(shapeEntity.shape.controller.y * controllerFactor))
        }
        if (shapeType.width < shapeType.height) {
          currentEditor.resize(shapeType.height * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        } else {
          currentEditor.resize(shapeType.width * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        }
        currentEditor.contentLayer.addEditorItem(shapeEntity)
        const data = EditorHelper.export(currentEditor)
        SystemUtils.generateDownloadFile(data, `${shapeType.name}.png`)
      }
    }
  }

  const handleTestUMLFrameShapeSmall = () => {
    if (currentEditor) {
      let count = UMLFrameShapeTypes.length
      for (let i = 0; i < count; i++) {
        let shapeType = UMLFrameShapeTypes[i]
        let margin = 2
        let lineFactor = 1
        let fontFactor = 0.1
        let sizeFactor = 0.25
        let modifierFactor = 0.25
        let controllerFactor = 0.25
        currentEditor.contentLayer.removeAllEditorItems()
        let left = shapeType.left + margin
        if (shapeType.width < shapeType.height) {
          left = Math.round(shapeType.left + (shapeType.height - shapeType.width) * sizeFactor * 0.5) + margin
        }
        let shapeEntity = new UMLFrameShape(left, shapeType.top + margin, shapeType.width * sizeFactor, shapeType.height * sizeFactor, { shapeType: shapeType.name }, [shapeType])
        shapeEntity.lineWidth = shapeEntity.lineWidth * lineFactor
        shapeEntity.fontSize = shapeEntity.fontSize * fontFactor
        shapeEntity.items.forEach(item => {
          item.fontSize = shapeEntity.fontSize * fontFactor
        })
        if (!shapeType.modifyInPercent) {
          shapeEntity.shape.modifier = new Point2(Math.round(shapeEntity.shape.modifier.x * modifierFactor), Math.round(shapeEntity.shape.modifier.y * modifierFactor))
        }
        if (!shapeType.controlInPercent) {
          shapeEntity.shape.controller = new Point2(Math.round(shapeEntity.shape.controller.x * controllerFactor), Math.round(shapeEntity.shape.controller.y * controllerFactor))
        }
        if (shapeType.width < shapeType.height) {
          currentEditor.resize(shapeType.height * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        } else {
          currentEditor.resize(shapeType.width * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        }
        currentEditor.contentLayer.addEditorItem(shapeEntity)
        const data = EditorHelper.export(currentEditor)
        SystemUtils.generateDownloadFile(data, `${shapeType.name}.png`)
      }
    }
  }

  const handleTestERShapeLarge = () => {
    if (currentEditor) {
      let count = ERCustomShapeTypes.length
      for (let i = 0; i < count; i++) {
        let shapeType = ERCustomShapeTypes[i]
        let margin = 5
        let lineFactor = 1
        let fontFactor = 1
        let sizeFactor = 1
        let modifierFactor = 1
        let controllerFactor = 1
        currentEditor.contentLayer.removeAllEditorItems()
        let left = shapeType.left + margin
        if (shapeType.width < shapeType.height) {
          left = Math.round(shapeType.left + (shapeType.height - shapeType.width) * sizeFactor * 0.5) + margin
        }
        let shapeEntity = new ERCustomShape(left, shapeType.top + margin, shapeType.width * sizeFactor, shapeType.height * sizeFactor, shapeType.name)
        shapeEntity.lineWidth = shapeEntity.lineWidth * lineFactor
        shapeEntity.fontSize = shapeEntity.fontSize * fontFactor
        shapeEntity.items.forEach(item => {
          item.fontSize = shapeEntity.fontSize * fontFactor
        })
        if (!shapeType.modifyInPercent) {
          shapeEntity.shape.modifier = new Point2(Math.round(shapeEntity.shape.modifier.x * modifierFactor), Math.round(shapeEntity.shape.modifier.y * modifierFactor))
        }
        if (!shapeType.controlInPercent) {
          shapeEntity.shape.controller = new Point2(Math.round(shapeEntity.shape.controller.x * controllerFactor), Math.round(shapeEntity.shape.controller.y * controllerFactor))
        }
        if (shapeType.width < shapeType.height) {
          currentEditor.resize(shapeType.height * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        } else {
          currentEditor.resize(shapeType.width * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        }
        currentEditor.contentLayer.addEditorItem(shapeEntity)
        const data = EditorHelper.export(currentEditor)
        SystemUtils.generateDownloadFile(data, `${shapeType.name}.png`)
      }
    }
  }

  const handleTestERShapeSmall = () => {
    if (currentEditor) {
      let count = ERCustomShapeTypes.length
      for (let i = 0; i < count; i++) {
        let shapeType = ERCustomShapeTypes[i]
        let margin = 2
        let lineFactor = 1
        let fontFactor = 0.2
        let sizeFactor = 0.25
        let modifierFactor = 0.25
        let controllerFactor = 0.25
        currentEditor.contentLayer.removeAllEditorItems()
        let left = shapeType.left + margin
        if (shapeType.width < shapeType.height) {
          left = Math.round(shapeType.left + (shapeType.height - shapeType.width) * sizeFactor * 0.5) + margin
        }
        let shapeEntity = new ERCustomShape(left, shapeType.top + margin, shapeType.width * sizeFactor, shapeType.height * sizeFactor, shapeType.name)
        shapeEntity.lineWidth = shapeEntity.lineWidth * lineFactor
        shapeEntity.fontSize = shapeEntity.fontSize * fontFactor
        shapeEntity.items.forEach(item => {
          item.fontSize = shapeEntity.fontSize * fontFactor
        })
        if (!shapeType.modifyInPercent) {
          shapeEntity.shape.modifier = new Point2(Math.round(shapeEntity.shape.modifier.x * modifierFactor), Math.round(shapeEntity.shape.modifier.y * modifierFactor))
        }
        if (!shapeType.controlInPercent) {
          shapeEntity.shape.controller = new Point2(Math.round(shapeEntity.shape.controller.x * controllerFactor), Math.round(shapeEntity.shape.controller.y * controllerFactor))
        }
        if (shapeType.width < shapeType.height) {
          currentEditor.resize(shapeType.height * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        } else {
          currentEditor.resize(shapeType.width * sizeFactor + margin * 2, shapeType.width * sizeFactor + margin * 2)
        }
        currentEditor.contentLayer.addEditorItem(shapeEntity)
        const data = EditorHelper.export(currentEditor)
        SystemUtils.generateDownloadFile(data, `${shapeType.name}.png`)
      }
    }
  }

  const handleTestMockupShapeLarge = () => {
    if (currentEditor) {
      let count = MockupCustomShapeTypes.length
      for (let i = 0; i < count; i++) {
        let shapeType = MockupCustomShapeTypes[i]
        let margin = 5
        let lineFactor = 1
        let fontFactor = 1
        let sizeFactor = 1
        let modifierFactor = 1
        let controllerFactor = 1
        currentEditor.contentLayer.removeAllEditorItems()
        let left = shapeType.left + margin
        if (shapeType.width < shapeType.height) {
          left = Math.round(shapeType.left + (shapeType.height - shapeType.width) * sizeFactor * 0.5) + margin
        }
        let shapeEntity = new MockupCustomShape(left, shapeType.top + margin, shapeType.width * sizeFactor, shapeType.height * sizeFactor, shapeType.name)
        shapeEntity.lineWidth = shapeEntity.lineWidth * lineFactor
        shapeEntity.fontSize = shapeEntity.fontSize * fontFactor
        shapeEntity.items.forEach(item => {
          item.fontSize = shapeEntity.fontSize * fontFactor
        })
        if (!shapeType.modifyInPercent) {
          shapeEntity.shape.modifier = new Point2(Math.round(shapeEntity.shape.modifier.x * modifierFactor), Math.round(shapeEntity.shape.modifier.y * modifierFactor))
        }
        if (!shapeType.controlInPercent) {
          shapeEntity.shape.controller = new Point2(Math.round(shapeEntity.shape.controller.x * controllerFactor), Math.round(shapeEntity.shape.controller.y * controllerFactor))
        }
        if (shapeType.width < shapeType.height) {
          currentEditor.resize(shapeType.height * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        } else {
          currentEditor.resize(shapeType.width * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        }
        currentEditor.contentLayer.addEditorItem(shapeEntity)
        const data = EditorHelper.export(currentEditor)
        SystemUtils.generateDownloadFile(data, `${shapeType.name}.png`)
      }
    }
  }

  const handleTestMockupShapeSmall = () => {
    if (currentEditor) {
      let count = MockupCustomShapeTypes.length
      for (let i = 0; i < count; i++) {
        let shapeType = MockupCustomShapeTypes[i]
        let margin = 2
        let lineFactor = 2
        const factor = shapeType.width >= shapeType.height ? shapeType.width : shapeType.height
        let fontFactor = 1 //factor / 28
        let sizeFactor = 1 //factor / 28
        let modifierFactor = 1 // factor / 28
        let controllerFactor = 1 //factor / 28
        currentEditor.contentLayer.removeAllEditorItems()
        let left = shapeType.left + margin
        if (shapeType.width < shapeType.height) {
          left = Math.round(shapeType.left + (shapeType.height - shapeType.width) * sizeFactor * 0.5) + margin
        }
        let shapeEntity = new MockupCustomShape(left, shapeType.top + margin, shapeType.width * sizeFactor, shapeType.height * sizeFactor, shapeType.name)
        shapeEntity.lineWidth = shapeEntity.lineWidth * lineFactor
        shapeEntity.fontSize = shapeEntity.fontSize * fontFactor
        if (!shapeType.modifyInPercent) {
          shapeEntity.shape.modifier = new Point2(Math.round(shapeEntity.shape.modifier.x * modifierFactor), Math.round(shapeEntity.shape.modifier.y * modifierFactor))
        }
        if (!shapeType.controlInPercent) {
          shapeEntity.shape.controller = new Point2(Math.round(shapeEntity.shape.controller.x * controllerFactor), Math.round(shapeEntity.shape.controller.y * controllerFactor))
        }
        if (shapeType.width < shapeType.height) {
          currentEditor.resize(shapeType.height * sizeFactor + margin * 2, shapeType.height * sizeFactor + margin * 2)
        } else {
          currentEditor.resize(shapeType.width * sizeFactor + margin * 2, shapeType.width * sizeFactor + margin * 2)
        }
        currentEditor.contentLayer.addEditorItem(shapeEntity)
        const data = EditorHelper.export(currentEditor)
        SystemUtils.generateDownloadFile(data, `${shapeType.name}.png`)
      }
    }
  }

  const handleFontHelper = async () => {
    if (window.queryLocalFonts) {
      console.log(`Good to check local fonts `)
      const availableFonts = await window.queryLocalFonts()
      for (const fontData in availableFonts) {
        console.log(fontData.postcriptName)
      }
    } else {
      console.log(`Bad to check local fonts `)
    }
    await FontUtils.getWebFontData('Noto Serif SC')
    await FontUtils.loadWebFontFilesEx()
    //const webFonts = EngineUtils.webFonts
    //EngineUtils.getWebFontData('Roboto')
    //EngineUtils.getWebFontData('Roboto')
    //console.log(`${webFonts}`)
    //const googleFonts = await RequestUtils.getGoogleFonts()
    //console.log(googleFonts)
  }
  const fileItems: MenuProps['items'] = [
    { key: 'New', label: <FormattedMessage id='workspace.header.menu-file-new' />, icon: <FileAddOutlined />, onClick: handleFileNew },
    { key: 'OpenFrom', label: <FormattedMessage id='workspace.header.menu-file-open-from' />, disabled: true, icon: <FolderOpenOutlined />, },
    { key: 'Open', label: <FormattedMessage id='workspace.header.menu-file-open' />, icon: <FolderOpenOutlined />, onClick: handleFileOpen, },
    { key: 'Save', label: <FormattedMessage id='workspace.header.menu-file-save' />, icon: <SaveOutlined />, onClick: handleFileSave },
    {
      key: 'OpenLocal',
      label: <Upload showUploadList={false} maxCount={1} accept='.ratel'
        beforeUpload={handleBeforeImportDocument} onChange={handleAfterImportDocument}>
        <FolderOpenOutlined style={{ marginRight: 10 }} />
        <FormattedMessage id='workspace.header.menu-file-open-local-document' />
      </Upload>,
      // icon: <FolderOpenOutlined />, 
      // onClick: handleImportDocument 
    },
    { key: 'SaveToLocal', label: <FormattedMessage id='workspace.header.menu-file-save-local-document' />, icon: <DownloadOutlined />, onClick: handleDownload },
    // {
    //   key: 'Import', label: <FormattedMessage id='workspace.header.menu-file-import' />, icon: <FolderOpenOutlined />,
    //   children: [
    //   ]
    // },
    {
      key: 'Export', label: <FormattedMessage id='workspace.header.menu-file-export' />, icon: <DownloadOutlined />,
      children: [
        { key: 'ExportToPNG', label: <FormattedMessage id='workspace.header.menu-file-export-png' />, icon: <DownloadOutlined />, onClick: () => handleExport('png') },
        // { key: 'ExportToJPG', label: <FormattedMessage id='workspace.header.menu-file-export-jpg' />, icon: <DownloadOutlined />, onClick: () => handleExport('jpg') },
        { key: 'ExportToSVG', label: <FormattedMessage id='workspace.header.menu-file-export-svg' />, icon: <DownloadOutlined />, onClick: () => handleExportSVG() },
      ]
    },
    {
      key: 'ExportSelected', label: <FormattedMessage id='workspace.header.menu-file-export-selected' />, icon: <DownloadOutlined />,
      children: [
        { key: 'ExportSelectedToPNG', label: <FormattedMessage id='workspace.header.menu-file-export-selected-png' />, icon: <DownloadOutlined />, onClick: () => handleExportSelected('png') },
        // { key: 'ExportSelectedToJPG', label: <FormattedMessage id='workspace.header.menu-file-export-selected-jpg' />, icon: <DownloadOutlined />, onClick: () => handleExportSelected('jpg') },
        { key: 'ExportSelectedToSVG', label: <FormattedMessage id='workspace.header.menu-file-export-selected-svg' />, icon: <DownloadOutlined />, onClick: () => handleExportSelectedSVG() },
      ]
    },
  ];

  const editItems: MenuProps['items'] = [
    { label: <FormattedMessage id='workspace.content.popup-editor-undo' />, key: '1', onClick: handleUndo, disabled: !editorUndoable, icon: <CheckOutlined style={{ visibility: 'hidden' }} /> },
    { label: <FormattedMessage id='workspace.content.popup-editor-redo' />, key: '2', onClick: handleRedo, disabled: !editorRedoable, icon: <CheckOutlined style={{ visibility: 'hidden' }} /> },
    { type: 'divider' },
    { label: <FormattedMessage id='workspace.content.popup-shape-copy' />, key: '3', onClick: handleCopy, disabled: !ifEditorSupportCopy(), icon: <CheckOutlined style={{ visibility: 'hidden' }} /> },
    { label: <FormattedMessage id='workspace.content.popup-shape-cut' />, key: '4', onClick: handleCut, disabled: !ifEditorSupportCut(), icon: <CheckOutlined style={{ visibility: 'hidden' }} /> },
    { label: <FormattedMessage id='workspace.content.popup-shape-paste' />, key: '5', onClick: handlePaste, disabled: !ifEditorSupportPaste(), icon: <CheckOutlined style={{ visibility: 'hidden' }} /> },
    { label: <FormattedMessage id='workspace.content.popup-shape-duplicate' />, key: '6', onClick: handleDuplicate, disabled: !ifEditorSupportDuplicate(), icon: <CheckOutlined style={{ visibility: 'hidden' }} /> },
    { type: 'divider' },
    { label: <FormattedMessage id='workspace.content.popup-shape-delete' />, key: '7', onClick: handleDelete, disabled: !ifEditorSupportDelete(), icon: <CheckOutlined style={{ visibility: 'hidden' }} /> },
    { type: 'divider' },
    { label: <FormattedMessage id='workspace.content.popup-shape-lock' />, key: '8', onClick: handleLock, disabled: !ifEditorSupportLock(), icon: <CheckOutlined style={{ visibility: 'hidden' }} /> },
    { type: 'divider' },
    { label: <FormattedMessage id='workspace.content.popup-shape-to-front' />, key: '9', onClick: handleToFront, disabled: !ifEditorSupportToFront(), icon: <CheckOutlined style={{ visibility: 'hidden' }} /> },
    { label: <FormattedMessage id='workspace.content.popup-shape-to-back' />, key: '10', onClick: handleToBack, disabled: !ifEditorSupportToBack(), icon: <CheckOutlined style={{ visibility: 'hidden' }} /> },
    { label: <FormattedMessage id='workspace.content.popup-shape-bring-foreward' />, key: '11', onClick: handleBringForewared, disabled: !ifEditorSupportBringForeward(), icon: <CheckOutlined style={{ visibility: 'hidden' }} /> },
    { label: <FormattedMessage id='workspace.content.popup-shape-send-backward' />, key: '12', onClick: handleSendBackward, disabled: !ifEditorSupportSendBackward(), icon: <CheckOutlined style={{ visibility: 'hidden' }} /> },
    { type: 'divider' },
    { label: <FormattedMessage id='workspace.content.popup-shape-add-to-my-shapes' />, key: '13', onClick: handleAddToMyShapes, disabled: !ifEditorSupportAddToMyShapes(), icon: <CheckOutlined style={{ visibility: 'hidden' }} /> },
  ];

  const viewItems: MenuProps['items'] = [
    { label: <FormattedMessage id='workspace.header.menu-view.show-property-editor' />, key: '1', onClick: handlePropertyEditorChange, icon: <CheckOutlined style={{ visibility: Utils.enablePropertyEditor ? 'visible' : 'hidden' }} /> },
    { type: 'divider' },
    { label: <FormattedMessage id='workspace.header.menu-view.show-grid' />, key: '2', onClick: handleShowGrid, icon: <CheckOutlined style={{ visibility: Utils.currentEditor?.showGrid ? 'visible' : 'hidden' }} /> },
    { label: <FormattedMessage id='workspace.header.menu-view.show-ruler' />, key: '2', onClick: handleShowRuler, icon: <CheckOutlined style={{ visibility: showRuler ? 'visible' : 'hidden' }} /> },
    { type: 'divider' },
    { label: <FormattedMessage id='workspace.header.menu-view.zoom-reset' />, key: '3', onClick: handleResetView, icon: <CheckOutlined style={{ visibility: 'hidden' }} /> },
    { label: <FormattedMessage id='workspace.header.menu-view.zoom-in' />, key: '4', onClick: handleZoomIn, icon: <CheckOutlined style={{ visibility: 'hidden' }} /> },
    { label: <FormattedMessage id='workspace.header.menu-view.zoom-out' />, key: '5', onClick: handleZoomOut, icon: <CheckOutlined style={{ visibility: 'hidden' }} /> },
  ];

  // const operationItems: MenuProps['items'] = [
  //   // { key: 'New', label: 'New', },
  //   // { key: 'OpenFrom', label: 'OpenFrom', },
  //   // { key: 'Open', label: 'Open', },
  //   // { key: 'Save', label: 'Save', },
  //   // { key: 'SaveAs', label: 'SaveAs', },
  //   // { key: 'Export', label: 'Export', },
  // ];

  const optionItems: MenuProps['items'] = [
    {
      key: 'Language', label: <FormattedMessage id='workspace.header.menu-option-language' />, icon: <CheckOutlined style={{ visibility: 'hidden' }} />, children: [
        { key: 'zh-CN', label: '中文', onClick: () => handleLocale('zh-CN'), icon: getLocale() == 'zh-CN' ? <CheckOutlined /> : <Placeholder />, },
        { key: 'en-US', label: 'English(US)', onClick: () => handleLocale('en-US'), icon: getLocale() == 'en-US' ? <CheckOutlined /> : <Placeholder />, },
      ]
    },
    // { key: 'OpenFrom', label: 'OpenFrom', },
    // { key: 'Open', label: 'Open', },
    // { key: 'Save', label: 'Save', },
  ]

  const developmentItems: MenuProps['items'] = [
    { key: 'Generate Icons', label: 'Generate Icons', onClick: () => handleGenerateIcons() },
    { key: 'Generate Connector Start Arrows', label: 'Generate Connector Start Arrows', onClick: handleGenerateConnectorStartArrows, },
    { key: 'Generate Connector End Arrows', label: 'Generate Connector End Arrows', onClick: handleGenerateConnectorEndArrows, },
    { key: 'Generate Connector Line Modes', label: 'Generate Connector Line Modes', onClick: handleGenerateConnectorLineModes, },
    { key: 'Generate Connector Line Types', label: 'Generate Connector Line Types', onClick: handleGenerateConnectorLineTypes, },
    { key: 'Generate Dash Styles', label: 'Generate Dash Styles', onClick: handleGenerateDashStyles, },
    { key: 'Test Style', label: 'Test Style', onClick: handleTestStyle, },
    { key: 'Test Code', label: 'SaveAs', onClick: handleTestCode },
    // { key: 'Test Shapes', label: 'Test Shapes', onClick: handleContainerShapesLarge, },
    // { key: 'Test Container Shapes Large', label: 'Test Container Shapes Large', onClick: handleContainerShapesLarge, },
    // { key: 'Test Container Shapes Small', label: 'Test Container Shapes Small', onClick: handleContainerShapesSmall, },
    // { key: 'Test Custom Shapes Large', label: 'Test Custom Shapes Large', onClick: handleTest5, },
    // { key: 'Test Custom Shapes Small', label: 'Test Custom Shapes Small', onClick: handleTest6, },
    // { key: 'Test Custom Shapes Arrow Large', label: 'Test Custom Shapes Arrow Large', onClick: handleTestArrows, },
    // { key: 'Test Custom Shapes Arrow Small', label: 'Test Custom Shapes Arrow Small', onClick: handleTestArrowsSmall, },
    // { key: 'Test Custom Shapes SVG Large', label: 'Test Custom Shapes SVG Large', onClick: handleTestSvgShapes, },
    // { key: 'Test Custom Shapes SVG Small', label: 'Test Custom Shapes SVG Small', onClick: handleTestSvgShapesSmall, },
    // { key: 'Test Custom Shapes Image Large', label: 'Test Custom Shapes Image Large', onClick: handleTestImageShapes, },
    // { key: 'Test Custom Shapes Image Small', label: 'Test Custom Shapes Image Small', onClick: handleTestImageShapesSmall, },
    // { key: 'Test Custom Shapes FlowChart Large', label: 'Test Custom Shapes FlowChart Large', onClick: handleTestFlowChartShapes, },
    // { key: 'Test Custom Shapes FlowChart Small', label: 'Test Custom Shapes FlowChart Small', onClick: handleTestFlowChartShapesSmall, },
    // { key: 'Test UML CustomTable Large', label: 'Test UML CustomTable Large', onClick: handleTestUMLCustomTableLarge, },
    // { key: 'Test UML CustomTable Small', label: 'Test UML CustomTable Small', onClick: handleTestUMLCustomTableSmall, },
    // { key: 'Test UML Container Large', label: 'Test UML Container Large', onClick: handleTestUMLContainerShapeLarge, },
    // { key: 'Test UML Container Small', label: 'Test UML Container Small', onClick: handleTestUMLContainerShapeSmall, },
    // { key: 'Test UML Basic Shape Large', label: 'Test UML Basic Shape Large', onClick: handleTestUMLBasicShapeLarge, },
    // { key: 'Test UML Basic Shape Small', label: 'Test UML Basic Shape Small', onClick: handleTestUMLBasicShapeSmall, },
    // { key: 'Test UML Connector Large', label: 'Test UML Connector Large', onClick: handleTestUMLConnectorShapeLarge, },
    // { key: 'Test UML Connector Small', label: 'Test UML Connector Small', onClick: handleTestUMLConnectorShapeSmall, },
    // { key: 'Test UML Custom Shape Large', label: 'Test UML Custom Shape Large', onClick: handleTestUMLCustomShapeLarge, },
    // { key: 'Test UML Custom Shape Small', label: 'Test UML Custom Shape Small', onClick: handleTestUMLCustomShapeSmall, },
    // { key: 'Test UML Frame Shape Large', label: 'Test UML Frame Shape Large', onClick: handleTestUMLFrameShapeLarge, },
    // { key: 'Test UML Frame Shape Small', label: 'Test UML Frame Shape Small', onClick: handleTestUMLFrameShapeSmall, },
    // { key: 'Test Mockup Shape Large', label: 'Test Mockup Shape Large', onClick: handleTestMockupShapeLarge, },
    // { key: 'Test Mockup Shape Small', label: 'Test Mockup Shape Small', onClick: handleTestMockupShapeSmall, },
    // { key: 'Test ER Shape Large', label: 'Test ER Shape Large', onClick: handleTestERShapeLarge, },
    // { key: 'Test ER Shape Small', label: 'Test ER Shape Small', onClick: handleTestERShapeSmall, },
  ];

  const helpItems: MenuProps['items'] = [
    { key: 'About', label: <FormattedMessage id='workspace.header.menu-help-about' />, onClick: handleAbout, },
    // { key: 'OpenFrom', label: 'OpenFrom', },
    // { key: 'Open', label: 'Open', },
    // { key: 'Save', label: 'Save', },
    // { key: 'SaveAs', label: 'SaveAs', },
    // { key: 'Export', label: 'Export', },
  ];

  const userProfileMenu: MenuProps['items'] = [
    { key: 'UpdatePassword', label: <FormattedMessage id='workspace.header.user-profile-update-password-title' />, onClick: handleUpdatePassword },
    { key: 'UpdateProfile', label: <FormattedMessage id='workspace.header.user-profile-update-profile-title' />, onClick: handleUpdateProfile },
    { key: 'Logout', label: <FormattedMessage id='workspace.header.button-logout-title' />, onClick: logout },
  ]

  return (
    <div style={{ position: 'absolute', top: '0px', height: `${Utils.HEADER_HEIGHT}px`, width: `calc(100% - ${adRegionWidth}px`, }}>
      {contextHolder}
      <div style={{ width: '100%', height: '49%', userSelect: 'none', webkitAppRegion: 'drag'}}>
        <div style={{ width: '100%', height: '100%', float: 'left', display: 'table' }}>
          <Space direction="horizontal" style={{ display: 'table-cell', verticalAlign: 'middle' , }}>
            <Space wrap={false}>
              <div style={{width: osType === OSType.MACOS ?  65 : 0, height: '100%'}}/>
              <Dropdown menu={{ items: fileItems }}>
                <Button type='text' size='small' style={{webkitAppRegion: 'no-drag'}}><FormattedMessage id='workspace.header.menu-file' /></Button>
              </Dropdown>
              <Dropdown menu={{ items: editItems }}>
                <Button type='text' size='small' style={{webkitAppRegion: 'no-drag'}}><FormattedMessage id='workspace.header.menu-edit' /></Button>
              </Dropdown>
              <Dropdown menu={{ items: viewItems }}>
                <Button type='text' size='small' style={{webkitAppRegion: 'no-drag'}}><FormattedMessage id='workspace.header.menu-view' /></Button>
              </Dropdown>
              {/* <Dropdown menu={{ items: operationItems }}>
                <Button type='text' size='small'><FormattedMessage id='workspace.header.menu-operation' /></Button>
              </Dropdown> */}
              <Dropdown menu={{ items: optionItems }}>
                <Button type='text' size='small' style={{webkitAppRegion: 'no-drag'}}><FormattedMessage id='workspace.header.menu-option' /></Button>
              </Dropdown>
              {"false" == process.env.PRODUCTION
                ? <Dropdown menu={{ items: developmentItems }}>
                  <Button type='text' size='small' style={{webkitAppRegion: 'no-drag'}}>Development Menu</Button>
                </Dropdown>
                : ''
              }
              <Dropdown menu={{ items: helpItems }}>
                <Button type='text' size='small' style={{webkitAppRegion: 'no-drag'}}><FormattedMessage id='workspace.header.menu-help' /></Button>
              </Dropdown>
              <Button type='text' size='small' icon={<FileOutlined />} style={{ paddingLeft: '0px', fontSize: '11px', color: 'gray', fontStyle: 'italic', marginLeft: '24px', webkitAppRegion: 'no-drag' }}>{documentModifiedText}</Button>
              <FileTextOutlined />
              <Input placeholder='Document Name' type='text' value={selectedDocumentName} bordered={false} style={{ paddingLeft: '0px', paddingRight: '0px', width: '70px', fontWeight: 'bolder', webkitAppRegion: 'no-drag' }} onChange={handleUpdateDocumentName} />
              {/* <div style={{fontSize: 14, color: 'red', fontWeight: 'bold'}}>
                Demo purpose only and reset periodically
              </div> */}
            </Space>
          </Space>
        </div>
        <div style={{ position: 'absolute', height: '50%', right: `0px`, }}>
          <div style={{ float: 'right', display: 'table', height: '100%', marginRight: '8px' }}>
            <Space direction="horizontal" style={{ display: 'table-cell', verticalAlign: 'middle' }}>
              <Space wrap={false}>
                <Button type='text' size='small' href='https://github.com/iapoo/ratel-web/issues' target='_blank'><FormattedMessage id='workspace.header.button-feedback' style={{webkitAppRegion: 'no-drag'}}/></Button>
                <Tooltip title={<FormattedMessage id='workspace.header.title.open-source-web-site' />}>
                  <Button shape='circle' type='text' size='small' icon={<GithubOutlined />} href='https://github.com/iapoo/ratel-web' target='_blank' style={{webkitAppRegion: 'no-drag'}}></Button>
                </Tooltip>
                <Dropdown menu={{ items: userProfileMenu }}>
                  <Button shape='circle' type='text' size='small' icon={<UserOutlined />} style={{ display: online ? 'inline' : 'none', webkitAppRegion: 'no-drag' }} />
                </Dropdown>
                <Button type='text' size='small' style={{ display: online ? 'none' : 'inline', webkitAppRegion: 'no-drag'  }} onClick={() => login(ON_LOGIN_NONE)}><FormattedMessage id='workspace.header.button-login-title' /></Button>
                <Button type='primary' size='small' style={{ display: online ? 'none' : 'inline', webkitAppRegion: 'no-drag' }} onClick={() => register()}><FormattedMessage id='workspace.header.button-register-title' /></Button>
                <div style={{width: osType === OSType.WINDOWS ? 65 : 0, height: '100%' }}/>
              </Space>
            </Space>
          </div>
        </div>
      </div>
      <div style={{ width: '100%', height: '1%', backgroundColor: splitColor }}></div>
      <div style={{ width: '100%', height: '50%', }}>
        <div style={{ float: 'left', height: '100%', display: 'table', marginLeft: '8px', }}>
          <Space direction="horizontal" wrap={false} style={{ display: 'table-cell', verticalAlign: 'middle' }}>
            <Space wrap={false}>
              <Tooltip title={<FormattedMessage id='workspace.header.title.zoom' />}>
                <Select style={{ width: 100 }} value={zoom} size='small' onChange={handleZoom} bordered={false}
                  options={zoomOptions}
                />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.zoom-in' />}>
                <Button type="text" size='small' icon={<ZoomInOutlined />} disabled={zoom >= zoomOptions[zoomOptions.length - 1].value} onClick={handleZoomIn} />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.zoom-out' />}>
                <Button type="text" size='small' icon={<ZoomOutOutlined />} disabled={zoom <= zoomOptions[0].value} onClick={handleZoomOut} />
              </Tooltip>
              <Divider type='vertical' style={{ margin: 0 }} />
              <Tooltip title={<FormattedMessage id='workspace.header.title.undo' />}>
                <Button type="text" size='small' icon={<UndoOutlined />} disabled={!editorUndoable} onClick={handleUndo} />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.redo' />}>
                <Button type="text" size='small' icon={<RedoOutlined />} disabled={!editorRedoable} onClick={handleRedo} />
              </Tooltip>
              <Divider type='vertical' style={{ margin: 0 }} />
              {/** TODO:  FIXME, HIDE TEMPORARY*/}
              <Tooltip title={<FormattedMessage id='workspace.header.title.font-size' />}>
                <Select size='small' value={fontName} onChange={handleFontNameChange} style={{ width: 120, }} popupMatchSelectWidth={false} disabled={!selectionValid} options={FontNameOptions} bordered={false} />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.font-size' />}>
                {/* <InputNumber min={Consts.FONT_SIZE_MIN} max={Consts.FONT_SIZE_MAX} value={fontSize}
                  ref={(node) => { setFontSizeNode(node) }}
                  onChange={handleFontSizeChange} onStep={handleFontSizeStepChange} onBlur={handleFontSizeBlur} onPressEnter={handleFontSizePressEnter} size='small' style={{ width: 60, display: 'none' }} disabled={!selectionValid} /> */}
                <Select size='small' value={fontSize} onChange={handleFontSizeChange} style={{ width: 64, }} disabled={!selectionValid} options={FontSizeOptions} bordered={false} />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.font-bold' />}>
                <Button type={fontBold ? 'primary' : 'text'} size='small' icon={<BoldOutlined />} disabled={!selectionValid} onClick={handleBoldChanged} />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.font-italic' />}>
                <Button type={fontItalic ? 'primary' : 'text'} size='small' icon={<ItalicOutlined />} disabled={!selectionValid} onClick={handleItalicChanged} />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.font-underline' />}>
                <Button type={fontUnderline ? 'primary' : 'text'} size='small' icon={<UnderlineOutlined />} disabled={!selectionValid} onClick={handleUnderlineChanged} />
              </Tooltip>
              <Divider type='vertical' style={{ margin: 0 }} />
              <Tooltip title={<FormattedMessage id='workspace.header.title.text-left' />}>
                <Button type={textAlignment == Consts.TEXT_ALIGNMENT_LEFT ? 'primary' : 'text'} size='small' icon={<AlignLeftOutlined />} disabled={!selectionValid} onClick={() => handleTextAlignmentChanged(Consts.TEXT_ALIGNMENT_LEFT)} />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.text-center' />}>
                <Button type={textAlignment == Consts.TEXT_ALIGNMENT_CENTER ? 'primary' : 'text'} size='small' icon={<AlignCenterOutlined />} disabled={!selectionValid} onClick={() => handleTextAlignmentChanged(Consts.TEXT_ALIGNMENT_CENTER)} />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.text-right' />}>
                <Button type={textAlignment == Consts.TEXT_ALIGNMENT_RIGHT ? 'primary' : 'text'} size='small' icon={<AlignRightOutlined />} disabled={!selectionValid} onClick={() => handleTextAlignmentChanged(Consts.TEXT_ALIGNMENT_RIGHT)} />
              </Tooltip>
              <Divider type='vertical' style={{ margin: 0 }} />
              <Tooltip title={<FormattedMessage id='workspace.header.title.text-top' />}>
                <Button type={textVerticalAlignment == Consts.PLACE_HOLDER_ALIGNMENT_TOP ? 'primary' : 'text'} size='small' icon={<VerticalAlignTopOutlined />} disabled={!selectionValid} onClick={() => handleTextVerticalAlignmentChanged(Consts.PLACE_HOLDER_ALIGNMENT_TOP)} />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.text-middle' />}>
                <Button type={textVerticalAlignment == Consts.PLACE_HOLDER_ALIGNMENT_MIDDLE ? 'primary' : 'text'} size='small' icon={<VerticalAlignMiddleOutlined />} disabled={!selectionValid} onClick={() => handleTextVerticalAlignmentChanged(Consts.PLACE_HOLDER_ALIGNMENT_MIDDLE)} />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.text-bottom' />}>
                <Button type={textVerticalAlignment == Consts.PLACE_HOLDER_ALIGNMENT_BOTTOM ? 'primary' : 'text'} size='small' icon={<VerticalAlignBottomOutlined />} disabled={!selectionValid} onClick={() => handleTextVerticalAlignmentChanged(Consts.PLACE_HOLDER_ALIGNMENT_BOTTOM)} />
              </Tooltip>
              <Divider type='vertical' style={{ margin: 0 }} />
              <Tooltip title={<FormattedMessage id='workspace.header.title.fill-color' />}>
                <ColorPicker size='small' value={fillColor} trigger='hover' onChange={handleFillColorChange} onChangeComplete={handleFillColorChangeComplete} disabled={!selectionValid} destroyTooltipOnHide={true} />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.stroke-color' />}>
                <ColorPicker size='small' value={strokeColor} trigger='hover' onChange={handleStrokeColorChange} onChangeComplete={handleStrokeColorChangeComplete} disabled={!selectionValid} destroyTooltipOnHide={true} />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.font-color' />}>
                <ColorPicker size='small' value={fontColor} trigger='hover' onChange={handleFontColorChange} onChangeComplete={handleFontColorChangeComplete} disabled={!selectionValid} destroyTooltipOnHide={true} />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.line-width' />}>
                {/** TODO:  FIXME, HIDE TEMPORARY*/}
                <InputNumber min={Consts.LINE_WIDTH_MIN} max={Consts.LINE_WIDTH_MAX} value={lineWidth} onChange={handleLineWidthChange} size='small' style={{ width: 50, display: 'none' }} disabled={!selectionValid} />
                <Select size='small' value={lineWidth} onChange={handleLineWidthChange} style={{ width: 64, }} disabled={!selectionValid} options={LineWidthOptions} bordered={false} />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.stroke-type' />}>
                <Select size='small' value={strokeDashStyle} onChange={handleStrokeDashStyleChange} style={{ width: 85 }} dropdownStyle={{ width: 85 }} options={strokeDashStyles} bordered={false} disabled={!selectionValid} />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.connector-line-type' />}>
                <Select size='small' value={connectorLineType} onChange={handleConnectorLineTypeChange} style={{ width: 56 }} disabled={!connectorSelected} options={connectorLineTypes} bordered={false} />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.connector-arrow-start-type' />}>
                <Select size='small' value={connectorLineStartArrow} onChange={handleConnectorArrowStartTypeChange} style={{ width: 56 }} disabled={!connectorSelected} options={connectorLineStartArrows} bordered={false} />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.connector-arrow-end-type' />}>
                <Select size='small' value={connectorLineEndArrow} onChange={handleConnectorArrowEndTypeChange} style={{ width: 56 }} disabled={!connectorSelected} options={connectorLineEndArrows} bordered={false} />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.connector-line-mode' />}>
                <Select size='small' value={connectorLineMode} onChange={handleConnectorLineModeChange} style={{ width: 56, }} disabled={!connectorSelected} options={connectorLineType == Consts.CONNECTOR_LINE_TYPE_CURVED ? connectorLineModesForCurve : connectorLineModes} bordered={false} />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.connector-line-mode-link-width' />}>
                <Select size='small' value={doubleLineGap} onChange={handleDoubleLineGapChange} style={{ width: 64, }} disabled={!(connectorSelected && connectorLineMode != Consts.CONNECTOR_LINE_MODE_SIGNLE)} options={DoubleLineGapOptions} bordered={false} />
              </Tooltip>
            </Space>
          </Space>
        </div>
        <div style={{position:'absolute', top: `${Utils.HEADER_HEIGHT * 0.5}px`, height: '50%', display: 'table', right: `${adRegionWidth}px`, backgroundColor: workspaceBackground }}>
          <Space direction="horizontal" style={{ display: 'table-cell', verticalAlign: 'middle' }}>
            <Space wrap={false}>
              <Tooltip title={<FormattedMessage id='workspace.header.title.theme-switch' />}>
                <Button shape="circle" type="text" icon={Utils.currentEditor?.enableDarkTheme ? <SunOutlined /> : <MoonOutlined />} onClick={handleThemeChange} />
              </Tooltip>
              <Tooltip title={<FormattedMessage id='workspace.header.title.property-editor' />}>
                <Button shape="circle" type="text" icon={<SettingOutlined />} onClick={handlePropertyEditorChange} />
              </Tooltip>
            </Space>
          </Space>
        </div>
      </div>
      <LoginFormWindow visible={loginFormWindowVisible} x={60} y={60} onWindowCancel={handleLoginFormWindowCancel} onWindowOk={handleLoginFormWindowOk} />
      <RegisterFormWindowPage visible={registerFormWindowVisible} x={60} y={60} onWindowCancel={handleRegisterFormWindowCancel} onWindowOk={handleRegisterFormWindowOk} />
      <PasswordFormWindowPage visible={passwordFormWindowVisible} x={60} y={60} onWindowCancel={handlePasswordFormWindowCancel} onWindowOk={handlePasswordFormWindowOk} />
      <ProfileFormWindowPage visible={profileFormWindowVisible} x={60} y={60} onWindowCancel={handleProfileFormWindowCancel} onWindowOk={handleProfileFormWindowOk} />
      <NewFileWindow visible={newFileWindowVisible} x={60} y={60} onWindowCancel={handleNewFileWindowCancel} onWindowOk={handleNewFileWindowOk} />
      <OpenFileWindow visible={openFileWindowVisible} x={60} y={60} onWindowCancel={handleOpenFileWindowCancel} onWindowOk={handleOpenFileWindowOk} disableFileName={disableFileName} selectedFolderId={selectedFolderId} selectedDocumentId={selectedDocumentId} selectedDocumentName={selectedDocumentName} documentThemeName={documentThemeName} />
      <AboutWindowPage visible={aboutWindowVisible} x={60} y={60} onWindowCancel={handleAboutWindowCancel} onWindowOk={handleAboutWindowOk} />
      <Modal title={<FormattedMessage id='workspace.header.message-title-document-modified' />} centered open={discardModifiedDocumentWindowVisible}
        onOk={confirmDiscardModifiedDocument} onCancel={cancelDiscardModifiedDocument} >
        <FormattedMessage id='workspace.header.message-document-modified' />
      </Modal>
      {/* <Modal title={<FormattedMessage id='workspace.header.message-title-document-modified'/>} centered open={discardModifiedDocumentWindowVisible} onOk={confirmDiscardModifiedDocument} onCancel={cancelDiscardModifiedDocument} okText="确认" cancelText="取消" >
        <Form name="exportForm" form={exportForm} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} initialValues={{ remember: true }}
            onFinish={onExportFormFinish} autoComplete="off">
            <Form.Item label={<FormattedMessage id='workspace.header.window.open-file.add-folder.foler-name' />} name="folderName" rules={[{ required: true, message: <FormattedMessage id='workspace.header.window.open-file.add-folder.input-new-foler-name' /> }]} >
              <Input />
            </Form.Item>
            </Form>
      </Modal>
      <Modal title={<FormattedMessage id='workspace.header.message-title-document-modified'/>} centered open={discardModifiedDocumentWindowVisible} onOk={confirmDiscardModifiedDocument} onCancel={cancelDiscardModifiedDocument} okText="确认" cancelText="取消" >
      <Form name="downloadDocumentForm" form={downloadDocumentForm} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} initialValues={{ remember: true }}
            onFinish={onDownloadDocumentFormFinish} autoComplete="off">
            <Form.Item label={<FormattedMessage id='workspace.header.window.open-file.add-folder.foler-name' />} name="folderName" rules={[{ required: true, message: <FormattedMessage id='workspace.header.window.open-file.add-folder.input-new-foler-name' /> }]} >
              <Input />
            </Form.Item>
            </Form>
      </Modal> */}
    </div>
  )
}


export default Header