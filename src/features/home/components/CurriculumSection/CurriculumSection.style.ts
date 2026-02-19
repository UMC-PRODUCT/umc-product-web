import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

import { homeResponsiveFont, homeResponsiveSpace } from '../../pages/styles/HomePage.common.style'

// 기존 공통 스타일 import 유지
export {
  FullWidthSection,
  SectionBadge,
  SectionTitle,
} from '../../pages/styles/HomePage.common.style'

export const HeaderContainer = styled.div`
  text-align: center;
  ${homeResponsiveSpace('margin-bottom: 60px;', 'margin-bottom: 40px;', 'margin-bottom: 24px;')}

  ${media.down(theme.breakPoints.tablet)} {
    margin-bottom: 32px;
  }
`

export const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  ${homeResponsiveSpace('gap: 12px;', 'gap: 8px;', 'gap: 6px;')}
  background: ${theme.colors.gray[800]};
  ${homeResponsiveSpace('padding: 8px;', 'padding: 12px;', 'padding: 10px;')}
  border-radius: 12px;
  width: 100%;
  max-width: 860px;
  ${homeResponsiveSpace('margin: 0 auto 40px;', 'margin: 0 auto 28px;', 'margin: 0 auto 20px;')}

  ${media.down(theme.breakPoints.tablet)} {
    display: flex;
    gap: 17px;
    background: none;
  }

  ${media.down(theme.breakPoints.mobile)} {
    display: flex;
    gap: 10px;
    background: none;
  }
`

export const TabButton = styled.button<{ $isActive: boolean }>`
  ${homeResponsiveSpace('padding: 10px 24px;', 'padding: 4px 6px;', 'padding: 4px 2px;')}
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s;
  background: ${({ $isActive }) => ($isActive ? theme.colors.lime : 'transparent')};
  color: ${({ $isActive }) => ($isActive ? '#000' : '#fff')};
  border: none;
  cursor: pointer;
  width: 116px;
  white-space: nowrap;

  &:hover {
    background: ${({ $isActive }) => ($isActive ? theme.colors.lime : 'rgba(255, 255, 255, 0.1)')};
  }
  ${media.down(theme.breakPoints.tablet)} {
    font-size: 14px;
    &:hover {
      background: none;
    }
  }
  ${media.down(theme.breakPoints.mobile)} {
    font-size: 11px;
    border-radius: 0;
    width: fit-content;
    background: none;
    color: ${({ $isActive }) => ($isActive ? theme.colors.lime : '#EDEDED')};
    border-bottom: 1px solid ${({ $isActive }) => ($isActive ? theme.colors.lime : 'transparent')};
    &:hover {
      background: none;
    }
  }
`

export const CurriculumBoard = styled.div`
  background: ${theme.colors.gray[800]};
  border-radius: 24px;
  ${homeResponsiveSpace('padding: 35px 35px;', 'padding: 24px 20px;', 'padding: 20px 14px;')}
  width: 910px;
  margin: 0 auto;
  max-width: 97vw;
  ${media.down(theme.breakPoints.tablet)} {
    border-radius: 16px;
    background: linear-gradient(180deg, #202020 0%, #1b1b1b 100%);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
    width: 648px;
    max-width: 90vw;
  }
  ${media.down(theme.breakPoints.mobile)} {
    border-radius: 16px;
    background: linear-gradient(180deg, #202020 0%, #1b1b1b 100%);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
    width: 472px;
    max-width: 90vw;
  }
`

export const RequiredSkill = styled.div`
  display: flex;
  align-items: center;
  ${homeResponsiveSpace('gap: 12px;', 'gap: 6px;', 'gap: 6px;')}
  ${homeResponsiveSpace('margin-bottom: 20px;', 'margin-bottom: 18px;', 'margin-bottom: 14px;')}
  ${homeResponsiveFont('18px', '16px', '15px')}
`

export const CheckIcon = styled.span`
  color: ${theme.colors.lime};
  font-weight: bold;
`

export const SkillLabel = styled.span`
  color: #fff;
  font-weight: 700;
  &::after {
    content: '|';
    margin-left: 18px;
    color: ${theme.colors.gray[500]};
  }
  ${media.down(theme.breakPoints.mobile)} {
    font-size: 11px;
    &::after {
      content: '|';
      margin-left: 9px;
    }
  }
`

export const SkillValue = styled.span`
  color: #fff;
  margin-left: 18px;
  ${media.down(theme.breakPoints.mobile)} {
    font-size: 11px;
    margin-left: 6px;
  }
`
