import { heroText } from '../../domain/constants'
import * as S from './HeroSection.style'

type Props = {
  typedText: string
  typingDone: boolean
  onCta: () => void
}

const HeroSection = ({ typedText, typingDone, onCta }: Props) => {
  return (
    <S.Hero>
      <S.HeroBadge>UMC | UNIVERSITY MAKEUS CHALLENGE</S.HeroBadge>
      <S.HeroTitle aria-label={heroText}>
        {typedText.split('').map((char, index) => (
          <S.HeroChar key={`${char}-${index}`} $isCursor={index === typedText.length - 1}>
            {char}
          </S.HeroChar>
        ))}
      </S.HeroTitle>
      <S.HeroSubtitle $visible={typingDone}>
        대학생 IT 프로젝트 연합동아리 UMC에서 기획, 디자인, 개발 프로젝트를 경험해 보세요.
      </S.HeroSubtitle>
      <S.HeroCta type="button" $visible={typingDone} onClick={onCta}>
        10기 지원하기
      </S.HeroCta>
    </S.Hero>
  )
}

export default HeroSection
