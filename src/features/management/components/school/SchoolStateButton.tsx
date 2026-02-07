import * as S from './SchoolStateButton.style'

const SchoolStateButton = ({ label, isActive }: { label: string; isActive: boolean }) => {
  return (
    <S.StateBadge isActive={isActive}>
      <S.Circle isActive={isActive} />
      {label}
    </S.StateBadge>
  )
}

export default SchoolStateButton
