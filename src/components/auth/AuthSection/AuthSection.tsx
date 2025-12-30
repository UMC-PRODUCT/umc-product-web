import styled from '@emotion/styled'

const Section = styled.section<{ $size: 'md' | 'lg' }>`
  display: flex;
  justify-content: center;
  justify-self: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  gap: 48px;
  width: ${({ $size }) => ($size === 'md' ? '372px' : '408px')};
  max-width: 80%;
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
