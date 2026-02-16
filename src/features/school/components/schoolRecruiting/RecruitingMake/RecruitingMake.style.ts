import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import Section from '@/shared/ui/common/Section/Section'

export const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  .title {
    ${theme.typography.B1.Sb}
    white-space: nowrap;
    color: ${theme.colors.white};
  }
  .description {
    ${theme.typography.B4.Md}
    white-space: nowrap;

    color: ${theme.colors.gray[400]};
  }

  ${media.down(theme.breakPoints.tablet)} {
    grid-template-columns: 1fr;
  }
`

export const Card = styled(Section)`
  padding: 28px 36px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 0 2px ${theme.colors.lime};
  }
  ${media.down(theme.breakPoints.tablet)} {
    padding: 20px 20px;
  }
`
