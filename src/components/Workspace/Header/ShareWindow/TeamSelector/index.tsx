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

interface TeamWindowProps {
  visible: boolean;
  onWindowCancel: () => void;
  onWindowOk: (teamId: number) => void
}

interface SingleTeamType {
  teamId: number;
  teamName: string;
  createBy: number;
  createDate: number;
  updateBy: number;
  updateDate: number;
}

interface TeamsType {
  records: SingleTeamType[];
  total: number;
  size: number;
  pages: number;
  current: number;
}

const defaultData = { records: [], size: 0, current: 0, total: 0, pages: 0 }

const TeamWindowPage: FC<TeamWindowProps> = ({
  visible, onWindowCancel, onWindowOk,
}) => {
  const [dataLoading, setDataLoading,] = useState<boolean>(false)
  const [windowVisible, setWindowVisible,] = useState<boolean>(false)
  const [errorVisible, setErrorVisible,] = useState<boolean>(false)
  const [errorMessage, setErrorMessage,] = useState<string>('')
  const [selectedRowKeys, setSelectedRowKeys,] = useState<Key[]>([])
  const [selectedRows, setSelectedRows,] = useState<SingleTeamType[]>([])
  const [data, setData,] = useState<TeamsType>( defaultData)
  const [searchText, setSearchText, ] = useState<string>('')

  const intl = useIntl();

  const columns: ProColumns<SingleTeamType>[] = [
    {
      title: <FormattedMessage id='workspace.header.team-selector.column-team-id' />,
      dataIndex: 'teamId',
      valueType: 'digit',
      key: 'teamId',
      hideInSearch: true,
      hideInTable: true,
      hideInForm: true,
    },
    {
      title: <FormattedMessage id='workspace.header.team-selector.column-team-name' />,
      dataIndex: 'teamName',
      key: 'teamName',
      valueType: 'text',
      width: 150,
      render: (text: any, ) => {
        return <div style={{ width: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {text}
        </div>
      },
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
    const teamData = await RequestUtils.getTeams(like, pageNum, pageSize)
    if (teamData.status === 200 && teamData.data.success) {
      const teams = teamData.data.data
      setData(teams)
    } else {
      setData(defaultData)
    }
  }

  const onOk = () => {
    if (onWindowOk && selectedRowKeys.length > 0) {
      const selectedRow = selectedRows[0]
      onWindowOk(selectedRow.teamId)
    }
  }

  const onCancel = () => {
    if (onWindowCancel) {
      onWindowCancel()
    }
  }  
  
  const handleTeamSelectionChange =  (selectedKeys: Key[], selectedRows: SingleTeamType[]) => {
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

  const rowSelection: TableProps<SingleTeamType>['rowSelection'] = {
    selectedRowKeys,
    type: 'radio',
    onChange: handleTeamSelectionChange,
    // getCheckboxProps: (record: SingleTeamType) => ({
    //   name: record.teamName
    // })
  
  }


  return (
    <div>
      <Modal title={<FormattedMessage id='workspace.header.team-selector.window-title' />} width={600} centered open={visible} onOk={onOk} onCancel={onCancel} maskClosable={false}  >
        <div style={{ width: '100%', height: '420px',}}>
          <div style={{ width: '100%', height: '380px',  }}>
          <ProTable
        columns={columns}
        dataSource={data.records}
        rowKey='teamId'
        //loading={teamListLoading}
        search={false}
        pagination={false}
        rowSelection={rowSelection}                
        //onChange={handleTeamSelectionChange}
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
              <Input key='searchInput' placeholder={intl.formatMessage({ id: 'workspace.header.team-selector.search-placeholder' })} style={{ width: '240px', marginLeft: '16px', }} onChange={(e) => { setSearchText(e.target.value) }}/>
              <Button key='searchButton' type='primary' style={{ marginLeft: '24px', }} onClick={handleSearch} ><FormattedMessage id='workspace.header.team-selector.button-search' /></Button>
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
          //showTotal={total => `${intl.formatMessage({ id: 'workspace.header.team-selector-window.search-placeholder' }} ${total}`}
        />
      </div>
          </div>
        </div>
      </Modal>

    </div>
  )
}

export default TeamWindowPage
