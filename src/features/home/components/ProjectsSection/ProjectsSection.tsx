import { useEffect, useRef, useState } from 'react'

import type { Project } from '../../domain/constants'
import * as S from './ProjectsSection.style'

type Props = {
  generation: number
  onChangeGeneration: (value: number) => void
  projects: Array<Project>
}

const ProjectsSection = ({ generation, onChangeGeneration, projects }: Props) => {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0 })
  const [paused, setPaused] = useState(false)
  const listWidthRef = useRef(0)

  useEffect(() => {
    const listEl = listRef.current
    if (!listEl) return
    listWidthRef.current = listEl.scrollWidth
  }, [projects])

  useEffect(() => {
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
          target.scrollLeft += (delta * speed) / 16
          if (target.scrollLeft >= listWidth) {
            target.scrollLeft -= listWidth
          }
        }
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [paused])

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
    const listWidth = listWidthRef.current
    if (listWidth > 0) {
      if (target.scrollLeft >= listWidth) target.scrollLeft -= listWidth
      if (target.scrollLeft < 0) target.scrollLeft += listWidth
    }
  }

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const target = scrollRef.current
    if (target) {
      target.releasePointerCapture(event.pointerId)
    }
    dragState.current.isDown = false
    setPaused(false)
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
            $active={generation === value}
            onClick={() => onChangeGeneration(value)}
          >
            {value}기
          </S.GenerationTab>
        ))}
      </S.GenerationTabs>

      <S.ProjectsScrollWrapper
        ref={scrollRef}
        $dragging={paused}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <S.ProjectsScrollContainer>
          <S.ProjectsList ref={listRef}>
            {projects.map((project) => (
              <S.ProjectCard key={project.title}>
                <S.ProjectImage>{project.emoji}</S.ProjectImage>
                <S.ProjectContent>
                  <S.ProjectTitle>{project.title}</S.ProjectTitle>
                  <S.ProjectDescription>{project.description}</S.ProjectDescription>
                  <S.ProjectTech>
                    {project.tech.map((tech) => (
                      <S.TechTag key={tech}>{tech}</S.TechTag>
                    ))}
                  </S.ProjectTech>
                </S.ProjectContent>
              </S.ProjectCard>
            ))}
          </S.ProjectsList>
          <S.ProjectsList aria-hidden>
            {projects.map((project) => (
              <S.ProjectCard key={`${project.title}-dup`}>
                <S.ProjectImage>{project.emoji}</S.ProjectImage>
                <S.ProjectContent>
                  <S.ProjectTitle>{project.title}</S.ProjectTitle>
                  <S.ProjectDescription>{project.description}</S.ProjectDescription>
                  <S.ProjectTech>
                    {project.tech.map((tech) => (
                      <S.TechTag key={`${project.title}-${tech}-dup`}>{tech}</S.TechTag>
                    ))}
                  </S.ProjectTech>
                </S.ProjectContent>
              </S.ProjectCard>
            ))}
          </S.ProjectsList>
        </S.ProjectsScrollContainer>
      </S.ProjectsScrollWrapper>
    </S.FullWidthSection>
  )
}

export default ProjectsSection
