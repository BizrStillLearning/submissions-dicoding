import React from 'react';
import NoteItem from './NoteItem';

function NotesList({ notes, onDelete, onArchive, dataTestId, searchKeyword }) {
    if (notes.length === 0) {
        return (
            <div
                data-testid={`${dataTestId}-empty`}
                className="notes-list__empty-message"
            >
                Tidak ada catatan
            </div>
        );
    }

    const groupedNotes = notes.reduce((groups, note) => {
        const date = new Date(note.createdAt);

        const groupKey = date.toLocaleDateString('id-ID', {
            month: 'long',
            year: 'numeric',
        });

        if (!groups[groupKey]) {
            groups[groupKey] = [];
        }

        groups[groupKey].push(note);

        return groups;
    }, {});

    return (
        <div className="notes-list" data-testid={dataTestId}>
            {Object.entries(groupedNotes).map(([groupKey, groupNotes]) => {
                const safeKey = groupKey.replace(/\s+/g, '-');

                return (
                    <section
                        key={groupKey}
                        data-testid={`${safeKey}-group`}
                        className="notes-group"
                    >
                        <h3>{groupKey}</h3>
                        <span data-testid={`${safeKey}-group-count`}>
              {groupNotes.length} catatan
            </span>

                        <div className="notes-list__grid">
                            {groupNotes.map((note) => (
                                <NoteItem
                                    key={note.id}
                                    note={note}
                                    onDelete={onDelete}
                                    onArchive={onArchive}
                                    searchKeyword={searchKeyword}
                                />
                            ))}
                        </div>
                    </section>
                );
            })}
        </div>
    );
}

export default NotesList;

