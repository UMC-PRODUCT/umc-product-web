# UMC Product Web 🚀

UMC 운영팀이 정책·계정·데이터를 한 곳에서 관리할 수 있도록 만든 백오피스입니다. 권한(챌린저, 파트장, 회장단, 총괄)에 따라 다른 뷰를 제공하며, 운영 효율과 정책 반영 속도를 높이는 데 집중합니다.

## Contributors 👥

|                                             **김연진(코튼)**                                              |
| :-------------------------------------------------------------------------------------------------------: |
| <img width="150" height="150" alt="김연진" src="https://avatars.githubusercontent.com/u/111187984?v=4" /> |
|                               [@yeonjin719](https://github.com/yeonjin719)                                |

## Tech Stack 🧰

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=0b172a)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=ffffff)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=ffffff)

![TanStack Router](https://img.shields.io/badge/TanStack%20Router-F97316?style=for-the-badge)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=react-query&logoColor=ffffff)
![Zustand](https://img.shields.io/badge/Zustand-5C3C1F?style=for-the-badge)

![Emotion](https://img.shields.io/badge/Emotion-9B4F96?style=for-the-badge)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=ffffff)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=000000)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=ffffff)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=ffffff)

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=ffffff)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=ffffff)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=ffffff)
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=ffffff)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=ffffff)

## Getting Started 🏁

```bash
pnpm install   # 의존성
pnpm dev       # http://localhost:3000
```

### Scripts 📜

- `pnpm dev` — 개발 서버
- `pnpm build` — 프로덕션 번들 + 타입체크
- `pnpm preview` — 빌드 결과 확인
- `pnpm lint` — ESLint
- `pnpm test` — Vitest

## Project Structure 🗂️

```
src/
  components/      # 공용 UI (Header, Footer, Button 등)
  routes/          # TanStack Router 파일 기반 라우트
  styles/          # theme, media, global styles
  store/           # Zustand 상태
  utils/           # 공용 유틸 (typography resolver 등)
```

### Routing Notes 🧭

- 글로벌 레이아웃: `src/routes/(app)/route.tsx`
  - `/management/*` 경로 → `SuperHeader`
  - 그 외 경로 → `ChallengerHeader`
  - Footer는 flex 레이아웃으로 하단 고정
- 관리 전용 레이아웃: `src/routes/(app)/management/route.tsx` (헤더 없이 Outlet만 렌더)

## Commit Types 📝

| 타입     | 설명             |
| -------- | ---------------- |
| feat     | 기능 추가        |
| fix      | 버그 수정        |
| chore    | 잡일/설정        |
| refactor | 리팩터링         |
| docs     | 문서 변경        |
| test     | 테스트 추가/수정 |
| style    | 포맷/UI 변경     |
| build    | 빌드 설정        |
| ci       | CI 설정          |
| perf     | 성능 개선        |

## Code Convention 🧱

| 구분      | 내용                                                                              |
| --------- | --------------------------------------------------------------------------------- |
| 브레이킹  | `BREAKING CHANGE:` 문구로 명시                                                    |
| 포맷/린트 | `pnpm lint` 준수, 임포트 순서 규칙 준수, 경로는 `@/*` 사용                        |
| 스타일    | Emotion 사용 시 `.style.tsx`로 분리, `theme.colors/typography`, `media` 우선 사용 |
| 타입      | `Array<T>` 표기, 공용 유틸(`resolveTypo` 등)로 널 가드                            |
| 컴포넌트  | 공용 Header/Modal/Badge 재사용, 반응형은 `media.down/up` 활용                     |

## Testing & Quality ✅

- `pnpm lint` — 코드/스타일 검사
- `pnpm test` — 단위 테스트
- PR 시 `.github/pull_request_template.md` 참고해 변경 요약/검증 작성

## Deployment 🚢

`pnpm build` 실행 후 생성되는 `dist/`를 배포합니다.
