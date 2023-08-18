import React, { FC, useEffect, useState, useRef } from 'react'
import styles from './index.css'
import { Form, Input, Checkbox, Tree, Row, Col, Button, Modal, Menu, message, Alert, Space, } from 'antd'
import { RequestUtils, Utils, } from '../../Utils'
import axios from 'axios'
import Avatar from 'antd/lib/avatar/avatar'
import { Document, Folder } from '../../Utils/RequestUtils'
import type { DataNode, TreeProps, } from 'antd/es/tree';
import { FileFilled, FileOutlined, FolderFilled, FolderOutlined } from '@ant-design/icons'


interface OpenFileWindowProps {
  visible: boolean;
  x: number;
  y: number;
  onWindowCancel: () => void;
  onWindowOk: (documentId: number) => void
}

const FOLDER = 'FOLDER_'
const DOC = "DOC_"

const treeData2: DataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            disableCheckbox: true,
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ title: <span style={{ color: '#1677ff' }}>sss</span>, key: '0-0-1-0' }],
      },
    ],
  },
];

const OpenFileWindowPage: FC<OpenFileWindowProps> = ({
  visible, x, y, onWindowCancel, onWindowOk,
}) => {
  const [dataLoading, setDataLoading,] = useState<boolean>(false)
  const [modalX, setModalX,] = useState<number>(0)
  const [modalY, setModalY,] = useState<number>(0)
  const [origModalX, setOrigModalX,] = useState<number>(0)
  const [origModalY, setOrigModalY,] = useState<number>(0)
  const [windowVisible, setWindowVisible,] = useState<boolean>(false)
  const draggleRef = useRef<HTMLDivElement>(null);
  const [addFolderForm,] = Form.useForm()
  const [errorVisible, setErrorVisible,] = useState<boolean>(false)
  const [errorMessage, setErrorMessage, ] = useState<string>('')
  const [folders, setFolders] = useState<Folder[]>([])
  const [treeData, setTreeData,] = useState<DataNode[]>([])
  const [treeMap, setTreeMap,] = useState<Map<string, Folder | Document>>()
  const [addFolderWindowVisible, setAddFolderWindowVisible,] = useState<boolean>(false)
  const [selectedFolderKey, setSelectedFolderKey,] = useState<string>('')

  if (origModalX != x) {
    setOrigModalX(x)
    setModalX(x)
  }

  if (origModalY != y) {
    setOrigModalY(y)
    setModalY(y)
  }

  if (windowVisible != visible) {
    setDataLoading(false)
    setWindowVisible(visible)
  }


  useEffect(() => {
    if (!dataLoading) {
      setDataLoading(true)
      setErrorVisible(false)
      fetchData()
    }
  })

  const fetchData = async () => {
    let nodeMap: Map<string, Folder | Document> = new Map<string, Folder | Document>()
    let nodes: DataNode[] = []
    await fetchFolder(nodeMap, nodes, null)
    await fetchDocument(nodeMap, nodes, null)
    setTreeData(nodes)
    setTreeMap(nodeMap)
  }

  const fetchFolder = async (nodeMap: Map<string, Folder | Document>, nodes: DataNode[], parentId: number | null) => {
    const folderData = await RequestUtils.getFolders(parentId)
    if (folderData?.data?.success && folderData?.data?.data) {
      let records = folderData.data.data.records
      let count = records.length
      for (let i = 0; i < count; i++) {
        let record = records[i]
        let key = FOLDER + record.folderId
        let dataNode: DataNode = {
          key: key,
          title: record.folderName,
          icon: <FolderOutlined/>,
          children: []
        }
        let folder: Folder = {
          folderId: record.folderId,
          folderName: record.folderName,
          parentId: record.parentId,
          data: dataNode
        }
        nodes.push(dataNode)
        nodeMap.set(key, folder)
        console.log(`fetch Folder: parentId = ${parentId} folderId = ${key}`)
        await fetchFolder(nodeMap, dataNode.children!, folder.folderId)
        await fetchDocument(nodeMap, dataNode.children!, folder.folderId)
      }
    }
  }

  const fetchDocument = async (nodeMap: Map<string, Folder | Document>, nodes: DataNode[], folderId: number | null) => {
    const folderData = await RequestUtils.getDocuments(folderId)
    if (folderData?.data?.success && folderData?.data?.data) {
      folderData.data.data.records?.forEach((record: any) => {
        let document: Document = {
          folderId: record.folderId,
          documentId: record.documentId,
          documentName: record.documentName,
          content: record.content
        }
        let key = DOC + record.documentId
        let dataNode: DataNode = {
          key: key,
          title: record.documentName,
          icon: <FileOutlined/>,
          children: []
        }
        nodes.push(dataNode)
        nodeMap.set(key, document)
        console.log(`fetch Document: folderId = ${folderId} documentId = ${key}`)
      })
    }
  }

  const onOk = () => {
    //addFolderForm.submit()
    if(selectedFolderKey?.length > 0) {
      if(selectedFolderKey.startsWith(DOC)) {
        let documentId = Number(selectedFolderKey.substring(DOC.length))
        if(onWindowOk) {
          onWindowOk(documentId)
        }
      }
    }
  }

  const onCancel = () => {
    if (onWindowCancel) {
      onWindowCancel()
    }
  }

  const openAddFolder = () => {
    setAddFolderWindowVisible(true)
    setErrorVisible(false)
    setErrorMessage('')
  }
  const confirmAddFolder = () => {
    addFolderForm.submit()
  }

  const cancelAddFolder = () => {
    setAddFolderWindowVisible(false)

  }

  const onFolderSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
    if(selectedKeys.length > 0) {
      setSelectedFolderKey(selectedKeys[0].toString())
    } else {
      setSelectedFolderKey("");
    }
  };

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };

  const onFormFinish = (values: any) => {
    console.log('Receive values:', values)
    const { folderName } = values
    let parentId: number | null = null
    setErrorVisible(false)
    setErrorMessage('')
    if (selectedFolderKey?.startsWith(FOLDER)) {
      parentId = parseInt(selectedFolderKey.substring(7))
    } else if (selectedFolderKey?.startsWith(DOC)) {
      parentId = parseInt(selectedFolderKey.substring(4))
    }
    const fetchFolderData = async () => {
      const folderData = await RequestUtils.addFolder(folderName, parentId)
      if (folderData.data?.success) {
        console.log('Add folder wwith data: ', folderData.data.message)
        setErrorMessage('')
        setErrorVisible(false)     
        setAddFolderWindowVisible(false)   
        fetchData()
      } else {
        console.log('Add folder with error: ', folderData.data)
        setErrorMessage(`Add folder with error: ${folderData.data.message}`)
        setErrorVisible(true)        
      }
    }
    fetchFolderData()
  }
  return (
    <div>
      <Modal title="Open File" centered open={visible} onOk={onOk} onCancel={onCancel} maskClosable={false}  >
        <div style={{ width: '100%', height: '480px' }}>
          <Space wrap>
            <Button onClick={openAddFolder}>Add Folder</Button>
            <Button>Delete Folder</Button>
          </Space>
          <Tree style={{ width: '100%', height: '100%', overflow: 'scroll', margin: '8px' }}
            height={420}
            showLine showIcon
            //checkable
            selectable
            //defaultExpandedKeys={['0-0-0', '0-0-1']}
            //defaultSelectedKeys={['0-0-0', '0-0-1']}
            //defaultCheckedKeys={['0-0-0', '0-0-1']}
            onSelect={onFolderSelect}
            //onCheck={onCheck}
            treeData={treeData}
          />
        </div>
      </Modal>
      <Modal title="Modal" centered open={addFolderWindowVisible} onOk={confirmAddFolder} onCancel={cancelAddFolder} okText="确认" cancelText="取消" >
        <Form name="addFolderForm" form={addFolderForm} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} initialValues={{ remember: true }}
          onFinish={onFormFinish} autoComplete="off">
          <Form.Item label="FolderName" name="folderName" rules={[{ required: true, message: 'Please input new folder name!' }]} >
            <Input />
          </Form.Item>
          {errorVisible ? <Alert message={errorMessage} type="error" showIcon/> : ''}          
          </Form>
      </Modal>
    </div>
  )
}

export default OpenFileWindowPage
