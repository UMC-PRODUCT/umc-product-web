---
applyTo: '**'
---

# Copilot 리뷰 지침 (FSD형 구조 + 현재 코드베이스 기준)

## 1) 언어/응답 방식

- 모든 설명은 한국어로 작성합니다.
- 칭찬 위주의 서술보다, 위반/리스크를 먼저 명확히 제시합니다.
- 가능하면 파일 경로를 함께 제시합니다.

## 2) 리뷰 우선순위

1. 아키텍처/레이어(FSD형) 위반
2. 런타임 버그, 권한/인증, 데이터 흐름 리스크
3. 테스트 누락 또는 회귀 가능성
4. 네이밍/가독성/스타일

## 3) 현재 프로젝트 구조 기준

- `src/app`: 앱 엔트리, 전역 Provider, Devtools
- `src/routes`: TanStack Router 파일 라우트 (`(app)`, `(auth)`, `(oauth)`)
- `src/features/*`: 도메인 기능 모듈 (`domain`, `hooks`, `components`, `pages`, `utils` 등)
- `src/shared`: 공용 UI/유틸/훅/스타일/타입/상수/스토어
- `src/api`: axios 인스턴스/인터셉터/토큰 관리
- `src/types`: 전역 타입
- `src/routeTree.gen.ts`: 자동 생성 파일, 직접 수정 금지

## 4) FSD형 레이어 규칙 (현 구조에 맞춘 기준)

- 기본 의존 방향: `routes -> features -> shared`
- 라우트 파일은 얇은 어댑터로 유지하고, 화면 로직은 `features/*/pages`에 둡니다.
- `shared`는 `features/routes/app` 의존을 만들지 않습니다.
- feature 간 직접 import는 지양하고, 필요 시 `shared` 또는 feature의 공개 API(`index.ts`)를 통해 접근합니다.
- `src/api`는 인프라 레이어로 사용하며, 신규 코드에서 feature 의존 추가는 지양합니다.
- 경로 별칭은 `@app`, `@features`, `@shared`, `@routes`, `@`를 우선 사용합니다.

## 5) 데이터/상태 규칙

- 서버 상태는 `src/shared/hooks/customQuery.ts` 래퍼(`useCustomQuery`, `useCustomMutation` 등) 사용을 우선합니다.
- Query Key는 `src/shared/queryKeys/*` 또는 도메인 query key를 재사용합니다.
- API 호출은 우선 `features/*/domain/api.ts`에 정의하고 훅에서 감싸 사용합니다.

## 6) 파일/명명/배럴 규칙

- 컴포넌트 파일/폴더: PascalCase
- 훅/유틸 함수 파일: camelCase (`useXxx.ts`, `formatXxx.ts`)
- 스타일 분리 시 `*.style.tsx` 패턴을 따릅니다.
- 배럴(`index.ts`)은 기존 패턴이 있는 위치에서만 확장하고, 무분별한 신규 배럴 생성을 피합니다.

## 7) 테스트/스토리 규칙

- 테스트/스토리는 코드와 같은 경로에 코로케이션합니다.
- 명명 규칙: `*.test.ts(x)`, `*.stories.tsx`
- PR에 영향 범위 대비 테스트가 부족하면 우선 리스크로 지적합니다.

## 8) GitHub 협업 규칙 점검 (필수)

리뷰 시 PR 본문에서 아래 항목 누락 여부를 확인하고 누락 시 반드시 지적하세요.

1. Related Issue(`Closes #...`) 기입 여부
2. GitHub Project Item, Milestone 기입 여부

## 9) 리뷰 출력 형식

1. 한 줄 요약
2. 발견된 위반/리스크 목록 (심각도 순, 파일 경로 포함)
3. 추천 구조 또는 수정 방향
4. 최소 리팩토링 단계 (1~5)
5. 필요한 테스트/검증 항목
