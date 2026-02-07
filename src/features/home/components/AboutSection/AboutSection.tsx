import * as S from './AboutSection.style'

const AboutSection = () => {
  return (
    <S.Section id="about">
      <S.SectionHeader data-animate>
        <S.SectionBadge>ABOUT UMC</S.SectionBadge>
        <S.SectionTitle>Who Are We?</S.SectionTitle>
        <S.SectionDescription>
          UMC는 기획자, 디자이너, 개발자가 함께 아이디어를 현실로 만드는 대학생 개발 연합
          동아리입니다.
        </S.SectionDescription>
      </S.SectionHeader>
      <S.AboutGrid>
        <S.AboutContent data-animate style={{ transitionDelay: '0.1s' }}>
          <S.AboutTitle>도전</S.AboutTitle>
          <S.AboutText>
            실제 서비스를 기획하고 개발하며, 실무에서 필요한 역량을 기릅니다. <br />
            스터디 진행 후 프로젝트에 참여하기 때문에, 열정만 있다면 누구나 도전할 수 있습니다.
          </S.AboutText>
        </S.AboutContent>
        <S.AboutContent data-animate style={{ textAlign: 'right', transitionDelay: '0.3s' }}>
          <S.AboutTitle>평등</S.AboutTitle>
          <S.AboutText css={{ marginLeft: 'auto' }}>
            모든 파트원이 동등한 기회를 갖고 자신의 아이디어를 실현할 수 있습니다.
            <br />
            수평적인 문화 속에서 자유롭게 의견을 나누고 성장합니다.
          </S.AboutText>
        </S.AboutContent>
        <S.AboutContent data-animate style={{ transitionDelay: '0.5s' }}>
          <S.AboutTitle>자신감</S.AboutTitle>
          <S.AboutText>
            프로젝트를 완성하며 얻은 경험은 여러분에게 확신을 줍니다.
            <br /> UMC와 함께라면 어떤 도전도 해낼 수 있습니다.
          </S.AboutText>
        </S.AboutContent>
      </S.AboutGrid>
    </S.Section>
  )
}

export default AboutSection
