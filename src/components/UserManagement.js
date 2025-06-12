// src/components/UserManagement.js

import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import styles from '../styles/UserManagement.module.css';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // 회원 목록 불러오기
  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
      console.error('❌ 사용자 불러오기 실패:', error);
    } else {
      setUsers(data);
      setFilteredUsers(data); // 처음엔 전체 리스트 그대로
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 검색어 필터링
  useEffect(() => {
    const filtered = users.filter((user) =>
      user.user_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  // 삭제 기능
  const handleDelete = async (userId) => {
    const confirm = window.confirm(`${userId} 회원을 삭제하시겠습니까?`);
    if (!confirm) return;

    const { error } = await supabase.from('users').delete().eq('user_id', userId);
    if (error) {
      alert('삭제 실패');
    } else {
      alert('삭제 성공');
      fetchUsers(); // 목록 새로고침
    }
  };

  return (
    <div className={styles.container}>
      <h3>전체 회원 목록</h3>

      <input
        type="text"
        placeholder="이름 또는 아이디 검색"
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>이름</th>
              <th>학년</th>
              <th>점수</th>
              <th>관리자 여부</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{user.name}</td>
                <td>{user.grade || '-'}</td>
                <td>{user.score || '-'}</td>
                <td>{user.is_admin ? '✅' : '❌'}</td>
                <td>
                  <button
                    onClick={() => handleDelete(user.user_id)}
                    className={styles.deleteBtn}
                    disabled={user.is_admin}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
