import comgongLogo from '@/shared/assets/sponsor/comgong.svg'
import gritzyLogo from '@/shared/assets/sponsor/gridge.svg'
import jabberLogo from '@/shared/assets/sponsor/jober.svg'
import nerdinaryLogo from '@/shared/assets/sponsor/neordinary.svg'
import softSquaredLogo from '@/shared/assets/sponsor/softsquared.svg'
import vieworksLogo from '@/shared/assets/sponsor/vieworks.svg'

export type Curriculum = {
  title: string
  items: Array<string>
}

export type Project = {
  emoji: string
  title: string
  description: string
  tech: Array<string>
}

export type Stat = {
  value: number
  label: string
  delay: number
}

export type FaqItem = {
  question: string
  answer: string
}

export type TimelineItem = {
  date: string
  title: string
  description: string
}

export type Sponsor = {
  name: string
  description: string
  logo: string
}

export const heroText = 'BREAK THE RULES!'

export const projectsData: Record<string, Array<Project>> = {
  '7': [
    {
      emoji: '📱',
      title: '운동 메이트 매칭',
      description: '위치 기반 운동 메이트를 찾고 함께 운동 계획을 세울 수 있는 소셜 플랫폼',
      tech: ['React', 'Spring Boot', 'MySQL'],
    },
    {
      emoji: '🍽️',
      title: '대학가 맛집 공유',
      description: '학생들이 맛집을 추천하고 리뷰를 공유하는 커뮤니티 서비스',
      tech: ['iOS', 'Node.js', 'MongoDB'],
    },
    {
      emoji: '📚',
      title: '스터디 그룹 관리',
      description: '스터디 그룹의 일정, 과제, 자료를 체계적으로 관리하는 협업 도구',
      tech: ['Android', 'Spring', 'AWS'],
    },
    {
      emoji: '🎵',
      title: '음악 취향 소셜',
      description: '음악 취향이 비슷한 사람들을 연결하는 소셜 네트워크',
      tech: ['React', 'Node.js', 'PostgreSQL'],
    },
    {
      emoji: '🛒',
      title: '중고 장터 플랫폼',
      description: '대학 커뮤니티 기반 안전한 중고 거래 마켓플레이스',
      tech: ['iOS', 'Spring', 'Redis'],
    },
    {
      emoji: '🏃',
      title: '러닝 크루 매칭',
      description: '러닝 크루 매칭 및 기록 관리 애플리케이션',
      tech: ['Android', 'Node.js', 'Docker'],
    },
  ],
  '8': [
    {
      emoji: '🎨',
      title: '포트폴리오 빌더',
      description: '디자이너와 개발자를 위한 포트폴리오 제작 플랫폼',
      tech: ['React', 'Spring Boot', 'AWS'],
    },
    {
      emoji: '📖',
      title: '독서 커뮤니티',
      description: '독서 기록과 책 추천을 공유하는 독서 모임 서비스',
      tech: ['iOS', 'Node.js', 'MongoDB'],
    },
    {
      emoji: '🎯',
      title: '목표 달성 챌린지',
      description: '친구들과 함께 목표를 설정하고 달성하는 챌린지 앱',
      tech: ['Android', 'Spring', 'MySQL'],
    },
    {
      emoji: '🏠',
      title: '원룸 매칭 서비스',
      description: '대학생들을 위한 원룸 룸메이트 매칭 플랫폼',
      tech: ['React', 'Node.js', 'PostgreSQL'],
    },
    {
      emoji: '🎬',
      title: '영화 추천 플랫폼',
      description: 'AI 기반 개인화된 영화 추천 서비스',
      tech: ['React', 'Spring Boot', 'Redis'],
    },
    {
      emoji: '🌱',
      title: '식물 케어 도우미',
      description: '식물 관리 일정과 팁을 제공하는 가드닝 앱',
      tech: ['iOS', 'Node.js', 'MongoDB'],
    },
  ],
  '9': [
    {
      emoji: '💼',
      title: '취업 준비 플랫폼',
      description: '취업 준비생들을 위한 스터디 및 정보 공유 커뮤니티',
      tech: ['React', 'Spring Boot', 'MySQL'],
    },
    {
      emoji: '🎤',
      title: '노래방 예약 서비스',
      description: '실시간 노래방 예약 및 할인 정보 제공 플랫폼',
      tech: ['Android', 'Node.js', 'Redis'],
    },
    {
      emoji: '🍜',
      title: '레시피 공유 앱',
      description: '사용자들이 레시피를 공유하고 평가하는 요리 커뮤니티',
      tech: ['iOS', 'Spring', 'AWS'],
    },
    {
      emoji: '🚗',
      title: '카풀 매칭 서비스',
      description: '대학생들을 위한 안전한 카풀 매칭 플랫폼',
      tech: ['React', 'Node.js', 'MongoDB'],
    },
    {
      emoji: '📷',
      title: '사진 공유 SNS',
      description: '일상의 순간을 공유하는 소셜 네트워크 서비스',
      tech: ['iOS', 'Spring Boot', 'PostgreSQL'],
    },
    {
      emoji: '🎓',
      title: '과외 매칭 플랫폼',
      description: '학생과 선생님을 연결하는 과외 매칭 서비스',
      tech: ['Android', 'Node.js', 'MySQL'],
    },
  ],
}

