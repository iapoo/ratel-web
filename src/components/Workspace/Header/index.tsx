import React, { useEffect, useState, useRef } from 'react'
import styles from './index.css'
import Workspace from '@/components/Workspace'
import { Form, Input, Checkbox, Row, Col, Button, Modal, Menu, Space, Tooltip, Dropdown, Divider, } from 'antd'
import type { MenuProps } from 'antd';
import { RequestUtils, Utils, } from '../Utils'
import type { DraggableData, DraggableEvent } from 'react-draggable';
import Draggable from 'react-draggable';
import { AppstoreOutlined, ExclamationCircleFilled, MailOutlined, SearchOutlined, SettingOutlined, SmileOutlined } from '@ant-design/icons'
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
    label: 'File',
    key: 'File',
    children: [
      {
        label: 'New',
        key: 'New',
        icon: <AppstoreOutlined />,
      },
      {
        label: 'Open',
        key: 'Open',
      },
      {
        label: 'Save',
        key: 'Save',
      },
      {
        label: 'Save As ...',
        key: 'SaveAs',
      },
    ],
  },
  {
    label: 'Edit',
    key: 'Edit',
    children: [
      {
        label: 'New',
        key: 'New',
        icon: <AppstoreOutlined />,
      },
      {
        label: 'Open',
        key: 'Open',
      },
      {
        label: 'Save',
        key: 'Save',
      },
      {
        label: 'Save As ...',
        key: 'SaveAs',
      },
    ],
  },
  {
    label: 'View',
    key: 'View',
    children: [
      {
        label: 'New',
        key: 'New',
        icon: <AppstoreOutlined />,
      },
      {
        label: 'Open',
        key: 'Open',
      },
      {
        label: 'Save',
        key: 'Save',
      },
      {
        label: 'Save As ...',
        key: 'SaveAs',
      },
    ],
  },
  {
    label: 'Operation',
    key: 'Operation',
    children: [
      {
        label: 'New',
        key: 'New',
        icon: <AppstoreOutlined />,
      },
      {
        label: 'Open',
        key: 'Open',
      },
      {
        label: 'Save',
        key: 'Save',
      },
      {
        label: 'Save As ...',
        key: 'SaveAs',
      },
    ],
  },
  {
    label: 'Options',
    key: 'Options',
    children: [
      {
        label: 'New',
        key: 'New',
        icon: <AppstoreOutlined />,
      },
      {
        label: 'Open',
        key: 'Open',
      },
      {
        label: 'Save',
        key: 'Save',
      },
      {
        label: 'Save As ...',
        key: 'SaveAs',
      },
    ],
  },
  {
    label: 'Help',
    key: 'Help',
    children: [
      {
        label: 'New',
        key: 'New',
        icon: <AppstoreOutlined />,
      },
      {
        label: 'Open',
        key: 'Open',
      },
      {
        label: 'Save',
        key: 'Save',
      },
      {
        label: 'Save As ...',
        key: 'SaveAs',
      },
    ],
  },
]

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    ),
  },
];

export default (props: any) => {
  const [initialized, setInitialized,] = useState<boolean>(false)
  const draggleRef = useRef<HTMLDivElement>(null);
  const [online, setOnline,] = useState<boolean>(false)
  const [userInfo, setUserInfo,] = useState<UserInfo | null>(null)
  const [loginFormWindowVisible, setLoginFormWindowVisible,] = useState<boolean>(false)


  useEffect(() => {
    if (!initialized) {
      initialize()
    }
  })

  const initialize = () => {
    setInitialized(true)
    const timer = setInterval(async () => {
      const onlineResult = await RequestUtils.isOnline()
      setOnline(onlineResult)
      setUserInfo(RequestUtils.userInfo)
    }, 2000)

    return () => {
      clearInterval(timer)
    }
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

  //  <Menu mode='horizontal' items={menuItems} onClick={onClick} />

  return (
    <div style={{ position: 'absolute', top: '0px', height: `${Utils.HEADER_HEIGHT}px`, width: '100%' }}>
      <div style={{ width: '100%', height: '50%', borderBottomStyle: 'inset', borderBottomWidth: '1px' }}>
        <div style={{ width: '100%', height: '100%', float: 'left', display: 'table' }}>
          <Space direction="horizontal" style={{ display: 'table-cell', verticalAlign: 'middle' }}>
            <Space wrap>
              <Dropdown menu={{ items }}>
                <Button type='text'>File</Button>
              </Dropdown>
              <Dropdown menu={{ items }}>
                <Button type='text'>Edit</Button>
              </Dropdown>
              <Dropdown menu={{ items }}>
                <Button type='text'>View</Button>
              </Dropdown>
              <Dropdown menu={{ items }}>
                <Button type='text'>Operation</Button>
              </Dropdown>
              <Dropdown menu={{ items }}>
                <Button type='text'>Option</Button>
              </Dropdown>
              <Dropdown menu={{ items }}>
                <Button type='text'>Help</Button>
              </Dropdown>
            </Space>
          </Space>
        </div>
        <div style={{ position: 'absolute', height: '50%', width: '240px', right: '0px' }}>
          <div style={{ float: 'right', display: 'table', height: '100%', marginRight: '8px' }}>
            <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
              {online ? "Welcome " + userInfo?.customerName : ""} {online ? <Button type='primary' onClick={logout}>退出</Button> : <Button type='primary' onClick={login}>登录</Button>}
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: '100%', height: '50%', }}>
        <div style={{ float: 'left', height: '100%', display: 'table', marginLeft: '8px' }}>
          <Space direction="horizontal" style={{ display: 'table-cell', verticalAlign: 'middle' }}>
            <Space wrap>
              <Dropdown menu={{ items }} placement="bottomLeft">
                <Button>bottomLeft</Button>
              </Dropdown>
              <Tooltip title="search">
                <Button shape="circle" icon={<SearchOutlined />} />
              </Tooltip>
              <Button icon={<SearchOutlined />}>Search</Button>
              <Tooltip title="search">
                <Button type="text" shape="circle" icon={<SearchOutlined />} />
              </Tooltip>
              <Button type="text" icon={<SearchOutlined />}>
                Search
              </Button>
              <Button icon={<SearchOutlined />} href="https://www.google.com" />
            </Space>
          </Space>
        </div>
      </div>
      <LoginFormWindow visible={loginFormWindowVisible} x={60} y={60} onWindowCancel={handleLoginFormWindowCancel} onWindowOk={handleLoginFormWindowOk} />
    </div>
  )
}
