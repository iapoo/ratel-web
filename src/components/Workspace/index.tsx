/* eslint-disable @typescript-eslint/no-use-before-define */
import { theme } from 'antd'
import { useEffect, useState } from 'react'
// import styles from './index.less'
import { Editor } from '@ratel-web/editor/Editor'
import { DocumentThemeTypes } from '@ratel-web/editor/Theme'
import Body from './Body'
import Footer from './Footer'
import Header from './Header'
import { RequestUtils, Utils } from './Utils'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (props: any) => {
  const token = theme.useToken()
  const workspaceBackground = token.token.colorBgElevated
  const [initialized, setInitialized] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [editor, setEditor] = useState<Editor>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ready, setReady] = useState<boolean>(false)
  const [currentEditor, setCurrentEditor] = useState<Editor | undefined>(undefined)
  const [previousEditor, setPreviousEditor] = useState<Editor | undefined>(undefined)
  const [loginCompleted, setLoginCompleted] = useState<boolean>(false)
  const [logoutCompleted, setLogoutCompleted] = useState<boolean>(false)
  const [myShapesUpdateRequired, setMyShapesUpdateRequired] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [adRegionWidth, setAdRegionWidth] = useState<number>(Utils.DEFAULT_AD_REGION_WIDTH)
  const [showRuler, setShowRuler] = useState<boolean>(true)
  const [documentThemeName, setDocumentThemeName] = useState<string>(DocumentThemeTypes[0].name)

  useEffect(() => {
    if (!initialized) {
      initialize()
    }
    // const timer = setInterval(() => {
    //   if (ready) {
    //     // editor?.render()
    //     // player?.render()
    //   }
    // }, 15)

    return () => {
      // clearInterval(timer)
      // @ts-ignore
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
    setMyShapesUpdateRequired(false)
  }

  const handleMyShapesUpdated = () => {
    setMyShapesUpdateRequired(true)
  }

  const handleShowRulerChanged = () => {
    setShowRuler(!showRuler)
  }

  const handleDocumentThemeChange = (newThemeName: string) => {
    setDocumentThemeName(newThemeName)
  }

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: workspaceBackground }}>
      <div style={{ width: `calc(100% - ${adRegionWidth}px)`, height: '100%', float: 'left' }}>
        <Header
          previousEditor={previousEditor}
          currentEditor={currentEditor}
          onLogin={handleLogin}
          onLogout={handleLogout}
          onMyShapesUpdated={handleMyShapesUpdated}
          adRegionWidth={adRegionWidth}
          onShowRulerChanged={handleShowRulerChanged}
          showRuler={showRuler}
          onDocumentThemeChanged={handleDocumentThemeChange}
          documentThemeName={documentThemeName}
        />
        <Body
          onEditorChange={handleEditorChange}
          previousEditor={previousEditor}
          currentEditor={currentEditor}
          loginCompleted={loginCompleted}
          logoutCompleted={logoutCompleted}
          onMyShapesNotified={handleMyShapesNotified}
          myShapesUpdateRequired={myShapesUpdateRequired}
          adRegionWidth={adRegionWidth}
          showRuler={showRuler}
          onDocumentThemeChanged={handleDocumentThemeChange}
          documentThemeName={documentThemeName}
        />
        <Footer />
      </div>
      <div
        style={{ width: `${adRegionWidth}px`, height: '100%', float: 'right', backgroundColor: workspaceBackground }}
      ></div>
    </div>
  )
}
