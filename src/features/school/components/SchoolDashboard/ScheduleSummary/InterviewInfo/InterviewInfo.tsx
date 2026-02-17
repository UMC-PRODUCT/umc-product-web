import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

const InterviewInfo = ({
  time,
  name,
  nickname,
}: {
  time: string
  name: string
  nickname: string
}) => {
  const displayTime = time.split(':').slice(0, 2).join(':')

  return (
    <Flex gap={12}>
      <TimeInfo>{displayTime}</TimeInfo>
      <NameInfo>
        {name}/{nickname}
      </NameInfo>
    </Flex>
  )
}

const TimeInfo = styled.div`
  ${theme.typography.B4.Rg}
  color: ${theme.colors.gray[400]};
  white-space: nowrap;
`

const NameInfo = styled.div`
  ${theme.typography.B4.Md}
  color: ${theme.colors.white};
  white-space: nowrap;
`

export default InterviewInfo
