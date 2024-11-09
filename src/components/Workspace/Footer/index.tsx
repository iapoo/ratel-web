import { useEffect, useState } from 'react'
import { Utils } from '../Utils'

export default (props: any) => {
  const [initialized, setInitialized] = useState<boolean>(false)

  useEffect(() => {
    if (!initialized) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      initialize()
    }
  })

  const initialize = async () => {
    setInitialized(true)
  }

  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: `${Utils.FOOTER_HEIGHT}px` }}>
      {props.children}
    </div>
  )
}
