import { NavLink } from "react-router-dom";
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '../contexts/LanguageContext';

function Navbar({ user, onLogout }) {
    const { t } = useLanguage();

    return (
        <header className="navigation">
            <h1>{t('appName')}</h1>
            <ul>
                <li>
                    <NavLink to='/' end>{t('notes')}</NavLink>
                </li>
                <li>
                    <NavLink to='/archives'>{t('archives')}</NavLink>
                </li>
                <li>
                    <NavLink to='/notes/new'>{t('add')}</NavLink>
                </li>
            </ul>
            <ThemeToggle />
            <LanguageToggle />
            <button className="button-logout" type="button" onClick={onLogout}>
                {user.name} | {t('logout')}
            </button>
        </header>
    );
}

export default Navbar;