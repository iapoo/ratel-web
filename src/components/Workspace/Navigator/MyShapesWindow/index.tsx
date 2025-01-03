import { EditorUtils } from '@/components/Workspace/Utils/EditorUtils'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import {
  Alert,
  Button,
  Card,
  Divider,
  Flex,
  Form,
  GetProp,
  Input,
  message,
  Modal,
  Tooltip,
  Upload,
  UploadProps,
} from 'antd'
import { RcFile, UploadChangeParam } from 'antd/es/upload'
import { MyShape } from '@ratel-web/editor/Items'
import { FC, useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'umi'
import { RequestUtils, Utils } from '../../Utils'
import { MyShapes } from '../../Utils/RequestUtils'

interface MyShapesWindowProps {
  visible: boolean
  onWindowCancel: () => void
  onWindowOk: () => void
  onMyShapesChanged: () => void
}

const MyShapesWindowPage: FC<MyShapesWindowProps> = ({ visible, onWindowCancel, onWindowOk, onMyShapesChanged }) => {
  const intl = useIntl()
  const [dataLoading, setDataLoading] = useState<boolean>(false)
  const [windowVisible, setWindowVisible] = useState<boolean>(false)
  const [renameErrorVisible, setRenameErrorVisible] = useState<boolean>(false)
  const [myShapes, setMyShapes] = useState<MyShape[]>([])
  const [renameModalVisible, setRenameModalVisible] = useState<boolean>(false)
  const [renameMyShapeForm] = Form.useForm()
  const [renameErrorMessage, setRenameErrorMessage] = useState<string>('')

  const { confirm } = Modal

  if (windowVisible !== visible) {
    setDataLoading(false)
    setWindowVisible(visible)
  }

  useEffect(() => {
    if (!dataLoading) {
      setDataLoading(true)
      setRenameErrorVisible(false)
      const fetchData = async () => {
        const settingsData = await RequestUtils.getSettings()
        if (settingsData.status === 200 && settingsData.data.success) {
          const data = settingsData.data.data.settings
          const newMyShapes: MyShapes = data ? JSON.parse(data) : { shapes: [] }
          if (newMyShapes) {
            setMyShapes(newMyShapes.shapes)
          } else {
            setMyShapes([])
          }
        } else {
          setMyShapes([])
        }
      }
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

  // const onFinish = (values: any) => {
  //   if (onWindowOk) {
  //     onWindowOk()
  //   }
  // }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleMyShapeRename = (id: string, name: string, image: string) => {
    setRenameModalVisible(true)
    renameMyShapeForm.setFieldValue('id', id)
    renameMyShapeForm.setFieldValue('name', name)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDeleteMyShapes = async (id: string, name: string, image: string) => {
    const count = myShapes.length
    for (let i = count - 1; i >= 0; i--) {
      const myShape = myShapes[i]
      if (myShape.id === id) {
        myShapes.splice(i, 1)
      }
    }
    const newMyShapes: MyShapes = { shapes: myShapes }
    const newMyShapesInfo = JSON.stringify(newMyShapes)
    const updateSettingsData = await RequestUtils.updateSettings(newMyShapesInfo)
    if (updateSettingsData.status === 200 && updateSettingsData.data.success) {
      console.log(`Succeed to update settings`)
      setRenameErrorMessage('')
      setRenameErrorVisible(false)
      setRenameModalVisible(false)
    } else if (updateSettingsData.status === 200) {
      setRenameErrorMessage(
        `${intl.formatMessage({ id: 'workspace.navigator.my-shapes.message-fail-to-delete' })}: ${updateSettingsData.data.message}`,
      )
      setRenameErrorVisible(true)
      console.log(`Fail to update settings`)
    } else {
      setRenameErrorMessage(intl.formatMessage({ id: 'workspace.navigator.my-shapes.message-fail-to-delete' }))
      setRenameErrorVisible(true)
      console.log(`Fail to update settings`)
    }
    if (onMyShapesChanged) {
      onMyShapesChanged()
    }
  }

  const handleMyShapeDelete = async (id: string, name: string, image: string) => {
    confirm({
      icon: <DeleteOutlined />,
      content: intl.formatMessage({ id: 'workspace.navigator.my-shapes.message-confirm-if-delete-shape' }),
      onOk() {
        handleDeleteMyShapes(id, name, image)
      },
      onCancel() {},
    })
  }

  const onRenameOk = () => {
    renameMyShapeForm.submit()
  }

  const onRenameCancel = () => {
    setRenameModalVisible(false)
  }

  const onRenameMyShapeFormFinish = async (values: any) => {
    console.log('Receive values:', values)
    const { id, name } = values
    setRenameErrorVisible(false)
    setRenameErrorMessage('')
    myShapes.forEach((myShape) => {
      if (myShape.id === id) {
        myShape.name = name
      }
    })
    const newMyShapes: MyShapes = { shapes: myShapes }
    const newMyShapesInfo = JSON.stringify(newMyShapes)
    const updateSettingsData = await RequestUtils.updateSettings(newMyShapesInfo)
    if (updateSettingsData.status === 200 && updateSettingsData.data.success) {
      console.log(`Succeed to update settings`)
      setRenameErrorMessage('')
      setRenameErrorVisible(false)
      setRenameModalVisible(false)
    } else if (updateSettingsData.status === 200) {
      setRenameErrorMessage(
        `${intl.formatMessage({ id: 'workspace.navigator.my-shapes.message-fail-to-rename' })}: ${updateSettingsData.data.message}`,
      )
      setRenameErrorVisible(true)
      console.log(`Fail to update settings`)
    } else {
      setRenameErrorMessage(intl.formatMessage({ id: 'workspace.navigator.my-shapes.message-fail-to-rename' }))
      setRenameErrorVisible(true)
      console.log(`Fail to update settings`)
    }
    if (onMyShapesChanged) {
      onMyShapesChanged()
    }
  }

  const myShapeItems = myShapes.map((myShape) => {
    const size = 64
    const width = myShape.width > myShape.height ? size : Math.round((size * myShape.width) / myShape.height)
    const height = myShape.height > myShape.width ? size : Math.round((size * myShape.height) / myShape.width)

    return (
      // eslint-disable-next-line react/jsx-key
      <Tooltip title={myShape.name}>
        <Card
          size="small"
          title={
            <div
              style={{ width: 48, fontSize: 11, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {myShape.name}
            </div>
          }
          hoverable
          extra={
            <div>
              <Tooltip title="Rename">
                <EditOutlined onClick={() => handleMyShapeRename(myShape.id, myShape.name, myShape.image)} />
              </Tooltip>
              <Tooltip title="Delete">
                <DeleteOutlined
                  style={{ marginLeft: 8 }}
                  onClick={() => handleMyShapeDelete(myShape.id, myShape.name, myShape.image)}
                />
              </Tooltip>
            </div>
          }
        >
          <div style={{ width: size, height: size, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={`${myShape.image}`} width={width} height={height} alt={myShape.name} />
          </div>
        </Card>
      </Tooltip>
    )
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSVGBeforeUpload = (file: RcFile, FileList: RcFile[]) => {
    const isSVG = file.type === 'image/svg+xml'
    if (!isSVG) {
      message.error(
        `${file.name} ${intl.formatMessage({ id: 'workspace.navigator.my-shapes.message-upload-is-not-svg-file' })}`,
      )
    }
    const isLessThan256k = file.size < 256 * 1024
    if (!isLessThan256k) {
      message.error(
        `${file.name} ${intl.formatMessage({ id: 'workspace.navigator.my-shapes.message-must-be-smaller-than' })}`,
      )
    }
    return (isSVG && isLessThan256k) || Upload.LIST_IGNORE
  }

  type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

  const getSvgFromFile = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result as string))
    reader.readAsDataURL(img)
  }

  const getImageBase64FromFile = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result as string))
    reader.readAsDataURL(img)
  }

  const handleSvgUploadOnChange = (info: UploadChangeParam) => {
    // console.log(info.fileList);
    if (info.file.status === 'done') {
      getSvgFromFile(info.file.originFileObj as FileType, (url) => {
        // console.log(`image data = ${url}`)
        let imageWidth = 64
        let imageHeight = 64
        const image = new Image()
        image.onload = () => {
          imageWidth = image.width
          imageHeight = image.height
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          handleSvgDetail(url, imageWidth, imageHeight)
        }
        image.src = url
      })
    }
  }

  const handleSvgDetail = async (imageData: string, imageWidth: number, imageHeight: number) => {
    if (Utils.currentEditor) {
      await EditorUtils.addSvgToMyShapes(imageData, myShapes, onMyShapesChanged, imageWidth, imageHeight)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleImageBeforeUpload = (file: RcFile, FileList: RcFile[]) => {
    const isImage = file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg'
    if (!isImage) {
      message.error(
        `${file.name} ${intl.formatMessage({ id: 'workspace.navigator.my-shapes.message-upload-is-not-png-jpg-file' })}`,
      )
    }
    const isLessThan256k = file.size < 256 * 1024
    if (!isLessThan256k) {
      message.error(
        `${file.name} ${intl.formatMessage({ id: 'workspace.navigator.my-shapes.message-upload-must-be-smaller-than' })}`,
      )
    }
    return (isImage && isLessThan256k) || Upload.LIST_IGNORE
  }

  const handleImageDetail = async (imageData: string, imageWidth: number, imageHeight: number) => {
    if (Utils.currentEditor) {
      await EditorUtils.addImageToMyShapes(imageData, imageData, myShapes, onMyShapesChanged, imageWidth, imageHeight)
    }
  }

  const handleImageUploadOnChange = (info: UploadChangeParam) => {
    if (info.file.status === 'done') {
      getImageBase64FromFile(info.file.originFileObj as FileType, (url) => {
        // console.log(`image data = ${url}`)
        let imageWidth = 64
        let imageHeight = 64
        const image = new Image()
        image.onload = () => {
          imageWidth = image.width
          imageHeight = image.height
          handleImageDetail(url, imageWidth, imageHeight)
        }
        image.src = url
      })
    }
  }

  return (
    <div>
      <Modal
        title={intl.formatMessage({ id: 'workspace.navigator.my-shapes.my-shapes' })}
        centered
        open={visible}
        onOk={onOk}
        onCancel={onCancel}
        maskClosable={false}
        footer={
          <Flex gap="small" justify="space-between">
            <Flex gap="small">
              <Tooltip title={intl.formatMessage({ id: 'workspace.navigator.my-shapes.tooltip-svg-import' })}>
                <Upload
                  showUploadList={false}
                  maxCount={1}
                  accept="image/svg+xml"
                  beforeUpload={handleSVGBeforeUpload}
                  onChange={handleSvgUploadOnChange}
                >
                  <Button type="default">
                    <FormattedMessage id="workspace.navigator.my-shapes.svg-import" />
                  </Button>
                </Upload>
              </Tooltip>
              <Tooltip title={intl.formatMessage({ id: 'workspace.navigator.my-shapes.tooltip-image-import' })}>
                <Upload
                  showUploadList={false}
                  maxCount={1}
                  accept="image/png, image/jpeg"
                  beforeUpload={handleImageBeforeUpload}
                  onChange={handleImageUploadOnChange}
                >
                  <Button type="default">
                    <FormattedMessage id="workspace.navigator.my-shapes.image-import" />
                  </Button>
                </Upload>
              </Tooltip>
            </Flex>
            <Button key="submit" type="primary" onClick={onOk}>
              <FormattedMessage id="workspace.navigator.my-shapes.close" />
            </Button>
          </Flex>
        }
        width={640}
      >
        <Divider style={{ margin: 8 }} />
        <div style={{ width: 610, height: 400, overflow: 'auto', scrollbarWidth: 'thin' }}>
          <Flex gap="small" justify="start" align="flex-start" wrap="wrap" style={{ width: '100%' }}>
            {myShapeItems}
          </Flex>
        </div>
        <Divider style={{ margin: 4 }} />
      </Modal>
      <Modal
        title={intl.formatMessage({ id: 'workspace.navigator.my-shapes.rename' })}
        centered
        open={renameModalVisible}
        onOk={onRenameOk}
        onCancel={onRenameCancel}
        maskClosable={false}
      >
        <Form
          name="renameMyShapeForm"
          form={renameMyShapeForm}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onRenameMyShapeFormFinish}
          autoComplete="off"
        >
          <Form.Item hidden label="id" name="id">
            <Input />
          </Form.Item>
          <Form.Item
            label="name"
            name="name"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'workspace.navigator.my-shapes.place-holder-name' }),
              },
            ]}
          >
            <Input />
          </Form.Item>
          {renameErrorVisible ? <Alert message={renameErrorMessage} type="error" showIcon /> : ''}
        </Form>
      </Modal>
    </div>
  )
}

export default MyShapesWindowPage
