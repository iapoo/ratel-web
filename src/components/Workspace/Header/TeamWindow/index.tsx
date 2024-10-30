import React, { FC, useEffect, useState, useRef } from 'react'
import styles from './index.css'
import { Form, Input, Checkbox, Tree, Row, Col, Button, Modal, Menu, message, Alert, Space, Pagination, Switch, Tooltip, } from 'antd'
import { Consts, RequestUtils, SystemUtils, Utils, } from '../../Utils'
import axios from 'axios'
import Avatar from 'antd/lib/avatar/avatar'
import { Document, Folder, isDocument, isFolder } from '../../Utils/RequestUtils'
import type { DataNode, TreeProps, } from 'antd/es/tree'
import { DeleteFilled, EditFilled, FileFilled, FileOutlined, FolderFilled, FolderOutlined, PlusOutlined, TeamOutlined } from '@ant-design/icons'
import { StorageService } from '../../Storage'
import { useIntl, setLocale, getLocale, FormattedMessage, } from 'umi'
import { ProColumns, ProTable } from '@ant-design/pro-components'
import TeamFormWindow from './TeamFormWindow'
import TeamMemberWindow from './TeamMemberWindow'


interface TeamWindowProps {
  visible: boolean
  x: number
  y: number
  onWindowCancel: () => void
  onWindowOk: () => void
}

interface SingleTeamType {
  teamId: number
  customerId: number
  teamName: string
  createBy: number
  createTime: number
  updateBy: number
  updateTime: number
}

interface TeamsType {
  records: SingleTeamType[]
  total: number
  size: number
  pages: number
  current: number
}

interface FormValues {
  [name: string]: any
}

