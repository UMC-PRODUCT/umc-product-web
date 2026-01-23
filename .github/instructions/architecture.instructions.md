---
applyTo: '**'
---

# 아키텍처·구조 검토용 Copilot 지침

## 언어

- 대화와 설명은 **한국어**로 작성하세요.
- 개발자의 관점에서 명확하고 간결하게 전달합니다.

## 역할(중요)

- 단순 구현보다 **아키텍처, 구조, 폴더 관습**을 우선 점검합니다.
- 코드 수정을 제안하기 전에 아래 항목을 반드시 검토하고, 위반 발견 시 개선안보다 먼저 지적하세요:
  1. 폴더/파일 위치가 기존 규칙과 일치하는가?
  2. 컴포넌트가 단일 책임 원칙(SRP)을 지키는가?
  3. import 방향이 올바른가? (`shared` ⇒ `feature` 역방향 없음)
  4. 명명/케이스(PascalCase vs camelCase)가 일관적인가?
  5. 배럴(`index.ts`) 사용이 현 패턴을 따르는가?
  6. 테스트/스토리 파일의 위치와 이름이 일관적인가?

## 프로젝트 구조 (기준)

- `src/`
  - `app/`: 애플리케이션 엔트리, 프로바이더, 전역 설정
  - `routes/`: TanStack Router 기반 라우팅 (`/(app)`, `/(auth)` 등)
  - `features/`: 기능 단위 모듈 (`apply`, `auth`, `dashboard`, `home`, `management`, `recruiting`, `school`, ...)
    - 각 기능 내에 `domain/`, `components/`, `hooks/`, `pages/`, `utils/`, `mocks/` 등 포함 가능
  - `shared/`: 공용 UI, 유틸, 훅, 스타일, 상수, 타입, 스키마
  - `assets/`: 전역 자산
- `entities/` 폴더는 현재 사용하지 않으며, 도입 시 별도 아키텍처 합의 필요
- `routeTree.gen.ts`는 자동 생성 파일로 수정 금지

## 의존성 규칙

- `shared`는 `features`, `routes`, `app`을 import 하지 않습니다.
- `features`는 `shared`를 import 할 수 있습니다.
- `routes`는 `features`, `shared`, `app`만 조합합니다.
- 기능 전용 컴포넌트는 해당 feature 내부에 유지되어야 합니다.

## 명명·케이스

- React 컴포넌트 파일/폴더: **PascalCase** (예: `Button/Button.tsx`)
- 훅/유틸: **camelCase** (예: `useFoo.ts`, `formatBar.ts`)
- 경로 케이스는 기존 관습에 따라야 하며, 부모/형제 폴더 스타일과 일치해야 함
  - 예: `SchoolDashboard` (PascalCase), `schoolRecruiting` (camelCase)

## 배럴(`index.ts`) 규칙

- 기존 스코프에서 쓰던 배럴 패턴만 사용하거나 확장하세요.
- 새로운 배럴을 추가하기 전, 같은 영역의 관습을 먼저 확인하세요.
- 기존 예시:
  - `src/shared/ui/common/*/index.ts`
  - `src/features/*/domain/index.ts`
  - `src/features/school/components/Recruiting/RecruitingStepPage/index.ts`

## 테스트·스토리

- `src/` 아래 테스트/스토리가 많지 않으므로 추가 시 해당 컴포넌트/훅과 같은 폴더에 위치시킵니다.
- 명명 규칙: `MyComponent.test.tsx`, `MyComponent.stories.tsx`

## 리뷰 출력 형식

- 응답은 아래 순서로 구성하세요:
  1. 한 줄 요약
  2. 발견된 위반 항목 (가능한 파일 경로 포함)
  3. 추천 구조 (폴더 트리 형태)
  4. 최소 리팩토링 단계 (1~5 단계)
  5. (선택) 패치 스타일 코드 제안

## React Hook Form & 성능

- `trigger()` 사용은 최소화하고, `formState`/`errors` 기반으로 상태를 판단하세요.
- disabled·유효성 체크는 formState를 활용합니다.
