import React from 'react';
import NoteItem from './NoteItem';

function NotesList({ notes, onDelete, onArchive, searchKeyword, dataTestId = 'notes-list' }) {
  const hasNotes = notes.length > 0;

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        <p
          className="notes-list__empty-message"
          data-testid={`${dataTestId}-empty`}
        >
          Tidak ada catatan
        </p>
      </div>
    );
  }

  const getMonthYear = (isoDateString) => {
    const date = new Date(isoDateString);
    const month = date.toLocaleString('id-ID', { month: 'long' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  const groupedNotes = notes.reduce((acc, note) => {
    const groupKey = getMonthYear(note.createdAt);
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(note);
    return acc;
  }, {});

  return (
    <div className="notes-list" data-testid={dataTestId}>
      {Object.entries(groupedNotes).map(([groupKey, notesInGroup]) => (
        <section key={groupKey} data-testid={`${groupKey}-group`} className="notes-group">
          <h3>{groupKey}</h3>
          <span data-testid={`${groupKey}-group-count`}>{notesInGroup.length} catatan</span>

          <div className="notes-list__grid">
            {notesInGroup.map((note) => (
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
      ))}
    </div>
  );
}

export default NotesList;