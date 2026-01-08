import { useState } from 'react'

import * as S from '@/features/apply/components/shared'
import { Button } from '@/shared/ui/common/Button'

import CautionConfirm from './modals/CautionConfirm'
import PartInfoCard from './PartInfoCard'

interface BeforeSubmitProps {
  data: Array<{ part: string; state: string; ability: Array<string> }>
}

export default function BeforeSubmit({ data }: BeforeSubmitProps) {
  const [isNowRecruiting, _setIsNowRecruiting] = useState(true) // TODO: 추후 API 연동 시 모집 여부에 따라 변경
  const [modal, setModal] = useState(false)

  const closeModal = () => {
    setModal(false)
  }

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
        onClick={() => setModal(!modal)}
      />
      {modal && (
        <CautionConfirm onClose={closeModal} createNewResume={() => {}} existingResumeId={1} />
      )}
    </>
  )
}
