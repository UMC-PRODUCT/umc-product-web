import { useNavigate } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

import Badge from '@/components/common/Badge/Badge'
import Flex from '@/components/common/Flex/Flex'

import * as S from './Profile.style'

export default function Profile({ children }: { children?: React.ReactNode }) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  // 추후 수정 예정
  const school = '중앙대학교'
  const rights = '총괄'
  const name = '성이름'
  const nickname = '닉넴'
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
            <Flex direction="column" alignItems="flex-start" gap="4px">
              <S.NameText>
                {nickname}/{name}
              </S.NameText>
              <S.EmailText>{email}</S.EmailText>
            </Flex>
          </Flex>
          <Flex direction="column" gap="12px">
            <S.InfoRow gap="10px">
              <Badge content="소속" tone="gray" variant="solid" typo="H5.Md" />
              {school}
            </S.InfoRow>
            <S.InfoRow gap="10px">
              <Badge content="권한" tone="gray" variant="solid" typo="H5.Md" />
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
