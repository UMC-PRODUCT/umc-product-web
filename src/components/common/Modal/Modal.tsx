import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import type { MouseEvent, ReactNode } from 'react'

import styled from '@emotion/styled'

type Modalprops = {
  isOpen?: boolean
  children: ReactNode
  onClose: () => void
}

const Overlay = styled.div`
  z-index: 1000;
  position: fixed;
  width: 100vw;
  height: 100dvh;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`

const Content = styled.div`
  width: fit-content;
`

export default function Modal({
  isOpen = true,
  children,
  onClose,
}: Modalprops) {
  const [isVisible, setIsVisible] = useState(isOpen)

  useEffect(() => {
    setIsVisible(isOpen)
  }, [isOpen])

  const handleContentClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  return createPortal(
    isVisible && (
      <Overlay onClick={onClose}>
        <Content onClick={handleContentClick}>{children}</Content>
      </Overlay>
    ),
    document.getElementById('modal-root')!,
  )
}
