import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { forwardRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'

import * as S from './Modal.style'

// ============================================================================
// Modal.Root
// ============================================================================
type ModalRootProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Root>

function ModalRoot({ children, ...props }: ModalRootProps) {
  return <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>
}

// ============================================================================
// Modal.Trigger
// ============================================================================
type ModalTriggerProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>

const ModalTrigger = forwardRef<HTMLButtonElement, ModalTriggerProps>(
  ({ children, ...props }, ref) => {
    return (
      <DialogPrimitive.Trigger ref={ref} asChild {...props}>
        {children}
      </DialogPrimitive.Trigger>
    )
  },
)
ModalTrigger.displayName = 'Modal.Trigger'

// ============================================================================
// Modal.Portal
// ============================================================================
type ModalPortalProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Portal>

function ModalPortal({ children, ...props }: ModalPortalProps) {
  return (
    <DialogPrimitive.Portal container={document.getElementById('modal-root')} {...props}>
      {children}
    </DialogPrimitive.Portal>
  )
}

// ============================================================================
// Modal.Overlay
// ============================================================================
type ModalOverlayProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>

const ModalOverlay = forwardRef<HTMLDivElement, ModalOverlayProps>((props, ref) => {
  return <S.StyledOverlay ref={ref} {...props} />
})
ModalOverlay.displayName = 'Modal.Overlay'

// ============================================================================
// Modal.Content
// ============================================================================
type ModalContentProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Content>

const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  ({ children, ...props }, ref) => {
    return (
      <S.StyledContent ref={ref} onOpenAutoFocus={(e) => e.preventDefault()} {...props}>
        {children}
      </S.StyledContent>
    )
  },
)
ModalContent.displayName = 'Modal.Content'

// ============================================================================
// Modal.Header
// ============================================================================
type ModalHeaderProps = {
  children?: ReactNode
  className?: string
}

const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(({ children, className }, ref) => {
  return (
    <S.Header ref={ref} className={className}>
      {children}
    </S.Header>
  )
})
ModalHeader.displayName = 'Modal.Header'

// ============================================================================
// Modal.Title
// ============================================================================
type ModalTitleProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Title>

const ModalTitle = forwardRef<HTMLHeadingElement, ModalTitleProps>(
  ({ children, ...props }, ref) => {
    return (
      <DialogPrimitive.Title ref={ref} {...props}>
        {children}
      </DialogPrimitive.Title>
    )
  },
)
ModalTitle.displayName = 'Modal.Title'

// ============================================================================
// Modal.Description
// ============================================================================
type ModalDescriptionProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Description>

const ModalDescription = forwardRef<HTMLParagraphElement, ModalDescriptionProps>(
  ({ children, ...props }, ref) => {
    return (
      <DialogPrimitive.Description ref={ref} {...props}>
        {children}
      </DialogPrimitive.Description>
    )
  },
)
ModalDescription.displayName = 'Modal.Description'

// ============================================================================
// Modal.Body
// ============================================================================
type ModalBodyProps = {
  children?: ReactNode
  className?: string
}

const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(({ children, className }, ref) => {
  return (
    <S.Body ref={ref} className={className}>
      {children}
    </S.Body>
  )
})
ModalBody.displayName = 'Modal.Body'

// ============================================================================
// Modal.Footer
// ============================================================================
type ModalFooterProps = {
  children?: ReactNode
  className?: string
}

const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(({ children, className }, ref) => {
  return (
    <S.Footer ref={ref} className={className}>
      {children}
    </S.Footer>
  )
})
ModalFooter.displayName = 'Modal.Footer'

// ============================================================================
// Modal.Close
// ============================================================================
type ModalCloseProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Close>

const ModalClose = forwardRef<HTMLButtonElement, ModalCloseProps>(
  ({ children, asChild, ...props }, ref) => {
    return (
      <DialogPrimitive.Close ref={ref} asChild={asChild ?? true} {...props}>
        {children ?? <S.CloseButton aria-label="닫기">✕</S.CloseButton>}
      </DialogPrimitive.Close>
    )
  },
)
ModalClose.displayName = 'Modal.Close'

// ============================================================================
// Compound Export
// ============================================================================
export const Modal = Object.assign(ModalRoot, {
  Root: ModalRoot,
  Trigger: ModalTrigger,
  Portal: ModalPortal,
  Overlay: ModalOverlay,
  Content: ModalContent,
  Header: ModalHeader,
  Title: ModalTitle,
  Description: ModalDescription,
  Body: ModalBody,
  Footer: ModalFooter,
  Close: ModalClose,
})

export type {
  ModalBodyProps,
  ModalCloseProps,
  ModalContentProps,
  ModalDescriptionProps,
  ModalFooterProps,
  ModalHeaderProps,
  ModalOverlayProps,
  ModalPortalProps,
  ModalRootProps,
  ModalTitleProps,
  ModalTriggerProps,
}
