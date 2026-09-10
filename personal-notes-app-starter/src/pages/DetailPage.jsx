import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import parser from 'html-react-parser';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import { showFormattedDate } from '../utils/index';

function DetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNote = async () => {
            setLoading(true);
            const { data } = await getNote(id);
            setNote(data);
            setLoading(false);
        };

        fetchNote();
    }, [id]);

    const onDeleteHandler = async () => {
        await deleteNote(id);
        navigate('/');
    };

    const onArchiveHandler = async () => {
        if (note.archived) {
            await unarchiveNote(id);
        } else {
            await archiveNote(id);
        }
        navigate('/');
    };

    if (loading) {
        return <p className="detail-page__not-found">Memuat detail catatan...</p>;
    }

    if (!note) {
        return <p className="detail-page__not-found">Catatan tidak ditemukan!</p>;
    }

    return (
        <section className="detail-page">
            <h3 className="detail-page__title">{note.title}</h3>
            <p className="detail-page__createdAt">{showFormattedDate(note.createdAt)}</p>
            <div className="detail-page__body">{parser(note.body)}</div>

            <div className="detail-page__action">
                <button className="action" type="button" title={note.archived ? "Batal Arsip" : "Arsipkan"} onClick={onArchiveHandler}>
                    {note.archived ? 'Batal Arsip' : 'Arsipkan'}
                </button>
                <button className="action" type="button" title="Hapus" onClick={onDeleteHandler}>
                    Hapus
                </button>
            </div>
        </section>
    );
}

export default DetailPage;