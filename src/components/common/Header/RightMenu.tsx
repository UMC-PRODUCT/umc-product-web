import { theme } from '@/styles/theme'
import Flex from '../Flex/Flex'
import ArrowUp from '@/assets/icons/arrow_up.svg?react'
import Arrow from '@/assets/icons/Arrow.svg?react'
import styled from '@emotion/styled'
const A = styled.a`
  display: flex;
  align-items: center;
  gap: 4px;
  text-decoration: none;
  color: inherit;
`
export default function LeftMenu() {
  return (
    <nav>
      <Flex direction="row" gap="32px" css={{ color: theme.colors.white }}>
        <A href="">
          시스템 관리<ArrowUp width={22}></ArrowUp>
        </A>
        <A href="">
          외부 링크 <Arrow width={22}></Arrow>
        </A>
      </Flex>
    </nav>
  )
}
