import type { FaqItem } from '../../pages/home.constants'
import * as S from './FaqSection.style'

type Props = {
  items: Array<FaqItem>
  activeIndex: number | null
  onToggle: (index: number) => void
}

const FaqSection = ({ items, activeIndex, onToggle }: Props) => {
  return (
    <S.Section id="faq">
      <S.SectionHeader data-animate>
        <S.SectionBadge>FAQ</S.SectionBadge>
        <S.SectionTitle>자주 묻는 질문</S.SectionTitle>
      </S.SectionHeader>
      <S.FaqContainer>
        {items.map((item, index) => (
          <S.FaqItem
            key={item.question}
            $active={activeIndex === index}
            data-animate
            style={{ transitionDelay: `${0.1 + index * 0.05}s` }}
          >
            <S.FaqQuestion type="button" onClick={() => onToggle(index)}>
              <S.FaqQuestionTitle>{item.question}</S.FaqQuestionTitle>
              <S.FaqToggle className="faq-toggle" />
            </S.FaqQuestion>
            <S.FaqAnswer className="faq-answer">
              <S.FaqAnswerText>{item.answer}</S.FaqAnswerText>
            </S.FaqAnswer>
          </S.FaqItem>
        ))}
      </S.FaqContainer>
    </S.Section>
  )
}

export default FaqSection
