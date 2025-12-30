import * as S from './IntroBanner.style'
import { useEffect, useMemo, useState } from 'react'

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

  return (
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
  )
}
