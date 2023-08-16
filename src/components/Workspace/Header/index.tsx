import React, { useEffect, useState, useRef } from 'react'
import styles from './index.css'
import Workspace from '@/components/Workspace'
import { Form, Input, Checkbox, Row, Col, Button, Modal, Menu, Space, Tooltip, Dropdown, Divider, } from 'antd'
import type { MenuProps } from 'antd';
import { RequestUtils, Utils, } from '../Utils'
import type { DraggableData, DraggableEvent } from 'react-draggable';
import axios from 'axios'
import { setInterval } from 'timers'
import { UserInfo } from '../Utils/RequestUtils'
import LoginFormWindow from './LoginFormWindow'
import NewFileWindow from './NewFileWindow';
import { DownloadOutlined, FileAddOutlined, FileTextOutlined, FolderOpenOutlined, FormOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons';
import OpenFileWindow from './OpenFileWindow';
import SaveFileWindow from './SaveFileWindow';
import { StorageService } from '../Storage';

const { confirm } = Modal;

export default (props: any) => {
  const [initialized, setInitialized,] = useState<boolean>(false)
  const draggleRef = useRef<HTMLDivElement>(null);
  const [online, setOnline,] = useState<boolean>(false)
  const [userInfo, setUserInfo,] = useState<UserInfo | null>(null)
  const [loginFormWindowVisible, setLoginFormWindowVisible,] = useState<boolean>(false)
  const [newFileWindowVisible, setNewFileWindowVisible,] = useState<boolean>(false)
  const [openFileWindowVisible, setOpenFileWindowVisible,] = useState<boolean>(false)
  const [saveFileWindowVisible, setSaveFileWindowVisible,] = useState<boolean>(false)
  const [selectedDocumentName, setSelectedDocumentName,] = useState<string>('Untitled')

  useEffect(() => {
    if (!initialized) {
      initialize()
    }
  })

  const initialize = () => {
    setInitialized(true)
    const timer = setInterval(async () => {
      const onlineResult = await RequestUtils.isOnline()
      setOnline(onlineResult)
      setUserInfo(RequestUtils.userInfo)
    }, 2000)

    return () => {
      clearInterval(timer)
    }
  }

  const login = () => {
    setLoginFormWindowVisible(!loginFormWindowVisible)
  }

  const handleLoginFormWindowCancel = () => {
    setLoginFormWindowVisible(false)
  }
  const handleLoginFormWindowOk = () => {
    setLoginFormWindowVisible(false)
  }

  const handleNewFileWindowCancel = () => {
    setNewFileWindowVisible(false)
  }
  const handleNewFileWindowOk = () => {
    setNewFileWindowVisible(false)
  }

  const handleOpenFileWindowCancel = () => {
    setOpenFileWindowVisible(false)
  }
  const handleOpenFileWindowOk = (documentId: number) => {
    const fetchDocumentData = async() => {
      const documentData = await RequestUtils.loadDocument(documentId)
      if(documentData.data?.success) {
        console.log(`Load document successfully: documentId = ${documentId}`)        
        let content = documentData.data.data.content.content
        const storage = new StorageService()
        storage.editors = Utils.editors
        storage.loadDocument(content)
        Utils.storageData = storage.storageData
        if (Utils.loadData) {
          Utils.loadData()
        }
      } else {
        console.log(`Load document failed: documentId = ${documentId}`)
      }
      setOpenFileWindowVisible(false)
    }
    fetchDocumentData()
  }


  const handleSaveFileWindowCancel = () => {
    setSaveFileWindowVisible(false)
  }
  const handleSaveFileWindowOk = () => {
    setSaveFileWindowVisible(false)
  }

  const logout = () => {
    RequestUtils.logout()
  }

  const handleUpdateDocumentName = (e: any ) => {
    if(e.target.value) {
      setSelectedDocumentName(e.target.value)
    }
  }

  const handleFileNew = () => {
    if(online) {
      setNewFileWindowVisible(!newFileWindowVisible)
    } else {
      login()
    }
  }


  const handleFileOpen = () => {
    if(online) {
      setOpenFileWindowVisible(!openFileWindowVisible)
    } else {
      login()
    }
  }

  const handleFileSave = () => {
    if(online) {
      setSaveFileWindowVisible(!saveFileWindowVisible)
    } else {
      login()
    }
  }

  const fileItems: MenuProps['items'] = [
    {
      key: 'New',
      label: 'New',
      icon: <FileAddOutlined/>,
      onClick: handleFileNew
    },
    {
      key: 'OpenFrom',
      label: 'OpenFrom',
      disabled: true,
      icon: <FolderOpenOutlined/>,
    },
    {
      key: 'Open',
      label: 'Open',
      icon: <FolderOpenOutlined/>,
      onClick: handleFileOpen
    },
    {
      key: 'Save',
      label: 'Save',
      icon: <SaveOutlined/>,
      onClick: handleFileSave
    },
    {
      key: 'Export',
      label: 'Export',
      icon: <DownloadOutlined/>
    },
  ];
  
  const editItems: MenuProps['items'] = [
    {
      key: 'New',
      label: 'New',
    },
    {
      key: 'OpenFrom',
      label: 'OpenFrom',
    },
    {
      key: 'Open',
      label: 'Open',
    },
    {
      key: 'Save',
      label: 'Save',
    },
    {
      key: 'SaveAs',
      label: 'SaveAs',
    },
    {
      key: 'Export',
      label: 'Export',
    },
  ];
  
  const viewItems: MenuProps['items'] = [
    {
      key: 'New',
      label: 'New',
    },
    {
      key: 'OpenFrom',
      label: 'OpenFrom',
    },
    {
      key: 'Open',
      label: 'Open',
    },
    {
      key: 'Save',
      label: 'Save',
    },
    {
      key: 'SaveAs',
      label: 'SaveAs',
    },
    {
      key: 'Export',
      label: 'Export',
    },
  ];
  
  
  const operationItems: MenuProps['items'] = [
    {
      key: 'New',
      label: 'New',
    },
    {
      key: 'OpenFrom',
      label: 'OpenFrom',
    },
    {
      key: 'Open',
      label: 'Open',
    },
    {
      key: 'Save',
      label: 'Save',
    },
    {
      key: 'SaveAs',
      label: 'SaveAs',
    },
    {
      key: 'Export',
      label: 'Export',
    },
  ];
    
  const optionItems: MenuProps['items'] = [
    {
      key: 'New',
      label: 'New',
    },
    {
      key: 'OpenFrom',
      label: 'OpenFrom',
    },
    {
      key: 'Open',
      label: 'Open',
    },
    {
      key: 'Save',
      label: 'Save',
    },
    {
      key: 'SaveAs',
      label: 'SaveAs',
    },
    {
      key: 'Export',
      label: 'Export',
    },
  ];  
  
  const helpItems: MenuProps['items'] = [
    {
      key: 'New',
      label: 'New',
    },
    {
      key: 'OpenFrom',
      label: 'OpenFrom',
    },
    {
      key: 'Open',
      label: 'Open',
    },
    {
      key: 'Save',
      label: 'Save',
    },
    {
      key: 'SaveAs',
      label: 'SaveAs',
    },
    {
      key: 'Export',
      label: 'Export',
    },
  ];
  
  return (
    <div style={{ position: 'absolute', top: '0px', height: `${Utils.HEADER_HEIGHT}px`, width: '100%' }}>
      <div style={{ width: '100%', height: '50%', borderBottomStyle: 'inset', borderBottomWidth: '1px' }}>
        <div style={{ width: '100%', height: '100%', float: 'left', display: 'table' }}>
          <Space direction="horizontal" style={{ display: 'table-cell', verticalAlign: 'middle' }}>
            <Space wrap>
              <Dropdown menu={{ items: fileItems }}>
                <Button type='text' size='small'>File</Button>
              </Dropdown>
              <Dropdown menu={{ items: editItems }}>
                <Button type='text' size='small'>Edit</Button>
              </Dropdown>
              <Dropdown menu={{ items: viewItems }}>
                <Button type='text' size='small'>View</Button>
              </Dropdown>
              <Dropdown menu={{ items: operationItems }}>
                <Button type='text' size='small'>Operation</Button>
              </Dropdown>
              <Dropdown menu={{ items: optionItems }}>
                <Button type='text' size='small'>Option</Button>
              </Dropdown>
              <Dropdown menu={{ items: helpItems }}>
                <Button type='text' size='small'>Help</Button>
              </Dropdown>   
              <FileTextOutlined style={{marginLeft: '24px'}}/>
              <Input placeholder='Basic usage' type='text' value={selectedDocumentName} bordered={false} style={{paddingLeft: '0px'}} onChange={handleUpdateDocumentName} />
            </Space>
          </Space>
        </div>
        <div style={{ position: 'absolute', height: '50%', width: '240px', right: '0px' }}>
          <div style={{ float: 'right', display: 'table', height: '100%', marginRight: '8px' }}>
            <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
              {online ? "Welcome " + userInfo?.customerName : ""} {online ? <Button type='primary' onClick={logout}>退出</Button> : <Button type='primary' onClick={login}>登录</Button>}
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: '100%', height: '50%', }}>
        <div style={{ float: 'left', height: '100%', display: 'table', marginLeft: '8px' }}>
          <Space direction="horizontal" style={{ display: 'table-cell', verticalAlign: 'middle' }}>
            <Space wrap>
              <Tooltip title="search">
                <Button shape="circle" type="text"  size='small' icon={<SearchOutlined />} />
              </Tooltip>
              <Button icon={<SearchOutlined />} type="text" >Search</Button>
              <Tooltip title="search">
                <Button type="text" size='small' shape="circle" icon={<SearchOutlined />} />
              </Tooltip>
              <Button type="text" size='small' icon={<SearchOutlined />}>
                Search
              </Button>
              <Button type="text" icon={<SearchOutlined />} href="https://www.google.com" />
            </Space>
          </Space>
        </div>
      </div>
      <LoginFormWindow visible={loginFormWindowVisible} x={60} y={60} onWindowCancel={handleLoginFormWindowCancel} onWindowOk={handleLoginFormWindowOk} />
      <NewFileWindow visible={newFileWindowVisible} x={60} y={60} onWindowCancel={handleNewFileWindowCancel} onWindowOk={handleNewFileWindowOk} />
      <OpenFileWindow visible={openFileWindowVisible} x={60} y={60} onWindowCancel={handleOpenFileWindowCancel} onWindowOk={handleOpenFileWindowOk} />
      <SaveFileWindow visible={saveFileWindowVisible} x={60} y={60} documentName={selectedDocumentName} onWindowCancel={handleSaveFileWindowCancel} onWindowOk={handleSaveFileWindowOk} />
    </div>
  )
}
