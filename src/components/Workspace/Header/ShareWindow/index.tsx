import React, { FC, useEffect, useState, useRef, ChangeEvent } from 'react'
import styles from './index.css'
import { Form, Input, Select, Checkbox, Tree, Row, Col, Button, Modal, Menu, message, Alert, Space, Pagination, Switch, Tooltip, Tabs, TabsProps, DatePicker} from 'antd'
import { Consts, RequestUtils, SystemUtils, Utils, } from '../../Utils'
import axios from 'axios'
import Avatar from 'antd/lib/avatar/avatar'
import { Document, Folder, isDocument, isFolder } from '../../Utils/RequestUtils'
import type { DataNode, TreeProps, } from 'antd/es/tree';
import { DeleteFilled, EditFilled, FileFilled, FileOutlined, FolderFilled, FolderOutlined, PlusOutlined, TeamOutlined } from '@ant-design/icons'
import { StorageService } from '../../Storage'
import { useIntl, setLocale, getLocale, FormattedMessage, } from 'umi';
import { ProColumns, ProTable } from '@ant-design/pro-components'
import CustomerFormWindow from './CustomerFormWindow'
import TeamSelector from './TeamSelector'

interface ShareWindowProps {
  visible: boolean;
  documentId: number;
  x: number;
  y: number;
  onWindowCancel: () => void;
  onWindowOk: () => void
}

interface SingleDocumentAccessType {
  documentId: number;
  customerId: number;
  customerName: string;
  customerEmail: string;
  customerNickname: string;
  createBy: number;
  createTime: number;
  updateBy: number;
  updateTime: number;
}

interface DocumentAccesssType {
  records: SingleDocumentAccessType[];
  total: number;
  size: number;
  pages: number;
  current: number;
}

interface SingleDocumentTeamAccessType {
  documentId: number;
  teamId: number;
  teamName: string;
  createBy: number;
  createTime: number;
  updateBy: number;
  updateTime: number;
}

interface DocumentTeamAccesssType {
  records: SingleDocumentTeamAccessType[];
  total: number;
  size: number;
  pages: number;
  current: number;
}

interface DocumentShareType {
  documentId: number;
  linkCode: string;
  shareStatus: number;
  shareCodeStatus: number;
  shareCode: string;
}

const defaultDocumentAccessData = { records: [], size: 0, current: 0, total: 0, pages: 0 }

const defaultDocumentTeamAccessData = { records: [], size: 0, current: 0, total: 0, pages: 0 }

const defaultDocumentShareData = { documentId: 0, linkCode: '', shareStatus: 0, shareCode: '', shareCodeStatus: 0 }

