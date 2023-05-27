import React, { FC, useEffect, useState, useRef } from 'react'
import styles from './index.css'
import { Form, Input, Checkbox, Tree, Row, Col, Button, Modal, Menu, message, Alert, } from 'antd'
import { RequestUtils, Utils, } from '../../Utils'
import axios from 'axios'
import Avatar from 'antd/lib/avatar/avatar'
import { Document, Folder } from '../../Utils/RequestUtils'
import type { DataNode, TreeProps,} from 'antd/es/tree';


interface OpenFileWindowProps {
  visible: boolean;
  x: number;
  y: number;
  onWindowCancel: () => void;
  onWindowOk: () => void
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
  const [loginForm,] = Form.useForm()
  const [errorVisible, setErrorVisible,] = useState<boolean>(false)
  const [folders, setFolders] = useState<Folder[]>([])
  const [treeData, setTreeData, ] = useState<DataNode[]>([])
  const [treeMap, setTreeMap, ] = useState<Map<string, Folder | Document >>()

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
        let nodeMap: Map<string, Folder | Document > = new Map<string, Folder | Document >()
        let nodes: DataNode[] = []
        await fetchFolder(nodeMap, nodes, null)
        await fetchDocument(nodeMap, nodes, null)
        setTreeData(nodes)
        setTreeMap(nodeMap)
    }
      fetchData()
    }
  })

  const fetchFolder = async (nodeMap: Map<string, Folder | Document >, nodes: DataNode[], parentId: number | null) => {
    const folderData = await RequestUtils.getFolders(parentId)
    if(folderData?.data?.success && folderData?.data?.data) {
      let records = folderData.data.data.records
      let count = records.length
      for(let i = 0; i < count; i ++) {
        let record = records[i]
        let folder: Folder = {
          folderId: record.folderId,
          folderName: record.folderName,
          parentId: record.parentId
        }
        let key = FOLDER + record.folderId
        let dataNode: DataNode = {
          key:  key,
          title: record.folderName,
          children:[]
        }
        nodes.push(dataNode)
        nodeMap.set(key, folder)
        console.log(`fetch Folder: parentId = ${parentId} folderId = ${key}`)
        await fetchFolder(nodeMap, dataNode.children!, folder.folderId)
        await fetchDocument(nodeMap, dataNode.children!, folder.folderId)
      }
    }    
  }

  const fetchDocument = async (nodeMap: Map<string, Folder | Document >, nodes: DataNode[], parentId: number | null) => {
    const folderData = await RequestUtils.getDocuments(parentId)
    if(folderData?.data?.success && folderData?.data?.data) {
      folderData.data.data.records?.forEach((record: any) => {
        let document: Document = {
          folderId: record.folderId,
          documentId: record.documentId,
          documentName: record.documentName,
          content: record.content
        }
        let key = DOC + record.documentId
        let dataNode: DataNode = {
          key:  key,
          title: record.documentName,
          children:[]
        }
        nodes.push(dataNode)
        nodeMap.set(key, document)
        console.log(`fetch Document: folderId = ${parentId} documentId = ${key}`)
      })
    }    
  }

  const onOk = () => {
    loginForm.submit()
  }

  const onCancel = () => {
    if (onWindowCancel) {
      onWindowCancel()
    }
  }

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);

  };

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };

  return (
    <div>
      <Modal title="New File" centered open={visible} onOk={onOk} onCancel={onCancel} maskClosable={false} >
        <div style={{ width: '100%', height: '480px'}}>
        <Tree style={{width: '100%', height:'100%', overflow: 'scroll'}}
      checkable
      //defaultExpandedKeys={['0-0-0', '0-0-1']}
      //defaultSelectedKeys={['0-0-0', '0-0-1']}
      //defaultCheckedKeys={['0-0-0', '0-0-1']}
      //onSelect={onSelect}
      //onCheck={onCheck}
      treeData={treeData}
    />
        </div>
      </Modal>
    </div>
  )
}

export default OpenFileWindowPage
