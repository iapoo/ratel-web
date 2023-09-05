import React, { useEffect, useState, } from 'react'
import styles from './index.css'
import Workspace from '@/components/Workspace'
import { Button, Collapse, Space, Tooltip, } from 'antd'
import { Utils, RequestUtils, } from '../Utils'

import { Editor, } from '../../Rockie/Editor'
import { LineAction, ShapeAction, TableAction, } from '../../Rockie/Actions'
import { StorageService, } from '../Storage'
import { Rectangle,  RoundRectangle,  Text,  Ellipse,  Square,  Circle,  Process,  Diamond,  Parallelogram,  Hexagon,  Triangle,
  Cylinder,  Cloud,  Document,  InternalStorage,  Cube,  Step,  Trapezoid,  Tape,  Note,  Card,  Callout,  Actor,} from '@/components/Resource/Icons'
import { ShapeEntity, Shapes } from '@/components/Rockie/Items'

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

  const addEllipse = () => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new ShapeAction(Utils.currentEditor, Shapes.TYPE_ELLIPSE)
    }
  }


  const addSquare = () => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new ShapeAction(Utils.currentEditor, Shapes.TYPE_SQUARE, Shapes.FREEZE_ASPECT_RATIO)
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
          <Tooltip title="Rectangle">
            <Button type='text' size='large' icon={<Rectangle />} onClick={addRectangle}/>
          </Tooltip>
          <Tooltip title="RoundRectangle">
            <Button type='text' size='large' icon={<RoundRectangle />} onClick={addRectangle}/>
          </Tooltip>
          <Tooltip title="Text">
            <Button type='text' size='large' icon={<Text />} onClick={addRectangle}/>
          </Tooltip>
          <Tooltip title="Ellipse">
            <Button type='text' size='large' icon={<Ellipse />} onClick={addEllipse}/>
          </Tooltip>
          <Tooltip title="Square">
            <Button type='text' size='large' icon={<Square />} onClick={addSquare}/>
          </Tooltip>
          <Tooltip title="Circle">
            <Button type='text' size='large' icon={<Circle />} onClick={addRectangle}/>
          </Tooltip>
          <Tooltip title="Process">
            <Button type='text' size='large' icon={<Process />} onClick={addRectangle}/>
          </Tooltip>
          <Tooltip title="Diamond">
            <Button type='text' size='large' icon={<Diamond />} onClick={addRectangle}/>
          </Tooltip>
          <Tooltip title="Parallelogram">
            <Button type='text' size='large' icon={<Parallelogram />} onClick={addRectangle}/>
          </Tooltip>
          <Tooltip title="Hexagon">
            <Button type='text' size='large' icon={<Hexagon />} onClick={addRectangle}/>
          </Tooltip>
          <Tooltip title="Triangle">
            <Button type='text' size='large' icon={<Triangle />} onClick={addRectangle}/>
          </Tooltip>
          <Tooltip title="Cylinder">
            <Button type='text' size='large' icon={<Cylinder />} onClick={addRectangle}/>
          </Tooltip>
          <Tooltip title="Cloud">
            <Button type='text' size='large' icon={<Cloud />} onClick={addRectangle}/>
          </Tooltip>
          <Tooltip title="Document">
            <Button type='text' size='large' icon={<Document />} onClick={addRectangle}/>
          </Tooltip>
          <Tooltip title="InternalStorage">
            <Button type='text' size='large' icon={<InternalStorage />} onClick={addRectangle}/>
          </Tooltip>
          <Tooltip title="Cube">
            <Button type='text' size='large' icon={<Cube />} onClick={addRectangle}/>
          </Tooltip>
          <Tooltip title="Step">
            <Button type='text' size='large' icon={<Step />} onClick={addRectangle}/>
          </Tooltip>
          <Tooltip title="Trapezoid">
            <Button type='text' size='large' icon={<Trapezoid />} onClick={addRectangle}/>
          </Tooltip>
          <Tooltip title="Tape">
            <Button type='text' size='large' icon={<Tape />} onClick={addRectangle}/>
          </Tooltip>
          <Tooltip title="Note">
            <Button type='text' size='large' icon={<Note />} onClick={addRectangle}/>
          </Tooltip>
          <Tooltip title="Card">
            <Button type='text' size='large' icon={<Card />} onClick={addRectangle}/>
          </Tooltip>
          <Tooltip title="Callout">
            <Button type='text' size='large' icon={<Callout />} onClick={addRectangle}/>
          </Tooltip>
          <Tooltip title="Actor">
            <Button type='text' size='large' icon={<Actor />} onClick={addRectangle}/>
          </Tooltip>
          </Space>
        </Panel>
        <Panel header='This is panel header 2' key='2' />
        <Panel header='Document Explorer' key='3'>
          
        </Panel>
      </Collapse>
    </div>
  )
}
