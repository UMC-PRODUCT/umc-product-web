import archiveImage from '@/shared/assets/project/7th/Archive.webp'
import catchYImage from '@/shared/assets/project/7th/CatchY.png'
import ddaddaImage from '@/shared/assets/project/7th/DDADDA.webp'
import dogModeImage from '@/shared/assets/project/7th/DOG_MODE.webp'
import edisonImage from '@/shared/assets/project/7th/Edison.png'
import groaitImage from '@/shared/assets/project/7th/GROAIT.webp'
import homeMasterImage from '@/shared/assets/project/7th/HOME_MASTER.webp'
import hrrImage from '@/shared/assets/project/7th/HRR.webp'
import memeSphereImage from '@/shared/assets/project/7th/MEME_SPHERE.png'
import tttImage from '@/shared/assets/project/7th/Ttt.png'
import baekHoImage from '@/shared/assets/project/8th/BaekHo.png'
import chaekMoImage from '@/shared/assets/project/8th/ChaekMo.png'
import channelingImage from '@/shared/assets/project/8th/Channeling.png'
import coffectImage from '@/shared/assets/project/8th/Coffect.png'
import divaryImage from '@/shared/assets/project/8th/Divary.png'
import haRuImage from '@/shared/assets/project/8th/HaRu.png'
import ohMaeChuImage from '@/shared/assets/project/8th/OhMaeChu.png'
import perfuOnMeImage from '@/shared/assets/project/8th/PerfuOnMe.webp'
import teamieImage from '@/shared/assets/project/8th/Teamie.webp'

import type { Project } from './constants'

export const projectsData: Record<string, Array<Project>> = {
  '7': [
    {
      image: dogModeImage,
      title: '이거먹자',
      description: '나만을 위한 AI 영양사 ',
      tech: [],
    },
    {
      image: catchYImage,
      title: 'Catch:Y',
      description: '특별한 하루를 위해, 취향을 Catch:y',
      tech: ['iOS', 'SpringBoot'],
    },
    {
      image: memeSphereImage,
      title: '밈스피어',
      description: '세상의 모든 밈코인을 한 곳에서',
      tech: [],
    },
    {
      image: ddaddaImage,
      title: '따따',
      description: '어디서든 기록 가능한 위치기반 추억 기록 서비스',
      tech: ['Android', 'SpringBoot'],
    },
    {
      image: hrrImage,
      title: '흐르르',
      description: '흐르르 따라 흐르는 나의 성장',
      tech: ['Android', 'Node.js'],
    },
    {
      image: tttImage,
      title: 'Ttt',
      description: '가벼운 마음으로 독서를 시작할 수 있도록, Ttt',
      tech: [],
    },
    {
      image: archiveImage,
      title: 'Archive',
      description: '음악으로 시간의 흐름을 만나다',
      tech: ['iOS', 'Node.js'],
    },
    {
      image: edisonImage,
      title: 'Edison',
      description: '당신의 아이디어, 터지지 않는 버블에 보관하세요',
      tech: [],
    },
    {
      image: groaitImage,
      title: '그로우잇',
      description: '음성 기반 AI로 대화하며 일기와 마음챙김 챌린지를 통해 정신 건강을 관리하는 앱',
      tech: ['iOS', 'SpringBoot'],
    },
    {
      image: homeMasterImage,
      title: 'HOME MASTER',
      description: '1인 가구를 위한 자취 꿀팁 가이드북',
      tech: ['Web', 'Node.js'],
    },
  ],
  '8': [
    {
      image: haRuImage,
      title: 'Haru',
      description: '소규모 팀을 위한 All-In-One 운영 관리 플랫폼',
      tech: ['Web', 'Spring Boot'],
    },
    {
      image: baekHoImage,
      title: '백호',
      description: '정보는 모으고 목표는 사냥하는 프로젝트 관리 툴',
      tech: ['Web', 'SpringBoot'],
    },
    {
      image: divaryImage,
      title: 'Divary',
      description: '다이버를 위한 다이어리',
      tech: [],
    },
    {
      image: perfuOnMeImage,
      title: '퍼퓨온미',
      description: '나만의 향기를 찾아주는 서비스',
      tech: [],
    },
    {
      image: teamieImage,
      title: 'Teamie',
      description: '나의 팀워크가 모이는 곳',
      tech: [],
    },
    {
      image: coffectImage,
      title: 'Coffect',
      description: '우리의 만남이 맺어갈 영향력',
      tech: ['Web', 'Node.js'],
    },
    {
      image: chaekMoImage,
      title: '책모',
      description: '독서 모임의 처음부터 끝까지',
      tech: [],
    },
    {
      image: channelingImage,
      title: '채널링',
      description: '유튜버의 AI 전략 파트너',
      tech: ['Web', 'SpringBoot'],
    },
    {
      image: ohMaeChuImage,
      title: '오메추',
      description: '오늘 뭐 먹지? 고민 말고, 음미하자',
      tech: ['Web', 'Node.js'],
    },
  ],
  '9': [
    {
      image: '💼',
      title: '취업 준비 플랫폼',
      description: '취업 준비생들을 위한 스터디 및 정보 공유 커뮤니티',
      tech: ['React', 'Spring Boot', 'MySQL'],
    },
    {
      image: '🎤',
      title: '노래방 예약 서비스',
      description: '실시간 노래방 예약 및 할인 정보 제공 플랫폼',
      tech: ['Android', 'Node.js', 'Redis'],
    },
    {
      image: '🍜',
      title: '레시피 공유 앱',
      description: '사용자들이 레시피를 공유하고 평가하는 요리 커뮤니티',
      tech: ['iOS', 'Spring', 'AWS'],
    },
    {
      image: '🚗',
      title: '카풀 매칭 서비스',
      description: '대학생들을 위한 안전한 카풀 매칭 플랫폼',
      tech: ['React', 'Node.js', 'MongoDB'],
    },
    {
      image: '📷',
      title: '사진 공유 SNS',
      description: '일상의 순간을 공유하는 소셜 네트워크 서비스',
      tech: ['iOS', 'Spring Boot', 'PostgreSQL'],
    },
    {
      image: '🎓',
      title: '과외 매칭 플랫폼',
      description: '학생과 선생님을 연결하는 과외 매칭 서비스',
      tech: ['Android', 'Node.js', 'MySQL'],
    },
  ],
}
