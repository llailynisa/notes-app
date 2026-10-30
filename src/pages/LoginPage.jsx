import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../utils/network-data';
import { useLanguage } from '../contexts/LanguageContext';

function LoginPage({ onLoginSuccess }) {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submitHandler(event) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      // loginUser mengembalikan { accessToken }
      const { accessToken } = await loginUser({ email, password });
      await onLoginSuccess({ accessToken });
      // Setelah berhasil, App menampilkan halaman catatan.
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <section className='login-page'>
      <h2>{t('login')}</h2>
      <form className='input-login' onSubmit={submitHandler}>
        <label htmlFor='email'>{t('email')}</label>
        <input
          id='email'
          type='email'
          placeholder='nama@email.com'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor='password'>{t('password')}</label>
        <input
          id='password'
          type='password'
          autoComplete='current-password'
          placeholder='Password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {error && (
          <p role='alert' style={{ color: 'var(--error)', marginBottom: 16 }}>
            {error}
          </p>
        )}

        <button type='submit' disabled={loading}>
          {loading ? t('processing') : t('login')}
        </button>
      </form>
      <p>
        {t('noAccount')} <Link to='/register'>{t('registerHere')}</Link>
      </p>
    </section>
  );
}

export default LoginPage;