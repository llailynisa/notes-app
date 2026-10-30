import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteForm from '../components/NoteForm';
import { addNote } from '../utils/network-data'; // Sesuaikan path relative ke api.js
import { useLanguage } from '../contexts/LanguageContext';

function AddPage({ accessToken }) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function submitHandler({ title, body }) {
    setLoading(true);
    setError('');

    try {
      await addNote({ title, body }, { accessToken });
      navigate('/');
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <section className="add-page">
      <h2>{t('add')} {t('notes').toLowerCase()}</h2>
      {error && <p role='alert' style={{ color: 'var(--error)' }}>{error}</p>}
      <NoteForm onSubmit={submitHandler} loading={loading} />
    </section>
  );
}

export default AddPage;