import React, { FC, useEffect, useState, } from 'react'
import styles from './index.css'
import { Drawer, } from 'antd'
import { Editor, } from '../../Rockie/Editor'
import { Utils, } from '../Utils'
import Navigator from './../Navigator'
import PropertyEditor from './../PropertyEditor'
import Draggable, { DraggableData, DraggableEvent, } from 'react-draggable' // Both at the same time
import { setInterval } from 'timers'
import Content from '../Content'


interface BodyProps {
  previousEditor: Editor | undefined
  currentEditor: Editor | undefined
  onEditorChange: (oldEditor: Editor | undefined, newEditor: Editor | undefined) => void
  onMyShapesNotified: () => void
  loginCompleted: boolean
  logoutCompleted: boolean
  myShapesUpdateRequired: boolean
  adRegionWidth: number
}

const Body: FC<BodyProps> = ({
  previousEditor, currentEditor, onEditorChange, onMyShapesNotified, loginCompleted, logoutCompleted, myShapesUpdateRequired, adRegionWidth
}) => {
  const [initialized, setInitialized,] = useState<boolean>(false)
  const [navigatorWidth, setNavigatorWidth,] = useState<number>(Utils.DEFAULT_NAVIGATOR_WIDTH)
  const [enablePropertyEditor, setEnablePropertyEditor] = useState<boolean>(false)
  const [myShapesUpdated, setMyShapesUpdated,] = useState<boolean>(false)
  useEffect(() => {
    if (!initialized) {
      initialize()
    }
    if (loginCompleted || logoutCompleted || myShapesUpdateRequired) {
      setMyShapesUpdated(true)
      if (onMyShapesNotified) {
        onMyShapesNotified()
      }
    }
  })

  const initialize = async () => {
    setInitialized(true)
    const timer = setInterval(async () => {
      setEnablePropertyEditor(Utils.enablePropertyEditor)
    }, 100)

    return () => {
      clearInterval(timer)
    }
  }

  const handleDragStart = (e: DraggableEvent, data: DraggableData) => {
    // console.log('start = ', data)
  }

  const handleDragDrag = (e: DraggableEvent, data: DraggableData) => {
    console.log('drag = ', data)
    // 不能太大，否则导致React无限循环???
    if (data.x < Utils.MIN_NAVIGATOR_WIDTH || data.x > Utils.MAX_NAVIGATOR_WIDTH) {
      return false
    } else {
      setNavigatorWidth(data.x)
      return
    }
  }

  const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
    // console.log('stop = ', data)
    // setNavigatorWidth(data.x)
  }

  const handleEditorChange = (oldEditor: Editor | undefined, newEditor: Editor | undefined) => {
    if (oldEditor) {
      oldEditor.checkAndEndTextEdit()
    }
    onEditorChange(oldEditor, newEditor)
  }

  const handleMyShapesUpdated = () => {
    setMyShapesUpdated(true)
  }

  const handleMyShapesLoaded = () => {
    setMyShapesUpdated(false)
  }

  // console.log(`Check myShapesUpdated = ${myShapesUpdated}`)
  return (
    <div style={{ position: 'absolute', top: `${Utils.HEADER_HEIGHT}px`, bottom: `${Utils.FOOTER_HEIGHT}px`, right: `${adRegionWidth}px`, left: '0px', }} >
      <Navigator navigatorWidth={navigatorWidth} myShapesUpdated={myShapesUpdated} onMyShapesLoaded={handleMyShapesLoaded} />
      <Draggable
        axis='x'
        handle='.handle'
        defaultPosition={{ x: navigatorWidth, y: 0, }}
        // position={{ x: segmentTracePosition, y: 0, }}
        // grid={[ segmentTraceGrid, segmentTraceGrid, ]}
        scale={1}
        // bounds='parent'
        onStart={handleDragStart}
        onDrag={handleDragDrag}
        onStop={handleDragStop}>
        <div className='handle' style={{ position: 'absolute', top: '0px', bottom: '0px', left: `${navigatorWidth} + px`, width: `${Utils.DEFAULT_DIVIDER_WIDTH}px`, cursor: 'ew-resize', zIndex: 999, }} />
      </Draggable>
      <Content onEditorChange={handleEditorChange} onMyShapesUpdated={handleMyShapesUpdated} x={`${navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH}px`} y={`${enablePropertyEditor ? '220px' : '0px'} `} />
      <Drawer placement='right' mask={false} closable={false} open={enablePropertyEditor} getContainer={false} bodyStyle={{ padding: 16 }} width={240} >
        <PropertyEditor previousEditor={previousEditor} currentEditor={currentEditor} />
      </Drawer>

    </div>
  )
}

export default Body