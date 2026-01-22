import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

import { media } from '@shared/styles/media'
import { theme } from '@shared/styles/theme'

const Card = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.gray[700]};
  border-radius: 16px;
  padding: 24px 46px 15px 46px;
  z-index: 99999;
  position: relative;
  ${media.down(theme.breakPoints.mobile)} {
    padding: 15px 20px 15px 20px;
  }
`

const Header = styled.header`
  border-bottom: 1.5px solid ${theme.colors.gray[600]};
`

const Title = styled.h1`
  color: ${theme.colors.white};
  ${theme.typography.H2.Sb}
`

const ContentWrapper = styled.main`
  height: calc(100% - 72px);
  overflow: auto;
`

const ContentSection = styled.section`
  color: ${theme.colors.white};
  padding-right: 12px;
  margin-top: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Heading1 = styled.h1`
  ${theme.typography.B1.Sb};
  margin-bottom: 16px;
`

const Heading2 = styled.h2`
  ${theme.typography.B3.Sb};
  margin-top: 24px;
  margin-bottom: 12px;
`

const Paragraph = styled.p`
  ${theme.typography.B4.Rg};
  margin-bottom: 12px;
`

const ListItem = styled.li`
  ${theme.typography.B4.Rg};
  margin-bottom: 6px;
`

const Divider = styled.hr`
  border: 0.5px solid ${theme.colors.gray[600]};
  margin: 16px 0;
`

const TableWrapper = styled.div`
  overflow-x: auto;
`

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  ${theme.typography.B4.Rg};
`

const TableHeader = styled.th`
  border: 1px solid ${theme.colors.gray[600]};
  padding: 8px;
  background-color: ${theme.colors.gray[600]};
  color: ${theme.colors.white};
  text-align: left;
`

const TableCell = styled.td`
  border: 1px solid ${theme.colors.gray[600]};
  padding: 8px;
  color: ${theme.colors.white};
`

const Blur = styled.div`
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 999999;
  border-radius: 0 0 16px 16px;
  background: linear-gradient(
    to bottom,
    rgba(39, 39, 39, 0) 0%,
    rgba(39, 39, 39, 1) 70%,
    rgba(39, 39, 39, 1) 100%
  );
`

const spinRotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Spinner = styled.span`
  width: 32px;
  height: 32px;
  border: 3px solid rgba(255, 255, 255, 0.25);
  border-top-color: ${theme.colors.lime};
  border-radius: 50%;
  animation: ${spinRotation} 0.8s linear infinite;
`

const StatusWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding-top: 40px;
`

export {
  Blur,
  Card,
  ContentSection,
  ContentWrapper,
  Divider,
  Header,
  Heading1,
  Heading2,
  ListItem,
  Paragraph,
  Spinner,
  StatusWrapper,
  StyledTable,
  TableCell,
  TableHeader,
  TableWrapper,
  Title,
}
