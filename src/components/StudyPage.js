// src/components/StudyPage.js
import React, { useState } from 'react';
import styles from '../styles/StudyPage.module.css';
import { recommendStudyTips } from '../utils/gemini';

export default function StudyPage() {
  const [grade, setGrade] = useState('');
  const [level, setLevel] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);

  const getStudyRecommendation = async () => {
    if (!grade || !level) {
      alert("학년과 레벨을 선택해주세요.");
      return;
    }

    setLoading(true);
    const result = await recommendStudyTips(grade, level);
    setRecommendation(result);
    setLoading(false);
  };

  const renderFormattedText = (text) => {
    return text.split(/\n(?=\[.*?\])/g).map((block, i) => {
      const match = block.match(/^\[(.*?)\]\s*(.*)$/s);
      if (match) {
        return (
          <div key={i}>
            <strong>{`[${match[1]}]`}</strong>
            <p>{match[2]}</p>
          </div>
        );
      } else {
        return <p key={i}>{block}</p>;
      }
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>📖 공부 방법 추천</h2>

      <div className={styles.selector}>
        <label>
          학년:
          <select value={grade} onChange={(e) => setGrade(e.target.value)}>
            <option value="">선택</option>
            <option value="중1">중1</option>
            <option value="중2">중2</option>
            <option value="중3">중3</option>
            <option value="고1">고1</option>
            <option value="고2">고2</option>
            <option value="고3">고3</option>
          </select>
        </label>

        <label>
          학습 레벨:
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="">선택</option>
            <option value="1">Level 1</option>
            <option value="2">Level 2</option>
            <option value="3">Level 3</option>
            <option value="4">Level 4</option>
          </select>
        </label>

        <button onClick={getStudyRecommendation}>🔍 공부법 추천 받기</button>
      </div>

      {loading && <p>AI가 추천을 작성 중입니다...</p>}

      {recommendation && (
        <div className={styles.resultBox}>
          <h3>✨ AI 추천 결과</h3>
          {renderFormattedText(recommendation)}
        </div>
      )}
    </div>
  );
}

