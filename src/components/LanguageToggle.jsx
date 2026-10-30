import { useLanguage } from '../contexts/LanguageContext';

function LanguageToggle() {
  const { language, toggleLanguage, t } = useLanguage();
  const label = language === 'id' ? t('changeToEnglish') : t('changeToIndonesian');

  return (
    <button
      className='toggle-locale'
      type='button'
      onClick={toggleLanguage}
      aria-label={label}
      title={label}
    >
      {language === 'id' ? 'EN' : 'ID'}
    </button>
  );
}

export default LanguageToggle;
