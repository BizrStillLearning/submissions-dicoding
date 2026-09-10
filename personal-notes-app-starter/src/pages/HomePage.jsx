import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { getActiveNotes } from '../utils/network-data.js';

function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    const keyword = searchParams.get('keyword') || '';

    useEffect(() => {
        const fetchNotes = async () => {
            setLoading(true);
            const { data } = await getActiveNotes();
            setNotes(data || []);
            setLoading(false);
        };

        fetchNotes();
    }, []);

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

            {loading ? (
                <p>Memuat catatan...</p>
            ) : (
                <NoteList notes={filteredNotes} emptyMessage="Tidak ada catatan" />
            )}

            <div className="homepage__action">
                <Link to="/notes/new" className="action" title="Tambah Catatan">
                    +
                </Link>
            </div>
        </section>
    );
}

export default HomePage;