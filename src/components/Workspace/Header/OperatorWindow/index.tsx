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
import OperatorFormWindow from './OperatorFormWindow'


interface OperatorWindowProps {
  visible: boolean;
  x: number;
  y: number;
  onWindowCancel: () => void;
  onWindowOk: () => void
}

interface SingleOperatorType {
  operatorId: number;
  operatorType: number;
  customerId: number;
  customerName: string;
  email: string;
}

interface OperatorsType {
  records: SingleOperatorType[];
  total: number;
  size: number;
  pages: number;
  current: number;
}

interface FormValues {
  [name: string]: any;
}

const defaultData = { records: [], size: 0, current: 0, total: 0, pages: 0 }

const OperatorWindowPage: FC<OperatorWindowProps> = ({
  visible, x, y, onWindowCancel, onWindowOk,
}) => {
  const [dataLoading, setDataLoading,] = useState<boolean>(false)
  const [windowVisible, setWindowVisible,] = useState<boolean>(false)
  const [errorVisible, setErrorVisible,] = useState<boolean>(false)
  const [errorMessage, setErrorMessage,] = useState<string>('')
  const [operatorFormWindowVisible, setOperatorFormWindowVisible, ] = useState<boolean>(false)
  const [data, setData,] = useState<OperatorsType>( defaultData)
  const [customerId,setCustomerId, ] = useState<number>(0)
  const [customerName, setCustomerName, ] = useState<string>('')
  const [email, setEmail, ] = useState<string>('')
  const [operatorType, setOperatorType, ] = useState<number>(0)
  const [isUpdate, setIsUpdate, ] = useState<boolean>(false)
  const [operatorId, setOperatorId, ] = useState<number>(0)
  const intl = useIntl();

  if (windowVisible !== visible) {
    setDataLoading(false)
    setWindowVisible(visible)
  }


  const fetchData = async () => {
    const operatorData = await RequestUtils.getOperatorDetails()
    if (operatorData.status === 200 && operatorData.data.success) {
      const operators = operatorData.data.data
      setData(operators)
    } else {
      setData(defaultData)
    }
  }
  
  useEffect(() => {
    if (!dataLoading) {
      setDataLoading(true)
      setErrorVisible(false)
      fetchData()
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

  const openOperatorFormWindow = (isUpdate: boolean, operatorId: number, customerId: number, customerName: string, email: string, operatorType: number) => {
    setOperatorFormWindowVisible(true)
    setIsUpdate(isUpdate)
    setOperatorId(operatorId)
    setCustomerId(customerId)
    setCustomerName(customerName)
    setEmail(email)
    setOperatorType(operatorType)
  }

  const handleAddOperator = () => {
    openOperatorFormWindow(false, 0, 0, '', '', 0)
  }

  const handleUpdateOperator = (operator: SingleOperatorType) => {
    setOperatorFormWindowVisible(true)
    setIsUpdate(true)
    setOperatorId(operator.operatorId)
    setCustomerId(operator.customerId)
    setCustomerName(operator.customerName)
    setEmail(operator.email)
    setOperatorType(operator.operatorType)
  }

  const handleDeleteOperator = (operator: SingleOperatorType) => {

  }

  const handleOperatorFormWindowOk = () => {
    setOperatorFormWindowVisible(false)
  }

  const handleOperatorFormWindowCancel = () => {
    setOperatorFormWindowVisible(false)
  }

  const handleCustomerSelectorChange = (customerId: number, customerName: string, email: string) => {
    setCustomerId(customerId)
    setCustomerName(customerName)
    setEmail(email)
  }

  const columns: ProColumns<SingleOperatorType>[] = [
    {
      title: <FormattedMessage id='workspace.header.operator-window.column-operator-id' />,
      dataIndex: 'operatorId',
      valueType: 'digit',
      key: 'operatorId',
      hideInSearch: true,
      hideInTable: true,
      hideInForm: true,
    },
    {
      title: <FormattedMessage id='workspace.header.operator-window.column-customer-id' />,
      dataIndex: 'customerId',
      key: 'customerId',
      valueType: 'text',
//      render: (text: any, record: SingleOperatorType) => <Button type='link' onClick={() => goEditHandler(record)} >{text}</Button>,
    },
    {
      title: <FormattedMessage id='workspace.header.operator-window.column-customer-name' />,
      dataIndex: 'customerName',
      valueType: 'text',
      key: 'customerName',
    },
    {
      title: <FormattedMessage id='workspace.header.operator-window.column-customer-email' />,
      dataIndex: 'email',
      key: 'email',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id='workspace.header.operator-window.column-operator-type' />,
      dataIndex: 'operatorType',
      valueType: 'digit',
      key: 'operatorType',
      renderText: (text: any) => new Date(text),
    },
    {
      title: <FormattedMessage id='workspace.header.operator-window.operation' />,
      key: 'operatorId',
      valueType: 'digit',
      render: (text: any, record: SingleOperatorType) => [
        <Tooltip key='editButton' title='编辑'>
          <Button icon={<EditFilled />} onClick={() => handleUpdateOperator(record)} />
        </Tooltip>,
        <Tooltip key='deleteButton' title='删除'>
          <Button icon={<DeleteFilled />} onClick={() => handleDeleteOperator(record) } />
        </Tooltip>,
      ],
    },
  ]

  return (
    <div>
      <Modal title={<FormattedMessage id='workspace.header.operator-window.title' />} width={800} centered open={visible} onOk={onOk} onCancel={onCancel} maskClosable={false}  >
        <div style={{ width: '100%', height: '440px',}}>
          <div style={{ width: '100%', height: '400px',  }}>
          <ProTable
        columns={columns}
        dataSource={data.records}
        rowKey='id'
        //loading={operatorListLoading}
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
              <Input key='searchInput' placeholder={intl.formatMessage({ id: 'workspace.header.operator-window.search-placeholder' })} style={{ width: '360px', marginLeft: '16px', }} onChange={(e) => {  }}/>
              <Button key='searchButton' type='primary' style={{ marginLeft: '24px', }} ><FormattedMessage id='workspace.header.operator-window.button-search' /></Button>
            </Col>
            <Col span={6}>
              <Button key='addButton' type='primary' icon={<PlusOutlined/>} style={{ position: 'absolute', right: '16px', }} onClick={handleAddOperator}><FormattedMessage id='workspace.header.operator-window.button-add' /></Button>
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
          //onChange={paginationHandler}
          //onShowSizeChange={pageSizeHandler}
          current={data.current}
          pageSize={data.size}
          //showSizeChanger
          showQuickJumper
          //locale='zhCN'
          showTotal={total => `总计 ${total}`}
        />
      </div>
          </div>
        </div>
        <OperatorFormWindow visible={operatorFormWindowVisible} onWindowOk={handleOperatorFormWindowOk} onWindowCancel={handleOperatorFormWindowCancel} 
          onCustomerSelectorChanged={handleCustomerSelectorChange}
        isUpdate={isUpdate} operatorId={operatorId} customerId={customerId} customerName={customerName} email={email} operatorType={operatorType} />
      </Modal>

    </div>
  )
}

export default OperatorWindowPage
