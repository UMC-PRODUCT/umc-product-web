import type { Stat } from '../../pages/home.constants'
import * as S from './StatsSection.style'

type Props = {
  stats: Array<Stat>
}

const StatsSection = ({ stats }: Props) => {
  return (
    <S.Stats id="stats-section" data-animate>
      {stats.map((stat) => (
        <S.StatItem key={stat.label} data-animate style={{ transitionDelay: `${stat.delay}s` }}>
          <S.StatNumber data-stat data-target={stat.value}>
            0
          </S.StatNumber>
          <S.StatLabel>{stat.label}</S.StatLabel>
        </S.StatItem>
      ))}
    </S.Stats>
  )
}

export default StatsSection
