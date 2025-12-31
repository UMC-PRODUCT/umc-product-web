import { useEffect } from 'react'
import { useRouterState } from '@tanstack/react-router'

import useModalStore from '@/store/useModalStore'
import AlertModal from './AlertModal/AlertModal'

import ServiceTerm from './ServiceTerm/ServiceTerm'
import MarketingTerm from './MarketingTerm/MarketingTerm'
import PrivacyTerm from './PrivacyTerm/PrivacyTerm'

export const MODAL_TYPES = {
  AlertModal: 'AlertModal',
  ServiceTerm: 'ServiceTerm',
  MarketingTerm: 'MarketingTerm',
  PrivacyTerm: 'PrivacyTerm',
}

export type modalType = (typeof MODAL_TYPES)[keyof typeof MODAL_TYPES]

export const MODAL_COMPONENTS = {
  [MODAL_TYPES.AlertModal]: AlertModal,
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

  const ModalComponent = MODAL_COMPONENTS[modalType]
  return ModalComponent ? (
    <ModalComponent onClose={closeModal} {...modalProps}></ModalComponent>
  ) : null
}
