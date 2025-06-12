import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/AdminDashboard.module.css';
import UserManagement from './UserManagement';
import BookManagement from './BookManagement';
import SystemMonitor from './SystemMonitor'; // ✅ 시스템 모니터링 추가

export default function AdminDashboard({ setIsLoggedIn }) {
  const [activeMenu, setActiveMenu] = useState('users'); // 기본: 회원 관리
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');  // 저장된 로그인 정보 삭제
    setIsLoggedIn(false);               // 로그인 상태 해제
    navigate('/');                      // 홈으로 이동
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'users':
        return <UserManagement />;
      case 'books':
        return <BookManagement />;
      case 'monitor':
        return <SystemMonitor />;
      default:
        return <div>기능을 선택하세요.</div>;
    }
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>MCW 관리자</h2>
        <button
          onClick={() => setActiveMenu('users')}
          className={`${styles.menuBtn} ${activeMenu === 'users' ? styles.active : ''}`}
        >
          회원 관리
        </button>
        <button
          onClick={() => setActiveMenu('books')}
          className={`${styles.menuBtn} ${activeMenu === 'books' ? styles.active : ''}`}
        >
          교재 관리
        </button>
        <button
          onClick={() => setActiveMenu('monitor')}
          className={`${styles.menuBtn} ${activeMenu === 'monitor' ? styles.active : ''}`}
        >
          시스템 모니터링
        </button>

        {/* ✅ 로그아웃 버튼 추가 */}
        <button onClick={handleLogout} className={styles.logoutBtn}>
          로그아웃
        </button>
      </aside>

      <main className={styles.mainContent}>
        <h2 className={styles.pageTitle}>
          {
            activeMenu === 'users' ? '👥 회원 관리'
              : activeMenu === 'books' ? '📚 교재 관리'
              : activeMenu === 'monitor' ? '🛠 시스템 모니터링'
              : ''
          }
        </h2>
        <div className={styles.pageBody}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
