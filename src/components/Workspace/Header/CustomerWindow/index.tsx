import React, { FC, useEffect, useState, useRef } from 'react'
import styles from './index.css'
import { Form, Input, Checkbox, Tree, Row, Col, Button, Modal, Menu, message, Alert, Space, Pagination, Switch, Tooltip, } from 'antd'
import { Consts, RequestUtils, SystemUtils, Utils, } from '../../Utils'
import axios from 'axios'
import Avatar from 'antd/lib/avatar/avatar'
import { Document, Folder, isDocument, isFolder } from '../../Utils/RequestUtils'
import type { DataNode, TreeProps, } from 'antd/es/tree';
import { DeleteFilled, EditFilled, FileFilled, FileOutlined, FolderFilled, FolderOutlined, PlusOutlined } from '@ant-design/icons'
import { StorageService } from '../../Storage'
import { useIntl, setLocale, getLocale, FormattedMessage, } from 'umi';
import { ProColumns, ProTable } from '@ant-design/pro-components'
import CustomerFormWindow from './CustomerFormWindow'


interface CustomerWindowProps {
  visible: boolean;
  x: number;
  y: number;
  onWindowCancel: () => void;
  onWindowOk: () => void
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

interface FormValues {
  [name: string]: any;
}

const defaultData = { records: [], size: 0, current: 0, total: 0, pages: 0 }
const defaultCustomer = {
  customerId: 0,
  customerName: '',
  email: '',
  nickName: '',
  createBy: 0,
  createTime: 0,
  updateBy: 0,
  updateTime: 0,
}
const CustomerWindowPage: FC<CustomerWindowProps> = ({
  visible, x, y, onWindowCancel, onWindowOk,
}) => {
  const [dataLoading, setDataLoading,] = useState<boolean>(false)
  const [windowVisible, setWindowVisible,] = useState<boolean>(false)
  const [errorVisible, setErrorVisible,] = useState<boolean>(false)
  const [errorMessage, setErrorMessage,] = useState<string>('')
  const [data, setData,] = useState<CustomersType>( defaultData)
  const [customer, setCustomer, ] = useState<SingleCustomerType>(defaultCustomer)
  const [searchText, setSearchText, ] = useState<string>('')
  const [customerFormWindowVisible, setCustomerFormWindowVisible, ] = useState<boolean>(false)
  const [isUpdate, setIsUpdate, ] = useState<boolean>(false)

  const intl = useIntl();

  if (windowVisible !== visible) {
    setDataLoading(false)
    setWindowVisible(visible)
  }


  const fetchData = async (customerName: string | null, pageNum: number = 1, pageSize: number = 5) => {
    const customerData = await RequestUtils.getCustomers(customerName, pageNum, pageSize)
    if (customerData.status === 200 && customerData.data.success) {
      const customers = customerData.data.data
      setData(customers)
    } else {
      setData(defaultData)
    }
  }

  
  useEffect(() => {
    if (!dataLoading) {
      setDataLoading(true)
      setErrorVisible(false)
      fetchData(searchText)
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

  const handleCustomerFormWindowOk = () => {
    setCustomerFormWindowVisible(false)
    fetchData(searchText)
  }

  const handleCustomerFormWindowCancel = () => {
    setCustomerFormWindowVisible(false)
  }

  const handlePageChange = (current: number, size?: number) => {
    fetchData(searchText, current)
  }

  const handleSearch = ()=> {
    fetchData(searchText)
  }

  const handleUpdateCustomer = (customer: SingleCustomerType) => {
    setCustomerFormWindowVisible(true)
    setIsUpdate(true)
    setCustomer(customer)
  }

  const handleAddCustomer = () => {
    setCustomerFormWindowVisible(true)
    setIsUpdate(false)
    setCustomer(defaultCustomer)
  }

  const handleDeleteCustomer = (operator: SingleCustomerType) => {
    setErrorVisible(false)
    setErrorMessage('')
    const confirmModal = Modal.confirm({
      centered: true,
      title: intl.formatMessage({id: 'workspace.header.operator-window.confirm-delete-title'}),
      content: intl.formatMessage({id: 'workspace.header.operator-window.confirm-delete-content'}),
      onOk: async () => {
        const responseData = await RequestUtils.deleteOperator(operator.operatorId)
        if (responseData.status === 200 && responseData.data.success) {
          fetchData(searchText)
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
  const columns: ProColumns<SingleCustomerType>[] = [
    {
      title: <FormattedMessage id='workspace.header.customer-window.column-customer-id' />,
      dataIndex: 'customerId',
      valueType: 'digit',
      key: 'customerId',
      hideInSearch: true,
      hideInTable: true,
      hideInForm: true,
    },
    {
      title: <FormattedMessage id='workspace.header.customer-window.column-customer-name' />,
      dataIndex: 'customerName',
      key: 'customerName',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id='workspace.header.customer-window.column-customer-email' />,
      dataIndex: 'email',
      valueType: 'text',
      key: 'email',
    },
    {
      title: <FormattedMessage id='workspace.header.customer-window.column-customer-nickname' />,
      dataIndex: 'nickName',
      key: 'nickName',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id='workspace.header.customer-window.operation' />,
      key: 'action',
      valueType: 'option',
      render: (text: any, record: SingleCustomerType) => [
        <Tooltip key='editButton' title={intl.formatMessage({id: 'workspace.header.customer-window.button-tooltip-edit'})}>
          <Button icon={<EditFilled />} onClick={() => {handleUpdateCustomer(record) }} />
        </Tooltip>,
        <Tooltip key='deleteButton' title={intl.formatMessage({id: 'workspace.header.customer-window.button-tooltip-delete'})}>
          <Button icon={<DeleteFilled />} onClick={() => { handleDeleteCustomer(record) }} />
        </Tooltip>,
      ],
    },
  ]

  return (
    <div>
      <Modal title={<FormattedMessage id='workspace.header.customer-window.title' />} width={800} centered open={visible} onOk={onOk} onCancel={onCancel} maskClosable={false}  >
        <div style={{ width: '100%', height: '440px',}}>
          <div style={{ width: '100%', height: '400px',  }}>
          <ProTable
        columns={columns}
        dataSource={data.records}
        rowKey='id'
        //loading={customerListLoading}
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
              <Input key='searchInput' placeholder={intl.formatMessage({ id: 'workspace.header.customer-window.search-placeholder' })} style={{ width: '360px', marginLeft: '16px', }} onChange={(e) => { setSearchText(e.target.value)  }}/>
              <Button key='searchButton' type='primary' style={{ marginLeft: '24px', }} onClick={handleSearch}><FormattedMessage id='workspace.header.customer-window.button-search' /></Button>
            </Col>
            <Col span={6}>
              <Button key='addButton' type='primary' icon={<PlusOutlined/>} style={{ position: 'absolute', right: '16px', }} onClick={handleAddCustomer}><FormattedMessage id='workspace.header.customer-window.button-add' /></Button>
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
          //showTotal={total => `总计 ${total}`}
        />
      </div>
          </div>
        </div>
        <CustomerFormWindow onWindowOk={handleCustomerFormWindowOk} onWindowCancel={handleCustomerFormWindowCancel} visible={customerFormWindowVisible} isUpdate={isUpdate} customerId={customer.customerId} customerName={customer.customerName} email={customer.email} nickname={customer.nickName}/>
      </Modal>

    </div>
  )
}

export default CustomerWindowPage
