import { create } from 'zustand'
import type { modalType } from '@/components/common/Modal/ModalProvider'

interface IModalState {
  modalType: modalType
  isOpen: boolean
  modalProps?: Record<string, any>
  openModal: (
    payload:
      | modalType
      | { modalType: modalType; modalProps?: Record<string, any> },
  ) => void
  closeModal: () => void
}

const useModalStore = create<IModalState>((set) => ({
  modalType: '',
  isOpen: false,
  modalProps: {},
  openModal: (payload) =>
    set(() => {
      if (typeof payload === 'string') {
        return {
          modalType: payload,
          modalProps: {},
          isOpen: true,
        }
      } else {
        return {
          modalType: payload.modalType,
          modalProps: payload.modalProps || {},
          isOpen: true,
        }
      }
    }),
  closeModal: () =>
    set(() => ({
      modalType: '',
      modalProps: {},
      isOpen: false,
    })),
}))

export default useModalStore
