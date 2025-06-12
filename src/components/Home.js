import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Home.module.css';

export default function Home({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');  // ✅ 로그인 정보 삭제
    setIsLoggedIn(false);               // 로그인 상태 변경
    navigate('/');                      // 홈으로 이동
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>MCW</div>
        <nav className={styles.nav}>
          <div className={styles.navLeft}>
            <Link to="/quiz-setup" className={styles.navLink}>퀴즈 풀기</Link>
            <Link to="/scores" className={styles.navLink}>성적 확인</Link>
            <Link to="/study" className={styles.navLink}>공부법 추천</Link>
            <Link to="/books" className={styles.navLink}>교재 추천</Link>
          </div>
          <div className={styles.navRight}>
            {isLoggedIn ? (
              <>
                <Link to="/profile" className={styles.navLink}>나</Link>
                <button onClick={handleLogout} className={styles.logoutButton}>로그아웃</button>
              </>
            ) : (
              <Link to="/login" className={styles.navLink}>로그인</Link>
            )}
          </div>
        </nav>
      </header>

      <div className={styles.banner}>
        <div className={styles.bannerText}>
          나에게 맞는 수학 공부 방법과 교재를 추천받아보세요! <br />
          간단한 퀴즈로 실력을 확인하고, 중고등학교 수준에 맞는 맞춤형 학습을 시작해보세요.
        </div>
      </div>

      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>맞춤 퀴즈</div>
          <div className={styles.cardDesc}>당신의 실력을 파악하는 간단한 수학 퀴즈를 풀어보세요.</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>점수 기반 분석</div>
          <div className={styles.cardDesc}>퀴즈 결과를 기반으로 수준을 판단해드립니다.</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>추천 학습법</div>
          <div className={styles.cardDesc}>당신의 학년에 맞는 공부법과 교재를 추천해드립니다.</div>
        </div>
      </main>
    </div>
  );
}
