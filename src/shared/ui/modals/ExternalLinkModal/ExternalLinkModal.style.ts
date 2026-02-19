import styled from '@emotion/styled'

import type { LinkType } from '@/shared/constants/umc'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

export const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const Title = styled.div`
  color: ${theme.colors.white};
  font-size: 20px;
  ${theme.typography.H3.Sb};
`

export const Subtitle = styled.div`
  margin-top: 8px;
  white-space: pre-line;
  color: ${theme.colors.gray[400]};
  ${theme.typography.B5.Rg};
`

export const ModalButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 0;
  width: 28px;
  height: 28px;
  cursor: pointer;
`

export const ModalContentWrapper = styled(Flex)`
  flex-direction: column;
  gap: 16px;
  background-color: ${theme.colors.gray[700]};
  border-radius: 8px;
  padding: 28px 28px 30px 34px;
  min-width: 492px;

  ${media.down(theme.breakPoints.tablet)} {
    gap: 8px;
    margin-top: 6px;
    padding: 28px 20px;
  }

  ${media.down(theme.breakPoints.mobile)} {
    min-width: 90vw;
  }
`

export const ContentWrapper = styled(Flex)`
  color: ${theme.colors.white};
  overflow: hidden;
`

export const LinkCard = styled(Flex)<{ $editing: boolean }>`
  flex-direction: column;
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  background-color: ${theme.colors.gray[800]};
`

export const LinkIconBox = styled(Flex)<{ $type: LinkType }>`
  align-items: center;
  justify-content: center;
  width: 52px;
  min-width: 52px;
  height: 52px;
  border-radius: 8px;
  flex-shrink: 0;
  background-color: ${({ $type }) =>
    $type === 'KAKAO'
      ? theme.colors.kakao
      : $type === 'INSTAGRAM'
        ? 'transparent'
        : theme.colors.white};

  ${media.down(theme.breakPoints.tablet)} {
    width: 40px;
    max-width: 40px;
    min-width: 40px;
    height: 40px;
  }
`

export const LinkTextGroup = styled(Flex)`
  flex: 1;
  min-width: 0;
`

export const LinkTitle = styled.div`
  color: ${theme.colors.white};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${theme.typography.B3.Md};
  ${media.down(theme.breakPoints.tablet)} {
    ${theme.typography.B5.Md};
  }
`

export const LinkUrl = styled.div`
  color: ${theme.colors.gray[400]};
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  max-width: 264px;
`

export const AddCard = styled(Flex)`
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  background-color: ${theme.colors.gray[800]};
  border: 1px solid ${theme.colors.gray[700]};
`
