import { useEffect, type ComponentType } from 'react'
import { useRouterState } from '@tanstack/react-router'

import useModalStore from '@/store/useModalStore'
import AlertModal from '@/components/Modal/AlertModal/AlertModalLayout'
import EmailSendModal from '@/components/Modal/AlertModal/EmailSendModal/EmailSendModal'
import ServiceTerm from '@/components/Modal/TermModal/ServiceTerm/ServiceTerm'
import MarketingTerm from '@/components/Modal/TermModal/MarketingTerm/MarketingTerm'
import PrivacyTerm from '@/components/Modal/TermModal/PrivacyTerm/PrivacyTerm'
import AlreadyExistAccount from '../../Modal/AlertModal/AlreadyExistAccount/AlreadyExistAccount'

export const MODAL_TYPES = {
  AlertModal: 'AlertModal',
  EmailSendModal: 'EmailSendModal',
  ServiceTerm: 'ServiceTerm',
  MarketingTerm: 'MarketingTerm',
  PrivacyTerm: 'PrivacyTerm',
  AlreadyExistAccount: 'AlreadyExistAccount',
}

export type modalType = (typeof MODAL_TYPES)[keyof typeof MODAL_TYPES]

export const MODAL_COMPONENTS = {
  [MODAL_TYPES.AlertModal]: AlertModal,
  [MODAL_TYPES.AlreadyExistAccount]: AlreadyExistAccount,
  [MODAL_TYPES.EmailSendModal]: EmailSendModal,
  [MODAL_TYPES.ServiceTerm]: ServiceTerm,
  [MODAL_TYPES.MarketingTerm]: MarketingTerm,
  [MODAL_TYPES.PrivacyTerm]: PrivacyTerm,
}

export default function ModalProvider() {
  const { modalType, closeModal, modalProps } = useModalStore()
  const locationKey = useRouterState({
    select: (state) => state.location.href,
  })
  useEffect(() => {
    closeModal()
  }, [locationKey, closeModal])

  const ModalComponent = MODAL_COMPONENTS[modalType] as
    | ComponentType<any>
    | undefined
  return ModalComponent ? (
    <ModalComponent onClose={closeModal} {...modalProps}></ModalComponent>
  ) : null
}
