import React, { FC, useEffect, useState, useRef } from 'react'
import styles from './index.css'
import Workspace from '@/components/Workspace'
import { Form, Input, Checkbox, Row, Col, Button, Modal, Menu, message, Alert, } from 'antd'
import type { MenuProps } from 'antd';
import { RequestUtils, Utils, } from '../../Utils'
import type { DraggableData, DraggableEvent } from 'react-draggable';
import Draggable from 'react-draggable';
import { AppstoreOutlined, ExclamationCircleFilled, MailOutlined, SettingOutlined } from '@ant-design/icons'
import axios from 'axios'
import moment from 'moment'
import CryptoJs from 'crypto-js'
import Avatar from 'antd/lib/avatar/avatar'
import { setInterval } from 'timers'
import { UserInfo } from '../Utils/RequestUtils'

interface LoginFormWindowProps {
  visible: boolean;
  x: number;
  y: number;
  onWindowCancel: () => void;
  onWindowOk: () => void
}

const LoginFormWindowPage: FC<LoginFormWindowProps> = ({
  visible, x, y, onWindowCancel, onWindowOk,
}) => {
  const [dataLoading, setDataLoading,] = useState<boolean>(false)
  const [modalX, setModalX,] = useState<number>(0)
  const [modalY, setModalY,] = useState<number>(0)
  const [origModalX, setOrigModalX,] = useState<number>(0)
  const [origModalY, setOrigModalY,] = useState<number>(0)
  const [windowVisible, setWindowVisible,] = useState<boolean>(false)
  const draggleRef = useRef<HTMLDivElement>(null);
  const [loginForm,] = Form.useForm()
  const [errorVisible, setErrorVisible,] = useState<boolean>(false)

  if (origModalX != x) {
    setOrigModalX(x)
    setModalX(x)
  }

  if (origModalY != y) {
    setOrigModalY(y)
    setModalY(y)
  }

  if (windowVisible != visible) {
    setDataLoading(false)
    setWindowVisible(visible)
  }


  useEffect(() => {
    if (!dataLoading) {
      setDataLoading(true)
      setErrorVisible(false)
      const fetchData = async () => {

      }
      fetchData()
    }
  })

  const handleDragStart = (e: DraggableEvent, data: DraggableData) => {
    console.log('start = ', data)
  }

  const handleDragDrag = (e: DraggableEvent, data: DraggableData) => {
    // console.log('drag = ', data)
    return true
  }

  const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
    console.log('stop = ', data)
    setModalX(data.x)
    setModalY(data.y)
  }

  const onOk = () => {
    loginForm.submit()
  }

  const onCancel = () => {
    if (onWindowCancel) {
      onWindowCancel()
    }
  }

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

    setErrorVisible(false)
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
          if (onWindowOk) {
            onWindowOk()
          }
        } else if (response.status == 200 && !response.data.success) {
          console.log('Login failed')
          setErrorVisible(true)
        }
        console.log('Login data: ', response.data)
      })
      .catch(error => {
        console.log('Login error: ', error)
      })
  }

  return (
    <div>
      <Modal
        title="Login"
        centered
        open={visible}
        onOk={onOk}
        onCancel={onCancel}
        maskClosable={false}
        modalRender={(modal) => (
          <Draggable
            axis='both'
            handle='.voiceTemplateWindowHandle'
            // defaultPosition={{ x: props.modalX, y: props.modalY, }}
            position={{ x: modalX, y: modalY, }}
            // grid={[ segmentTraceGrid, segmentTraceGrid, ]}
            scale={1}
            // bounds='parent'
            onStart={handleDragStart}
            //onDrag={handleDragDrag}
            onStop={handleDragStop}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <div style={{ paddingTop: '32px', }}>
          <Form
            name='LoginFormWindow'
            form={loginForm}
            className='login-form'
            initialValues={{ userName: 'Admin', userPassword: 'Password1', remember: true, }}
            onFinish={onFinish}
            style={{ maxWidth: '100%', }}
          >
            <Form.Item name='userName' rules={[{ message: '请输入账号名称!', },]} style={{ marginBottom: '4px', }} >
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
            {errorVisible && (
              <Alert message="Alert Message Text" type="success" closable/>
            )}
          </Form>
        </div>
      </Modal>
    </div>
  )
}

export default LoginFormWindowPage
