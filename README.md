MCW: 수학 학습 추천 웹사이트
=============================

학생 개개인의 학년과 실력을 바탕으로 퀴즈, 교재 추천, 공부 방법 추천 기능을 제공하며,
관리자 모드에서 모든 데이터를 관리할 수 있는 수학 맞춤형 학습 플랫폼입니다.

---------------------------------------------
[주요 기능]

- 사용자 ID 기반 로그인 / 회원가입
- 학년·점수 기반 퀴즈 문제 풀이 (Gemini AI 사용)
- 퀴즈 성적 저장 및 날짜별 조회
- 학습 방법(Gemini AI 사용) & 교재 추천
- 관리자 기능:
  - 회원 관리
  - 퀴즈/교재 목록 관리
  - 성적 분석 및 시스템 모니터링

---------------------------------------------
[프로젝트 실행 방법]

1. GitHub에서 프로젝트 클론하기

   git clone https://github.com/sangminla/MCW.git
   cd MCW

2. 필요한 라이브러리 설치

   npm install

3. .env 파일 생성 (루트 디렉토리)
 러닝x에 .env 파일을 같이 첨부해둠 그대로 복붙해서 사용면됨

   REACT_APP_SUPABASE_URL=당신의_SUPABASE_URL
   REACT_APP_SUPABASE_ANON_KEY=당신의_SUPABASE_ANON_KEY
   REACT_APP_GEMINI_API_KEY=당신의_GEMINI_API_KEY

   - Supabase 키는 https://supabase.io 에서 프로젝트 생성 후 확인
   - Gemini 키는 https://makersuite.google.com/app/apikey 에서 발급 가능

4. 프로젝트 실행

   npm start

   → 브라우저에서 http://localhost:3000 자동 실행

5. 관리자모드를 실행할때
아이디 admin001
비밀번호 admin123 으로 로그인 후 실행가능

---------------------------------------------
[프로젝트 폴더 구조]

MCW/
├── public/
├── src/
│   ├── components/       → 주요 컴포넌트
│   ├── styles/           → CSS 모듈
│   ├── utils/            → Gemini 연동 함수
│   ├── supabaseClient.js → Supabase 연결
│   └── App.js            → 라우팅
├── .env                  → 환경변수
└── package.json

---------------------------------------------
[사용 기술]

- React.js
- Supabase (백엔드, 인증, 데이터 저장)
- Gemini API (문제 및 학습 방법 생성)
- CSS Modules

---------------------------------------------
[제작자]

- 영남대학교 수학과 & 컴퓨터공학과 복수전공
- GitHub: https://github.com/sangminla
