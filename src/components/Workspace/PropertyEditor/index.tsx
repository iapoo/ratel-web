import React, { FC, useEffect, useState, } from 'react'
import styles from './index.css'
import Workspace from '@/components/Workspace'
import { Button, Descriptions, DescriptionsProps, Divider, Tabs, TabsProps, } from 'antd'
import { Utils, } from '../Utils'
import { Editor } from '@/components/Rockie/Editor'
import { useIntl, setLocale, getLocale, FormattedMessage, } from 'umi';
import { DescriptionsItemProps } from 'antd/es/descriptions/Item'

interface PropertyEditorProps {
  previousEditor: Editor | undefined
  currentEditor: Editor | undefined
}

const PropertyEditor: FC<PropertyEditorProps> = ({
  previousEditor, currentEditor
}) => {
  const [ initialized, setInitialized, ] = useState<boolean>(false)

  const intl = useIntl();
  
  useEffect(() => {
    if (!initialized) {
      initialize()
    }
  })

  const initialize = async () => {
    setInitialized(true)
  }

  const pageSettingViewItems: DescriptionsProps['items'] = [ {
    key: '1',
    label: 'a',
    children: 'a'
    }, {
      key: '2',
      label: 'a',
      children: 'a'
    }, {
      key: '3',
      label: 'a',
      children: 'a'
    },
  ]

  const pageSettingOptionsItems: DescriptionsProps['items'] = [ {
    key: '1',
    label: 'a',
    children: 'a'
    }, {
      key: '2',
      label: 'a',
      children: 'a'
    }, {
      key: '3',
      label: 'a',
      children: 'a'
    },
  ]

  const pageSettingPageItems: DescriptionsProps['items'] = [ {
    key: '1',
    label: 'a',
    children: 'a'
    }, {
      key: '2',
      label: 'a',
      children: 'a'
    }, {
      key: '3',
      label: 'a',
      children: 'a'
    },
  ]

  const pageSettings = <div>
    <Descriptions title='View' items={pageSettingViewItems} column={1}/>
    <Divider style={{margin: 4}}/>
    <Descriptions title='Options' items={pageSettingOptionsItems} column={1}/>
    <Divider style={{margin: 4}}/>
    <Descriptions title='Page' items={pageSettingPageItems} column={1}/>
    </div>

  const items: TabsProps['items'] = [ {
    key: '1', 
    label: intl.formatMessage({ id: 'workspace.property-editor.page-setting.title', }), 
    children: pageSettings
  },{ 
    key: '2', 
    label: intl.formatMessage({ id: 'workspace.property-editor.page-style.title', }), 
    children: 'content2'
  }, {
    key: '3', 
    label: intl.formatMessage({ id: 'workspace.property-editor.item-setting.title', }), 
    children: 'content3'
  }, {
    key: '4', 
    label: intl.formatMessage({ id: 'workspace.property-editor.item-style.title', }), 
    children: 'content4'
  },]

  return (
    <div>
      <Tabs defaultActiveKey='1' items={items} />
    </div>
  )
}

export default PropertyEditor