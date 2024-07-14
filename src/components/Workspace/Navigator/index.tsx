import React, { FC, SyntheticEvent, UIEvent, useEffect, useState, } from 'react'
import styles from './index.css'
import { Button, Collapse, CollapseProps, Divider, Image, Popover, Space, Tooltip, message, } from 'antd'
import { Utils, RequestUtils, } from '../Utils'
import { useIntl, setLocale, getLocale, FormattedMessage, } from 'umi';
import { ConnectorAction, ContainerAction, CustomShapeAction, ImageContainerAction, SvgContainerAction, LineAction, ShapeAction, TableAction, CustomTableAction, ExtendedShapeAction, ExtendedContainerAction, FrameAction, CustomContainerAction, MyShapeAction, } from '../../Rockie/Actions'
import { StorageService, } from '../Storage'
import {
  Rectangle, RoundRectangle, Text, Ellipse, Square, Circle, Process, Diamond, Parallelogram, Hexagon, Triangle,
  Cylinder, Cloud, Document, InternalStorage, Cube, Step, Trapezoid, Tape, Note, Card, Callout, Actor, Container
} from '@/components/Resource/LargeIcons'
import { ContainerEntity, ContainerTypes, Containers, CustomConnector, CustomEntity, CustomTableEntity, EditorItemInfo, FrameEntity, ShapeTypes, Shapes } from '@/components/Rockie/Items'
import { BasicShapes } from '@/components/Rockie/CustomItems/BasicShapes';
import { ShapeTypeInfo } from '@/components/Rockie/Shapes/src/EntityShape';
import { ShapeEntity, ShapeType } from '@/components/Rockie/Items/src/ShapeEntity';
import { Arrows } from '@/components/Rockie/CustomItems/Arrows';
import { AliyunShapes } from '@/components/Rockie/CustomItems/Aliyun';
import { AwsShapes } from '@/components/Rockie/CustomItems/Aws';
import { FlowChartShapes } from '@/components/Rockie/CustomItems/FlowChart';
import { UMLBasicShapesForActivityState, UMLBasicShapesForClass, UMLBasicShapesForUseCase, UMLConnectors, UMLConnectorsForActivityState, UMLConnectorsForClass, UMLConnectorsForSequence, UMLConnectorsForUseCase, UMLContainerShapes, UMLContainerShapesForActivityState, UMLContainerShapesForClass, UMLContainerShapesForUseCase, UMLCustomShapesForActivityState, UMLCustomShapesForSequence, UMLFrameShapesForSequence, UMLCustomTables, UMLGridShapesForClass, UMLBasicShapes, UMLCustomShapesForOther, UMLGridShapesForOther, UMLCustomContainersForSequence } from '@/components/Rockie/CustomItems/UML';
import { UMLBasicShapeTypes } from '@/components/Rockie/CustomItems/UML/src/UMLBasicShape';
import { CustomConnectorAction } from '@/components/Rockie/Actions/src/CustomConnectorAction';
import { CustomContainerEntity } from '@/components/Rockie/Items/src/CustomContainerEntity';
import { MyShape, MyShapes } from '../Utils/RequestUtils';
import { EditOutlined } from '@ant-design/icons';
import MyShapesWindowPage from './MyShapesWindow';

interface NavigatorProps {
  navigatorWidth: number
  onMyShapesLoaded: () => void
  myShapesUpdated: boolean
  // loginCompleted: boolean
  // logoutCompleted: boolean
}

const NAVIGATOR_ID = 'navigator-id'
const ACTION_IMAGE_ID = 'navigator-action-image-id'
const NAVIGATOR_MASK_ID = 'navigator-mask-id'

