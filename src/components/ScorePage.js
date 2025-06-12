// src/components/ScorePage.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import styles from '../styles/ScorePage.module.css';

export default function ScorePage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchResults = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.warn("사용자 ID가 localStorage에 없습니다.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("Quiz_Results")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("성적 불러오기 실패:", error);
    } else {
      setResults(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const formatKoreanDate = (utcDateStr) => {
    const date = new Date(utcDateStr);
    return date.toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  // ✅ 기초/표준/심화 → 내부 판정용 등급으로 변환
  const mapDifficultyToLevel = (diff) => {
    if (!diff) return '';
    const cleaned = diff.trim();

    if (['쉬움', '하', '기초', '초급'].includes(cleaned)) return '기초';
    if (['중간', '보통', '중', '표준', '기본'].includes(cleaned)) return '표준';
    if (['어려움', '상', '심화', '고급'].includes(cleaned)) return '심화';

    return '';
  };

  // ✅ 각 퀴즈 결과의 난이도와 점수로 학습 Level 판정
  const getLevelByQuiz = (difficulty, score) => {
    const levelDiff = mapDifficultyToLevel(difficulty);

    switch (levelDiff) {
      case '기초':
        return score <= 1 ? 1 : 2;
      case '표준':
        return score <= 1 ? 2 : 3;
      case '심화':
        return score <= 1 ? 3 : 4;
      default:
        return 1; // fallback
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📊 퀴즈 성적 확인</h2>
      {loading ? (
        <p>불러오는 중...</p>
      ) : results.length === 0 ? (
        <p>저장된 퀴즈 결과가 없습니다.</p>
      ) : (
        <ul className={styles.resultList}>
          {results.map((item, index) => {
            const level = getLevelByQuiz(item.difficulty, Number(item.score));
            return (
              <li key={index} className={styles.resultItem}>
                <p><strong>🕒 날짜:</strong> {formatKoreanDate(item.created_at)}</p>
                <p>
                  <strong>📘 학년:</strong> {item.grade || '정보 없음'} |
                  <strong> 난이도:</strong> {item.difficulty || '정보 없음'} |
                  <strong> 학습 레벨:</strong> <span className={styles.levelBadge}>Level {level}</span>
                </p>
                <p><strong>✅ 점수:</strong> {item.score} / {item.total}</p>
                <details>
                  <summary>📄 문제 다시 보기</summary>
                  <ul className={styles.questionList}>
                    {(item.problems ? JSON.parse(item.problems) : []).map((q, i) => (
                      <li key={i}>
                        <strong>Q{i + 1}:</strong> {q.question} <br />
                        <em>정답: {q.answer}</em>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
