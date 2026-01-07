import { useState } from 'react'

import * as S from '@/features/apply/components/shared'
import { Button } from '@/shared/ui/common/Button'

import PartInfoCard from './PartInfoCard'

export default function BeforeSubmit({
  data,
  setModal,
}: {
  data: Array<{ part: string; state: string; ability: Array<string> }>
  setModal: React.Dispatch<React.SetStateAction<{ isOpen: boolean; link: string }>>
}) {
  const [isNowRecruiting, _setIsNowRecruiting] = useState(true) // TODO: 추후 API 연동 시 모집 여부에 따라 변경
  const [applyId, _setApplyId] = useState<number>(1) // TODO: 추후 작성 중인 지원서 ID로 변경
  return (
    <>
      <S.PartInfoCardWrapper gap={'16px'} flexDirection="column">
        {data.map(({ part, state, ability }) => (
          <PartInfoCard key={part} part={part} state={state} ability={ability} />
        ))}
      </S.PartInfoCardWrapper>
      <Button
        label="UMC 10기 지원하기"
        tone={isNowRecruiting ? 'lime' : 'darkGray'}
        disabled={!isNowRecruiting}
        onClick={() => setModal({ isOpen: true, link: `/apply/${applyId}` })}
      />
    </>
  )
}
