import styled from '@emotion/styled'
export default function AuthSection({
  children,
  size,
}: {
  children: React.ReactNode
  size: 'md' | 'lg'
}) {
  const Section = styled.section`
    display: flex;
    justify-content: center;
    justify-self: center;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    gap: 48px;
    width: ${size === 'md' ? '372px' : '408px'};
    max-width: 80%;
  `
  return <Section>{children}</Section>
}
