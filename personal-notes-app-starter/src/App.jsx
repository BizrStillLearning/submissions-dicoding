import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddPage from './pages/AddPage';
import DetailPage from './pages/DetailPage';
import ArchivePage from './pages/ArchivePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { getUserLogged, putAccessToken } from './utils/network-data';

import ThemeContext, { ThemeProvider } from './contexts/ThemeContext';
import LocaleContext, { LocaleProvider } from './contexts/LocaleContext';

function App() {
    const [authedUser, setAuthedUser] = useState(null);
    const [initializing, setInitializing] = useState(true);
    const navigate = useNavigate();

    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    const [locale, setLocale] = useState(() => localStorage.getItem('locale') || 'id');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('locale', locale);
    }, [locale]);

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await getUserLogged();
            setAuthedUser(data);
            setInitializing(false);
        };

        fetchUser();
    }, []);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const toggleLocale = () => {
        setLocale((prevLocale) => (prevLocale === 'id' ? 'en' : 'id'));
    };

    const themeContextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);
    const localeContextValue = useMemo(() => ({ locale, toggleLocale }), [locale]);

    const onLoginSuccess = async ({ accessToken }) => {
        putAccessToken(accessToken);
        const { data } = await getUserLogged();
        setAuthedUser(data);
    };

    const onLogout = () => {
        setAuthedUser(null);
        putAccessToken('');
        navigate('/');
    };

    if (initializing) {
        return <div className="app-container"><p>Memuat aplikasi...</p></div>;
    }

    return (
        <ThemeProvider value={themeContextValue}>
            <LocaleProvider value={localeContextValue}>
                <div className="app-container">
                    <header>
                        <h1>
                            <Link to="/">{locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</Link>
                        </h1>

                        <nav className="navigation">
                            <ul>
                                {authedUser && (
                                    <li><Link to="/archives">{locale === 'id' ? 'Arsip' : 'Archives'}</Link></li>
                                )}
                            </ul>
                        </nav>

                        <button className="toggle-locale" onClick={toggleLocale}>
                            {locale === 'id' ? 'en' : 'id'}
                        </button>
                        <button className="toggle-theme" onClick={toggleTheme}>
                            {theme === 'light' ? '🌙' : '☀️'}
                        </button>

                        {authedUser && (
                            <button className="button-logout" onClick={onLogout}>
                                Logout ({authedUser.name})
                            </button>
                        )}
                    </header>

                    <main>
                        {!authedUser ? (
                            <Routes>
                                <Route path="/*" element={<LoginPage loginSuccess={onLoginSuccess} />} />
                                <Route path="/register" element={<RegisterPage />} />
                            </Routes>
                        ) : (
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/archives" element={<ArchivePage />} />
                                <Route path="/notes/new" element={<AddPage />} />
                                <Route path="/notes/:id" element={<DetailPage />} />
                                <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                        )}
                    </main>
                </div>
            </LocaleProvider>
        </ThemeProvider>
    );
}

export default App;