import { Modal } from 'antd'
import { useEffect, useState } from 'react'
import Drag from './drag'
export default (props: any) => {
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false)

  let timer: any

  const initializeModal = (props: any) => {
    const movableModal = new Drag(props.target, 'MovableModal')
    movableModal.init()
  }

  useEffect(() => {
    if (!isModalLoading) {
      setIsModalLoading(true)
      timer = setTimeout(() => {
        initializeModal(props)
      }, 1200)
    }
  }, [isModalLoading])

  if (timer) {
    clearTimeout(timer)
  }

  const modalStyle = {}
  if (props.modalX) {
    // @ts-ignore
    modalStyle.left = props.modalX
    // @ts-ignore
    modalStyle.top = props.modalY
    // modalStyle.top = 20
    // modalStyle.right = 20
    // modalStyle.width = 720
  }

  return (
    <div id="MovableModal">
      <Modal
        {...props}
        width={520}
        title={props.title}
        footer={null}
        style={modalStyle}
        closable={false}
        bodyStyle={{ padding: '0px' }}
        getContainer={false}
      >
        {props.children}
      </Modal>
    </div>
  )
}
