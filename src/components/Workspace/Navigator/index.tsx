import React, { FC, useEffect, useState, } from 'react'
import styles from './index.css'
import { Button, Collapse, CollapseProps, Divider, Image, Popover, Space, Tooltip, message, } from 'antd'
import { Utils, RequestUtils, } from '../Utils'
import { useIntl, setLocale, getLocale, FormattedMessage, } from 'umi';
import { ContainerAction, LineAction, ShapeAction, TableAction, } from '../../Rockie/Actions'
import { StorageService, } from '../Storage'
import {
  Rectangle, RoundRectangle, Text, Ellipse, Square, Circle, Process, Diamond, Parallelogram, Hexagon, Triangle,
  Cylinder, Cloud, Document, InternalStorage, Cube, Step, Trapezoid, Tape, Note, Card, Callout, Actor, Container
} from '@/components/Resource/LargeIcons'
import { ShapeTypes, Shapes } from '@/components/Rockie/Items'

interface NavigatorProps {
  navigatorWidth: number
}

const Navigator: FC<NavigatorProps> = ({
  navigatorWidth
}) => {

  const [initialized, setInitialized,] = useState<boolean>(false)

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

  const addShape = (type: string) => {
    if (Utils.currentEditor) {      
      Utils.currentEditor.action = new ShapeAction(Utils.currentEditor, type)
    }
  }

  const addContainer = (type: string) => {
    if (Utils.currentEditor) {      
      Utils.currentEditor.action = new ContainerAction(Utils.currentEditor, type)
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
    //RequestUtils.login()
  }
  // <Button type='primary' onClick={addRectangle}>Rectangle</Button>
  // <Button type='primary' onClick={addLine}>Line</Button>
  // <Button type='primary' onClick={addTable}>Table</Button>
  // <Button type='primary' onClick={save}>Save</Button>
  // <Button type='primary' onClick={resize}>Resize</Button>
  // <Button type='primary' onClick={zoom}>Zoom</Button>
  // <Button type='primary' onClick={load}>Load</Button>
  // <Button type='primary' onClick={login}>Login</Button>


  //        <Image src='/shapes/Rectangle.png' width={20} height={20} />
  const getPopoverContent = (name: string, width: number, height: number) => {
    return <div style={{width: 154, display: 'table'}}>
        <div style={{display: 'table-cell', textAlign: 'center', verticalAlign: 'middle', borderTop: '0px solid gray', padding: '2px'}}>
          <img src={`/shapes-large/${name}.png`} />
        </div>
      </div>
  }
  const shapes =  ShapeTypes.map(shapeType => {
    let width = 28
    let height = 28
    if(shapeType.width > shapeType.height) {
      height = Math.round(28 * shapeType.height / shapeType.width)
    } else {
      width = 28
    }
    return <Popover title={shapeType.name} placement='right' content={getPopoverContent(shapeType.name, shapeType.width, shapeType.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 180, width: 180,}}>
      <Button type='text' onClick={() => addShape(shapeType.name)} style={{padding: 2, display: 'table'}}>
        <img src={`/shapes/${shapeType.name}.png`} width={width} height={height} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
    )

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: <FormattedMessage id='workspace.navigator.panel.general'/>,
      children: <Space size={2} wrap>
      {shapes}    
    </Space>,
    },
    {
      key: '2',
      label: <FormattedMessage id='workspace.navigator.panel.advanced'/>,
      children: <p></p>,
    },
    {
      key: '3',
      label: <FormattedMessage id='workspace.navigator.panel.arrows'/>,
      children: <p></p>,
    },
  ]

  return (
    <div style={{ position: 'absolute', top: '0px', bottom: '0px', left: '0px', width: navigatorWidth, backgroundColor: 'gray', }} >
      <Collapse items={items} defaultActiveKey={['1', '2',]} onChange={onChange} size='small'/>
    </div>
  )
}

export default Navigator
