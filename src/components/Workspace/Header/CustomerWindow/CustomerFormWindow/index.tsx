import { RequestUtils } from '@/components/Workspace/Utils'
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Alert, Form, Input, message, Modal } from 'antd'
// @ts-ignore
import CryptoJs from 'crypto-js'
import { FC, useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'umi'

interface CustomerFormWindowProps {
  visible: boolean
  isUpdate: boolean
  customerId: number
  customerName: string
  email: string
  nickname: string
  onWindowCancel: () => void
  onWindowOk: () => void
}

const CustomerFormWindowPage: FC<CustomerFormWindowProps> = ({
  visible,
  isUpdate,
  customerId,
  customerName,
  email,
  nickname,
  onWindowCancel,
  onWindowOk,
}) => {
  const intl = useIntl()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [messageApi, contextHolder] = message.useMessage()
  //const [forceUpdate, setForceUpdate, ] = useState<boolean>(false)
  const [dataLoading, setDataLoading] = useState<boolean>(false)
  const [customerForm] = Form.useForm()
  const [errorVisible, setErrorVisible] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    if (!dataLoading) {
      setDataLoading(true)
    }
    if (customerId !== customerForm.getFieldValue('customerId')) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      refreshCustomer(customerId, customerName, email, nickname)
      //console.log(`customer is reset to ${customerName}`)
    }
  })

  const onOk = () => {
    customerForm.submit()
  }

  const onCancel = () => {
    if (onWindowCancel) {
      onWindowCancel()
    }
  }

  const refreshCustomer = (customerId: number, customerName: string, email: string, nickname: string) => {
    customerForm.setFieldValue('customerId', customerId)
    customerForm.setFieldValue('customerName', customerName)
    customerForm.setFieldValue('email', email)
    customerForm.setFieldValue('nickname', nickname)
    customerForm.setFieldValue('userPassword', '')
    customerForm.setFieldValue('userPasswordConfirmation', '')
  }

  const onFinish = async (values: any) => {
    console.log('Receive values:', values)
    const { customerId, customerName, email, nickname, userPassword, userPasswordConfirmation } = values
    setErrorVisible(false)
    setErrorMessage('')
    const customerPassword = CryptoJs.SHA512(userPassword).toString()
    const customerConfirmPassword = CryptoJs.SHA512(userPasswordConfirmation).toString()
    if (isUpdate) {
      let customerData = await RequestUtils.updateCustomer(
        customerId,
        customerName,
        email,
        nickname,
        customerPassword,
        customerConfirmPassword,
      )
      if (customerData.status === 200 && customerData.data.success) {
        const customer = customerData.data.data
        console.log(customer)
        if (onWindowOk) {
          onWindowOk()
        }
      } else if (customerData.status === 200) {
        setErrorVisible(true)
        setErrorMessage(customerData.data.message)
      } else {
        setErrorVisible(true)
        setErrorMessage('System error happened')
      }
    } else {
      let customerData = await RequestUtils.addCustomer(
        customerName,
        email,
        nickname,
        customerPassword,
        customerConfirmPassword,
      )
      if (customerData.status === 200 && customerData.data.success) {
        const customer = customerData.data.data
        console.log(customer)
        if (onWindowOk) {
          onWindowOk()
        }
      } else if (customerData.status === 200) {
        setErrorVisible(true)
        setErrorMessage(customerData.data.message)
      } else {
        setErrorVisible(true)
        setErrorMessage('System error happened')
      }
    }
  }

  return (
    <div>
      {contextHolder}
      <Modal
        title={<FormattedMessage id="workspace.header.customer-form-window.window-title" />}
        centered
        open={visible}
        onOk={onOk}
        onCancel={onCancel}
        maskClosable={false}
      >
        <div style={{ paddingTop: '8px' }}>
          <Form
            name="CustomerFormWindow"
            form={customerForm}
            className="customer-form"
            onFinish={onFinish}
            style={{ maxWidth: '100%' }}
            // initialValues={{customer: 'abcc', customerName: 'abc'}}
            layout="vertical"
            // labelAlign='right'
          >
            <Form.Item label="customerId" name="customerId" hidden>
              <Input />
            </Form.Item>
            <Form.Item
              name="customerName"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="workspace.header.customer-form-window.user-name-message" />,
                },
              ]}
              style={{ marginBottom: '4px', width: '100%' }}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder={intl.formatMessage({ id: 'workspace.header.customer-form-window.user-name-placeholder' })}
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
                  message: <FormattedMessage id="workspace.header.customer-form-window.user-password-message" />,
                },
                {
                  pattern: /^(?![A-Za-z]+$)(?![A-Z\d]+$)(?![A-Z\W]+$)(?![a-z\d]+$)(?![a-z\W]+$)(?![\d\W]+$)\S{8,32}$/,
                  message: <FormattedMessage id="workspace.header.customer-form-window.user-password-message" />,
                },
              ]}
              style={{ marginBottom: '4px', width: '60%' }}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder={intl.formatMessage({
                  id: 'workspace.header.customer-form-window.user-password-placeholder',
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
                    <FormattedMessage id="workspace.header.customer-form-window.user-password-confirmation-message" />
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
                          id: 'workspace.header.customer-form-window.user-password-confirmation-placeholder',
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
                  id: 'workspace.header.customer-form-window.user-password-confirmation-placeholder',
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
              name="nickname"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="workspace.header.customer-form-window.alias-message" />,
                },
              ]}
              style={{ marginBottom: '4px', width: '60%' }}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder={intl.formatMessage({ id: 'workspace.header.customer-form-window.nickname-placeholder' })}
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
                  message: <FormattedMessage id="workspace.header.customer-form-window.email-message" />,
                },
              ]}
              style={{ marginBottom: '4px', width: '60%' }}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder={intl.formatMessage({ id: 'workspace.header.customer-form-window.email-placeholder' })}
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
            {errorVisible && <Alert message={errorMessage} type="error" closable />}
          </Form>
        </div>
      </Modal>
    </div>
  )
}

export default CustomerFormWindowPage
