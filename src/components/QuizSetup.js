// ✅ 수정된 QuizSetup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateMathProblems } from '../utils/gemini';
import styles from '../styles/QuizSetup.module.css';

export default function QuizSetup() {
  const [grade, setGrade] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleStartQuiz = async () => {
    if (!grade || !difficulty) {
      setErrorMsg("학년과 난이도를 선택해주세요.");
      return;
    }
    setErrorMsg('');
    setLoading(true);
    try {
      const problems = await generateMathProblems(grade, difficulty);
      setLoading(false);

      if (!problems || problems.length === 0) {
        setErrorMsg("문제 생성에 실패했습니다. 다시 시도해주세요.");
        return;
      }

      // ✅ grade, difficulty 전달 추가
      navigate('/quiz', { state: { problems, grade, difficulty } });
    } catch (err) {
      setLoading(false);
      setErrorMsg("문제 생성 중 오류가 발생했습니다.");
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>퀴즈 설정</h2>

      <div className={styles.formGroup}>
        <label className={styles.label}>학년 선택</label>
        <select
          className={styles.select}
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        >
          <option value="">선택</option>
          <option value="중1">중1</option>
          <option value="중2">중2</option>
          <option value="중3">중3</option>
          <option value="고1">고1</option>
          <option value="고2">고2</option>
          <option value="고3">고3</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>난이도 선택</label>
        <select
          className={styles.select}
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">선택</option>
          <option value="쉬움">쉬움</option>
          <option value="중간">중간</option>
          <option value="어려움">어려움</option>
        </select>
      </div>

      <button
        className={styles.startButton}
        onClick={handleStartQuiz}
        disabled={loading}
      >
        {loading ? '문제 생성 중...' : '퀴즈 시작'}
      </button>

      {errorMsg && <p className={styles.error}>{errorMsg}</p>}
    </div>
  );
}
