import './style.css';
import './components/app-bar.js';
import './components/note-input.js';
import './components/note-item.js';
import './components/loading-indicator.js';

import { NotesApi } from './api.js';
import Swal from 'sweetalert2';
import { animate, stagger } from 'animejs';

document.addEventListener('DOMContentLoaded', () => {
    const activeList = document.getElementById('active-list');
    const archivedList = document.getElementById('archived-list');
    const loading = document.querySelector('loading-indicator');
    const noteInput = document.querySelector('note-input');

    const renderNotes = (notes, container) => {
        container.innerHTML = '';
        if (notes.length === 0) {
            container.innerHTML = '<p>Tidak ada catatan.</p>';
            return;
        }
        notes.forEach((note) => {
            const el = document.createElement('note-item');
            el.note = note;
            container.appendChild(el);
        });

        animate(container.children, {
            translateY: [50, 0],
            opacity: [0, 1],
            delay: stagger(100),
            easing: 'easeOutQuad',
            duration: 500,
        });
    };

    const loadAllNotes = async () => {
        loading.show();
        try {
            const [activeNotes, archivedNotes] = await Promise.all([
                NotesApi.getNotes(),
                NotesApi.getArchivedNotes(),
            ]);
            renderNotes(activeNotes, activeList);
            renderNotes(archivedNotes, archivedList);
        } catch (error) {
            Swal.fire('Error!', error.message, 'error');
        } finally {
            loading.hide();
        }
    };

    noteInput.addEventListener('note-added', async (e) => {
        loading.show();
        try {
            await NotesApi.createNote({ title: e.detail.title, body: e.detail.body });
            Swal.fire('Berhasil!', 'Catatan ditambahkan.', 'success');
            loadAllNotes();
        } catch (error) {
            Swal.fire('Gagal!', error.message, 'error');
        } finally {
            loading.hide();
        }
    });

    document.addEventListener('delete-note', async (e) => {
        loading.show();
        try {
            await NotesApi.deleteNote(e.detail);
            Swal.fire('Terhapus!', 'Catatan dihapus.', 'success');
            loadAllNotes();
        } catch (error) {
            Swal.fire('Gagal!', error.message, 'error');
        } finally {
            loading.hide();
        }
    });

    document.addEventListener('archive-note', async (e) => {
        loading.show();
        try {
            await NotesApi.archiveNote(e.detail);
            loadAllNotes();
        } catch (error) {
            Swal.fire('Gagal!', error.message, 'error');
        } finally {
            loading.hide();
        }
    });

    document.addEventListener('unarchive-note', async (e) => {
        loading.show();
        try {
            await NotesApi.unarchiveNote(e.detail);
            loadAllNotes();
        } catch (error) {
            Swal.fire('Gagal!', error.message, 'error');
        } finally {
            loading.hide();
        }
    });

    loadAllNotes();
});
