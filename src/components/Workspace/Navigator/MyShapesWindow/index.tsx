import React, { FC, useEffect, useState, useRef } from 'react'
import styles from './index.css'
import { Form, Input, Checkbox, Row, Col, Button, Modal, Menu, message, Alert, Space, Card, Popover, Tooltip, Dropdown, MenuProps, } from 'antd'
import { RequestUtils, Utils, } from '../../Utils'
import axios from 'axios'
import Avatar from 'antd/lib/avatar/avatar'
import { MyShape, MyShapes } from '../../Utils/RequestUtils'
import { useIntl, setLocale, getLocale, FormattedMessage, } from 'umi';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import Meta from 'antd/es/card/Meta'

interface MyShapesWindowProps {
  visible: boolean;
  onWindowCancel: () => void;
  onWindowOk: () => void
  onMyShapesChanged: () => void
}

const MyShapesWindowPage: FC<MyShapesWindowProps> = ({
  visible, onWindowCancel, onWindowOk, onMyShapesChanged, 
}) => {
  const intl = useIntl();
  const [dataLoading, setDataLoading,] = useState<boolean>(false)
  const [windowVisible, setWindowVisible,] = useState<boolean>(false)
  const [renameErrorVisible, setRenameErrorVisible,] = useState<boolean>(false)
  const [myShapes, setMyShapes, ] = useState<MyShape[]>([])
  const [renameModalVisible, setRenameModalVisible, ] = useState<boolean>(false)
  const [renameMyShapeForm,] = Form.useForm()
  const [renameErrorMessage, setRenameErrorMessage, ] = useState<string>('')

  const {confirm} =  Modal

  if (windowVisible != visible) {
    setDataLoading(false)
    setWindowVisible(visible)
  }


  useEffect(() => {
    if (!dataLoading) {
      setDataLoading(true)
      setRenameErrorVisible(false)
      const fetchData = async () => {
        const settingsData = await RequestUtils.getSettings()
        if(settingsData.status == 200 && settingsData.data.success) {
          const data = settingsData.data.data.settings
          const newMyShapes: MyShapes = data ? JSON.parse(data) : []
          if(newMyShapes) {
            setMyShapes(newMyShapes.shapes)
          } else {
            setMyShapes([])
          }
        } else {
          setMyShapes([])
        }       
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

  const handleMyShapeRename = (id: string, name: string, image: string) => {
    setRenameModalVisible(true)
    renameMyShapeForm.setFieldValue('id', id)
    renameMyShapeForm.setFieldValue('name', name)
  }

  const handleDeleteMyShapes = async (id: string, name: string, image: string) => {
    const count = myShapes.length
    for(let i = count - 1; i >= 0; i --) {
      const myShape = myShapes[i]
      if(myShape.id == id) {
        myShapes.splice(i, 1)
      }
    }
    const newMyShapes: MyShapes = {shapes: myShapes}
    const newMyShapesInfo = JSON.stringify(newMyShapes)
    const updateSettingsData = await RequestUtils.updateSettings(newMyShapesInfo)
    if(updateSettingsData.status == 200 && updateSettingsData.data.success) {
      console.log(`Succeed to update settings`)
      setRenameErrorMessage('')
      setRenameErrorVisible(false)   
      setRenameModalVisible(false)  
    } else if(updateSettingsData.status == 200) {
      setRenameErrorMessage(`${intl.formatMessage({ id: 'workspace.navigator.my-shapes.message-fail-to-delete'})}: ${updateSettingsData.data.message}`)
      setRenameErrorVisible(true)        
      console.log(`Fail to update settings`)
    } else {
      setRenameErrorMessage(intl.formatMessage({ id: 'workspace.navigator.my-shapes.message-fail-to-delete'}))
      setRenameErrorVisible(true)        
      console.log(`Fail to update settings`)
    }
    if(onMyShapesChanged) {
      onMyShapesChanged()
    }
  }

  const handleMyShapeDelete = async (id: string, name: string, image: string) => {
    confirm({
        icon: <DeleteOutlined/>,
        content: intl.formatMessage({ id: 'workspace.navigator.my-shapes.message-confirm-if-delete-shape'}),
        onOk() {
          handleDeleteMyShapes(id, name, image)
        },
        onCancel() {

        }
      })
  }

  const onRenameOk = () => {
    renameMyShapeForm.submit()
  }

  const onRenameCancel = () => {
    setRenameModalVisible(false)
  }

  const onRenameMyShapeFormFinish = async (values: any) => {
    console.log('Receive values:', values)
    const { id, name } = values
    setRenameErrorVisible(false)
    setRenameErrorMessage('')
    myShapes.forEach(myShape => {
      if(myShape.id == id) {
        myShape.name = name
      }
    })
    const newMyShapes: MyShapes = {shapes: myShapes}
    const newMyShapesInfo = JSON.stringify(newMyShapes)
    const updateSettingsData = await RequestUtils.updateSettings(newMyShapesInfo)
    if(updateSettingsData.status == 200 && updateSettingsData.data.success) {
      console.log(`Succeed to update settings`)
      setRenameErrorMessage('')
      setRenameErrorVisible(false)   
      setRenameModalVisible(false)  
    } else if(updateSettingsData.status == 200) {
      setRenameErrorMessage(`${intl.formatMessage({ id: 'workspace.navigator.my-shapes.message-fail-to-rename'})}: ${updateSettingsData.data.message}`)
      setRenameErrorVisible(true)        
      console.log(`Fail to update settings`)
    } else {
      setRenameErrorMessage(intl.formatMessage({ id: 'workspace.navigator.my-shapes.message-fail-to-rename'}))
      setRenameErrorVisible(true)        
      console.log(`Fail to update settings`)
    }
    if(onMyShapesChanged) {
      onMyShapesChanged()
    }
  }

  const myShapeItems = myShapes.map(myShape => {
    return <Tooltip title={myShape.name}>
      <Card 
          size='small' 
          title={<div style={{width: 48, fontSize: 11, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow:'ellipsis'}}>{myShape.name}</div>} 
          hoverable 
          extra={<div>
            <Tooltip title='Rename'><EditOutlined onClick={() => handleMyShapeRename(myShape.id, myShape.name, myShape.image)}/></Tooltip>
            <Tooltip title='Delete'><DeleteOutlined style={{marginLeft: 8}} onClick={() => handleMyShapeDelete(myShape.id, myShape.name, myShape.image)}/></Tooltip>
            </div>}
          >
        <img src={`${myShape.image}`} width={64} height={64} style={{display: 'table-cell'}} alt={myShape.name}/>
      </Card>
    </Tooltip>
    })

  return (
    <div>
      <Modal title={intl.formatMessage({ id: 'workspace.navigator.my-shapes.my-shapes'})} 
      centered 
          open={visible} 
          onOk={onOk}           
          onCancel={onCancel}
          maskClosable={false} 
          footer={[<Button key='submit' type='primary' onClick={onOk}><FormattedMessage id='workspace.navigator.my-shapes.close' /></Button>]}
          width={640}>
        <Space size={[10, 10]} align='start' wrap style={{width: 610, height: 400, overflow: 'auto', scrollbarWidth: 'thin'}} >
          {myShapeItems}
        </Space>
      </Modal>
      <Modal title={intl.formatMessage({ id: 'workspace.navigator.my-shapes.rename'})} 
        centered open={renameModalVisible} onOk={onRenameOk} onCancel={onRenameCancel} maskClosable={false} >
      <Form name="renameMyShapeForm" form={renameMyShapeForm} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} initialValues={{ remember: true }}
          onFinish={onRenameMyShapeFormFinish} autoComplete="off">
          <Form.Item hidden label="id" name="id">
            <Input />
          </Form.Item>
          <Form.Item label="name" name="name" rules={[{ required: true, message: intl.formatMessage({ id: 'workspace.navigator.my-shapes.name-place-holder'})}]} >
            <Input />
          </Form.Item>
            {renameErrorVisible ? <Alert message={renameErrorMessage} type="error" showIcon/> : ''}          
          </Form>
      </Modal>
    </div>
  )
}

export default MyShapesWindowPage
