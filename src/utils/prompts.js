// src/utils/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// 환경변수에서 API 키 불러오기
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

export async function generateMathProblems(grade, difficulty) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  // ✅ 짧고 간결한 프롬프트 (토큰 줄이기)
  const prompt = `
"${grade}" 수준, 난이도 "${difficulty}"의 수학 주관식 문제 3개를 아래 형식으로 출력해줘.
[
  { "question": "문제1", "answer": "정답1" },
  { "question": "문제2", "answer": "정답2" },
  { "question": "문제3", "answer": "정답3" }
]
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 응답을 JSON으로 파싱
    const parsed = JSON.parse(text);
    return parsed;
  } catch (error) {
    console.error("문제 생성 실패:", error);
    return [];
  }
}
