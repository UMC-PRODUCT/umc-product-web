import { useState } from 'react'

import Trash from '@shared/assets/icons/trash.svg?react'

import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button'
import Section from '@/shared/ui/common/Section/Section'

import DeleteGenerationConfirm from '../../modals/DeleteGenerationConfirm/DeleteGenerationConfirm'
import ExistGeneration from '../../modals/ExistGeneration/ExistGenration'

const GenerationCard = ({ gisuId, gisuName }: { gisuId: string; gisuName: string }) => {
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
      css={{
        color: theme.colors.white,
        border: `1px solid #2a2a2a`,
        ...theme.typography.C2.Rg,
      }}
    >
      {gisuName}기
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
          gisuId={gisuId}
        />
      )}
      {modalOpen.isOpen && modalOpen.modalName === 'exist' && (
        <ExistGeneration onClose={() => setModalOpen({ isOpen: false, modalName: null })} />
      )}
    </Section>
  )
}
export default GenerationCard
