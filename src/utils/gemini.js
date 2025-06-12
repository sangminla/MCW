// src/utils/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// 환경변수에서 API 키로 Gemini 인스턴스 생성
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

// ✅ 수학 문제 생성 함수 (정답은 숫자만)
export async function generateMathProblems(grade, difficulty) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `
너는 친절한 수학 선생님이야.

"${grade}" 수준, 난이도 "${difficulty}"의 수학 주관식 문제 3개를 아래 형식으로 출력해줘.

- 문제에는 수학 수식(예: 덧셈, 뺄셈, 곱셈, 나눗셈 등)이 포함되어도 괜찮아.
- 하지만 정답은 반드시 숫자만 포함해야 해. **단위나 설명 없이 정수 또는 소수 형태의 숫자만 정답으로 작성해줘.**
- 출력은 반드시 JSON 형식으로 해줘. 코드 블록(\`\`\`)이나 마크다운 없이, 순수 JSON만 출력해줘.

출력 형식:
[
  { "question": "문제1", "answer": "정답1" },
  { "question": "문제2", "answer": "정답2" },
  { "question": "문제3", "answer": "정답3" }
]
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    const parsed = JSON.parse(text);
    return parsed;
  } catch (error) {
    console.error("문제 생성 실패:", error);
    return [];
  }
}

// ✅ 공부 방법 추천 함수 (요약 포함)
export async function recommendStudyTips(grade, level) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const levelDescription = `
학생의 수학 학습 레벨은 4단계로 나뉘며, 각 레벨의 기준은 다음과 같습니다:

- Level 1: 쉬운 난이도의 문제(개념 문제)를 0~2개 맞출 수 있는 수준입니다.
- Level 2: 쉬운 문제를 모두 맞히거나, 보통 난이도의 문제를 1개 정도 맞출 수 있는 수준입니다.
- Level 3: 보통 난이도의 문제를 대부분 풀 수 있고, 어려운 문제도 일부 접근 가능한 수준입니다.
- Level 4: 어려운 난이도의 문제를 대부분 풀 수 있는 수준으로, 심화 학습이 가능한 상위권 수준입니다.
`;

  const prompt = `
너는 친절한 수학 선생님이야.

다음 학생의 정보(학년, 학습 레벨, 레벨 설명)를 보고,
1단계: 이 학생에게 적절한 공부 전략, 공부 시간 계획, 추천 학습 방법 등을 7~10줄 정도로 분석해줘.
2단계: 그 다음, 그 내용을 학생 눈높이에 맞게 한눈에 보기 쉽게 요약해서 3~5줄로 정리해줘.

※ 요약은 실제 학생이 읽는다고 생각하고 쉽게, 실천 중심으로 알려줘.

- 학년: ${grade}
- 학습 레벨: Level ${level}
- 레벨 설명: ${levelDescription}

출력 형식:
[상세 분석]
...

[요약 추천]
...
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    return text.trim();
  } catch (error) {
    console.error("공부법 추천 실패:", error);
    return "추천 결과를 가져오지 못했습니다.";
  }
}
