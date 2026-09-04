import React from 'react';

function NoteActionButton({ variant, onClick, isArchived }) {
  const isDelete = variant === 'delete';
  const className = isDelete ? 'note-item__delete-button' : 'note-item__archive-button';
  const buttonText = isDelete ? 'Delete' : isArchived ? 'Pindahkan' : 'Arsipkan';
  const testId = isDelete ? 'note-item-delete-button' : 'note-item-archive-button';

  return (
    <button
      className={className}
      type="button"
      onClick={onClick}
      data-testid={testId}
    >
      {buttonText}
    </button>
  );
}

export default NoteActionButton;