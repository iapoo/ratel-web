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
import TeamSelector from './TeamSelector'
import CryptoJs from 'crypto-js'

interface CustomerFormWindowProps {
  visible: boolean;
  documentId: number;
  onWindowCancel: () => void;
  onWindowOk: (customerId: number, customerName: string) => void
}

const CustomerFormWindowPage: FC<CustomerFormWindowProps> = ({
  visible, documentId,  onWindowCancel, onWindowOk
}) => {
  const intl = useIntl();
  const [messageApi, contextHolder,] = message.useMessage()
  //const [forceUpdate, setForceUpdate, ] = useState<boolean>(false)
  const [dataLoading, setDataLoading,] = useState<boolean>(false)
  const [teamForm,] = Form.useForm()
  const [errorVisible, setErrorVisible,] = useState<boolean>(false)
  const [errorMessage, setErrorMessage,] = useState<string>('')

  useEffect(() => {
    if(!dataLoading) {
      setDataLoading(true)
    }
  })

  const onOk = () => {
    teamForm.submit()
  }

  const onCancel = () => {
    if (onWindowCancel) {
      onWindowCancel()
    }
  }

  const onFinish = async (values: any) => {
    console.log('Receive values:', values)
    const { customerId, customerName, } = values
    setErrorVisible(false)
    setErrorMessage('')
    let teamData = await RequestUtils.addDocumentAccess(documentId, customerName)
    if (teamData.status === 200 && teamData.data.success) {
      const team = teamData.data.data
      console.log(team)
      messageApi.open({
        type: 'success',
        content: intl.formatMessage({ id: 'workspace.header.share-window.customer-form-window.window-success-message' })
      })
      if (onWindowOk) {
        onWindowOk(customerId, customerName)
      }
    } else if(teamData.status === 200){
      setErrorVisible(true)
      setErrorMessage(teamData.data.message)
    } else {
      setErrorVisible(true)
      setErrorMessage('System error happened')
    }
}

  return (
    <div>
      {contextHolder}
      <Modal
        title={<FormattedMessage id='workspace.header.share-window.customer-form-window.window-title' />}
        centered
        open={visible}
        onOk={onOk}
        onCancel={onCancel}
        maskClosable={false}
      >
        <div style={{ paddingTop: '8px', }}>
          <Form
            name='CustomerFormWindow'
            form={teamForm}
            className='team-member'
            onFinish={onFinish}
            style={{ maxWidth: '100%', }}
            layout='vertical'
            // labelAlign='right'
            >
          <Form.Item label='teamId' name='teamId' hidden>
            <Input />
          </Form.Item>
          <Form.Item label='customerId' name='customerId' hidden>
            <Input />
          </Form.Item>
          <Form.Item name='customerName' label={intl.formatMessage({ id: 'workspace.header.share-window.customer-form-window.customer-name' })} rules={[{ required: true, message: <FormattedMessage id='workspace.header.team-member-window.team-name-message' />, },]} style={{ marginBottom: '4px', width: '100%', }} >
              <Input
                //prefix={false}
                placeholder={intl.formatMessage({ id: 'workspace.header.share-window.customer-form-window.customer-name-placeholder' })}
                size='small'
                style={{ width: '100%', }}
              />
            </Form.Item>

            {errorVisible && (<Alert message={errorMessage} type="error" closable />)}
          </Form>
        </div>
      </Modal>
    </div>
  )
}

export default CustomerFormWindowPage
