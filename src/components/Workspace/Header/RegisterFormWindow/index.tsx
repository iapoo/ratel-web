import { CodeOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Alert, Button, Form, Input, message, Modal } from 'antd'
import axios from 'axios'
// @ts-ignore
import CryptoJs from 'crypto-js'
import { FC, useEffect, useRef, useState } from 'react'
import type { DraggableData, DraggableEvent } from 'react-draggable'
import Draggable from 'react-draggable'
import { FormattedMessage, useIntl } from 'umi'
import { RequestUtils } from '../../Utils'

interface RegisterFormWindowProps {
  visible: boolean
  x: number
  y: number
  onWindowCancel: () => void
  onWindowOk: () => void
}

const RegisterFormWindowPage: FC<RegisterFormWindowProps> = ({ visible, x, y, onWindowCancel, onWindowOk }) => {
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
  const [registerForm] = Form.useForm()
  const [errorVisible, setErrorVisible] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 })
  const [enableMailValidation, setEnableMailValidation] = useState<boolean>(true)
  const verificationRef = useRef<HTMLButtonElement>(null)

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
      const fetchData = async () => {
        const propertiesData = await RequestUtils.getProperties()
        console.log(propertiesData)
        if (propertiesData.status === 200 && propertiesData.data.success) {
          const properties = propertiesData.data.data
          setEnableMailValidation('true' === properties['enable-mail-validation'])
          console.log(properties)
        } else if (propertiesData.status === 200) {
          setErrorVisible(true)
          setErrorMessage(propertiesData.data.message)
        } else {
          setErrorVisible(true)
          setErrorMessage('System error happened')
        }
      }
      fetchData()
    }
  })

  const handleDragStart = (e: DraggableEvent, data: DraggableData) => {
    //console.log('start = ', data)
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
    registerForm.submit()
  }

  const onCancel = () => {
    if (onWindowCancel) {
      onWindowCancel()
    }
  }

  const onFinish = async (values: any) => {
    console.log('Receive values:', values)
    const { userName, userPassword, userPasswordConfirmation, alias, email, code } = values
    const data = {
      customerName: userName,
      password: CryptoJs.SHA512(userPassword).toString(),
      userPasswordConfirmation: CryptoJs.SHA512(userPasswordConfirmation).toString(),
      nickName: alias,
      email: email,
      code: code,
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    setErrorVisible(false)
    axios
      .post(`${RequestUtils.systemServerAddress}/register`, data, config)
      .then((response) => {
        if (response.status === 200 && response.data.success) {
          messageApi.open({
            type: 'success',
            content: intl.formatMessage({ id: 'workspace.header.register-form-window.window-success-message' }),
          })
          console.log('Register succeed')
          if (onWindowOk) {
            onWindowOk()
          }
        } else if (response.status === 200 && !response.data.success) {
          console.log('Register failed')
          setErrorVisible(true)
          setErrorMessage(response.data.message)
        }
        console.log('Register data: ', response.data)
      })
      .catch((error) => {
        console.log('Register error: ', error)
        setErrorMessage('System error internally')
      })
  }

  const sendValidationCode = async () => {
    const mail = registerForm.getFieldValue('email')
    const form = registerForm.getFieldValue('validation')
    const defaultLabel = intl.formatMessage({
      id: 'workspace.header.register-form-window.email-validation-button-title',
    })
    const waitLabel = intl.formatMessage({
      id: 'workspace.header.register-form-window.email-validation-button-title-wait',
    })
    console.log(`${form}`)
    let timerTick = 60

    if (verificationRef.current) {
      verificationRef.current.disabled = true
    }
    const sendMailResult = await RequestUtils.sendVerificationCode(mail)
    if (sendMailResult.status === 200 && sendMailResult.data.success) {
      console.log(`mail is sent successfully`)
    } else {
      setErrorMessage('System error internally, please contact to administrator')
    }
    if (verificationRef.current) {
      verificationRef.current.innerText = defaultLabel
      const timer = setInterval(() => {
        if (timerTick > 0) {
          if (verificationRef.current) {
            verificationRef.current.disabled = true
            const newLabel = waitLabel.replace(`$$$`, `${timerTick}`)
            verificationRef.current.innerText = newLabel
          }
          timerTick--
        } else {
          if (verificationRef.current) {
            verificationRef.current.disabled = false
            verificationRef.current.innerText = `${defaultLabel}`
          }
          clearInterval(timer)
        }
      }, 1000)
    }
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
            <FormattedMessage id="workspace.header.register-form-window.window-title" />
          </div>
        }
        centered
        width={500}
        open={visible}
        onOk={onOk}
        onCancel={onCancel}
        maskClosable={false}
        modalRender={(modal) => (
          <Draggable
            //disabled={disable}
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
            name="RegisterFormWindow"
            form={registerForm}
            className="register-form"
            onFinish={onFinish}
            style={{ maxWidth: '100%' }}
          >
            <Form.Item
              name="userName"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="workspace.header.register-form-window.user-name-message" />,
                },
              ]}
              style={{ marginBottom: '4px', width: '100%' }}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder={intl.formatMessage({ id: 'workspace.header.register-form-window.user-name-placeholder' })}
                size="small"
                bordered={false}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <div
              style={{
                marginLeft: '24px',
                width: '400px',
                height: '1px',
                backgroundColor: 'lightgray',
                marginBottom: '12px',
                opacity: '0.5',
              }}
            />
            <Form.Item
              name="userPassword"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="workspace.header.register-form-window.user-password-message" />,
                },
                {
                  pattern: /^(?![A-Za-z]+$)(?![A-Z\d]+$)(?![A-Z\W]+$)(?![a-z\d]+$)(?![a-z\W]+$)(?![\d\W]+$)\S{8,32}$/,
                  message: <FormattedMessage id="workspace.header.register-form-window.user-password-message" />,
                },
              ]}
              style={{ marginBottom: '4px', width: '60%' }}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder={intl.formatMessage({
                  id: 'workspace.header.register-form-window.user-password-placeholder',
                })}
                size="small"
                bordered={false}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <div
              style={{
                marginLeft: '24px',
                width: '250px',
                height: '1px',
                backgroundColor: 'lightgray',
                marginBottom: '12px',
                opacity: '0.5',
              }}
            />
            <Form.Item
              name="userPasswordConfirmation"
              dependencies={['userPassword']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="workspace.header.register-form-window.user-password-confirmation-message" />
                  ),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('userPassword') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error(
                        intl.formatMessage({
                          id: 'workspace.header.register-form-window.user-password-confirmation-placeholder',
                        }),
                      ),
                    )
                  },
                }),
              ]}
              style={{ marginBottom: '4px', width: '60%' }}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder={intl.formatMessage({
                  id: 'workspace.header.register-form-window.user-password-confirmation-placeholder',
                })}
                size="small"
                bordered={false}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <div
              style={{
                marginLeft: '24px',
                width: '250px',
                height: '1px',
                backgroundColor: 'lightgray',
                marginBottom: '12px',
                opacity: '0.5',
              }}
            />
            <Form.Item
              name="alias"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="workspace.header.register-form-window.alias-message" />,
                },
              ]}
              style={{ marginBottom: '4px', width: '60%' }}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder={intl.formatMessage({ id: 'workspace.header.register-form-window.alias-placeholder' })}
                size="small"
                bordered={false}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <div
              style={{
                marginLeft: '24px',
                width: '250px',
                height: '1px',
                backgroundColor: 'lightgray',
                marginBottom: '12px',
                opacity: '0.5',
              }}
            />
            <Form.Item
              name="email"
              hasFeedback
              rules={[
                {
                  type: 'email',
                  message: <FormattedMessage id="workspace.header.register-form-window.email-message" />,
                },
              ]}
              style={{ marginBottom: '4px', width: '60%' }}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder={intl.formatMessage({
                  id: 'workspace.header.register-form-window.email-placeholder',
                })}
                size="small"
                bordered={false}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <div
              style={{
                marginLeft: '24px',
                width: '250px',
                height: '1px',
                backgroundColor: 'lightgray',
                marginBottom: '12px',
                opacity: '0.5',
              }}
            />
            <Form.Item
              name="code"
              rules={[
                { message: <FormattedMessage id="workspace.header.register-form-window.email-validation-message" /> },
              ]}
              style={{ marginBottom: '4px', width: '100%' }}
            >
              <Input
                prefix={<CodeOutlined />}
                placeholder={intl.formatMessage({
                  id: 'workspace.header.register-form-window.email-validation-placeholder',
                })}
                size="small"
                hidden={!enableMailValidation}
                bordered={false}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <div
              style={{
                marginLeft: '24px',
                width: '400px',
                height: '1px',
                backgroundColor: 'lightgray',
                marginBottom: '12px',
                opacity: '0.5',
                display: enableMailValidation ? 'block' : 'none',
              }}
            />
            <Button
              ref={verificationRef}
              hidden={!enableMailValidation}
              type="primary"
              size="middle"
              onClick={sendValidationCode}
              style={{}}
            >
              <FormattedMessage id="workspace.header.register-form-window.email-validation-button-title" />
            </Button>
            {errorVisible && <Alert message={errorMessage} type="error" closable />}
          </Form>
        </div>
      </Modal>
    </div>
  )
}

export default RegisterFormWindowPage
