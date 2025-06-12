// src/pages/QuizStart.js
import React, { useState } from 'react';
import { generateMathProblems } from '../utils/gemini';

export default function QuizStart() {
  const [grade, setGrade] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [problems, setProblems] = useState([]);

  const handleGenerate = async () => {
    const result = await generateMathProblems(grade, difficulty);
    setProblems(result);
  };

  return (
    <div>
      <h2>문제 자동 생성</h2>
      <select value={grade} onChange={(e) => setGrade(e.target.value)}>
        <option value="">학년 선택</option>
        <option value="중1">중1</option>
        <option value="중2">중2</option>
        <option value="중3">중3</option>
        <option value="고1">고1</option>
        <option value="고2">고2</option>
        <option value="고3">고3</option>
      </select>
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
        <option value="">난이도 선택</option>
        <option value="쉬움">쉬움</option>
        <option value="중간">중간</option>
        <option value="어려움">어려움</option>
      </select>
      <button onClick={handleGenerate}>문제 생성</button>

      {problems.length > 0 && (
        <div>
          <h3>생성된 문제:</h3>
          <ul>
            {problems.map((item, index) => (
              <li key={index}>
                <strong>Q{index + 1}:</strong> {item.question}<br />
                <strong>A:</strong> {item.answer}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
