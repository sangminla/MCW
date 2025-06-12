// src/components/BookPage.js
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import styles from '../styles/BookPage.module.css';

export default function BookPage() {
  const [grade, setGrade] = useState('');
  const [level, setLevel] = useState('');
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBookRecommendation = async () => {
    if (!grade || !level) {
      alert('학년과 레벨을 모두 선택해주세요.');
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('Book_Recommendations')
      .select('*')
      .eq('grade', grade)
      .eq('level', parseInt(level))
      .single();

    if (error) {
      console.error('추천 교재 불러오기 오류:', error.message);
      setBookData(null);
    } else {
      setBookData(data);
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📘 교재 추천 시스템</h2>

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

        <button onClick={fetchBookRecommendation}>📚 추천 보기</button>
      </div>

      {loading && <p>불러오는 중...</p>}

      {bookData && (
        <div className={styles.bookCard}>
          <h3>{bookData.title}</h3>
          <img src={bookData.image_url} alt={bookData.title} />
          <p>{bookData.description}</p>
        </div>
      )}
    </div>
  );
}
