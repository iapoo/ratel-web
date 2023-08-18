import React, { FC, useEffect, useState, useRef } from 'react'
import styles from './index.css'
import { Form, Input, Checkbox, Tree, Row, Col, Button, Modal, Menu, message, Alert, Space, } from 'antd'
import { RequestUtils, SystemUtils, Utils, } from '../../Utils'
import axios from 'axios'
import Avatar from 'antd/lib/avatar/avatar'
import { Document, Folder, isDocument, isFolder } from '../../Utils/RequestUtils'
import type { DataNode, TreeProps, } from 'antd/es/tree';
import { StorageService } from '../../Storage'
import { FileOutlined, FolderOutlined } from '@ant-design/icons'


interface SaveFileWindowProps {
  visible: boolean;
  x: number;
  y: number;
  selectedFolderId: number | null;
  selectedDocumentId: number | null;
  selectedDocumentName: string;
  onWindowCancel: () => void;
  onWindowOk: () => void
}

const FOLDER = 'FOLDER_'
const DOC = "DOC_"

const SaveFileWindowPage: FC<SaveFileWindowProps> = ({
  visible, x, y, selectedFolderId, selectedDocumentId, selectedDocumentName, onWindowCancel, onWindowOk,
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
  const [confirmOverwriteWindowVisible, setConfirmOverwriteWindowVisible] = useState<boolean>(false)
  const [confirmOverwriteInFolder, setConfirmOverwriteInFolder, ] = useState<boolean>(true)
  const [confirmOverwriteFolderId, setConfirmOverwriteFolderId, ] = useState<number|null>(null)
  const [confirmOverwriteDocumentId, setConfirmOverwriteDocumentId, ] = useState<number>(0)
  const [confirmOverwriteDocumentName, setConfirmOverwriteDocumentName, ] = useState<string>('')

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
          icon: <FileOutlined/>,
          selectable: false,
          disabled: true,
          children: []
        }
        nodes.push(dataNode)
        nodeMap.set(key, document)
        console.log(`fetch Document: folderId = ${parentId} documentId = ${key}`)
      })
    }
  }

  const handleSaveFile = () => {
    let folderId: number | null = null
    let documentId: number | null = null
    let saveInFolder = true
    if (selectedFolderKey?.startsWith(FOLDER)) {
      folderId = parseInt(selectedFolderKey.substring(7))     
      setConfirmOverwriteFolderId(folderId) 
    } else if (selectedFolderKey?.startsWith(DOC)) {
      documentId = parseInt(selectedFolderKey.substring(4))
      setConfirmOverwriteDocumentId(documentId)
      saveInFolder = false      
    } else {
      SystemUtils.handleInternalError(`Unknow error occurs here with selectedFolderKey=${selectedFolderKey}`)
      return
    }

    if(saveInFolder) {
      let folderMap = treeMap?.get(selectedFolderKey);
      let hasDocumentName = false
      let currentDocumentId : number = 0
      let currentDocumentName: string = ''
      if(isFolder(folderMap)) {
        folderMap.data.children?.forEach(child => {
          if(child.title == selectedDocumentName) {
            hasDocumentName = true
            let document =  treeMap?.get('' + child.key)
            if(isDocument(document)) {
              currentDocumentId = document.documentId
              currentDocumentName = document.documentName
            }
          }
        })
      }
      if(selectedDocumentId == null) {
        if(hasDocumentName) {
          setConfirmOverwriteWindowVisible(true)
          setConfirmOverwriteInFolder(true)
          setConfirmOverwriteDocumentId(currentDocumentId)
          setConfirmOverwriteDocumentName(currentDocumentName)
        } else {
          doSaveFile(folderId, false, 0, '')
        }
      } else {
        if(hasDocumentName) {
          setConfirmOverwriteWindowVisible(true)
          setConfirmOverwriteInFolder(true)
          setConfirmOverwriteDocumentId(currentDocumentId)
          setConfirmOverwriteDocumentName(currentDocumentName)
        } else {
          doSaveFile(folderId, false, 0, '')
        }
      }
    } else {
     let documentData = treeMap?.get('' + documentId); 
     if(isDocument(documentData)) {
      if(selectedDocumentName == documentData.documentName && selectedDocumentId == documentData.documentId) {
        doSaveFile(folderId, true, documentData.documentId, documentData.documentName)
      } else {
        setConfirmOverwriteWindowVisible(true)
        setConfirmOverwriteInFolder(false)
        setConfirmOverwriteFolderId(documentData.folderId)
        setConfirmOverwriteDocumentId(documentData.documentId)
        setConfirmOverwriteDocumentName(documentData.documentName)
      }
     } else {
      SystemUtils.handleInternalError(`Unknown documentData, documentId = ${documentId}`)
     }
    }
  }

  const doSaveFile = (folderId: number | null, overwrite: boolean, documentId: number, newDocumentName: string) => {
    const storage = new StorageService()
    storage.editors = Utils.editors
    storage.save()
    const documentData = storage.storageData
    const documentContent = JSON.stringify(documentData)
    console.log(documentContent)
    const saveDocumentData = async () => {
      let documentData = null
      if(overwrite) {
        documentData = await RequestUtils.updateDocument(documentId, newDocumentName, documentContent, folderId)
      } else {
        documentData = await RequestUtils.saveDocument(selectedDocumentName, documentContent, folderId)
      }
      if (documentData.data?.success) {
        console.log('Save document wwith data: ', documentData.data.data)
        setErrorMessage('')
        setErrorVisible(false)
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

  const confirmOverwriteDocument = () => {
    setConfirmOverwriteWindowVisible(false)
    if(confirmOverwriteInFolder) {
      doSaveFile(confirmOverwriteFolderId, true, confirmOverwriteDocumentId, confirmOverwriteDocumentName)
    } else {
      doSaveFile(confirmOverwriteFolderId, true, confirmOverwriteDocumentId, confirmOverwriteDocumentName)
    }
  }

  const cancelOverwriteDocument = () => {
    setConfirmOverwriteWindowVisible(false)
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
    if (selectedFolderKey?.startsWith(FOLDER)) {
      parentId = parseInt(selectedFolderKey.substring(7))
    } else if (selectedFolderKey?.startsWith(DOC)) {
      parentId = parseInt(selectedFolderKey.substring(4))
    }
    const fetchFolderData = async () => {
      const folderData = await RequestUtils.addFolder(folderName, parentId)
      if (folderData.data?.success ) {
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
      <Modal title="Save File" centered open={visible} onOk={handleSaveFile} onCancel={onCancel} maskClosable={false}  >
        <div style={{ width: '100%', height: '480px' }}>
          <Space wrap>
            <Button onClick={saveAddFolder}>Add Folder</Button>
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
      <Modal title="Modal" centered open={confirmOverwriteWindowVisible} onOk={confirmOverwriteDocument} onCancel={cancelOverwriteDocument} okText="确认" cancelText="取消" >
        <p>File already exists, are you sure to overwrite it?</p>
      </Modal>
    </div>
  )
}

export default SaveFileWindowPage
