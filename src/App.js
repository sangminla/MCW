// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 기본 화면
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';

// 퀴즈 관련
import QuizSetup from './components/QuizSetup';
import QuizPage from './components/QuizPage';
import QuizResult from './components/QuizResult';
import QuizGenerate from './components/QuizGenerate';

// 학습/추천 기능
import ScorePage from './components/ScorePage';
import StudyPage from './components/StudyPage';
import BookPage from './components/BookPage';

// 🔒 관리자 전용
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // ✅ 앱 최초 실행 시 localStorage 초기화 (강제 로그아웃)
  useEffect(() => {
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');
  }, []);

  // ✅ 로그인 상태를 localStorage에서 읽어와 설정 (Login 후 반영됨)
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const adminFlag = localStorage.getItem('isAdmin') === 'true';

    console.log('🟢 userId:', userId);
    console.log('🟢 isAdmin:', adminFlag);

    setIsLoggedIn(!!userId);
    setIsAdmin(adminFlag);
  }, [isLoggedIn]);

  return (
    <Router>
      <Routes>
        {/* 🏠 홈 */}
        <Route
          path="/"
          element={
            <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />

        {/* 🔐 로그인 / 회원가입 */}
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/signup" element={<Signup />} />

        {/* 🙋 내 정보 */}
        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <Profile setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* 🧠 퀴즈 기능 */}
        <Route
          path="/quiz-setup"
          element={
            isLoggedIn ? <QuizSetup /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/quiz"
          element={
            isLoggedIn ? <QuizPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/quiz-generate"
          element={
            isLoggedIn ? <QuizGenerate /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/quiz-result"
          element={
            isLoggedIn ? <QuizResult /> : <Navigate to="/login" replace />
          }
        />

        {/* 📊 성적 확인 */}
        <Route
          path="/scores"
          element={
            isLoggedIn ? <ScorePage /> : <Navigate to="/login" replace />
          }
        />

        {/* 📚 학습 추천 */}
        <Route
          path="/study"
          element={
            isLoggedIn ? <StudyPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/books"
          element={
            isLoggedIn ? <BookPage /> : <Navigate to="/login" replace />
          }
        />

        {/* 🛠 관리자 전용 페이지 */}
        <Route
          path="/admin"
          element={
            isLoggedIn && isAdmin ? (
              <AdminDashboard setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
