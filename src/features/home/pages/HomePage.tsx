import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

import Footer from '@/shared/layout/Footer/Footer'

import AboutSection from '../components/AboutSection/AboutSection'
import ApplySection from '../components/ApplySection/ApplySection'
import CtaSection from '../components/CtaSection/CtaSection'
import CurriculumSection from '../components/CurriculumSection/CurriculumSection'
import FaqSection from '../components/FaqSection/FaqSection'
import HeroSection from '../components/HeroSection/HeroSection'
import HomeHeader from '../components/HomeHeader/HomeHeader'
import ProjectsSection from '../components/ProjectsSection/ProjectsSection'
import SponsorsSection from '../components/SponsorsSection/SponsorsSection'
import StatsSection from '../components/StatsSection/StatsSection'
import UniversitySection from '../components/UniversitySection/UniversitySection'
import ValuesSection from '../components/ValuesSection/ValuesSection'
import {
  faqItems,
  heroText,
  projectsData,
  sponsors,
  stats,
  timelineItems,
} from '../domain/constants'
import * as S from './styles/HomePage.common.style'

export const HomePage = () => {
  const navigate = useNavigate()
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [typedText, setTypedText] = useState('')
  const [typingDone, setTypingDone] = useState(false)
  const [generation, setGeneration] = useState(7)
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null)
  const statsAnimated = useRef(false)

  const projects = useMemo(() => projectsData[generation] ?? [], [generation])

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  useEffect(() => {
    let index = 0
    let timeoutId: number | undefined
    let doneTimeoutId: number | undefined

    const type = () => {
      if (index < heroText.length) {
        setTypedText(heroText.slice(0, index + 1))
        index += 1
        timeoutId = window.setTimeout(type, 180)
      } else {
        doneTimeoutId = window.setTimeout(() => setTypingDone(true), 500)
      }
    }

    timeoutId = window.setTimeout(type, 300)

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId)
      if (doneTimeoutId) window.clearTimeout(doneTimeoutId)
    }
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const animateStats = () => {
      if (statsAnimated.current) return
      statsAnimated.current = true
      const statElements = root.querySelectorAll<HTMLElement>('[data-stat]')
      statElements.forEach((stat) => {
        const target = Number(stat.dataset.target ?? '0')
        const duration = 2000
        const increment = target / (duration / 16)
        let current = 0

        const updateNumber = () => {
          current += increment
          if (current < target) {
            stat.textContent = `${Math.floor(current)}+`
            requestAnimationFrame(updateNumber)
          } else {
            stat.textContent = `${target}+`
          }
        }

        updateNumber()
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate')
            ;(entry.target as HTMLElement).dataset.animated = 'true'
            if ((entry.target as HTMLElement).id === 'stats-section') {
              animateStats()
            }
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      },
    )

    root.querySelectorAll<HTMLElement>('[data-animate]').forEach((el) => observer.observe(el))

    const statsSection = root.querySelector<HTMLElement>('#stats-section')
    if (statsSection) observer.observe(statsSection)

    return () => observer.disconnect()
  }, [])

  return (
    <S.Page ref={rootRef}>
      <HomeHeader onScrollToSection={scrollToSection} />
      <div id="top" />
      <HeroSection
        typedText={typedText}
        typingDone={typingDone}
        onCta={() =>
          navigate({
            to: '/apply',
          })
        }
      />
      <StatsSection stats={stats} />
      <AboutSection />
      <ValuesSection />
      <UniversitySection />
      <CurriculumSection />
      <ProjectsSection
        generation={generation}
        onChangeGeneration={setGeneration}
        projects={projects}
      />
      <FaqSection
        items={faqItems}
        activeIndex={activeFaqIndex}
        onToggle={(index) => setActiveFaqIndex(activeFaqIndex === index ? null : index)}
      />
      <ApplySection items={timelineItems} />
      <SponsorsSection sponsors={sponsors} />
      <CtaSection
        onCta={() =>
          navigate({
            to: '/apply',
          })
        }
      />
      <Footer />
    </S.Page>
  )
}
