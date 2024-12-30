import Workspace from '@/components/Workspace'
import { ShapeEntity } from '@ratel-web/editor/Items'
import { Colors } from '@ratel-web/engine'
import { Writer } from '@ratel-web/writer'
import React, { useEffect, useState } from 'react'

const BasicLayout: React.FC = () => {
  const origWindowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  const origWindowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

  const [windowWidth, setWindowWidth] = useState<number>(origWindowWidth)
  const [windowHeight, setWindowHeight] = useState<number>(origWindowHeight)
  const [initialized, setInitialized] = useState<boolean>(false)

  useEffect(() => {
    if (!initialized) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      initialize()
    }

    // 根据浏览器窗口大小来调整各子div的滚动范围
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    window.addEventListener('resize', handleResize)
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      window.removeEventListener('resize', handleResize)
    }
  })

  const initialize = async () => {
    setInitialized(true)
    //await Engine.initialize()
    // const timeout = setTimeout(() => {
    //   setupWriter()
    //   clearTimeout(timeout)
    // }, 10000)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const setupWriter = () => {
    const canvasId = 'editor-5'
    const canvas = document.createElement('canvas')
    canvas.width = 400
    canvas.height = 40000
    canvas.id = canvasId

    const editor = new Writer(canvas)
    editor.horizontalSpace = 0
    editor.verticalSpace = 0
    editor.start()
    const item = new ShapeEntity(20, 20, 100, 200, { shapeType: 'Rectangle' })
    item.fillColor = Colors.Red
    editor.contentLayer.addEditorItem(item)
    const container = document.getElementById('writer-container')
    container!.append(canvas)
    editor.activate()
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleResize = (e: UIEvent) => {
    // console.log(e)
    // console.log(content)
    const newWindowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    const newWindowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    setWindowWidth(newWindowWidth)
    setWindowHeight(newWindowHeight)
  }
  // `${windowHeight - 128}px`
  if (false) {
    console.log(`window Width =  ${windowWidth}, height = ${windowHeight}`)
  }
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ width: '100%', height: '100%' }}>
        <Workspace />
      </div>
      {/*<div style={{ position: 'absolute', left: '50px', top: '50px', width: '500px', height: '500px', backgroundColor: 'white', zIndex: 999999 }}>*/}
      {/*  <div id="writer-container" style={{ width: 500, height: 500 }}></div>*/}
      {/*</div>*/}
    </div>
  )
}

export default BasicLayout
