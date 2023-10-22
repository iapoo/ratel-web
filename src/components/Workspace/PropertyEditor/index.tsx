import React, { FC, useEffect, useState, useRef} from 'react'
import styles from './index.css'
import Workspace from '@/components/Workspace'
import { Button, Checkbox, ColorPicker, Descriptions, DescriptionsProps, Divider, InputNumber, Radio, RadioChangeEvent, Select, Tabs, TabsProps, } from 'antd'
import { Consts, PageTypes, SystemUtils, Utils, } from '../Utils'
import { Editor, EditorEvent } from '@/components/Rockie/Editor'
import { useIntl, setLocale, getLocale, FormattedMessage, } from 'umi';
import { DescriptionsItemProps } from 'antd/es/descriptions/Item'
import { wrap } from 'module'
import { Color, Colors } from '@/components/Engine'
import { CheckboxChangeEvent } from 'antd/es/checkbox'

interface PropertyEditorProps {
  previousEditor: Editor | undefined
  currentEditor: Editor | undefined
}

const PropertyEditor: FC<PropertyEditorProps> = ({
  previousEditor, currentEditor
}) => {
  
  const intl = useIntl();
  const [ initialized, setInitialized, ] = useState<boolean>(false)
  const [ gridSize, setGridSize, ] = useState<number>(Consts.GRID_SIZE_DEFAULT)
  const [ gridColor, setGridColor, ] = useState<string>(Consts.COLOR_GRID_DEFAULT)
  const [ showGrid, setShowGrid, ] = useState<boolean>(true)
  const [ backgroundColor, setBackgroundColor, ] = useState<string>(Consts.COLOR_BACKGROUND_DEFAULT)
  const [ showPageItems, setShowPageItems, ] = useState<boolean>(true)
  const [ showBackground, setShowBackground, ] = useState<boolean>(false)
  const [ pageSize, setPageSize, ] = useState<string>('1')
  const [ pageWidth, setPageWidth, ] = useState<number>(Consts.PAGE_WIDTH_DEFAULT)
  const [ pageHeight, setPageHeight, ] = useState<number>(Consts.PAGE_HEIGHT_DEFAULT)
  const [ pageOrientation, setPageOrientation, ] = useState<string>(Consts.PAGE_ORIENTATION_PORTRAIT)

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
    if(previousEditor?.hasSelectionChange(handleSelectionChange)) {
      previousEditor.removeSelectionChange(handleSelectionChange)
    }
    if(currentEditor) {
      currentEditor.onSelectionChange(handleSelectionChange)
      if(currentEditor.selectionLayer.getEditorItemCount() > 0) {
        setShowPageItems(false)
      } else {
        setShowPageItems(true)
        setGridSize(currentEditor.gridSize)
        setShowGrid(currentEditor.showGrid)
        setPageWidth(currentEditor.origWidth)
        setPageHeight(currentEditor.origHeight)
        setPageSize(getPageTypeName(currentEditor))
        setPageOrientation(getPageOrientation(currentEditor))
      }
    }
  }

  const getPageTypeName = (editor: Editor) => {
    let pageTypeName = Consts.PAGE_SIZE_CUSTOM
    PageTypes.forEach(pageType => {
      if(editor.origWidth == pageType.width && editor.origHeight == pageType.height) {
        pageTypeName = pageType.name        
      }else if(editor.origWidth == pageType.height && editor.origHeight == pageType.width) {
        pageTypeName = pageType.name
      }
    })
    return pageTypeName
  }


  const getPageOrientation = (editor: Editor) => {
    let pageOrientationName = Consts.PAGE_ORIENTATION_PORTRAIT
    PageTypes.forEach(pageType => {
      if(editor.origWidth == pageType.width && editor.origHeight == pageType.height) {
        pageOrientationName = Consts.PAGE_ORIENTATION_LANDSCAPE
      }else if(editor.origWidth == pageType.height && editor.origHeight == pageType.width) {
        pageOrientationName = Consts.PAGE_ORIENTATION_PORTRAIT  
      }
    })
    return pageOrientationName
  }

  const getPageType = (pageTypeName: string) => {
    let thePageType = PageTypes[PageTypes.length - 1]
    PageTypes.forEach(pageType => {
      if(pageTypeName == pageType.name) {
        thePageType = pageType
      }
    })
    return thePageType
  }

  const handleSelectionChange = (e: EditorEvent) => {
    refresh()
  }

  const handleGridSizeChange = (value: number | null)=> {
    if(currentEditor && value) {
      currentEditor.gridSize = value
      setGridSize(value)
    }
  }

  const handleGridColorChange = (value: any) => {
    if(currentEditor) {
      let color = SystemUtils.parseColorString(value.toHexString())
      if(color) {
        currentEditor.gridColor = color
        setGridColor(value)
      }
    }
  }

  const handleShowBackgroundChange = (e: CheckboxChangeEvent) => {
    if(currentEditor) {
      setShowBackground(e.target.checked)
      currentEditor.showBackground = e.target.checked
    }
  }

  const handleBackgroundColorChange = (value: any) => {
    if(currentEditor) {
      let color = SystemUtils.parseColorString(value.toHexString())
      if(color) {
        currentEditor.backgroundColor = color
        setBackgroundColor(value)
      }
    }
  }

  const handleShowGridChange = (e: CheckboxChangeEvent) => {
    if(currentEditor) {
      //console.log(`${showGrid}    ${e.target.checked}    ${currentEditor.showGrid}`)
      setShowGrid(e.target.checked)
      currentEditor.showGrid = e.target.checked
    }
  }

  const handlePageSizeChange =  (value: string, option: any) => {
    if(currentEditor) {
      //console.log(`${value}    ${option}`)
      setPageSize(value)
      let pageType = getPageType(value)
      if(pageType.name == Consts.PAGE_SIZE_CUSTOM) {
        setPageWidth(currentEditor.origWidth)
        setPageHeight(currentEditor.origHeight)
      } else {
        if(pageOrientation == Consts.PAGE_ORIENTATION_PORTRAIT) {
          currentEditor.setup(currentEditor.zoom, pageType.height, pageType.width)
        } else {
          currentEditor.setup(currentEditor.zoom, pageType.width, pageType.height)
        }
      }
    }
  }

  const handlePageWidthChange = (value: number | null) => {
    if(currentEditor && value) {
      currentEditor.setup(currentEditor.zoom, value, currentEditor.origHeight)
      setPageWidth(value)
    }
  }

  const handlePageHeightChange = (value: number | null) => {
    if(currentEditor && value) {
      currentEditor.setup(currentEditor.zoom, currentEditor.origWidth, value)
      setPageHeight(value)
    }
  }

  const handlePageOrientationChange = (e: RadioChangeEvent) => {
    setPageOrientation(e.target.value)
    let pageType = getPageType(pageSize)
    if(currentEditor) {
      if(e.target.value == Consts.PAGE_ORIENTATION_PORTRAIT) {
        currentEditor.setup(currentEditor.zoom, pageType.height, pageType.width)
      } else {
        currentEditor.setup(currentEditor.zoom, pageType.width, pageType.height)
      }
    }
  }

  const pageSizeOptions = PageTypes.map(pageType=> {
    return {value: pageType.name, label: intl.formatMessage({ id: pageType.label})}
  })

  const pageSettings = <div>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', padding: 4, }}>
      <Checkbox onChange={handleShowGridChange} checked={showGrid}><FormattedMessage id='workspace.property-editor.page-setting.show-grid'/></Checkbox>      
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 4, }}>
      <div><FormattedMessage id='workspace.property-editor.page-setting.grid-size'/></div>
      <InputNumber min={Consts.GRID_SIZE_MIN} max={Consts.GRID_SIZE_MAX} value={gridSize} onChange={handleGridSizeChange} size='small' style={{ width: 70 }} /> 
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 4, }}>
      <div><FormattedMessage id='workspace.property-editor.page-setting.grid-color'/></div>
      <ColorPicker size='small' value={gridColor} onChange={handleGridColorChange} />
    </div>
    <Divider style={{margin: 4}}/>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', padding: 8, }}>
      <Checkbox onChange={handleShowBackgroundChange} checked={showBackground}><FormattedMessage id='workspace.property-editor.page-setting.show-background'/></Checkbox>      
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <div><FormattedMessage id='workspace.property-editor.page-setting.background-color'/></div>
      <ColorPicker size='small' value={backgroundColor} onChange={handleBackgroundColorChange} />
    </div>
    <Divider style={{margin: 4}}/>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', padding: 8, }}>
      <FormattedMessage id='workspace.property-editor.page-setting.page-size'/>
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 4}}>
      <Select size='small' value={pageSize} onChange={handlePageSizeChange} style={{width: '100%'}}
        options={pageSizeOptions}/>
    </div>
    <div style={{display: pageSize == Consts.PAGE_SIZE_CUSTOM ? 'none' : 'flex', justifyContent: 'start', alignItems: 'center', padding: 4, }}>
      <Radio.Group value={pageOrientation} onChange={handlePageOrientationChange}>
        <Radio value={Consts.PAGE_ORIENTATION_PORTRAIT}><FormattedMessage id='workspace.property-editor.page-setting.portrait'/></Radio>      
        <Radio value={Consts.PAGE_ORIENTATION_LANDSCAPE}><FormattedMessage id='workspace.property-editor.page-setting.landscape'/></Radio>      
      </Radio.Group>
    </div>
    <div style={{display: pageSize == Consts.PAGE_SIZE_CUSTOM ? 'flex' : 'none', justifyContent: 'space-between', alignItems: 'center', padding: 4, }}>
      <InputNumber size='small' style={{width: 70}} value={pageWidth} onChange={handlePageWidthChange} min={Consts.PAGE_SIZE_MIN} max={Consts.PAGE_SIZE_MAX}/>
      <FormattedMessage id='workspace.property-editor.page-setting.width'/>
      <InputNumber size='small' style={{width: 70}} value={pageHeight} onChange={handlePageHeightChange}  min={Consts.PAGE_SIZE_MIN} max={Consts.PAGE_SIZE_MAX}/>
      <FormattedMessage id='workspace.property-editor.page-setting.height'/>
    </div>
  </div>

  const pageItems: TabsProps['items'] = [ {
    key: '1', 
    label: intl.formatMessage({ id: 'workspace.property-editor.page-setting.title', }), 
    children: pageSettings
  },{ 
    key: '2', 
    label: intl.formatMessage({ id: 'workspace.property-editor.page-style.title', }), 
    children: 'content2'
  },]

  const shapeItems: TabsProps['items'] = [{
    key: '1', 
    label: intl.formatMessage({ id: 'workspace.property-editor.item-setting.title', }), 
    children: 'content3'
  }, {
    key: '2', 
    label: intl.formatMessage({ id: 'workspace.property-editor.item-style.title', }), 
    children: 'content4'
  },]

  return (
    <div>
      <Tabs defaultActiveKey='1' items={pageItems} hidden={!showPageItems} style={{display: showPageItems ? 'block' : 'none'}}/>
      <Tabs defaultActiveKey='1' items={shapeItems} hidden={showPageItems}  style={{display: showPageItems ? 'none' : 'block'}}/>
    </div>
  )
}

export default PropertyEditor