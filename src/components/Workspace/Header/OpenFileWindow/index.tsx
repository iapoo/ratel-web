import React, { FC, useEffect, useState, useRef } from 'react'
import styles from './index.css'
import { Form, Input, Checkbox, Tree, Row, Col, Button, Modal, Menu, message, Alert, Space, } from 'antd'
import { RequestUtils, SystemUtils, Utils, } from '../../Utils'
import axios from 'axios'
import Avatar from 'antd/lib/avatar/avatar'
import { Document, Folder, isDocument, isFolder } from '../../Utils/RequestUtils'
import type { DataNode, TreeProps, } from 'antd/es/tree';
import { FileFilled, FileOutlined, FolderFilled, FolderOutlined } from '@ant-design/icons'
import { StorageService } from '../../Storage'
import { useIntl, setLocale, getLocale, FormattedMessage, } from 'umi';


interface OpenFileWindowProps {
  visible: boolean;
  x: number;
  y: number;
  disableFileName: boolean;
  selectedFolderId: number | null;
  selectedDocumentId: number | null;
  selectedDocumentName: string;
  onWindowCancel: () => void;
  onWindowOk: (documentId: number, documentName: string | null, folderId: number | null) => void
}

const FOLDER = 'FOLDER_'
const DOC = "DOC_"

