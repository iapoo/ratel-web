import { RequestUtils } from '@/components/Workspace/Utils'
import { Alert, Form, Input, message, Modal } from 'antd'
// @ts-ignore
import CryptoJs from 'crypto-js'
import { FC, useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'umi'

interface TeamFormWindowProps {
  visible: boolean
  isUpdate: boolean
  customerId: number
  teamId: number
  teamName: string
  onWindowCancel: () => void
  onWindowOk: () => void
}

const TeamFormWindowPage: FC<TeamFormWindowProps> = ({
  visible,
  isUpdate,
  customerId,
  teamId,
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
    if (teamId !== teamForm.getFieldValue('teamId')) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      refreshTeam(teamId, teamName, customerId)
      //console.log(`team is reset to ${teamName}`)
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

  const refreshTeam = (teamId: number, teamName: string, customerId: number) => {
    teamForm.setFieldValue('teamId', teamId)
    teamForm.setFieldValue('teamName', teamName)
    teamForm.setFieldValue('customerId', customerId)
  }

  const onFinish = async (values: any) => {
    console.log('Receive values:', values)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { teamId, teamName, email, nickname, userPassword, userPasswordConfirmation } = values
    setErrorVisible(false)
    setErrorMessage('')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const teamPassword = CryptoJs.SHA512(userPassword).toString()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const teamConfirmPassword = CryptoJs.SHA512(userPasswordConfirmation).toString()
    if (isUpdate) {
      let teamData = await RequestUtils.updateTeam(teamId, teamName)
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
    } else {
      let teamData = await RequestUtils.addTeam(teamName)
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
  }

  return (
    <div>
      {contextHolder}
      <Modal
        title={<FormattedMessage id="workspace.header.team-form-window.window-title" />}
        centered
        open={visible}
        onOk={onOk}
        onCancel={onCancel}
        maskClosable={false}
      >
        <div style={{ paddingTop: '8px' }}>
          <Form
            name="TeamFormWindow"
            form={teamForm}
            className="team-form"
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
              name="teamName"
              label={intl.formatMessage({ id: 'workspace.header.team-form-window.team-name' })}
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="workspace.header.team-form-window.team-name-message" />,
                },
              ]}
              style={{ marginBottom: '4px', width: '100%' }}
            >
              <Input
                //prefix={false}
                placeholder={intl.formatMessage({ id: 'workspace.header.team-form-window.team-name-placeholder' })}
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

export default TeamFormWindowPage
