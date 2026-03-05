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
import areumdapImage from '@/shared/assets/project/9th/areumdap.png'
import bookrippleImage from '@/shared/assets/project/9th/bookripple.png'
import donakawaImage from '@/shared/assets/project/9th/donakawa.png'
import egobookImage from '@/shared/assets/project/9th/egobook.png'
import findersImage from '@/shared/assets/project/9th/finders.png'
import loopOnImage from '@/shared/assets/project/9th/loopon.png'
import naeFormReformImage from '@/shared/assets/project/9th/naeformreform.png'
import playproofImage from '@/shared/assets/project/9th/playproof.png'
import remuImage from '@/shared/assets/project/9th/remu.png'
import scoiImage from '@/shared/assets/project/9th/scoi.png'
import soksakLetterImage from '@/shared/assets/project/9th/soksakletter.png'
import ttorangImage from '@/shared/assets/project/9th/ttorang.png'
import valuedImage from '@/shared/assets/project/9th/valued.jpg'
import whatToEatImage from '@/shared/assets/project/9th/what-to-eat.webp'

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
      image: whatToEatImage,
      title: '뭐해먹집?',
      description: "반복되는 '뭐 해 먹지'를 집밥 루틴으로 바꾸다",
      tech: [],
    },
    {
      image: ttorangImage,
      title: '또랑',
      description: '가장 쉽고 빠른 발표 피드백',
      tech: [],
    },
    {
      image: egobookImage,
      title: '에고북',
      description: '나만의 고북이와 함께 하는 감정 기록 서비스',
      tech: [],
    },
    {
      image: naeFormReformImage,
      title: '내폼리폼',
      description: '고객과 리폼러를 연결해주는 플랫폼',
      tech: [],
    },
    {
      image: areumdapImage,
      title: '아름답',
      description: '질문을 통해 나를 알아가는 여정',
      tech: [],
    },
    {
      image: findersImage,
      title: 'Finders',
      description: '필름 유저들의 번거로운 현상소 탐색 과정을 간소화하는 현상소 통합 추천 서비스',
      tech: [],
    },
    {
      image: remuImage,
      title: 'Re:MU(레뮤)',
      description: '여행의 순간을 별로 남기다',
      tech: [],
    },
    {
      image: valuedImage,
      title: '밸류디',
      description: '당신을 위한, 스마트한 금융 서비스',
      tech: [],
    },
    {
      image: loopOnImage,
      title: '루프온(LOOP:ON)',
      description: '3일마다 다시 떠나는 나의 여정',
      tech: [],
    },
    {
      image: soksakLetterImage,
      title: '속삭편지',
      description: '나를 만나는 질문, 타인과 나누는 익명 편지',
      tech: [],
    },
    {
      image: scoiImage,
      title: '스코이(SCOI)',
      description: '편리한 스테이블 코인 결제 플랫폼',
      tech: [],
    },
    {
      image: playproofImage,
      title: 'Playproof',
      description: '당신의 게임을 함께할 팀원을 찾아보세요',
      tech: [],
    },
    {
      image: bookrippleImage,
      title: '북리플',
      description: '소통형 독서 기록 서비스',
      tech: [],
    },
    {
      image: donakawaImage,
      title: '도나카와',
      description: '후회 없는 쇼핑을 위한 나만의 스마트 소비 코치',
      tech: [],
    },
  ],
}
