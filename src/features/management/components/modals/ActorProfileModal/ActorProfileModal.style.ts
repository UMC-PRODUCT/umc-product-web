import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

export const ModalContentWrapper = styled(Flex)`
  width: 520px;
  max-width: 90vw;
  height: 800px;
  max-height: 80vh;
  overflow-y: scroll;
  padding: 24px;
  border: 1px solid ${theme.colors.gray[600]};
  border-radius: 12px;
  background-color: ${theme.colors.gray[700]};
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);

  ${media.down(theme.breakPoints.tablet)} {
    width: min(520px, calc(100vw - 24px));
    height: auto;
    padding: 18px;
  }
`

export const ModalTitle = styled.h2`
  ${theme.typography.H2.Sb};
  margin: 0;
  color: ${theme.colors.white};

  ${media.down(theme.breakPoints.tablet)} {
    ${theme.typography.H3.Sb};
  }
`

export const ModalButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`

export const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
  width: 100%;

  ${media.down(theme.breakPoints.tablet)} {
    align-items: flex-start;
    gap: 14px;
  }
`

export const ProfileImage = styled.img`
  width: 100px;
  min-width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  background-color: ${theme.colors.gray[600]};

  ${media.down(theme.breakPoints.tablet)} {
    width: 60px;
    min-width: 60px;
    height: 60px;
  }
`

export const Headline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  min-width: 0;
`

export const NameRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
`

export const Name = styled.h3`
  ${theme.typography.B1.Sb};
  margin: 0;
  color: ${theme.colors.white};

  ${media.down(theme.breakPoints.tablet)} {
    ${theme.typography.B3.Md};
  }
`

export const Status = styled.div`
  display: inline-flex;
  width: 67px;
  height: 28px;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border-radius: 4px;
  background-color: #2a3a2a;
  color: ${theme.colors.lime};
  ${theme.typography.C2.Rg};

  ${media.down(theme.breakPoints.tablet)} {
    ${theme.typography.C3.Md};
  }
`

export const Circle = styled.div`
  display: flex;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${theme.colors.lime};
`

export const School = styled.p`
  ${theme.typography.C2.Rg};
  margin: 0;
  color: ${theme.colors.white};

  ${media.down(theme.breakPoints.tablet)} {
    ${theme.typography.C3.Md};
  }
`

export const EmailRow = styled.div`
  display: inline-flex;
  width: fit-content;
  max-width: 100%;
  gap: 8px;
  align-items: center;
  color: ${theme.colors.gray[300]};
  ${theme.typography.C3.Md};

  span {
    min-width: 0;
    overflow-wrap: anywhere;
  }
`

export const MetaInfo = styled.span`
  ${theme.typography.C4.Rg};
  color: ${theme.colors.gray[300]};
  margin-top: 4px;
`

export const SectionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`

export const SectionTitle = styled.h4`
  ${theme.typography.H3.Sb};
  margin: 0;
  margin-top: 30px;
  color: ${theme.colors.white};

  ${media.down(theme.breakPoints.tablet)} {
    ${theme.typography.H4.Sb};
  }
`

export const SectionDescription = styled.p`
  margin: 0;
  width: 100%;
  color: ${theme.colors.gray[300]};
  text-align: start;
  ${theme.typography.C4.Rg};
`

export const RoleGroupList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`

export const RoleGroupCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  padding: 15px 16px;
  border-radius: 8px;
  background-color: ${theme.colors.gray[600]};
`

export const RoleGroupTitle = styled.span`
  display: flex;
  width: fit-content;
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid ${theme.colors.lime};
  background-color: #2a3a2a;
  color: ${theme.colors.lime};
  ${theme.typography.C4.Rg};
`

export const RoleGroupText = styled.span`
  color: ${theme.colors.white};
  ${theme.typography.C2.Rg};
`

export const EmptyText = styled.p`
  margin: 0;
  color: ${theme.colors.gray[400]};
  ${theme.typography.C4.Rg};
`

export const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const HistoryCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border: 1px solid ${theme.colors.gray[600]};
  border-radius: 14px;
`

export const HistoryRow = styled.div`
  display: grid;
  grid-template-columns: 60px repeat(3, minmax(0, 1fr));
  align-items: center;
  column-gap: 24px;
  width: 100%;

  ${media.down(theme.breakPoints.tablet)} {
    grid-template-columns: 52px 1fr 1fr;
    row-gap: 10px;
    column-gap: 12px;
  }
`

export const Generation = styled.div<{ isActive: boolean }>`
  display: flex;
  width: fit-content;
  padding: 4px 10px;
  white-space: nowrap;
  border-radius: 4px;
  color: ${({ isActive }) => (isActive ? theme.colors.lime : theme.colors.gray[300])};
  border: ${({ isActive }) =>
    isActive ? `1px solid ${theme.colors.lime}` : `1px solid ${theme.colors.gray[400]}`};
  background-color: ${({ isActive }) => (isActive ? '#2a3a2a' : theme.colors.gray[600])};

  ${media.down(theme.breakPoints.tablet)} {
    padding: 4px 8px;
    ${theme.typography.C4.Rg};
  }
`

export const ActivityInfo = styled.div<{ isActive: boolean }>`
  ${theme.typography.C2.Rg};
  display: flex;
  flex-direction: column;
  color: ${theme.colors.white};
  white-space: nowrap;

  span {
    color: ${({ isActive }) => (isActive ? theme.colors.white : theme.colors.gray[300])};
  }

  ${media.down(theme.breakPoints.tablet)} {
    ${theme.typography.C4.Rg};
  }
`

export const LinkList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const LinkCard = styled.a`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  min-width: 0;
  padding: 14px 16px;
  border-radius: 8px;
  color: ${theme.colors.white};
  text-decoration: none;
  background-color: ${theme.colors.gray[600]};
  transition:
    opacity 140ms ease,
    background-color 140ms ease;

  &:hover {
    opacity: 0.85;
  }
`

export const LinkLabel = styled.span`
  flex: 0 0 88px;
  color: ${theme.colors.lime};
  ${theme.typography.C3.Md};
`

export const LinkValue = styled.span`
  min-width: 0;
  text-align: right;
  color: ${theme.colors.gray[300]};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${theme.typography.C4.Rg};
`

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`
