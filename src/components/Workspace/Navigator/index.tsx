/* eslint-disable @typescript-eslint/no-use-before-define */
import { PluginManager } from '@/components/Workspace/Utils/PluginManager'
import { EditOutlined } from '@ant-design/icons'
import {
  ConnectorAction,
  ContainerAction,
  CustomConnectorAction,
  CustomContainerAction,
  CustomShapeAction,
  CustomTableAction,
  EntityExtensionAction,
  ExtendedContainerAction,
  ExtendedShapeAction,
  FrameAction,
  MyShapeAction,
  PoolContainerAction,
  ShapeAction,
  TableAction,
} from '@ratel-web/editor/Actions'
import { Arrows } from '@ratel-web/editor/CustomItems/Arrows'
import { BasicShapes } from '@ratel-web/editor/CustomItems/BasicShapes'
import { ERCustomShapes } from '@ratel-web/editor/CustomItems/EntityRelation'
import { FlowChartShapes } from '@ratel-web/editor/CustomItems/FlowChart'
import { MockupShapes } from '@ratel-web/editor/CustomItems/Mockup'
import {
  UMLBasicShapesForActivityState,
  UMLBasicShapesForClass,
  UMLBasicShapesForUseCase,
  UMLConnectorsForActivityState,
  UMLConnectorsForClass,
  UMLConnectorsForSequence,
  UMLConnectorsForUseCase,
  UMLContainerShapesForActivityState,
  UMLContainerShapesForClass,
  UMLContainerShapesForUseCase,
  UMLCustomContainersForSequence,
  UMLCustomShapesForActivityState,
  UMLCustomShapesForOther,
  UMLCustomShapesForSequence,
  UMLFrameShapesForSequence,
  UMLGridShapesForClass,
  UMLGridShapesForOther,
} from '@ratel-web/editor/CustomItems/UML'
import {
  ContainerEntity,
  ContainerTypes,
  CustomConnector,
  CustomConnectorTypeInfo,
  CustomContainerEntity,
  CustomEntity,
  CustomTableEntity,
  CustomTableType,
  ExtensionCategory,
  FrameEntity,
  MyShape,
  Plugin,
  PoolCustomContainerTypes,
  PoolType,
  ShapeEntity,
  ShapeType,
  ShapeTypes,
  TableTypes,
} from '@ratel-web/editor/Items'
import { EntityExtension } from '@ratel-web/editor/Shapes'
import { ImageUtils } from '@ratel-web/editor/Utils'
import { Element, Path, SVG, Svg } from '@svgdotjs/svg.js'
import { Button, Collapse, CollapseProps, Popover, Space, theme } from 'antd'
import React, { FC, MouseEventHandler, UIEvent, createRef, useEffect, useState } from 'react'
import { FormattedMessage } from 'umi'
import { RequestUtils, Utils } from '../Utils'
import { MyShapes } from '../Utils/RequestUtils'
import MyShapesWindowPage from './MyShapesWindow'

interface NavigatorProps {
  navigatorWidth: number
  onMyShapesLoaded: () => void
  myShapesUpdated: boolean
}
const ICON_WIDTH = 28
const ICON_HEIGHT = 28
const POPOVER_ICON_MARGIN = 5
const POPOVER_WIDTH = 160
const POPOVER_MIN_WIDTH = 160
const POPOVER_MARGIN = 30
const LINE_WIDTH = 128
const LINE_HEIGHT = 128

const NAVIGATOR_ID = 'navigator-id'
const ACTION_IMAGE_ID = 'navigator-action-image-id'
const NAVIGATOR_MASK_ID = 'navigator-mask-id'