const OpenFileWindowPage: FC<OpenFileWindowProps> = ({
  visible, x, y, disableFileName, selectedFolderId, selectedDocumentId, selectedDocumentName, onWindowCancel, onWindowOk,
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
  const [errorMessage, setErrorMessage,] = useState<string>('')
  const [folders, setFolders] = useState<Folder[]>([])
  const [treeData, setTreeData,] = useState<DataNode[]>([])
  const [treeMap, setTreeMap,] = useState<Map<string, Folder | Document>>()
  const [addFolderWindowVisible, setAddFolderWindowVisible,] = useState<boolean>(false)
  const [selectedFolderKey, setSelectedFolderKey,] = useState<string>('')
  const [confirmDeleteFolderWindowVisible, setConfirmDeleteFolderWindowVisible,] = useState<boolean>(false)
  const [confirmDeleteDocumentWindowVisible, setConfirmDeleteDocumentWindowVisible,] = useState<boolean>(false)
  const [selectedFolderIsFolder, setSelectedFolderIsFolder,] = useState<boolean>(false)
  const [selectedFolderIsDocument, setSelectedFolderIsDocument,] = useState<boolean>(false)
  const [confirmOverwriteWindowVisible, setConfirmOverwriteWindowVisible] = useState<boolean>(false)
  const [confirmOverwriteInFolder, setConfirmOverwriteInFolder,] = useState<boolean>(true)
  const [confirmOverwriteFolderId, setConfirmOverwriteFolderId,] = useState<number | null>(null)
  const [confirmOverwriteDocumentId, setConfirmOverwriteDocumentId,] = useState<number>(0)
  const [confirmOverwriteDocumentName, setConfirmOverwriteDocumentName,] = useState<string>('')

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
          icon: <FolderOutlined />,
          children: []
        }
        let folder: Folder = {
          folderId: record.folderId,
          folderName: record.folderName,
          parentId: record.parentId,
          data: dataNode,
          modifiedDate: SystemUtils.extractDateFromServerCalendar(record.updatedTime),
          modifiedTime: SystemUtils.extractTimeFromServerCalendar(record.updatedTime),
        }
        nodes.push(dataNode)
        nodeMap.set(key, folder)
        //console.log(`fetch Folder: parentId = ${parentId} folderId = ${key}`)
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
          content: record.content,
          modifiedDate: SystemUtils.extractDateFromServerCalendar(record.createdDate),
          modifiedTime: SystemUtils.extractTimeFromServerCalendar(record.updatedDate),
        }
        let key = DOC + record.documentId
        let dataNode: DataNode = {
          key: key,
          title: <label>{record.documentName} <small><i>({document.modifiedDate + ' ' + document.modifiedTime})</i></small></label>,
          icon: <FileOutlined />,
          children: []
        }
        nodes.push(dataNode)
        nodeMap.set(key, document)
        //console.log(`fetch Document: folderId = ${folderId} documentId = ${key}`)
      })
    }
  }

  const onOk = () => {
    if (disableFileName) { //Save file
      handleSaveFile()
    } else { // Open File
      if (selectedFolderKey?.length > 0) {
        if (selectedFolderKey.startsWith(DOC)) {
          let documentId = Number(selectedFolderKey.substring(DOC.length))
          if (onWindowOk) {
            onWindowOk(documentId, null, null)
          }
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

  const handleDeleteFolder = () => {
    setConfirmDeleteFolderWindowVisible(true)
  }

  const handleDeleteDocument = () => {
    setConfirmDeleteDocumentWindowVisible(true)
  }
  const confirmAddFolder = () => {
    addFolderForm.submit()
  }

  const cancelAddFolder = () => {
    setAddFolderWindowVisible(false)

  }

  const onFolderSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
    setSelectedFolderIsDocument(false)
    setSelectedFolderIsFolder(false)
    if (selectedKeys.length > 0) {
      let selectedKey = selectedKeys[0].toString()
      setSelectedFolderKey(selectedKey)
      if (selectedKey.startsWith(FOLDER)) {
        setSelectedFolderIsFolder(true)
      }
      if (selectedKey.startsWith(DOC)) {
        setSelectedFolderIsDocument(true)
      }
    } else {
      setSelectedFolderKey("");
    }
  }

  const confirmDeleteFolder = () => {
    if (selectedFolderKey?.length > 0) {
      if (selectedFolderKey.startsWith(FOLDER)) {
        let folderId = Number(selectedFolderKey.substring(FOLDER.length))
        const fetchDeleteFolderData = async () => {
          const deleteFolderData = await RequestUtils.deleteFolder(folderId)
          if (deleteFolderData.data?.success) {
            console.log('Delete folder with data:', deleteFolderData.data.message)
          } else {
            console.log('Delete folder with error:', deleteFolderData.data)
            alert('Failed to delete folder.')
          }
          setConfirmDeleteFolderWindowVisible(false)
          fetchData()
        }
        fetchDeleteFolderData()
      }
    }
  }
  const cancelDeleteFolder = () => {
    setConfirmDeleteFolderWindowVisible(false)
  }
  const confirmDeleteDocument = () => {
    if (selectedFolderKey?.length > 0) {
      if (selectedFolderKey.startsWith(DOC)) {
        let documentId = Number(selectedFolderKey.substring(DOC.length))
        const fetchDeleteDocumentData = async () => {
          const deleteDocumentData = await RequestUtils.deleteDocument(documentId)
          if (deleteDocumentData.data?.success) {
            console.log('Delete document with data:', deleteDocumentData.data.message)
          } else {
            console.log('Delete document with error:', deleteDocumentData.data)
            alert('Failed to delete document.')
          }
          setConfirmDeleteDocumentWindowVisible(false)
          fetchData()
        }
        fetchDeleteDocumentData()
      }
    }
  }

  const cancelDeleteDocument = () => {
    setConfirmDeleteDocumentWindowVisible(false)
  }

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
      if (treeMap) {
        const documentNode = treeMap.get(selectedFolderKey)
        if (isDocument(documentNode)) {
          parentId = documentNode.folderId
        }

      }
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

  const confirmOverwriteDocument = () => {
    setConfirmOverwriteWindowVisible(false)
    if (confirmOverwriteInFolder) {
      doSaveFile(confirmOverwriteFolderId, true, confirmOverwriteDocumentId, confirmOverwriteDocumentName)
    } else {
      doSaveFile(confirmOverwriteFolderId, true, confirmOverwriteDocumentId, confirmOverwriteDocumentName)
    }
  }

  const cancelOverwriteDocument = () => {
    setConfirmOverwriteWindowVisible(false)
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
    } else if (selectedFolderKey == '') {
      folderId = null
    } else {
      SystemUtils.handleInternalError(`Unknown error occurs here with selectedFolderKey=${selectedFolderKey}`)
      return
    }

    if (saveInFolder) {
      let folderMap = treeMap?.get(selectedFolderKey);
      let hasDocumentName = false
      let currentDocumentId: number = 0
      let currentDocumentName: string = ''
      if (isFolder(folderMap)) {
        folderMap.data.children?.forEach(child => {
          if (child.title == selectedDocumentName) {
            hasDocumentName = true
            let document = treeMap?.get('' + child.key)
            if (isDocument(document)) {
              currentDocumentId = document.documentId
              currentDocumentName = document.documentName
            }
          }
        })
      }
      if (selectedDocumentId == null) {
        if (hasDocumentName) {
          setConfirmOverwriteWindowVisible(true)
          setConfirmOverwriteInFolder(true)
          setConfirmOverwriteDocumentId(currentDocumentId)
          setConfirmOverwriteDocumentName(currentDocumentName)
        } else {
          doSaveFile(folderId, false, 0, '')
        }
      } else {
        if (hasDocumentName) {
          setConfirmOverwriteWindowVisible(true)
          setConfirmOverwriteInFolder(true)
          setConfirmOverwriteDocumentId(currentDocumentId)
          setConfirmOverwriteDocumentName(currentDocumentName)
        } else {
          doSaveFile(folderId, false, 0, '')
        }
      }
    } else {
      let documentData = treeMap?.get(DOC + documentId);
      if (isDocument(documentData)) {
        if (selectedDocumentName == documentData.documentName && selectedDocumentId == documentData.documentId) {
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
    let resultDocumentId = documentId
    let resultDocumentName = newDocumentName
    const saveDocumentData = async () => {
      let documentData = null
      if (overwrite) {
        documentData = await RequestUtils.updateDocument(documentId, newDocumentName, documentContent, folderId)
      } else {
        documentData = await RequestUtils.saveDocument(selectedDocumentName, documentContent, folderId)
      }
      if (documentData.data?.success) {
        console.log('Save document wwith data: ', documentData.data.data)
        if (!overwrite) { //New Document
          resultDocumentId = documentData.data.data.documentId
          resultDocumentName = selectedDocumentName
        }
        Utils.editors.forEach(editor => {
          editor.resetModified()
        })
        setErrorMessage('')
        setErrorVisible(false)
        if (onWindowOk) {
          onWindowOk(resultDocumentId, resultDocumentName, folderId)
        }
      } else {
        console.log('Save document with error: ', documentData.data)
        setErrorMessage(documentData.data.message)
        setErrorVisible(true)
      }
    }
    saveDocumentData()
  }

  return (
    <div>
      <Modal title={<FormattedMessage id='workspace.header.window.open-file.title' />} centered open={visible} onOk={onOk} onCancel={onCancel} maskClosable={false}  >
        <div style={{ width: '100%', height: '480px' }}>
          <Space wrap>
            <Button onClick={openAddFolder}><FormattedMessage id='workspace.header.window.open-file.add-folder' /></Button>
            <Button onClick={handleDeleteFolder} disabled={!selectedFolderIsFolder}><FormattedMessage id='workspace.header.window.open-file.delete-folder' /></Button>
            <Button onClick={handleDeleteDocument} disabled={!selectedFolderIsDocument}><FormattedMessage id='workspace.header.window.open-file.delete-document' /></Button>
          </Space>
          <div style={{ width: '100%', height: '440px', borderWidth: '1px', borderColor: 'silver', borderStyle: 'solid', marginTop: '8px' }}>
            <Tree style={{ width: '100%', height: '100%', margin: '8px', }}
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
        </div>
      </Modal>
      <Modal title={<FormattedMessage id='workspace.header.window.open-file.add-folder.title' />} centered open={addFolderWindowVisible} onOk={confirmAddFolder} onCancel={cancelAddFolder} okText="确认" cancelText="取消" >
        <Form name="addFolderForm" form={addFolderForm} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} initialValues={{ remember: true }}
          onFinish={onFormFinish} autoComplete="off">
          <Form.Item label={<FormattedMessage id='workspace.header.window.open-file.add-folder.foler-name' />} name="folderName" rules={[{ required: true, message: <FormattedMessage id='workspace.header.window.open-file.add-folder.input-new-foler-name' /> }]} >
            <Input />
          </Form.Item>
          {errorVisible ? <Alert message={errorMessage} type="error" showIcon /> : ''}
        </Form>
      </Modal>
      <Modal title={<FormattedMessage id='workspace.header.window.open-file.overwrite-document.title' />} centered open={confirmOverwriteWindowVisible} onOk={confirmOverwriteDocument} onCancel={cancelOverwriteDocument} okText="确认" cancelText="取消" >
        <FormattedMessage id='workspace.header.window.open-file.overwrite-document.content' />
      </Modal>
      <Modal title={<FormattedMessage id='workspace.header.window.open-file.delete-folder.title' />} centered open={confirmDeleteFolderWindowVisible} onOk={confirmDeleteFolder} onCancel={cancelDeleteFolder} okText="确认" cancelText="取消" >
        <FormattedMessage id='workspace.header.window.open-file.delete-folder.content' />
      </Modal>
      <Modal title={<FormattedMessage id='workspace.header.window.open-file.delete-document.title' />} centered open={confirmDeleteDocumentWindowVisible} onOk={confirmDeleteDocument} onCancel={cancelDeleteDocument} okText="确认" cancelText="取消" >
        <FormattedMessage id='workspace.header.window.open-file.delete-document.content' />
      </Modal>

    </div>
  )
}

export default OpenFileWindowPage
