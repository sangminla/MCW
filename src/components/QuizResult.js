import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles/QuizResult.module.css';

const QuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score = 0, total = 3 } = location.state || {};

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>퀴즈 결과</h2>
      <p className={styles.score}>
        당신의 점수는 <strong>{score}</strong> / {total} 점입니다.
      </p>
      <button className={styles.homeButton} onClick={handleBackHome}>
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default QuizResult;
