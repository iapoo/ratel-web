/* eslint-disable @typescript-eslint/no-use-before-define */
import { Editor, EditorEvent } from '@ratel-web/editor/Editor'
import { Connector, ConnectorArrowTypes, EditorItem } from '@ratel-web/editor/Items'
import { Operation, OperationType } from '@ratel-web/editor/Operations'
import { DocumentThemeType, DocumentThemeTypes, DocumentThemes } from '@ratel-web/editor/Theme'
import { CommonUtils, Constants, EditorHelper } from '@ratel-web/editor/Utils'
import { Button, Checkbox, ColorPicker, Divider, InputNumber, Radio, RadioChangeEvent, Select, Tabs, TabsProps, Tooltip } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { FC, useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'umi'
import { ConnectorLineModes, ConnectorLineTypes, LineWidthOptions, PageTypes, StrokeDashStyles, SystemUtils, Utils } from '../Utils'
import { ConnectorLineModesForCurve, DoubleLineArrowDistanceOptions, DoubleLineArrowLengthOptions, DoubleLineGapOptions } from '../Utils/Consts'

interface PropertyEditorProps {
  previousEditor: Editor | undefined
  currentEditor: Editor | undefined
  onDocumentThemeChanged: (newThemeName: string) => void
  documentThemeName: string
}

const PropertyEditor: FC<PropertyEditorProps> = ({ previousEditor, currentEditor, onDocumentThemeChanged, documentThemeName }) => {
  const intl = useIntl()
  const [initialized, setInitialized] = useState<boolean>(false)
  const [gridSize, setGridSize] = useState<number>(Constants.GRID_SIZE_DEFAULT)
  const [gridColor, setGridColor] = useState<string>(Constants.COLOR_GRID_DEFAULT)
  const [showGrid, setShowGrid] = useState<boolean>(true)
  const [snapToGrid, setSnapToGrid] = useState<boolean>(true)
  const [backgroundColor, setBackgroundColor] = useState<string>(Constants.COLOR_BACKGROUND_DEFAULT)
  const [showPageItems, setShowPageItems] = useState<boolean>(true)
  const [showBackground, setShowBackground] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageStyle, setPageStyle] = useState<string>(DocumentThemes.TYPE_DEFAULT)
  const [pageSize, setPageSize] = useState<string>('1')
  const [pageWidth, setPageWidth] = useState<number>(Constants.PAGE_WIDTH_DEFAULT)
  const [pageHeight, setPageHeight] = useState<number>(Constants.PAGE_HEIGHT_DEFAULT)
  const [pageOrientation, setPageOrientation] = useState<string>(Constants.PAGE_ORIENTATION_PORTRAIT)
  const [pageCustomized, setPageCustomized] = useState<boolean>(false)
  const [fillColor, setFillColor] = useState<string>(Constants.COLOR_FILL_DEFAULT)
  const [strokeColor, setStrokeColor] = useState<string>(Constants.COLOR_STROKE_DEFAULT)
  const [lineWidth, setLineWidth] = useState<number>(Constants.LINE_WIDTH_DEFAULT)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [zoom, setZoom] = useState<number>(currentEditor ? currentEditor.zoom : Constants.ZOOM_DEFAULT)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fontSize, setFontSize] = useState<number>(Constants.FONT_SIZE_DEFAULT)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fontColor, setFontColor] = useState<string>(Constants.COLOR_FONT_DEFAULT)
  const [enableFill, setEnableFill] = useState<boolean>(true)
  const [enableStroke, setEnableStroke] = useState<boolean>(true)
  const [strokeDashStyle, setStrokeDashStyle] = useState<string>(Constants.STROKE_DASH_STYLE_SOLID)
  const [connectorLineType, setConnectorLineType] = useState<string>(Constants.CONNECTOR_LINE_TYPE_STRAIGHT)
  const [connectorLineMode, setConnectorLineMode] = useState<string>(Constants.CONNECTOR_LINE_MODE_SIGNLE)
  const [connectorLineStartArrow, setConnectorLineStartArrow] = useState<string>(ConnectorArrowTypes[0].name)
  const [connectorLineEndArrow, setConnectorLineEndArrow] = useState<string>(ConnectorArrowTypes[0].name)
  const [doubleLineGap, setDoubleLineGap] = useState<number>(Constants.DOUBLE_LINE_GAP_DEFAULT)
  const [connectorSelected, setConnectorSelected] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [connectorDoubleLineArrowLength, setConnectorDoubleLineArrowLength] = useState<number>(Constants.DOUBLE_LINE_ARROW_LENGTH_DEFAULT)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [connectorDoubleLineArrowDistance, setConnectorDoubleLineArrowDistance] = useState<number>(Constants.DOUBLE_LINE_ARROW_DISTANCE_DEFAULT)

  useEffect(() => {
    if (!initialized) {
      initialize()
    }
    refresh()
  })

  const initialize = async () => {
    setInitialized(true)
  }

  // This may keep running and so be careful
  const refresh = () => {
    //console.log('refreshing')
    if (previousEditor?.hasSelectionChange(handleSelectionChange)) {
      previousEditor.removeSelectionChange(handleSelectionChange)
      previousEditor.removeTextEditStyleChange(handleTextEditStyleChange)
    }
    if (currentEditor) {
      currentEditor.onSelectionChange(handleSelectionChange)
      currentEditor.onTextEditStyleChange(handleSelectionChange)
      if (currentEditor.selectionLayer.getEditorItemCount() > 0) {
        setShowPageItems(false)
        refreshSelectionInfo(currentEditor)
      } else {
        setConnectorSelected(false)
        setShowPageItems(true)
        setGridSize(currentEditor.gridSize)
        setShowGrid(currentEditor.showGrid)
        setPageWidth(currentEditor.origWidth)
        setPageHeight(currentEditor.origHeight)
        setPageSize(getPageTypeName(currentEditor))
        setPageOrientation(getPageOrientation(currentEditor))
        setPageCustomized(getPageTypeName(currentEditor) === Constants.PAGE_SIZE_CUSTOM)
      }
    }
  }

  const refreshSelectionInfo = (editor: Editor) => {
    let editorItem = editor.selectionLayer.getEditorItem(0)
    if (editorItem instanceof Connector) {
      setConnectorSelected(true)
    } else {
      setConnectorSelected(false)
    }
    setZoom(editor.zoom)
    setFontSize(editorItem.fontSize)
    setLineWidth(editorItem.lineWidth)
    let fillColorValue = CommonUtils.generateColorString(editorItem.fillColor)
    setFillColor(fillColorValue.substring(0, 7))
    let strokeColorValue = CommonUtils.generateColorString(editorItem.strokeColor)
    setStrokeColor(strokeColorValue.substring(0, 7))
    //console.log(`${fillColorValue.substring(0, 7)}   ${strokeColorValue.substring(0, 7)}`)
    let fontColorValue = CommonUtils.generateColorString(editorItem.fontColor)
    setFontColor(fontColorValue.substring(0, 7))
    let strokeDashStyleValue = CommonUtils.generateStrokeDashStyle(editorItem.strokeDashStyle)
    setStrokeDashStyle(strokeDashStyleValue)
    //setFontColor(shape.fontPaint.getColor)
  }

  const getPageTypeName = (editor: Editor) => {
    let pageTypeName = Constants.PAGE_SIZE_CUSTOM
    if (pageCustomized) {
      return pageTypeName
    }
    PageTypes.forEach((pageType) => {
      if (editor.origWidth === pageType.width && editor.origHeight === pageType.height) {
        pageTypeName = pageType.name
      } else if (editor.origWidth === pageType.height && editor.origHeight === pageType.width) {
        pageTypeName = pageType.name
      }
    })
    return pageTypeName
  }

  const getPageOrientation = (editor: Editor) => {
    let pageOrientationName = Constants.PAGE_ORIENTATION_PORTRAIT
    PageTypes.forEach((pageType) => {
      if (editor.origWidth === pageType.width && editor.origHeight === pageType.height) {
        pageOrientationName = Constants.PAGE_ORIENTATION_LANDSCAPE
      } else if (editor.origWidth === pageType.height && editor.origHeight === pageType.width) {
        pageOrientationName = Constants.PAGE_ORIENTATION_PORTRAIT
      }
    })
    return pageOrientationName
  }

  const getPageType = (pageTypeName: string) => {
    let thePageType = PageTypes[PageTypes.length - 1]
    PageTypes.forEach((pageType) => {
      if (pageTypeName === pageType.name) {
        thePageType = pageType
      }
    })
    return thePageType
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSelectionChange = (e: EditorEvent) => {
    refresh()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleTextEditStyleChange = (e: EditorEvent) => {
    if (currentEditor) {
      refreshSelectionInfo(currentEditor)
    }
  }

  const handleGridSizeChange = (value: number | null) => {
    if (currentEditor && value) {
      currentEditor.gridSize = value
      setGridSize(value)
    }
  }

  const handleGridColorChange = (value: any) => {
    if (currentEditor) {
      let color = CommonUtils.parseColorString(value.toHexString())
      if (color) {
        currentEditor.gridColor = color
        setGridColor(value)
      }
    }
  }

  const handleShowBackgroundChange = (e: CheckboxChangeEvent) => {
    if (currentEditor) {
      setShowBackground(e.target.checked)
      currentEditor.showBackground = e.target.checked
    }
  }

  const handleBackgroundColorChange = (value: any) => {
    if (currentEditor) {
      let color = CommonUtils.parseColorString(value.toHexString())
      if (color) {
        currentEditor.backgroundColor = color
        setBackgroundColor(value)
      }
    }
  }

  const handleShowGridChange = (e: CheckboxChangeEvent) => {
    if (currentEditor) {
      //console.log(`${showGrid}    ${e.target.checked}    ${currentEditor.showGrid}`)
      setShowGrid(e.target.checked)
      currentEditor.showGrid = e.target.checked
    }
  }

  const handleSnapToGridChange = (e: CheckboxChangeEvent) => {
    if (currentEditor) {
      //console.log(`${showGrid}    ${e.target.checked}    ${currentEditor.showGrid}`)
      setSnapToGrid(e.target.checked)
      currentEditor.snapToGrid = e.target.checked
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePageStyleChange = (value: string, options: any) => {
    if (currentEditor) {
      setPageStyle(value)
      let editorItems = currentEditor.contentLayer.getAllEditorItems()
      editorItems.forEach((editorItem) => {
        editorItem.themeName = value
      })
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePageSizeChange = (value: string, option: any) => {
    if (currentEditor) {
      //console.log(`${value}    ${option}`)
      setPageSize(value)
      if (value === Constants.PAGE_SIZE_CUSTOM) {
        setPageWidth(currentEditor.origWidth)
        setPageHeight(currentEditor.origHeight)
        setPageCustomized(true)
      } else {
        let pageType = getPageType(value)
        if (pageType.name === Constants.PAGE_SIZE_CUSTOM) {
          setPageWidth(currentEditor.origWidth)
          setPageHeight(currentEditor.origHeight)
          setPageCustomized(true)
        } else {
          if (pageOrientation === Constants.PAGE_ORIENTATION_PORTRAIT) {
            currentEditor.setup(currentEditor.zoom, pageType.height, pageType.width)
          } else {
            currentEditor.setup(currentEditor.zoom, pageType.width, pageType.height)
          }
          setPageCustomized(false)
        }
      }
    }
  }

  const handlePageWidthChange = (value: number | null) => {
    if (currentEditor && value) {
      currentEditor.setup(currentEditor.zoom, value, currentEditor.origHeight)
      setPageWidth(value)
    }
  }

  const handlePageHeightChange = (value: number | null) => {
    if (currentEditor && value) {
      currentEditor.setup(currentEditor.zoom, currentEditor.origWidth, value)
      setPageHeight(value)
    }
  }

  const handlePageOrientationChange = (e: RadioChangeEvent) => {
    setPageOrientation(e.target.value)
    let pageType = getPageType(pageSize)
    if (currentEditor) {
      if (e.target.value === Constants.PAGE_ORIENTATION_PORTRAIT) {
        currentEditor.setup(currentEditor.zoom, pageType.height, pageType.width)
      } else {
        currentEditor.setup(currentEditor.zoom, pageType.width, pageType.height)
      }
    }
  }

  const handleEnableFillChange = (e: CheckboxChangeEvent) => {
    if (Utils.currentEditor) {
      setEnableFill(e.target.checked)
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach((editorItem: EditorItem) => {
        editorItem.filled = e.target.checked
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

  const handleEnableStrokeChange = (e: CheckboxChangeEvent) => {
    if (Utils.currentEditor) {
      setEnableStroke(e.target.checked)
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach((editorItem: EditorItem) => {
        editorItem.stroked = e.target.checked
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleFontSizeChange = (value: any) => {
    setFontSize(value)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach((editorItem: EditorItem) => {
        //let shape = editorItem.shape
        //shape.font = new Font(EngineUtils.FONT_NAME_DEFAULT, value)
        //shape.markDirty()
        editorItem.fontSize = value
      })
      Utils.currentEditor.focus()
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

  const handleLineWidthChange = (value: number | null) => {
    if (value !== null) {
      setLineWidth(value)
      if (Utils.currentEditor) {
        const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
        const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
        editorItems.forEach((editorItem: EditorItem) => {
          editorItem.lineWidth = value
          //let shape = editorItem.shape
          //let stroke = shape.stroke
          //stroke.setStrokeWidth(value)
          //shape.font = new Font(EngineUtils.FONT_NAME_DEFAULT, value)
          //shape.markDirty()
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
  }

  const handleFillColorChange = (value: any) => {
    setFillColor(value)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach((editorItem: EditorItem) => {
        let color = CommonUtils.parseColorString(value.toHexString())
        if (color) {
          editorItem.fillColor = color
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

  const handleStrokeColorChange = (value: any) => {
    setStrokeColor(value)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach((editorItem: EditorItem) => {
        let color = CommonUtils.parseColorString(value.toHexString())
        if (color) {
          editorItem.strokeColor = color
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleFontColorChange = (value: any) => {
    setFontColor(value)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach((editorItem: EditorItem) => {
        let color = CommonUtils.parseColorString(value.toHexString())
        if (color) {
          editorItem.fontColor = color
        }
      })
      Utils.currentEditor.focus()
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

  const handleStrokeDashStyleChange = (value: string) => {
    setStrokeDashStyle(value)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach((editorItem: EditorItem) => {
        let strokeDashStyle = CommonUtils.parseStrokeDashStyle(value)
        editorItem.strokeDashStyle = strokeDashStyle
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

  const handleConnectorLineTypeChange = (value: string) => {
    setConnectorLineType(value)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach((editorItem: EditorItem) => {
        if (editorItem instanceof Connector) {
          editorItem.connectorType = CommonUtils.parseConnectorType(value)
        }
      })
      //Update it to default if not supported
      if (
        value === Constants.CONNECTOR_LINE_TYPE_CURVED &&
        connectorLineMode !== Constants.CONNECTOR_LINE_MODE_SIGNLE &&
        connectorLineMode !== Constants.CONNECTOR_LINE_MODE_DOUBLE
      ) {
        setConnectorLineMode(Constants.CONNECTOR_LINE_MODE_SIGNLE)
        let editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
        editorItems.forEach((editorItem: EditorItem) => {
          if (editorItem instanceof Connector) {
            editorItem.connectorMode = CommonUtils.parseConnectorMode(Constants.CONNECTOR_LINE_MODE_SIGNLE)
          }
        })
      }
      Utils.currentEditor.focus()
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

  const handleConnectorLineModeChange = (value: string) => {
    setConnectorLineMode(value)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach((editorItem: EditorItem) => {
        if (editorItem instanceof Connector) {
          editorItem.connectorMode = CommonUtils.parseConnectorMode(value)
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

  const handleDoubleLineGapChange = (value: number) => {
    setDoubleLineGap(value)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach((editorItem: EditorItem) => {
        if (editorItem instanceof Connector) {
          editorItem.connectorDoubleLineGap = value
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

  const handleDoubleLineArrowLengthChange = (value: number) => {
    setDoubleLineGap(value)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach((editorItem: EditorItem) => {
        if (editorItem instanceof Connector) {
          editorItem.connectorDoubleLineArrowLength = value
        }
      })
      Utils.currentEditor.focus()
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

  const handleDoubleLineArrowDistanceChange = (value: number) => {
    setDoubleLineGap(value)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach((editorItem: EditorItem) => {
        if (editorItem instanceof Connector) {
          editorItem.connectorDoubleLineArrowDistance = value
        }
      })
      Utils.currentEditor.focus()
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

  const handleConnectorArrowStartTypeChange = (value: string) => {
    //console.log(`orig value = ${connectorLineStartArrow}`)
    setConnectorLineStartArrow(value)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach((editorItem: EditorItem) => {
        if (editorItem instanceof Connector) {
          ConnectorArrowTypes.forEach((connectorArrayType) => {
            if (connectorArrayType.name === value) {
              const startArrow = SystemUtils.cloneConnectorLineArrowType(connectorArrayType)
              editorItem.startArrow = startArrow
            }
          })
        }
      })
      Utils.currentEditor.focus()
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

  const handleConnectorArrowEndTypeChange = (value: string) => {
    setConnectorLineEndArrow(value)
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach((editorItem: EditorItem) => {
        if (editorItem instanceof Connector) {
          ConnectorArrowTypes.forEach((connectorArrayType) => {
            if (connectorArrayType.name === value) {
              const endArrow = SystemUtils.cloneConnectorLineArrowType(connectorArrayType)
              editorItem.endArrow = endArrow
            }
          })
        }
      })
      Utils.currentEditor.focus()
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

  const doHandleShapeStyleChange = (item: EditorItem, styleName: string) => {
    item.themeName = styleName
    item.items.forEach((child) => {
      doHandleShapeStyleChange(child, styleName)
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDocumentStyleChange = (styleName: string, documentThemeType: DocumentThemeType) => {
    if (currentEditor) {
      setPageStyle(styleName)
      Utils.editors.forEach((editor) => {
        let editorItems = editor.contentLayer.getAllEditorItems()
        editorItems.forEach((editorItem: EditorItem) => {
          doHandleShapeStyleChange(editorItem, styleName)
        })
      })
      const origDocumentThemeName = documentThemeName
      if (onDocumentThemeChanged) {
        onDocumentThemeChanged(styleName)
      }
      const newDocumentThemeName = styleName
      const operation: Operation = new Operation(
        currentEditor,
        OperationType.UPDATE_DOCUMENT_THEME,
        [],
        true,
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
        null,
        0,
        newDocumentThemeName,
        origDocumentThemeName,
      )
      currentEditor.operationService.addOperation(operation)
      currentEditor.triggerOperationChange()
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleShapeStyleChange = (styleName: string, styleDescription: string) => {
    if (currentEditor) {
      setPageStyle(styleName)
      let editorItems = currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(currentEditor)
      editorItems.forEach((editorItem) => {
        doHandleShapeStyleChange(editorItem, styleName)
      })

      const afterSelections = EditorHelper.generateEditorSelections(currentEditor)
      const operation: Operation = new Operation(currentEditor, OperationType.UPDATE_ITEMS, afterSelections, true, beforeSelections, '', null, null, null, null)
      currentEditor.operationService.addOperation(operation)
      currentEditor.triggerOperationChange()
    }
  }

  const strokeDashStyles = StrokeDashStyles.map((strokeDashStyle) => {
    return {
      value: strokeDashStyle.name,
      label: (
        <img
          alt="intl.formatMessage({ id: strokeDashStyle.label})"
          src={process.env.BASIC_PATH + '/icons/line-' + strokeDashStyle.name.toLowerCase() + '.svg'}
          width="48"
          height="16"
          style={{ filter: Utils.currentEditor?.enableDarkTheme ? 'invert(100%)' : '' }}
        />
      ),
    }
  })

  const connectorLineTypes = ConnectorLineTypes.map((connectorLineType) => {
    return {
      value: connectorLineType.name,
      label: (
        <img
          alt="intl.formatMessage({ id: connectorLineType.label})"
          src={process.env.BASIC_PATH + '/images/connector-line-type-' + connectorLineType.name.toLowerCase() + '.png'}
          width="16"
          height="16"
        />
      ),
    }
  })

  const connectorLineModes = ConnectorLineModes.map((connectorLineMode) => {
    return {
      value: connectorLineMode.name,
      label: (
        <img
          alt="intl.formatMessage({ id: connectorLineMode.label})"
          src={process.env.BASIC_PATH + '/images/connector-line-mode-' + connectorLineMode.name.toLowerCase() + '.png'}
          width="16"
          height="16"
        />
      ),
    }
  })

  const connectorLineModesForCurve = ConnectorLineModesForCurve.map((connectorLineMode) => {
    return {
      value: connectorLineMode.name,
      label: (
        <img
          alt="intl.formatMessage({ id: connectorLineMode.label})"
          src={process.env.BASIC_PATH + '/images/connector-line-mode-' + connectorLineMode.name.toLowerCase() + '.png'}
          width="16"
          height="16"
        />
      ),
    }
  })

  const connectorLineStartArrows = ConnectorArrowTypes.map((connectorArrowType) => {
    return {
      value: connectorArrowType.name,
      label: (
        <img
          alt={connectorArrowType.description}
          src={process.env.BASIC_PATH + '/images/connector-line-start-arrow-' + connectorArrowType.name.toLowerCase() + '.png'}
          width="16"
          height="16"
        />
      ),
    }
  })

  const connectorLineEndArrows = ConnectorArrowTypes.map((connectorArrowType) => {
    return {
      value: connectorArrowType.name,
      label: (
        <img
          alt={connectorArrowType.description}
          src={process.env.BASIC_PATH + '/images/connector-line-end-arrow-' + connectorArrowType.name.toLowerCase() + '.png'}
          width="16"
          height="16"
        />
      ),
    }
  })

  const connectorSettings = (
    <div>
      <Divider style={{ margin: 4 }} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 'bold',
          padding: 8,
        }}
      >
        <FormattedMessage id="workspace.property-editor.item-setting.connector.connector-title" />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 'bold',
          padding: 4,
        }}
      >
        <Tooltip title={<FormattedMessage id="workspace.header.title.connector-line-type" />}>
          <Select size="small" value={connectorLineType} onChange={handleConnectorLineTypeChange} style={{ width: 64 }} options={connectorLineTypes} />
        </Tooltip>
        <Tooltip title={<FormattedMessage id="workspace.header.title.connector-line-mode" />}>
          <Select
            size="small"
            value={connectorLineMode}
            onChange={handleConnectorLineModeChange}
            style={{ width: 64 }}
            options={connectorLineType === Constants.CONNECTOR_LINE_TYPE_CURVED ? connectorLineModesForCurve : connectorLineModes}
          />
        </Tooltip>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 'bold',
          padding: 4,
        }}
      >
        <Tooltip title={<FormattedMessage id="workspace.header.title.connector-arrow-start-type" />}>
          <Select
            size="small"
            value={connectorLineStartArrow}
            onChange={handleConnectorArrowStartTypeChange}
            style={{ width: 64 }}
            options={connectorLineStartArrows}
          />
        </Tooltip>
        <Tooltip title={<FormattedMessage id="workspace.header.title.connector-arrow-end-type" />}>
          <Select
            size="small"
            value={connectorLineEndArrow}
            onChange={handleConnectorArrowEndTypeChange}
            style={{ width: 64 }}
            options={connectorLineEndArrows}
          />
        </Tooltip>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 'bold',
          padding: 4,
        }}
      >
        <Tooltip title={<FormattedMessage id="workspace.header.title.connector-line-mode-link-width" />}>
          <Select
            size="small"
            value={doubleLineGap}
            onChange={handleDoubleLineGapChange}
            style={{ width: 56 }}
            disabled={connectorLineMode === Constants.CONNECTOR_LINE_MODE_SIGNLE}
            options={DoubleLineGapOptions}
          />
        </Tooltip>
        <Tooltip title={<FormattedMessage id="connector-line-mode-link-arrow-length" />}>
          <Select
            size="small"
            value={connectorDoubleLineArrowLength}
            onChange={handleDoubleLineArrowLengthChange}
            style={{ width: 56 }}
            disabled={connectorLineMode === Constants.CONNECTOR_LINE_MODE_SIGNLE}
            options={DoubleLineArrowLengthOptions}
          />
        </Tooltip>
        <Tooltip title={<FormattedMessage id="connector-line-mode-link-arrow-distance" />}>
          <Select
            size="small"
            value={connectorDoubleLineArrowDistance}
            onChange={handleDoubleLineArrowDistanceChange}
            style={{ width: 56 }}
            disabled={connectorLineMode === Constants.CONNECTOR_LINE_MODE_SIGNLE}
            options={DoubleLineArrowDistanceOptions}
          />
        </Tooltip>
      </div>
    </div>
  )

  const shapeSettings = (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 'bold',
          padding: 4,
        }}
      >
        <Checkbox onChange={handleEnableFillChange} checked={enableFill}>
          <FormattedMessage id="workspace.property-editor.item-setting.fill" />
        </Checkbox>
        <ColorPicker size="small" value={fillColor} trigger="hover" onChange={handleFillColorChange} destroyTooltipOnHide={true} />
      </div>
      <Divider style={{ margin: 4 }} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 'bold',
          padding: 4,
        }}
      >
        <Checkbox onChange={handleEnableStrokeChange} checked={enableStroke}>
          <FormattedMessage id="workspace.property-editor.item-setting.stroke" />
        </Checkbox>
        <ColorPicker size="small" value={strokeColor} trigger="hover" onChange={handleStrokeColorChange} destroyTooltipOnHide={true} />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 'bold',
          padding: 4,
        }}
      >
        <Select size="small" value={strokeDashStyle} onChange={handleStrokeDashStyleChange} style={{ width: '60%' }} options={strokeDashStyles} />
        {/** TODO:  FIXME, HIDE TEMPORARY*/}
        <InputNumber
          min={Constants.LINE_WIDTH_MIN}
          max={Constants.LINE_WIDTH_MAX}
          value={lineWidth}
          onChange={handleLineWidthChange}
          size="small"
          style={{ width: 50, display: 'none' }}
        />
        <Select size="small" value={lineWidth} onChange={handleLineWidthChange} style={{ width: 64 }} options={LineWidthOptions} />
      </div>
      {connectorSelected ? connectorSettings : ''}
    </div>
  )

  const pageSizeOptions = PageTypes.map((pageType) => {
    return { value: pageType.name, label: intl.formatMessage({ id: pageType.label }) }
  })

  const pageSettings = (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 'bold',
          padding: 4,
        }}
      >
        <Checkbox onChange={handleShowGridChange} checked={showGrid}>
          <FormattedMessage id="workspace.property-editor.page-setting.show-grid" />
        </Checkbox>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 4 }}>
        <div>
          <FormattedMessage id="workspace.property-editor.page-setting.grid-size" />
        </div>
        <InputNumber
          min={Constants.GRID_SIZE_MIN}
          max={Constants.GRID_SIZE_MAX}
          value={gridSize}
          onChange={handleGridSizeChange}
          size="small"
          style={{ width: 70 }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 4 }}>
        <div>
          <FormattedMessage id="workspace.property-editor.page-setting.grid-color" />
        </div>
        <ColorPicker size="small" value={gridColor} onChange={handleGridColorChange} destroyTooltipOnHide={true} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 4 }}>
        <Checkbox onChange={handleSnapToGridChange} checked={snapToGrid}>
          <FormattedMessage id="workspace.property-editor.page-setting.snap-to-grid" />
        </Checkbox>
      </div>
      <Divider style={{ margin: 4 }} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 'bold',
          padding: 8,
        }}
      >
        <Checkbox onChange={handleShowBackgroundChange} checked={showBackground}>
          <FormattedMessage id="workspace.property-editor.page-setting.show-background" />
        </Checkbox>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <FormattedMessage id="workspace.property-editor.page-setting.background-color" />
        </div>
        <ColorPicker size="small" value={backgroundColor} onChange={handleBackgroundColorChange} destroyTooltipOnHide={true} />
      </div>
      <Divider style={{ margin: 4 }} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 'bold',
          padding: 8,
        }}
      >
        <FormattedMessage id="workspace.property-editor.page-setting.page-size" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 4 }}>
        <Select size="small" value={pageSize} onChange={handlePageSizeChange} style={{ width: '100%' }} options={pageSizeOptions} />
      </div>
      <div
        style={{
          display: pageSize === Constants.PAGE_SIZE_CUSTOM ? 'none' : 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          padding: 4,
        }}
      >
        <Radio.Group value={pageOrientation} onChange={handlePageOrientationChange}>
          <Radio value={Constants.PAGE_ORIENTATION_PORTRAIT}>
            <FormattedMessage id="workspace.property-editor.page-setting.portrait" />
          </Radio>
          <Radio value={Constants.PAGE_ORIENTATION_LANDSCAPE}>
            <FormattedMessage id="workspace.property-editor.page-setting.landscape" />
          </Radio>
        </Radio.Group>
      </div>
      <div
        style={{
          display: pageSize === Constants.PAGE_SIZE_CUSTOM ? 'flex' : 'none',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 4,
        }}
      >
        <InputNumber
          size="small"
          style={{ width: 70 }}
          value={pageWidth}
          onChange={handlePageWidthChange}
          min={Constants.PAGE_SIZE_MIN}
          max={Constants.PAGE_SIZE_MAX}
        />
        <FormattedMessage id="workspace.property-editor.page-setting.width" />
        <InputNumber
          size="small"
          style={{ width: 70 }}
          value={pageHeight}
          onChange={handlePageHeightChange}
          min={Constants.PAGE_SIZE_MIN}
          max={Constants.PAGE_SIZE_MAX}
        />
        <FormattedMessage id="workspace.property-editor.page-setting.height" />
      </div>
    </div>
  )

  const documentThemeTypes = DocumentThemeTypes.map((documentThemeType) => (
    <div style={{ padding: '2px' }} key={documentThemeType.name}>
      <Button
        type="default"
        onClick={() => handleDocumentStyleChange(documentThemeType.name, documentThemeType)}
        style={{ padding: '2px', display: 'table', width: '76px', height: '76px' }}
      >
        <img src={`/styles/${documentThemeType.name}.png`} style={{ display: 'table-cell' }} />
      </Button>
    </div>
  ))

  const shapeThemeTypes = DocumentThemeTypes.map((documentThemeType) => (
    <div style={{ padding: '2px' }} key={documentThemeType.name}>
      <Button
        type="default"
        onClick={() => handleShapeStyleChange(documentThemeType.name, documentThemeType.description)}
        style={{ padding: '2px', display: 'table', width: '76px', height: '76px' }}
      >
        <img src={`/styles/${documentThemeType.name}.png`} style={{ display: 'table-cell' }} />
      </Button>
    </div>
  ))

  const pageStyles = (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: 4 }}>{documentThemeTypes}</div>
    </div>
  )

  const shapeStyles = (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: 4 }}>{shapeThemeTypes}</div>
    </div>
  )

  const pageItems: TabsProps['items'] = [
    {
      key: '1',
      label: intl.formatMessage({ id: 'workspace.property-editor.page-setting.title' }),
      children: pageSettings,
    },
    {
      key: '2',
      label: intl.formatMessage({ id: 'workspace.property-editor.page-style.title' }),
      children: pageStyles,
    },
  ]

  const shapeItems: TabsProps['items'] = [
    {
      key: '1',
      label: intl.formatMessage({ id: 'workspace.property-editor.item-setting.title' }),
      children: shapeSettings,
    },
    {
      key: '2',
      label: intl.formatMessage({ id: 'workspace.property-editor.item-style.title' }),
      children: shapeStyles,
    },
  ]

  return (
    <div>
      <Tabs defaultActiveKey="1" items={pageItems} hidden={!showPageItems} style={{ display: showPageItems ? 'block' : 'none' }} />
      <Tabs defaultActiveKey="1" items={shapeItems} hidden={showPageItems} style={{ display: showPageItems ? 'none' : 'block' }} />
    </div>
  )
}

export default PropertyEditor
