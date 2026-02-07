import type { Project } from '../../pages/home.constants'
import * as S from './ProjectsSection.style'

type Props = {
  generation: number
  onChangeGeneration: (value: number) => void
  projects: Array<Project>
  paused: boolean
  onPause: (paused: boolean) => void
}

const ProjectsSection = ({ generation, onChangeGeneration, projects, paused, onPause }: Props) => {
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

      <S.ScrollWrapper
        $paused={paused}
        onMouseEnter={() => onPause(true)}
        onMouseLeave={() => onPause(false)}
      >
        <S.ProjectsScrollContainer $paused={paused}>
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
        </S.ProjectsScrollContainer>
      </S.ScrollWrapper>
    </S.FullWidthSection>
  )
}

export default ProjectsSection
