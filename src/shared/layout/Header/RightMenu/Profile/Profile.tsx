import { useEffect, useRef, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { Badge } from '@shared/ui/common/Badge/Badge'
import Flex from '@shared/ui/common/Flex/Flex'

import { useUserProfileStore } from '@/features/auth/hooks/register'

import * as S from './Profile.style'

const Profile = ({ children }: { children?: React.ReactNode }) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { name, nickname } = useUserProfileStore()
  // 추후 수정 예정
  const school = '중앙대학교'
  const rights = '총괄'
  const email = 'umc1234'

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

  const handleLogout = () => {
    // 로그아웃 로직 추가 예정
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
                {nickname}/{name}
              </S.NameText>
              <S.EmailText>{email}</S.EmailText>
            </Flex>
          </Flex>
          <Flex flexDirection="column" gap="12px">
            <S.InfoRow gap="10px">
              <Badge tone="gray" variant="solid" typo="H5.Md">
                소속
              </Badge>
              {school}
            </S.InfoRow>
            <S.InfoRow gap="10px">
              <Badge tone="gray" variant="solid" typo="H5.Md">
                권한
              </Badge>
              {rights}
            </S.InfoRow>
          </Flex>
          {children && <S.MobileOnly>{children}</S.MobileOnly>}
          <S.Logout onClick={handleLogout}>로그아웃</S.Logout>
        </S.Modal>
      )}
    </S.Container>
  )
}

export default Profile
