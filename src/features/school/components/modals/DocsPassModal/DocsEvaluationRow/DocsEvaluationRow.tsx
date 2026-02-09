import type { DocumentSelectionApplication } from '@/features/school/domain'
import { Button } from '@/shared/ui/common/Button'
import { Checkbox } from '@/shared/ui/common/Checkbox'
import { Flex } from '@/shared/ui/common/Flex'

import * as S from './DocsEvaluationRow.style'

const DocsEvaluationRow = ({
  item,
  checked,
  onToggle,
  onPass,
  onFail,
}: {
  item: DocumentSelectionApplication
  checked: boolean
  onToggle: (checked: boolean | 'indeterminate') => void
  onPass: () => void
  onFail: () => void
}) => {
  return (
    <tr>
      <td>
        <Checkbox
          checked={checked}
          onCheckedChange={onToggle}
          css={{ borderColor: S.colors.checkboxBorder }}
        />
      </td>
      <td>{item.applicationId}</td>
      <td>
        <S.UserInfo>
          {item.applicant.nickname}/{item.applicant.name}
        </S.UserInfo>
      </td>
      <td>
        <S.TagGroup>
          {item.appliedParts.map((p) => (
            <Button
              key={`${item.applicationId}-${p.part.key}-${p.priority}`}
              variant="outline"
              tone="gray"
              label={p.part.label}
              typo="B4.Md"
              css={S.tagButtonStyle}
            />
          ))}
        </S.TagGroup>
      </td>
      <td>{item.documentScore}</td>
      <td>
        {item.documentResult.decision === 'WAIT' ? (
          <Flex gap={8}>
            <S.ActionButton
              variant="solid"
              tone="lime"
              label="합격 처리"
              typo="B4.Sb"
              onClick={() => onPass()}
            />
            <S.ActionButton
              variant="solid"
              tone="necessary"
              label="불합격 처리"
              typo="B4.Sb"
              onClick={() => onFail()}
            />
          </Flex>
        ) : item.documentResult.decision === 'PASS' ? (
          <S.ActionButton
            variant="solid"
            tone="necessary"
            label="합격 취소"
            typo="B4.Sb"
            onClick={() => onFail()}
          />
        ) : (
          <S.ActionButton
            variant="solid"
            tone="lime"
            label="합격 처리"
            typo="B4.Sb"
            onClick={() => onPass()}
          />
        )}
      </td>
    </tr>
  )
}

export default DocsEvaluationRow
