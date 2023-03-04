import React, { useEffect, useState, useRef, } from 'react'
import styles from './index.css'
import Workspace from '@/components/Workspace'
import { Button, Tabs, } from 'antd'
import { Utils, } from '../Utils'
import { Editor, } from '../../Rockie/Editor'
import { Engine, Rectangle2D, EngineUtils, Line2D, Scale, } from '../../Engine'

export default (props: any) => {
  const [ initialized, setInitialized, ] = useState<boolean>(false)
  const [ editor, setEditor, ] = useState<Editor>()
  const [ ready, setReady, ] = useState<boolean>(false)

  useEffect(() => {
    if (!initialized) {
      initialize()
    }
    const timer = setInterval(() => {
      if (ready) {
        //
      }
    }, 15)

    return () => {
      clearInterval(timer)
      editor?.stop()
    }
  })

  const initialize = async () => {
    setInitialized(true)
    await Engine.initialize()
    const newEditor = new Editor('activeEditor')
    // newEditor.root.scale = new Scale(2, 2)
    newEditor.start()
    setEditor(newEditor)
    Utils.currentEditor = newEditor
    setReady(true)
  }

  // <canvas tabIndex={0} id='activeEditor' width='1840' height='1840' style={{ outline: 'none', }}/>
  // <canvas id='activeEditor' width='1840' height='1840' />
  return (
    <div {...props}>
      <div style={{ width: '100%', height: '100%', overflow: 'scroll', }}>
        <div style={{ width: '2000px', height: '2000px', }}>
          <div style={{ width: '100%', height: Editor.SHADOW_SIZE, backgroundColor: 'red', }} />
          <div style={{ width: '100%', height: '1840px', boxSizing: 'border-box', }}>
            <div style={{ width: Editor.SHADOW_SIZE, height: '100%', float: 'left', backgroundColor: 'green', }} />
            <div id='editor-container' style={{ width: '1840px', height: '100%', float: 'left', backgroundColor: 'darkgray', }} />
            <div style={{ width: Editor.SHADOW_SIZE, height: '100%', float: 'left', backgroundColor: 'yellow', }} />
          </div>
          <div style={{ width: '100%', height: Editor.SHADOW_SIZE, backgroundColor: 'blue', }} />
        </div>
      </div>
    </div>
  )
}
