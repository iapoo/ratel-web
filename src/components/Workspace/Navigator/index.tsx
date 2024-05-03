import React, { FC, useEffect, useState, } from 'react'
import styles from './index.css'
import { Button, Collapse, CollapseProps, Divider, Image, Popover, Space, Tooltip, message, } from 'antd'
import { Utils, RequestUtils, } from '../Utils'
import { useIntl, setLocale, getLocale, FormattedMessage, } from 'umi';
import { ConnectorAction, ContainerAction, CustomShapeAction, ImageContainerAction, SvgContainerAction, LineAction, ShapeAction, TableAction, CustomTableAction, ExtendedShapeAction, ExtendedContainerAction, FrameAction, CustomContainerAction, } from '../../Rockie/Actions'
import { StorageService, } from '../Storage'
import {
  Rectangle, RoundRectangle, Text, Ellipse, Square, Circle, Process, Diamond, Parallelogram, Hexagon, Triangle,
  Cylinder, Cloud, Document, InternalStorage, Cube, Step, Trapezoid, Tape, Note, Card, Callout, Actor, Container
} from '@/components/Resource/LargeIcons'
import { ContainerEntity, ContainerTypes, Containers, CustomConnector, CustomEntity, CustomTableEntity, FrameEntity, ShapeTypes, Shapes } from '@/components/Rockie/Items'
import { BasicShapes } from '@/components/Rockie/CustomItems/BasicShapes';
import { ShapeTypeInfo } from '@/components/Rockie/Shapes/src/EntityShape';
import { ShapeEntity, ShapeType } from '@/components/Rockie/Items/src/ShapeEntity';
import { Arrows } from '@/components/Rockie/CustomItems/Arrows';
import { AliyunShapes } from '@/components/Rockie/CustomItems/Aliyun';
import { AwsShapes } from '@/components/Rockie/CustomItems/Aws';
import { FlowChartShapes } from '@/components/Rockie/CustomItems/FlowChart';
import { UMLBasicShapesForActivityState, UMLBasicShapesForClass, UMLBasicShapesForUseCase, UMLConnectors, UMLConnectorsForActivityState, UMLConnectorsForClass, UMLConnectorsForSequence, UMLConnectorsForUseCase, UMLContainerShapes, UMLContainerShapesForActivityState, UMLContainerShapesForClass, UMLContainerShapesForUseCase, UMLCustomShapesForActivityState, UMLCustomShapesForSequence, UMLFrameShapesForSequence, UMLGridShapes, UMLGridShapesForClass, UMLBasicShapes, UMLCustomShapesForOther, UMLGridShapesForOther, UMLCustomContainersForSequence } from '@/components/Rockie/CustomItems/UML';
import { UMLBasicShapeTypes } from '@/components/Rockie/CustomItems/UML/src/UMLBasicShape';
import { CustomConnectorAction } from '@/components/Rockie/Actions/src/CustomConnectorAction';
import { CustomContainerEntity } from '@/components/Rockie/Items/src/CustomContainerEntity';

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

  const addCustomContainer = (type: string, classType: typeof CustomContainerEntity, shapeType: ShapeType) => {
    if(Utils.currentEditor) {
      Utils.currentEditor.action = new CustomContainerAction(Utils.currentEditor, type, classType, shapeType)
    }
  }

  const addFrame = (type: string, classType: typeof FrameEntity, shapeType: ShapeType) => {
    if(Utils.currentEditor) {
      Utils.currentEditor.action = new FrameAction(Utils.currentEditor, type, classType, shapeType)
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

  const addCustomTable = (typeName: string, classType: typeof CustomTableEntity, shapeType: CustomTableType) => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new CustomTableAction(Utils.currentEditor, typeName, classType, shapeType)
    }
  }

  const addExtendedContainer = (typeName: string, classType: typeof ContainerEntity, shapeType: ShapeType) => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new ExtendedContainerAction(Utils.currentEditor, typeName, classType, shapeType)
    }
  }

  const addExtendedShape = (type: string, classType: typeof ShapeEntity, shapeType: ShapeType) => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new ExtendedShapeAction(Utils.currentEditor, type, classType, shapeType)
    }
  }

  const addCustomConnector = (type: string, classType: typeof CustomConnector, customConnectorTypeInfos: CustomConnectorTypeInfo) => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new CustomConnectorAction(Utils.currentEditor, type, classType, customConnectorTypeInfos)
    }
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

  const getCustomShapeUMLPopoverContent = (name: string, width: number, height: number) => {
    return <div style={{width: width * 1.25, display: 'table'}}>
        <div style={{display: 'table-cell', textAlign: 'center', verticalAlign: 'middle', borderTop: '0px solid gray', padding: '2px'}}>
          <img src={`/custom-shapes-large/uml/${name}.png`} />
        </div>
      </div>
  }


  const getUMLContainerPopoverContent = (name: string, width: number, height: number) => {
    return <div style={{width: width * 1.25, display: 'table'}}>
        <div style={{display: 'table-cell', textAlign: 'center', verticalAlign: 'middle', borderTop: '0px solid gray', padding: '2px'}}>
          <img src={`/custom-shapes-large/uml/${name}.png`} />
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

  // const customTable = <Popover title={'Table'} placement='right' content={getPopoverContent('Table', 128, 128)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 180, width: 180,}}>
  // <Button type='text' onClick={() => addCustomTable('Interface')} style={{padding: 2, display: 'table'}}>
  //   <img src={`/shapes/Table.png`} width={28} height={28} style={{display: 'table-cell'}}/>
  // </Button>
  // </Popover>

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

  const umlGridShapes = UMLGridShapes.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeAwsPopoverContent(shapeType.name, shapeType.typeInfo.width, shapeType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 160, width: 160,}}>
      <Button type='text' onClick={() => addCustomTable(shapeType.name, shapeType.type, shapeType.typeInfo)} style={{padding: 2, display: 'table'}}>
        <img src={`/custom-shapes/uml/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlContainerShapes = UMLContainerShapes.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getUMLContainerPopoverContent(shapeType.name, shapeType.typeInfo.width, shapeType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 160, width: 160,}}>
      <Button type='text' onClick={() => addExtendedContainer(shapeType.name, shapeType.type, shapeType.typeInfo)} style={{padding: 2, display: 'table'}}>
        <img src={`/custom-shapes/uml/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlBasicShapes = UMLBasicShapes.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeUMLPopoverContent(shapeType.name, shapeType.typeInfo.width, shapeType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 160, width: 160,}}>
      <Button type='text' onClick={() => addExtendedShape(shapeType.name, shapeType.type, shapeType.typeInfo)} style={{padding: 2, display: 'table'}}>
        <img src={`/custom-shapes/uml/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlConnectors = UMLConnectors.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeUMLPopoverContent(shapeType.name, 160, 160)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 160, width: 160,}}>
      <Button type='text' onClick={() => addCustomConnector(shapeType.name, shapeType.type, shapeType.typeInfo)} style={{padding: 2, display: 'table'}}>
        <img src={`/custom-shapes/uml/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlGridShapesForClass = UMLGridShapesForClass.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeUMLPopoverContent(shapeType.name, shapeType.typeInfo.width, shapeType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: shapeType.typeInfo.width + 60, width: shapeType.typeInfo.height + 60,}}>
      <Button type='text' onClick={() => addCustomTable(shapeType.name, shapeType.type, shapeType.typeInfo)} style={{padding: 2, display: 'table'}}>
        <img src={`/custom-shapes/uml/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlContainerShapesForClass = UMLContainerShapesForClass.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getUMLContainerPopoverContent(shapeType.name, shapeType.typeInfo.width, shapeType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: shapeType.typeInfo.width + 60, width: shapeType.typeInfo.height + 60,}}>
      <Button type='text' onClick={() => addExtendedContainer(shapeType.name, shapeType.type, shapeType.typeInfo)} style={{padding: 2, display: 'table'}}>
        <img src={`/custom-shapes/uml/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlBasicShapesForClass = UMLBasicShapesForClass.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeUMLPopoverContent(shapeType.name, shapeType.typeInfo.width, shapeType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: shapeType.typeInfo.width + 60, width: shapeType.typeInfo.height + 60,}}>
      <Button type='text' onClick={() => addExtendedShape(shapeType.name, shapeType.type, shapeType.typeInfo)} style={{padding: 2, display: 'table'}}>
        <img src={`/custom-shapes/uml/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlConnectorsForClass = UMLConnectorsForClass.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeUMLPopoverContent(shapeType.name, 160, 160)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 160 + 60, width: 160 + 60,}}>
      <Button type='text' onClick={() => addCustomConnector(shapeType.name, shapeType.type, shapeType.typeInfo)} style={{padding: 2, display: 'table'}}>
        <img src={`/custom-shapes/uml/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlContainerShapesForUseCase = UMLContainerShapesForUseCase.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getUMLContainerPopoverContent(shapeType.name, shapeType.typeInfo.width, shapeType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: shapeType.typeInfo.width + 60, width: shapeType.typeInfo.height + 60,}}>
      <Button type='text' onClick={() => addExtendedContainer(shapeType.name, shapeType.type, shapeType.typeInfo)} style={{padding: 2, display: 'table'}}>
        <img src={`/custom-shapes/uml/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlBasicShapesForUseCase = UMLBasicShapesForUseCase.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeUMLPopoverContent(shapeType.name, shapeType.typeInfo.width, shapeType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: shapeType.typeInfo.width + 60, width: shapeType.typeInfo.height + 60,}}>
      <Button type='text' onClick={() => addExtendedShape(shapeType.name, shapeType.type, shapeType.typeInfo)} style={{padding: 2, display: 'table'}}>
        <img src={`/custom-shapes/uml/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlConnectorsForUseCase = UMLConnectorsForUseCase.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeUMLPopoverContent(shapeType.name, 160, 160)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 160 + 60, width: 160 + 60,}}>
      <Button type='text' onClick={() => addCustomConnector(shapeType.name, shapeType.type, shapeType.typeInfo)} style={{padding: 2, display: 'table'}}>
        <img src={`/custom-shapes/uml/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlBasicShapesForActivityState = UMLBasicShapesForActivityState.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeUMLPopoverContent(shapeType.name, shapeType.typeInfo.width, shapeType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: shapeType.typeInfo.width + 60, width: shapeType.typeInfo.height + 60,}}>
      <Button type='text' onClick={() => addExtendedShape(shapeType.name, shapeType.type, shapeType.typeInfo)} style={{padding: 2, display: 'table'}}>
        <img src={`/custom-shapes/uml/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlCustomShapesForActivityState = UMLCustomShapesForActivityState.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeUMLPopoverContent(shapeType.name, shapeType.typeInfo.width, shapeType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: shapeType.typeInfo.width + 60, width: shapeType.typeInfo.height + 60,}}>
      <Button type='text' onClick={() => addCustomShape(shapeType.name, shapeType.type, shapeType.typeInfo)} style={{padding: 2, display: 'table'}}>
        <img src={`/custom-shapes/uml/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlConnectorsForActivityState = UMLConnectorsForActivityState.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeUMLPopoverContent(shapeType.name, 160, 160)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 160 + 60, width: 160 + 60,}}>
      <Button type='text' onClick={() => addCustomConnector(shapeType.name, shapeType.type, shapeType.typeInfo)} style={{padding: 2, display: 'table'}}>
        <img src={`/custom-shapes/uml/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlContainerShapesForActivityState = UMLContainerShapesForActivityState.map(
    shapeType => {
      const iconWidth = shapeType.typeInfo.width >= shapeType.typeInfo.height ? 28 : 28 * shapeType.typeInfo.width / shapeType.typeInfo.height
      const iconheight = shapeType.typeInfo.width >= shapeType.typeInfo.height ? 28 * shapeType.typeInfo.height / shapeType.typeInfo.width : 28      
      return <Popover title={shapeType.name} placement='right' content={getUMLContainerPopoverContent(shapeType.name, shapeType.typeInfo.width, shapeType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: shapeType.typeInfo.width + 60, width: shapeType.typeInfo.width + 60,}}>
      <Button type='text' onClick={() => addExtendedContainer(shapeType.name, shapeType.type, shapeType.typeInfo)} style={{padding: 2, display: 'table'}}>
        <img src={`/custom-shapes/uml/${shapeType.name}.png`} width={iconWidth} height={iconheight} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )



  const umlCustomContainersForSequence = UMLCustomContainersForSequence.map(
    shapeType => {
      const iconWidth = shapeType.typeInfo.width >= shapeType.typeInfo.height ? 28 : 28 * shapeType.typeInfo.width / shapeType.typeInfo.height
      const iconheight = shapeType.typeInfo.width >= shapeType.typeInfo.height ? 28 * shapeType.typeInfo.height / shapeType.typeInfo.width : 28
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeUMLPopoverContent(shapeType.name, shapeType.typeInfo.width, shapeType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: shapeType.typeInfo.width + 60, width: shapeType.typeInfo.height + 60,}}>
      <Button type='text' onClick={() => addCustomContainer(shapeType.name, shapeType.type, shapeType.typeInfo)} style={{padding: 2, display: 'table'}}>
        <img src={`/custom-shapes/uml/${shapeType.name}.png`} width={iconWidth} height={iconheight} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlCustomShapesForSequence = UMLCustomShapesForSequence.map(
    shapeType => {
      const iconWidth = shapeType.typeInfo.width >= shapeType.typeInfo.height ? 28 : 28 * shapeType.typeInfo.width / shapeType.typeInfo.height
      const iconheight = shapeType.typeInfo.width >= shapeType.typeInfo.height ? 28 * shapeType.typeInfo.height / shapeType.typeInfo.width : 28
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeUMLPopoverContent(shapeType.name, shapeType.typeInfo.width, shapeType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: shapeType.typeInfo.width + 60, width: shapeType.typeInfo.height + 60,}}>
      <Button type='text' onClick={() => addCustomShape(shapeType.name, shapeType.type, shapeType.typeInfo)} style={{padding: 2, display: 'table'}}>
        <img src={`/custom-shapes/uml/${shapeType.name}.png`} width={iconWidth} height={iconheight} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlFrameShapesForSequence = UMLFrameShapesForSequence.map(
    shapeType => {
      const iconWidth = shapeType.typeInfo.width >= shapeType.typeInfo.height ? 28 : 28 * shapeType.typeInfo.width / shapeType.typeInfo.height
      const iconheight = shapeType.typeInfo.width >= shapeType.typeInfo.height ? 28 * shapeType.typeInfo.height / shapeType.typeInfo.width : 28
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeUMLPopoverContent(shapeType.name, shapeType.typeInfo.width, shapeType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: shapeType.typeInfo.width + 60, width: shapeType.typeInfo.height + 60,}}>
      <Button type='text' onClick={() => addFrame(shapeType.name, shapeType.type, shapeType.typeInfo)} style={{padding: 2, display: 'table'}}>
        <img src={`/custom-shapes/uml/${shapeType.name}.png`} width={iconWidth} height={iconheight} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlConnectorsForSequence = UMLConnectorsForSequence.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeUMLPopoverContent(shapeType.name, 160, 160)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 160 + 60, width: 160 + 60,}}>
      <Button type='text' onClick={() => addCustomConnector(shapeType.name, shapeType.type, shapeType.typeInfo)} style={{padding: 2, display: 'table'}}>
        <img src={`/custom-shapes/uml/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlGridShapesForOther = UMLGridShapesForOther.map(
    shapeType => {
      const iconWidth = shapeType.typeInfo.width >= shapeType.typeInfo.height ? 28 : 28 * shapeType.typeInfo.width / shapeType.typeInfo.height
      const iconheight = shapeType.typeInfo.width >= shapeType.typeInfo.height ? 28 * shapeType.typeInfo.height / shapeType.typeInfo.width : 28
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeUMLPopoverContent(shapeType.name, shapeType.typeInfo.width, shapeType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: shapeType.typeInfo.width + 60, width: shapeType.typeInfo.height + 60,}}>
      <Button type='text' onClick={() => addCustomTable(shapeType.name, shapeType.type, shapeType.typeInfo)} style={{padding: 2, display: 'table'}}>
        <img src={`/custom-shapes/uml/${shapeType.name}.png`} width={iconWidth} height={iconheight} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlCustomShapesForOther = UMLCustomShapesForOther.map(
    shapeType => {
      const iconWidth = shapeType.typeInfo.width >= shapeType.typeInfo.height ? 28 : 28 * shapeType.typeInfo.width / shapeType.typeInfo.height
      const iconheight = shapeType.typeInfo.width >= shapeType.typeInfo.height ? 28 * shapeType.typeInfo.height / shapeType.typeInfo.width : 28
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeUMLPopoverContent(shapeType.name, shapeType.typeInfo.width, shapeType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: shapeType.typeInfo.width + 60, width: shapeType.typeInfo.height + 60,}}>
      <Button type='text' onClick={() => addCustomShape(shapeType.name, shapeType.type, shapeType.typeInfo)} style={{padding: 2, display: 'table'}}>
        <img src={`/custom-shapes/uml/${shapeType.name}.png`} width={iconWidth} height={iconheight} style={{display: 'table-cell'}}/>
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
      {/* {customTable} */}
      {/* {umlGridShapes}
      {umlContainerShapes}
      {umlBasicShapes}
      {umlConnectors} */}
    </Space>,
    },
    {
      key: '2',
      label: <div style={{fontWeight: 'bolder'}}><FormattedMessage id='workspace.navigator.panel.advanced'/></div>,
      children: <Space size={2} wrap>
      {aliyunShapes}
      {awsShapes}
      {customShapeFlowChartShapes}
      {customShapeBasicShapes}
      </Space>,
    },
    {
      key: '3',
      label: <div style={{fontWeight: 'bolder'}}><FormattedMessage id='workspace.navigator.panel.arrows'/></div>,
      children: <Space size={2} wrap>
      {customShapeArrows}
      </Space>,
    },
    {
      key: '4',
      label: <div style={{fontWeight: 'bolder'}}><FormattedMessage id='workspace.navigator.panel.uml-class'/></div>,
      children: <Space size={2} wrap>
      {umlGridShapesForClass}
      {umlContainerShapesForClass}
      {umlBasicShapesForClass}
      {umlConnectorsForClass}
      </Space>,
    },
    {
      key: '5',
      label: <div style={{fontWeight: 'bolder'}}><FormattedMessage id='workspace.navigator.panel.uml-use-case'/></div>,
      children: <Space size={2} wrap>
      {umlContainerShapesForUseCase}
      {umlBasicShapesForUseCase}
      {umlConnectorsForUseCase}
      </Space>,
    },
    {
      key: '6',
      label: <div style={{fontWeight: 'bolder'}}><FormattedMessage id='workspace.navigator.panel.uml-activity-state'/></div>,
      children: <Space size={2} wrap>
        {umlBasicShapesForActivityState}
        {umlCustomShapesForActivityState}
        {umlConnectorsForActivityState}
        {umlContainerShapesForActivityState}
      </Space>,
    },
    {
      key: '7',
      label: <div style={{fontWeight: 'bolder'}}><FormattedMessage id='workspace.navigator.panel.uml-sequence'/></div>,
      children: <Space size={2} wrap>
        {umlCustomShapesForSequence}
        {umlFrameShapesForSequence}
        {umlConnectorsForSequence}
        {umlCustomContainersForSequence}
      </Space>,
    },
    {
      key: '8',
      label: <div style={{fontWeight: 'bolder'}}><FormattedMessage id='workspace.navigator.panel.uml-others'/></div>,
      children: <Space size={2} wrap>
        {umlGridShapesForOther}
        {umlCustomShapesForOther}
      </Space>,
    },
  ]

  return (
    <div style={{ position: 'absolute', top: '0px', bottom: '0px', left: '0px', width: navigatorWidth, overflow: 'auto', scrollbarWidth: 'thin'}} >
      <Collapse items={items} defaultActiveKey={['1', ]} onChange={onChange} size='small'/>
    </div>
  )
}

export default Navigator
