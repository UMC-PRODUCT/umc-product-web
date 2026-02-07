import * as S from './CtaSection.style'

type Props = {
  onCta: () => void
}

const CtaSection = ({ onCta }: Props) => {
  return (
    <S.CtaSection>
      <S.CtaContent data-animate>
        <S.CtaTitle>University MakeUs Challenge</S.CtaTitle>
        <S.CtaText>UMC와 함께하는 도전의 여정</S.CtaText>
        <S.HeroCta type="button" $visible onClick={onCta}>
          10기 지원하기
        </S.HeroCta>
      </S.CtaContent>
      <S.Blur />
    </S.CtaSection>
  )
}

export default CtaSection
