import { Button } from '@/shared/ui/common/Button'
import { Checkbox } from '@/shared/ui/common/Checkbox'

import * as S from './DocsEvaluationRow.style'

type ApplicantRow = {
  id: number
  name: string
  parts: Array<string>
  docScore: string
  isPassed: boolean
}

const DocsEvaluationRow = ({
  item,
  checked,
  onToggle,

  setOpenModal,
}: {
  item: ApplicantRow
  checked: boolean
  onToggle: (checked: boolean | 'indeterminate') => void
  setOpenModal: ({
    open,
    modalName,
  }: {
    open: boolean
    modalName: 'setPassPart' | 'setPassSuccess' | 'setFail' | null
  }) => void
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
      <td>{item.id}</td>
      <td>
        <S.UserInfo>{item.name}</S.UserInfo>
      </td>
      <td>
        <S.TagGroup>
          {item.parts.map((p) => (
            <Button
              key={`${item.id}-${p}`}
              variant="outline"
              tone="gray"
              label={p}
              typo="B4.Md"
              css={S.tagButtonStyle}
            />
          ))}
        </S.TagGroup>
      </td>
      <td>{item.docScore}</td>
      <td>
        {item.isPassed ? (
          <S.ActionButton
            variant="solid"
            tone="necessary"
            label="합격 취소"
            typo="B4.Sb"
            onClick={() => setOpenModal({ open: true, modalName: 'setFail' })}
          />
        ) : (
          <S.ActionButton
            variant="solid"
            tone="lime"
            label="합격 처리"
            typo="B4.Sb"
            onClick={() =>
              item.parts.length > 1 && setOpenModal({ open: true, modalName: 'setPassSuccess' })
            }
          />
        )}
      </td>
    </tr>
  )
}

export default DocsEvaluationRow
