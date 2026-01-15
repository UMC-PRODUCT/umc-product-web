import { Field } from '@/shared/styles/formStyles'

import ErrorMessage from '../../common/ErrorMessage/ErrorMessage'
import Label from '../../common/Label'
import { LongText } from '../../common/question/longText/LongText'
import * as S from './LabelLongTextField.style'

const LabelLongTextField = ({
  label,
  id,
  placeholder,
  error,
  value,
  onChange,
}: {
  label: string
  id: string
  placeholder: string
  value?: string
  onChange?: (newValue: string) => void
  error?: {
    error: boolean
    errorMessage: string
  }
}) => {
  return (
    <Field>
      <S.InputHeader>
        <Label label={label} necessary={true} htmlFor={id} />
        {error?.error && (
          <ErrorMessage
            typo="B4.Md"
            responsiveTypo={{ tablet: 'B4.Md' }}
            errorMessage={error.errorMessage}
          />
        )}
      </S.InputHeader>

      <LongText
        placeholder={placeholder}
        mode="edit"
        minHeight={260}
        value={value}
        onChange={onChange}
      />
    </Field>
  )
}

export default LabelLongTextField
