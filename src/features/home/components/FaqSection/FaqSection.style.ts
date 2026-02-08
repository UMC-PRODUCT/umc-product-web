import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'

export {
  Section,
  SectionBadge,
  SectionHeader,
  SectionTitle,
} from '../../pages/styles/HomePage.common.style'

export const FaqContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`

export const FaqItem = styled.div<{ $active?: boolean }>`
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;

  &.animate,
  &[data-animated='true'] {
    opacity: 1;
    transform: none;
  }

  ${({ $active }) =>
    $active &&
    `
    .faq-answer {
      max-height: 300px;
      padding-top: 12px;
      padding-bottom: 32px;
      opacity: 1;
    }
    .faq-toggle::before {
      border-top: none;
      border-bottom: 10px solid ${theme.colors.lime};
    }
  `}
`

export const FaqQuestion = styled.button`
  padding: 32px 0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: none;
  border: none;
  color: inherit;
  text-align: left;
`

export const FaqQuestionTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin: 0;
`

export const FaqToggle = styled.span`
  width: 24px;
  height: 24px;
  position: relative;
  transition: transform 0.4s ease;
  flex-shrink: 0;
  margin-left: 20px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 10px solid ${theme.colors.lime};
    transition: all 0.4s ease;
  }
`

export const FaqAnswer = styled.div`
  max-height: 0;
  overflow: hidden;
  transition:
    max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    padding 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
`

export const FaqAnswerText = styled.p`
  font-size: 16px;
  color: ${theme.colors.gray[400]};
  line-height: 1.8;
  margin: 0;
`
