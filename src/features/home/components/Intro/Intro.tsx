import * as S from './Intro.style'

const Intro = () => {
  return (
    <S.Container flexDirection="column">
      <S.MainTitle>UNIVERSITY MAKEUS CHALLENGE</S.MainTitle>
      <S.MainSlogan>BREAK THE RULES!</S.MainSlogan>
      <S.Info>
        기획부터 개발까지 가능한 대학생 IT 창업 연합 동아리, UMC에서 새로운 가능성을 발견하세요.
      </S.Info>
      <S.CustomButton tone="lime" label="10기 지원하기" />
      <S.Highlight />
    </S.Container>
  )
}

export default Intro
