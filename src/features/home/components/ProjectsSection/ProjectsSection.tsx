import { useCallback, useEffect, useRef, useState } from 'react'

import type { Project } from '../../domain/constants'
import * as S from './ProjectsSection.style'

type Props = {
  gisu: string
  onChangeGeneration: (value: string) => void
  projects: Array<Project>
}

const ProjectsSection = ({ gisu, onChangeGeneration, projects }: Props) => {
  const isNinthGeneration = gisu === '9'
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0 })
  const [paused, setPaused] = useState(false)
  const listWidthRef = useRef(0)
  const isNormalizingRef = useRef(false)
  const autoScrollRemainderRef = useRef(0)

  const normalizeScrollPosition = useCallback((target: HTMLDivElement) => {
    const listWidth = listWidthRef.current
    if (listWidth <= 0 || isNormalizingRef.current) return

    if (target.scrollLeft <= 0 || target.scrollLeft >= listWidth * 2) {
      isNormalizingRef.current = true
      while (target.scrollLeft <= 0) target.scrollLeft += listWidth
      while (target.scrollLeft >= listWidth * 2) target.scrollLeft -= listWidth
      isNormalizingRef.current = false
    }
  }, [])

  useEffect(() => {
    const listEl = listRef.current
    const target = scrollRef.current
    if (!listEl || !target) return
    listWidthRef.current = listEl.scrollWidth
    target.scrollLeft = listEl.scrollWidth
    normalizeScrollPosition(target)
  }, [projects, normalizeScrollPosition])

  useEffect(() => {
    if (isNinthGeneration) return
    const target = scrollRef.current
    if (!target) return

    let rafId = 0
    let lastTime = performance.now()
    const speed = 0.45

    const tick = (time: number) => {
      const delta = time - lastTime
      lastTime = time

      if (!paused) {
        const listWidth = listWidthRef.current
        if (listWidth > 0) {
          autoScrollRemainderRef.current += (delta * speed) / 16
          const nextStep = Math.trunc(autoScrollRemainderRef.current)
          if (nextStep !== 0) {
            target.scrollLeft += nextStep
            autoScrollRemainderRef.current -= nextStep
          }
        }
      }
      normalizeScrollPosition(target)

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => {
      autoScrollRemainderRef.current = 0
      cancelAnimationFrame(rafId)
    }
  }, [isNinthGeneration, paused, normalizeScrollPosition])

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const target = scrollRef.current
    if (!target) return
    dragState.current.isDown = true
    dragState.current.startX = event.clientX
    dragState.current.scrollLeft = target.scrollLeft
    target.setPointerCapture(event.pointerId)
    setPaused(true)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const target = scrollRef.current
    if (!target || !dragState.current.isDown) return
    event.preventDefault()
    const walk = event.clientX - dragState.current.startX
    target.scrollLeft = dragState.current.scrollLeft - walk
    normalizeScrollPosition(target)
  }

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const target = scrollRef.current
    if (target?.hasPointerCapture(event.pointerId)) {
      target.releasePointerCapture(event.pointerId)
    }
    dragState.current.isDown = false
    setPaused(false)
  }

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    normalizeScrollPosition(event.currentTarget)
  }

  return (
    <S.FullWidthSection id="projects">
      <S.FullWidthHeader data-animate>
        <S.SectionBadge>WHAT WE MADE</S.SectionBadge>
        <S.SectionTitle>프로젝트</S.SectionTitle>
      </S.FullWidthHeader>

      <S.GenerationTabs>
        {[7, 8, 9].map((value) => (
          <S.GenerationTab
            key={value}
            type="button"
            $active={gisu === String(value)}
            onClick={() => onChangeGeneration(String(value))}
          >
            {value}기
          </S.GenerationTab>
        ))}
      </S.GenerationTabs>

      {isNinthGeneration ? (
        <S.EmptyState>데모데이 종료 후 공개됩니다!</S.EmptyState>
      ) : (
        <S.ProjectsScrollWrapper
          ref={scrollRef}
          $dragging={paused}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onScroll={handleScroll}
        >
          <S.ProjectsScrollContainer>
            <S.ProjectsList aria-hidden>
              {projects.map((project) => (
                <S.ProjectCard key={`${project.title}-pre-dup`}>
                  <img src={project.image} alt={project.title} />
                  <S.ProjectContent>
                    <S.ProjectTitle>{project.title}</S.ProjectTitle>
                    <S.ProjectDescription>{project.description}</S.ProjectDescription>
                  </S.ProjectContent>
                </S.ProjectCard>
              ))}
            </S.ProjectsList>
            <S.ProjectsList ref={listRef}>
              {projects.map((project) => (
                <S.ProjectCard key={project.title}>
                  <img src={project.image} alt={project.title} />
                  <S.ProjectContent>
                    <S.ProjectTitle>{project.title}</S.ProjectTitle>
                    <S.ProjectDescription>{project.description}</S.ProjectDescription>
                  </S.ProjectContent>
                </S.ProjectCard>
              ))}
            </S.ProjectsList>
            <S.ProjectsList aria-hidden>
              {projects.map((project) => (
                <S.ProjectCard key={`${project.title}-dup`}>
                  <img src={project.image} alt={project.title} />
                  <S.ProjectContent>
                    <S.ProjectTitle>{project.title}</S.ProjectTitle>
                    <S.ProjectDescription>{project.description}</S.ProjectDescription>
                  </S.ProjectContent>
                </S.ProjectCard>
              ))}
            </S.ProjectsList>
          </S.ProjectsScrollContainer>
        </S.ProjectsScrollWrapper>
      )}
    </S.FullWidthSection>
  )
}

export default ProjectsSection
