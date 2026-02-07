import { useState } from 'react'

import Trash from '@shared/assets/icons/trash.svg?react'

import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button'
import Section from '@/shared/ui/common/Section/Section'

import DeleteGenerationConfirm from '../../modals/DeleteGenerationConfirm/DeleteGenerationConfirm'
import ExistGeneration from '../../modals/ExistGeneration/ExistGenration'

const GenerationCard = () => {
  const [modalOpen, setModalOpen] = useState<{
    isOpen: boolean
    modalName: 'delete' | 'exist' | null
  }>({
    isOpen: false,
    modalName: null,
  })
  return (
    <Section
      variant="both"
      padding="5px 70px"
      justifyContent="space-between"
      flexDirection="row"
      alignItems="center"
      css={{ color: theme.colors.white, ...theme.typography.C2.Rg }}
    >
      10기
      <Button
        Icon={Trash}
        iconSize={15}
        typo="C2.Rg"
        tone="necessary"
        variant="outline"
        label="삭제"
        css={{ width: 'fit-content', padding: '7px 20px' }}
        onClick={() => setModalOpen({ isOpen: true, modalName: 'delete' })}
      />
      {modalOpen.isOpen && modalOpen.modalName === 'delete' && (
        <DeleteGenerationConfirm
          onClose={() => setModalOpen({ isOpen: false, modalName: null })}
          gisuId={'10'} // TODO: 기수 ID로 변경 필요
        />
      )}
      {modalOpen.isOpen && modalOpen.modalName === 'exist' && (
        <ExistGeneration onClose={() => setModalOpen({ isOpen: false, modalName: null })} />
      )}
    </Section>
  )
}
export default GenerationCard
