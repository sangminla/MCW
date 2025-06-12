import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import styles from '../styles/BookManagement.module.css';

export default function BookManagement() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [newBook, setNewBook] = useState({
    title: '',
    grade: '',
    level: '',
    description: '',
  });

  const fetchBooks = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('Book_Recommendations').select('*');
    if (error) {
      console.error('❌ 교재 불러오기 실패:', error);
    } else {
      setBooks(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = async () => {
    const { title, grade, level, description } = newBook;
    if (!title || !grade || !level) {
      alert('교재명, 학년, Level은 필수입니다.');
      return;
    }

    const { error } = await supabase.from('Book_Recommendations').insert([
      { title, grade, level, description }
    ]);

    if (error) {
      alert('추가 실패');
      console.error(error);
    } else {
      alert('교재가 추가되었습니다.');
      setNewBook({ title: '', grade: '', level: '', description: '' });
      fetchBooks();
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('정말 삭제하시겠습니까?');
    if (!confirm) return;

    const { error } = await supabase.from('Book_Recommendations').delete().eq('id', id);
    if (error) {
      alert('삭제 실패');
    } else {
      alert('삭제 완료');
      fetchBooks();
    }
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h3>📚 교재 관리</h3>

      <div className={styles.form}>
        <input
          type="text"
          placeholder="교재명"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <select
          value={newBook.grade}
          onChange={(e) => setNewBook({ ...newBook, grade: e.target.value })}
        >
          <option value="">학년 선택</option>
          <option value="중1">중1</option>
          <option value="중2">중2</option>
          <option value="중3">중3</option>
          <option value="고1">고1</option>
          <option value="고2">고2</option>
          <option value="고3">고3</option>
        </select>
        <select
          value={newBook.level}
          onChange={(e) => setNewBook({ ...newBook, level: e.target.value })}
        >
          <option value="">Level 선택</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <input
          type="text"
          placeholder="설명 (선택)"
          value={newBook.description}
          onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
        />
        <button onClick={handleAddBook}>➕ 교재 추가</button>
      </div>

      <input
        type="text"
        className={styles.searchInput}
        placeholder="교재명 또는 학년 검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>교재명</th>
              <th>학년</th>
              <th>Level</th>
              <th>설명</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.grade}</td>
                <td>{book.level}</td>
                <td>{book.description || '-'}</td>
                <td>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(book.id)}
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
