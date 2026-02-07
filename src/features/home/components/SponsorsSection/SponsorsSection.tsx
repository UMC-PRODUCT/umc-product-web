import type { Sponsor } from '../../pages/home.constants'
import * as S from './SponsorsSection.style'

type Props = {
  sponsors: Array<Sponsor>
}

const SponsorsSection = ({ sponsors }: Props) => {
  return (
    <S.Section id="sponsors">
      <S.SectionHeader data-animate>
        <S.SectionBadge>SPONSOR</S.SectionBadge>
        <S.SectionTitle>후원사</S.SectionTitle>
      </S.SectionHeader>
      <S.SponsorsContainer>
        {sponsors.map((sponsor, index) => (
          <S.SponsorRow
            key={sponsor.name}
            $direction={index % 2 === 0 ? 'left' : 'right'}
            data-animate
            style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
          >
            <S.SponsorLogoContainer>
              <img src={sponsor.logo} alt={sponsor.name} />
            </S.SponsorLogoContainer>
            <S.SponsorInfo style={index % 2 === 1 ? { textAlign: 'right' } : undefined}>
              <S.SponsorName>{sponsor.name}</S.SponsorName>
              <S.SponsorText>{sponsor.description}</S.SponsorText>
            </S.SponsorInfo>
          </S.SponsorRow>
        ))}
      </S.SponsorsContainer>
    </S.Section>
  )
}

export default SponsorsSection
