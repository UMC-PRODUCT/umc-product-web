import defaultSchool from '@shared/assets/icons/school.svg'
import UniversitySlogan from '@shared/assets/Joined_by_22_Universities.svg?react'

import * as S from './UniversitySection.style'

const UniversitySection = () => {
  const universities = [
    {
      src: 'https://d1qzykz9iz00c7.cloudfront.net/static/logo_new/logo_c172.png',
      alt: '이화여대',
    },
    {
      src: 'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FcD2rLo%2FbtrUnheY17y%2FAAAAAAAAAAAAAAAAAAAAALio0-q52YpZLVSDQe7bLczCKhrWrBmFimAofhRspcgh%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1772290799%26allow_ip%3D%26allow_referer%3D%26signature%3DkSCQEFnrkQTEacvTYArEqrQOxaU%253D',
      alt: '숙명여대',
    },
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4ogaANV8JfDzG29DZYmiqP2LtRgrGH10dubQOKY675A&s&ec=121528417',
      alt: '동덕여대',
    },
    {
      src: 'https://i.namu.wiki/i/VcnRd9BrfjG1pQvP_PzR4nVf7JMGQwfRig4hJHaLFsMkso8AWCfD5EIbyw3TJqX0oqhVqvkj-1set6hP8XX5eQ.svg',
      alt: '동국대',
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/University_of_Seoul.svg/1280px-University_of_Seoul.svg.png',
      alt: '서울시립대',
    },
    {
      src: 'https://www.smu.ac.kr/cms/fileDownload.do?path=%2F_res%2Fkor%2Fetc%2FSigniture2_06.jpg',
      alt: '상명대',
    },
  ]

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
      <UniversitySlogan className="slogan" />
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
