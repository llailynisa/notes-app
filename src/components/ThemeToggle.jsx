import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const label = theme === 'dark' ? t('changeToLight') : t('changeToDark');

  return (
    <button
      className='toggle-theme'
      type='button'
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}

export default ThemeToggle;