const defaultData = { records: [], size: 0, current: 0, total: 0, pages: 0 }
const defaultTeam = {
  teamId: 0,
  teamName: '',
  customerId: 0,
  createBy: 0,
  createTime: 0,
  updateBy: 0,
  updateTime: 0,
}
const TeamWindowPage: FC<TeamWindowProps> = ({
  visible, x, y, onWindowCancel, onWindowOk,
}) => {
  const [dataLoading, setDataLoading,] = useState<boolean>(false)
  const [windowVisible, setWindowVisible,] = useState<boolean>(false)
  const [errorVisible, setErrorVisible,] = useState<boolean>(false)
  const [errorMessage, setErrorMessage,] = useState<string>('')
  const [data, setData,] = useState<TeamsType>(defaultData)
  const [team, setTeam,] = useState<SingleTeamType>(defaultTeam)
  const [searchText, setSearchText,] = useState<string>('')
  const [teamFormWindowVisible, setTeamFormWindowVisible,] = useState<boolean>(false)
  const [teamMemberWindowVisible, setTeamMemberWindowVisible,] = useState<boolean>(false)
  const [isUpdate, setIsUpdate,] = useState<boolean>(false)

  const intl = useIntl()
  const [messageApi, contextHolder,] = message.useMessage()

  if (windowVisible !== visible) {
    setDataLoading(false)
    setWindowVisible(visible)
  }


  const fetchData = async (teamName: string | null, pageNum: number = 1, pageSize: number = 5) => {
    const teamData = await RequestUtils.getTeams(teamName, pageNum, pageSize)
    if (teamData.status === 200 && teamData.data.success) {
      const teams = teamData.data.data
      setData(teams)
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

  const handleTeamFormWindowOk = () => {
    setTeamFormWindowVisible(false)
    fetchData(searchText)
  }

  const handleTeamFormWindowCancel = () => {
    setTeamFormWindowVisible(false)
  }

  const handlePageChange = (current: number, size?: number) => {
    fetchData(searchText, current)
  }


  const handleTeamMemberWindowOk = () => {
    setTeamMemberWindowVisible(false)
    fetchData(searchText)
  }

  const handleTeamMemberWindowCancel = () => {
    setTeamMemberWindowVisible(false)
  }


  const handleSearch = () => {
    fetchData(searchText)
  }

  const handleUpdateTeam = (team: SingleTeamType) => {
    setTeamFormWindowVisible(true)
    setIsUpdate(true)
    setTeam(team)
  }

  const handleUpdateTeamMember = (team: SingleTeamType) => {
    setTeamMemberWindowVisible(true)
    setTeam(team)
  }

  const handleAddTeam = () => {
    setTeamFormWindowVisible(true)
    setIsUpdate(false)
    setTeam(defaultTeam)
  }

  const handleDeleteTeam = (team: SingleTeamType) => {
    setErrorVisible(false)
    setErrorMessage('')
    const confirmModal = Modal.confirm({
      centered: true,
      title: intl.formatMessage({ id: 'workspace.header.team-window.confirm-delete-title' }),
      content: intl.formatMessage({ id: 'workspace.header.team-window.confirm-delete-content' }),
      onOk: async () => {
        const responseData = await RequestUtils.deleteTeam(team.teamId)
        if (responseData.status === 200 && responseData.data.success) {
          fetchData(searchText)
          messageApi.open({
            type: 'success',
            content: intl.formatMessage({ id: 'workspace.header.team-window.delete-success-message' })
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
  const columns: ProColumns<SingleTeamType>[] = [
    {
      title: <FormattedMessage id='workspace.header.team-window.column-team-id' />,
      dataIndex: 'teamId',
      valueType: 'digit',
      key: 'teamId',
      hideInSearch: true,
      hideInTable: true,
      hideInForm: true,
    },
    {
      title: <FormattedMessage id='workspace.header.team-window.column-team-name' />,
      dataIndex: 'teamName',
      key: 'teamName',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id='workspace.header.team-window.operation' />,
      key: 'action',
      valueType: 'option',
      render: (text: any, record: SingleTeamType) => [
        <Tooltip key='editButton' title={intl.formatMessage({ id: 'workspace.header.team-window.button-tooltip-edit-member' })}>
          <Button icon={<TeamOutlined />} onClick={() => { handleUpdateTeamMember(record) }} />
        </Tooltip>,
        <Tooltip key='editMemberButton' title={intl.formatMessage({ id: 'workspace.header.team-window.button-tooltip-edit' })}>
          <Button icon={<EditFilled />} onClick={() => { handleUpdateTeam(record) }} />
        </Tooltip>,
        <Tooltip key='deleteButton' title={intl.formatMessage({ id: 'workspace.header.team-window.button-tooltip-delete' })}>
          <Button icon={<DeleteFilled />} onClick={() => { handleDeleteTeam(record) }} />
        </Tooltip>,
      ],
    },
  ]

  return (
    <div>
      {contextHolder}
      <Modal title={<FormattedMessage id='workspace.header.team-window.title' />} width={800} centered open={visible} onOk={onOk} onCancel={onCancel} maskClosable={false}  >
        <div style={{ width: '100%', height: '440px', }}>
          <div style={{ width: '100%', height: '400px', }}>
            <ProTable
              columns={columns}
              dataSource={data.records}
              rowKey='id'
              //loading={teamListLoading}
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
                    <Input key='searchInput' placeholder={intl.formatMessage({ id: 'workspace.header.team-window.search-placeholder' })} style={{ width: '360px', marginLeft: '16px', }} onChange={(e) => { setSearchText(e.target.value) }} />
                    <Button key='searchButton' type='primary' style={{ marginLeft: '24px', }} onClick={handleSearch}><FormattedMessage id='workspace.header.team-window.button-search' /></Button>
                  </Col>
                  <Col span={6}>
                    <Button key='addButton' type='primary' icon={<PlusOutlined />} style={{ position: 'absolute', right: '16px', }} onClick={handleAddTeam}><FormattedMessage id='workspace.header.team-window.button-add' /></Button>
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
        <TeamFormWindow onWindowOk={handleTeamFormWindowOk} onWindowCancel={handleTeamFormWindowCancel} visible={teamFormWindowVisible} isUpdate={isUpdate} customerId={team.customerId} teamId={team.teamId} teamName={team.teamName} />
        <TeamMemberWindow onWindowOk={handleTeamMemberWindowOk} onWindowCancel={handleTeamMemberWindowCancel} visible={teamMemberWindowVisible} customerId={team.customerId} teamId={team.teamId} teamName={team.teamName} />
      </Modal>

    </div>
  )
}

export default TeamWindowPage
