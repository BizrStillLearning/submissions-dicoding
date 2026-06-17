import React from 'react';

function NoteActionButton({ variant, onClick, isArchived }) {
    const isDelete = variant === 'delete';

    const className = isDelete ? 'note-item__delete-button' : 'note-item__archive-button';
    const dataTestId = isDelete ? 'note-item-delete-button' : 'note-item-archive-button';

    let label = 'Delete';
    if (!isDelete) {
        label = isArchived ? 'Pindahkan' : 'Arsipkan';
    }

    return (
        <button
            className={className}
            type="button"
            onClick={onClick}
            data-testid={dataTestId}
        >
            {label}
        </button>
    );
}

export default NoteActionButton;