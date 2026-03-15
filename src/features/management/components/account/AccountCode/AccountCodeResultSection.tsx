import type { ChallengerRecordCodeResponseDTO } from '@/features/management/domain/model'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'
import Table from '@/shared/ui/common/Table/Table'
import * as TableStyles from '@/shared/ui/common/Table/Table.style'
import { transformRoleKorean } from '@/shared/utils/transformKorean'

import * as S from './AccountCode.style'
import { getChallengerRecordPartLabel, RESULT_TABLE_HEADER_LABELS } from './accountCode.utils'

type AccountCodeResultSectionProps = {
  generatedCodes: Array<ChallengerRecordCodeResponseDTO>
  onCopy: (text: string, message: string) => Promise<void>
}

const AccountCodeResultSection = ({ generatedCodes, onCopy }: AccountCodeResultSectionProps) => {
  const copyAllCodesText = generatedCodes
    .map((code) => `${code.memberName},${code.code}`)
    .join('\n')

  return (
    <Section variant="solid" padding="20px" gap={20}>
      <S.SectionHeader>
        <S.SectionTitleWrap alignItems="flex-start">
          <S.SectionTitle>발급 결과</S.SectionTitle>
          <S.SectionDescription>
            현재 세션에서 생성한 코드를 확인하고 바로 복사할 수 있습니다.
          </S.SectionDescription>
        </S.SectionTitleWrap>

        {generatedCodes.length > 0 && (
          <S.Actions width={'fit-content'}>
            <Button
              label="전체 복사"
              tone="gray"
              variant="outline"
              onClick={() =>
                void onCopy(copyAllCodesText, `${generatedCodes.length}건의 코드를 복사했습니다.`)
              }
              css={{ width: '108px', height: '41px' }}
            />
          </S.Actions>
        )}
      </S.SectionHeader>

      {generatedCodes.length === 0 ? (
        <S.EmptyState>
          <S.EmptyTitle>아직 발급된 코드가 없습니다.</S.EmptyTitle>
          <S.EmptyDescription>
            코드를 생성하면 여기에서 발급 결과를 바로 확인할 수 있습니다.
          </S.EmptyDescription>
        </S.EmptyState>
      ) : (
        <Table
          headerLabels={RESULT_TABLE_HEADER_LABELS}
          rows={generatedCodes}
          getRowId={(item) => item.code}
          count={{ totalAmounts: generatedCodes.length, label: '코드' }}
          renderRow={(item) => (
            <>
              <TableStyles.Td>
                <S.CodeChip>{item.code}</S.CodeChip>
              </TableStyles.Td>
              <TableStyles.Td>{item.memberName}</TableStyles.Td>
              <TableStyles.Td css={{ whiteSpace: 'normal' }}>
                <Flex flexDirection="column" gap={2} alignItems="flex-start">
                  <S.MetaText>{item.schoolName}</S.MetaText>
                  <S.MetaSubText>{item.chapterName}</S.MetaSubText>
                </Flex>
              </TableStyles.Td>
              <TableStyles.Td css={{ whiteSpace: 'normal' }}>
                <Flex flexDirection="column" gap={2} alignItems="flex-start">
                  <S.MetaText>{item.gisu}기</S.MetaText>
                  <S.MetaSubText>{getChallengerRecordPartLabel(item.part)}</S.MetaSubText>
                </Flex>
              </TableStyles.Td>
              <TableStyles.Td>
                {item.challengerRoleType ? transformRoleKorean(item.challengerRoleType) : '챌린저'}
              </TableStyles.Td>
              <TableStyles.Td>
                <Button
                  label="복사"
                  tone="gray"
                  variant="outline"
                  onClick={() =>
                    void onCopy(item.code, `${item.memberName}의 코드를 복사했습니다.`)
                  }
                  css={{ width: '72px', height: '32px', padding: '8px 12px' }}
                />
              </TableStyles.Td>
            </>
          )}
        />
      )}
    </Section>
  )
}

export default AccountCodeResultSection
