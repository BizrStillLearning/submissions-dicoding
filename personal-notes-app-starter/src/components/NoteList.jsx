import React from 'react';
import PropTypes from 'prop-types';
import NoteItem from './NoteItem.jsx';

function NoteList({ notes, emptyMessage }) {
    if (notes.length === 0) {
        return (
            <section className="notes-list-empty">
                <p className="notes-list__empty-message">{emptyMessage}</p>
            </section>
        );
    }

    return (
        <div className="notes-list">
            {notes.map((note) => (
                <NoteItem
                    key={note.id}
                    id={note.id}
                    title={note.title}
                    createdAt={note.createdAt}
                    body={note.body}
                />
            ))}
        </div>
    );
}

NoteList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
    emptyMessage: PropTypes.string.isRequired,
};

export default NoteList;