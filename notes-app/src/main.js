import notesData from './data/notes.js';
import './components/app-bar.js';
import './components/note-input.js';
import './components/note-item.js';

document.addEventListener('DOMContentLoaded', () => {
    const noteListContainer = document.getElementById('note-list');
    const noteInputComponent = document.querySelector('note-input');

    const renderNotes = (notes) => {
        noteListContainer.innerHTML = '';
        notes.forEach(note => {
            const noteItem = document.createElement('note-item');
            noteItem.note = note;
            noteListContainer.appendChild(noteItem);
        });
    };

    renderNotes(notesData);

    noteInputComponent.addEventListener('note-added', (event) => {
        const newNote = event.detail;
        notesData.unshift(newNote);
        renderNotes(notesData);
    });
});