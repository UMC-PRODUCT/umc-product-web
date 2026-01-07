import ArrowUp from '@shared/assets/icons/arrow_up.svg?react'
import ExternalLink from '@shared/layout/Header/RightMenu/ExternalLink/ExternalLink'
import Profile from '@shared/layout/Header/RightMenu/Profile/Profile'

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
      {nav &&
        (nav.link.startsWith('/') ? (
          <S.NavRouterLink to={nav.link}>
            {nav.label} <ArrowUp />
          </S.NavRouterLink>
        ) : (
          <S.NavAnchor href={nav.link} target="_blank" rel="noreferrer noopener">
            {nav.label} <ArrowUp />
          </S.NavAnchor>
        ))}

      <ExternalLink subLinks={social || []} />
    </S.MenuWrapper>
  )

  return (
    <S.Container>
      <S.DesktopMenu>{Children}</S.DesktopMenu>
      <Profile>{Children}</Profile>
    </S.Container>
  )
}
