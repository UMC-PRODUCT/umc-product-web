import { useEffect, useRef, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

import ArrowUp from '@shared/assets/icons/arrow_up.svg?react'
import { Badge } from '@shared/ui/common/Badge/Badge'
import Flex from '@shared/ui/common/Flex/Flex'

import { memberKeys } from '@/features/auth/domain/queryKeys'
import { useCustomQuery } from '@/shared/hooks/customQuery'
import { useUserProfileStore } from '@/shared/store/useUserProfileStore'
import AccountModal from '@/shared/ui/modals/AccountModal/AccountModal'
import DeleteAccountModal from '@/shared/ui/modals/DeleteAccountModal/DeleteAccountModal'

import * as S from './Profile.style'

const Profile = ({ children }: { children?: React.ReactNode }) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { setName, setNickname, setEmail } = useUserProfileStore()
  const [isModalOpen, setIsModalOpen] = useState<{
    modalType: 'accountLink' | 'deleteAccount' | ''
    isOpen: boolean
  }>({
    modalType: '',
    isOpen: false,
  })
  const { data } = useCustomQuery(memberKeys.me().queryKey, memberKeys.me().queryFn)

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  useEffect(() => {
    setName(data?.result.name || '')
    setNickname(data?.result.nickname || '')
    setEmail(data?.result.email || '')
  }, [data, setName, setNickname, setEmail])

  const handleLogout = () => {
    setName('')
    setNickname('')
    setEmail('')
    localStorage.removeItem('accessToken')
    navigate({
      to: '/auth/login',
    })
  }
  return (
    <S.Container ref={menuRef}>
      <S.TriggerIcon onClick={() => setOpen(!open)} />
      {open && (
        <S.Modal>
          <S.CloseButton onClick={() => setOpen(false)} />
          <Flex gap="12px">
            <S.Avatar />
            <Flex flexDirection="column" alignItems="flex-start" gap="4px">
              <S.NameText>
                {data?.result.nickname}/{data?.result.name}
              </S.NameText>
              <S.EmailText>{data?.result.email}</S.EmailText>
            </Flex>
          </Flex>
          <Flex flexDirection="column" gap="12px">
            <S.InfoRow gap="10px">
              <Badge tone="gray" variant="solid" typo="H5.Md">
                소속
              </Badge>
              {data?.result.schoolName}
            </S.InfoRow>
            <S.InfoRow gap="10px">
              <Badge tone="gray" variant="solid" typo="H5.Md">
                권한
              </Badge>
              {data?.result.status}
            </S.InfoRow>
          </Flex>
          {children && <S.MobileOnly>{children}</S.MobileOnly>}
          <S.MenuWrapper alignItems="flex-start">
            <S.ModalButton
              type="button"
              onClick={() => setIsModalOpen({ modalType: 'accountLink', isOpen: true })}
            >
              계정 연동 <ArrowUp width={16} />
            </S.ModalButton>
            <S.DeleteButton
              type="button"
              onClick={() => setIsModalOpen({ modalType: 'deleteAccount', isOpen: true })}
            >
              계정 삭제
            </S.DeleteButton>
          </S.MenuWrapper>
          <S.Logout onClick={handleLogout}>로그아웃</S.Logout>
        </S.Modal>
      )}
      {isModalOpen.isOpen && isModalOpen.modalType === 'deleteAccount' && (
        <DeleteAccountModal
          nickname={data?.result.nickname || ''}
          name={data?.result.name || ''}
          onClose={() => setIsModalOpen({ modalType: '', isOpen: false })}
          onClick={() => {
            setIsModalOpen({ modalType: '', isOpen: false })
          }}
        />
      )}
      {isModalOpen.isOpen && isModalOpen.modalType === 'accountLink' && (
        <AccountModal onClose={() => setIsModalOpen({ modalType: '', isOpen: false })} />
      )}
    </S.Container>
  )
}

export default Profile
