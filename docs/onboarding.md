# UMC Product Web 온보딩 가이드

이 문서는 신규 팀원이 프로젝트 구조와 개발 규칙을 빠르게 이해할 수 있도록 정리한 운영 문서입니다.

## 1. 프로젝트 한눈에 보기

### 서비스 목적

- UMC 운영팀(총괄/학교)이 모집, 평가, 계정/기수/학교 데이터를 관리하는 웹 백오피스
- 권한별 UI 분기
  - 챌린저: 지원/대시보드 중심
  - 학교 운영진: 학교 모집/평가/대시보드
  - 총괄 운영진: 계정/지부/기수/시스템 관리

### 런타임 흐름

1. `src/app/main.tsx`에서 Router/Query/Theme Provider 구성
2. `src/routeTree.gen.ts`(자동 생성) 기반으로 라우팅 연결
3. 라우트는 얇은 어댑터, 실제 화면 로직은 `src/features/*/pages`에 배치
4. API 호출은 `features/*/domain/api.ts`에서 수행하고 hooks로 감싸 사용

## 2. 디렉터리 구조와 책임

| 경로                | 책임                                                 |
| ------------------- | ---------------------------------------------------- |
| `src/app`           | 앱 엔트리, 전역 Provider, Devtools                   |
| `src/routes`        | TanStack Router 파일 기반 라우트(얇은 라우트 어댑터) |
| `src/features/*`    | 도메인 단위 기능 모듈(화면/훅/도메인 타입/API)       |
| `src/shared`        | 공통 UI/유틸/상수/타입/스타일/에셋                   |
| `src/api`           | Axios 인스턴스, 인터셉터, 토큰 관리                  |
| `.storybook`        | 스토리북 설정/전역 데코레이터                        |
| `.github/workflows` | CI 워크플로우                                        |

### 레이어 규칙

- `routes -> features -> shared` 방향을 기본으로 사용
- `shared`는 feature 의존을 만들지 않는 것을 원칙으로 함
- 기능별 쿼리/타입/API는 우선 해당 feature 내부에 배치

## 3. 핵심 라이브러리와 사용 위치

| 라이브러리            | 왜 쓰는가                               | 주요 위치                                                 |
| --------------------- | --------------------------------------- | --------------------------------------------------------- |
| React + TypeScript    | UI 개발과 정적 타입 안정성              | `src/**/*`                                                |
| Vite                  | 빠른 개발 서버/빌드                     | `vite.config.ts`                                          |
| TanStack Router       | 파일 기반 라우팅 + route-level 제어     | `src/routes`, `src/routeTree.gen.ts`                      |
| TanStack Query        | 서버 상태 캐싱/동기화                   | `src/shared/hooks/customQuery.ts`, `src/features/*/hooks` |
| Zustand               | 사용자 역할/프로필 같은 클라이언트 상태 | `src/shared/store/useUserProfileStore.ts`                 |
| Axios                 | HTTP 클라이언트 + 인터셉터              | `src/api/axiosInstance.ts`, `src/api/interceptors/*`      |
| Emotion               | CSS-in-JS 스타일링                      | `*.style.ts(x)`, `src/shared/styles/*`                    |
| react-hook-form + zod | 폼 상태/검증                            | `src/features/*/schemas`, `src/features/*/pages`          |
| Storybook             | 컴포넌트 단위 개발/문서화               | `.storybook/*`, `*.stories.tsx`                           |
| Vitest                | 단위/스모크 테스트                      | `*.test.ts(x)`, `vitest.config.ts`                        |

## 4. 데이터/API 흐름 규칙

### 권장 흐름

1. `domain/api.ts`: 엔드포인트 단위 API 함수 정의
2. `hooks/use*.ts`: Query/Mutation 훅으로 감싸 UI 친화적 인터페이스 제공
3. `pages/*.tsx` 또는 `components/*.tsx`: 훅 사용, UI 렌더링

### 예시 파일

