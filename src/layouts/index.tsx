import { Layout, Menu, Breadcrumb, theme, } from 'antd'
import { UserOutlined, LaptopOutlined, NotificationOutlined, } from '@ant-design/icons'
import React, { useEffect, useState, } from 'react'
import Workspace from '@/components/Workspace'

const { SubMenu, } = Menu
const { Header, Content, Sider, Footer, } = Layout
const BasicLayout: React.FC = props => {
  const origWindowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  const origWindowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  const token = theme.useToken()
  const workspaceBackground = token.token.colorBgElevated

  const [windowWidth, setWindowWidth,] = useState<number>(origWindowWidth)
  const [windowHeight, setWindowHeight,] = useState<number>(origWindowHeight)
  const [content, selectContent,] = useState<any>(null)
  const [initialized, setInitialized,] = useState<boolean>(false)

  useEffect(() => {
    if (!initialized) {
      initialize()
    }

    // 根据浏览器窗口大小来调整各子div的滚动范围
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  const initialize = async () => {
    setInitialized(true)
  }

  const handleResize = (e: UIEvent) => {
    // console.log(e)
    // console.log(content)
    const newWindowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    const newWindowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    setWindowWidth(newWindowWidth)
    setWindowHeight(newWindowHeight)
  }
  // `${windowHeight - 128}px`

  return (
    <div style={{ width: '100%', height: '100%', }}>
      <Workspace />
    </div>

  )
}

export default BasicLayout
