import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

function NotFoundPage() {
  const { t } = useLanguage();
  return (
    <section className="not-found-page">
      <h2>404</h2>
      <p>{t('notFound')}</p>
      <p>
        <Link to="/">{t('backHome')}</Link>
      </p>
    </section>
  );
}

export default NotFoundPage;