- 인증 API: `src/features/auth/domain/api.ts`
- 인증 Query 훅: `src/features/auth/hooks/useAuthQueries.ts`
- 공통 Query 래퍼: `src/shared/hooks/customQuery.ts`
- Query Key: `src/shared/queryKeys/*`

## 5. 인증/권한 처리 포인트

### 토큰 및 인터셉터

- 토큰 저장/조회: `src/api/tokenManager.ts`
- 요청 인터셉터(Authorization 주입): `src/api/interceptors/requestInterceptor.ts`
- 응답 인터셉터(401 시 refresh/retry): `src/api/interceptors/responseInterceptor.ts`

### 권한 기반 라우트 보호

- 권한 풀 보정: `src/features/auth/utils/roleGuard.ts`
- Management 라우트 보호: `src/routes/(app)/management/route.tsx`
- School 라우트 보호: `src/routes/(app)/school/route.tsx`
- 공통 헤더 분기: `src/routes/(app)/route.tsx`

## 6. 테스트와 품질 게이트

### 스크립트 기준

- `pnpm test`: unit 테스트
- `pnpm test:unit`: Vitest unit 프로젝트 실행
- `pnpm test:browser`: Storybook browser 테스트 실행
- `pnpm test:ci`: CI 기준 테스트(현재 unit only)
- `pnpm quality:check`: `typecheck + lint + test:ci`

### CI 워크플로우

- 품질 게이트: `.github/workflows/quality-gate.yml`
- Chromatic: `.github/workflows/chromatic.yml`

### 테스트 파일 배치 규칙

- 테스트는 코드와 같은 경로에 `*.test.ts(x)` 코로케이션
- 스토리는 코드와 같은 경로에 `*.stories.tsx` 코로케이션
- 전역 Storybook 설정은 `.storybook`에만 배치

## 7. 신규 기능 추가 시 체크리스트

1. 기능 위치 선정: `src/features/<domain>` 하위에 배치
2. API가 있으면 `domain/api.ts` + `hooks/use*.ts`로 분리
3. Query key는 `src/shared/queryKeys` 또는 domain query key를 재사용
4. 스타일은 컴포넌트 옆 `*.style.tsx`로 분리
5. 최소 smoke test 1개 이상 추가
6. PR 전에 `pnpm quality:check` 실행

## 8. 자주 보는 파일 맵

- 앱 엔트리: `src/app/main.tsx`
- 루트 라우트: `src/routes/__root.tsx`
- Axios 인스턴스: `src/api/axiosInstance.ts`
- Query Provider: `src/app/providers/tanstack-query.tsx`
- 공통 훅(Query): `src/shared/hooks/customQuery.ts`
- ESLint 설정: `eslint.config.js`
- Vitest 설정: `vitest.config.ts`
- Storybook 설정: `.storybook/main.ts`, `.storybook/preview.tsx`

## 9. 실무 팁

- `src/routeTree.gen.ts`는 자동 생성 파일이므로 직접 수정하지 않음
- 산출물(`dist`, `storybook-static`)은 린트 대상이 아니며 커밋 대상도 아님
- 경로 별칭은 `@app`, `@features`, `@shared`, `@routes`를 우선 사용

## 10. GitHub 이슈/PR 운영 규칙

### 이슈 작성 규칙

1. 이슈 타입을 명확히 지정합니다: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `perf`, `design`
2. 이슈 생성 직후 GitHub Project에 추가하고 Milestone을 지정합니다.
3. 상태는 Project 보드와 동기화합니다: `Todo -> In Progress -> In Review -> Done`
4. 블로킹/의존성은 본문에 반드시 명시합니다: `Blocked by #123`, `Blocks #456` (없으면 `없음`)

### PR 작성 및 리뷰 규칙

1. PR 타입을 지정하고 연관 이슈/프로젝트/마일스톤/블로킹 정보를 템플릿에 기입합니다.
2. 모든 PR은 Copilot 리뷰를 반드시 요청하고 결과를 반영합니다.
3. Copilot/사람 리뷰 코멘트는 머지 전에 모두 Resolve 합니다.
4. 상호 리뷰를 원칙으로 하며, 최소 1명 이상의 승인 후 머지합니다.
