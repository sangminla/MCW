// src/components/Login.js

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import styles from '../styles/Login.module.css';

const Login = ({ setIsLoggedIn }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', userId)
      .eq('password', password)
      .single();

    if (error || !data) {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
      console.error('❌ 로그인 실패:', error);
      return;
    }

    console.log('✅ 로그인 성공:', data);

    // 문자열이든 boolean이든 true로 판별되도록 처리
    const isAdmin = data.is_admin === true || data.is_admin === 'true';

    // localStorage에 저장
    localStorage.setItem('userId', data.user_id);
    localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false');

    setIsLoggedIn(true);

    // 관리자 여부에 따라 분기
    if (isAdmin) {
      console.log("🛠 관리자 계정입니다. 관리자 페이지로 이동");
      navigate('/admin');
    } else {
      console.log("🙋 일반 사용자입니다. 홈으로 이동");
      navigate('/');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.logo}>MCW</h1>
      <h2 className={styles.title}>🔐 로그인</h2>
      <form onSubmit={handleLogin} className={styles.form}>
        <input
          type="text"
          placeholder="아이디"
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
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>로그인</button>
      </form>

      <p className={styles.signupText}>
        아직 계정이 없으신가요?{' '}
        <Link to="/signup" className={styles.signupLink}>회원가입</Link>
      </p>
    </div>
  );
};

export default Login;
