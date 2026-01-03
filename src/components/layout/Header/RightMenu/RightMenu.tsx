import ArrowUp from '@/assets/icons/arrow_up.svg?react'
import ExternalLink from '@/components/layout/Header/RightMenu/ExternalLink/ExternalLink'
import Profile from '@/components/layout/Header/RightMenu/Profile/Profile'

import * as S from './RightMenu.style'

type SocialLink = {
  label: string
  link: string
  icon: 'kakao' | 'instagram' | 'youtube'
}

export default function RightMenu({
  nav,
  social,
}: {
  nav?: {
    label: string
    link: string
  }
  social?: Array<SocialLink>
}) {
  const Children = (
    <S.MenuWrapper alignItems="flex-start">
      {nav && (
        <S.NavLink href={nav.link}>
          {nav.label} <ArrowUp />
        </S.NavLink>
      )}
      <ExternalLink subLinks={social || []} />
    </S.MenuWrapper>
  )
  return (
    <S.Container>
      <S.DesktopMenu>{Children}</S.DesktopMenu>
      <Profile children={Children} />
    </S.Container>
  )
}
