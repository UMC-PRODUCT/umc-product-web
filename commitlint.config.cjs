module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // ✨ 새로운 기능 추가
        'fix', // 🐛 버그 수정
        'docs', // 📝 문서 수정 (README 등)
        'style', // 💄 코드 포맷팅, 세미콜론 누락, 공백 등 (기능/로직 변경 없음)
        'refactor', // ♻️ 리팩토링 (기능 변화 없는 코드 개선)
        'test', // ✅ 테스트 코드 추가/수정
        'chore', // 🔧 그 외 변경사항 (빌드, 설정, 패키지 매니저 등)
        'ci', // 🛠 CI 관련 설정 변경
        'setting', // 프로젝트 설정 변경 (예: ESLint, Prettier 등)
      ],
    ],
    'subject-case': [0], // 메시지 제목 스타일은 자유롭게
  },
}
