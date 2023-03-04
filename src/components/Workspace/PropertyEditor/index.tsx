import React, { useEffect, useState, } from 'react'
import styles from './index.css'
import Workspace from '@/components/Workspace'
import { Button, } from 'antd'
import { Utils, } from '../Utils'

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
    <div {...props}>
      property editor
    </div>
  )
}
