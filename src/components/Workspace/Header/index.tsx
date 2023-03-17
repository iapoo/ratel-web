import React, { useEffect, useState, useRef } from 'react'
import styles from './index.css'
import Workspace from '@/components/Workspace'
import { Form, Input, Checkbox, Row, Col, Button, Modal } from 'antd'
import { RequestUtils, Utils, } from '../Utils'
import type { DraggableData, DraggableEvent } from 'react-draggable';
import Draggable from 'react-draggable';
import { ExclamationCircleFilled } from '@ant-design/icons'
import axios from 'axios'
import moment from 'moment'
import CryptoJs from 'crypto-js'
import Avatar from 'antd/lib/avatar/avatar'
import { setInterval } from 'timers'
import { UserInfo } from '../Utils/RequestUtils'

const { confirm } = Modal;

export default (props: any) => {
  const [initialized, setInitialized,] = useState<boolean>(false)
  const [modal2Open, setModal2Open] = useState(false)
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
  const draggleRef = useRef<HTMLDivElement>(null);
  const [disabled, setDisabled] = useState(false);
  const [loginForm,] = Form.useForm()
  const [online, setOnline, ] = useState<boolean>(false)
  const [ userInfo, setUserInfo, ]= useState<UserInfo | null>(null)

  let timer: any = null

  useEffect(() => {
    if (!initialized) {
      initialize()
    }
  })

  const initialize = () => {
    setInitialized(true)
    timer =  setInterval( async () => {
      const onlineResult = await RequestUtils.isOnline()
      setOnline(onlineResult)  
      setUserInfo(RequestUtils.userInfo)
    }, 2000)
    
  }

  const login = () => {
    setModal2Open(true)
    //const loginResponse = RequestUtils.login('', '')

  }

  const onOk = () => {
    loginForm.submit()
    setModal2Open(false)
  }

  const onCancel = () => {
    setModal2Open(false)
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
    <div style={{ position: 'absolute', top: '0px', height: `${Utils.HEADER_HEIGHT}px`, width: '100%', backgroundColor: 'lightgray', }}>
      {userInfo?.customerName} {online ? <Button type='primary' onClick={logout}>退出</Button> : <Button type='primary' onClick={login}>登录</Button>}
      <Modal
        title="Vertically centered modal dialog"
        centered
        visible={modal2Open}
        onOk={onOk}
        onCancel={onCancel}
        maskClosable={false}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <div style={{ paddingTop: '32px', }}>
          <Form
            name='loginForm'
            form={loginForm}
            className='login-form'
            initialValues={{ userName: 'Admin', userPassword: 'Password1', remember: true, }}
            onFinish={onFinish}
            style={{ maxWidth: '100%', }}
          >
            <Form.Item name='userName'rules={[{ message: '请输入账号名称!', },]} style={{ marginBottom: '4px', }} >
              <Input
                prefix={<Avatar size='small' src='/login/login-user.png' />}
                placeholder='请输入账号'
                size='middle'
                bordered={false}
                style={{ width: '100%', }}
              />
            </Form.Item>
            <div style={{ marginLeft: '40px', width: '280px', height: '1px', backgroundColor: 'lightgray', marginBottom: '12px', opacity: '0.5', }} />
            <Form.Item name='userPassword' rules={[{ required: false, message: '请输入账号密码!', },]} style={{ marginBottom: '4px', }}>
              <Input.Password
                prefix={<Avatar size='small' src='/login/login-password.png' />}
                type='password'
                placeholder='请输入密码'                
                size='middle'
                bordered={false}
                style={{ width: '100%', }}
              />
            </Form.Item>
            <div style={{ marginLeft: '40px', width: '280px', height: '1px', backgroundColor: 'lightgray', marginBottom: '12px', opacity: '0.5', }} />
            <Form.Item name='remember' valuePropName='checked' style={{ marginBottom: '4px', }}>
              <Checkbox style={{ float: 'right', fontSize: '14px', }}>记住密码</Checkbox>
            </Form.Item>

          </Form>
        </div>
      </Modal>
    </div>
  )
}
