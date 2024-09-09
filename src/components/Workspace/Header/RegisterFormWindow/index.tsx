import React, { FC, useEffect, useState, useRef } from 'react'
import styles from './index.css'
import { Form, Input, Checkbox, Row, Col, Button, Modal, Menu, message, Alert, Space, } from 'antd'
import { RequestUtils, Utils, } from '../../Utils'
import type { DraggableData, DraggableEvent } from 'react-draggable';
import Draggable from 'react-draggable';
import axios from 'axios'
import CryptoJs from 'crypto-js'
import { useIntl, setLocale, getLocale, FormattedMessage, } from 'umi';
import { CodeFilled, CodeOutlined, LockOutlined, MailFilled, MailOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';

interface RegisterFormWindowProps {
  visible: boolean;
  x: number;
  y: number;
  onWindowCancel: () => void;
  onWindowOk: () => void
}

const RegisterFormWindowPage: FC<RegisterFormWindowProps> = ({
  visible, x, y, onWindowCancel, onWindowOk,
}) => {
  const intl = useIntl();
  const [messageApi, contextHolder,] = message.useMessage()
  const [dataLoading, setDataLoading,] = useState<boolean>(false)
  const [modalX, setModalX,] = useState<number>(0)
  const [modalY, setModalY,] = useState<number>(0)
  const [disabled, setDisabled,] = useState<boolean>(true)
  const [origModalX, setOrigModalX,] = useState<number>(0)
  const [origModalY, setOrigModalY,] = useState<number>(0)
  const [windowVisible, setWindowVisible,] = useState<boolean>(false)
  const draggleRef = useRef<HTMLDivElement>(null);
  const [registerForm,] = Form.useForm()
  const [errorVisible, setErrorVisible,] = useState<boolean>(false)
  const [errorMessage, setErrorMessage,] = useState<string>('')
  const [bounds, setBounds,] = useState({ left: 0, top: 0, bottom: 0, right: 0 })

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
    //console.log('start = ', data)
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + data.x,
      right: clientWidth - (targetRect.right - data.x),
      top: -targetRect.top + data.y,
      bottom: clientHeight - (targetRect.bottom - data.y),
    });
  }

  const onOk = () => {
    registerForm.submit()
  }

  const onCancel = () => {
    if (onWindowCancel) {
      onWindowCancel()
    }
  }

  const onFinish = (values: any) => {
    console.log('Receive values:', values)
    const { userName, userPassword, userPasswordConfirmation, alias, email } = values
    const data = {
      'customerName': userName,
      'password': CryptoJs.SHA512(userPassword).toString(),
      'userPasswordConfirmation': CryptoJs.SHA512(userPasswordConfirmation).toString(),
      'nickName': alias,
      'email': email,
    }
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    setErrorVisible(false)
    axios.post(`${RequestUtils.systemServerAddress}/register`, data, config)
      .then(response => {
        if (response.status == 200 && response.data.success) {
          messageApi.open({
            type: 'success',
            content: intl.formatMessage({ id: 'workspace.header.register-form-window.window-success-message' })
          })
          console.log('Register succeed')
          if (onWindowOk) {
            onWindowOk()
          }
        } else if (response.status == 200 && !response.data.success) {
          console.log('Register failed')
          setErrorVisible(true)
          setErrorMessage(response.data.message)
        }
        console.log('Register data: ', response.data)
      })
      .catch(error => {
        console.log('Register error: ', error)
        setErrorMessage('System error internally')
      })
  }

  const sendValidationCode = () => {
    const form = registerForm.getFieldValue('validation')
    console.log(`${form}`)
  }

  return (
    <div>
      {contextHolder}
      <Modal
        title={
          <div style={{ width: '100%', cursor: 'move', }}
            className='drag-handler'
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => { }}
            onBlur={() => { }}
          // end
          >
            <FormattedMessage id='workspace.header.register-form-window.window-title' />
          </div>
        }
        centered
        open={visible}
        onOk={onOk}
        onCancel={onCancel}
        maskClosable={false}
        modalRender={(modal) => (
          <Draggable
            //disabled={disable}
            handle='.drag-handler'
            bounds={bounds}
            onStart={handleDragStart}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <div style={{ paddingTop: '32px', }}>
          <Form
            name='RegisterFormWindow'
            form={registerForm}
            className='register-form'
            onFinish={onFinish}
            style={{ maxWidth: '100%', }}
          >
            <Form.Item name='userName' rules={[{ required: true, message: <FormattedMessage id='workspace.header.register-form-window.user-name-message' />, },]} style={{ marginBottom: '4px', }} >
              <Input
                prefix={<UserOutlined />}
                placeholder={intl.formatMessage({ id: 'workspace.header.register-form-window.user-name-placeholder' })}
                size='small'
                bordered={false}
                style={{ width: '100%', }}
              />
            </Form.Item>
            <div style={{ marginLeft: '40px', width: '280px', height: '1px', backgroundColor: 'lightgray', marginBottom: '12px', opacity: '0.5', }} />
            <Form.Item name='userPassword'
              hasFeedback
              rules={[
                { required: true, message: <FormattedMessage id='workspace.header.register-form-window.user-password-message' />, },
                { pattern: /^(?![A-Za-z]+$)(?![A-Z\d]+$)(?![A-Z\W]+$)(?![a-z\d]+$)(?![a-z\W]+$)(?![\d\W]+$)\S{8,32}$/, message: <FormattedMessage id='workspace.header.register-form-window.user-password-message' />, },
              ]}
              style={{ marginBottom: '4px', }}>
              <Input.Password
                prefix={<LockOutlined />}
                type='password'
                placeholder={intl.formatMessage({ id: 'workspace.header.register-form-window.user-password-placeholder' })}
                size='small'
                bordered={false}
                style={{ width: '100%', }}
              />
            </Form.Item>
            <div style={{ marginLeft: '40px', width: '280px', height: '1px', backgroundColor: 'lightgray', marginBottom: '12px', opacity: '0.5', }} />
            <Form.Item name='userPasswordConfirmation'
              dependencies={['userPassword']} hasFeedback
              rules={[
                { required: true, message: <FormattedMessage id='workspace.header.register-form-window.user-password-confirmation-message' />, },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('userPassword') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error(intl.formatMessage({ id: 'workspace.header.register-form-window.user-password-confirmation-placeholder' })))
                  }
                })
              ]}
              style={{ marginBottom: '4px', }}>
              <Input.Password
                prefix={<LockOutlined />}
                type='password'
                placeholder={intl.formatMessage({ id: 'workspace.header.register-form-window.user-password-confirmation-placeholder' })}
                size='small'
                bordered={false}
                style={{ width: '100%', }}
              />
            </Form.Item>
            <div style={{ marginLeft: '40px', width: '280px', height: '1px', backgroundColor: 'lightgray', marginBottom: '12px', opacity: '0.5', }} />
            <Form.Item name='alias' rules={[{ required: true, message: <FormattedMessage id='workspace.header.register-form-window.alias-message' />, },]} style={{ marginBottom: '4px', }} >
              <Input
                prefix={<UserOutlined />}
                placeholder={intl.formatMessage({ id: 'workspace.header.register-form-window.alias-placeholder' })}
                size='small'
                bordered={false}
                style={{ width: '100%', }}
              />
            </Form.Item>
            <div style={{ marginLeft: '40px', width: '280px', height: '1px', backgroundColor: 'lightgray', marginBottom: '12px', opacity: '0.5', }} />
            <Form.Item name='email' hasFeedback
              rules={[
                { type: 'email', message: <FormattedMessage id='workspace.header.register-form-window.email-message' />, },
              ]}
              style={{ marginBottom: '4px', }} >
              <Input
                prefix={<MailOutlined />}
                placeholder={intl.formatMessage({ required: true, id: 'workspace.header.register-form-window.email-placeholder' })}
                size='small'
                bordered={false}
                style={{ width: '100%', }}
              />
            </Form.Item>
            {/* <div style={{ marginLeft: '40px', width: '280px', height: '1px', backgroundColor: 'lightgray', marginBottom: '12px', opacity: '0.5', }} />
            <Space>
              <Button type='primary' size='middle' onClick={sendValidationCode}><FormattedMessage id='workspace.header.register-form-window.email-validation-button-title' /></Button>
              <Form.Item name='validation' rules={[{ message: <FormattedMessage id='workspace.header.register-form-window.email-validation-message' />, },]} style={{ marginBottom: '4px', }} >
                <Input
                  prefix={<CodeOutlined/>}
                  placeholder={intl.formatMessage({required: true, id: 'workspace.header.register-form-window.email-validation-placeholder'})}
                  size='small'
                  bordered={false}
                />
              </Form.Item>
            </Space> */}
            <div style={{ marginLeft: '40px', width: '280px', height: '1px', backgroundColor: 'lightgray', marginBottom: '12px', opacity: '0.5', }} />
            {errorVisible && (<Alert message={errorMessage} type="error" closable />)}
          </Form>
        </div>
      </Modal>
    </div>
  )
}

export default RegisterFormWindowPage
