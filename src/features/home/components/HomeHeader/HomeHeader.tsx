import Logo from '@shared/assets/umc.svg?react'

import * as S from './HomeHeader.style'

type Props = {
  onScrollToSection: (id: string) => void
}

const HomeHeader = ({ onScrollToSection }: Props) => {
  return (
    <S.FixedHeader>
      <S.Nav>
        <S.Logo type="button" onClick={() => onScrollToSection('top')}>
          <Logo width={70} />
        </S.Logo>
        <S.NavLinks>
          <li>
            <S.NavLink type="button" onClick={() => onScrollToSection('about')}>
              소개
            </S.NavLink>
          </li>
          <li>
            <S.NavLink type="button" onClick={() => onScrollToSection('curriculum')}>
              커리큘럼
            </S.NavLink>
          </li>
          <li>
            <S.NavLink type="button" onClick={() => onScrollToSection('projects')}>
              프로젝트
            </S.NavLink>
          </li>
          <li>
            <S.NavLink type="button" onClick={() => onScrollToSection('faq')}>
              FAQ
            </S.NavLink>
          </li>
          <li>
            <S.NavLink type="button" onClick={() => onScrollToSection('apply')}>
              모집
            </S.NavLink>
          </li>
        </S.NavLinks>
        <S.ApplyButton type="button" onClick={() => onScrollToSection('apply')}>
          10기 지원하기
        </S.ApplyButton>
      </S.Nav>
    </S.FixedHeader>
  )
}

export default HomeHeader
