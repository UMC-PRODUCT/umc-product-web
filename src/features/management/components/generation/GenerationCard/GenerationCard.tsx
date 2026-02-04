import Trash from '@shared/assets/icons/trash.svg?react'

import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button'
import Section from '@/shared/ui/common/Section/Section'

const GenerationCard = () => {
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
      />
    </Section>
  )
}
export default GenerationCard