const ShareWindowPage: FC<ShareWindowProps> = ({
  visible, documentId, x, y, onWindowCancel, onWindowOk, 
}) => {
  const [dataLoading, setDataLoading,] = useState<boolean>(false)
  const [windowVisible, setWindowVisible,] = useState<boolean>(false)
  const [errorVisible, setErrorVisible,] = useState<boolean>(false)
  const [errorMessage, setErrorMessage,] = useState<string>('')
  const [documentAccessData, setDocumentAccessData,] = useState<DocumentAccesssType>( defaultDocumentAccessData)
  const [documentTeamAccessData, setDocumentTeamAccessData,] = useState<DocumentTeamAccesssType>( defaultDocumentTeamAccessData)
  const [searchCustomerText, setSearchCustomerText, ] = useState<string>('')
  const [searchTeamText, setSearchTeamText, ] = useState<string>('')
  const [customerFormWindowVisible, setCustomerFormWindowVisible, ] = useState<boolean>(false)
  const [teamSelectorVisible, setTeamSelectorVisible, ] = useState<boolean>(false)
  const [documentShare, setDocumentShare, ] = useState<DocumentShareType>(defaultDocumentShareData)
  const [shareLinkPrefix, setShareLinkPrefix, ] = useState<string>('')
  const intl = useIntl();
  const [messageApi, contextHolder,] = message.useMessage()
  const {RangePicker, } = DatePicker


  if (windowVisible !== visible) {
    setDataLoading(false)
    setWindowVisible(visible)
  }

  const fetchDocumentAccessData = async (documentId: number, like: string | null, pageNum: number = 1, pageSize: number = 5) => {
    const documentAccessData = await RequestUtils.getDocumentAccessDetails(documentId, like, pageNum, pageSize)
    if (documentAccessData.status === 200 && documentAccessData.data.success) {
      const documentAccesss = documentAccessData.data.data
      setDocumentAccessData(documentAccesss)
    } else {
      setDocumentAccessData(defaultDocumentAccessData)
    }
  }
  
  const fetchDocumentTeamAccessData = async (documentId: number, like: string | null, pageNum: number = 1, pageSize: number = 5) => {
    const documentTeamAccessData = await RequestUtils.getDocumentTeamAccessDetails(documentId, like, pageNum, pageSize)
    if (documentTeamAccessData.status === 200 && documentTeamAccessData.data.success) {
      const documentTeamAccesss = documentTeamAccessData.data.data
      setDocumentTeamAccessData(documentTeamAccesss)
    } else {
      setDocumentTeamAccessData(defaultDocumentTeamAccessData)
    }
  }

  const refreshLinkCode = () => {
    const url = document.URL
    const urlObject = SystemUtils.parseUrl(url)
    console.log(`check admin = ${urlObject}`)
    setShareLinkPrefix(urlObject.protocol + '://' + urlObject.host + '/document?link=')
  }
  
  const fetchDocumentShare = async (documentId: number) => {
    const documentShareData = await RequestUtils.loadDocument(documentId, false)
    if (documentShareData.status === 200 && documentShareData.data.success) {
      const documentShare = documentShareData.data.data
      setDocumentShare(documentShare)
    } else {
      setDocumentShare(defaultDocumentShareData)
    }
  }

  useEffect(() => {
    if (!dataLoading) {
      setDataLoading(true)
      setErrorVisible(false)
      fetchDocumentAccessData(documentId, searchCustomerText)
      fetchDocumentTeamAccessData(documentId, searchTeamText)
      fetchDocumentShare(documentId)
      refreshLinkCode()
    }
  })


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

  const handleDocumentAccessPageChange = (current: number) => {
    fetchDocumentAccessData(documentId, searchCustomerText, current)
  }

  const handleSelectCustomoer = () => {
    setCustomerFormWindowVisible(true)
  }

  const handleCustomerFormWindowOk = () => {
    setCustomerFormWindowVisible(false)
    fetchDocumentAccessData(documentId, searchCustomerText)
  }

  const handleCustomerFormWindowCancel = () => {
    setCustomerFormWindowVisible(false)
  }

  const handleCustomerSearch = ()=> {
    fetchDocumentAccessData(documentId, searchCustomerText)
  }
  
  const handleDeleteDocumentAccess = (documentAccess: SingleDocumentAccessType) => {
    setErrorVisible(false)
    setErrorMessage('')
    const confirmModal = Modal.confirm({
      centered: true,
      title: intl.formatMessage({id: 'workspace.header.share-window.confirm-delete-title'}),
      content: intl.formatMessage({id: 'workspace.header.share-window.confirm-delete-content'}),
      onOk: async () => {
        const responseData = await RequestUtils.deleteDocumentAccess(documentAccess.documentId, documentAccess.customerId)
        if (responseData.status === 200 && responseData.data.success) {
          fetchDocumentAccessData(documentId, searchCustomerText)
          messageApi.open({
            type: 'success',
            content: intl.formatMessage({ id: 'workspace.header.share-window.delete-customer-success-message' })
          })
        } else if (responseData.status === 200) {
          setErrorVisible(true)
          setErrorMessage(responseData.data.message)
        } else {
          setErrorVisible(true)
          setErrorMessage('System error happened')
        }
        confirmModal.destroy()
      },
      onCancel: () => {
        confirmModal.destroy()
      }
    })
  }


  const handleDocumentTeamAccessPageChange = (current: number) => {
    fetchDocumentTeamAccessData(documentId, searchTeamText, current)
  }

  const handleSelectTeam = () => {
    setTeamSelectorVisible(true)
  }

  const handleTeamSelectorOk = async (teamId: number) => {
    setTeamSelectorVisible(false)
    const responseData = await RequestUtils.addDocumentTeamAccess(documentId, teamId)
    if (responseData.status === 200 && responseData.data.success) {
      messageApi.open({
        type: 'success',
        content: intl.formatMessage({ id: 'workspace.header.share-window.add-success-message' })
      })
      fetchDocumentTeamAccessData(documentId, searchCustomerText)
    } else if (responseData.status === 200) {
      setErrorVisible(true)
      setErrorMessage(responseData.data.message)
    } else {
      setErrorVisible(true)
      setErrorMessage('System error happened')
    }
  }

  const handleTeamSelectorCancel = () => {
    setTeamSelectorVisible(false)
  }

  const handleTeamSearch = ()=> {
    fetchDocumentTeamAccessData(documentId, searchTeamText)
  }

  const handleDeleteDocumentTeamAccess = (documentTeamAccess: SingleDocumentTeamAccessType) => {
    setErrorVisible(false)
    setErrorMessage('')
    const confirmModal = Modal.confirm({
      centered: true,
      title: intl.formatMessage({id: 'workspace.header.share-window.confirm-delete-title'}),
      content: intl.formatMessage({id: 'workspace.header.share-window.confirm-delete-content'}),
      onOk: async () => {
        const responseData = await RequestUtils.deleteDocumentTeamAccess(documentTeamAccess.documentId, documentTeamAccess.teamId)
        if (responseData.status === 200 && responseData.data.success) {
          fetchDocumentTeamAccessData(documentId, searchCustomerText)
          messageApi.open({
            type: 'success',
            content: intl.formatMessage({ id: 'workspace.header.share-window.delete-team-success-message' })
          })
        } else if (responseData.status === 200) {
          setErrorVisible(true)
          setErrorMessage(responseData.data.message)
        } else {
          setErrorVisible(true)
          setErrorMessage('System error happened')
        }
        confirmModal.destroy()
      },
      onCancel: () => {
        confirmModal.destroy()
      }
    })
  }

  const handleUpdateDocumentShare = async (documentId: number, shareStatus: number, shareCode: string, shareCodeStatus: number) => {
    setErrorVisible(false)
    setErrorMessage('')
    const responseData = await RequestUtils.updateDocumentShare(documentId, shareStatus, shareCode, shareCodeStatus)
    if (responseData.status === 200 && responseData.data.success) {
      fetchDocumentShare(documentId)
    } else if (responseData.status === 200) {
      setErrorVisible(true)
      setErrorMessage(responseData.data.message)
    } else {
      setErrorVisible(true)
      setErrorMessage('System error happened')
    }
  }

  const handleShareStatusChange = (checked: boolean) => {
    handleUpdateDocumentShare(documentId, checked ? 1 : 0, documentShare.shareCode, documentShare.shareCodeStatus)
  }

  const handleShareCodeStatusChange = (checked: boolean) => {
    let shareCode = documentShare.shareCode
    if(checked) {
      shareCode = SystemUtils.generateRandomString(4)
    }
    handleUpdateDocumentShare(documentId, documentShare.shareStatus, shareCode, checked ? 1 : 0)
  }

  const handleShareCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleUpdateDocumentShare(documentId, documentShare.shareStatus, e.target.value, documentShare.shareCodeStatus)
  }

  const handleCopyLink = async () => {
    let clipboard = navigator.clipboard
    if (!clipboard) {
      SystemUtils.handleInternalError(intl.formatMessage({ id: 'workspace.content.message-clipboard-not-supported' }))
      return
    }
    await clipboard.writeText(shareLinkPrefix + documentShare.linkCode)
  }

  const shareExpirationOptions = [
    { value: 1, label: <FormattedMessage id='workspace.header.share-window.expiration-option-1' />},
    { value: 2, label: <FormattedMessage id='workspace.header.share-window.expiration-option-2' />},
    { value: 3, label: <FormattedMessage id='workspace.header.share-window.expiration-option-3' />},
    { value: 5, label: <FormattedMessage id='workspace.header.share-window.expiration-option-4' />},
    { value: 7, label: <FormattedMessage id='workspace.header.share-window.expiration-option-5' />},
    { value: 14, label: <FormattedMessage id='workspace.header.share-window.expiration-option-6' />},
    { value: 30, label: <FormattedMessage id='workspace.header.share-window.expiration-option-7' />},
    { value: 999, label: <FormattedMessage id='workspace.header.share-window.expiration-option-8' />},
  ]

  const documentAccessColumns: ProColumns<SingleDocumentAccessType>[] = [
    {
      title: <FormattedMessage id='workspace.header.share-window.column-document-id' />,
      dataIndex: 'documentId',
      valueType: 'digit',
      key: 'documentId',
      hideInSearch: true,
      hideInTable: true,
      hideInForm: true,
    },
    {
      title: <FormattedMessage id='workspace.header.share-window.column-customer-id' />,
      dataIndex: 'customerId',
      valueType: 'digit',
      key: 'customerId',
      hideInSearch: true,
      hideInTable: true,
      hideInForm: true,
    },
    {
      title: <FormattedMessage id='workspace.header.share-window.column-customer-name' />,
      dataIndex: 'customerName',
      key: 'customerName',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id='workspace.header.share-window.column-customer-nickname' />,
      dataIndex: 'customerNickname',
      key: 'customerNickname',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id='workspace.header.share-window.column-customer-email' />,
      dataIndex: 'customerEmail',
      key: 'customerEmail',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id='workspace.header.share-window.operation' />,
      key: 'action',
      valueType: 'option',
      render: (text: any, record: SingleDocumentAccessType) => [
        <Tooltip key='deleteButton' title={intl.formatMessage({id: 'workspace.header.share-window.button-tooltip-delete'})}>
          <Button icon={<DeleteFilled />} onClick={() => { handleDeleteDocumentAccess(record) }} />
        </Tooltip>,
      ],
    },
  ]

  const documentTeamAccessColumns: ProColumns<SingleDocumentTeamAccessType>[] = [
    {
      title: <FormattedMessage id='workspace.header.share-window.column-document-id' />,
      dataIndex: 'documentId',
      valueType: 'digit',
      key: 'documentId',
      hideInSearch: true,
      hideInTable: true,
      hideInForm: true,
    },
    {
      title: <FormattedMessage id='workspace.header.share-window.column-team-id' />,
      dataIndex: 'teamId',
      valueType: 'digit',
      key: 'teamId',
      hideInSearch: true,
      hideInTable: true,
      hideInForm: true,
    },
    {
      title: <FormattedMessage id='workspace.header.share-window.column-team-name' />,
      dataIndex: 'teamName',
      key: 'teamName',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id='workspace.header.share-window.operation' />,
      key: 'action',
      valueType: 'option',
      render: (text: any, record: SingleDocumentTeamAccessType) => [
        <Tooltip key='deleteTeamButton' title={intl.formatMessage({id: 'workspace.header.share-window.button-tooltip-delete'})}>
          <Button icon={<DeleteFilled />} onClick={() => { handleDeleteDocumentTeamAccess(record) }} />
        </Tooltip>,
      ],
    },
  ]

  const documentAccessList =  <div style={{ width: '100%', height: '440px',}}>
  <div style={{ width: '100%', height: '400px',  }}>
    <ProTable
      columns={documentAccessColumns}
      dataSource={documentAccessData.records}
      rowKey='id'
      //loading={documentAccessListLoading}
      search={false}
      pagination={false}
      options={{
        density: false,
        fullScreen: false,
        reload: false,
        setting: false,
      }}
      title={() => [
        <Row key='searchRow'>
          <Col span={18} >
            <Input key='searchInput' placeholder={intl.formatMessage({ id: 'workspace.header.share-window.search-customer-placeholder' })} style={{ width: '240px', marginLeft: '16px', }} onChange={(e) => { setSearchCustomerText(e.target.value)  }}/>
            <Button key='searchButton' type='primary' style={{ marginLeft: '24px', }} onClick={handleCustomerSearch}><FormattedMessage id='workspace.header.share-window.button-search' /></Button>
          </Col>
          <Col span={6}>
            <Button key='addButton' type='primary' icon={<PlusOutlined/>} style={{ position: 'absolute', right: '16px', }} onClick={handleSelectCustomoer}><FormattedMessage id='workspace.header.share-window.button-add' /></Button>
          </Col>
        </Row>,
      ]}
      headerTitle={false}
      toolBarRender={false}
    />
    <div style={{ width: '100%', height: '64px', }}>
      <Pagination
        className='list-page' style={{ float: 'right', margin: '16px', }}
        total={documentAccessData.total}
        onChange={handleDocumentAccessPageChange}
        //onShowSizeChange={pageSizeHandler}
        current={documentAccessData.current}
        pageSize={documentAccessData.size}
        showSizeChanger={false}
        showQuickJumper
        //locale='zhCN'
        //showTotal={total => `总计 ${total}`}
      />
    </div>
  </div>
