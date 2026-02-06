import { useEffect, useRef, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { clearTokens } from '@/api/tokenManager'
import { authKeys, schoolKeys } from '@/features/auth/domain/queryKeys'
import ArrowUp from '@/shared/assets/icons/arrow_up.svg?react'
import { useCustomQuery, useCustomSuspenseQuery } from '@/shared/hooks/customQuery'
import { useUserProfileStore } from '@/shared/store/useUserProfileStore'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import { Badge } from '@/shared/ui/common/Badge/Badge'
import ErrorPage from '@/shared/ui/common/ErrorPage/ErrorPage'
import Flex from '@/shared/ui/common/Flex/Flex'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'
import AccountModal from '@/shared/ui/modals/AccountModal/AccountModal'
import DeleteAccountModal from '@/shared/ui/modals/DeleteAccountModal/DeleteAccountModal'

import * as S from './Profile.style'

const ProfileMenu = ({
  onClose,
  children,
}: {
  onClose: () => void
  children?: React.ReactNode
}) => {
  const navigate = useNavigate()
  const { setName, setNickname, setEmail, setGisu, setSchoolId } = useUserProfileStore()
  const [isModalOpen, setIsModalOpen] = useState<{
    modalType: 'accountLink' | 'deleteAccount' | ''
    isOpen: boolean
  }>({
    modalType: '',
    isOpen: false,
  })
  const { data } = useCustomSuspenseQuery(authKeys.me().queryKey, authKeys.me().queryFn)
  // TODO: 추후 ACTIVE 기수 조회하는 API가 생기면 수정 필요
  const { data: gisuList = [] } = useCustomQuery(
    schoolKeys.gisu().queryKey,
    schoolKeys.gisu().queryFn,
    {
      select: (response) => response.result.gisuList,
      staleTime: 1000 * 60 * 60 * 24,
      gcTime: 1000 * 60 * 60 * 24 * 7,
    },
  )
  const gisuId = gisuList[0]?.gisuId || ''
  useEffect(() => {
    setName(data.name || '')
    setNickname(data.nickname || '')
    setEmail(data.email || '')
    setGisu(gisuId)
    setSchoolId(data.schoolId ? data.schoolId.toString() : '')
  }, [data, gisuId, setName, setNickname, setEmail, setGisu, setSchoolId])

  const handleLogout = () => {
    setName('')
    setNickname('')
    setEmail('')
    clearTokens()
    navigate({
      to: '/auth/login',
    })
  }

  return (
    <>
      <S.Modal>
        <S.CloseButton onClick={onClose} />
        <Flex gap="12px">
          <S.Avatar />
          <Flex
            flexDirection="column"
            alignItems="flex-start"
            gap="4px"
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
            {data.status}
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
      {isModalOpen.isOpen && isModalOpen.modalType === 'deleteAccount' && (
        <DeleteAccountModal
          nickname={data.nickname || ''}
          name={data.name || ''}
          onClose={() => setIsModalOpen({ modalType: '', isOpen: false })}
          onClick={() => {
            setIsModalOpen({ modalType: '', isOpen: false })
          }}
        />
      )}
      {isModalOpen.isOpen && isModalOpen.modalType === 'accountLink' && (
        <AccountModal onClose={() => setIsModalOpen({ modalType: '', isOpen: false })} />
      )}
    </>
  )
}

const Profile = ({ children }: { children?: React.ReactNode }) => {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

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

  return (
    <S.Container ref={menuRef}>
      <S.TriggerIcon onClick={() => setOpen(!open)} />
      {open && (
        <AsyncBoundary
          fallback={
            <S.Modal>
              <S.CloseButton onClick={() => setOpen(false)} />
              <SuspenseFallback label="프로필 정보를 불러오는 중입니다." />
            </S.Modal>
          }
          errorFallback={(error, reset) => (
            <S.Modal>
              <S.CloseButton onClick={() => setOpen(false)} />
              <ErrorPage
                title="프로필 정보를 불러오는 중 오류가 발생했습니다."
                description={error.message || '잠시 후 다시 시도해 주세요.'}
                onRetry={reset}
              />
            </S.Modal>
          )}
        >
          <ProfileMenu onClose={() => setOpen(false)}>{children}</ProfileMenu>
        </AsyncBoundary>
      )}
    </S.Container>
  )
}

export default Profile
