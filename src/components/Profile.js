import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import styles from '../styles/Profile.module.css';

export default function Profile() {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [grade, setGrade] = useState('');
  const [score, setScore] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  // 🔍 유저 정보 불러오기
  const fetchProfile = async () => {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      console.warn('로그인 정보가 없습니다.');
      return;
    }

    const { data, error } = await supabase
      .from('users')
      .select('name, user_id, grade, score')
      .eq('user_id', storedUserId)
      .single();

    if (error || !data) {
      console.error('프로필 불러오기 실패:', error);
      setMessage('프로필 정보를 불러오지 못했습니다.');
    } else {
      setName(data.name);
      setUserId(data.user_id);
      setGrade(data.grade);
      setScore(data.score);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      setMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    const { error } = await supabase
      .from('users')
      .update({
        name,
        grade,
        score,
        ...(password && { password }) // 비밀번호 변경 시에만 포함
      })
      .eq('user_id', userId);

    if (error) {
      console.error('프로필 저장 실패:', error);
      setMessage('저장 중 오류가 발생했습니다.');
    } else {
      setIsEditing(false);
      setMessage('정보가 저장되었습니다.');
    }
  };

  return (
    <div className={styles.profileContainer}>
      <h2 className={styles.title}>내 프로필</h2>

      {!isEditing ? (
        <div className={styles.viewMode}>
          <p><strong>이름:</strong> {name}</p>
          <p><strong>아이디:</strong> {userId}</p>
          <p><strong>학년:</strong> {grade}</p>
          <p><strong>학교 시험 점수:</strong> {score}</p>
          <button className={styles.button} onClick={() => setIsEditing(true)}>수정하기</button>
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSave}>
          <label className={styles.label}>이름</label>
          <input
            className={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className={styles.label}>새 비밀번호</label>
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label className={styles.label}>비밀번호 확인</label>
          <input
            className={styles.input}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <label className={styles.label}>학년</label>
          <select
            className={styles.input}
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          >
            <option value="중학교 1학년">중학교 1학년</option>
            <option value="중학교 2학년">중학교 2학년</option>
            <option value="중학교 3학년">중학교 3학년</option>
            <option value="고등학교 1학년">고등학교 1학년</option>
            <option value="고등학교 2학년">고등학교 2학년</option>
            <option value="고등학교 3학년">고등학교 3학년</option>
          </select>

          <label className={styles.label}>학교 시험 점수</label>
          <input
            className={styles.input}
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />

          <button type="submit" className={styles.button}>저장하기</button>
        </form>
      )}

      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
