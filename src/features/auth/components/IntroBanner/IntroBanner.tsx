import { useEffect, useMemo, useState } from 'react'

import { theme } from '@shared/styles/theme'
import Flex from '@shared/ui/common/Flex/Flex'

import * as S from './IntroBanner.style'

type Slide = {
  image: string
}

const slides: Array<Slide> = [
  { image: '/images/banner/1.jpeg' },
  { image: '/images/banner/2.jpeg' },
  { image: '/images/banner/3.jpeg' },
  { image: '/images/banner/4.jpeg' },
  { image: '/images/banner/5.jpeg' },
]
const total = slides.length
const toWebp = (source: string) => source.replace(/\.jpeg$/i, '.webp')
const toAvif = (source: string) => source.replace(/\.jpeg$/i, '.avif')

const IntroBanner = () => {
  const [current, setCurrent] = useState(0)
  const [isMdDown, setIsMdDown] = useState(() => {
    if (typeof window === 'undefined') return false
    const desktopQuery = `(max-width: ${theme.breakPoints.desktop})`

    return window.matchMedia(desktopQuery).matches
  })

  useEffect(() => {
    if (isMdDown) return
    const id = setInterval(() => {
      setCurrent((idx) => (idx + 1) % total)
    }, 3400)
    return () => clearInterval(id)
  }, [isMdDown])

  useEffect(() => {
    if (isMdDown) return
    const nextIndex = (current + 1) % total
    const img = new Image()
    img.src = slides[nextIndex].image
  }, [current, isMdDown])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mediaQuery = window.matchMedia(`(max-width: ${theme.breakPoints.desktop})`)
    const handleChange = (event: MediaQueryListEvent) => {
      setIsMdDown(event.matches)
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const renderedSlides = useMemo(
    () =>
      slides.map((slide, index) => (
        <S.SlideLayer key={slide.image} $active={index === current} aria-hidden={index !== current}>
          <picture>
            <source type="image/avif" srcSet={toAvif(slide.image)} />
            <source type="image/webp" srcSet={toWebp(slide.image)} />
            <img
              src={slide.image}
              alt=""
              loading={index === current ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={index === 0 ? 'high' : 'auto'}
            />
          </picture>
        </S.SlideLayer>
      )),
    [current],
  )

  return (
    <>
      {isMdDown ? null : (
        <Flex
          flexDirection="column"
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
                  <S.Bar key={idx} $active={idx === current} onClick={() => setCurrent(idx)} />
                ))}
              </S.Slider>
            </S.Blur>
          </S.Container>
        </Flex>
      )}
    </>
  )
}

export default IntroBanner
