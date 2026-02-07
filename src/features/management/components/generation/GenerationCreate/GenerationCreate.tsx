import { Button } from '@/shared/ui/common/Button'
import Section from '@/shared/ui/common/Section/Section'
import SectionTitle from '@/shared/ui/common/SectionTitles/SectionTitle'

import * as S from './GenerationCreate.style'

const GenerationCreate = () => {
  return (
    <Section variant="solid" alignItems="flex-start" gap={10}>
      <SectionTitle title="기수 생성" />
      <S.ButtonWrapper>
        <input type="text" placeholder="기수 번호를 입력하세요." />
        <Button
          variant="solid"
          tone="lime"
          label="생성하기"
          typo="C3.Md"
          css={{ width: 'fit-content', padding: '7px 17px', height: '50px' }}
        />
      </S.ButtonWrapper>
    </Section>
  )
}

export default GenerationCreate
