import * as S from '@/features/apply/components/shared'
import { Button } from '@/shared/ui/common/Button'

import PartInfoCard from './PartInfoCard'

export default function BeforeSubmit({
  data,
}: {
  data: Array<{ part: string; state: string; ability: Array<string> }>
}) {
  return (
    <>
      <S.PartInfoCardWrapper gap={'16px'} flexDirection="column">
        {data.map(({ part, state, ability }) => (
          <PartInfoCard key={part} part={part} state={state} ability={ability} />
        ))}
      </S.PartInfoCardWrapper>
      <Button label="UMC 10기 지원하기" tone="lime"></Button>
    </>
  )
}
