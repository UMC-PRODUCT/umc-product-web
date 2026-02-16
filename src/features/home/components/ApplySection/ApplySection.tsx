import type { TimelineItem } from '../../domain/constants'
import * as S from './ApplySection.style'

type Props = {
  items: Array<TimelineItem>
}

const ApplySection = ({ items }: Props) => {
  return (
    <S.Section id="apply">
      <S.SectionHeader data-animate>
        <S.SectionBadge>RECRUIT</S.SectionBadge>
        <S.SectionTitle>모집 일정</S.SectionTitle>
      </S.SectionHeader>
      <S.Timeline>
        {items.map((item, index) => (
          <S.TimelineItem
            key={item.title}
            data-animate
            style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
          >
            <S.TimelineDate>{item.date}</S.TimelineDate>
            <div>
              <S.TimelineTitle>{item.title}</S.TimelineTitle>
              <S.TimelineText>{item.description}</S.TimelineText>
            </div>
          </S.TimelineItem>
        ))}
      </S.Timeline>
    </S.Section>
  )
}

export default ApplySection
