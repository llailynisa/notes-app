import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

function NoteForm({ onSubmit, loading = false }) {
    const { t } = useLanguage();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    function submitHandler(event) {
        event.preventDefault();
        onSubmit({ title, body });
    }

    return (
        <form className="add-new-page__input" onSubmit={submitHandler}>
            <label htmlFor="title">{t('title')}</label>
            <input
                className="add-new-page__input__title"
                type="text"
                id="title"
                placeholder={t('titlePlaceholder')}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
            />

            <label htmlFor="body">{t('noteBody')}</label>
            <textarea
                className="add-new-page__input__body"
                id="body"
                value={body}
                placeholder={t('bodyPlaceholder')}
                onChange={(event) => setBody(event.target.value)}
                required
            />

            <button className="action" type="submit" disabled={loading}>
                {loading ? t('saving') : t('save')}
            </button>
        </form>
    );
}

export default NoteForm;
