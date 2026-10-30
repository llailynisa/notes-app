import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote, archiveNote, unarchiveNote, deleteNote } from '../utils/network-data'; // Sesuaikan path relative ke api.js
import LoadingIndicator from '../components/LoadingIndicator';
import NotFoundPage from './NotFoundPage';
import { useLanguage } from '../contexts/LanguageContext';

function DetailPage({ accessToken }) {
  const { t, language } = useLanguage();
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function fetchNote() {
      setLoading(true);
      setError('');

      try {
        const fetchedNote = await getNote(id, { accessToken });
        if (!ignore) setNote(fetchedNote);
      } catch (error) {
        if (!ignore) {
          setNote(null);
          if (error.status !== 404) setError(error.message);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchNote();

    return () => {
      ignore = true;
    };
  }, [id, accessToken]);

  async function deleteHandler() {
    setActionLoading(true);
    setError('');

    try {
      await deleteNote(note.id, { accessToken });
      navigate('/');
    } catch (error) {
      setError(error.message);
      setActionLoading(false);
    }
  }

  async function archivedHandler() {
    setActionLoading(true);
    setError('');

    try {
      if (note.archived) {
        await unarchiveNote(note.id, { accessToken });
      } else {
        await archiveNote(note.id, { accessToken });
      }
      navigate(note.archived ? '/' : '/archives');
    } catch (error) {
      setError(error.message);
      setActionLoading(false);
    }
  }

  if (loading) {
    return (
      <section className="detail-page">
        <LoadingIndicator label={t('loadingDetail')} />
      </section>
    );
  }

  if (!note && !error) {
    return <NotFoundPage />;
  }

  if (error && !note) {
    return (
      <section className="detail-page">
        <p role="alert" style={{ color: 'var(--error)' }}>{error}</p>
      </section>
    );
  }

  return (
    <section className="detail-page">
      <h2>{note.title}</h2>
      <p className="note-item__date">
        {new Date(note.createdAt).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      <div className="note-item__body">{note.body}</div>
      {error && <p role="alert" style={{ color: 'var(--error)' }}>{error}</p>}
      <div className="detail-page__action">
        <button type="button" className="action" onClick={archivedHandler} disabled={actionLoading}>
          {actionLoading ? t('processing') : note.archived ? t('unarchive') : t('archive')}
        </button>
        <button type="button" className="action" onClick={deleteHandler} disabled={actionLoading}>
          {actionLoading ? t('processing') : t('delete')}
        </button>
      </div>
    </section>
  );
}

export default DetailPage;