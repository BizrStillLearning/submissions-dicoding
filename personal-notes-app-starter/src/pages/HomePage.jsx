import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { getActiveNotes } from '../utils/local-data';

function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword') || '';

    const notes = getActiveNotes();

    const onKeywordChangeHandler = (keyword) => {
        setSearchParams({ keyword });
    };

    const filteredNotes = notes.filter((note) => {
        return note.title.toLowerCase().includes(keyword.toLowerCase());
    });

    return (
        <section className="homepage">
            <h2>Catatan Aktif</h2>
            <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />

            <NoteList notes={filteredNotes} emptyMessage="Tidak ada catatan" />

            <div className="homepage__action">
                <Link to="/notes/new" className="action" title="Tambah Catatan">
                    +
                </Link>
            </div>
        </section>
    );
}

export default HomePage;