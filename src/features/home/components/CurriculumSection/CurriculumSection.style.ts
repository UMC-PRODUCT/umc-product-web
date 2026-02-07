import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

// 기존 공통 스타일 import 유지
export {
  FullWidthSection,
  SectionBadge,
  SectionTitle,
} from '../../pages/styles/HomePage.common.style'

export const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 60px;

  ${media.down(theme.breakPoints.tablet)} {
    margin-bottom: 32px;
  }
`

export const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  background: ${theme.colors.gray[800]};
  padding: 8px;
  border-radius: 12px;
  width: 100%;
  max-width: 860px;
  margin: 0 auto 40px;

  ${media.down(theme.breakPoints.tablet)} {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
    padding: 12px;
    margin-bottom: 28px;
    background: linear-gradient(180deg, rgba(32, 32, 32, 0.9), rgba(22, 22, 22, 0.9));
    border: 1px solid rgba(255, 255, 255, 0.06);
    box-shadow:
      0 12px 30px rgba(0, 0, 0, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.04);
  }
`

export const TabButton = styled.button<{ $isActive: boolean }>`
  padding: 10px 24px;
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
    padding: 10px 10px;
    min-height: 40px;
    font-size: 13px;
    border-radius: 10px;
    background: ${({ $isActive }) =>
      $isActive ? 'linear-gradient(180deg, #BFFF6B, #8DE63E)' : 'rgba(255, 255, 255, 0.06)'};
    color: ${({ $isActive }) => ($isActive ? '#101010' : '#EDEDED')};
    border: 1px solid ${({ $isActive }) => ($isActive ? 'rgba(0, 0, 0, 0.08)' : 'transparent')};
    box-shadow: ${({ $isActive }) => ($isActive ? '0 8px 18px rgba(149, 239, 75, 0.35)' : 'none')};
    letter-spacing: -0.2px;
  }
`

export const CurriculumBoard = styled.div`
  background: ${theme.colors.gray[800]};
  border-radius: 24px;
  padding: 35px 55px;
  max-width: 910px;
  margin: 0 auto;

  ${media.down(theme.breakPoints.tablet)} {
    border-radius: 16px;
    padding: 24px 20px;
    background: linear-gradient(180deg, #202020 0%, #1b1b1b 100%);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  }
`

export const RequiredSkill = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  font-size: 18px;

  ${media.down(theme.breakPoints.tablet)} {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    margin-bottom: 18px;
    font-size: 15px;
  }
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
    margin-left: 12px;
    color: rgba(255, 255, 255, 0.2);
  }

  ${media.down(theme.breakPoints.tablet)} {
    &::after {
      content: '';
      margin-left: 0;
    }
  }
`

export const SkillValue = styled.span`
  color: #fff;

  ${media.down(theme.breakPoints.tablet)} {
    color: ${theme.colors.gray[300]};
  }
`

export const TimelineGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 60px;
  row-gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    row-gap: 16px;
  }
`

export const TimelineItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const WeekNumber = styled.span`
  color: ${theme.colors.lime};
  font-weight: 700;
  font-family: 'Pretendard', sans-serif;
  min-width: 50px;
`

export const Divider = styled.div`
  width: 1px;
  height: 14px;
  background: rgba(255, 255, 255, 0.2);
`

export const Content = styled.span`
  color: #eee;
  font-size: 16px;
`
