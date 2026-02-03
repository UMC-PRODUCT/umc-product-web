import { Button } from '@/shared/ui/common/Button'
import { Checkbox } from '@/shared/ui/common/Checkbox'

import * as S from './FinalEvaluation.style'
import * as RowS from './FinalEvaluationRow.style'

type ApplicantRow = {
  id: number
  name: string
  parts: Array<string>
  docScore: string
  interviewScore: string
  finalScore: string
  result: string
  isPassed: boolean
}

const FinalEvaluationRow = ({
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
          css={{ borderColor: RowS.colors.checkboxBorder }}
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
              css={RowS.tagButtonStyle}
            />
          ))}
        </S.TagGroup>
      </td>
      <td>{item.docScore}</td>
      <td>{item.interviewScore}</td>
      <td className="highlight">{item.finalScore}</td>
      <td css={RowS.resultTextStyle}>
        {item.result === 'N/A' ? (
          item.result
        ) : (
          <Button
            variant="outline"
            tone="gray"
            label={item.result}
            typo="B4.Md"
            css={RowS.resultButtonStyle}
          />
        )}
      </td>
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
              item.parts.length > 1
                ? setOpenModal({ open: true, modalName: 'setPassPart' })
                : setOpenModal({ open: true, modalName: 'setPassSuccess' })
            }
          />
        )}
      </td>
    </tr>
  )
}

export default FinalEvaluationRow
