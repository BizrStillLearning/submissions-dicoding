import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { getArchivedNotes } from '../utils/network-data';

function ArchivePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    const keyword = searchParams.get('keyword') || '';

    useEffect(() => {
        const fetchNotes = async () => {
            setLoading(true);
            const { data } = await getArchivedNotes();
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
        <section className="archives-page">
            <h2>Catatan Terarsip</h2>
            <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />

            {loading ? (
                <p>Memuat arsip...</p>
            ) : (
                <NoteList notes={filteredNotes} emptyMessage="Arsip kosong" />
            )}
        </section>
    );
}

export default ArchivePage;