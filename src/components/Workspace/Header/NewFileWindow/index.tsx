import React, { FC, useEffect, useState, useRef } from 'react'
import styles from './index.css'
import { Form, Input, Checkbox, Row, Col, Button, Modal, Menu, message, Alert, } from 'antd'
import { RequestUtils, Utils, } from '../../Utils'
import axios from 'axios'
import Avatar from 'antd/lib/avatar/avatar'
import { useIntl, setLocale, getLocale, FormattedMessage, } from 'umi';

interface NewFileWindowProps {
  visible: boolean;
  x: number;
  y: number;
  onWindowCancel: () => void;
  onWindowOk: () => void
}

const NewFileWindowPage: FC<NewFileWindowProps> = ({
  visible, x, y, onWindowCancel, onWindowOk,
}) => {
  const [dataLoading, setDataLoading,] = useState<boolean>(false)
  const [modalX, setModalX,] = useState<number>(0)
  const [modalY, setModalY,] = useState<number>(0)
  const [origModalX, setOrigModalX,] = useState<number>(0)
  const [origModalY, setOrigModalY,] = useState<number>(0)
  const [windowVisible, setWindowVisible,] = useState<boolean>(false)
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

  const onOk = () => {
    if(onWindowOk) {
      onWindowOk()
    }
  }

  const onCancel = () => {
    if (onWindowCancel) {
      onWindowCancel()
    }
  }

  const onFinish = (values: any) => {
    if(onWindowOk) {
      onWindowOk()
    }
  }

  return (
    <div>
      <Modal title={<FormattedMessage id='workspace.header.window.login.title' />} centered open={visible} onOk={onOk} onCancel={onCancel} maskClosable={false} >
      <FormattedMessage id='workspace.header.window.login.content' />
      </Modal>
    </div>
  )
}

export default NewFileWindowPage
