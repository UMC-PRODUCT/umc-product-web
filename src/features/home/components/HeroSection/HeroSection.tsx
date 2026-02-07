import { heroText } from '../../pages/home.constants'
import * as S from './HeroSection.style'

type Props = {
  typedText: string
  typingDone: boolean
  onCta: () => void
}

const HeroSection = ({ typedText, typingDone, onCta }: Props) => {
  return (
    <S.Hero>
      <div>
        <S.HeroBadge>UNIVERSITY MAKEUS CHALLENGE</S.HeroBadge>
        <S.HeroTitle aria-label={heroText}>
          {typedText.split('').map((char, index) => (
            <S.HeroChar key={`${char}-${index}`} $isCursor={index === typedText.length - 1}>
              {char}
            </S.HeroChar>
          ))}
        </S.HeroTitle>
        <S.HeroSubtitle $visible={typingDone}>
          대학생 IT 프로젝트 동아리, UMC에서 새로운 가능성을 발견하세요.
        </S.HeroSubtitle>
        <S.HeroCta type="button" $visible={typingDone} onClick={onCta}>
          10기 지원하기
        </S.HeroCta>
      </div>
    </S.Hero>
  )
}

export default HeroSection
