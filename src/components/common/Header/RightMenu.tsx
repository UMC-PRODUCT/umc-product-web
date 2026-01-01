import * as S from './RightMenu.style'
import Profile from './Profile'
import ExternalLink from './ExternalLink'
import ArrowUp from '@/assets/icons/arrow_up.svg?react'

type SocialLink = {
  label: string
  link: string
  icon: 'kakao' | 'instagram' | 'youtube'
}

export default function RightMenu({
  nav,
  social,
}: {
  nav: {
    label: string
    link: string
  }
  social?: Array<SocialLink>
}) {
  const Children = (
    <S.MenuWrapper alignItems="flex-start">
      <S.NavLink href={nav.link}>
        {nav.label} <ArrowUp />
      </S.NavLink>
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
