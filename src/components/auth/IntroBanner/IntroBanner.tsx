import Flex from '@/components/common/Flex/Flex'
import * as S from './IntroBanner.style'
import { useEffect, useMemo, useState } from 'react'
import { theme } from '@/styles/theme'

type Slide = {
  image: string
}

const slides: Slide[] = [
  { image: '/images/banner/활동사진1.png' },
  { image: '/images/banner/활동사진2.png' },
  { image: '/images/banner/활동사진3.png' },
]
const total = slides.length

export default function IntroBanner() {
  const [current, setCurrent] = useState(0)
  const [isMdDown, setIsMdDown] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(`(max-width: ${theme.breakPoints.tablet})`).matches
  })

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((idx) => (idx + 1) % total)
    }, 3400)
    return () => clearInterval(id)
  }, [total])

  useEffect(() => {
    slides.forEach(({ image }) => {
      const img = new Image()
      img.src = image
    })
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mediaQuery = window.matchMedia(
      `(max-width: ${theme.breakPoints.tablet})`,
    )
    const handleChange = (event: MediaQueryListEvent) => {
      setIsMdDown(event.matches)
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const renderedSlides = useMemo(
    () =>
      slides.map((slide, index) => (
        <S.SlideLayer
          key={slide.image}
          $active={index === current}
          $image={slide.image}
          aria-hidden={index === current ? 'false' : 'true'}
        />
      )),
    [current],
  )

  if (isMdDown) return null

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      maxHeight="100%"
      height="100%"
      width="100%"
      padding="24px"
      css={{}}
    >
      <S.Container>
        {renderedSlides}
        <S.Blur>
          <S.Slogan>
            Break the Rules! <br /> 세상의 틀을 깰 챌린저들이 하나로 모이는 곳
          </S.Slogan>
          <S.Slider aria-hidden>
            {slides.map((_, idx) => (
              <S.Bar key={idx} $active={idx === current} />
            ))}
          </S.Slider>
        </S.Blur>
      </S.Container>
    </Flex>
  )
}
