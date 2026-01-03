module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 새로운 기능 추가
        'fix', // 버그 수정
        'docs', // 문서 수정 (README 등)
        'style', // 코드 포맷팅, 세미콜론 누락 등 (기능 변경 없음)
        'refactor', // 리팩토링 (기능 변화 없는 코드 개선)
        'test', // 테스트 코드 추가/수정
        'chore', // 그 외 변경사항 (빌드, 설정 등)
        'ci', // CI 관련 설정 변경
        'build', // 빌드 시스템 또는 외부 종속성 변경
        'perf', // 성능 개선
      ],
    ],
    'subject-case': [0], // 메시지 제목 스타일은 자유롭게
  },
}