const Navigator: FC<NavigatorProps> = ({
  navigatorWidth, myShapesUpdated, onMyShapesLoaded //, loginCompleted, logoutCompleted
}) => {

  const [initialized, setInitialized,] = useState<boolean>(false)
  const [myShapes, setMyShapes, ] = useState<MyShape[]>([])
  const [myShapesWindowVisiible, setMyShapesWindowVisible, ] = useState<boolean>(false)
  const [myShapesChanged, setMyShapesChanged, ] = useState<boolean>(false)
  const [navigatorScrollTop, setNavigatorScallTop,] = useState<number>(0)

  useEffect(() => {
    if(myShapesChanged || myShapesUpdated || !initialized) {
      refreshMyShapes()
    }
    if (!initialized) {
      initialize()
    }
    // if(!myShapesUpdated && myShapes.length > 0) {
    //   setMyShapes([])
    // }
  })

  const initialize = async () => {
    setInitialized(true)
  }

  // const checkAndRefreshMyShapes = async () => {
  //   const online = await RequestUtils.isOnline()
  //   if(myShapesUpdated) {
  //     if(online) {
  //       await refreshMyShapes()
  //     } else {
  //       setMyShapes([])
  //     }
  //   }
  //   // if(!logoutCompleted) {
  //   //   if(loginCompleted || myShapesUpdated) {
  //   //     await refreshMyShapes()
  //   //   } else {
  //   //     const online = await RequestUtils.isOnline()
  //   //     if(online) {
  //   //       await refreshMyShapes()
  //   //     }
  //   //   }
  //   // }
  // }

  const refreshMyShapes = async () => {
    const fetchSettingsData = async () => {
      const settingsData = await RequestUtils.getSettings()
      if(settingsData.status == 200 && settingsData.data.success) {
        const data = settingsData.data.data.settings
        const newMyShapes: MyShapes = data ? JSON.parse(data) : {shapes: []}
        if(newMyShapes) {
          setMyShapes(newMyShapes.shapes)
        } else {
          setMyShapes([])
        }
      } else {
        setMyShapes([])
      }
      if(onMyShapesLoaded) {
        onMyShapesLoaded()
      }
      setMyShapesChanged(false)
    }
    await RequestUtils.isOnline()
    fetchSettingsData()
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

  const addShape = (type: string, folder: string) => {
    if (Utils.currentEditor) {      
      Utils.currentEditor.action = new ShapeAction(Utils.currentEditor, type)
      Utils.currentEditor.action.imageId = process.env.PUBLIC_PATH + `/${folder}/${type}.png`
    }
  }

  const addContainer = (type: string, folder: string) => {
    if (Utils.currentEditor) {      
      Utils.currentEditor.action = new ContainerAction(Utils.currentEditor, type)
      Utils.currentEditor.action.imageId = process.env.PUBLIC_PATH + `/${folder}/${type}.png`
    }
  }

  const addCustomShape = (type: string, classType: typeof CustomEntity, shapeType: ShapeType, folder: string) => {
    if(Utils.currentEditor) {
      Utils.currentEditor.action = new CustomShapeAction(Utils.currentEditor, type, classType, shapeType)
      Utils.currentEditor.action.imageId = process.env.PUBLIC_PATH + `/${folder}/${type}.png`
    }
  }

  const addCustomContainer = (type: string, classType: typeof CustomContainerEntity, shapeType: ShapeType, folder: string) => {
    if(Utils.currentEditor) {
      Utils.currentEditor.action = new CustomContainerAction(Utils.currentEditor, type, classType, shapeType)
      Utils.currentEditor.action.imageId = process.env.PUBLIC_PATH + `/${folder}/${type}.png`
    }
  }

  const addFrame = (type: string, classType: typeof FrameEntity, shapeType: ShapeType, folder: string) => {
    if(Utils.currentEditor) {
      Utils.currentEditor.action = new FrameAction(Utils.currentEditor, type, classType, shapeType)
      Utils.currentEditor.action.imageId = process.env.PUBLIC_PATH + `/${folder}/${type}.png`
    }
  }

  const addSvgShape = (type: string, data: string, width: number, height: number, folder: string) => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new SvgContainerAction(Utils.currentEditor, type, data, width, height)
      Utils.currentEditor.action.imageId = process.env.PUBLIC_PATH + `/${folder}/${type}.png`
    }
  }

  const addImageShape = (type: string, data: string, width: number, height: number, folder: string) => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new ImageContainerAction(Utils.currentEditor, type, data, width, height)
      Utils.currentEditor.action.imageId = process.env.PUBLIC_PATH + `/${folder}/${type}.png`
    }
  }

  const addLine = (type: string, folder: string) => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new ConnectorAction(Utils.currentEditor)
      Utils.currentEditor.action.imageId = process.env.PUBLIC_PATH + `/${folder}/${type}.png`
    }
  }

  const addConnector = (type: string, folder: string) => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new ConnectorAction(Utils.currentEditor)
      Utils.currentEditor.action.imageId = process.env.PUBLIC_PATH + `/${folder}/${type}.png`
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

  const addTable = (type: string, folder: string) => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new TableAction(Utils.currentEditor)
      Utils.currentEditor.action.imageId = process.env.PUBLIC_PATH + `/${folder}/${type}.png`
    }
    let str = encodeURI('ab')
    const base64 = btoa(str)
    console.log(base64)
    const haha = atob('aa')
    str = decodeURI(haha)
    console.log(str)
  }

  const addMyShape = (myShape: MyShape) => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new MyShapeAction(Utils.currentEditor, myShape)
      Utils.currentEditor.action.imageId = process.env.PUBLIC_PATH + `/${folder}/${type}.png`
    }
  }

  const addCustomTable = (typeName: string, classType: typeof CustomTableEntity, shapeType: CustomTableType, folder: string) => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new CustomTableAction(Utils.currentEditor, typeName, classType, shapeType)
      Utils.currentEditor.action.imageId = process.env.PUBLIC_PATH + `/${folder}/${typeName}.png`
    }
  }

  const addExtendedContainer = (typeName: string, classType: typeof ContainerEntity, shapeType: ShapeType, folder: string) => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new ExtendedContainerAction(Utils.currentEditor, typeName, classType, shapeType)
      Utils.currentEditor.action.imageId = process.env.PUBLIC_PATH + `/${folder}/${typeName}.png`
    }
  }

  const addExtendedShape = (type: string, classType: typeof ShapeEntity, shapeType: ShapeType, folder: string) => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new ExtendedShapeAction(Utils.currentEditor, type, classType, shapeType)
      Utils.currentEditor.action.imageId = process.env.PUBLIC_PATH + `/${folder}/${type}.png`
    }
  }

  const addCustomConnector = (type: string, classType: typeof CustomConnector, customConnectorTypeInfos: CustomConnectorTypeInfo, folder: string) => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new CustomConnectorAction(Utils.currentEditor, type, classType, customConnectorTypeInfos)
      Utils.currentEditor.action.imageId = process.env.PUBLIC_PATH + `/${folder}/${type}.png`
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
          <img id={process.env.PUBLIC_PATH + `/shapes-large/${name}.png`} src={process.env.PUBLIC_PATH + `/shapes-large/${name}.png`} />
        </div>
      </div>
  }

  const getCustomShapeBasicShapesPopoverContent = (name: string, width: number, height: number) => {
    return <div style={{width: width * 1.25, display: 'table'}}>
        <div style={{display: 'table-cell', textAlign: 'center', verticalAlign: 'middle', borderTop: '0px solid gray', padding: '2px'}}>
          <img id={process.env.PUBLIC_PATH + `/custom-shapes-large/basic-shapes/${name}.png`} src={process.env.PUBLIC_PATH + `/custom-shapes-large/basic-shapes/${name}.png`} />
        </div>
      </div>
  }

  const getCustomShapeAliyunPopoverContent = (name: string, width: number, height: number) => {
    return <div style={{width: width * 1.25, display: 'table'}}>
        <div style={{display: 'table-cell', textAlign: 'center', verticalAlign: 'middle', borderTop: '0px solid gray', padding: '2px'}}>
          <img id={process.env.PUBLIC_PATH + `/custom-shapes-large/aliyun/${name}.png`} src={process.env.PUBLIC_PATH + `/custom-shapes-large/aliyun/${name}.png`} />
        </div>
      </div>
  }

  const getCustomShapeAwsPopoverContent = (name: string, width: number, height: number) => {
    return <div style={{width: width * 1.25, display: 'table'}}>
        <div style={{display: 'table-cell', textAlign: 'center', verticalAlign: 'middle', borderTop: '0px solid gray', padding: '2px'}}>
          <img id={process.env.PUBLIC_PATH + `/custom-shapes-large/aws/${name}.png`}  src={process.env.PUBLIC_PATH + `/custom-shapes-large/aws/${name}.png`} />
        </div>
      </div>
  }

  const getCustomShapeArrowsPopoverContent = (name: string, width: number, height: number) => {
    return <div style={{width: width * 1.25, display: 'table'}}>
        <div style={{display: 'table-cell', textAlign: 'center', verticalAlign: 'middle', borderTop: '0px solid gray', padding: '2px'}}>
          <img id={process.env.PUBLIC_PATH + `/custom-shapes-large/arrows/${name}.png`} src={process.env.PUBLIC_PATH + `/custom-shapes-large/arrows/${name}.png`} />
        </div>
      </div>
  }

  const getCustomShapeFlowChartShapesPopoverContent = (name: string, width: number, height: number) => {
    return <div style={{width: width * 1.25, display: 'table'}}>
        <div style={{display: 'table-cell', textAlign: 'center', verticalAlign: 'middle', borderTop: '0px solid gray', padding: '2px'}}>
          <img id={process.env.PUBLIC_PATH + `/custom-shapes-large/flowchart/${name}.png`} src={process.env.PUBLIC_PATH + `/custom-shapes-large/flowchart/${name}.png`} />
        </div>
      </div>
  }

  const getCustomShapeUMLPopoverContent = (name: string, width: number, height: number) => {
    return <div style={{width: width * 1.25, display: 'table'}}>
        <div style={{display: 'table-cell', textAlign: 'center', verticalAlign: 'middle', borderTop: '0px solid gray', padding: '2px'}}>
          <img id={process.env.PUBLIC_PATH + `/custom-shapes-large/uml/${name}.png`} src={process.env.PUBLIC_PATH + `/custom-shapes-large/uml/${name}.png`} />
        </div>
      </div>
  }


  const getUMLContainerPopoverContent = (name: string, width: number, height: number) => {
    return <div style={{width: width * 1.25, display: 'table'}}>
        <div style={{display: 'table-cell', textAlign: 'center', verticalAlign: 'middle', borderTop: '0px solid gray', padding: '2px'}}>
          <img id={process.env.PUBLIC_PATH + `/custom-shapes-large/uml/${name}.png`} src={process.env.PUBLIC_PATH + `/custom-shapes-large/uml/${name}.png`} />
        </div>
      </div>
  }

  const line = <Popover title={'Line'} placement='right' content={getPopoverContent('Line', 128, 128)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 180, width: 180,}}>
    <Button type='text' onMouseDown={() => addLine('Line', 'shapes-large')} style={{padding: 2, display: 'table'}}>
      <img id={process.env.PUBLIC_PATH + `/shapes/Line.png`}  src={process.env.PUBLIC_PATH + `/shapes/Line.png`} width={28} height={28} style={{display: 'table-cell'}}/>
    </Button>
  </Popover>

  const table = <Popover title={'Table'} placement='right' content={getPopoverContent('Table', 128, 128)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 180, width: 180,}}>
  <Button type='text' onMouseDown={() => addTable('Table', 'shapes-large')} style={{padding: 2, display: 'table'}}>
    <img id={process.env.PUBLIC_PATH + `/shapes/Table.png`}  src={process.env.PUBLIC_PATH + `/shapes/Table.png`} width={28} height={28} style={{display: 'table-cell'}}/>
  </Button>
  </Popover>

  // const customTable = <Popover title={'Table'} placement='right' content={getPopoverContent('Table', 128, 128)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 180, width: 180,}}>
  // <Button type='text' onMouseDown={() => addCustomTable('Interface')} style={{padding: 2, display: 'table'}}>
  //   <img src={process.env.PUBLIC_PATH + `/shapes/Table.png`} width={28} height={28} style={{display: 'table-cell'}}/>
  // </Button>
  // </Popover>

  // const svgContainer = <Popover title={'Table'} placement='right' content={getPopoverContent('Table', 128, 128)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 180, width: 180,}}>
  // <Button type='text' onMouseDown={() => addSvgContainer()} style={{padding: 2, display: 'table'}}>
  //   <img src={process.env.PUBLIC_PATH + `/shapes/Table.png`} width={28} height={28} style={{display: 'table-cell'}}/>
  // </Button>
  // </Popover>

  const connector = <Popover title={'Connector'} placement='right' content={getPopoverContent('Connector', 128, 128)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 180, width: 180,}}>
  <Button type='text' onMouseDown={() => addConnector('Connector', 'shapes-large')} style={{padding: 2, display: 'table'}}>
    <img id={process.env.PUBLIC_PATH + `/shapes/Connector.png`} src={process.env.PUBLIC_PATH + `/shapes/Connector.png`} width={28} height={28} style={{display: 'table-cell'}}/>
  </Button>
  </Popover>

  const handleDragStart = (name: string, imageWidth: number, imageHeight: number, e: DragEvent) => {    
    addShape(name)
    const largeImae = document.getElementById(process.env.PUBLIC_PATH + `/shapes-large/${name}.png`)
    if(e.dataTransfer && largeImae) {
      //e.dataTransfer.setData('text/plain',process.env.PUBLIC_PATH + `/shapes-large/${name}.png`)
      e.dataTransfer.setDragImage(largeImae, imageWidth  / 2, imageHeight / 2)

    }
    if(Utils.currentEditor?.action) {
      Utils.currentEditor.action.imageId = process.env.PUBLIC_PATH + `/shapes-large/${name}.png`
    }    
  }

  const handleNavigatorMouseMove = (e: MouseEvent) => {
    // e.preventDefault()
    if(Utils.currentEditor?.action) {
      const action = Utils.currentEditor.action
      //console.log(Utils.currentEditor?.action.imageId)
      const image = document.getElementById(Utils.currentEditor.action.imageId)
      const navigator = document.getElementById(NAVIGATOR_ID)
      const imageContainer = document.getElementById(ACTION_IMAGE_ID)
      const navigatorMask = document.getElementById(NAVIGATOR_MASK_ID)
      if(image && navigator && imageContainer && navigatorMask) {
        navigatorMask.style.display = ''
        if(!imageContainer.hasChildNodes()) {
          //console.log(`Node is appended`)
          const cloneImage = image.cloneNode()
          //cloneImage.addEventListener('mousemove', handleNavigatorImageMouseMove)
          imageContainer.append(cloneImage)
        }
        imageContainer.style.left = (e.clientX - image.clientWidth / 2) + 'px'
        imageContainer.style.top = (e.clientY + navigatorScrollTop - image.clientHeight / 2 - Utils.HEADER_HEIGHT) + 'px'
      }
    }
  }

  const handleNavigatorImageMouseMove = (e: MouseEvent) => {
    if(Utils.currentEditor?.action) {
      console.log(Utils.currentEditor?.action.imageId)
      const image = document.getElementById(Utils.currentEditor.action.imageId)
      const navigator = document.getElementById(NAVIGATOR_ID)
      const imageContainer = document.getElementById(ACTION_IMAGE_ID)
      if(image && navigator && imageContainer) {
        //console.log(`check x = ${e.clientX} y = ${e.clientY }`)
        imageContainer.style.left = (e.clientX - image.clientWidth / 2) + 'px'
        imageContainer.style.top = (e.clientY + navigatorScrollTop - image.clientHeight / 2 - Utils.HEADER_HEIGHT) + 'px'
      }
    }
  }

  const handleNavigatorMouseLeave = (e: MouseEvent) => {
    if(Utils.currentEditor?.action) {
      const image = document.getElementById(Utils.currentEditor.action.imageId)
      const navigator = document.getElementById(NAVIGATOR_ID)
      const imageContainer = document.getElementById(ACTION_IMAGE_ID)
      const navigatorMask = document.getElementById(NAVIGATOR_MASK_ID)
      if(image && navigator && imageContainer && navigatorMask) {
        navigatorMask.style.display = 'none'
        while(imageContainer.lastChild) {
          imageContainer.removeChild(imageContainer.lastChild)
        }
      }      
    }
  }

  const handleNavigatorMouseDown = (e: MouseEvent) => {
    if(Utils.currentEditor?.action) {
      const image = document.getElementById(Utils.currentEditor.action.imageId)
      const navigator = document.getElementById(NAVIGATOR_ID)
      const imageContainer = document.getElementById(ACTION_IMAGE_ID)
      const navigatorMask = document.getElementById(NAVIGATOR_MASK_ID)
      if(image && navigator && imageContainer && navigatorMask) {
        navigatorMask.style.display = ''
      }
    }
  }

  const handleNavigatorMouseUp = (e: MouseEvent) => {
    if(Utils.currentEditor?.action) {
      const image = document.getElementById(Utils.currentEditor.action.imageId)
      const navigator = document.getElementById(NAVIGATOR_ID)
      const imageContainer = document.getElementById(ACTION_IMAGE_ID)
      const navigatorMask = document.getElementById(NAVIGATOR_MASK_ID)
      if(image && navigator && imageContainer && navigatorMask) {
        navigatorMask.style.display = 'none'
        while(imageContainer.lastChild) {
          imageContainer.removeChild(imageContainer.lastChild)
        }
        Utils.currentEditor.action = undefined
      }      
    }
  }

  const handleNavigatorMaskMouseEnter = (e: MouseEvent) => {
    if(Utils.currentEditor?.action) {
      const image = document.getElementById(Utils.currentEditor.action.imageId)
      const navigator = document.getElementById(NAVIGATOR_ID)
      const imageContainer = document.getElementById(ACTION_IMAGE_ID)
    }
  }

  const handleNavigatorMaskMouseLeave = (e: MouseEvent) => {
    if(Utils.currentEditor?.action) {
      const image = document.getElementById(Utils.currentEditor.action.imageId)
      const navigator = document.getElementById(NAVIGATOR_ID)
      const imageContainer = document.getElementById(ACTION_IMAGE_ID)
    }
  }

  const handleNavigatorMaskMouseMove = (e: MouseEvent) => {
    //console.log(`moving...`)
    if(Utils.currentEditor?.action) {
      const image = document.getElementById(Utils.currentEditor.action.imageId)
      const navigator = document.getElementById(NAVIGATOR_ID)
      const imageContainer = document.getElementById(ACTION_IMAGE_ID)
      const navigatorMask = document.getElementById(NAVIGATOR_MASK_ID)
      if(image && navigator && imageContainer && navigatorMask) {
        if(!imageContainer.hasChildNodes()) {
          //console.log(`Node is appended`)
          const cloneImage = image.cloneNode()
          //cloneImage.addEventListener('MouseMove', handleNavigatorImageMouseMove)
          imageContainer.append(cloneImage)
        }
        imageContainer.style.left = (e.clientX - image.clientWidth / 2) + 'px'
        imageContainer.style.top = (e.clientY + navigatorScrollTop - image.clientHeight / 2 - Utils.HEADER_HEIGHT) + 'px'
      }
    }
  }

  const handleNavigatorScroll = (e: UIEvent) => {
    const scrollTop = e.currentTarget.scrollTop
    setNavigatorScallTop(scrollTop)
    const navigator = document.getElementById(NAVIGATOR_ID)
    const navigatorMask = document.getElementById(NAVIGATOR_MASK_ID)
    if(navigator && navigatorMask) {
      navigatorMask.style.height = navigator.scrollHeight + 'px'
    }
  }

  const handleMouseOut = (e: MouseEvent) => {
    //console.log(`mouse is out`)
  }

  const handleMouseUp = (e: MouseEvent) => {
    //console.log(`mouse is up`)
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
      <Button type='text' onMouseDown={() => addShape(shapeType.name, 'shapes-large')}style={{padding: 2, display: 'table'}} >
        <img src={process.env.PUBLIC_PATH + `/shapes/${shapeType.name}.png`} width={width} height={height} style={{display: 'table-cell'}} draggable={false}/>
      </Button>
    </Popover>
    }
  )

  const containers2 = <Popover title={'Container'} placement='right' content={getPopoverContent('Rectangle', 128, 128)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 180, width: 180,}}>
  <Button type='text' onMouseDown={() => addContainer(Containers.TYPE_CONTAINER, 'shapes-large')} style={{padding: 2, display: 'table'}} >
    <img src={process.env.PUBLIC_PATH + `/shapes/Rectangle.png`} width={28} height={19} style={{display: 'table-cell'}}/>
  </Button>
  </Popover>

  const containers = ContainerTypes.map(containerType => {
    return <Popover title={containerType.name} placement='right' content={getPopoverContent(containerType.name, containerType.width, containerType.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 280, width: 280,}}>
      <Button type='text' onMouseDown={() => addContainer(containerType.name, 'shapes-large')} style={{padding: 2, display: 'table'}}>
        <img src={process.env.PUBLIC_PATH + `/shapes/${containerType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const customShapeBasicShapes = BasicShapes.map(
    basicType => {
      return <Popover title={basicType.typeInfo.description} placement='right' content={getCustomShapeBasicShapesPopoverContent(basicType.name, basicType.typeInfo.width, basicType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 160, width: 160,}}>
      <Button type='text' onMouseDown={() => addCustomShape(basicType.name, basicType.type, basicType.typeInfo, 'custom-shapes-large/basic-shapes')} style={{padding: 2, display: 'table'}}>
        <img src={process.env.PUBLIC_PATH + `/custom-shapes/basic-shapes/${basicType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
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
      <Button type='text' onMouseDown={() => addCustomShape(basicType.name, basicType.type, basicType.typeInfo, 'custom-shapes-large/flowchart')} style={{padding: 2, display: 'table'}}>
        <img src={process.env.PUBLIC_PATH + `/custom-shapes/flowchart/${basicType.name}.png`} width={width} height={height} style={{display: 'table-cell'}}/>
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
      <Button type='text' onMouseDown={() => addCustomShape(arrow.name, arrow.type, arrow.typeInfo, 'custom-shapes-large/arrows')} style={{padding: 2, display: 'table'}}>
        <img src={process.env.PUBLIC_PATH + `/custom-shapes/arrows/${arrow.name}.png`} width={width} height={height} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const aliyunShapes = AliyunShapes.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeAliyunPopoverContent(shapeType.name, shapeType.width, shapeType.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 160, width: 160,}}>
      <Button type='text' onMouseDown={() => addSvgShape(shapeType.name, shapeType.data, shapeType.width, shapeType.height, 'custom-shapes-large/aliyun')} style={{padding: 2, display: 'table'}}>
        <img src={process.env.PUBLIC_PATH + `/custom-shapes/aliyun/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const awsShapes = AwsShapes.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeAwsPopoverContent(shapeType.name, shapeType.width, shapeType.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 160, width: 160,}}>
      <Button type='text' onMouseDown={() => addImageShape(shapeType.name, shapeType.data, shapeType.width, shapeType.height, 'custom-shapes-large/aws')} style={{padding: 2, display: 'table'}}>
        <img src={process.env.PUBLIC_PATH + `/custom-shapes/aws/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlCustomTables = UMLCustomTables.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeAwsPopoverContent(shapeType.name, shapeType.typeInfo.width, shapeType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 160, width: 160,}}>
      <Button type='text' onMouseDown={() => addCustomTable(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-shapes-large/uml')} style={{padding: 2, display: 'table'}}>
        <img src={process.env.PUBLIC_PATH + `/custom-shapes/uml/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlContainerShapes = UMLContainerShapes.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getUMLContainerPopoverContent(shapeType.name, shapeType.typeInfo.width, shapeType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 160, width: 160,}}>
      <Button type='text' onMouseDown={() => addExtendedContainer(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-shapes-large/uml')} style={{padding: 2, display: 'table'}}>
        <img src={process.env.PUBLIC_PATH + `/custom-shapes/uml/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlBasicShapes = UMLBasicShapes.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeUMLPopoverContent(shapeType.name, shapeType.typeInfo.width, shapeType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 160, width: 160,}}>
      <Button type='text' onMouseDown={() => addExtendedShape(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-shapes-large/uml')} style={{padding: 2, display: 'table'}}>
        <img src={process.env.PUBLIC_PATH + `/custom-shapes/uml/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlConnectors = UMLConnectors.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeUMLPopoverContent(shapeType.name, 160, 160)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 160, width: 160,}}>
      <Button type='text' onMouseDown={() => addCustomConnector(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-shapes-large/uml')} style={{padding: 2, display: 'table'}}>
        <img src={process.env.PUBLIC_PATH + `/custom-shapes/uml/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlGridShapesForClass = UMLGridShapesForClass.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeUMLPopoverContent(shapeType.name, shapeType.typeInfo.width, shapeType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: shapeType.typeInfo.width + 60, width: shapeType.typeInfo.height + 60,}}>
      <Button type='text' onMouseDown={() => addCustomTable(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-shapes-large/uml')} style={{padding: 2, display: 'table'}}>
        <img src={process.env.PUBLIC_PATH + `/custom-shapes/uml/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlContainerShapesForClass = UMLContainerShapesForClass.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getUMLContainerPopoverContent(shapeType.name, shapeType.typeInfo.width, shapeType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: shapeType.typeInfo.width + 60, width: shapeType.typeInfo.height + 60,}}>
      <Button type='text' onMouseDown={() => addExtendedContainer(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-shapes-large/uml')} style={{padding: 2, display: 'table'}}>
        <img src={process.env.PUBLIC_PATH + `/custom-shapes/uml/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlBasicShapesForClass = UMLBasicShapesForClass.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeUMLPopoverContent(shapeType.name, shapeType.typeInfo.width, shapeType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: shapeType.typeInfo.width + 60, width: shapeType.typeInfo.height + 60,}}>
      <Button type='text' onMouseDown={() => addExtendedShape(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-shapes-large/uml')} style={{padding: 2, display: 'table'}}>
        <img src={process.env.PUBLIC_PATH + `/custom-shapes/uml/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlConnectorsForClass = UMLConnectorsForClass.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeUMLPopoverContent(shapeType.name, 160, 160)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 160 + 60, width: 160 + 60,}}>
      <Button type='text' onMouseDown={() => addCustomConnector(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-shapes-large/uml')} style={{padding: 2, display: 'table'}}>
        <img src={process.env.PUBLIC_PATH + `/custom-shapes/uml/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlContainerShapesForUseCase = UMLContainerShapesForUseCase.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getUMLContainerPopoverContent(shapeType.name, shapeType.typeInfo.width, shapeType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: shapeType.typeInfo.width + 60, width: shapeType.typeInfo.height + 60,}}>
      <Button type='text' onMouseDown={() => addExtendedContainer(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-shapes-large/uml')} style={{padding: 2, display: 'table'}}>
        <img src={process.env.PUBLIC_PATH + `/custom-shapes/uml/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlBasicShapesForUseCase = UMLBasicShapesForUseCase.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeUMLPopoverContent(shapeType.name, shapeType.typeInfo.width, shapeType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: shapeType.typeInfo.width + 60, width: shapeType.typeInfo.height + 60,}}>
      <Button type='text' onMouseDown={() => addExtendedShape(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-shapes-large/uml')} style={{padding: 2, display: 'table'}}>
        <img src={process.env.PUBLIC_PATH + `/custom-shapes/uml/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlConnectorsForUseCase = UMLConnectorsForUseCase.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeUMLPopoverContent(shapeType.name, 160, 160)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 160 + 60, width: 160 + 60,}}>
      <Button type='text' onMouseDown={() => addCustomConnector(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-shapes-large/uml')} style={{padding: 2, display: 'table'}}>
        <img src={process.env.PUBLIC_PATH + `/custom-shapes/uml/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlBasicShapesForActivityState = UMLBasicShapesForActivityState.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeUMLPopoverContent(shapeType.name, shapeType.typeInfo.width, shapeType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: shapeType.typeInfo.width + 60, width: shapeType.typeInfo.height + 60,}}>
      <Button type='text' onMouseDown={() => addExtendedShape(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-shapes-large/uml')} style={{padding: 2, display: 'table'}}>
        <img src={process.env.PUBLIC_PATH + `/custom-shapes/uml/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlCustomShapesForActivityState = UMLCustomShapesForActivityState.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeUMLPopoverContent(shapeType.name, shapeType.typeInfo.width, shapeType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: shapeType.typeInfo.width + 60, width: shapeType.typeInfo.height + 60,}}>
      <Button type='text' onMouseDown={() => addCustomShape(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-shapes-large/uml')} style={{padding: 2, display: 'table'}}>
        <img src={process.env.PUBLIC_PATH + `/custom-shapes/uml/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlConnectorsForActivityState = UMLConnectorsForActivityState.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeUMLPopoverContent(shapeType.name, 160, 160)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 160 + 60, width: 160 + 60,}}>
      <Button type='text' onMouseDown={() => addCustomConnector(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-shapes-large/uml')} style={{padding: 2, display: 'table'}}>
        <img src={process.env.PUBLIC_PATH + `/custom-shapes/uml/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlContainerShapesForActivityState = UMLContainerShapesForActivityState.map(
    shapeType => {
      const iconWidth = shapeType.typeInfo.width >= shapeType.typeInfo.height ? 28 : 28 * shapeType.typeInfo.width / shapeType.typeInfo.height
      const iconheight = shapeType.typeInfo.width >= shapeType.typeInfo.height ? 28 * shapeType.typeInfo.height / shapeType.typeInfo.width : 28    
      const iconSize = iconWidth >= iconheight ?  iconWidth :  iconheight
      return <Popover title={shapeType.name} placement='right' content={getUMLContainerPopoverContent(shapeType.name, shapeType.typeInfo.width, shapeType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: shapeType.typeInfo.width + 60, width: shapeType.typeInfo.width + 60,}}>
      <Button type='text' onMouseDown={() => addExtendedContainer(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-shapes-large/uml')} style={{padding: 2, display: 'table'}}>
        <img src={process.env.PUBLIC_PATH + `/custom-shapes/uml/${shapeType.name}.png`} width={iconSize} height={iconSize} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )



  const umlCustomContainersForSequence = UMLCustomContainersForSequence.map(
    shapeType => {
      const iconWidth = shapeType.typeInfo.width >= shapeType.typeInfo.height ? 28 : 28 * shapeType.typeInfo.width / shapeType.typeInfo.height
      const iconheight = shapeType.typeInfo.width >= shapeType.typeInfo.height ? 28 * shapeType.typeInfo.height / shapeType.typeInfo.width : 28
      const iconSize = iconWidth >= iconheight ?  iconWidth :  iconheight
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeUMLPopoverContent(shapeType.name, shapeType.typeInfo.width, shapeType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: shapeType.typeInfo.width + 60, width: shapeType.typeInfo.height + 60,}}>
      <Button type='text' onMouseDown={() => addCustomContainer(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-shapes-large/uml')} style={{padding: 2, display: 'table'}}>
        <img src={process.env.PUBLIC_PATH + `/custom-shapes/uml/${shapeType.name}.png`} width={iconSize} height={iconSize} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlCustomShapesForSequence = UMLCustomShapesForSequence.map(
    shapeType => {
      const iconWidth = shapeType.typeInfo.width >= shapeType.typeInfo.height ? 28 : 28 * shapeType.typeInfo.width / shapeType.typeInfo.height
      const iconheight = shapeType.typeInfo.width >= shapeType.typeInfo.height ? 28 * shapeType.typeInfo.height / shapeType.typeInfo.width : 28
      const iconSize = iconWidth >= iconheight ?  iconWidth :  iconheight
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeUMLPopoverContent(shapeType.name, shapeType.typeInfo.width, shapeType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: shapeType.typeInfo.width + 60, width: shapeType.typeInfo.height + 60,}}>
      <Button type='text' onMouseDown={() => addCustomShape(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-shapes-large/uml')} style={{padding: 2, display: 'table'}}>
        <img src={process.env.PUBLIC_PATH + `/custom-shapes/uml/${shapeType.name}.png`} width={iconSize} height={iconSize} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlFrameShapesForSequence = UMLFrameShapesForSequence.map(
    shapeType => {
      const iconWidth = shapeType.typeInfo.width >= shapeType.typeInfo.height ? 28 : 28 * shapeType.typeInfo.width / shapeType.typeInfo.height
      const iconheight = shapeType.typeInfo.width >= shapeType.typeInfo.height ? 28 * shapeType.typeInfo.height / shapeType.typeInfo.width : 28
      const iconSize = iconWidth >= iconheight ?  iconWidth :  iconheight
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeUMLPopoverContent(shapeType.name, shapeType.typeInfo.width, shapeType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: shapeType.typeInfo.width + 60, width: shapeType.typeInfo.height + 60,}}>
      <Button type='text' onMouseDown={() => addFrame(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-shapes-large/uml')} style={{padding: 2, display: 'table'}}>
        <img src={process.env.PUBLIC_PATH + `/custom-shapes/uml/${shapeType.name}.png`} width={iconSize} height={iconSize} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlConnectorsForSequence = UMLConnectorsForSequence.map(
    shapeType => {
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeUMLPopoverContent(shapeType.name, 160, 160)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: 160 + 60, width: 160 + 60,}}>
      <Button type='text' onMouseDown={() => addCustomConnector(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-shapes-large/uml')} style={{padding: 2, display: 'table'}}>
        <img src={process.env.PUBLIC_PATH + `/custom-shapes/uml/${shapeType.name}.png`} width={28} height={28} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlGridShapesForOther = UMLGridShapesForOther.map(
    shapeType => {
      const iconWidth = shapeType.typeInfo.width >= shapeType.typeInfo.height ? 28 : 28 * shapeType.typeInfo.width / shapeType.typeInfo.height
      const iconheight = shapeType.typeInfo.width >= shapeType.typeInfo.height ? 28 * shapeType.typeInfo.height / shapeType.typeInfo.width : 28
      const iconSize = iconWidth >= iconheight ?  iconWidth :  iconheight
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeUMLPopoverContent(shapeType.name, shapeType.typeInfo.width, shapeType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: shapeType.typeInfo.width + 60, width: shapeType.typeInfo.height + 60,}}>
      <Button type='text' onMouseDown={() => addCustomTable(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-shapes-large/uml')} style={{padding: 2, display: 'table'}}>
        <img src={process.env.PUBLIC_PATH + `/custom-shapes/uml/${shapeType.name}.png`} width={iconSize} height={iconSize} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const umlCustomShapesForOther = UMLCustomShapesForOther.map(
    shapeType => {
      const iconWidth = shapeType.typeInfo.width >= shapeType.typeInfo.height ? 28 : 28 * shapeType.typeInfo.width / shapeType.typeInfo.height
      const iconheight = shapeType.typeInfo.width >= shapeType.typeInfo.height ? 28 * shapeType.typeInfo.height / shapeType.typeInfo.width : 28
      const iconSize = iconWidth >= iconheight ?  iconWidth :  iconheight
      return <Popover title={shapeType.name} placement='right' content={getCustomShapeUMLPopoverContent(shapeType.name, shapeType.typeInfo.width, shapeType.typeInfo.height)} overlayStyle={{left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH, minWidth: shapeType.typeInfo.width + 60, width: shapeType.typeInfo.height + 60,}}>
      <Button type='text' onMouseDown={() => addCustomShape(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-shapes-large/uml')} style={{padding: 2, display: 'table'}}>
        <img src={process.env.PUBLIC_PATH + `/custom-shapes/uml/${shapeType.name}.png`} width={iconSize} height={iconSize} style={{display: 'table-cell'}}/>
      </Button>
    </Popover>
    }
  )

  const myShapeItems = myShapes.map(myShape => {
    const width = myShape.width > myShape.height ? 28 :  Math.round(28 * myShape.width / myShape.height)
    const height = myShape.height > myShape.width ? 28 :  Math.round(28 * myShape.height / myShape.width)
    return <Button type='text' onMouseDown={() => addMyShape(myShape)}  style={{padding: 2, display: 'flex', justifyContent:'center', alignItems:'center', width: 32, height: 32}}>
      <img src={`${myShape.image}`} width={width} height={height} />
    </Button>
  })

  const handleModifyMyShapes = (event: MouseEvent) => {
    setMyShapesWindowVisible(!myShapesWindowVisiible)
    event.stopPropagation()
  }

  const handleMyShapesWindowOk = () => {
    setMyShapesWindowVisible(false)
  }

  const handleMyShapesWindowCancel = () => {
    setMyShapesWindowVisible(false)
  }

  const handleMyShapesChanged = () => {
    setMyShapesChanged(true)
  }

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: <div style={{fontWeight: 'bolder'}}><FormattedMessage id='workspace.navigator.panel.my-shapes' /></div>,
      children: <Space size={2} wrap>
          {myShapeItems}    
        </Space>,
      extra: <EditOutlined onClick={handleModifyMyShapes}/>
    },
    {
      key: '2',
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
      key: '3',
      label: <div style={{fontWeight: 'bolder'}}><FormattedMessage id='workspace.navigator.panel.advanced'/></div>,
      children: <Space size={2} wrap>
      {/* {aliyunShapes}
      {awsShapes} */}
      {customShapeFlowChartShapes}
      {customShapeBasicShapes}
      </Space>,
    },
    {
      key: '4',
      label: <div style={{fontWeight: 'bolder'}}><FormattedMessage id='workspace.navigator.panel.arrows'/></div>,
      children: <Space size={2} wrap>
      {customShapeArrows}
      </Space>,
    },
    {
      key: '5',
      label: <div style={{fontWeight: 'bolder'}}><FormattedMessage id='workspace.navigator.panel.uml-class'/></div>,
      children: <Space size={2} wrap>
      {umlGridShapesForClass}
      {umlContainerShapesForClass}
      {umlBasicShapesForClass}
      {umlConnectorsForClass}
      </Space>,
    },
    {
      key: '6',
      label: <div style={{fontWeight: 'bolder'}}><FormattedMessage id='workspace.navigator.panel.uml-use-case'/></div>,
      children: <Space size={2} wrap>
      {umlContainerShapesForUseCase}
      {umlBasicShapesForUseCase}
      {umlConnectorsForUseCase}
      </Space>,
    },
    {
      key: '7',
      label: <div style={{fontWeight: 'bolder'}}><FormattedMessage id='workspace.navigator.panel.uml-activity-state'/></div>,
      children: <Space size={2} wrap>
        {umlBasicShapesForActivityState}
        {umlCustomShapesForActivityState}
        {umlConnectorsForActivityState}
        {umlContainerShapesForActivityState}
      </Space>,
    },
    {
      key: '8',
      label: <div style={{fontWeight: 'bolder'}}><FormattedMessage id='workspace.navigator.panel.uml-sequence'/></div>,
      children: <Space size={2} wrap>
        {umlCustomContainersForSequence}
        {umlCustomShapesForSequence}
        {umlFrameShapesForSequence}
        {umlConnectorsForSequence}
      </Space>,
    },
    {
      key: '9',
      label: <div style={{fontWeight: 'bolder'}}><FormattedMessage id='workspace.navigator.panel.uml-others'/></div>,
      children: <Space size={2} wrap>
        {umlGridShapesForOther}
        {umlCustomShapesForOther}
      </Space>,
    },
  ]

  return (
    <div id={NAVIGATOR_ID} style={{ position: 'absolute', top: '0px', bottom: '0px', left: '0px', width: navigatorWidth, overflow: 'auto', scrollbarWidth: 'thin'}}
         onMouseDown={handleNavigatorMouseDown} onMouseMove={handleNavigatorMouseMove} onMouseLeave={handleNavigatorMouseLeave} onMouseUp={handleNavigatorMouseUp}
         onScroll={handleNavigatorScroll}
        >
      <div id={ACTION_IMAGE_ID} style={{position: 'absolute', opacity: '0.5', zIndex: 9999}} 
        //onMouseMove={handleNavigatorImageMouseMove} 
      />
      <div id={NAVIGATOR_MASK_ID} style={{position: 'absolute', display: 'none', opacity: '0', backgroundColor: 'red',  width: '100%', height: '100%', zIndex: 99999}} 
        onMouseMove={handleNavigatorMaskMouseMove} onMouseEnter={handleNavigatorMaskMouseEnter} onMouseLeave={handleNavigatorMaskMouseLeave}
      />
      <Collapse items={items} defaultActiveKey={['1','2' ]} onChange={onChange} size='small'/>
      <MyShapesWindowPage visible={myShapesWindowVisiible} onWindowCancel={handleMyShapesWindowCancel} onWindowOk={handleMyShapesWindowOk} onMyShapesChanged={handleMyShapesChanged}/>
    </div>
  )
}

export default Navigator
