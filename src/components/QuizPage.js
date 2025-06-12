import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import styles from '../styles/QuizPage.module.css';

export default function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const problems = useMemo(() => location.state?.problems || [], [location.state]);
  const grade = location.state?.grade || '';
  const difficulty = location.state?.difficulty || '';

  const [answers, setAnswers] = useState(Array(problems.length).fill(""));
  const [timeLeft, setTimeLeft] = useState(300); // 5분

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleChange = (idx, value) => {
    const updated = [...answers];
    updated[idx] = value;
    setAnswers(updated);
  };

  const handleSubmit = useCallback(async () => {
    let score = 0;
    problems.forEach((item, idx) => {
      if (answers[idx].trim() === item.answer.trim()) {
        score++;
      }
    });

    const { error } = await supabase.from('Quiz_Results').insert([{
      user_id: localStorage.getItem('userId'),
      score,
      total: problems.length,
      problems: JSON.stringify(problems),
      answers: JSON.stringify(answers),
      grade,
      difficulty
    }]);

    if (error) {
      console.error("퀴즈 저장 실패:", error);
      alert("결과 저장 중 오류가 발생했습니다.");
    }

    navigate('/quiz-result', {
      state: {
        problems,
        answers,
        score,
        total: problems.length,
        grade,
        difficulty
      }
    });
  }, [answers, problems, grade, difficulty, navigate]);

  useEffect(() => {
    if (timeLeft === 0) {
      alert("시간이 종료되었습니다! 자동 제출됩니다.");
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, handleSubmit]);

  // ✅ MathJax 렌더링 트리거
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise();
    }
  }, [problems, answers]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📝 퀴즈</h2>
      <div className={styles.timer}>⏰ 남은 시간: {formatTime(timeLeft)}</div>

      <div className={styles.quizList}>
        {problems.map((item, index) => (
          <div key={index} className={styles.quizItem}>
            <p className={styles.question}>
              <strong>Q{index + 1}.</strong>{" "}
              <span dangerouslySetInnerHTML={{ __html: item.question }} />
            </p>
            <input
              type="text"
              value={answers[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              className={styles.input}
              placeholder="정답을 입력하세요"
            />
          </div>
        ))}
      </div>

      <button className={styles.submitButton} onClick={handleSubmit}>
        제출하기
      </button>
    </div>
  );
}