</div>

const documentTeamAccessList =  <div style={{ width: '100%', height: '440px',}}>
<div style={{ width: '100%', height: '400px',  }}>
  <ProTable
    columns={documentTeamAccessColumns}
    dataSource={documentTeamAccessData.records}
    rowKey='id'
    //loading={documentAccessListLoading}
    search={false}
    pagination={false}
    options={{
      density: false,
      fullScreen: false,
      reload: false,
      setting: false,
    }}
    title={() => [
      <Row key='searchRow'>
        <Col span={18} >
          <Input key='searchTeamInput' placeholder={intl.formatMessage({ id: 'workspace.header.share-window.search-team-placeholder' })} style={{ width: '240px', marginLeft: '16px', }} onChange={(e) => { setSearchTeamText(e.target.value)  }}/>
          <Button key='searchTeamButton' type='primary' style={{ marginLeft: '24px', }} onClick={handleTeamSearch}><FormattedMessage id='workspace.header.share-window.button-search' /></Button>
        </Col>
        <Col span={6}>
          <Button key='addTeamButton' type='primary' icon={<PlusOutlined/>} style={{ position: 'absolute', right: '16px', }} onClick={handleSelectTeam}><FormattedMessage id='workspace.header.share-window.button-add' /></Button>
        </Col>
      </Row>,
    ]}
    headerTitle={false}
    toolBarRender={false}
  />
  <div style={{ width: '100%', height: '64px', }}>
    <Pagination
      className='list-page' style={{ float: 'right', margin: '16px', }}
      total={documentTeamAccessData.total}
      onChange={handleDocumentTeamAccessPageChange}
      //onShowSizeChange={pageSizeHandler}
      current={documentTeamAccessData.current}
      pageSize={documentTeamAccessData.size}
      showSizeChanger={false}
      showQuickJumper
      //locale='zhCN'
      //showTotal={total => `总计 ${total}`}
    />
  </div>
