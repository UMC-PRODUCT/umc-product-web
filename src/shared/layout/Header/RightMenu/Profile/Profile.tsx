import { useEffect, useRef, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { clearTokens } from '@/api/tokenManager'
import { getActiveGisu, getMemberMe } from '@/features/auth/domain/api'
import ArrowUp from '@/shared/assets/icons/arrow_up.svg?react'
import { useCustomQuery } from '@/shared/hooks/customQuery'
import { authKeys, gisuKeys } from '@/shared/queryKeys'
import { useUserProfileStore } from '@/shared/store/useUserProfileStore'
import { Badge } from '@/shared/ui/common/Badge/Badge'
import Flex from '@/shared/ui/common/Flex/Flex'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'
import AccountModal from '@/shared/ui/modals/AccountModal/AccountModal'
import DeleteAccountModal from '@/shared/ui/modals/DeleteAccountModal/DeleteAccountModal'

import * as S from './Profile.style'

const ProfileMenuContent = ({
  children,
  onOpenModal,
  isModalOpen,
}: {
  children?: React.ReactNode
  onOpenModal: React.Dispatch<
    React.SetStateAction<{
      modalType: 'accountLink' | 'deleteAccount' | ''
      isOpen: boolean
    }>
  >
  isModalOpen: {
    modalType: 'accountLink' | 'deleteAccount' | ''
    isOpen: boolean
  }
}) => {
  const navigate = useNavigate()
  const { setName, setNickname, setEmail, setGisu, setSchoolId, setRoles } = useUserProfileStore()
  const {
    data,
    isLoading: isProfileLoading,
    error: profileError,
    refetch: refetchProfile,
  } = useCustomQuery(authKeys.getMemberMe, getMemberMe)

  const { data: gisu } = useCustomQuery(gisuKeys.active, getActiveGisu, {
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24 * 7,
  })
  const gisuId = gisu?.result.gisuId

  useEffect(() => {
    if (!data) return
    setName(data.name || '')
    setNickname(data.nickname || '')
    setEmail(data.email || '')
    setSchoolId(data.schoolId ? data.schoolId.toString() : '')
  }, [data, setName, setNickname, setEmail, setSchoolId])

  useEffect(() => {
    if (!data || !gisuId) return
    setGisu(gisuId)
    const activeRole = data.roles.find((role) => role.gisuId === gisuId)
    if (activeRole) {
      setRoles(activeRole)
    }
  }, [data, gisuId, setGisu, setRoles])

  if (isProfileLoading) {
    return <SuspenseFallback label="프로필 정보를 불러오는 중입니다." />
  }

  if (profileError || !data) {
    const errorMessage = profileError instanceof Error ? profileError.message : undefined
    return (
      <Flex flexDirection="column" gap="8px" alignItems="flex-start">
        <S.NameText>프로필 정보를 불러올 수 없습니다.</S.NameText>
        <S.EmailText>{errorMessage || '잠시 후 다시 시도해 주세요.'}</S.EmailText>
        <S.ModalButton type="button" onClick={() => refetchProfile()}>
          다시 시도
        </S.ModalButton>
      </Flex>
    )
  }

  const handleLogout = () => {
    setName('')
    setNickname('')
    setEmail('')
    setGisu('')
    clearTokens()
    navigate({
      to: '/auth/login',
    })
  }

  return (
    <>
      <Flex gap="12px">
        <S.Avatar />
        <Flex
          flexDirection="column"
          alignItems="flex-start"
          gap="4px"
          height={'fit-content'}
          css={{ overflow: 'hidden' }}
        >
          <S.NameText>
            {data.nickname}/{data.name}
          </S.NameText>
          <S.EmailText>{data.email}</S.EmailText>
        </Flex>
      </Flex>
      <Flex flexDirection="column" gap="12px">
        <S.InfoRow gap="10px">
          <Badge tone="gray" variant="solid" typo="H5.Md">
            소속
          </Badge>
          {data.schoolName}
        </S.InfoRow>
        <S.InfoRow gap="10px">
          <Badge tone="gray" variant="solid" typo="H5.Md">
            권한
          </Badge>
          {data.roles.find((role) => role.gisuId === gisuId)?.roleType || '권한 없음'}
        </S.InfoRow>
      </Flex>
      {children && <S.MobileOnly>{children}</S.MobileOnly>}
      <S.MenuWrapper alignItems="flex-start">
        <S.ModalButton
          type="button"
          onClick={() => onOpenModal({ modalType: 'accountLink', isOpen: true })}
        >
          계정 연동 <ArrowUp width={16} />
        </S.ModalButton>
        <S.DeleteButton
          type="button"
          onClick={() => onOpenModal({ modalType: 'deleteAccount', isOpen: true })}
        >
          계정 삭제
        </S.DeleteButton>
      </S.MenuWrapper>
      <S.Logout onClick={handleLogout}>로그아웃</S.Logout>
      {isModalOpen.isOpen && isModalOpen.modalType === 'deleteAccount' && (
        <DeleteAccountModal
          nickname={data.nickname || ''}
          name={data.name || ''}
          onClose={() => onOpenModal({ modalType: '', isOpen: false })}
          onClick={() => {
            onOpenModal({ modalType: '', isOpen: false })
          }}
        />
      )}
      {isModalOpen.isOpen && isModalOpen.modalType === 'accountLink' && (
        <AccountModal onClose={() => onOpenModal({ modalType: '', isOpen: false })} />
      )}
    </>
  )
}

const ProfileMenu = ({
  onClose,
  children,
}: {
  onClose: () => void
  children?: React.ReactNode
}) => {
  const [isModalOpen, setIsModalOpen] = useState<{
    modalType: 'accountLink' | 'deleteAccount' | ''
    isOpen: boolean
  }>({
    modalType: '',
    isOpen: false,
  })

  return (
    <>
      <S.Modal>
        <S.CloseButton onClick={onClose} />
        <ProfileMenuContent onOpenModal={setIsModalOpen} isModalOpen={isModalOpen}>
          {children}
        </ProfileMenuContent>
      </S.Modal>
    </>
  )
}

const Profile = ({ children }: { children?: React.ReactNode }) => {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const modalRoot = document.getElementById('modal-root')
      if (modalRoot?.contains(target)) return
      if (menuRef.current && !menuRef.current.contains(target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <S.Container ref={menuRef}>
      <S.TriggerIcon onClick={() => setOpen(!open)} />
      {open && <ProfileMenu onClose={() => setOpen(false)}>{children}</ProfileMenu>}
    </S.Container>
  )
}

export default Profile
