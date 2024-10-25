import React, { FC, useEffect, useState, useRef } from 'react'
import styles from './index.css'
import { Form, Input, Checkbox, Row, Col, Button, Modal, Menu, message, Alert, Space, Descriptions, } from 'antd'
import { RequestUtils, Utils, } from '../../Utils'
import type { DraggableData, DraggableEvent } from 'react-draggable';
import Draggable from 'react-draggable';
import axios from 'axios'
import { useIntl, setLocale, getLocale, FormattedMessage, } from 'umi';
import { CodeFilled, CodeOutlined, LockOutlined, MailFilled, MailOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { UserInfo } from '../../Utils/RequestUtils';

interface AboutWindowProps {
  visible: boolean;
  x: number;
  y: number;
  onWindowCancel: () => void;
  onWindowOk: () => void
}

const AboutWindowPage: FC<AboutWindowProps> = ({
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
  const [profileForm,] = Form.useForm()
  const [errorVisible, setErrorVisible,] = useState<boolean>(false)
  const [errorMessage, setErrorMessage,] = useState<string>('')
  const [bounds, setBounds,] = useState({ left: 0, top: 0, bottom: 0, right: 0 })
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
    if (onWindowOk) {
      onWindowOk()
    }
  }

  const onCancel = () => {
    if (onWindowCancel) {
      onWindowCancel()
    }
  }

  const aboutItems = [
    {
      key: '1',
      label: <FormattedMessage id='workspace.header.about-window.home-page' />,
      children: <a href='https://www.ivipa.com' target='blank' >https://www.ivipa.com</a>,
    },
    {
      key: '2',
      label: <FormattedMessage id='workspace.header.about-window.content-version' />,
      children: process.env.PRODUCTION_VERSION,
    },
  ]


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
            <FormattedMessage id='workspace.header.about-window.window-title' />
          </div>
        }
        centered
        open={visible}
        onOk={onOk}
        onCancel={onCancel}
        footer={[<Button type='primary' onClick={onOk}><FormattedMessage id='workspace.header.about-window.window-close' /></Button>]}
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
          <div style={{ float: 'left', width: '20%' }}>
            <img src={process.env.BASIC_PATH + '/favicon.png'} />
          </div>
          <div style={{ float: 'left', width: '80%', height: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
            <Descriptions bordered={false} items={aboutItems} column={1} labelStyle={{ width: 120 }} />

          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AboutWindowPage