class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set note(value) {
    this._note = value;
    this.render();
  }

  render() {
    const date = new Date(this._note.createdAt).toLocaleDateString('id-ID');
    const archiveText = this._note.archived ? 'Pindahkan' : 'Arsipkan';

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          background: white; border-radius: 12px; padding: 1.5rem;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          display: flex; flex-direction: column; height: 100%;
          box-sizing: border-box;
        }
        h3 { margin-top: 0; margin-bottom: 0.5rem; }
        .date { font-size: 0.8rem; color: #7f8c8d; margin-bottom: 1rem; }
        .body { flex-grow: 1; margin-bottom: 1rem; }
        .actions { display: flex; gap: 0.5rem; }
        button {
          padding: 0.5rem; border: none; border-radius: 5px; cursor: pointer; color: white; font-weight: bold; flex: 1;
        }
        .btn-archive { background-color: #f1c40f; color: #333;}
        .btn-delete { background-color: #e74c3c; }
      </style>
      <div class="card">
        <h3>${this._note.title}</h3>
        <div class="date">${date}</div>
        <div class="body">${this._note.body}</div>
        <div class="actions">
          <button class="btn-archive" id="btn-archive">${archiveText}</button>
          <button class="btn-delete" id="btn-delete">Hapus</button>
        </div>
      </div>
    `;

    this.shadowRoot
      .querySelector('#btn-delete')
      .addEventListener('click', () => {
        this.dispatchEvent(
          new CustomEvent('delete-note', {
            detail: this._note.id,
            bubbles: true,
          })
        );
      });

    this.shadowRoot
      .querySelector('#btn-archive')
      .addEventListener('click', () => {
        const eventName = this._note.archived
          ? 'unarchive-note'
          : 'archive-note';
        this.dispatchEvent(
          new CustomEvent(eventName, { detail: this._note.id, bubbles: true })
        );
      });
  }
}
customElements.define('note-item', NoteItem);
