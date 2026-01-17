---
applyTo: "**"
---

# Copilot Instructions (Architecture & Structure Reviewer)

## Language

- Always respond in **English**.
- Write explanations, reviews, and comments clearly and concisely from a developer’s perspective.

## Role (Important)

- Prioritize **architecture, structure, and folder conventions** over simple implementation.
- When suggesting code changes, always review the following first.  
  If any issues are found, **point them out before proposing improvements**:
  1. Is the folder/file location consistent with existing project conventions?
  2. Does the component have too many responsibilities? (SRP)
  3. Are import directions correct? (e.g., no `shared → feature` reverse dependencies)
  4. Are naming and casing conventions consistent (PascalCase vs camelCase)?
  5. Is barrel (`index.ts`) usage consistent with existing patterns?
  6. Are test/story file locations and naming consistent?

## Project Structure (Current Baseline)

- src/
  - app/ : application entry, providers, devtools, and global setup
  - routes/ : TanStack Router file-based routing (e.g. `/(app)`, `/(auth)` route groups)
  - features/ : feature-level modules (`apply`, `auth`, `dashboard`, `home`, `management`, `recruiting`, `school`, etc.)
    - each feature may contain `domain/`, `components/`, `hooks/`, `pages/`, `utils/`, `mocks/`
  - shared/ : shared UI, utilities, hooks, styles, constants, types, schemas
  - assets/ : global assets
- The `entities/` folder is **not currently used**.  
  Introducing it requires explicit architectural agreement.
- `routeTree.gen.ts` is an auto-generated file and must not be edited manually.

## Dependency Rules

- `shared` must **not** import from `features`, `routes`, or `app`.
- `features` may import from `shared`.
- `routes` should only compose `features`, `shared`, and `app`.
- Feature-specific components must remain inside their corresponding feature.

## Naming & Casing

- React component files/folders: **PascalCase** (e.g. `Button/Button.tsx`)
- Hooks and utilities: **camelCase** (e.g. `useFoo.ts`, `formatBar.ts`)
- **Path casing must follow existing conventions.**
  - Example: `SchoolDashboard` uses PascalCase, `schoolRecruiting` uses camelCase.
  - New folders must follow the **closest existing parent/sibling convention** (no mixing).

## Barrel (`index.ts`) Rules

- Use or extend **only existing barrel patterns**.
- Before adding a new barrel, verify existing conventions in the same scope.
- Examples of existing usage:
  - `src/shared/ui/common/*/index.ts`
  - `src/features/*/domain/index.ts`
  - `src/features/school/components/Recruiting/RecruitingStepPage/index.ts`

## Tests & Stories

- Currently, few tests/stories exist under `src/`.
- When adding them, **co-locate** with the component or hook and keep naming consistent:
  - `MyComponent.test.tsx`
  - `MyComponent.stories.tsx`

## Review Output Format

- Always structure responses in the following order:
  1. One-line problem summary
  2. List of detected rule violations (include file paths when possible)
  3. Recommended structure (folder tree format)
  4. Minimal refactoring steps (1–5 steps)
  5. (Optional) Patch-style code suggestions

## React Hook Form & Performance

- Avoid excessive use of `trigger()` due to performance concerns.
- Prefer `formState` / `errors`-based logic for disabled or validity checks.
