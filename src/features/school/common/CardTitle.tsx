import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'

const PartTitle = styled.div`
  ${theme.typography.B3.Md}
  color: ${theme.colors.white}
`

const CardTitle = ({ title }: { title: string }) => {
  return <PartTitle>{title}</PartTitle>
}

export default CardTitle
