import * as S from './ValuesSection.style'

const ValuesSection = () => {
  return (
    <S.Section>
      <S.SectionHeader data-animate>
        <S.SectionBadge>WHY UMC</S.SectionBadge>
        <S.SectionTitle>We Experience</S.SectionTitle>
      </S.SectionHeader>
      <S.ValuesGrid>
        <S.ValueCard data-animate style={{ transitionDelay: '0.1s' }}>
          <S.ValueIcon>📚</S.ValueIcon>
          <S.ValueTitle>Study</S.ValueTitle>
          <S.ValueText>
            10-12주간 자신이 맡은 파트에 대한 전문성을 갖추기 위한 스터디를 진행합니다.
          </S.ValueText>
        </S.ValueCard>
        <S.ValueCard data-animate style={{ transitionDelay: '0.2s' }}>
          <S.ValueIcon>🚀</S.ValueIcon>
          <S.ValueTitle>Project</S.ValueTitle>
          <S.ValueText>
            8주간 몰입하여 서비스 기획부터 검증, 출시까지 실제 프로덕트 개발 전 과정을 경험합니다.
          </S.ValueText>
        </S.ValueCard>
        <S.ValueCard data-animate style={{ transitionDelay: '0.3s' }}>
          <S.ValueIcon>🤝</S.ValueIcon>
          <S.ValueTitle>Networking</S.ValueTitle>
          <S.ValueText>
            다양한 직군의 팀원들과 협력하며 아이디어를 확장하고 협업의 기반을 다집니다.
          </S.ValueText>
        </S.ValueCard>
      </S.ValuesGrid>
    </S.Section>
  )
}

export default ValuesSection
