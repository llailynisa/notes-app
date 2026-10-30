import React, { useEffect, useState } from "react";
import NoteList from '../components/NoteList';
import LoadingIndicator from '../components/LoadingIndicator';
import { getArchivedNotes } from '../utils/network-data';
import { useLanguage } from '../contexts/LanguageContext';

function ArchivePage() {
    const { t } = useLanguage();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let ignore = false;

        async function fetchNotes() {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const data = await getArchivedNotes({ accessToken });
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

    // Endpoint /notes/archived sudah hanya mengembalikan catatan arsip,
    // jadi filter note.archived tidak diperlukan lagi.
    return (
        <section>
            <h2>{t('archivedNotes')}</h2>
            {error && <p role="alert" style={{ color: 'var(--error)' }}>{error}</p>}
            {loading ? (
                <LoadingIndicator label={t('loadingArchives')} />
            ) : (
                <NoteList notes={notes} emptyMessage={t('emptyArchives')} />
            )}
        </section>
    )
}
export default ArchivePage;