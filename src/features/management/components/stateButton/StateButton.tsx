import * as S from './StateButton.style'

const StateButton = ({ label, isActive }: { label: string; isActive: boolean }) => {
  return (
    <S.StateBadge isActive={isActive}>
      <S.Circle isActive={isActive} />
      {label}
    </S.StateBadge>
  )
}

export default StateButton
