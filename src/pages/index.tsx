import React, { useEffect, useState, } from 'react'
import styles from './index.css'
import Workspace from '@/components/Workspace'
import { Button, ConfigProvider, } from 'antd'

export default (props: any) => {
  const [ initialized, setInitialized, ] = useState<boolean>(false)

  useEffect(() => {
    if (!initialized) {
      initialize()
    }
  })

  const initialize = async () => {
    setInitialized(true)
  }

  return (
    
     
      <div style={{ width: '100%', height: '100%', }}>
        <Workspace/>
      </div>
  )
}
