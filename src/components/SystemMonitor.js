// src/components/SystemMonitor.js

import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import styles from '../styles/SystemMonitor.module.css';

export default function SystemMonitor() {
  const [stats, setStats] = useState({
    userCount: 0,
    adminCount: 0,
    quizCount: 0,
    latestQuizTime: '-',
  });

  const fetchStats = async () => {
    // 사용자 수
    const { count: userCount } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    // 관리자 수
    const { count: adminCount } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('is_admin', true);

    // 퀴즈 수
    const { count: quizCount } = await supabase
      .from('quiz_results')
      .select('*', { count: 'exact', head: true });

    // 가장 최근 퀴즈 응시 시간
    const { data: latest } = await supabase
      .from('quiz_results')
      .select('created_at')
      .order('created_at', { ascending: false })
      .limit(1);

    setStats({
      userCount: userCount || 0,
      adminCount: adminCount || 0,
      quizCount: quizCount || 0,
      latestQuizTime: latest?.[0]?.created_at?.split('T')[0] || '-',
    });
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className={styles.container}>
      <h3>🛠 시스템 모니터링</h3>
      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <h4>총 사용자 수</h4>
          <p>{stats.userCount}명</p>
        </div>
        <div className={styles.card}>
          <h4>관리자 수</h4>
          <p>{stats.adminCount}명</p>
        </div>
        <div className={styles.card}>
          <h4>퀴즈 응시 수</h4>
          <p>{stats.quizCount}회</p>
        </div>
        <div className={styles.card}>
          <h4>최근 퀴즈 응시일</h4>
          <p>{stats.latestQuizTime}</p>
        </div>
      </div>
    </div>
  );
}
