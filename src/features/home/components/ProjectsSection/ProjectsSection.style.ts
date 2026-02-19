import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

import {
  FullWidthHeader,
  FullWidthSection,
  homeResponsiveFont,
  homeResponsiveSpace,
  SectionBadge,
  SectionDescription,
  SectionTitle,
} from '../../pages/styles/HomePage.common.style'

export { FullWidthHeader, FullWidthSection, SectionBadge, SectionDescription, SectionTitle }

const slideIn = keyframes`
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
`

export const GenerationTabs = styled.div`
  display: flex;
  justify-content: center;
  ${homeResponsiveSpace('gap: 48px;', 'gap: 24px;', 'gap: 14px;')}
  ${homeResponsiveSpace('margin-bottom: 60px;', 'margin-bottom: 40px;', 'margin-bottom: 24px;')}
  ${homeResponsiveSpace('padding: 0 60px;', 'padding: 0 32px;', 'padding: 0 20px;')}

  ${media.down(theme.breakPoints.tablet)} {
  }
`

export const GenerationTab = styled.button<{ $active?: boolean }>`
  ${homeResponsiveFont('18px', '16px', '14px')}
  font-weight: 700;
  color: ${({ $active }) => ($active ? theme.colors.white : theme.colors.gray[400])};
  cursor: pointer;
  padding-bottom: 12px;
  position: relative;
  transition: color 0.3s;
  border: none;
  background: none;

  &:hover {
    color: ${theme.colors.white};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${theme.colors.lime};
    border-radius: 2px;
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transform-origin: center;
    animation: ${({ $active }) => ($active ? slideIn : 'none')} 0.3s ease-out;
  }
`

export const ProjectsScrollWrapper = styled.div<{ $dragging?: boolean }>`
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  ${homeResponsiveSpace('padding: 20px 60px;', 'padding: 16px 32px;', 'padding: 12px 20px;')}
  cursor: ${({ $dragging }) => ($dragging ? 'grabbing' : 'grab')};
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const ProjectsScrollContainer = styled.div`
  display: flex;
  width: max-content;
  will-change: transform;
  transform: translate3d(0, 0, 0);
`

export const ProjectsList = styled.div`
  display: flex;
  ${homeResponsiveSpace('gap: 32px;', 'gap: 24px;', 'gap: 16px;')}
  ${homeResponsiveSpace('padding-right: 32px;', 'padding-right: 24px;', 'padding-right: 16px;')}
`

export const ProjectCard = styled.div`
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.4s;
  min-width: 320px;
  max-width: 320px;
  height: 380px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-12px);
  }

  ${media.down(theme.breakPoints.tablet)} {
    min-width: 256px;
    max-width: 256px;
    height: 300px;
  }
  img {
    width: 100%;
    height: 170px;
    object-fit: cover;

    ${media.down(theme.breakPoints.tablet)} {
      height: 136px;
    }
  }
`

export const ProjectImage = styled.div`
  width: 100%;
  height: 170px;
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 68px;
  flex-shrink: 0;

  ${media.down('1200px')} {
    height: 153px;
    font-size: 60px;
  }

  ${media.down(theme.breakPoints.tablet)} {
    height: 136px;
    font-size: 52px;
  }
`

export const ProjectContent = styled.div`
  background: rgba(255, 255, 255, 0.03);
  ${homeResponsiveSpace('padding: 26px;', 'padding: 20px;', 'padding: 16px;')}
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top: none;
  flex: 1;
  display: flex;
  flex-direction: column;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`

export const ProjectTitle = styled.h3`
  ${homeResponsiveFont('20px', '18px', '16px')}
  font-weight: 800;
  ${homeResponsiveSpace('margin-bottom: 12px;', 'margin-bottom: 10px;', 'margin-bottom: 8px;')}
  letter-spacing: -0.5px;
`

export const ProjectDescription = styled.p`
  ${homeResponsiveFont('14px', '13px', '12px')}
  color: ${theme.colors.gray[400]};
  line-height: 1.6;
  ${homeResponsiveSpace('margin-bottom: 16px;', 'margin-bottom: 12px;', 'margin-bottom: 10px;')}
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`

export const ProjectTech = styled.div`
  display: flex;
  ${homeResponsiveSpace('gap: 6px;', 'gap: 6px;', 'gap: 4px;')}
  flex-wrap: wrap;
`

export const TechTag = styled.span`
  ${homeResponsiveFont('11px', '11px', '10px')}
  color: ${theme.colors.lime};
  ${homeResponsiveSpace('padding: 4px 10px;', 'padding: 4px 8px;', 'padding: 3px 7px;')}
  border: 1px solid rgba(149, 239, 75, 0.3);
  border-radius: 6px;
  font-weight: 600;
`
