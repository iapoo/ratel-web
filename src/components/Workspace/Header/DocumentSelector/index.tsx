import React, { FC, useEffect, useState, useRef, Key } from 'react'
import styles from './index.css'
import { Form, Input, Checkbox, Tree, Row, Col, Button, Modal, Menu, message, Alert, Space, Pagination, Switch, Tooltip, } from 'antd'
import axios from 'axios'
import Avatar from 'antd/lib/avatar/avatar'
import type { DataNode, TreeProps, } from 'antd/es/tree';
import { DeleteFilled, EditFilled, FileFilled, FileOutlined, FolderFilled, FolderOutlined, PlusOutlined } from '@ant-design/icons'
import { useIntl, setLocale, getLocale, FormattedMessage, } from 'umi';
import { ProColumns, ProTable } from '@ant-design/pro-components'
import { RequestUtils } from '@/components/Workspace/Utils'
import { TableProps } from 'antd/lib'
import moment from 'moment'

interface DocumentWindowProps {
  visible: boolean;
  onWindowCancel: () => void;
  onWindowOk: (documentId: number, documentName: string, folderId: number) => void
}

interface SingleDocumentType {
  documentId: number;
  documentName: string;
  customerId: number;
  customerName: string;
  email: string;
  folderId: number;
  nickName: string;
  createBy: number;
  createDate: number;
  updateBy: number;
  updateDate: number;
}

interface DocumentsType {
  records: SingleDocumentType[];
  total: number;
  size: number;
  pages: number;
  current: number;
}

const defaultData = { records: [], size: 0, current: 0, total: 0, pages: 0 }

