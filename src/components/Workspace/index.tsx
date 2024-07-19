import { Button, Tabs, } from 'antd'
import React, { useEffect, useState, PointerEvent, useRef, } from 'react'
// import styles from './index.less'
import { Engine, Rectangle2D, EngineUtils, Line2D, } from '../Engine'
import { Player, } from '../Player'
import { Editor, } from '../Rockie/Editor'
import { ShapeAction, } from '../Rockie/Actions'
import { RequestUtils, Utils, } from './Utils'
import Header from './Header'
import Footer from './Footer'
import Body from './Body'
import Navigator from './Navigator'
import PropertyEditor from './PropertyEditor'
import Content from './Content'

export default (props: any) => {
  const [initialized, setInitialized,] = useState<boolean>(false)
  const [editor, setEditor,] = useState<Editor>()
  const [ready, setReady,] = useState<boolean>(false)
  const [currentEditor, setCurrentEditor,] = useState<Editor | undefined>(undefined)
  const [previousEditor, setPreviousEditor,] = useState<Editor | undefined>(undefined)
  const [loginCompleted, setLoginCompleted] = useState<boolean>(false)
  const [logoutCompleted, setLogoutCompleted] = useState<boolean>(false)

  useEffect(() => {
    if (!initialized) {
      initialize()
    }
    const timer = setInterval(() => {
      if (ready) {
        // editor?.render()
        // player?.render()
      }
    }, 15)

    return () => {
      // clearInterval(timer)
      editor?.stop()
    }
  })

  const initialize = async () => {
    setInitialized(true)
    // await Engine.initialize()
    // const newEditor = new Editor('api1')
    // newEditor.start()
    // setEditor(newEditor)
    setReady(true)
    const online = await RequestUtils.isOnline()
    setLoginCompleted(online)
  }

  const handleEditorChange = (oldEditor: Editor | undefined, newEditor: Editor | undefined) => {
    setPreviousEditor(oldEditor)
    setCurrentEditor(newEditor)
    if (newEditor) {
      newEditor.setup(newEditor.zoom, newEditor.origWidth, newEditor.origHeight)
    }
  }

  const handleLogin = () => {
    setLoginCompleted(true)
    setLogoutCompleted(false)
  }

  const handleLogout = () => {
    setLogoutCompleted(true)
    setLoginCompleted(false)
  }

  const handleMyShapesNotified = () => {
    setLogoutCompleted(false)
    setLoginCompleted(false)
  }

  return (
    <div style={{ width: '100%', height: '100%', }}>
      <Header previousEditor={previousEditor} currentEditor={currentEditor} onLogin={handleLogin} onLogout={handleLogout} />
      <Body onEditorChange={handleEditorChange} previousEditor={previousEditor} currentEditor={currentEditor} loginCompleted={loginCompleted} logoutCompleted={logoutCompleted} onMyShapesNotified={handleMyShapesNotified} />
      <Footer />
    </div>

  )
}
