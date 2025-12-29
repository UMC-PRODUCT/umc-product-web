import { media } from '@/styles/media'
import { theme } from '@/styles/theme'
import styled from '@emotion/styled'
import { useEffect, useMemo, useState } from 'react'

type Slide = {
  image: string
}

const slides: Slide[] = [
  { image: '/images/banner/활동사진1.png' },
  { image: '/images/banner/활동사진2.png' },
  { image: '/images/banner/활동사진3.png' },
]

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${theme.colors.black};
  ${media.down(theme.breakPoints.desktop)} {
    display: none;
  }
  border-radius: 12px;
`

const SlideLayer = styled.div<{ $active: boolean; $image: string }>`
  position: absolute;
  inset: 0;
  background: ${({ $image }) => `url(${$image}) center/cover no-repeat`};
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transform: translateZ(0);
  backface-visibility: hidden;
`

const Slogan = styled.span`
  text-align: center;
  color: ${theme.colors.white};
  ${({ theme }) => theme.typography.Slogan.Md};
  font-family: 'Isamanru', sans-serif;
  pointer-events: none;
  width: 100%;
  position: relative;
  z-index: 2;
`

const Slider = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  position: relative;
  z-index: 2;
`

const Bar = styled.span<{ $active: boolean }>`
  display: block;
  height: 4px;
  width: ${({ $active }) => ($active ? '36px' : '24px')};
  border-radius: 999px;
  background: ${theme.colors.white};
  opacity: ${({ $active }) => ($active ? 1 : 0.4)};
  transition:
    width 200ms ease,
    opacity 200ms ease;
`

const Blur = styled.div`
  position: absolute;
  inset: auto 0 0 0;
  height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 24px;
  padding-bottom: 48px;
  pointer-events: none;
  isolation: isolate;

  &::before,
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    mask-image: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    background: linear-gradient(
      180deg,
      rgba(22, 22, 22, 0) 0%,
      rgba(22, 22, 22, 0.7) 100%
    );
    z-index: 0;
  }
`

export default function IntroBanner() {
  const [current, setCurrent] = useState(0)
  const total = slides.length

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
        <SlideLayer
          key={slide.image}
          $active={index === current}
          $image={slide.image}
          aria-hidden={index === current ? 'false' : 'true'}
        />
      )),
    [current],
  )

  return (
    <Container>
      {renderedSlides}
      <Blur>
        <Slogan>
          Break the Rules! <br /> 세상의 틀을 깰 챌린저들이 하나로 모이는 곳
        </Slogan>
        <Slider aria-hidden>
          {slides.map((_, idx) => (
            <Bar key={idx} $active={idx === current} />
          ))}
        </Slider>
      </Blur>
    </Container>
  )
}
