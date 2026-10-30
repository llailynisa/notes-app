import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUserLogged } from './utils/network-data';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import AddPage from './pages/AddPage';
import ArchivePage from './pages/ArchivePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ThemeToggle from './components/ThemeToggle';
import LoadingIndicator from './components/LoadingIndicator';
import LanguageToggle from './components/LanguageToggle';
import { useLanguage } from './contexts/LanguageContext';

const ACCESS_TOKEN_KEY = 'accessToken';

function App() {
  const { t } = useLanguage();
  const [authedUser, setAuthedUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [authError, setAuthError] = useState('');

  // Saat aplikasi pertama dibuka, cek apakah ada token yang masih valid.
  useEffect(() => {
    async function checkAuth() {
      const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

      if (!accessToken) {
        setInitializing(false);
        return;
      }

      setAccessToken(accessToken);

      try {
        const user = await getUserLogged({ accessToken });
        setAuthedUser(user);
      } catch (error) {
        if (error.status === 401 || error.status === 403) {
          localStorage.removeItem(ACCESS_TOKEN_KEY);
          setAccessToken(null);
        } else {
          setAuthError(error.message);
        }
      } finally {
        setInitializing(false);
      }
    }

    checkAuth();
  }, []);

  // Dipanggil oleh LoginPage setelah loginUser berhasil.
  async function loginSuccessHandler({ accessToken }) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

    try {
      const user = await getUserLogged({ accessToken });
      setAccessToken(accessToken);
      setAuthedUser(user);
      setAuthError('');
    } catch (error) {
      if (error.status === 401 || error.status === 403) {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        setAccessToken(null);
      }
      throw error;
    }
  }

  function logoutHandler() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    setAuthedUser(null);
    setAccessToken(null);
    setAuthError('');
  }

  if (initializing) {
    return (
      <div className='app-container'>
        <main>
          <LoadingIndicator label={t('loadingSession')} />
        </main>
      </div>
    );
  }

  // Belum login: hanya halaman login dan register yang bisa diakses.
  if (authedUser === null) {
    return (
      <div className='app-container'>
        <header>
          <h1>{t('appName')}</h1>
          <ThemeToggle />
          <LanguageToggle />
        </header>
        <main>
          {authError && <p role='alert'>{authError}</p>}
          <Routes>
            <Route
              path='/'
              element={<LoginPage onLoginSuccess={loginSuccessHandler} />}
            />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </main>
      </div>
    );
  }

  // Sudah login: tampilkan halaman catatan.
  return (
    <div className='app-container'>
      <header>
        <Navbar user={authedUser} onLogout={logoutHandler} />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/archives' element={<ArchivePage />} />
          <Route
            path='/notes/new'
            element={<AddPage accessToken={accessToken} />}
          />
          <Route
            path='/notes/:id'
            element={<DetailPage accessToken={accessToken} />}
          />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;