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


interface CustomerWindowProps {
  visible: boolean;
  onWindowCancel: () => void;
  onWindowOk: (customerId: number, customerName: string, email: string) => void
}

interface SingleCustomerType {
  customerId: number;
  customerName: string;
  email: string;
  nickName: string;
  createBy: number;
  createTime: number;
  updateBy: number;
  updateTime: number;
}

interface CustomersType {
  records: SingleCustomerType[];
  total: number;
  size: number;
  pages: number;
  current: number;
}

const defaultData = { records: [], size: 0, current: 0, total: 0, pages: 0 }

const CustomerWindowPage: FC<CustomerWindowProps> = ({
  visible, onWindowCancel, onWindowOk,
}) => {
  const [dataLoading, setDataLoading,] = useState<boolean>(false)
  const [windowVisible, setWindowVisible,] = useState<boolean>(false)
  const [errorVisible, setErrorVisible,] = useState<boolean>(false)
  const [errorMessage, setErrorMessage,] = useState<string>('')
  const [selectedRowKeys, setSelectedRowKeys,] = useState<Key[]>([])
  const [selectedRows, setSelectedRows,] = useState<SingleCustomerType[]>([])
  const [data, setData,] = useState<CustomersType>( defaultData)
  const [searchText, setSearchText, ] = useState<string>('')

  const intl = useIntl();

  const columns: ProColumns<SingleCustomerType>[] = [
    {
      title: <FormattedMessage id='workspace.header.customer-selector-window.column-customer-id' />,
      dataIndex: 'customerId',
      valueType: 'digit',
      key: 'customerId',
      hideInSearch: true,
      hideInTable: true,
      hideInForm: true,
    },
    {
      title: <FormattedMessage id='workspace.header.customer-selector-window.column-customer-name' />,
      dataIndex: 'customerName',
      key: 'customerName',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id='workspace.header.customer-selector-window.column-customer-email' />,
      dataIndex: 'email',
      valueType: 'text',
      key: 'email',
    },
    {
      title: <FormattedMessage id='workspace.header.customer-selector-window.column-customer-nickname' />,
      dataIndex: 'nickName',
      key: 'nickName',
      valueType: 'text',
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
      fetchData(null, null)
    }
  })


  const fetchData = async (like: string | null, excludeCustomerId: number | null, pageNum: number = 1, pageSize: number = 5) => {
    const customerData = await RequestUtils.getOperatorCustomers(like, excludeCustomerId, pageNum, pageSize)
    if (customerData.status === 200 && customerData.data.success) {
      const customers = customerData.data.data
      setData(customers)
    } else {
      setData(defaultData)
    }
  }

  const onOk = () => {
    if (onWindowOk && selectedRowKeys.length > 0) {
      const selectedRow = selectedRows[0]
      onWindowOk(selectedRow.customerId, selectedRow.customerName, selectedRow.email)
    }
  }

  const onCancel = () => {
    if (onWindowCancel) {
      onWindowCancel()
    }
  }  
  
  const handleCustomerSelectionChange =  (selectedKeys: Key[], selectedRows: SingleCustomerType[]) => {
    console.log(`selectedKeys=${selectedKeys}, selectedRows=${selectedRows}`)
    setSelectedRowKeys(selectedKeys)
    setSelectedRows(selectedRows)
  }

  const handleSearch = ()=> {
    fetchData(searchText, null)
  }

  const handlePageChange = (current: number, size?: number) => {
    fetchData(searchText, null, current)
  }
  const rowSelection: TableProps<SingleCustomerType>['rowSelection'] = {
    selectedRowKeys,
    type: 'radio',
    onChange: handleCustomerSelectionChange,
    // getCheckboxProps: (record: SingleCustomerType) => ({
    //   name: record.customerName
    // })
  
  }


  return (
    <div>
      <Modal title={<FormattedMessage id='workspace.header.customer-selector-window.title' />} width={800} centered open={visible} onOk={onOk} onCancel={onCancel} maskClosable={false}  >
        <div style={{ width: '100%', height: '420px',}}>
          <div style={{ width: '100%', height: '380px',  }}>
          <ProTable
        columns={columns}
        dataSource={data.records}
        rowKey='customerId'
        //loading={customerListLoading}
        search={false}
        pagination={false}
        rowSelection={rowSelection}                
        //onChange={handleCustomerSelectionChange}
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
              <Input key='searchInput' placeholder={intl.formatMessage({ id: 'workspace.header.customer-selector-window.search-placeholder' })} style={{ width: '360px', marginLeft: '16px', }} onChange={(e) => { setSearchText(e.target.value) }}/>
              <Button key='searchButton' type='primary' style={{ marginLeft: '24px', }} onClick={handleSearch} ><FormattedMessage id='workspace.header.customer-selector-window.button-search' /></Button>
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
          //showTotal={total => `${intl.formatMessage({ id: 'workspace.header.customer-selector-window.search-placeholder' }} ${total}`}
        />
      </div>
          </div>
        </div>
      </Modal>

    </div>
  )
}

export default CustomerWindowPage
