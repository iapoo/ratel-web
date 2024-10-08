import React, { FC, useEffect, useState, useRef } from 'react'
import styles from './index.css'
import { Form, Input, Checkbox, Row, Col, Button, Modal, Menu, message, Alert, Space, Dropdown, Select, } from 'antd'
import type { DraggableData, DraggableEvent } from 'react-draggable';
import Draggable from 'react-draggable';
import axios from 'axios'
import { useIntl, setLocale, getLocale, FormattedMessage, } from 'umi';
import { CodeFilled, CodeOutlined, LockOutlined, MailFilled, MailOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { UserInfo } from '../../Utils/RequestUtils';
import { RequestUtils } from '@/components/Workspace/Utils';
import CustomerSelector from './CustomerSelector'

interface OperatorFormWindowProps {
  visible: boolean;
  isUpdate: boolean;
  operatorId: number;
  customerId: number;
  customerName: string;
  email: string;
  operatorType: number;
  onWindowCancel: () => void;
  onWindowOk: () => void
  onCustomerSelectorChanged: (customerId: number, customerName: string, email: string) => void
}

const OperatorFormWindowPage: FC<OperatorFormWindowProps> = ({
  visible, isUpdate, operatorId, customerId, customerName, email, onWindowCancel, onWindowOk, onCustomerSelectorChanged
}) => {
  const intl = useIntl();
  const [messageApi, contextHolder,] = message.useMessage()
  //const [forceUpdate, setForceUpdate, ] = useState<boolean>(false)
  const [dataLoading, setDataLoading,] = useState<boolean>(false)
  const [operatorForm,] = Form.useForm()
  const [errorVisible, setErrorVisible,] = useState<boolean>(false)
  const [errorMessage, setErrorMessage,] = useState<string>('')
  const [customerSelectorVisible, setCustomerSelectorVisible, ] = useState<boolean>(false)

  useEffect(() => {
    if(!dataLoading) {
      setDataLoading(true)
    }
    if((operatorId !== operatorForm.getFieldValue('operatorId')) || (customerId !== operatorForm.getFieldValue('customerId'))) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      refreshCustomer(operatorId, customerId, customerName, email, false)
      //console.log(`customer is reset to ${customerName}`)
  }
  })

  const onOk = () => {
    operatorForm.submit()
  }

  const onCancel = () => {
    if (onWindowCancel) {
      onWindowCancel()
    }
  }

  const handleSelectCustomoer = () => {
    setCustomerSelectorVisible(true)
  }

  const refreshCustomer = (operatorId: number, customerId: number, customerName: string, email: string, customerChanged: boolean) => {
    if(!customerChanged) {
      operatorForm.setFieldValue('operatorId', operatorId)
    }
    operatorForm.setFieldValue('customerId', customerId)
    operatorForm.setFieldValue('customerName', customerName)
    operatorForm.setFieldValue('customer', customerName ? `${customerName} / ${email}` : '')
    operatorForm.setFieldValue('email', email)
    operatorForm.setFieldValue('customerChanged', customerChanged)
  }

  const handleCustomerSelectorOk = (customerId: number, customerName: string, email: string) => {
    //refreshCustomer(0, customerId, customerName, email, true)
    setCustomerSelectorVisible(false)
    //setForceUpdate(!forceUpdate)    
    if(onCustomerSelectorChanged) {
      onCustomerSelectorChanged(customerId, customerName, email)
    }
  }

  const handleCustomerSelectorCancel = () => {
    setCustomerSelectorVisible(false)
  }

  const onFinish = (values: any) => {
    console.log('Receive values:', values)
    const { alias, email } = values
    const data = {
      'nickName': alias,
      //'email': email,  //Email can't be updated.
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Token': RequestUtils.token
      }
    }
    setErrorVisible(false)
    axios.post(`${RequestUtils.systemServerAddress}/update`, data, config)
      .then(response => {
        if (response.status === 200 && response.data.success) {
          messageApi.open({
            type: 'success',
            content: intl.formatMessage({ id: 'workspace.header.operator-form-window.window-success-message' })
          })
          console.log('Operator succeed')
          if (onWindowOk) {
            onWindowOk()
          }
        } else if (response.status === 200 && !response.data.success) {
          console.log('Operator failed')
          setErrorVisible(true)
          setErrorMessage(response.data.message)
        }
        console.log('Operator data: ', response.data)
      })
      .catch(error => {
        console.log('Operator error: ', error)
        setErrorMessage('System error internally')
      })
  }

  const operatorTypes = [
    {value: '0', label: <FormattedMessage id='workspace.header.operator-form-window.operator-type-0' />},
    {value: '1', label: <FormattedMessage id='workspace.header.operator-form-window.operator-type-1' />},
    {value: '2', label: <FormattedMessage id='workspace.header.operator-form-window.operator-type-2' />},
    {value: '3', label: <FormattedMessage id='workspace.header.operator-form-window.operator-type-3' />},
    {value: '4', label: <FormattedMessage id='workspace.header.operator-form-window.operator-type-4' />},
  ]

  //console.log(`customerName = ${customerName}`)

  return (
    <div>
      {contextHolder}
      <Modal
        title={<FormattedMessage id='workspace.header.operator-form-window.window-title' />}
        centered
        open={visible}
        onOk={onOk}
        onCancel={onCancel}
        maskClosable={false}
      >
        <div style={{ paddingTop: '8px', }}>
          <Form
            name='OperatorFormWindow'
            form={operatorForm}
            className='operator-form'
            onFinish={onFinish}
            style={{ maxWidth: '100%', }}
            initialValues={{customer: 'abcc', customerName: 'abc'}}
            layout='vertical'
            // labelAlign='right'
            >
            <Form.Item name='customer' style={{ marginBottom: '4px', }}             
                  label={<FormattedMessage id='workspace.header.operator-form-window.label-select-customer' />} 
                  rules={[{ required: true, message: <FormattedMessage id='workspace.header.operator-form-window.message-select-customer' /> },]}>
                <Form.Item name='customer'  
                    style={{ marginBottom: '4px',width: '68%', float: 'left' }} >
                  <Input
                    placeholder={intl.formatMessage({ id: 'workspace.header.operator-form-window.placeholder-select-customer' })}
                    size='small'
                    readOnly
                    bordered={false}
                    style={{ }}
                  />
                </Form.Item>
                <Button type='primary' onClick={handleSelectCustomoer} style={{width: '30%', float: 'right', }}><FormattedMessage id='workspace.header.operator-form-window.button-select-customer' /></Button>
            </Form.Item>
            <Form.Item name='operatorType' 
                label={<FormattedMessage id='workspace.header.operator-form-window.message-operator-type' />}
                hasFeedback
                rules={[
                  { required: true, message: <FormattedMessage id='workspace.header.operator-form-window.message-operator-type' />, },
                ]}
                style={{ marginBottom: '4px', }} >
              <Select defaultValue='3' style={{width: '45%'}} options={operatorTypes}/>                
            </Form.Item>
            {errorVisible && (<Alert message={errorMessage} type="error" closable />)}
          </Form>
        </div>
        <CustomerSelector visible={customerSelectorVisible} onWindowOk={handleCustomerSelectorOk} onWindowCancel={handleCustomerSelectorCancel}/>
      </Modal>
    </div>
  )
}

export default OperatorFormWindowPage