const DocumentWindowPage: FC<DocumentWindowProps> = ({
  visible, onWindowCancel, onWindowOk,
}) => {
  const [dataLoading, setDataLoading,] = useState<boolean>(false)
  const [windowVisible, setWindowVisible,] = useState<boolean>(false)
  const [errorVisible, setErrorVisible,] = useState<boolean>(false)
  const [errorMessage, setErrorMessage,] = useState<string>('')
  const [selectedRowKeys, setSelectedRowKeys,] = useState<Key[]>([])
  const [selectedRows, setSelectedRows,] = useState<SingleDocumentType[]>([])
  const [data, setData,] = useState<DocumentsType>( defaultData)
  const [searchText, setSearchText, ] = useState<string>('')

  const intl = useIntl();

  const columns: ProColumns<SingleDocumentType>[] = [
    {
      title: <FormattedMessage id='workspace.header.document-selector-window.column-document-id' />,
      dataIndex: 'documentId',
      valueType: 'digit',
      key: 'documentId',
      hideInSearch: true,
      hideInTable: true,
      hideInForm: true,
    },
    {
      title: <FormattedMessage id='workspace.header.document-selector-window.column-folder-id' />,
      dataIndex: 'folderId',
      valueType: 'digit',
      key: 'folderId',
      hideInTable: true,
    },
    {
      title: <FormattedMessage id='workspace.header.document-selector-window.column-document-name' />,
      dataIndex: 'documentName',
      key: 'documentName',
      valueType: 'text',
      width: 150,
      render: (text: any, ) => {
        return <div style={{ width: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {text}
        </div>
      },
    },
    {
      title: <FormattedMessage id='workspace.header.document-selector-window.column-customer-id' />,
      dataIndex: 'customerId',
      key: 'customerId',
      valueType: 'text',
      width: 100,
    },
    {
      title: <FormattedMessage id='workspace.header.document-selector-window.column-customer-name' />,
      dataIndex: 'customerName',
      key: 'customerName',
      valueType: 'text',
      width: 120,
      render: (text: any, ) => {
        return <div style={{ width: '120px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {text}
        </div>
      },
    },
    {
      title: <FormattedMessage id='workspace.header.document-selector-window.column-customer-email' />,
      dataIndex: 'email',
      valueType: 'text',
      key: 'email',
      width: 150,
      render: (text: any, ) => {
        return <div style={{ width: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {text}
        </div>
      },
    },
    {
      title: <FormattedMessage id='workspace.header.document-selector-window.column-customer-nickname' />,
      dataIndex: 'nickName',
      key: 'nickName',
      valueType: 'text',
      width: 90,
      render: (text: any, ) => {
        return <div style={{ width: '90px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {text}
        </div>
      },
    },    
    {
      title: <FormattedMessage id='workspace.header.document-selector-window.column-document-created-date' />,
      dataIndex: 'createdDate',
      key: 'createdDate',
      valueType: 'text',
      width: 150,
      renderText: (text: any) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: <FormattedMessage id='workspace.header.document-selector-window.column-document-updated-date' />,
      dataIndex: 'updatedDate',
      key: 'updatedDate',
      valueType: 'text',
      width: 150,
      renderText: (text: any) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
  ]


  if (windowVisible !== visible) {
    setDataLoading(false)
    setWindowVisible(visible)
  }

  
  useEffect(() => {
    if (!dataLoading) {
      setDataLoading(true)
      setErrorVisible(false)
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      fetchData(null)
    }
  })


  const fetchData = async (like: string | null, pageNum: number = 1, pageSize: number = 10) => {
    const documentData = await RequestUtils.getOperatorDocuments(like, pageNum, pageSize)
    if (documentData.status === 200 && documentData.data.success) {
      const documents = documentData.data.data
      setData(documents)
    } else {
      setData(defaultData)
    }
  }

  const onOk = () => {
    if (onWindowOk && selectedRowKeys.length > 0) {
      const selectedRow = selectedRows[0]
      onWindowOk(selectedRow.documentId, selectedRow.documentName, selectedRow.folderId)
    }
  }

  const onCancel = () => {
    if (onWindowCancel) {
      onWindowCancel()
    }
  }  
  
  const handleDocumentSelectionChange =  (selectedKeys: Key[], selectedRows: SingleDocumentType[]) => {
    console.log(`selectedKeys=${selectedKeys}, selectedRows=${selectedRows}`)
    setSelectedRowKeys(selectedKeys)
    setSelectedRows(selectedRows)
  }

  const handleSearch = ()=> {
    fetchData(searchText)
  }

  const handlePageChange = (current: number, size?: number) => {
    fetchData(searchText, current)
  }
  const rowSelection: TableProps<SingleDocumentType>['rowSelection'] = {
    selectedRowKeys,
    type: 'radio',
    onChange: handleDocumentSelectionChange,
    // getCheckboxProps: (record: SingleDocumentType) => ({
    //   name: record.documentName
    // })
  
  }


  return (
    <div>
      <Modal title={<FormattedMessage id='workspace.header.document-selector-window.title' />} width={1100} centered open={visible} onOk={onOk} onCancel={onCancel} maskClosable={false}  >
        <div style={{ width: '100%', height: '720px',}}>
          <div style={{ width: '100%', height: '680px',  }}>
          <ProTable
        columns={columns}
        dataSource={data.records}
        rowKey='documentId'
        //loading={documentListLoading}
        search={false}
        pagination={false}
        rowSelection={rowSelection}                
        //onChange={handleDocumentSelectionChange}
        tableAlertRender={false}
        options={{
          density: false,
          fullScreen: false,
          reload: false,
          setting: false,
        }}
        title={() => [
          <Row key='searchRow'>
            <Col span={18} >
              <Input key='searchInput' placeholder={intl.formatMessage({ id: 'workspace.header.document-selector-window.search-placeholder' })} style={{ width: '360px', marginLeft: '16px', }} onChange={(e) => { setSearchText(e.target.value) }}/>
              <Button key='searchButton' type='primary' style={{ marginLeft: '24px', }} onClick={handleSearch} ><FormattedMessage id='workspace.header.document-selector-window.button-search' /></Button>
            </Col>
          </Row>,
        ]}
        headerTitle={false}
        toolBarRender={false}
      />
      <div style={{ width: '100%', height: '64px', }}>
        <Pagination
          className='list-page' style={{ float: 'right', margin: '16px', }}
          total={data.total}
          onChange={handlePageChange}
          //onShowSizeChange={pageSizeHandler}
          current={data.current}
          pageSize={data.size}
          showSizeChanger={false}
          showQuickJumper
          //locale='zhCN'
          //showTotal={total => `${intl.formatMessage({ id: 'workspace.header.document-selector-window.search-placeholder' }} ${total}`}
        />
      </div>
          </div>
        </div>
      </Modal>

    </div>
  )
}

export default DocumentWindowPage