</div>
</div>

const publicShareSection = <div style={{width: '100%', height: '500px'}}>
  <div style={{width: '100%', height: '60%'}}>
    <div style={{padding: '8px'}}>
      <FormattedMessage id='workspace.header.share-window.public-share-turn-on-share' />
      <Switch style={{marginLeft: 32}} value={documentShare.shareStatus === 1} onChange={handleShareStatusChange}/>
    </div>
    <div style={{padding: '8px', display: documentShare.shareStatus === 1 ? 'block' : 'none'}}>
      <FormattedMessage id='workspace.header.share-window.public-share-access-code' />
      <Switch style={{marginLeft: 32}} value={documentShare.shareCodeStatus === 1} onChange={handleShareCodeStatusChange}/>
      <Input style={{marginLeft: 32, width: 60, }} hidden={documentShare.shareCodeStatus !== 1} value={documentShare.shareCode} onChange={handleShareCodeChange}/>
    </div>
    <div style={{padding: '8px', display: documentShare.shareStatus === 1 ? 'block' : 'none'}}>
      <FormattedMessage id='workspace.header.share-window.public-share-setup-expiration-date' /><Select style={{width: 140, marginLeft: 32}} options={shareExpirationOptions} />
    </div>
    <div style={{padding: '8px', display: documentShare.shareStatus === 1 ? 'block' : 'none'}}>
      <Input value={shareLinkPrefix + documentShare.linkCode} disabled style={{width: '65%', cursor: 'default'}}/>
      <Button type='primary' style={{width: '30%'}} onClick={handleCopyLink}>
        <FormattedMessage id='workspace.header.share-window.public-share-copy-link' />
      </Button>
    </div>
  </div>
  <div style={{width: '100%', height: '40%', }}>
  </div>
</div>

const items: TabsProps['items'] = [
  {
    key: '1',
    label: <FormattedMessage id='workspace.header.share-window.label-share-invite' />,
    children: documentAccessList
  },
  {
    key: '2',
    label: <FormattedMessage id='workspace.header.share-window.label-share-team' />,
    children: documentTeamAccessList
  },
  {
    key: '3',
    label: <FormattedMessage id='workspace.header.share-window.label-share-public' />,
    children: publicShareSection
  },
]

  return (
    <div>
      {contextHolder}
      <Modal title={<FormattedMessage id='workspace.header.share-window.title' />} width={900} centered open={visible} onOk={onOk} onCancel={onCancel} maskClosable={false}  >
        <Tabs tabPosition='left' items={items} defaultActiveKey='1' style={{width: '100%', height: 500}}/>
      </Modal>
      <CustomerFormWindow visible={customerFormWindowVisible} documentId={documentId} onWindowOk={handleCustomerFormWindowOk} onWindowCancel={handleCustomerFormWindowCancel}/>
      <TeamSelector visible={teamSelectorVisible} onWindowOk={handleTeamSelectorOk} onWindowCancel={handleTeamSelectorCancel}/>
      </div>
  )
}

export default ShareWindowPage
