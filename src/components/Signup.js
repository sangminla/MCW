import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import styles from '../styles/Signup.module.css';

export default function Signup() {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [grade, setGrade] = useState('');
  const [score, setScore] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (userId.length > 10) {
      alert('아이디는 10자 이하로 입력해주세요.');
      return;
    }

    const { data, error } = await supabase.from('users').insert([
      {
        name,
        user_id: userId,
        password,
        grade,
        score: parseInt(score)
      }
    ]).select(); // 🔸 데이터 반환

    if (error) {
      alert('회원가입 중 오류가 발생했습니다: ' + error.message);
    } else {
      // 🔸 localStorage에 사용자 ID 저장
      localStorage.setItem('userId', data[0].user_id);

      alert('회원가입이 완료되었습니다. 로그인 해주세요.');
      navigate('/login');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.logo}>MCW</h1>
      <h2 className={styles.title}>📝 회원가입</h2>
      <form onSubmit={handleSignup} className={styles.form}>
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="text"
          placeholder="아이디 (10자 이하)"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className={styles.input}
          required
        />
        <select
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className={styles.select}
          required
        >
          <option value="">학년 선택</option>
          <option value="중1">중학교 1학년</option>
          <option value="중2">중학교 2학년</option>
          <option value="중3">중학교 3학년</option>
          <option value="고1">고등학교 1학년</option>
          <option value="고2">고등학교 2학년</option>
          <option value="고3">고등학교 3학년</option>
        </select>
        <input
          type="number"
          placeholder="학교 시험 점수"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>회원가입</button>
      </form>
      <p className={styles.loginText}>
        이미 계정이 있으신가요?{' '}
        <Link to="/login" className={styles.loginLink}>로그인</Link>
      </p>
    </div>
  );
}
