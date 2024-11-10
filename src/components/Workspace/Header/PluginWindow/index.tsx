import { DeleteFilled, EditFilled, TeamOutlined } from '@ant-design/icons'
import { ProColumns, ProTable } from '@ant-design/pro-components'
import { Button, Col, Input, message, Modal, Pagination, Row, Tooltip } from 'antd'
import { FC, useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'umi'
import { RequestUtils } from '../../Utils'

interface PluginWindowProps {
  visible: boolean
  x: number
  y: number
  onWindowCancel: () => void
  onWindowOk: () => void
}

interface SinglePluginType {
  pluginId: number
  customerId: number
  pluginName: string
  createBy: number
  createTime: number
  updateBy: number
  updateTime: number
}

interface PluginsType {
  records: SinglePluginType[]
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
const defaultPlugin = {
  pluginId: 0,
  pluginName: '',
  customerId: 0,
  createBy: 0,
  createTime: 0,
  updateBy: 0,
  updateTime: 0,
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PluginWindowPage: FC<PluginWindowProps> = ({ visible, x, y, onWindowCancel, onWindowOk }) => {
  const [dataLoading, setDataLoading] = useState<boolean>(false)
  const [windowVisible, setWindowVisible] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorVisible, setErrorVisible] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [data, setData] = useState<PluginsType>(defaultData)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [plugin, setPlugin] = useState<SinglePluginType>(defaultPlugin)
  const [searchText, setSearchText] = useState<string>('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isUpdate, setIsUpdate] = useState<boolean>(false)

  const intl = useIntl()
  const [messageApi, contextHolder] = message.useMessage()

  if (windowVisible !== visible) {
    setDataLoading(false)
    setWindowVisible(visible)
  }

  const fetchData = async (pluginName: string | null, pageNum: number = 1, pageSize: number = 5) => {
    const pluginData = await RequestUtils.getTeams(pluginName, pageNum, pageSize)
    if (pluginData.status === 200 && pluginData.data.success) {
      const plugins = pluginData.data.data
      setData(plugins)
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePageChange = (current: number, size?: number) => {
    fetchData(searchText, current)
  }

  const handleSearch = () => {
    fetchData(searchText)
  }

  const handleDeletePlugin = (plugin: SinglePluginType) => {
    setErrorVisible(false)
    setErrorMessage('')
    const confirmModal = Modal.confirm({
      centered: true,
      title: intl.formatMessage({ id: 'workspace.header.plugin-window.confirm-delete-title' }),
      content: intl.formatMessage({ id: 'workspace.header.plugin-window.confirm-delete-content' }),
      onOk: async () => {
        const responseData = await RequestUtils.deleteTeam(plugin.pluginId)
        if (responseData.status === 200 && responseData.data.success) {
          fetchData(searchText)
          messageApi.open({
            type: 'success',
            content: intl.formatMessage({ id: 'workspace.header.plugin-window.delete-success-message' }),
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
  const columns: ProColumns<SinglePluginType>[] = [
    {
      title: <FormattedMessage id="workspace.header.plugin-window.column-plugin-id" />,
      dataIndex: 'pluginId',
      valueType: 'digit',
      key: 'pluginId',
      hideInSearch: true,
      hideInTable: true,
      hideInForm: true,
    },
    {
      title: <FormattedMessage id="workspace.header.plugin-window.column-plugin-name" />,
      dataIndex: 'pluginName',
      key: 'pluginName',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="workspace.header.plugin-window.operation" />,
      key: 'action',
      valueType: 'option',
      render: (text: any, record: SinglePluginType) => [
        <Tooltip key="editButton" title={intl.formatMessage({ id: 'workspace.header.plugin-window.button-tooltip-edit-member' })}>
          <Button icon={<TeamOutlined />} onClick={() => {}} />
        </Tooltip>,
        <Tooltip key="editMemberButton" title={intl.formatMessage({ id: 'workspace.header.plugin-window.button-tooltip-edit' })}>
          <Button icon={<EditFilled />} onClick={() => {}} />
        </Tooltip>,
        <Tooltip key="deleteButton" title={intl.formatMessage({ id: 'workspace.header.plugin-window.button-tooltip-delete' })}>
          <Button
            icon={<DeleteFilled />}
            onClick={() => {
              handleDeletePlugin(record)
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
        title={<FormattedMessage id="workspace.header.plugin-window.title" />}
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
              //loading={pluginListLoading}
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
                      placeholder={intl.formatMessage({ id: 'workspace.header.plugin-window.search-placeholder' })}
                      style={{ width: '360px', marginLeft: '16px' }}
                      onChange={(e) => {
                        setSearchText(e.target.value)
                      }}
                    />
                    <Button key="searchButton" type="primary" style={{ marginLeft: '24px' }} onClick={handleSearch}>
                      <FormattedMessage id="workspace.header.plugin-window.button-search" />
                    </Button>
                  </Col>
                  <Col span={6}>
                    <Button key="addButton" type="primary" style={{ position: 'absolute', right: '16px' }}>
                      <FormattedMessage id="workspace.header.plugin-window.button-add" />
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
      </Modal>
    </div>
  )
}

export default PluginWindowPage
