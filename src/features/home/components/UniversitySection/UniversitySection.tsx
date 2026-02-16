import defaultSchool from '@shared/assets/icons/school.svg'

import { useActiveGisuQuery } from '@/features/auth/hooks/useAuthQueries'
import { getSchoolsByGisu } from '@/features/management/domain/api'
import { useCustomQuery } from '@/shared/hooks/customQuery'
import { managementKeys } from '@/shared/queryKeys'

import * as S from './UniversitySection.style'

const UniversitySection = () => {
  const { data: activeGisuData } = useActiveGisuQuery()
  const activeGisuId = activeGisuData?.result.gisuId
  const { data: universityData } = useCustomQuery(
    managementKeys.getSchoolsByGisu(activeGisuId ?? ''),
    () => getSchoolsByGisu(activeGisuId ?? ''),
    { enabled: Boolean(activeGisuId) },
  )

  const universities = (universityData?.result ?? []).map((school) => ({
    src: school.logoImageUrl || defaultSchool,
    alt: school.schoolName,
  }))

  const repeatCount = 3
  const renderTrack = () =>
    Array.from({ length: repeatCount }).flatMap((_, repeatIndex) =>
      universities.map((item, index) => (
        <S.UniversityItem key={`${item.alt}-${repeatIndex}-${index}`}>
          <img
            src={item.src}
            alt={item.alt}
            onError={(event) => {
              const target = event.currentTarget
              if (target.dataset.fallbackApplied === 'true') return
              target.dataset.fallbackApplied = 'true'
              target.src = defaultSchool
            }}
          />
          <span>{item.alt}</span>
        </S.UniversityItem>
      )),
    )

  return (
    <S.UniversitySection data-animate>
      <S.Slogan>{`Joined by ${universities.length} Universities`}</S.Slogan>
      <S.UniversityList>
        <S.UniversityRow $direction="left">
          <div className="track">{renderTrack()}</div>
        </S.UniversityRow>
        <S.UniversityRow $direction="right">
          <div className="track">{renderTrack()}</div>
        </S.UniversityRow>
      </S.UniversityList>
    </S.UniversitySection>
  )
}

export default UniversitySection
