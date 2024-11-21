import Workspace from '@/components/Workspace'
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
    // await Engine.initialize()
    //
    // const canvasId = 'editor-1'
    // const canvas = document.createElement('canvas')
    // canvas.width = 400
    // canvas.height = 400
    // canvas.id = canvasId
    //
    // const editor = new Editor(canvas)
    // editor.horizontalSpace = 0
    // editor.verticalSpace = 0
    // editor.start()
    // const item = new ShapeEntity(20, 20, 100, 200, { shapeType: 'Rectangle' })
    // item.fillColor = Colors.Red
    // editor.contentLayer.addEditorItem(item)
    // const container = document.getElementById('editor-container')
    // container!.append(canvas)
    // editor.activate()
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
  console.log(`window Width =  ${windowWidth}, height = ${windowHeight}`)
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Workspace />
      {/*<div id="editor-container" style={{ width: 500, height: 500 }}></div>*/}
    </div>
  )
}

export default BasicLayout
