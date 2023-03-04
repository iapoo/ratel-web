import React, { useEffect, useState, } from 'react'
import styles from './index.css'
import Workspace from '@/components/Workspace'
import { Button, } from 'antd'
import { Engine, Rectangle2D, EngineUtils, Line2D, } from '../../Engine'
import { Player, } from '../../Player'
import { Editor, } from '../../Rockie/Editor'
import { Utils, } from '../Utils'
import Navigator from './../Navigator'
import PropertyEditor from './../PropertyEditor'
import Content from './../Content'
import Draggable, { DraggableData, DraggableEvent, } from 'react-draggable' // Both at the same time

export default (props: any) => {
  const [ initialized, setInitialized, ] = useState<boolean>(false)
  const [ navigatorWidth, setNavigatorWidth, ] = useState<number>(Utils.DEFAULT_NAVIGATOR_WIDTH)

  useEffect(() => {
    if (!initialized) {
      initialize()
    }
  })

  const initialize = async () => {
    setInitialized(true)
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

  return (
    <div style={{ position: 'absolute', top: `${Utils.HEADER_HEIGHT}px`, bottom: `${Utils.FOOTER_HEIGHT}px`, right: '0px', left: '0px', backgroundColor: 'yellow', }} >
      <Navigator style={{ position: 'absolute', top: '0px', bottom: '0px', left: '0px', width: `${navigatorWidth}px`, backgroundColor: 'gray', }} />
      <Draggable
        axis='x'
        handle='.handle'
        defaultPosition={{ x: 200, y: 0, }}
        // position={{ x: segmentTracePosition, y: 0, }}
        // grid={[ segmentTraceGrid, segmentTraceGrid, ]}
        scale={1}
        // bounds='parent'
        onStart={handleDragStart}
        onDrag={handleDragDrag}
        onStop={handleDragStop}>
        <div className='handle' style={{ position: 'absolute', top: '0px', bottom: '0px', left: `${navigatorWidth} + px`, width: `${Utils.DEFAULT_DIVIDER_WIDTH}px`, zIndex: 999, }} />
      </Draggable>
      <Content style={{ position: 'absolute', top: '0px', bottom: '0px', left: `${navigatorWidth + Utils.DEFAULT_DIVIDER_WIDTH}px`, right: '200px', backgroundColor: 'lightgray', }} />
      <PropertyEditor style={{ position: 'absolute', top: '0px', bottom: '0px', right: '0px', width: '200px', backgroundColor: 'gray', }} />

    </div>
  )
}
