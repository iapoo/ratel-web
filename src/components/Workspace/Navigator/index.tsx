import React, { useEffect, useState, } from 'react'
import styles from './index.css'
import Workspace from '@/components/Workspace'
import { Button, Collapse, Space, } from 'antd'
import { Utils, RequestUtils, } from '../Utils'

import { Editor, } from '../../Rockie/Editor'
import { LineAction, ShapeAction, TableAction, } from '../../Rockie/Actions'
import { StorageService, } from '../Storage'

const { Panel, } = Collapse
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`
export default (props: any) => {
  const [ initialized, setInitialized, ] = useState<boolean>(false)

  useEffect(() => {
    if (!initialized) {
      initialize()
    }
  })

  const initialize = async () => {
    setInitialized(true)
  }

  const onChange = (key: string | string[]) => {
    console.log(key)
  }

  const addRectangle = () => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new ShapeAction(Utils.currentEditor)
    }
  }

  const addLine = () => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new LineAction(Utils.currentEditor)
    }
  }

  const save = () => {
    const storage = new StorageService()
    storage.editors = Utils.editors
    storage.save()
    const data = storage.storageData
  }

  const load = () => {
    const storage = new StorageService()
    storage.editors = Utils.editors
    storage.load()
    Utils.storageData = storage.storageData
    if (Utils.loadData) {
      Utils.loadData()
    }
  }

  const resize = () => {
    if (Utils.currentEditor) {
      Utils.currentEditor.resize(800, 800)
    }
    if (Utils.onEditorSizeChanged) {
      Utils.onEditorSizeChanged()
    }
  }

  const zoom = () => {
    if (Utils.currentEditor) {
      Utils.currentEditor.zoom = 1.5
    }
    if (Utils.onEditorSizeChanged) {
      Utils.onEditorSizeChanged()
    }
  }

  const addTable = () => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new TableAction(Utils.currentEditor)
    }
    let str = encodeURI('ab')
    const base64 = btoa(str)
    console.log(base64)
    const haha = atob('aa')
    str = decodeURI(haha)
    console.log(str)
  }

  const login = () => {
    RequestUtils.login()    
  }
  return (
    <div {...props}>
      <Collapse defaultActiveKey={[ '1', '2', ]} onChange={onChange}>
        <Panel header='This is panel header 1' key='1' >
          <Space wrap>
          <Button type='primary' onClick={addRectangle}>Rectangle</Button>
          <Button type='primary' onClick={addLine}>Line</Button>
          <Button type='primary' onClick={addTable}>Table</Button>
          <Button type='primary' onClick={save}>Save</Button>
          <Button type='primary' onClick={resize}>Resize</Button>
          <Button type='primary' onClick={zoom}>Zoom</Button>
          <Button type='primary' onClick={load}>Load</Button>
          <Button type='primary' onClick={login}>Login</Button>
          </Space>
        </Panel>
        <Panel header='This is panel header 2' key='2' />
        <Panel header='This is panel header 3' key='3'>
          <p>{text}</p>
        </Panel>
      </Collapse>
    </div>
  )
}
