import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/network-data';
import { useLanguage } from '../contexts/LanguageContext';

function RegisterPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submitHandler(event) {
    event.preventDefault();
    setError('');

    if (password.length < 6) {
      setError(t('passwordTooShort'));
      return;
    }

    if (password !== confirmPassword) {
      setError(t('passwordMismatch'));
      return;
    }

    setLoading(true);

    try {
      await registerUser({ name, email, password });
      // Setelah daftar, arahkan ke halaman login.
      navigate('/');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <section className='register-page'>
      <h2>{t('register')}</h2>
      <form className='input-register' onSubmit={submitHandler}>
        <label htmlFor='name'>{t('name')}</label>
        <input
          id='name'
          type='text'
          autoComplete='name'
          placeholder={t('fullName')}
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <label htmlFor='email'>{t('email')}</label>
        <input
          id='email'
          type='email'
          autoComplete='email'
          placeholder='nama@email.com'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor='password'>{t('password')}</label>
        <input
          id='password'
          type='password'
          autoComplete='new-password'
          placeholder={t('minPassword')}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <label htmlFor='confirmPassword'>{t('confirmPassword')}</label>
        <input
          id='confirmPassword'
          type='password'
          autoComplete='new-password'
          placeholder={t('repeatPassword')}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
        />

        {error && (
          <p role='alert' style={{ color: 'var(--error)', marginBottom: 16 }}>
            {error}
          </p>
        )}

        <button type='submit' disabled={loading}>
          {loading ? t('processing') : t('register')}
        </button>
      </form>
      <p>
        {t('haveAccount')} <Link to='/'>{t('loginHere')}</Link>
      </p>
    </section>
  );
}

export default RegisterPage;