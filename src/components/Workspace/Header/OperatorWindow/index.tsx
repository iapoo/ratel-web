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


interface OperatorWindowProps {
  visible: boolean;
  x: number;
  y: number;
  onWindowCancel: () => void;
  onWindowOk: () => void
}

interface SingleOperatorType {
  id: number;
  name: string;
  logoUrl: string;
  contactPerson: string;
  contactTelephone: string;
  address: string;
  regionId: number;
  regionIdPath: string;
  regionName: string;
  regionsName: string;
  createBy: number;
  createTime: number;
  updateBy: number;
  updateTime: number;
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

  const [data, setData,] = useState<OperatorsType>( defaultData)

  const intl = useIntl();

  const columns: ProColumns<SingleOperatorType>[] = [
    {
      title: <FormattedMessage id='workspace.header.operator-window.column-operator-id' />,
      dataIndex: 'id',
      valueType: 'digit',
      key: 'id',
      hideInSearch: true,
      hideInTable: true,
      hideInForm: true,
    },
    {
      title: <FormattedMessage id='workspace.header.operator-window.column-operator-id' />,
      dataIndex: 'name',
      key: 'name',
      valueType: 'text',
      render: (text: any, record: SingleOperatorType) => <Button type='link' onClick={() => goEditHandler(record)} >{text}</Button>,
    },
    {
      title: <FormattedMessage id='workspace.header.operator-window.column-customer-name' />,
      dataIndex: 'regionsName',
      valueType: 'text',
      key: 'contactPerson',
    },
    {
      title: <FormattedMessage id='workspace.header.operator-window.column-customer-email' />,
      dataIndex: 'address',
      key: 'address',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id='workspace.header.operator-window.column-operator-type' />,
      dataIndex: 'createTime',
      valueType: 'date',
      key: 'createTime',
      renderText: (text: any) => new Date(text),
    },
    {
      title: <FormattedMessage id='workspace.header.operator-window.operation' />,
      key: 'action',
      valueType: 'option',
      render: (text: any, record: SingleOperatorType) => [
        <Tooltip key='editButton' title='编辑'>
          <Button icon={<EditFilled />} onClick={() => { }} />
        </Tooltip>,
        <Tooltip key='deleteButton' title='删除'>
          <Button icon={<DeleteFilled />} onClick={() => {  }} />
        </Tooltip>,
      ],
    },
  ]


  if (windowVisible !== visible) {
    setDataLoading(false)
    setWindowVisible(visible)
  }


  const fetchData = async () => {
    const operatorData = await RequestUtils.getOperators()
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
              <Button key='addButton' type='primary' icon={<PlusOutlined/>} style={{ position: 'absolute', right: '16px', }} ><FormattedMessage id='workspace.header.operator-window.button-add' /></Button>
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
      </Modal>

    </div>
  )
}

export default OperatorWindowPage
