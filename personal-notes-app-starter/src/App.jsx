import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddPage from './pages/AddPage';
import DetailPage from './pages/DetailPage';
import ArchivePage from './pages/ArchivePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
    return (
        <div className="app-container">
            <header>
                <h1><Link to="/">Aplikasi Catatan Pribadi</Link></h1>
                <nav className="navigation">
                    <ul>
                        <li><Link to="/archives">Arsip</Link></li>
                    </ul>
                </nav>
            </header>

            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/archives" element={<ArchivePage />} />

                    <Route path="/notes/new" element={<AddPage />} />
                    <Route path="/notes/:id" element={<DetailPage />} />

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;