import styled from '@emotion/styled'

const Section = styled.section<{ $size: 'md' | 'lg' }>`
  display: flex;
  justify-content: center;
  justify-self: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 24px;
  gap: 48px;
  width: ${({ $size }) => ($size === 'md' ? '420px' : '452px')};
  max-width: 80%;
  flex: 1;
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
