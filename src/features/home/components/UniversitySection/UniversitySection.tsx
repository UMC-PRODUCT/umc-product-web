import defaultSchool from '@shared/assets/icons/school.svg'

import { useActiveGisuQuery } from '@/features/auth/hooks/useAuthQueries'
import { getSchoolsByGisu } from '@/features/management/domain/api'
import { useCustomQuery } from '@/shared/hooks/customQuery'
import { managementKeys } from '@/shared/queryKeys'

import * as S from './UniversitySection.style'

const TEMP_UNIVERSITIES = [
  { src: defaultSchool, alt: '가톨릭대학교' },
  { src: defaultSchool, alt: '한성대학교' },
  { src: defaultSchool, alt: '가천대학교' },
  { src: defaultSchool, alt: '숭실대학교' },
  { src: defaultSchool, alt: '동국대학교' },
  { src: defaultSchool, alt: '서울여자대학교' },
  { src: defaultSchool, alt: '중앙대학교' },
  { src: defaultSchool, alt: '동덕여자대학교' },
  { src: defaultSchool, alt: '상명대학교' },
  { src: defaultSchool, alt: '한양대학교' },
]

const UniversitySection = () => {
  const { data: activeGisuData } = useActiveGisuQuery()
  const activeGisuId = activeGisuData?.result.gisuId
  const { data: universityData, isError } = useCustomQuery(
    managementKeys.getSchoolsByGisu(activeGisuId ?? ''),
    () => getSchoolsByGisu(activeGisuId ?? ''),
    { enabled: Boolean(activeGisuId) },
  )

  const apiUniversities = (universityData?.result ?? []).map((school) => ({
    src: school.logoImageUrl || defaultSchool,
    alt: school.schoolName,
  }))
  const universities = isError || apiUniversities.length === 0 ? TEMP_UNIVERSITIES : apiUniversities

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
