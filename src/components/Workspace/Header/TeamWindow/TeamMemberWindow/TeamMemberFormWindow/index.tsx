import { RequestUtils } from '@/components/Workspace/Utils'
import { Alert, Form, Input, message, Modal } from 'antd'
import { FC, useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'umi'

interface TeamMemberWindowProps {
  visible: boolean
  customerId: number
  teamId: number
  teamName: string
  onWindowCancel: () => void
  onWindowOk: () => void
}

const TeamMemberWindowPage: FC<TeamMemberWindowProps> = ({
  visible,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  customerId,
  teamId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  teamName,
  onWindowCancel,
  onWindowOk,
}) => {
  const intl = useIntl()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [messageApi, contextHolder] = message.useMessage()
  //const [forceUpdate, setForceUpdate, ] = useState<boolean>(false)
  const [dataLoading, setDataLoading] = useState<boolean>(false)
  const [teamForm] = Form.useForm()
  const [errorVisible, setErrorVisible] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    if (!dataLoading) {
      setDataLoading(true)
    }
  })

  const onOk = () => {
    teamForm.submit()
  }

  const onCancel = () => {
    if (onWindowCancel) {
      onWindowCancel()
    }
  }

  const onFinish = async (values: any) => {
    console.log('Receive values:', values)
    const { customerName } = values
    setErrorVisible(false)
    setErrorMessage('')
    let teamData = await RequestUtils.addTeamMember(teamId, customerName)
    if (teamData.status === 200 && teamData.data.success) {
      const team = teamData.data.data
      console.log(team)
      if (onWindowOk) {
        onWindowOk()
      }
    } else if (teamData.status === 200) {
      setErrorVisible(true)
      setErrorMessage(teamData.data.message)
    } else {
      setErrorVisible(true)
      setErrorMessage('System error happened')
    }
  }

  return (
    <div>
      {contextHolder}
      <Modal
        title={<FormattedMessage id="workspace.header.team-member-form-window.window-title" />}
        centered
        open={visible}
        onOk={onOk}
        onCancel={onCancel}
        maskClosable={false}
      >
        <div style={{ paddingTop: '8px' }}>
          <Form
            name="TeamMemberWindow"
            form={teamForm}
            className="team-member"
            onFinish={onFinish}
            style={{ maxWidth: '100%' }}
            layout="vertical"
            // labelAlign='right'
          >
            <Form.Item label="teamId" name="teamId" hidden>
              <Input />
            </Form.Item>
            <Form.Item label="customerId" name="customerId" hidden>
              <Input />
            </Form.Item>
            <Form.Item
              name="customerName"
              label={intl.formatMessage({ id: 'workspace.header.team-member-form-window.customer-name' })}
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="workspace.header.team-member-window.team-name-message" />,
                },
              ]}
              style={{ marginBottom: '4px', width: '100%' }}
            >
              <Input
                //prefix={false}
                placeholder={intl.formatMessage({
                  id: 'workspace.header.team-member-form-window.customer-name-placeholder',
                })}
                size="small"
                style={{ width: '100%' }}
              />
            </Form.Item>

            {errorVisible && <Alert message={errorMessage} type="error" closable />}
          </Form>
        </div>
      </Modal>
    </div>
  )
}

export default TeamMemberWindowPage
