import React, { FC, useEffect, useState, useRef } from 'react'
import styles from './index.css'
import { Form, Input, Checkbox, Row, Col, Button, Modal, Menu, message, Alert, Space, } from 'antd'
import { RequestUtils, Utils, } from '../../Utils'
import type { DraggableData, DraggableEvent } from 'react-draggable';
import Draggable from 'react-draggable';
import axios from 'axios'
import { useIntl, setLocale, getLocale, FormattedMessage, } from 'umi';
import { CodeFilled, CodeOutlined, LockOutlined, MailFilled, MailOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { UserInfo } from '../../Utils/RequestUtils';

interface ProfileFormWindowProps {
  visible: boolean;
  x: number;
  y: number;
  onWindowCancel: () => void;
  onWindowOk: () => void
}

const ProfileFormWindowPage: FC<ProfileFormWindowProps> = ({
  visible, x, y, onWindowCancel, onWindowOk,
}) => {
  const intl = useIntl();
  const [messageApi, contextHolder, ] = message.useMessage()
  const [dataLoading, setDataLoading,] = useState<boolean>(false)
  const [modalX, setModalX,] = useState<number>(0)
  const [modalY, setModalY,] = useState<number>(0)
  const [disabled, setDisabled, ] = useState<boolean>(true)
  const [origModalX, setOrigModalX,] = useState<number>(0)
  const [origModalY, setOrigModalY,] = useState<number>(0)
  const [windowVisible, setWindowVisible,] = useState<boolean>(false)
  const draggleRef = useRef<HTMLDivElement>(null);
  const [profileForm,] = Form.useForm()
  const [errorVisible, setErrorVisible,] = useState<boolean>(false)
  const [errorMessage, setErrorMessage, ] = useState<string>('')
  const [bounds, setBounds, ] = useState({left: 0, top: 0, bottom: 0, right: 0})
  // const [userInfo, setUserInfo, ] = useState<UserInfo>({
  //   customerName:  '',
  //   customerId: 0,
  //   nickName: ''
  // })

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
      const fetchInfoData = async () => {
        setDataLoading(true)
        const infoData = await RequestUtils.info()
        if (infoData.status == 200 && infoData.data.success) {
          setErrorVisible(false)
          // setUserInfo(infoData.data.data)
          // profileForm.setFieldsValue({...infoData.data.data})
          profileForm.setFieldValue('alias', infoData.data.data.nickName)
          profileForm.setFieldValue('email', infoData.data.data.email)
        } else if (infoData.status == 200 && !infoData.data.success) {
          setErrorVisible(false)
          setErrorMessage(infoData.data.message)
        } else {
          setErrorMessage('System error internally, please contact to administrator')
        }
      }
      fetchInfoData()
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
    profileForm.submit()
  }

  const onCancel = () => {
    if (onWindowCancel) {
      onWindowCancel()
    }
  }

  const onFinish = (values: any) => {
    console.log('Receive values:', values)
    const { alias, email } = values
    const data = {
      'nickName': alias,
      'email': email,
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Token': RequestUtils.token
      }
    }
    setErrorVisible(false)
    axios.post(`${RequestUtils.serverAddress}/update`, data, config)
      .then(response => {
        if (response.status == 200 && response.data.success) {
          messageApi.open({
            type: 'success',
            content: intl.formatMessage({ id: 'workspace.header.profile-form-window.window-success-message'}) 
          })
          console.log('Profile succeed')
          if (onWindowOk) {
            onWindowOk()
          }
        } else if (response.status == 200 && !response.data.success) {
          console.log('Profile failed')
          setErrorVisible(true)
          setErrorMessage(response.data.message)
        }
        console.log('Profile data: ', response.data)
      })
      .catch(error => {
        console.log('Profile error: ', error)
        setErrorMessage('System error internally')
      })
  }

  const sendValidationCode = ()=> {
    const form = profileForm.getFieldValue('validation')
    console.log(`${form}`)
  }

  return (
    <div>
      {contextHolder}
      <Modal
        title={
          <div style={{ width: '100%', cursor: 'move', }}
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
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            <FormattedMessage id='workspace.header.profile-form-window.window-title' />
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
            bounds={bounds}
            onStart={handleDragStart}            
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <div style={{ paddingTop: '32px', }}>
          <Form
            name='ProfileFormWindow'
            form={profileForm}
            className='profile-form'
            onFinish={onFinish}
            style={{ maxWidth: '100%', }}
          >
            <Form.Item name='alias' rules={[{required: true, message: <FormattedMessage id='workspace.header.profile-form-window.alias-message' />, },]} style={{ marginBottom: '4px', }} >
              <Input
                prefix={<UserOutlined/>}
                placeholder={intl.formatMessage({ id: 'workspace.header.profile-form-window.alias-placeholder'})}
                size='small'
                bordered={false}
                style={{ width: '100%', }}
              />
            </Form.Item>
            <div style={{ marginLeft: '40px', width: '280px', height: '1px', backgroundColor: 'lightgray', marginBottom: '12px', opacity: '0.5', }} />
            <Form.Item name='email' hasFeedback
              rules={[
                { type: 'email', message: <FormattedMessage id='workspace.header.profile-form-window.email-message' />, },
              ]} 
              style={{ marginBottom: '4px', }} >
              <Input
                prefix={<MailOutlined/>}
                placeholder={intl.formatMessage({required: true, id: 'workspace.header.profile-form-window.email-placeholder'})}
                size='small'
                bordered={false}
                style={{ width: '100%', }}
              />
            </Form.Item>
            <div style={{ marginLeft: '40px', width: '280px', height: '1px', backgroundColor: 'lightgray', marginBottom: '12px', opacity: '0.5', }} />
            <Space>
              <Button type='primary' size='middle' onClick={sendValidationCode}><FormattedMessage id='workspace.header.profile-form-window.email-validation-button-title' /></Button>
              <Form.Item name='validation' rules={[{ message: <FormattedMessage id='workspace.header.profile-form-window.email-validation-message' />, },]} style={{ marginBottom: '4px', }} >
                <Input
                  prefix={<CodeOutlined/>}
                  placeholder={intl.formatMessage({required: true, id: 'workspace.header.profile-form-window.email-validation-placeholder'})}
                  size='small'
                  bordered={false}
                />
              </Form.Item>
            </Space>
            <div style={{ marginLeft: '40px', width: '280px', height: '1px', backgroundColor: 'lightgray', marginBottom: '12px', opacity: '0.5', }} />
            {errorVisible && (<Alert message={errorMessage} type="error" closable/> )}
          </Form>
        </div>
      </Modal>
    </div>
  )
}

export default ProfileFormWindowPage
