import { useLanguage } from '../contexts/LanguageContext';

function SearchBar({ keyword, onKeywordChange }) {
    const { t } = useLanguage();
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={keyword}
                onChange={(event) => onKeywordChange(event.target.value)}
            />
        </div>
    );
}

export default SearchBar;