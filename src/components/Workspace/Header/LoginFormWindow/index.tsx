import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Alert, Form, Input, message, Modal } from 'antd'
import axios from 'axios'
// @ts-ignore
import CryptoJs from 'crypto-js'
import { FC, useEffect, useRef, useState } from 'react'
import type { DraggableData, DraggableEvent } from 'react-draggable'
import Draggable from 'react-draggable'
import { FormattedMessage, useIntl } from 'umi'
import { RequestUtils, SystemUtils } from '../../Utils'

interface LoginFormWindowProps {
  visible: boolean
  x: number
  y: number
  onWindowCancel: () => void
  onWindowOk: () => void
}

const LoginFormWindowPage: FC<LoginFormWindowProps> = ({ visible, x, y, onWindowCancel, onWindowOk }) => {
  const intl = useIntl()
  const [messageApi, contextHolder] = message.useMessage()
  const [dataLoading, setDataLoading] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [modalX, setModalX] = useState<number>(0)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [modalY, setModalY] = useState<number>(0)
  const [disabled, setDisabled] = useState<boolean>(true)
  const [origModalX, setOrigModalX] = useState<number>(0)
  const [origModalY, setOrigModalY] = useState<number>(0)
  const [windowVisible, setWindowVisible] = useState<boolean>(false)
  const draggleRef = useRef<HTMLDivElement>(null)
  const [loginForm] = Form.useForm()
  const [errorVisible, setErrorVisible] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 })

  if (origModalX !== x) {
    setOrigModalX(x)
    setModalX(x)
  }

  if (origModalY !== y) {
    setOrigModalY(y)
    setModalY(y)
  }

  if (windowVisible !== visible) {
    setDataLoading(false)
    setWindowVisible(visible)
  }

  useEffect(() => {
    if (!dataLoading) {
      setDataLoading(true)
      setErrorVisible(false)
      const fetchData = async () => {}
      fetchData()
    }
  })

  const handleDragStart = (e: DraggableEvent, data: DraggableData) => {
    console.log('start = ', data)
    const { clientWidth, clientHeight } = window.document.documentElement
    const targetRect = draggleRef.current?.getBoundingClientRect()
    if (!targetRect) {
      return
    }
    setBounds({
      left: -targetRect.left + data.x,
      right: clientWidth - (targetRect.right - data.x),
      top: -targetRect.top + data.y,
      bottom: clientHeight - (targetRect.bottom - data.y),
    })
  }

  const onOk = () => {
    loginForm.submit()
  }

  const onCancel = () => {
    if (onWindowCancel) {
      onWindowCancel()
    }
  }

  const checkAdminLink = () => {
    const url = document.URL
    const urlObject = SystemUtils.parseUrl(url)
    // console.log(`check admin = ${urlObject}`)
    if (urlObject?.path) {
      // @ts-ignore
      if (urlObject.path === '/admin') {
        return true
      }
    }
    return false
  }

  const checkAndLoginAsAdmin = async () => {
    const checkIsAdminLink = checkAdminLink()
    if (checkIsAdminLink) {
      const loginData = await RequestUtils.loginAsAdmin()
      if (loginData.status === 200 && loginData.data.success) {
        messageApi.open({
          type: 'success',
          content: intl.formatMessage({ id: 'workspace.header.login-form-window.login-as-admin-success' }),
        })
      } else {
        messageApi.open({
          type: 'error',
          content: intl.formatMessage({ id: 'workspace.header.login-form-window.login-as-admin-failure' }),
        })
      }
    }
  }

  const onFinish = (values: any) => {
    console.log('Receive values:', values)
    const { userName, userPassword } = values
    const data = {
      name: userName,
      password: CryptoJs.SHA512(userPassword).toString(),
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    setErrorVisible(false)
    axios
      .post(`${RequestUtils.systemServerAddress}/login`, data, config)
      .then((response) => {
        if (response.status === 200 && response.data.success) {
          messageApi.open({
            type: 'success',
            content: intl.formatMessage({ id: 'workspace.header.login-form-window.window-success-message' }),
          })
          console.log('Login succeed')
          RequestUtils.token = response.data.data
          RequestUtils.userName = userName
          RequestUtils.password = CryptoJs.SHA512(userPassword).toString()
          RequestUtils.online = true
          localStorage.setItem('auth.token', response.data.data)
          RequestUtils.checkOnline()
          checkAndLoginAsAdmin()
          if (onWindowOk) {
            onWindowOk()
          }
        } else if (response.status === 200 && !response.data.success) {
          console.log('Login failed')
          setErrorVisible(true)
          setErrorMessage(response.data.message)
        }
        console.log('Login data: ', response.data)
      })
      .catch((error) => {
        console.log('Login error: ', error)
        setErrorMessage('System error internally')
      })
  }

  return (
    <div>
      {contextHolder}
      <Modal
        title={
          <div
            style={{ width: '100%', cursor: 'move' }}
            className="drag-handler"
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false)
              }
            }}
            onMouseOut={() => {
              setDisabled(true)
            }}
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            <FormattedMessage id="workspace.header.login-form-window.window-title" />
          </div>
        }
        centered
        open={visible}
        onOk={onOk}
        onCancel={onCancel}
        maskClosable={false}
        modalRender={(modal) => (
          <Draggable
            // disabled={true}
            handle=".drag-handler"
            bounds={bounds}
            onStart={handleDragStart}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <div style={{ paddingTop: '32px' }}>
          <Form
            name="LoginFormWindow"
            form={loginForm}
            className="login-form"
            onFinish={onFinish}
            style={{ maxWidth: '100%' }}
          >
            <Form.Item
              name="userName"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="workspace.header.login-form-window.user-name-message" />,
                },
              ]}
              style={{ marginBottom: '4px' }}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder={intl.formatMessage({ id: 'workspace.header.login-form-window.user-name-placeholder' })}
                size="middle"
                bordered={false}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <div
              style={{
                marginLeft: '40px',
                width: '280px',
                height: '1px',
                backgroundColor: 'lightgray',
                marginBottom: '12px',
                opacity: '0.5',
              }}
            />
            <Form.Item
              name="userPassword"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="workspace.header.login-form-window.user-password-message" />,
                },
              ]}
              style={{ marginBottom: '4px' }}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder={intl.formatMessage({ id: 'workspace.header.login-form-window.user-password-placeholder' })}
                size="middle"
                bordered={false}
                style={{ width: '100%' }}
              />
            </Form.Item>
            {/* <div style={{ marginLeft: '40px', width: '280px', height: '1px', backgroundColor: 'lightgray', marginBottom: '12px', opacity: '0.5', }} />
            <Form.Item name='remember' valuePropName='checked' style={{ marginBottom: '4px', }}>
              <Checkbox style={{ float: 'right', fontSize: '14px', }}><FormattedMessage id='workspace.header.login-form-window.remember-account-title' /></Checkbox>
            </Form.Item> */}
            {errorVisible && <Alert message={errorMessage} type="error" closable />}
          </Form>
        </div>
      </Modal>
    </div>
  )
}

export default LoginFormWindowPage
