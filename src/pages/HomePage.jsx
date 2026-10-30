import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import NoteList from '../components/NoteList';
import LoadingIndicator from '../components/LoadingIndicator';
import { getAllNotes } from '../utils/network-data';
import { useLanguage } from '../contexts/LanguageContext';

function HomePage() {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    let ignore = false;

    async function fetchNotes() {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const data = await getAllNotes({ accessToken });
        if (!ignore) setNotes(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchNotes();

    return () => {
      ignore = true;
    };
  }, []);

  function onKeywordChange(newKeyword) {
    setSearchParams(newKeyword ? { keyword: newKeyword } : {});
  }

  // Endpoint /notes hanya mengembalikan catatan aktif,
  // jadi tidak perlu lagi filter note.archived.
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <section>
      <h2>{t('activeNotes')}</h2>
      <SearchBar keyword={keyword} onKeywordChange={onKeywordChange} />
      {error && <p role='alert' style={{ color: 'var(--error)' }}>{error}</p>}
      {loading ? (
        <LoadingIndicator label={t('loadingNotes')} />
      ) : (
        <NoteList notes={filteredNotes} emptyMessage={t('emptyNotes')} />
      )}
    </section>
  );
}

export default HomePage;