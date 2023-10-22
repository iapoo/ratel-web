import React, { FC, useEffect, useState, useRef} from 'react'
import styles from './index.css'
import Workspace from '@/components/Workspace'
import { Button, Checkbox, ColorPicker, Descriptions, DescriptionsProps, Divider, InputNumber, Radio, Tabs, TabsProps, } from 'antd'
import { Consts, SystemUtils, Utils, } from '../Utils'
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
      }
    }
  }

  const handleSelectionChange = (e: EditorEvent) => {
    refresh()
  }

  const handleGridSizeChange = (value: number)=> {
    if(currentEditor) {
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

  const pageSettings = <div>
    <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', padding: 4, }}>
      <Checkbox onChange={handleShowGridChange} checked={showGrid}><FormattedMessage id='workspace.property-editor.page-setting.show-grid'/></Checkbox>      
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between', padding: 4, }}>
      <div><FormattedMessage id='workspace.property-editor.page-setting.grid-size'/></div>
      <InputNumber min={Consts.GRID_SIZE_MIN} max={Consts.GRID_SIZE_MAX} value={gridSize} onChange={handleGridSizeChange} size='small' style={{ width: 70 }} /> 
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between', padding: 4, }}>
      <div><FormattedMessage id='workspace.property-editor.page-setting.grid-color'/></div>
      <ColorPicker size='small' value={gridColor} onChange={handleGridColorChange} />
    </div>
    <Divider style={{margin: 4}}/>
    <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', padding: 8, }}>
      <Checkbox onChange={handleShowBackgroundChange} checked={showBackground}><FormattedMessage id='workspace.property-editor.page-setting.show-background'/></Checkbox>      
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <div><FormattedMessage id='workspace.property-editor.page-setting.background-color'/></div>
      <ColorPicker size='small' value={backgroundColor} onChange={handleBackgroundColorChange} />
    </div>
    <Divider style={{margin: 4}}/>
    <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', padding: 8, }}>
      <FormattedMessage id='workspace.property-editor.page-setting.page'/>
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <div><FormattedMessage id='workspace.property-editor.page-setting.page-size'/></div>
      <ColorPicker size='small' value={backgroundColor} onChange={handleBackgroundColorChange} />
    </div>
    <div style={{display: 'flex', justifyContent: 'start'}}>
      <Radio><FormattedMessage id='workspace.property-editor.page-setting.portrait'/></Radio>      
      <Radio><FormattedMessage id='workspace.property-editor.page-setting.landscape'/></Radio>      
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