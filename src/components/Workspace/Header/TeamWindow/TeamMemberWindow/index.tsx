import { DeleteFilled, PlusOutlined } from '@ant-design/icons'
import { ProColumns, ProTable } from '@ant-design/pro-components'
import { Button, Col, Input, message, Modal, Pagination, Row, Tooltip } from 'antd'
import { FC, useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'umi'
import { RequestUtils } from '../../../Utils'
import TeamMemberFormWindow from './TeamMemberFormWindow'

interface TeamMemberWindowProps {
  visible: boolean
  teamId: number
  teamName: string
  customerId: number
  onWindowCancel: () => void
  onWindowOk: () => void
}

interface SingleTeamMemberType {
  teamId: number
  teamName: string
  customerId: number
  customerEmail: string
  customerNickname: string
  createBy: number
  createTime: number
  updateBy: number
  updateTime: number
}

interface TeamMembersType {
  records: SingleTeamMemberType[]
  total: number
  size: number
  pages: number
  current: number
}
//
// interface FormValues {
//   [name: string]: any
// }

const defaultData = { records: [], size: 0, current: 0, total: 0, pages: 0 }

const defaultTeamMember = {
  teamId: 0,
  teamName: '',
  customerId: 0,
  customerEmail: '',
  customerNickname: '',
  createBy: 0,
  createTime: 0,
  updateBy: 0,
  updateTime: 0,
}
const TeamMemberWindowPage: FC<TeamMemberWindowProps> = ({
  visible,
  teamId,
  customerId,
  teamName,
  onWindowCancel,
  onWindowOk,
}) => {
  const [dataLoading, setDataLoading] = useState<boolean>(false)
  const [windowVisible, setWindowVisible] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorVisible, setErrorVisible] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [data, setData] = useState<TeamMembersType>(defaultData)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [teamMember, setTeamMember] = useState<SingleTeamMemberType>(defaultTeamMember)
  const [searchText, setSearchText] = useState<string>('')
  const [teamMemberFormWindowVisible, setTeamMemberFormWindowVisible] = useState<boolean>(false)

  const intl = useIntl()
  const [messageApi, contextHolder] = message.useMessage()

  if (windowVisible !== visible) {
    setDataLoading(false)
    setWindowVisible(visible)
  }

  const fetchData = async (teamId: number, like: string | null, pageNum: number = 1, pageSize: number = 5) => {
    const teamMemberData = await RequestUtils.getTeamMemberDetails(teamId, like, pageNum, pageSize)
    if (teamMemberData.status === 200 && teamMemberData.data.success) {
      const teamMembers = teamMemberData.data.data
      setData(teamMembers)
    } else {
      setData(defaultData)
    }
  }

  useEffect(() => {
    if (!dataLoading) {
      setDataLoading(true)
      setErrorVisible(false)
      fetchData(teamId, searchText)
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

  const handleTeamMemberFormWindowOk = () => {
    setTeamMemberFormWindowVisible(false)
    fetchData(teamId, searchText)
  }

  const handleTeamMemberFormWindowCancel = () => {
    setTeamMemberFormWindowVisible(false)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePageChange = (current: number, size?: number) => {
    fetchData(teamId, searchText, current)
  }

  const handleSearch = () => {
    fetchData(teamId, searchText)
  }

  const handleAddTeamMember = () => {
    setTeamMemberFormWindowVisible(true)
    setTeamMember(defaultTeamMember)
  }

  const handleDeleteTeamMember = (teamMember: SingleTeamMemberType) => {
    setErrorVisible(false)
    setErrorMessage('')
    const confirmModal = Modal.confirm({
      centered: true,
      title: intl.formatMessage({ id: 'workspace.header.team-member-window.confirm-delete-title' }),
      content: intl.formatMessage({ id: 'workspace.header.team-member-window.confirm-delete-content' }),
      onOk: async () => {
        const responseData = await RequestUtils.deleteTeamMember(teamMember.teamId, teamMember.customerId)
        if (responseData.status === 200 && responseData.data.success) {
          fetchData(teamId, searchText)
          messageApi.open({
            type: 'success',
            content: intl.formatMessage({ id: 'workspace.header.team-member-window.delete-success-message' }),
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
      },
    })
  }
  const columns: ProColumns<SingleTeamMemberType>[] = [
    {
      title: <FormattedMessage id="workspace.header.team-member-window.column-team-id" />,
      dataIndex: 'teamId',
      valueType: 'digit',
      key: 'teamId',
      hideInSearch: true,
      hideInTable: true,
      hideInForm: true,
    },
    {
      title: <FormattedMessage id="workspace.header.team-member-window.column-customer-id" />,
      dataIndex: 'customerId',
      valueType: 'digit',
      key: 'customerId',
      hideInSearch: true,
      hideInTable: true,
      hideInForm: true,
    },
    {
      title: <FormattedMessage id="workspace.header.team-member-window.column-customer-name" />,
      dataIndex: 'customerName',
      key: 'customerName',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="workspace.header.team-member-window.column-customer-email" />,
      dataIndex: 'customerEmail',
      valueType: 'text',
      key: 'customerEmail',
    },
    {
      title: <FormattedMessage id="workspace.header.team-member-window.operation" />,
      key: 'action',
      valueType: 'option',
      render: (text: any, record: SingleTeamMemberType) => [
        <Tooltip
          key="deleteButton"
          title={intl.formatMessage({ id: 'workspace.header.team-member-window.button-tooltip-delete' })}
        >
          <Button
            icon={<DeleteFilled />}
            onClick={() => {
              handleDeleteTeamMember(record)
            }}
          />
        </Tooltip>,
      ],
    },
  ]

  return (
    <div>
      {contextHolder}
      <Modal
        title={<FormattedMessage id="workspace.header.team-member-window.window-title" />}
        width={800}
        centered
        open={visible}
        onOk={onOk}
        onCancel={onCancel}
        maskClosable={false}
      >
        <div style={{ width: '100%', height: '440px' }}>
          <div style={{ width: '100%', height: '400px' }}>
            <ProTable
              columns={columns}
              dataSource={data.records}
              rowKey="id"
              //loading={teamMemberListLoading}
              search={false}
              pagination={false}
              options={{
                density: false,
                fullScreen: false,
                reload: false,
                setting: false,
              }}
              title={() => [
                <Row key="searchRow">
                  <Col span={18}>
                    <Input
                      key="searchInput"
                      placeholder={intl.formatMessage({ id: 'workspace.header.team-member-window.search-placeholder' })}
                      style={{ width: '360px', marginLeft: '16px' }}
                      onChange={(e) => {
                        setSearchText(e.target.value)
                      }}
                    />
                    <Button key="searchButton" type="primary" style={{ marginLeft: '24px' }} onClick={handleSearch}>
                      <FormattedMessage id="workspace.header.team-member-window.button-search" />
                    </Button>
                  </Col>
                  <Col span={6}>
                    <Button
                      key="addButton"
                      type="primary"
                      icon={<PlusOutlined />}
                      style={{ position: 'absolute', right: '16px' }}
                      onClick={handleAddTeamMember}
                    >
                      <FormattedMessage id="workspace.header.team-member-window.button-add" />
                    </Button>
                  </Col>
                </Row>,
              ]}
              headerTitle={false}
              toolBarRender={false}
            />
            <div style={{ width: '100%', height: '64px' }}>
              <Pagination
                className="list-page"
                style={{ float: 'right', margin: '16px' }}
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
        <TeamMemberFormWindow
          onWindowOk={handleTeamMemberFormWindowOk}
          onWindowCancel={handleTeamMemberFormWindowCancel}
          visible={teamMemberFormWindowVisible}
          teamId={teamId}
          teamName={teamName}
          customerId={customerId}
        />
      </Modal>
    </div>
  )
}

export default TeamMemberWindowPage
