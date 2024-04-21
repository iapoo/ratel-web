import React, { FC, useEffect, useState, } from 'react'
import styles from './index.css'
import { Button, Collapse, CollapseProps, Divider, Image, Popover, Space, Tooltip, message, } from 'antd'
import { Utils, RequestUtils, } from '../Utils'
import { useIntl, setLocale, getLocale, FormattedMessage, } from 'umi';
import { ConnectorAction, ContainerAction, CustomShapeAction, ImageContainerAction, SvgContainerAction, LineAction, ShapeAction, TableAction, CustomTableAction, } from '../../Rockie/Actions'
import { StorageService, } from '../Storage'
import {
  Rectangle, RoundRectangle, Text, Ellipse, Square, Circle, Process, Diamond, Parallelogram, Hexagon, Triangle,
  Cylinder, Cloud, Document, InternalStorage, Cube, Step, Trapezoid, Tape, Note, Card, Callout, Actor, Container
} from '@/components/Resource/LargeIcons'
import { ContainerTypes, Containers, CustomEntity, ShapeTypes, Shapes } from '@/components/Rockie/Items'
import { BasicShapes } from '@/components/Rockie/CustomItems/BasicShapes';
import { ShapeTypeInfo } from '@/components/Rockie/Shapes/src/EntityShape';
import { ShapeType } from '@/components/Rockie/Items/src/ShapeEntity';
import { Arrows } from '@/components/Rockie/CustomItems/Arrows';
import { AliyunShapes } from '@/components/Rockie/CustomItems/Aliyun';
import { AwsShapes } from '@/components/Rockie/CustomItems/Aws';
import { FlowChartShapes } from '@/components/Rockie/CustomItems/FlowChart';

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

  const addCustomShape = (type: string, classType: typeof CustomEntity, shapeType: ShapeType) => {
    if(Utils.currentEditor) {
      Utils.currentEditor.action = new CustomShapeAction(Utils.currentEditor, type, classType, shapeType)
    }
  }

  const addSvgShape = (type: string, data: string, width: number, height: number) => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new SvgContainerAction(Utils.currentEditor, type, data, width, height)
    }
  }

  const addImageShape = (type: string, data: string, width: number, height: number) => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new ImageContainerAction(Utils.currentEditor, type, data, width, height)
    }
  }

  const addLine = () => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new ConnectorAction(Utils.currentEditor)
    }
  }

  const addConnector = () => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new ConnectorAction(Utils.currentEditor)
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
  }

  const zoom = () => {
    if (Utils.currentEditor) {
      Utils.currentEditor.zoom = 1.5
    }
  }

  // const addSvgContainer = () => {
  //   if (Utils.currentEditor) {
  //     Utils.currentEditor.action = new SvgContainerAction(Utils.currentEditor)
  //   }
  // }

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

  const addCustomTable = () => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new CustomTableAction(Utils.currentEditor)
    }
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
    return <div style={{width: width * 1.25, display: 'table'}}>
        <div style={{display: 'table-cell', textAlign: 'center', verticalAlign: 'middle', borderTop: '0px solid gray', padding: '2px'}}>
          <img src={`/shapes-large/${name}.png`} />
        </div>
      </div>
  }

  const getCustomShapeBasicShapesPopoverContent = (name: string, width: number, height: number) => {
    return <div style={{width: width * 1.25, display: 'table'}}>
        <div style={{display: 'table-cell', textAlign: 'center', verticalAlign: 'middle', borderTop: '0px solid gray', padding: '2px'}}>
          <img src={`/custom-shapes-large/basic-shapes/${name}.png`} />
        </div>
      </div>
  }

  const getCustomShapeAliyunPopoverContent = (name: string, width: number, height: number) => {
    return <div style={{width: width * 1.25, display: 'table'}}>
        <div style={{display: 'table-cell', textAlign: 'center', verticalAlign: 'middle', borderTop: '0px solid gray', padding: '2px'}}>
          <img src={`/custom-shapes-large/aliyun/${name}.png`} />
        </div>
      </div>
  }

  const getCustomShapeAwsPopoverContent = (name: string, width: number, height: number) => {
    return <div style={{width: width * 1.25, display: 'table'}}>
        <div style={{display: 'table-cell', textAlign: 'center', verticalAlign: 'middle', borderTop: '0px solid gray', padding: '2px'}}>
          <img src={`/custom-shapes-large/aws/${name}.png`} />
        </div>
      </div>
  }

  const getCustomShapeArrowsPopoverContent = (name: string, width: number, height: number) => {
    return <div style={{width: width * 1.25, display: 'table'}}>
        <div style={{display: 'table-cell', textAlign: 'center', verticalAlign: 'middle', borderTop: '0px solid gray', padding: '2px'}}>
          <img src={`/custom-shapes-large/arrows/${name}.png`} />
        </div>
      </div>
  }

  const getCustomShapeFlowChartShapesPopoverContent = (name: string, width: number, height: number) => {
    return <div style={{width: width * 1.25, display: 'table'}}>
        <div style={{display: 'table-cell', textAlign: 'center', verticalAlign: 'middle', borderTop: '0px solid gray', padding: '2px'}}>
          <img src={`/custom-shapes-large/flowchart/${name}.png`} />
        </div>
      </div>
  }

  const line = <Popover title={'Line'} placement='right' content={getPopoverContent('Line', 128, 128)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 180, width: 180,}}>
    <Button type='text' onClick={() => addLine()} style={{padding: 2, display: 'table'}}>
      <img src={`/shapes/Line.png`} width={28} height={28} style={{display: 'table-cell'}}/>
    </Button>
  </Popover>

  const table = <Popover title={'Table'} placement='right' content={getPopoverContent('Table', 128, 128)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 180, width: 180,}}>
  <Button type='text' onClick={() => addTable()} style={{padding: 2, display: 'table'}}>
    <img src={`/shapes/Table.png`} width={28} height={28} style={{display: 'table-cell'}}/>
  </Button>
  </Popover>

  const customTable = <Popover title={'Table'} placement='right' content={getPopoverContent('Table', 128, 128)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 180, width: 180,}}>
  <Button type='text' onClick={() => addCustomTable()} style={{padding: 2, display: 'table'}}>
    <img src={`/shapes/Table.png`} width={28} height={28} style={{display: 'table-cell'}}/>
  </Button>
  </Popover>

  // const svgContainer = <Popover title={'Table'} placement='right' content={getPopoverContent('Table', 128, 128)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 180, width: 180,}}>
  // <Button type='text' onClick={() => addSvgContainer()} style={{padding: 2, display: 'table'}}>
  //   <img src={`/shapes/Table.png`} width={28} height={28} style={{display: 'table-cell'}}/>
  // </Button>
  // </Popover>

  const connector = <Popover title={'Connector'} placement='right' content={getPopoverContent('Connector', 128, 128)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 180, width: 180,}}>
  <Button type='text' onClick={() => addConnector()} style={{padding: 2, display: 'table'}}>
    <img src={`/shapes/Connector.png`} width={28} height={28} style={{display: 'table-cell'}}/>
  </Button>
  </Popover>

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

  const containers2 = <Popover title={'Container'} placement='right' content={getPopoverContent('Rectangle', 128, 128)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 180, width: 180,}}>
  <Button type='text' onClick={() => addContainer(Containers.TYPE_CONTAINER)} style={{padding: 2, display: 'table'}}>
    <img src={`/shapes/Rectangle.png`} width={28} height={19} style={{display: 'table-cell'}}/>
  </Button>
  </Popover>

  const containers = ContainerTypes.map(containerType => {
    return <Popover title={containerType.name} placement='right' content={getPopoverContent(containerType.name, containerType.width, containerType.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 280, width: 280,}}>
      <Button type='text' onClick={() => addContainer(containerType.name)} style={{padding: 2, display: 'table'}}>
        <img src={`/shapes/${containerType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const customShapeBasicShapes = BasicShapes.map(
    basicType => {
      return <Popover title={basicType.typeInfo.description} placement='right' content={getCustomShapeBasicShapesPopoverContent(basicType.name, basicType.typeInfo.width, basicType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 160, width: 160,}}>
      <Button type='text' onClick={() => addCustomShape(basicType.name, basicType.type, basicType.typeInfo)} style={{padding: 2, display: 'table'}}>
        <img src={`/custom-shapes/basic-shapes/${basicType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )
  

  const customShapeFlowChartShapes = FlowChartShapes.map(
    basicType => {
      let width = 28
      let height = 28
      if(basicType.typeInfo.width > basicType.typeInfo.height) {
        height = Math.round(28 * basicType.typeInfo.height / basicType.typeInfo.width)
      } else {
        width = 28
      }
      return <Popover title={basicType.typeInfo.description} placement='right' content={getCustomShapeFlowChartShapesPopoverContent(basicType.name, basicType.typeInfo.width, basicType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 160, width: 160,}}>
      <Button type='text' onClick={() => addCustomShape(basicType.name, basicType.type, basicType.typeInfo)} style={{padding: 2, display: 'table'}}>
        <img src={`/custom-shapes/flowchart/${basicType.name}.png`} width={width} height={height} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )
  
  const customShapeArrows = Arrows.map(
    arrow => {
      let width = 28
      let height = 28
      if(arrow.typeInfo.width > arrow.typeInfo.height) {
        height = Math.round(28 * arrow.typeInfo.height / arrow.typeInfo.width)
      } else {
        width = 28
      }
        return <Popover title={arrow.typeInfo.description} placement='right' content={getCustomShapeArrowsPopoverContent(arrow.name, arrow.typeInfo.width, arrow.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 180, width: 180,}}>
      <Button type='text' onClick={() => addCustomShape(arrow.name, arrow.type, arrow.typeInfo)} style={{padding: 2, display: 'table'}}>
        <img src={`/custom-shapes/arrows/${arrow.name}.png`} width={width} height={height} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const aliyunShapes = AliyunShapes.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeAliyunPopoverContent(shapeType.name, shapeType.width, shapeType.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 160, width: 160,}}>
      <Button type='text' onClick={() => addSvgShape(shapeType.name, shapeType.data, shapeType.width, shapeType.height)} style={{padding: 2, display: 'table'}}>
        <img src={`/custom-shapes/aliyun/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const awsShapes = AwsShapes.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeAwsPopoverContent(shapeType.name, shapeType.width, shapeType.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 160, width: 160,}}>
      <Button type='text' onClick={() => addImageShape(shapeType.name, shapeType.data, shapeType.width, shapeType.height)} style={{padding: 2, display: 'table'}}>
        <img src={`/custom-shapes/aws/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: <div style={{fontWeight: 'bolder'}}><FormattedMessage id='workspace.navigator.panel.general' /></div>,
      children: <Space size={2} wrap>
      {shapes}    
      {line}
      {table}
      {containers}
      {customShapeBasicShapes}
      {customShapeArrows}
      {aliyunShapes}
      {awsShapes}
      {customShapeFlowChartShapes}
      {customTable}
    </Space>,
    },
    {
      key: '2',
      label: <div style={{fontWeight: 'bolder'}}><FormattedMessage id='workspace.navigator.panel.advanced'/></div>,
      children: <Space size={2} wrap>
      </Space>,
    },
    {
      key: '3',
      label: <div style={{fontWeight: 'bolder'}}><FormattedMessage id='workspace.navigator.panel.arrows'/></div>,
      children: <p></p>,
    },
  ]

  return (
    <div style={{ position: 'absolute', top: '0px', bottom: '0px', left: '0px', width: navigatorWidth, }} >
      <Collapse items={items} defaultActiveKey={['1', '2',]} onChange={onChange} size='small'/>
    </div>
  )
}

export default Navigator
