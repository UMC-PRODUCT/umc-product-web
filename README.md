# UMC Product Web

UMC 운영팀이 정책·계정·데이터를 한 곳에서 관리할 수 있도록 만든 백오피스입니다. 권한(챌린저, 파트장, 회장단, 총괄)에 따라 다른 뷰를 제공하며, 운영 효율과 정책 반영 속도를 높이는 데 집중합니다.

## 목차

- [Contributors](#contributors)
- [Tech Stack](#tech-stack)
- [시작하기](#시작하기)
- [스크립트](#스크립트)
- [프로젝트 구조](#프로젝트-구조)
- [라우팅](#라우팅)
- [스타일링](#스타일링)
- [상태 관리](#상태-관리)
- [폼 관리](#폼-관리)
- [코드 품질 도구](#코드-품질-도구)
- [Commit Convention](#commit-convention)
- [Code Convention](#code-convention)
- [테스트](#테스트)
- [기여 가이드](#기여-가이드)
- [배포](#배포)
- [트러블슈팅](#트러블슈팅)

---

## Contributors

|                                             **김연진(코튼)**                                              |
| :-------------------------------------------------------------------------------------------------------: |
| <img width="150" height="150" alt="김연진" src="https://avatars.githubusercontent.com/u/111187984?v=4" /> |
|                               [@yeonjin719](https://github.com/yeonjin719)                                |

---

## Tech Stack

### Core

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=0b172a)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=ffffff)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=ffffff)

### 상태 관리 & 라우팅

![TanStack Router](https://img.shields.io/badge/TanStack%20Router-F97316?style=for-the-badge)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=react-query&logoColor=ffffff)
![Zustand](https://img.shields.io/badge/Zustand-5C3C1F?style=for-the-badge)

### UI & 스타일링

![Emotion](https://img.shields.io/badge/Emotion-D36AC6?style=for-the-badge&logo=emotion&logoColor=ffffff)
![Radix UI](https://img.shields.io/badge/Radix%20UI-161618?style=for-the-badge&logo=radix-ui&logoColor=ffffff)

### 코드 품질

![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=ffffff)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=000000)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=ffffff)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=ffffff)

### 협업 도구

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=ffffff)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=ffffff)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=ffffff)
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=ffffff)

---

## 시작하기

### 환경 요구사항

| 도구    | 최소 버전 |
| ------- | --------- |
| Node.js | >=22.0.0  |
| pnpm    | >=9.0.0   |

### 설치

```bash
# 저장소 클론
git clone https://github.com/UMC-PRODUCT/product-web.git
cd product-web

# 의존성 설치
pnpm install
```

### 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하세요:

```bash
touch .env
```

Vite 환경 변수는 `VITE_` 접두사를 사용합니다:

```env
# API 서버 URL (예시)
VITE_API_BASE_URL=https://api.example.com

# 기타 설정
VITE_APP_NAME=UMC Product Web
```

> `.env` 파일은 `.gitignore`에 포함되어 있어 Git에 커밋되지 않습니다.

### 개발 서버 실행

```bash
pnpm dev   # http://localhost:3000
```

---

## 스크립트

| 명령어              | 설명                                |
| ------------------- | ----------------------------------- |
| `pnpm dev`          | 개발 서버 실행 (port 3000)          |
| `pnpm build`        | TypeScript 타입체크 + 프로덕션 빌드 |
| `pnpm preview`      | 빌드된 결과물 미리보기              |
| `pnpm test`         | Vitest 테스트 실행                  |
| `pnpm lint`         | ESLint 검사                         |
| `pnpm lint:fix`     | ESLint 자동 수정                    |
| `pnpm format`       | Prettier로 코드 포맷팅              |
| `pnpm format:check` | 포맷팅 상태 확인                    |
| `pnpm typecheck`    | TypeScript 타입 검사만 실행         |

---

## 프로젝트 구조

```
src/
├── assets/           # 이미지, 아이콘 등 정적 자산
├── components/       # 재사용 가능한 UI 컴포넌트
│   ├── auth/         # 인증 관련 컴포넌트
│   ├── common/       # 공통 컴포넌트 (Button, Modal, Tab 등)
│   ├── form/         # 폼 컴포넌트 (LabelTextField 등)
│   ├── layout/       # 레이아웃 컴포넌트 (Header, Footer)
│   └── modal/        # 모달 컴포넌트
├── constants/        # 상수 정의
├── hooks/            # 커스텀 React 훅
├── integrations/     # 외부 서비스 통합
├── mocks/            # Mock 데이터
├── routes/           # TanStack Router 파일 기반 라우트
│   ├── (app)/        # 앱 레이아웃 그룹
│   ├── (auth)/       # 인증 레이아웃 그룹
│   └── __root.tsx    # 루트 레이아웃
├── schema/           # Zod 유효성 검사 스키마
├── store/            # Zustand 상태 관리
├── styles/           # 스타일 시스템 (theme, global, media)
├── types/            # TypeScript 타입 정의
├── utils/            # 유틸리티 함수
└── main.tsx          # 앱 진입점
```

---

## 라우팅

TanStack Router의 파일 기반 라우팅을 사용합니다.

### 레이아웃 구조

| 레이아웃                                | 설명                                    |
| --------------------------------------- | --------------------------------------- |
| `src/routes/(app)/route.tsx`            | 글로벌 레이아웃                         |
| `src/routes/(app)/management/route.tsx` | 관리 전용 레이아웃 (헤더 없이 Outlet만) |
| `src/routes/(auth)/route.tsx`           | 인증 레이아웃                           |

### 헤더 분기

- `/management/*` 경로 → `SuperHeader`
- 그 외 경로 → `ChallengerHeader`
- Footer는 flex 레이아웃으로 하단 고정

---

## 스타일링

Emotion CSS-in-JS를 사용합니다.

### 디자인 토큰

```typescript
import { theme } from '@/styles/theme'

// 색상
theme.colors.primary
theme.colors.gray[500]

// 타이포그래피
theme.typography.heading1
theme.typography.body2
```

### 반응형

```typescript
import { media } from '@/styles/media'

// 미디어 쿼리
${media.down('tablet')} {
  // 태블릿 이하
}

${media.up('desktop')} {
  // 데스크탑 이상
}
```

### 파일 구조

컴포넌트별 스타일은 `.style.tsx` 파일로 분리합니다:

```
components/
└── Button/
    ├── Button.tsx
    └── Button.style.tsx
```

---

## 상태 관리

### 클라이언트 상태: Zustand

```typescript
import { useAuthStore } from '@/store/authStore'

const { user, login, logout } = useAuthStore()
```

### 서버 상태: TanStack Query

```typescript
import { useQuery, useMutation } from '@tanstack/react-query'

const { data, isLoading } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
})
```

### DevTools

개발 환경에서 TanStack Query DevTools와 Router DevTools가 자동으로 활성화됩니다.

---

## 폼 관리

react-hook-form + Zod를 사용합니다.

### 스키마 정의

```typescript
// src/schema/loginSchema.ts
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('유효한 이메일을 입력하세요'),
  password: z.string().min(8, '8자 이상 입력하세요'),
})
```

### 폼 사용

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/schema/loginSchema'

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: zodResolver(loginSchema),
})
```

---

## 코드 품질 도구

### ESLint

ESLint 9 Flat Config를 사용합니다:

- `@tanstack/eslint-config` 기반
- `eslint-plugin-react`: React 규칙
- `eslint-plugin-react-hooks`: Hooks 규칙
- `eslint-plugin-jsx-a11y`: 접근성 규칙
- `simple-import-sort`로 import 자동 정렬

```bash
pnpm lint        # 검사
pnpm lint:fix    # 자동 수정
```

### Prettier

`prettier.config.js` 주요 설정:

| 옵션          | 값         |
| ------------- | ---------- |
| 세미콜론      | 없음       |
| 따옴표        | 작은따옴표 |
| 줄 길이       | 100자      |
| 트레일링 콤마 | all        |
| 줄바꿈        | LF         |

```bash
pnpm format         # 포맷팅 적용
pnpm format:check   # 포맷팅 확인
```

### Git Hooks (Husky)

| Hook       | 동작                                 |
| ---------- | ------------------------------------ |
| pre-commit | lint-staged 실행 (ESLint + Prettier) |
| commit-msg | commitlint로 커밋 메시지 검증        |
| pre-push   | 빌드 실행 (`pnpm run build`)         |

### lint-staged

스테이징된 파일에만 린트/포맷 적용:

- `*.{ts,tsx}` (_.gen.ts, _.d.ts 제외) → ESLint --fix + Prettier
- `*.{js,jsx,cjs,mjs}` → ESLint --fix + Prettier
- `*.{json,md,css,html,yaml}` → Prettier

---

## Commit Convention

| 타입     | 설명             |
| -------- | ---------------- |
| feat     | 기능 추가        |
| fix      | 버그 수정        |
| docs     | 문서 변경        |
| style    | 포맷/UI 변경     |
| refactor | 리팩터링         |
| test     | 테스트 추가/수정 |
| chore    | 잡일/설정        |
| ci       | CI 설정          |
| build    | 빌드 설정        |
| perf     | 성능 개선        |

### 커밋 메시지 형식

```
<type>(<scope>): <subject>

<body>

<footer>
```

예시:

```bash
feat(auth): 로그인 폼 유효성 검사 추가

- 이메일 형식 검증
- 비밀번호 최소 길이 검증

Closes #123
```

---

## Code Convention

| 구분      | 내용                                                                              |
| --------- | --------------------------------------------------------------------------------- |
| 브레이킹  | `BREAKING CHANGE:` 문구로 명시                                                    |
| 포맷/린트 | `pnpm lint` 준수, 임포트 순서 규칙 준수, 경로는 `@/*` 사용                        |
| 스타일    | Emotion 사용 시 `.style.tsx`로 분리, `theme.colors/typography`, `media` 우선 사용 |
| 타입      | `Array<T>` 표기, 공용 유틸(`resolveTypo` 등)로 널 가드                            |
| 컴포넌트  | 공용 Header/Modal/Badge 재사용, 반응형은 `media.down/up` 활용                     |

---

## 테스트

```bash
pnpm test   # Vitest 실행
```

### 테스트 도구

- **Vitest**: 테스트 러너
- **@testing-library/react**: React 컴포넌트 테스트
- **jsdom**: 브라우저 환경 시뮬레이션

---

## 기여 가이드

### 브랜치 전략

| 브랜치       | 용도                       |
| ------------ | -------------------------- |
| `main`       | 프로덕션 브랜치            |
| `develop`    | 개발 브랜치 (PR 기본 대상) |
| `feature/*`  | 기능 개발                  |
| `fix/*`      | 버그 수정                  |
| `chore/*`    | 설정/잡일                  |
| `refactor/*` | 리팩터링                   |

### 개발 흐름

1. `develop` 브랜치에서 새 브랜치 생성

   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/기능명
   ```

2. 작업 후 커밋 (Conventional Commits 준수)

   ```bash
   git add .
   git commit -m "feat: 새로운 기능 추가"
   ```

3. PR 생성
   - `.github/pull_request_template.md` 템플릿 사용
   - 관련 이슈 연결
   - 테스트 결과 첨부

---

## 배포

```bash
pnpm build   # dist/ 폴더 생성
```

빌드된 `dist/` 폴더를 정적 호스팅 서비스에 배포합니다.

---

## 트러블슈팅

### pnpm 버전 오류

```bash
ERROR: This project requires pnpm version >=9.0.0
```

해결:

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

### Node.js 버전 오류

```bash
ERROR: This project requires Node.js version >=22.0.0
```

해결 (nvm 사용 시):

```bash
nvm install 22
nvm use 22
```

### 타입 에러가 빌드 시에만 발생

`pnpm build`는 타입체크를 포함합니다. 개발 중 타입 문제를 미리 확인하려면:

```bash
pnpm typecheck
```

### ESLint import 순서 오류

`simple-import-sort` 플러그인이 import 순서를 검사합니다. 자동 수정:

```bash
pnpm lint:fix
```

### Husky 훅이 동작하지 않음

```bash
pnpm prepare   # Husky 재설치
```

---

## 라이선스

Private