export const stats: Array<Stat> = [
  { value: 6000, label: '누적 활동 회원 수', delay: 0.1 },
  { value: 1200, label: '매 기수 평균 지원자 수', delay: 0.2 },
  { value: 800, label: '누적 프로젝트 수', delay: 0.3 },
]

export const faqItems: Array<FaqItem> = [
  {
    question: '지원 자격이 어떻게 되나요?',
    answer:
      'UMC는 전국 대학생이라면 누구나 지원 가능합니다. 학년, 전공, 개발 경험 유무와 관계없이 열정과 성장 의지만 있다면 환영합니다.',
  },
  {
    question: '활동 기간은 얼마나 되나요?',
    answer:
      '한 기수 활동 기간은 약 4개월입니다. 매주 정기 세션에 참여하며 워크북 과제를 수행하고, 중간 프로젝트와 최종 프로젝트를 완성하게 됩니다.',
  },
  {
    question: '어떤 파트가 있나요?',
    answer:
      'Plan, Design, Android, iOS, Web, SpringBoot, Node.js 총 7개 파트가 있습니다. 각 파트별로 체계적인 커리큘럼이 준비되어 있습니다.',
  },
  {
    question: '활동비가 있나요?',
    answer:
      '네, 한 기수당 활동비가 있습니다. 활동비는 정기 세션 진행, 네트워킹 이벤트, 수료 기념품 제작 등에 사용됩니다.',
  },
  {
    question: '온라인으로도 참여 가능한가요?',
    answer:
      '네, 가능합니다. 정기 세션은 온·오프라인 하이브리드로 진행되며, 지방에 계신 분들도 온라인으로 참여하실 수 있습니다.',
  },
  {
    question: '프로젝트는 어떻게 진행되나요?',
    answer:
      '중간 프로젝트는 파트별로, 최종 프로젝트는 다양한 파트가 모여 진행됩니다. 기획부터 개발, 배포까지 전 과정을 경험합니다.',
  },
]

export const timelineItems: Array<TimelineItem> = [
  {
    date: 'FEB 3rd week',
    title: '지원서 접수',
    description: '온라인 지원서를 작성하고 제출해주세요',
  },
  { date: 'FEB 4th week', title: '서류 심사', description: '1차 서류 심사가 진행됩니다' },
  { date: 'MAR 1st week', title: '면접 진행', description: '온·오프라인 면접이 진행됩니다' },
  {
    date: 'MAR 2nd week',
    title: '최종 합격 발표',
    description: '최종 합격자 발표 및 OT 일정 안내',
  },
  { date: 'MAR 3rd week', title: '활동 시작', description: 'OT를 시작으로 본격적인 활동 시작' },
]

export const sponsors: Array<Sponsor> = [
  {
    name: '컴공선배',
    description:
      '컴퓨터공학과를 졸업하고, 프리랜서로 활동하고 있는 잘나가는 선배가 말하는 IT 업계와 개발 이모저모',
    logo: comgongLogo,
  },
  {
    name: '너디너리',
    description:
      '대학생에게는 스타트업에 대한 관심을, 예비·초기 창업자에게는 고객 유치와 홍보를, 기업에는 우수한 인재 탐색의 장을 제공',
    logo: nerdinaryLogo,
  },
  {
    name: '소프트스퀘어드',
    description:
      'IT 청년들이 꿈을 이룰 수 있도록 노하우를 전수하고 성장할 수 있는 기회를 제공하는 스타트업',
    logo: softSquaredLogo,
  },
  {
    name: '그릿지',
    description: '엔터프라이즈 개발 팀이 AI를 활용하여 개발을 자동화 할 수 있도록 돕는 MSP 서비스',
    logo: gritzyLogo,
  },
  {
    name: '자버',
    description:
      'MyData 기반 전자문서 서비스를 통해 기업의 계약, 설문, 공지 등 다양한 업무를 혁신하는 Document Tech 스타트업',
    logo: jabberLogo,
  },
  {
    name: '뷰웍스',
    description:
      '세계 최고의 이미징 처리 기술을 바탕으로 글로벌 TOP 5에 속하는 이미징 솔루션 전문 기업',
    logo: vieworksLogo,
  },
]
