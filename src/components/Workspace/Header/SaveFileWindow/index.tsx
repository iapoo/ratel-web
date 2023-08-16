import React, { FC, useEffect, useState, useRef } from 'react'
import styles from './index.css'
import { Form, Input, Checkbox, Tree, Row, Col, Button, Modal, Menu, message, Alert, Space, } from 'antd'
import { RequestUtils, Utils, } from '../../Utils'
import axios from 'axios'
import Avatar from 'antd/lib/avatar/avatar'
import { Document, Folder } from '../../Utils/RequestUtils'
import type { DataNode, TreeProps, } from 'antd/es/tree';
import { StorageService } from '../../Storage'


interface SaveFileWindowProps {
  visible: boolean;
  x: number;
  y: number;
  documentName: string;
  onWindowCancel: () => void;
  onWindowOk: () => void
}

const FOLDER = 'FOLDER_'
const DOC = "DOC_"

const SaveFileWindowPage: FC<SaveFileWindowProps> = ({
  visible, x, y, documentName, onWindowCancel, onWindowOk,
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
  const [folders, setFolders] = useState<Folder[]>([])
  const [treeData, setTreeData,] = useState<DataNode[]>([])
  const [treeMap, setTreeMap,] = useState<Map<string, Folder | Document>>()
  const [addFolderWindowVisible, setAddFolderWindowVisible,] = useState<boolean>(false)
  const [selectedFolderKey, setSelectedFolderKey,] = useState<string>('')
  const [errorMessage, setErrorMessage, ] = useState<string>('')

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
      const fetchData = async () => {
        let nodeMap: Map<string, Folder | Document> = new Map<string, Folder | Document>()
        let nodes: DataNode[] = []
        await fetchFolder(nodeMap, nodes, null)
        await fetchDocument(nodeMap, nodes, null)
        setTreeData(nodes)
        setTreeMap(nodeMap)
      }
      fetchData()
    }
  })

  const fetchFolder = async (nodeMap: Map<string, Folder | Document>, nodes: DataNode[], parentId: number | null) => {
    const folderData = await RequestUtils.getFolders(parentId)
    if (folderData?.data?.success && folderData?.data?.data) {
      let records = folderData.data.data.records
      let count = records.length
      for (let i = 0; i < count; i++) {
        let record = records[i]
        let folder: Folder = {
          folderId: record.folderId,
          folderName: record.folderName,
          parentId: record.parentId
        }
        let key = FOLDER + record.folderId
        let dataNode: DataNode = {
          key: key,
          title: record.folderName,
          children: []
        }
        nodes.push(dataNode)
        nodeMap.set(key, folder)
        console.log(`fetch Folder: parentId = ${parentId} folderId = ${key}`)
        await fetchFolder(nodeMap, dataNode.children!, folder.folderId)
        await fetchDocument(nodeMap, dataNode.children!, folder.folderId)
      }
    }
  }

  const fetchDocument = async (nodeMap: Map<string, Folder | Document>, nodes: DataNode[], parentId: number | null) => {
    const folderData = await RequestUtils.getDocuments(parentId)
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
          children: []
        }
        nodes.push(dataNode)
        nodeMap.set(key, document)
        console.log(`fetch Document: folderId = ${parentId} documentId = ${key}`)
      })
    }
  }

  const onOk = () => {
    let folderId: number | null = null
    if (selectedFolderKey?.startsWith(FOLDER)) {
      folderId = parseInt(selectedFolderKey.substring(7))
    } else if (selectedFolderKey?.startsWith(DOC)) {
      folderId = parseInt(selectedFolderKey.substring(4))
    }

    const storage = new StorageService()
    storage.editors = Utils.editors
    storage.save()
    const documentData = storage.storageData
    const documentContent = JSON.stringify(documentData)
    console.log(documentContent)
    const saveDocumentData = async () => {
      const documentData = await RequestUtils.saveDocument(documentName, documentContent, folderId)
      if (documentData.data?.success && documentData?.data?.data) {
        console.log('Save document wwith data: ', documentData.data.data)
      } else {
        console.log('Save document with error: ', documentData.data)
        setErrorMessage(documentData.data.message)
        setErrorVisible(true)
      }
    }
    saveDocumentData()
  }

  const onCancel = () => {
    if (onWindowCancel) {
      onWindowCancel()
    }
  }

  const saveAddFolder = () => {
    setAddFolderWindowVisible(true)
  }
  const confirmAddFolder = () => {
    addFolderForm.submit()
  }

  const cancelAddFolder = () => {
    setAddFolderWindowVisible(false)
  }

  const onFolderSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
    setSelectedFolderKey(selectedKeys[0].toString())
  };

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };

  const onFormFinish = (values: any) => {
    console.log('Receive values:', values)
    const { folderName } = values
    let parentId: number | null = null
    setErrorVisible(false)
    if (selectedFolderKey?.startsWith(FOLDER)) {
      parentId = parseInt(selectedFolderKey.substring(7))
    } else if (selectedFolderKey?.startsWith(DOC)) {
      parentId = parseInt(selectedFolderKey.substring(4))
    }
    const fetchFolderData = async () => {
      const folderData = await RequestUtils.addFolder(folderName, parentId)
      if (folderData.data?.success && folderData?.data?.data) {
        console.log('Add folder wwith data: ', folderData.data.data)
      } else {
        console.log('Add folder with error: ', folderData.data)
        setErrorVisible(true)
      }
    }
    fetchFolderData()
  }
  return (
    <div>
      <Modal title="Save File" centered open={visible} onOk={onOk} onCancel={onCancel} maskClosable={false}  >
        <div style={{ width: '100%', height: '480px' }}>
          <Space wrap>
            <Button onClick={saveAddFolder}>Add Folder</Button>
            <Button>Delete Folder</Button>
          </Space>
          <Tree style={{ width: '100%', height: '100%', overflow: 'scroll' }}
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
        {errorVisible ? <Alert message={errorMessage} type="error" showIcon/> : ''}          
      </Modal>
      <Modal title="Modal" centered open={addFolderWindowVisible} onOk={confirmAddFolder} onCancel={cancelAddFolder} okText="确认" cancelText="取消" >
        <Form name="addFolderForm" form={addFolderForm} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} initialValues={{ remember: true }}
          onFinish={onFormFinish} autoComplete="off">
          <Form.Item label="FolderName" name="folderName" rules={[{ required: true, message: 'Please input new folder name!' }]} >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default SaveFileWindowPage
