import styled from '@emotion/styled'

import { media } from '@/styles/media'
import { theme } from '@/styles/theme'

const Section = styled.section<{ $size: 'md' | 'lg' }>`
  display: flex;
  justify-content: center;
  justify-self: center;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  gap: ${({ $size }) => ($size === 'md' ? '48px' : '33px')};
  width: ${({ $size }) => ($size === 'md' ? '420px' : '452px')};
  max-width: 90vw;
  min-height: 100vh;
  flex: 1;
  overflow-x: hidden;
  ${media.down(theme.breakPoints.tablet)} {
    padding: 50px 0 50px 0;
    gap: 34px;
  }
  overflow-y: auto;
`

export default function AuthSection({
  children,
  size,
}: {
  children: React.ReactNode
  size: 'md' | 'lg'
}) {
  return <Section $size={size}>{children}</Section>
}