const Navigator: FC<NavigatorProps> = ({
  navigatorWidth,
  myShapesUpdated,
  onMyShapesLoaded, //, loginCompleted, logoutCompleted
}) => {
  const token = theme.useToken()
  //const workspaceBackground = token.token.colorBgElevated
  const scrollbarTrackColor = token.token.colorBgContainer
  const scrollbarThumbColor = token.token.colorTextQuaternary

  const [initialized, setInitialized] = useState<boolean>(false)
  const [myShapes, setMyShapes] = useState<MyShape[]>([])
  const [myShapesWindowVisible, setMyShapesWindowVisible] = useState<boolean>(false)
  const [myShapesChanged, setMyShapesChanged] = useState<boolean>(false)
  const [navigatorScrollTop, setNavigatorScallTop] = useState<number>(0)

  useEffect(() => {
    if (myShapesChanged || myShapesUpdated || !initialized) {
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

  const refreshMyShapes = async () => {
    const fetchSettingsData = async () => {
      const settingsData = await RequestUtils.getSettings()
      if (settingsData.status === 200 && settingsData.data.success) {
        const data = settingsData.data.data.settings
        const newMyShapes: MyShapes = data ? JSON.parse(data) : { shapes: [] }
        if (newMyShapes) {
          setMyShapes(newMyShapes.shapes)
        } else {
          setMyShapes([])
        }
      } else {
        setMyShapes([])
      }
      if (onMyShapesLoaded) {
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

  // const addRectangle = () => {
  //   if (Utils.currentEditor) {
  //     Utils.currentEditor.action = new ShapeAction(Utils.currentEditor)
  //   }
  // }
  //
  // const addEllipse = () => {
  //   if (Utils.currentEditor) {
  //     Utils.currentEditor.action = new ShapeAction(Utils.currentEditor, Shapes.TYPE_ELLIPSE)
  //   }
  // }
  //
  // const addSquare = () => {
  //   if (Utils.currentEditor) {
  //     Utils.currentEditor.action = new ShapeAction(Utils.currentEditor, Shapes.TYPE_SQUARE, Shapes.FREEZE_ASPECT_RATIO)
  //   }
  // }

  const addShape = (type: string, folder: string) => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new ShapeAction(Utils.currentEditor, type)
      Utils.currentEditor.action.imageId = process.env.BASIC_PATH + `/${folder}/${type}.svg`
    }
  }

  const addContainer = (type: string, folder: string) => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new ContainerAction(Utils.currentEditor, type)
      Utils.currentEditor.action.imageId = process.env.BASIC_PATH + `/${folder}/${type}.svg`
    }
  }

  const addCustomShape = (type: string, classType: typeof CustomEntity, shapeType: ShapeType, folder: string) => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new CustomShapeAction(Utils.currentEditor, type, classType, shapeType)
      Utils.currentEditor.action.imageId = process.env.BASIC_PATH + `/${folder}/${type}.svg`
    }
  }

  const addCustomContainer = (type: string, classType: typeof CustomContainerEntity, shapeType: ShapeType, folder: string) => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new CustomContainerAction(Utils.currentEditor, type, classType, shapeType)
      Utils.currentEditor.action.imageId = process.env.BASIC_PATH + `/${folder}/${type}.svg`
    }
  }

  const addPoolContainer = (type: string, shapeType: PoolType, folder: string) => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new PoolContainerAction(Utils.currentEditor, type, shapeType)
      Utils.currentEditor.action!.imageId = process.env.BASIC_PATH + `/${folder}/${type}.svg`
    }
  }

  const addFrame = (type: string, classType: typeof FrameEntity, shapeType: ShapeType, folder: string) => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new FrameAction(Utils.currentEditor, type, classType, shapeType)
      Utils.currentEditor.action.imageId = process.env.BASIC_PATH + `/${folder}/${type}.svg`
    }
  }

  // const addSvgShape = (type: string, data: string, width: number, height: number, folder: string) => {
  //   if (Utils.currentEditor) {
  //     Utils.currentEditor.action = new SvgContainerAction(Utils.currentEditor, type, data, width, height)
  //     Utils.currentEditor.action.imageId = process.env.BASIC_PATH + `/${folder}/${type}.png`
  //   }
  // }
  //
  // const addImageShape = (type: string, data: string, width: number, height: number, folder: string) => {
  //   if (Utils.currentEditor) {
  //     Utils.currentEditor.action = new ImageContainerAction(Utils.currentEditor, type, data, width, height)
  //     Utils.currentEditor.action.imageId = process.env.BASIC_PATH + `/${folder}/${type}.png`
  //   }
  // }

  const addLine = (type: string, folder: string) => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new ConnectorAction(Utils.currentEditor)
      Utils.currentEditor.action.imageId = process.env.BASIC_PATH + `/${folder}/${type}.svg`
    }
  }

  const addTable = (type: string, folder: string) => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new TableAction(Utils.currentEditor)
      Utils.currentEditor.action.imageId = process.env.BASIC_PATH + `/${folder}/${type}.svg`
    }
    let str = encodeURI('ab')
    const base64 = btoa(str)
    console.log(base64)
    const haha = atob('aa')
    str = decodeURI(haha)
    console.log(str)
  }

  const addPluginShape = (plugin: Plugin, extensionCategory: ExtensionCategory, entityExtension: EntityExtension, imageId: string) => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new EntityExtensionAction(Utils.currentEditor, entityExtension, extensionCategory, plugin)
      Utils.currentEditor.action.imageId = imageId
    }
  }

  const addMyShape = (myShape: MyShape, imageId: string) => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new MyShapeAction(Utils.currentEditor, myShape)
      Utils.currentEditor.action.imageId = imageId
    }
  }

  const addCustomTable = (typeName: string, classType: typeof CustomTableEntity, shapeType: CustomTableType, folder: string) => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new CustomTableAction(Utils.currentEditor, typeName, classType, shapeType)
      Utils.currentEditor.action.imageId = process.env.BASIC_PATH + `/${folder}/${typeName}.svg`
    }
  }

  const addExtendedContainer = (typeName: string, classType: typeof ContainerEntity, shapeType: ShapeType, folder: string) => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new ExtendedContainerAction(Utils.currentEditor, typeName, classType, shapeType)
      Utils.currentEditor.action.imageId = process.env.BASIC_PATH + `/${folder}/${typeName}.svg`
    }
  }

  const addExtendedShape = (type: string, classType: typeof ShapeEntity, shapeType: ShapeType, folder: string) => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new ExtendedShapeAction(Utils.currentEditor, type, classType, shapeType)
      Utils.currentEditor.action.imageId = process.env.BASIC_PATH + `/${folder}/${type}.svg`
    }
  }

  const addCustomConnector = (type: string, classType: typeof CustomConnector, customConnectorTypeInfos: CustomConnectorTypeInfo, folder: string) => {
    if (Utils.currentEditor) {
      Utils.currentEditor.action = new CustomConnectorAction(Utils.currentEditor, type, classType, customConnectorTypeInfos)
      Utils.currentEditor.action.imageId = process.env.BASIC_PATH + `/${folder}/${type}.svg`
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getPopoverContent = (name: string, width: number, height: number) => {
    return (
      <div style={{ width: width * 1.25, display: 'table' }}>
        <div
          style={{
            display: 'table-cell',
            textAlign: 'center',
            verticalAlign: 'middle',
            borderTop: '0px solid gray',
            padding: '2px',
          }}
        >
          <img id={process.env.BASIC_PATH + `/shapes-large/${name}.png`} src={process.env.BASIC_PATH + `/shapes-large/${name}.png`} />
        </div>
      </div>
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getCustomShapeUMLPopoverContent = (name: string, width: number, height: number) => {
    return (
      <div style={{ width: width * 1.25, display: 'table' }}>
        <div
          style={{
            display: 'table-cell',
            textAlign: 'center',
            verticalAlign: 'middle',
            borderTop: '0px solid gray',
            padding: '2px',
          }}
        >
          <img id={process.env.BASIC_PATH + `/custom-shapes-large/uml/${name}.png`} src={process.env.BASIC_PATH + `/custom-shapes-large/uml/${name}.png`} />
        </div>
      </div>
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getMyShapePopoverContent = (id: string, name: string, image: string, width: number, height: number) => {
    return (
      <div style={{ width: width * 1.25, display: 'table' }}>
        <div
          style={{
            display: 'table-cell',
            textAlign: 'center',
            verticalAlign: 'middle',
            borderTop: '0px solid gray',
            padding: '2px',
          }}
        >
          <img id={id} src={image} />
        </div>
      </div>
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getCustomShapeERPopoverContent = (name: string, width: number, height: number) => {
    return (
      <div style={{ width: width * 1.25, display: 'table' }}>
        <div
          style={{
            display: 'table-cell',
            textAlign: 'center',
            verticalAlign: 'middle',
            borderTop: '0px solid gray',
            padding: '2px',
          }}
        >
          <img
            id={process.env.BASIC_PATH + `/custom-shapes-large/entity-relation/${name}.png`}
            src={process.env.BASIC_PATH + `/custom-shapes-large/entity-relation/${name}.png`}
          />
        </div>
      </div>
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getCustomShapeMockupPopoverContent = (name: string, width: number, height: number) => {
    return (
      <div style={{ width: width * 1.25, display: 'table' }}>
        <div
          style={{
            display: 'table-cell',
            textAlign: 'center',
            verticalAlign: 'middle',
            borderTop: '0px solid gray',
            padding: '2px',
          }}
        >
          <img
            id={process.env.BASIC_PATH + `/custom-shapes-large/mockup/${name}.png`}
            src={process.env.BASIC_PATH + `/custom-shapes-large/mockup/${name}.png`}
          />
        </div>
      </div>
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getUMLContainerPopoverContent = (name: string, width: number, height: number) => {
    return (
      <div style={{ width: width * 1.25, display: 'table' }}>
        <div
          style={{
            display: 'table-cell',
            textAlign: 'center',
            verticalAlign: 'middle',
            borderTop: '0px solid gray',
            padding: '2px',
          }}
        >
          <img id={process.env.BASIC_PATH + `/custom-shapes-large/uml/${name}.png`} src={process.env.BASIC_PATH + `/custom-shapes-large/uml/${name}.png`} />
        </div>
      </div>
    )
  }

  const handleNavigatorMouseMove = (e: MouseEvent) => {
    // e.preventDefault()
    if (Utils.currentEditor?.action) {
      //const action = Utils.currentEditor.action
      //console.log(Utils.currentEditor?.action.imageId)
      const image = document.getElementById(Utils.currentEditor.action.imageId)
      const navigator = document.getElementById(NAVIGATOR_ID)
      const imageContainer = document.getElementById(ACTION_IMAGE_ID)
      const navigatorMask = document.getElementById(NAVIGATOR_MASK_ID)
      if (image && navigator && imageContainer && navigatorMask) {
        navigatorMask.style.display = ''
        if (!imageContainer.hasChildNodes()) {
          //console.log(`Node is appended`)
          const cloneImage = image.cloneNode()
          //cloneImage.addEventListener('mousemove', handleNavigatorImageMouseMove)
          imageContainer.append(cloneImage)
        }
        imageContainer.style.left = e.clientX - image.clientWidth / 2 + 'px'
        imageContainer.style.top = e.clientY + navigatorScrollTop - image.clientHeight / 2 - Utils.HEADER_HEIGHT + 'px'
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleNavigatorMouseLeave = (e: MouseEvent) => {
    if (Utils.currentEditor?.action) {
      const image = document.getElementById(Utils.currentEditor.action.imageId)
      const navigator = document.getElementById(NAVIGATOR_ID)
      const imageContainer = document.getElementById(ACTION_IMAGE_ID)
      const navigatorMask = document.getElementById(NAVIGATOR_MASK_ID)
      if (image && navigator && imageContainer && navigatorMask) {
        navigatorMask.style.display = 'none'
        while (imageContainer.lastChild) {
          imageContainer.removeChild(imageContainer.lastChild)
        }
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleNavigatorMouseDown = (e: MouseEvent) => {
    if (Utils.currentEditor?.action) {
      const image = document.getElementById(Utils.currentEditor.action.imageId)
      const navigator = document.getElementById(NAVIGATOR_ID)
      const imageContainer = document.getElementById(ACTION_IMAGE_ID)
      const navigatorMask = document.getElementById(NAVIGATOR_MASK_ID)
      if (image && navigator && imageContainer && navigatorMask) {
        navigatorMask.style.display = ''
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleNavigatorMouseUp = (e: MouseEvent) => {
    if (Utils.currentEditor?.action) {
      const image = document.getElementById(Utils.currentEditor.action.imageId)
      const navigator = document.getElementById(NAVIGATOR_ID)
      const imageContainer = document.getElementById(ACTION_IMAGE_ID)
      const navigatorMask = document.getElementById(NAVIGATOR_MASK_ID)
      if (image && navigator && imageContainer && navigatorMask) {
        navigatorMask.style.display = 'none'
        while (imageContainer.lastChild) {
          imageContainer.removeChild(imageContainer.lastChild)
        }
        Utils.currentEditor.action = undefined
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleNavigatorMaskMouseEnter = (e: MouseEvent) => {
    if (Utils.currentEditor?.action) {
      //const image = document.getElementById(Utils.currentEditor.action.imageId)
      //const navigator = document.getElementById(NAVIGATOR_ID)
      //const imageContainer = document.getElementById(ACTION_IMAGE_ID)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleNavigatorMaskMouseLeave = (e: MouseEvent) => {
    if (Utils.currentEditor?.action) {
      //const image = document.getElementById(Utils.currentEditor.action.imageId)
      //const navigator = document.getElementById(NAVIGATOR_ID)
      //const imageContainer = document.getElementById(ACTION_IMAGE_ID)
    }
  }

  const handleNavigatorMaskMouseMove = (e: MouseEvent) => {
    //console.log(`moving...`)
    if (Utils.currentEditor?.action) {
      const image = document.getElementById(Utils.currentEditor.action.imageId)
      const navigator = document.getElementById(NAVIGATOR_ID)
      const imageContainer = document.getElementById(ACTION_IMAGE_ID)
      const navigatorMask = document.getElementById(NAVIGATOR_MASK_ID)
      if (image && navigator && imageContainer && navigatorMask) {
        if (!imageContainer.hasChildNodes()) {
          //console.log(`Node is appended`)
          const cloneImage = image.cloneNode()
          //cloneImage.addEventListener('MouseMove', handleNavigatorImageMouseMove)
          imageContainer.append(cloneImage)
        }
        imageContainer.style.left = e.clientX - image.clientWidth / 2 + 'px'
        imageContainer.style.top = e.clientY + navigatorScrollTop - image.clientHeight / 2 - Utils.HEADER_HEIGHT + 'px'
      }
    }
  }

  const handleNavigatorScroll = (e: UIEvent) => {
    const scrollTop = e.currentTarget.scrollTop
    setNavigatorScallTop(scrollTop)
    const navigator = document.getElementById(NAVIGATOR_ID)
    const navigatorMask = document.getElementById(NAVIGATOR_MASK_ID)
    if (navigator && navigatorMask) {
      navigatorMask.style.height = navigator.scrollHeight + 'px'
    }
  }

  const getSVGPopoverContent = (folder: string, name: string, width: number, height: number, multicolor: boolean) => {
    return (
      <div style={{ width: '100%', display: 'table' }}>
        <div
          style={{
            display: 'table-cell',
            textAlign: 'center',
            verticalAlign: 'middle',
            borderTop: '0px solid gray',
            padding: '2px',
          }}
        >
          <img
            id={process.env.BASIC_PATH + `/${folder}/${name}.svg`}
            src={process.env.BASIC_PATH + `/${folder}/${name}.svg`}
            style={{ filter: !multicolor && Utils.currentEditor?.enableDarkTheme ? 'invert(90%)' : '' }}
          />
        </div>
      </div>
    )
  }

  const visitContainer = (container: Element, factor: number) => {
    const children = container.children()
    if (container instanceof Path) {
      //update stroke width , but exclude if it is text
      const oldStrokeWidth = container.attr('stroke-width')
      const strokeLineCap = container.attr('stroke-linecap')
      if (oldStrokeWidth && strokeLineCap !== 'round' && oldStrokeWidth !== 0.1) {
        container.attr('stroke-width', Number((factor * oldStrokeWidth).toFixed(2)))
      }
      //detect & update for text
      // let offsetX = 0
      // let offsetY = 0
      // const textFactor = 0.8
      if (strokeLineCap === 'round') {
        //May need more robust way to check if text
        const data = container.array()
        if (data.length > 0) {
          //First command must be Moveto ,we use it to detect text position
          // const pathCommand = data[0]
          // const x = pathCommand[1] as number
          // const y = pathCommand[2] as number
          // offsetX = -x * textFactor
          // offsetY = -y * textFactor
        }
        //const transform = `scale(${factor * textFactor}, ${factor * textFactor}) translate(${offsetX}, ${offsetY})`
        //container.attr('transform', transform)
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    children.forEach((element, index, array) => {
      if (element instanceof Element) {
        visitContainer(element, factor)
      }
    })
  }

  const updateSVG = async (
    imgRef: React.RefObject<HTMLImageElement>,
    id: string,
    src: string,
    width: number,
    height: number,
    iconWidth: number,
    iconheight: number,
  ) => {
    const svgContent = await RequestUtils.fetchSvgFile(src)
    // console.log(`update ${id}`)
    //console.log(`${svgContent}`)
    const img = document.getElementById(id) as HTMLImageElement
    const svg = SVG(svgContent) as Svg
    const svgWidth = width > height ? width : height
    const factor = Number((svgWidth / iconWidth).toFixed(2))
    svg.viewbox(0, 0, svgWidth, height)
    svg.width(iconWidth)
    svg.height(iconheight)
    // svg.attr('viewbox', `0 0 ${width} ${height}`)
    //console.log(`${svg}`)
    visitContainer(svg, factor)
    const iconSvg = svg.svg()
    //visitContainer(iconSvg)
    // console.log(`${iconSvg}`)
    const svgData = 'data:image/svg+xml;base64,' + btoa(iconSvg)
    if (imgRef.current && !imgRef.current.src.startsWith('data')) {
      imgRef.current.src = svgData
      // console.log(`${svgData}`)
      // svgSource.addTo(svg)
      // console.log(svgContent)
      //().fin.svg(`#${id}`)
    } else if (img && !img.src.startsWith('data')) {
      //Auto expanded icons have null imgRef right now
      img.src = svgData
    }
  }

  const generateIcons = (
    shapeTypeName: string,
    folder: string,
    shapeWidth: number,
    shapeHeight: number,
    multicolor: boolean,
    eventHandler: MouseEventHandler<HTMLElement>,
  ) => {
    const margin = POPOVER_ICON_MARGIN
    const imgRef = createRef<HTMLImageElement>()
    const iconId = `svg-icon-${folder}-${shapeTypeName}`
    //const oldImg = document.getElementById(iconId) as HTMLImageElement
    const src = process.env.BASIC_PATH + `/${folder}/${shapeTypeName}.svg`
    // const imgData = RequestUtils.fetchSvgFile(src)
    let width = ICON_WIDTH
    let height = ICON_HEIGHT
    let popoverWidth = POPOVER_WIDTH > shapeWidth + POPOVER_MARGIN * 2 ? POPOVER_WIDTH : shapeWidth + POPOVER_MARGIN * 2
    popoverWidth = popoverWidth > shapeHeight + POPOVER_MARGIN * 2 ? popoverWidth : shapeHeight + POPOVER_MARGIN * 2
    if (shapeWidth > shapeHeight) {
      height = Math.round((ICON_HEIGHT * shapeHeight) / shapeWidth)
    } else {
      width = ICON_WIDTH
    }

    return (
      <Popover
        key={folder + '/' + shapeTypeName}
        title={shapeTypeName}
        placement="right"
        content={getSVGPopoverContent(folder, shapeTypeName, shapeWidth, shapeHeight, multicolor)}
        overlayStyle={{
          left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH,
          minWidth: POPOVER_MIN_WIDTH,
          width: popoverWidth,
        }}
      >
        <Button type="text" onMouseDown={eventHandler} style={{ padding: 2, display: 'table' }}>
          <img
            ref={imgRef}
            id={iconId}
            src={src}
            width={width}
            height={height}
            style={{
              display: 'table-cell',
              filter: !multicolor && Utils.currentEditor?.enableDarkTheme ? 'invert(90%)' : '',
            }}
            draggable={false}
            onLoad={() => updateSVG(imgRef, iconId, src, shapeWidth + margin * 2, shapeHeight + margin * 2, width, height)}
          />
        </Button>
      </Popover>
    )
  }

  const shapes = ShapeTypes.map((shapeType) =>
    generateIcons(shapeType.name, 'basic-icons', shapeType.width, shapeType.height, false, () => addShape(shapeType.name, 'basic-icons')),
  )

  const line = generateIcons('Line', 'basic-icons', LINE_WIDTH, LINE_HEIGHT, false, () => addLine('Line', 'basic-icons'))

  const table = TableTypes.map((shapeType) =>
    generateIcons(shapeType.name, 'basic-icons', shapeType.width, shapeType.height, false, () => addTable(shapeType.name, 'basic-icons')),
  )

  // @ts-ignore
  const containers = ContainerTypes.map((shapeType) =>
    generateIcons(shapeType.name, 'basic-icons', shapeType.width, shapeType.height, false, () => addContainer(shapeType.name, 'basic-icons')),
  )

  // @ts-ignore
  const poolContainers = PoolCustomContainerTypes.map((shapeType) =>
    generateIcons(shapeType.name, 'basic-icons', shapeType.width, shapeType.height, false, () => addPoolContainer(shapeType.name, shapeType, 'basic-icons')),
  )

  const customShapeBasicShapes = BasicShapes.map((shapeType) =>
    generateIcons(shapeType.name, 'custom-icons/basic-shapes', shapeType.typeInfo.width, shapeType.typeInfo.height, false, () =>
      addCustomShape(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-icons/basic-shapes'),
    ),
  )

  const customShapeFlowChartShapes = FlowChartShapes.map((shapeType) =>
    generateIcons(shapeType.name, 'custom-icons/flowchart', shapeType.typeInfo.width, shapeType.typeInfo.height, false, () =>
      addCustomShape(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-icons/flowchart'),
    ),
  )

  const customShapeArrows = Arrows.map((shapeType) =>
    generateIcons(shapeType.name, 'custom-icons/arrows', shapeType.typeInfo.width, shapeType.typeInfo.height, false, () =>
      addCustomShape(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-icons/arrows'),
    ),
  )

  const umlGridShapesForClass = UMLGridShapesForClass.map((shapeType) =>
    generateIcons(shapeType.name, 'custom-icons/uml', shapeType.typeInfo.width, shapeType.typeInfo.height, false, () =>
      addCustomTable(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-icons/uml'),
    ),
  )
  const umlContainerShapesForClass = UMLContainerShapesForClass.map((shapeType) =>
    generateIcons(shapeType.name, 'custom-icons/uml', shapeType.typeInfo.width, shapeType.typeInfo.height, false, () =>
      addExtendedContainer(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-icons/uml'),
    ),
  )
  const umlBasicShapesForClass = UMLBasicShapesForClass.map((shapeType) =>
    generateIcons(shapeType.name, 'custom-icons/uml', shapeType.typeInfo.width, shapeType.typeInfo.height, false, () =>
      addExtendedShape(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-icons/uml'),
    ),
  )
  const umlConnectorsForClass = UMLConnectorsForClass.map((shapeType) =>
    generateIcons(shapeType.name, 'custom-icons/uml', shapeType.typeInfo.width, shapeType.typeInfo.height, false, () =>
      addCustomConnector(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-icons/uml'),
    ),
  )

  const umlContainerShapesForUseCase = UMLContainerShapesForUseCase.map((shapeType) =>
    generateIcons(shapeType.name, 'custom-icons/uml', shapeType.typeInfo.width, shapeType.typeInfo.height, false, () =>
      addExtendedContainer(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-icons/uml'),
    ),
  )
  const umlBasicShapesForUseCase = UMLBasicShapesForUseCase.map((shapeType) =>
    generateIcons(shapeType.name, 'custom-icons/uml', shapeType.typeInfo.width, shapeType.typeInfo.height, false, () =>
      addExtendedShape(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-icons/uml'),
    ),
  )
  const umlConnectorsForUseCase = UMLConnectorsForUseCase.map((shapeType) =>
    generateIcons(shapeType.name, 'custom-icons/uml', shapeType.typeInfo.width, shapeType.typeInfo.height, false, () =>
      addCustomConnector(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-icons/uml'),
    ),
  )

  const umlBasicShapesForActivityState = UMLBasicShapesForActivityState.map((shapeType) =>
    generateIcons(shapeType.name, 'custom-icons/uml', shapeType.typeInfo.width, shapeType.typeInfo.height, false, () =>
      addExtendedShape(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-icons/uml'),
    ),
  )
  const umlCustomShapesForActivityState = UMLCustomShapesForActivityState.map((shapeType) =>
    generateIcons(shapeType.name, 'custom-icons/uml', shapeType.typeInfo.width, shapeType.typeInfo.height, false, () =>
      addCustomShape(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-icons/uml'),
    ),
  )
  const umlConnectorsForActivityState = UMLConnectorsForActivityState.map((shapeType) =>
    generateIcons(shapeType.name, 'custom-icons/uml', shapeType.typeInfo.width, shapeType.typeInfo.height, false, () =>
      addCustomConnector(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-icons/uml'),
    ),
  )
  const umlContainerShapesForActivityState = UMLContainerShapesForActivityState.map((shapeType) =>
    generateIcons(shapeType.name, 'custom-icons/uml', shapeType.typeInfo.width, shapeType.typeInfo.height, false, () =>
      addExtendedContainer(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-icons/uml'),
    ),
  )

  const umlCustomContainersForSequence = UMLCustomContainersForSequence.map((shapeType) =>
    generateIcons(shapeType.name, 'custom-icons/uml', shapeType.typeInfo.width, shapeType.typeInfo.height, false, () =>
      addCustomContainer(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-icons/uml'),
    ),
  )
  const umlCustomShapesForSequence = UMLCustomShapesForSequence.map((shapeType) =>
    generateIcons(shapeType.name, 'custom-icons/uml', shapeType.typeInfo.width, shapeType.typeInfo.height, false, () =>
      addCustomShape(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-icons/uml'),
    ),
  )
  const umlFrameShapesForSequence = UMLFrameShapesForSequence.map((shapeType) =>
    generateIcons(shapeType.name, 'custom-icons/uml', shapeType.typeInfo.width, shapeType.typeInfo.height, false, () =>
      addFrame(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-icons/uml'),
    ),
  )
  const umlConnectorsForSequence = UMLConnectorsForSequence.map((shapeType) =>
    generateIcons(shapeType.name, 'custom-icons/uml', shapeType.typeInfo.width, shapeType.typeInfo.height, false, () =>
      addCustomConnector(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-icons/uml'),
    ),
  )

  const umlGridShapesForOther = UMLGridShapesForOther.map((shapeType) =>
    generateIcons(shapeType.name, 'custom-icons/uml', shapeType.typeInfo.width, shapeType.typeInfo.height, false, () =>
      addCustomTable(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-icons/uml'),
    ),
  )
  const umlCustomShapesForOther = UMLCustomShapesForOther.map((shapeType) =>
    generateIcons(shapeType.name, 'custom-icons/uml', shapeType.typeInfo.width, shapeType.typeInfo.height, false, () =>
      addCustomShape(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-icons/uml'),
    ),
  )

  const myShapeItems = myShapes.map((myShape) => {
    const width = myShape.width > myShape.height ? 28 : Math.round((28 * myShape.width) / myShape.height)
    const height = myShape.height > myShape.width ? 28 : Math.round((28 * myShape.height) / myShape.width)
    const imageId = myShape.id
    return (
      <Popover
        title={myShape.name}
        key={myShape.id + ':' + myShape.name}
        placement="right"
        content={getMyShapePopoverContent(myShape.id, myShape.name, myShape.image, myShape.width, myShape.height)}
        overlayStyle={{
          left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH,
          minWidth: myShape.width + 60,
          width: myShape.height + 60,
        }}
      >
        <Button
          type="text"
          onMouseDown={() => addMyShape(myShape, imageId)}
          style={{ padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', width: 32, height: 32 }}
        >
          <img src={`${myShape.icon}`} width={width} height={height} />
        </Button>
      </Popover>
    )
  })

  const erCustomShapes = ERCustomShapes.map((shapeType) =>
    generateIcons(shapeType.name, 'custom-icons/entity-relation', shapeType.typeInfo.width, shapeType.typeInfo.height, false, () =>
      addCustomShape(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-icons/entity-relation'),
    ),
  )

  const mockupCustomShapes = MockupShapes.map((shapeType) =>
    generateIcons(shapeType.name, 'custom-icons/mockup', shapeType.typeInfo.width, shapeType.typeInfo.height, shapeType.multicolor, () =>
      addCustomShape(shapeType.name, shapeType.type, shapeType.typeInfo, 'custom-icons/mockup'),
    ),
  )

  const handleModifyMyShapes = (event: MouseEvent) => {
    setMyShapesWindowVisible(!myShapesWindowVisible)
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const externalItems = () => {
    const internalPluginItems: CollapseProps['items'] = []
    let baseKey = 100
    PluginManager.plugins.forEach((plugin) => {
      baseKey++
      plugin.categories.forEach((extensionCategory) => {
        const pluginExtensions = extensionCategory.extensions.map((extension) => {
          const width = extension.config.width > extension.config.height ? 28 : Math.round((28 * extension.config.width) / extension.config.height)
          const height = extension.config.height > extension.config.width ? 28 : Math.round((28 * extension.config.height) / extension.config.width)
          const imageId = plugin.name + ':' + extension.name
          const imageSource = extension.iconType === 'image' ? extension.icon : ImageUtils.convertSVGStringToDataUrl(extension.icon)
          return (
            <Popover
              title={extension.name}
              key={imageId}
              placement="right"
              content={getMyShapePopoverContent(imageId, extension.name, imageSource, extension.config.width, extension.config.height)}
              overlayStyle={{
                left: navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH,
                minWidth: extension.config.width + 60,
                width: extension.config.height + 60,
              }}
            >
              <Button
                type="text"
                onMouseDown={() => addPluginShape(plugin, extensionCategory, extension, imageId)}
                style={{ padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', width: 32, height: 32 }}
              >
                <img src={`${imageSource}`} alt={extension.name} width={width} height={height} />
              </Button>
            </Popover>
          )
        })
        const pluginItem = {
          key: '' + baseKey,
          label: <div style={{ fontWeight: 'bolder' }}> {plugin.name} </div>,
          children: (
            <Space size={2} wrap>
              {pluginExtensions}
            </Space>
          ),
        }
        internalPluginItems.push(pluginItem)
      })
    })

    return internalPluginItems
  }

  const internalItems: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <div style={{ fontWeight: 'bolder' }}>
          {' '}
          <FormattedMessage id="workspace.navigator.panel.my-shapes" />{' '}
        </div>
      ),
      children: (
        <Space size={2} wrap>
          {myShapeItems}
        </Space>
      ),
      // @ts-ignore
      extra: <EditOutlined onClick={handleModifyMyShapes} />,
    },
    {
      key: '2',
      label: (
        <div style={{ fontWeight: 'bolder' }}>
          <FormattedMessage id="workspace.navigator.panel.general" />
        </div>
      ),
      children: (
        <Space size={2} wrap>
          {shapes}
          {line}
          {table}
          {containers}
        </Space>
      ),
    },
    {
      key: '3',
      label: (
        <div style={{ fontWeight: 'bolder' }}>
          <FormattedMessage id="workspace.navigator.panel.advanced" />
        </div>
      ),
      children: (
        <Space size={2} wrap>
          {/* {aliyunShapes}
      {awsShapes} */}
          {customShapeBasicShapes}
        </Space>
      ),
    },
    {
      key: '4',
      label: (
        <div style={{ fontWeight: 'bolder' }}>
          <FormattedMessage id="workspace.navigator.panel.arrows" />
        </div>
      ),
      children: (
        <Space size={2} wrap>
          {customShapeArrows}
        </Space>
      ),
    },
    {
      key: '5',
      label: (
        <div style={{ fontWeight: 'bolder' }}>
          <FormattedMessage id="workspace.navigator.panel.flowchart" />
        </div>
      ),
      children: (
        <Space size={2} wrap>
          {customShapeFlowChartShapes}
        </Space>
      ),
    },
    {
      key: '6',
      label: (
        <div style={{ fontWeight: 'bolder' }}>
          <FormattedMessage id="workspace.navigator.panel.pool" />
        </div>
      ),
      children: (
        <Space size={2} wrap>
          {poolContainers}
        </Space>
      ),
    },
    {
      key: '7',
      label: (
        <div style={{ fontWeight: 'bolder' }}>
          <FormattedMessage id="workspace.navigator.panel.uml-class" />
        </div>
      ),
      children: (
        <Space size={2} wrap>
          {umlGridShapesForClass}
          {umlContainerShapesForClass}
          {umlBasicShapesForClass}
          {umlConnectorsForClass}
        </Space>
      ),
    },
    {
      key: '8',
      label: (
        <div style={{ fontWeight: 'bolder' }}>
          <FormattedMessage id="workspace.navigator.panel.uml-use-case" />
        </div>
      ),
      children: (
        <Space size={2} wrap>
          {umlContainerShapesForUseCase}
          {umlBasicShapesForUseCase}
          {umlConnectorsForUseCase}
        </Space>
      ),
    },
    {
      key: '9',
      label: (
        <div style={{ fontWeight: 'bolder' }}>
          <FormattedMessage id="workspace.navigator.panel.uml-activity-state" />
        </div>
      ),
      children: (
        <Space size={2} wrap>
          {umlBasicShapesForActivityState}
          {umlCustomShapesForActivityState}
          {umlConnectorsForActivityState}
          {umlContainerShapesForActivityState}
        </Space>
      ),
    },
    {
      key: '10',
      label: (
        <div style={{ fontWeight: 'bolder' }}>
          <FormattedMessage id="workspace.navigator.panel.uml-sequence" />
        </div>
      ),
      children: (
        <Space size={2} wrap>
          {umlCustomContainersForSequence}
          {umlCustomShapesForSequence}
          {umlFrameShapesForSequence}
          {umlConnectorsForSequence}
        </Space>
      ),
    },
    {
      key: '11',
      label: (
        <div style={{ fontWeight: 'bolder' }}>
          <FormattedMessage id="workspace.navigator.panel.uml-others" />
        </div>
      ),
      children: (
        <Space size={2} wrap>
          {umlGridShapesForOther}
          {umlCustomShapesForOther}
        </Space>
      ),
    },
    {
      key: '12',
      label: (
        <div style={{ fontWeight: 'bolder' }}>
          <FormattedMessage id="workspace.navigator.panel.er" />
        </div>
      ),
      children: (
        <Space size={2} wrap>
          {erCustomShapes}
        </Space>
      ),
    },
    {
      key: '13',
      label: (
        <div style={{ fontWeight: 'bolder' }}>
          <FormattedMessage id="workspace.navigator.panel.mockup" />
        </div>
      ),
      children: (
        <Space size={2} wrap>
          {mockupCustomShapes}
        </Space>
      ),
    },
  ]

  //const mergedItems = [...internalItems, ...externalItems()]
  const mergedItems = [...internalItems]

  // @ts-ignore
  return (
    <div
      id={NAVIGATOR_ID}
      style={{
        position: 'absolute',
        top: '0px',
        bottom: '0px',
        left: '0px',
        width: navigatorWidth,
        overflow: 'auto',
        scrollbarWidth: 'thin',
        scrollbarColor: Utils.currentEditor?.enableDarkTheme ? `${scrollbarThumbColor} ${scrollbarTrackColor}` : undefined,
      }}
      // @ts-ignore
      onMouseDown={handleNavigatorMouseDown}
      // @ts-ignore
      onMouseMove={handleNavigatorMouseMove}
      // @ts-ignore
      onMouseLeave={handleNavigatorMouseLeave}
      // @ts-ignore
      onMouseUp={handleNavigatorMouseUp}
      onScroll={handleNavigatorScroll}
    >
      <div
        id={ACTION_IMAGE_ID}
        style={{ position: 'absolute', opacity: '0.5', zIndex: 9999 }}
        //onMouseMove={handleNavigatorImageMouseMove}
      />
      <div
        id={NAVIGATOR_MASK_ID}
        style={{
          position: 'absolute',
          display: 'none',
          opacity: '0',
          backgroundColor: 'red',
          width: '100%',
          height: '100%',
          zIndex: 99999,
        }}
        // @ts-ignore
        onMouseMove={handleNavigatorMaskMouseMove}
        // @ts-ignore
        onMouseEnter={handleNavigatorMaskMouseEnter}
        // @ts-ignore
        onMouseLeave={handleNavigatorMaskMouseLeave}
      />
      <Collapse items={mergedItems} defaultActiveKey={['1', '2']} onChange={onChange} size="small" />
      <MyShapesWindowPage
        visible={myShapesWindowVisible}
        onWindowCancel={handleMyShapesWindowCancel}
        onWindowOk={handleMyShapesWindowOk}
        onMyShapesChanged={handleMyShapesChanged}
      />
    </div>
  )
}

export default Navigator
