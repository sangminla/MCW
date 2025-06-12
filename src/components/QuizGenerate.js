// src/components/QuizGenerate.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateMathProblems } from '../utils/gemini';

export default function QuizGenerate() {
  const [grade, setGrade] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!grade || !difficulty) {
      alert("학년과 난이도를 모두 선택해주세요.");
      return;
    }

    setLoading(true);
    const problems = await generateMathProblems(grade, difficulty);
    setLoading(false);

    if (problems.length === 0) {
      alert("문제 생성에 실패했습니다.");
      return;
    }

    // ✅ Gemini 문제를 퀴즈 화면으로 전달
    navigate('/quiz', { state: { problems } });
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Gemini 문제 자동 생성</h2>

      <select value={grade} onChange={(e) => setGrade(e.target.value)}>
        <option value="">학년 선택</option>
        <option value="중1">중1</option>
        <option value="중2">중2</option>
        <option value="중3">중3</option>
        <option value="고1">고1</option>
        <option value="고2">고2</option>
        <option value="고3">고3</option>
      </select>

      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} style={{ marginLeft: '1rem' }}>
        <option value="">난이도 선택</option>
        <option value="쉬움">쉬움</option>
        <option value="중간">중간</option>
        <option value="어려움">어려움</option>
      </select>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleGenerate}>문제 생성하고 퀴즈 시작</button>
      </div>

      {loading && <p>문제 생성 중입니다...</p>}
    </div>
  );
}
