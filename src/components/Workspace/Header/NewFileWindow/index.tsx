import React, { FC, useEffect, useState, useRef, useMemo } from 'react'
import styles from './index.css'
import { Form, Input, Checkbox, Row, Col, Button, Modal, Menu, message, Alert, Tree, TreeDataNode, Flex, Tooltip, Card, } from 'antd'
import { RequestUtils, Utils, } from '../../Utils'
import axios from 'axios'
import Avatar from 'antd/lib/avatar/avatar'
import { useIntl, setLocale, getLocale, FormattedMessage, } from 'umi';
import { EventDataNode } from 'antd/es/tree'
import { FolderOutlined } from '@ant-design/icons'

const { Search } = Input;
const categoryInitData: TreeDataNode[] = [
  { title: 'Basic', key: 'Basic', },
  { title: 'FlowChart', key: 'FlowChart', },
  { title: 'UML', key: 'UML', },
]

interface TemplateInfo {
  category: string,
  name: string,
  path: string,
  image: string,
}
const templateMap: TemplateInfo[] = [
  { category: 'Basic', name: 'Blank Diagram', path: process.env.PUBLIC_PATH + '/template/basic/BlankDiagram.ratel', image: process.env.PUBLIC_PATH + '/template/basic/BlankDiagram.png', },
  { category: 'Basic', name: 'Flowchart', path: process.env.PUBLIC_PATH + '/template/basic/FlowChart.ratel', image: process.env.PUBLIC_PATH + '/template/basic/FlowChart.png', },
  { category: 'Basic', name: 'UML Class Diagram', path: process.env.PUBLIC_PATH + '/template/basic/UMLClassDiagram.ratel', image: process.env.PUBLIC_PATH + '/template/basic/UMLClassDiagram.png', },
  { category: 'FlowChart', name: 'FlowChart', path: process.env.PUBLIC_PATH + '/template/basic/FlowChart.ratel', image: process.env.PUBLIC_PATH + '/template/basic/FlowChart.png', },
  { category: 'UML', name: 'UML Class Diagram', path: process.env.PUBLIC_PATH + '/template/basic/UMLClassDiagram.ratel', image: process.env.PUBLIC_PATH + '/template/basic/UMLClassDiagram.png', },
]

interface NewFileWindowProps {
  visible: boolean;
  x: number;
  y: number;
  onWindowCancel: () => void;
  onWindowOk: (documentContent: string) => void
}

const NewFileWindowPage: FC<NewFileWindowProps> = ({
  visible, x, y, onWindowCancel, onWindowOk,
}) => {
  const intl = useIntl();
  const [messageApi, contextHolder] = message.useMessage();

  const [dataLoading, setDataLoading,] = useState<boolean>(false)
  const [modalX, setModalX,] = useState<number>(0)
  const [modalY, setModalY,] = useState<number>(0)
  const [origModalX, setOrigModalX,] = useState<number>(0)
  const [origModalY, setOrigModalY,] = useState<number>(0)
  const [windowVisible, setWindowVisible,] = useState<boolean>(false)
  const [errorVisible, setErrorVisible,] = useState<boolean>(false)
  const [searchCategoryData, setSearchCategoryData,] = useState<TreeDataNode[]>(categoryInitData);
  const [selectedCategoryKeys, setSelectedCategoryKeys,] = useState<React.Key[]>([categoryInitData[0].key])
  const [categoryTemplates, setCategoryTemplates,] = useState<TemplateInfo[]>([]);
  const [selectedTemplate, setSelectedTemplate,] = useState<TemplateInfo | null>(null)

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

      }
      fetchData()
      handleCategorySelection(selectedCategoryKeys, null)
    }
  })

  const onOk = async () => {
    if (selectedTemplate && onWindowOk) {
      const fetchBlob = await RequestUtils.fetchTextFileAsBlob(selectedTemplate.path)
      const reader = new FileReader()
      reader.onload = () => {
        const templateContent = reader.result
        if (typeof templateContent === 'string') {
          onWindowOk(templateContent)
        }
      }
      reader.readAsText(fetchBlob.data)
      //const templateContent = JSON.stringify(textData)
    } else {
      message.error(`${intl.formatMessage({ id: 'workspace.header.window.new-file.message.no-template-selected' })}`);
    }
  }

  const onCancel = () => {
    if (onWindowCancel) {
      onWindowCancel()
    }
  }

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, } = e.target
    if (value) {
      const searchCategoryData = categoryInitData.filter(item => {
        if (item.title && item.title.toString().toUpperCase().indexOf(value.toUpperCase()) > -1) {
          return true
        } else {
          return false
        }
      })
      setSearchCategoryData(searchCategoryData)
      setSelectedCategoryKeys(searchCategoryData.length > 0 ? [searchCategoryData[0].key] : [])
      setSelectedTemplate(null)

    } else {
      setSearchCategoryData(categoryInitData)
      setSelectedCategoryKeys([categoryInitData[0].key])
      setSelectedTemplate(null)
    }
  }

  const handleCategorySelection = (selectedKeys: React.Key[], e: { selected: boolean, selectedNodes: TreeDataNode[], node: EventDataNode<TreeDataNode>, event: 'select' }) => {
    const templates = templateMap.filter(value => {
      return selectedKeys.length > 0 && selectedKeys[0].toString() == value.category
    })
    setCategoryTemplates(templates)
    setSelectedCategoryKeys(selectedKeys)
    setSelectedTemplate(null)
  }

  const handleSelectTemplate = (categoryTemplate: TemplateInfo) => {
    setSelectedTemplate(categoryTemplate)
  }

  const templateItems = categoryTemplates.map(categoryTemplate => {
    const size = 96
    const width = 96
    const height = 96

    return <Tooltip title={categoryTemplate.name}>
      <Card
        size='small'
        title={<div style={{ width: 80, fontSize: 11, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{categoryTemplate.name}</div>}
        hoverable
        onClick={() => handleSelectTemplate(categoryTemplate)}
        style={{ border: (selectedTemplate && selectedTemplate.name == categoryTemplate.name) ? '1.5px solid blue' : undefined }}
      >
        <div style={{ width: size, height: size, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
          <img src={`${categoryTemplate.image}`} width={width} height={height} alt={categoryTemplate.name} />
        </div>
      </Card>
    </Tooltip>
  })

  return (
    <div>
      <Modal title={<FormattedMessage id='workspace.header.window.new-file.title' />} centered open={visible} onOk={onOk} onCancel={onCancel} maskClosable={false} width={640}>
        <div style={{ width: '100%', height: '480px', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', border: '1px solid silver' }} >
          <div style={{ width: '200px', height: '100%', padding: '8px', }}>
            <Search style={{ marginBottom: '8px', }} placeholder="Search" onChange={onSearchChange} />
            <Tree showLine treeData={searchCategoryData} onSelect={handleCategorySelection} selectedKeys={selectedCategoryKeys} />
          </div>
          <div style={{ width: 'calc(100% - 200px)', height: '100%', overflow: 'auto', scrollbarWidth: 'thin', padding: '6px', borderLeft: '1px solid silver' }}>
            <Flex gap='small' justify='start' align='flex-start' wrap='wrap' style={{ width: '100%', }} >
              {templateItems}
            </Flex>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default NewFileWindowPage
