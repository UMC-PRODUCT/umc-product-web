import Flex from '../Flex/Flex'
import styled from '@emotion/styled'
const Button = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  outline: inherit;
  white-space: nowrap;
  ${({ theme }) => theme.typography.H4.Md}
`
export default function LeftMenu() {
  return (
    <nav>
      <Flex direction="row" gap="48px" css={{ color: 'white' }}>
        <Button>데이터 관리</Button>
        <Button>학교 관리</Button>
        <Button>계정 관리</Button>
        <Button>공지 관리</Button>
        <Button>정책 관리</Button>
      </Flex>
    </nav>
  )
}
