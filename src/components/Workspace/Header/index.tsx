import React, { useEffect, useState, useRef } from 'react'
import styles from './index.css'
import Workspace from '@/components/Workspace'
import { Form, Input, Checkbox, Row, Col, Button, Modal, Menu, } from 'antd'
import type { MenuProps } from 'antd';
import { RequestUtils, Utils, } from '../Utils'
import type { DraggableData, DraggableEvent } from 'react-draggable';
import Draggable from 'react-draggable';
import { AppstoreOutlined, ExclamationCircleFilled, MailOutlined, SettingOutlined } from '@ant-design/icons'
import axios from 'axios'
import moment from 'moment'
import CryptoJs from 'crypto-js'
import Avatar from 'antd/lib/avatar/avatar'
import { setInterval } from 'timers'
import { UserInfo } from '../Utils/RequestUtils'
import LoginFormWindow from './LoginFormWindow'

const { confirm } = Modal;

const onClick: MenuProps['onClick'] = (e) => {
  alert('click');
};

const menuItems: MenuProps['items'] = [
  {
    label: 'Navigation One',
    key: 'mail',
    icon: <MailOutlined />,
  },
  {
    label: 'Navigation Two',
    key: 'app',
    icon: <AppstoreOutlined />,
    disabled: true,
  },
  {
    label: 'Navigation Three - Submenu',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
    key: 'alipay',
  },
]

export default (props: any) => {
  const [initialized, setInitialized,] = useState<boolean>(false)
  const draggleRef = useRef<HTMLDivElement>(null);
  const [online, setOnline,] = useState<boolean>(false)
  const [userInfo, setUserInfo,] = useState<UserInfo | null>(null)
  const [loginFormWindowVisible, setLoginFormWindowVisible, ] = useState<boolean>(false)

  let timer: any = null

  useEffect(() => {
    if (!initialized) {
      initialize()
    }
  })

  const initialize = () => {
    setInitialized(true)
    timer = setInterval(async () => {
      const onlineResult = await RequestUtils.isOnline()
      setOnline(onlineResult)
      setUserInfo(RequestUtils.userInfo)
    }, 2000)

  }

  const login = () => {
    setLoginFormWindowVisible(!loginFormWindowVisible)
  }

  const handleLoginFormWindowCancel = () => {
    setLoginFormWindowVisible(false)
  }
  const handleLoginFormWindowOk = () => {
    setLoginFormWindowVisible(false)
  }
  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  const onFinish = (values: any) => {
    console.log('Receive values:', values)
    const { userName, userPassword } = values
    const data = {
      'name': userName,
      'password': userPassword, //CryptoJs.SHA1(password).toString()
    }
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    axios.post(`${RequestUtils.serverAddress}/login`, data, config)
      .then(response => {
        if (response.status == 200 && response.data.success) {
          console.log('Login succeed')
          RequestUtils.token = response.data.data
          RequestUtils.userName = userName
          RequestUtils.password = userPassword
          RequestUtils.online = true
          localStorage.setItem('auth.token', response.data.data)
          RequestUtils.checkOnline()
        }
        console.log('Login data: ', response.data)
      })
      .catch(error => {
        console.log('Login error: ', error)
      })
  }

  const logout = () => {
    RequestUtils.logout()
  }


  return (
    <div style={{ position: 'absolute', top: '0px', height: `${Utils.HEADER_HEIGHT}px`, width: '100%'}}>
      <div style={{width: '100%', height: '50%', }}>
        <div style={{ width: '100%', float: 'left' }}>
          <Menu mode='horizontal' items={menuItems} onClick={onClick} />
        </div>
        <div style={{ position: 'absolute', height: '50%', width: '90px', right: '0px', display:'table'}}>
          <div style={{display: 'table-cell', verticalAlign: 'middle', }}>
            {userInfo?.customerName} {online ? <Button type='primary' onClick={logout}>退出</Button> : <Button type='primary' onClick={login}>登录</Button>}
          </div>
        </div>
      </div>
      <div style={{ width: '100%',height: '50%'  }}>
        <Menu mode='horizontal' items={menuItems} onClick={onClick} />
      </div>
      <LoginFormWindow visible={loginFormWindowVisible} x={60} y={60} onWindowCancel={handleLoginFormWindowCancel} onWindowOk={handleLoginFormWindowOk}/>
    </div>
  )
}
